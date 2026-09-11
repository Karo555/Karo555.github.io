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

// An award is a durable property of the work. label and body stay separate so
// the rendered string can be reformatted without touching content files; both
// are required, since an award with no named body cannot be rendered.
const award = z.object({
  label: z.string(), // e.g. "Best Paper"
  body: z.string(), // awarding venue or institution, e.g. "ICCCI 2025"
  year: z.number().int(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    note: z.string(),
    status: z.string(),
    order: z.number(),
    period: z.string().optional(),
    // A single repository, for work that is not a pipeline of several.
    repo: z.string().url().optional(),
    pipeline: z.array(stage).optional(),
    methods: z.array(z.string()).max(6).optional(),
    award: award.optional(),
    // Coverage elsewhere. Title is kept verbatim in the source language.
    press: z
      .array(
        z.object({
          title: z.string(),
          source: z.string(),
          url: z.string().url(),
          date: z.string().optional(), // ISO, e.g. 2024-10-01
        })
      )
      .optional(),
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
    award: award.optional(),
  }),
});

export const collections = { projects, papers };