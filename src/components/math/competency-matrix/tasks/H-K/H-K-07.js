export default {
  id: 'H-K-07',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Energiafelhasználás',
  difficulty: 6,
  scenario: 'A csoportosított oszlopdiagram egy családi ház havi **villany-** és **gázfogyasztását** mutatja (kWh-ban mérve, hogy össze lehessen hasonlítani).',
  question: 'Melyik hónapban volt a **legnagyobb az összfogyasztás** (villany + gáz)?',
  visual: {
    type: 'groupedBar',
    categories: ['Okt', 'Nov', 'Dec', 'Jan', 'Feb'],
    yMax: 900,
    yLabel: 'kWh',
    series: [
      {
        name: 'Villany',
        color: '#f59e0b',
        values: [320, 350, 380, 400, 370]
      },
      {
        name: 'Gáz',
        color: '#ef4444',
        values: [250, 380, 480, 520, 450]
      }
    ]
  },
  options: ['November', 'December', 'Január', 'Február'],
  answer: 'Január',
  keywords: ['csoportosított oszlopdiagram', 'összehasonlítás', 'összeg'],
  solution: `**Összegek kiszámítása:**

- Okt: $320 + 250 = 570$
- Nov: $350 + 380 = 730$
- Dec: $380 + 480 = 860$
- **Jan: $400 + 520 = 920$** — legnagyobb
- Feb: $370 + 450 = 820$

**A helyes válasz: Január (920 kWh).**`
};
