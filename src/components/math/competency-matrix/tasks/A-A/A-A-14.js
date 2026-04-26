export default {
  id: 'A-A-14',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kerékpáros útvonal',
  difficulty: 4,
  scenario: 'Kerékpárosunk a **(0; 0)** pontból indul: **4 egységet** keletre, majd **3 egységet** északra megy.',
  question: 'Hány rácsegységet tett meg **összesen**?',
  visual: {
    type: 'coordinateGrid',
    xMin: -1,
    xMax: 5,
    yMin: -1,
    yMax: 5,
    points: [
      {
        label: 'S',
        x: 0,
        y: 0
      },
      {
        label: 'F',
        x: 4,
        y: 0
      },
      {
        label: 'C',
        x: 4,
        y: 3
      }
    ]
  },
  options: ['5', '6', '7', '12'],
  answer: '7',
  keywords: ['útvonal', 'koordináta'],
  solution: 'Összesen: $4 + 3 = \\mathbf{7}$ rácsegység.'
};
