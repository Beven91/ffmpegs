#!/bin/bash -x

# verify Emscripten version
emcc -v

# configure FFMpeg with Emscripten
CFLAGS="-s USE_PTHREADS -O3"
LDFLAGS="$CFLAGS -s INITIAL_MEMORY=33554432" # 33554432 bytes = 32 MB
CONFIG_ARGS=(
  --cc="emcc"
  --cxx="em++"
  --ar="emar"
  --ranlib="emranlib"
  --prefix=$(pwd)/wasm/ffmpeg/
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
  --disable-avformat
  --disable-swresample
  --disable-postproc
  --disable-avfilter
  --disable-programs
  --disable-logging
  --disable-everything
  --disable-ffplay
  --disable-ffprobe
  --disable-asm
  --disable-doc
  --disable-devices
  --disable-network
  --disable-hwaccels
  --disable-parsers
  --disable-bsfs
  --disable-debug
  --disable-protocols
  --disable-indevs
  --disable-outdevs
  --enable-decoder=aac
  --enable-parser=aac
  --enable-decoder=mp3
  --enable-demuxer=caf
)
emconfigure ./configure "${CONFIG_ARGS[@]}"

make -j4

make install

cd ./wasm


ARGS=(
  decoder.c ffmpeg/lib/libavcodec.a ffmpeg/lib/libavutil.a
  -O3
  -I ./ffmpeg/include
  -s WASM=1
  -s TOTAL_MEMORY=67108864
  -s EXPORTED_FUNCTIONS="[_openDecoder,_flushDecoder,_closeDecoder,_decodeData,_main]"  # export main and proxy_main funcs
  -s EXPORTED_RUNTIME_METHODS="[addFunction]"
  -s RESERVED_FUNCTION_POINTERS=14
  -s FORCE_FILESYSTEM=1
  -o ../demo/public/ffmpeg.js
)
emcc "${ARGS[@]}"