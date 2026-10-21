const KEY = "crtc-ligado";
let ligado = localStorage.getItem(KEY) !== "0";

function naPaginaDeEpisodio() {
  return /\/watch\//.test(location.pathname);
}

function aplicar() {
  document.documentElement.classList.toggle("crtc-on", ligado && naPaginaDeEpisodio());
}

function alternar() {
  ligado = !ligado;
  try { localStorage.setItem(KEY, ligado ? "1" : "0"); } catch (e) {}
  aplicar();
}

// O site troca de página sem recarregar, então confere a URL de tempos em tempos
let ultimaUrl = "";
setInterval(() => {
  if (location.href !== ultimaUrl) {
    ultimaUrl = location.href;
    aplicar();
  }
}, 500);

function ehAtalho(e) {
  if (e.ctrlKey || e.altKey || e.metaKey) return false;
  const alvo = e.target;
  if (alvo && (alvo.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(alvo.tagName))) return false;
  return e.key === "t" || e.key === "T";
}

document.addEventListener("keydown", (e) => {
  if (ehAtalho(e)) alternar();
}, true);

// Clique no ícone da extensão
chrome.runtime.onMessage.addListener((msg) => {
  if (msg === "crtc-alternar") alternar();
});

aplicar();
