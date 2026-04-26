export default {
  id: 'H-K-16',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 500 Ft-ot tesz félre, és minden hónapban 200 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **12 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '12'],
    rows: [
      ['Összeg', '500 Ft', '700 Ft', '900 Ft', '...', '2700 Ft']
    ]
  },
  options: ['18 700 Ft', '19 200 Ft', '19 700 Ft', '38 400 Ft'],
  answer: '19 200 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{12} = 500 + 11 \\cdot 200 = 2700$.

$S = \\dfrac{(500+2700) \\cdot 12}{2} = 19200$.

**19 200 Ft.**`
};
