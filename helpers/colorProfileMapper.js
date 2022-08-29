const colorProfileMapper = (currentTheme) => {
  return {
    primary: currentTheme.primary,
    info: currentTheme.info,
    warning: currentTheme.warning,
    danger: currentTheme.danger,
    highlight: currentTheme.highlight,
  };
};

module.exports = { colorProfileMapper };
