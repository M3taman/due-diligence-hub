import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Changed from '@vitejs/plugin-react-swc'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import sitemap from 'vite-plugin-sitemap'
import { imagetools } from 'vite-imagetools' // Ensure this is updated to version 7.0.5
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: "Due Diligence Hub",
        short_name: "DD Hub",
        description: 'A web application for due diligence management.',
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    sitemap({
      hostname: 'https://yourdomain.com',
    }),
    imagetools(), // Updated to vite-imagetools@7.0.5
    viteCompression(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-label', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    outDir: 'dist',
  },
});