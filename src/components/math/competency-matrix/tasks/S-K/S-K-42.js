export default {
  id: 'S-K-42',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kis lottó — egy eltalálás',
  difficulty: 7,
  scenario: 'Az öttalálatos lottón az 1–90 közül **5 számot** sorsolnak. Egy szelvényen **5 szám** van.',
  question: 'Mennyi a valószínűsége, hogy **mind az 5** számot eltaláljuk?',
  options: ['$\\tfrac{1}{90}$', '$\\tfrac{1}{{90 \\choose 5}}$', '$\\tfrac{5}{90}$', '$\\tfrac{5}{{90 \\choose 5}}$'],
  answer: '$\\tfrac{1}{{90 \\choose 5}}$',
  keywords: ['valószínűség', 'kombinatorika', 'lottó'],
  solution: `Az összes lehetséges sorsolás száma $\\binom{90}{5}$; a kedvező pontosan 1.

$$P = \\dfrac{1}{\\binom{90}{5}}$$

**A helyes válasz: $\\tfrac{1}{{90 \\choose 5}}$.**`
};
