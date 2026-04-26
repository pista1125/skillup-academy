export default {
  id: 'S-A-09',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Úthálózat — lehetséges útvonalak',
  difficulty: 4,
  scenario: 'Az **A** városból a **C** városba csak a **B** városon keresztül lehet eljutni. A-ból B-be **3 út**, B-ből C-be **4 út** vezet.',
  question: 'Hányféleképpen lehet eljutni **A-ból C-be**?',
  visual: {
    type: 'treeDiagram',
    root: 'A → C',
    levels: [
      {
        label: 'A → B (út)',
        branches: ['1. út', '2. út', '3. út']
      },
      {
        label: 'B → C (út)',
        branches: ['a', 'b', 'c', 'd']
      }
    ]
  },
  options: ['7', '10', '12', '16'],
  answer: '12',
  keywords: ['gráf', 'utak', 'szorzási elv'],
  solution: `**Szorzási szabály:**

Minden A→B úthoz 4 B→C út tartozhat:

$$3 \\cdot 4 = \\mathbf{12}$$

**A helyes válasz: 12 útvonal.**`
};
