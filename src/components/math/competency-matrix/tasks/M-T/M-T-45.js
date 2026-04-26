export default {
  id: 'M-T-45',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Maradékos osztás — cukorkák',
  difficulty: 2,
  scenario: 'A tanár **37 cukorkát** akar szétosztani **5 gyerek** között egyenlően.',
  question: 'Hány cukorka **marad** a végén?',
  visual: {
    type: 'pictogram',
    caption: '37 cukorka, 5 gyerek',
    icon: 'candy',
    total: 37,
    groups: 5
  },
  options: ['0', '1', '2', '3'],
  answer: '2',
  keywords: ['maradék', 'osztás'],
  solution: '$37 \\div 5 = 7$, maradék **2** ($5 \\cdot 7 = 35$, $37 - 35 = 2$).'
};
