"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorProfileMapper = void 0;

// Used for mapping over selected `isColor` properties
var colorProfileMapper = function colorProfileMapper(currentTheme) {
  return {
    primary: currentTheme.primary,
    info: currentTheme.info,
    warning: currentTheme.warning,
    danger: currentTheme.danger,
    highlight: currentTheme.highlight,
    system: currentTheme.system,
    success: currentTheme.success
  };
};

exports.colorProfileMapper = colorProfileMapper;