export default {
  id: 'S-A-44',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kéthúzásos kockadobás — összeg páros',
  difficulty: 5,
  scenario: 'Szabályos dobókockával **kétszer** dobunk, és összeadjuk a két dobott számot.',
  question: 'Mennyi a valószínűsége, hogy az **összeg páros**?',
  options: ['$\\tfrac{1}{4}$', '$\\tfrac{1}{3}$', '$\\tfrac{1}{2}$', '$\\tfrac{2}{3}$'],
  answer: '$\\tfrac{1}{2}$',
  keywords: ['valószínűség', 'két kocka', 'páros összeg'],
  solution: `**Összes kimenet:** $6 \\cdot 6 = 36$.

Az összeg páros, ha **mindkettő páros** vagy **mindkettő páratlan**.

- Mindkettő páros: $3 \\cdot 3 = 9$.
- Mindkettő páratlan: $3 \\cdot 3 = 9$.

**Kedvező összesen:** $9 + 9 = 18$.

$$P = \\dfrac{18}{36} = \\dfrac{1}{2}$$

**A helyes válasz: $\\tfrac{1}{2}$.**`
};
