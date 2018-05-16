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
                return target._data[key] || (target._computed[key] && target._computed[key]()) || target[key];
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
    initRender() { }
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
        setTimeout(runQueue, 0);
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


/***/ }),

/***/ "./src/util/predict.ts":
/*!*****************************!*\
  !*** ./src/util/predict.ts ***!
  \*****************************/
/*! exports provided: _toString, isObject, isPlainObject, isRegexp, isArray, isPrimitive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_toString", function() { return _toString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPlainObject", function() { return isPlainObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRegexp", function() { return isRegexp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPrimitive", function() { return isPrimitive; });
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


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=bundle.js.map