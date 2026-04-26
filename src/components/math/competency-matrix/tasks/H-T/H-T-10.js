export default {
  id: 'H-T-10',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Virágárus pultja',
  difficulty: 2,
  scenario: 'Egy virágárusnál az egyes virágokból a napi eladásokat piktogrammal ábrázolták. 1 szimbólum = 5 szál virág.',
  question: 'Hány szál **tulipán** fogyott?',
  visual: {
    type: 'pictogram',
    unit: 5,
    unitLabel: 'szál',
    rows: [
      {
        label: 'Rózsa',
        count: 6
      },
      {
        label: 'Tulipán',
        count: 8
      },
      {
        label: 'Szegfű',
        count: 4
      },
      {
        label: 'Liliom',
        count: 3
      }
    ]
  },
  options: ['30', '35', '40', '45'],
  answer: '40',
  keywords: ['piktogram', 'adatleolvasás'],
  solution: `**Számolás:**

A tulipán sorban **8** szimbólum szerepel, 1 szimbólum = 5 szál.

$8 \\cdot 5 = \\mathbf{40}$ szál.`
};
