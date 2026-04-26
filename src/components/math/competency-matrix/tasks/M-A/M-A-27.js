export default {
  id: 'M-A-27',
  contentArea: 'M',
  contentSub: '1.3.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'L-alakú udvar kerülete',
  difficulty: 4,
  scenario: 'Egy L-alakú iskolaudvar méretei az ábrán láthatók.',
  question: 'Mekkora a **kerülete**?',
  visual: {
    type: 'polygonL',
    outer: { w: 12, h: 8 },
    cut: { w: 5, h: 3 },
    unit: 'm',
    label: 'Iskolaudvar'
  },
  options: ['32 m', '36 m', '40 m', '44 m'],
  answer: '40 m',
  keywords: ['kerület', 'L-alak'],
  solution: 'L-alak kerülete = külső téglalap kerülete (a belevágás nem változtatja): $2(12+8) = \\mathbf{40}$ m.'
};
