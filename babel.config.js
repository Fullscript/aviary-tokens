module.exports = function (api) {
  api.cache(true);
  const presets = [
    {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage",
            corejs: "3.25",
            targets: ["last 2 versions"], //https://browserl.ist/?q=last+2+versions%2C+not+dead%2C+%3E+0.2%25%2C+ie+%3E%3D11
          },
        ],
        ["@babel/preset-typescript"],
      ],
    },
  ];

  return {
    presets,
  };
};
