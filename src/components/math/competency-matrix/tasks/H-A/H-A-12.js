export default {
  id: 'H-A-12',
  contentArea: 'H',
  contentSub: '2.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.1',
  title: 'Zsebpénz növekedése',
  difficulty: 4,
  scenario: 'Anna zsebpénze az elmúlt hónapokban egyenletesen nőtt. A diagram alapján fel kell ismerni a szabályt.',
  question: 'Ha a növekedés folytatódik, **mennyi** lesz a zsebpénze **júniusban**?',
  visual: {
    type: 'barChart',
    xLabel: 'Hónap',
    yLabel: 'Zsebpénz (Ft)',
    yMax: 7000,
    bars: [
      {
        label: 'Jan',
        value: 2000
      },
      {
        label: 'Feb',
        value: 2800
      },
      {
        label: 'Már',
        value: 3600
      },
      {
        label: 'Ápr',
        value: 4400
      },
      {
        label: 'Máj',
        value: 5200
      }
    ],
    color: '#10b981'
  },
  options: ['5 800 Ft', '6 000 Ft', '6 200 Ft', '6 400 Ft'],
  answer: '6 000 Ft',
  keywords: ['ábrázolás', 'számtani sorozat', 'folytatás'],
  solution: `**Szabály felismerése:**

Minden hónapban $+800$ Ft a növekedés.

Május: 5 200 Ft. Június: $5\\,200 + 800 = \\mathbf{6\\,000}$ Ft.`
};
