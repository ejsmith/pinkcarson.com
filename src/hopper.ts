import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/fraunces/latin-400.css";
import "@fontsource/fraunces/latin-400-italic.css";
import "@fontsource/fraunces/latin-500.css";
import "./style.css";
import "./hopper.css";
import { profile } from "./content";
import { hopperChapters } from "./hopper-content";
import type { HopperPhoto } from "./hopper-content";
import { arrow, arrowUp, heart, paw, star } from "./illustrations";

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]!,
  );

const name = escape(profile.name);
const homeUrl = escape(import.meta.env.BASE_URL);
const imageBase = `${import.meta.env.BASE_URL}images/chief-hopper/`;
const heroId = "9653";

interface ViewerPhoto extends HopperPhoto {
  chapter: string;
}
const photos: ViewerPhoto[] = hopperChapters.flatMap((chapter) =>
  chapter.photos.map((photo) => ({ ...photo, chapter: chapter.title })),
);

// "13:45" → "1:45 pm"
function clock(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;
}
function timeRange(chapter: (typeof hopperChapters)[number]) {
  const times = chapter.photos.map((photo) => photo.time).sort();
  const first = clock(times[0]);
  const last = clock(times[times.length - 1]);
  return first === last ? first : `${first} – ${last}`;
}
const src = (photo: HopperPhoto, small = false) =>
  `${imageBase}hopper-${photo.id}${small ? "-640" : ""}.webp`;

function photoButton(photo: ViewerPhoto, index: number, className: string, sizes: string, eager = false) {
  return `<button class="photo-button ${className}" type="button" data-photo="${index}" aria-label="View photo: ${escape(photo.caption)}"><img src="${escape(src(photo, true))}" srcset="${escape(src(photo, true))} 640w, ${escape(src(photo))} 1280w" sizes="${sizes}" width="${photo.width}" height="${photo.height}" alt="${escape(photo.caption)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" /><span class="photo-expand" aria-hidden="true">${arrowUp}</span></button>`;
}

