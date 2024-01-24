import type * as light from "../../dist/tokens/ts/themes/light.d";

type StandardColorsProfileTheme = typeof light.primary;
type SystemColorProfileTheme = typeof light.system;

type ColorProfileTheme = StandardColorsProfileTheme | SystemColorProfileTheme;

export type { ColorProfileTheme, StandardColorsProfileTheme };
