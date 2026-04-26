export default {
  id: 'M-A-10',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Tört számegyenesen',
  difficulty: 4,
  scenario: 'A számegyenesen 0 és 3 között 12 egyenlő részre van osztva.',
  question: 'Melyik pont jelöli a $\\tfrac{7}{4}$ tört értékét?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 3,
    divisions: 12,
    points: [
      {
        x: 1.25,
        label: 'P'
      },
      {
        x: 1.5,
        label: 'Q'
      },
      {
        x: 1.75,
        label: 'R'
      },
      {
        x: 2.25,
        label: 'S'
      }
    ]
  },
  options: ['P', 'Q', 'R', 'S'],
  answer: 'R',
  keywords: ['tört', 'számegyenes', 'egyenlő nevező'],
  solution: `**Tört elhelyezése:**

1. Közös nevezőre: $\\tfrac{7}{4} = \\tfrac{21}{12}$.
2. A 0-tól számított **21.** osztáspont, ami $\\tfrac{21}{12} = 1{,}75$.
3. Az **R pont** van $1{,}75$-nél → **R**.`
};
