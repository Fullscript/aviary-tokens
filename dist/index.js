"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  borders: true,
  typography: true,
  lightThemeDocumentation: true,
  darkThemeDocumentation: true,
  coreDarkDocumentation: true,
  coreLightDocumentation: true
};
exports.typography = exports.lightThemeDocumentation = exports.darkThemeDocumentation = exports.coreLightDocumentation = exports.coreDarkDocumentation = exports.borders = void 0;
var _helpers = require("./helpers");
Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _helpers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _borders = _interopRequireWildcard(require("../dist/tokens/ts/borders"));
exports.borders = _borders;
var _typography = _interopRequireWildcard(require("../dist/tokens/ts/typography"));
exports.typography = _typography;
var _lightThemeDocumentation = _interopRequireWildcard(require("../dist/documentation/themes/light"));
exports.lightThemeDocumentation = _lightThemeDocumentation;
var _darkThemeDocumentation = _interopRequireWildcard(require("../dist/documentation/themes/dark"));
exports.darkThemeDocumentation = _darkThemeDocumentation;
var _coreDarkDocumentation = _interopRequireWildcard(require("../dist/documentation/core-dark-colors"));
exports.coreDarkDocumentation = _coreDarkDocumentation;
var _coreLightDocumentation = _interopRequireWildcard(require("../dist/documentation/core-light-colors"));
exports.coreLightDocumentation = _coreLightDocumentation;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }