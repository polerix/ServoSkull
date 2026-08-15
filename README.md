# ServoSkull

```
             ══╦═══╦═══╦═══╦══
             ▀█╦███╦█▀█╦███╦█▀
              █╠███╠█╬█╠███╠█
               ╚╦███╦███╦███╦╝
           ╔════╩═══╩═╦═╩═══╩════╗
           ║   ╔══════╩══════╗   ║
           ╚═══╝    ╔══╗    ╚═══╝
                  ╔═╝  ╚═╗
                  ╚═══════╝

  ✠  ADEPTUS MECHANICUS — CULT MECHANICUS SITE  ✠
```

A Warhammer 40K–themed React site for the Adeptus Mechanicus / Cult
Mechanicus, built with Vite and Tailwind CSS. Deployed to GitHub Pages
via Actions on every push to `master`.

**Live:** https://polerix.github.io/ServoSkull/

---

## Stack

- [React 18](https://react.dev/) + [Vite](https://vite.dev/) (`@vitejs/plugin-react`)
- [Tailwind CSS v3](https://v3.tailwindcss.com/) + [tw-elements](https://tw-elements.com/)
- [AOS](https://michalsnik.github.io/aos/) for scroll animations
- `react-scroll`, `react-icons`, `@headlessui/react`, `@heroicons/react`

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Project Structure

```
ServoSkull/
  index.html              Vite entry HTML
  vite.config.js           base: '/ServoSkull/' for GitHub Pages
  tailwind.config.js
  postcss.config.js
  public/                  static assets served as-is (favicon, manifest, robots.txt)
  src/
    main.jsx               React root / mount point
    App.jsx                top-level layout, assembles the page sections
    App.css / index.css    global styles + Tailwind directives
    Components/
      Navbar.jsx            header nav + mobile menu
      Center.jsx             hero / landing section
      Adeptus.jsx             Adeptus Mechanicus blurb
      Archmagos.jsx           Belisarius Cawl section
      Showcase.jsx            Cult Mechanicus content sections
    Assets/                 images, video, fonts, and Info/Data.jsx (copy content)
    fonts/CopperplateGothic.ttf
```

## Deployment

`.github/workflows/deploy.yml` builds with Vite and publishes `dist/`
to GitHub Pages (Actions-based deployment, not a branch-serving source)
on every push to `master`. No manual steps required — push to `master`
and the site rebuilds and redeploys automatically.

---

*Adeptus Mechanicus — [BIG0TIME Index](https://github.com/polerix/BIG0TIME/blob/main/index.html)*
*Praise the Omnissiah.*
