export default {
  id: 'S-K-01',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Osztály átlagának kiegészítése',
  difficulty: 6,
  scenario: 'A 6.b osztály **20 tanulója** írt témazárót. Az elért pontok eloszlását hisztogram mutatja. A pontszámokat a középértékkel számoljuk (pl. a 60–69 sáv közepe 65).',
  question: 'Körülbelül mennyi az **átlagpontszám**?',
  visual: {
    type: 'histogram',
    xLabel: 'Pontsáv',
    yLabel: 'Tanulók száma',
    bins: [
      {
        range: '50–59',
        mid: 55,
        count: 2
      },
      {
        range: '60–69',
        mid: 65,
        count: 5
      },
      {
        range: '70–79',
        mid: 75,
        count: 7
      },
      {
        range: '80–89',
        mid: 85,
        count: 4
      },
      {
        range: '90–99',
        mid: 95,
        count: 2
      }
    ]
  },
  options: ['68 pont', '72 pont', '74 pont', '78 pont'],
  answer: '74 pont',
  keywords: ['hisztogram', 'súlyozott átlag', 'becslés'],
  solution: `**Súlyozott átlag a sávközepekkel:**

$$\\bar{x} = \\dfrac{55 \\cdot 2 + 65 \\cdot 5 + 75 \\cdot 7 + 85 \\cdot 4 + 95 \\cdot 2}{20}$$

Számoljuk részletekben:

- $55 \\cdot 2 = 110$
- $65 \\cdot 5 = 325$
- $75 \\cdot 7 = 525$
- $85 \\cdot 4 = 340$
- $95 \\cdot 2 = 190$

Összeg: $110 + 325 + 525 + 340 + 190 = 1490$.

$$\\bar{x} = \\dfrac{1490}{20} = \\mathbf{74{,}5}$$

A kerekített átlag kb. **74 pont**.

**A helyes válasz: 74 pont.**`
};
