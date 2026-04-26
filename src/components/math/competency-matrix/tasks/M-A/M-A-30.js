export default {
  id: 'M-A-30',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kirándulás — várható érkezés',
  difficulty: 4,
  scenario: 'Egy busz **08:30-kor** indul, **60 km/h** átlagsebességgel halad, a távolság **150 km**. Útközben **25 perc pihenőt** tart.',
  question: 'Hánykor **érkezik** meg?',
  visual: {
    type: 'timeline',
    label: 'Kirándulás időrend',
    events: [
      { t: '08:30', label: 'Indulás' },
      { t: '?', label: 'Érkezés' }
    ]
  },
  options: ['10:55', '11:25', '11:30', '11:55'],
  answer: '11:25',
  keywords: ['átlagsebesség', 'időszámítás', 'kirándulás'],
  solution: `Út ideje: $150 / 60 = 2{,}5$ óra = 2 óra 30 perc.

Plus pihenő: $25$ perc. Összesen: $2$ óra $55$ perc.

$08:30 + 2:55 = \\mathbf{11:25}$.`
};
