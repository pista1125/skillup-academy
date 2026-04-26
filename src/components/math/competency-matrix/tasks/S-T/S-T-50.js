export default {
  id: 'S-T-50',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Éves átlaghőmérséklet',
  difficulty: 2,
  scenario: 'Egy város havi átlaghőmérsékletét vonaldiagram mutatja.',
  question: 'Melyik hónapban volt a **legmelegebb**?',
  visual: {
    type: 'lineChart',
    xLabel: 'Hónap',
    yLabel: '°C',
    yMin: -5,
    yMax: 30,
    points: [
      {
        x: 'Jan',
        y: -2
      },
      {
        x: 'Feb',
        y: 0
      },
      {
        x: 'Már',
        y: 6
      },
      {
        x: 'Ápr',
        y: 12
      },
      {
        x: 'Máj',
        y: 17
      },
      {
        x: 'Jún',
        y: 22
      },
      {
        x: 'Júl',
        y: 25
      },
      {
        x: 'Aug',
        y: 24
      },
      {
        x: 'Szept',
        y: 18
      },
      {
        x: 'Okt',
        y: 12
      },
      {
        x: 'Nov',
        y: 5
      },
      {
        x: 'Dec',
        y: 1
      }
    ]
  },
  options: ['Június', 'Július', 'Augusztus', 'Szeptember'],
  answer: 'Július',
  keywords: ['vonaldiagram', 'maximum'],
  solution: `**A legmagasabb érték 25 °C, ez a júliusé.**

**A helyes válasz: Július.**`
};
