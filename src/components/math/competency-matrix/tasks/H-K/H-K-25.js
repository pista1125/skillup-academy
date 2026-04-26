export default {
  id: 'H-K-25',
  contentArea: 'H',
  contentSub: '2.3.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Keveréktan — gyümölcslé',
  difficulty: 6,
  scenario: 'Egy italt úgy készítenek, hogy **2 rész** sűrítményt **5 rész** vízzel kevernek. Mennyi **sűrítmény** kell **3,5 L** italhoz?',
  question: 'Hány **liter** sűrítmény szükséges?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'Sűrítmény : Víz', formula: '2 : 5', result: '' },
      { label: 'Össz. rész', formula: '7', result: '' },
      { label: 'Teljes ital', formula: '3,5 L', result: '?' }
    ]
  },
  options: ['0,5 L', '0,8 L', '1 L', '1,4 L'],
  answer: '1 L',
  keywords: ['arány', 'keverés'],
  solution: '$\\dfrac{2}{7} \\cdot 3{,}5 = \\mathbf{1}$ L.'
};
