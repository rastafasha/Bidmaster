import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

const manifestIcons = [
  {
    src: './assets/icons/icon-192.png',
    sizes: '192x192',
    type: 'image/png',
  },
  {
    src: './assets/icons/icon-512.png',
    sizes: '512x512',
    type: 'image/png',
  }
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'BidMaster',
        short_name: 'Bidmaster',
        icons: manifestIcons,
      }
    })
  ],
})
