const DEFAULT_TEXT = `{
  "wallColor": "#b7d6ff",
  "floorColor": "#d9c6a6",

  "bed": {
    "frameColor": "#5b3a29",
    "blanketColor": "#ff6b6b",
    "pillowColor": "white"
  },

  "deskColor": "#7c5cff",
  "rugColor": "#3dd6d0",

  "poster": {
    "show": true,
    "text": "Be Kind",
    "color": "#ffd166"
  },

  "window": {
    "show": true,
    "skyColor": "#7dd3fc"
  },

  "extras": {
    "showLamp": true,
    "showPlant": true
  }
}`;

const editor = document.getElementById("editor");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");

const posterEl = document.getElementById("poster");
const posterTitleEl = document.getElementById("posterTitle");
const windowEl = document.getElementById("window");
const lampEl = document.getElementById("lamp");
const plantEl = document.getElementById("plant");

function setStatus(ok, message) {
  statusDot.classList.remove("status__dot--ok", "status__dot--bad");
  statusDot.classList.add(ok ? "status__dot--ok" : "status__dot--bad");
  statusText.textContent = message;
}

function cssColorOrNull(value) {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v) return null;

  // Browser-friendly validation: if it becomes a color, accept it.
  const test = document.createElement("span");
  test.style.color = "";
  test.style.color = v;
  if (test.style.color === "") return null;
  return v;
}

function boolOrDefault(value, fallback) {
  if (typeof value === "boolean") return value;
  return fallback;
}

function applyConfig(config) {
  const root = document.documentElement;

  const wall = cssColorOrNull(config.wallColor);
  const floor = cssColorOrNull(config.floorColor);
  const desk = cssColorOrNull(config.deskColor);
  const rug = cssColorOrNull(config.rugColor);

  if (!wall) throw new Error('wallColor must be a valid color string, like "skyblue" or "#ffcc00".');
  if (!floor) throw new Error('floorColor must be a valid color string, like "tan" or "#d9c6a6".');
  if (!desk) throw new Error('deskColor must be a valid color string.');
  if (!rug) throw new Error('rugColor must be a valid color string.');

  const bed = config.bed ?? {};
  const bedFrame = cssColorOrNull(bed.frameColor);
  const blanket = cssColorOrNull(bed.blanketColor);
  const pillow = cssColorOrNull(bed.pillowColor);
  if (!bedFrame) throw new Error("bed.frameColor must be a valid color string.");
  if (!blanket) throw new Error("bed.blanketColor must be a valid color string.");
  if (!pillow) throw new Error("bed.pillowColor must be a valid color string.");

  root.style.setProperty("--wall", wall);
  root.style.setProperty("--floor", floor);
  root.style.setProperty("--desk", desk);
  root.style.setProperty("--rug", rug);
  root.style.setProperty("--bedFrame", bedFrame);
  root.style.setProperty("--blanket", blanket);
  root.style.setProperty("--pillow", pillow);

  const poster = config.poster ?? {};
  const showPoster = boolOrDefault(poster.show, true);
  const posterColor = cssColorOrNull(poster.color) ?? "#ffd166";
  const posterText =
    typeof poster.text === "string" && poster.text.trim()
      ? poster.text.trim().slice(0, 24)
      : "Be Kind";

  posterEl.style.display = showPoster ? "" : "none";
  posterEl.style.background = posterColor;
  posterTitleEl.textContent = posterText;

  const win = config.window ?? {};
  const showWindow = boolOrDefault(win.show, true);
  const sky = cssColorOrNull(win.skyColor) ?? "#7dd3fc";
  windowEl.style.display = showWindow ? "" : "none";
  root.style.setProperty("--windowSky", sky);

  const extras = config.extras ?? {};
  lampEl.style.display = boolOrDefault(extras.showLamp, true) ? "" : "none";
  plantEl.style.display = boolOrDefault(extras.showPlant, true) ? "" : "none";
}

function tryApplyFromEditor() {
  try {
    const parsed = JSON.parse(editor.value);
    applyConfig(parsed);
    setStatus(true, "Looks good! Room updated.");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    setStatus(false, `Fix this to update: ${msg}`);
  }
}

let debounceTimer = null;
function onEditorInput() {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(() => {
    tryApplyFromEditor();
  }, 400);
}

function reset() {
  editor.value = DEFAULT_TEXT;
  tryApplyFromEditor();
  editor.focus();
}

editor.addEventListener("input", onEditorInput);
applyBtn.addEventListener("click", tryApplyFromEditor);
resetBtn.addEventListener("click", reset);

reset();
