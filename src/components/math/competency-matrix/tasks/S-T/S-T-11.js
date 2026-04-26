export default {
  id: 'S-T-11',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Eseménygráf — barátok kézfogása',
  difficulty: 2,
  scenario: '**4 barát** találkozik, és mindenki mindenkivel egyszer kezet fog. A gráf csúcsai a barátok, az élek a kézfogásokat jelölik.',
  question: 'Hány **kézfogás** történik összesen?',
  visual: {
    type: 'treeDiagram',
    root: 'Kézfogások',
    levels: [
      {
        label: '1. barát',
        branches: ['2. baráttal', '3. baráttal', '4. baráttal']
      },
      {
        label: 'További párok',
        branches: ['2-3', '2-4', '3-4']
      }
    ]
  },
  options: ['4', '6', '8', '12'],
  answer: '6',
  keywords: ['gráf', 'élek', 'kézfogás', 'kombinatorika'],
  solution: `**Élek összeszámlálása:**

$4$ csúcs között minden pár egy él. A párok száma:

$$\\dfrac{4 \\cdot 3}{2} = \\mathbf{6}$$

A párok: 1-2, 1-3, 1-4, 2-3, 2-4, 3-4 — összesen **6 kézfogás**.

**A helyes válasz: 6.**`
};
