/*! imagemarker.js Copyright (C) 2019 Rui NI <ranqus@gmail.com> */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["svg"] = factory();
	else
		root["svg"] = factory();
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(34)('wks');
var uid = __webpack_require__(25);
var Symbol = __webpack_require__(0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var ctx = __webpack_require__(15);
var hide = __webpack_require__(9);
var has = __webpack_require__(10);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var IE8_DOM_DEFINE = __webpack_require__(45);
var toPrimitive = __webpack_require__(30);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var createDesc = __webpack_require__(24);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(88);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(68);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(91);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(93);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(105);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(109);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnexpectedTypeException = undefined;

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.assertType = assertType;
exports.assertObjectType = assertObjectType;
exports.isHTMLElement = isHTMLElement;
exports.filterDefault = filterDefault;

var _exception = __webpack_require__(40);

var _exception2 = _interopRequireDefault(_exception);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UnexpectedTypeException = exports.UnexpectedTypeException = function (_Exception) {
    (0, _inherits3.default)(UnexpectedTypeException, _Exception);

    function UnexpectedTypeException(givenType, expectedType) {
        (0, _classCallCheck3.default)(this, UnexpectedTypeException);
        return (0, _possibleConstructorReturn3.default)(this, (UnexpectedTypeException.__proto__ || (0, _getPrototypeOf2.default)(UnexpectedTypeException)).call(this, 'Expecting the type to be "' + expectedType + '", got "' + givenType + '" instead'));
    }

    return UnexpectedTypeException;
}(_exception2.default);

/**
 * Assert given type is the expected one
 *
 * @param given Given type
 * @param expected Expected type
 * @throws {UnexpectedTypeException} When the assertion is false
 *
 */


function assertType(given, expected) {
    if ((typeof given === 'undefined' ? 'undefined' : (0, _typeof3.default)(given)) === expected) {
        return;
    }

    throw new UnexpectedTypeException(typeof given === 'undefined' ? 'undefined' : (0, _typeof3.default)(given), expected);
}

/**
 * Assert given object is the expected type
 *
 * @param {Object} given Given type
 * @param {Object} expected Expected type
 * @throws {UnexpectedTypeException} When the assertion is false
 *
 */
function assertObjectType(given, expected) {
    if (given instanceof expected) {
        return;
    }

    throw new UnexpectedTypeException(typeof given === 'undefined' ? 'undefined' : (0, _typeof3.default)(given), expected);
}

/**
 * Test whether or not given object is a HTML element
 *
 * @param {Object} el Element
 * @returns {boolean} Whether or not it's a HTML element
 *
 */
function isHTMLElement(el) {
    return el && (el instanceof HTMLDocument || (typeof el === 'undefined' ? 'undefined' : (0, _typeof3.default)(el)) === 'object' && el.nodeType === 1);
}

/**
 * Merge the given value with the default value
 *
 * @param {Object} def Default value
 * @param {Object} val Given value
 * @returns {Object} Merged object
 * @throws {UnexpectedTypeException} When the data type in default value failed
 *                                   to match the one inside of the given one.
 *
 */
function filterDefault(def, val) {
    var obj = {};

    for (var i in def) {
        obj[i] = def[i];
    }

    for (var _i in val) {
        if (typeof obj[_i] !== 'undefined' && (0, _typeof3.default)(obj[_i]) !== (0, _typeof3.default)(val[_i])) {
            throw new UnexpectedTypeException((0, _typeof3.default)(val[_i]), (0, _typeof3.default)(obj[_i]));
        }

        if ((0, _typeof3.default)(obj[_i]) === 'object' && !(obj[_i] instanceof Array)) {
            obj[_i] = filterDefault(obj[_i], val[_i]);

            continue;
        }

        obj[_i] = val[_i];
    }

    return obj;
}

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(7);
var document = __webpack_require__(0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(7);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(4);
var dPs = __webpack_require__(67);
var enumBugKeys = __webpack_require__(35);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(29)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(49).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(47);
var enumBugKeys = __webpack_require__(35);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(34)('keys');
var uid = __webpack_require__(25);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(1);
var global = __webpack_require__(0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(14) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(23);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var LIBRARY = __webpack_require__(14);
var wksExt = __webpack_require__(37);
var defineProperty = __webpack_require__(6).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



/**
 * Base Exception
 *
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Exception = function () {
  /**
   * constructor
   *
   * @param {string} message The error message
   *
   */
  function Exception(message) {
    (0, _classCallCheck3.default)(this, Exception);

    this.message = message;
  }

  /**
   * Return the error message into a string
   *
   * @returns {string} The error message
   *
   */


  (0, _createClass3.default)(Exception, [{
    key: 'toString',
    value: function toString() {
      return '[ImageMarker] ' + this.message;
    }
  }]);
  return Exception;
}();

exports.default = Exception;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Stage = exports.Opened = exports.Drawn = exports.Background = exports.drawEllipse = exports.drawRect = exports.drawLine = exports.drawPath = exports.StageAlreadyOpened = exports.StageAlreadyComposing = undefined;

var _promise = __webpack_require__(62);

var _promise2 = _interopRequireDefault(_promise);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.defaultStageControl = defaultStageControl;

var _exception = __webpack_require__(40);

var _exception2 = _interopRequireDefault(_exception);

var _common = __webpack_require__(22);

var _userctl = __webpack_require__(61);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StageAlreadyComposing = exports.StageAlreadyComposing = function (_Exception) {
    (0, _inherits3.default)(StageAlreadyComposing, _Exception);

    function StageAlreadyComposing() {
        (0, _classCallCheck3.default)(this, StageAlreadyComposing);
        return (0, _possibleConstructorReturn3.default)(this, (StageAlreadyComposing.__proto__ || (0, _getPrototypeOf2.default)(StageAlreadyComposing)).call(this, 'Cannot start new compose before current one is finished'));
    }

    return StageAlreadyComposing;
}(_exception2.default);

var StageAlreadyOpened = exports.StageAlreadyOpened = function (_Exception2) {
    (0, _inherits3.default)(StageAlreadyOpened, _Exception2);

    function StageAlreadyOpened() {
        (0, _classCallCheck3.default)(this, StageAlreadyOpened);
        return (0, _possibleConstructorReturn3.default)(this, (StageAlreadyOpened.__proto__ || (0, _getPrototypeOf2.default)(StageAlreadyOpened)).call(this, 'Stage already been opened, cannot open another one'));
    }

    return StageAlreadyOpened;
}(_exception2.default);

var maxZoomRate = 3.0;
var minZoomRate = 0.3;

var drawPath = exports.drawPath = 1;
var drawLine = exports.drawLine = 2;
var drawRect = exports.drawRect = 3;
var drawEllipse = exports.drawEllipse = 4;

/**
 * Background object
 *
 */

var Background = exports.Background = function () {
    /**
     * constructor
     *
     * @param {string}      url         URL address of the background image
     * @param {number}      width       Width of the image in px
     * @param {number}      height      Height of the image in px
     *
     */
    function Background(url, width, height) {
        (0, _classCallCheck3.default)(this, Background);

        (0, _common.assertType)(url, 'string');
        (0, _common.assertType)(width, 'number');
        (0, _common.assertType)(height, 'number');

        this.url = url;
        this.w = width;
        this.h = height;
    }

    /**
     * Return the URL
     *
     * @returns {string}
     *
     */


    (0, _createClass3.default)(Background, [{
        key: 'URL',
        value: function URL() {
            return this.url;
        }

        /**
         * Return the width of the background image
         *
         * @returns {number}
         *
         */

    }, {
        key: 'width',
        value: function width() {
            return this.w;
        }

        /**
         * Return the height of the background image
         *
         * @returns {number}
         *
         */

    }, {
        key: 'height',
        value: function height() {
            return this.h;
        }

        /**
         * Return the ratio of the background image
         *
         * @returns {number}
         *
         */

    }, {
        key: 'ratio',
        value: function ratio() {
            return this.w / this.h;
        }

        /**
         * Return the zoom level according to the given target width and height
         *
         * @param {number} targetWidth Target width
         * @param {number} targetHeight Target height
         * @returns {number} The zoom level
         *
         */

    }, {
        key: 'zoom',
        value: function zoom(targetWidth, targetHeight) {
            var zoomWidth = this.width() / targetWidth,
                zoomHeight = this.height() / targetHeight;

            return zoomWidth < zoomHeight ? {
                fit: zoomHeight,
                fill: zoomWidth
            } : {
                fit: zoomWidth,
                fill: zoomHeight
            };
        }

        /**
         * Return whether or not given target width and height can be zoomed to
         *
         * @param {number} toWidth Target width
         * @param {number} toHeight Target height
         * @returns {boolean} Whether or not zoomable
         *
         */

    }, {
        key: 'zoomable',
        value: function zoomable(toWidth, toHeight) {
            if (toWidth > this.width() * maxZoomRate || toWidth < this.width() * minZoomRate) {
                return false;
            }

            if (toHeight > this.height() * maxZoomRate || toHeight < this.height() * minZoomRate) {
                return false;
            }

            return true;
        }
    }]);
    return Background;
}();

/**
 * Creating a default user controls of the stage
 *
 * @returns {Object} User controls
 *
 */


function defaultStageControl() {
    var initialX = 0,
        initialY = 0;
    var controlKeyEnabled = false;

    return {
        'mousedown': function mousedown(e, d, n) {
            if (!e.ctrlKey) {
                return new _userctl.HandlerResult(null, true);
            }

            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            controlKeyEnabled = true;

            return new _userctl.HandlerResult(null, false);
        },
        'mouseup': function mouseup(e, d, n) {
            if (!controlKeyEnabled) {
                return new _userctl.HandlerResult(null, true);
            }

            e.preventDefault();

            controlKeyEnabled = false;

            return new _userctl.HandlerResult(null, false);
        },
        'mousemove': function mousemove(e, d, n) {
            if (!controlKeyEnabled) {
                return new _userctl.HandlerResult(null, true);
            }

            if (!e.ctrlKey) {
                initialX = e.clientX;
                initialY = e.clientY;
                controlKeyEnabled = false;
                e.preventDefault();

                return new _userctl.HandlerResult(null, true);
            }

            e.preventDefault();
            n.zoom(initialX, initialY, initialX - e.clientX, initialY - e.clientY, 0);

            initialX = e.clientX;
            initialY = e.clientY;

            return new _userctl.HandlerResult(null, false);
        },
        'wheel': function wheel(e, d, n) {
            if (!e.ctrlKey) {
                return new _userctl.HandlerResult(null, true);
            }

            e.preventDefault();
            var zoomDistance = 0;

            if (e.deltaY < 0) {
                zoomDistance = 50;
            } else if (e.deltaY > 0) {
                zoomDistance = -50;
            }

            n.zoom(e.clientX, e.clientY, 0, 0, zoomDistance);

            return new _userctl.HandlerResult(null, false);
        }
    };
}

/**
 * Drawn element on the stage
 *
 */

var Drawn = exports.Drawn = function () {
    /**
     * constructor
     *
     * @param {Object} drawn Drawn object
     *
     */
    function Drawn(drawn) {
        (0, _classCallCheck3.default)(this, Drawn);

        this.drawn = drawn;
    }

    /**
     * Return the raw element of current drawn object
     *
     * @returns {Object}
     *
     */


    (0, _createClass3.default)(Drawn, [{
        key: 'element',
        value: function element() {
            return this.drawn.element();
        }

        /**
         * Remove current element from the stage
         *
         */

    }, {
        key: 'remove',
        value: function remove() {
            this.drawn.remove();
        }

        /**
         * Set the properties of current drawn object. Actual effect depends on
         * the stage driver
         *
         * @param {Object} properties New properties
         *
         */

    }, {
        key: 'set',
        value: function set(properties) {
            this.drawn.set(properties);
        }

        /**
         * Return the dimension of current drawn object
         *
         * @returns {Object}
         *
         */

    }, {
        key: 'dimension',
        value: function dimension() {
            var dim = this.drawn.dimension();

            return {
                x: dim.x,
                y: dim.y,
                width: dim.width,
                height: dim.height
            };
        }

        /**
         * Export the data of current drawn object
         *
         * @returns {Object}
         *
         */

    }, {
        key: 'data',
        value: function data() {
            return {
                type: this.drawn.type(),
                data: this.drawn.data()
            };
        }
    }]);
    return Drawn;
}();

/**
 * Represents an opened stage
 *
 */


var Opened = exports.Opened = function () {
    /**
     * constructor
     *
     * @param {Stage} stage Stage object
     * @param {Object} controls User control builder
     * @param {Events} events Events manager
     *
     */
    function Opened(stage, controls, events) {
        (0, _classCallCheck3.default)(this, Opened);

        this.stage = stage;
        this.ctl = new _userctl.UserCtl(this.stage.element(), events);
        this.controls = controls;
        this.drawing = false;
        this.events = events;

        this.ctl.listens(this.controls, this);
    }

    /**
     * Reset current opened stage to it's initial configuation
     *
     */


    (0, _createClass3.default)(Opened, [{
        key: 'reset',
        value: function reset() {
            this.stage.driver.reset();
        }

        /**
         * Zoom the stage
         *
         * @param {number} screenCenterX X coordinate of the center view point
         * @param {number} screenCenterY Y coordinate of the center view point
         * @param {number} panXOffset X pan offset
         * @param {number} panYOffset Y pan offset
         * @param {number} zoomShift Zoom offset
         *
         */

    }, {
        key: 'zoom',
        value: function zoom(screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift) {
            this.stage.driver.zoom(screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift);
        }

        /**
         * Insert a drawing
         *
         * @param {string} composeType Drawing type
         * @param {Object} properties Properties
         * @param {Object} data Drawing data
         * @return {Drawn} Drawn object
         *
         */

    }, {
        key: 'insert',
        value: function insert(composeType, properties, data) {
            return new Drawn(this.stage.driver.insert(composeType, properties, data));
        }

        /**
         * Compose a drawing
         *
         * @param {Object} properties Properties
         * @param {Object} drawingControl User drawning control
         * @param {string} composeType Drawing type
         * @return {Promise<Drawn>} Drawn object
         * @throws {StageAlreadyComposing} When the stage already at composing
         *                                 status
         *
         */

    }, {
        key: 'compose',
        value: function compose(properties, drawingControl, composeType) {
            var _this3 = this;

            var self = this;

            if (this.drawing) {
                throw new StageAlreadyComposing();
            }

            (0, _common.assertType)(properties, 'object');
            (0, _common.assertType)(drawingControl, 'function');

            this.drawing = true;

            return new _promise2.default(function (resolve, reject) {
                var promised = false,
                    isPromised = function isPromised() {
                    if (promised) {
                        return true;
                    }

                    promised = true;

                    return false;
                },
                    myResolve = function myResolve(d) {
                    if (isPromised()) {
                        return;
                    }

                    if (!_this3.drawing) {
                        d.remove();
                    }

                    _this3.drawing = false;

                    var dd = new Drawn(d);

                    _this3.events.fire('stage.compose.completed', dd);

                    return resolve(dd);
                },
                    myReject = function myReject(e) {
                    if (isPromised()) {
                        return;
                    }

                    _this3.drawing = false;

                    _this3.events.fire('stage.compose.failed', e);

                    return reject(e);
                };

                try {
                    _this3.events.fire('stage.compose', null);

                    _this3.stage.driver.compose(myResolve, myReject, _this3.ctl, properties, drawingControl, composeType);
                } catch (e) {
                    myReject(e);
                }
            });
        }

        /**
         * Close current stage
         *
         */

    }, {
        key: 'close',
        value: function close() {
            this.ctl.removes(this.controls);
            this.drawing = false;

            this.stage.opened = null;
            this.stage.clear();

            this.events.fire('stage.closed', this.opened);
        }
    }]);
    return Opened;
}();

/**
 * Stage control
 *
 */


var Stage = exports.Stage = function () {
    /**
     * constructor
     *
     * @param {Object} driver Stage driver
     * @param {Events} events Event manager
     *
     */
    function Stage(driver, events) {
        (0, _classCallCheck3.default)(this, Stage);

        this.driver = driver;
        this.events = events;
        this.opened = null;
    }

    /**
     * Return current stage element
     *
     * @returns {Object}
     *
     */


    (0, _createClass3.default)(Stage, [{
        key: 'element',
        value: function element() {
            return this.driver.element();
        }

        /**
         * Open a new stage
         *
         * @param {Background} background Stage background
         * @param {function} onSuccess Successful callback
         * @param {function} onFail Failure callback
         * @param {Object} controls User controls
         * @param {boolean} waitLoad Whether or not to wait until the background is
         *                           loaded
         * @throws {StageAlreadyOpened} When the stage already been opened
         *
         */

    }, {
        key: 'open',
        value: function open(background, onSuccess, onFail, controls, waitLoad) {
            var _this4 = this;

            if (this.opened) {
                throw new StageAlreadyOpened();
            }

            this.opened = new Opened(this, controls, this.events);

            this.driver.background(background, function () {
                onSuccess(_this4.opened);

                _this4.events.fire('stage.open.successful', _this4.opened);
            }, function (e) {
                _this4.opened = null;

                onFail(e);

                _this4.events.fire('stage.open.failed', e);
            }, waitLoad);
        }

        /**
         * Clear current stage
         *
         */

    }, {
        key: 'clear',
        value: function clear() {
            if (this.opened) {
                this.opened.close();
                this.opened = null;
            }

            this.driver.clear();
        }

        /**
         * Destroy current stage
         *
         */

    }, {
        key: 'teardown',
        value: function teardown() {
            this.clear();
            this.driver.teardown();
        }

        /**
         * Re-adjust current stage
         *
         */

    }, {
        key: 'refit',
        value: function refit() {
            this.driver.refit();
        }
    }]);
    return Stage;
}();

/***/ }),
/* 42 */
/***/ (function(module, exports) {



/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(65)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(44)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(14);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(46);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(17);
var $iterCreate = __webpack_require__(66);
var setToStringTag = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(50);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(16)(function () {
  return Object.defineProperty(__webpack_require__(29)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(12);
var arrayIndexOf = __webpack_require__(69)(false);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(27);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(51);
var IE_PROTO = __webpack_require__(33)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
var global = __webpack_require__(0);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(17);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(23);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var invoke = __webpack_require__(80);
var html = __webpack_require__(49);
var cel = __webpack_require__(29);
var global = __webpack_require__(0);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(18)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var newPromiseCapability = __webpack_require__(36);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(47);
var hiddenKeys = __webpack_require__(35).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(39);
var createDesc = __webpack_require__(24);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(30);
var has = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(45);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(8) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UserCtl = exports.HandlerResult = undefined;

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _common = __webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handler result
 *
 */
var HandlerResult = exports.HandlerResult = function HandlerResult(context, continueNext) {
    (0, _classCallCheck3.default)(this, HandlerResult);

    this.context = context;
    this.continue = continueNext;
};

/**
 * User control manager
 *
 */


var UserCtl = exports.UserCtl = function () {
    /**
     * constructor
     *
     * @param {Object} rootElement The root element which the control handler
     *                              will be binded to
     * @param {Events} events Event manager
     *
     */
    function UserCtl(rootElement, events) {
        (0, _classCallCheck3.default)(this, UserCtl);

        this.el = rootElement;
        this.events = events;
        this.listeners = {};
    }

    /**
     * Listen to the given UI control listener set
     *
     * @param {Object} listeners Listeners set
     * @param {Object} data Context data which will be delievered to control
     *                      listeners when control event is fired
     *
     */


    (0, _createClass3.default)(UserCtl, [{
        key: 'listens',
        value: function listens(listeners, data) {
            var _this = this;

            var self = this;

            var _loop = function _loop(k) {
                if (typeof listeners[k] !== 'function') {
                    return 'continue';
                }

                if (k.indexOf('_') === 0) {
                    return 'continue';
                }

                if ((0, _typeof3.default)(_this.listeners[k]) !== 'object') {
                    _this.listeners[k] = {
                        handler: function handler(e) {
                            _this.events.fire('control.firing', k);

                            var lastContext = undefined;

                            for (var i in self.listeners[k].listeners) {
                                var r = self.listeners[k].listeners[i].handler(e, lastContext, self.listeners[k].listeners[i].data);

                                (0, _common.assertObjectType)(r, HandlerResult);

                                if (!r.continue) {
                                    _this.events.fire('control.fired', k);

                                    return;
                                }

                                lastContext = r.context;
                            }

                            _this.events.fire('control.fired', k);
                        },
                        listeners: []
                    };

                    _this.el.addEventListener(k, _this.listeners[k].handler);
                }

                _this.listeners[k].listeners.push({
                    handler: listeners[k],
                    data: data
                });
            };

            for (var k in listeners) {
                var _ret = _loop(k);

                if (_ret === 'continue') continue;
            }
        }

        /**
         * Remove UI control listener set
         *
         * @param {Object} listeners Listeners set
         *
         */

    }, {
        key: 'removes',
        value: function removes(listeners) {
            var self = this;

            for (var k in listeners) {
                if (typeof listeners[k] !== 'function') {
                    continue;
                }

                if (k.indexOf('_') === 0) {
                    continue;
                }

                if ((0, _typeof3.default)(this.listeners[k]) !== 'object') {
                    continue;
                }

                for (var i in this.listeners[k].listeners) {
                    if (this.listeners[k].listeners[i].handler !== listeners[k]) {
                        continue;
                    }

                    this.listeners[k].listeners.splice(i, 1);
                    break;
                }

                if (this.listeners[k].listeners.length > 0) {
                    continue;
                }

                this.el.removeEventListener(k, this.listeners[k].handler);
                delete this.listeners[k];
            }
        }

        /**
         * Destroy current user control manager
         *
         */

    }, {
        key: 'teardown',
        value: function teardown() {
            for (var k in this.listeners) {
                this.el.removeEventListener(k, this.listeners[k].handler);
            }

            this.listeners = {};
        }
    }]);
    return UserCtl;
}();

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Composer = undefined;

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Composer = exports.Composer = function () {
    function Composer(svg) {
        (0, _classCallCheck3.default)(this, Composer);

        this.svg = svg;
        this.plots = [];
        this.path = null;
    }

    (0, _createClass3.default)(Composer, [{
        key: 'element',
        value: function element() {
            return this.path;
        }
    }, {
        key: 'set',
        value: function set(properities) {
            if (!this.path) {
                return;
            }

            return this.svg.setElement(this.path, properities);
        }
    }, {
        key: 'setPathElement',
        value: function setPathElement(el) {
            this.path = el;
        }
    }, {
        key: 'hasPathElement',
        value: function hasPathElement() {
            return !!this.path;
        }
    }, {
        key: 'convertPos',
        value: function convertPos(x, y) {
            x *= this.svg.zoomLevel;
            y *= this.svg.zoomLevel;
            x += this.svg.panX;
            y += this.svg.panY;

            return { x: x, y: y };
        }
    }, {
        key: 'dimension',
        value: function dimension() {
            if (this.plots.length <= 0) {
                return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
            }

            var rect = this.svg.rect(),
                maxX = this.plots[0].x,
                maxY = this.plots[0].y,
                minX = this.plots[0].x,
                minY = this.plots[0].y;

            for (var p = 1; p < this.plots.length; p++) {
                if (this.plots[p].x > maxX) {
                    maxX = this.plots[p].x;
                }

                if (this.plots[p].y > maxY) {
                    maxY = this.plots[p].y;
                }

                if (this.plots[p].x < minX) {
                    minX = this.plots[p].x;
                }

                if (this.plots[p].y < minY) {
                    minY = this.plots[p].y;
                }
            }

            return {
                x: rect.x + (minX - this.svg.panX) / this.svg.zoomLevel,
                y: rect.y + (minY - this.svg.panY) / this.svg.zoomLevel,
                width: (maxX - minX) / this.svg.zoomLevel,
                height: (maxY - minY) / this.svg.zoomLevel
            };
        }
    }, {
        key: 'data',
        value: function data() {
            return this.plots;
        }
    }, {
        key: 'remove',
        value: function remove() {
            if (!this.path) {
                return;
            }

            return this.svg.removeDrawing(this.path);
        }
    }]);
    return Composer;
}();

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
__webpack_require__(43);
__webpack_require__(52);
__webpack_require__(74);
__webpack_require__(86);
__webpack_require__(87);
module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(31);
var descriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(26);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(6);
var anObject = __webpack_require__(4);
var getKeys = __webpack_require__(32);

module.exports = __webpack_require__(8) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12);
var toLength = __webpack_require__(48);
var toAbsoluteIndex = __webpack_require__(70);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(27);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(72);
var step = __webpack_require__(73);
var Iterators = __webpack_require__(17);
var toIObject = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(44)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(14);
var global = __webpack_require__(0);
var ctx = __webpack_require__(15);
var classof = __webpack_require__(53);
var $export = __webpack_require__(3);
var isObject = __webpack_require__(7);
var aFunction = __webpack_require__(23);
var anInstance = __webpack_require__(75);
var forOf = __webpack_require__(76);
var speciesConstructor = __webpack_require__(54);
var task = __webpack_require__(55).set;
var microtask = __webpack_require__(81)();
var newPromiseCapabilityModule = __webpack_require__(36);
var perform = __webpack_require__(56);
var userAgent = __webpack_require__(82);
var promiseResolve = __webpack_require__(57);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(83)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(26)($Promise, PROMISE);
__webpack_require__(84)(PROMISE);
Wrapper = __webpack_require__(1)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(85)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(15);
var call = __webpack_require__(77);
var isArrayIter = __webpack_require__(78);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(48);
var getIterFn = __webpack_require__(79);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(4);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(17);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(53);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(17);
module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var macrotask = __webpack_require__(55).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(18)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(0);
var core = __webpack_require__(1);
var dP = __webpack_require__(6);
var DESCRIPTORS = __webpack_require__(8);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3);
var core = __webpack_require__(1);
var global = __webpack_require__(0);
var speciesConstructor = __webpack_require__(54);
var promiseResolve = __webpack_require__(57);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3);
var newPromiseCapability = __webpack_require__(36);
var perform = __webpack_require__(56);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
var $Object = __webpack_require__(1).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(6).f });


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(92), __esModule: true };

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
__webpack_require__(52);
module.exports = __webpack_require__(37).f('iterator');


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
__webpack_require__(42);
__webpack_require__(100);
__webpack_require__(101);
module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(0);
var has = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(8);
var $export = __webpack_require__(3);
var redefine = __webpack_require__(46);
var META = __webpack_require__(96).KEY;
var $fails = __webpack_require__(16);
var shared = __webpack_require__(34);
var setToStringTag = __webpack_require__(26);
var uid = __webpack_require__(25);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(37);
var wksDefine = __webpack_require__(38);
var enumKeys = __webpack_require__(97);
var isArray = __webpack_require__(98);
var anObject = __webpack_require__(4);
var isObject = __webpack_require__(7);
var toIObject = __webpack_require__(12);
var toPrimitive = __webpack_require__(30);
var createDesc = __webpack_require__(24);
var _create = __webpack_require__(31);
var gOPNExt = __webpack_require__(99);
var $GOPD = __webpack_require__(60);
var $DP = __webpack_require__(6);
var $keys = __webpack_require__(32);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(59).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(39).f = $propertyIsEnumerable;
  __webpack_require__(58).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(14)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(25)('meta');
