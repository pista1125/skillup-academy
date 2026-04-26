export default {
  id: 'M-A-50',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Repülőút — időzóna',
  difficulty: 4,
  scenario: 'Egy repülő **Budapestről 10:20-kor indul** és **Londonba 12:05-kor érkezik** helyi idő szerint. London **1 órával** van Budapest mögött.',
  question: 'Mennyi volt a **tényleges repülési idő**?',
  visual: {
    type: 'timeline',
    label: 'Repülőút időzónákkal',
    events: [
      { t: '10:20 BUD', label: 'Indulás' },
      { t: '12:05 LON', label: 'Érkezés' }
    ]
  },
  options: ['1 óra 45 perc', '2 óra 45 perc', '2 óra 15 perc', '3 óra 45 perc'],
  answer: '2 óra 45 perc',
  keywords: ['időzóna', 'repülőút'],
  solution: `Londoni érkezés BUD idő szerint: $12:05 + 1:00 = 13:05$.

Repülés: $13:05 - 10:20 = \\mathbf{2}$ óra $\\mathbf{45}$ perc.`
};
