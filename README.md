# NASA: Lost Missions

<p align="center">
  <img src="apps/web/public/assets/rom/poses/greeting.png" alt="R.O.M. greeting" width="160" />
  <img src="apps/web/public/assets/rom/poses/scanning.png" alt="R.O.M. scanning" width="160" />
  <img src="apps/web/public/assets/rom/poses/success.png" alt="R.O.M. mission success" width="160" />
</p>

> Interactive storytelling for the **NASA Space Apps Challenge 2026**: *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*.

## Project Structure

### 1. Project summary
**NASA: Lost Missions** is a static, bilingual (EN/ES) web experience that turns NASA hardware left on Mars and the Moon into short, playable investigations. Players explore real mission sites with **R.O.M.**, connect instruments to discoveries, and unlock a codex that separates **NASA DATA** from **ARCHIVE SIMULATION** and **GAME EVENT**.

- **Playable MVP:** Spirit (MER-A, Gusev Crater) and Opportunity (MER-B, Meridiani Planum).
- **Coming soon:** Apollo 15 (lunar hardware: LRV, ALSEP, LRRR) — page/teaser only.
- **No backend:** built as a static site.

### 2. Project demo (YouTube / 30s video)
- **Demo video (YouTube / 30s):** *To be added*
- **Quick preview:** run locally and visit `/`, `/missions`, `/story`, `/opportunity`.

### 3. Project: Link
- **Repository:** this repo
- **Live site:** *To be added* (deploy from `apps/web/dist`)
- **Local:** `http://localhost:4321`

### 4. Project details

## Executive Summary
Lost Missions helps families and students understand what was left behind, what it discovered, why it stayed, and its current status—using sourced NASA facts, clear labeling, and lightweight RPG-style exploration.

<p align="center">
  <img src="apps/web/public/assets/rom/poses/mission-received.png" alt="Mission received" width="140" />
  <img src="apps/web/public/assets/rom/poses/analyzing.png" alt="Analyzing evidence" width="140" />
  <img src="apps/web/public/assets/rom/poses/celebration.png" alt="Celebration" width="140" />
</p>

---

## 1. Project description

### 1.1. What does it do?
- Presents Mars/Moon missions focused on hardware left behind.
- Lets players explore, inspect objects, solve labeled simulations/minigames, and answer questions.
- Unlocks a **codex** with mission facts, hardware status, images, and NASA source links.
- Supports **EN/ES** and clearly tags content provenance.

### 1.2. How does it work?
1. **Home (`/`)** introduces the archive and R.O.M.
2. **Mission map (`/missions`)** selects a destination.
3. **RPG (`/story`, `/opportunity`)** drives investigation through dialogue, clues, and minigames (engineering/science simulations that do not change historical outcomes).
4. **Codex & sources:** verified facts/images are stored in JSON with `source_id`/URLs and shown with attribution.

### 1.3. Innovation and purpose
- Storytelling centered on the **scientific legacy** of silent machines.
- Explicit separation of **fact vs. simulation vs. fiction** for trustworthy learning.

### 1.4. Benefits and impact
#### A. Social, environmental, and technological benefits
- **Social/educational:** accessible space-science learning for non-experts.
- **Environmental (outreach):** context for past Martian environments (e.g. water-related evidence).
- **Technological:** highlights instruments, solar power, communication, and remote operations challenges.

#### B. Contribution to SDGs or space missions
- **SDG 4 (Quality Education)** and **SDG 9 (Innovation)**.
- Aligned with **NASA Mars Exploration Rovers (Spirit/Opportunity)** and **Apollo 15** hardware context (data/preparation).

#### C. Expected community impact
- Encourages curiosity and critical thinking by linking stories to primary NASA sources.

### 1.5. Objectives and expected outcomes
- **Objective:** tell verified, engaging stories of equipment left on Mars/Moon.
- **Outcomes (MVP):** two playable RPG missions with sourced codex, Apollo 15 coming-soon page, EN/ES content, validated static build.

### 1.6. Methodology and work plan
| Phase | Main activities | Intermediate deliverables |
|---|---|---|
| Definition | Select missions/artifacts, narrative & data model | Initial `content/` mission schemas |
| Web implementation | Astro site, map, shared RPG engine, minigames | `/`, `/missions`, `/story`, `/opportunity` |
| Data & sources | Add verified facts/images with attribution | Sourced JSON, gallery, codex, status |
| i18n & review | EN/ES, accuracy and UX fixes | Bilingual content, corrected sources/dates |
| Polish & docs | Validation/build, documentation | Green checks, README |

