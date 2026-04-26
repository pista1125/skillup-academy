export default {
  id: 'M-T-04',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'T',
  thinkingSub: '1.5',
  title: 'Mértékegység-átváltás',
  difficulty: 2,
  scenario: 'Az alábbi táblázat néhány mért értéket tartalmaz különböző mértékegységekben.',
  question: 'Melyik állítás **IGAZ**?',
  visual: {
    type: 'table',
    caption: 'Mennyiségek',
    headers: ['Jel', 'Érték'],
    rows: [
      ['A', '2500 g'],
      ['B', '3 kg'],
      ['C', '0,5 t'],
      ['D', '1500 g']
    ]
  },
  options: ['A > B', 'B < D', 'C = 500 kg', 'A = B'],
  answer: 'C = 500 kg',
  keywords: ['mértékegység-átváltás', 'tömeg'],
  solution: `**Átváltás közös egységre (kg):**

- A: $2500$ g = $2{,}5$ kg
- B: $3$ kg
- C: $0{,}5$ t = $500$ kg
- D: $1500$ g = $1{,}5$ kg

Tehát **C = 500 kg igaz**, a többi állítás hamis.`
};
