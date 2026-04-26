export default {
  id: 'S-A-19',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Ruhakombinációk — fadiagram',
  difficulty: 3,
  scenario: 'Ádám a szekrényben **3 féle** ingből, **2 féle** nadrágból és **2 féle** cipőből választhat.',
  question: 'Hány különböző öltözéket rakhat össze?',
  visual: {
    type: 'treeDiagram',
    root: 'öltözet',
    levels: [
      {
        label: 'Ing',
        branches: ['fehér', 'kék', 'piros']
      },
      {
        label: 'Nadrág',
        branches: ['farmer', 'vászon']
      },
      {
        label: 'Cipő',
        branches: ['sport', 'elegáns']
      }
    ]
  },
  options: ['6', '8', '10', '12'],
  answer: '12',
  keywords: ['szorzási elv', 'fadiagram'],
  solution: `$$3 \\cdot 2 \\cdot 2 = \\mathbf{12}$$

**A helyes válasz: 12.**`
};
