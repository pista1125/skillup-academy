export default {
  id: 'M-A-24',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Recept — arány bővítése',
  difficulty: 4,
  scenario: 'Egy palacsintarecept **4 főre** a következő: **200 g liszt, 400 ml tej, 2 tojás**. A születésnapon **10 főre** akarnak főzni.',
  question: 'Hány **gramm lisztre** lesz szükség?',
  visual: {
    type: 'recipe',
    caption: 'Palacsinta recept (4 → 10 fő)',
    rows: [
      { name: 'Liszt', amount: '200 g', scaled: '? g' },
      { name: 'Tej', amount: '400 ml' },
      { name: 'Tojás', amount: '2 db' }
    ]
  },
  options: ['400 g', '450 g', '500 g', '600 g'],
  answer: '500 g',
  keywords: ['arányosság', 'recept', 'főzés'],
  solution: '1 főre: $200/4 = 50$ g. 10 főre: $50 \\cdot 10 = \\mathbf{500}$ g.'
};
