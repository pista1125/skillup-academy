export default {
  id: 'H-T-45',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Óraeltolódás — Budapest-London',
  difficulty: 3,
  scenario: 'Londonban 1 órával korábban van, mint Budapesten. A londoni óra 14:20-at mutat.',
  question: 'Mennyi az idő **Budapesten**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'London', formula: '14:20', result: '' },
      { label: 'Budapest', formula: 'London + 1 óra', result: '?' }
    ]
  },
  options: ['13:20', '14:20', '15:20', '16:20'],
  answer: '15:20',
  keywords: ['időzóna', 'összeadás'],
  solution: '$14:20 + 1\\text{ óra} = \\mathbf{15:20}$.'
};
