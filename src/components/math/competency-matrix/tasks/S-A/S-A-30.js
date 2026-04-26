export default {
  id: 'S-A-30',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Bajnokság — mérkőzések átlagos nézőszáma',
  difficulty: 4,
  scenario: 'Egy kézilabda-bajnokság 5 mérkőzésének nézőszámát a táblázat mutatja.',
  question: 'Mennyi a mérkőzések **átlagos nézőszáma**?',
  visual: {
    type: 'frequencyTable',
    caption: 'Mérkőzések nézőszáma',
    headers: ['Forduló', 'Nézők'],
    rows: [
      ['1.', 420],
      ['2.', 380],
      ['3.', 510],
      ['4.', 290],
      ['5.', 400]
    ]
  },
  options: ['380', '400', '420', '450'],
  answer: '400',
  keywords: ['átlag', 'számtani közép'],
  solution: `**Összeg:** $420 + 380 + 510 + 290 + 400 = 2000$.

**Mérkőzések száma:** $5$.

$$\\bar{x} = \\dfrac{2000}{5} = \\mathbf{400}$$

**A helyes válasz: 400.**`
};
