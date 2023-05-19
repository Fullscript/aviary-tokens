declare const AVIARY_COLORS: {
    primary: string;
    info: string;
    warning: string;
    danger: string;
    highlight: string;
    system: string;
};
declare const AVIARY_INTENTIONS: {
    success: string;
    danger: string;
    warning: string;
    system: string;
    autoship: string;
};
declare type AviaryColors = keyof typeof AVIARY_COLORS;
declare type AviaryIntentions = keyof typeof AVIARY_INTENTIONS;
interface AviaryColorProps {
    isColor?: AviaryColors;
}
export type { AviaryColors, AviaryColorProps, AviaryIntentions };
export { AVIARY_COLORS };
//# sourceMappingURL=interfaces.d.ts.map