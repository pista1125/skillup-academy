export default {
  id: 'H-A-47',
  contentArea: 'H',
  contentSub: '2.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.2',
  title: 'Vonatkocsi — ülések',
  difficulty: 4,
  scenario: 'A vonat minden kocsijában **48 ülés** van. Az első kocsiban **12 utas** ült le; minden további kocsiban **6-tal több** utas foglal helyet.',
  question: 'Hány utas ül a **7. kocsiban**?',
  visual: {
    type: 'sequence',
    elements: ['12', '18', '24', '30', '...', '?']
  },
  options: ['42', '44', '46', '48'],
  answer: '48',
  keywords: ['sorozat', 'n-edik tag'],
  solution: '$a_7 = 12 + 6 \\cdot 6 = \\mathbf{48}$ utas.'
};
