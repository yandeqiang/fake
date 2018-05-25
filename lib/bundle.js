(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["FakeVue"] = factory();
	else
		root["FakeVue"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _observer_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer/index */ "./src/observer/index.ts");
/* harmony import */ var _observer_watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observer/watcher */ "./src/observer/watcher.ts");
/* harmony import */ var src_vdom_create_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/vdom/create-element */ "./src/vdom/create-element.ts");
/* harmony import */ var src_vdom_patch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/vdom/patch */ "./src/vdom/patch.ts");




function proxy(target, sourceKey) {
    return;
}
class FakeVue {
    constructor(options) {
        this.$options = options;
        this.initVm();
        this.initData();
        this.initComputed();
        this.initWatch();
        this.initRender();
        return this._vm;
    }
    initVm() {
        this._vm = new Proxy(this, {
            get(target, key, receiver) {
                return (target._data[key] || (target._computed[key] && target._computed[key]()) || target[key]);
            },
            set(target, key, value) {
                if (target._data[key]) {
                    return Reflect.set(target._data, key, value);
                }
                else {
                    return Reflect.set(target, key, value);
                }
            }
        });
    }
    initData() {
        this._data = Object(_observer_index__WEBPACK_IMPORTED_MODULE_0__["observe"])(this.$options.data);
    }
    initComputed() {
        this._computed = Object.create(null);
        const computed = this.$options.computed;
        if (!computed)
            return;
        Object.keys(computed).forEach(item => {
            this._computed[item] = computed[item].bind(this._vm);
        });
    }
    initWatch() {
        const watch = this.$options.watch;
        if (!watch)
            return;
        Object.keys(watch).forEach(item => {
            new _observer_watcher__WEBPACK_IMPORTED_MODULE_1__["Watcher"](this._vm, item, watch[item]);
        });
    }
    initRender() {
        this._update();
        new _observer_watcher__WEBPACK_IMPORTED_MODULE_1__["Watcher"](this._vm, 'e', this._update);
    }
    _update() {
        console.log('update');
        const { el, render } = this.$options;
        const oldVnode = this._vnode || document.querySelector(el);
        const vnode = render.call(this, src_vdom_create_element__WEBPACK_IMPORTED_MODULE_2__["createElement"]);
        Object(src_vdom_patch__WEBPACK_IMPORTED_MODULE_3__["default"])(oldVnode, vnode);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (FakeVue);


/***/ }),

/***/ "./src/observer/dep.ts":
/*!*****************************!*\
  !*** ./src/observer/dep.ts ***!
  \*****************************/
/*! exports provided: Dep, pushTarget, popTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dep", function() { return Dep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pushTarget", function() { return pushTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "popTarget", function() { return popTarget; });
class Dep {
    constructor() {
        this.subs = new Map();
    }
    // 收集依赖
    depend(key, watcher) {
        // console.log('depend')
        this.subs.set(key, watcher);
    }
    // 触发依赖
    notify(key, val) {
        // console.log('notify')
        this.subs.get(key) && this.subs.get(key).update();
    }
}
function pushTarget(watcher) {
    Dep.target = watcher;
}
function popTarget() {
    Dep.target = null;
}


/***/ }),

/***/ "./src/observer/index.ts":
/*!*******************************!*\
  !*** ./src/observer/index.ts ***!
  \*******************************/
/*! exports provided: observe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe; });
/* harmony import */ var src_util_predict__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/util/predict */ "./src/util/predict.ts");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/observer/store.ts");
/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dep */ "./src/observer/dep.ts");



const IS_ARRAY = Symbol('is array');
function observe(data) {
    if (!Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isObject"])(data))
        return data; // return when data is non-object
    // array & object
    Object.keys(data).forEach(item => {
        data[item] = observe(data[item]);
    });
    return defineReactive(data);
}
function defineReactive(target) {
    const dep = target.__dep__ ? target.__dep__ : new _dep__WEBPACK_IMPORTED_MODULE_2__["Dep"](); // 将 dep 封在这个 object 上
    const proxy = new Proxy(target, {
        get(target, key) {
            if (key === '__dep__')
                return dep;
            const result = Reflect.get(target, key);
            if (_dep__WEBPACK_IMPORTED_MODULE_2__["Dep"].target && key !== '__dep__') {
                key = Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isArray"])(target) ? IS_ARRAY : key;
                // target.key hasChanged
                dep.depend(key, _dep__WEBPACK_IMPORTED_MODULE_2__["Dep"].target);
                const child = target[key];
                // target.key's children hasChanged
                if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isObject"])(child)) {
                    for (const i in child) {
                        child[i].__dep__ && child[i].__dep__.depend(key, _dep__WEBPACK_IMPORTED_MODULE_2__["Dep"].target);
                    }
                }
            }
            // 收集依赖
            return result;
        },
        set(target, key, value) {
            Reflect.set(target, key, observe(value));
            // 触发依赖
            key = Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isArray"])(target) ? IS_ARRAY : key;
            dep.notify(key, value);
            // 再次收集依赖
            return true;
        }
    });
    _store__WEBPACK_IMPORTED_MODULE_1__["proxyToRaw"].set(proxy, target);
    return proxy;
}


