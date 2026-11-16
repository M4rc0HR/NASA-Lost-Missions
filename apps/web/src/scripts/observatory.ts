export type SurfaceWorld = "mars" | "moon";

type ObservatoryOptions = {
  translate: (key: string) => string;
  onWorldSelect: (world: SurfaceWorld) => void;
};

/** A fictional scene for the homepage, independent of playable mission progress. */
export function initializeObservatory({ translate, onWorldSelect }: ObservatoryOptions) {
  const scene = document.querySelector<HTMLElement>("[data-observatory]");
  const controls = [...(scene?.querySelectorAll<HTMLButtonElement>("[data-scene-world]") || [])];
  const scanButton = scene?.querySelector<HTMLButtonElement>("[data-rom-scan]");
  const robot = scene?.querySelector<HTMLImageElement>("[data-scene-rom]");
  const status = scene?.querySelector<HTMLElement>("[data-scene-status]");
  const location = scene?.querySelector<HTMLElement>("[data-scene-location]");
  const discoveries = scene?.querySelector<HTMLElement>("#sceneDiscoveries");
  let currentWorld: SurfaceWorld = "mars";
  let scanned = false;

  function setScanned(active: boolean) {
    scanned = active;
    if (scene) scene.dataset.scanned = String(active);
    scanButton?.setAttribute("aria-expanded", String(active));
    if (robot) robot.src = `/assets/rom/poses/${active ? "scanning" : "greeting"}.png`;
    if (discoveries) discoveries.hidden = !active;
    if (status) {
      const key = active ? "sceneScanning" : "sceneReady";
      status.dataset.i18n = key;
      status.textContent = translate(key);
    }
  }

  function setWorld(world: SurfaceWorld) {
    if (!scene) return;
    if (world !== currentWorld) setScanned(false);
    currentWorld = world;
    scene.dataset.world = world;
    controls.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.sceneWorld === world)));
    if (location) {
      const key = world === "moon" ? "sceneMoon" : "sceneMars";
      location.dataset.i18n = key;
      location.textContent = translate(key);
    }
  }

  controls.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => {
      const world = button.dataset.sceneWorld;
      if (world !== "mars" && world !== "moon") return;
      setWorld(world);
      onWorldSelect(world);
    });
  });
  if (scanButton) {
    scanButton.disabled = false;
    scanButton.addEventListener("click", () => setScanned(!scanned));
  }
  setWorld("mars");
  return { setWorld };
}
