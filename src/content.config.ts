import { defineCollection } from 'astro:content'
import { postLoader, shortsLoader } from 'sakuin/astro'

const posts = defineCollection({
  loader: postLoader({ handle: 'meanc-9641' }),
})

const shorts = defineCollection({
  loader: shortsLoader({ handle: 'meanc-9641' }),
})

export const collections = { posts, shorts }