/***/ }),

/***/ "./src/observer/scheduler.ts":
/*!***********************************!*\
  !*** ./src/observer/scheduler.ts ***!
  \***********************************/
/*! exports provided: queueWatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queueWatcher", function() { return queueWatcher; });
/**
 * scheduler.ts
 * The purpose is to run watcher queue in a fixed time.
 */
let hasQueue = new Set();
let queue = [];
let index = 0;
let flushing = false;
let waiting = true;
function resetQueue() {
    hasQueue = new Set();
    queue = [];
    index = 0;
    flushing = false;
    waiting = true;
}
function runQueue() {
    flushing = true;
    waiting = false;
    queue.sort((a, b) => a.id - b.id);
    queue.forEach((watcher, i) => {
        index = i;
        watcher.run();
    });
    resetQueue();
}
function queueWatcher(watcher) {
    if (hasQueue.has(watcher))
        return;
    hasQueue.add(watcher);
    if (!flushing) {
        queue.push(watcher);
    }
    else {
        let i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id)
            i--;
        queue.splice(i, 0, watcher);
    }
    if (waiting) {
        // use mircotask
        Promise.resolve().then(runQueue);
    }
}


/***/ }),

/***/ "./src/observer/store.ts":
/*!*******************************!*\
  !*** ./src/observer/store.ts ***!
  \*******************************/
/*! exports provided: proxyToRaw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxyToRaw", function() { return proxyToRaw; });
const proxyToRaw = new WeakMap();


/***/ }),

/***/ "./src/observer/watcher.ts":
/*!*********************************!*\
  !*** ./src/observer/watcher.ts ***!
  \*********************************/
/*! exports provided: Watcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Watcher", function() { return Watcher; });
/* harmony import */ var src_util_predict__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/util/predict */ "./src/util/predict.ts");
/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dep */ "./src/observer/dep.ts");
/* harmony import */ var _scheduler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scheduler */ "./src/observer/scheduler.ts");



let id = 0;
class Watcher {
    constructor(target, exp, fn) {
        this.id = id++;
        this.exp = exp;
        this.fn = fn;
        this.target = target;
        this.value = this.get();
    }
    get() {
        const { target, exp } = this;
        Object(_dep__WEBPACK_IMPORTED_MODULE_1__["pushTarget"])(this);
        let value = Reflect.get(target, exp);
        // value = transfer(value)
        Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isArray"])(value) && value.length;
        Object(_dep__WEBPACK_IMPORTED_MODULE_1__["popTarget"])();
        return value;
    }
    update(target) {
        Object(_scheduler__WEBPACK_IMPORTED_MODULE_2__["queueWatcher"])(this);
    }
    run() {
        const oldValue = this.value;
        const value = this.value = this.get();
        this.fn(oldValue, value);
    }
}
// function transfer (value) {
//   const target = proxyToRaw.has(value) ? proxyToRaw.get(value) : value
//   for(let i in target) {
//     target[i] = transfer(target[i])
//   }
//   return target
// }


/***/ }),

/***/ "./src/util/predict.ts":
/*!*****************************!*\
  !*** ./src/util/predict.ts ***!
  \*****************************/
/*! exports provided: isUndef, isDef, _toString, isObject, isPlainObject, isRegexp, isArray, isPrimitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndef", function() { return isUndef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDef", function() { return isDef; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_toString", function() { return _toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRegexp", function() { return isRegexp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
function isUndef(s) { return s === undefined; }
function isDef(s) { return s !== undefined; }
function _toString() {
    return Object.prototype.toString();
}
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
function isRegexp(reg) {
    return _toString.call(reg) === '[object RegExp]';
}
function isArray(arr) {
    return Array.isArray(arr);
}
function isPrimitive(value) {
    return (typeof value === 'string' ||
        typeof value === 'number' ||
        // $flow-disable-line
        typeof value === 'symbol' ||
        typeof value === 'boolean');
}


/***/ }),

/***/ "./src/vdom/create-element.ts":
/*!************************************!*\
  !*** ./src/vdom/create-element.ts ***!
  \************************************/
/*! exports provided: createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vnode */ "./src/vdom/vnode.ts");

/**
 *
 * @param sel
 * @param data
 * @param children
 * @return VNode
 */
function createElement(sel, data, children) {
    children.forEach((item, i) => {
        if (typeof item === 'string' || typeof item === 'number') {
            children[i] = Object(_vnode__WEBPACK_IMPORTED_MODULE_0__["default"])(undefined, undefined, undefined, item, null);
        }
    });
    return Object(_vnode__WEBPACK_IMPORTED_MODULE_0__["default"])(sel, data, children, undefined, null);
}


/***/ }),

/***/ "./src/vdom/htmldomapi.ts":
/*!********************************!*\
  !*** ./src/vdom/htmldomapi.ts ***!
  \********************************/
