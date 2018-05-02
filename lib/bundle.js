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


class fakeVue {
    constructor(options) {
        this._data = options.data || {};
        this.initData();
        this.initRender();
    }
    initData() {
        this._data = Object(_observer_index__WEBPACK_IMPORTED_MODULE_0__["observe"])(this._data);
    }
    initRender() {
        new _observer_watcher__WEBPACK_IMPORTED_MODULE_1__["Watcher"](this._data, "a", val => {
            console.log("watcher", val);
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (fakeVue);


/***/ }),

/***/ "./src/observer/dep.ts":
/*!*****************************!*\
  !*** ./src/observer/dep.ts ***!
  \*****************************/
/*! exports provided: Dep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dep", function() { return Dep; });
class Dep {
    constructor() {
        this.subs = [];
    }
    // 收集依赖
    depend(watcher) {
        // console.log('depend')
        this.subs.push(watcher);
    }
    // 触发依赖
    notify(val) {
        // console.log('notify')
        this.subs.forEach(item => {
            item.fn(val);
        });
    }
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
/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ "./src/observer/dep.ts");

function observe(data) {
    return defineReactive(data);
}
function defineReactive(data) {
    const dep = new _dep__WEBPACK_IMPORTED_MODULE_0__["Dep"]();
    return new Proxy(data, {
        get(target, key) {
            // console.log(Dep.target)
            if (_dep__WEBPACK_IMPORTED_MODULE_0__["Dep"].target) {
                dep.depend(_dep__WEBPACK_IMPORTED_MODULE_0__["Dep"].target);
            }
            // 收集依赖
            return target[key];
        },
        set(target, key, value) {
            // console.log('set')
            // 触发依赖
            dep.notify(value);
            // 再次收集依赖
            target[key] = value;
            return true;
        }
    });
}


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
/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ "./src/observer/dep.ts");

class Watcher {
    constructor(target, exp, fn) {
        this.exp = exp;
        this.fn = fn;
        this.pushTarget();
        // console.log(target, exp, target[exp])
        this.value = target[exp];
    }
    pushTarget() {
        _dep__WEBPACK_IMPORTED_MODULE_0__["Dep"].target = this;
    }
    popTarget() {
        _dep__WEBPACK_IMPORTED_MODULE_0__["Dep"].target = null;
    }
}


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=bundle.js.map