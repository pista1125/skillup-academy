export default {
  id: 'M-A-25',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Átlagsebesség — 120 km, 2 óra',
  difficulty: 4,
  scenario: 'Egy autó **120 km**-t tett meg **2 óra** alatt.',
  question: 'Mekkora volt az **átlagsebessége**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Út',
        formula: '120 km',
        result: ''
      },
      {
        label: 'Idő',
        formula: '2 óra',
        result: ''
      }
    ]
  },
  options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
  answer: '60 km/h',
  keywords: ['átlagsebesség', 'arányszámítás'],
  solution: '$v = \\dfrac{s}{t} = \\dfrac{120}{2} = 60$ km/h.'
};
