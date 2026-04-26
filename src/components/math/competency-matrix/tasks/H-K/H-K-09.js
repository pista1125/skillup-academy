export default {
  id: 'H-K-09',
  contentArea: 'H',
  contentSub: '2.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kétlépcsős áremelés',
  difficulty: 7,
  scenario: 'Egy könyv ára először **10%-kal nőtt**, majd a már megemelt ár **további 20%-kal** csökkent. A jelenlegi ára **3 960 Ft**.',
  question: 'Mennyi volt a könyv **eredeti ára**?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: 'Eredeti ár',
        formula: 'x',
        result: ''
      },
      {
        label: '1. lépés: +10%',
        formula: '1,10 · x',
        result: ''
      },
      {
        label: '2. lépés: -20%',
        formula: '0,80 · 1,10 · x = 0,88 · x',
        result: '= 3960'
      }
    ]
  },
  options: ['4 200 Ft', '4 400 Ft', '4 500 Ft', '4 800 Ft'],
  answer: '4 500 Ft',
  keywords: ['százalékszámítás', 'összetett', 'egyenlet'],
  solution: `**Áralakulás levezetése:**

Legyen az eredeti ár $x$.

- Emelés után: $1{,}10 \\cdot x$
- Csökkenés után: $0{,}80 \\cdot 1{,}10 \\cdot x = 0{,}88 \\cdot x$

Ez egyenlő $3\\,960$ Ft-tal.

$0{,}88 x = 3960 \\Rightarrow x = \\dfrac{3960}{0{,}88} = \\mathbf{4\\,500}$ Ft.

Ellenőrzés: $4500 \\cdot 1{,}1 = 4950$, majd $4950 \\cdot 0{,}8 = 3960$ ✓`
};
