export default {
  id: 'A-K-46',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Medence feltöltése',
  difficulty: 7,
  scenario: `Egy medence alakja **téglatest**, méretei **8 m × 3 m × 1{,}5 m**. A vizet **80 liter/perc** sebességgel töltik.`,
  question: 'Hány **óra** alatt telik meg **színig** a medence?',
  visual: {
    type: 'box3d',
    box: {
      l: 8,
      w: 3,
      h: 1.5
    },
    unit: 'm'
  },
  options: ['5 óra', '6 óra', '7{,}5 óra', '10 óra'],
  answer: '7{,}5 óra',
  keywords: ['térfogat', 'egységátváltás', 'idő'],
  solution: `**Térfogat:** $V = 8 \\cdot 3 \\cdot 1{,}5 = 36$ m³.

**Átváltás:** $1$ m³ $= 1000$ liter, tehát $36$ m³ $= 36\\,000$ liter.

**Idő:** $\\dfrac{36\\,000}{80} = 450$ perc $= \\dfrac{450}{60} = \\mathbf{7{,}5}$ óra.`
};
