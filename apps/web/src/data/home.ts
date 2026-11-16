import translations from "../../../../content/project/home.json";
import spirit from "../../../../content/missions/spirit.json";
import opportunity from "../../../../content/missions/opportunity.json";
import apollo from "../../../../content/missions/apollo15.json";

export { translations };
export const copy = translations.en;

export const missions = [
  { id: "spirit", name: "Spirit", world: "mars", place: "spiritPlace", order: "spiritOrder", question: "spiritQuestion", body: "spiritBody", sourceId: "nasa_spirit", hardware: "spiritHardware", legacy: "spiritLegacy", source: spirit.sources.nasa_spirit.url },
  { id: "opportunity", name: "Opportunity", world: "mars", place: "opportunityPlace", order: "opportunityOrder", question: "opportunityQuestion", body: "opportunityBody", sourceId: "nasa_opportunity", hardware: "opportunityHardware", legacy: "opportunityLegacy", source: opportunity.sources.nasa_opportunity.url },
  { id: "apollo", name: "Apollo 15", world: "moon", place: "apolloPlace", order: "apolloOrder", question: "apolloQuestion", body: "apolloBody", sourceId: "nasa_apollo15", hardware: "apolloHardware", legacy: "apolloLegacy", source: apollo.sources.nasa_apollo15.url }
] as const;
export const steps = [
  { title: "discoverTitle", body: "discoverBody" },
  { title: "investigateTitle", body: "investigateBody" },
  { title: "rememberTitle", body: "rememberBody" }
] as const;
export const instruments = [
  { id: "camera", title: "camera", hint: "cameraHint", feedback: "labCamera", icon: "camera" },
  { id: "apxs", title: "apxs", hint: "apxsHint", feedback: "labCorrect", icon: "spectrum" },
  { id: "panel", title: "panel", hint: "panelHint", feedback: "labPanel", icon: "solar" }
] as const;
export const instrumentFact = { kind: "nasa_data", source_id: "pds_mer", source: spirit.sources.pds_mer.url };
