import { createWriteStream } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, sep } from "node:path";
import { finished } from "node:stream/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import PDFDocument from "pdfkit";

const root = new URL("../", import.meta.url);
const resume = JSON.parse(await readFile(new URL("content/resume.json", root), "utf8"));
const privateCopy = process.argv.includes("--private");
const privateDirectory = pathToFileURL(join(homedir(), "Documents", "Carson", "Resume") + sep);
// Private contact information is read only for an explicitly requested local copy.
const contact = privateCopy
  ? JSON.parse(await readFile(new URL("resume-contact.json", privateDirectory), "utf8"))
  : null;
if (privateCopy && (typeof contact.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))) {
  throw new Error("Provide a valid email in ~/Documents/Carson/Resume/resume-contact.json.");
}
const outputDirectory = privateCopy ? privateDirectory : new URL("public/", root);
const output = new URL("carson-smith-resume.pdf", outputDirectory);
await mkdir(outputDirectory, { recursive: true, mode: privateCopy ? 0o700 : 0o755 });

const colors = { ink: "#422F3D", muted: "#705767", pink: "#A12B63", pale: "#FFF0F6", line: "#E8CBDA" };
const margin = 46;
const width = 612 - margin * 2;
const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: margin, bottom: margin, left: margin, right: margin },
  bufferPages: true,
  pdfVersion: "1.7",
  tagged: true,
  displayTitle: true,
  lang: "en-US",
  info: {
    Title: `${resume.name} — Résumé`,
    Author: resume.name,
    Subject: "Dog grooming experience, skills and recognition",
    Keywords: "Carson Smith, dog groomer, resume, Groom Texas, Pink Carson",
  },
});

for (const [name, path] of Object.entries({
  Body: "dm-sans/files/dm-sans-latin-400-normal.woff",
  Medium: "dm-sans/files/dm-sans-latin-600-normal.woff",
  Bold: "dm-sans/files/dm-sans-latin-700-normal.woff",
  Display: "fraunces/files/fraunces-latin-400-normal.woff",
})) {
  doc.registerFont(name, fileURLToPath(new URL(`node_modules/@fontsource/${path}`, root)));
}

const structure = doc.struct("Document");
doc.addStructure(structure);
let y = 40;

function artifact(draw) {
  doc.markContent("Artifact", { type: "Layout" });
  draw();
  doc.endMarkedContent();
}

function text(value, { x = margin, size = 10.5, font = "Body", color = colors.ink, type = "P", ...options } = {}) {
  doc.font(font).fontSize(size).fillColor(color);
  doc.text(value, x, y, {
    width: width - (x - margin),
    lineGap: 2.5,
    structParent: structure,
    structType: type,
    ...options,
  });
  y = doc.y;
}

function heading(value) {
  text(value.toUpperCase(), { size: 9, font: "Bold", color: colors.pink, type: "H2", characterSpacing: 1.4 });
  y += 6;
}

// Keep decoration separate from the PDF's logical reading order.
artifact(() => doc.rect(0, 0, 612, 140).fill(colors.pale));
artifact(() => doc.rect(margin, 29, 30, 3).fill(colors.pink));
text(resume.name, { size: 37, font: "Display", type: "H1", lineGap: 0 });
y += 1;
text(resume.role, { size: 13, font: "Medium", color: colors.pink });
y += 9;
const linkY = y;
text("Portfolio: pinkcarson.com", { size: 10, link: resume.portfolioUrl, underline: true });
y = linkY;
text(privateCopy ? contact.email : "Contact Carson", {
  x: 365,
  size: 10,
  link: privateCopy ? `mailto:${contact.email}` : resume.contactUrl,
  underline: true,
});

y = 159;
text(resume.summary, { size: 11, lineGap: 3 });
y += 15;

heading("Experience");
text(resume.experience.role, { size: 13, font: "Bold", type: "H3" });
y += 2;
text(`${resume.experience.company} · ${resume.experience.location}`, { font: "Medium" });
y += 1;
text(resume.experience.tenure, { size: 9.5, color: colors.muted });
y += 9;
doc.font("Body").fontSize(10.5).fillColor(colors.ink);
const list = doc.struct("L");
structure.add(list);
doc.list(resume.experience.highlights, margin + 2, y, {
  width: width - 2,
  bulletRadius: 1.7,
  bulletIndent: 0,
  textIndent: 12,
  lineGap: 2,
  paragraphGap: 5,
  structParent: list,
});
y = doc.y + 10;

heading("Recognition");
const awardTop = y - 2;
doc.font("Body").fontSize(10.5);
const awardHeight = 55 + doc.heightOfString(resume.award.description, { width: width - 30, lineGap: 2.5 });
artifact(() => {
  doc.roundedRect(margin, awardTop, width, awardHeight, 7).fill(colors.pale);
  doc.rect(margin, awardTop + 12, 3, awardHeight - 24).fill(colors.pink);
});
y = awardTop + 12;
text(resume.award.title, { x: margin + 15, width: width - 30, size: 12, font: "Bold", type: "H3" });
y += 2;
text(`${resume.award.event} · ${resume.award.division}`, { x: margin + 15, width: width - 30, size: 9.5, color: colors.pink, font: "Medium" });
y += 6;
text(resume.award.description, { x: margin + 15, width: width - 30 });
y = awardTop + awardHeight + 14;

heading("Grooming skills");
text(`${resume.skills.slice(0, 3).join("  ·  ")}\n${resume.skills.slice(3).join("  ·  ")}`, { lineGap: 3 });
y += 12;

heading("Training");
text(resume.training);
y += 12;

heading("Animal care & equestrian experience");
text(resume.animalExperience);

if (doc.bufferedPageRange().count !== 1 || y > 730) {
  throw new Error(`Résumé must fit one page with space for its footer. Content ends at ${y.toFixed(1)}pt.`);
}

artifact(() => doc.moveTo(margin, 750).lineTo(612 - margin, 750).lineWidth(0.6).stroke(colors.line));
y = 759;
// Footer stays inside the page's text area to prevent an automatic extra page.
doc.page.margins.bottom = 18;
text("Grooming portfolio & contact · pinkcarson.com", { size: 9, color: colors.muted, link: resume.portfolioUrl });

const stream = createWriteStream(output, { mode: privateCopy ? 0o600 : 0o644 });
doc.pipe(stream);
doc.end();
await finished(stream);
console.log(`Created ${fileURLToPath(output)} (1 page)`);
