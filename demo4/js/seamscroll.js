(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["seamscroll"] = factory();
	else
		root["seamscroll"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_create__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return __WEBPACK_IMPORTED_MODULE_0__content_create__["a"]; });
/**
 * @desc webpack????????????
 */





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__seamless__ = __webpack_require__(2);


var create = function create(options) {
	return new __WEBPACK_IMPORTED_MODULE_0__seamless__["a" /* default */](options);
};

/* harmony default export */ __webpack_exports__["a"] = (create);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__event__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getCss__ = __webpack_require__(6);
__webpack_require__(3)();
var copyObj = __webpack_require__(4);



var defaultOptions = {
	step: 0.8, //??????
	hoverStop: true, //??????????????????hover??????
	direction: 1, // 0 ?????? 1 ?????? 2?????? 3??????
	singleHeight: 0, //????????????????????????hoverStop??????
	singleWidth: 0, //????????????????????????hoverStop??????
	waitTime: 1000 //????????????????????????
};

var seamless = function seamless(options) {
	this.options = copyObj({}, defaultOptions, options);
	var dom = this.options.dom;
	if (!dom) throw new Error('you must set a dom');
	dom.style.position = 'relative';
	dom.style.overflow = 'hidden';
	this.reqFrame = null;
	this.singleWaitTime = null; // single ????????????????????????
	this._top = 0;
	this._left = 0;
	this.isHover = false; //_move()???????????????
	dom.innerHTML += dom.innerHTML;
	if (this.options.direction > 1) {
		//???????????????
		var child = dom.children,
		    childFirst = child[0],
		    len = child.length;
		this._width = (childFirst.offsetWidth + this._getInt(childFirst, 'margin-left') + this._getInt(childFirst, 'margin-right')) * len;
		dom.style.width = this._width + 'px';
	}
	this._move();
	this._bindEvent();
};

seamless.prototype = {
	_getInt: function _getInt(dom, name) {
		return parseInt(Object(__WEBPACK_IMPORTED_MODULE_1__getCss__["a" /* default */])(dom, name));
	},
	_cancle: function _cancle() {
		cancelAnimationFrame(this.reqFrame || '');
	},
	_bindEvent: function _bindEvent() {
		if (!this.options.hoverStop) return;
		var that = this;
		var dom = this.options.dom;
		Object(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* default */])(dom, 'mouseenter', function () {
			that.isHover = true; // ??????_move
			// ????????????????????????hover?????????????????? ?????????????????????
			if (that.singleWaitTime) clearTimeout(that.singleWaitTime);
			that._cancle();
		});
		Object(__WEBPACK_IMPORTED_MODULE_0__event__["a" /* default */])(dom, 'mouseleave', function () {
			that.isHover = false; // ??????_move
			that._move();
		});
	},
	
	_move: function _move() {
		if (this.isHover) return;
		this._cancle();
		var that = this;
		var dom = this.options.dom;
		this.reqFrame = requestAnimationFrame(function () {
			var h = dom.offsetHeight / 2; //????????????
			var direction = that.options.direction; //????????????
			if (direction === 1) {
				// ???
				if (Math.abs(that._top) >= h) that._top = 0;
				that._top -= that.options.step;
				dom.style.top = that._top + 'px';
			} else if (direction === 0) {
				// ???
				if (that._top >= 0) that._top = h * -1;
				that._top += that.options.step;
				dom.style.top = that._top + 'px';
			} else if (direction === 2) {
				// ???
				if (Math.abs(that._left) >= that._width / 2) that._left = 0;
				that._left -= that.options.step;
				dom.style.left = that._left + 'px';
			} else if (direction === 3) {
				// ???
				if (that._left >= 0) that._left = that._width / 2 * -1;
				that._left += that.options.step;
				dom.style.left = that._left + 'px';
			}
			that._judgeSingle();
		});
	},
	_judgeSingle: function _judgeSingle() {
		var _this = this;

		var singleH = this.options.singleHeight;
		var singleW = this.options.singleWidth;
		if (this.singleWaitTime) clearTimeout(this.singleWaitTime);
		if (!!singleH) {
			//?????????????????????????????????
			if (Math.abs(this._top) % singleH === 0) {
				// ??????????????????waitTime
				this.singleWaitTime = setTimeout(function () {
					_this._move();
				}, this.options.waitTime);
			} else {
				this._move();
			}
		} else if (!!singleW) {
			if (Math.abs(this._left) % singleW === 0) {
				// ??????????????????waitTime
				this.singleWaitTime = setTimeout(function () {
					_this._move();
				}, this.options.waitTime);
			} else {
				this._move();
			}
		} else {
			this._move();
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (seamless);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * @desc AnimationFrame????????????hack
 */
var animationFrame = function animationFrame() {
  window.cancelAnimationFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function (id) {
      return window.clearTimeout(id);
    };
  }();
  window.requestAnimationFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }();
};

module.exports = animationFrame;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

/**
 * @desc ??????????????????
 */
function copyObj() {
  if (!Array.isArray) {
    Array.isArray = function (arg) {
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
  }
  var name = void 0,
      options = void 0,
      src = void 0,
      copy = void 0,
      copyIsArray = void 0,
      clone = void 0,
      i = 1,
      target = arguments[0] || {},

  // ??????||?????????????????????????????????????????????false???????????????
  deep = false,
      len = arguments.length;
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i++;
  }
  if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && typeof target !== 'function') {
    target = {};
  }
  // ??????arguments.length === 1 ???typeof arguments[0] === 'boolean',?????????arguments[1]??????????????????target??????
  if (i === len) {
    return target;
  }
  for (; i < len; i++) {
    //???????????????????????????????????????Undefined???Null???????????????????????????????????????????????????????????????
    if ((options = arguments[i]) != null) {
      // ???????????????????????????????????????Boolean, Number for in??????????????????????????????for in??????// src????????????target??????????????????name??????
      for (name in options) {
        // src????????????target??????????????????name??????
        src = target[name];
        // ???????????????????????????????????????name??????
        copy = options[name];
        // ??????copy???????????????
        copyIsArray = Array.isArray(copy);
        // ?????????????????????copy?????????????????????????????????????????????copy????????????????????????????????????
        if (deep && copy && ((typeof copy === 'undefined' ? 'undefined' : _typeof(copy)) === 'object' || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false;
            // ????????????????????????name????????????????????????
            // ????????????????????????name??????????????????????????????????????????????????????
            clone = src && Array.isArray(src) ? src : [];
          } else {
            // ????????????????????????name????????????????????????????????????????????????name??????????????????????????????????????????????????????
            clone = src && (typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object' ? src : {};
          }
          // ??????????????????????????????copyObject??????
          // ????????????target????????????clone??????
          // copy??????????????????
          target[name] = copyObj(deep, clone, copy);
        } else if (copy !== undefined) {
          // ???????????????????????????target?????????
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

module.exports = copyObj;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var addEventListener = function addEventListener(element, type, callback) {
	if (element.addEventListener) {
		element.addEventListener(type, callback, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + type, callback);
	} else {
		element['on' + type] = callback;
	}
};

/* harmony default export */ __webpack_exports__["a"] = (addEventListener);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var getStyle = function getStyle(dom, name) {
	var elem = dom.currentStyle ? dom.currentStyle : window.getComputedStyle(dom, null);
	return elem[name];
};

/* harmony default export */ __webpack_exports__["a"] = (getStyle);

/***/ })
/******/ ]);
});