export default {
  id: 'A-T-04',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kocka hálója',
  difficulty: 3,
  scenario: 'Az alábbi négy ábrát látod.',
  question: 'Melyikből **NEM** lehet kockát hajtogatni?',
  visual: {
    type: 'cubeNets',
    nets: ['cross', 'T', 'O', 'row6']
  },
  options: ['A (kereszt)', 'B (T-alak)', 'C (2×3 téglalap)', 'D (6 egyenes sorban)'],
  answer: 'C (2×3 téglalap)',
  keywords: ['test ábrázolása', 'háló'],
  solution: `A kocka hálójának 6 darab négyzetből kell állnia, **nem egyetlen nagy téglalapból**.

- A (kereszt), B (T-alak), D (6 egymás után) — **mindegyik** kockához hajtható.
- C egy 2×3-as téglalap **egyben** — ez nem 6 szétválasztható négyzet, ezért nem hajtható kockává.

**A helyes válasz: C.**`
};
