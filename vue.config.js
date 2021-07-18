// eslint-disable-next-line
const path = require('path')

module.exports = {
    devSever: {
        proxy: {
            '^/api': {
                target: process.env.VUE_APP_BACK_SERVER || 'http://localhost:9000',
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src/'),
                '@components': path.join(__dirname, 'src/components'),
                '@pages': path.join(__dirname, 'src/pages'),
                '@services': path.join(__dirname, 'src/services'),
                '@stores': path.join(__dirname, 'src/stores')
            },
            extensions: ['.vue']
        }
    },
    transpileDependencies: ['vuex-module-decorators'],
    runtimeCompiler: true
}