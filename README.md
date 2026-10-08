# Louis Joseph: Interactive Digital Documentary

A static website (HTML, CSS, vanilla JavaScript). No build step, no backend, no database.

## Files
```
index.html      all scenes (content)
styles.css      design; colours are CSS variables at the top (:root)
config.js       YOUR EDIT POINT: contact details, project links, scene timing
demos.js        sample-data dashboard, support-ticket demo, config binding
script.js       presentation engine (Play / Pause / Stop), navigation, sound
assets/
  images/       louis-portrait.jpg, services-flyer.jpg
  projects/     put real screenshots here (see below)
  videos/       (empty, ready for project videos)
  documents/    (empty, ready for a downloadable CV)
```

## Run locally
Double-click `index.html`, or from this folder run `python3 -m http.server 8000` and open http://localhost:8000.

## Deploy
- **GitHub Pages:** push the folder to a repo, Settings > Pages > Deploy from branch (main, root).
- **Vercel / Netlify:** drag the folder in, or import the repo. No build command, output folder is the root.

## Where to change things
| What | Where |
|---|---|
| Phone, WhatsApp, email, LinkedIn, GitHub, portfolio, the "links are in the chat" note | `SITE_CONFIG` in `config.js` |
| Project links (EMRAN, Campusify, Plurity, Rar Water, Catalogue A, Google Play) | `PROJECT_LINKS` in `config.js` (paste the Play Store URL into `playstore`) |
| Seconds per scene, loop, autoplay, fullscreen-on-play, sound | `PRESENTATION_CONFIG` in `config.js` |
| Colours | `:root` in `styles.css` |
| Real screenshots | Save as `assets/projects/emran-screenshot.jpg`, `campusify-web.jpg`, `campusify-android.jpg`, `plurity-plumbing.jpg`, `rar-water.jpg`, `catalogue-a.jpg`. They automatically replace the drawn mock-ups. |
| Add a project | Copy an `<article class="proj">` block in the `projects` scene of `index.html` and give the next `data-s` number |

## Controls
Space play/pause, Left/Right previous/next, S stop, F fullscreen, M sound, Esc exit.
Stop returns to normal browsing at the top of the page. Pause freezes everything (including animations) and Resume continues from the same point.

## External dependencies
Only Google Fonts (Fraunces and Manrope) in `<head>`. If offline, the site falls back to Georgia and system fonts and still works. No JavaScript libraries.

## Honesty notes
Anything fictional is labelled (Demo content, Demo data, Sample tickets, Sample research, Concept screens). Facts come from the CV, except Rar Water (rositawaters.com), which comes from your message.
# Commercial
