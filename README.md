# My Portfolio
Visit: https://www.saikrishna.cloud/

Hi! Welcome to my portfolio repo.  
Built using React + Vite.

Feel free to use it as a template 🙂

## 🚀 Getting Started

### Install dependencies

```
npm install
```

### Start development server

```
npm run dev
```

### Build for production

```
npm run build
```

Generates optimized static files in the `dist` folder.

---

Enjoy building! ✨

## Browser regression tests

Use Node.js 22.12+ (Node.js 24 is supported), then run:

```sh
npm ci
npx playwright install --with-deps chromium webkit
npm run lint
npm run build
npm test
```

Playwright starts Vite on port 5174. The suite checks layout bounds, section navigation,
experience controls, tap/keyboard contact-menu behavior, and responsive skills content.
It covers small phones, iPhone portrait/landscape, tablet, desktop Chromium, and iPhone
WebKit. iPhone browser emulation is useful coverage, but does not replace a real-device
check of Chrome on iOS, including its browser toolbars and safe areas.

In a restricted environment with Chromium already installed, run the Chromium projects:

```sh
CHROMIUM_PATH=/usr/bin/chromium npm test -- --project=iphone-se --project=iphone-13 --project=iphone-landscape --project=tablet --project=iphone-plus --project=desktop
```

If browser downloads use a custom cache, set `PLAYWRIGHT_BROWSERS_PATH` consistently
for installation and test execution. WebKit downloads require access to
`cdn.playwright.dev` and `playwright.download.prss.microsoft.com`.
