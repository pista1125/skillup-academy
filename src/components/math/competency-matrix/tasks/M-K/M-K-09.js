export default {
  id: 'M-K-09',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Vonat, átszállással',
  difficulty: 6,
  scenario: 'Emese **8:15**-kor indul egy vonattal, ami **2 óra 40 percig** halad. Az átszállóállomáson **35 percet** vár, majd egy másik vonaton **1 óra 50 percet** utazik tovább a célállomásig.',
  question: 'Hánykor érkezik meg a célállomásra?',
  visual: {
    type: 'timeline',
    events: [
      {
        t: '08:15',
        label: 'Indulás',
        color: '#2563eb'
      },
      {
        t: '10:55',
        label: 'Érkezés átszálláshoz',
        color: '#16a34a'
      },
      {
        t: '11:30',
        label: 'Második vonat indul',
        color: '#f59e0b'
      },
      {
        t: '13:20',
        label: 'Megérkezés',
        color: '#ef4444',
        highlight: true
      }
    ]
  },
  answer: '13:20',
  keywords: ['idő', 'műveletsor', 'időtartam'],
  solution: `**Lépésenkénti idő:**

1. $8{:}15 + 2\\ \\text{óra}\\ 40\\ \\text{perc} = 10{:}55$ (átszálló).
2. $10{:}55 + 35\\ \\text{perc} = 11{:}30$ (második vonat indul).
3. $11{:}30 + 1\\ \\text{óra}\\ 50\\ \\text{perc} = 13{:}20$ (cél).

**A helyes válasz: 13:20.**`
};
