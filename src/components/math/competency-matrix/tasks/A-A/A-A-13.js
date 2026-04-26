export default {
  id: 'A-A-13',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Szoborcsoport — szimmetria',
  difficulty: 4,
  scenario: 'Egy négyzet alakú parkban **négy egyforma szobor** áll: a négyzet négy **oldalfelező** pontjában.',
  question: 'Hány **szimmetriatengelye** van a szoborcsoport elrendezésének?',
  visual: {
    type: 'grid',
    w: 5,
    h: 5,
    shadedCells: [
      [2, 0],
      [0, 2],
      [4, 2],
      [2, 4]
    ]
  },
  options: ['2', '4', '6', '8'],
  answer: '4',
  keywords: ['szimmetria', 'tengely', 'forgás'],
  solution: `A négyzet oldalfelezőin elhelyezett 4 pont mintázata megőrzi a négyzet szimmetriáit, amelyekre a **pontok is önmagukba tükröződnek**:

- A négyzet **két átlója** (a pontok csak páronként cserélnek helyet)
- A négyzet **két középvonala** (függőleges és vízszintes tengely) — ezek **fixen tartják** a pontokat.

Összesen: **4 szimmetriatengely**.`
};
