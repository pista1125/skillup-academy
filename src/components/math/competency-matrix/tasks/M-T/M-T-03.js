export default {
  id: 'M-T-03',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Vásárlás a boltban',
  difficulty: 2,
  scenario: 'Péter bevásárolt a boltban. A vásárlásáról a következő blokkot kapta.',
  question: 'Mennyit fizetett összesen Péter?',
  visual: {
    type: 'table',
    caption: 'Vásárlási blokk',
    headers: ['Termék', 'Mennyiség', 'Egységár', 'Összesen'],
    rows: [
      ['Tej', '2 doboz', '399 Ft', '798 Ft'],
      ['Kenyér', '1 db', '520 Ft', '520 Ft'],
      ['Vaj', '3 db', '650 Ft', '1950 Ft'],
      ['Alma', '1 kg', '732 Ft', '732 Ft']
    ]
  },
  options: ['3 800 Ft', '3 900 Ft', '4 000 Ft', '4 100 Ft'],
  answer: '4 000 Ft',
  keywords: ['műveletsor', 'összeadás'],
  solution: `**A részösszegek összeadása:**

$$798 + 520 + 1950 + 732 = 4000\\ \\text{Ft}$$

Részlépések: $798+520=1318$, majd $1318+1950=3268$, végül $3268+732=4000$.

**A helyes válasz: 4 000 Ft.**`
};
