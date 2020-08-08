#!/bin/bash

cd PhysX/physx/compiler/emscripten-release/
make
mkdir -p /src/lib
cp /src/PhysX/physx/bin/emscripten/release/physx.release.js /src/dist/physx.release.js
cp /src/PhysX/physx/bin/emscripten/release/physx.release.wasm /src/dist/physx.release.wasm