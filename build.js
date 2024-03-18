const StyleDictionary = require("style-dictionary");
require("./src/helpers/style-dictionary");

const getStyleDictionaryConfig = (theme) => {
  const isCore = theme.includes("core");
  return {
    source: [`src/transformed/transformed-${theme}.json`],
    platforms: {
      Sass: {
        transformGroup: "custom/scss",
        buildPath: "dist/tokens/scss/",
        files: [
          {
            destination: `borders.scss`,
            format: "scss/variables",
            filter: "custom/filter/borders",
          },
          {
            destination: `typography.scss`,
            format: "scss/variables",
            filter: "custom/filter/typography",
          },
          {
            destination: isCore
              ? `${theme}-colors.scss`
              : `themes/${theme}.scss`,
            format: "scss/variables",
            filter: {
              type: "color",
            },
          },
        ],
      },
      Aviary: {
        transformGroup: "custom/aviary",
        buildPath: "dist/tokens/ts/",
        files: [
          {
            format: "javascript/module-flat",
            destination: "dimensions.js",
            filter: "custom/filter/dimensions",
          },
          {
            format: "typescript/es6-declarations",
            destination: "dimensions.d.ts",
            filter: "custom/filter/dimensions",
          },
          {
            format: "javascript/module-flat",
            destination: "borders.js",
            filter: "custom/filter/borders",
          },
          {
            format: "typescript/es6-declarations",
            destination: "borders.d.ts",
            filter: "custom/filter/borders",
          },
          {
            format: "javascript/module-flat",
            destination: "typography.js",
            filter: "custom/filter/typography",
          },
          {
            format: "typescript/es6-declarations",
            destination: "typography.d.ts",
            filter: "custom/filter/typography",
          },
          {
            format: "custom/format/javascript-colors",
            destination: isCore ? `${theme}-colors.js` : `themes/${theme}.js`,
            filter: "custom/filter/themeTokens",
          },
          {
            format: "custom/format/typescript-color-declarations",
            destination: isCore
              ? `${theme}-colors.d.ts`
              : `themes/${theme}.d.ts`,
            filter: "custom/filter/themeTokens",
          },
        ],
      },
      Native: {
        transformGroup: "custom/native",
        buildPath: "dist/tokens/native/",
        files: [
          {
            format: "javascript/module-flat",
            destination: "borders.js",
            filter: "custom/filter/borders",
          },
          {
            format: "typescript/es6-declarations",
            destination: "borders.d.ts",
            filter: "custom/filter/borders",
          },
          {
            format: "javascript/module-flat",
            destination: "typography.js",
            filter: "custom/filter/typography",
          },
          {
            format: "typescript/es6-declarations",
            destination: "typography.d.ts",
            filter: "custom/filter/typography",
          },
          {
            format: "custom/format/javascript-colors",
            destination: isCore ? `${theme}-colors.js` : `themes/${theme}.js`,
            filter: "custom/filter/themeTokens",
          },
          {
            format: "custom/format/typescript-color-declarations",
            destination: isCore
              ? `${theme}-colors.d.ts`
              : `themes/${theme}.d.ts`,
            filter: "custom/filter/themeTokens",
          },
        ],
      },
      Documentation: {
        transformGroup: "custom/documentation",
        buildPath: "dist/documentation/",
        files: [
          {
            format: "custom/format/javascript-colors-documentation",
            destination: isCore ? `${theme}-colors.js` : `themes/${theme}.js`,
            filter: {
              type: "color",
            },
          },
          {
            format: "custom/format/typescript-color-declarations-documentation",
            destination: isCore
              ? `${theme}-colors.d.ts`
              : `themes/${theme}.d.ts`,
            filter: {
              type: "color",
            },
          },
        ],
      },
    },
  };
};

// Add themes to the array to create theme-specific files under themes folder
// "core" theme will build files outside of the themes folder
const themes = [
  "primitives",
  "core-light",
  "core-dark",
  "light",
  "lightDS3",
  "dark",
  "emerson",
];

themes.map((theme) => {
  StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});
