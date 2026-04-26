export default {
  id: 'S-K-08',
  contentArea: 'S',
  contentSub: '4.4',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Két osztály átlagmagassága',
  difficulty: 6,
  scenario: `A 6.a és a 6.b átlagmagasságát hasonlítjuk össze. Ismerjük:

- 6.a: **20 tanuló**, átlagmagasság **150 cm**.
- 6.b: **15 tanuló**, átlagmagasság **156 cm**.`,
  question: 'Mekkora a **két osztály együttes** átlagmagassága?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '6.a',
        value: '20 fő · 150 cm'
      },
      {
        label: '6.b',
        value: '15 fő · 156 cm'
      }
    ]
  },
  options: ['152 cm', '152,57 cm', '153 cm', '153,5 cm'],
  answer: '152,57 cm',
  keywords: ['súlyozott átlag', 'kombinált minta'],
  solution: `**Súlyozott átlag:**

A két osztály **teljes magasságösszege**:

$$S = 20 \\cdot 150 + 15 \\cdot 156 = 3000 + 2340 = 5340$$

A tanulók száma: $20 + 15 = 35$.

$$\\bar{x} = \\dfrac{5340}{35} \\approx \\mathbf{152{,}57} \\text{ cm}$$

Megjegyzés: **NEM** helyes az egyszerű átlagolás ($\\tfrac{150+156}{2}=153$), mert az osztályok létszáma eltérő — a nagyobb létszámú osztály súlya nagyobb.

**A helyes válasz: 152,57 cm.**`
};
