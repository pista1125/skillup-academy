export default {
  id: 'M-K-10',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kirándulás — 4 fő költsége',
  difficulty: 6,
  scenario: '4 fős csapat kirándul. Egy főre: busz 2800 Ft, vonat 3600 Ft, múzeum 1800 Ft, uzsonna 1200 Ft.',
  question: 'Mennyi a **teljes** és **egy főre eső** költség?',
  visual: {
    type: 'table',
    caption: 'Költségek',
    headers: ['Tétel', '1 fő', 'Összesen'],
    rows: [
      ['Busz', '2800 Ft', '11 200 Ft'],
      ['Vonat', '3600 Ft', '14 400 Ft'],
      ['Múzeum', '1800 Ft', '7200 Ft'],
      ['Uzsonna', '1200 Ft', '4800 Ft']
    ]
  },
  options: ['37 600 Ft, egy fő: 9400 Ft', '37 700 Ft, egy fő: 9500 Ft', '37 500 Ft, egy fő: 9300 Ft', '75 200 Ft, egy fő: 18 800 Ft'],
  answer: '37 600 Ft, egy fő: 9400 Ft',
  keywords: ['műveletsor', 'szöveges feladat'],
  solution: 'Összesen: **37 600 Ft**. Egy főre: $37600 / 4 = $ **9400 Ft**.'
};
