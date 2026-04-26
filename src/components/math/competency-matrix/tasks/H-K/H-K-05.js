export default {
  id: 'H-K-05',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Két vonat találkozása',
  difficulty: 6,
  scenario: 'Két vonat egymás felé halad ugyanazon a pályán (A és B város között 300 km a távolság). A grafikon mindkét vonat helyét mutatja az idő függvényében.',
  question: 'Körülbelül **hány óránál** találkoznak a vonatok?',
  visual: {
    type: 'lineChart',
    xLabel: 'Idő (óra)',
    yLabel: 'Hely (km)',
    yMin: 0,
    yMax: 300,
    series: [
      {
        name: 'Kék vonat (A-ból indul)',
        color: '#2563eb',
        points: [
          {
            x: '0',
            y: 0
          },
          {
            x: '1',
            y: 60
          },
          {
            x: '2',
            y: 120
          },
          {
            x: '3',
            y: 180
          },
          {
            x: '4',
            y: 240
          }
        ]
      },
      {
        name: 'Piros vonat (B-ből indul)',
        color: '#ef4444',
        points: [
          {
            x: '0',
            y: 300
          },
          {
            x: '1',
            y: 240
          },
          {
            x: '2',
            y: 180
          },
          {
            x: '3',
            y: 120
          },
          {
            x: '4',
            y: 60
          }
        ]
      }
    ]
  },
  options: ['2 óra', '2,5 óra', '3 óra', '3,5 óra'],
  answer: '2,5 óra',
  keywords: ['grafikon', 'metszéspont', 'vonat'],
  solution: `**Metszéspont keresése:**

A kék vonat: $y = 60t$. A piros vonat: $y = 300 - 60t$.

Találkozás: $60t = 300 - 60t \\Rightarrow 120t = 300 \\Rightarrow t = \\mathbf{2{,}5}$ óra.

Ekkor mindkét vonat a 150 km-es pontnál van.`
};
