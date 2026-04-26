export default {
  id: 'M-K-38',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Fizetésemelés — két ajánlat',
  difficulty: 7,
  scenario: 'Az alapfizetés **300 000 Ft**. **A cég**: először 8% emelés, majd a következő évben 7%. **B cég**: egyszerre 16% emelés.',
  question: 'Melyik cégnél magasabb a fizetés **2 év múlva**, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'A cég', formula: '300000 × 1.08 × 1.07', result: '346 680 Ft' },
      { label: 'B cég', formula: '300000 × 1.16', result: '348 000 Ft' }
    ]
  },
  options: ['A, 1320 Ft', 'B, 1320 Ft', 'Ugyanannyi', 'B, 2640 Ft'],
  answer: 'B, 1320 Ft',
  keywords: ['százalékszámítás', 'több lépés', 'fizetés'],
  solution: `A: $300000 \\cdot 1{,}08 \\cdot 1{,}07 = 346\\,680$ Ft.

B: $300000 \\cdot 1{,}16 = 348\\,000$ Ft.

**B** magasabb, a különbség **1320 Ft**.`
};
