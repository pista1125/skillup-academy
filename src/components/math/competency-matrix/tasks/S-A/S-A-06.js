export default {
  id: 'S-A-06',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Dobókocka — páros szám valószínűsége',
  difficulty: 3,
  scenario: 'Egy **szabályos dobókockát** dobunk fel. A kockán az $1, 2, 3, 4, 5, 6$ számok szerepelnek.',
  question: 'Mennyi a valószínűsége, hogy **páros** számot dobunk?',
  visual: {
    type: 'frequencyTable',
    caption: 'Kockadobás lehetséges kimenetei',
    headers: ['Dobott szám', 'Páros-e?'],
    rows: [
      ['1', 'nem'],
      ['2', 'igen'],
      ['3', 'nem'],
      ['4', 'igen'],
      ['5', 'nem'],
      ['6', 'igen']
    ]
  },
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{2}$',
  keywords: ['klasszikus valószínűség', 'dobókocka'],
  solution: `**Klasszikus valószínűség:**

Kedvező esetek: $2, 4, 6$ → **3** darab. Összes eset: $6$.

$$P(\\text{páros}) = \\dfrac{3}{6} = \\dfrac{1}{2}$$

**A helyes válasz: $\\tfrac{1}{2}$.**`
};
