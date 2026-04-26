export default {
  id: 'M-K-35',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Befektetés — veszteség és nyereség',
  difficulty: 7,
  scenario: 'Péter **100 000 Ft**-ot fektet be. Első évben **20%-ot veszít**, második évben a **megmaradt összeg 25%-kal nő**.',
  question: 'Mennyi pénze lesz a **második év végén**?',
  visual: {
    type: 'comparison',
    items: [
      { label: '1. év vége', formula: '100000 × 0.80', result: '80 000 Ft' },
      { label: '2. év vége', formula: '80000 × 1.25', result: '100 000 Ft' }
    ]
  },
  options: ['95 000 Ft', '100 000 Ft', '105 000 Ft', '125 000 Ft'],
  answer: '100 000 Ft',
  keywords: ['százalékszámítás', 'befektetés'],
  solution: `1. év: $100000 \\cdot 0{,}8 = 80\\,000$.

2. év: $80000 \\cdot 1{,}25 = \\mathbf{100\\,000}$ Ft.

*Érdekes: 20% veszteség után 25% nyereség visszaadja az eredeti összeget.*`
};