var isObject = __webpack_require__(7);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(6).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(16)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(32);
var gOPS = __webpack_require__(58);
var pIE = __webpack_require__(39);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12);
var gOPN = __webpack_require__(59).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('asyncIterator');


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('observable');


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(1).Object.getPrototypeOf;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(51);
var $getPrototypeOf = __webpack_require__(50);

__webpack_require__(104)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3);
var core = __webpack_require__(1);
var fails = __webpack_require__(16);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(107);
module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(108).set });


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(7);
var anObject = __webpack_require__(4);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(15)(Function.call, __webpack_require__(60).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(110), __esModule: true };

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(111);
var $Object = __webpack_require__(1).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(31) });


/***/ }),
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SVG = exports.UnsupportedComposeTypeException = exports.CannotStartNewDrawWhileDrawing = exports.ElementCreationFailedException = exports.MissingSVGRootElementException = exports.ParentElementMustBeAHTMLElement = exports.ParentElementNotFoundException = exports.UnsupportedException = exports.UnsupportMessage = exports.XMLNGLink = exports.XMLNS = exports.XMLNG = exports.Version = exports.Feature = undefined;

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _typeof2 = __webpack_require__(13);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.defaultDrawingControl = defaultDrawingControl;

var _exception = __webpack_require__(40);

