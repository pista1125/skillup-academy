export default {
  id: 'S-T-04',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Biztos, lehetetlen, lehetséges',
  difficulty: 2,
  scenario: 'Egy zsákban **5 piros** és **3 kék** golyó van. Behunyt szemmel húzunk egyet.',
  question: 'Melyik állítás **IGAZ**?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Piros',
        count: 5,
        unit: 'db',
        color: '#ef4444'
      },
      {
        label: 'Kék',
        count: 3,
        unit: 'db',
        color: '#2563eb'
      }
    ]
  },
  options: ['Biztos, hogy piros golyót húzunk.', 'Lehetetlen kék golyót húzni.', 'Lehetséges, hogy piros vagy kék golyót húzunk.', 'Biztos, hogy zöld golyót húzunk.'],
  answer: 'Lehetséges, hogy piros vagy kék golyót húzunk.',
  keywords: ['biztos', 'lehetetlen', 'lehetséges', 'valószínűség'],
  solution: `**Események vizsgálata:**

- A zsákban van piros **és** kék is, így mindkettő húzása **lehetséges**, de egyik sem **biztos**.
- Zöld golyó nincs a zsákban → zöld húzása **lehetetlen**.

**A helyes válasz:** *Lehetséges, hogy piros vagy kék golyót húzunk.*`
};
