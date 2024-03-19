/**
 * used in transform-groups.js
 *
 * transforms are performed sequentially (see transform groups below).
 * order of operations: filters > transforms > formats
 *
 * https://amzn.github.io/style-dictionary/#/transforms?id=transforms
 */

const StyleDictionary = require("style-dictionary");
const ChangeCase = require("change-case");

const isStringPxValue = (token) => {
  if (typeof token.value === "string") {
    return token.value.endsWith("px");
  }
};

// removes the word "color"
StyleDictionary.registerTransform({
  name: "custom/name/remove-color-prefix",
  matcher: (token) => token.type === "color",
  type: "name",
  transformer: function (token) {
    return ChangeCase.camelCase(token.path.slice(2).join(" "));
  },
});

// removes word "desktop"
StyleDictionary.registerTransform({
  name: "custom/name/remove-desktop-prefix",
  type: "name",
  transformer: function (token) {
    const slicePrefix = token.path.slice(1);
    const filterDesktop = slicePrefix.filter((prefix) => prefix !== "desktop");
    return ChangeCase.camelCase(filterDesktop.join(" ")).replace("_", "");
  },
});

// removes "px" and turns string into number
StyleDictionary.registerTransform({
  name: "custom/value/rm-px",
  type: "value",
  matcher: isStringPxValue,
  transformer: function (token) {
    return parseFloat(token.value);
  },
});

/* Converts typography attributes to
 * proper types to be used in react native
 *
 * fontWeight: number => string
 * fontSize: string => number
 */
StyleDictionary.registerTransform({
  name: "custom/value/native-typography-transforms",
  type: "value",
  matcher: (token) => {
    return token.type === "typography";
  },
  transformer: function (token) {
    return {
      ...token.value,
      fontFamily: `"${token.value.fontFamily}"`,
      fontWeight: `"${token.value.fontWeight}"`,
      fontSize: `${parseFloat(token.value.fontSize)}`,
      lineHeight: `${parseFloat(token.value.lineHeight)}`,
    };
  },
});
