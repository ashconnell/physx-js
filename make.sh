#!/bin/bash

cd node_modules/physx/physx/compiler/emscripten-release/
make
mkdir -p /src/dist
cp /src/node_modules/physx/physx/bin/emscripten/release/physx.release.js /src/dist/physx.release.js
cp /src/node_modules/physx/physx/bin/emscripten/release/physx.release.wasm /src/dist/physx.release.wasm