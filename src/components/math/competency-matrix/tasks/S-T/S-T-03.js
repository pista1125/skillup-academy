export default {
  id: 'S-T-03',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Időjárás — kördiagram',
  difficulty: 3,
  scenario: 'Egy hónap 30 napjának időjárását a kördiagram mutatja.',
  question: 'Hány **napos** nap volt a hónapban?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Napos (50%)',
        value: 50,
        color: '#facc15'
      },
      {
        label: 'Felhős (30%)',
        value: 30,
        color: '#9ca3af'
      },
      {
        label: 'Esős (20%)',
        value: 20,
        color: '#2563eb'
      }
    ]
  },
  options: ['10 nap', '12 nap', '15 nap', '20 nap'],
  answer: '15 nap',
  keywords: ['kördiagram', 'százalék', 'adatleolvasás'],
  solution: `**Százalékalap-számítás:**

A napos napok a hónap **50%-át** tették ki, és a hónap **30 napos**.

$$30 \\cdot \\tfrac{50}{100} = 15$$

**A helyes válasz: 15 nap.**`
};
