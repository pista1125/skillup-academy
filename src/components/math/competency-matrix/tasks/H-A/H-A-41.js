export default {
  id: 'H-A-41',
  contentArea: 'H',
  contentSub: '2.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép — 1:200 000',
  difficulty: 4,
  scenario: 'Egy térkép méretaránya **1 : 200 000**. Két város között a térképen **7 cm** a távolság.',
  question: 'Hány **km** a valós távolság?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Térkép', formula: '7 cm', result: '' },
      { label: 'Valóság', formula: '7 · 200 000 cm', result: '?' }
    ]
  },
  options: ['1,4 km', '14 km', '140 km', '1400 km'],
  answer: '14 km',
  keywords: ['méretarány'],
  solution: '$7 \\cdot 200\\,000 = 1\\,400\\,000$ cm $= \\mathbf{14}$ km.'
};
