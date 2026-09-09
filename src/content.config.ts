import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One program in an ordered chain: what it consumes, what it emits, and which
// inline figure stands for it. Order comes from the array, never from the code.
const stage = z.object({
  repo: z.string(),
  url: z.string().url(),
  label: z.string(),
  input: z.string(),
  output: z.string(),
  figure: z.enum([
    "dp-matrix",
    "msa-columns",
    "supermatrix",
    "clustering",
    "dendrogram",
  ]),
  blurb: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    note: z.string(),
    status: z.string(),
    order: z.number(),
    period: z.string().optional(),
    pipeline: z.array(stage).optional(),
  }),
});

export const collections = { projects };