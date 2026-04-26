export default {
  id: 'M-K-07',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Áremelés és kedvezmény',
  difficulty: 6,
  scenario: 'Egy könyv eredeti ára **2 500 Ft**. A könyvesbolt előbb **10%**-kal **emelte** az árat, majd a hétvégén a megemelt árból **10%** **kedvezményt** adott.',
  question: 'Mennyibe kerül most a könyv, és mennyivel **olcsóbb / drágább** az eredeti árhoz képest?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Emelés után',
        formula: '2500 · 1,10',
        result: '2 750 Ft'
      },
      {
        label: 'Kedvezmény után',
        formula: '2750 · 0,90',
        result: '2 475 Ft'
      }
    ]
  },
  answer: {
    ar: 2475,
    kulonbseg: '25 Ft-tal olcsóbb'
  },
  keywords: ['százalékszámítás', 'érvelés'],
  solution: `**Lépésenként:**

1. **Emelés után:** $2500 \\cdot 1{,}10 = 2750$ Ft.
2. **Kedvezmény után:** $2750 \\cdot 0{,}90 = 2475$ Ft.
3. Különbség az eredeti $2500$-hoz: $2500 - 2475 = 25$ Ft-tal **olcsóbb**.

**Megfigyelés:** a $+10\\%$-ot és a $-10\\%$-ot **nem** lehet „kiejteni": $1{,}10 \\cdot 0{,}90 = 0{,}99$, ami $1\\%$ csökkenést jelent.`
};
