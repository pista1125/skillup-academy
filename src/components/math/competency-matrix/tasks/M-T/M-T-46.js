export default {
  id: 'M-T-46',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Páros-páratlan felismerés',
  difficulty: 2,
  scenario: 'A sportnapon a rajtszámok közül kell kiszűrni a **páratlan számokat**.',
  question: 'Hány **páratlan** szám van az alábbiak között: $12, 17, 24, 35, 48, 51, 60$?',
  visual: {
    type: 'sequence',
    items: [12, 17, 24, 35, 48, 51, 60],
    rule: 'páros/páratlan'
  },
  options: ['2', '3', '4', '5'],
  answer: '3',
  keywords: ['páros', 'páratlan'],
  solution: 'Páratlanok: **17, 35, 51** — összesen **3 db**.'
};
