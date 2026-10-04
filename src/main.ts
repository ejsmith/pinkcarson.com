import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "@fontsource/fraunces/latin-400.css";
import "@fontsource/fraunces/latin-400-italic.css";
import "@fontsource/fraunces/latin-500.css";
import "./style.css";
import { profile } from "./content";
import { sendContactMessage } from "./contact";
import type { PortfolioPhoto } from "./content";
import {
  arrow,
  arrowUp,
  dogIllustration,
  heart,
  paw,
  sprout,
  star,
} from "./illustrations";

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
const detailPhotos = [
  ...profile.photos,
  profile.award.photo,
  ...profile.award.moments,
  ...profile.personalPhotos,
];
const competitionPhotoOffset = profile.photos.length + 1;
const personalPhotoOffset = competitionPhotoOffset + profile.award.moments.length;
const galleryBatchSize = 6;
const initialPhotoCount = Math.min(galleryBatchSize, profile.photos.length);
function photoButton(
  photo: PortfolioPhoto,
  index: number,
  className = "",
  sizes = "(max-width: 760px) 90vw, 45vw",
) {
  return `<button class="photo-button ${className}" type="button" data-photo="${index}" aria-label="View ${escape(photo.title)}"><img src="${escape(photo.src)}" ${photo.srcSet ? `srcset="${escape(photo.srcSet)}" sizes="${sizes}"` : ""} alt="${escape(photo.alt)}" loading="lazy" decoding="async" /><span class="photo-expand" aria-hidden="true">${arrowUp}</span></button>`;
}

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="wordmark" href="#home" aria-label="${name}, home">${paw}<span>${name}<span class="wordmark-dot">.</span></span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav"><span class="menu-label">Menu</span><span class="menu-lines" aria-hidden="true"></span></button>
      <nav class="main-nav" id="main-nav" aria-label="Main navigation">
        <a href="#portfolio">Portfolio</a>
        <a href="#about">Meet ${name}</a>
        <a href="#approach">My approach</a>
        <a class="nav-contact" href="#contact">Say hello ${heart}</a>
      </nav>
    </div>
  </header>
  <main id="main" tabindex="-1">
    <section class="hero container" id="home" aria-labelledby="hero-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="short-line"></span> THE GROOMING PORTFOLIO OF ${name.toUpperCase()}</p>
        <h1 id="hero-title">Good dogs.<br>Great <em>hair days.</em></h1>
        <p class="hero-role">Dog groomer. Horse rider. <span>Animal lover.</span></p>
        <p class="hero-description">${escape(profile.introduction)}</p>
        <a class="button button-dark" href="#portfolio">See my grooming work ${arrow}</a>
        <a class="hero-secondary" href="#about">A little about me ${heart}</a>
      </div>
      <div class="hero-art ${profile.portrait ? "has-portrait" : ""}">
        ${profile.portrait ? `<div class="portrait-frame"><div class="portrait-window ${profile.portrait.framing === "horse" ? "portrait-horse" : ""}"><img class="hero-portrait" src="${escape(profile.portrait.src)}" ${profile.portrait.srcSet ? `srcset="${escape(profile.portrait.srcSet)}" sizes="(max-width: 760px) 100vw, 600px"` : ""} alt="${escape(profile.portrait.alt)}" width="1242" height="1770" fetchpriority="high" /></div></div><div class="portrait-mascot">${dogIllustration}<span>Beau ♡</span></div>` : dogIllustration}
        <div class="round-stamp" aria-hidden="true"><span>A LITTLE FLUFF</span>${heart}<span>A LOT OF LOVE</span></div>
        <div class="art-note"><span class="note-line" aria-hidden="true">↳</span> ${profile.portrait ? escape(profile.portrait.caption) : "Beauregard, my little sidekick."}</div>
      </div>
      <a href="#portfolio" class="scroll-hint">The good stuff is this way <span aria-hidden="true">↓</span></a>
    </section>

    <div class="values-strip" aria-label="A few of my favorite things"><div class="container values-strip-inner"><span>Fresh grooms</span>${star}<span>Happy little faces</span>${star}<span>A little bit of pink</span>${star}<span>Care in the details</span></div></div>

    <section class="portfolio-section section" id="portfolio" aria-labelledby="portfolio-title">
      <div class="container">
        <div class="section-heading"><div><p class="eyebrow">THE FLOOF FILES</p><h2 id="portfolio-title">A few fresh looks.<br><em>A lot of good dogs.</em></h2></div><p>A collection of my grooming work,<br>one very good dog at a time.</p></div>
        ${
          profile.photos.length
            ? `<div class="portfolio-grid" id="grooming-gallery">${profile.photos.map((photo, index) => `<article class="portfolio-card" ${index >= initialPhotoCount ? "hidden" : ""}>${photoButton(photo, index, "", "(max-width: 760px) 90vw, (max-width: 1050px) 45vw, 30vw")}<div class="portfolio-caption"><h3>${escape(photo.title)}</h3><p>${escape(photo.description)}</p><button class="photo-detail-link" type="button" data-photo="${index}" aria-label="Read more about ${escape(photo.title)}">Take a closer look ${arrowUp}</button></div></article>`).join("")}</div><div class="gallery-footer"><p id="gallery-count" role="status">Showing ${initialPhotoCount} of ${profile.photos.length} photos</p>${profile.photos.length > initialPhotoCount ? `<button class="button button-outline" id="gallery-more" type="button" aria-controls="grooming-gallery">Show more grooms ${paw}</button>` : ""}</div>`
            : `
        <div class="portfolio-empty">
          <div class="photo-stack" aria-hidden="true"><div class="photo-sheet sheet-back"><div>${star}</div></div><div class="photo-sheet sheet-front"><div>${paw}<span>very good dogs inside</span></div><span class="photo-handwriting">fresh from the salon ♡</span></div><span class="stack-spark">${star}</span></div>
          <div class="portfolio-empty-copy"><span class="small-label">THE DOGS ARE CUTE. THE PHOTOS ARE COMING.</span><h3>A little fluff is<br>on its way.</h3><p>I’m putting together photos of my grooming work, from fresh baths to finishing touches. There are some very cute faces waiting for their moment.</p><span class="coming-soon">${heart} Photos coming soon</span></div>
        </div>`
        }
      </div>
    </section>

    <section class="about-section section container" id="about" aria-labelledby="about-title">
      <div class="section-intro"><p class="eyebrow">THE GIRL BEHIND THE PINK HAIR</p><h2 id="about-title">Hi, I’m ${name}.<br><em>Most at home with animals.</em></h2><div class="about-flower" aria-hidden="true">✿</div></div>
      <div class="about-copy"><p class="lead">A love for animals.<br>A craft I care about.</p><p>${escape(profile.about)}</p><div class="about-detail">${heart}<span>Getting to know each dog is one of my favorite parts.</span></div>${profile.resumeUrl ? `<a class="text-link" href="${escape(profile.resumeUrl)}" target="_blank" rel="noopener">View my résumé ${arrowUp}</a>` : ""}</div>
    </section>

    <section class="animal-section section container" aria-labelledby="animal-title"><div class="section-heading"><div><p class="eyebrow">BEYOND THE GROOMING TABLE</p><h2 id="animal-title">A life with animals.<br><em>The best kind, really.</em></h2></div><p>A few of the animals and experiences<br>that mean a lot to me.</p></div><div class="animal-grid"><article><span class="animal-symbol">${star}</span><h3>Chief Hopper & me.</h3><p>I’ve been riding since I was about eight. My horse, Chief Hopper, is named after the character from <em>Stranger Things</em>. I’ve competed in many horse jumping shows and won numerous awards over the years.</p></article><article><span class="animal-symbol">${paw}</span><h3>My corgi, Beauregard.</h3><p>Beauregard — Beau for short — is my corgi. Alongside Chief Hopper and the puppies I’ve fostered, he’s part of a life that has always revolved around animals.</p></article><article><span class="animal-symbol">${heart}</span><h3>A home for little paws.</h3><p>I’ve always loved dogs and have fostered many puppies. Looking after animals has been part of my life long before I picked up grooming tools.</p></article></div><div class="personal-photos">${profile.personalPhotos.map((photo, index) => `<figure class="memory-photo">${photoButton(photo, personalPhotoOffset + index, "memory-photo-button", "(max-width: 760px) 80vw, 30vw")}<figcaption>${escape(photo.title)}</figcaption></figure>`).join("")}</div></section>

    ${profile.experience.length ? `<section class="experience-section section container" aria-labelledby="experience-title"><div class="section-intro"><p class="eyebrow">MY EXPERIENCE & TRAINING</p><h2 id="experience-title">Learning the craft.<br><em>Loving the journey.</em></h2><div class="award-note">${star}<span>“${escape(profile.award.title)}”<small>${escape(profile.award.event)} · ${escape(profile.award.year)}</small></span></div><figure class="award-photo">${photoButton(profile.award.photo, profile.photos.length, "award-photo-button", "(max-width: 760px) 85vw, 460px")}<figcaption>${escape(profile.award.photo.description)}</figcaption></figure></div><div class="experience-list">${profile.experience.map((item) => `<article class="experience-item"><p class="eyebrow">${escape(item.dates)}</p><h3>${escape(item.title)}</h3><p class="organization">${escape(item.organization)}</p><p>${escape(item.description)}</p></article>`).join("")}</div><div class="competition-moments"><h3>A few moments from Groom Texas.</h3><div class="competition-photos">${profile.award.moments.map((photo, index) => `<figure>${photoButton(photo, competitionPhotoOffset + index, "competition-photo-button", "(max-width: 760px) 180px, 210px")}<figcaption>${escape(photo.title)}</figcaption></figure>`).join("")}</div></div></section>` : ""}

    <aside class="story-section container" aria-labelledby="story-title"><div class="story-icon" aria-hidden="true">${heart}</div><div><p class="eyebrow">SOMETHING I’LL ALWAYS TREASURE</p><h3 id="story-title">A little story, inspired by a groom.</h3><p>One of my clients enjoyed her dog’s grooms so much that she wrote a children’s story about her dog’s grooming adventures with me. It was such a thoughtful thing to do, and it means a lot to know my work became part of that story.</p></div></aside>

    <section class="approach-section section container" id="approach" aria-labelledby="approach-title">
      <div class="section-heading"><div><p class="eyebrow">A LITTLE CARE GOES A LONG WAY</p><h2 id="approach-title">More than<br><em>a cute haircut.</em></h2></div><p>The little things I care about,<br>from the first hello to the finishing touch.</p></div>
      <div class="approach-grid">
        <article class="approach-card"><div class="approach-icon">${heart}</div><span class="card-number">01</span><h3>Kindness comes first.</h3><p>A calm, patient approach that puts a dog’s comfort at the heart of the experience.</p></article>
        <article class="approach-card"><div class="approach-icon">${star}</div><span class="card-number">02</span><h3>The little things matter.</h3><p>Taking the time to notice the details, build good habits, and take pride in the work.</p></article>
        <article class="approach-card"><div class="approach-icon">${sprout}</div><span class="card-number">03</span><h3>Always room to grow.</h3><p>Asking questions, welcoming feedback, and learning something from every dog and every day.</p></article>
      </div>
    </section>

    <section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="container contact-inner"><div class="contact-copy"><p class="eyebrow">GET IN TOUCH</p><h2 id="contact-title">Leave me<br><em>a little note.</em></h2><p>If you have a question about my work or would like to get in touch, you’re welcome to send me a message here.</p><div class="contact-doodle" aria-hidden="true">${paw}<span>thanks for stopping by.</span>${star}</div></div><form class="contact-form" id="contact-form"><div class="form-row"><div class="form-field"><label for="contact-name">Your name <span aria-hidden="true">*</span></label><input id="contact-name" name="name" autocomplete="name" required maxlength="100" placeholder="Your name" /></div><div class="form-field"><label for="contact-email">Email address <span aria-hidden="true">*</span></label><input id="contact-email" type="email" name="email" autocomplete="email" required maxlength="254" placeholder="you@example.com" /></div></div><div class="form-field"><label for="contact-shop">Shop or business <span class="optional">(optional)</span></label><input id="contact-shop" name="business" autocomplete="organization" maxlength="150" placeholder="If applicable" /></div><div class="form-field"><label for="contact-message">Your message <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" required minlength="20" maxlength="5000" rows="4" placeholder="Hi Carson…"></textarea></div><div class="form-trap" aria-hidden="true"><label for="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabindex="-1" autocomplete="off" /></div><div class="form-captcha" id="contact-captcha"></div><button class="button button-light" type="submit" disabled>Send message ${heart}</button><p class="form-status" id="form-status" role="status" aria-live="polite">Checking message availability…</p><p class="form-note">Your message is delivered through <a href="https://web3forms.com/privacy" target="_blank" rel="noopener">Web3Forms</a>. Your details are used to respond to your note.</p></form></div></section>
  </main>
  <footer class="site-footer container"><a class="wordmark" href="#home" aria-label="Back to top">${paw}<span>${name}<span class="wordmark-dot">.</span></span></a><p>Pink hair. Happy dogs. A whole lot of heart.</p><span class="copyright">© ${new Date().getFullYear()} ${name}</span></footer>
  <dialog class="photo-dialog" aria-labelledby="photo-title"><button class="dialog-close" type="button" aria-label="Close photo">✕</button><img class="dialog-image" alt="" /><div class="dialog-controls"><button class="dialog-previous" type="button" aria-label="Previous photo">${arrow}</button><span class="dialog-count" aria-live="polite"></span><button class="dialog-next" type="button" aria-label="Next photo">${arrow}</button></div><div class="dialog-caption"><h3 id="photo-title"></h3><p></p></div></dialog>
