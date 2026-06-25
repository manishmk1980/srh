import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const imagesDir = path.join(projectRoot, 'public', 'images');
const sourceDir = path.join(imagesDir, 'source');
const supportedExtensions = new Set(['.jpg', '.jpeg', '.png']);

const seoFileNames = new Map([
  ['clinicandhospital', 'clinic-hospital-kiosk-deployment-jharkhand-srh-swasth-seva.webp'],
  ['community-health-screening', 'community-health-screening-jharkhand-srh-swasth-seva.webp'],
  ['csr-ngo-healthprogram', 'csr-ngo-health-programs-jharkhand-srh-swasth-seva.webp'],
  ['industrialandworkforce', 'industrial-workforce-wellness-jharkhand-srh-swasth-seva.webp'],
  ['srh-logo', 'srh-swasth-seva-logo.webp'],
]);

async function getImageFiles(directory) {
  const files = await readdir(directory, { withFileTypes: true });
  return files
    .filter((file) => {
      const extension = path.extname(file.name).toLowerCase();
      return file.isFile() && supportedExtensions.has(extension);
    })
    .map((file) => ({
      name: file.name,
      inputPath: path.join(directory, file.name),
    }));
}

async function convertImages() {
  await mkdir(sourceDir, { recursive: true });

  const imageFiles = [
    ...(await getImageFiles(sourceDir)),
    ...(await getImageFiles(imagesDir)),
  ];

  if (imageFiles.length === 0) {
    console.log('No jpg, jpeg, or png images found to convert.');
    return;
  }

  for (const file of imageFiles) {
    const extension = path.extname(file.name).toLowerCase();
    const baseName = path.basename(file.name, extension);
    const outputName = seoFileNames.get(baseName) ?? `${baseName.toLowerCase().replaceAll(/\s+/g, '-')}.webp`;
    const outputPath = path.join(imagesDir, outputName);

    await sharp(file.inputPath)
      .rotate()
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`Converted ${file.name} -> ${outputName}`);
  }
}

convertImages().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
