const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const tsconfigLocation = path.resolve(__dirname, '../tsconfig.json');

module.exports = function() {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push('ts');
  // Extend build
  this.extendBuild(config => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }
    };
    // Add TypeScript loader
    config.module.rules.push({
      test: /((client|server)\.js)|(\.tsx?)$/,
      exclude: [/server/, /node_modules/],
      ...tsLoader
    });
    // Add TypeScript loader for vue files
    for (const rule of config.module.rules) {
      if (rule.loader === 'vue-loader') {
        rule.options.loaders.ts = tsLoader;
      }
    }
    // Add .ts extension in webpack resolve
    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts');
    }
    // Add a webpack plugin
    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        tsconfig: tsconfigLocation,
        vue: true,
        watch: ['client']
      })
    );
  });
};

// module.exports.meta = require('../../package.json');
