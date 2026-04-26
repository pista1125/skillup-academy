export default {
  id: 'S-T-33',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kerti növények magassága',
  difficulty: 2,
  scenario: 'Réka naponta mérte kedvenc növényeinek a magasságát centiméterben.',
  question: 'Melyik növény **kétszer olyan magas**, mint a tulipán?',
  visual: {
    type: 'frequencyTable',
    caption: 'Növények magassága',
    headers: ['Növény', 'Magasság (cm)'],
    rows: [
      ['Tulipán', 15],
      ['Rózsa', 45],
      ['Muskátli', 20],
      ['Napraforgó', 30],
      ['Liliom', 25]
    ]
  },
  options: ['Rózsa', 'Muskátli', 'Napraforgó', 'Liliom'],
  answer: 'Napraforgó',
  keywords: ['táblázat', 'összehasonlítás', 'kétszeres'],
  solution: `A tulipán magassága **15 cm**, ennek kétszerese $2 \\cdot 15 = \\mathbf{30}$ cm.

A táblázat szerint ez a **Napraforgó** (30 cm).

**A helyes válasz: Napraforgó.**`
};
