declare const CORE_AVIARY_INTENTIONS: {
    primary: string;
    system: string;
    danger: string;
    success: string;
};
declare const AVIARY_INTENTIONS: {
    warning: string;
    primary: string;
    system: string;
    danger: string;
    success: string;
};
declare const AVIARY_BUTTON_INTENTIONS: {
    textSuccess: string;
    textSystem: string;
    textDanger: string;
    lightFilled: string;
    lightOutlined: string;
    lightText: string;
    primary: string;
    system: string;
    danger: string;
    success: string;
};
declare type CoreAviaryIntentions = keyof typeof CORE_AVIARY_INTENTIONS;
declare type AviaryIntentions = keyof typeof AVIARY_INTENTIONS;
declare type AviaryButtonIntentions = keyof typeof AVIARY_BUTTON_INTENTIONS;
export type { AviaryButtonIntentions, AviaryIntentions, CoreAviaryIntentions };
export { AVIARY_BUTTON_INTENTIONS, AVIARY_INTENTIONS, CORE_AVIARY_INTENTIONS };
//# sourceMappingURL=intentions.d.ts.map