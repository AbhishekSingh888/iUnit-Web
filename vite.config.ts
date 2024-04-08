
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default (mode: string) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react()],
    base: env.VITE_BASEURL,
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APIURL,
          rewrite: url => url.replace(/^\/api/, ''),
          followRedirects: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  })
}
