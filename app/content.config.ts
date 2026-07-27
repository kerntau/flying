import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./app/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string().optional(),
    category: z.string().default("默认分类"),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Handsome"),
  }),
});

const photos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./app/content/photos" }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    description: z.string().optional(),
    group: z.string().default("日常纪行"),
    date: z.coerce.date(),
  }),
});

const moments = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./app/content/moments" }),
  schema: z.object({
    content: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  moments,
  photos,
  posts,
};
