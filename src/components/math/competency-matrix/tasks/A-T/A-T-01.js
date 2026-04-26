export default {
  id: 'A-T-01',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Tengelyes tükörkép',
  difficulty: 2,
  scenario: 'Az alábbi ábrán egy betű és négy lehetséges tükörképe látható.',
  question: 'Melyik a **"F"** betű **függőleges tengelyre** vonatkozó tükörképe?',
  visual: {
    type: 'mirrorChoice',
    letter: 'F',
    axis: 'vertical',
    options: ['F', 'Ⅎ', 'ꟻ', 'Ⅎ_rot']
  },
  options: ['A', 'B', 'C', 'D'],
  answer: 'C',
  keywords: ['tengelyes tükrözés'],
  solution: `**Függőleges (álló) tengelyes tükrözésnél:**

- Jobb ↔ bal felcserélődik
- A **"F"** tükörképe egy olyan alakzat, amelynek a vízszintes vonalai **balra** mutatnak.
- Ez a **C** ábra (ꟻ).`
};
