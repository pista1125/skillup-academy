export default {
  id: 'A-K-37',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Tó területének pontos becslése',
  difficulty: 6,
  scenario: 'Egy térképen tó látható rácshálózaton. A rajzon **9 teljes** négyzet van a tó belsejében, és **12 olyan** négyzet, amelyen a tó partvonala átmegy. Egy rácsnégyzet $1 \\text{ m}^2$.',
  question: 'A **belső négyzetek + félbe számolt peremnégyzetek** szabállyal mekkora a tó területe?',
  visual: {
    type: 'grid',
    w: 8,
    h: 8,
    shadedCells: [
      [2, 2], [3, 2], [4, 2],
      [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
      [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4],
      [2, 5], [3, 5], [4, 5], [5, 5],
      [3, 6], [4, 6], [5, 6]
    ]
  },
  options: ['12 m²', '15 m²', '18 m²', '21 m²'],
  answer: '15 m²',
  keywords: ['terület', 'becslés', 'rács'],
  solution: `**Becslési szabály:** belső négyzetek teljesen számítanak, a peremnégyzetek fele.

- **Teljes négyzetek:** $9 \\cdot 1 = 9$ m²
- **Peremnégyzetek:** $12 \\cdot 0{,}5 = 6$ m²

**Becsült terület:** $9 + 6 = \\mathbf{15}$ m².`
};
