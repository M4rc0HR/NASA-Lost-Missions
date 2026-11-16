import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const errors = [];
const warnings = [];

async function listJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

function getParam(url, key) {
  const match = String(url).match(new RegExp(`[?&]${key}=(\\d+)`));
  return match ? Number(match[1]) : null;
}

function checkRecord(record, location, context) {
  if (!record || typeof record !== "object") return;

  if (record.kind === "nasa_data" && !record.source_id) {
    errors.push(`${location} is nasa_data but has no source_id`);
  }

  if (typeof record.source_id === "string") {
    if (record.source_id.startsWith("TODO_VERIFY") || record.source_id.includes("TODO_VERIFY")) {
      errors.push(`${location} uses a TODO_VERIFY source_id`);
    } else if (context.sourceIds && !context.sourceIds.has(record.source_id)) {
      errors.push(`${location} references unknown source_id "${record.source_id}"`);
    }
  }

  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string" && value.includes("TODO_VERIFY")) {
      errors.push(`${location}.${key} contains TODO_VERIFY`);
    }

    if (key === "image_url" && typeof value === "string") {
      const w = getParam(value, "w");
      const h = getParam(value, "h");
      if ((w && w > 4000) || (h && h > 4000)) {
        warnings.push(`${location}.${key} requests a very large image (${w || "?"}x${h || "?"})`);
      }
      if (context.imageIndex) {
        if (!context.imageIndex.has(value)) context.imageIndex.set(value, []);
        context.imageIndex.get(value).push(location);
      }
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => checkRecord(item, `${location}.${key}[${index}]`, context));
    } else if (value && typeof value === "object") {
      checkRecord(value, `${location}.${key}`, context);
    }
  }
}

const files = await listJsonFiles(contentRoot);
const imageIndex = new Map();

for (const file of files) {
  const relative = path.relative(root, file);
  const data = JSON.parse(await readFile(file, "utf8"));
  const sourceIds = data && typeof data === "object" && data.sources && typeof data.sources === "object"
    ? new Set(Object.keys(data.sources))
    : null;

  if (sourceIds && data.sources) {
    for (const [id, source] of Object.entries(data.sources)) {
      if (!source || typeof source !== "object") {
        errors.push(`${relative}.sources.${id} must be an object`);
        continue;
      }
      if (typeof source.label !== "string" || !source.label.trim()) errors.push(`${relative}.sources.${id}.label is missing`);
      if (typeof source.url !== "string" || !/^https?:\/\//.test(source.url)) errors.push(`${relative}.sources.${id}.url must be an http(s) URL`);
    }
  }

  if (Array.isArray(data?.gallery)) {
    data.gallery.forEach((item, index) => {
      if (!item?.source_id) errors.push(`${relative}.gallery[${index}] is missing source_id`);
    });
  }

  checkRecord(data, relative, { sourceIds, imageIndex });
}

for (const [url, locations] of imageIndex.entries()) {
  if (locations.length > 1) {
    warnings.push(`Duplicate image_url used in multiple records: ${locations.join(", ")}`);
  }
}

if (errors.length > 0) {
  console.error("Content validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  if (warnings.length > 0) {
    console.error("Warnings:");
    for (const warning of warnings) console.error(`- ${warning}`);
  }
  process.exit(1);
}

console.log(`Content validation passed: ${files.length} JSON files checked, ${warnings.length} warning(s).`);
for (const warning of warnings) console.warn(`- ${warning}`);