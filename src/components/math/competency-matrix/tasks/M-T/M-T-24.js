export default {
  id: 'M-T-24',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Blokk összegzése',
  difficulty: 2,
  scenario: 'Nézd meg az alábbi vásárlási blokkot.',
  question: 'Mennyi az **összesen fizetendő**?',
  visual: {
    type: 'table',
    caption: 'Blokk',
    headers: ['Termék', 'db', 'Egységár', 'Összesen'],
    rows: [
      ['Tej', '2', '410 Ft', '820 Ft'],
      ['Kenyér', '1', '580 Ft', '580 Ft'],
      ['Sajt', '1', '1290 Ft', '1290 Ft'],
      ['Banán', '1', '490 Ft', '490 Ft']
    ]
  },
  options: ['3080 Ft', '3180 Ft', '3280 Ft', '4180 Ft'],
  answer: '3180 Ft',
  keywords: ['műveletsor', 'összeadás'],
  solution: `- Tej: $2 \\cdot 410 = 820$ Ft
- Kenyér: $1 \\cdot 580 = 580$ Ft
- Sajt: $1 \\cdot 1290 = 1290$ Ft
- Banán: $1 \\cdot 490 = 490$ Ft

**Összesen: 3180 Ft.**`
};
