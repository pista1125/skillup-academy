export default {
  id: 'M-A-07',
  contentArea: 'M',
  contentSub: '1.2.4',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Térkép méretaránya',
  difficulty: 4,
  scenario: 'Egy turistatérkép méretaránya **1 : 50 000**. Két falu között a térképen mért távolság **6 cm**.',
  question: 'Mekkora a valódi távolság a két falu között?',
  visual: {
    type: 'formula',
    formula: 'valódi = mért · méretarány',
    variables: [
      {
        name: 'mért',
        desc: 'térképen mért hossz (cm)'
      },
      {
        name: 'méretarány',
        desc: '1 cm ↔ 50 000 cm = 500 m'
      }
    ],
    example: {
      'mért_cm': 6
    }
  },
  options: ['300 m', '3 km', '30 km', '300 km'],
  answer: '3 km',
  keywords: ['méretarány', 'mértékegység-átváltás'],
  solution: `**Méretarány alkalmazása:**

1. $6$ cm a térképen → $6 \\cdot 50\\,000 = 300\\,000$ cm a valóságban.
2. Átváltás: $300\\,000$ cm $= 3000$ m $= 3$ km.

**A helyes válasz: 3 km.**`
};
