export default {
  id: 'S-K-10',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Havi kereset — súlyozott átlag',
  difficulty: 6,
  scenario: 'Egy cég 30 dolgozójának havi bruttó fizetését a hisztogram mutatja (ezer Ft-ban, sávközéppel számolva).',
  question: 'Mennyi a **közelítő átlagfizetés**?',
  visual: {
    type: 'histogram',
    xLabel: 'Fizetés (e Ft)',
    yLabel: 'Dolgozók',
    bins: [
      { range: '200–249', mid: 225, count: 5 },
      { range: '250–299', mid: 275, count: 8 },
      { range: '300–349', mid: 325, count: 10 },
      { range: '350–399', mid: 375, count: 4 },
      { range: '400–449', mid: 425, count: 3 }
    ]
  },
  options: ['295 e Ft', '305 e Ft', '312 e Ft', '325 e Ft'],
  answer: '312 e Ft',
  keywords: ['hisztogram', 'súlyozott átlag'],
  solution: `**Súlyozott átlag sávközepekkel:**

$$\\bar{x} = \\dfrac{225 \\cdot 5 + 275 \\cdot 8 + 325 \\cdot 10 + 375 \\cdot 4 + 425 \\cdot 3}{30}$$

Részszámítások: $1125 + 2200 + 3250 + 1500 + 1275 = 9350$.

$$\\bar{x} = \\dfrac{9350}{30} \\approx \\mathbf{311{,}7}$$

Kerekítve **312 e Ft**.

**A helyes válasz: 312 e Ft.**`
};
