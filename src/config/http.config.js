const CONFIG = {
  // 开发环境配置
  development: {
      assetsPath: '/static', // 静态资源路径
      baseUrl: 'http://apis.juhe.cn', // 后台接口请求地址,
      key: '682d5c7263bcbbd236163686146fe7a3',
      appid: 'asdafsdfdsf',
  },
  // 生产环境配置
  production: {
      assetsPath: '/static', // 静态资源路径
      baseUrl: 'http://apis.juhe.cn', // 后台接口请求地址
      key: '682d5c7263bcbbd236163686146fe7a3',
      appid: 'asdafsdfdsf',
  }
};
export default CONFIG[process.env.NODE_ENV];
