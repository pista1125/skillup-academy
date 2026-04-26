export default {
  id: 'M-A-02',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Repülőjárat – időzóna',
  difficulty: 5,
  scenario: 'Egy repülő Budapestről 14:30-kor indul és 7 óra 15 perc alatt ér New Yorkba. New Yorkban az idő **6 órával kevesebb**, mint Budapesten.',
  question: 'Helyi idő szerint hánykor landol a repülő New Yorkban?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '14:30',
        label: 'Indulás (BP idő)',
        color: '#2563eb'
      },
      {
        t: '21:45',
        label: 'Landolás (BP idő)',
        color: '#16a34a'
      },
      {
        t: '15:45',
        label: 'Landolás (NY idő)',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['13:45', '15:45', '17:45', '21:45'],
  answer: '15:45',
  keywords: ['idő', 'időzóna', 'műveletsor'],
  solution: `**Két lépéses megoldás:**

1. **Landolás budapesti idő szerint:** $14{:}30 + 7\\ \\text{óra}\\ 15\\ \\text{perc} = 21{:}45$.
2. **Átváltás NY idejére:** $21{:}45 - 6\\ \\text{óra} = 15{:}45$.

**A helyes válasz: 15:45 (helyi idő).**`
};
