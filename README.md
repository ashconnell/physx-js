# PhysX JS

PhysX on the web.

This repo complements the work being done over at [prestomation/PhysX](https://github.com/prestomation/PhysX) to create emscripten bindings for [NVIDIAGameWorks/PhysX](https://github.com/NVIDIAGameWorks/PhysX). 
At some point the prestomation/PhysX fork may be merged into NVIDIAGameWorks/PhysX and this repo will be updated to track that repo.

This repo serves two purposes:

- Offer a reproducible docker environment to easily build and compile PhysX to WebAssembly via [Emscripten](https://emscripten.org)
- House the files used to publish this as a package on npm ([physx-js](https://www.npmjs.com/package/physx-js))

## Example

There is an example of how to use this with Webpack in the `/example` folder. 

Alternatively you can [preview the live version](https://physx-js-example.deminetix.now.sh) hosted on now.sh

## Usage via npm

```
npm install physx-js
```

The `physx.release.js` file can be imported via Webpack etc or included as a script on the page

The `physx.release.wasm` needs to be served in a public folder so that it can be loaded in a browser environment

See `/example` for how this can be done using Webpack.

## Usage via CDN (jsDelivr)

Depending on your environment, you may not be able to use npm. 

In this case, you can include the js file as a script via the CDN that mirrors the npm library:

```
<script src="https://cdn.jsdelivr.net/npm/physx-js/dist/physx.release.js">
```

Then configure it to also load the wasm file from the CDN:

```
PHYSX({
  locateFile(path) {
    if (path.endsWith('.wasm')) {
      return 'https://cdn.jsdelivr.net/npm/physx-js/dist/physx.release.wasm'
    }
    return path
  }
})

```

## Development

You can modify and/or build this yourself from source to create js and wasm files.

The only dependencies you need are Docker and Node/NPM. All other dependencies are managed inside the docker image.

```
// clone this repo
git clone https://github.com/ashconnell/physx-js.git

// install PhysX source dependency
npm install

// build
npm run build
```

This will start a docker container, mount the PhysX source code and then build and compile it using emscripten.

The output files (js and wasm) are copied into ./dist