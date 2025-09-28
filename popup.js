const scanBtn = document.getElementById('scanBtn');
const suggestBtn = document.getElementById('suggestBtn');
const suggestionEl = document.getElementById('suggestion');
const statusEl = document.getElementById('status');
const openOptions = document.getElementById('openOptions');
const modelSel = document.getElementById('model');
const figmaBtn = document.getElementById('figmaBtn');

let latestCartData = null;
let apiKey = null;

function setStatus(msg) { statusEl.textContent = msg || ''; }

openOptions.addEventListener('click', (e) => { 
  e.preventDefault(); 
  chrome.runtime.openOptionsPage(); 
});

figmaBtn.addEventListener('click', () => {
  chrome.tabs.create({
    url: 'https://knee-jolt-70829421.figma.site/'
  });
});

async function getApiKey() {
  return new Promise((resolve) => {
    try { chrome.storage.sync.get(['GEMINI_API_KEY'], r => resolve(r?.GEMINI_API_KEY || null)); }
    catch { resolve(null); }
  });
}

async function ensureApiKey() {
  apiKey = await getApiKey();
  if (!apiKey) { 
    setStatus('No Gemini API key set. Go to Options.'); 
    suggestBtn.disabled = true; 
    return false; 
  }
  return true;
}

async function populateModels() {
  if (!(await ensureApiKey())) return;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(apiKey)}`);
    if (!res.ok) throw new Error('ListModels failed');
    const data = await res.json();
    const supported = (data.models || []).filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
                                         .map(m => m.name.replace(/^models\//,''));
    modelSel.innerHTML = '';
    (supported.length ? supported : ['gemini-1.5-flash']).forEach(m => {
      const opt = document.createElement('option'); 
      opt.value = m; 
      opt.textContent = m; 
      modelSel.appendChild(opt);
    });
  } catch {
    modelSel.innerHTML = '<option value="gemini-1.5-flash">gemini-1.5-flash</option>';
  }
}

function isAmazonUrl(u = '') {
  try { 
    const url = new URL(u); 
    return /(^|\.)amazon\.(com|fresh)$/i.test(url.hostname) || /(^|\.)smile\.amazon\.com$/i.test(url.hostname); 
  }
  catch { return false; }
}

async function sendMessageWithRetry(tabId, message, { tries = 4, delayMs = 300 } = {}) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try { return await chrome.tabs.sendMessage(tabId, message); }
    catch (err) { lastErr = err; await new Promise(r => setTimeout(r, delayMs)); }
  }
  throw lastErr || new Error('No receiver on this tab');
}

scanBtn.addEventListener('click', async () => {
  setStatus('Scanning current tab…'); suggestionEl.textContent = '';
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) { setStatus('No active tab found.'); return; }
    if (!isAmazonUrl(tab.url)) { setStatus('Open your Amazon Prime/Fresh cart tab first.'); return; }

    await sendMessageWithRetry(tab.id, { type: 'PANDO_MOUNT' });
    const resp = await sendMessageWithRetry(tab.id, { type: 'PANDO_SCAN' });
    if (!resp || !resp.ok) { setStatus(resp?.error || 'Could not scan this page.'); suggestBtn.disabled = true; return; }

    latestCartData = resp.data;
    setStatus('Scan complete. You can generate a suggestion.');
    suggestBtn.disabled = false;
  } catch (err) {
    console.error(err);
    setStatus('Could not reach the page script. Refresh the cart tab, then click Scan again.');
    suggestBtn.disabled = true;
  }
});

suggestBtn.addEventListener('click', async () => {
  if (!latestCartData) { setStatus('Scan a cart first.'); return; }
  if (!(await ensureApiKey())) return;
  setStatus('Calling Gemini for suggestion…'); suggestionEl.textContent = '';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) { setStatus('No active tab.'); return; }
    const resp2 = await sendMessageWithRetry(tab.id, {
      type: 'PANDO_SUGGEST',
      model: modelSel.value || 'gemini-1.5-flash',
      cart: latestCartData
    });
    if (!resp2?.ok) throw new Error(resp2?.error || 'LLM call failed');
    suggestionEl.textContent = resp2.text || '';
    setStatus('Done.');
  } catch (err) {
    console.error(err);
    setStatus('Error: ' + (err.message || String(err)));
  }
});

(async () => { await populateModels(); })();
