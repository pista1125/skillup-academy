export default {
  id: 'S-K-35',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Ki a tettes? (logika)',
  difficulty: 7,
  scenario: `Három gyanúsított: Anna, Béla, Cili. Az alábbi kijelentések közül **pontosan egy** hazudik.

- **Anna:** „Nem én voltam."
- **Béla:** „Cili volt."
- **Cili:** „Béla hazudik."`,
  question: 'Ki a tettes?',
  options: ['Anna', 'Béla', 'Cili', 'Nem eldönthető'],
  answer: 'Cili',
  keywords: ['logika', 'igaz-hamis'],
  solution: `Ha **Béla** hazudik (ő mondja, hogy Cili volt), akkor Cili nem a tettes. De Cili azt mondja: „Béla hazudik" → ez igaz → konzisztens. Anna szerint „nem én voltam" → igaz → a tettes Anna vagy Cili. Ha nem Cili (Béla hazudik), akkor Anna — de Anna igazat mond. **Ellentmondás.**

Ha **Anna** hazudik: „nem én voltam" → hazugság → Anna a tettes. De akkor Béla is hazudik (Cili volt) → két hazug. **Rossz.**

Ha **Cili** hazudik: „Béla hazudik" → hamis → Béla igazat mond → **Cili a tettes**. Anna is igazat mond → konzisztens (Anna nem tettes). ✓

**A helyes válasz: Cili.**`
};
