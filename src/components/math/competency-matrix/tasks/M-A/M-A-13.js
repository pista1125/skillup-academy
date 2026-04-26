export default {
  id: 'M-A-13',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Osztály kirándulása',
  difficulty: 4,
  scenario: 'A **6.a** osztályban **25 diák** van. Egy kiránduláson **60%**-uk vett részt.',
  question: 'Hány diák ment el a kirándulásra?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Osztálylétszám',
        count: 25,
        unit: 'fő',
        color: '#dbeafe'
      },
      {
        label: 'Résztvevő',
        count: '60%',
        color: '#fde68a'
      }
    ]
  },
  options: ['10 fő', '12 fő', '15 fő', '18 fő'],
  answer: '15 fő',
  keywords: ['százalékszámítás'],
  solution: `**Százalékérték:**

$$25 \\cdot \\dfrac{60}{100} = 25 \\cdot 0{,}6 = 15\\ \\text{fő}.$$

**A helyes válasz: 15 fő.**`
};
