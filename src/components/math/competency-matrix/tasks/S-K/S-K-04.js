export default {
  id: 'S-K-04',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Hiányzó adat az átlaghoz',
  difficulty: 6,
  scenario: 'Egy sportbajnokságon **6 meccsen** lőtt góljait egy csapat az alábbi táblázatban rögzítette. A csapat **átlagos góllövése** a bajnokságon **3 gól/meccs**.',
  question: 'Hány gólt lőttek a **6. meccsen**?',
  visual: {
    type: 'table',
    caption: 'Gólok meccsenként',
    headers: ['Meccs', '1.', '2.', '3.', '4.', '5.', '6.'],
    rows: [
      ['Gólok', '2', '4', '1', '5', '3', '?']
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '3',
  keywords: ['átlag', 'hiányzó adat', 'inverz'],
  solution: `**Átlagból visszaszámítás:**

Az átlag definíciója: összeg / darabszám. Mivel az átlag 3, a 6 meccs összesen:

$$S = 3 \\cdot 6 = 18 \\text{ gól}$$

Az ismert 5 meccs összege: $2+4+1+5+3 = 15$.

A 6. meccs: $18 - 15 = \\mathbf{3}$ gól.

**A helyes válasz: 3 gól.**`
};
