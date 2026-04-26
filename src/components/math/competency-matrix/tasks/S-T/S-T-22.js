export default {
  id: 'S-T-22',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Rendelés — kórházi felmérés',
  difficulty: 2,
  scenario: 'Egy háziorvosi rendelőben egy napon feljegyezték, milyen típusú panasszal érkeztek a betegek.',
  question: 'Melyik panasz volt a **leggyakoribb**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Napi betegforgalom',
    headers: ['Panasz', 'Esetek'],
    rows: [
      ['Megfázás', 14],
      ['Fejfájás', 6],
      ['Hasfájás', 9],
      ['Egyéb', 5]
    ]
  },
  options: ['Megfázás', 'Fejfájás', 'Hasfájás', 'Egyéb'],
  answer: 'Megfázás',
  keywords: ['táblázat', 'gyakoriság'],
  solution: `**A legnagyobb érték 14 → Megfázás.**

**A helyes válasz: Megfázás.**`
};
