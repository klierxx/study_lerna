import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: true,
    }
  },
  server: {
    open: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // secure: false, // 如果目标服务器是 https 且证书无效，可以设置为 false
        // ws: true, // 如果需要代理 WebSocket 连接
        // configure: (proxy, options) => {
        //   // proxy 是 'http-proxy' 的实例
        //   // 可以在这里进行更底层的配置
        // },
        // bypass: (req, res, proxyOptions) => {
        //   // 如果你想在某些条件下不代理这个请求，可以返回一个路径或者 undefined
        //   // if (req.headers.accept.includes('html')) {
        //   //   return '/index.html';
        //   // }
        // }
      },
    }
  }
})
