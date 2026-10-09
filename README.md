# Chapter Lens

A free, browser-only English readability checker for authors. Paste a chapter to see its Flesch Reading Ease score and up to five hardest sentences highlighted.

## Features

- Chapter-level readability, word count and sentence count
- Five hardest sentences ranked using sentence-level reading ease
- Original chapter text preserved in the highlighted preview
- No accounts, analytics, uploads or external services
- Responsive layout and keyboard-accessible controls

## Method and limits

Flesch Reading Ease = 206.835 - 1.015 × words/sentences - 84.6 × syllables/words.

Sentence detection handles common abbreviations and decimals. Syllable counts use an English heuristic plus a small exception dictionary. Scores are estimates, can fall outside 0–100, and do not measure literary quality. Proper nouns, dialogue, abbreviations and non-English text may affect accuracy.

## Run

Open `dist/index.html` in a browser. No dependencies or build required. For GitHub Pages, publish the contents of `dist` at the repository root.

## Development

Built with OpenAI Codex. During testing, the initial syllable heuristic counted “business” as three syllables instead of two; corrected with an exception and regression check.

Author: Aahil Jamadar