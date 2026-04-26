export default {
  id: 'M-T-25',
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
      ['Jegy', '3', '2500 Ft', '7500 Ft'],
      ['Popcorn', '2', '990 Ft', '1980 Ft'],
      ['Üdítő', '3', '490 Ft', '1470 Ft']
    ]
  },
  options: ['10 850 Ft', '10 950 Ft', '11 050 Ft', '11 950 Ft'],
  answer: '10 950 Ft',
  keywords: ['műveletsor', 'összeadás'],
  solution: `- Jegy: $3 \\cdot 2500 = 7500$ Ft
- Popcorn: $2 \\cdot 990 = 1980$ Ft
- Üdítő: $3 \\cdot 490 = 1470$ Ft

**Összesen: 10 950 Ft.**`
};
