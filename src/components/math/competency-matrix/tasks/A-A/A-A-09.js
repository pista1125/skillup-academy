export default {
  id: 'A-A-09',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Tetris-mintázat tükrözése',
  difficulty: 4,
  scenario: 'Egy Tetris-játékban egy **L-alakú darab** fele látható. Az alakzat **vízszintes tengelyre** tükrözött másik felét kell megtalálnod.',
  question: 'Melyik pont lesz a $(2; 3)$ pont **vízszintes tengelyre** való tükörképe?',
  visual: {
    type: 'symmetryHalf',
    axis: 'horizontal',
    halfPoints: [
      {
        x: 2,
        y: 3
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 2,
        y: 2
      }
    ]
  },
  options: ['(−2; 3)', '(2; −3)', '(−2; −3)', '(3; 2)'],
  answer: '(2; −3)',
  keywords: ['tükrözés', 'koordináta', 'Tetris'],
  solution: `**Vízszintes tengelyre tükrözéskor:**

- $x$ változatlan, $y$ előjele megváltozik.
- $(2; 3) \\to (\\mathbf{2;\\ -3})$.`
};
