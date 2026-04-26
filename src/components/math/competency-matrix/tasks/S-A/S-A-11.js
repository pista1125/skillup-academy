export default {
  id: 'S-A-11',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Lottósorsolás — nyerőszám valószínűsége',
  difficulty: 4,
  scenario: 'Egy kis lottón **1-től 20-ig** számozott golyók közül húznak **egyet**. A nyerőszámok **5-tel oszthatók** (5, 10, 15, 20).',
  question: 'Mennyi a **valószínűsége**, hogy a húzott szám nyerőszám?',
  visual: {
    type: 'frequencyTable',
    caption: 'Számok 1-től 20-ig',
    headers: ['Típus', 'Darab'],
    rows: [
      ['5-tel osztható (nyerő)', 4],
      ['Nem 5-tel osztható', 16]
    ]
  },
  options: ['$\\tfrac{1}{20}$', '$\\tfrac{1}{5}$', '$\\tfrac{1}{4}$', '$\\tfrac{4}{5}$'],
  answer: '$\\tfrac{1}{5}$',
  keywords: ['klasszikus valószínűség', 'oszthatóság'],
  solution: `**Klasszikus valószínűség:**

Kedvező: $\\{5, 10, 15, 20\\}$ → **4 darab**. Összes: $20$.

$$P = \\dfrac{4}{20} = \\dfrac{1}{5}$$

**A helyes válasz: $\\tfrac{1}{5}$.**`
};
