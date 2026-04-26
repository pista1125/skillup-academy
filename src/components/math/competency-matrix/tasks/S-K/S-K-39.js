export default {
  id: 'S-K-39',
  contentArea: 'S',
  contentSub: '4.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Fesztivál-látogatók nemek szerint — elemzés',
  difficulty: 7,
  scenario: 'Egy háromnapos fesztivál látogatóit nemek szerint összesítették. Péntek: 1200 fiú, 800 lány. Szombat: 1500 fiú, 1300 lány. Vasárnap: 900 fiú, 1100 lány.',
  question: 'Melyik állítás **IGAZ** a fesztiválra?',
  visual: {
    type: 'groupedBar',
    categories: ['Péntek', 'Szombat', 'Vasárnap'],
    yMax: 1600,
    yLabel: 'Látogatók',
    series: [
      { name: 'Fiúk', color: '#2563eb', values: [1200, 1500, 900] },
      { name: 'Lányok', color: '#ec4899', values: [800, 1300, 1100] }
    ]
  },
  options: [
    'A fiúk mindhárom napon többen voltak, mint a lányok.',
    'Vasárnap több lány volt, mint fiú.',
    'A szombati látogatók száma a legkevesebb.',
    'A teljes fesztiválon összesen több lány volt, mint fiú.'
  ],
  answer: 'Vasárnap több lány volt, mint fiú.',
  keywords: ['csoportosított oszlopdiagram', 'összehasonlítás', 'igaz állítás'],
  solution: `**Napi bontás:**

- Péntek: $1200 > 800$ → fiúk többen.
- Szombat: $1500 > 1300$ → fiúk többen.
- Vasárnap: $900 < 1100$ → **lányok többen** ✓

**Összes:** Fiúk $1200+1500+900 = 3600$; Lányok $800+1300+1100 = 3200$ → fiúk vannak többen.

**Szombat** a legnagyobb (összesen $2800$), nem a legkevesebb.

**A helyes válasz: Vasárnap több lány volt, mint fiú.**`
};
