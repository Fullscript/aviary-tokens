/**
 * used in build.js
 *
 * Formats define the output of your created files
 * order of operations: filters > transforms > formats
 *
 * https://amzn.github.io/style-dictionary/#/formats
 */

const StyleDictionary = require("style-dictionary");
const { fileHeader, getTypeScriptType } = StyleDictionary.formatHelpers;

const declaration = (isJS) => (isJS ? "" : `export const `);
const commaOrColon = (isJS) => (isJS ? `,` : `;`);
const valueOrType = (token, isJS) =>
  isJS ? `"${token.value}"` : `${getTypeScriptType(token.value)}`;

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/*
 * Adds a prefix to the object output that identifies the theme
 *
 * ex:
 * module.exports = {
 *   theme: "light" <===== ADDS THIS LINE
 *   colors: { ... }
 * }
 */
const addThemePrefix = (theme, isJS) => {
  // Only add a prefix for theme files, not core ones
  if (theme?.destination.includes("core")) return ``;

  const themeWithSlash = theme.destination.substring(
    0,
    theme.destination.indexOf(".")
  );
  const extractedThemeName = { value: themeWithSlash.split("/")[1] };
  return (prefix = `${declaration(isJS)}theme: ${valueOrType(
    extractedThemeName,
    isJS
  )}${commaOrColon(isJS)}\n`);
};

/*
 * Renders the output for each token family
 *
 * ex:
 * module.exports = {
 *   primary: {
 *     textBase: "#FFF",
 *     textHover: "#0070F3",
 *     etc...
 *  }
 * }
 */
const renderOutput = (isJS, tokenFamily, tokensArray, customValueOrType) => {
  const renderValueOrType = (token) =>
    customValueOrType
      ? customValueOrType(token, isJS)
      : valueOrType(token, isJS);

  return (
    declaration(isJS) +
    `${tokenFamily}: {` +
    tokensArray.map((token) => {
      return `${token.name} : ` + renderValueOrType(token);
    }) +
    `}${commaOrColon(isJS)}\n`
  );
};

const renderTypographyOutput = (isJS, tokensArray, customValueOrType) => {
  const renderValueOrType = (token, isFontWeight) =>
    customValueOrType(token, isJS, isFontWeight);

  /* Output the typography sub values
   *
   * ex: {
   *    fontFamily: "Mulish"
   *    fontSize: "24px"
   * }
   */
  const getTypographySubValues = (typographyValues) => {
    return Object.entries(typographyValues).map((key, value) => {
      const propertyName = key[0];
      const propertyValue = key[1];

      return `${propertyName}: ${renderValueOrType(
        propertyValue,
        propertyName === `fontWeight`
      )} `;
    });
  };

  /* Pluck out the main Typography types, into two sizes
   *
   * 1. Root typography types
   * ex: h1, h2, h3, etc.
   *
   * 2. Mobile typography types
   * ex: mobileH1, mobileH2
   */
  const typographyParentTypes = tokensArray.map((token) => {
    const typographyType = token.attributes.item;
    const isMobile = token.attributes.type === "mobile";

    const getTokenName = () => {
      if (isMobile) {
        return `mobile${capitalizeFirstLetter(typographyType)}`;
      }
      return typographyType;
    };

    return `${getTokenName()}: { ${getTypographySubValues(token.value)} }`;
  });

  return `${declaration(
    isJS
  )}typography: { ${typographyParentTypes}  }${commaOrColon(isJS)}`;
};

/*
 * Formats base color objects, which are not nested.
 * This covers all basic token colors
 *
 * ex:
 * module.exports = {
 *   text: {...}
 *   primary: {...}
 *   separator: {...}
 * }
 *
 * @excludes accent color type tokens
 */
const customBaseColorObjectFormatter = (dictionary, isJS) => {
  if (!dictionary.properties.colors) return "";
  return Object.entries(dictionary.properties.colors)
    .filter((tokens) => tokens[0] !== "accent")
    .map((tokens) => {
      const colorObj = tokens[0];
      const filteredTokens = dictionary.allTokens.filter(
        (token) => token.attributes.type === colorObj
      );

      return renderOutput(isJS, colorObj, filteredTokens);
    })
    .join(``);
};

/*
 * Formats accent color type tokens, which are nested under the "accent" key
 * instead of at the root like other color type tokens
 *
 * ex:
 * module.exports = {
 *   accent: {
 *     forest: {...}
 *   }
 * }
 */
