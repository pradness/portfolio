const bootScreen = document.getElementById("bootScreen");
const bootOutput = document.getElementById("bootOutput");
const currentSectionEl = document.getElementById("currentSection");
const localTimeEl = document.getElementById("localTime");
const navTabs = [...document.querySelectorAll(".nav-tab[data-section]")];
const brandBtn = document.querySelector(".brand[data-section]");
const themeMenu = document.getElementById("themeMenu");
const themeDropdown = document.querySelector(".theme-dropdown");
const actionBtns = [...document.querySelectorAll(".btn-action[data-section]")];
const windows = [...document.querySelectorAll(".terminal-window")];
const windowMap = new Map(windows.map((w) => [w.id, w]));
const THEME_KEY = "portfolio-theme";
const THEME_SOURCE = "./themes.json";

const bootLines = [
  "[  OK  ] Initializing terminal workspace",
  "[  OK  ] Loading portfolio modules",
  "[  OK  ] Applying theme profile",
  "[ DONE ] Portfolio ready — welcome",
];

function runBoot() {
  let i = 0;
  const step = () => {
    if (i < bootLines.length) {
      const p = document.createElement("p");
      p.className = "boot-line";
      p.textContent = bootLines[i++];
      bootOutput.appendChild(p);
      setTimeout(step, 480);
    } else {
      setTimeout(() => {
        bootScreen.classList.add("hidden");
        document.body.classList.add("loaded");
      }, 480);
    }
  };
  step();
}

function tick() {
  localTimeEl.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function updateNav(id) {
  navTabs.forEach((t) => {
    const active = t.dataset.section === id;
    t.classList.toggle("active", active);
    t.setAttribute("aria-selected", String(active));
  });
}

function setWindow(id, opts = {}) {
  if (!windowMap.has(id)) return;
  currentSectionEl.textContent = id;
  updateNav(id);
  windows.forEach((w) => {
    const on = w.id === id;
    w.classList.toggle("is-active", on);
    w.setAttribute("aria-hidden", String(!on));
  });
  if (!opts.skipHash) history.replaceState(null, "", `#${id}`);
}

function hashSection() {
  const h = location.hash.replace("#", "").trim();
  return windowMap.has(h) ? h : "home";
}

function toCssVarName(name) {
  return `--${name.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
}

function applyTheme(theme) {
  const {
    id,
    bg,
    text,
    textSoft,
    textDim,
    border,
    accent,
    accentGreen,
    muted,
    borders = {},
  } = theme;
  const root = document.body;
  root.dataset.theme = id;
  root.style.setProperty("--bg", bg);
  root.style.setProperty("--text", text);
  root.style.setProperty("--text-soft", textSoft);
  root.style.setProperty("--text-dim", textDim);
  root.style.setProperty("--border", border);
  root.style.setProperty("--accent", accent);
  root.style.setProperty("--accent-green", accentGreen);
  root.style.setProperty("--muted", muted);
  root.style.setProperty("--topbar-border-color", borders.topbar || border);
  root.style.setProperty(
    "--statusbar-border-color",
    borders.statusbar || border,
  );
  root.style.setProperty(
    "--hero-outer-border-color",
    borders.heroOuter || borders.hero || border,
  );
  root.style.setProperty(
    "--hero-inner-border-color",
    borders.heroInner || borders.hero || border,
  );
  root.style.setProperty(
    "--sidebar-outer-border-color",
    borders.sidebarOuter || borders.sidebar || border,
  );
  root.style.setProperty(
    "--sidebar-inner-border-color",
    borders.sidebarInner || borders.sidebar || border,
  );
  root.style.setProperty(
    "--stats-outer-border-color",
    borders.statsOuter || borders.stats || border,
  );
  root.style.setProperty(
    "--stats-inner-border-color",
    borders.statsInner || borders.stats || border,
  );
  root.style.setProperty(
    "--about-outer-border-color",
    borders.aboutOuter || border,
  );
  root.style.setProperty(
    "--about-inner-border-color",
    borders.aboutInner || border,
  );
  root.style.setProperty(
    "--skills-outer-border-color",
    borders.skillsOuter || border,
  );
  root.style.setProperty(
    "--skills-inner-border-color",
    borders.skillsInner || border,
  );
  root.style.setProperty(
    "--projects-outer-border-color",
    borders.projectsOuter || border,
  );
  root.style.setProperty(
    "--projects-inner-border-color",
    borders.projectsInner || border,
  );
  root.style.setProperty(
    "--contact-outer-border-color",
    borders.contactOuter || border,
  );
  root.style.setProperty(
    "--contact-inner-border-color",
    borders.contactInner || border,
  );
  localStorage.setItem(THEME_KEY, id);
  document.querySelectorAll("[data-theme-id]").forEach((b) => {
    b.classList.toggle("active", b.dataset.themeId === id);
  });
}

async function loadThemes() {
  const response = await fetch(THEME_SOURCE);
  if (!response.ok)
    throw new Error(`Failed to load ${THEME_SOURCE}: ${response.status}`);
  return response.json();
}

function buildThemeMenu(themes) {
  themeMenu.replaceChildren();
  themes.forEach((theme) => {
    const button = document.createElement("button");
    button.className = "theme-btn";
    button.type = "button";
    button.dataset.themeId = theme.id;
    button.textContent = theme.name;
    button.addEventListener("click", () => {
      applyTheme(theme);
      themeDropdown?.removeAttribute("open");
    });
    themeMenu.appendChild(button);
  });
}

(async function initThemes() {
  const themes = await loadThemes();
  buildThemeMenu(themes);
  const saved =
    localStorage.getItem(THEME_KEY) ||
    document.body.dataset.theme ||
    themes[0]?.id;
  const active = themes.find((theme) => theme.id === saved) || themes[0];
  if (active) applyTheme(active);
})();

navTabs.forEach((t) =>
  t.addEventListener("click", () => setWindow(t.dataset.section)),
);
if (brandBtn) brandBtn.addEventListener("click", () => setWindow("home"));
actionBtns.forEach((b) =>
  b.addEventListener("click", () => setWindow(b.dataset.section)),
);
window.addEventListener("hashchange", () =>
  setWindow(hashSection(), { skipHash: true }),
);

runBoot();
tick();
setInterval(tick, 1000);
setWindow(hashSection(), { skipHash: true });
