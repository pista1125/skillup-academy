export default {
  id: 'S-T-02',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Gyakorisági táblázat',
  difficulty: 2,
  scenario: 'Egy dobókockát 30-szor feldobtunk, és feljegyeztük a dobott számokat.',
  question: 'Melyik számot dobtuk a **legtöbbször**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Dobások gyakorisága',
    headers: ['Dobott szám', 'Gyakoriság'],
    rows: [
      ['1', 4],
      ['2', 6],
      ['3', 3],
      ['4', 8],
      ['5', 5],
      ['6', 4]
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '4',
  keywords: ['gyakoriság', 'táblázat', 'adatleolvasás'],
  solution: `**Gyakoriságok összehasonlítása:**

A legnagyobb gyakoriság **8**, ami a **4**-es dobáshoz tartozik.

Ellenőrzés — az összes dobás: $4+6+3+8+5+4 = 30$ ✓

**A helyes válasz: 4.**`
};
