export default {
  id: 'H-A-48',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Könyvespolc — sorozat',
  difficulty: 4,
  scenario: 'A legalsó polcon **24** könyv fér el; minden fentebbi polcon **3-mal kevesebb**.',
  question: 'Hány könyv fér a **6.** (legfelső) polcra?',
  visual: {
    type: 'tileRows',
    rows: [
      { count: 24, label: '1. polc' },
      { count: 21, label: '2. polc' },
      { count: 18, label: '3. polc' },
      { count: 15, label: '4. polc' }
    ]
  },
  options: ['6', '9', '12', '15'],
  answer: '9',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_6 = 24 - 5 \\cdot 3 = \\mathbf{9}$ könyv.'
};
