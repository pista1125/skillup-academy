export default {
  id: 'M-A-03',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Medence feltöltése',
  difficulty: 4,
  scenario: 'Egy medence térfogata **5,4 m³**. A kerti csapból percenként **3 liter** víz folyik.',
  question: 'Hány óra alatt telik meg a medence, ha folyamatosan engedjük a vizet?',
  visual: {
    type: 'pool',
    volumeM3: 5.4,
    flowLmin: 3
  },
  options: ['25 óra', '30 óra', '45 óra', '90 óra'],
  answer: '30 óra',
  keywords: ['mértékegység-átváltás', 'térfogat', 'idő'],
  solution: `**Térfogat átváltása literre, majd idő számítása:**

1. $5{,}4$ m³ = $5400$ liter.
2. Összes perc: $\\dfrac{5400}{3} = 1800$ perc.
3. Óra: $\\dfrac{1800}{60} = 30$ óra.

**A helyes válasz: 30 óra.**`
};
