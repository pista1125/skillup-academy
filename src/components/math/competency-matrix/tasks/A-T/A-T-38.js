export default {
  id: 'A-T-38',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kocka — felülnézet',
  difficulty: 2,
  scenario: 'Egy asztalon **4 egyforma kocka** áll egymás mellett, egyenes vonalban.',
  question: 'Hogyan néz ki a kockák **felülnézete**?',
  visual: {
    type: 'comparison',
    shapes: [
      { label: 'A', kind: '1×4 sor' },
      { label: 'B', kind: '2×2 négyzet' },
      { label: 'C', kind: '1×1 négyzet' },
      { label: 'D', kind: '4×4 négyzet' }
    ]
  },
  options: ['A (1×4 sor)', 'B (2×2)', 'C (1×1)', 'D (4×4)'],
  answer: 'A (1×4 sor)',
  keywords: ['nézet', 'térbeli', 'felülnézet'],
  solution: `**Felülnézetben** csak az számít, mi látszik fentről lefelé nézve.

Négy kocka egymás mellett egyenes vonalban — fentről nézve **négy négyzet egy sorban**, vagyis egy **1×4-es téglalap**.

**A helyes válasz: A.**`
};
