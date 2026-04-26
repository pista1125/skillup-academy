export default {
  id: 'H-A-37',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Kamat — 2 év',
  difficulty: 5,
  scenario: 'Egy betétre évi **4% kamatos kamat** jár. A kezdőtőke **20 000 Ft**.',
  question: 'Mennyi lesz a betét **2 év** múlva? (kerekíts egészre)',
  visual: {
    type: 'formula',
    formula: 'T_n = T_0 · (1 + p)^n',
    variables: [
      { name: 'T_0', desc: '20 000' },
      { name: 'p', desc: '0,04' },
      { name: 'n', desc: '2' }
    ],
    example: { eredmény: '?' }
  },
  options: ['21 200 Ft', '21 632 Ft', '21 800 Ft', '22 000 Ft'],
  answer: '21 632 Ft',
  keywords: ['kamatos kamat', 'százalék'],
  solution: '$20\\,000 \\cdot 1{,}04^2 = 20\\,000 \\cdot 1{,}0816 = \\mathbf{21\\,632}$ Ft.'
};
