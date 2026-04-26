export default {
  id: 'S-A-32',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Sakkversenyen páros játék',
  difficulty: 5,
  scenario: 'Egy sakkversenyen **5 versenyző** van. Mindegyik játszik **mindenkivel pontosan egyszer**.',
  question: 'Hány mérkőzés lesz összesen?',
  options: ['5', '10', '15', '20'],
  answer: '10',
  keywords: ['kombinatorika', 'párok'],
  solution: `**Párok száma:** \${5 \\choose 2} = \\dfrac{5 \\cdot 4}{2} = \\mathbf{10}$.

**A helyes válasz: 10.**`
};
