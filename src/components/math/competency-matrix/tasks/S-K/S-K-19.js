export default {
  id: 'S-K-19',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Két kártya — összeg páros',
  difficulty: 6,
  scenario: 'Egy dobozban 1-től 5-ig sorszámozott kártya van, egy-egy. **Két kártyát húzunk** visszatevés nélkül, és összeadjuk a számokat.',
  question: 'Mennyi a valószínűsége, hogy az **összeg páros**?',
  options: ['$\\tfrac{1}{5}$', '$\\tfrac{2}{5}$', '$\\tfrac{1}{2}$', '$\\tfrac{3}{5}$'],
  answer: '$\\tfrac{2}{5}$',
  keywords: ['valószínűség', 'kombinatorika'],
  solution: `Összes húzás: \${5 \\choose 2} = 10$ pár.

Az összeg páros, ha **mindkettő páros** (2 páros van: 2, 4) vagy **mindkettő páratlan** (3 páratlan: 1, 3, 5).

- Páros-páros: \${2 \\choose 2} = 1$
- Páratlan-páratlan: \${3 \\choose 2} = 3$

Összesen kedvező: $1 + 3 = 4$.

$$P = \\dfrac{4}{10} = \\dfrac{2}{5}$$

**A helyes válasz: $\\tfrac{2}{5}$.**`
};
