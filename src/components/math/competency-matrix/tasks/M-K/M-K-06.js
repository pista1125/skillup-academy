export default {
  id: 'M-K-06',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Háromféle villamos',
  difficulty: 7,
  scenario: 'Egy megállóban reggel **6:00**-kor egyszerre indul a **4**-es, a **6**-os és a **18**-as villamos. A **4**-es **8 percenként**, a **6**-os **12 percenként**, a **18**-as **20 percenként** jön.',
  question: 'Mikor indul legközelebb **egyszerre mindhárom** villamos?',
  visual: {
    type: 'comparison',
    items: [
      {
        label: '4-es',
        formula: '8 percenként',
        result: '8'
      },
      {
        label: '6-os',
        formula: '12 percenként',
        result: '12'
      },
      {
        label: '18-as',
        formula: '20 percenként',
        result: '20'
      }
    ]
  },
  answer: '8:00',
  keywords: ['legkisebb közös többszörös'],
  solution: `**lkkt keresése:**

- $8 = 2^3$
- $12 = 2^2 \\cdot 3$
- $20 = 2^2 \\cdot 5$
- **lkkt(8, 12, 20)** $= 2^3 \\cdot 3 \\cdot 5 = 120$ perc $= 2$ óra.

Tehát legközelebb **6:00 + 2 óra = 8:00**-kor indul egyszerre mindhárom.`
};
