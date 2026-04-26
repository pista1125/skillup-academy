export default {
  id: 'M-K-02',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Árengedmény – két bolt',
  difficulty: 7,
  scenario: `Két bolt ugyanazt a kerékpárt árulja. Az eredeti ár mindkét helyen **80 000 Ft**.

- **A bolt:** 10% kedvezmény, majd a maradékból még 10% kedvezmény.
- **B bolt:** egyszerű **20% kedvezmény**.`,
  question: 'Melyik bolt az olcsóbb, és mennyivel?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'A bolt',
        formula: '80 000 × 0,9 × 0,9',
        result: '64 800 Ft'
      },
      {
        label: 'B bolt',
        formula: '80 000 × 0,8',
        result: '64 000 Ft'
      }
    ]
  },
  answer: 'B bolt olcsóbb 800 Ft-tal',
  keywords: ['százalékszámítás', 'érvelés'],
  solution: `**A bolt kettős kedvezménye:**

- Első kedvezmény után: $80\\,000 \\cdot 0{,}9 = 72\\,000$ Ft.
- Második kedvezmény után: $72\\,000 \\cdot 0{,}9 = 64\\,800$ Ft.

**B bolt egyszerű kedvezménye:**

$80\\,000 \\cdot 0{,}8 = 64\\,000$ Ft.

**Különbség:** $64\\,800 - 64\\,000 = 800$ Ft.

⚠️ **Fontos megfigyelés:** Két 10%-os kedvezmény **NEM ugyanaz**, mint egy 20%-os! A kettős kedvezmény valójában $1 - 0{,}9 \\cdot 0{,}9 = 0{,}19$, azaz csak **19%** kedvezményt ad.

**A B bolt 800 Ft-tal olcsóbb.**`
};
