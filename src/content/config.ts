import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    date: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    update: z
      .string()
      .or(z.date())
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    image: z.string().optional(),
    ogp: z.string().optional(),
  }),
})

export const collections = { posts }