var _exception2 = _interopRequireDefault(_exception);

var _common = __webpack_require__(22);

var _stage = __webpack_require__(41);

var _userctl = __webpack_require__(61);

var _composer_path = __webpack_require__(116);

var _composer_line = __webpack_require__(117);

var _composer_rect = __webpack_require__(118);

var _composer_ellipse = __webpack_require__(119);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feature = exports.Feature = 'http://www.w3.org/TR/SVG11/feature#Image';
var Version = exports.Version = '1.1';
var XMLNG = exports.XMLNG = 'http://www.w3.org/2000/svg';
var XMLNS = exports.XMLNS = 'http://www.w3.org/2000/xmlns/';
var XMLNGLink = exports.XMLNGLink = 'http://www.w3.org/1999/xlink';
var UnsupportMessage = exports.UnsupportMessage = 'This image is unsupported by your browser';

function isSupported() {
    return window.document.implementation.hasFeature(Feature, Version);
}

var UnsupportedException = exports.UnsupportedException = function (_Exception) {
    (0, _inherits3.default)(UnsupportedException, _Exception);

    function UnsupportedException() {
        (0, _classCallCheck3.default)(this, UnsupportedException);
        return (0, _possibleConstructorReturn3.default)(this, (UnsupportedException.__proto__ || (0, _getPrototypeOf2.default)(UnsupportedException)).call(this, 'SVG is unsupported in current context'));
    }

    return UnsupportedException;
}(_exception2.default);

