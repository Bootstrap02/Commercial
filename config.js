
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
  ctaQuestion: "Need a website, app, digital solution or technical assistance?"
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
  default:   { tag: "Work with me",     head: "Need a website, app or technical help?",   sub: "Call or message me. I will get back to you." },
  intro:     { tag: "Work with me",     head: "Need a website, app or technical help?",   sub: "Call or message me. I will get back to you." },
  about:     { tag: "Work with me",     head: "Need a developer you can rely on?",        sub: "Web, mobile and digital solutions, built properly." },
  web:       { tag: "Websites",         head: "Want a website like this one?",            sub: "Business, shop, school, association or personal. Contact me to build yours." },
  industries:{ tag: "Websites",         head: "Whatever your business, it needs a website.", sub: "Tell me what you do and I will design it." },
  mobile:    { tag: "Mobile apps",      head: "Need a mobile app for your idea?",         sub: "Android apps built with React Native and Expo." },
  design:    { tag: "UI/UX design",     head: "Need a clean, easy-to-use design?",        sub: "Wireframes, prototypes and finished interfaces." },
  data:      { tag: "Data and Excel",   head: "Need data entry, spreadsheets or reports?", sub: "Messy data turned into clear tables, charts and summaries." },
  research:  { tag: "Research",         head: "Need something researched properly?",      sub: "Product, supplier and market comparisons, in a clear report." },
  support:   { tag: "Technical support",head: "Stuck with a technical problem?",          sub: "Accounts, email, websites and software. Let me sort it out." },
  assist:    { tag: "Virtual assistant",head: "Need tasks taken off your plate?",       sub: "Research, email, bookings and documents, handled remotely." },
  services:  { tag: "Virtual assistant",head: "Need a virtual or personal assistant?",    sub: "Travel, admin, documents, email and research, done remotely." },
  devops:    { tag: "Deployment",       head: "Need your project put online?",            sub: "Version control, Docker and cloud deployment." },
  emran:     { tag: "Real project",     head: "Need a platform like this?",               sub: "Member portals, payments and admin dashboards." },
  projects:  { tag: "Real projects",    head: "Have a project in mind?",                  sub: "Let us talk about what you want to build." },
  journey:   { tag: "Work with me",     head: "Need a website, app or technical help?",   sub: "Call or message me. I will get back to you." },
  contact:   { tag: "Get in touch",     head: "Have an idea? Let's talk.",                sub: "Call, WhatsApp or email me." }
};
