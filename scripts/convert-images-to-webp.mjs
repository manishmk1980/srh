import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const imagesDir = path.join(projectRoot, "public", "images");
const validExt = new Set([".jpg", ".jpeg", ".png"]);

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Never process or create public/images/source
    if (entry.isDirectory()) {
      if (entry.name.toLowerCase() === "source") continue;
      files.push(...await walk(fullPath));
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = path.extname(entry.name).toLowerCase();
    if (validExt.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  if (!await exists(imagesDir)) {
    console.log("public/images folder not found. Nothing to optimize.");
    return;
  }

  // Safety cleanup: remove empty public/images/source if any old script created it.
  const publicSourceDir = path.join(imagesDir, "source");
  if (await exists(publicSourceDir)) {
    const entries = await fs.readdir(publicSourceDir);
    if (entries.length === 0) {
      await fs.rm(publicSourceDir, { recursive: true, force: true });
      console.log("Removed empty public/images/source folder.");
    } else {
      console.warn("WARNING: public/images/source exists and is not empty. Move it outside public before build.");
    }
  }

  const sourceFiles = await walk(imagesDir);

  if (sourceFiles.length === 0) {
    console.log("No jpg, jpeg, or png images found to convert.");
    return;
  }

  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\..+/, "")
    .replace("T", "_");

  const backupRoot = path.join(projectRoot, `_private_image_source_backup_${stamp}`, "source");

  for (const src of sourceFiles) {
    const parsed = path.parse(src);
    const out = path.join(parsed.dir, `${parsed.name}.webp`);

    await sharp(src)
      .rotate()
      .webp({ quality: 82 })
      .toFile(out);

    const rel = path.relative(imagesDir, src);
    const backupPath = path.join(backupRoot, rel);
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.rename(src, backupPath);

    console.log(`Converted: ${rel} -> ${path.relative(imagesDir, out)}`);
  }

  console.log(`Original files moved to: ${backupRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
