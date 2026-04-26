export default {
  id: 'A-T-10',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Pillangó szimmetria',
  difficulty: 2,
  scenario: 'Egy pillangó **fele** látható a rajzon. A másik fél a **függőleges tengelyre** való tükrözéssel áll elő.',
  question: 'Melyik pont lesz az $(-4; 2)$ pont **tükörképe**?',
  visual: {
    type: 'symmetryHalf',
    axis: 'vertical',
    halfPoints: [
      {
        x: -4,
        y: 2
      },
      {
        x: -3,
        y: 4
      },
      {
        x: -2,
        y: 1
      }
    ]
  },
  options: ['(4; 2)', '(−4; −2)', '(4; −2)', '(−2; 4)'],
  answer: '(4; 2)',
  keywords: ['tengelyes tükrözés', 'szimmetria'],
  solution: `**Függőleges tengelyre tükrözéskor:**

- Az $x$ koordináta előjele megváltozik, az $y$ változatlan.
- $(-4; 2) \\to (\\mathbf{4;\\ 2})$.`
};
