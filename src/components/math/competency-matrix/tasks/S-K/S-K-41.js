export default {
  id: 'S-K-41',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Színes virágok csokra',
  difficulty: 7,
  scenario: 'Egy virágoshoz **5 piros, 3 fehér, 2 sárga** szál érkezett. **3 szálat** választunk (sorrend nem számít).',
  question: 'Hányféleképpen választhatók, **ha mind különböző színű**?',
  options: ['10', '15', '30', '60'],
  answer: '30',
  keywords: ['kombinatorika', 'szorzási elv'],
  solution: `**Egy-egy-egy szál:** piros 5, fehér 3, sárga 2 közül egy-egy.

$$5 \\cdot 3 \\cdot 2 = \\mathbf{30}$$

**A helyes válasz: 30.**`
};
