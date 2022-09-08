const StyleDictionary = require("style-dictionary");
require("./src/helpers/custom");

const getStyleDictionaryConfig = (theme) => {
  const core = theme === "core";
  return {
    source: [`src/transformed/transformed-${theme}.json`],
    platforms: {
      Sass: {
        transformGroup: "custom/scss",
        buildPath: "dist/tokens/scss/",
        files: [
          {
            destination: `typography.scss`,
            format: "scss/variables",
            filter: "custom/filter/typography",
          },
          {
            destination: core ? "colors.scss" : `themes/${theme}.scss`,
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
            destination: core ? "colors.js" : `themes/${theme}.js`,
            filter: {
              type: "color",
            },
          },
          {
            format: "custom/format/typescript-color-declarations",
            destination: core ? "colors.d.ts" : `themes/${theme}.d.ts`,
            filter: {
              type: "color",
            },
          },
        ],
      },
      Native: {
        transformGroup: "custom/native",
        buildPath: "dist/tokens/native/",
        files: [
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
            destination: core ? "colors.js" : `themes/${theme}.js`,
            filter: {
              type: "color",
            },
          },
          {
            format: "custom/format/typescript-color-declarations",
            destination: core ? "colors.d.ts" : `themes/${theme}.d.ts`,
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
["core", "light"].map((theme) => {
  StyleDictionary.extend(getStyleDictionaryConfig(theme)).buildAllPlatforms();
});
