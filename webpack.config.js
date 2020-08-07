module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        // include: /node_modules/,
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          minimize: false,
          syntax: "postcss-scss",
          plugins: () => [
            require("postcss-import"),
            require("tailwindcss"),
            require("autoprefixer")({
              grid: true,
            }),
            require("cssnano"),
          ],
        },
      },
    ],
  },
};
