/**
 * used in build.js
 * filters will be applied before formatting
 *
 * order of operations: filters > transforms > formats
 *
 * https://amzn.github.io/style-dictionary/#/formats?id=filtering-tokens
 */

const StyleDictionary = require("style-dictionary");

// filter borders and borderWith
StyleDictionary.registerFilter({
  name: "custom/filter/borders",
  matcher: (token) => {
    return token.type === "borderRadius" || token.type === "borderWidth";
  },
});

// filter typography
StyleDictionary.registerFilter({
  name: "custom/filter/typography",
  matcher: function (token) {
    // Only export typography primitives
    const primitiveFile = token.filePath.includes("primitive");
    if (!primitiveFile) {
      return false;
    }

    return token.attributes.category === "typography";
  },
});

// filter dimensions
StyleDictionary.registerFilter({
  name: "custom/filter/dimensions",
  matcher: function (token) {
    return token.attributes.category === "dimensions";
  },
});

// filter boxShadows, colors, typography and opacity
StyleDictionary.registerFilter({
  name: "custom/filter/themeTokens",
  matcher: (token) => {
    // Do not parse primitive tokens, as they are not theme tokens
    const primitiveFile = token.filePath.includes("primitive");
    if (primitiveFile) {
      return false;
    }

    return (
      token.attributes.category === "boxShadows" ||
      token.attributes.category === "colors" ||
      token.attributes.category === "opacity" ||
      token.attributes.category === "typography"
    );
  },
});
