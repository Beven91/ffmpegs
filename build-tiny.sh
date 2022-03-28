#!/bin/bash -x

# verify Emscripten version
emcc -v

rm -rf dist/ffmpeg

# configure FFMpeg with Emscripten
CFLAGS="-s USE_PTHREADS=0 -Oz"
LDFLAGS="$CFLAGS -s INITIAL_MEMORY=33554432" # 33554432 bytes = 32 MB
CONFIG_ARGS=(
  --objcc=emcc
  --dep-cc=emcc
  --cc="emcc"
  --cxx="em++"
  --ar="emar"
  --nm="llvm-nm -g" 
  --ranlib="emranlib"
  --prefix=$(pwd)/dist/ffmpeg
  --enable-cross-compile
  --target-os=none
  --extra-cflags="$CFLAGS"
  --extra-cxxflags="$CFLAGS"
  --extra-ldflags="$LDFLAGS"
  --arch=x86_32
  --cpu=generic
  --enable-gpl
  --enable-version3
  --disable-avdevice
  --disable-postproc
  --disable-avfilter
  --disable-programs
  --disable-everything
  --disable-pthreads
  --disable-ffplay
  --disable-ffprobe
  --disable-asm
  --disable-doc
  --disable-logging
  --disable-devices
  --disable-network
  --disable-hwaccels
  --disable-parsers
  --disable-bsfs
  --disable-debug
  --disable-indevs
  --disable-outdevs
  --enable-encoder=opus
  --enable-decoder=opus
  --enable-demuxer=ogg
  --enable-muxer=ogg
  --enable-protocols
)

cd ffmpeg

emconfigure ./configure "${CONFIG_ARGS[@]}"

make -j4

make install

cd ../

ARGS=(
  src/audio_encoder.c dist/ffmpeg/lib/libavcodec.a dist/ffmpeg/lib/libavutil.a dist/ffmpeg/lib/libavformat.a dist/ffmpeg/lib/libswresample.a
  -Oz
  -I dist/ffmpeg/include
  -s WASM=1
  -s ASSERTIONS=2
  -s TOTAL_MEMORY=67108864
  -gsource-map
  -s ASSERTIONS=2 
  -s STACK_OVERFLOW_CHECK=1
  --source-map-base http://localhost:8080/
  -s EXPORTED_FUNCTIONS="[_decode,_encode]"  # export main and proxy_main funcs
  -s EXPORTED_RUNTIME_METHODS="[addFunction,cwrap]"
  -s RESERVED_FUNCTION_POINTERS=14
  -s FORCE_FILESYSTEM=1
  -o dist/assets/ffmpeg.js
)
emcc "${ARGS[@]}"