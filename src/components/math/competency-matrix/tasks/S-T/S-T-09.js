export default {
  id: 'S-T-09',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Halmazok — kedvenc háziállatok',
  difficulty: 2,
  scenario: 'Egy kérdőívben a diákok bejelölték, van-e otthon **kutyájuk** vagy **macskájuk**. A Venn-diagram a válaszokat mutatja.',
  question: 'Hányan tartanak **csak kutyát** (macskát nem)?',
  visual: {
    type: 'venn',
    sets: [
      {
        label: 'Kutya',
        color: '#a16207'
      },
      {
        label: 'Macska',
        color: '#6d28d9'
      }
    ],
    regions: {
      onlyA: 9,
      onlyB: 6,
      both: 4,
      neither: 5
    },
    universe: 24
  },
  options: ['4', '6', '9', '13'],
  answer: '9',
  keywords: ['Venn-diagram', 'halmaz', 'leolvasás'],
  solution: `**Leolvasás a Venn-diagramról:**

A **csak kutya** régió (Kutya halmaz, de nem Macska) értéke **9**.

**A helyes válasz: 9 diák.**`
};
