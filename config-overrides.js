const { override, addLessLoader } = require('customize-cra');

module.exports = override(
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
);