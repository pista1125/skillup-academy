export default {
  id: 'M-T-20',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Számegyenes — 2/5',
  difficulty: 2,
  scenario: 'A számegyenesen 0 és 1 között 5 egyenlő részre osztottuk a szakaszt.',
  question: 'Melyik pont jelöli a(z) $\\tfrac{2}{5}$-ot?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 1,
    divisions: 5,
    points: [
      {
        x: 0.2,
        label: 'A'
      },
      {
        x: 0.4,
        label: 'B'
      },
      {
        x: 0.6,
        label: 'C'
      }
    ]
  },
  options: ['A', 'B', 'C'],
  answer: 'B',
  keywords: ['számegyenes', 'tört'],
  solution: `Az $\\tfrac{2/5}$ = 0,40 — a **2.** osztáspont.

**B pont.**`
};
