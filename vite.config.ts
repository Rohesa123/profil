import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

function siteUrl(env: Record<string, string>): Plugin {
  const url = (
    env.SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:5173'
  ).replace(/\/$/, '')

  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', url),
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), siteUrl(loadEnv(mode, '.', ''))],
}))
