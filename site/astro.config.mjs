// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import { remarkCodeImport } from './remark-code-import.mjs'

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkCodeImport],
  },
  vite: {
    ssr: {
      // https://github.com/withastro/astro/issues/14117#issuecomment-3117797751
      noExternal: ['zod'],
    },
  },
  integrations: [
    starlight({
      title: 'Typedex',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/nathanbabcock/typedex',
        },
      ],
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Typesafety',
          autogenerate: { directory: 'typesafety' },
        },
        {
          label: 'Philosophy',
          autogenerate: { directory: 'philosophy' },
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
})
