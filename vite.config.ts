import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    appType: "spa",
    plugins: [tailwindcss()],
    resolve: {
        alias: [
            {
                find: "utilities",
                replacement: "/src/utilities",
            },
        ],
    },
});
