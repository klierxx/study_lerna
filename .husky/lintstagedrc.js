module.exports = {
  // 对 TypeScript、JavaScript 和 Vue 文件进行 ESLint 检查和 Prettier 格式化
  '*.{ts,tsx,js,jsx,vue}': ['eslint --fix', 'prettier --write'],

  // 对其他支持的文件进行 Prettier 格式化，排除特定配置文件
  '*.{json,css,scss,less,md}': ['prettier --write']
};
