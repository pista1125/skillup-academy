export default {
  id: 'M-T-07',
  contentArea: 'M',
  contentSub: '1.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.1',
  title: 'Helyiértékek',
  difficulty: 1,
  scenario: 'A **45 027** számot helyiérték-táblázatba írtuk.',
  question: 'Hány **száz** van a számban?',
  visual: {
    type: 'table',
    caption: 'Helyiérték-táblázat',
    headers: ['Tízezres', 'Ezres', 'Százas', 'Tízes', 'Egyes'],
    rows: [
      ['4', '5', '0', '2', '7']
    ]
  },
  options: ['0', '2', '5', '27'],
  answer: '0',
  keywords: ['helyi érték', 'számfelbontás'],
  solution: `**Helyiérték-olvasás:**

A $45\\,027$ szám felbontása: $4 \\cdot 10\\,000 + 5 \\cdot 1000 + 0 \\cdot 100 + 2 \\cdot 10 + 7$.

A **százasok** helyén **0** áll, tehát a számban **0 darab száz** van.`
};
