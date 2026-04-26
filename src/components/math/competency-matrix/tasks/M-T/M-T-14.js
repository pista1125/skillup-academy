export default {
  id: 'M-T-14',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Mozi kezdete',
  difficulty: 2,
  scenario: 'Az iskolai filmklub előadása **19:20**-kor kezdődik. A film **1 óra 35 percig** tart.',
  question: 'Hánykor ér véget a film?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Kezdés',
        h: 19,
        m: 20
      },
      {
        label: 'Vége',
        h: 20,
        m: 55
      }
    ]
  },
  options: ['20:45', '20:50', '20:55', '21:05'],
  answer: '20:55',
  keywords: ['idő', 'összeadás'],
  solution: `**Idő-hozzáadás:**

$$19{:}20 + 1\\ \\text{óra}\\ 35\\ \\text{perc} = 20{:}55.$$

Részlépések: $19{:}20 + 1$ óra $= 20{:}20$, majd $20{:}20 + 35$ perc $= 20{:}55$.

**A helyes válasz: 20:55.**`
};
