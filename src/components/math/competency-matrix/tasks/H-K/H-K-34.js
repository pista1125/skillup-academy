export default {
  id: 'H-K-34',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családfa — apa és fia',
  difficulty: 6,
  scenario: 'Az apa **jelenleg 36 évvel idősebb** a fiánál. **4 év múlva** az apa háromszor annyi idős lesz, mint a fia.',
  question: 'Hány évesek **most**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Most', formula: 'A = F + 36', result: '' },
      { label: '4 év múlva', formula: 'A + 4 = 3(F + 4)', result: '' }
    ]
  },
  options: ['F=10, A=46', 'F=12, A=48', 'F=14, A=50', 'F=16, A=52'],
  answer: 'F=14, A=50',
  keywords: ['egyenlet', 'életkor'],
  solution: '$F + 36 + 4 = 3F + 12$ → $F = 14$, $A = 50$.'
};
