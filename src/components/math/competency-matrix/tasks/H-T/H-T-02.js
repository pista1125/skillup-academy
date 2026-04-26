export default {
  id: 'H-T-02',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Dobozok súlya',
  difficulty: 2,
  scenario: 'A táblázatban négy doboz tömegét látod kilogrammban.',
  question: 'Melyik doboz a **legnehezebb**?',
  visual: {
    type: 'table',
    caption: 'Dobozok tömege',
    headers: ['Doboz', 'Tömeg (kg)'],
    rows: [
      ['A', '7,8'],
      ['B', '7,08'],
      ['C', '8,7'],
      ['D', '8,07']
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['tizedes tört', 'összehasonlítás'],
  solution: `**Tizedes törtek összehasonlítása:**

- A: 7,8
- B: 7,08
- C: 8,7
- D: 8,07

A legnagyobb: **C (8,7 kg)**.`
};
