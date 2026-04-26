export default {
  id: 'S-K-05',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két golyóhúzás — kombinált valószínűség',
  difficulty: 6,
  scenario: 'Egy dobozban **2 piros** és **3 zöld** golyó van. **Kettőt húzunk egymás után** visszatevés nélkül. Nézd meg a fadiagramot a lehetséges kimenetelekről!',
  question: 'Mennyi a valószínűsége, hogy **mindkét** golyó **piros**?',
  visual: {
    type: 'treeDiagram',
    root: '2 húzás',
    levels: [
      {
        label: '1. húzás',
        branches: ['piros', 'zöld']
      },
      {
        label: '2. húzás',
        branches: ['piros', 'zöld']
      }
    ]
  },
  options: ['$\\tfrac{1}{25}$', '$\\tfrac{1}{10}$', '$\\tfrac{2}{15}$', '$\\tfrac{4}{25}$'],
  answer: '$\\tfrac{1}{10}$',
  keywords: ['valószínűség', 'visszatevés nélkül', 'fadiagram'],
  solution: `**Visszatevés nélküli húzás:**

Első húzás piros: összesen 5 golyóból 2 piros.

$$P_1 = \\dfrac{2}{5}$$

Maradt 1 piros és 3 zöld, összesen 4 golyó. Második piros:

$$P_2 = \\dfrac{1}{4}$$

A két húzás együtt (szorzás, mert **ÉS**):

$$P(\\text{piros, piros}) = \\dfrac{2}{5} \\cdot \\dfrac{1}{4} = \\dfrac{2}{20} = \\dfrac{1}{10}$$

**A helyes válasz: $\\tfrac{1}{10}$.**`
};
