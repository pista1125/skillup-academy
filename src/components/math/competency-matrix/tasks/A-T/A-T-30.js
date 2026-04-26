export default {
  id: 'A-T-30',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Hajó fordulás',
  difficulty: 2,
  scenario: 'Egy hajó **délkeletre** tart. A kapitány **90°-ot balra** fordul.',
  question: 'Milyen irányba halad ezután a hajó?',
  visual: {
    type: 'compass',
    center: 'H',
    points: [
      { label: 'indul', direction: 'SE' }
    ]
  },
  options: ['Északkeletre', 'Északnyugatra', 'Délnyugatra', 'Keletre'],
  answer: 'Északkeletre',
  keywords: ['égtájak', 'fordulás', 'navigáció'],
  solution: `**90° balra** fordulás az iránytűn egy **negyed kör** az óramutatóval ellentétesen.

Délkelet (SE) $\\to$ 90° balra $\\to$ **Északkelet (NE)**.

A helyes válasz: **Északkeletre**.`
};
