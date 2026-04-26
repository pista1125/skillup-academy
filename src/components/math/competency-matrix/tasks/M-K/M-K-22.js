export default {
  id: 'M-K-22',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Időzóna — 14:30 → ?',
  difficulty: 6,
  scenario: 'Egy repülő **14:30-kor** indul, 7h 15p alatt ér célba. Cél-városban az idő **-6 óra**.',
  question: 'Hánykor landol helyi idő szerint?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '14:30',
        label: 'Indulás (helyi)',
        color: '#2563eb'
      },
      {
        t: '15:45',
        label: 'Landolás (cél-helyi)',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['13:45', '15:45', '16:45', '17:45'],
  answer: '15:45',
  keywords: ['idő', 'időzóna'],
  solution: '**Landolás induló idő:** 21:45. Cél idő = −(6)h = **15:45**.'
};
