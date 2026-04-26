export default {
  id: 'M-K-34',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vonat — két mozgó közeledik',
  difficulty: 6,
  scenario: 'Két város távolsága **360 km**. Az egyik vonat **A-ból 90 km/h**-val, a másik **B-ből 60 km/h**-val indul egyszerre egymás felé.',
  question: 'Hány **óra múlva** találkoznak?',
  visual: {
    type: 'timeline',
    label: 'Két vonat közeledése',
    events: [
      { t: '0 h', label: 'Indulás (A, B)' },
      { t: '? h', label: 'Találkozás' }
    ]
  },
  options: ['1,5 óra', '2 óra', '2,4 óra', '4 óra'],
  answer: '2,4 óra',
  keywords: ['sebesség', 'találkozás', 'vasút'],
  solution: `Együttes sebesség: $90 + 60 = 150$ km/h.

$t = 360 / 150 = \\mathbf{2{,}4}$ óra.`
};
