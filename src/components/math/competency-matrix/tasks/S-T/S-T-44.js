export default {
  id: 'S-T-44',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kétjegyű számok képzése',
  difficulty: 2,
  scenario: 'A $\\{1, 2, 3\\}$ számjegyekből **kétjegyű** számokat képzünk. A számjegyek **ismétlődhetnek**.',
  question: 'Hányféle szám képezhető?',
  options: ['3', '6', '9', '12'],
  answer: '9',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Szorzási elv:** az első helyre 3, a másodikra is 3 lehetőség.

$$3 \\cdot 3 = \\mathbf{9}$$

**A helyes válasz: 9.**`
};
