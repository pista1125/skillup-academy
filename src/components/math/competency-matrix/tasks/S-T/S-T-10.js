export default {
  id: 'S-T-10',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Logikai értékek — állítás igazságtartalma',
  difficulty: 2,
  scenario: 'Vizsgáld meg az alábbi négy állítást, és döntsd el, melyik **HAMIS**.',
  question: 'Melyik állítás **HAMIS**?',
  visual: {
    type: 'table',
    caption: 'Állítások',
    headers: ['Sorszám', 'Állítás'],
    rows: [
      ['A', 'Minden négyzet téglalap.'],
      ['B', 'A 10 páros szám.'],
      ['C', 'Minden prímszám páratlan.'],
      ['D', 'A háromszögnek három szöge van.']
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['logikai érték', 'igaz-hamis', 'állítás'],
  solution: `**Állítások vizsgálata:**

- A: Minden négyzet egyben téglalap is (4 derékszög). **IGAZ.**
- B: $10 = 2 \\cdot 5$, páros. **IGAZ.**
- C: A **2 prímszám és páros**, tehát nem minden prím páratlan. **HAMIS.**
- D: Definíció szerint a háromszögnek 3 szöge van. **IGAZ.**

**A helyes válasz: C.**`
};
