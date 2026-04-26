export default {
  id: 'H-K-47',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Koncertjegyek — sorozat',
  difficulty: 6,
  scenario: 'Egy koncertre az első órában **30 jegy** kelt el, minden következő órában **10-zel több**. A jegypénztár **8 órát** működött.',
  question: 'Hány **jegy** kelt el összesen?',
  visual: {
    type: 'sequence',
    elements: ['30', '40', '50', '...', '100']
  },
  options: ['480', '500', '520', '560'],
  answer: '520',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_8 = 30 + 7 \\cdot 10 = 100$. $S = \\dfrac{(30+100) \\cdot 8}{2} = \\mathbf{520}$.'
};
