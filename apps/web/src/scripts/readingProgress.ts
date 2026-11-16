/** Decorative flight effect; scroll position remains the only source of progress. */
export function initializeReadingProgress(header: HTMLElement | null) {
  const track = header?.querySelector<HTMLElement>("[data-reading-track]");
  const rocket = track?.querySelector<HTMLElement>("[data-reading-rocket]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = document.querySelector("[data-space-motion]")?.getAttribute("aria-pressed") === "false";
  let settleTimer: number | undefined;

  function settle() {
    window.clearTimeout(settleTimer);
    settleTimer = undefined;
    if (track) track.dataset.flying = "false";
  }

  function update(fraction: number) {
    if (!track) return;
    const value = Number.isFinite(fraction) ? Math.min(1, Math.max(0, fraction)) : 0;
    track.style.setProperty("--reading-progress", `${value * 100}%`);
    if (rocket) rocket.hidden = false;
  }

  function thrust() {
    if (!track || reducedMotion.matches || paused || document.hidden) return;
    track.dataset.flying = "true";
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(settle, 180);
  }

  window.addEventListener("space-motion-change", (event) => {
    const detail = (event as CustomEvent<{ paused: boolean }>).detail;
    paused = detail.paused;
    if (paused) settle();
  });
  reducedMotion.addEventListener("change", () => { if (reducedMotion.matches) settle(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) settle(); });
  window.addEventListener("pagehide", settle);

  return { update, thrust };
}
