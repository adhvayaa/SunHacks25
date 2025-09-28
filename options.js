const input = document.getElementById('apiKey');
const saveBtn = document.getElementById('save');
const msg = document.getElementById('msg');

function setMsg(t) { msg.textContent = t || ''; }

chrome.storage.sync.get(['GEMINI_API_KEY'], (res) => {
  if (res?.GEMINI_API_KEY) input.value = res.GEMINI_API_KEY;
});

saveBtn.addEventListener('click', () => {
  const key = input.value.trim();
  chrome.storage.sync.set({ GEMINI_API_KEY: key }, () => {
    setMsg('Saved ✓');
    setTimeout(() => setMsg(''), 1500);
  });
});

