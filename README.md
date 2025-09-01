# Demo of incompatibility of React-Router 7 Framework with PWA Offline Mode

To view the problem, use `npm i && npm run build` to build the app and notice
that `index.html` is not included in the list of pre-cached assets in
`build/client/sw.js`. (You'll want to prettify `sw.js` to view the list of
pre-cached files which are at the end of the file)

This is because `index.html` is created _after_ the PWA plugin is run, as evidenced by the build logs:

```sh
✓ built in 520ms

PWA v1.0.3
mode      generateSW
precache  7 entries (308.32 KiB)
files generated
  build/client/sw.js
  build/client/workbox-5ffe50d4.js
vite v6.3.5 building SSR bundle for production...
✓ 5 modules transformed.
build/server/registerSW.js                     0.13 kB
build/server/manifest.webmanifest              0.17 kB
build/server/.vite/manifest.json               0.23 kB
build/server/assets/server-build-gxev2nTc.css  7.91 kB
build/server/index.js                          6.03 kB

✓ 1 asset cleaned from React Router server build.
build/server/assets/server-build-gxev2nTc.css

SPA Mode: Generated build/client/index.html
Removing the server build in /Users/jasonthorpe/temp/spa-mode-pwa/build/server due to ssr:false
```

## Thing's I've tried

- Adding the Babel plugin explicitly as suggested by Alem and Pawel in [this issue](https://github.com/remix-run/react-router/issues/12352)

  This didn't help at all. The `index.html` asset is still created after the PWA plugin is run.

- Pre-rendering the "/" route as suggested in [this issue](https://github.com/vite-pwa/vite-plugin-pwa/issues/731).

  The issue I'm facing is that my app has a number of dependencies that are not
  compatible with SSR and adding a pre-rendered route causes the SSR code to be
  built, which throws errors that are not fixable because of the aforementioned
  dependencies -- and this causes the build to fail.

- [This suggestion](https://github.com/vite-pwa/vite-plugin-pwa/issues/809#issuecomment-2737133297)
  to include the `PWAManifest` and/or `PWAAssets` components from `@vite-pwa/remix` manually
  will cause the manifest link to be included in the rendered `<head>` component
  of `index.html`, but `index.html` is still not included in the pre-cached assets.

## Created with

```sh
npx create-react-router@latest spa-mode-pwa
cd spa-mode-pwa
npm i vite-plugin-pwa
touch app/sw.ts
```

and then setting `ssr` to false in `react-router.config.ts` and adding a minimal
`sw.ts` with an explicit call for offline support and minimal `vite-plugin-pwa`
config in `vite.config.ts`.
