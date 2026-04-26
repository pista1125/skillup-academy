export default {
  id: 'H-A-20',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szavazás — eredmény',
  difficulty: 4,
  scenario: 'Egy szavazáson **45 szavazat** érkezett, ez a választók **25%-a**.',
  question: 'Hány választó volt **összesen**?',
  visual: {
    type: 'pieChart',
    slices: [
      { label: 'Szavazott', value: 25, color: '#22c55e' },
      { label: 'Nem szavazott', value: 75, color: '#9ca3af' }
    ]
  },
  options: ['120', '150', '160', '180'],
  answer: '180',
  keywords: ['százalékalap', 'szavazás'],
  solution: '$25\\% = 45$ → $1\\% = 1{,}8$. $100\\% = \\mathbf{180}$.'
};
