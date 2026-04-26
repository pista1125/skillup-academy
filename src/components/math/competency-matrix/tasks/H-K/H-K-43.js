export default {
  id: 'H-K-43',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kerékpártúra — átlagsebesség',
  difficulty: 6,
  scenario: 'Egy kerékpáros **2 órán át 18 km/h** sebességgel, majd **3 órán át 22 km/h** sebességgel halad.',
  question: 'Mekkora az **átlagsebessége** (km/h)?',
  visual: {
    type: 'comparison',
    items: [
      { label: '1. szakasz', formula: '18 km/h · 2 h = 36 km', result: '' },
      { label: '2. szakasz', formula: '22 km/h · 3 h = 66 km', result: '' },
      { label: 'Átlag', formula: '102 km / 5 h', result: '?' }
    ]
  },
  options: ['19,4', '20', '20,4', '21'],
  answer: '20,4',
  keywords: ['átlagsebesség'],
  solution: '$(36 + 66) \\div 5 = 102 \\div 5 = \\mathbf{20{,}4}$ km/h.'
};
