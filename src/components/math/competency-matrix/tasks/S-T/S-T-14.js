export default {
  id: 'S-T-14',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Érme feldobás — gyakorisági tábla',
  difficulty: 1,
  scenario: 'Egy érmét 40-szer feldobtunk. A kapott eredményeket a táblázat tartalmazza.',
  question: 'Hányszor lett **fej**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Érme feldobás gyakoriságai',
    headers: ['Kimenet', 'Gyakoriság'],
    rows: [
      ['Fej', 23],
      ['Írás', 17]
    ]
  },
  options: ['17', '20', '23', '40'],
  answer: '23',
  keywords: ['gyakoriság', 'táblázat'],
  solution: `**Leolvasás:**

A **Fej** sorában **23** áll.

Ellenőrzés: $23 + 17 = 40$ ✓

**A helyes válasz: 23.**`
};