const customAccentColorObjectFormatter = (dictionary, isJS) => {
  if (!dictionary.properties.colors) return "";
  return Object.entries(dictionary.properties.colors)
    .filter((tokens) => tokens[0] === "accent")
    .map((tokens) => {
      const colorObj = tokens[0];
      // filtered accent tokens from all color tokens
      const accentTokens = dictionary.allTokens.filter(
        (token) => token.attributes.type === colorObj
      );

      // get all accent colors from all accent tokens (includes duplicates)
      const getAllAvailableAccentColors = accentTokens.map(
        (token) => token.attributes.item
      );
      // create array of unique accent colors (ex: ["forest", "sand"])
      const accentColors = Array.from(new Set(getAllAvailableAccentColors));

      // sort accent tokens by unique accent colors (no duplicates) into individual arrays
      const sortedTokens = accentTokens.reduce((accents, token) => {
        const color = token.attributes.item;
        if (!accents[color]) {
          accents[color] = [];
        }
        accents[color].push(token);
        return accents;
      }, {});

      // map over unique accent colors array (forest, sand, etc.)
      const colorObjects = accentColors.map((color) => {
        // map over tokens for each accent color with arrays created in sortedTokens
        const eachAccentTokensArray = sortedTokens[color];
        const tokenStrings = eachAccentTokensArray.map((token) => {
          // create string for each token (tokenName: tokenValue)
          const capitalizedState =
            token.attributes.state.charAt(0).toUpperCase() +
            token.attributes.state.slice(1);
          const tokenName = `${token.attributes.subitem}${capitalizedState}`;
          return `${tokenName}: ${valueOrType(token, isJS)}`;
        });
        // join token strings with comma
        // create string for each accent color
        return `${color}: { ${tokenStrings.join(", ")} }`;
      });

      // join accent color strings with comma and create string for all accent colors
      // join all accent color strings with comma
      const colorObjectString = colorObjects.join(", ");
      // return final output for all accent colors
      return `\n${declaration(
        isJS
      )}${colorObj}: { ${colorObjectString} }${commaOrColon(isJS)}\n`;
    });
};

const customBoxShadowObjectFormatter = (dictionary, theme, isJS) => {
  // no box shadow tokens for core, returns empty object otherwise
  if (theme?.destination.includes("core")) return "";

  const boxShadows = dictionary.allTokens.filter(
    (token) => token.attributes.category === "boxShadows"
  );
  const valueOrType = (token, isJS) => {
    return isJS
      ? `"${token.value.x}px ${token.value.y}px ${token.value.blur}px ${token.value.spread}px ${token.value.color}"`
      : `string`;
  };

  return renderOutput(isJS, "boxShadows", boxShadows, valueOrType);
};

/*
 * Formats opacity type tokens
 *
 * ex:
 * module.exports = {
 *   opacity : {overlayBackdrop : 0.2},};
 * }
 *
 * @excludes "core" type token files
 */
const customOpacityObjectFormatter = (dictionary, theme, isJS) => {
  // no opacity tokens for core, returns empty object otherwise
  if (theme?.destination.includes("core")) return "";

  const opacityTokens = dictionary.allTokens.filter(
    (token) => token.attributes.category === "opacity"
  );
  const valueOrType = (token, isJS) => {
    return isJS ? `${token.value}` : `number`;
  };

  return renderOutput(isJS, "opacity", opacityTokens, valueOrType);
};

/*
 * Formats typography tokens
 *
 * ex:
 * module.exports = {
 *   typography : {
 *     h1 : {
 *      fontFamily: "Mulish"
 *     }
 *   }}
 * }
 *
 * @excludes "core" type token files
 */
const customTypographyObjectFormatter = (dictionary, theme, isJS) => {
  // no typography tokens for core, returns empty object otherwise
  if (theme?.destination.includes("core" || "primitives")) return "";

  const typography = dictionary.allTokens.filter(
    (token) => token.attributes.category === "typography"
  );

  const valueOrType = (token, isJS, isFontWeight) => {
    if (isFontWeight) {
      return isJS ? `${token}` : `number`;
    }
    return isJS ? `"${token}"` : `string`;
  };

  return renderTypographyOutput(isJS, typography, valueOrType);
};

StyleDictionary.registerFormat({
  name: "custom/format/typescript-color-declarations",
  formatter: ({ dictionary, file }) => {
    return (
      fileHeader({ file }) +
      addThemePrefix(file, false) +
      customBaseColorObjectFormatter(dictionary, false) +
      customAccentColorObjectFormatter(dictionary, false) +
      customBoxShadowObjectFormatter(dictionary, file, false) +
      customOpacityObjectFormatter(dictionary, file, false) +
      customTypographyObjectFormatter(dictionary, file, false)
    );
  },
});

StyleDictionary.registerFormat({
  name: "custom/format/javascript-colors",
  formatter: ({ dictionary, file }) => {
    return (
      fileHeader({ file }) +
      `module.exports = {` +
      addThemePrefix(file, true) +
      customBaseColorObjectFormatter(dictionary, true) +
      customAccentColorObjectFormatter(dictionary, true) +
      customBoxShadowObjectFormatter(dictionary, file, true) +
      customOpacityObjectFormatter(dictionary, file, true) +
      customTypographyObjectFormatter(dictionary, file, true) +
      `};`
    );
  },
});
