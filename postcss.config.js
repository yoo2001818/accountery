module.exports = {
  plugins: [
    require('postcss-import')({}),
    require('postcss-nesting')({}),
    require('postcss-cssnext')({
      features: {
        nesting: false,
      },
    }),
  ],
};
