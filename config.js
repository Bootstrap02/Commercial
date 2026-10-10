
/* =====================================================================
   CONFIG — the only file you need to edit for contact details,
   links and presentation timing.
   ===================================================================== */

const SITE_CONFIG = {
  name: "Louis Joseph",
  role: "Full-Stack Software Developer",
  phone: "+234 704 238 0116",          // shown on screen
  whatsapp: "2347042380116",           // digits only, with country code (wa.me format)
  whatsappMessage: "Hello Louis, I saw your digital documentary and would like to talk.",
  email: "louisjoseph131@gmail.com",
  linkedin: "https://www.linkedin.com/in/louisjoseph-634558153",
  github: "https://github.com/Bootstrap02",
  portfolio: "https://louisjoseph.vercel.app",
  // Shown in the on-screen contact card during presentation mode
  chatNote: "My LinkedIn profile and portfolio are in the comment section.",
  ctaQuestion: "Need a website for your business, a virtual assistant, a personal assistant or a research assistant?"
};

/* Links used by the project cards. Change a URL here and every card updates. */
const PROJECT_LINKS = {
  emran: "https://emran.center",
  campusify: "https://campusify.net",
  plurity: "https://plurityplumbingsolutions.com",
  rar: "https://rositawaters.com",
  catalogue: "https://cataloguea.vercel.app",
  playstore: "#"   // paste the Campusify Google Play URL here
};

const PRESENTATION_CONFIG = {
  autoplay: false,            // true = start the documentary on page load
  loop: true,                 // restart from the first scene after the last
  fullscreenOnPlay: true,     // ask the browser for fullscreen when PLAY is pressed
  controlsHideAfterMs: 3000,  // controls fade out after this much mouse inactivity
  sound: {
    enabledByDefault: false,  // soft chime on scene changes; muted by default
    volume: 0.05              // 0 – 1 (keep it low)
  },
  /* Seconds each scene stays on screen. Total ≈ 9 minutes. */
  durations: {
    intro: 14,
    about: 40,
    web: 56,
    industries: 28,
    mobile: 45,
    design: 40,
    data: 45,
    research: 36,
    support: 40,
    services: 36,
    assist: 32,
    devops: 30,
    emran: 40,
    projects: 40,
    journey: 36,
    contact: 30
  },
  /* Scenes where the floating "contact me" card is hidden (the scene already shows it) */
  hideCtaOn: []   // the card now stays on screen for the whole presentation
};

/* The fixed contact card changes its message to match the scene on screen.
   Edit the wording here. Scenes not listed use "default". */
const CTA_MESSAGES = {
  default:   { head: "Need a website for your business, a virtual assistant, a personal assistant or a research assistant?", sub: "Call or message me on WhatsApp. I will get back to you." },
  intro:     { head: "Need a website for your business, a virtual assistant, a personal assistant or a research assistant?", sub: "Call or message me on WhatsApp. I will get back to you." },
  about:     { head: "Do you need a website, or someone reliable to handle your online tasks?", sub: "I can build it for you, or take care of it for you." },
  web:       { head: "Do you need a website for your business?", sub: "Shops, schools, churches, associations or personal pages. I can build yours." },
  industries:{ head: "Whatever your business is, a website helps people find you.", sub: "Tell me what you do and I will design it." },
  mobile:    { head: "Do you need a mobile app for your business or idea?", sub: "An app that people can install and use on their phones." },
  design:    { head: "Want your website or app to look beautiful and be easy to use?", sub: "I can design it before it is built, so you see it first." },
  data:      { head: "Need help with data entry, Excel sheets or reports?", sub: "Messy lists turned into clear tables, charts and summaries." },
  research:  { head: "Do you need a research assistant?", sub: "Products, prices, suppliers and options, compared and explained clearly." },
  support:   { head: "Having trouble with your email, account, phone or computer?", sub: "Tell me the problem and I will help you sort it out." },
  assist:    { head: "Do you need a virtual assistant or a personal assistant?", sub: "Travel, bookings, emails, forms and documents, handled for you." },
  services:  { head: "Do you need a virtual assistant or a personal assistant?", sub: "I handle the details, so you can focus on what matters most." },
  devops:    { head: "Want your website put online and kept running smoothly?", sub: "I can take care of getting it live." },
  emran:     { head: "Does your association or group need a members' website?", sub: "Sign-up, payments, events and announcements in one place." },
  projects:  { head: "Have an idea for a website or an app?", sub: "Let us talk about it. There is no pressure." },
  journey:   { head: "Need a website for your business, a virtual assistant, a personal assistant or a research assistant?", sub: "Call or message me on WhatsApp. I will get back to you." },
  contact:   { head: "Have an idea? Let's talk.", sub: "Call, WhatsApp or email me." }
};
