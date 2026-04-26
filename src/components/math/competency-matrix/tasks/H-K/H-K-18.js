export default {
  id: 'H-K-18',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 50 Ft-ot tesz félre, és minden hónapban 50 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **20 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '20'],
    rows: [
      ['Összeg', '50 Ft', '100 Ft', '150 Ft', '...', '1000 Ft']
    ]
  },
  options: ['11 000 Ft', '11 500 Ft', '12 000 Ft', '23 000 Ft'],
  answer: '11 500 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{20} = 50 + 19 \\cdot 50 = 1000$.

$S = \\dfrac{(50+1000) \\cdot 20}{2} = 11500$.

**11 500 Ft.**`
};
