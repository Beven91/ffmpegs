
var createFFmepgModule = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(createFFmepgModule) {
  createFFmepgModule = createFFmepgModule || {};


var c;
c || (c = typeof createFFmepgModule !== 'undefined' ? createFFmepgModule : {});
var aa, ba;
c.ready = new Promise(function(a, b) {
  aa = a;
  ba = b;
});
Object.getOwnPropertyDescriptor(c.ready, "_decode") || (Object.defineProperty(c.ready, "_decode", {configurable:!0, get:function() {
  f("You are getting _decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_decode", {configurable:!0, set:function() {
  f("You are setting _decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_encode") || (Object.defineProperty(c.ready, "_encode", {configurable:!0, get:function() {
  f("You are getting _encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_encode", {configurable:!0, set:function() {
  f("You are setting _encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_open_audio_decode") || (Object.defineProperty(c.ready, "_open_audio_decode", {configurable:!0, get:function() {
  f("You are getting _open_audio_decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_open_audio_decode", {configurable:!0, set:function() {
  f("You are setting _open_audio_decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_audio_decode") || (Object.defineProperty(c.ready, "_audio_decode", {configurable:!0, get:function() {
  f("You are getting _audio_decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_audio_decode", {configurable:!0, set:function() {
  f("You are setting _audio_decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_close_audio_decode") || (Object.defineProperty(c.ready, "_close_audio_decode", {configurable:!0, get:function() {
  f("You are getting _close_audio_decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_close_audio_decode", {configurable:!0, set:function() {
  f("You are setting _close_audio_decode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_open_audio_encode") || (Object.defineProperty(c.ready, "_open_audio_encode", {configurable:!0, get:function() {
  f("You are getting _open_audio_encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_open_audio_encode", {configurable:!0, set:function() {
  f("You are setting _open_audio_encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_audio_encode") || (Object.defineProperty(c.ready, "_audio_encode", {configurable:!0, get:function() {
  f("You are getting _audio_encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_audio_encode", {configurable:!0, set:function() {
  f("You are setting _audio_encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "_close_audio_encode") || (Object.defineProperty(c.ready, "_close_audio_encode", {configurable:!0, get:function() {
  f("You are getting _close_audio_encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "_close_audio_encode", {configurable:!0, set:function() {
  f("You are setting _close_audio_encode on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "___stdio_exit") || (Object.defineProperty(c.ready, "___stdio_exit", {configurable:!0, get:function() {
  f("You are getting ___stdio_exit on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "___stdio_exit", {configurable:!0, set:function() {
  f("You are setting ___stdio_exit on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
Object.getOwnPropertyDescriptor(c.ready, "onRuntimeInitialized") || (Object.defineProperty(c.ready, "onRuntimeInitialized", {configurable:!0, get:function() {
  f("You are getting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}), Object.defineProperty(c.ready, "onRuntimeInitialized", {configurable:!0, set:function() {
  f("You are setting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js");
}}));
var ca = Object.assign({}, c), da = "./this.program", ea = "object" == typeof window, h = "function" == typeof importScripts, fa = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ia = !ea && !fa && !h;
if (c.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
}
var m = "", t, u, v, fs, ja, ka;
if (fa) {
  if ("object" != typeof process || "function" != typeof require) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  m = h ? require("path").dirname(m) + "/" : __dirname + "/";
  ka = () => {
    ja || (fs = require("fs"), ja = require("path"));
  };
  t = function(a, b) {
    ka();
    a = ja.normalize(a);
    return fs.readFileSync(a, b ? void 0 : "utf8");
  };
  v = a => {
    a = t(a, !0);
    a.buffer || (a = new Uint8Array(a));
    assert(a.buffer);
    return a;
  };
  u = (a, b, d) => {
    ka();
    a = ja.normalize(a);
    fs.readFile(a, function(e, g) {
      e ? d(e) : b(g.buffer);
    });
  };
  1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
  process.argv.slice(2);
  process.on("uncaughtException", function(a) {
    throw a;
  });
  process.on("unhandledRejection", function(a) {
    throw a;
  });
  c.inspect = function() {
    return "[Emscripten Module object]";
  };
} else if (ia) {
  if ("object" == typeof process && "function" === typeof require || "object" == typeof window || "function" == typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  "undefined" != typeof read && (t = function(a) {
    return read(a);
  });
  v = function(a) {
    if ("function" == typeof readbuffer) {
      return new Uint8Array(readbuffer(a));
    }
    a = read(a, "binary");
    assert("object" == typeof a);
    return a;
  };
  u = function(a, b) {
    setTimeout(() => b(v(a)), 0);
  };
  "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
} else if (ea || h) {
  h ? m = self.location.href : "undefined" != typeof document && document.currentScript && (m = document.currentScript.src);
  _scriptDir && (m = _scriptDir);
  0 !== m.indexOf("blob:") ? m = m.substr(0, m.replace(/[?#].*/, "").lastIndexOf("/") + 1) : m = "";
  if ("object" != typeof window && "function" != typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  t = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText;
  };
  h && (v = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  u = (a, b, d) => {
    var e = new XMLHttpRequest();
    e.open("GET", a, !0);
    e.responseType = "arraybuffer";
    e.onload = () => {
      200 == e.status || 0 == e.status && e.response ? b(e.response) : d();
    };
    e.onerror = d;
    e.send(null);
  };
} else {
  throw Error("environment detection error");
}
var la = c.print || console.log.bind(console), x = c.printErr || console.warn.bind(console);
Object.assign(c, ca);
ca = null;
Object.getOwnPropertyDescriptor(c, "fetchSettings") && f("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
y("arguments", "arguments_");
c.thisProgram && (da = c.thisProgram);
y("thisProgram", "thisProgram");
y("quit", "quit_");
assert("undefined" == typeof c.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof c.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof c.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof c.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof c.read, "Module.read option was removed (modify read_ in JS)");
assert("undefined" == typeof c.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
assert("undefined" == typeof c.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
assert("undefined" == typeof c.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
assert("undefined" == typeof c.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
y("read", "read_");
y("readAsync", "readAsync");
y("readBinary", "readBinary");
y("setWindowTitle", "setWindowTitle");
assert(!ia, "shell environment detected but not enabled at build time.  Add 'shell' to `-s ENVIRONMENT` to enable.");
function ma(a) {
  na || (na = {});
  na[a] || (na[a] = 1, x(a));
}
var na;
function y(a, b) {
  Object.getOwnPropertyDescriptor(c, a) || Object.defineProperty(c, a, {configurable:!0, get:function() {
    f("Module." + a + " has been replaced with plain " + b + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function oa(a) {
  return "'" + a + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
}
function pa(a) {
  Object.getOwnPropertyDescriptor(c, a) || Object.defineProperty(c, a, {configurable:!0, get:function() {
    f(oa(a));
  }});
}
function C(a) {
  Object.getOwnPropertyDescriptor(c, a) || (c[a] = () => f(oa(a)));
}
var qa;
c.wasmBinary && (qa = c.wasmBinary);
y("wasmBinary", "wasmBinary");
var noExitRuntime = c.noExitRuntime || !0;
y("noExitRuntime", "noExitRuntime");
"object" != typeof WebAssembly && f("no native wasm support detected");
var ra, sa = !1;
function assert(a, b) {
  a || f("Assertion failed" + (b ? ": " + b : ""));
}
function ta(a) {
  var b = c["_" + a];
  assert(b, "Cannot call unknown function " + a + ", make sure it is exported");
  return b;
}
function ua(a, b, d, e) {
  var g = {string:function(n) {
    var r = 0;
    if (null !== n && void 0 !== n && 0 !== n) {
      var w = (n.length << 2) + 1;
      r = va(w);
      wa(n, r, w);
    }
    return r;
  }, array:function(n) {
    var r = va(n.length);
    assert(0 <= n.length, "writeArrayToMemory array must have a length (should be an array or typed array)");
    D.set(n, r);
    return r;
  }};
  a = ta(a);
  var k = [], l = 0;
  assert("array" !== b, 'Return type should not be "array".');
  if (e) {
    for (var p = 0; p < e.length; p++) {
      var q = g[d[p]];
      q ? (0 === l && (l = xa()), k[p] = q(e[p])) : k[p] = e[p];
    }
  }
  d = a.apply(null, k);
  return d = function(n) {
    0 !== l && ya(l);
    return "string" === b ? F(n) : "boolean" === b ? !!n : n;
  }(d);
}
var za = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function G(a, b, d) {
  var e = b + d;
  for (d = b; a[d] && !(d >= e);) {
    ++d;
  }
  if (16 < d - b && a.subarray && za) {
    return za.decode(a.subarray(b, d));
  }
  for (e = ""; b < d;) {
    var g = a[b++];
    if (g & 128) {
      var k = a[b++] & 63;
      if (192 == (g & 224)) {
        e += String.fromCharCode((g & 31) << 6 | k);
      } else {
        var l = a[b++] & 63;
        224 == (g & 240) ? g = (g & 15) << 12 | k << 6 | l : (240 != (g & 248) && ma("Invalid UTF-8 leading byte 0x" + g.toString(16) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), g = (g & 7) << 18 | k << 12 | l << 6 | a[b++] & 63);
        65536 > g ? e += String.fromCharCode(g) : (g -= 65536, e += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023));
      }
    } else {
      e += String.fromCharCode(g);
    }
  }
  return e;
}
function F(a) {
  return a ? G(H, a, void 0) : "";
}
function Aa(a, b, d, e) {
  if (!(0 < e)) {
    return 0;
  }
  var g = d;
  e = d + e - 1;
  for (var k = 0; k < a.length; ++k) {
    var l = a.charCodeAt(k);
    if (55296 <= l && 57343 >= l) {
      var p = a.charCodeAt(++k);
      l = 65536 + ((l & 1023) << 10) | p & 1023;
    }
    if (127 >= l) {
      if (d >= e) {
        break;
      }
      b[d++] = l;
    } else {
      if (2047 >= l) {
        if (d + 1 >= e) {
          break;
        }
        b[d++] = 192 | l >> 6;
      } else {
        if (65535 >= l) {
          if (d + 2 >= e) {
            break;
          }
          b[d++] = 224 | l >> 12;
        } else {
          if (d + 3 >= e) {
            break;
          }
          1114111 < l && ma("Invalid Unicode code point 0x" + l.toString(16) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          b[d++] = 240 | l >> 18;
          b[d++] = 128 | l >> 12 & 63;
        }
        b[d++] = 128 | l >> 6 & 63;
      }
      b[d++] = 128 | l & 63;
    }
  }
  b[d] = 0;
  return d - g;
}
function wa(a, b, d) {
  assert("number" == typeof d, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  Aa(a, H, b, d);
}
function Ba(a) {
  for (var b = 0, d = 0; d < a.length; ++d) {
    var e = a.charCodeAt(d);
    55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++d) & 1023);
    127 >= e ? ++b : b = 2047 >= e ? b + 2 : 65535 >= e ? b + 3 : b + 4;
  }
  return b;
}
"undefined" != typeof TextDecoder && new TextDecoder("utf-16le");
function Ca(a) {
  var b = Ba(a) + 1, d = Da(b);
  d && Aa(a, D, d, b);
  return d;
}
var Ea, D, H, Fa, I, Ga;
function Ha() {
  var a = ra.buffer;
  Ea = a;
  c.HEAP8 = D = new Int8Array(a);
  c.HEAP16 = Fa = new Int16Array(a);
  c.HEAP32 = I = new Int32Array(a);
  c.HEAPU8 = H = new Uint8Array(a);
  c.HEAPU16 = new Uint16Array(a);
  c.HEAPU32 = Ga = new Uint32Array(a);
  c.HEAPF32 = new Float32Array(a);
  c.HEAPF64 = new Float64Array(a);
}
c.TOTAL_STACK && assert(5242880 === c.TOTAL_STACK, "the stack size can no longer be determined at runtime");
var Ia = c.INITIAL_MEMORY || 16777216;
y("INITIAL_MEMORY", "INITIAL_MEMORY");
assert(5242880 <= Ia, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + Ia + "! (TOTAL_STACK=5242880)");
assert("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
assert(!c.wasmMemory, "Use of `wasmMemory` detected.  Use -s IMPORTED_MEMORY to define wasmMemory externally");
assert(16777216 == Ia, "Detected runtime INITIAL_MEMORY setting.  Use -s IMPORTED_MEMORY to define wasmMemory dynamically");
var Ja;
function Ka() {
  var a = La();
  assert(0 == (a & 3));
  I[a + 4 >> 2] = 34821223;
  I[a + 8 >> 2] = 2310721022;
  I[0] = 1668509029;
}
function Ma() {
  if (!sa) {
    var a = La(), b = Ga[a + 4 >> 2];
    a = Ga[a + 8 >> 2];
    34821223 == b && 2310721022 == a || f("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + a.toString(16) + " 0x" + b.toString(16));
    1668509029 !== I[0] && f("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var Na = new Int16Array(1), Oa = new Int8Array(Na.buffer);
Na[0] = 25459;
if (115 !== Oa[0] || 99 !== Oa[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)";
}
var Pa = [], Qa = [], Ra = [], Sa = !1;
function Ta() {
  var a = c.preRun.shift();
  Pa.unshift(a);
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var J = 0, K = null, Ua = null, M = {};
function Va(a) {
  for (var b = a;;) {
    if (!M[a]) {
      return a;
    }
    a = b + Math.random();
  }
}
function Wa(a) {
  J++;
  c.monitorRunDependencies && c.monitorRunDependencies(J);
  a ? (assert(!M[a]), M[a] = 1, null === K && "undefined" != typeof setInterval && (K = setInterval(function() {
    if (sa) {
      clearInterval(K), K = null;
    } else {
      var b = !1, d;
      for (d in M) {
        b || (b = !0, x("still waiting on run dependencies:")), x("dependency: " + d);
      }
      b && x("(end of list)");
    }
  }, 10000))) : x("warning: run dependency added without ID");
}
function Xa(a) {
  J--;
  c.monitorRunDependencies && c.monitorRunDependencies(J);
  a ? (assert(M[a]), delete M[a]) : x("warning: run dependency removed without ID");
  0 == J && (null !== K && (clearInterval(K), K = null), Ua && (a = Ua, Ua = null, a()));
}
c.preloadedImages = {};
c.preloadedAudios = {};
function f(a) {
  if (c.onAbort) {
    c.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  x(a);
  sa = !0;
  a = new WebAssembly.RuntimeError(a);
  ba(a);
  throw a;
}
function Ya() {
  return N.startsWith("data:application/octet-stream;base64,");
}
function O(a) {
  return function() {
    var b = c.asm;
    assert(Sa, "native function `" + a + "` called before runtime initialization");
    assert(!0, "native function `" + a + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
    b[a] || assert(b[a], "exported native function `" + a + "` not found");
    return b[a].apply(null, arguments);
  };
}
var N;
N = "audio.wasm";
if (!Ya()) {
  var Za = N;
  N = c.locateFile ? c.locateFile(Za, m) : m + Za;
}
function $a() {
  var a = N;
  try {
    if (a == N && qa) {
      return new Uint8Array(qa);
    }
    if (v) {
      return v(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (b) {
    f(b);
  }
}
function ab() {
  if (!qa && (ea || h)) {
    if ("function" == typeof fetch && !N.startsWith("file://")) {
      return fetch(N, {credentials:"same-origin"}).then(function(a) {
        if (!a.ok) {
          throw "failed to load wasm binary file at '" + N + "'";
        }
        return a.arrayBuffer();
      }).catch(function() {
        return $a();
      });
    }
    if (u) {
      return new Promise(function(a, b) {
        u(N, function(d) {
          a(new Uint8Array(d));
        }, b);
      });
    }
  }
  return Promise.resolve().then(function() {
    return $a();
  });
}
var P, Q;
function bb(a) {
  for (; 0 < a.length;) {
    var b = a.shift();
    if ("function" == typeof b) {
      b(c);
    } else {
      var d = b.Jb;
      "number" == typeof d ? void 0 === b.la ? cb(d)() : cb(d)(b.la) : d(void 0 === b.la ? null : b.la);
    }
  }
}
function db(a) {
  return a.replace(/\b_Z[\w\d_]+/g, function(b) {
    ma("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
    return b === b ? b : b + " [" + b + "]";
  });
}
var eb = [];
function cb(a) {
  var b = eb[a];
  b || (a >= eb.length && (eb.length = a + 1), eb[a] = b = Ja.get(a));
  assert(Ja.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}
function fb(a, b) {
  for (var d = 0, e = a.length - 1; 0 <= e; e--) {
    var g = a[e];
    "." === g ? a.splice(e, 1) : ".." === g ? (a.splice(e, 1), d++) : d && (a.splice(e, 1), d--);
  }
  if (b) {
    for (; d; d--) {
      a.unshift("..");
    }
  }
  return a;
}
function gb(a) {
  var b = "/" === a.charAt(0), d = "/" === a.substr(-1);
  (a = fb(a.split("/").filter(function(e) {
    return !!e;
  }), !b).join("/")) || b || (a = ".");
  a && d && (a += "/");
  return (b ? "/" : "") + a;
}
function hb(a) {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b && (b = b.substr(0, b.length - 1));
  return a + b;
}
function R(a) {
  if ("/" === a) {
    return "/";
  }
  a = gb(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
}
function S(a, b) {
  return gb(a + "/" + b);
}
function ib() {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    var a = new Uint8Array(1);
    return function() {
      crypto.getRandomValues(a);
      return a[0];
    };
  }
  if (fa) {
    try {
      var b = require("crypto");
      return function() {
        return b.randomBytes(1)[0];
      };
    } catch (d) {
    }
  }
  return function() {
    f("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
  };
}
function T() {
  for (var a = "", b = !1, d = arguments.length - 1; -1 <= d && !b; d--) {
    b = 0 <= d ? arguments[d] : U.cwd();
    if ("string" != typeof b) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!b) {
      return "";
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0);
  }
  a = fb(a.split("/").filter(function(e) {
    return !!e;
  }), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
function jb(a, b) {
  function d(l) {
    for (var p = 0; p < l.length && "" === l[p]; p++) {
    }
    for (var q = l.length - 1; 0 <= q && "" === l[q]; q--) {
    }
    return p > q ? [] : l.slice(p, q - p + 1);
  }
  a = T(a).substr(1);
  b = T(b).substr(1);
  a = d(a.split("/"));
  b = d(b.split("/"));
  for (var e = Math.min(a.length, b.length), g = e, k = 0; k < e; k++) {
    if (a[k] !== b[k]) {
      g = k;
      break;
    }
  }
  e = [];
  for (k = g; k < a.length; k++) {
    e.push("..");
  }
  e = e.concat(b.slice(g));
  return e.join("/");
}
var kb = [];
function lb(a, b) {
  kb[a] = {input:[], output:[], S:b};
  U.za(a, mb);
}
var mb = {open:function(a) {
  var b = kb[a.node.rdev];
  if (!b) {
    throw new U.g(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close:function(a) {
  a.tty.S.flush(a.tty);
}, flush:function(a) {
  a.tty.S.flush(a.tty);
}, read:function(a, b, d, e) {
  if (!a.tty || !a.tty.S.Oa) {
    throw new U.g(60);
  }
  for (var g = 0, k = 0; k < e; k++) {
    try {
      var l = a.tty.S.Oa(a.tty);
    } catch (p) {
      throw new U.g(29);
    }
    if (void 0 === l && 0 === g) {
      throw new U.g(6);
    }
    if (null === l || void 0 === l) {
      break;
    }
    g++;
    b[d + k] = l;
  }
  g && (a.node.timestamp = Date.now());
  return g;
}, write:function(a, b, d, e) {
  if (!a.tty || !a.tty.S.wa) {
    throw new U.g(60);
  }
  try {
    for (var g = 0; g < e; g++) {
      a.tty.S.wa(a.tty, b[d + g]);
    }
  } catch (k) {
    throw new U.g(29);
  }
  e && (a.node.timestamp = Date.now());
  return g;
}}, ob = {Oa:function(a) {
  if (!a.input.length) {
    var b = null;
    if (fa) {
      var d = Buffer.alloc(256), e = 0;
      try {
        e = fs.readSync(process.stdin.fd, d, 0, 256, -1);
      } catch (g) {
        if (g.toString().includes("EOF")) {
          e = 0;
        } else {
          throw g;
        }
      }
      0 < e ? b = d.slice(0, e).toString("utf-8") : b = null;
    } else {
      "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
    }
    if (!b) {
      return null;
    }
    a.input = nb(b);
  }
  return a.input.shift();
}, wa:function(a, b) {
  null === b || 10 === b ? (la(G(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, flush:function(a) {
  a.output && 0 < a.output.length && (la(G(a.output, 0)), a.output = []);
}}, pb = {wa:function(a, b) {
  null === b || 10 === b ? (x(G(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, flush:function(a) {
  a.output && 0 < a.output.length && (x(G(a.output, 0)), a.output = []);
}}, V = {H:null, s:function() {
  return V.createNode(null, "/", 16895, 0);
}, createNode:function(a, b, d, e) {
  if (U.pb(d) || U.isFIFO(d)) {
    throw new U.g(63);
  }
  V.H || (V.H = {dir:{node:{D:V.h.D, v:V.h.v, lookup:V.h.lookup, I:V.h.I, rename:V.h.rename, unlink:V.h.unlink, rmdir:V.h.rmdir, readdir:V.h.readdir, symlink:V.h.symlink}, stream:{A:V.j.A}}, file:{node:{D:V.h.D, v:V.h.v}, stream:{A:V.j.A, read:V.j.read, write:V.j.write, U:V.j.U, Y:V.j.Y, aa:V.j.aa}}, link:{node:{D:V.h.D, v:V.h.v, readlink:V.h.readlink}, stream:{}}, Da:{node:{D:V.h.D, v:V.h.v}, stream:U.bb}});
  d = U.createNode(a, b, d, e);
  U.u(d.mode) ? (d.h = V.H.dir.node, d.j = V.H.dir.stream, d.i = {}) : U.isFile(d.mode) ? (d.h = V.H.file.node, d.j = V.H.file.stream, d.m = 0, d.i = null) : U.M(d.mode) ? (d.h = V.H.link.node, d.j = V.H.link.stream) : U.W(d.mode) && (d.h = V.H.Da.node, d.j = V.H.Da.stream);
  d.timestamp = Date.now();
  a && (a.i[b] = d, a.timestamp = d.timestamp);
  return d;
}, Kb:function(a) {
  return a.i ? a.i.subarray ? a.i.subarray(0, a.m) : new Uint8Array(a.i) : new Uint8Array(0);
}, Ka:function(a, b) {
  var d = a.i ? a.i.length : 0;
  d >= b || (b = Math.max(b, d * (1048576 > d ? 2.0 : 1.125) >>> 0), 0 != d && (b = Math.max(b, 256)), d = a.i, a.i = new Uint8Array(b), 0 < a.m && a.i.set(d.subarray(0, a.m), 0));
}, zb:function(a, b) {
  if (a.m != b) {
    if (0 == b) {
      a.i = null, a.m = 0;
    } else {
      var d = a.i;
      a.i = new Uint8Array(b);
      d && a.i.set(d.subarray(0, Math.min(b, a.m)));
      a.m = b;
    }
  }
}, h:{D:function(a) {
  var b = {};
  b.dev = U.W(a.mode) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  U.u(a.mode) ? b.size = 4096 : U.isFile(a.mode) ? b.size = a.m : U.M(a.mode) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.timestamp);
  b.mtime = new Date(a.timestamp);
  b.ctime = new Date(a.timestamp);
  b.Za = 4096;
  b.blocks = Math.ceil(b.size / b.Za);
  return b;
}, v:function(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  void 0 !== b.size && V.zb(a, b.size);
}, lookup:function() {
  throw U.oa[44];
}, I:function(a, b, d, e) {
  return V.createNode(a, b, d, e);
}, rename:function(a, b, d) {
  if (U.u(a.mode)) {
    try {
      var e = U.F(b, d);
    } catch (k) {
    }
    if (e) {
      for (var g in e.i) {
        throw new U.g(55);
      }
    }
  }
  delete a.parent.i[a.name];
  a.parent.timestamp = Date.now();
  a.name = d;
  b.i[d] = a;
  b.timestamp = a.parent.timestamp;
  a.parent = b;
}, unlink:function(a, b) {
  delete a.i[b];
  a.timestamp = Date.now();
}, rmdir:function(a, b) {
  var d = U.F(a, b), e;
  for (e in d.i) {
    throw new U.g(55);
  }
  delete a.i[b];
  a.timestamp = Date.now();
}, readdir:function(a) {
  var b = [".", ".."], d;
  for (d in a.i) {
    a.i.hasOwnProperty(d) && b.push(d);
  }
  return b;
}, symlink:function(a, b, d) {
  a = V.createNode(a, b, 41471, 0);
  a.link = d;
  return a;
}, readlink:function(a) {
  if (!U.M(a.mode)) {
    throw new U.g(28);
  }
  return a.link;
}}, j:{read:function(a, b, d, e, g) {
  var k = a.node.i;
  if (g >= a.node.m) {
    return 0;
  }
  a = Math.min(a.node.m - g, e);
  assert(0 <= a);
  if (8 < a && k.subarray) {
    b.set(k.subarray(g, g + a), d);
  } else {
    for (e = 0; e < a; e++) {
      b[d + e] = k[g + e];
    }
  }
  return a;
}, write:function(a, b, d, e, g, k) {
  assert(!(b instanceof ArrayBuffer));
  b.buffer === D.buffer && (k = !1);
  if (!e) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.i || a.i.subarray)) {
    if (k) {
      return assert(0 === g, "canOwn must imply no weird position inside the file"), a.i = b.subarray(d, d + e), a.m = e;
    }
    if (0 === a.m && 0 === g) {
      return a.i = b.slice(d, d + e), a.m = e;
    }
    if (g + e <= a.m) {
      return a.i.set(b.subarray(d, d + e), g), e;
    }
  }
  V.Ka(a, g + e);
  if (a.i.subarray && b.subarray) {
    a.i.set(b.subarray(d, d + e), g);
  } else {
    for (k = 0; k < e; k++) {
      a.i[g + k] = b[d + k];
    }
  }
  a.m = Math.max(a.m, g + e);
  return e;
}, A:function(a, b, d) {
  1 === d ? b += a.position : 2 === d && U.isFile(a.node.mode) && (b += a.node.m);
  if (0 > b) {
    throw new U.g(28);
  }
  return b;
}, U:function(a, b, d) {
  V.Ka(a.node, b + d);
  a.node.m = Math.max(a.node.m, b + d);
}, Y:function(a, b, d, e, g, k) {
  if (0 !== b) {
    throw new U.g(28);
  }
  if (!U.isFile(a.node.mode)) {
    throw new U.g(43);
  }
  a = a.node.i;
  if (k & 2 || a.buffer !== Ea) {
    if (0 < e || e + d < a.length) {
      a.subarray ? a = a.subarray(e, e + d) : a = Array.prototype.slice.call(a, e, e + d);
    }
    e = !0;
    assert(65536, "alignment argument is required");
    d = 65536 * Math.ceil(d / 65536);
    (k = qb(65536, d)) ? (H.fill(0, k, k + d), d = k) : d = 0;
    if (!d) {
      throw new U.g(48);
    }
    D.set(a, d);
  } else {
    e = !1, d = a.byteOffset;
  }
  return {Tb:d, Eb:e};
}, aa:function(a, b, d, e, g) {
  if (!U.isFile(a.node.mode)) {
    throw new U.g(43);
  }
  if (g & 2) {
    return 0;
  }
  V.j.write(a, b, 0, e, d, !1);
  return 0;
}}};
function rb(a, b, d) {
  var e = Va("al " + a);
  u(a, function(g) {
    assert(g, 'Loading data file "' + a + '" failed (no arrayBuffer).');
    b(new Uint8Array(g));
    e && Xa(e);
  }, function() {
    if (d) {
      d();
    } else {
      throw 'Loading data file "' + a + '" failed.';
    }
  });
  e && Wa(e);
}
var sb = {0:"Success", 1:"Arg list too long", 2:"Permission denied", 3:"Address already in use", 4:"Address not available", 5:"Address family not supported by protocol family", 6:"No more processes", 7:"Socket already connected", 8:"Bad file number", 9:"Trying to read unreadable message", 10:"Mount device busy", 11:"Operation canceled", 12:"No children", 13:"Connection aborted", 14:"Connection refused", 15:"Connection reset by peer", 16:"File locking deadlock error", 17:"Destination address required", 
18:"Math arg out of domain of func", 19:"Quota exceeded", 20:"File exists", 21:"Bad address", 22:"File too large", 23:"Host is unreachable", 24:"Identifier removed", 25:"Illegal byte sequence", 26:"Connection already in progress", 27:"Interrupted system call", 28:"Invalid argument", 29:"I/O error", 30:"Socket is already connected", 31:"Is a directory", 32:"Too many symbolic links", 33:"Too many open files", 34:"Too many links", 35:"Message too long", 36:"Multihop attempted", 37:"File or path name too long", 
38:"Network interface is not configured", 39:"Connection reset by network", 40:"Network is unreachable", 41:"Too many open files in system", 42:"No buffer space available", 43:"No such device", 44:"No such file or directory", 45:"Exec format error", 46:"No record locks available", 47:"The link has been severed", 48:"Not enough core", 49:"No message of desired type", 50:"Protocol not available", 51:"No space left on device", 52:"Function not implemented", 53:"Socket is not connected", 54:"Not a directory", 
55:"Directory not empty", 56:"State not recoverable", 57:"Socket operation on non-socket", 59:"Not a typewriter", 60:"No such device or address", 61:"Value too large for defined data type", 62:"Previous owner died", 63:"Not super-user", 64:"Broken pipe", 65:"Protocol error", 66:"Unknown protocol", 67:"Protocol wrong type for socket", 68:"Math result not representable", 69:"Read only file system", 70:"Illegal seek", 71:"No such process", 72:"Stale file handle", 73:"Connection timed out", 74:"Text file busy", 
75:"Cross-device link", 100:"Device not a stream", 101:"Bad font file fmt", 102:"Invalid slot", 103:"Invalid request code", 104:"No anode", 105:"Block device required", 106:"Channel number out of range", 107:"Level 3 halted", 108:"Level 3 reset", 109:"Link number out of range", 110:"Protocol driver not attached", 111:"No CSI structure available", 112:"Level 2 halted", 113:"Invalid exchange", 114:"Invalid request descriptor", 115:"Exchange full", 116:"No data (for no delay io)", 117:"Timer expired", 
118:"Out of streams resources", 119:"Machine is not on the network", 120:"Package not installed", 121:"The object is remote", 122:"Advertise error", 123:"Srmount error", 124:"Communication error on send", 125:"Cross mount point (not really error)", 126:"Given log. name not unique", 127:"f.d. invalid for this operation", 128:"Remote address changed", 129:"Can   access a needed shared lib", 130:"Accessing a corrupted shared lib", 131:".lib section in a.out corrupted", 132:"Attempting to link in too many libs", 
133:"Attempting to exec a shared library", 135:"Streams pipe error", 136:"Too many users", 137:"Socket type not supported", 138:"Not supported", 139:"Protocol family not supported", 140:"Can't send after socket shutdown", 141:"Too many references", 142:"Host is down", 148:"No medium (in tape drive)", 156:"Level 2 not synchronized"}, tb = {}, U = {root:null, $:[], Ia:{}, streams:[], ub:1, G:null, Ha:"/", fa:!1, Sa:!0, g:null, oa:{}, lb:null, ba:0, l:(a, b = {}) => {
  a = T(U.cwd(), a);
  if (!a) {
    return {path:"", node:null};
  }
  var d = {na:!0, ya:0}, e;
  for (e in d) {
    void 0 === b[e] && (b[e] = d[e]);
  }
  if (8 < b.ya) {
    throw new U.g(32);
  }
  a = fb(a.split("/").filter(l => !!l), !1);
  var g = U.root;
  d = "/";
  for (e = 0; e < a.length; e++) {
    var k = e === a.length - 1;
    if (k && b.parent) {
      break;
    }
    g = U.F(g, a[e]);
    d = S(d, a[e]);
    U.N(g) && (!k || k && b.na) && (g = g.Z.root);
    if (!k || b.B) {
      for (k = 0; U.M(g.mode);) {
        if (g = U.readlink(d), d = T(hb(d), g), g = U.l(d, {ya:b.ya}).node, 40 < k++) {
          throw new U.g(32);
        }
      }
    }
  }
  return {path:d, node:g};
}, J:a => {
  for (var b;;) {
    if (U.ga(a)) {
      return a = a.s.Ta, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
    }
    b = b ? a.name + "/" + b : a.name;
    a = a.parent;
  }
}, qa:(a, b) => {
  for (var d = 0, e = 0; e < b.length; e++) {
    d = (d << 5) - d + b.charCodeAt(e) | 0;
  }
  return (a + d >>> 0) % U.G.length;
}, Qa:a => {
  var b = U.qa(a.parent.id, a.name);
  a.P = U.G[b];
  U.G[b] = a;
}, Ra:a => {
  var b = U.qa(a.parent.id, a.name);
  if (U.G[b] === a) {
    U.G[b] = a.P;
  } else {
    for (b = U.G[b]; b;) {
      if (b.P === a) {
        b.P = a.P;
        break;
      }
      b = b.P;
    }
  }
}, F:(a, b) => {
  var d = U.rb(a);
  if (d) {
    throw new U.g(d, a);
  }
  for (d = U.G[U.qa(a.id, b)]; d; d = d.P) {
    var e = d.name;
    if (d.parent.id === a.id && e === b) {
      return d;
    }
  }
  return U.lookup(a, b);
}, createNode:(a, b, d, e) => {
  assert("object" == typeof a);
  a = new U.Va(a, b, d, e);
  U.Qa(a);
  return a;
}, ma:a => {
  U.Ra(a);
}, ga:a => a === a.parent, N:a => !!a.Z, isFile:a => 32768 === (a & 61440), u:a => 16384 === (a & 61440), M:a => 40960 === (a & 61440), W:a => 8192 === (a & 61440), pb:a => 24576 === (a & 61440), isFIFO:a => 4096 === (a & 61440), isSocket:a => 49152 === (a & 49152), mb:{r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}, tb:a => {
  var b = U.mb[a];
  if ("undefined" == typeof b) {
    throw Error("Unknown file open mode: " + a);
  }
  return b;
}, La:a => {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}, K:(a, b) => {
  if (U.Sa) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}, rb:a => {
  var b = U.K(a, "x");
  return b ? b : a.h.lookup ? 0 : 2;
}, va:(a, b) => {
  try {
    return U.F(a, b), 20;
  } catch (d) {
  }
  return U.K(a, "wx");
}, ha:(a, b, d) => {
  try {
    var e = U.F(a, b);
  } catch (g) {
    return g.o;
  }
  if (a = U.K(a, "wx")) {
    return a;
  }
  if (d) {
    if (!U.u(e.mode)) {
      return 54;
    }
    if (U.ga(e) || U.J(e) === U.cwd()) {
      return 10;
    }
  } else {
    if (U.u(e.mode)) {
      return 31;
    }
  }
  return 0;
}, sb:(a, b) => a ? U.M(a.mode) ? 32 : U.u(a.mode) && ("r" !== U.La(b) || b & 512) ? 31 : U.K(a, U.La(b)) : 44, Wa:4096, vb:(a = 0, b = U.Wa) => {
  for (; a <= b; a++) {
    if (!U.streams[a]) {
      return a;
    }
  }
  throw new U.g(33);
}, R:a => U.streams[a], jb:(a, b, d) => {
  U.ja || (U.ja = function() {
  }, U.ja.prototype = {object:{get:function() {
    return this.node;
  }, set:function(e) {
    this.node = e;
  }}});
  a = Object.assign(new U.ja(), a);
  b = U.vb(b, d);
  a.fd = b;
  return U.streams[b] = a;
}, cb:a => {
  U.streams[a] = null;
}, bb:{open:a => {
  a.j = U.nb(a.node.rdev).j;
  a.j.open && a.j.open(a);
}, A:() => {
  throw new U.g(70);
}}, ua:a => a >> 8, Ob:a => a & 255, O:(a, b) => a << 8 | b, za:(a, b) => {
  U.Ia[a] = {j:b};
}, nb:a => U.Ia[a], Na:a => {
  var b = [];
  for (a = [a]; a.length;) {
    var d = a.pop();
    b.push(d);
    a.push.apply(a, d.$);
  }
  return b;
}, Ua:(a, b) => {
  function d(l) {
    assert(0 < U.ba);
    U.ba--;
    return b(l);
  }
  function e(l) {
    if (l) {
      if (!e.kb) {
        return e.kb = !0, d(l);
      }
    } else {
      ++k >= g.length && d(null);
    }
  }
  "function" == typeof a && (b = a, a = !1);
  U.ba++;
  1 < U.ba && x("warning: " + U.ba + " FS.syncfs operations in flight at once, probably just doing extra work");
  var g = U.Na(U.root.s), k = 0;
  g.forEach(l => {
    if (!l.type.Ua) {
      return e(null);
    }
    l.type.Ua(l, a, e);
  });
}, s:(a, b, d) => {
  if ("string" == typeof a) {
    throw a;
  }
  var e = "/" === d, g = !d;
  if (e && U.root) {
    throw new U.g(10);
  }
  if (!e && !g) {
    var k = U.l(d, {na:!1});
    d = k.path;
    k = k.node;
    if (U.N(k)) {
      throw new U.g(10);
    }
    if (!U.u(k.mode)) {
      throw new U.g(54);
    }
  }
  b = {type:a, Sb:b, Ta:d, $:[]};
  a = a.s(b);
  a.s = b;
  b.root = a;
  e ? U.root = a : k && (k.Z = b, k.s && k.s.$.push(b));
  return a;
}, Xb:a => {
  a = U.l(a, {na:!1});
  if (!U.N(a.node)) {
    throw new U.g(28);
  }
  a = a.node;
  var b = a.Z, d = U.Na(b);
  Object.keys(U.G).forEach(e => {
    for (e = U.G[e]; e;) {
      var g = e.P;
      d.includes(e.s) && U.ma(e);
      e = g;
    }
  });
  a.Z = null;
  b = a.s.$.indexOf(b);
  assert(-1 !== b);
  a.s.$.splice(b, 1);
}, lookup:(a, b) => a.h.lookup(a, b), I:(a, b, d) => {
  var e = U.l(a, {parent:!0}).node;
  a = R(a);
  if (!a || "." === a || ".." === a) {
    throw new U.g(28);
  }
  var g = U.va(e, a);
  if (g) {
    throw new U.g(g);
  }
  if (!e.h.I) {
    throw new U.g(63);
  }
  return e.h.I(e, a, b, d);
}, create:(a, b) => U.I(a, (void 0 !== b ? b : 438) & 4095 | 32768, 0), mkdir:(a, b) => U.I(a, (void 0 !== b ? b : 511) & 1023 | 16384, 0), Pb:(a, b) => {
  a = a.split("/");
  for (var d = "", e = 0; e < a.length; ++e) {
    if (a[e]) {
      d += "/" + a[e];
      try {
        U.mkdir(d, b);
      } catch (g) {
        if (20 != g.o) {
          throw g;
        }
      }
    }
  }
}, ia:(a, b, d) => {
  "undefined" == typeof d && (d = b, b = 438);
  return U.I(a, b | 8192, d);
}, symlink:(a, b) => {
  if (!T(a)) {
    throw new U.g(44);
  }
  var d = U.l(b, {parent:!0}).node;
  if (!d) {
    throw new U.g(44);
  }
  b = R(b);
  var e = U.va(d, b);
  if (e) {
    throw new U.g(e);
  }
  if (!d.h.symlink) {
    throw new U.g(63);
  }
  return d.h.symlink(d, b, a);
}, rename:(a, b) => {
  var d = hb(a), e = hb(b), g = R(a), k = R(b);
  var l = U.l(a, {parent:!0});
  var p = l.node;
  l = U.l(b, {parent:!0});
  l = l.node;
  if (!p || !l) {
    throw new U.g(44);
  }
  if (p.s !== l.s) {
    throw new U.g(75);
  }
  var q = U.F(p, g);
  a = jb(a, e);
  if ("." !== a.charAt(0)) {
    throw new U.g(28);
  }
  a = jb(b, d);
  if ("." !== a.charAt(0)) {
    throw new U.g(55);
  }
  try {
    var n = U.F(l, k);
  } catch (r) {
  }
  if (q !== n) {
    b = U.u(q.mode);
    if (g = U.ha(p, g, b)) {
      throw new U.g(g);
    }
    if (g = n ? U.ha(l, k, b) : U.va(l, k)) {
      throw new U.g(g);
    }
    if (!p.h.rename) {
      throw new U.g(63);
    }
    if (U.N(q) || n && U.N(n)) {
      throw new U.g(10);
    }
    if (l !== p && (g = U.K(p, "w"))) {
      throw new U.g(g);
    }
    U.Ra(q);
    try {
      p.h.rename(q, l, k);
    } catch (r) {
      throw r;
    } finally {
      U.Qa(q);
    }
  }
}, rmdir:a => {
  var b = U.l(a, {parent:!0}).node;
  a = R(a);
  var d = U.F(b, a), e = U.ha(b, a, !0);
  if (e) {
    throw new U.g(e);
  }
  if (!b.h.rmdir) {
    throw new U.g(63);
  }
  if (U.N(d)) {
    throw new U.g(10);
  }
  b.h.rmdir(b, a);
  U.ma(d);
}, readdir:a => {
  a = U.l(a, {B:!0}).node;
  if (!a.h.readdir) {
    throw new U.g(54);
  }
  return a.h.readdir(a);
}, unlink:a => {
  var b = U.l(a, {parent:!0}).node;
  if (!b) {
    throw new U.g(44);
  }
  a = R(a);
  var d = U.F(b, a), e = U.ha(b, a, !1);
  if (e) {
    throw new U.g(e);
  }
  if (!b.h.unlink) {
    throw new U.g(63);
  }
  if (U.N(d)) {
    throw new U.g(10);
  }
  b.h.unlink(b, a);
  U.ma(d);
}, readlink:a => {
  a = U.l(a).node;
  if (!a) {
    throw new U.g(44);
  }
  if (!a.h.readlink) {
    throw new U.g(28);
  }
  return T(U.J(a.parent), a.h.readlink(a));
}, stat:(a, b) => {
  a = U.l(a, {B:!b}).node;
  if (!a) {
    throw new U.g(44);
  }
  if (!a.h.D) {
    throw new U.g(63);
  }
  return a.h.D(a);
}, lstat:a => U.stat(a, !0), chmod:(a, b, d) => {
  a = "string" == typeof a ? U.l(a, {B:!d}).node : a;
  if (!a.h.v) {
    throw new U.g(63);
  }
  a.h.v(a, {mode:b & 4095 | a.mode & -4096, timestamp:Date.now()});
}, lchmod:(a, b) => {
  U.chmod(a, b, !0);
}, fchmod:(a, b) => {
  a = U.R(a);
  if (!a) {
    throw new U.g(8);
  }
  U.chmod(a.node, b);
}, chown:(a, b, d, e) => {
  a = "string" == typeof a ? U.l(a, {B:!e}).node : a;
  if (!a.h.v) {
    throw new U.g(63);
  }
  a.h.v(a, {timestamp:Date.now()});
}, lchown:(a, b, d) => {
  U.chown(a, b, d, !0);
}, fchown:(a, b, d) => {
  a = U.R(a);
  if (!a) {
    throw new U.g(8);
  }
  U.chown(a.node, b, d);
}, truncate:(a, b) => {
  if (0 > b) {
    throw new U.g(28);
  }
  a = "string" == typeof a ? U.l(a, {B:!0}).node : a;
  if (!a.h.v) {
    throw new U.g(63);
  }
  if (U.u(a.mode)) {
    throw new U.g(31);
  }
  if (!U.isFile(a.mode)) {
    throw new U.g(28);
  }
  var d = U.K(a, "w");
  if (d) {
    throw new U.g(d);
  }
  a.h.v(a, {size:b, timestamp:Date.now()});
}, Ib:(a, b) => {
  a = U.R(a);
  if (!a) {
    throw new U.g(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new U.g(28);
  }
  U.truncate(a.node, b);
}, Yb:(a, b, d) => {
  a = U.l(a, {B:!0}).node;
  a.h.v(a, {timestamp:Math.max(b, d)});
}, open:(a, b, d, e, g) => {
  if ("" === a) {
    throw new U.g(44);
  }
  b = "string" == typeof b ? U.tb(b) : b;
  d = b & 64 ? ("undefined" == typeof d ? 438 : d) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var k = a;
  } else {
    a = gb(a);
    try {
      k = U.l(a, {B:!(b & 131072)}).node;
    } catch (p) {
    }
  }
  var l = !1;
  if (b & 64) {
    if (k) {
      if (b & 128) {
        throw new U.g(20);
      }
    } else {
      k = U.I(a, d, 0), l = !0;
    }
  }
  if (!k) {
    throw new U.g(44);
  }
  U.W(k.mode) && (b &= -513);
  if (b & 65536 && !U.u(k.mode)) {
    throw new U.g(54);
  }
  if (!l && (d = U.sb(k, b))) {
    throw new U.g(d);
  }
  b & 512 && U.truncate(k, 0);
  b &= -131713;
  e = U.jb({node:k, path:U.J(k), flags:b, seekable:!0, position:0, j:k.j, Cb:[], error:!1}, e, g);
  e.j.open && e.j.open(e);
  !c.logReadFiles || b & 1 || (U.xa || (U.xa = {}), a in U.xa || (U.xa[a] = 1));
  return e;
}, close:a => {
  if (U.X(a)) {
    throw new U.g(8);
  }
  a.L && (a.L = null);
  try {
    a.j.close && a.j.close(a);
  } catch (b) {
    throw b;
  } finally {
    U.cb(a.fd);
  }
  a.fd = null;
}, X:a => null === a.fd, A:(a, b, d) => {
  if (U.X(a)) {
    throw new U.g(8);
  }
  if (!a.seekable || !a.j.A) {
    throw new U.g(70);
  }
  if (0 != d && 1 != d && 2 != d) {
    throw new U.g(28);
  }
  a.position = a.j.A(a, b, d);
  a.Cb = [];
  return a.position;
}, read:(a, b, d, e, g) => {
  if (0 > e || 0 > g) {
    throw new U.g(28);
  }
  if (U.X(a)) {
    throw new U.g(8);
  }
  if (1 === (a.flags & 2097155)) {
    throw new U.g(8);
  }
  if (U.u(a.node.mode)) {
    throw new U.g(31);
  }
  if (!a.j.read) {
    throw new U.g(28);
  }
  var k = "undefined" != typeof g;
  if (!k) {
    g = a.position;
  } else if (!a.seekable) {
    throw new U.g(70);
  }
  b = a.j.read(a, b, d, e, g);
  k || (a.position += b);
  return b;
}, write:(a, b, d, e, g, k) => {
  if (0 > e || 0 > g) {
    throw new U.g(28);
  }
  if (U.X(a)) {
    throw new U.g(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new U.g(8);
  }
  if (U.u(a.node.mode)) {
    throw new U.g(31);
  }
  if (!a.j.write) {
    throw new U.g(28);
  }
  a.seekable && a.flags & 1024 && U.A(a, 0, 2);
  var l = "undefined" != typeof g;
  if (!l) {
    g = a.position;
  } else if (!a.seekable) {
    throw new U.g(70);
  }
  b = a.j.write(a, b, d, e, g, k);
  l || (a.position += b);
  return b;
}, U:(a, b, d) => {
  if (U.X(a)) {
    throw new U.g(8);
  }
  if (0 > b || 0 >= d) {
    throw new U.g(28);
  }
  if (0 === (a.flags & 2097155)) {
    throw new U.g(8);
  }
  if (!U.isFile(a.node.mode) && !U.u(a.node.mode)) {
    throw new U.g(43);
  }
  if (!a.j.U) {
    throw new U.g(138);
  }
  a.j.U(a, b, d);
}, Y:(a, b, d, e, g, k) => {
  if (0 !== (g & 2) && 0 === (k & 2) && 2 !== (a.flags & 2097155)) {
    throw new U.g(2);
  }
  if (1 === (a.flags & 2097155)) {
    throw new U.g(2);
  }
  if (!a.j.Y) {
    throw new U.g(43);
  }
  return a.j.Y(a, b, d, e, g, k);
}, aa:(a, b, d, e, g) => a && a.j.aa ? a.j.aa(a, b, d, e, g) : 0, Rb:() => 0, ra:(a, b, d) => {
  if (!a.j.ra) {
    throw new U.g(59);
  }
  return a.j.ra(a, b, d);
}, readFile:(a, b = {}) => {
  b.flags = b.flags || 0;
  b.encoding = b.encoding || "binary";
  if ("utf8" !== b.encoding && "binary" !== b.encoding) {
    throw Error('Invalid encoding type "' + b.encoding + '"');
  }
  var d, e = U.open(a, b.flags);
  a = U.stat(a).size;
  var g = new Uint8Array(a);
  U.read(e, g, 0, a, 0);
  "utf8" === b.encoding ? d = G(g, 0) : "binary" === b.encoding && (d = g);
  U.close(e);
  return d;
}, writeFile:(a, b, d = {}) => {
  d.flags = d.flags || 577;
  a = U.open(a, d.flags, d.mode);
  if ("string" == typeof b) {
    var e = new Uint8Array(Ba(b) + 1);
    b = Aa(b, e, 0, e.length);
    U.write(a, e, 0, b, void 0, d.ab);
  } else if (ArrayBuffer.isView(b)) {
    U.write(a, b, 0, b.byteLength, void 0, d.ab);
  } else {
    throw Error("Unsupported data type");
  }
  U.close(a);
}, cwd:() => U.Ha, chdir:a => {
  a = U.l(a, {B:!0});
  if (null === a.node) {
    throw new U.g(44);
  }
  if (!U.u(a.node.mode)) {
    throw new U.g(54);
  }
  var b = U.K(a.node, "x");
  if (b) {
    throw new U.g(b);
  }
  U.Ha = a.path;
}, fb:() => {
  U.mkdir("/tmp");
  U.mkdir("/home");
  U.mkdir("/home/web_user");
}, eb:() => {
  U.mkdir("/dev");
  U.za(U.O(1, 3), {read:() => 0, write:(b, d, e, g) => g,});
  U.ia("/dev/null", U.O(1, 3));
  lb(U.O(5, 0), ob);
  lb(U.O(6, 0), pb);
  U.ia("/dev/tty", U.O(5, 0));
  U.ia("/dev/tty1", U.O(6, 0));
  var a = ib();
  U.C("/dev", "random", a);
  U.C("/dev", "urandom", a);
  U.mkdir("/dev/shm");
  U.mkdir("/dev/shm/tmp");
}, hb:() => {
  U.mkdir("/proc");
  var a = U.mkdir("/proc/self");
  U.mkdir("/proc/self/fd");
  U.s({s:() => {
    var b = U.createNode(a, "fd", 16895, 73);
    b.h = {lookup:(d, e) => {
      var g = U.R(+e);
      if (!g) {
        throw new U.g(8);
      }
      d = {parent:null, s:{Ta:"fake"}, h:{readlink:() => g.path},};
      return d.parent = d;
    }};
    return b;
  }}, {}, "/proc/self/fd");
}, ib:() => {
  c.stdin ? U.C("/dev", "stdin", c.stdin) : U.symlink("/dev/tty", "/dev/stdin");
  c.stdout ? U.C("/dev", "stdout", null, c.stdout) : U.symlink("/dev/tty", "/dev/stdout");
  c.stderr ? U.C("/dev", "stderr", null, c.stderr) : U.symlink("/dev/tty1", "/dev/stderr");
  var a = U.open("/dev/stdin", 0), b = U.open("/dev/stdout", 1), d = U.open("/dev/stderr", 1);
  assert(0 === a.fd, "invalid handle for stdin (" + a.fd + ")");
  assert(1 === b.fd, "invalid handle for stdout (" + b.fd + ")");
  assert(2 === d.fd, "invalid handle for stderr (" + d.fd + ")");
}, Ja:() => {
  U.g || (U.g = function(a, b) {
    this.node = b;
    this.Ab = function(d) {
      this.o = d;
      for (var e in tb) {
        if (tb[e] === d) {
          this.code = e;
          break;
        }
      }
    };
    this.Ab(a);
    this.message = sb[a];
    this.stack && (Object.defineProperty(this, "stack", {value:Error().stack, writable:!0}), this.stack = db(this.stack));
  }, U.g.prototype = Error(), U.g.prototype.constructor = U.g, [44].forEach(a => {
    U.oa[a] = new U.g(a);
    U.oa[a].stack = "<generic error, no stack>";
  }));
}, Bb:() => {
  U.Ja();
  U.G = Array(4096);
  U.s(V, {}, "/");
  U.fb();
  U.eb();
  U.hb();
  U.lb = {MEMFS:V,};
}, V:(a, b, d) => {
  assert(!U.V.fa, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  U.V.fa = !0;
  U.Ja();
  c.stdin = a || c.stdin;
  c.stdout = b || c.stdout;
  c.stderr = d || c.stderr;
  U.ib();
}, Ub:() => {
  U.V.fa = !1;
  ub();
  for (var a = 0; a < U.streams.length; a++) {
    var b = U.streams[a];
    b && U.close(b);
  }
}, pa:(a, b) => {
  var d = 0;
  a && (d |= 365);
  b && (d |= 146);
  return d;
}, Hb:(a, b) => {
  a = U.ka(a, b);
  return a.exists ? a.object : null;
}, ka:(a, b) => {
  try {
    var d = U.l(a, {B:!b});
    a = d.path;
  } catch (g) {
  }
  var e = {ga:!1, exists:!1, error:0, name:null, path:null, object:null, wb:!1, yb:null, xb:null};
  try {
    d = U.l(a, {parent:!0}), e.wb = !0, e.yb = d.path, e.xb = d.node, e.name = R(a), d = U.l(a, {B:!b}), e.exists = !0, e.path = d.path, e.object = d.node, e.name = d.node.name, e.ga = "/" === d.path;
  } catch (g) {
    e.error = g.o;
  }
  return e;
}, Fa:(a, b) => {
  a = "string" == typeof a ? a : U.J(a);
  for (b = b.split("/").reverse(); b.length;) {
    var d = b.pop();
    if (d) {
      var e = S(a, d);
      try {
        U.mkdir(e);
      } catch (g) {
      }
      a = e;
    }
  }
  return e;
}, gb:(a, b, d, e, g) => {
  a = S("string" == typeof a ? a : U.J(a), b);
  return U.create(a, U.pa(e, g));
}, da:(a, b, d, e, g, k) => {
  var l = b;
  a && (a = "string" == typeof a ? a : U.J(a), l = b ? S(a, b) : a);
  a = U.pa(e, g);
  l = U.create(l, a);
  if (d) {
    if ("string" == typeof d) {
      b = Array(d.length);
      e = 0;
      for (g = d.length; e < g; ++e) {
        b[e] = d.charCodeAt(e);
      }
      d = b;
    }
    U.chmod(l, a | 146);
    b = U.open(l, 577);
    U.write(b, d, 0, d.length, 0, k);
    U.close(b);
    U.chmod(l, a);
  }
  return l;
}, C:(a, b, d, e) => {
  a = S("string" == typeof a ? a : U.J(a), b);
  b = U.pa(!!d, !!e);
  U.C.ua || (U.C.ua = 64);
  var g = U.O(U.C.ua++, 0);
  U.za(g, {open:k => {
    k.seekable = !1;
  }, close:() => {
    e && e.buffer && e.buffer.length && e(10);
  }, read:(k, l, p, q) => {
    for (var n = 0, r = 0; r < q; r++) {
      try {
        var w = d();
      } catch (A) {
        throw new U.g(29);
      }
      if (void 0 === w && 0 === n) {
        throw new U.g(6);
      }
      if (null === w || void 0 === w) {
        break;
      }
      n++;
      l[p + r] = w;
    }
    n && (k.node.timestamp = Date.now());
    return n;
  }, write:(k, l, p, q) => {
    for (var n = 0; n < q; n++) {
      try {
        e(l[p + n]);
      } catch (r) {
        throw new U.g(29);
      }
    }
    q && (k.node.timestamp = Date.now());
    return n;
  }});
  return U.ia(a, b, g);
}, Ma:a => {
  if (a.sa || a.qb || a.link || a.i) {
    return !0;
  }
  if ("undefined" != typeof XMLHttpRequest) {
    throw Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  }
  if (t) {
    try {
      a.i = nb(t(a.url)), a.m = a.i.length;
    } catch (b) {
      throw new U.g(29);
    }
  } else {
    throw Error("Cannot load without read() or XMLHttpRequest.");
  }
}, Ea:(a, b, d, e, g) => {
  function k() {
    this.ta = !1;
    this.ea = [];
  }
  k.prototype.get = function(n) {
    if (!(n > this.length - 1 || 0 > n)) {
      var r = n % this.chunkSize;
      return this.Pa(n / this.chunkSize | 0)[r];
    }
  };
  k.prototype.ob = function(n) {
    this.Pa = n;
  };
  k.prototype.Ca = function() {
    var n = new XMLHttpRequest();
    n.open("HEAD", d, !1);
    n.send(null);
    if (!(200 <= n.status && 300 > n.status || 304 === n.status)) {
      throw Error("Couldn't load " + d + ". Status: " + n.status);
    }
    var r = Number(n.getResponseHeader("Content-length")), w, A = (w = n.getResponseHeader("Accept-Ranges")) && "bytes" === w;
    n = (w = n.getResponseHeader("Content-Encoding")) && "gzip" === w;
    var B = 1048576;
    A || (B = r);
    var z = this;
    z.ob(L => {
      var ha = L * B, X = (L + 1) * B - 1;
      X = Math.min(X, r - 1);
      if ("undefined" == typeof z.ea[L]) {
        var Jb = z.ea;
        if (ha > X) {
          throw Error("invalid range (" + ha + ", " + X + ") or no bytes requested!");
        }
        if (X > r - 1) {
          throw Error("only " + r + " bytes available! programmer error!");
        }
        var E = new XMLHttpRequest();
        E.open("GET", d, !1);
        r !== B && E.setRequestHeader("Range", "bytes=" + ha + "-" + X);
        E.responseType = "arraybuffer";
        E.overrideMimeType && E.overrideMimeType("text/plain; charset=x-user-defined");
        E.send(null);
        if (!(200 <= E.status && 300 > E.status || 304 === E.status)) {
          throw Error("Couldn't load " + d + ". Status: " + E.status);
        }
        ha = void 0 !== E.response ? new Uint8Array(E.response || []) : nb(E.responseText || "");
        Jb[L] = ha;
      }
      if ("undefined" == typeof z.ea[L]) {
        throw Error("doXHR failed!");
      }
      return z.ea[L];
    });
    if (n || !r) {
      B = r = 1, B = r = this.Pa(0).length, la("LazyFiles on gzip forces download of the whole file when length is accessed");
    }
    this.Ya = r;
    this.Xa = B;
    this.ta = !0;
  };
  if ("undefined" != typeof XMLHttpRequest) {
    if (!h) {
      throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
    }
    var l = new k();
    Object.defineProperties(l, {length:{get:function() {
      this.ta || this.Ca();
      return this.Ya;
    }}, chunkSize:{get:function() {
      this.ta || this.Ca();
      return this.Xa;
    }}});
    l = {sa:!1, i:l};
  } else {
    l = {sa:!1, url:d};
  }
  var p = U.gb(a, b, l, e, g);
  l.i ? p.i = l.i : l.url && (p.i = null, p.url = l.url);
  Object.defineProperties(p, {m:{get:function() {
    return this.i.length;
  }}});
  var q = {};
  Object.keys(p.j).forEach(n => {
    var r = p.j[n];
    q[n] = function() {
      U.Ma(p);
      return r.apply(null, arguments);
    };
  });
  q.read = (n, r, w, A, B) => {
    U.Ma(p);
    n = n.node.i;
    if (B >= n.length) {
      return 0;
    }
    A = Math.min(n.length - B, A);
    assert(0 <= A);
    if (n.slice) {
      for (var z = 0; z < A; z++) {
        r[w + z] = n[B + z];
      }
    } else {
      for (z = 0; z < A; z++) {
        r[w + z] = n.get(B + z);
      }
    }
    return A;
  };
  p.j = q;
  return p;
}, Ga:(a, b, d, e, g, k, l, p, q, n) => {
  function r(B) {
    function z(L) {
      n && n();
      p || U.da(a, b, L, e, g, q);
      k && k();
      Xa(A);
    }
    vb.Lb(B, w, z, () => {
      l && l();
      Xa(A);
    }) || z(B);
  }
  var w = b ? T(S(a, b)) : a, A = Va("cp " + w);
  Wa(A);
  "string" == typeof d ? rb(d, B => r(B), l) : r(d);
}, indexedDB:() => window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, Aa:() => "EM_FS_" + window.location.pathname, Ba:20, T:"FILE_DATA", Vb:(a, b, d) => {
  b = b || (() => {
  });
  d = d || (() => {
  });
  var e = U.indexedDB();
  try {
    var g = e.open(U.Aa(), U.Ba);
  } catch (k) {
    return d(k);
  }
  g.onupgradeneeded = () => {
    la("creating db");
    g.result.createObjectStore(U.T);
  };
  g.onsuccess = () => {
    var k = g.result.transaction([U.T], "readwrite"), l = k.objectStore(U.T), p = 0, q = 0, n = a.length;
    a.forEach(r => {
      r = l.put(U.ka(r).object.i, r);
      r.onsuccess = () => {
        p++;
        p + q == n && (0 == q ? b() : d());
      };
      r.onerror = () => {
        q++;
        p + q == n && (0 == q ? b() : d());
      };
    });
    k.onerror = d;
  };
  g.onerror = d;
}, Nb:(a, b, d) => {
  b = b || (() => {
  });
  d = d || (() => {
  });
  var e = U.indexedDB();
  try {
    var g = e.open(U.Aa(), U.Ba);
  } catch (k) {
    return d(k);
  }
  g.onupgradeneeded = d;
  g.onsuccess = () => {
    var k = g.result;
    try {
      var l = k.transaction([U.T], "readonly");
    } catch (w) {
      d(w);
      return;
    }
    var p = l.objectStore(U.T), q = 0, n = 0, r = a.length;
    a.forEach(w => {
      var A = p.get(w);
      A.onsuccess = () => {
        U.ka(w).exists && U.unlink(w);
        U.da(hb(w), R(w), A.result, !0, !0, !0);
        q++;
        q + n == r && (0 == n ? b() : d());
      };
      A.onerror = () => {
        n++;
        q + n == r && (0 == n ? b() : d());
      };
    });
    l.onerror = d;
  };
  g.onerror = d;
}, Db:() => {
  f("FS.absolutePath has been removed; use PATH_FS.resolve instead");
}, Fb:() => {
  f("FS.createFolder has been removed; use FS.mkdir instead");
}, Gb:() => {
  f("FS.createLink has been removed; use FS.symlink instead");
}, Mb:() => {
  f("FS.joinPath has been removed; use PATH.join instead");
}, Qb:() => {
  f("FS.mmapAlloc has been replaced by the top level function mmapAlloc");
}, Wb:() => {
  f("FS.standardizePath has been removed; use PATH.normalize instead");
}};
function wb(a, b, d) {
  if ("/" === b[0]) {
    return b;
  }
  if (-100 === a) {
    a = U.cwd();
  } else {
    a = U.R(a);
    if (!a) {
      throw new U.g(8);
    }
    a = a.path;
  }
  if (0 == b.length) {
    if (!d) {
      throw new U.g(44);
    }
    return a;
  }
  return S(a, b);
}
function xb(a, b, d) {
  try {
    var e = a(b);
  } catch (g) {
    if (g && g.node && gb(b) !== gb(U.J(g.node))) {
      return -54;
    }
    throw g;
  }
  I[d >> 2] = e.dev;
  I[d + 4 >> 2] = 0;
  I[d + 8 >> 2] = e.ino;
  I[d + 12 >> 2] = e.mode;
  I[d + 16 >> 2] = e.nlink;
  I[d + 20 >> 2] = e.uid;
  I[d + 24 >> 2] = e.gid;
  I[d + 28 >> 2] = e.rdev;
  I[d + 32 >> 2] = 0;
  Q = [e.size >>> 0, (P = e.size, 1.0 <= +Math.abs(P) ? 0.0 < P ? (Math.min(+Math.floor(P / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((P - +(~~P >>> 0)) / 4294967296.0) >>> 0 : 0)];
  I[d + 40 >> 2] = Q[0];
  I[d + 44 >> 2] = Q[1];
  I[d + 48 >> 2] = 4096;
  I[d + 52 >> 2] = e.blocks;
  I[d + 56 >> 2] = e.atime.getTime() / 1000 | 0;
  I[d + 60 >> 2] = 0;
  I[d + 64 >> 2] = e.mtime.getTime() / 1000 | 0;
  I[d + 68 >> 2] = 0;
  I[d + 72 >> 2] = e.ctime.getTime() / 1000 | 0;
  I[d + 76 >> 2] = 0;
  Q = [e.ino >>> 0, (P = e.ino, 1.0 <= +Math.abs(P) ? 0.0 < P ? (Math.min(+Math.floor(P / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((P - +(~~P >>> 0)) / 4294967296.0) >>> 0 : 0)];
  I[d + 80 >> 2] = Q[0];
  I[d + 84 >> 2] = Q[1];
  return 0;
}
var W = void 0;
function Y() {
  assert(void 0 != W);
  W += 4;
  return I[W - 4 >> 2];
}
function Z(a) {
  a = U.R(a);
  if (!a) {
    throw new U.g(8);
  }
  return a;
}
function yb(a, b, d) {
  function e(q) {
    return (q = q.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? q[1] : "GMT";
  }
  var g = (new Date()).getFullYear(), k = new Date(g, 0, 1), l = new Date(g, 6, 1);
  g = k.getTimezoneOffset();
  var p = l.getTimezoneOffset();
  I[a >> 2] = 60 * Math.max(g, p);
  I[b >> 2] = Number(g != p);
  a = e(k);
  b = e(l);
  a = Ca(a);
  b = Ca(b);
  p < g ? (I[d >> 2] = a, I[d + 4 >> 2] = b) : (I[d >> 2] = b, I[d + 4 >> 2] = a);
}
function zb(a, b, d) {
  zb.$a || (zb.$a = !0, yb(a, b, d));
}
function Ab() {
  void 0 === Ab.start && (Ab.start = Date.now());
  return 1E3 * (Date.now() - Ab.start) | 0;
}
var Bb;
Bb = fa ? () => {
  var a = process.hrtime();
  return 1e3 * a[0] + a[1] / 1e6;
} : () => performance.now();
var Cb = {};
function Db() {
  if (!Eb) {
    var a = {USER:"web_user", LOGNAME:"web_user", PATH:"/", PWD:"/", HOME:"/home/web_user", LANG:("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _:da || "./this.program"}, b;
    for (b in Cb) {
      void 0 === Cb[b] ? delete a[b] : a[b] = Cb[b];
    }
    var d = [];
    for (b in a) {
      d.push(b + "=" + a[b]);
    }
    Eb = d;
  }
  return Eb;
}
var Eb;
function Fb(a, b, d, e) {
  a || (a = this);
  this.parent = a;
  this.s = a.s;
  this.Z = null;
  this.id = U.ub++;
  this.name = b;
  this.mode = d;
  this.h = {};
  this.j = {};
  this.rdev = e;
}
Object.defineProperties(Fb.prototype, {read:{get:function() {
  return 365 === (this.mode & 365);
}, set:function(a) {
  a ? this.mode |= 365 : this.mode &= -366;
}}, write:{get:function() {
  return 146 === (this.mode & 146);
}, set:function(a) {
  a ? this.mode |= 146 : this.mode &= -147;
}}, qb:{get:function() {
  return U.u(this.mode);
}}, sa:{get:function() {
  return U.W(this.mode);
}}});
U.Va = Fb;
U.Bb();
var vb;
c.FS_createPath = U.Fa;
c.FS_createDataFile = U.da;
c.FS_createPreloadedFile = U.Ga;
c.FS_createLazyFile = U.Ea;
c.FS_createDevice = U.C;
c.FS_unlink = U.unlink;
tb = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, EDEADLK:16, 
ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, ENOBUFS:42, 
EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, EOWNERDEAD:62, 
ESTRPIPE:135,};
function nb(a) {
  var b = Array(Ba(a) + 1);
  a = Aa(a, b, 0, b.length);
  b.length = a;
  return b;
}
var Hb = {__syscall_faccessat:function(a, b, d, e) {
  try {
    b = F(b);
    assert(0 === e);
    b = wb(a, b);
    if (d & -8) {
      var g = -28;
    } else {
      var k = U.l(b, {B:!0}).node;
      k ? (a = "", d & 4 && (a += "r"), d & 2 && (a += "w"), d & 1 && (a += "x"), g = a && U.K(k, a) ? -2 : 0) : g = -44;
    }
    return g;
  } catch (l) {
    if ("undefined" == typeof U || !(l instanceof U.g)) {
      throw l;
    }
    return -l.o;
  }
}, __syscall_fcntl64:function(a, b, d) {
  W = d;
  try {
    var e = Z(a);
    switch(b) {
      case 0:
        var g = Y();
        return 0 > g ? -28 : U.open(e.path, e.flags, 0, g).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return e.flags;
      case 4:
        return g = Y(), e.flags |= g, 0;
      case 5:
        return g = Y(), Fa[g + 0 >> 1] = 2, 0;
      case 6:
      case 7:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        return I[Gb() >> 2] = 28, -1;
      default:
        return -28;
    }
  } catch (k) {
    if ("undefined" == typeof U || !(k instanceof U.g)) {
      throw k;
    }
    return -k.o;
  }
}, __syscall_fstat64:function(a, b) {
  try {
    var d = Z(a);
    return xb(U.stat, d.path, b);
  } catch (e) {
    if ("undefined" == typeof U || !(e instanceof U.g)) {
      throw e;
    }
    return -e.o;
  }
}, __syscall_fstatat64:function(a, b, d, e) {
  try {
    b = F(b);
    var g = e & 256, k = e & 4096;
    e &= -4353;
    assert(!e, e);
    b = wb(a, b, k);
    return xb(g ? U.lstat : U.stat, b, d);
  } catch (l) {
    if ("undefined" == typeof U || !(l instanceof U.g)) {
      throw l;
    }
    return -l.o;
  }
}, __syscall_getdents64:function(a, b, d) {
  try {
    var e = Z(a);
    e.L || (e.L = U.readdir(e.path));
    a = 0;
    for (var g = U.A(e, 0, 1), k = Math.floor(g / 280); k < e.L.length && a + 280 <= d;) {
      var l = e.L[k];
      if ("." === l) {
        var p = e.node.id;
        var q = 4;
      } else if (".." === l) {
        p = U.l(e.path, {parent:!0}).node.id, q = 4;
      } else {
        var n = U.F(e.node, l);
        p = n.id;
        q = U.W(n.mode) ? 2 : U.u(n.mode) ? 4 : U.M(n.mode) ? 10 : 8;
      }
      assert(p);
      Q = [p >>> 0, (P = p, 1.0 <= +Math.abs(P) ? 0.0 < P ? (Math.min(+Math.floor(P / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((P - +(~~P >>> 0)) / 4294967296.0) >>> 0 : 0)];
      I[b + a >> 2] = Q[0];
      I[b + a + 4 >> 2] = Q[1];
      Q = [280 * (k + 1) >>> 0, (P = 280 * (k + 1), 1.0 <= +Math.abs(P) ? 0.0 < P ? (Math.min(+Math.floor(P / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((P - +(~~P >>> 0)) / 4294967296.0) >>> 0 : 0)];
      I[b + a + 8 >> 2] = Q[0];
      I[b + a + 12 >> 2] = Q[1];
      Fa[b + a + 16 >> 1] = 280;
      D[b + a + 18 >> 0] = q;
      wa(l, b + a + 19, 256);
      a += 280;
      k += 1;
    }
    U.A(e, 280 * k, 0);
    return a;
  } catch (r) {
    if ("undefined" == typeof U || !(r instanceof U.g)) {
      throw r;
    }
    return -r.o;
  }
}, __syscall_ioctl:function(a, b, d) {
  W = d;
  try {
    var e = Z(a);
    switch(b) {
      case 21509:
      case 21505:
        return e.tty ? 0 : -59;
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508:
        return e.tty ? 0 : -59;
      case 21519:
        if (!e.tty) {
          return -59;
        }
        var g = Y();
        return I[g >> 2] = 0;
      case 21520:
        return e.tty ? -28 : -59;
      case 21531:
        return g = Y(), U.ra(e, b, g);
      case 21523:
        return e.tty ? 0 : -59;
      case 21524:
        return e.tty ? 0 : -59;
      default:
        f("bad ioctl syscall " + b);
    }
  } catch (k) {
    if ("undefined" == typeof U || !(k instanceof U.g)) {
      throw k;
    }
    return -k.o;
  }
}, __syscall_lstat64:function(a, b) {
  try {
    return a = F(a), xb(U.lstat, a, b);
  } catch (d) {
    if ("undefined" == typeof U || !(d instanceof U.g)) {
      throw d;
    }
    return -d.o;
  }
}, __syscall_open:function(a, b, d) {
  W = d;
  try {
    var e = F(a), g = d ? Y() : 0;
    return U.open(e, b, g).fd;
  } catch (k) {
    if ("undefined" == typeof U || !(k instanceof U.g)) {
      throw k;
    }
    return -k.o;
  }
}, __syscall_rename:function(a, b) {
  try {
    return a = F(a), b = F(b), U.rename(a, b), 0;
  } catch (d) {
    if ("undefined" == typeof U || !(d instanceof U.g)) {
      throw d;
    }
    return -d.o;
  }
}, __syscall_rmdir:function(a) {
  try {
    return a = F(a), U.rmdir(a), 0;
  } catch (b) {
    if ("undefined" == typeof U || !(b instanceof U.g)) {
      throw b;
    }
    return -b.o;
  }
}, __syscall_stat64:function(a, b) {
  try {
    return a = F(a), xb(U.stat, a, b);
  } catch (d) {
    if ("undefined" == typeof U || !(d instanceof U.g)) {
      throw d;
    }
    return -d.o;
  }
}, __syscall_unlink:function(a) {
  try {
    return a = F(a), U.unlink(a), 0;
  } catch (b) {
    if ("undefined" == typeof U || !(b instanceof U.g)) {
      throw b;
    }
    return -b.o;
  }
}, _gmtime_js:function(a, b) {
  a = new Date(1000 * I[a >> 2]);
  I[b >> 2] = a.getUTCSeconds();
  I[b + 4 >> 2] = a.getUTCMinutes();
  I[b + 8 >> 2] = a.getUTCHours();
  I[b + 12 >> 2] = a.getUTCDate();
  I[b + 16 >> 2] = a.getUTCMonth();
  I[b + 20 >> 2] = a.getUTCFullYear() - 1900;
  I[b + 24 >> 2] = a.getUTCDay();
  I[b + 28 >> 2] = (a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864E5 | 0;
}, _localtime_js:function(a, b) {
  a = new Date(1000 * I[a >> 2]);
  I[b >> 2] = a.getSeconds();
  I[b + 4 >> 2] = a.getMinutes();
  I[b + 8 >> 2] = a.getHours();
  I[b + 12 >> 2] = a.getDate();
  I[b + 16 >> 2] = a.getMonth();
  I[b + 20 >> 2] = a.getFullYear() - 1900;
  I[b + 24 >> 2] = a.getDay();
  var d = new Date(a.getFullYear(), 0, 1);
  I[b + 28 >> 2] = (a.getTime() - d.getTime()) / 864E5 | 0;
  I[b + 36 >> 2] = -(60 * a.getTimezoneOffset());
  var e = (new Date(a.getFullYear(), 6, 1)).getTimezoneOffset();
  d = d.getTimezoneOffset();
  I[b + 32 >> 2] = (e != d && a.getTimezoneOffset() == Math.min(d, e)) | 0;
}, _mktime_js:function(a) {
  var b = new Date(I[a + 20 >> 2] + 1900, I[a + 16 >> 2], I[a + 12 >> 2], I[a + 8 >> 2], I[a + 4 >> 2], I[a >> 2], 0), d = I[a + 32 >> 2], e = b.getTimezoneOffset(), g = new Date(b.getFullYear(), 0, 1), k = (new Date(b.getFullYear(), 6, 1)).getTimezoneOffset(), l = g.getTimezoneOffset(), p = Math.min(l, k);
  0 > d ? I[a + 32 >> 2] = Number(k != l && p == e) : 0 < d != (p == e) && (k = Math.max(l, k), b.setTime(b.getTime() + 60000 * ((0 < d ? p : k) - e)));
  I[a + 24 >> 2] = b.getDay();
  I[a + 28 >> 2] = (b.getTime() - g.getTime()) / 864E5 | 0;
  I[a >> 2] = b.getSeconds();
  I[a + 4 >> 2] = b.getMinutes();
  I[a + 8 >> 2] = b.getHours();
  I[a + 12 >> 2] = b.getDate();
  I[a + 16 >> 2] = b.getMonth();
  return b.getTime() / 1000 | 0;
}, _tzset_js:zb, abort:function() {
  f("native code called abort()");
}, clock:Ab, clock_gettime:function(a, b) {
  if (0 === a) {
    a = Date.now();
  } else if (1 === a || 4 === a) {
    a = Bb();
  } else {
    return I[Gb() >> 2] = 28, -1;
  }
  I[b >> 2] = a / 1000 | 0;
  I[b + 4 >> 2] = a % 1000 * 1E6 | 0;
  return 0;
}, emscripten_get_now:Bb, emscripten_memcpy_big:function(a, b, d) {
  H.copyWithin(a, b, b + d);
}, emscripten_resize_heap:function(a) {
  var b = H.length;
  a >>>= 0;
  assert(a > b);
  if (2147483648 < a) {
    return x("Cannot enlarge memory, asked to go up to " + a + " bytes, but the limit is 2147483648 bytes!"), !1;
  }
  for (var d = 1; 4 >= d; d *= 2) {
    var e = b * (1 + 0.2 / d);
    e = Math.min(e, a + 100663296);
    var g = Math;
    e = Math.max(a, e);
    g = g.min.call(g, 2147483648, e + (65536 - e % 65536) % 65536);
    e = Bb();
    a: {
      var k = g;
      try {
        ra.grow(k - Ea.byteLength + 65535 >>> 16);
        Ha();
        var l = 1;
        break a;
      } catch (p) {
        x("emscripten_realloc_buffer: Attempted to grow heap from " + Ea.byteLength + " bytes to " + k + " bytes, but got error: " + p);
      }
      l = void 0;
    }
    k = Bb();
    la("Heap resize call from " + b + " to " + g + " took " + (k - e) + " msecs. Success: " + !!l);
    if (l) {
      return !0;
    }
  }
  x("Failed to grow the heap from " + b + " bytes to " + g + " bytes, not enough memory!");
  return !1;
}, environ_get:function(a, b) {
  var d = 0;
  Db().forEach(function(e, g) {
    var k = b + d;
    g = I[a + 4 * g >> 2] = k;
    for (k = 0; k < e.length; ++k) {
      assert(e.charCodeAt(k) === (e.charCodeAt(k) & 255)), D[g++ >> 0] = e.charCodeAt(k);
    }
    D[g >> 0] = 0;
    d += e.length + 1;
  });
  return 0;
}, environ_sizes_get:function(a, b) {
  var d = Db();
  I[a >> 2] = d.length;
  var e = 0;
  d.forEach(function(g) {
    e += g.length + 1;
  });
  I[b >> 2] = e;
  return 0;
}, fd_close:function(a) {
  try {
    var b = Z(a);
    U.close(b);
    return 0;
  } catch (d) {
    if ("undefined" == typeof U || !(d instanceof U.g)) {
      throw d;
    }
    return d.o;
  }
}, fd_fdstat_get:function(a, b) {
  try {
    var d = Z(a);
    D[b >> 0] = d.tty ? 2 : U.u(d.mode) ? 3 : U.M(d.mode) ? 7 : 4;
    return 0;
  } catch (e) {
    if ("undefined" == typeof U || !(e instanceof U.g)) {
      throw e;
    }
    return e.o;
  }
}, fd_read:function(a, b, d, e) {
  try {
    a: {
      for (var g = Z(a), k = a = 0; k < d; k++) {
        var l = I[b + (8 * k + 4) >> 2], p = U.read(g, D, I[b + 8 * k >> 2], l, void 0);
        if (0 > p) {
          var q = -1;
          break a;
        }
        a += p;
        if (p < l) {
          break;
        }
      }
      q = a;
    }
    I[e >> 2] = q;
    return 0;
  } catch (n) {
    if ("undefined" == typeof U || !(n instanceof U.g)) {
      throw n;
    }
    return n.o;
  }
}, fd_seek:function(a, b, d, e, g) {
  try {
    var k = Z(a);
    a = 4294967296 * d + (b >>> 0);
    if (-9007199254740992 >= a || 9007199254740992 <= a) {
      return -61;
    }
    U.A(k, a, e);
    Q = [k.position >>> 0, (P = k.position, 1.0 <= +Math.abs(P) ? 0.0 < P ? (Math.min(+Math.floor(P / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((P - +(~~P >>> 0)) / 4294967296.0) >>> 0 : 0)];
    I[g >> 2] = Q[0];
    I[g + 4 >> 2] = Q[1];
    k.L && 0 === a && 0 === e && (k.L = null);
    return 0;
  } catch (l) {
    if ("undefined" == typeof U || !(l instanceof U.g)) {
      throw l;
    }
    return l.o;
  }
}, fd_write:function(a, b, d, e) {
  try {
    a: {
      for (var g = Z(a), k = a = 0; k < d; k++) {
        var l = U.write(g, D, I[b + 8 * k >> 2], I[b + (8 * k + 4) >> 2], void 0);
        if (0 > l) {
          var p = -1;
          break a;
        }
        a += l;
      }
      p = a;
    }
    I[e >> 2] = p;
    return 0;
  } catch (q) {
    if ("undefined" == typeof U || !(q instanceof U.g)) {
      throw q;
    }
    return q.o;
  }
}, gettimeofday:function(a) {
  var b = Date.now();
  I[a >> 2] = b / 1000 | 0;
  I[a + 4 >> 2] = b % 1000 * 1000 | 0;
  return 0;
}, setTempRet0:function() {
}};
(function() {
  function a(k) {
    c.asm = k.exports;
    ra = c.asm.memory;
    assert(ra, "memory not found in wasm exports");
    Ha();
    Ja = c.asm.__indirect_function_table;
    assert(Ja, "table not found in wasm exports");
    Qa.unshift(c.asm.__wasm_call_ctors);
    Xa("wasm-instantiate");
  }
  function b(k) {
    assert(c === g, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    g = null;
    a(k.instance);
  }
  function d(k) {
    return ab().then(function(l) {
      return WebAssembly.instantiate(l, e);
    }).then(function(l) {
      return l;
    }).then(k, function(l) {
      x("failed to asynchronously prepare wasm: " + l);
      N.startsWith("file://") && x("warning: Loading from a file URI (" + N + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
      f(l);
    });
  }
  var e = {env:Hb, wasi_snapshot_preview1:Hb,};
  Wa("wasm-instantiate");
  var g = c;
  if (c.instantiateWasm) {
    try {
      return c.instantiateWasm(e, a);
    } catch (k) {
      return x("Module.instantiateWasm callback failed with error: " + k), !1;
    }
  }
  (function() {
    return qa || "function" != typeof WebAssembly.instantiateStreaming || Ya() || N.startsWith("file://") || "function" != typeof fetch ? d(b) : fetch(N, {credentials:"same-origin"}).then(function(k) {
      return WebAssembly.instantiateStreaming(k, e).then(b, function(l) {
        x("wasm streaming compile failed: " + l);
        x("falling back to ArrayBuffer instantiation");
        return d(b);
      });
    });
  })().catch(ba);
  return {};
})();
c.___wasm_call_ctors = O("__wasm_call_ctors");
c._decode = O("decode");
var Da = c._malloc = O("malloc");
c._open_audio_decode = O("open_audio_decode");
c._audio_decode = O("audio_decode");
c._close_audio_decode = O("close_audio_decode");
c._encode = O("encode");
c._open_audio_encode = O("open_audio_encode");
c._audio_encode = O("audio_encode");
c._close_audio_encode = O("close_audio_encode");
var Gb = c.___errno_location = O("__errno_location");
c._free = O("free");
var ub = c.___stdio_exit = O("__stdio_exit"), qb = c._emscripten_builtin_memalign = O("emscripten_builtin_memalign"), Ib = c._emscripten_stack_init = function() {
  return (Ib = c._emscripten_stack_init = c.asm.emscripten_stack_init).apply(null, arguments);
};
c._emscripten_stack_get_free = function() {
  return (c._emscripten_stack_get_free = c.asm.emscripten_stack_get_free).apply(null, arguments);
};
c._emscripten_stack_get_base = function() {
  return (c._emscripten_stack_get_base = c.asm.emscripten_stack_get_base).apply(null, arguments);
};
var La = c._emscripten_stack_get_end = function() {
  return (La = c._emscripten_stack_get_end = c.asm.emscripten_stack_get_end).apply(null, arguments);
}, xa = c.stackSave = O("stackSave"), ya = c.stackRestore = O("stackRestore"), va = c.stackAlloc = O("stackAlloc");
c.dynCall_jiji = O("dynCall_jiji");
c.dynCall_iiiji = O("dynCall_iiiji");
c.dynCall_jiiij = O("dynCall_jiiij");
c.dynCall_jiiji = O("dynCall_jiiji");
c.dynCall_viiijj = O("dynCall_viiijj");
c.dynCall_jij = O("dynCall_jij");
c.dynCall_jii = O("dynCall_jii");
C("intArrayFromString");
C("intArrayToString");
C("ccall");
c.cwrap = function(a, b, d) {
  return function() {
    return ua(a, b, d, arguments);
  };
};
C("setValue");
C("getValue");
C("allocate");
C("UTF8ArrayToString");
C("UTF8ToString");
C("stringToUTF8Array");
C("stringToUTF8");
C("lengthBytesUTF8");
C("stackTrace");
C("addOnPreRun");
C("addOnInit");
C("addOnPreMain");
C("addOnExit");
C("addOnPostRun");
C("writeStringToMemory");
C("writeArrayToMemory");
C("writeAsciiToMemory");
c.addRunDependency = Wa;
c.removeRunDependency = Xa;
C("FS_createFolder");
c.FS_createPath = U.Fa;
c.FS_createDataFile = U.da;
c.FS_createPreloadedFile = U.Ga;
c.FS_createLazyFile = U.Ea;
C("FS_createLink");
c.FS_createDevice = U.C;
c.FS_unlink = U.unlink;
C("getLEB");
C("getFunctionTables");
C("alignFunctionTables");
C("registerFunctions");
C("addFunction");
C("removeFunction");
C("getFuncWrapper");
C("prettyPrint");
C("dynCall");
C("getCompilerSetting");
C("print");
C("printErr");
C("getTempRet0");
C("setTempRet0");
C("callMain");
C("abort");
C("keepRuntimeAlive");
C("zeroMemory");
C("stringToNewUTF8");
C("emscripten_realloc_buffer");
C("ENV");
C("withStackSave");
C("ERRNO_CODES");
C("ERRNO_MESSAGES");
C("setErrNo");
C("inetPton4");
C("inetNtop4");
C("inetPton6");
C("inetNtop6");
C("readSockaddr");
C("writeSockaddr");
C("DNS");
C("getHostByName");
C("Protocols");
C("Sockets");
C("getRandomDevice");
C("traverseStack");
C("convertFrameToPC");
C("UNWIND_CACHE");
C("saveInUnwindCache");
C("convertPCtoSourceLocation");
C("readAsmConstArgsArray");
C("readAsmConstArgs");
C("mainThreadEM_ASM");
C("jstoi_q");
C("jstoi_s");
C("getExecutableName");
C("listenOnce");
C("autoResumeAudioContext");
C("dynCallLegacy");
C("getDynCaller");
C("dynCall");
C("callRuntimeCallbacks");
C("wasmTableMirror");
C("setWasmTableEntry");
C("getWasmTableEntry");
C("handleException");
C("runtimeKeepalivePush");
C("runtimeKeepalivePop");
C("callUserCallback");
C("maybeExit");
C("safeSetTimeout");
C("asmjsMangle");
C("asyncLoad");
C("alignMemory");
C("mmapAlloc");
C("reallyNegative");
C("unSign");
C("reSign");
C("formatString");
C("PATH");
C("PATH_FS");
C("SYSCALLS");
C("getSocketFromFD");
C("getSocketAddress");
C("JSEvents");
C("registerKeyEventCallback");
C("specialHTMLTargets");
C("maybeCStringToJsString");
C("findEventTarget");
C("findCanvasEventTarget");
C("getBoundingClientRect");
C("fillMouseEventData");
C("registerMouseEventCallback");
C("registerWheelEventCallback");
C("registerUiEventCallback");
C("registerFocusEventCallback");
C("fillDeviceOrientationEventData");
C("registerDeviceOrientationEventCallback");
C("fillDeviceMotionEventData");
C("registerDeviceMotionEventCallback");
C("screenOrientation");
C("fillOrientationChangeEventData");
C("registerOrientationChangeEventCallback");
C("fillFullscreenChangeEventData");
C("registerFullscreenChangeEventCallback");
C("registerRestoreOldStyle");
C("hideEverythingExceptGivenElement");
C("restoreHiddenElements");
C("setLetterbox");
C("currentFullscreenStrategy");
C("restoreOldWindowedStyle");
C("softFullscreenResizeWebGLRenderTarget");
C("doRequestFullscreen");
C("fillPointerlockChangeEventData");
C("registerPointerlockChangeEventCallback");
C("registerPointerlockErrorEventCallback");
C("requestPointerLock");
C("fillVisibilityChangeEventData");
C("registerVisibilityChangeEventCallback");
C("registerTouchEventCallback");
C("fillGamepadEventData");
C("registerGamepadEventCallback");
C("registerBeforeUnloadEventCallback");
C("fillBatteryEventData");
C("battery");
C("registerBatteryEventCallback");
C("setCanvasElementSize");
C("getCanvasElementSize");
C("demangle");
C("demangleAll");
C("jsStackTrace");
C("stackTrace");
C("getEnvStrings");
C("checkWasiClock");
C("writeI53ToI64");
C("writeI53ToI64Clamped");
C("writeI53ToI64Signaling");
C("writeI53ToU64Clamped");
C("writeI53ToU64Signaling");
C("readI53FromI64");
C("readI53FromU64");
C("convertI32PairToI53");
C("convertU32PairToI53");
C("setImmediateWrapped");
C("clearImmediateWrapped");
C("polyfillSetImmediate");
C("uncaughtExceptionCount");
C("exceptionLast");
C("exceptionCaught");
C("ExceptionInfo");
C("CatchInfo");
C("exception_addRef");
C("exception_decRef");
C("Browser");
C("funcWrappers");
C("getFuncWrapper");
C("setMainLoop");
C("wget");
C("FS");
C("MEMFS");
C("TTY");
C("PIPEFS");
C("SOCKFS");
C("_setNetworkCallback");
C("tempFixedLengthArray");
C("miniTempWebGLFloatBuffers");
C("heapObjectForWebGLType");
C("heapAccessShiftForWebGLHeap");
C("GL");
C("emscriptenWebGLGet");
C("computeUnpackAlignedImageSize");
C("emscriptenWebGLGetTexPixelData");
C("emscriptenWebGLGetUniform");
C("webglGetUniformLocation");
C("webglPrepareUniformLocationsBeforeFirstUse");
C("webglGetLeftBracePos");
C("emscriptenWebGLGetVertexAttrib");
C("writeGLArray");
C("AL");
C("SDL_unicode");
C("SDL_ttfContext");
C("SDL_audio");
C("SDL");
C("SDL_gfx");
C("GLUT");
C("EGL");
C("GLFW_Window");
C("GLFW");
C("GLEW");
C("IDBStore");
C("runAndAbortIfError");
C("warnOnce");
C("stackSave");
C("stackRestore");
C("stackAlloc");
C("AsciiToString");
C("stringToAscii");
C("UTF16ToString");
C("stringToUTF16");
C("lengthBytesUTF16");
C("UTF32ToString");
C("stringToUTF32");
C("lengthBytesUTF32");
C("allocateUTF8");
C("allocateUTF8OnStack");
c.writeStackCookie = Ka;
c.checkStackCookie = Ma;
pa("ALLOC_NORMAL");
pa("ALLOC_STACK");
var Kb;
Ua = function Lb() {
  Kb || Mb();
  Kb || (Ua = Lb);
};
function Mb() {
  function a() {
    if (!Kb && (Kb = !0, c.calledRun = !0, !sa)) {
      Ma();
      assert(!Sa);
      Sa = !0;
      c.noFSInit || U.V.fa || U.V();
      U.Sa = !1;
      bb(Qa);
      aa(c);
      if (c.onRuntimeInitialized) {
        c.onRuntimeInitialized();
      }
      assert(!c._main, 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
      Ma();
      if (c.postRun) {
        for ("function" == typeof c.postRun && (c.postRun = [c.postRun]); c.postRun.length;) {
          var b = c.postRun.shift();
          Ra.unshift(b);
        }
      }
      bb(Ra);
    }
  }
  if (!(0 < J)) {
    Ib();
    Ka();
    if (c.preRun) {
      for ("function" == typeof c.preRun && (c.preRun = [c.preRun]); c.preRun.length;) {
        Ta();
      }
    }
    bb(Pa);
    0 < J || (c.setStatus ? (c.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        c.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), Ma());
  }
}
c.run = Mb;
if (c.preInit) {
  for ("function" == typeof c.preInit && (c.preInit = [c.preInit]); 0 < c.preInit.length;) {
    c.preInit.pop()();
  }
}
Mb();
self.FS = U;



  return createFFmepgModule.ready
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = createFFmepgModule;
else if (typeof define === 'function' && define['amd'])
  define([], function() { return createFFmepgModule; });
else if (typeof exports === 'object')
  exports["createFFmepgModule"] = createFFmepgModule;