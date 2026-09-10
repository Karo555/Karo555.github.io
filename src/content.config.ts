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
    methods: z.array(z.string()).max(6).optional(),
  }),
});

// Publications link out to a DOI and get no detail page, so there is no body
// to render: every field that matters lives in the frontmatter.
const papers = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/papers" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()), // full list, in publication order
    me: z.number().int().min(0), // zero-based index of the site owner
    venue: z.string(), // journal or preprint server
    year: z.number().int(),
    // Optional: a paper can be accepted and not yet assigned a DOI.
    doi: z.string().optional(), // bare DOI, e.g. 10.1234/abcd.2026.001
    status: z.enum(["preprint", "in review", "peer-reviewed"]),
    methods: z.array(z.string()).max(6).optional(),
  }),
});

export const collections = { projects, papers };