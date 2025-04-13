import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
    appType: "spa",
    plugins: [
        tailwindcss(),
        // Copy Shoelace assets to dist/shoelace
        copy({
            copyOnce: true,
            targets: [
                {
                    src: path.resolve(
                        __dirname,
                        "node_modules/@shoelace-style/shoelace/dist/assets"
                    ),
                    dest: path.resolve(__dirname, "dist/shoelace"),
                },
            ],
        }),
    ],
    resolve: {
        alias: [
            {
                find: "utilities",
                replacement: "/src/utilities",
            },
            {
                find: "constants",
                replacement: "/src/constants",
            },
        ],
    },
});
