export default {
  id: 'S-T-32',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Robotprogram — útvonalak',
  difficulty: 3,
  scenario: 'Egy robot az **R** pontból indulva csak a gráf élei mentén haladhat. Az **R → A**, **R → B** élek vezetnek ki, majd **A → C**, **B → C**, **B → D** folytatás létezik. Végállomás: **C** vagy **D**.',
  question: 'Hány **különböző útvonalon** érhet célba a robot?',
  visual: {
    type: 'treeDiagram',
    root: 'R',
    levels: [
      {
        label: '1. elágazás',
        branches: [
          { from: 'R', to: 'A' },
          { from: 'R', to: 'B' }
        ]
      },
      {
        label: '2. elágazás',
        branches: [
          { from: 'A', to: 'C' },
          { from: 'B', to: 'C' },
          { from: 'B', to: 'D' }
        ]
      }
    ]
  },
  options: ['2', '3', '4', '5'],
  answer: '3',
  keywords: ['gráf', 'útvonal', 'fadiagram'],
  solution: `Útvonalak felsorolva:

1. R → A → C
2. R → B → C
3. R → B → D

Összesen **3 útvonal**.

**A helyes válasz: 3.**`
};
