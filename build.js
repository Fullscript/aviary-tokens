const StyleDictionary = require("style-dictionary");
const ChangeCase = require("change-case");
const { fileHeader, getTypeScriptType } = StyleDictionary.formatHelpers;

const isStringPxValue = (token) => {
  if (typeof token.value === "string") {
    return token.value.endsWith("px");
  }
};

StyleDictionary.registerFilter({
  name: "filter-typography",
  matcher: function (token) {
    return token.attributes.category === "typography";
  },
});

StyleDictionary.registerTransform({
  name: "name/remove-desktop-prefix",
  type: "name",
  transformer: function (token) {
    const slicePrefix = token.path.slice(1);
    const filterDesktop = slicePrefix.filter((prefix) => prefix !== "desktop");
    return ChangeCase.camelCase(filterDesktop.join(" ")).replace("_", "");
  },
});

StyleDictionary.registerTransform({
  name: "name/remove-color-prefix",
  matcher: (token) => token.type === "color",
  type: "name",
  transformer: function (token) {
    return ChangeCase.camelCase(token.path.slice(1).join(""));
  },
});

StyleDictionary.registerTransform({
  name: "name/remove-shades-prefix",
  type: "name",
  matcher: (token) => token.type === "color" && token.path.includes("shades"),
  transformer: function (token) {
    return ChangeCase.camelCase(token.path.slice(2).join(""));
  },
});

StyleDictionary.registerTransform({
  name: "value/rm-px",
  type: "value",
  matcher: isStringPxValue,
  transformer: function (token) {
    return parseFloat(token.value);
  },
});

StyleDictionary.registerFormat({
  name: "typescript/color-declaration",
  formatter: ({ dictionary, file }) => {
    return (
      fileHeader({ file }) +
      Object.entries(dictionary.properties.colors)
        .map((tokens) => {
          const colorObj = tokens[0];
          const filtered = dictionary.allTokens.filter(
            (token) => token.attributes.type === colorObj
          );
          return (
            `export const ${colorObj} : { ` +
            filtered.map((token) => {
              return `${token.name} : ${getTypeScriptType(token.value)}`;
            }) +
            `};`
          );
        })
        .join(`\n`)
    );
  },
});

StyleDictionary.registerFormat({
  name: `javascript/colors`,
  formatter: ({ dictionary, file }) => {
    return (
      fileHeader({ file }) +
      `module.exports = {` +
      Object.entries(dictionary.properties.colors)
        .map((tokens) => {
          const colorObj = tokens[0];
          const filtered = dictionary.allTokens.filter(
            (token) => token.attributes.type === colorObj
          );
          return (
            `${colorObj} : { ` +
            filtered.map((token) => {
              return `${token.name} : "${token.value}"`;
            }) +
            `},`
          );
        })
        .join(`\n`) +
      `};`
    );
  },
});

StyleDictionary.registerTransformGroup({
  name: "custom/aviary",
  transforms: [
    "attribute/cti",
    "name/remove-color-prefix",
    "name/remove-desktop-prefix",
    "name/remove-shades-prefix",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/native",
  transforms: [
    "attribute/cti",
    "name/remove-color-prefix",
    "name/remove-desktop-prefix",
    "name/remove-shades-prefix",
    "value/rm-px",
  ],
});

const getStyleDictionaryConfig = (theme) => {
  const core = theme === "core";
  return {
    source: [`transformed/transformed-${theme}.json`],
    platforms: {
      Owlery: {
        transformGroup: "custom/aviary",
        buildPath: "build/scss/",
        files: [
          {
            destination: `typography.scss`,
            format: "scss/variables",
            filter: "filter-typography",
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
        buildPath: "build/ts/",
        files: [
          {
            format: "javascript/module-flat",
            destination: "typography.js",
            filter: "filter-typography",
          },
          {
            format: "typescript/es6-declarations",
            destination: "typography.d.ts",
            filter: "filter-typography",
          },
          {
            format: "javascript/colors",
            destination: core ? "colors.js" : `themes/${theme}.js`,
            filter: {
              type: "color",
            },
          },
          {
            format: "typescript/color-declaration",
            destination: core ? "colors.d.ts" : `themes/${theme}.d.ts`,
            filter: {
              type: "color",
            },
          },
        ],
      },

      Native: {
        transformGroup: "custom/native",
        buildPath: "build/native/",
        files: [
          {
            format: "javascript/module-flat",
            destination: "typography.js",
            filter: "filter-typography",
          },
          {
            format: "typescript/es6-declarations",
            destination: "typography.d.ts",
            filter: "filter-typography",
          },
          {
            format: "javascript/colors",
            destination: core ? "colors.js" : `themes/${theme}.js`,
            filter: {
              type: "color",
            },
          },
          {
            format: "typescript/color-declaration",
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
