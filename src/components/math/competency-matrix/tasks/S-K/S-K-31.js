export default {
  id: 'S-K-31',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromjegyű páratlan számok',
  difficulty: 6,
  scenario: 'Az $\\{1, 2, 3, 4, 5, 6\\}$ jegyekből **háromjegyű páratlan** számokat képzünk, a jegyek **különbözők**.',
  question: 'Hány ilyen szám van?',
  options: ['30', '60', '90', '120'],
  answer: '60',
  keywords: ['kombinatorika', 'páratlan'],
  solution: `**Utolsó jegy páratlan:** $\\{1,3,5\\}$ → **3** lehetőség.

**Első:** a maradék 5-ből → 5.

**Második:** a maradék 4-ből → 4.

$$5 \\cdot 4 \\cdot 3 = \\mathbf{60}$$

**A helyes válasz: 60.**`
};
