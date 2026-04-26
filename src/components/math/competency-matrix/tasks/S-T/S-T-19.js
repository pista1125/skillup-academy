export default {
  id: 'S-T-19',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Napi internethasználat',
  difficulty: 2,
  scenario: 'Egy felmérésben a 20 diáktól megkérdezték, naponta hány órát internetezik.',
  question: 'Hány tanuló internetezik naponta **2 órát**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Napi internetes órák',
    headers: ['Óra', 'Tanulók száma'],
    rows: [
      ['0', 1],
      ['1', 4],
      ['2', 7],
      ['3', 5],
      ['4', 3]
    ]
  },
  options: ['3', '5', '7', '8'],
  answer: '7',
  keywords: ['gyakoriság', 'táblázat'],
  solution: `**A 2 óra soránál 7 áll.**

Ellenőrzés: $1+4+7+5+3 = 20$ ✓

**A helyes válasz: 7.**`
};
