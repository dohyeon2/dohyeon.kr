import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    appType: "spa",
    plugins: [tailwindcss()],
});
