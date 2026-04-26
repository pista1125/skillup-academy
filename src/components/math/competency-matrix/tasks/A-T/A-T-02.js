export default {
  id: 'A-T-02',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Égtájak — térkép',
  difficulty: 2,
  scenario: 'Egy turistatérképet látsz égtájjelzéssel. A szálloda (S) északon, a tó (T) nyugaton, a rom (R) délen helyezkedik el a központi ponthoz képest.',
  question: 'Milyen irányban van a szálloda?',
  visual: {
    type: 'compass',
    center: 'K',
    points: [
      {
        label: 'S',
        direction: 'N'
      },
      {
        label: 'T',
        direction: 'W'
      },
      {
        label: 'R',
        direction: 'S'
      }
    ]
  },
  options: ['Északra', 'Délre', 'Keletre', 'Nyugatra'],
  answer: 'Északra',
  keywords: ['égtájak', 'tájékozódás'],
  solution: 'A szöveg és a térkép egyértelműen közli: a szálloda (S) **északra** helyezkedik el a központhoz képest. **A helyes válasz: Északra.**'
};
