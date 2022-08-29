import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import tailwind from '@astrojs/tailwind';
import vue from '@astrojs/vue';
import astroI18next from 'astro-i18next';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // output: 'server',
  // adapter: netlify(),
  site: 'https://battlefactory.netlify.app',
  experimental: {
    integrations: true,
  },
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    vue(),
    astroI18next(),
    sitemap({
      filter: (page) => page !== 'https://battlefactory.netlify.app/404',
      i18n : {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          it: 'it',
        },
      }
    })
  ],
});