export default {
  id: 'A-K-45',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Körgyűrű becslés',
  difficulty: 7,
  scenario: 'Egy **6 × 6**-os négyzetbe egy **4 × 4**-es négyzetet rajzolunk középre. A köztes rész (keret) a kérdés.',
  question: 'Mekkora a **keretterület**?',
  visual: {
    type: 'rectangle',
    widthM: 6,
    heightM: 6,
    label: 'keret',
    fill: '#fff0a0',
    unit: 'cm'
  },
  options: ['12', '16', '20', '36'],
  answer: '20',
  keywords: ['terület', 'különbség'],
  solution: '$T = 6^2 - 4^2 = 36 - 16 = \\mathbf{20}$ területegység.'
};
