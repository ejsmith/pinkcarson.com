import { copyFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../assets/icon.svg", import.meta.url);
const output = new URL("../public/", import.meta.url);
await mkdir(output, { recursive: true });
await copyFile(source, new URL("favicon.svg", output));

const svg = await readFile(source);
for (const [file, size] of [["favicon-32.png", 32], ["apple-touch-icon.png", 180]]) {
  await sharp(svg, { density: 288 })
    .resize(size, size)
    .png()
    .toFile(fileURLToPath(new URL(file, output)));
}
console.log("Prepared matching paw icons for browsers and Apple touch shortcuts.");
