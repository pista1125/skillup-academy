export default {
  id: 'M-A-35',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Nyaralás — szállás foglalás',
  difficulty: 4,
  scenario: 'Egy apartman **napi 22 000 Ft**-ért foglalható. **7 éjszakára** foglalva **10%-os kedvezményt** adnak.',
  question: 'Mennyit kell **fizetni** a 7 éjszakáért?',
  visual: {
    type: 'priceTag',
    original: 154000,
    discountPercent: 10,
    currency: 'Ft',
    label: '7 éjszaka'
  },
  options: ['132 600 Ft', '138 600 Ft', '140 400 Ft', '144 400 Ft'],
  answer: '138 600 Ft',
  keywords: ['százalék', 'kedvezmény', 'nyaralás'],
  solution: `Teljes ár: $7 \\cdot 22000 = 154000$ Ft.

Kedvezmény: $154000 \\cdot 0{,}1 = 15400$ Ft.

Fizetendő: $154000 - 15400 = \\mathbf{138\\,600}$ Ft.`
};