var ParentElementNotFoundException = exports.ParentElementNotFoundException = function (_Exception2) {
    (0, _inherits3.default)(ParentElementNotFoundException, _Exception2);

    function ParentElementNotFoundException(id) {
        (0, _classCallCheck3.default)(this, ParentElementNotFoundException);
        return (0, _possibleConstructorReturn3.default)(this, (ParentElementNotFoundException.__proto__ || (0, _getPrototypeOf2.default)(ParentElementNotFoundException)).call(this, 'Parent Element "' + id + '" was not found in the context'));
    }

    return ParentElementNotFoundException;
}(_exception2.default);

var ParentElementMustBeAHTMLElement = exports.ParentElementMustBeAHTMLElement = function (_Exception3) {
    (0, _inherits3.default)(ParentElementMustBeAHTMLElement, _Exception3);

    function ParentElementMustBeAHTMLElement(id, el) {
        (0, _classCallCheck3.default)(this, ParentElementMustBeAHTMLElement);
        return (0, _possibleConstructorReturn3.default)(this, (ParentElementMustBeAHTMLElement.__proto__ || (0, _getPrototypeOf2.default)(ParentElementMustBeAHTMLElement)).call(this, 'Parent Element "' + id + '" is a "' + (typeof el === 'undefined' ? 'undefined' : (0, _typeof3.default)(el)) + '" rather ' + 'than expected HTMLDOMElement'));
    }

    return ParentElementMustBeAHTMLElement;
}(_exception2.default);

var MissingSVGRootElementException = exports.MissingSVGRootElementException = function (_Exception4) {
    (0, _inherits3.default)(MissingSVGRootElementException, _Exception4);

    function MissingSVGRootElementException(id) {
        (0, _classCallCheck3.default)(this, MissingSVGRootElementException);
        return (0, _possibleConstructorReturn3.default)(this, (MissingSVGRootElementException.__proto__ || (0, _getPrototypeOf2.default)(MissingSVGRootElementException)).call(this, 'Missing SVG Root element in current context'));
    }

    return MissingSVGRootElementException;
}(_exception2.default);

