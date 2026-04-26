export default {
  id: 'M-A-15',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Üdítő átöntése',
  difficulty: 4,
  scenario: 'Egy piknikre **3,6 liter** üdítőt viszünk, amit egyenlő mennyiségekben **2 dl-es** pohárba akarunk szétönteni.',
  question: 'Hány pohár üdítőt tudunk megtölteni?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Üdítő',
        formula: '3,6 L = 36 dl',
        result: '36 dl'
      },
      {
        label: '1 pohár',
        formula: '2 dl',
        result: '2 dl'
      }
    ]
  },
  options: ['9 pohár', '12 pohár', '18 pohár', '36 pohár'],
  answer: '18 pohár',
  keywords: ['mértékegység-átváltás', 'osztás'],
  solution: `**Átváltás, majd osztás:**

1. $3{,}6$ L = $36$ dl.
2. $36 \\div 2 = 18$ pohár.

**A helyes válasz: 18 pohár.**`
};
