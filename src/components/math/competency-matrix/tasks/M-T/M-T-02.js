export default {
  id: 'M-T-02',
  contentArea: 'M',
  contentSub: '1.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Számegyenes — tört elhelyezése',
  difficulty: 2,
  scenario: 'A számegyenesen 0 és 1 között 8 egyenlő részre osztottuk a szakaszt.',
  question: 'Melyik pont jelöli az $\\tfrac{5}{8}$-ot?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 1,
    divisions: 8,
    points: [
      {
        x: 0.375,
        label: 'A'
      },
      {
        x: 0.5,
        label: 'B'
      },
      {
        x: 0.625,
        label: 'C'
      },
      {
        x: 0.75,
        label: 'D'
      }
    ]
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['számegyenes', 'tört'],
  solution: `**Számegyenes olvasása:**

1. A 0-tól 1-ig tartó szakaszt **8 egyenlő részre** osztottuk.
2. Az $\\tfrac{5}{8}$ tehát a **0-tól számított 5. osztáspont**.
3. A C pont van ott → **C a helyes válasz**.`
};
