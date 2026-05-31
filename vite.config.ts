import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const tailscaleAllowedHosts = ["blaubeere", ".ts.net"];

export default defineConfig({
  base: "/gitfolio/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5713,
    strictPort: true,
    allowedHosts: tailscaleAllowedHosts,
  },
  preview: {
    host: "0.0.0.0",
    port: 5713,
    strictPort: true,
    allowedHosts: tailscaleAllowedHosts,
  },
});
