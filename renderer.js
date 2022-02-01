// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
function pause() {
  log.innerText += '\nBLUR';
}

function play() {
  log.innerText += '\nFOCUS';
}

window.addEventListener('blur', pause);
window.addEventListener('focus', play);