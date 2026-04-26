export default {
  id: 'S-T-21',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Bélyeggyűjtemény — pontdiagram',
  difficulty: 2,
  scenario: 'Nyolc barát feljegyezte, hány külföldi bélyegük van a gyűjteményükben. A pontdiagramon minden pont egy gyűjtőt jelöl.',
  question: 'Hány gyűjtőnek van pontosan **4 bélyege**?',
  visual: {
    type: 'dotPlot',
    xLabel: 'Bélyegek száma',
    xMin: 1,
    xMax: 7,
    dots: [
      { x: 1, count: 1 },
      { x: 2, count: 1 },
      { x: 3, count: 2 },
      { x: 4, count: 3 },
      { x: 5, count: 0 },
      { x: 6, count: 1 }
    ]
  },
  options: ['1', '2', '3', '4'],
  answer: '3',
  keywords: ['pontdiagram', 'gyakoriság'],
  solution: `A pontdiagramon a **4-es érték** fölött **3 pont** látható.

**A helyes válasz: 3.**`
};
