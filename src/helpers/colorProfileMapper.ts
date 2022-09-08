// Used for mapping over selected `isColor` properties
import type { AviaryTheme } from "../types/themes";

export const colorProfileMapper = (currentTheme: AviaryTheme) => {
  return {
    primary: currentTheme.primary,
    info: currentTheme.info,
    warning: currentTheme.warning,
    danger: currentTheme.danger,
    highlight: currentTheme.highlight,
    system: currentTheme.system,
  };
};
