# openslides-electron

A desktop application to display OpenSlides instances.
This is essentially a small web browser designed to be used with OpenSlides. You can enter your OpenSlides domain in a login mask and the Chromium/electron webview connects to the given OpenSlides Server.

This ensures that the electron application is independently of individual instance upgrades and can be updated and developed separately.

# Building and development

You need `node` and `npm` installed.
For the first time, install all dependencies:

    npm install

To develop the application directly in electron:
In **one** terminal run:

    ng serve

while in **another** terminal run:

    npm run electron-serve

To test OpenSlides using electron without creating a productive build:

    ng build
    npm run electron-test

This will build the OpenSlides with debug information and mount the build into electron

To create production ready electron packages, build the client in prod mode first.

    npm run build

Use electron builder to create a desktop applications for either Windows Linux or macOS.
Electron builder will use the production ready files from `dist`
You can find the build applications under `builds`

To create a windows portable ".exe" and an NSIS installer:

    npm run electron-build-win

To create a linux portable .AppImage

    npm run electron-build-lin

To create a macOS (Intel) portable .dmg
(This was not tested because we cannot sign applications for macOS)

    npm run electron-build-mac