var ElementCreationFailedException = exports.ElementCreationFailedException = function (_Exception5) {
    (0, _inherits3.default)(ElementCreationFailedException, _Exception5);

    function ElementCreationFailedException(tagname) {
        (0, _classCallCheck3.default)(this, ElementCreationFailedException);
        return (0, _possibleConstructorReturn3.default)(this, (ElementCreationFailedException.__proto__ || (0, _getPrototypeOf2.default)(ElementCreationFailedException)).call(this, 'Failed to create "' + tagname + '" SVG element'));
    }

    return ElementCreationFailedException;
}(_exception2.default);

var CannotStartNewDrawWhileDrawing = exports.CannotStartNewDrawWhileDrawing = function (_Exception6) {
    (0, _inherits3.default)(CannotStartNewDrawWhileDrawing, _Exception6);

    function CannotStartNewDrawWhileDrawing() {
        (0, _classCallCheck3.default)(this, CannotStartNewDrawWhileDrawing);
        return (0, _possibleConstructorReturn3.default)(this, (CannotStartNewDrawWhileDrawing.__proto__ || (0, _getPrototypeOf2.default)(CannotStartNewDrawWhileDrawing)).call(this, 'Cannot start a new draw while drawing'));
    }

    return CannotStartNewDrawWhileDrawing;
}(_exception2.default);

var UnsupportedComposeTypeException = exports.UnsupportedComposeTypeException = function (_Exception7) {
    (0, _inherits3.default)(UnsupportedComposeTypeException, _Exception7);

    function UnsupportedComposeTypeException(t) {
        (0, _classCallCheck3.default)(this, UnsupportedComposeTypeException);
        return (0, _possibleConstructorReturn3.default)(this, (UnsupportedComposeTypeException.__proto__ || (0, _getPrototypeOf2.default)(UnsupportedComposeTypeException)).call(this, 'Unsupported Compose Type: ' + t));
    }

    return UnsupportedComposeTypeException;
}(_exception2.default);

var Background = function () {
    function Background(svg, background, resolve, reject, waitLoad) {
        var _this8 = this;

        (0, _classCallCheck3.default)(this, Background);

        this.element = svg.newElement('image', {
            'xlink:href': background.URL(),
            'x': 0,
            'y': 0,
            'height': background.height() + 'px',
            'width': background.width() + 'px',
            'pointer-events': 'none'
        });

        if (waitLoad) {
            this.element.addEventListener('load', function (e) {
                resolve(_this8);
            });

            this.element.addEventListener('error', function (e) {
                reject(e);
            });
        } else {
            resolve(this);
        }

        this.background = background;
        this.svg = svg;

        this.reset();
    }

    (0, _createClass3.default)(Background, [{
        key: 'reset',
        value: function reset() {
            var sRect = this.svg.rect(),
                z = this.background.zoom(sRect.width, sRect.height).fit;

            if (z < 1 || !this.background.zoomable(sRect.width, sRect.height)) {
                z = 1;
            }

            var x = -((sRect.width - this.background.width() / z) / 2) * z,
                y = -((sRect.height - this.background.height() / z) / 2) * z;

            var widthDiff = sRect.width - this.background.width() * z,
                heightDiff = sRect.height - this.background.height() * z;

            this.svg.panTo(x, y, z);
        }
    }, {
        key: 'width',
        value: function width() {
            return this.background.width();
        }
    }, {
        key: 'height',
        value: function height() {
            return this.background.height();
        }
    }, {
        key: 'zoom',
        value: function zoom(width, height) {
            return this.background.zoom(width, height);
        }
    }, {
        key: 'zoomable',
        value: function zoomable(toWidth, toHeight) {
            return this.background.zoomable(toWidth, toHeight);
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.element.parentNode.removeChild(this.element);
            this.svg.resetZoom(true);
        }
    }]);
    return Background;
}();

