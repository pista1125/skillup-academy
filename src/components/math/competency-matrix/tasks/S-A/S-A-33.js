export default {
  id: 'S-A-33',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Két kocka — összeg',
  difficulty: 5,
  scenario: 'Két szabályos dobókockával dobunk.',
  question: 'Mennyi a valószínűsége, hogy a dobott számok **összege 7**?',
  options: ['$\\tfrac{1}{6}$', '$\\tfrac{5}{36}$', '$\\tfrac{1}{9}$', '$\\tfrac{7}{36}$'],
  answer: '$\\tfrac{1}{6}$',
  keywords: ['valószínűség', 'kockapáros'],
  solution: `Összesen $6 \\cdot 6 = 36$ kimenet.

Kedvező párok (összeg 7): $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$ → **6**.

$$P = \\dfrac{6}{36} = \\dfrac{1}{6}$$

**A helyes válasz: $\\tfrac{1}{6}$.**`
};
