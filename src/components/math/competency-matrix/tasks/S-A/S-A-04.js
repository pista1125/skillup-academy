export default {
  id: 'S-A-04',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Valószínűség — színes golyók',
  difficulty: 5,
  scenario: 'Egy urnában **4 piros**, **3 kék** és **5 zöld** golyó van. Véletlenszerűen kihúzunk egyet.',
  question: 'Mennyi a valószínűsége, hogy **kék** golyót húzunk?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Piros',
        count: 4,
        unit: 'db',
        color: '#ef4444'
      },
      {
        label: 'Kék',
        count: 3,
        unit: 'db',
        color: '#2563eb'
      },
      {
        label: 'Zöld',
        count: 5,
        unit: 'db',
        color: '#22c55e'
      }
    ]
  },
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{3}{12}$', '$\\tfrac{1}{3}$', '$\\tfrac{3}{7}$'],
  answer: '$\\tfrac{1}{4}$',
  keywords: ['klasszikus valószínűség', 'kedvező-összes arány'],
  solution: `**Klasszikus valószínűség:**

Összes golyó: $4+3+5 = 12$. Kedvező eset: **3 kék**.

$$P(\\text{kék}) = \\dfrac{3}{12} = \\dfrac{1}{4}$$

Megjegyzés: $\\tfrac{3}{12}$ és $\\tfrac{1}{4}$ ugyanaz a szám, de **egyszerűsített alakban** $\\tfrac{1}{4}$ a szokásos válasz.

**A helyes válasz: $\\tfrac{1}{4}$.**`
};