function defaultDrawingControl() {
    function getMousePosition(e, compose) {
        var rect = compose.svg.rect();

        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    return {
        'mousedown': function mousedown(e, d, n) {
            var pt = getMousePosition(e, n);

            n.start(pt.x, pt.y);

            return new _userctl.HandlerResult(d, true);
        },
        'mouseup': function mouseup(e, d, n) {
            var pt = getMousePosition(e, n);

            n.done(pt.x, pt.y);

            return new _userctl.HandlerResult(d, true);
        },
        'mousemove': function mousemove(e, d, n) {
            var pt = getMousePosition(e, n);

            n.draw(pt.x, pt.y);

            return new _userctl.HandlerResult(d, true);
        }
    };
}

// Here is the test about why preserveAspectRatio == none
// https://codepen.io/pen/pBNmdx
// In short: We would like to zoom in and out the svg as a normal image
//           instead of using it's own zoom methods.
//           Also because of this, we need to manually maintain the aspect
//           ratio when the SVG element is resized.
var containerProperties = {
    'xmlns:xlink': XMLNGLink,
    'version': Version,
    'width': 0, // main width
    'height': 0, // main height
    'viewBox': '0 0 0 0', // zoom control
    'style': 'margin: 0; padding: 0; display: block',
    'preserveAspectRatio': 'none'
};

function buildPathElementProperties(initialData, config) {
    var ppt = (0, _common.filterDefault)({
        'stroke': 'black',
        'stroke-width': 3,
        'fill': 'none',
        'd': initialData
    }, config);

    ppt['d'] = initialData;

    return ppt;
}

var SVG = function () {
    function SVG(id) {
        (0, _classCallCheck3.default)(this, SVG);

        if (!isSupported()) {
            throw new UnsupportedException();
        }

        // this.parent must be a HTML DOM object
        this.parent = document.getElementById(id);

        if (!this.parent) {
            throw new ParentElementNotFoundException(id);
        }

        if (!(0, _common.isHTMLElement)(this.parent)) {
            throw new ParentElementMustBeAHTMLElement(id, this.parent);
        }

        this.zoomLevel = 1;
        this.panX = 0;
        this.panY = 0;
        this.parentRect = {};

        this.container = this.newElement('svg', containerProperties);
        this.message = document.createTextNode(UnsupportMessage);
        this.target = this.newElement('g', {});

        this.container.appendChild(this.target);
        this.container.appendChild(this.message);
        this.parent.appendChild(this.container);

        this.picture = null;
        this.drawings = [];

        this.fitResync(function (parentRect) {
            return true;
        });
    }

    (0, _createClass3.default)(SVG, [{
        key: 'teardown',
        value: function teardown() {
            this.clear();

            this.target.parentNode.removeChild(this.target);
            this.message.parentNode.removeChild(this.message);

            this.container.parentNode.removeChild(this.container);

            this.picture = null;
            this.target = null;
            this.message = null;
            this.container = null;
            this.parent = null;
        }
    }, {
        key: 'element',
        value: function element() {
            return this.container;
        }
    }, {
        key: 'clear',
        value: function clear() {
            if (this.picture) {
                this.picture.remove();
                this.picture = null;
            }

            for (var e in this.drawings) {
                this.target.removeChild(this.drawings[e]);
            }

            this.drawings = [];
        }
    }, {
        key: 'panTo',
        value: function panTo(panX, panY, zoomLevel) {
            if (this.zoomLevel <= 0) {
                return;
            }

            this.panX = panX;
            this.panY = panY;
            this.zoomLevel = zoomLevel;
            this.fitResync(function (parentRect) {
                return true;
            });
        }
    }, {
        key: 'zoom',
        value: function zoom(screenCenterX, screenCenterY, panXOffset, panYOffset, zoomShift) {
            if (!this.picture) {
                return;
            }

            var ctrRect = this.rect();

            if (ctrRect.width <= 0 || ctrRect.height <= 0) {
                return;
            }

            if (!zoomShift) {
                this.panX += panXOffset * this.zoomLevel;
                this.panY += panYOffset * this.zoomLevel;
                this.fitResync(function (parentRect) {
                    return true;
                });

                return;
            }

            var newPictureWidth = this.picture.width() / this.zoomLevel + zoomShift,
                newPictureHeight = this.picture.height() / this.zoomLevel + zoomShift;

            if (newPictureWidth <= 0 || newPictureHeight <= 0 || !this.picture.zoomable(newPictureWidth, newPictureHeight)) {
                this.panX += panXOffset * this.zoomLevel;
                this.panY += panYOffset * this.zoomLevel;
                this.fitResync(function (parentRect) {
                    return true;
                });

                return;
            }

            var fitZoom = this.picture.zoom(newPictureWidth, newPictureHeight).fill;

            if (fitZoom == this.zoomLevel) {
                this.panX += panXOffset * this.zoomLevel;
                this.panY += panYOffset * this.zoomLevel;
                this.fitResync(function (parentRect) {
                    return true;
                });

                return;
            }

            var zoomWidthMiddle = (screenCenterX - ctrRect.left) / ctrRect.width,
                zoomHeightMiddle = (screenCenterY - ctrRect.top) / ctrRect.height,
                actualZoomedWidth = ctrRect.width * this.zoomLevel - ctrRect.width * fitZoom,
                actualZoomedHeight = ctrRect.height * this.zoomLevel - ctrRect.height * fitZoom,
                xShiftDistance = actualZoomedWidth * zoomWidthMiddle,
                yShiftDistance = actualZoomedHeight * zoomHeightMiddle;

            this.zoomLevel = fitZoom;

            this.panX += xShiftDistance;
            this.panY += yShiftDistance;
            this.fitResync(function (parentRect) {
                return true;
            });
        }
    }, {
        key: 'resetZoom',
        value: function resetZoom(refit) {
            this.zoomLevel = 1;
            this.panX = 0;
            this.panY = 0;
            this.fitResync(function (parentRect) {
                return refit;
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (!this.picture) {
                return this.resetZoom(true);
            }

            this.resetZoom(false);

            return this.picture.reset();
        }
    }, {
        key: 'refit',
        value: function refit() {
            var _this9 = this;

            this.fitResync(function (parentRect) {
                _this9.zoom(0, 0, (_this9.parentRect.width - parentRect.width) / 2, (_this9.parentRect.height - parentRect.height) / 2, 0);

                return true;
            });
        }
    }, {
        key: 'fitResync',
        value: function fitResync(onNewRect) {
            var parentRect = this.parent.getBoundingClientRect();

            if (!onNewRect(parentRect)) {
                this.parentRect = parentRect;

                return;
            }

            this.parentRect = parentRect;

            var zoomWidth = this.parentRect.width * this.zoomLevel,
                zoomHeight = this.parentRect.height * this.zoomLevel;

            this.setElement(this.container, {
                'width': this.parentRect.width + 'px',
                'height': this.parentRect.height + 'px',
                'viewBox': [this.panX, this.panY, zoomWidth, zoomHeight].join(' ')
            });
        }
    }, {
        key: 'rect',
        value: function rect() {
            return this.container.getBoundingClientRect();
        }
    }, {
        key: 'setElement',
        value: function setElement(el, properities) {
            for (var p in properities) {
                if (p.indexOf('xlink:') === 0) {
                    el.setAttributeNS(XMLNGLink, p, properities[p]);
                } else if (p.indexOf('xmlns:') === 0) {
                    el.setAttributeNS(XMLNS, p, properities[p]);
                } else {
                    el.setAttribute(p, properities[p]);
                }
            }
        }
    }, {
        key: 'newElement',
        value: function newElement(tag, properities) {
            var el = document.createElementNS(XMLNG, tag);

            if (!el) {
                throw new ElementCreationFailedException(tag);
            }

            this.setElement(el, properities);

            return el;
        }
    }, {
        key: 'background',
        value: function background(_background, onSuccess, onFail, waitLoad) {
            if (this.picture) {
                this.picture.remove();
                this.picture = null;
            }

            var newBackground = new Background(this, _background, onSuccess, onFail, waitLoad);

            this.picture = newBackground;
            this.target.appendChild(newBackground.element);
        }
    }, {
        key: 'insertDrawing',
        value: function insertDrawing(initialData, properties) {
            if (!this.target) {
                throw new MissingSVGRootElementException();
            }

            var el = this.newElement('path', buildPathElementProperties(initialData, properties));

            this.target.appendChild(el);

            this.drawings.push(el);

            return el;
        }
    }, {
        key: 'removeDrawing',
        value: function removeDrawing(el) {
            for (var i in this.drawings) {
                if (this.drawings[i] != el) {
                    continue;
                }

                this.target.removeChild(el);
                this.drawings.splice(i, 1);

                return;
            }
        }
    }, {
        key: 'insert',
        value: function insert(composeType, properties, data) {
            switch (composeType) {
                case _stage.drawPath:
                    return new _composer_path.PathInserter(this, data, properties);

                case _stage.drawLine:
                    return new _composer_line.LineInserter(this, data, properties);

                case _stage.drawRect:
                    return new _composer_rect.RectInserter(this, data, properties);

                case _stage.drawEllipse:
                    return new _composer_ellipse.EllipseInserter(this, data, properties);

                default:
                    throw new UnsupportedComposeTypeException(composeType);
            }
        }
    }, {
        key: 'compose',
        value: function compose(resolve, reject, userctl, properties, drawingControl, composeType) {
            switch (composeType) {
                case _stage.drawPath:
                    return new _composer_path.PathComposer(this, resolve, reject, userctl, properties, drawingControl);

                case _stage.drawLine:
                    return new _composer_line.LineComposer(this, resolve, reject, userctl, properties, drawingControl);

                case _stage.drawRect:
                    return new _composer_rect.RectComposer(this, resolve, reject, userctl, properties, drawingControl);

                case _stage.drawEllipse:
                    return new _composer_ellipse.EllipseComposer(this, resolve, reject, userctl, properties, drawingControl);

                default:
                    throw new UnsupportedComposeTypeException(composeType);
            }
        }
    }]);
    return SVG;
}();

exports.SVG = SVG;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PathComposer = exports.PathInserter = undefined;

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _common = __webpack_require__(22);

var _stage = __webpack_require__(41);

var _composer = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Composer = function (_ParentComposer) {
    (0, _inherits3.default)(Composer, _ParentComposer);

    function Composer(svg, properties) {
        (0, _classCallCheck3.default)(this, Composer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Composer.__proto__ || (0, _getPrototypeOf2.default)(Composer)).call(this, svg));

        _this.properties = properties;
        return _this;
    }

    (0, _createClass3.default)(Composer, [{
        key: 'type',
        value: function type() {
            return _stage.drawPath;
        }
    }, {
        key: 'savePathPoint',
        value: function savePathPoint(x, y) {
            this.plots.push({ x: x, y: y });
        }
    }, {
        key: 'buildDotPath',
        value: function buildDotPath() {
            var data = '';

            if (this.plots.length <= 0) {
                return data;
            }

            data += 'M' + this.plots[0].x + ',' + this.plots[0].y;

            for (var d = 1; d < this.plots.length; d++) {
                data += ' L' + this.plots[d].x + ',' + this.plots[d].y;
            }

            return data;
        }
    }, {
        key: 'buildCurvePath',
        value: function buildCurvePath() {
            var data = '';

            if (this.plots.length <= 0) {
                return data;
            }

            data += 'M' + this.plots[0].x + ',' + this.plots[0].y + ' Q';

            var lastPoints = null,
                remained = (this.plots.length - 1) % 2;

            for (var d = 1; d < this.plots.length; d++) {
                lastPoints = this.plots[d];

                data += this.plots[d].x + ',' + this.plots[d].y + ' ';
            }

            for (var _d = 0; _d < remained; _d++) {
                data += lastPoints.x + ',' + lastPoints.y + ' ';
            }

            return data.trim();
        }
    }, {
        key: 'pointDistance',
        value: function pointDistance(a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        }
    }, {
        key: 'angleOfCornerA',
        value: function angleOfCornerA(abDistance, a, b, c) {
            var bcDistance = this.pointDistance(b, c),
                caDistance = this.pointDistance(c, a),
                rad = (Math.pow(caDistance, 2) + Math.pow(abDistance, 2) - Math.pow(bcDistance, 2)) / (2 * caDistance * abDistance);

            if (rad >= 1) {
                return 0;
            }

            return Math.acos(rad);
        }
    }, {
        key: 'compressPath',
        value: function compressPath() {
            if (this.plots.length < 3) {
                return;
            }

            var maxMergeAngle = 0.08;

            var i = 0,
                pointA = null,
                pointB = null,
                pointBIndex = 1,
                abDistance = 0;

            while (i < this.plots.length) {
                if (!pointA) {
                    pointA = this.plots[i];
                    i++;

                    continue;
                }

                if (!pointB) {
                    pointB = this.plots[i];
                    pointBIndex = i;
                    abDistance = this.pointDistance(pointA, pointB);
                    i++;

                    continue;
                }

                var angle = this.angleOfCornerA(abDistance, pointA, pointB, this.plots[i]);

                if (angle < maxMergeAngle) {
                    this.plots.splice(pointBIndex, 1);

                    continue;
                }

                pointA = null;
                pointB = null;
            }
        }
    }]);
    return Composer;
}(_composer.Composer);

var PathInserter = exports.PathInserter = function (_Composer) {
    (0, _inherits3.default)(PathInserter, _Composer);

    function PathInserter(svg, data, properties) {
        (0, _classCallCheck3.default)(this, PathInserter);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (PathInserter.__proto__ || (0, _getPrototypeOf2.default)(PathInserter)).call(this, svg, properties));

        _this2.plots = data;

        _this2.setPathElement(_this2.svg.insertDrawing(_this2.buildDotPath(), _this2.properties));
        return _this2;
    }

    return PathInserter;
}(Composer);

var PathComposer = exports.PathComposer = function (_Composer2) {
    (0, _inherits3.default)(PathComposer, _Composer2);

    function PathComposer(svg, resolve, reject, userctl, properties, drawingControl) {
        (0, _classCallCheck3.default)(this, PathComposer);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (PathComposer.__proto__ || (0, _getPrototypeOf2.default)(PathComposer)).call(this, svg, properties));

        _this3.drawing = false;
        _this3.resolve = resolve;
        _this3.reject = reject;

        _this3.userctl = userctl;
        _this3.controls = drawingControl();

        (0, _common.assertType)(_this3.controls, 'object');

        _this3.userctl.listens(_this3.controls, _this3);
        return _this3;
    }

    (0, _createClass3.default)(PathComposer, [{
        key: 'start',
        value: function start(x, y) {
            if (this.drawing) {
                return;
            }

            this.drawing = true;

            var pt = this.convertPos(x, y);

            this.savePathPoint(pt.x, pt.y);
            this.setPathElement(this.svg.insertDrawing(this.buildDotPath(), this.properties));
        }
    }, {
        key: 'draw',
        value: function draw(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.savePathPoint(pt.x, pt.y);
            this.set({
                'd': this.buildDotPath()
            });
        }
    }, {
        key: 'done',
        value: function done(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.savePathPoint(pt.x, pt.y);
            this.compressPath();
            this.set({
                'd': this.buildCurvePath()
            });

            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.drawing = false;
            this.userctl.removes(this.controls);
            this.resolve(this);
        }
    }]);
    return PathComposer;
}(Composer);

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LineComposer = exports.LineInserter = undefined;

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _common = __webpack_require__(22);

