# PhysX JS

PhysX on the web.

This repo complements the work being done over at [prestomation/PhysX](https://github.com/prestomation/PhysX) to create emscripten bindings for [NVIDIAGameWorks/PhysX](https://github.com/NVIDIAGameWorks/PhysX). 
At some point the prestomation/PhysX fork may be merged into NVIDIAGameWorks/PhysX and this repo will be updated to track that repo.

This repo serves two purposes:

- Offer a reproducible docker environment to easily build and compile PhysX to WebAssembly via [Emscripten](https://emscripten.org)
- House the files used to publish this as a package on npm ([physx-js](https://www.npmjs.com/package/physx-js))

# Example

There is an example of how to use this with Webpack in the /example folder. 

Alternatively you can [preview the live version](https://physx-js-example.deminetix.now.sh) hosted on now.sh

# Usage

```
npm install physx-js
```

The `physx.release.js` file can be imported via Webpack etc or included as a script on the page

The `physx.release.wasm` needs to be served in a public folder so that it can be loaded in a browser environment

See `/example` for how this can be done using Webpack.

# Development

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