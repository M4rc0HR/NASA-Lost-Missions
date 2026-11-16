import { initializeObservatory } from "./observatory";
import { initializeReadingProgress } from "./readingProgress";

type Language = "en" | "es";
const translations: Record<Language, Record<string, string>> = JSON.parse(document.querySelector("#home-translations")?.textContent || "{}");
const languageButton = document.querySelector<HTMLButtonElement>("#siteLanguage");
let language: Language = "en";
// Keep the existing preference key; a restricted browser must still work.
try { if (localStorage.getItem("lost-missions.language") === "es") language = "es"; } catch {}

function applyLanguage() {
  const copy = translations[language];
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key && copy[key]) element.textContent = copy[key];
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (key && copy[key]) element.setAttribute("aria-label", copy[key]);
  });
  document.querySelectorAll<HTMLImageElement>("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (key && copy[key]) element.alt = copy[key];
  });
  document.documentElement.lang = language;
  document.title = `NASA: Lost Missions · ${copy.archive}`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", copy.meta);
  languageButton?.querySelectorAll<HTMLElement>("[data-lang]").forEach((label) => label.classList.toggle("current-language", label.dataset.lang === language));
  if (languageButton) {
    languageButton.lang = language === "en" ? "es" : "en";
    languageButton.hidden = false;
  }
}
languageButton?.addEventListener("click", () => {
  language = language === "en" ? "es" : "en";
  try { localStorage.setItem("lost-missions.language", language); } catch {}
  applyLanguage();
});
applyLanguage();
window.addEventListener("space-motion-change", applyLanguage);

// Accessible tabs: clicks, arrows, Home and End all select a preview.
// Without JavaScript every mission stays readable and map links still work.
const tabs = [...document.querySelectorAll<HTMLButtonElement>("[data-mission]")];
const panels = [...document.querySelectorAll<HTMLElement>("[data-preview]")];
const tabList = document.querySelector<HTMLElement>(".mission-tabs");
const destinations = [...document.querySelectorAll<HTMLAnchorElement>("[data-destination]")];
function selectMission(selected: HTMLButtonElement) {
  tabs.forEach((tab) => {
    const active = tab === selected;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panels.forEach((panel) => { panel.hidden = panel.dataset.preview !== selected.dataset.mission; });
  const worldDestination = selected.dataset.mission === "apollo" ? "apollo" : "spirit";
  observatory.setWorld(worldDestination === "apollo" ? "moon" : "mars");
  destinations.forEach((pin) => {
    const active = pin.dataset.destination === worldDestination;
    pin.classList.toggle("is-selected", active);
    if (active) pin.setAttribute("aria-current", "true");
    else pin.removeAttribute("aria-current");
  });
}
const observatory = initializeObservatory({
  translate: (key) => translations[language][key] || key,
  onWorldSelect: (world) => {
    const target = tabs.find((tab) => tab.dataset.mission === (world === "moon" ? "apollo" : "spirit"));
    if (target) selectMission(target);
  }
});
panels.forEach((panel) => {
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", `tab-${panel.dataset.preview}`);
  panel.tabIndex = 0;
});
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectMission(tab));
  tab.addEventListener("keydown", (event) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    selectMission(tabs[next]);
  });
});
if (tabList && tabs[0]) {
  selectMission(tabs[0]);
  tabList.hidden = false;
}

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
destinations.forEach((pin) => {
  pin.addEventListener("click", (event) => {
    const target = tabs.find((tab) => tab.dataset.mission === pin.dataset.destination);
    if (!target) return;
    event.preventDefault();
    selectMission(target);
    target.focus({ preventScroll: true });
    document.querySelector("#explore")?.scrollIntoView({ behavior: motionPreference.matches ? "auto" : "smooth", block: "start" });
  });
});

// A small learning activity. It never writes to the playable mission progress.
const lab = document.querySelector<HTMLElement>("#fieldLab");
const choices = [...document.querySelectorAll<HTMLButtonElement>("[data-instrument]")];
const feedback = document.querySelector<HTMLElement>("#labFeedback");
const fieldNote = document.querySelector<HTMLElement>("#fieldNote");
const labRom = document.querySelector<HTMLImageElement>("#labRom");
const resetLab = document.querySelector<HTMLButtonElement>("#resetLab");
if (lab && feedback && fieldNote && labRom && resetLab && choices.length) {
  const showFeedback = (key: string) => {
    feedback.dataset.i18n = key;
    feedback.textContent = translations[language][key];
  };
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const correct = choice.dataset.instrument === "apxs";
      choices.forEach((button) => button.setAttribute("aria-pressed", String(button === choice)));
      lab.dataset.state = correct ? "complete" : "investigating";
      showFeedback(choice.dataset.feedback || "labReady");
      labRom.src = `/assets/rom/poses/${correct ? "success" : "analyzing"}.png`;
      fieldNote.hidden = !correct;
      resetLab.hidden = false;
    });
  });
  resetLab.addEventListener("click", () => {
    choices.forEach((choice) => choice.setAttribute("aria-pressed", "false"));
    lab.dataset.state = "ready";
    fieldNote.hidden = true;
    labRom.src = "/assets/rom/poses/thinking.png";
    showFeedback("labReady");
    resetLab.hidden = true;
    choices[0].focus({ preventScroll: true });
  });
  fieldNote.hidden = true;
  const choiceGroup = lab.querySelector<HTMLElement>(".instrument-choices");
  const feedbackGroup = lab.querySelector<HTMLElement>(".lab-feedback");
  if (choiceGroup) choiceGroup.hidden = false;
  if (feedbackGroup) feedbackGroup.hidden = false;
}

// Keep anchors below the responsive sticky header and indicate reading position.
const header = document.querySelector<HTMLElement>(".header-shell");
const readingProgress = initializeReadingProgress(header);
const navigation = [...document.querySelectorAll<HTMLAnchorElement>(".home-nav nav a")].map((link) => ({ link, section: document.querySelector<HTMLElement>(link.hash) }));
let scrollQueued = false;
function updateNavigation() {
  const headerHeight = header?.offsetHeight || 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  document.documentElement.style.setProperty("--home-header-height", `${headerHeight}px`);
  readingProgress.update(maxScroll > 0 ? window.scrollY / maxScroll : 0);
  header?.classList.toggle("is-scrolled", window.scrollY > 20);
  let activeLink: HTMLAnchorElement | undefined;
  navigation.forEach(({ link, section }) => {
    if (section && section.getBoundingClientRect().top <= headerHeight + 90) activeLink = link;
  });
  navigation.forEach(({ link }) => {
    if (link === activeLink) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollQueued = false;
}
function queueNavigationUpdate() {
  if (!scrollQueued) {
    scrollQueued = true;
    window.requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener("scroll", () => {
  readingProgress.thrust();
  queueNavigationUpdate();
}, { passive: true });
window.addEventListener("resize", queueNavigationUpdate, { passive: true });
if (header && "ResizeObserver" in window) {
  const layoutObserver = new ResizeObserver(queueNavigationUpdate);
  layoutObserver.observe(header);
  const main = document.querySelector("main");
  if (main) layoutObserver.observe(main);
}
updateNavigation();