var _stage = __webpack_require__(41);

var _composer = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lineStartIndex = 0;
var lineEndIndex = 1;

var Composer = function (_ParentComposer) {
    (0, _inherits3.default)(Composer, _ParentComposer);

    function Composer(svg, properties) {
        (0, _classCallCheck3.default)(this, Composer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Composer.__proto__ || (0, _getPrototypeOf2.default)(Composer)).call(this, svg));

        _this.properties = properties;
        _this.path = null;
        _this.plots = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
        return _this;
    }

    (0, _createClass3.default)(Composer, [{
        key: 'type',
        value: function type() {
            return _stage.drawLine;
        }
    }, {
        key: 'setStartPoint',
        value: function setStartPoint(x, y) {
            this.plots[lineStartIndex] = { x: x, y: y };
        }
    }, {
        key: 'setEndPoint',
        value: function setEndPoint(x, y) {
            this.plots[lineEndIndex] = { x: x, y: y };
        }
    }, {
        key: 'buildLinePath',
        value: function buildLinePath() {
            var data = '';

            if (this.plots.length !== 2) {
                return data;
            }

            data += 'M' + this.plots[lineStartIndex].x + ',' + this.plots[lineStartIndex].y;
            data += ' L' + this.plots[lineEndIndex].x + ',' + this.plots[lineEndIndex].y;

            return data;
        }
    }]);
    return Composer;
}(_composer.Composer);

var LineInserter = exports.LineInserter = function (_Composer) {
    (0, _inherits3.default)(LineInserter, _Composer);

    function LineInserter(svg, data, properties) {
        (0, _classCallCheck3.default)(this, LineInserter);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (LineInserter.__proto__ || (0, _getPrototypeOf2.default)(LineInserter)).call(this, svg, properties));

        _this2.plots = data;

        _this2.setPathElement(_this2.svg.insertDrawing(_this2.buildLinePath(), _this2.properties));
        return _this2;
    }

    return LineInserter;
}(Composer);

var LineComposer = exports.LineComposer = function (_Composer2) {
    (0, _inherits3.default)(LineComposer, _Composer2);

    function LineComposer(svg, resolve, reject, userctl, properties, drawingControl) {
        (0, _classCallCheck3.default)(this, LineComposer);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (LineComposer.__proto__ || (0, _getPrototypeOf2.default)(LineComposer)).call(this, svg, properties));

        _this3.drawing = false;
        _this3.resolve = resolve;
        _this3.reject = reject;

        _this3.userctl = userctl;
        _this3.controls = drawingControl();

        (0, _common.assertType)(_this3.controls, 'object');

        _this3.userctl.listens(_this3.controls, _this3);
        return _this3;
    }

    (0, _createClass3.default)(LineComposer, [{
        key: 'start',
        value: function start(x, y) {
            if (this.drawing) {
                return;
            }

            this.drawing = true;

            var pt = this.convertPos(x, y);

            this.setStartPoint(pt.x, pt.y);
            this.setEndPoint(pt.x, pt.y);
            this.setPathElement(this.svg.insertDrawing(this.buildLinePath(), this.properties));
        }
    }, {
        key: 'draw',
        value: function draw(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.setEndPoint(pt.x, pt.y);
            this.set({
                'd': this.buildLinePath()
            });
        }
    }, {
        key: 'done',
        value: function done(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.setEndPoint(pt.x, pt.y);
            this.set({
                'd': this.buildLinePath()
            });

            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.drawing = false;
            this.userctl.removes(this.controls);
            this.resolve(this);
        }
    }]);
    return LineComposer;
}(Composer);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RectComposer = exports.RectInserter = undefined;

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _common = __webpack_require__(22);

var _stage = __webpack_require__(41);

var _composer = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rectStartIndex = 0;
var rectEndIndex = 1;

var Composer = function (_ParentComposer) {
    (0, _inherits3.default)(Composer, _ParentComposer);

    function Composer(svg, properties) {
        (0, _classCallCheck3.default)(this, Composer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Composer.__proto__ || (0, _getPrototypeOf2.default)(Composer)).call(this, svg));

        _this.properties = properties;
        _this.path = null;
        _this.plots = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
        return _this;
    }

    (0, _createClass3.default)(Composer, [{
        key: 'type',
        value: function type() {
            return _stage.drawRect;
        }
    }, {
        key: 'setStartPoint',
        value: function setStartPoint(x, y) {
            this.plots[rectStartIndex] = { x: x, y: y };
        }
    }, {
        key: 'setEndPoint',
        value: function setEndPoint(x, y) {
            this.plots[rectEndIndex] = { x: x, y: y };
        }
    }, {
        key: 'buildRectPath',
        value: function buildRectPath() {
            var data = '';

            if (this.plots.length !== 2) {
                return data;
            }

            data += 'M' + this.plots[rectStartIndex].x + ',' + this.plots[rectStartIndex].y;

            data += ' L' + this.plots[rectEndIndex].x + ',' + this.plots[rectStartIndex].y;

            data += ' L' + this.plots[rectEndIndex].x + ',' + this.plots[rectEndIndex].y;

            data += ' L' + this.plots[rectStartIndex].x + ',' + this.plots[rectEndIndex].y;

            data += ' L' + this.plots[rectStartIndex].x + ',' + this.plots[rectStartIndex].y;

            data += ' Z';

            return data;
        }
    }]);
    return Composer;
}(_composer.Composer);

