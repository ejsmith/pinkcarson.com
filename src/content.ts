export interface PortfolioPhoto {
  src: string;
  srcSet?: string;
  alt: string;
  title: string;
  // Describe Carson's actual role, including supervision where applicable.
  description: string;
}

export interface Experience {
  title: string;
  organization: string;
  dates: string;
  description: string;
}

export interface Portrait {
  src: string;
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

function photoSources(name: string, width = 1280) {
  const images = `${import.meta.env.BASE_URL}images/`;
  return {
    src: `${images}${name}.webp`,
    srcSet: `${images}${name}-640.webp 640w, ${images}${name}.webp ${width}w`,
  };
}

const award = {
  title: "Best First Timer",
  event: "Groom Texas",
  year: "2026",
  photo: {
    ...photoSources("carson-groom-texas-award", 960),
    alt: "Groom Texas 2026 award portrait of Carson, Fabrice the white Bichon Frise and the award presenter, with a before inset and the words Best First Timer Award, All Other Purebreds, Entry Division.",
    title: "A moment I’m proud of.",
    description:
      "With Fabrice, my Groom Texas 2026 competition dog, after receiving the Best First Timer Award in the All Other Purebreds entry division. Photo: AnimalPhotography.com.",
  } satisfies PortfolioPhoto,
  moments: [
    {
      ...photoSources("carson-groom-texas-scissoring"),
      alt: "Carson carefully using scissors to shape Fabrice’s white coat beneath the Groom Texas banners.",
      title: "At the grooming table.",
      description: "Grooming Fabrice at Groom Texas 2026.",
    },
    {
      ...photoSources("carson-groom-texas-combing"),
      alt: "Carson using a metal comb on Fabrice’s rounded white head.",
      title: "The little details.",
      description: "Combing through Fabrice’s coat at the competition table.",
    },
    {
      ...photoSources("carson-groom-texas-smile"),
      alt: "Carson smiling down at Fabrice resting on the grooming table.",
      title: "A little moment together.",
      description: "A quiet moment with Fabrice at Groom Texas.",
    },
    {
      ...photoSources("carson-groom-texas-table", 720),
      alt: "Carson beside Fabrice standing on a grooming table at Groom Texas.",
      title: "From competition day.",
      description: "At the table with Fabrice, Groom Texas 2026.",
    },
    {
      ...photoSources("carson-best-first-timer"),
      alt: "Carson standing beside Fabrice and holding a ribbon reading Best First Timer 2026.",
      title: "A ribbon to remember.",
      description: "With Fabrice and the Best First Timer ribbon at Groom Texas 2026.",
    },
  ] as PortfolioPhoto[],
};

// Keep personal details here. Only add confirmed information, and use photos
// Carson has permission to share. Public assets belong in public/images/.
export const profile = {
  name: "Carson",
  role: "Dog groomer & lifelong animal lover",
  resumeUrl: `${import.meta.env.BASE_URL}carson-smith-resume.pdf`,
  portrait: {
    ...photoSources("carson-and-chief-hopper"),
    alt: "Carson with pink hair, smiling beside her horse Chief Hopper outdoors.",
    caption: "right where I’m happiest.",
    width: 1280,
    height: 1826,
  } as Portrait | null,
  introduction:
    "I’m Carson, a dog groomer with pink hair and a soft spot for animals. This is a collection of my grooming work, along with a little about the dogs and horses in my life.",
  about:
    "My grooming journey started at Hot Diggity Dog in Rowlett, Texas, in February 2024. I’ve grown from primarily washing dogs to completing around two grooms a day while helping with the shop’s daily care and customer service. Along the way, I’ve taken grooming courses, earned a “Best First Timer” award at Groom Texas 2026, and built relationships with clients who ask for me by name.",
  award,
  book: {
    title: "Fabrice’s Big Grooming Day",
    author: "Michele Stoudt-Wright",
    series: "Small Dog, Big Lessons: The Fabrice Tales",
    url: "https://www.amazon.com/dp/B0GN8RGD29",
    illustration: {
      src: `${import.meta.env.BASE_URL}images/fabrice-grooming-day.webp`,
      alt: "Book illustration of Fabrice, a fluffy white Bichon, on a grooming table with a smiling pink-haired groomer and the words ‘What a perfect model!’",
      width: 223,
      height: 335,
      credit: "© 2025 Michele Stoudt-Wright",
    },
  },
  testimonial: {
    author: "Michele Wright",
    attribution: "Family Friend & Proud Member of Fabrice’s Entourage",
    excerpt:
      "Each client is treated as an individual—with patience, affection, and an understanding of what makes that particular dog special. To Carson, they are never simply another appointment on the schedule.",
    paragraphs: [
      "I have had the privilege of knowing Carson for more than 10 years, not only as a family friend, but also as someone who has watched her passion for animals grow into a true calling.",
      "Over the years, I have seen that love begin with horses and expand into the world of dog grooming. Carson started at the bottom rung in a grooming salon, willing to learn, work hard, and develop her craft. Through determination, talent, and a genuine love for animals, she continues to grow as a groomer, earning recognition and awards along the way as she works toward becoming the accomplished professional she aspires to be.",
      "What makes Carson special, however, goes far beyond her growing skill with a pair of grooming shears. She truly loves the animals entrusted to her care. Each client is treated as an individual—with patience, affection, and an understanding of what makes that particular dog special. To Carson, they are never simply another appointment on the schedule.",
      "And then there is Fabrice.",
      "Fabrice has always loved going to Carson for his grooming, and he holds a special place in her journey. In his own way, he became part of the inspiration behind Carson’s decision to pursue grooming as a career. Their relationship has given us some wonderful memories—some of which have even become part of the “Fabrice Tales.”",
      "Watching Carson take something she genuinely loves and steadily build it into her chosen profession has been a joy. She continues to learn, grow, and challenge herself while never losing the heart and compassion that started her on this journey.",
      "And if you know Carson, you also know one other thing: she loves PINK! It is more than a favorite color—it is part of the energy, fun, warmth, and personality she brings to everything she does.",
      "I am proud of Carson, proud of the groomer she is becoming, and most importantly, proud of the loving care she gives to every animal fortunate enough to become one of her clients.",
    ],
  },
  experience: [
    {
      title: "From bath time to grooming time",
      organization: "Hot Diggity Dog · Rowlett, TX",
      dates: "FEBRUARY 2024 – PRESENT",
      description:
        "I average around two grooms a day alongside pre-groom washes, baths, caring for boarding dogs and keeping the shop clean. I’ve also worked the front desk and register.",
    },
    {
      title: `“${award.title}”`,
      organization: award.event,
      dates: award.year,
      description:
        "Best First Timer Award, All Other Purebreds, Entry Division, for my groom with Fabrice. A moment I’m proud of, and encouragement to keep learning.",
    },
    {
      title: "Building my skills",
      organization: "Grooming training courses",
      dates: "CONTINUING TO LEARN",
      description:
        "I’ve taken several grooming courses to build on my experience in the shop, and I’m excited to keep learning.",
    },
  ] as Experience[],
  photos: [
    {
      ...photoSources("competition-groom"),
      alt: "Fabrice, a white Bichon Frise with a rounded fluffy head, beside the Best First Timer 2026 ribbon on a competition grooming table.",
      title: "Fabrice’s big day.",
      description:
        "Fabrice at Groom Texas 2026, pictured beside my Best First Timer ribbon. He’s also the little star of Fabrice’s Big Grooming Day.",
    },
    {
      ...photoSources("pink-bows-groom"),
      alt: "A cream-colored dog on a grooming table with a trimmed body, fluffy legs and two pink bows.",
      title: "A fresh trim & pink bows.",
      description:
        "A shorter body trim with longer coat on the legs and ears, finished with two little pink bows.",
    },
    {
      ...photoSources("apricot-poodle-groom"),
      alt: "An apricot poodle with a clean face and feet, a rounded topknot, long ears and full shaped legs on a grooming table.",
      title: "An apricot silhouette.",
      description: "A rounded topknot, long ears and full legs, with a clean face and feet.",
    },
    {
      ...photoSources("black-groom-full"),
      alt: "A black dog in profile with a rounded head, long ears, shaped legs and a small heart decoration above the nose.",
      title: "Round head, soft lines.",
      description: "A full view of the rounded head, long ears and softly shaped legs.",
    },
    {
      ...photoSources("plaid-bandana-groom"),
      alt: "A small gray-and-tan dog with upright ears, a rounded face and a brown plaid bandana against an autumn backdrop.",
      title: "A tidy trim & a little plaid.",
      description: "A short body trim and a rounded face, finished with a plaid bandana.",
    },
    {
      ...photoSources("silver-ears-groom"),
      alt: "A gray-and-white dog with long straight ears, a softly rounded face, small bows and pink nails, sitting on a teal towel.",
      title: "Soft shape, little details.",
      description:
        "A tidy body, longer ears, and a softly shaped face, with little bows and pink nails to finish.",
    },
    {
      ...photoSources("apricot-bow-groom"),
      alt: "An apricot dog with a rounded topknot, clean face and feet, long ears and an autumn bow tie.",
      title: "A bow for the season.",
      description: "A shaped topknot and clean face, with an autumn bow tie to finish.",
    },
    {
      ...photoSources("red-curls-groom"),
      alt: "A red curly-coated dog standing on a teal towel with a shaped head, rounded tail and small star decoration.",
      title: "Red curls & a tiny star.",
      description: "A tidy silhouette with a rounded tail and a little star detail.",
    },
    {
      ...photoSources("white-rounded-groom"),
      alt: "A white dog with a large rounded head and neatly shaped legs standing on a grooming table.",
      title: "A cloud of white fluff.",
      description: "A full, rounded head with a shorter body and neatly shaped legs.",
    },
    {
      ...photoSources("mohawk-groom"),
      alt: "A gray-and-white dog with a white beard and a tall, narrow mohawk on a grooming table.",
      title: "A little extra personality.",
      description: "A short body, a white beard and a mohawk with plenty of character.",
    },
    {
      ...photoSources("bee-bandana-groom"),
      alt: "A small brown-and-white dog with a fluffy face, white legs and a blue bee-patterned bandana.",
      title: "A sweet face & a blue bandana.",
      description: "A soft face and tidy legs, finished with a little bee-patterned bandana.",
    },
    {
      ...photoSources("floral-bows-detail"),
      alt: "Close-up of a white dog's sectioned topknot with floral pink bows and small pink and purple decorations.",
      title: "Bows, up close.",
      description: "A closer look at the sectioned topknot, floral bows and colorful finishing details.",
    },
    {
      ...photoSources("cream-coat-groom"),
      alt: "A large cream-colored dog standing in profile on a grooming table with a neatly shaped coat.",
      title: "A tidy cream coat.",
      description: "A full view of this cream coat and its softly shaped outline.",
    },
    {
      ...photoSources("silver-beard-groom"),
      alt: "A gray dog with upright ears, a white beard and shaped legs standing on a grooming table.",
      title: "Silver coat, white beard.",
      description: "A tidy body and shaped legs with a full white beard.",
    },
    {
      ...photoSources("charcoal-groom"),
      alt: "A charcoal-colored dog with upright ears, a shaped beard and a neatly trimmed body sitting against an autumn backdrop.",
      title: "A charcoal finish.",
      description: "A shaped beard and tidy coat with those lovely upright ears.",
    },
    {
      ...photoSources("rounded-black-groom"),
      alt: "Close-up of a black dog with a rounded fluffy head, a neatly shaped muzzle, long ears and a small heart decoration.",
      title: "A rounded finish.",
      description:
        "A full, rounded head and a neatly shaped muzzle, with long ears and a tiny heart detail.",
    },
    {
      ...photoSources("black-white-groom"),
      alt: "A black-and-white dog with short rounded ears, a neatly shaped muzzle and trimmed legs on a grooming table.",
      title: "Soft ears & a rounded face.",
      description: "Short, rounded ears and a shaped muzzle frame this little face.",
    },
    {
      ...photoSources("white-face-detail"),
      alt: "Close-up of a white dog with a fluffy rounded head and a neatly shaped muzzle, with its chin gently supported.",
      title: "The shape of a little face.",
      description: "A closer look at a fluffy white head and the shape around the muzzle.",
    },
    {
      ...photoSources("pink-bowtie-groom"),
      alt: "A small black-and-white dog with long dark ears, a fluffy white topknot and a pink bow tie sitting on a white towel.",
      title: "A pink bow-tie finish.",
      description: "A short body trim, long ears and a fluffy topknot, with a pink bow tie.",
    },
    {
      ...photoSources("pink-flower-detail"),
      alt: "Close-up of a small black-and-white dog with a tall fluffy white topknot and pink flower decorations.",
      title: "A tiny pink flower.",
      description: "A fluffy topknot and a little pink flower detail.",
    },
    {
      ...photoSources("pink-bows-detail"),
      alt: "Close-up of a white dog's sectioned topknot finished with two pink bows decorated with stars.",
      title: "One more little bit of pink.",
      description: "Sectioned hair and two pink bows with tiny stars.",
    },
  ] as PortfolioPhoto[],
  personalPhotos: [
    {
      ...photoSources("carson-chief-hopper-smile"),
      alt: "Carson with bright pink hair smiling beside Chief Hopper, who is showing his teeth in a sunny field.",
      title: "Chief Hopper & me.",
      description: "A sunny day with Chief Hopper.",
    },
    {
      ...photoSources("beau-birthday"),
      alt: "Beau, a red-and-white corgi, and his small dog friend wearing party hats beside birthday gifts and a Happy Birthday banner.",
      title: "Beau’s birthday.",
      description: "Celebrating Beau’s birthday with his friend.",
    },
    {
      ...photoSources("carson-chief-hopper-younger"),
      alt: "A younger Carson in a red sweater beside Chief Hopper, whose name is engraved on his halter.",
      title: "Growing up with horses.",
      description: "A little younger, with the same love for horses.",
    },
  ] as PortfolioPhoto[],
};
