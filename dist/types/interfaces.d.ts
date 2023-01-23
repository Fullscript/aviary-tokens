declare const AVIARY_COLORS: {
    primary: string;
    info: string;
    warning: string;
    danger: string;
    highlight: string;
    system: string;
};
declare const EXTENDED_AVIARY_COLORS: {
    light: string;
    primary: string;
    info: string;
    warning: string;
    danger: string;
    highlight: string;
    system: string;
};
declare type AviaryColors = keyof typeof AVIARY_COLORS;
declare type ExtendedAviaryColors = keyof typeof EXTENDED_AVIARY_COLORS;
interface AviaryColorProps {
    isColor?: AviaryColors;
}
interface AviaryExtendedColorProps {
    isColor?: ExtendedAviaryColors;
}
export type { AviaryColors, AviaryColorProps, AviaryExtendedColorProps, ExtendedAviaryColors, };
export { AVIARY_COLORS, EXTENDED_AVIARY_COLORS };
//# sourceMappingURL=interfaces.d.ts.map