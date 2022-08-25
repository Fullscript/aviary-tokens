const AVIARY_COLORS = {
  primary: "primary",
  info: "info",
  warning: "warning",
  danger: "danger",
  highlight: "highlight",
};

const EXTENDED_AVIARY_COLORS = {
  ...AVIARY_COLORS,
  system: "system",
  light: "light"
};

type AviaryColors = keyof typeof AVIARY_COLORS;
type ExtendedAviaryColors = keyof typeof EXTENDED_AVIARY_COLORS;

interface AviaryColorProps {
  isColor?: AviaryColors;
}

interface AviaryExtendedColorProps {
  isColor?: ExtendedAviaryColors;
}

export type { AviaryColors, AviaryColorProps, AviaryExtendedColorProps, ExtendedAviaryColors };
export { AVIARY_COLORS, EXTENDED_AVIARY_COLORS };
