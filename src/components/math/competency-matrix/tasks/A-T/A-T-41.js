export default {
  id: 'A-T-41',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Pont vízszintes tükörképe',
  difficulty: 2,
  scenario: 'A **P(3; 5)** pontot tükrözzük a **vízszintes** tengelyre.',
  question: 'Mi lesz a képpont koordinátája?',
  visual: {
    type: 'symmetryHalf',
    axis: 'horizontal',
    halfPoints: [
      {
        x: 3,
        y: 5
      }
    ]
  },
  options: ['(−3; 5)', '(3; −5)', '(−3; −5)', '(5; 3)'],
  answer: '(3; −5)',
  keywords: ['tengelyes tükrözés', 'koordináta'],
  solution: 'Vízszintes tengelyre: $x$ változatlan, $y \\to -y$. $(3;5) \\to (\\mathbf{3;-5})$.'
};
