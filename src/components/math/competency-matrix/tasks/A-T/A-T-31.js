export default {
  id: 'A-T-31',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Origami kihajtogatás',
  difficulty: 2,
  scenario: 'Egy négyzet alakú papírt függőlegesen félbehajtunk, majd a **bal fél** három pontjába lyukat lyukasztunk: $(1;1)$, $(2;3)$ és $(1;4)$.',
  question: 'Kihajtogatás után melyik pontban lesz biztosan lyuk a **jobb oldalon** is?',
  visual: {
    type: 'symmetryHalf',
    axis: 'y',
    halfPoints: [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 1, y: 4 }
    ]
  },
  options: ['(3; 1)', '(4; 3)', '(5; 1)', '(4; 4)'],
  answer: '(4; 3)',
  keywords: ['tükrözés', 'tengely', 'szimmetria'],
  solution: `A papírt a $y$-tengelyre tükröző **függőleges tengely** mentén hajtjuk be. A tengely az $x=3$-nál van (a négyzet közepén).

Tükrözés: $(x;y) \\to (6-x;\\, y)$.

- $(1;1) \\to (5;1)$
- $(2;3) \\to \\mathbf{(4;3)}$
- $(1;4) \\to (5;4)$

A felsorolt négy válaszból a **(4; 3)** az egyetlen valódi tükörkép.`
};