const heroIndex = Math.max(0, photos.findIndex((photo) => photo.id === heroId));
const firstTime = clock(photos.map((photo) => photo.time).sort()[0]);
const lastTime = clock(photos.map((photo) => photo.time).sort().at(-1)!);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="wordmark" href="${homeUrl}" aria-label="${name}, home">${paw}<span>${name}<span class="wordmark-dot">.</span></span></a>
      <a class="nav-contact hopper-home" href="${homeUrl}">Visit my grooming portfolio ${arrow}</a>
    </div>
  </header>
  <main id="main" tabindex="-1">
    <section class="hopper-hero container" aria-labelledby="hopper-title">
      <div class="hopper-hero-copy">
        <p class="eyebrow"><span class="short-line"></span> CHIEF HOPPER · NOVEMBER 7, 2026</p>
        <h1 id="hopper-title">One last day<br><em>with Hopper.</em></h1>
        <p class="hero-description">Saturday was our last day together. From the first brush in the morning to saying goodbye in the field, here’s how we spent it.</p>
        <p class="hopper-meta">${heart}<span>${firstTime} to ${lastTime} · ${photos.length} photos</span></p>
        <a class="button button-dark" href="#${hopperChapters[0].slug}">Start at the beginning ${arrow}</a>
      </div>
      <figure class="hopper-hero-photo">
        ${photoButton(photos[heroIndex], heroIndex, "hopper-hero-button", "(max-width: 760px) 100vw, 640px", true)}
        <figcaption><span class="note-line" aria-hidden="true">↳</span> ${escape(photos[heroIndex].caption)}.</figcaption>
      </figure>
    </section>

    <nav class="values-strip hopper-chapters" aria-label="Chapters of the day"><div class="container values-strip-inner">${hopperChapters.map((chapter, index) => `${index ? star : ""}<a href="#${chapter.slug}">${escape(chapter.title)}</a>`).join("")}</div></nav>

    ${(() => {
      let offset = 0;
      return hopperChapters
        .map((chapter, chapterIndex) => {
          const start = offset;
          offset += chapter.photos.length;
          return `<section class="hopper-chapter section container" id="${chapter.slug}" aria-labelledby="${chapter.slug}-title">
        <div class="section-heading"><div><p class="eyebrow">${String(chapterIndex + 1).padStart(2, "0")} · ${escape(timeRange(chapter).toUpperCase())}</p><h2 id="${chapter.slug}-title">${escape(chapter.title)}</h2></div><p>${chapter.photos.length} ${chapter.photos.length === 1 ? "photo" : "photos"}</p></div>
        <div class="hopper-grid">${chapter.photos.map((_, index) => photoButton(photos[start + index], start + index, "hopper-photo", "(max-width: 560px) 92vw, (max-width: 1050px) 46vw, 380px")).join("")}</div>
      </section>`;
        })
        .join("");
    })()}

    <section class="hopper-closing container" aria-label="Closing note">
      <p class="hopper-signoff">“Hopper”<br>loved by Carson Smith.</p>
      <span class="hopper-signoff-mark" aria-hidden="true">${heart}</span>
    </section>
  </main>
  <footer class="site-footer container"><a class="wordmark" href="${homeUrl}" aria-label="${name}, home">${paw}<span>${name}<span class="wordmark-dot">.</span></span></a><p>Pink hair. Happy dogs. A whole lot of heart.</p><span class="copyright">© ${new Date().getFullYear()} ${name}</span></footer>
  <dialog class="photo-dialog hopper-dialog" aria-labelledby="photo-title"><button class="dialog-close" type="button" aria-label="Close photo">✕</button><img class="dialog-image" alt="" /><div class="dialog-controls"><button class="dialog-previous" type="button" aria-label="Previous photo">${arrow}</button><span class="dialog-count" aria-live="polite"></span><button class="dialog-next" type="button" aria-label="Next photo">${arrow}</button></div><div class="dialog-caption"><h3 id="photo-title"></h3><p></p></div></dialog>
`;

const dialog = document.querySelector<HTMLDialogElement>(".photo-dialog")!;
const dialogImage = dialog.querySelector<HTMLImageElement>("img")!;
let activePhoto = 0;
function preload(index: number) {
  const photo = photos[(index + photos.length) % photos.length];
  new Image().src = src(photo);
}
function showPhoto(index: number) {
  activePhoto = (index + photos.length) % photos.length;
  const photo = photos[activePhoto];
  dialogImage.src = src(photo);
  dialogImage.alt = photo.caption;
  dialog.querySelector("h3")!.textContent = photo.caption;
  dialog.querySelector(".dialog-caption p")!.textContent = `${photo.chapter} · ${clock(photo.time)}`;
  dialog.querySelector(".dialog-count")!.textContent = `${activePhoto + 1} / ${photos.length}`;
  preload(activePhoto + 1);
  preload(activePhoto - 1);
}
document.querySelectorAll<HTMLButtonElement>("[data-photo]").forEach((button) =>
  button.addEventListener("click", () => {
    showPhoto(Number(button.dataset.photo));
    dialog.showModal();
    document.body.classList.add("dialog-open");
  }),
);
dialog.querySelector(".dialog-close")!.addEventListener("click", () => dialog.close());
dialog.querySelector(".dialog-previous")!.addEventListener("click", () => showPhoto(activePhoto - 1));
dialog.querySelector(".dialog-next")!.addEventListener("click", () => showPhoto(activePhoto + 1));
dialog.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(activePhoto + (event.key === "ArrowLeft" ? -1 : 1));
  }
});
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)
  )
    dialog.close();
});
let touchStart: number | null = null;
dialogImage.addEventListener("touchstart", (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
dialogImage.addEventListener("touchend", (event) => {
  if (touchStart === null) return;
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 45) showPhoto(activePhoto + (distance < 0 ? 1 : -1));
  touchStart = null;
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
