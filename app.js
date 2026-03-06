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

  "wallDecor": {
    "showFrame1": true,
    "showFrame2": true,
    "showShelf": true,
    "showClock": true,
    "frameColor": "white",
    "art1Color": "#ffd166",
    "art2Color": "#a7f3d0",
    "shelfColor": "rgba(0,0,0,0.35)",
    "clockColor": "rgba(255,255,255,0.9)"
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

const frame1El = document.getElementById("frame1");
const frame2El = document.getElementById("frame2");
const shelfEl = document.getElementById("shelf");
const clockEl = document.getElementById("clock");
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

  const decor = config.wallDecor ?? {};
  const showFrame1 = boolOrDefault(decor.showFrame1, true);
  const showFrame2 = boolOrDefault(decor.showFrame2, true);
  const showShelf = boolOrDefault(decor.showShelf, true);
  const showClock = boolOrDefault(decor.showClock, true);

  const frameColor = cssColorOrNull(decor.frameColor) ?? "white";
  const art1Color = cssColorOrNull(decor.art1Color) ?? "#ffd166";
  const art2Color = cssColorOrNull(decor.art2Color) ?? "#a7f3d0";
  const shelfColor = cssColorOrNull(decor.shelfColor) ?? "rgba(0,0,0,0.35)";
  const clockColor = cssColorOrNull(decor.clockColor) ?? "rgba(255,255,255,0.9)";

  root.style.setProperty("--frame", frameColor);
  root.style.setProperty("--art1", art1Color);
  root.style.setProperty("--art2", art2Color);
  root.style.setProperty("--shelf", shelfColor);
  root.style.setProperty("--clock", clockColor);

  frame1El.style.display = showFrame1 ? "" : "none";
  frame2El.style.display = showFrame2 ? "" : "none";
  shelfEl.style.display = showShelf ? "" : "none";
  clockEl.style.display = showClock ? "" : "none";

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
