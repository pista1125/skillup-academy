export default {
  id: 'M-A-28',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Állatkert — belépőjegy',
  difficulty: 4,
  scenario: 'Az állatkertben a **felnőtt jegy 3500 Ft**, a **gyerekjegy 2100 Ft**. Egy család **2 felnőttel és 3 gyerekkel** érkezik.',
  question: 'Mennyi a **család összköltsége**?',
  visual: {
    type: 'table',
    caption: 'Jegyárak',
    headers: ['Fő', 'Ár/fő', 'Összesen'],
    rows: [
      ['2 felnőtt', '3500 Ft', '7000 Ft'],
      ['3 gyerek', '2100 Ft', '6300 Ft']
    ]
  },
  options: ['12 300 Ft', '13 300 Ft', '14 300 Ft', '15 300 Ft'],
  answer: '13 300 Ft',
  keywords: ['szorzás', 'összeg', 'állatkert'],
  solution: '$2 \\cdot 3500 + 3 \\cdot 2100 = 7000 + 6300 = \\mathbf{13\\,300}$ Ft.'
};
