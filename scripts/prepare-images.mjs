import { mkdir, readdir, stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Build responsive web copies without retouching or cropping the photographs.
// Sharp applies orientation and omits camera/GPS metadata from these outputs.
const source = fileURLToPath(new URL("../assets/photos/", import.meta.url));
const output = fileURLToPath(new URL("../public/images/", import.meta.url));
await mkdir(output, { recursive: true });
let sourceBytes = 0;
let outputBytes = 0;
for (const file of (await readdir(source)).sort()) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const input = join(source, file);
  sourceBytes += (await stat(input)).size;
  const stem = basename(file, extname(file));
  for (const width of [640, 1280]) {
    const destination = join(
      output,
      `${stem}${width === 640 ? "-640" : ""}.webp`,
    );
    const info = await sharp(input)
      .autoOrient()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 5 })
      .toFile(destination);
    outputBytes += info.size;
  }
}
console.log(
  `Prepared responsive photos: ${(sourceBytes / 1024 / 1024).toFixed(1)} MB of originals → ${(outputBytes / 1024 / 1024).toFixed(1)} MB of web images (both sizes combined).`,
);
