(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s({
    "connect": ()=>connect,
    "setHooks": ()=>setHooks,
    "subscribeToUpdate": ()=>subscribeToUpdate
});
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/components/form/contact-form.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$google$2d$recaptcha$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/react-google-recaptcha/lib/esm/index.js [client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$google$2d$recaptcha$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/react-google-recaptcha/lib/esm/index.js [client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function ContactForm({ borderColor, inputBg, color }) {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inputErr, setInputErr] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [showCaptcha, setshowCaptcha] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [captchaVerified, setCaptchaVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        phone: "",
        email: "",
        message: ""
    });
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setInputErr((prev)=>({
                ...prev,
                [name]: ""
            }));
    };
    const handleCaptchaChange = (value)=>{
        if (value) {
            setCaptchaVerified(true);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContactForm.useEffect": ()=>{
            const allFilled = Object.values(formData).every({
                "ContactForm.useEffect.allFilled": (val)=>val.trim() !== ""
            }["ContactForm.useEffect.allFilled"]);
            setshowCaptcha(allFilled);
            if (allFilled && status === "error") {
                setStatus(null);
            }
        }
    }["ContactForm.useEffect"], [
        formData,
        status
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newErr = {};
        Object.entries(formData).forEach(([key, val])=>{
            if (!val.trim()) newErr[key] = `${key} is required`;
        });
        if (Object.keys(newErr).length > 0) {
            setInputErr(newErr);
            setStatus("error");
            return;
        }
        if (!captchaVerified) {
            alert("Please complete the captcha verification");
            return;
        }
        setStatus("loading");
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].post(`${("TURBOPACK compile-time value", "https://backend.pysquad.com/api/v1")}/contact/pysquad/`, formData);
            if (response.status === 201) {
                setStatus("success");
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    message: ""
                });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: `flex flex-col p-4 border  ${borderColor} rounded-xl`,
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-12 md:col-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "name",
                                placeholder: "Name",
                                value: formData.name,
                                onChange: handleChange,
                                className: `flex p-3 rounded-lg  ${color}  border  ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`
                            }, void 0, false, {
                                fileName: "[project]/src/components/form/contact-form.js",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            inputErr.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-500",
                                children: inputErr.name
                            }, void 0, false, {
                                fileName: "[project]/src/components/form/contact-form.js",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/form/contact-form.js",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-12 md:col-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                name: "phone",
                                placeholder: "Phone",
                                value: formData.phone,
                                onChange: handleChange,
                                className: `flex p-3 rounded-lg  ${color}  border  ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`
                            }, void 0, false, {
                                fileName: "[project]/src/components/form/contact-form.js",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            inputErr.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-500",
                                children: inputErr.phone
                            }, void 0, false, {
                                fileName: "[project]/src/components/form/contact-form.js",
                                lineNumber: 107,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/form/contact-form.js",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "email",
                        name: "email",
                        placeholder: "Email",
                        value: formData.email,
                        onChange: handleChange,
                        className: `p-3 rounded-lg  ${color} border ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`
                    }, void 0, false, {
                        fileName: "[project]/src/components/form/contact-form.js",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    inputErr.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: inputErr.email
                    }, void 0, false, {
                        fileName: "[project]/src/components/form/contact-form.js",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        name: "message",
                        placeholder: "How can we help you ?",
                        value: formData.message,
                        onChange: handleChange,
                        className: `p-3 h-32 rounded-lg  ${color} border ${borderColor} ${inputBg} outline-none  focus-visible:border-primary w-full`
                    }, void 0, false, {
                        fileName: "[project]/src/components/form/contact-form.js",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    inputErr.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-red-500",
                        children: inputErr.message
                    }, void 0, false, {
                        fileName: "[project]/src/components/form/contact-form.js",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$google$2d$recaptcha$2f$lib$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"], {
                    className: `${showCaptcha ? "block" : "hidden"}`,
                    sitekey: ("TURBOPACK compile-time value", "6LfCJD4rAAAAAD60YiHnwoa0Fob_WqCaSsJMeXlH"),
                    onChange: handleCaptchaChange
                }, void 0, false, {
                    fileName: "[project]/src/components/form/contact-form.js",
                    lineNumber: 140,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "col-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    name: "submit-btn",
                    type: "submit",
                    className: "bg-gradient-to-r from-primary/70 to-primary text-white py-3 px-6 rounded-lg font-bold w-full self-center",
                    children: status === "loading" ? "Sending..." : "Submit Now"
                }, void 0, false, {
                    fileName: "[project]/src/components/form/contact-form.js",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            status === "success" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-white text-center",
                children: "Message sent successfully!"
            }, void 0, false, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            status === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-red-300 text-center",
                children: "Something went wrong. Please try again."
            }, void 0, false, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 161,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {}, void 0, false, {
                fileName: "[project]/src/components/form/contact-form.js",
                lineNumber: 165,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/form/contact-form.js",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(ContactForm, "z998UFqqNpQB2Ask7iCufB2mHFA=");
_c = ContactForm;
const __TURBOPACK__default__export__ = ContactForm;
var _c;
__turbopack_context__.k.register(_c, "ContactForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/common/contact-area.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$form$2f$contact$2d$form$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/form/contact-form.js [client] (ecmascript)");
;
;
;
function ContactArea() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "contact-area  bg-[#131D1B] ",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container p-0 ",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between flex-wrap border-b border-[#7B848D] lg:py-20 md:py-16 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-12 md:col-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl md:text-4xl font-semibold capitalize mb-2 text-white",
                                children: [
                                    "have an idea? ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary",
                                        children: "lets talk"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/common/contact-area.js",
                                        lineNumber: 11,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/common/contact-area.js",
                                lineNumber: 10,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-white border-b border-gray-500 pb-6 mb-6",
                                children: "Share your details with us, and our team will get in touch within 24 hours to discuss your project and guide you through the next steps"
                            }, void 0, false, {
                                fileName: "[project]/src/components/common/contact-area.js",
                                lineNumber: 13,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-12 md:col-6 lg:col-4 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "icon",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "64",
                                                    height: "61",
                                                    viewBox: "0 0 64 61",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                            clipPath: "url(#clip0_53_10473)",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M63.9551 19.7806C64.9283 5.53438 50.4559 -4.30455 37.5757 1.88906C35.5566 2.85802 33.7724 4.31572 31.843 5.57066C23.9719 -2.42214 11.51 -1.20348 4.98553 5.70298C-1.69683 12.7759 -1.9999 24.9903 6.1487 32.4794C4.09341 34.0993 3.2205 36.1589 4.20653 38.6751C5.25231 41.3494 7.43566 42.1604 10.2337 41.8466C9.97329 43.7141 10.2678 45.3767 11.6039 46.7277C12.9698 48.1107 14.6729 48.3881 16.5297 48.1128C15.9023 51.7773 18.3972 55.0577 22.8258 54.4644C22.4843 57.1813 23.274 59.3988 25.9503 60.4467C28.5435 61.4626 30.6649 60.5385 32.2784 58.3914C36.6046 60.4552 40.76 57.1429 39.9724 52.7378C45.1331 52.2042 46.0188 51.3206 46.3475 46.3905C50.9553 46.8365 53.1323 43.537 52.5667 40.0688C52.8164 40.0688 53.0554 40.0581 53.2966 40.0709C57.5011 40.2758 60.0579 36.6775 58.4231 32.7846C58.1712 32.1849 58.3484 31.9074 58.7262 31.5147C61.8806 28.2365 63.6456 24.3073 63.9551 19.7806ZM8.77811 40.6493C6.678 40.5448 5.03675 38.7883 5.10292 36.7159C5.16908 34.6478 6.94051 32.966 9.00434 33.0087C11.0767 33.0514 12.782 34.8292 12.7286 36.8888C12.671 39.0358 10.8675 40.7539 8.77811 40.6493ZM15.2193 46.9326C13.1192 46.9454 11.4331 45.2743 11.4182 43.1635C11.4054 41.0484 13.0552 39.3624 15.1638 39.3368C17.3258 39.3111 19.014 40.9887 19.0183 43.1635C19.0204 45.2593 17.3472 46.9176 15.2193 46.9326ZM21.494 53.2585C19.4195 53.2479 17.7036 51.5191 17.7036 49.4425C17.7036 47.3722 19.4195 45.6499 21.5026 45.6264C23.5728 45.6051 25.3101 47.3061 25.3442 49.3891C25.3805 51.4978 23.6155 53.2713 21.494 53.2585ZM27.7687 59.5439C25.6622 59.5268 24.0274 57.8514 24.0402 55.7172C24.0509 53.5957 25.7049 51.9566 27.8328 51.9566C29.9521 51.9588 31.6168 53.6149 31.6211 55.7279C31.6253 57.8963 29.9457 59.5589 27.7687 59.5439ZM56.5385 37.7361C54.9656 39.2941 52.6243 39.1639 50.8529 37.3967C47.4509 34.0054 44.0595 30.6055 40.6661 27.2078C40.5401 27.0818 40.4164 26.9538 40.284 26.8343C39.902 26.4885 39.4986 25.8824 38.9949 26.5013C38.8434 26.6891 39.1102 27.4319 39.3898 27.7179C42.4546 30.8403 45.562 33.9221 48.6546 37.0147C49.1583 37.5184 49.6684 38.0157 50.1571 38.5321C51.7706 40.2417 51.7877 42.5403 50.2083 44.0705C48.6695 45.5624 46.3859 45.5218 44.7532 43.9062C41.2146 40.4018 37.708 36.8653 34.1843 33.3438C33.9602 33.1175 33.7511 32.8187 33.4736 32.7163C33.2324 32.6267 32.8461 32.6843 32.6413 32.8379C32.5239 32.9254 32.5516 33.3864 32.6733 33.5785C32.8995 33.9307 33.2367 34.2167 33.5376 34.5176C36.9076 37.8876 40.284 41.2533 43.6519 44.6255C45.1181 46.0938 45.466 47.8012 44.64 49.3763C43.4193 51.7027 40.4398 52.1594 38.4955 50.2599C35.8512 47.6732 33.2559 45.0352 30.6393 42.4208C29.6085 41.392 28.6011 40.3313 27.5212 39.3538C27.2586 39.1148 26.7486 39.1489 26.3537 39.0593C26.4519 39.4563 26.422 39.9792 26.6675 40.231C30.2381 43.855 33.8428 47.4448 37.4455 51.0368C38.5339 52.1231 39.0419 53.3844 38.6214 54.9104C38.2181 56.3724 37.2555 57.3136 35.7765 57.6444C35.2728 57.7575 34.7179 57.7383 34.2014 57.67C33.2709 57.5441 32.748 57.2112 32.8461 56.0117C33.1001 52.9256 30.6436 50.5416 27.5574 50.6739C27.2437 50.6867 26.9321 50.7081 26.5202 50.7337C27.1434 46.8771 24.3838 43.8059 20.2305 44.4355C20.444 42.5915 20.1921 40.8841 18.8091 39.516C17.456 38.1779 15.7913 37.9047 13.9387 38.1522C13.9387 37.3903 14.0241 36.7138 13.9259 36.0649C13.5034 33.2669 11.0959 31.4891 8.25095 31.7601C7.85611 31.7986 7.32895 31.6641 7.03869 31.4101C-0.228462 25.0756 -0.697998 13.6659 5.98863 6.54388C12.4618 -0.349772 24.0679 -0.409532 30.7204 6.41583C30.8165 6.514 30.8954 6.63139 31.1729 6.97287C30.1442 7.93115 29.0877 8.86382 28.0867 9.85412C25.404 12.5049 22.7404 15.1727 20.0811 17.8469C18.9158 19.0186 18.9927 19.7443 20.3308 20.6705C24.1234 23.2957 28.9853 22.9008 32.2528 19.6568C34.1694 17.7551 36.0347 15.8002 38.3077 13.4738C38.5702 13.9839 38.6769 14.4108 38.9437 14.6775C44.6913 20.4507 50.4516 26.2132 56.2227 31.965C58.0005 33.7365 58.152 36.1396 56.5385 37.7361ZM57.2749 31.1839C53.8387 27.752 50.5199 24.4375 47.2033 21.1187C44.4885 18.4018 41.778 15.6806 39.0611 12.9637C38.1348 12.0396 38.0751 12.0439 37.1125 13.0043C35.2237 14.8888 33.352 16.7883 31.4503 18.6579C28.5563 21.5093 24.2814 21.9063 21.1184 19.6376C20.9519 19.5202 20.8111 19.3686 20.5251 19.1125C22.5932 17.0807 24.6271 15.1023 26.6376 13.1003C28.8039 10.9426 30.9168 8.72936 33.1087 6.5951C38.0644 1.76955 43.9635 0.143241 50.5754 2.09182C57.1041 4.01692 61.14 8.54155 62.4056 15.2388C63.5645 21.3642 61.7333 26.6742 57.2749 31.1839Z",
                                                                fill: "white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/common/contact-area.js",
                                                                lineNumber: 30,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/common/contact-area.js",
                                                            lineNumber: 29,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                                id: "clip0_53_10473",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                    width: "64",
                                                                    height: "60.8584",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 37,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/common/contact-area.js",
                                                                lineNumber: 36,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/common/contact-area.js",
                                                            lineNumber: 35,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                    lineNumber: 22,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 21,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white capitalize mb-2 mt-3",
                                                children: "happy clients"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 42,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-primary text-2xl font-semibold",
                                                children: "350+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 45,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/common/contact-area.js",
                                        lineNumber: 20,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-12 md:col-6 lg:col-4 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "icon",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "74",
                                                    height: "60",
                                                    viewBox: "0 0 74 60",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                            clipPath: "url(#clip0_53_10482)",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M73.9942 24.4543C73.9781 23.1628 73.545 22.667 72.2577 22.4571C70.7417 22.2072 70.461 21.5254 71.3493 20.236C72.1113 19.1304 72.0672 18.5426 71.1488 17.605C70.9623 17.4151 70.7738 17.2252 70.5853 17.0372C69.2819 15.7397 68.9531 15.7098 67.4231 16.7573C66.5248 17.3731 65.7929 17.0332 65.4861 15.9537C65.3116 15.3419 65.0891 14.4063 64.67 14.2663C63.537 13.8885 63.7055 13.1208 63.7075 12.3211C63.7095 11.3875 63.7075 10.4559 63.7075 9.52224V6.06162C63.8077 6.13559 63.906 6.20956 64.0063 6.28353C64.5236 5.93367 65.4259 5.64979 65.4981 5.22596C66.0756 1.83931 63.8839 -0.0039527 61.4115 0.00604331C50.9203 0.0440281 40.4291 0.0480265 29.9379 4.57059e-05C27.5817 -0.0099503 25.2497 1.6194 25.7269 5.15398C25.769 5.46186 26.2343 5.76974 26.5691 5.96166C26.7957 6.08961 27.1406 6.01564 27.5537 6.03763V7.25914C27.5537 14.6882 27.5517 22.1152 27.5557 29.5442C27.5557 31.4855 28.1973 32.1312 30.1284 32.1312C37.7802 32.1332 45.4321 32.1452 53.0819 32.1152C53.886 32.1112 54.4495 32.3391 54.9989 32.9169C56.3925 34.3843 56.6953 34.3903 58.3937 33.2887C59.1537 32.7949 59.9878 33.1268 60.1883 34.0024C60.2385 34.2284 60.2806 34.4583 60.3287 34.6862C60.5573 35.7657 61.0165 36.1596 62.1013 36.1876C62.5364 36.1996 62.9696 36.1936 63.4047 36.1896C64.7502 36.1776 65.1572 35.8337 65.4199 34.4982C65.7347 32.9069 66.3784 32.645 67.7139 33.5666C68.7245 34.2643 69.4083 34.2104 70.2865 33.3647C70.5753 33.0868 70.864 32.8089 71.1448 32.523C72.0632 31.5814 72.1093 30.9897 71.3593 29.8861C70.467 28.5746 70.7076 27.9769 72.2577 27.651C73.6493 27.3591 73.9861 26.9533 73.9962 25.5538C73.9982 25.188 74.0002 24.8201 73.9942 24.4543ZM27.5196 4.21636C27.3752 2.8629 28.081 1.92528 29.3102 1.77134C29.5408 1.74335 29.7774 1.74535 30.01 1.74535C40.4271 1.74335 50.8441 1.74135 61.2611 1.74735C63.0458 1.74735 63.8799 2.54703 63.8037 4.21636H27.5196ZM47.9045 6.05163V13.5526C46.3825 11.8533 44.9047 11.8253 43.3266 13.6266V6.05163H47.9045ZM54.7823 29.1744C54.4876 29.6622 53.9462 30.3439 53.501 30.3479C45.5163 30.4079 37.5316 30.3759 29.5468 30.3639C29.5168 30.3639 29.4847 30.3459 29.3564 30.3079V6.05362H41.56C41.56 7.80492 41.562 9.52623 41.56 11.2475C41.56 12.2132 41.5279 13.1808 41.562 14.1444C41.6101 15.4739 42.6909 16.1196 43.6474 15.2659C45.0671 13.9984 46.2061 13.9904 47.6278 15.2579C48.5943 16.1216 49.6911 15.4839 49.7051 14.1564C49.7332 11.4934 49.7132 8.83051 49.7132 6.04363H61.9128V13.8605C60.6716 13.9904 60.3468 14.9101 60.1823 16.0036C60.0279 17.0352 59.1737 17.3651 58.3115 16.7773C57.6859 16.3495 57.0001 15.6198 56.2662 16.1936C55.3538 16.9073 54.5377 17.8109 53.9181 18.7845C53.7216 19.0924 54.2148 19.9321 54.5297 20.4479C55.1392 21.4475 54.8365 22.2312 53.6815 22.4111C52.0893 22.661 51.7264 23.0888 51.7224 24.7222C51.7224 25.088 51.7144 25.4539 51.7244 25.8217C51.7565 26.9153 52.1335 27.3451 53.2283 27.605C53.6694 27.711 54.1988 27.7649 54.4996 28.0428C54.7522 28.2767 54.9327 28.9265 54.7823 29.1744ZM72.1855 25.9437C71.0245 26.1336 69.9376 26.2136 69.3321 27.717C68.7385 29.1924 69.3241 30.042 70.1081 31.0436C69.0273 32.3431 69.0273 32.3431 67.7881 31.5354C66.5087 30.7038 64.2328 31.7114 63.9581 33.2288C63.8859 33.6186 63.7937 34.0044 63.6995 34.4403H62.0532C62.0031 34.2863 61.9088 34.1344 61.9128 33.9845C61.9569 32.2551 60.7438 31.6534 59.3803 31.2875C58.9632 31.1736 58.3777 31.2955 57.9906 31.5194C56.6371 32.2971 56.6572 32.3311 55.6205 31.0536C56.3163 30.06 57.0181 29.2024 56.3724 27.689C55.7388 26.2096 54.662 26.1216 53.4348 25.9417V24.2264C54.658 23.9705 55.7909 23.8745 56.4005 22.3411C56.988 20.8597 56.3283 20.03 55.5423 18.9984C55.9895 18.5846 56.3745 18.2288 56.8176 17.8169C57.8322 18.5126 58.6965 19.2204 60.2104 18.5786C61.6943 17.9509 61.7424 16.8433 62.0091 15.6678H63.7015C64.0022 16.8213 63.9982 17.9689 65.4981 18.5786C66.984 19.1844 67.8382 18.6006 68.8869 17.7809C69.2839 18.2088 69.6569 18.6086 70.056 19.0384C69.9978 19.1484 69.9657 19.2923 69.8755 19.3723C68.4598 20.6218 69.0834 21.9613 69.7873 23.2268C69.9878 23.5866 70.5593 23.8425 71.0084 23.9465C72.4863 24.2903 72.5083 24.2803 72.1855 25.9437Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 60,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M73.6872 42.5468C72.9212 40.5356 70.7696 39.466 68.5098 40.0657C65.3496 40.9054 62.2094 41.8131 59.0592 42.6867C56.3001 43.4544 53.5409 44.2161 50.6795 45.0078C50.1341 43.6083 48.9851 43.0046 47.7098 42.4948C42.5043 40.4156 37.3128 38.3085 32.1274 36.1833C27.8422 34.428 23.4127 33.7243 18.7968 34.2021C16.7094 34.418 14.6179 34.6079 12.4643 34.8158C12.1034 33.1065 10.9604 32.6027 9.4044 32.7267C9.13971 32.7487 8.84495 32.7967 8.60833 32.7127C8.2494 32.5867 7.82029 32.4308 7.60974 32.1489C7.07034 31.4192 6.41063 31.0074 5.50629 31.0034C4.07056 30.9954 2.63283 31.0134 1.19711 30.9954C0.340884 30.9834 0.0020052 31.3892 0.0020052 32.2169C0.010026 39.9798 0.010026 47.7427 0 55.5036C0 56.3572 0.399035 56.7131 1.22317 56.7071C2.62682 56.6971 4.04048 56.8031 5.42808 56.6611C6.12389 56.5891 6.97008 56.2373 7.39118 55.7215C7.85638 55.1537 8.24539 54.9018 8.93518 54.9718C9.33221 55.0138 9.73726 54.9898 10.1383 54.9758C11.4016 54.9298 12.3019 54.1521 12.3821 52.8866C12.4222 52.2449 12.6488 52.003 13.2464 51.943C13.6093 51.907 13.9642 51.7851 14.3171 51.6871C17.0482 50.9214 19.7091 51.0533 22.352 52.1449C27.9646 54.462 33.5972 56.7251 39.2238 59.0082C42.4481 60.3156 45.7126 60.3836 48.8548 58.8982C56.4264 55.3196 63.9499 51.6491 71.4795 47.9846C73.6711 46.919 74.5173 44.7299 73.6872 42.5468ZM6.22214 34.0981C6.22214 40.6215 6.22214 47.1449 6.22014 53.6683C6.21813 54.9378 6.17402 54.9818 4.94282 54.9878C3.91015 54.9918 2.87947 54.9878 1.75656 54.9878V32.7347C3.04189 32.7347 4.27309 32.6907 5.49827 32.7687C5.75293 32.7847 6.01561 33.2205 6.20209 33.5104C6.29433 33.6523 6.22214 33.8982 6.22214 34.0981ZM10.6917 51.861C10.6917 53.2765 10.6877 53.2765 9.23997 53.2785C8.84495 53.2805 8.44992 53.2785 7.95865 53.2785V34.5779C8.06091 34.506 8.08498 34.476 8.11305 34.472C10.6436 34.1461 10.6897 34.1841 10.6917 36.7011C10.6937 41.7551 10.6917 46.809 10.6917 51.861ZM70.7375 46.4812C67.83 47.9046 64.9144 49.308 62.0009 50.7135C57.6135 52.8286 53.2121 54.9138 48.8367 57.0569C45.7988 58.5444 42.7409 58.6163 39.6328 57.3548C33.9762 55.0618 28.3235 52.7567 22.6708 50.4496C20.044 49.378 17.355 49.2601 14.6119 49.8818C13.9301 50.0358 13.2484 50.1817 12.4563 50.3576V36.5432C14.3472 36.3512 16.2081 36.2273 18.0488 35.9674C23.9 35.1357 29.282 36.6671 34.5677 38.9702C38.8167 40.8214 43.16 42.4568 47.4291 44.2601C48.0747 44.534 48.8167 45.0897 49.0633 45.6975C49.735 47.3548 48.2512 48.9322 46.5087 48.4584C44.0944 47.8027 41.7142 47.023 39.322 46.2933C37.1865 45.6395 35.0509 44.9818 32.9154 44.32C32.3199 44.1341 31.7363 44.0661 31.5378 44.8138C31.3433 45.5396 31.8627 45.7915 32.4622 45.9734C36.8977 47.3248 41.3272 48.6923 45.7607 50.0458C48.0908 50.7555 50.118 49.6379 50.86 47.3069C50.9562 47.005 51.2971 46.6471 51.5959 46.5611C57.2064 44.9598 62.831 43.3944 68.4516 41.823C68.6441 41.7691 68.8406 41.7291 69.0371 41.6851C70.4909 41.3692 71.7221 42.015 72.1672 43.3264C72.5843 44.554 72.0148 45.8554 70.7375 46.4812Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 64,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M36.308 24.0341C36.3381 24.2541 35.899 24.6899 35.5982 24.7718C35.135 24.8998 34.6116 24.8058 34.1123 24.8058C34.1123 24.8078 34.1123 24.8078 34.1123 24.8098C33.6471 24.8098 33.1539 24.9058 32.7267 24.7778C32.4159 24.6839 31.9628 24.266 31.9908 24.0461C32.0329 23.7243 32.422 23.2265 32.7087 23.1945C33.6592 23.0865 34.6377 23.0885 35.5902 23.1945C35.8749 23.2245 36.2639 23.7143 36.308 24.0341Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 68,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M36.3081 27.0954C36.3342 27.3133 35.881 27.7332 35.5762 27.8131C35.111 27.9371 34.5877 27.8451 34.0904 27.8451C33.6252 27.8431 33.1279 27.9411 32.7048 27.8091C32.398 27.7152 31.9548 27.2773 31.9889 27.0574C32.039 26.7356 32.4381 26.2538 32.7308 26.2218C33.6833 26.1178 34.6619 26.1198 35.6143 26.2298C35.893 26.2618 36.272 26.7696 36.3081 27.0954Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 72,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M62.8773 20.3897C60.1904 20.3797 58.0287 22.5168 58.0287 25.1878C58.0267 27.8487 60.2044 30.0058 62.8793 29.9958C65.5142 29.9858 67.6437 27.8687 67.6698 25.2377C67.6938 22.5508 65.5683 20.4017 62.8773 20.3897ZM62.8673 28.3285C61.1789 28.3425 59.7612 26.9171 59.7552 25.2018C59.7492 23.4784 61.1388 22.057 62.8412 22.049C64.5296 22.041 65.9613 23.4705 65.9693 25.1758C65.9774 26.8731 64.5597 28.3165 62.8673 28.3285Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 76,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M5.11323 51.741C4.57984 52.1048 4.19885 52.5526 3.95622 52.4867C3.62938 52.3967 3.25841 51.9389 3.20427 51.591C3.17219 51.3911 3.72763 50.9093 4.0244 50.9053C4.31917 50.9013 4.61995 51.3371 5.11323 51.741Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 80,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/common/contact-area.js",
                                                            lineNumber: 59,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                                id: "clip0_53_10482",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                    width: "74",
                                                                    height: "60",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 87,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/common/contact-area.js",
                                                                lineNumber: 86,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/common/contact-area.js",
                                                            lineNumber: 85,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                    lineNumber: 52,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 51,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white capitalize mb-2 mt-3",
                                                children: "Projects Delivered"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-primary text-2xl font-semibold",
                                                children: "500+"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/common/contact-area.js",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-12 md:col-6 lg:col-4 flex flex-col items-center justify-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "icon",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "53",
                                                    height: "66",
                                                    viewBox: "0 0 53 66",
                                                    fill: "none",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                            clipPath: "url(#clip0_53_10490)",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M51.264 25.0154C51.3347 24.9269 51.3997 24.8214 51.4852 24.7385C53.197 23.0805 53.2825 21.0287 52.5335 18.9939C51.7844 16.959 50.0541 16.2939 47.9706 16.3147C43.9133 16.358 39.8578 16.3279 35.5923 16.3279C36.4324 14.8978 37.1535 13.6279 37.9155 12.3844C39.8745 9.18901 39.6682 5.92951 38.107 2.69828C36.8338 0.0643111 33.7151 -0.774113 31.2952 0.774617C30.1744 1.49246 29.4068 2.52306 29.1931 3.86266C28.747 6.67185 27.3902 8.86682 25.3792 10.8677C21.9687 14.2591 18.179 17.3415 15.8613 21.7446C15.6996 22.0499 14.8911 22.0649 14.38 22.0744C14.2555 22.0744 14.0287 21.5204 14.0101 21.2096C13.9395 20.049 13.7945 19.8737 12.605 19.8718C8.98076 19.8681 5.35648 19.87 1.7322 19.8718C0.343821 19.8718 0.189556 20.0301 0.187698 21.4394C0.185839 27.4365 0.187698 33.4336 0.187698 39.4326C0.187698 41.3468 0.196991 43.2629 0.183981 45.1772C0.178405 45.961 0.457196 46.4734 1.28985 46.4753C5.16133 46.4847 9.03466 46.4829 12.9061 46.4753C13.6105 46.4734 13.9971 46.1098 13.9934 45.3675C13.9897 44.7533 13.9916 44.1372 13.9916 43.2874C14.6755 43.4928 15.3799 43.4796 15.629 43.8131C17.3426 46.1192 19.7328 47.1159 22.4055 47.1574C29.8064 47.2723 37.2111 47.2422 44.6139 47.1932C47.3275 47.1743 49.1991 44.5837 48.5858 41.8989C48.4706 41.3939 48.2698 40.9097 48.11 40.4179C51.6135 39.2705 52.29 35.6097 50.4258 33.036C52.842 31.4515 53.3289 27.6456 51.264 25.0154ZM12.0196 44.448H2.1541V21.8784H12.0196V44.448ZM38.7891 25.8671C39.75 25.8859 40.709 25.8746 41.6699 25.8746C43.7441 25.8746 45.8183 25.8633 47.8925 25.8784C49.792 25.8934 50.5894 26.7978 50.5764 28.8722C50.5652 30.664 49.6619 31.5909 47.8962 31.5966C45.2013 31.6041 42.5081 31.5985 39.815 31.5985C39.5976 31.5985 39.3801 31.5909 39.1645 31.6022C38.5642 31.6305 38.133 31.8924 38.1125 32.5481C38.0884 33.2716 38.5456 33.541 39.1905 33.5429C41.1402 33.5504 43.0917 33.5466 45.0414 33.5485C45.7235 33.5485 46.4056 33.5221 47.0859 33.5561C48.5821 33.6314 49.5337 34.6357 49.5132 36.0808C49.4928 37.4995 48.4873 38.5075 46.993 38.5244C44.7013 38.5508 42.4096 38.532 40.1198 38.532C39.841 38.532 39.5623 38.5376 39.2835 38.5339C38.646 38.5282 38.2798 38.8297 38.2817 39.4891C38.2835 40.1448 38.6608 40.4538 39.2853 40.4556C40.8949 40.4613 42.5063 40.4538 44.1158 40.4594C45.6603 40.4651 46.7904 41.473 46.7997 42.8409C46.8108 44.2163 45.6808 45.2883 44.1697 45.2902C37.1405 45.2978 30.1112 45.3505 23.0839 45.262C20.5766 45.2318 18.2255 44.5743 16.891 42.0364C16.7627 41.7915 16.3669 41.6238 16.0658 41.5597C15.681 41.4787 15.261 41.4975 14.8632 41.5428C14.1514 41.6238 13.973 41.3129 13.9804 40.6271C14.0101 37.4561 13.9934 34.2871 13.9934 31.1162V24.0659C14.7108 24.0659 15.3391 24.1544 15.9264 24.0376C16.3836 23.9453 17.0081 23.7079 17.1884 23.3442C18.9057 19.9114 21.61 17.3245 24.2548 14.6812C25.2454 13.6882 26.1784 12.6294 27.2248 11.7024C29.195 9.95395 30.3882 7.79854 30.838 5.19848C30.8956 4.85934 30.9699 4.52021 31.0684 4.19049C31.4216 3.01293 32.165 2.22349 33.3824 2.01624C34.6221 1.80522 35.7633 2.33277 36.3394 3.49902C37.5977 6.04821 37.8914 8.63131 36.3524 11.2069C35.3284 12.9233 34.3173 14.6491 33.3081 16.3731C32.5516 17.6656 32.9066 18.276 34.4214 18.276C39.0047 18.2817 43.5861 18.2722 48.1695 18.2817C50.1154 18.2854 51.002 19.2143 50.989 21.1813C50.976 22.9844 50.0913 23.868 48.281 23.8699C45.3704 23.8737 42.4598 23.8718 39.5492 23.8718C39.3021 23.8718 39.053 23.8624 38.8058 23.8756C38.1795 23.9095 37.7111 24.1488 37.7018 24.8704C37.6925 25.6014 38.159 25.8557 38.7891 25.8671Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 110,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M34.8191 56.1837C34.6462 55.5148 34.1202 55.4866 33.5682 55.4903C32.2672 55.4979 30.9662 55.528 29.6689 55.464C29.3734 55.4489 28.9422 55.1399 28.8381 54.8648C28.3734 53.6364 28.0556 52.3533 27.5742 51.1343C27.4088 50.7141 26.9758 50.228 26.5743 50.1188C25.8941 49.936 25.6599 50.5879 25.4833 51.1399C25.1097 52.3006 24.7138 53.4574 24.3904 54.6331C24.2139 55.2793 23.9258 55.545 23.2307 55.5092C21.9966 55.4451 20.755 55.5035 19.5172 55.4847C18.9447 55.4771 18.3444 55.5695 18.2979 56.1969C18.2701 56.5925 18.5842 57.137 18.9113 57.4121C19.8369 58.1903 20.8275 58.8987 21.8367 59.5656C22.424 59.9557 22.5987 60.3306 22.3348 61.0296C21.8906 62.1977 21.504 63.3941 21.2029 64.6075C21.1026 65.0107 21.2011 65.7078 21.4669 65.8925C21.7512 66.0903 22.4296 65.9885 22.7753 65.7643C24.0485 64.9353 25.2528 64.0027 26.5464 63.0625C27.7527 63.9386 28.9273 64.8581 30.1763 65.6588C30.5759 65.9132 31.1688 65.8548 31.6743 65.9396C31.7375 65.4214 31.9475 64.8675 31.8323 64.3946C31.5368 63.1812 31.1186 61.9961 30.7004 60.8167C30.522 60.3155 30.6242 60.0216 31.0498 59.7258C32.0944 58.9966 33.1017 58.2129 34.1425 57.4799C34.6053 57.154 34.9845 56.8167 34.8191 56.1837ZM29.2526 58.6311C28.3734 59.1417 28.2712 59.8181 28.6355 60.6961C28.8474 61.2067 28.9905 61.7455 29.2618 62.5595C28.4645 61.998 27.8753 61.6325 27.3438 61.1935C26.788 60.7357 26.2862 60.7828 25.7509 61.186C25.2101 61.5948 24.6637 61.9961 23.95 62.3051C24.1581 61.6438 24.3328 60.9693 24.5856 60.3249C24.8346 59.6881 24.6655 59.2435 24.1451 58.8648C23.5838 58.454 23.0392 58.0207 22.4854 57.5968C22.504 57.5346 22.5225 57.4705 22.5411 57.4065C23.1136 57.4065 23.6916 57.3594 24.2585 57.4178C25.1989 57.5139 25.7045 57.1201 25.9126 56.195C26.039 55.6298 26.2806 55.0909 26.539 54.3429C26.8308 55.1531 27.0947 55.7748 27.2769 56.4211C27.4794 57.1352 27.8809 57.4611 28.6225 57.414C29.2581 57.3744 29.8975 57.4065 30.6038 57.5949C30.1558 57.9453 29.7395 58.3504 29.2526 58.6311Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 114,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M16.4802 56.1295C16.4468 55.8732 15.7535 55.5473 15.339 55.5228C14.0454 55.4437 12.7426 55.4719 11.4434 55.5021C10.9211 55.5153 10.6777 55.3287 10.5271 54.8163C10.1461 53.5275 9.75393 52.2388 9.25954 50.9915C9.10899 50.6128 8.62947 50.1757 8.26333 50.138C7.98082 50.1079 7.49015 50.5996 7.34889 50.9633C6.88238 52.154 6.48836 53.3768 6.15753 54.6128C5.96609 55.3269 5.61667 55.5435 4.91412 55.5096C3.77108 55.4512 2.62432 55.4964 1.48128 55.4927C0.886523 55.4889 0.249021 55.4154 0.0408572 56.1822C-0.145003 56.8643 0.327082 57.2034 0.79731 57.5407C1.80653 58.2642 2.79717 59.014 3.81197 59.73C4.2283 60.0239 4.34353 60.3084 4.15581 60.8265C3.71904 62.0286 3.30829 63.2495 3.00162 64.4911C2.89196 64.932 3.11499 65.4577 3.18562 65.9456C3.69116 65.859 4.28591 65.9174 4.68365 65.6611C5.90847 64.8717 7.05523 63.9636 8.30236 63.0517C9.5848 63.9881 10.7892 64.9226 12.0567 65.7535C12.4024 65.9814 13.0901 66.0964 13.3596 65.8985C13.6328 65.7007 13.7425 65.0055 13.6421 64.6004C13.3392 63.3908 12.9284 62.2038 12.4991 61.0319C12.2723 60.4139 12.3151 60.0296 12.9191 59.6414C13.9618 58.9726 14.9748 58.2416 15.9171 57.4352C16.2535 57.1488 16.5323 56.544 16.4802 56.1295ZM10.8598 58.7295C10.2353 59.1591 10.0439 59.6942 10.3134 60.429C10.5253 61.0055 10.6684 61.6084 10.6944 62.3376C10.187 61.9758 9.65914 61.6386 9.17776 61.2467C8.58301 60.7625 8.04587 60.7229 7.44182 61.2429C6.95115 61.6631 6.39915 62.0079 5.665 62.5392C5.92148 61.6744 6.09434 61.0338 6.30436 60.4045C6.54783 59.6772 6.38056 59.1384 5.72633 58.7201C5.2115 58.3904 4.73755 57.9929 4.28034 57.4088C4.96616 57.4088 5.65385 57.3824 6.33967 57.4163C7.00691 57.4521 7.37491 57.1394 7.56078 56.5214C7.76708 55.8356 7.99011 55.1535 8.29492 54.187C8.59602 55.1064 8.84507 55.7564 9.01792 56.4272C9.20564 57.1582 9.63312 57.4521 10.3617 57.4163C10.9992 57.3843 11.6404 57.4088 12.2779 57.4088C12.3021 57.486 12.3244 57.5633 12.3485 57.6405C11.8523 58.0042 11.3653 58.3829 10.8598 58.7295Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 118,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M52.9832 56.1841C52.9014 55.8751 52.2807 55.5492 51.8774 55.5247C50.5838 55.4418 49.2809 55.4663 47.9836 55.5058C47.426 55.5209 47.1621 55.3382 47.0022 54.7861C46.6268 53.4974 46.2272 52.2124 45.7421 50.9633C45.6008 50.5996 45.1065 50.1079 44.8258 50.138C44.4597 50.1795 43.9857 50.6204 43.8333 51.001C43.3482 52.2162 42.9579 53.4748 42.5992 54.7371C42.4301 55.3306 42.1438 55.5209 41.5509 55.5021C40.2834 55.4625 39.0121 55.4399 37.7482 55.5228C37.3375 55.5492 36.6517 55.8789 36.6145 56.1408C36.5606 56.5459 36.8524 57.1469 37.1869 57.4295C38.159 58.2491 39.2147 58.9688 40.2611 59.6923C40.7164 60.007 40.8372 60.3291 40.6439 60.868C40.2127 62.0738 39.7816 63.2853 39.4749 64.5269C39.3671 64.9621 39.4674 65.7158 39.75 65.9098C40.0399 66.1096 40.7536 65.9362 41.1328 65.6894C42.3762 64.8792 43.5527 63.9636 44.7998 63.0554C46.0581 63.9749 47.2123 64.8736 48.4315 65.6706C48.8162 65.9211 49.3775 65.8929 49.8571 65.9927C49.9444 65.4803 50.1953 64.9263 50.0857 64.461C49.7994 63.2476 49.3701 62.0663 48.9612 60.8868C48.7865 60.38 48.8144 60.0522 49.305 59.7225C50.3849 58.9933 51.4499 58.2321 52.4479 57.3975C52.7658 57.1299 53.0743 56.5233 52.9832 56.1841ZM47.3089 58.7804C46.677 59.1893 46.5524 59.7036 46.7922 60.3913C47.0152 61.03 47.1918 61.6876 47.4576 62.5637C46.7179 62.0248 46.1473 61.6537 45.6287 61.2203C45.0507 60.738 44.5321 60.7644 43.9616 61.2184C43.4393 61.6348 42.8854 62.0098 42.1606 62.5354C42.352 61.8628 42.4728 61.42 42.6066 60.981C43.0954 59.3739 43.0973 59.3739 41.7331 58.3678C41.393 58.1172 41.0547 57.861 40.7666 57.4088C41.4264 57.4088 42.0899 57.3805 42.7497 57.4163C43.4913 57.4559 43.8946 57.1262 44.0842 56.4083C44.2552 55.7564 44.495 55.1234 44.7998 54.1964C45.0916 55.1026 45.3295 55.7301 45.4912 56.3782C45.6845 57.145 46.125 57.4653 46.8982 57.4144C47.5096 57.3749 48.1267 57.4069 48.74 57.4069C48.7753 57.4804 48.8088 57.5539 48.8441 57.6273C48.3349 58.0136 47.846 58.4337 47.3089 58.7804Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 122,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    d: "M7.14258 36.5819C5.4531 36.5423 4.07774 37.8876 4.0164 39.6341C3.95507 41.4203 5.27096 42.8371 7.0292 42.8786C8.77257 42.92 10.1963 41.5465 10.226 39.7962C10.2539 38.0703 8.86365 36.6196 7.14258 36.5819ZM7.12027 40.9379C6.49021 40.9492 5.93262 40.4029 5.95121 39.7566C5.97166 39.0218 6.3601 38.5677 7.08868 38.5583C7.82097 38.5508 8.20756 39.0425 8.28562 39.7302C8.35439 40.3388 7.74105 40.9285 7.12027 40.9379Z",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 126,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/common/contact-area.js",
                                                            lineNumber: 109,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("clipPath", {
                                                                id: "clip0_53_10490",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                    width: "53",
                                                                    height: "66",
                                                                    fill: "white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                                    lineNumber: 133,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/common/contact-area.js",
                                                                lineNumber: 132,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/common/contact-area.js",
                                                            lineNumber: 131,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/common/contact-area.js",
                                                    lineNumber: 102,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 101,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white capitalize mb-2 mt-3",
                                                children: "Client Satisfaction"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 138,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-primary text-2xl font-semibold",
                                                children: "98%"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/common/contact-area.js",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/common/contact-area.js",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/common/contact-area.js",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/common/contact-area.js",
                        lineNumber: 9,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-12 md:col-5 ",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$form$2f$contact$2d$form$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            borderColor: "border-[#7B848D]",
                            inputBg: "bg-[#1C2927]",
                            color: "text-white"
                        }, void 0, false, {
                            fileName: "[project]/src/components/common/contact-area.js",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/common/contact-area.js",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/common/contact-area.js",
                lineNumber: 8,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/common/contact-area.js",
            lineNumber: 7,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/common/contact-area.js",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
_c = ContactArea;
const __TURBOPACK__default__export__ = ContactArea;
var _c;
__turbopack_context__.k.register(_c, "ContactArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/common/seo.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
;
;
const SEO = ({ pageTitle, pageDescription, keywords, ogImage, ogTitle, ogUrl })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                    children: pageTitle
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 13,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                    rel: "icon",
                    href: "/favicon.png"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 14,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    httpEquiv: "x-ua-compatible",
                    content: "ie=edge"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 15,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, shrink-to-fit=no"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 16,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "description",
                    content: `${pageDescription ?? "PySquad: Custom web, app, cloud, and AI solutions for diverse industries – eCommerce, LMS, CMS, ERP, logistics, pharma, and more."}`
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 21,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "keywords",
                    content: `${keywords ?? "Python, Django, Odoo, React, Next.js, API development, ERP solutions, AI solutions, web development, software development"}`
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 28,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:title",
                    content: ogTitle ?? "Pysquad"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 35,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:description",
                    content: `${pageDescription ?? "Building Web, app, cloud and AI solutions. PySquad is helping to various industries like eCommerce, LMS, CMS, ERP, Logistics, Pharma, Media etc..."}`
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 36,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:url",
                    content: ogUrl ?? "https://pysquad.com/"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 43,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:site_name",
                    content: "pysquad"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 44,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:type",
                    content: "website"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 45,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:locale",
                    content: "en_US"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 46,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "copyright",
                    content: "PySquad"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 47,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "distribution",
                    content: "Global"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 48,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "author",
                    content: "PySquad"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 49,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "owner",
                    content: "pysquad.com"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 50,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "twitter:account_id",
                    content: "1732400986700804096"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 52,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "twitter:card",
                    content: "summary_large_image"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 53,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "twitter:site",
                    content: "@pysquad_info"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 54,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    name: "robots",
                    content: "follow, index, max-image-preview:large"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 56,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                    rel: "canonical",
                    href: `https://pysquad.com/`
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 57,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                    property: "og:image",
                    content: ogImage ?? "https://www.pysquad.com/assets/img/logo/pysquad-logo.png"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/seo.js",
                    lineNumber: 59,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/seo.js",
            lineNumber: 12,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false);
_c = SEO;
const __TURBOPACK__default__export__ = SEO;
var _c;
__turbopack_context__.k.register(_c, "SEO");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/pages/blogs/[slug].js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "__N_SSP": ()=>__N_SSP,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dynamic.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$contact$2d$area$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/contact-area.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$seo$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/seo.js [client] (ecmascript)");
;
;
;
;
;
;
const BlogsDetailsPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dynamic$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.r("[project]/src/components/blog-details/index.js [client] (ecmascript, next/dynamic entry, async loader)")(__turbopack_context__.i), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/blog-details/index.js [client] (ecmascript, next/dynamic entry)"
        ]
    }
});
_c = BlogsDetailsPage;
function BlogDetails({ blogData }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BlogsDetailsPage, {
                blogData: blogData
            }, void 0, false, {
                fileName: "[project]/src/pages/blogs/[slug].js",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$contact$2d$area$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/blogs/[slug].js",
                lineNumber: 12,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c1 = BlogDetails;
var __N_SSP = true;
const __TURBOPACK__default__export__ = BlogDetails;
var _c, _c1;
__turbopack_context__.k.register(_c, "BlogsDetailsPage");
__turbopack_context__.k.register(_c1, "BlogDetails");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/blogs/[slug].js [client] (ecmascript)\" } [client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const PAGE_PATH = "/blogs/[slug]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/blogs/[slug].js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/blogs/[slug].js\" }": ((__turbopack_context__) => {
"use strict";

var { m: module } = __turbopack_context__;
{
__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/blogs/[slug].js [client] (ecmascript)\" } [client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__9fc1ec18._.js.map