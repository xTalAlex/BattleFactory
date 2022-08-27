import { defineConfig } from "astro/config";

import netlify from '@astrojs/netlify/functions';

import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  experimental: {
    integrations: true,
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    vue(),
    astroI18next(),
  ],
});