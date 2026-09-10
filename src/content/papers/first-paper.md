---
title: "Persona-guided sentiment analysis"
authors: ["Karolina Nowacka", "Bartłomiej Koptyra", "Jan Kocoń"]
me: 0
venue: "ICCCI"
year: 2026
status: "peer-reviewed"
---

## What the paper asks

Sentiment analysis usually treats sentiment as a universal fact about a text: a
review is positive, or it is not. Medical reviews break that assumption. The same
account of a procedure can read as reassuring to one patient and alarming to
another, and in healthcare that difference decides whether someone trusts a
provider or avoids one.

This paper models that variation directly, by asking who is reading.

## Synthetic personas

Rather than collecting per-reader annotations from real patients — expensive, and
impossible to reproduce — the work defines ten synthetic personas, each with a
named profile, a set of emotional sensitivities, and underlying values. A
Grateful Daughter reads through the lens of caring for her sick mother. A
Skeptical Scientist treats reviews as anecdote and values only the parts that
sound like evidence. An Anxious Hypochondriac reads a complication into
everything.

Each persona labels every review for fifteen emotions as present or absent:
positive, negative, happiness, inspiring, surprise, compassion, fear, sadness,
anger, ironic, political, interesting, understandable, offensive, funny.

The payoff is control. Personas are reproducible, so the same reader can be held
fixed across experiments in a way real annotators cannot be.

## The dataset

The corpus starts from Polemo2, keeping only the medical opinions, then adds
online consumer reviews to correct the emotional imbalance that medical sentiment
datasets typically carry — fear and offensive content are usually scarce. New
samples are annotated by DeepSeek-V3, anonymised, and language-corrected. The
whole set is then translated from Polish into English, making it multilingual.

| | |
| :--- | :--- |
| Reviews | 4,495 |
| Personas | 10 |
| Emotion labels | 15 |
| Languages | Polish, English |
| Total annotated entries | 89,900 |

That is a 29% increase in size over the source, with roughly three active labels
per sample. The label space stays skewed: *understandable* appears in 59.78% of
samples and *negative* in 43.76%, while *inspiring* (9.89%), *fear* (10.04%) and
*happiness* (10.47%) stay rare.

## What was compared

Two encoders and two large language models, each trained with a multi-label
binary cross-entropy loss:

- **mDeBERTa-v3-base** — multilingual, 100 languages, for Polish–English transfer.
- **Bio-ClinicalBERT** — pre-trained on PubMed abstracts and MIMIC-III notes.
- **Gemma 3 12B-it** — general-purpose instruction-tuned LLM.
- **PLLuM 8B-instruct** — Polish-adapted LLM.

Persona information reaches the model two ways. The *description* approach
concatenates the persona's full written profile with the review. The *token*
approach prepends a learned special token such as `[PERSON_1]`, letting the model
discover the persona's pattern on its own.

## Results

Persona conditioning is what matters, and the margin is not subtle. On
mDeBERTa in English, the non-personalised model reaches 0.858 accuracy but only
0.107 F1-macro — it predicts the frequent labels and misses the rest. Adding the
persona description lifts the same model to 0.947 accuracy and 0.836 F1.

Three findings stand out:

1. **Description and token conditioning perform about equally.** Neither way of
   telling the model who is reading beats the other by a meaningful margin.
2. **Medical pre-training did not help.** Bio-ClinicalBERT matched but did not
   beat general-purpose mDeBERTa. The paper's reading: these reviews are written
   by patients, not clinicians, so clinical vocabulary is not the bottleneck.
3. **Weighted loss did not beat standard cross-entropy.** Balancing the dataset
   through augmentation had already done that work.

Per emotion, the clearly-signalled ones come out best — happiness reaches 0.900
F1, negative 0.883. The figurative ones remain hardest: offensive 0.668 and funny
0.707, both rare and both dependent on tone rather than wording.

## Limits

Synthetic personas are reproducible precisely because they are not real people,
and the paper is explicit that they may not span the full diversity of actual
patients. Sentiment is also modelled as static, while a patient's feelings about
a course of treatment shift over time — longitudinal modelling is left to future
work.
