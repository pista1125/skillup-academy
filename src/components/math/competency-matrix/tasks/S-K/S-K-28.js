export default {
  id: 'S-K-28',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Internet-használat kor szerint',
  difficulty: 6,
  scenario: 'Egy felmérés szerint 120 fő napi internet-használatát mértek három korcsoportban. A csoportosított oszlopdiagram mutatja, hányan tartoznak az **1 óránál kevesebb**, **1–3 óra** és **3 óránál több** kategóriába korcsoportonként.',
  question: 'A **14–18 éves** korcsoport hány százaléka internetezik **naponta 3 óránál többet**?',
  visual: {
    type: 'groupedBar',
    categories: ['10–13 év', '14–18 év', '19+ év'],
    yMax: 30,
    yLabel: 'Fő',
    series: [
      { name: '<1 óra', color: '#22c55e', values: [20, 5, 10] },
      { name: '1–3 óra', color: '#f59e0b', values: [15, 15, 20] },
      { name: '>3 óra', color: '#ef4444', values: [5, 20, 10] }
    ]
  },
  options: ['25%', '40%', '50%', '60%'],
  answer: '50%',
  keywords: ['csoportosított oszlopdiagram', 'arány', 'százalék'],
  solution: `A **14–18 éves** csoport teljes létszáma: $5 + 15 + 20 = 40$ fő.

**>3 órát használók:** $20$ fő.

$$\\dfrac{20}{40} = \\dfrac{1}{2} = \\mathbf{50\\%}$$

**A helyes válasz: 50%.**`
};
