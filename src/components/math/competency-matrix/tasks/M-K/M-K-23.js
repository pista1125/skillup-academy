export default {
  id: 'M-K-23',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Időzóna — 09:00 → ?',
  difficulty: 6,
  scenario: 'Egy repülő **09:00-kor** indul, 10h 30p alatt ér célba. Cél-városban az idő **-8 óra**.',
  question: 'Hánykor landol helyi idő szerint?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '09:00',
        label: 'Indulás (helyi)',
        color: '#2563eb'
      },
      {
        t: '11:30',
        label: 'Landolás (cél-helyi)',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  options: ['09:30', '11:30', '12:30', '13:30'],
  answer: '11:30',
  keywords: ['idő', 'időzóna'],
  solution: '**Landolás induló idő:** 19:30. Cél idő = −(8)h = **11:30**.'
};
