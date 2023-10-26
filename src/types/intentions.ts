const CORE_AVIARY_INTENTIONS = {
  primary: "primary",
  system: "system",
  danger: "danger",
  success: "success",
};

const AVIARY_INTENTIONS = {
  ...CORE_AVIARY_INTENTIONS,
  warning: "warning",
};

const AVIARY_BUTTON_INTENTIONS = {
  ...CORE_AVIARY_INTENTIONS,
  textSuccess: "textSuccess",
  textSystem: "textSystem",
  textDanger: "textDanger",
  lightFilled: "lightFilled",
  lightOutlined: "lightOutlined",
  lightText: "lightText",
};

type CoreAviaryIntentions = keyof typeof CORE_AVIARY_INTENTIONS;
type AviaryIntentions = keyof typeof AVIARY_INTENTIONS;
type AviaryButtonIntentions = keyof typeof AVIARY_BUTTON_INTENTIONS;

export type { AviaryButtonIntentions, AviaryIntentions, CoreAviaryIntentions };
export { AVIARY_BUTTON_INTENTIONS, AVIARY_INTENTIONS, CORE_AVIARY_INTENTIONS };
