export default {
  id: 'S-A-38',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kétbetűs „szavak"',
  difficulty: 3,
  scenario: 'Az $\\{A, B, C, D\\}$ betűkből **különböző** betűkkel kétbetűs szavakat képzünk.',
  question: 'Hány ilyen szó képezhető?',
  options: ['6', '8', '12', '16'],
  answer: '12',
  keywords: ['kombinatorika', 'variáció'],
  solution: `Az első betűre 4, a másodikra **3** (már nem ismétlődhet) lehetőség:

$$4 \\cdot 3 = \\mathbf{12}$$

**A helyes válasz: 12.**`
};
