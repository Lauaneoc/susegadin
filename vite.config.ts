import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        "id": "/",
        "dir": "ltr",
        "lang": "en",
        "name": "bwa-app",
        "scope": "/",
        "display": "standalone",
        "start_url": "/",
        "short_name": "bwa-app",
        "theme_color": "#000000",
        "description": "Teste PWA",
        "orientation": "any",
        "background_color": "#FFFFFF",
        "related_applications": [],
        "prefer_related_applications": false,
        "display_override": [
          "window-controls-overlay"
        ],
        "launch_handler": {
          "client_mode": "navigate-existing"
        },
        "icons": [
          {
            "src": "/icons/512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          },
          {
            "src": "/icons/144.png",
            "sizes": "144x144",
            "type": "image/png",
            "purpose": "any"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith('/api')
            },
            handler: "CacheFirst" as const,
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          }
        ]
      }
    })
  ],
})
