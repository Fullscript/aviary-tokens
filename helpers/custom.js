const StyleDictionary = require("style-dictionary");
const ChangeCase = require("change-case");
const { fileHeader, getTypeScriptType } = StyleDictionary.formatHelpers;

// FILTERS
StyleDictionary.registerFilter({
  name: "custom/filter/typography",
  matcher: function (token) {
    return token.attributes.category === "typography";
  },
});

// TRANSFORMS
const isStringPxValue = (token) => {
  if (typeof token.value === "string") {
    return token.value.endsWith("px");
  }
};

StyleDictionary.registerTransform({
  name: "custom/name/remove-color-prefix",
  matcher: (token) => token.type === "color",
  type: "name",
  transformer: function (token) {
    return ChangeCase.camelCase(token.path.slice(2).join(" "));
  },
});

StyleDictionary.registerTransform({
  name: "custom/name/remove-desktop-prefix",
  type: "name",
  transformer: function (token) {
    const slicePrefix = token.path.slice(1);
    const filterDesktop = slicePrefix.filter((prefix) => prefix !== "desktop");
    return ChangeCase.camelCase(filterDesktop.join(" ")).replace("_", "");
  },
});

StyleDictionary.registerTransform({
  name: "custom/value/rm-px",
  type: "value",
  matcher: isStringPxValue,
  transformer: function (token) {
    return parseFloat(token.value);
  },
});

StyleDictionary.registerTransform({
  name: "custom/value/font-weight-to-string",
  type: "value",
  matcher: (token) =>
    token.type === "fontWeights" || token.type === "fontWeight",
  transformer: function (token) {
    return token.value.toString();
  },
});

// FORMATTERS
const customColorObjectFormatter = (dictionary, isJS) => {
  const valueOrType = (token) =>
    isJS ? `"${token.value}"` : `${getTypeScriptType(token.value)}`;
  const declaration = isJS ? "" : `export const `;
  const commaOrColon = isJS ? `,` : `;`;

  return Object.entries(dictionary.properties.colors)
    .map((tokens) => {
      const colorObj = tokens[0];
      const filteredTokens = dictionary.allTokens.filter(
        (token) => token.attributes.type === colorObj
      );

      return (
        declaration +
        `${colorObj} : {` +
        filteredTokens.map((token) => {
          return `${token.name} : ` + valueOrType(token);
        }) +
        `}${commaOrColon}`
      );
    })
    .join(`\n`);
};

StyleDictionary.registerFormat({
  name: "custom/format/typescript-color-declarations",
  formatter: ({ dictionary, file }) => {
    return fileHeader({ file }) + customColorObjectFormatter(dictionary, false);
  },
});

StyleDictionary.registerFormat({
  name: "custom/format/javascript-colors",
  formatter: ({ dictionary, file }) => {
    return (
      fileHeader({ file }) +
      `module.exports = {` +
      customColorObjectFormatter(dictionary, true) +
      `};`
    );
  },
});

// GROUPS
StyleDictionary.registerTransformGroup({
  name: "custom/aviary",
  transforms: [
    "attribute/cti",
    "custom/name/remove-desktop-prefix",
    "custom/name/remove-color-prefix",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/native",
  transforms: [
    "attribute/cti",
    "custom/name/remove-desktop-prefix",
    "custom/value/rm-px",
    "custom/value/font-weight-to-string",
    "custom/name/remove-color-prefix",
  ],
});

StyleDictionary.registerTransformGroup({
  name: "custom/owlery",
  transforms: ["attribute/cti", "custom/name/remove-desktop-prefix"],
});
