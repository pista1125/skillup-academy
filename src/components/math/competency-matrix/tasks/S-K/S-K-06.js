export default {
  id: 'S-K-06',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Menü összeállítása',
  difficulty: 6,
  scenario: 'Az étteremben **3 leves**, **4 főétel** és **2 desszert** közül lehet választani. Egy **teljes menü** mindhárom fogást tartalmaz.',
  question: 'Hányféle **különböző** teljes menüt lehet összeállítani?',
  visual: {
    type: 'treeDiagram',
    root: 'Menü',
    levels: [
      {
        label: 'Leves',
        branches: ['húsleves', 'paradicsom', 'gulyás']
      },
      {
        label: 'Főétel',
        branches: ['rántott hús', 'pörkölt', 'hal', 'tészta']
      },
      {
        label: 'Desszert',
        branches: ['palacsinta', 'fagylalt']
      }
    ]
  },
  options: ['9', '14', '18', '24'],
  answer: '24',
  keywords: ['szorzási elv', 'kombinatorika', 'háromszintű fa'],
  solution: `**Három egymás utáni választás — szorzási szabály:**

$$3 \\cdot 4 \\cdot 2 = \\mathbf{24}$$

A fa **3 ágra**, majd minden ág **4-4 ágra**, végül minden ág **2-2 ágra** bomlik, összesen $3 \\cdot 4 \\cdot 2 = 24$ levél.

**A helyes válasz: 24 menü.**`
};
