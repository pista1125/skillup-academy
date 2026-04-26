export default {
  id: 'M-A-23',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'ÁFA számítás — webshop',
  difficulty: 4,
  scenario: 'Egy webshopban egy termék **nettó ára 16 000 Ft**, az ÁFA **27%**.',
  question: 'Mennyi a **bruttó ár** (ÁFA-val együtt)?',
  visual: {
    type: 'priceTag',
    original: 16000,
    discountPercent: -27,
    currency: 'Ft',
    label: 'Nettó ár'
  },
  options: ['18 320 Ft', '19 320 Ft', '20 320 Ft', '22 320 Ft'],
  answer: '20 320 Ft',
  keywords: ['százalékszámítás', 'ÁFA', 'webshop'],
  solution: 'ÁFA: $16000 \\cdot 0{,}27 = 4320$ Ft. Bruttó: $16000 + 4320 = \\mathbf{20\\,320}$ Ft.'
};
