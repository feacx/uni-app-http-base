

module.exports = {
    devServer: {
        host: '127.0.0.1',
        port: 9999,
        proxy: {
            '/api': {
                target: 'https://api.github.com',  // 代理真实地址
            }
        }
    },
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
}
