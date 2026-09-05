import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration de base de Vite (l'outil qui fait fonctionner React)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
});
