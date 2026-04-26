export default {
  id: 'H-K-17',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 100 Ft-ot tesz félre, és minden hónapban 100 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **10 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '10'],
    rows: [
      ['Összeg', '100 Ft', '200 Ft', '300 Ft', '...', '1000 Ft']
    ]
  },
  options: ['5000 Ft', '5500 Ft', '6000 Ft', '11 000 Ft'],
  answer: '5500 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{10} = 100 + 9 \\cdot 100 = 1000$.

$S = \\dfrac{(100+1000) \\cdot 10}{2} = 5500$.

**5500 Ft.**`
};
