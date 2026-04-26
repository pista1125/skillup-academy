export default {
  id: 'H-T-41',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Számegyenes — hőmérő',
  difficulty: 2,
  scenario: 'A számegyenes egy januári reggeli hőmérő állását mutatja.',
  question: 'Hány **°C**-ot mutat a hőmérő?',
  visual: {
    type: 'numberLine',
    min: -10,
    max: 10,
    step: 1,
    markers: [
      { value: -4, label: '' }
    ]
  },
  options: ['-6', '-4', '-2', '4'],
  answer: '-4',
  keywords: ['számegyenes', 'negatív szám'],
  solution: 'A jel -10 és 0 között, 4 egységre a nulla alatt: **-4 °C**.'
};
