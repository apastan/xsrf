import {defineConfig, loadEnv, type ProxyOptions} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig((configEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), '')
  const base =
      configEnv.mode === 'production' ? '/xsrf' : '/'

  const proxyTarget: ProxyOptions = {
    target: env.VITE_API_URL,
    changeOrigin: true,
    secure: false,
    ws: true,
  }

  const proxyOptions: Record<string, ProxyOptions> = {
    '/api': proxyTarget,
    '/viewer': proxyTarget,
    '/auth': proxyTarget,
  }

  return {
    plugins: [react()],

    server: {
      port: 3000,
      proxy: proxyOptions,
    },
    base
  }
})
