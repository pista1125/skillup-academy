export default {
  id: 'H-K-23',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vonatok szembe — számítás',
  difficulty: 6,
  scenario: 'Budapestről és Miskolcról egyszerre indul el két vonat egymás felé. A távolság **180 km**. Az egyik 70 km/h, a másik 90 km/h sebességgel halad.',
  question: 'Hány **perc** múlva találkoznak?',
  visual: {
    type: 'formula',
    formula: 't = s / (v_1 + v_2)',
    variables: [
      { name: 's', desc: '180 km' },
      { name: 'v_1', desc: '70 km/h' },
      { name: 'v_2', desc: '90 km/h' }
    ],
    example: { eredmény: '?' }
  },
  options: ['55', '60', '67,5', '72'],
  answer: '67,5',
  keywords: ['egyenlet', 'mozgás'],
  solution: '$t = 180 \\div 160 = 1{,}125$ h $= \\mathbf{67{,}5}$ perc.'
};
