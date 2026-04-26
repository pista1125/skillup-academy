export default {
  id: 'M-T-05',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Menetidő',
  difficulty: 2,
  scenario: 'Egy vonat 8:45-kor indul Budapestről és 11:20-kor érkezik Debrecenbe.',
  question: 'Mennyi ideig tart az utazás?',
  visual: {
    type: 'clockPair',
    times: [
      {
        label: 'Indulás',
        h: 8,
        m: 45
      },
      {
        label: 'Érkezés',
        h: 11,
        m: 20
      }
    ]
  },
  options: ['2 óra 25 perc', '2 óra 35 perc', '2 óra 45 perc', '3 óra 25 perc'],
  answer: '2 óra 35 perc',
  keywords: ['idő', 'időtartam'],
  solution: `**Időtartam számítása:**

- 8:45-től 11:45-ig pontosan **3 óra** telne el.
- Ha 11:20-kor érkezünk, az **25 perccel korábban** van.
- Tehát: $3\\ \\text{óra} - 25\\ \\text{perc} = 2\\ \\text{óra}\\ 35\\ \\text{perc}$.

**A helyes válasz: 2 óra 35 perc.**`
};
