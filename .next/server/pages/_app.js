const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/src_layout_data_nav-menu-data_4539c8b9.js");
runtime.loadChunk("server/chunks/ssr/src_layout_a26e5db3._.js");
runtime.loadChunk("server/chunks/ssr/src_71fa6023._.js");
runtime.loadChunk("server/chunks/ssr/[root-of-the-server]__cee7db7d._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_eee9f2f7._.js");
runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/src/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
