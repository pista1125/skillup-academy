export default {
  id: 'S-A-03',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Ruhakombinációk',
  difficulty: 4,
  scenario: 'Zolinak **3 pólója** (piros, kék, zöld) és **2 nadrágja** (fekete, farmer) van. Minden nap egy pólót és egy nadrágot vesz fel.',
  question: 'Hányféleképpen tudja összeállítani az öltözékét?',
  visual: {
    type: 'treeDiagram',
    root: 'Öltözék',
    levels: [
      {
        label: 'Póló',
        branches: ['piros', 'kék', 'zöld']
      },
      {
        label: 'Nadrág',
        branches: ['fekete', 'farmer']
      }
    ]
  },
  options: ['3', '5', '6', '9'],
  answer: '6',
  keywords: ['kombinatorika', 'összeszámlálás', 'szorzási elv'],
  solution: `**Szorzási szabály:**

Minden pólóhoz **2** nadrág tartozhat, és **3** pólónk van:

$$3 \\cdot 2 = \\mathbf{6}$$

**A 6 öltözék:** (piros-fekete), (piros-farmer), (kék-fekete), (kék-farmer), (zöld-fekete), (zöld-farmer).

**A helyes válasz: 6.**`
};
