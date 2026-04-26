export default {
  id: 'H-K-01',
  contentArea: 'H',
  contentSub: '2.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Pontdiagram értelmezése',
  difficulty: 7,
  scenario: 'Egy kutatásban megmérték 10 tanuló **heti edzésidejét (óra)** és a **100 m-es futóeredményét (mp)**.',
  question: 'Mit mondhatunk az edzésidő és a futóidő kapcsolatáról?',
  visual: {
    type: 'scatterPlot',
    xLabel: 'Heti edzés (óra)',
    yLabel: '100 m idő (mp)',
    xMin: 0,
    xMax: 10,
    yMin: 12,
    yMax: 18,
    points: [
      {
        x: 1,
        y: 17.5
      },
      {
        x: 2,
        y: 16.8
      },
      {
        x: 2,
        y: 17.1
      },
      {
        x: 3,
        y: 15.8
      },
      {
        x: 4,
        y: 15.2
      },
      {
        x: 5,
        y: 14.9
      },
      {
        x: 6,
        y: 14.2
      },
      {
        x: 7,
        y: 13.8
      },
      {
        x: 8,
        y: 13.5
      },
      {
        x: 9,
        y: 13
      }
    ]
  },
  options: ['Több edzés → gyorsabb (rövidebb) futóidő', 'Több edzés → lassabb (hosszabb) futóidő', 'Nincs kapcsolat az edzés és a futóidő között', 'Csak a lassabb futók edzenek sokat'],
  answer: 'Több edzés → gyorsabb (rövidebb) futóidő',
  keywords: ['pontdiagram', 'összefüggés', 'változók kapcsolata'],
  solution: `**Trend leolvasása a pontdiagramról:**

- Kevés edzés (1-2 óra): **~17 mp** körüli idők.
- Sok edzés (8-9 óra): **~13 mp** körüli idők.

A pontok **csökkenő trendet** mutatnak: ha $x$ (edzés) nő, $y$ (idő) csökken → **fordított (negatív) kapcsolat**.

**A helyes válasz:** Több edzés → gyorsabb (rövidebb) futóidő.`
};
