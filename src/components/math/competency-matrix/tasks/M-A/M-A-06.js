export default {
  id: 'M-A-06',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Gyümölcssaláta arány',
  difficulty: 4,
  scenario: 'Egy receptben a **gyümölcssaláta** arányai: **2 rész** alma, **3 rész** banán, **1 rész** szőlő. Panni **3 kg alma**-hoz elkészíti a salátát.',
  question: 'Hány kg banánra van szüksége?',
  visual: {
    type: 'recipe',
    servingsOriginal: '2 : 3 : 1',
    servingsTarget: '3 kg alma',
    ingredients: [
      {
        name: 'Alma',
        amount: 2,
        unit: 'rész'
      },
      {
        name: 'Banán',
        amount: 3,
        unit: 'rész'
      },
      {
        name: 'Szőlő',
        amount: 1,
        unit: 'rész'
      }
    ],
    highlight: 'Banán'
  },
  options: ['2 kg', '3 kg', '4,5 kg', '6 kg'],
  answer: '4,5 kg',
  keywords: ['arány', 'szorzás'],
  solution: `**Arány alkalmazása:**

1. 2 rész alma = 3 kg → **1 rész** = $3 \\div 2 = 1{,}5$ kg.
2. Banán 3 rész: $3 \\cdot 1{,}5 = 4{,}5$ kg.

**A helyes válasz: 4,5 kg.**`
};
