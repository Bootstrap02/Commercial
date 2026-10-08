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
  chatNote: "LinkedIn and portfolio links are always in the meeting chat.",
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
    devops: 30,
    emran: 40,
    projects: 40,
    journey: 36,
    contact: 30
  },
  /* Scenes where the floating "contact me" card is hidden (the scene already shows it) */
  hideCtaOn: ["intro", "contact"]
};
