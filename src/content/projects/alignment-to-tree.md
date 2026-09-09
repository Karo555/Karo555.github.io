---
title: "From two sequences to a tree"
note: "The classical alignment-to-phylogeny stack, implemented from scratch: five programs that hand their output to the next."
status: "five implementations, written from scratch"
order: 10
period: "2024 — 2025"
pipeline:
  - repo: needleman-wunsch
    url: https://github.com/Karo555/needleman-wunsch
    label: Pairwise global alignment
    input: two sequences
    output: one alignment
    figure: dp-matrix
    blurb: "Dynamic programming over the full scoring matrix, with traceback."
  - repo: multiple_sequence_alignment
    url: https://github.com/Karo555/multiple_sequence_alignment
    label: Multiple sequence alignment
    input: n sequences
    output: an alignment block
    figure: msa-columns
    blurb: "Progressive extension of pairwise alignment to a set of sequences."
  - repo: sequence_concatenator
    url: https://github.com/Karo555/sequence_concatenator
    label: Supermatrix assembly
    input: k alignments
    output: one concatenated matrix
    figure: supermatrix
    blurb: "Joins per-gene alignments into a single matrix, tracking partitions."
  - repo: UPGMA
    url: https://github.com/Karo555/UPGMA
    label: Hierarchical clustering
    input: a distance matrix
    output: a clustering
    figure: clustering
    blurb: "Average-linkage clustering, merging the closest pair at each step."
  - repo: phylogenetic_tree
    url: https://github.com/Karo555/phylogenetic_tree
    label: Tree construction
    input: a clustering
    output: a tree
    figure: dendrogram
    blurb: "Builds and renders the tree implied by the clustering."
---

These are implementations, not libraries. Each one was written to understand the
algorithm rather than to compete with an existing package, and each takes its
input from the program above it.

## Why build the whole chain

An alignment algorithm on its own is an exercise. The chain is the part worth
showing: every stage makes an assumption that the next stage inherits, and those
assumptions are only visible when the output of one program has to be the input
of another.

## What is not here

No substitution model beyond the scoring schemes each program defines, no
bootstrap support on the trees, and no attempt at the performance of an
optimised implementation.
