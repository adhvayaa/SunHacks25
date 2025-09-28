(() => {
  'use strict';

  // Prevent double-run
  if (window.__PANDO_CS_ACTIVE__) return;
  window.__PANDO_CS_ACTIVE__ = true;

  /***** Site detection *****/
  function isOnAmazon() {
    return /(^|\.)amazon\.(com|fresh)\b/i.test(location.host) || /(^|\.)smile\.amazon\.com$/i.test(location.host);
  }

  /***** Address scrape *****/
  function scrapeAddress() {
    const sels = [
      '#glow-ingress-line2', '#glow-ingress-line1', '#nav-global-location-popover-link',
      '.nav-line-2', '.nav-global-location-data-truncate', '[data-action="glow-show-address-modal"]',
      '.nav-line-1-container'
    ];
    for (const s of sels) {
      const el = document.querySelector(s);
      if (el && el.textContent && el.textContent.trim()) {
        const t = el.textContent.replace(/\s+/g, ' ').trim();
        if (/deliver|to|address/i.test(t) || t.length > 5) return t;
      }
    }
    return null;
  }

  /***** Price parsing *****/
  function parsePrice(text) {
    if (!text) return null;
    const cleaned = text.replace(/[^\d.,]/g, '').replace(/,/g, '');
    const num = parseFloat(cleaned);
    return Number.isFinite(num) ? num : null;
  }

  /***** Prime cart scrape *****/
  function scrapePrimeCartItems() {
    const items = [];
    const rows = document.querySelectorAll('[data-component-type="sc-list-item"], .sc-list-item');
    rows.forEach(row => {
      const title =
        row.querySelector('.sc-product-title, .a-truncate-full, .a-link-normal')?.textContent?.trim() ||
        row.querySelector('[data-item-title]')?.getAttribute('data-item-title') || null;

      const qtyStr =
        row.querySelector('input[name="quantityBox"]')?.value ||
        row.querySelector('select[name="quantity"] option[selected]')?.value ||
        row.querySelector('span.a-dropdown-prompt')?.textContent || '1';
      const quantity = parseInt((qtyStr || '1').replace(/[^\d]/g, ''), 10) || 1;

      const priceText =
        row.querySelector('.sc-product-price, .sc-price, .a-color-price, .a-size-base.a-color-price')?.textContent || null;
      const price = parsePrice(priceText);

      let deliveryText = null;
      for (const d of ['.sc-delivery-date', '.a-color-success', '[data-csa-c-delivery-promise]', '.delivery-message', '.a-color-base']) {
        const t = row.querySelector(d)?.textContent?.trim();
        if (t && !/^in stock$/i.test(t) && !/^free returns/i.test(t)) { deliveryText = t; break; }
      }

      if (title) items.push({ source: 'prime', title, quantity, price, deliveryText });
    });
    return items;
  }

  /***** Fresh cart scrape *****/
  function scrapeFreshCartItems() {
    const items = [];
    const rows = document.querySelectorAll('[data-test="cart-item"], [data-testid="cart-item"], .cart-item, [data-component-type="fresh-cart-item"]');
    rows.forEach(row => {
      const title =
        row.querySelector('[data-test="item-title"], [data-testid="item-title"], .a-truncate-full, .a-link-normal, .title')?.textContent?.trim() || null;

      const qtyC =
        row.querySelector('[data-test="quantity"], [data-testid="quantity"], .quantity, .a-dropdown-prompt')?.textContent?.trim() ||
        row.querySelector('select[name="quantity"] option[selected]')?.textContent || '1';
      const quantity = parseInt((qtyC || '1').replace(/[^\d]/g, ''), 10) || 1;

      const priceText =
        row.querySelector('[data-test="price"], [data-testid="price"], .a-color-price, .price')?.textContent || null;
      const price = parsePrice(priceText);

      const deliveryText =
        document.querySelector('[data-test="delivery-window"], [data-testid="delivery-window"], .delivery-window, .a-color-success')?.textContent?.trim() || null;

      if (title) items.push({ source: 'fresh', title, quantity, price, deliveryText });
    });
    return items;
  }

  /***** Orchestrator *****/
  function scrapeCart() {
    const address = scrapeAddress();
    const items = [...scrapePrimeCartItems(), ...scrapeFreshCartItems()];
    const shipments = {};
    items.forEach(it => {
      const key = (it.deliveryText || 'unspecified').slice(0, 120);
      (shipments[key] ||= []).push(it);
    });
    const total = items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.quantity || 1)), 0);
    return {
      url: location.href,
      timestamp: new Date().toISOString(),
      addressText: address,
      items,
      inferredShipments: Object.keys(shipments).map(k => ({ window: k, items: shipments[k] })),
      total
    };
  }

  /***** Wait for lazy DOM *****/
  async function waitForCart(maxMs = 6000) {
    const start = performance.now();
    const hasCart = () =>
      document.querySelector('[data-component-type="sc-list-item"], .sc-list-item, [data-test="cart-item"], [data-testid="cart-item"], .cart-item');
    if (hasCart()) return true;
    return new Promise(resolve => {
      const obs = new MutationObserver(() => { if (hasCart()) { obs.disconnect(); resolve(true); } });
      obs.observe(document.documentElement, { childList: true, subtree: true });
      const t = setInterval(() => {
        if (hasCart()) { clearInterval(t); obs.disconnect(); resolve(true); }
        else if (performance.now() - start > maxMs) { clearInterval(t); obs.disconnect(); resolve(false); }
      }, 200);
    });
  }

  /***** Storage *****/
  function getApiKey() {
    return new Promise((resolve) => {
      try {
        if (!chrome?.storage?.sync) return resolve(null);
        chrome.storage.sync.get(['GEMINI_API_KEY'], (res) => resolve(res?.GEMINI_API_KEY || null));
      } catch { resolve(null); }
    });
  }

  /***** Gemini *****/
  async function callGeminiSuggestion(model, apiKey, cartData) {
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
    const systemContext =
`You are Pando, a sustainability coach. Based on the cart items, addresses, and delivery windows, suggest how to:
- combine orders to minimize number of shipments,
- delay non-urgent items where helpful,
- reduce packaging waste.
Return a short, actionable plan (bullets). Estimate potential package reduction and rough % carbon savings.

IMPORTANT: Your response MUST follow this exact template:
Hello! Pando here, your sustainability coach. Let's make this order as eco-friendly as possible. Currently, your cart looks like it's headed for many individual shipments, but we can significantly improve that!

Here's a short, actionable plan:
* **Combine Deliveries:** ...
* **Delay Non-Urgent Items:** ...
* **Reduce Packaging:** ...

**Your Impact:**
By following these steps, you could reduce the number of packages from an estimated X to Y. This translates to a potential **A–B% reduction in packaging waste** and a **C–D% decrease in carbon emissions** for this order.

Small changes make a big difference!`;
    const userContext = { note: "Raw cart snapshot from front-end scrape (may be partial).", cart: cartData };
    const res = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: systemContext + "\n\n" + JSON.stringify(userContext, null, 2) }] }] })
    });
    if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text().catch(()=> '')}`);
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('') ||
                 data?.candidates?.[0]?.content?.parts?.[0]?.text || '(No text returned)';
    return (text || '').trim();
  }

  /***** Message bridge (popup -> content) *****/
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (!msg || !msg.type) return;

    if (!isOnAmazon()) {
      sendResponse({ ok: false, error: 'Not on an Amazon cart page.' });
      return;
    }

    if (msg.type === 'PANDO_MOUNT') {
      // No on-page UI anymore, just acknowledge
      sendResponse({ ok: true });
      return;
    }

    if (msg.type === 'PANDO_SCAN') {
      (async () => {
        try {
          await waitForCart();
          const data = scrapeCart();
          if (!data.items.length) { sendResponse({ ok: false, error: 'No cart items found. Open cart page.' }); return; }
          sendResponse({ ok: true, data });
        } catch (e) { sendResponse({ ok: false, error: 'Scrape error: ' + (e.message || String(e)) }); }
      })();
      return true;
    }

    if (msg.type === 'PANDO_SUGGEST') {
      (async () => {
        try {
          const key = await getApiKey();
          if (!key) { sendResponse({ ok: false, error: 'No Gemini API key set.' }); return; }
          const model = msg.model || 'gemini-1.5-flash';
          const cart = msg.cart;
          if (!cart) { sendResponse({ ok: false, error: 'No cart data. Scan first.' }); return; }
          const text = await callGeminiSuggestion(model, key, cart);
          sendResponse({ ok: true, text });
        } catch (e) { sendResponse({ ok: false, error: e.message || String(e) }); }
      })();
      return true;
    }
  });
})();
