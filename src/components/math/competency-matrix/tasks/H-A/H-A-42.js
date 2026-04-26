export default {
  id: 'H-A-42',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Recept arányosítás — palacsinta',
  difficulty: 4,
  scenario: 'Egy palacsintarecept **4 személyre** 250 g lisztet kér.',
  question: 'Hány g liszt kell **10 személyre**?',
  visual: {
    type: 'recipe',
    title: 'Palacsinta alapanyagok',
    ingredients: [
      { name: 'Liszt (4 fő)', amount: '250 g' },
      { name: 'Kért fő', amount: '10 fő' }
    ]
  },
  options: ['500 g', '600 g', '625 g', '750 g'],
  answer: '625 g',
  keywords: ['arány', 'recept'],
  solution: '$250 \\div 4 \\cdot 10 = 62{,}5 \\cdot 10 = \\mathbf{625}$ g.'
};
