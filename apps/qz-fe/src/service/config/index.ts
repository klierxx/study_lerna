// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)
// 区分开发环境和生产环境
export const PROD_BASE_URL = 'xxx';
export const DEV_BASE_URL = 'xxx';
let BASE_URL = '';
if (import.meta.env.PROD) {
  // 生产环境
  BASE_URL = PROD_BASE_URL;
} else {
  // 开发环境
  BASE_URL = DEV_BASE_URL;
}

// 通过创建.env文件直接创建变量

export const TIME_OUT = 10000;
export { BASE_URL };
