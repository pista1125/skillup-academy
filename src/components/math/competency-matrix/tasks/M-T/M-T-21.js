export default {
  id: 'M-T-21',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Számegyenes — 4/6',
  difficulty: 2,
  scenario: 'A számegyenesen 0 és 1 között 6 egyenlő részre osztottuk a szakaszt.',
  question: 'Melyik pont jelöli a(z) $\\tfrac{4}{6}$-ot?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 1,
    divisions: 6,
    points: [
      {
        x: 0.5,
        label: 'A'
      },
      {
        x: 0.6666666666666666,
        label: 'B'
      },
      {
        x: 0.8333333333333334,
        label: 'C'
      }
    ]
  },
  options: ['A', 'B', 'C'],
  answer: 'B',
  keywords: ['számegyenes', 'tört'],
  solution: `Az $\\tfrac{4/6}$ = 0,67 — a **4.** osztáspont.

**B pont.**`
};
