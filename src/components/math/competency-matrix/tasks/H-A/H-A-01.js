export default {
  id: 'H-A-01',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Recept arányosítása',
  difficulty: 4,
  scenario: 'Egy palacsintarecept **4 személyre** így szól:',
  question: 'Hány ml tejre van szükség **6 személyre**?',
  visual: {
    type: 'recipe',
    servingsOriginal: 4,
    servingsTarget: 6,
    ingredients: [
      {
        name: 'Liszt',
        amount: 300,
        unit: 'g'
      },
      {
        name: 'Tej',
        amount: 600,
        unit: 'ml'
      },
      {
        name: 'Tojás',
        amount: 3,
        unit: 'db'
      },
      {
        name: 'Cukor',
        amount: 40,
        unit: 'g'
      }
    ],
    highlight: 'Tej'
  },
  options: ['750 ml', '800 ml', '900 ml', '1000 ml'],
  answer: '900 ml',
  keywords: ['egyenes arányosság', 'arány nem 1-hez'],
  solution: `**Arányosság:**

1 főre: $\\dfrac{600}{4} = 150$ ml.

6 főre: $150 \\cdot 6 = \\mathbf{900}$ ml.

Más megoldás: $600 \\cdot \\tfrac{6}{4} = 600 \\cdot 1{,}5 = 900$ ml.`
};
