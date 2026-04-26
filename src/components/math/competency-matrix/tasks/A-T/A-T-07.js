export default {
  id: 'A-T-07',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Kerékpárút — égtáj',
  difficulty: 1,
  scenario: 'Egy kerékpárút elágazásától a **pihenőhely (P)** **keletre**, a **forrás (F)** **északkeletre** található.',
  question: 'Milyen irányba indulj, ha a **forráshoz** akarsz jutni?',
  visual: {
    type: 'compass',
    center: 'E',
    points: [
      {
        label: 'P',
        direction: 'E'
      },
      {
        label: 'F',
        direction: 'NE'
      }
    ]
  },
  options: ['Északra', 'Északkeletre', 'Keletre', 'Délre'],
  answer: 'Északkeletre',
  keywords: ['égtájak', 'tájékozódás'],
  solution: 'A szöveg szerint a forrás (F) **északkeleti** irányban van az elágazástól. **A helyes válasz: Északkeletre.**'
};
