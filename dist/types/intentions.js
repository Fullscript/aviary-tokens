"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CORE_AVIARY_INTENTIONS = exports.AVIARY_INTENTIONS = exports.AVIARY_BUTTON_INTENTIONS = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CORE_AVIARY_INTENTIONS = {
  primary: "primary",
  system: "system",
  danger: "danger",
  success: "success"
};
exports.CORE_AVIARY_INTENTIONS = CORE_AVIARY_INTENTIONS;

var AVIARY_INTENTIONS = _objectSpread(_objectSpread({}, CORE_AVIARY_INTENTIONS), {}, {
  warning: "warning"
});

exports.AVIARY_INTENTIONS = AVIARY_INTENTIONS;

var AVIARY_BUTTON_INTENTIONS = _objectSpread(_objectSpread({}, CORE_AVIARY_INTENTIONS), {}, {
  textSuccess: "textSuccess",
  textSystem: "textSystem",
  textDanger: "textDanger",
  lightFilled: "lightFilled",
  lightOutlined: "lightOutlined",
  lightText: "lightText"
});

exports.AVIARY_BUTTON_INTENTIONS = AVIARY_BUTTON_INTENTIONS;