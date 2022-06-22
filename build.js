const StyleDictionary = require("style-dictionary").extend("config.json");

StyleDictionary.registerFilter({
  name: "filter-typography",
  matcher: ({ attributes }) => {
    return attributes.type === "typography";
  },
});

const transformDimension = (value) => {
  if (value.endsWith("px")) {
    return value;
  }
  return `${value}px`;
};

StyleDictionary.registerTransform({
  name: "size/px",
  type: "value",
  transitive: true,
  matcher: ({ attributes }) => {
    return attributes.category === "fontSizes";
  },
  transformer: (token) => transformDimension(token.value),
});

StyleDictionary.extend({
  platforms: {
    Owlery: {
      transformGroup: "scss",
      buildPath: "build/scss/",
      files: [
        {
          destination: "colors.scss",
          format: "scss/variables",
          filter: {
            type: "color",
          },
        },
        {
          destination: "typography.scss",
          format: "scss/variables",
          filter: "filter-typography",
        },
      ],
    },

    Aviary: {
      transformGroup: "js",
      buildPath: "build/ts/",
      files: [
        {
          format: "javascript/es6",
          destination: "colors.ts",
          filter: {
            type: "color",
          },
        },
        {
          format: "javascript/es6",
          destination: "typography.ts",
          filter: "filter-typography",
        },
      ],
    },
  },
}).buildAllPlatforms();