/*! exports provided: htmlDomApi, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlDomApi", function() { return htmlDomApi; });
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
const htmlDomApi = {
    createElement,
    createElementNS,
    createTextNode,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
};
/* harmony default export */ __webpack_exports__["default"] = (htmlDomApi);


/***/ }),

/***/ "./src/vdom/patch.ts":
/*!***************************!*\
  !*** ./src/vdom/patch.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return patch; });
/* harmony import */ var src_util_predict__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/util/predict */ "./src/util/predict.ts");
/* harmony import */ var _vnode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vnode */ "./src/vdom/vnode.ts");
/* harmony import */ var _htmldomapi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./htmldomapi */ "./src/vdom/htmldomapi.ts");



function sameVnode(vnode, oldVnode) {
    return vnode.sel === oldVnode.sel && vnode.key === oldVnode.key;
}
function createKeyToOldIdx(children, start, end) {
    children = children.slice(start, end);
    const map = new Map();
    children.forEach(item => {
        map[item.key] = item;
    });
    return map;
}
function emptyNodeAt(elm) {
    const id = elm.id ? "#" + elm.id : "";
    const className = elm.className ? "." + elm.className.split(" ").join(".") : "";
    const sel = elm.tagName.toLowerCase() + id + className;
    return Object(_vnode__WEBPACK_IMPORTED_MODULE_1__["default"])('', {}, [], undefined, elm);
}
function isVnode(vnode) {
    return Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(vnode.sel);
}
function removeVnodes(parentElm, children) {
    children.forEach(item => {
        _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].appendChild(parentElm, item.elm);
    });
}
function addVnodes(parentElm, children) {
    children.forEach(item => {
        _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].removeChild(parentElm, item.elm);
    });
}
function createElm(vnode) {
    let data = vnode.data;
    let children = vnode.children;
    let sel = vnode.sel;
    // element 元素
    if (sel !== undefined) {
        // Parse selector
        let hashIdx = sel.indexOf('#');
        let dotIdx = sel.indexOf('.', hashIdx);
        let hash = hashIdx > 0 ? hashIdx : sel.length;
        let dot = dotIdx > 0 ? dotIdx : sel.length;
        let tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
        // 创建一个 element 节点 并且赋予它 id class 属性
        let elm = vnode.elm = _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(tag);
        if (hash < dot) {
            elm.id = sel.slice(hash + 1, dot);
        }
        if (dotIdx > 0) {
            elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
        }
        if (Array.isArray(children)) {
            for (let i = 0; i < children.length; ++i) {
                let ch = children[i];
                if (ch != null) {
                    _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].appendChild(elm, createElm(ch));
                }
            }
        }
        else if (typeof vnode.text === 'string') {
            _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].appendChild(elm, _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].createTextNode(vnode.text));
        }
    }
    else { // 文本节点
        vnode.elm = _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].createTextNode(vnode.text);
    }
    return vnode.elm;
}
function updateChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
            patchVnode(oldStartVnode, newEndVnode);
            _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].insertBefore(parentElm, oldStartVnode.elm, _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
            patchVnode(oldEndVnode, newStartVnode);
            _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
            }
            idxInOld = oldKeyToIdx[newStartVnode.key];
            if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isUndef"])(idxInOld)) { // New elment
                _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                elmToMove = oldCh[idxInOld];
                if (elmToMove.sel !== newStartVnode.sel) {
                    _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm);
                }
                else {
                    patchVnode(elmToMove, newStartVnode);
                    oldCh[idxInOld] = undefined;
                    _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                }
                newStartVnode = newCh[++newStartIdx];
            }
        }
    }
}
function patchVnode(vnode, oldVnode) {
    const elm = vnode.elm = oldVnode.elm;
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    if (vnode === oldVnode)
        return;
    // vnode is textNode
    if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(vnode.text)) {
        _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].setTextContent(elm, vnode.text);
    }
    else {
        if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(oldCh) && Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(ch)) {
            updateChildren(elm, oldCh, ch);
        }
        else if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(oldCh)) {
            removeVnodes(elm, oldCh);
        }
        else if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(ch)) {
            addVnodes(elm, ch);
        }
        else if (Object(src_util_predict__WEBPACK_IMPORTED_MODULE_0__["isDef"])(oldVnode.text)) {
            _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].setTextContent(elm, '');
        }
    }
}
function patch(oldVnode, vnode) {
    if (!isVnode(oldVnode)) {
        oldVnode = emptyNodeAt(oldVnode);
    }
    if (sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode);
    }
    else {
        const parentElm = _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].parentNode(oldVnode.elm);
        createElm(vnode);
        _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].insertBefore(parentElm, vnode.elm, _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].nextSibling(oldVnode.elm));
        _htmldomapi__WEBPACK_IMPORTED_MODULE_2__["default"].removeChild(parentElm, oldVnode.elm);
    }
}


/***/ }),

/***/ "./src/vdom/vnode.ts":
/*!***************************!*\
  !*** ./src/vdom/vnode.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return toVnode; });
function toVnode(sel, data, children, text, elm) {
    const key = data && data.key;
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    };
}


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=bundle.js.map