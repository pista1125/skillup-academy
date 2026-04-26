export default {
  id: 'A-A-05',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kertterv — kerítés',
  difficulty: 3,
  scenario: 'Egy **téglalap alakú** kertet **12 m × 7 m** méretűre tervezünk. A kert köré kerítést építünk, de az egyik **7 m-es** oldalra kaput teszünk, ott nincs kerítés.',
  question: 'Hány **méter** kerítésre lesz szükség?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 7,
    label: 'kert',
    fill: '#c9e8b0',
    unit: 'm'
  },
  answer: '31 m',
  keywords: ['kerület', 'gyakorlati feladat'],
  solution: `**Lépések:**

1. Teljes kerület: $K = 2 \\cdot (12 + 7) = 38$ m.
2. Egy 7 m-es oldalt kihagyunk: $38 - 7 = \\mathbf{31}$ m.`
};
