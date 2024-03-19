/**
 * used in build.js
 *
 * transforms are performed sequentially (see transform groups below).
 * order of operations: filters > transforms > formats
 *
 * https://amzn.github.io/style-dictionary/#/transforms?id=transforms
 */

require("./transforms");

const StyleDictionary = require("style-dictionary");

// used in hw-admin
StyleDictionary.registerTransformGroup({
  name: "custom/aviary",
  transforms: [
    "attribute/cti",
    "custom/name/remove-desktop-prefix",
    "custom/name/remove-color-prefix",
  ],
});

// used in docusaurus
StyleDictionary.registerTransformGroup({
  name: "custom/documentation",
  transforms: [
    "attribute/cti",
    "custom/name/remove-desktop-prefix",
    "custom/name/remove-color-prefix",
  ],
});

// used in fs-native
StyleDictionary.registerTransformGroup({
  name: "custom/native",
  transforms: [
    "attribute/cti",
    "custom/name/remove-desktop-prefix",
    "custom/value/rm-px",
    "custom/value/font-weight-to-string",
    "custom/value/native-typography-transforms",
    "custom/name/remove-color-prefix",
  ],
});

//used in fs-mark-ii marketing site
StyleDictionary.registerTransformGroup({
  name: "custom/scss",
  transforms: ["attribute/cti", "custom/name/remove-desktop-prefix"],
});
