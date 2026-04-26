export default {
  id: 'H-K-19',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sorozat összege',
  difficulty: 7,
  scenario: 'Valaki az első hónapban 1000 Ft-ot tesz félre, és minden hónapban 500 Ft-tal többet, mint az előzőben.',
  question: 'Mennyit gyűjt **8 hónap** alatt?',
  visual: {
    type: 'table',
    caption: 'Befizetések',
    headers: ['Hónap', '1', '2', '3', '...', '8'],
    rows: [
      ['Összeg', '1000 Ft', '1500 Ft', '2000 Ft', '...', '4500 Ft']
    ]
  },
  options: ['21 500 Ft', '22 000 Ft', '22 500 Ft', '44 000 Ft'],
  answer: '22 000 Ft',
  keywords: ['sorozat', 'összeg'],
  solution: `$a_{8} = 1000 + 7 \\cdot 500 = 4500$.

$S = \\dfrac{(1000+4500) \\cdot 8}{2} = 22000$.

**22 000 Ft.**`
};
