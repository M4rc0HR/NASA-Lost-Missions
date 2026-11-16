import { createMarsTerrainRenderer } from "./marsTerrain.js";

export function startSpiritRpg(root) {
  const baseMission = JSON.parse(root.dataset.mission);
  let mission = baseMission;
  const spanishMission = {
    spirit: {
      controls_tip: "Mover: flechas / WASD · Interactuar: A, Z, E, Enter o Espacio",
      entity_names: { npc: "DRA. VEGA", rov: "SPIRIT", case: "KIT DE HERRAMIENTAS", smp: "MUESTRA DE CAMPO", dish: "ANTENA DE ENLACE" },
      hardware: [{
        id: "spirit-rover",
        name: "Spirit (MER-A)",
        type: "Rover de exploración de Marte",
        what_it_was: "Un geólogo robótico alimentado por energía solar, del tamaño aproximado de un carrito de golf.",
        why_sent: "Para estudiar rocas y suelo en el cráter Gusev en busca de pistas sobre el agua y si Marte antiguo pudo haber sido habitable.",
        instrument: "Herramienta de abrasión de rocas (RAT) y espectrómetro de rayos X de partículas alfa (APXS)",
        discovery: "Spirit encontró suelo rico en sílice cerca de Home Plate, evidencia de un entorno moldeado por agua o vapor.",
        why_left: "Una rueda se atascó en 2009. Spirit siguió funcionando como plataforma científica estacionaria antes de perder contacto durante el invierno marciano.",
        what_remains: "El rover permanece en su ubicación final en el cráter Gusev, junto con sus instrumentos y su sistema de energía.",
        current_status: {
          location: "Cráter Gusev, Marte",
          status: "Inactivo; misión completada",
          last_event: "Última comunicación: 22 de marzo de 2010. NASA terminó los intentos de recuperación y completó la misión: 25 de mayo de 2011.",
          still_in_use: "No"
        }
      }],
      gallery: [
        { id: "gusev-view", title: "Gusev visto por Spirit", kid_text: "Este es terreno real de Marte visto por Spirit. El rover no solo se movía: buscaba pistas en rocas y suelo." },
        { id: "spirit-self", title: "Autorretrato de Spirit", kid_text: "Spirit usó su cámara para crear un gran panorama. Nos ayuda a imaginar dónde trabajó el rover." },
        { id: "bright-soil", title: "Una rueda descubre una pista", kid_text: "La rueda atascada de Spirit raspó el suelo y dejó al descubierto sílice brillante, casi puro. Los científicos lo relacionaron con agua y posibles fuentes termales o vapor hace mucho tiempo." },
        { id: "landing-site", title: "Sitio de aterrizaje de Spirit desde órbita", kid_text: "Una cámara del Mars Reconnaissance Orbiter pudo ver desde el espacio la zona de aterrizaje del rover, incluidas huellas y puntos de referencia cercanos." }
      ],
      sample_facts: [
        { text: "La RAT pulió superficies de roca para que los instrumentos pudieran examinar material fresco debajo." },
        { text: "El Mini-TES identificó minerales a distancia mediante mediciones infrarrojas." },
        { text: "El APXS midió la composición química de rocas y suelo." }
      ],
      dialogue: { intro_npc_1: "Bienvenido, R.O.M. Tu escáner está listo. Esta misión comienza observando una máquina que se quedó atrás.", intro_npc_2: "Encuentra a Spirit, estudia sus herramientas científicas y reconstruye la historia usando evidencia.", npc_hint: "Busca herramientas, muestras brillantes y suelo extraño. Cada objeto revela una parte de la historia.", npc_first_hint: "Spirit está al norte. Camina junto a él y presiona A.", rover_before_npc: "Un rover silencioso descansa en el polvo. Quizás la Dra. Vega pueda ayudarte a entenderlo.", rover_intro: "Spirit (MER-A) fue lanzado el 10 de junio de 2003 y aterrizó en el cráter Gusev en enero de 2004.", rover_after_id: "Correcto. Spirit duró mucho más que su misión planeada de 90 soles.", rover_waiting: "Spirit sigue en silencio. Necesitas más pistas: herramientas, muestras y un desafío ambiental.", case_locked: "Un estuche naranja. Primero identifica el rover para saber para qué sirven las herramientas.", case_open: "Encontraste el kit APXS. Nueva habilidad: análisis químico.", case_fact: "Los instrumentos de Spirit incluían APXS, Mössbauer, el generador de imágenes microscópicas, RAT, Mini-TES y cámaras.", dish: "La antena de enlace recuerda que una misión también necesita una red para recibir y proteger sus datos.", soil_locked: "Suelo brillante. Necesitas una herramienta científica antes de analizarlo.", soil_done: "Ya registraste esta pista del suelo.", soil_fact: "Spirit encontró suelo rico en sílice cerca de Home Plate. NASA lo relaciona con agua o vapor en el pasado de Marte.", soil_good: "Buena observación. Esta pista científica ahora forma parte del misterio.", nothing: "No hay nada que inspeccionar aquí. Prueba con personas, máquinas, herramientas, muestras o suelo brillante." },
      questions: { mission_length: { prompt: "La misión principal de Spirit estaba planeada para durar:", options: ["9 soles", "90 soles", "900 soles"], correct: 1 }, silica: { prompt: "El suelo rico en sílice puede indicar:", options: ["Un impacto reciente", "Agua caliente o vapor en el pasado", "La sombra del rover"], correct: 1 }, storm: { prompt: "Como equipo de misión, ¿qué priorizas?", options: ["Seguir explorando", "Ignorar el polvo", "Reducir actividad y ahorrar energía"], correct: 2 }, final: { prompt: "Reconstruye la historia final de Spirit:", options: ["Un meteorito lo destruyó", "Quedó atascado, se volvió una plataforma científica y no recuperó contacto al bajar la energía durante el invierno", "NASA lo apagó para lanzar otro rover"], correct: 1 } },
      final_clues: [{ kind: "game_event", text: "PISTA DE SIMULACIÓN: La energía solar disminuía mientras se acercaba el invierno marciano. Esta simulación no cambia el final histórico de Spirit." }, { kind: "nasa_data", text: "PISTA #02: NASA convirtió a Spirit en una plataforma científica estacionaria después de que fallaran los intentos de moverlo.", source_id: "nasa_spirit" }, { kind: "nasa_data", text: "PISTA #03: Spirit no se comunicó después del 22 de marzo de 2010; los intentos finales terminaron el 25 de mayo de 2011.", source_id: "nasa_spirit" }],
      storm: { start: "Simulación: el polvo y el invierno reducen la energía disponible.", fact: "NASA informó que Spirit dejó de comunicarse mientras se acercaba el invierno marciano y bajaba la energía solar.", success: "SIMULACIÓN COMPLETA: protegiste el presupuesto de energía. En la historia real, Spirit perdió contacto mientras se acercaba el invierno." },
      ending: { title: "Descubriste la historia de Spirit.", codex: "Códice espacial: Spirit ✓", tagline: "No pudo seguir avanzando, pero su historia no quedó atrás.", codex_text: "Spirit fue planeado para 90 soles, operó durante más de seis años, se convirtió en una plataforma científica estacionaria y ayudó a revelar ambientes marcianos relacionados con agua y posible actividad hidrotermal." }
    },
    opportunity: {
      controls_tip: "Mover: flechas / WASD · Interactuar: A, Z, E, Enter o Espacio",
      entity_names: { npc: "DRA. VEGA", rov: "OPPORTUNITY", sorter: "CLASIFICADOR GEOLÓGICO", sphere: "MUESTRA DE MORAS AZULES", solar: "ESTACIÓN DE PANELES SOLARES", case: "CLASIFICADOR GEOLÓGICO", smp: "MUESTRA DE MORAS AZULES", dish: "ESTACIÓN DE PANELES SOLARES" },
      hardware: [{
        id: "opportunity-rover",
        name: "Opportunity (MER-B)",
        type: "Rover de exploración de Marte",
        what_it_was: "Un geólogo robótico alimentado por energía solar, equipado con cámaras, un brazo robótico e instrumentos para analizar rocas.",
        why_sent: "Para estudiar rocas y suelo marcianos en busca de evidencia de agua en el pasado y de entornos que pudieron haber sido habitables.",
        instrument: "Cámara panorámica, APXS, generador de imágenes microscópicas y herramienta de abrasión de rocas (RAT)",
        discovery: "Opportunity encontró esferas ricas en hematita, apodadas moras azules, y otras evidencias de que el agua líquida moldeó el Marte antiguo.",
        why_left: "Una tormenta de polvo a escala planetaria redujo la luz solar que llegaba a sus paneles. Tras meses de intentos de recuperación, NASA dio por terminada la misión en 2019.",
        what_remains: "El rover permanece en Perseverance Valley, en el borde del cráter Endeavour. Sus instrumentos y estructura siguen allí; las imágenes y datos que envió se conservan en los archivos de NASA en la Tierra.",
        current_status: {
          location: "Perseverance Valley, borde del cráter Endeavour, Marte",
          status: "Inactivo; misión completada",
          last_event: "Última comunicación: 10 de junio de 2018. NASA declaró la misión completa: 13 de febrero de 2019.",
          still_in_use: "No"
        }
      }],
      gallery: [
        { id: "meridiani-view", title: "Meridiani visto por Opportunity", kid_text: "Este es terreno real de Marte visto por Opportunity. El rover no solo se movía: buscaba pistas en rocas y suelo." },
        { id: "opportunity-self", title: "Autorretrato de Opportunity", kid_text: "Opportunity construyó este autorretrato a partir de muchas imágenes de cámara mientras trabajaba en Marte, mostrando una vista real del rover en el terreno." },
        { id: "blueberries", title: "“Moras azules” marcianas en el suelo", kid_text: "Opportunity encontró esferas redondas ricas en hierro, apodadas moras azules. Los científicos las estudiaron como pistas de que el agua líquida moldeó Meridiani Planum." },
        { id: "landing-site", title: "Equipo de aterrizaje en el cráter Eagle", kid_text: "Desde órbita, el Mars Reconnaissance Orbiter detectó el equipo de aterrizaje de Opportunity en el cráter Eagle, donde comenzó la misión en Marte." },
        { id: "final-traverse", title: "Mapa del recorrido final de Opportunity", kid_text: "Este mapa muestra la larga ruta que recorrió Opportunity por Marte y dónde trabajaba en Perseverance Valley cuando se perdió el contacto." },
        { id: "last-message", title: "El último mensaje de Opportunity", kid_text: "Esta imagen ruidosa e incompleta, tomada el 10 de junio de 2018, fue el último dato que Opportunity envió durante la tormenta global de polvo." }
      ],
      sample_facts: [
        { text: "La herramienta RAT de Opportunity cepilló superficies de roca para que sus instrumentos examinaran material fresco debajo." },
        { text: "El Mini-TES de Opportunity identificó minerales a distancia mediante mediciones infrarrojas." },
        { text: "El APXS de Opportunity midió la composición química de rocas y suelo." },
        { text: "El generador de imágenes microscópicas ayudó a Opportunity a inspeccionar texturas diminutas en rocas y suelo marcianos." },
        { text: "Opportunity usó sus cámaras para crear panoramas y documentar los lugares que exploró." }
      ],
      dialogue: { intro_npc_1: "Bienvenido, R.O.M. Meridiani Planum está lleno de piedras redondas que parecen pequeñas moras azules.", intro_npc_2: "Encuentra a Opportunity, clasifica las pistas minerales y descubre por qué este lugar se relaciona con agua antigua.", npc_hint: "Busca el rover, el clasificador geológico, las esferas oscuras y la estación solar.", npc_first_hint: "Opportunity está al noreste. Camina junto a él y presiona A.", rover_before_npc: "Un rover silencioso descansa en el polvo. Quizás la Dra. Vega pueda ayudarte a entenderlo.", rover_intro: "Opportunity (MER-B) fue lanzado el 7 de julio de 2003 y aterrizó en Meridiani Planum el 25 de enero de 2004 (UTC; 24 de enero de 2004 PST).", rover_after_id: "Correcto. Opportunity duró casi 15 años, mucho más que sus 90 soles planeados.", rover_waiting: "Opportunity sigue en silencio. Necesitas evidencia mineral y la pista final de la tormenta.", case_locked: "El clasificador geológico está apagado. Primero identifica el rover para entender las muestras.", case_open: "Encontraste el clasificador geológico. Nueva habilidad: clasificación mineral.", case_fact: "Opportunity usó APXS, el generador de imágenes microscópicas y RAT para estudiar rocas y suelo.", dish: "Esta estación solar simula el problema de ingeniería. Ayuda a entender por qué la señal de Opportunity se debilitó.", panel: "SIMULACIÓN: durante una tormenta global llegaba menos luz a los paneles solares. El final histórico del rover no puede cambiarse aquí.", soil_locked: "Un campo de piedras redondas. Necesitas el clasificador antes de estudiar las muestras.", soil_done: "Ya registraste esta pista mineral.", soil_fact: "Opportunity encontró esferas ricas en hematita, apodadas moras azules. Son pistas de que el agua líquida formó parte del pasado de Marte.", soil_good: "Buena observación. La pista mineral ya está en tu registro.", nothing: "No hay nada que inspeccionar aquí. Prueba con personas, máquinas, herramientas, muestras o la estación solar." },
      questions: { mission_length: { prompt: "¿Qué pista mineral hizo famoso a Meridiani Planum?", options: ["Moras azules ricas en hematita", "Cristales de hielo", "Nieve de azufre brillante"], correct: 0 }, silica: { prompt: "Las moras azules ricas en hematita pueden indicar:", options: ["Un impacto reciente", "Agua líquida en el pasado de Marte", "La sombra del rover"], correct: 1 }, storm: { prompt: "Como equipo de misión, ¿qué priorizas?", options: ["Seguir explorando", "Ignorar el polvo", "Reducir actividad y ahorrar energía"], correct: 2 }, final: { prompt: "Reconstruye la historia final de Opportunity:", options: ["Un meteorito lo destruyó", "Una tormenta global redujo la luz, bajó la energía y el rover dejó de comunicarse", "NASA lo apagó para lanzar otro rover"], correct: 1 } },
      final_clues: [{ kind: "game_event", text: "PISTA DE SIMULACIÓN: una tormenta marciana oscureció el cielo y redujo la luz que llegaba a los paneles de Opportunity." }, { kind: "nasa_data", text: "PISTA #02: los sistemas solares de Opportunity tenían menos energía disponible mientras continuaba la tormenta.", source_id: "nasa_opportunity" }, { kind: "nasa_data", text: "PISTA #03: la última señal de Opportunity se recibió el 10 de junio de 2018; NASA declaró terminada la misión el 13 de febrero de 2019.", source_id: "jpl_complete" }],
      storm: { start: "Simulación: una tormenta de polvo oscurece el cielo y baja la energía solar.", fact: "NASA informó que una tormenta global de Marte redujo la energía disponible para los paneles solares de Opportunity.", success: "SIMULACIÓN COMPLETA: exploraste el problema energético. En la historia real, Opportunity dejó de comunicarse durante la tormenta." },
      ending: { title: "Descubriste la historia de Opportunity.", codex: "Códice espacial: Opportunity ✓", tagline: "Su último mensaje fue débil, pero su legado sigue transmitiendo.", codex_text: "Opportunity fue planeado para 90 soles, operó casi 15 años, recorrió 45.16 kilómetros y ayudó a demostrar que el agua líquida transformó Marte en el pasado. Su última señal fue una imagen oscura e incompleta durante una tormenta global." }
    }
  };
  const localizedMission = (language) => language === "es" ? mergeMission(baseMission, spanishMission[baseMission.id]) : baseMission;
  const progressKey = "lost-missions.completed";
  const completedMissions = () => {
    try { return JSON.parse(localStorage.getItem(progressKey) || "[]"); } catch { return []; }
  };
  if (mission.unlock_after && !completedMissions().includes(mission.unlock_after)) {
    window.location.replace("/missions");
    return;
  }
  const $ = (id) => root.querySelector(`#${id}`);
  const canvas = $("c");
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
  ctx.scale(3, 3);
  const box = $("box");
  const cinematic = $("cinematic");
  const photoPopup = $("photoPopup");
  const photoClose = $("photoClose");
  const musicButton = $("musicBtn");
  const languageButton = $("languageBtn");
  const stormGame = $("stormGame");
  const stormIntro = $("stormIntro");
  const stormEnergy = $("stormEnergy");
  const stormSystems = $("stormSystems");
  const stormRound = $("stormRound");
  const stormFeedback = $("stormFeedback");
  const stormAction = $("stormAction");
  const sampleGame = $("sampleGame");
  const sampleGrid = $("sampleGrid");
  const sampleProgress = $("sampleProgress");
  const sampleFeedback = $("sampleFeedback");
  const scanGame = $("scanGame");
  const scanCursor = $("scanCursor");
  const scanQuality = $("scanQuality");
  const scanAction = $("scanAction");
  const scanFeedback = $("scanFeedback");
  const wireGame = $("wireGame");
  const wireBoard = $("wireBoard");
  const wireProgress = $("wireProgress");
  const wireFeedback = $("wireFeedback");
  const questionPopup = $("questionPopup");
  const questionPrompt = $("questionPrompt");
  const questionOptions = $("questionOptions");
  const questionFeedback = $("questionFeedback");
  const gameOver = $("gameOver");
  const signalGame = document.createElement("div");
  signalGame.className = "signal-game";
  signalGame.setAttribute("role", "dialog");
  signalGame.setAttribute("aria-modal", "true");
  signalGame.innerHTML = '<div class="signal-card"><span class="storm-kicker">ARCHIVE SIMULATION · COMMUNICATION</span><h2>REBUILD THE LAST PACKET</h2><p>Put the telemetry packets in the order needed to reconstruct the rover’s final evidence. This is a simulation of data recovery; it does not change the historical ending.</p><div class="signal-packets"></div><p class="signal-feedback">Choose the first packet.</p></div>';
  root.querySelector("#game")?.append(signalGame);
  const signalPackets = signalGame.querySelector(".signal-packets");
  const signalFeedback = signalGame.querySelector(".signal-feedback");
  const storyNotice = $("storyNotice");
  const storyNoticeTag = $("storyNoticeTag");
  const storyNoticeTitle = $("storyNoticeTitle");
  const storyNoticeText = $("storyNoticeText");
  const logButton = document.createElement("button");
  logButton.className = "btn mission-log-button";
  logButton.type = "button";
  logButton.textContent = "Mission log";
  const logPanel = document.createElement("aside");
  logPanel.className = "mission-log-panel rom-memory-console";
  logPanel.setAttribute("aria-live", "polite");
  logPanel.innerHTML = '<div class="mission-log-head"><div><span class="eyebrow">MISSION LOG</span><h2>Reconstruct the story</h2></div><button class="btn mission-log-close" type="button" aria-label="Close mission log">×</button></div><p class="mission-log-intro">Collect evidence to understand what the mission was built to do, what it discovered and what happened at the end.</p><div class="mission-log-tabs"><button class="log-tab active" data-log-tab="story" type="button">Story</button><button class="log-tab" data-log-tab="hardware" type="button">Hardware</button><button class="log-tab" data-log-tab="sources" type="button">Sources</button></div><div class="mission-log-list"></div>';
  logPanel.querySelector(".eyebrow").textContent = "R.O.M. MEMORY LINK";
  logPanel.querySelector(".mission-log-head h2").textContent = "Mission memory";
  root.querySelector("#playerCard")?.after(logButton, logPanel);
  const logList = logPanel.querySelector(".mission-log-list");
  let logTab = "story";
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  let audioContext = null, musicTimer = null, musicStep = 0, musicOn = false, sfxOn = true;
  let photoResolve = null;
  const unlockedGalleryIds = new Set();
  let currentLanguage = localStorage.getItem("lost-missions.language") || "en";
  const tx = (en, es) => currentLanguage === "es" ? es : en;
  const src = (id) => mission.sources?.[id]?.url ?? "";
  const languageLabels = {
    en: { codex: "Open Codex", music: "♫ Music: ready", archive: "FIELD ARCHIVE", data: "NASA DATA", event: "GAME EVENT", simulation: "ARCHIVE SIMULATION" },
    es: { codex: "Abrir códice", music: "♫ Música: lista", archive: "ARCHIVO DE CAMPO", data: "DATOS NASA", event: "EVENTO DEL JUEGO", simulation: "SIMULACIÓN DE ARCHIVO" }
  };
  function applyStaticLanguage() {
    const es = currentLanguage === "es";
    const set = (selector, value, html = false) => { const node = root.querySelector(selector); if (!node) return; if (html) node.innerHTML = value; else node.textContent = value; };
    set(".scene-label span", es ? "MAPA DE CAMPO" : "FIELD MAP");
    set(".scene-label small", es ? "Sol 000 · Señal perdida" : "Sol 000 · Signal lost");
    set("#archiveLabel", es ? "ARCHIVO DE CAMPO / 2040" : "FIELD ARCHIVE / 2040");
    set("#fieldUnitLabel", es ? "UNIDAD DE CAMPO · SCN-01" : "FIELD UNIT · SCN-01");
    set("#signalLabel", es ? "SEÑAL" : "SIGNAL");
    set("#energyLabel", es ? "ENERGÍA" : "ENERGY");
    set("#dataLabel", es ? "DATOS" : "DATA");
    set(".environment-card .card-kicker", es ? "ESTADO DEL CAMPO" : "FIELD STATUS");
    set("#playerRole", es ? "Robot de investigación de campo" : "Field Research Robot");
    set(".briefing-copy h2", es ? "¡Bienvenido a Marte, explorador!" : "Welcome to Mars, explorer!");
    set("#briefingText", es ? `${mission.rover_name} te espera en ${mission.location.split(" · ")[0]}. Mueve a tu robot, sigue el marcador luminoso e investiga los objetos que encuentres.` : `${mission.rover_name} is waiting in ${mission.location.split(" · ")[0]}. Move your robot, follow the glowing marker and investigate the objects you find.`);
    set("#stepMove", es ? "Mover" : "Move");
    set("#stepFind", es ? "Encontrar" : "Find");
    set("#stepDiscover", es ? "Descubrir" : "Discover");
    set(".cinematic-start", es ? "Iniciar misión →" : "Start mission →");
    set(".scan-action", es ? "BLOQUEAR SEÑAL" : "LOCK SIGNAL");
    set("#stormTitle", es ? "PROTEGE LA ENERGÍA" : "PROTECT THE POWER");
    set("#stormIntro", es ? (mission.id === "opportunity" ? "El polvo cubre los paneles solares de Opportunity. Limpia cada sección para recuperar la señal." : "El polvo bloquea la luz solar. Apaga tres sistemas no esenciales y mantén encendidos el calentador y la radio.") : (mission.id === "opportunity" ? "Dust is covering Opportunity's solar panels. Clean every panel section to recover the signal." : "Dust is blocking sunlight. Turn off three non-essential systems and keep the heater and radio running."));
    set("#stormFeedback", es ? "Toca un sistema para apagarlo. Los sistemas esenciales no se pueden apagar." : "Tap a system to switch it off. Essential systems cannot be turned off.");
    set("#stormAction", es ? "ACTIVAR MODO SEGURO" : "ACTIVATE SAFE MODE");
    set("#sampleTitle", es ? (mission.id === "opportunity" ? "CLASIFICA LAS MORAS MARCIANAS" : "CLASIFICA LAS MUESTRAS DE ROCA") : (mission.id === "opportunity" ? "SORT THE MARTIAN BLUEBERRIES" : "SORT THE ROCK SAMPLES"));
    set("#sampleIntro", es ? (mission.id === "opportunity" ? "Selecciona las pistas oscuras, redondas y ricas en hematita entre los granos de la superficie." : "Selecciona las muestras marcadas para registrar el lugar.") : (mission.id === "opportunity" ? "Select the dark, round hematite clues among the surface grains." : "Select the marked samples to catalogue the field."));
    set("#sampleFeedback", es ? (mission.id === "opportunity" ? "Busca las muestras redondas y azul oscuro." : "Elige las muestras destacadas por el escáner.") : (mission.id === "opportunity" ? "Look for the round, dark-blue samples." : "Choose the samples highlighted by the scanner."));
    set("#scanTitle", es ? `BLOQUEA LA SEÑAL DE ${mission.rover_name}` : `LOCK ${mission.rover_name}'S SIGNAL`);
    set("#scanIntro", es ? `R.O.M. debe alinear su escáner con la débil transmisión de ${mission.rover_name}. Mueve el cursor a la zona cyan y presiona Enter o Espacio.` : `R.O.M. must align its scanner with ${mission.rover_name}'s weak transmission. Move the cursor into the cyan zone and press Enter or Space.`);
    set("#scanQualityLabel", es ? "CALIDAD DEL ESCANEO" : "SCAN QUALITY");
    set("#wireTitle", es ? "CONECTA LOS CABLES DEL SENSOR" : "CONNECT THE SENSOR WIRES");
    set("#wireIntro", es ? "Une los terminales de colores para activar el APXS." : "Match the colored terminals to bring the APXS online.");
    set("#wireConnections", es ? "CONEXIONES" : "CONNECTIONS");
    set("#wireFeedback", es ? "Elige un terminal de color." : "Choose a colored terminal.");
    set("#stormPowerLabel", es ? "RESERVA DE ENERGÍA" : "POWER RESERVE");
    set("#stormSystemsLabel", es ? "SISTEMAS SEGUROS" : "SYSTEMS SAFE");
    set("#gameOverTitle", es ? "ENERGÍA AGOTADA" : "ENERGY DEPLETED");
    set("#gameOverRestart", es ? "REINICIAR MISIÓN" : "RESTART MISSION");
    set("#questionKicker", es ? "VERIFICACIÓN DE R.O.M." : "R.O.M. KNOWLEDGE CHECK");
    updatePhotoPopup();
    set("#closeCodex", es ? "Cerrar" : "Close");
    set("#tip", mission.controls_tip || (es ? "Mover: flechas / WASD · Interactuar: A, Z, E, Enter o Espacio" : "Move: arrows / WASD · Interact: A, Z, E, Enter or Space"));
    const codexTop = root.querySelector(".codex-top b");
    if (codexTop) codexTop.textContent = `${es ? "CÓDICE ESPACIAL" : "SPACE CODEX"} · ${es ? "MARTE" : "MARS"} · ${mission.rover_name}`;
    renderCodexHardware();
    renderGallery();
    set("#codexLegend", es ? "<b>DATOS NASA</b> significa información basada en fuentes de la misión. <b>SIMULACIÓN DE ARCHIVO</b> significa una reconstrucción interactiva. <b>EVENTO DEL JUEGO</b> significa un marco ficticio." : "<b>NASA DATA</b> means sourced mission information. <b>ARCHIVE SIMULATION</b> means an interactive reconstruction. <b>GAME EVENT</b> means fictional framing.", true);
    root.querySelectorAll(".storm-kicker").forEach((node) => {
      const value = node.textContent || "";
      if (value.includes("ROBOT TOOL")) node.textContent = es ? (value.includes("POWER") || value.includes("SUPERVIVAL") ? "HERRAMIENTA DE ROBOT · SUPERVIVENCIA ENERGÉTICA" : value.includes("GEOLOGY") ? "HERRAMIENTA DE ROBOT · CLASIFICADOR GEOLÓGICO" : value.includes("SIGNAL") ? "HERRAMIENTA DE ROBOT · ESCÁNER DE SEÑAL" : "HERRAMIENTA DE ROBOT · MANTENIMIENTO APXS") : value;
      else if (value.includes("KNOWLEDGE CHECK")) node.textContent = es ? "VERIFICACIÓN DE CONOCIMIENTO DE R.O.M." : "R.O.M. KNOWLEDGE CHECK";
    });
    const signalTitle = signalGame.querySelector("h2");
    const signalKicker = signalGame.querySelector(".storm-kicker");
    const signalCopy = signalGame.querySelector(".signal-card > p");
    if (signalKicker) signalKicker.textContent = es ? "SIMULACIÓN DE ARCHIVO · COMUNICACIÓN" : "ARCHIVE SIMULATION · COMMUNICATION";
    if (signalTitle) signalTitle.textContent = es ? "RECONSTRUYE EL ÚLTIMO PAQUETE" : "REBUILD THE LAST PACKET";
    if (signalCopy) signalCopy.textContent = es ? "Ordena los paquetes de telemetría para reconstruir la última evidencia del rover. Es una simulación de recuperación de datos; no cambia el final histórico." : "Put the telemetry packets in the order needed to reconstruct the rover’s final evidence. This is a simulation of data recovery; it does not change the historical ending.";
    set("#questionTitle", es ? "Pregunta de la misión" : "Mission question");
    root.querySelectorAll(".briefing-copy .eyebrow, .game-over-card .eyebrow").forEach((node) => { node.textContent = es ? "R.O.M. · BRIEFING DE MISIÓN" : "R.O.M. · MISSION BRIEFING"; });
    logButton.textContent = es ? "Bitácora" : "Mission log";
    const logTitle = logPanel.querySelector(".mission-log-head h2");
    const logIntro = logPanel.querySelector(".mission-log-intro");
    if (logTitle) logTitle.textContent = es ? "Reconstruye la historia" : "Reconstruct the story";
    if (logIntro) logIntro.textContent = es ? "Reúne evidencia para entender para qué fue creada la misión, qué descubrió y cómo terminó." : "Collect evidence to understand what the mission was built to do, what it discovered and what happened at the end.";
    logPanel.querySelectorAll(".log-tab").forEach((tab) => { tab.textContent = es ? ({ story: "Historia", hardware: "Equipo", sources: "Fuentes" }[tab.dataset.logTab] || "") : ({ story: "Story", hardware: "Hardware", sources: "Sources" }[tab.dataset.logTab] || ""); });
  }
  function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "es" : "en";
    mission = localizedMission(currentLanguage);
    localStorage.setItem("lost-missions.language", currentLanguage);
    document.documentElement.lang = currentLanguage;
    if (languageButton) languageButton.textContent = currentLanguage === "en" ? "EN / ES" : "ES / EN";
    const labels = languageLabels[currentLanguage];
    const codexButton = $("codexBtn");
    if (codexButton) codexButton.textContent = labels.codex;
    if (musicButton && !musicOn) musicButton.textContent = labels.music;
    if (storyNoticeTag && storyNoticeTag.textContent !== "NASA DATA FOUND") storyNoticeTag.textContent = labels[currentLanguage === "en" ? "data" : "data"];
    showStoryNotice(currentLanguage === "es" ? "Modo español" : "English mode", currentLanguage === "es" ? "Los textos de la misión ahora usan español neutro latinoamericano." : "Mission text is back in English.", "GAME EVENT");
    applyStaticLanguage();
    if (stormGame.classList.contains("open") && mission.id !== "opportunity") renderStormSystems();
    hud();
  }
  if (currentLanguage === "es") { mission = localizedMission("es"); document.documentElement.lang = "es"; languageButton && (languageButton.textContent = "ES / EN"); }
  applyStaticLanguage();
  logButton.addEventListener("click", () => logPanel.classList.toggle("open"));
  logPanel.querySelector(".mission-log-close")?.addEventListener("click", () => logPanel.classList.remove("open"));
  logPanel.querySelectorAll(".log-tab").forEach((tab) => tab.addEventListener("click", () => { logTab = tab.dataset.logTab; logPanel.querySelectorAll(".log-tab").forEach((item) => item.classList.toggle("active", item === tab)); renderLog(); }));
  languageButton?.addEventListener("click", toggleLanguage);
  const W = mission.map.width;
  const H = mission.map.height;
  const TS = 16;
  const VW = 480;
  const VH = 300;
  const keys = {};
  const DIRS = ["up", "down", "left", "right"];
  const DV = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const LV = [["Cadet", 0], ["Explorer", 40], ["Researcher", 90], ["Mission Specialist", 140], ["Space Historian", 210]];
  const entities = structuredClone(mission.entities);
  const WX = mission.map.spirit_soil.x;
  const WY = mission.map.spirit_soil.y;
  const player = { x: mission.player.x, y: mission.player.y, px: mission.player.x * TS, py: mission.player.y * TS, d: "down", mv: 0, tx: mission.player.x, ty: mission.player.y };
  const flags = { talk: 0, id: 0, kit: 0, silica: 0, storm: 0, done: 0, samples: 0, dish: 0 };
  let xp = 0, busy = true, adv = null, dust = 0, energy = 100, scanResolve = null, scanTimer = null, scanPosition = 5, scanDirection = 1, stormResolve = null, stormTimer = null, stormPosition = 50, stormTarget = 50, stormLocks = 0, stormSystemsState = [], dustPatchesState = [], sampleResolve = null, sampleFound = 0, wireResolve = null, wireSelected = null, wireConnected = 0, wireLines = null, storyNoticeTimer = null, codexFromEnd = false, signalResolve = null, signalStep = 0;
  let notice = { title: "MISSION ACTIVE", text: "Follow the beacon to Dr. Vega.", signal: "STABLE", atmosphere: "CLEAR" };
  const nearImportant = (x, y) => [...entities, { x: WX, y: WY }, { x: player.x, y: player.y }].some((o) => Math.abs(o.x - x) <= 2 && Math.abs(o.y - y) <= 2);
  const map = [];
  for (let y = 0; y < H; y += 1) {
    map[y] = [];
    for (let x = 0; x < W; x += 1) {
      let cell = ".";
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) cell = "#";
      else if (y === 6 && x >= 10 && x <= 22) cell = "=";
      else if (x === WX && y === WY) cell = "W";
      else if ((x >= 23 && x <= 29 && y >= 14 && y <= 18) || (x >= 2 && x <= 7 && y >= 2 && y <= 7) || (x >= 2 && x <= 6 && y >= 16 && y <= 21)) cell = ",";
      else if (!nearImportant(x, y) && ((x * 73856093 ^ y * 19349663) >>> 0) % 100 < 8) cell = "#";
      map[y][x] = cell;
    }
  }
  const terrainRenderer = createMarsTerrainRenderer(ctx, map, TS);
  const level = () => LV.filter((item) => xp >= item[1]).length;
  function setNotice(title, text, signal = "STABLE", atmosphere = "CLEAR") {
    const es = currentLanguage === "es";
    const titleMap = { "MISSION ACTIVE": "MISIÓN ACTIVA", "SYSTEM READY": "SISTEMA LISTO", "ROVER DETECTED": "ROVER DETECTADO", "DATA REQUIRED": "DATOS NECESARIOS", "ENERGY LOSS": "PÉRDIDA DE ENERGÍA", "REWARD RECEIVED": "RECOMPENSA RECIBIDA", "LEVEL UP": "NUEVO NIVEL", "DUST ALERT": "ALERTA DE POLVO", "NASA DATA FOUND": "DATOS NASA ENCONTRADOS" };
    const signalMap = { STABLE: "ESTABLE", ALERT: "ALERTA", DATA: "DATOS" };
    const atmosphereMap = { CLEAR: "DESPEJADO", "POWER LOW": "ENERGÍA BAJA", "DUST RISK": "RIESGO DE POLVO", "DUST STORM": "TORMENTA DE POLVO", "SCAN INCOMPLETE": "ESCANEO INCOMPLETO" };
    const reasonMap = { "missed scan": "escaneo fallido", "wrong sample": "muestra incorrecta", "wrong connection": "conexión incorrecta", "wrong answer": "respuesta incorrecta", "packet out of order": "paquete fuera de orden", "unsafe power choice": "elección de energía insegura", "unsafe power protocol": "protocolo de energía inseguro" };
    const shownTitle = es ? (titleMap[title] || title) : title;
    const shownText = es ? text.replace(/(missed scan|wrong sample|wrong connection|wrong answer|packet out of order|unsafe power choice|unsafe power protocol)/g, (value) => reasonMap[value] || value) : text;
    const shownSignal = es ? (signalMap[signal] || signal) : signal;
    const shownAtmosphere = es ? (atmosphereMap[atmosphere] || atmosphere) : atmosphere;
    notice = { title, text, signal, atmosphere };
    if ($("envNoticeTitle")) $("envNoticeTitle").textContent = shownTitle;
    if ($("envNoticeText")) $("envNoticeText").textContent = shownText;
    if ($("envSignal")) { $("envSignal").textContent = shownSignal; $("envSignal").style.color = signal === "ALERT" ? "#ff9a3c" : signal === "DATA" ? "#58d9ff" : "#66e6a5"; }
    if ($("envAtmosphere")) $("envAtmosphere").textContent = shownAtmosphere;
  }
  function showStoryNotice(title, text, tag = "NASA DATA") {
    if (!storyNotice) return;
    window.clearTimeout(storyNoticeTimer);
    storyNoticeTag.textContent = tag;
    storyNoticeTitle.textContent = title;
    storyNoticeText.textContent = text;
    storyNotice.classList.add("visible");
    storyNoticeTimer = window.setTimeout(() => storyNotice.classList.remove("visible"), 5200);
  }
  function renderCodexHardware() {
    const container = root.querySelector(".hardware-codex");
    if (!container) return;
    const es = currentLanguage === "es";
    const labels = es
      ? { what: "Qué era", why: "Por qué se envió", instrument: "Instrumento", discovery: "Descubrimiento", whyLeft: "Por qué quedó", remains: "Qué permanece", loc: "Ubicación actual", status: "Estado actual", last: "Última comunicación / evento", use: "Sigue en uso", src: "Fuente del estado" }
      : { what: "What it was", why: "Why it was sent", instrument: "Instrument", discovery: "Discovery", whyLeft: "Why it stayed", remains: "What remains", loc: "Current location", status: "Current status", last: "Last communication / event", use: "Still in use", src: "Status source" };
    const heading = container.querySelector("h2");
    container.innerHTML = "";
    const h2 = document.createElement("h2");
    h2.id = "hardwareTitle";
    h2.textContent = es ? "Equipo que quedó atrás" : "Hardware left behind";
    container.append(h2);
    (mission.hardware || []).forEach((item) => {
      const article = document.createElement("article");
      const st = item.current_status;
      const stSource = st && mission.sources?.[st.source_id];
      article.innerHTML = `<h3>${item.name}</h3><p><b>${labels.what}:</b> ${item.what_it_was}</p><p><b>${labels.why}:</b> ${item.why_sent}</p><p><b>${labels.instrument}:</b> ${item.instrument}</p><p><b>${labels.discovery}:</b> ${item.discovery}</p><p><b>${labels.whyLeft}:</b> ${item.why_left}</p><p><b>${labels.remains}:</b> ${item.what_remains}</p>${st ? `<p><b>${labels.loc}:</b> ${st.location}</p><p><b>${labels.status}:</b> ${st.status}</p><p><b>${labels.last}:</b> ${st.last_event}</p><p><b>${labels.use}:</b> ${st.still_in_use}</p>${stSource ? `<p><b>${labels.src}:</b> <a href="${stSource.url}" target="_blank" rel="noopener">${stSource.label}</a></p>` : ""}` : ""}`;
      container.append(article);
    });
  }
  function renderLog() {
    if (!logList) return;
    const es = currentLanguage === "es";
    const unlocked = [];
    if (flags.talk) unlocked.push({ tag: es ? "MARCO DE HISTORIA" : "STORY FRAME", title: es ? "La pregunta" : "The question", text: mission.story_arc?.opening || "", source: "" });
    if (flags.id) unlocked.push({ tag: es ? "DATOS NASA" : "NASA DATA", title: es ? "El equipo" : "The hardware", text: mission.hardware?.[0]?.what_it_was || "", source: mission.sources?.nasa_spirit ? "nasa_spirit" : "nasa_opportunity" });
    if (flags.kit) unlocked.push({ tag: es ? "DATOS NASA" : "NASA DATA", title: es ? "Los instrumentos" : "The instruments", text: mission.hardware?.[0]?.instrument || "", source: "pds_mer" });
    if (flags.silica) unlocked.push({ tag: es ? "DATOS NASA" : "NASA DATA", title: es ? "La pista científica" : "The science clue", text: mission.hardware?.[0]?.discovery || "", source: "nasa_highlights" });
    if (flags.storm) unlocked.push({ tag: es ? "SIMULACIÓN" : "SIMULATION", title: es ? "El problema de ingeniería" : "The engineering problem", text: mission.story_arc?.turn || "", source: "" });
    if (flags.done) unlocked.push({ tag: es ? "DATOS NASA" : "NASA DATA", title: es ? "El final real" : "The historical ending", text: mission.story_arc?.ending || "", source: mission.sources?.jpl_complete ? "jpl_complete" : "nasa_spirit" });
    let items = unlocked;
    if (logTab === "hardware") {
      const hardwareSource = mission.sources?.nasa_opportunity ? "nasa_opportunity" : (mission.sources?.nasa_spirit ? "nasa_spirit" : "");
      items = (mission.hardware || []).map((item) => {
        const status = item.current_status;
        const statusText = status
          ? (es
            ? ` Ubicación actual: ${status.location} Estado actual: ${status.status} Última comunicación/evento: ${status.last_event} Sigue en uso: ${status.still_in_use}.`
            : ` Current location: ${status.location} Current status: ${status.status} Last communication/event: ${status.last_event} Still in use: ${status.still_in_use}.`)
          : "";
        return { tag: es ? "DATOS NASA" : "NASA DATA", title: item.name, text: `${item.what_it_was} ${item.why_sent} ${item.what_remains}${statusText}`, source: item.source_id || status?.source_id || hardwareSource };
      });
    }
    if (logTab === "sources") items = Object.entries(mission.sources || {}).map(([id, source]) => ({ tag: es ? "FUENTE NASA" : "NASA SOURCE", title: source.label, text: es ? "Fuente oficial para verificar esta misión." : "Official source for checking this mission.", source: id }));
    if (!items.length) { logList.innerHTML = `<p class="log-empty">${es ? "Aún no hay evidencia. Habla con la Dra. Vega para comenzar." : "No evidence yet. Talk to Dr. Vega to begin."}</p>`; return; }
    logList.innerHTML = items.map((item) => { const source = item.source ? mission.sources?.[item.source] : null; return `<article class="log-entry"><span>${item.tag}</span><h3>${item.title}</h3><p>${item.text}</p>${source ? `<a href="${source.url}" target="_blank" rel="noopener">${es ? "Ver fuente NASA" : "View NASA source"} ↗</a>` : ""}</article>`; }).join("");
  }
  function hud() {
    const sampleGoal = mission.sample_goal || 3;
    $("lv").textContent = level();
    $("xp").textContent = xp;
    $("sm").textContent = `${flags.samples}/${sampleGoal}`;
    const meta = mission.player || {};
    if ($("playerName")) $("playerName").textContent = meta.name || "R.O.M.";
    if ($("playerRole")) $("playerRole").textContent = meta.role || "Field Research Robot";
    if ($("playerClass")) $("playerClass").textContent = meta.class || "SCN-01";
    if ($("lvPanel")) $("lvPanel").textContent = level();
    if ($("xpPanel")) $("xpPanel").textContent = xp;
    if ($("energyBar")) $("energyBar").style.width = `${energy}%`;
    if ($("energyText")) $("energyText").textContent = `${energy}%`;
    if ($("dataBar")) $("dataBar").style.width = `${Math.min(flags.samples, sampleGoal) * (100 / sampleGoal)}%`;
    if ($("dataText")) $("dataText").textContent = `${flags.samples} / ${sampleGoal}`;
    renderLog();
    setNotice(notice.title, notice.text, notice.signal, notice.atmosphere);
  }
  function loseEnergy(amount, reason) {
    if (energy <= 0 || gameOver?.classList.contains("open")) return true;
    energy = Math.max(0, energy - amount);
    setNotice("ENERGY LOSS", `-${amount}% · ${reason}`, "ALERT", "POWER LOW");
    hud();
    playSfx("wrong");
    if (energy > 0) return false;
    busy = true;
    window.clearInterval(scanTimer);
    window.clearInterval(stormTimer);
    scanTimer = null;
    stormTimer = null;
    box.style.display = "none";
    questionPopup?.classList.remove("open");
    sampleGame?.classList.remove("open");
    wireGame?.classList.remove("open");
    stormGame?.classList.remove("open");
    scanGame?.classList.remove("open");
    sampleResolve = null;
    wireResolve = null;
    stormResolve = null;
    scanResolve = null;
    gameOver?.classList.add("open");
    return true;
  }
  function say(text, tag = "g", sourceId = "") {
    return new Promise((resolve) => {
      box.style.display = "block";
      busy = true;
      playSfx(tag === "n" ? "data" : "interact");
      const es = currentLanguage === "es";
      const label = tag === "n" ? (es ? "R.O.M. // DATOS NASA" : "R.O.M. // NASA DATA") : (es ? "R.O.M. // EVENTO DE MISIÓN" : "R.O.M. // MISSION EVENT");
      const title = tag === "n" ? (es ? "EVIDENCIA RECIBIDA" : "EVIDENCE RECEIVED") : (es ? "REGISTRO DE MISIÓN" : "MISSION RECORD");
      const source = sourceId && mission.sources?.[sourceId];
      box.innerHTML = `<div class="rom-event-head"><span class="rom-event-icon">${tag === "n" ? "◈" : "◉"}</span><div><span class="rom-event-channel">${label}</span><b>${title}</b></div><span class="rom-event-status">${es ? "EN PAUSA" : "PAUSED"}</span></div><div class="dialogue-copy">${text}${source ? `<a class="dialogue-source" href="${source.url}" target="_blank" rel="noopener">${es ? "Ver fuente NASA" : "View NASA source"} ↗</a>` : ""}</div><button class="dialogue-continue" type="button">${es ? "CONTINUAR" : "CONTINUE"} <span>↵</span></button>`;
      adv = () => { adv = null; box.style.display = "none"; box.innerHTML = ""; resolve(); };
      box.querySelector(".dialogue-continue")?.addEventListener("click", (event) => { event.stopPropagation(); adv?.(); });
      if (tag === "n") {
        setNotice(es ? "DATOS NASA RECIBIDOS" : "NASA DATA FOUND", es ? "Nueva evidencia añadida a la bitácora." : "New evidence added to the mission log.", "DATA", dust ? (es ? "RIESGO DE POLVO" : "DUST RISK") : (es ? "DESPEJADO" : "CLEAR"));
        return;
      }
    });
  }
  function ask(question) {
    return new Promise((resolve) => {
      const draw = (message = question.prompt) => {
        questionPrompt.textContent = message;
        questionFeedback.textContent = message === question.prompt ? (currentLanguage === "es" ? "Elige una respuesta para continuar." : "Choose an answer to continue.") : (currentLanguage === "es" ? "Inténtalo otra vez. Lee la pista y elige de nuevo." : "Try again. Read the clue and choose once more.");
        questionOptions.innerHTML = question.options.map((option, index) => `<button data-i="${index}" type="button"><span>${index + 1}</span>${option}</button>`).join("");
        questionOptions.querySelectorAll("button").forEach((button) => button.addEventListener("click", (event) => {
          event.stopPropagation();
          if (Number(button.dataset.i) === question.correct) {
            playSfx("collect");
            questionFeedback.textContent = currentLanguage === "es" ? "Correcto. La evidencia se añadió a la bitácora." : "Correct. Evidence added to the mission log.";
            questionPopup.classList.remove("open");
            resolve();
          } else {
            if (loseEnergy(5, "wrong answer")) return;
            button.classList.add("wrong");
            questionFeedback.textContent = currentLanguage === "es" ? "No exactamente. Revisa la pista e inténtalo otra vez." : "Not quite. Look at the clue and try again.";
            window.setTimeout(() => button.classList.remove("wrong"), 350);
          }
        }));
      };
      draw();
      questionPopup.classList.add("open");
    });
  }
  async function gain(amount, stat) {
    const before = level();
    xp += amount;
    const statNames = { EXPLORATION: tx("EXPLORATION", "EXPLORACIÓN"), TECHNOLOGY: tx("TECHNOLOGY", "TECNOLOGÍA"), SCIENCE: tx("SCIENCE", "CIENCIA"), RESEARCH: tx("RESEARCH", "INVESTIGACIÓN") };
    setNotice("REWARD RECEIVED", `+${amount} XP · ${statNames[stat] || stat}`, "DATA", "CLEAR");
    hud();
    playSfx("reward");
    if (level() > before) setNotice("LEVEL UP", `${tx(LV[level() - 1][0], { Cadet: "Cadete", Explorer: "Explorador", Researcher: "Investigador", "Mission Specialist": "Especialista de misión", "Space Historian": "Historiador espacial" }[LV[level() - 1][0]] || LV[level() - 1][0])} · +${amount} XP`, "DATA", "CLEAR");
  }
  function markMissionComplete() {
    const completed = completedMissions();
    if (!completed.includes(mission.id)) {
      completed.push(mission.id);
      localStorage.setItem(progressKey, JSON.stringify(completed));
    }
  }
  function endTurn() { box.style.display = "none"; busy = false; hud(); }
  function ensureAudio() {
    if (!AudioContextCtor) return null;
    if (!audioContext) audioContext = new AudioContextCtor();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }
  function tone(frequency, duration = 0.12, type = "sine", volume = 0.035, delay = 0) {
    const audio = ensureAudio();
    if (!audio || !sfxOn) return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    const start = audio.currentTime + delay;
    oscillator.type = type; oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(start); oscillator.stop(start + duration + 0.02);
  }
  function playSfx(kind) {
    const sounds = { step:[[150,.045,"square",.018]], interact:[[440,.08,"square",.035],[660,.12,"sine",.025,.06]], data:[[330,.1,"sine",.035],[494,.18,"sine",.025,.1]], collect:[[523,.09,"square",.03],[659,.11,"square",.03,.08],[784,.18,"sine",.025,.16]], wrong:[[130,.16,"sawtooth",.025]], storm:[[90,.45,"sawtooth",.035],[70,.5,"sawtooth",.02,.18]], reward:[[523,.08,"sine",.03],[659,.08,"sine",.03,.08],[1046,.22,"sine",.03,.16]], win:[[523,.1,"sine",.03],[659,.1,"sine",.03,.1],[784,.1,"sine",.03,.2],[1046,.35,"sine",.04,.3]] };
    (sounds[kind] || []).forEach((sound) => tone(...sound));
  }
  function startMusic() {
    if (musicOn) return;
    const audio = ensureAudio(); if (!audio) return;
    musicOn = true; musicButton.textContent = "♫ Music: on";
    const notes = [110, 131, 165, 196, 165, 147, 123, 98];
    musicTimer = window.setInterval(() => {
      if (!musicOn) return;
      const note = notes[musicStep++ % notes.length];
      tone(note, 0.7, "sine", 0.024);
      tone(note * 2, 0.28, "triangle", 0.014, 0.18);
    }, 520);
  }
  function stopMusic() { musicOn = false; if (musicTimer) window.clearInterval(musicTimer); musicTimer = null; if (musicButton) musicButton.textContent = "♫ Music: off"; }
  function toggleMusic() { ensureAudio(); if (musicOn) stopMusic(); else startMusic(); }
  function showPhoto() {
    return new Promise((resolve) => {
      playSfx("data");
      if (!photoPopup) return resolve();
      photoResolve = resolve;
      photoPopup.classList.add("open");
      photoClose?.focus();
    });
  }
  function closePhoto() {
    playSfx("interact");
    photoPopup?.classList.remove("open");
    if (photoResolve) { const resolve = photoResolve; photoResolve = null; resolve(); }
  }
  function facingTile() { const [dx, dy] = DV[player.d]; return { x: player.x + dx, y: player.y + dy }; }
  function heroPhoto() {
    return mission.gallery.find((item) => item.id === `${mission.id}-self`) || mission.gallery[1] || mission.gallery[0] || null;
  }
  function updatePhotoPopup() {
    const item = heroPhoto();
    if (!item) return;
    const image = $("photoImage");
    const title = $("photoTitle");
    const text = $("photoText");
    const credit = $("photoCredit");
    const source = $("photoSource");
    if (image) { image.src = item.image_url; image.alt = item.title; }
    if (title) title.textContent = item.title;
    if (text) text.textContent = item.kid_text;
    if (credit) credit.textContent = item.credit;
    if (source) { source.href = src(item.source_id) || "#"; source.textContent = tx("VIEW NASA SOURCE ↗", "VER FUENTE NASA ↗"); }
  }
  function renderGallery() {
    const gallery = $("gallery");
    if (!gallery) return;
    gallery.innerHTML = "";
    unlockedGalleryIds.forEach((id) => {
      const item = mission.gallery.find((entry) => entry.id === id);
      if (!item) return;
      const card = document.createElement("article");
      card.className = "edu-card";
      card.dataset.card = item.id;
      card.innerHTML = `<img src="${item.image_url}" alt="${item.title}" loading="lazy"><div><b>${item.title}</b><p>${item.kid_text}</p><small>${item.credit}</small><a href="${src(item.source_id)}" target="_blank" rel="noopener">${tx("View NASA source", "Ver fuente NASA")}</a></div>`;
      gallery.append(card);
    });
  }
  function unlockGallery(indexOrId) {
    const item = typeof indexOrId === "number"
      ? mission.gallery[indexOrId]
      : mission.gallery.find((entry) => entry.id === indexOrId);
    if (!item || unlockedGalleryIds.has(item.id)) return;
    unlockedGalleryIds.add(item.id);
    renderGallery();
  }
  function unlockGalleryMany(indexes) {
    indexes.forEach((index) => unlockGallery(index));
  }
  function runScanMinigame() {
    return new Promise((resolve) => {
      scanResolve = resolve;
      scanPosition = 5;
      scanDirection = 1;
      scanQuality.textContent = "0%";
      scanFeedback.textContent = tx("Watch the orange cursor. Lock it inside the cyan zone.", "Mira el cursor naranja. Bloquéalo dentro de la zona cyan.");
      scanGame.classList.add("open");
      const tick = () => {
        scanPosition += scanDirection * 2.2;
        if (scanPosition >= 95 || scanPosition <= 5) scanDirection *= -1;
        scanCursor.style.left = `${scanPosition}%`;
        const distance = Math.abs(scanPosition - 51);
        scanQuality.textContent = `${Math.max(0, Math.round(100 - distance * 3.2))}%`;
      };
      scanTimer = window.setInterval(tick, 45);
    });
  }
  function lockScan() {
    if (!scanResolve) return;
    const locked = scanPosition >= 43 && scanPosition <= 59;
    if (!locked) {
      scanFeedback.textContent = tx("Signal missed. Try again when the cursor enters the cyan zone.", "Se perdió la señal. Inténtalo cuando el cursor entre en la zona cyan.");
      loseEnergy(5, "missed scan");
      playSfx("wrong");
      return;
    }
    window.clearInterval(scanTimer);
    scanTimer = null;
    scanGame.classList.remove("open");
    playSfx("collect");
    const resolve = scanResolve;
    scanResolve = null;
    resolve();
  }
  function runSampleMinigame() {
    return new Promise((resolve) => {
      sampleResolve = resolve;
      sampleFound = 0;
      const sampleGoal = mission.sample_goal || 3;
      const samples = Array.from({ length: sampleGoal * 2 }, (_, index) => index % 2 ? "hematite" : "sand").sort(() => Math.random() - 0.5);
      sampleGrid.innerHTML = samples.map((kind, index) => `<button class="sample-chip" data-sample="${kind}" data-index="${index}" type="button" aria-label="Martian sample ${index + 1}"><i></i><b>SAMPLE ${index + 1}</b></button>`).join("");
      sampleProgress.textContent = `0 / ${sampleGoal}`;
      sampleFeedback.textContent = tx("Look for the round, dark-blue samples linked to hematite.", "Busca las muestras redondas y azul oscuro relacionadas con la hematita.");
      sampleGame.classList.add("open");
      sampleGrid.querySelectorAll(".sample-chip").forEach((button) => button.addEventListener("click", () => chooseSample(button)));
    });
  }
  function chooseSample(button) {
    if (!sampleResolve || button.classList.contains("found")) return;
    if (button.dataset.sample !== "hematite") {
      if (loseEnergy(5, "wrong sample")) return;
      button.classList.add("wrong");
      sampleFeedback.textContent = tx("That grain is ordinary sand. Keep looking for the dark, rounded clue.", "Ese grano es arena común. Sigue buscando la pista oscura y redonda.");
      playSfx("wrong");
      window.setTimeout(() => button.classList.remove("wrong"), 380);
      return;
    }
    button.classList.add("found");
    sampleFound += 1;
    const sampleGoal = mission.sample_goal || 3;
    sampleProgress.textContent = `${sampleFound} / ${sampleGoal}`;
    sampleFeedback.textContent = sampleFound >= sampleGoal ? tx(`${sampleGoal} hematite clues catalogued. Evidence ready.`, `Registraste ${sampleGoal} pistas de hematita. La evidencia está lista.`) : tx("Good find. Search for the remaining dark-blue spheres.", "Buen hallazgo. Busca las esferas azul oscuro que faltan.");
    playSfx("collect");
    if (sampleFound >= sampleGoal) {
      window.setTimeout(() => {
        sampleGame.classList.remove("open");
        const resolve = sampleResolve;
        sampleResolve = null;
        resolve();
      }, 450);
    }
  }
  function runWireMinigame() {
    return new Promise((resolve) => {
      wireResolve = resolve;
      wireSelected = null;
      wireConnected = 0;
      const colors = ["cyan", "orange", "green", "pink"];
      const rightColors = ["green", "pink", "cyan", "orange"];
      wireBoard.innerHTML = '<svg class="wire-lines" aria-hidden="true"></svg><div class="wire-column left-column">' + colors.map((color) => `<button class="wire-terminal" aria-label="${color} cable" data-side="left" data-wire="${color}" type="button"><span class="wire-dot"></span></button>`).join("") + '</div><div class="wire-column right-column">' + rightColors.map((color) => `<button class="wire-terminal right" aria-label="${color} terminal" data-side="right" data-wire="${color}" type="button"><span class="wire-dot"></span></button>`).join("") + '</div>';
      wireLines = wireBoard.querySelector(".wire-lines");
      wireProgress.textContent = "0 / 4";
      wireFeedback.textContent = tx("Select a cable, then select its matching terminal.", "Selecciona un cable y luego su terminal del mismo color.");
      wireGame.classList.add("open");
      wireBoard.querySelectorAll(".wire-terminal").forEach((button) => button.addEventListener("click", () => chooseWire(button)));
    });
  }
  function chooseWire(button) {
    if (!wireResolve || button.classList.contains("connected")) return;
    if (button.dataset.side === "left") {
      wireSelected = button;
      wireBoard.querySelectorAll('[data-side="left"]').forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      wireFeedback.textContent = tx("Now select the terminal with the same color.", "Ahora selecciona el terminal del mismo color.");
      return;
    }
    if (!wireSelected) { wireFeedback.textContent = tx("Choose a cable on the left first.", "Primero elige un cable de la izquierda."); return; }
    if (wireSelected.dataset.wire !== button.dataset.wire) {
      if (loseEnergy(5, "wrong connection")) return;
      button.classList.add("wrong");
      window.setTimeout(() => button.classList.remove("wrong"), 380);
      wireFeedback.textContent = tx("That connection is unstable. Look for the matching color.", "La conexión es inestable. Busca el color que coincide.");
      playSfx("wrong");
      return;
    }
    wireSelected.classList.add("connected");
    button.classList.add("connected");
    drawWireLine(wireSelected, button, button.dataset.wire);
    wireSelected.classList.remove("selected");
    wireSelected = null;
    wireConnected += 1;
    wireProgress.textContent = `${wireConnected} / 4`;
    playSfx("collect");
    if (wireConnected >= 4) {
      wireFeedback.textContent = tx("APXS circuit online. Calibration data ready.", "Circuito APXS activo. Datos de calibración listos.");
      window.setTimeout(() => {
        wireGame.classList.remove("open");
        const resolve = wireResolve;
        wireResolve = null;
        resolve();
      }, 450);
    } else wireFeedback.textContent = tx("Connection stable. Continue with the remaining cables.", "Conexión estable. Continúa con los cables restantes.");
  }
  function drawWireLine(left, right, color) {
    const boardRect = wireBoard.getBoundingClientRect();
    const leftRect = left.getBoundingClientRect();
    const rightRect = right.getBoundingClientRect();
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", leftRect.right - boardRect.left);
    line.setAttribute("y1", leftRect.top + leftRect.height / 2 - boardRect.top);
    line.setAttribute("x2", rightRect.left - boardRect.left);
    line.setAttribute("y2", rightRect.top + rightRect.height / 2 - boardRect.top);
    line.setAttribute("stroke", color === "cyan" ? "#58d9ff" : color === "orange" ? "#ff9a3c" : color === "green" ? "#66e6a5" : "#f58cce");
    line.setAttribute("stroke-width", "4");
    line.setAttribute("stroke-linecap", "round");
    wireLines?.append(line);
  }
  function runSignalMinigame() {
    return new Promise((resolve) => {
      signalResolve = resolve;
      signalStep = 0;
      const packets = mission.id === "opportunity"
        ? [{ id: "dark", label: tx("DARK SKY", "CIELO OSCURO"), detail: tx("Low sunlight", "Poca luz solar") }, { id: "partial", label: tx("PARTIAL IMAGE", "IMAGEN INCOMPLETA"), detail: tx("Last frame", "Último cuadro") }, { id: "quiet", label: tx("NO REPLY", "SIN RESPUESTA"), detail: tx("Signal fades", "La señal se desvanece") }]
        : [{ id: "stuck", label: tx("STUCK", "ATASCADO"), detail: tx("Mobility ends", "Termina la movilidad") }, { id: "winter", label: tx("WINTER", "INVIERNO"), detail: tx("Energy falls", "Baja la energía") }, { id: "quiet", label: tx("NO REPLY", "SIN RESPUESTA"), detail: tx("Contact ends", "Termina el contacto") }];
      const order = [packets[0].id, packets[1].id, packets[2].id];
      signalPackets.innerHTML = packets.map((packet) => `<button class="signal-packet" data-packet="${packet.id}" type="button"><span>${packet.label}</span><small>${packet.detail}</small></button>`).join("");
      signalFeedback.textContent = tx("Choose the first packet.", "Elige el primer paquete.");
      signalGame.classList.add("open");
      signalPackets.querySelectorAll(".signal-packet").forEach((button) => button.addEventListener("click", () => {
        if (button.classList.contains("used")) return;
        if (button.dataset.packet !== order[signalStep]) {
          signalFeedback.textContent = tx("That clue comes later. Follow the mission timeline.", "Esa pista viene después. Sigue la línea de tiempo de la misión.");
          loseEnergy(5, "packet out of order");
          playSfx("wrong");
          return;
        }
        button.classList.add("used"); signalStep += 1; playSfx("collect");
        if (signalStep === order.length) {
          signalFeedback.textContent = tx("Evidence sequence restored. The historical ending remains unchanged.", "Secuencia de evidencia restaurada. El final histórico no cambia.");
          window.setTimeout(() => { signalGame.classList.remove("open"); const done = signalResolve; signalResolve = null; done(); }, 500);
        } else signalFeedback.textContent = tx(`${signalStep} / ${order.length} packets restored.`, `${signalStep} / ${order.length} paquetes restaurados.`);
      }));
    });
  }
  async function interact() {
    if (busy) return;
    busy = true;
    const target = facingTile();
    const entity = entities.find((item) => item.x === target.x && item.y === target.y && !item.gone);
    const cell = map[target.y]?.[target.x];
    if (entity?.k === "npc") {
      if (!flags.talk) { showStoryNotice("MISSION BRIEFING", `${mission.dialogue.intro_npc_1} ${mission.dialogue.intro_npc_2}`, "GAME EVENT"); playSfx("interact"); flags.talk = 1; }
      else await say(flags.id ? mission.dialogue.npc_hint : mission.dialogue.npc_first_hint);
    } else if (entity?.k === "rov") {
      const roverName = mission.rover_name || "ROVER";
      setNotice("ROVER DETECTED", `${roverName} is nearby. Scan the inactive NASA field unit for mission evidence.`, "DATA", dust ? "DUST RISK" : "CLEAR");
      if (!flags.id) {
        await showPhoto();
        await runScanMinigame();
        if (!flags.talk) await say(mission.dialogue.rover_before_npc);
        else { const sourceId = mission.sources.nasa_opportunity ? "nasa_opportunity" : "nasa_spirit"; await say(mission.dialogue.rover_intro, "n", sourceId); await ask(mission.questions.mission_length); await say(mission.dialogue.rover_after_id, "n", sourceId); await gain(15, "EXPLORATION"); flags.id = 1; $("cxt").textContent = currentLanguage === "es" ? `${roverName}: registro de misión del Mars Exploration Rover en ${mission.location || "Marte"}.` : `${roverName}: Mars Exploration Rover mission record for ${mission.location || "Mars"}.`; unlockGalleryMany([0, 1]); }
      }
      else if (flags.storm && !flags.done) { await runSignalMinigame(); for (const clue of mission.final_clues) await say(clue.text, clue.kind === "nasa_data" ? "n" : "g", clue.source_id); await ask(mission.questions.final); await gain(40, "RESEARCH"); flags.done = 1; markMissionComplete(); playSfx("win"); $("winXp").textContent = `+${xp}`; hud(); $("cxt").textContent = mission.ending.codex_text; unlockGalleryMany([1, 3, 4, 5].filter((index) => index < mission.gallery.length)); box.style.display = "none"; $("end").style.display = "flex"; return; }
      else await say(mission.dialogue.rover_waiting);
    } else if (entity?.k === "case" || entity?.k === "sorter") {
      if (!flags.id) await say(mission.dialogue.case_locked);
      else { await say(mission.dialogue.case_open); if (mission.id === "opportunity") await runSampleMinigame(); else await runWireMinigame(); entity.gone = 1; flags.kit = 1; await say(mission.dialogue.case_fact, "n", "pds_mer"); await gain(20, "TECHNOLOGY"); }
    } else if (entity?.k === "smp" || entity?.k === "sphere") {
      entity.gone = 1; flags.samples += 1; const fact = mission.sample_facts[entity.i]; await say(fact.text, "n", fact.source_id); await gain(10, "SCIENCE");
    } else if (entity?.k === "dish" || entity?.k === "solar") { flags.dish = 1; await say(mission.dialogue[mission.id === "opportunity" ? "panel" : "dish"], "n", mission.id === "opportunity" ? "nasa_opportunity" : "pds_mer"); if (mission.id === "opportunity" && !flags.storm) await storm(); }
    else if (cell === "W") {
      const sampleGoal = mission.sample_goal || 3;
      if (!flags.kit) await say(mission.dialogue.soil_locked);
      else if (flags.samples < sampleGoal) { setNotice("DATA REQUIRED", `Evidence collected: ${flags.samples}/${sampleGoal}. Find every marked sample first.`, "ALERT", "SCAN INCOMPLETE"); await say(`${mission.player?.name || "R.O.M."} needs all ${sampleGoal} field samples before this site can be classified. Follow the sample labels on the map.`); }
      else if (flags.silica) await say(mission.dialogue.soil_done);
      else { await say(mission.dialogue.soil_fact, "n", "nasa_highlights"); await ask(mission.questions.silica); await say(mission.dialogue.soil_good, "n", "nasa_highlights"); flags.silica = 1; await gain(25, "SCIENCE"); unlockGallery(2); }
    } else await say(mission.dialogue.nothing);
    endTurn();
  }
  function runStormMinigame() {
    return new Promise((resolve) => {
      stormResolve = resolve;
      if (mission.id === "opportunity") {
        dustPatchesState = ["panel-a", "panel-b", "panel-c", "panel-d", "panel-e"].map((id) => ({ id, cleaned: false }));
        stormIntro.textContent = tx("Dust is covering Opportunity's solar panels. Clean every panel section to recover the signal.", "El polvo cubre los paneles solares de Opportunity. Limpia cada sección para recuperar la señal.");
        stormEnergy.textContent = "18%";
        stormRound.textContent = "0 / 5 CLEAN";
        stormFeedback.textContent = tx("Click each dusty panel section. The rover needs sunlight to call home.", "Haz clic en cada sección cubierta de polvo. El rover necesita luz solar para comunicarse.");
        stormSystems.innerHTML = dustPatchesState.map((patch, index) => `<button class="system-card system-on" data-patch="${patch.id}" type="button"><span class="system-icon">▣</span><span class="system-copy"><b>${tx("PANEL", "PANEL")} ${index + 1}</b><small>${tx("Dust coverage detected", "Polvo detectado")}</small></span><i>${tx("DIRTY", "SUCIO")}</i></button>`).join("");
        stormSystems.querySelectorAll("[data-patch]").forEach((button) => button.addEventListener("click", () => cleanDustPatch(button.dataset.patch)));
        stormAction.textContent = tx("RESTORE SOLAR INPUT", "RECUPERAR ENTRADA SOLAR");
        stormAction.disabled = true;
        stormGame.classList.add("open");
        return;
      }
      stormSystemsState = [
        { id: "heater", label: tx("HEATER", "CALENTADOR"), icon: "♨", essential: true, on: true, detail: tx("Keep R.O.M. warm", "Mantén caliente a R.O.M.") },
        { id: "radio", label: tx("RADIO", "RADIO"), icon: "◉", essential: true, on: true, detail: tx("Protect the signal", "Protege la señal") },
        { id: "camera", label: tx("CAMERA", "CÁMARA"), icon: "▣", essential: false, on: true, detail: tx("Panorama can wait", "El panorama puede esperar") },
        { id: "apxs", label: "APXS", icon: "◇", essential: false, on: true, detail: tx("Science can wait", "La ciencia puede esperar") },
        { id: "drive", label: tx("DRIVE", "MOVILIDAD"), icon: "↔", essential: false, on: true, detail: tx("Stay still in the storm", "Quédate quieto durante la tormenta") }
      ];
      stormIntro.textContent = tx("Dust is blocking sunlight. Turn off three non-essential systems and keep the heater and radio running.", "El polvo bloquea la luz solar. Apaga tres sistemas no esenciales y mantén encendidos el calentador y la radio.");
      stormEnergy.textContent = `${energy}%`;
      stormRound.textContent = "0 / 3 LOCKS";
      stormFeedback.textContent = tx("Tap a system to switch it off. Essential systems cannot be turned off.", "Toca un sistema para apagarlo. Los sistemas esenciales no se pueden apagar.");
      renderStormSystems();
      stormGame.classList.add("open");
    });
  }
  function cleanDustPatch(id) {
    const patch = dustPatchesState.find((item) => item.id === id);
    const button = stormSystems.querySelector(`[data-patch="${id}"]`);
    if (!patch || patch.cleaned || !button) return;
    patch.cleaned = true;
    button.classList.remove("system-on");
    button.classList.add("system-off");
    button.querySelector("i").textContent = tx("CLEAN", "LIMPIO");
    const cleaned = dustPatchesState.filter((item) => item.cleaned).length;
    stormEnergy.textContent = `${18 + cleaned * 14}%`;
    stormRound.textContent = `${cleaned} / 5 CLEAN`;
    stormFeedback.textContent = cleaned >= 5 ? tx("Solar input restored. Confirm the repaired panel.", "Entrada solar recuperada. Confirma el panel reparado.") : tx("Panel section clear. Keep brushing away the dust.", "Sección despejada. Sigue retirando el polvo.");
    stormAction.disabled = cleaned < 5;
    playSfx("collect");
  }
  function renderStormSystems() {
    stormSystems.innerHTML = stormSystemsState.map((system) => `<button class="system-card ${system.on ? "system-on" : "system-off"} ${system.essential ? "system-locked" : ""}" data-system="${system.id}" type="button"><span class="system-icon">${system.icon}</span><span class="system-copy"><b>${system.label}</b><small>${system.detail}</small></span><i>${system.essential ? tx("KEEP ON", "MANTENER") : system.on ? tx("ON", "ENCENDIDO") : tx("OFF", "APAGADO")}</i></button>`).join("");
    stormSystems.querySelectorAll(".system-card").forEach((button) => button.addEventListener("click", () => toggleStormSystem(button.dataset.system)));
  }
  function toggleStormSystem(id) {
    const system = stormSystemsState.find((item) => item.id === id);
    if (!system) return;
    if (system.essential) {
      stormFeedback.textContent = tx(`${system.label} must stay on to protect the mission.`, `${system.label} debe permanecer encendido para proteger la misión.`);
      loseEnergy(5, "unsafe power choice");
      playSfx("wrong");
      return;
    }
    system.on = !system.on;
    const offCount = stormSystemsState.filter((item) => !item.on).length;
    energy = Math.min(100, Math.max(30, 72 + offCount * 8));
    stormEnergy.textContent = `${energy}%`;
    stormRound.textContent = `${offCount} / 3 OFF`;
    stormFeedback.textContent = offCount >= 3 ? tx("Safe mode ready. Confirm the power protocol.", "Modo seguro listo. Confirma el protocolo de energía.") : tx("Good. Turn off the remaining non-essential systems.", "Bien. Apaga los sistemas no esenciales restantes.");
    renderStormSystems();
    playSfx("collect");
  }
  function lockStormPanel() {
    if (!stormResolve) return;
    if (mission.id === "opportunity") {
      const cleaned = dustPatchesState.filter((item) => item.cleaned).length;
      if (cleaned < 5) return;
      playSfx("collect");
      stormGame.classList.remove("open");
      stormAction.disabled = false;
      const resolve = stormResolve;
      stormResolve = null;
      resolve();
      return;
    }
    const offCount = stormSystemsState.filter((item) => !item.on).length;
    if (offCount < 3) {
      stormFeedback.textContent = tx(`Safe mode needs ${3 - offCount} more system${3 - offCount === 1 ? "" : "s"} turned off.`, `Al modo seguro le faltan ${3 - offCount} sistema${3 - offCount === 1 ? "" : "s"} por apagar.`);
      loseEnergy(5, "unsafe power protocol");
      playSfx("wrong");
      return;
    }
    playSfx("collect");
    stormGame.classList.remove("open");
    const resolve = stormResolve;
    stormResolve = null;
    resolve();
  }
  async function storm() { busy = true; playSfx("storm"); flags.storm = 1; dust = 1; energy = 72; setNotice("DUST ALERT", "Solar input is dropping. Protect R.O.M. and the mission signal.", "ALERT", "DUST STORM"); hud(); await say(mission.storm.start); await say(mission.storm.fact, "n", mission.storm.source_id); await runStormMinigame(); await say(mission.storm.success); await gain(30, "TECHNOLOGY"); endTurn(); }
  function rect(x, y, w, h, color) { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); }
  const names = { npc: "DR. VEGA", rov: mission.rover_name || "ROVER", case: "APXS KIT", smp: "SAMPLE", dish: "LINK DISH", ...(mission.entity_names || {}) };
  const mapFrame = root.querySelector(".map-frame");
  const labelNode = document.createElement("div"); labelNode.className = "entity-label"; mapFrame?.append(labelNode);
  const hintNode = document.createElement("div"); hintNode.className = "interaction-hint"; mapFrame?.append(hintNode);
  function drawNearbyLabels(cx, cy) {
    const near = entities.find((entity) => !entity.gone && Math.abs(entity.x - player.x) <= 2 && Math.abs(entity.y - player.y) <= 2);
    if (!near) { labelNode.classList.remove("visible"); hintNode.classList.remove("visible"); return; }
    labelNode.textContent = names[near.k] || "OBJECT";
    labelNode.style.left = ((near.x * TS - cx + 8) / VW * 100) + "%";
    labelNode.style.top = ((near.y * TS - cy) / VH * 100) + "%";
    hintNode.textContent = "E / ENTER";
    hintNode.style.left = ((near.x * TS - cx + 8) / VW * 100) + "%";
    hintNode.style.top = ((near.y * TS - cy + 20) / VH * 100) + "%";
    labelNode.classList.add("visible"); hintNode.classList.add("visible");
  }
  function canvasLabel(text, x, y, active = true) {
    if (x < -80 || x > VW + 80 || y < -24 || y > VH + 20) return;
    ctx.save();
    ctx.font = "700 7px Arial";
    const width = ctx.measureText(text).width + 8;
    ctx.fillStyle = active ? "rgba(7,16,29,.92)" : "rgba(7,16,29,.72)";
    ctx.fillRect(Math.round(x - width / 2), Math.round(y - 13), Math.round(width), 11);
    ctx.strokeStyle = active ? "#58d9ff" : "#62748a";
    ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(x - width / 2), Math.round(y - 13), Math.round(width), 11);
    ctx.fillStyle = active ? "#ffffff" : "#b2c0cf";
    ctx.fillText(text, Math.round(x - width / 2 + 4), Math.round(y - 5));
    ctx.restore();
  }
  function drawObjectiveGuide(cx, cy) {
    let target = null; let label = "";
    if (!flags.talk) { target = entities.find((entity) => entity.k === "npc"); label = tx("GO TO DR. VEGA", "VE A LA DRA. VEGA"); }
    else if (!flags.id) { target = entities.find((entity) => entity.k === "rov"); label = `${tx("INVESTIGATE", "INVESTIGA")} ${mission.rover_name || "ROVER"}`; }
    else if (!flags.kit) { target = entities.find((entity) => entity.k === "case" || entity.k === "sorter"); label = mission.id === "opportunity" ? tx("FIND GEOLOGY SORTER", "ENCUENTRA EL CLASIFICADOR GEOLÓGICO") : tx("FIND APXS KIT", "ENCUENTRA EL KIT APXS"); }
    else if (!flags.silica) { target = { x: WX, y: WY }; label = mission.id === "opportunity" ? tx("SORT BLUEBERRIES", "CLASIFICA LAS MORAS") : tx("ANALYZE BRIGHT SOIL", "ANALIZA EL SUELO BRILLANTE"); }
    else if (!flags.storm) { target = mission.id === "opportunity" ? entities.find((entity) => entity.k === "solar" || entity.k === "dish") : mission.map.dust_field; label = mission.id === "opportunity" ? tx("CLEAN SOLAR PANELS", "LIMPIA LOS PANELES SOLARES") : tx("ENTER DUST FIELD", "ENTRA EN EL CAMPO DE POLVO"); }
    else if (!flags.done) { target = entities.find((entity) => entity.k === "rov"); label = `${tx("RETURN TO", "REGRESA A")} ${mission.rover_name || "ROVER"}`; }
    if (!target) return;
    const targetX = target.x * TS - cx + 8; const targetY = target.y * TS - cy + 8;
    if (targetX < 0 || targetX > VW || targetY < 0 || targetY > VH) return;
    const pulse = 3 + Math.sin(Date.now() / 180) * 2;
    const isDustField = target === mission.map.dust_field;
    const isScienceSite = target.x === WX && target.y === WY;
    ctx.save();
    if (!entities.includes(target)) {
      ctx.fillStyle = isDustField ? "rgba(255,154,60,.18)" : "rgba(88,217,255,.16)";
      ctx.strokeStyle = isDustField ? "#ff9a3c" : "#58d9ff";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeRect(Math.round(targetX - 18), Math.round(targetY - 12), 36, 24);
      ctx.fillRect(Math.round(targetX - 18), Math.round(targetY - 12), 36, 24);
      ctx.setLineDash([]);
      ctx.strokeStyle = isDustField ? "#ffcf91" : "#9ff7c8";
      ctx.beginPath();
      ctx.moveTo(targetX - 10, targetY); ctx.lineTo(targetX + 10, targetY);
      ctx.moveTo(targetX, targetY - 7); ctx.lineTo(targetX, targetY + 7);
      ctx.stroke();
    }
    ctx.strokeStyle = "#ff9a3c"; ctx.lineWidth = 1.5; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(targetX, targetY, 10 + pulse, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = "#ffcf91"; ctx.font = "700 6px Arial"; ctx.textAlign = "center"; ctx.fillText(isDustField ? tx("DUST FIELD", "CAMPO DE POLVO") : isScienceSite ? tx("SCIENCE SITE", "SITIO CIENTÍFICO") : tx("TARGET", "OBJETIVO"), Math.round(targetX), Math.round(targetY - 16)); ctx.restore();
  }
  function drawCanvasLabels(cx, cy) {
    entities.filter((entity) => !entity.gone).forEach((entity) => {
      const distance = Math.abs(entity.x - player.x) + Math.abs(entity.y - player.y);
      if (distance > 3) return;
      canvasLabel(names[entity.k] || "OBJECT", entity.x * TS - cx + 8, entity.y * TS - cy, distance <= 2);
    });
  }
  function drawAstraSprite(X, Y, dir = "up", step = 0) {
    const C = {
      outline: "#17212e",
      dark: "#0b1622",
      gray: "#637483",
      shade: "#aeb9c3",
      white: "#f3f5f0",
      cyan: "#20d8f2",
      blue: "#1498bd"
    };
    const p = (x, y, w, h, color) => rect(X + x, Y + y, w, h, color);

    p(4, 15, 8, 1, "#0007");
    p(8, 1, 1, 2, C.gray);
    p(8, 0, 2, 1, C.cyan);
    p(4, 3, 8, 7, C.outline);
    p(5, 2, 6, 1, C.shade);
    p(3, 4, 10, 5, C.white);
    p(4, 3, 8, 6, C.white);
    p(4, 8, 8, 2, C.shade);
    p(2, 5, 2, 3, C.gray);
    p(2, 5, 1, 2, C.cyan);
    p(12, 5, 2, 3, C.gray);
    p(13, 5, 1, 2, C.cyan);

    if (dir === "up") {
      p(5, 4, 6, 4, C.shade);
      p(6, 5, 4, 2, C.white);
    } else {
      p(4, 4, 8, 4, C.dark);
      if (dir === "left") {
        p(5, 5, 2, 2, C.cyan);
        p(8, 5, 2, 2, C.cyan);
      } else if (dir === "right") {
        p(6, 5, 2, 2, C.cyan);
        p(9, 5, 2, 2, C.cyan);
      }
      else {
        p(5, 5, 2, 2, C.cyan);
        p(9, 5, 2, 2, C.cyan);
      }
    }

    p(7, 10, 2, 1, C.gray);
    p(3, 11, 2, 2, C.shade);
    p(3, 12, 1, 1, C.cyan);
    p(11, 11, 2, 2, C.shade);
    p(12, 12, 1, 1, C.cyan);
    if (step === 1) {
      p(2, 11, 2, 2, C.shade);
      p(2, 12, 1, 1, C.cyan);
      p(12, 10, 2, 2, C.shade);
    } else if (step === 3) {
      p(3, 10, 2, 2, C.shade);
      p(3, 11, 1, 1, C.cyan);
      p(12, 11, 2, 2, C.shade);
      p(13, 12, 1, 1, C.cyan);
    }
    p(5, 10, 6, 4, C.outline);
    p(5, 11, 6, 3, C.white);
    p(6, 13, 4, 1, C.shade);
    p(7, 11, 2, 2, C.blue);
    p(7, 11, 1, 1, C.cyan);

    if (step === 1) {
      p(5, 14, 2, 1, C.cyan);
      p(10, 13, 2, 2, C.gray);
      p(10, 14, 2, 1, C.white);
    } else if (step === 3) {
      p(5, 13, 2, 2, C.gray);
      p(5, 14, 2, 1, C.white);
      p(9, 14, 2, 1, C.cyan);
    } else {
      p(5, 14, 2, 1, C.white);
      p(9, 14, 2, 1, C.white);
      p(5, 15, 2, 1, C.blue);
      p(9, 15, 2, 1, C.blue);
    }
  }
  function sprite(kind, X, Y, dir = "up", step = 0) { if (kind === "pl") { drawAstraSprite(X, Y, dir, step); return; } if (kind === "npc") { rect(X + 4, Y + 14, 8, 2, "#0008"); rect(X + 4, Y + 1, 8, 4, "#c0301c"); rect(X + 5, Y + 4, 6, 4, "#f0c8a0"); rect(X + 4, Y + 8, 8, 6, "#f4f4f4"); rect(X + 5, Y + 14, 2, 1, "#333"); rect(X + 9, Y + 14, 2, 1, "#333"); } if (kind === "rov") { rect(X + 1, Y + 14, 14, 2, "#0008"); rect(X + 2, Y + 7, 12, 5, "#9aa0a8"); rect(X + 3, Y + 8, 10, 2, "#c8ced6"); rect(X, Y + 5, 5, 3, "#d8a828"); rect(X + 11, Y + 5, 5, 3, "#d8a828"); rect(X + 7, Y + 1, 2, 6, "#666"); rect(X + 6, Y, 4, 2, "#333"); rect(X + 1, Y + 12, 3, 3, "#222"); rect(X + 7, Y + 12, 3, 3, "#222"); rect(X + 12, Y + 12, 3, 3, "#222"); } if (kind === "case") { rect(X + 3, Y + 14, 10, 2, "#0008"); rect(X + 3, Y + 6, 10, 8, "#e0782a"); rect(X + 4, Y + 7, 8, 3, "#f2a45a"); rect(X + 6, Y + 3, 4, 3, "#333"); rect(X + 7, Y + 9, 2, 2, "#fff"); } if (kind === "smp") { const bob = (Date.now() >> 8) & 1; rect(X + 5, Y + 14, 6, 2, "#0008"); rect(X + 6, Y + 6 - bob, 4, 7, "#4fd8ff"); rect(X + 4, Y + 8 - bob, 8, 3, "#8aeaff"); rect(X + 7, Y + 4 - bob, 2, 3, "#d6f7ff"); } if (kind === "dish") { rect(X + 7, Y + 6, 2, 8, "#9aa0a8"); rect(X + 4, Y + 3, 8, 5, "#c8ced6"); rect(X + 5, Y + 4, 6, 3, "#334155"); rect(X + 3, Y + 14, 10, 2, "#0008"); } }
  function canMoveTo(x, y) { if (x < 0 || y < 0 || x >= W || y >= H) return false; if ("#=W".includes(map[y][x])) return false; return !entities.some((entity) => entity.x === x && entity.y === y && !entity.gone); }
  function updateMovement() {
    const modalOpen = Boolean(adv || questionPopup?.classList.contains("open") || stormGame?.classList.contains("open") || sampleGame?.classList.contains("open") || scanGame?.classList.contains("open") || wireGame?.classList.contains("open") || signalGame?.classList.contains("open") || gameOver?.classList.contains("open"));
    if (cinematic?.classList.contains("is-hidden") && !modalOpen && box.style.display === "none") busy = false;
    if (!busy && !player.mv) {
      const dir = DIRS.find((key) => keys[key]);
      if (dir) {
        player.d = dir;
        const [dx, dy] = DV[dir], tx = player.x + dx, ty = player.y + dy;
        if (canMoveTo(tx, ty)) { player.tx = tx; player.ty = ty; player.mv = 1; playSfx("step"); }
      }
    }
    if (player.mv) {
      const gx = player.tx * TS, gy = player.ty * TS;
      player.px += Math.sign(gx - player.px) * 2;
      player.py += Math.sign(gy - player.py) * 2;
      if (player.px === gx && player.py === gy) { player.x = player.tx; player.y = player.ty; player.mv = 0; if (map[player.y][player.x] === "," && flags.silica && !flags.storm) storm(); }
    }
  }
  function drawDustOverlay() { if (!dust) return; ctx.fillStyle = "rgba(198, 108, 54, 0.12)"; ctx.fillRect(0, 0, VW, VH); for (let i = 0; i < 18; i += 1) { const x = (Date.now() / 16 + i * 31) % VW, y = (i * 23) % VH; rect(x, y, 22, 1, "rgba(255, 186, 108, 0.28)"); } }
  function drawTile(x, y) { terrainRenderer.drawSpiritTile(x, y); }
  function drawOpportunityTile(x, y) { terrainRenderer.drawOpportunityTile(x, y); }
  function frame() { updateMovement(); const cx = Math.max(0, Math.min(W * TS - VW, player.px + 8 - VW / 2)), cy = Math.max(0, Math.min(H * TS - VH, player.py + 8 - VH / 2)); ctx.clearRect(0, 0, VW, VH); ctx.save(); ctx.translate(-Math.round(cx), -Math.round(cy)); for (let y = Math.floor(cy / TS); y <= Math.ceil((cy + VH) / TS) && y < H; y += 1) for (let x = Math.floor(cx / TS); x <= Math.ceil((cx + VW) / TS) && x < W; x += 1) mission.id === "opportunity" ? drawOpportunityTile(x, y) : drawTile(x, y); const walkFrame = player.mv ? Math.floor(Date.now() / 110) % 4 : 0; const drawables = [...entities.filter((entity) => !entity.gone).map((entity) => ({ kind: entity.k, X: entity.x * TS, Y: entity.y * TS })), { kind: "pl", X: player.px, Y: player.py, step: walkFrame }]; drawables.sort((a, b) => a.Y - b.Y).forEach((item) => sprite(item.kind, item.X, item.Y, player.d, item.step || 0)); ctx.restore(); drawDustOverlay(); drawObjectiveGuide(cx, cy); drawCanvasLabels(cx, cy); drawNearbyLabels(cx, cy); requestAnimationFrame(frame); }
  function pressAction() { if (adv) adv(); else interact(); }
  const keyMap = { ArrowUp: "up", KeyW: "up", w: "up", W: "up", ArrowDown: "down", KeyS: "down", s: "down", S: "down", ArrowLeft: "left", KeyA: "left", a: "left", A: "left", ArrowRight: "right", KeyD: "right", d: "right", D: "right" };
  const movementFromEvent = (event) => keyMap[event.key] || keyMap[event.code];
  addEventListener("keydown", (event) => { if (event.key === "b" || event.key === "B") { event.preventDefault(); event.stopImmediatePropagation(); logPanel.classList.toggle("open"); return; } if (adv && ["Enter", " ", "e", "E"].includes(event.key)) { event.preventDefault(); event.stopImmediatePropagation(); if (!event.repeat) adv(); } }, true);
  addEventListener("keydown", (event) => { ensureAudio(); if (wireGame?.classList.contains("open")) { if (["Enter", " "].includes(event.key)) return; } if (stormGame?.classList.contains("open") && ["Enter", " ", "e", "E"].includes(event.key)) { event.preventDefault(); if (!event.repeat) lockStormPanel(); return; } if (scanGame?.classList.contains("open") && ["Enter", " ", "e", "E"].includes(event.key)) { event.preventDefault(); if (!event.repeat) lockScan(); return; } const dir = movementFromEvent(event); if (dir) { event.preventDefault(); if (cinematic?.classList.contains("is-hidden") && !adv && !questionPopup?.classList.contains("open") && !stormGame?.classList.contains("open") && !sampleGame?.classList.contains("open") && !scanGame?.classList.contains("open") && !wireGame?.classList.contains("open") && !signalGame?.classList.contains("open")) busy = false; keys[dir] = 1; } else if (["z", "Z", "Enter", " ", "e", "E"].includes(event.key)) { event.preventDefault(); if (!event.repeat) { if (cinematic && !cinematic.classList.contains("is-hidden")) cinematic.querySelector(".cinematic-start")?.click(); else pressAction(); } } });
  addEventListener("keyup", (event) => { const dir = movementFromEvent(event); if (dir) keys[dir] = 0; });
  addEventListener("blur", () => DIRS.forEach((dir) => { keys[dir] = 0; }));
  root.querySelectorAll("#pad button").forEach((button) => { const key = button.dataset.k; button.addEventListener("pointerdown", (event) => { event.preventDefault(); if (key === "act") pressAction(); else keys[key] = 1; }); ["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => button.addEventListener(eventName, () => { if (key !== "act") keys[key] = 0; })); });
  box.addEventListener("click", () => adv && adv());
  $("codexBtn").addEventListener("click", () => { codexFromEnd = false; $("cx").classList.toggle("open"); });
  $("closeCodex")?.addEventListener("click", () => { $("cx").classList.remove("open"); if (codexFromEnd) { codexFromEnd = false; $("end").style.display = "flex"; } });
  $("winCodex")?.addEventListener("click", () => { codexFromEnd = true; $("end").style.display = "none"; $("cx").classList.add("open"); });
  $("gameOverRestart")?.addEventListener("click", () => location.reload());
  musicButton?.addEventListener("click", toggleMusic);
  stormAction?.addEventListener("click", lockStormPanel);
  photoClose?.addEventListener("click", closePhoto);
  scanAction?.addEventListener("click", lockScan);
  photoPopup?.addEventListener("click", (event) => { if (event.target === photoPopup) closePhoto(); });
  cinematic?.querySelector(".cinematic-start")?.addEventListener("click", () => { ensureAudio(); startMusic(); playSfx("interact"); cinematic.classList.add("is-hidden"); busy = false; });
  $("restartBtn").addEventListener("click", () => location.reload());
  addEventListener("pointerdown", () => root.focus());
  hud(); frame();
  (async () => {
    if (cinematic) {
      await new Promise((resolve) => { cinematic.querySelector(".cinematic-start")?.addEventListener("click", resolve, { once: true }); });
    }
    showStoryNotice("MISSION BRIEFING", "Welcome, R.O.M. Your scanner is online. Find Dr. Vega to begin.", "GAME EVENT");
    setNotice("SYSTEM READY", "WASD / arrows: move · E / Enter: interact", "STABLE", "CLEAR");
    box.style.display = "none";
    endTurn();
  })();
}
