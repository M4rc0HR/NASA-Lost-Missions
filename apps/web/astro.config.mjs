import { defineConfig } from "astro/config";

export default defineConfig({
  srcDir: "src",
  publicDir: "public",
  output: "static",

  server: {
    host: "0.0.0.0",
    port: 4321
  },

  vite: {
    server: {
      allowedHosts: [
        "amperage-curfew-referee.ngrok-free.dev"
      ]
    }
  }
});
