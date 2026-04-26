export default {
  id: 'H-K-04',
  contentArea: 'H',
  contentSub: '2.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családi torta — arányok',
  difficulty: 6,
  scenario: 'Egy családi zsúrra egy tortát **4 : 3 : 2** arányban vág fel három gyerek között (Dani, Eszti, Fanni). Eszti **9 szeletet** kapott.',
  question: 'Hány szelet volt az **egész torta**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Dani : Eszti : Fanni',
        formula: '4 : 3 : 2',
        result: ''
      },
      {
        label: 'Eszti',
        formula: '3 rész',
        result: '= 9 szelet'
      }
    ]
  },
  options: ['18', '24', '27', '30'],
  answer: '27',
  keywords: ['arány', 'arányos osztás', 'komplex'],
  solution: `**Arányos osztás:**

Eszti 3 rész $= 9$ szelet, tehát 1 rész $= 3$ szelet.

- Dani: $4 \\cdot 3 = 12$
- Eszti: $3 \\cdot 3 = 9$
- Fanni: $2 \\cdot 3 = 6$

**Összesen: $12 + 9 + 6 = \\mathbf{27}$ szelet.**`
};
