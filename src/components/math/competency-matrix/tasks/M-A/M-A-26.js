export default {
  id: 'M-A-26',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Átlagsebesség — 75 km, 1.5 óra',
  difficulty: 4,
  scenario: 'Egy autó **75 km**-t tett meg **1.5 óra** alatt.',
  question: 'Mekkora volt az **átlagsebessége**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Út',
        formula: '75 km',
        result: ''
      },
      {
        label: 'Idő',
        formula: '1.5 óra',
        result: ''
      }
    ]
  },
  options: ['40 km/h', '50 km/h', '60 km/h', '70 km/h'],
  answer: '50 km/h',
  keywords: ['átlagsebesség', 'arányszámítás'],
  solution: '$v = \\dfrac{s}{t} = \\dfrac{75}{1.5} = 50$ km/h.'
};