*Examples:* sourced NASA data/images, date/state verification, progress screenshots.

### 1.7. Methodology and tools
#### 1.7.1. Tools and software
- **Astro 4** (static site), **pnpm**, **Node.js** scripts, **@astrojs/check** + **TypeScript**, **Git**.
- No CI/automated tests configured.

#### 1.7.2. Programming languages and framework
- **Framework:** Astro. **Languages:** JavaScript/TypeScript, HTML, CSS, JSON.

#### 1.7.3. Hardware and sensors
- N/A (software project). Content describes real mission hardware/instruments (MER rovers, APXS/RAT/cameras, LRV/ALSEP/LRRR).

### 1.8. Project management
| Member | Role | Description |
|---|---|---|
| *To be defined* | *To be defined* | Team members/roles not listed in this repository. |

> Update with actual team information.

### 1.9. Project location
- Software project (no specific physical location stated). Static output: `apps/web/dist` (hosting TBD).

### Project justification
The challenge calls for stories about discarded/left-behind NASA equipment. This project answers with an interactive, source-backed experience that preserves scientific context and legacy.

### 1.10. Impact and benefits
- **Relevance to NASA mission / strategic alignment:** communicates planetary and lunar exploration heritage using NASA data/images with attribution and clear fact/simulation boundaries.

### 1.11. Expected results
- Functional MVP (Spirit & Opportunity), sourced codex, Apollo 15 teaser, reproducible static build with validated content.

### 1.12. Conclusions and future improvements
- **Lessons learned:** separating verified data from simulations and keeping per-fact sources improves trust and review.
- **Future work:** complete Apollo 15 mission, localize/optimize key images, add comparison/educational layers, accessibility/SEO, and CI/tests.

### 1.13. Annexes / Appendices

- Screenshots, UI/codex views, and NASA image details to be added as available (see `apps/web/public/assets/` and mission galleries).
<p align="center">
  <img src="apps/web/public/assets/mission-map-pixel.png" alt="Mission Map" width="auto" />
  <img src="apps/web/public/assets/home/mars.jpg" alt="Mars Pixel" width="auto" />
  <img src="apps/web/public/assets/home/moon.jpg" alt="Moon.jpg" width="auto" />
  <img src="apps/web/public/assets/rom/poses/repairing.png" alt="ROM Repairing" width="160" />
  <img src="apps/web/public/assets/rom/poses/idea.png" alt="ROM Idea" width="160" />
  <img src="apps/web/public/assets/rom/poses/thinking.png" alt="ROM Thinking" width="160" />
</p>


---

## 5. Use of AI
- **AI-assisted development** (LLM-based tools, e.g. in OpenCode) supported coding, refactoring, content fixes, and documentation.
- **Human oversight:** sources, facts, and NASA attributions require human review; verified items are backed by `source_id`/links in `content/`. Scientific data credit remains with NASA and cited sources.

## 6. NASA data (NASA links)
Key sources referenced in project content:
- **Spirit:** https://science.nasa.gov/mission/mer-spirit/ · https://pds-geosciences.wustl.edu/missions/mer/ · https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/science-highlights/ · https://science.nasa.gov/photojournal/rovers-wheel-churns-up-bright-martian-soil-stereo/
- **Opportunity:** https://science.nasa.gov/mission/mer-opportunity/ · https://science.nasa.gov/missions/mer/nasas-opportunity-rover-mission-on-mars-comes-to-end/ · https://pds-geosciences.wustl.edu/missions/mer/ · https://science.nasa.gov/resource/opportunitys-last-message/
- **Apollo 15 (data/prep):** https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html · https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C · https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1971-063C-08
- Facts shown as `NASA DATA` include source links; image credits are kept with content.

## 7. Space agency partners (other programs)
- **NASA / NASA Science / JPL-Caltech / mission archives** as cited data and imagery sources.
- **NASA Space Apps Challenge** as the challenge framework.
- Other formal partners: *not specified in this repository*.

---

## Run & technical structure
```bash
corepack pnpm install
corepack pnpm run dev        # http://localhost:4321
corepack pnpm run validate   # validate content/**/*.json
corepack pnpm run typecheck  # astro check
corepack pnpm run build      # static output: apps/web/dist
```
- `apps/web` — Astro site, components, shared RPG engine, styles
- `content/` — mission/copy data (source of truth)
- `apps/web/public/assets` — static assets (including R.O.M.)