var RectInserter = exports.RectInserter = function (_Composer) {
    (0, _inherits3.default)(RectInserter, _Composer);

    function RectInserter(svg, data, properties) {
        (0, _classCallCheck3.default)(this, RectInserter);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (RectInserter.__proto__ || (0, _getPrototypeOf2.default)(RectInserter)).call(this, svg, properties));

        _this2.plots = data;

        _this2.setPathElement(_this2.svg.insertDrawing(_this2.buildRectPath(), _this2.properties));
        return _this2;
    }

    return RectInserter;
}(Composer);

var RectComposer = exports.RectComposer = function (_Composer2) {
    (0, _inherits3.default)(RectComposer, _Composer2);

    function RectComposer(svg, resolve, reject, userctl, properties, drawingControl) {
        (0, _classCallCheck3.default)(this, RectComposer);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (RectComposer.__proto__ || (0, _getPrototypeOf2.default)(RectComposer)).call(this, svg, properties));

        _this3.drawing = false;
        _this3.resolve = resolve;
        _this3.reject = reject;

        _this3.userctl = userctl;
        _this3.controls = drawingControl();

        (0, _common.assertType)(_this3.controls, 'object');

        _this3.userctl.listens(_this3.controls, _this3);
        return _this3;
    }

    (0, _createClass3.default)(RectComposer, [{
        key: 'start',
        value: function start(x, y) {
            if (this.drawing) {
                return;
            }

            this.drawing = true;

            var pt = this.convertPos(x, y);

            this.setStartPoint(pt.x, pt.y);
            this.setEndPoint(pt.x, pt.y);
            this.setPathElement(this.svg.insertDrawing(this.buildRectPath(), this.properties));
        }
    }, {
        key: 'draw',
        value: function draw(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.setEndPoint(pt.x, pt.y);
            this.set({
                'd': this.buildRectPath()
            });
        }
    }, {
        key: 'done',
        value: function done(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.setEndPoint(pt.x, pt.y);
            this.set({
                'd': this.buildRectPath()
            });

            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.drawing = false;
            this.userctl.removes(this.controls);
            this.resolve(this);
        }
    }]);
    return RectComposer;
}(Composer);

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// imagemarker.js - An intuitive tool for adding annotates to the image
//
// Copyright (C) 2019 Rui NI <ranqus@gmail.com>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EllipseComposer = exports.EllipseInserter = undefined;

var _getPrototypeOf = __webpack_require__(19);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(11);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(20);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(21);

var _inherits3 = _interopRequireDefault(_inherits2);

var _common = __webpack_require__(22);

var _stage = __webpack_require__(41);

var _composer = __webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ellipseStartIndex = 0;
var ellipseEndIndex = 1;

var Composer = function (_ParentComposer) {
    (0, _inherits3.default)(Composer, _ParentComposer);

    function Composer(svg, properties) {
        (0, _classCallCheck3.default)(this, Composer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Composer.__proto__ || (0, _getPrototypeOf2.default)(Composer)).call(this, svg));

        _this.properties = properties;
        _this.path = null;
        _this.plots = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
        return _this;
    }

    (0, _createClass3.default)(Composer, [{
        key: 'type',
        value: function type() {
            return _stage.drawEllipse;
        }
    }, {
        key: 'setStartPoint',
        value: function setStartPoint(x, y) {
            this.plots[ellipseStartIndex] = { x: x, y: y };
        }
    }, {
        key: 'setEndPoint',
        value: function setEndPoint(x, y) {
            this.plots[ellipseEndIndex] = { x: x, y: y };
        }
    }, {
        key: 'getStartPoint',
        value: function getStartPoint() {
            var x = 0.0,
                y = 0.0;

            if (this.plots[ellipseEndIndex].x > this.plots[ellipseStartIndex].x) {
                x = this.plots[ellipseStartIndex].x;
            } else {
                x = this.plots[ellipseEndIndex].x;
            }

            if (this.plots[ellipseEndIndex].y > this.plots[ellipseStartIndex].y) {
                y = this.plots[ellipseStartIndex].y;
            } else {
                y = this.plots[ellipseEndIndex].y;
            }

            return { x: x, y: y };
        }
    }, {
        key: 'getEndPoint',
        value: function getEndPoint() {
            var x = 0.0,
                y = 0.0;

            if (this.plots[ellipseEndIndex].x <= this.plots[ellipseStartIndex].x) {
                x = this.plots[ellipseStartIndex].x;
            } else {
                x = this.plots[ellipseEndIndex].x;
            }

            if (this.plots[ellipseEndIndex].y <= this.plots[ellipseStartIndex].y) {
                y = this.plots[ellipseStartIndex].y;
            } else {
                y = this.plots[ellipseEndIndex].y;
            }

            return { x: x, y: y };
        }
    }, {
        key: 'getRadius',
        value: function getRadius(start, end) {
            return {
                x: end.x - start.x,
                y: end.y - start.y
            };
        }
    }, {
        key: 'buildEllipsePath',
        value: function buildEllipsePath() {
            var data = '';

            if (this.plots.length !== 2) {
                return data;
            }

            var startPos = this.getStartPoint(),
                endPos = this.getEndPoint(),
                rad = this.getRadius(startPos, endPos),
                differX = endPos.x - startPos.x,
                differY = endPos.y - startPos.y,
                middleX = differX / 2,
                middleY = differY / 2,
                cx = startPos.x + middleX,
                cy = startPos.y + middleY,
                radX = rad.x / 2,
                radY = rad.y / 2;

            data += 'M' + (cx - radX) + ',' + cy + ' ';
            data += 'a' + radX + ',' + radY + ' 0 1,0 ' + radX * 2 + ',0 ';
            data += 'a' + radX + ',' + radY + ' 0 1,0 -' + radX * 2 + ',0';

            return data;
        }
    }]);
    return Composer;
}(_composer.Composer);

var EllipseInserter = exports.EllipseInserter = function (_Composer) {
    (0, _inherits3.default)(EllipseInserter, _Composer);

    function EllipseInserter(svg, data, properties) {
        (0, _classCallCheck3.default)(this, EllipseInserter);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (EllipseInserter.__proto__ || (0, _getPrototypeOf2.default)(EllipseInserter)).call(this, svg, properties));

        _this2.plots = data;

        _this2.setPathElement(_this2.svg.insertDrawing(_this2.buildEllipsePath(), _this2.properties));
        return _this2;
    }

    return EllipseInserter;
}(Composer);

var EllipseComposer = exports.EllipseComposer = function (_Composer2) {
    (0, _inherits3.default)(EllipseComposer, _Composer2);

    function EllipseComposer(svg, resolve, reject, userctl, properties, drawingControl) {
        (0, _classCallCheck3.default)(this, EllipseComposer);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (EllipseComposer.__proto__ || (0, _getPrototypeOf2.default)(EllipseComposer)).call(this, svg, properties));

        _this3.drawing = false;
        _this3.resolve = resolve;
        _this3.reject = reject;

        _this3.userctl = userctl;
        _this3.controls = drawingControl();

        (0, _common.assertType)(_this3.controls, 'object');

        _this3.userctl.listens(_this3.controls, _this3);
        return _this3;
    }

    (0, _createClass3.default)(EllipseComposer, [{
        key: 'start',
        value: function start(x, y) {
            if (this.drawing) {
                return;
            }

            this.drawing = true;

            var pt = this.convertPos(x, y);

            this.setStartPoint(pt.x, pt.y);
            this.setEndPoint(pt.x, pt.y);
            this.setPathElement(this.svg.insertDrawing(this.buildEllipsePath(), this.properties));
        }
    }, {
        key: 'draw',
        value: function draw(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.setEndPoint(pt.x, pt.y);
            this.set({
                'd': this.buildEllipsePath()
            });
        }
    }, {
        key: 'done',
        value: function done(x, y) {
            if (!this.drawing) {
                return;
            }

            var pt = this.convertPos(x, y);

            this.setEndPoint(pt.x, pt.y);
            this.set({
                'd': this.buildEllipsePath()
            });

            this.clear();
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.drawing = false;
            this.userctl.removes(this.controls);
            this.resolve(this);
        }
    }]);
    return EllipseComposer;
}(Composer);

/***/ })
/******/ ]);
});