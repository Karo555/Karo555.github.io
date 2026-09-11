---
title: "Hypothesis agents"
note: "A multi-agent system that turns a path through a biomedical knowledge graph into a research hypothesis, grounded in live literature and database lookups and refined through a critic loop."
status: "BeeARD x Google for Education hackathon"
order: 15
period: "2025"
repo: https://github.com/Karo555/SolvroML
methods:
  - multi-agent systems
  - knowledge graphs
  - hypothesis generation
  - LangGraph
  - Python
award:
  label: "3rd place"
  body: "BeeARD x Google for Education hackathon"
  year: 2025
---

## The task

BeeARD's hackathon brief: given a *subgraph* — a short path an explorer agent
has walked through a knowledge graph of biomedical concepts, say
`Inflammation → increases → Amyloid Beta → accumulates in → Alzheimer's Disease`
— build a multi-agent system that returns a novel, defensible research
hypothesis. The subgraph is the creative seed; the agents have to turn it into
a claim worth testing.

## What we built

A five-agent pipeline on LangGraph, with a critic at the end that can send the
whole thing back around:

1. **Graph analyst** — reads the subgraph and produces a structured mechanistic
   summary: the key entities, the relationships between them, and where the
   path is thin.
2. **Context agent** — enriches each entity with what it actually is, querying
   UniProt, Ensembl and DisGeNET rather than relying on the model's memory.
3. **Evidence agent** — runs in parallel with the context agent, pulling
   supporting and contradicting literature from PubMed, Europe PMC and bioRxiv.
4. **Hypothesis generator** — synthesises the summary, context and evidence
   into a stated hypothesis with references.
5. **Critic analyst** — evaluates it and returns `ACCEPT` or a critique. On a
   critique the state loops back to the graph analyst, up to three times.

The retrieval agents run on a small, fast model; the analyst, generator and
critic run on a reasoning model, since those are the steps where the quality
of the thinking sets the ceiling.

## Why the grounding matters

Grounding every entity in a real database and every claim in retrieved
literature is what gives the critic something to weigh. It is evaluating a
hypothesis against evidence, not judging prose — and that is the difference
between a loop that converges and one that just rephrases.