`;

const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle")!;
const navigation = document.querySelector<HTMLElement>("#main-nav")!;
function closeMenu(returnFocus = false) {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    closeMenu();
    const target = document.querySelector<HTMLElement>(link.hash);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  }),
);
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  )
    closeMenu(true);
});
document.addEventListener("click", (event) => {
  if (!(event.target as Element).closest(".header-inner")) closeMenu();
});
window
  .matchMedia("(min-width: 761px)")
  .addEventListener("change", () => closeMenu());

const morePhotosButton = document.querySelector<HTMLButtonElement>("#gallery-more");
morePhotosButton?.addEventListener("click", () => {
  const hiddenCards = [...document.querySelectorAll<HTMLElement>(".portfolio-card[hidden]")];
  const nextCards = hiddenCards.slice(0, galleryBatchSize);
  nextCards.forEach((card) => { card.hidden = false; });
  const remaining = hiddenCards.length - nextCards.length;
  document.querySelector("#gallery-count")!.textContent =
    `Showing ${profile.photos.length - remaining} of ${profile.photos.length} photos`;
  morePhotosButton.hidden = remaining === 0;
  nextCards[0]?.querySelector<HTMLButtonElement>(".photo-button")?.focus();
});

const dialog = document.querySelector<HTMLDialogElement>(".photo-dialog");
if (dialog) {
  let activePhoto = 0;
  const showPhoto = (index: number) => {
    activePhoto = (index + detailPhotos.length) % detailPhotos.length;
    const photo = detailPhotos[activePhoto];
    const image = dialog.querySelector<HTMLImageElement>("img")!;
    image.src = photo.src;
    image.alt = photo.alt;
    dialog.querySelector("h3")!.textContent = photo.title;
    dialog.querySelector(".dialog-caption p")!.textContent = photo.description;
    dialog.querySelector(".dialog-count")!.textContent =
      `${activePhoto + 1} / ${detailPhotos.length}`;
  };
  document
    .querySelectorAll<HTMLButtonElement>("[data-photo]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        showPhoto(Number(button.dataset.photo));
        dialog.showModal();
        document.body.classList.add("dialog-open");
      });
    });
  dialog
    .querySelector(".dialog-close")!
    .addEventListener("click", () => dialog.close());
  dialog
    .querySelector(".dialog-previous")!
    .addEventListener("click", () => showPhoto(activePhoto - 1));
  dialog
    .querySelector(".dialog-next")!
    .addEventListener("click", () => showPhoto(activePhoto + 1));
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
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () =>
    document.body.classList.remove("dialog-open"),
  );
}

const form = document.querySelector<HTMLFormElement>("#contact-form")!;
const submitButton = form.querySelector<HTMLButtonElement>(
  'button[type="submit"]',
)!;
const formStatus =
  document.querySelector<HTMLParagraphElement>("#form-status")!;
const contactKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "").trim();
let captchaToken = "";
let captchaWidget: string | undefined;
let sending = false;

interface CaptchaApi {
  render(container: string, options: Record<string, unknown>): string;
  reset(widget: string): void;
}
const captchaWindow = window as Window & {
  hcaptcha?: CaptchaApi;
  onContactCaptchaReady?: () => void;
};

function captchaUnavailable(message: string) {
  captchaToken = "";
  submitButton.disabled = true;
  if (!sending) formStatus.textContent = message;
}

if (!contactKey) {
  formStatus.textContent = "The contact form isn’t receiving messages yet. Please check back soon.";
} else {
  formStatus.textContent = "Loading the spam check…";
  const loadTimeout = window.setTimeout(() => {
    captchaUnavailable("The spam check couldn’t load. Please reload the page to try again.");
  }, 15000);
  captchaWindow.onContactCaptchaReady = () => {
    window.clearTimeout(loadTimeout);
    if (!captchaWindow.hcaptcha) return;
    try {
      captchaWidget = captchaWindow.hcaptcha.render("contact-captcha", {
        // Web3Forms' shared, public hCaptcha site key for the free plan.
        sitekey: "50b2fe65-b00b-4b9e-ad62-3ba471098be2",
        size: "compact",
        callback: (token: string) => {
          captchaToken = token;
          submitButton.disabled = sending || !token;
          if (!sending) formStatus.textContent = "All set. Your message is ready to send.";
        },
        "expired-callback": () => captchaUnavailable("The spam check expired. Please complete it again before sending."),
        "error-callback": () => captchaUnavailable("The spam check couldn’t finish. Please try the check again, or reload the page."),
      });
      formStatus.textContent = "Complete the spam check before sending. All fields marked * are required.";
    } catch {
      captchaUnavailable("The spam check couldn’t load. Please reload the page to try again.");
    }
  };
  const script = document.createElement("script");
  script.src = "https://js.hcaptcha.com/1/api.js?onload=onContactCaptchaReady&render=explicit&recaptchacompat=off";
  script.async = true;
  script.onerror = () => {
    window.clearTimeout(loadTimeout);
    captchaUnavailable("The spam check couldn’t load. Please reload the page to try again.");
  };
  document.head.append(script);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!contactKey || sending || !form.reportValidity())
    return;
  if (!captchaToken) {
    formStatus.textContent = "Please complete the spam check before sending your message.";
    return;
  }
  sending = true;
  submitButton.disabled = true;
  form.setAttribute("aria-busy", "true");
  formStatus.textContent = "Sending your hello…";
  try {
    const data = new FormData(form);
    await sendContactMessage(contactKey, {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      business: String(data.get("business") || ""),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""),
      captcha: captchaToken,
    });
    formStatus.textContent =
      "Your message is on its way. Thanks for saying hello!";
    form.reset();
  } catch (error) {
    formStatus.textContent =
      error instanceof Error
        ? error.message
        : "We couldn’t confirm your message was sent. Please try again later.";
  } finally {
    form.removeAttribute("aria-busy");
    // Captcha responses are single-use, including after a failed submission.
    captchaToken = "";
    if (captchaWidget !== undefined) captchaWindow.hcaptcha?.reset(captchaWidget);
    sending = false;
    submitButton.disabled = true;
  }
});
