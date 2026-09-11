---
title: "EasyTalk"
note: "An AI tool that answers questions about any website through a chat interface, combining web scrapers with a language model to find and format the answer."
status: "HackYeah 2024, Open Task: Artificial Intelligence"
order: 20
period: "2024"
repo: https://github.com/LukiLenkiewicz/hackyeah2024-ml
methods:
  - information retrieval
  - web scraping
  - large language models
  - Python
  - Streamlit
award:
  label: "1st place"
  body: "HackYeah 2024"
  year: 2024
press:
  - title: "Programujemy dobrą przyszłość: Govtech partnerem największego hackathonu w Europie"
    source: "GovTech Polska"
    url: https://www.gov.pl/web/govtech/programujemy-dobra-przyszlosc-govtech-partnerem-najwiekszego-hackathonu-w-europie
    date: "2024-10-01"
  - title: "KN Solvro zwyciężyło w ogólnopolskim hackathonie HackYeah!"
    source: "Politechnika Wrocławska"
    url: https://wit.pwr.edu.pl/aktualnosci/kn-solvro-zwyciezylo-w-ogolnopolskim-hackathonie-hackyeah-339.html
    date: "2024-10-03"
  - title: "HackYeah 2024 zwyciężone!"
    source: "KN Solvro"
    url: https://solvro.pwr.edu.pl/pl/blog/hack-yeah-2024-zwyciezone/
    date: "2024-09-30"
---

## What it does

Point EasyTalk at a website and ask it a question. It checks whether the
starting page already holds the answer; if not, it explores the site's
subpages, prioritising the ones most relevant to the question, until it finds
one that does. The answer comes back formatted for the question — a
step-by-step list when you ask for instructions, a direct answer when you ask
for a fact.

## How it works

Two parts, combined: web scrapers that fetch and traverse pages, and a language
model that judges relevance, decides whether a page can answer the question,
and shapes the final response. The interface is a Streamlit chat app backed by
the OpenAI API.

Submitted to HackYeah 2024 for the Open Task: Artificial Intelligence
challenge.