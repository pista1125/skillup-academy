export default {
  id: 'H-K-27',
  contentArea: 'H',
  contentSub: '2.4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Színházszékek összesen',
  difficulty: 6,
  scenario: 'A színházteremben az **1. sorban 20 szék** van, minden következő sorban **2-vel több**. Összesen **15 sor** van.',
  question: 'Hány **szék** van a teremben?',
  visual: {
    type: 'table',
    caption: 'Ülések',
    headers: ['Sor', '1', '2', '3', '...', '15'],
    rows: [
      ['Szék', '20', '22', '24', '...', '48']
    ]
  },
  options: ['480', '500', '510', '540'],
  answer: '510',
  keywords: ['sorozat', 'összeg'],
  solution: '$a_{15} = 20 + 14 \\cdot 2 = 48$. $S = \\dfrac{(20+48) \\cdot 15}{2} = \\mathbf{510}$.'
};
