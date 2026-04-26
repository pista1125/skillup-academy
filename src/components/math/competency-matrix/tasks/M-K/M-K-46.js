export default {
  id: 'M-K-46',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Adó — nettó-bruttó számítás',
  difficulty: 7,
  scenario: 'Éva bruttó fizetése **420 000 Ft**. A levonások: **15% SZJA** és **18,5% járulék** (mind a bruttóból).',
  question: 'Mennyi a **nettó** fizetése?',
  visual: {
    type: 'table',
    caption: 'Levonások',
    headers: ['Tétel', 'Érték'],
    rows: [
      ['Bruttó', '420 000 Ft'],
      ['SZJA 15%', '63 000 Ft'],
      ['Járulék 18,5%', '77 700 Ft']
    ]
  },
  options: ['270 000 Ft', '279 300 Ft', '283 200 Ft', '300 000 Ft'],
  answer: '279 300 Ft',
  keywords: ['százalékszámítás', 'adó', 'fizetés'],
  solution: `SZJA: $420000 \\cdot 0{,}15 = 63\\,000$ Ft.

Járulék: $420000 \\cdot 0{,}185 = 77\\,700$ Ft.

Nettó: $420000 - 63000 - 77700 = \\mathbf{279\\,300}$ Ft.`
};
