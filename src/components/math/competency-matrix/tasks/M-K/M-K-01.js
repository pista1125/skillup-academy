export default {
  id: 'M-K-01',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Családi kirándulás',
  difficulty: 6,
  scenario: 'Egy 4 fős család kirándulni megy. A kirándulás költségei:',
  question: 'Mennyit költött a család összesen? Mennyibe került egy főre a kirándulás?',
  visual: {
    type: 'table',
    caption: 'Kirándulás költségei',
    headers: ['Tétel', 'Egység', 'Ár / db', 'Összeg'],
    rows: [
      ['Vonatjegy oda-vissza (felnőtt)', '2 db', '4 200 Ft', '?'],
      ['Vonatjegy oda-vissza (gyerek)', '2 db', '2 100 Ft', '?'],
      ['Múzeumbelépő', '4 db', '1 500 Ft', '?'],
      ['Ebéd', '4 adag', '2 800 Ft', '?'],
      ['Fagyi', '4 db', '450 Ft', '?']
    ]
  },
  answer: {
    total: 32400,
    perPerson: 8100
  },
  keywords: ['műveletsor', 'szöveges feladat', 'osztás'],
  solution: `**Részösszegek:**

- Felnőtt vonat: $2 \\cdot 4200 = 8400$ Ft
- Gyerek vonat: $2 \\cdot 2100 = 4200$ Ft
- Múzeum: $4 \\cdot 1500 = 6000$ Ft
- Ebéd: $4 \\cdot 2800 = 11\\,200$ Ft
- Fagyi: $4 \\cdot 450 = 1800$ Ft

**Összesen:** $8400 + 4200 + 6000 + 11\\,200 + 1800 = \\mathbf{32\\,400}$ Ft

**Egy főre:** $32\\,400 \\div 4 = \\mathbf{8\\,100}$ Ft`
};
