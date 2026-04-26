export default {
  id: 'H-K-29',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Mérföldkövek — menetidő',
  difficulty: 6,
  scenario: 'Egy hegyi túrán az első kilométer **15 perc**, minden következő kilométer **1 perccel** hosszabb. A túra **12 km** hosszú.',
  question: 'Mennyi a **teljes** menetidő (perc)?',
  visual: {
    type: 'table',
    caption: 'Km-perc',
    headers: ['km', '1', '2', '3', '...', '12'],
    rows: [
      ['perc', '15', '16', '17', '...', '26']
    ]
  },
  options: ['240', '246', '252', '264'],
  answer: '246',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{12} = 15 + 11 = 26$. $S = \\dfrac{(15+26) \\cdot 12}{2} = \\mathbf{246}$ perc.'
};
