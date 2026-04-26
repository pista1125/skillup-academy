export default {
  id: 'A-A-19',
  contentArea: 'A',
  contentSub: '3.2.1',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Építőkockák — oldalnézet',
  difficulty: 4,
  scenario: 'Egy asztalon **5 egyforma kocka** áll: lent 3 kocka egymás mellett, rajtuk felül 2 kocka egymás mellett (a bal oldali két alsó kockán).',
  question: 'Hány kis négyzetet látunk **oldalnézetből** (elölről)?',
  visual: {
    type: 'comparison',
    shapes: [
      { label: 'elől', kind: '3 alsó + 2 felső lépcsős' }
    ]
  },
  options: ['3', '4', '5', '6'],
  answer: '5',
  keywords: ['nézet', 'térbeli'],
  solution: `Oldalnézetből minden kocka **egy** négyzetnek látszik, kivéve ha valamelyik teljesen takarja egy másikat.

Itt minden kocka különböző pozícióban van (lépcsős alakzat), ezért **mind az 5** kocka látszik oldalról: **5** négyzet.`
};
