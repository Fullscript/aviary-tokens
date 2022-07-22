# [Aviary Tokens](https://aviary.docs.fullscript.cloud/)

Aviary tokens are foundational design primitives used in our [Aviary Design System](https://aviary.docs.fullscript.cloud/).

Design tokens originated at Salesforce, and the best way to describe them is to simply quote their documentation:

> Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development – [Salesforce UX](https://www.lightningdesignsystem.com/design-tokens/)

### Installation

Add the following dependency to your `package.json` file:

```js
"dependencies": {
  "aviary-tokens": "https://github.com/Fullscript/aviary-tokens.git#main",
}
```

### Upgrading

Since this repository does not have an [NPM Package](https://www.npmjs.com/) associated with it, upgrading is done manually using [Git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging) and [GitHub releases](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)

In order to target a new release, simply specify the release number after the Git repository within `package.json`:

```js
"dependencies": {
  "aviary-tokens": "https://github.com/Fullscript/aviary-tokens.git#0.2",
}
```

You can also target a specific branch for testing, using in the same format:

```js
"dependencies": {
  "aviary-tokens": "https://github.com/Fullscript/aviary-tokens.git#my-branch",
}
```

### Usage

1.  Determine which platform/language you are targeting

We currently support two platforms:

- Typescript (for React/React Native projects)
- SCSS (For projects that do not use CSS-in-JS)

2.  Import the package for use:

For React projects:

```js
import { typography } from "aviary-tokens";
```

For SCSS projects:

You can import from the base `scss` folder to include all of the variables for use in your project

```scss
@import "aviary-tokens/build/scss";
```

3.  Use the tokens!

### React:

```js
import { typography } from "aviary-tokens";

export const myStyles = css`
  font-size: ${typography.h1FontSize};
  font-weight: ${typography.weightBold};
`;
```

### Resources

Our Design tokens in Figma: [Foundations](https://www.figma.com/file/ed7GjnB5rfEQ1CdTTh9jFP/Foundations?node-id=399%3A398)

### Contributing
Pull requests are welcome. See the [contribution guidelines](https://github.com/Fullscript/aviary-tokens/blob/main/.github/CONTRIBUTING.md) for more information.
