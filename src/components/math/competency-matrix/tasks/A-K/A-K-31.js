export default {
  id: 'A-K-31',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Melyik nagyobb? — térfogat',
  difficulty: 6,
  scenario: 'Egy kocka éle **6 cm**, egy téglatest mérete **4 × 5 × 9 cm**.',
  question: 'Melyiknek nagyobb a térfogata és mennyivel?',
  visual: {
    type: 'comparison',
    a: 6,
    b: 4,
    unit: 'cm'
  },
  answer: 'A kockáé 36 cm³-rel nagyobb',
  keywords: ['térfogat', 'összehasonlítás'],
  solution: `$V_{kocka} = 6^3 = 216$ cm³.

$V_{téglatest} = 4 \\cdot 5 \\cdot 9 = 180$ cm³.

Különbség: $216 - 180 = \\mathbf{36}$ cm³. A **kocka** nagyobb.`
};
