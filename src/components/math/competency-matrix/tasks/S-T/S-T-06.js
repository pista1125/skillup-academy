export default {
  id: 'S-T-06',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Dobókocka — páros/páratlan gyakoriság',
  difficulty: 1,
  scenario: 'Egy dobókockát 24-szer feldobtunk, és feljegyeztük, hány darab páros és páratlan szám jött ki.',
  question: 'A táblázat alapján **hány** páros dobást jegyeztünk fel?',
  visual: {
    type: 'frequencyTable',
    caption: 'Dobások megoszlása',
    headers: ['Típus', 'Gyakoriság'],
    rows: [
      ['Páros', 10],
      ['Páratlan', 14]
    ]
  },
  options: ['8', '10', '12', '14'],
  answer: '10',
  keywords: ['gyakoriság', 'leolvasás'],
  solution: `**Leolvasás a gyakorisági táblázatból:**

A **Páros** sorban szereplő érték: **10**.

Ellenőrzés: $10 + 14 = 24$ ✓

**A helyes válasz: 10.**`
};
