export default {
  id: 'H-T-36',
  contentArea: 'H',
  contentSub: '2.1.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Sportesemény — ranglista',
  difficulty: 2,
  scenario: 'A táblázat egy úszóverseny 50 m-es hátúszás végeredményét mutatja.',
  question: 'Ki végzett a **2. helyen**?',
  visual: {
    type: 'table',
    caption: 'Végeredmény',
    headers: ['Hely', 'Név', 'Idő'],
    rows: [
      ['1.', 'Kovács P.', '29.84'],
      ['2.', 'Nagy L.', '30.12'],
      ['3.', 'Szabó R.', '30.47'],
      ['4.', 'Tóth M.', '31.05']
    ]
  },
  options: ['Kovács P.', 'Nagy L.', 'Szabó R.', 'Tóth M.'],
  answer: 'Nagy L.',
  keywords: ['táblázat', 'rangsor'],
  solution: 'A 2. helyen **Nagy L.** áll 30.12 idővel.'
};
