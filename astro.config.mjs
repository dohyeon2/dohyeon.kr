// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://dohyeon.kr',
	integrations: [mdx(), sitemap()],
	vite: {
		// @ts-ignore
		plugins: [tailwindcss()],
	},
});
