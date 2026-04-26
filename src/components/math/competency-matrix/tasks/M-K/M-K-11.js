export default {
  id: 'M-K-11',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kirándulás — 3 fő költsége',
  difficulty: 6,
  scenario: '3 fős csapat kirándul. Egy főre: busz 1500 Ft, vonat 2200 Ft, múzeum 1000 Ft, uzsonna 890 Ft.',
  question: 'Mennyi a **teljes** és **egy főre eső** költség?',
  visual: {
    type: 'table',
    caption: 'Költségek',
    headers: ['Tétel', '1 fő', 'Összesen'],
    rows: [
      ['Busz', '1500 Ft', '4500 Ft'],
      ['Vonat', '2200 Ft', '6600 Ft'],
      ['Múzeum', '1000 Ft', '3000 Ft'],
      ['Uzsonna', '890 Ft', '2670 Ft']
    ]
  },
  options: ['16 770 Ft, egy fő: 5590 Ft', '16 870 Ft, egy fő: 5690 Ft', '16 670 Ft, egy fő: 5490 Ft', '33 540 Ft, egy fő: 11 180 Ft'],
  answer: '16 770 Ft, egy fő: 5590 Ft',
  keywords: ['műveletsor', 'szöveges feladat'],
  solution: 'Összesen: **16 770 Ft**. Egy főre: $16770 / 3 = $ **5590 Ft**.'
};
