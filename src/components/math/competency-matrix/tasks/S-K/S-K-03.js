export default {
  id: 'S-K-03',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Igaz állítások a diagramról',
  difficulty: 7,
  scenario: 'Az alábbi csoportosított oszlopdiagram két osztály (**6.a** és **6.b**) kedvenc tantárgyát mutatja. Vizsgáld meg az állításokat!',
  question: 'Melyik állítás **IGAZ** a diagram alapján?',
  visual: {
    type: 'groupedBar',
    categories: ['Matek', 'Magyar', 'Történelem', 'Rajz', 'Testnevelés'],
    yMax: 12,
    yLabel: 'Tanulók száma',
    series: [
      {
        name: '6.a',
        color: '#2563eb',
        values: [8, 6, 4, 3, 7]
      },
      {
        name: '6.b',
        color: '#ef4444',
        values: [5, 9, 6, 2, 8]
      }
    ]
  },
  options: ['A 6.a-ban a testnevelést választották a legtöbben.', 'A 6.b-ben senki sem választotta a rajzot.', 'Mindkét osztályban többen választották a magyart, mint a történelmet.', 'A két osztályban összesen ugyanannyian választották a matekot, mint a magyart.'],
  answer: 'Mindkét osztályban többen választották a magyart, mint a történelmet.',
  keywords: ['logika', 'igaz-hamis', 'diagram-értelmezés'],
  solution: `**Állítások sorra vétele:**

1. *A 6.a-ban a testnevelést választották a legtöbben.* → A 6.a-ban a **matek** a legnépszerűbb (8 > 7). **HAMIS.**
2. *A 6.b-ben senki sem választotta a rajzot.* → A diagramon **2 fő** választotta. **HAMIS.**
3. *Mindkét osztályban többen választották a magyart, mint a történelmet.*
   - 6.a: magyar 6, történelem 4 → $6 > 4$ ✓
   - 6.b: magyar 9, történelem 6 → $9 > 6$ ✓
   - **IGAZ.**
4. *Összesen ugyanannyian matek, mint magyar?* → Matek: $8+5 = 13$; magyar: $6+9 = 15$. **HAMIS.**

**A helyes válasz a 3. állítás.**`
};
