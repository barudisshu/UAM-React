/** @format */

const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javaScriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A',
      '@layout-body-background': '#FFFFFF',
      '@layout-header-background': '#FFFFFF',
      '@layout-footer-background': '#FFFFFF',
    },
  }),
);
