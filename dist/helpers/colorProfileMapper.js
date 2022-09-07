"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorProfileMapper = void 0;

var colorProfileMapper = function colorProfileMapper(currentTheme) {
  return {
    primary: currentTheme.primary,
    info: currentTheme.info,
    warning: currentTheme.warning,
    danger: currentTheme.danger,
    highlight: currentTheme.highlight,
    system: currentTheme.system
  };
};

exports.colorProfileMapper = colorProfileMapper;