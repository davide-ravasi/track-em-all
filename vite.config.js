import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Track'em all - Movies and Tv series Tracker",
        short_name: "Track'em all",
        description:
          "Track'em all is a single-page app that helps you discover new TV series, keep track of your favorite ones and know when new episodes come out (...so you don't miss them :) ).",
        icons: [
          {
            src: "/logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/logo180.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
        theme_color: "#2e2d3f",
        background_color: "#2e2d3f",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        lang: "en-US",
      },
    }),
  ],
  build: {
    outDir: "build",
  },
});
