export default {
  id: 'M-A-29',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Mozi — jegybevétel',
  difficulty: 4,
  scenario: 'A moziban egy filmre **180 jegyet** adtak el **1800 Ft** darabáron. A jegyek **40%-a félárú** volt (900 Ft).',
  question: 'Mennyi volt a **teljes bevétel**?',
  visual: {
    type: 'table',
    caption: 'Jegyeladás',
    headers: ['Kategória', 'Db', 'Ár'],
    rows: [
      ['Teljes árú', '108', '1800 Ft'],
      ['Félárú', '72', '900 Ft']
    ]
  },
  options: ['226 800 Ft', '248 400 Ft', '259 200 Ft', '324 000 Ft'],
  answer: '259 200 Ft',
  keywords: ['százalék', 'mozi', 'bevétel'],
  solution: `Félárúak: $180 \\cdot 0{,}4 = 72$ db; teljes árúak: $108$ db.

Bevétel: $108 \\cdot 1800 + 72 \\cdot 900 = 194400 + 64800 = \\mathbf{259\\,200}$ Ft.`
};
