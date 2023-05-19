const AVIARY_COLORS = {
  primary: "primary",
  info: "info",
  warning: "warning",
  danger: "danger",
  highlight: "highlight",
  system: "system",
};

const AVIARY_INTENTIONS = {
  success: "success",
  danger: "danger",
  warning: "warning",
  system: "system",
  autoship: "autoship",
};

type AviaryColors = keyof typeof AVIARY_COLORS;
type AviaryIntentions = keyof typeof AVIARY_INTENTIONS;

interface AviaryColorProps {
  isColor?: AviaryColors;
}

export type { AviaryColors, AviaryColorProps, AviaryIntentions };
export { AVIARY_COLORS };
