export default {
  id: 'A-A-35',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Csillagkép — koordináták',
  difficulty: 4,
  scenario: 'Egy csillagtérképen négy csillag látható: **A(1; 2)**, **B(4; 2)**, **C(4; 5)**, **D(1; 5)**. Ezek a csillagok egy négyszöget alkotnak.',
  question: 'Mekkora a négyszög **területe**?',
  visual: {
    type: 'coordinateGrid',
    xMin: 0,
    xMax: 6,
    yMin: 0,
    yMax: 6,
    points: [
      { label: 'A', x: 1, y: 2 },
      { label: 'B', x: 4, y: 2 },
      { label: 'C', x: 4, y: 5 },
      { label: 'D', x: 1, y: 5 }
    ]
  },
  options: ['6', '9', '12', '15'],
  answer: '9',
  keywords: ['koordináta', 'terület', 'téglalap'],
  solution: `A négy pont egy tengelyekkel párhuzamos **téglalapot** alkot.

- AB vízszintes oldal: $|4 - 1| = 3$ egység.
- AD függőleges oldal: $|5 - 2| = 3$ egység.

Ez valójában egy **négyzet** $3 \\times 3$-as. Területe: $3 \\cdot 3 = \\mathbf{9}$ egység².`
};
