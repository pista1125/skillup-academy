export default {
  id: 'S-K-27',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Feltételek és halmazok',
  difficulty: 7,
  scenario: 'A táblázat 4 diák adatait mutatja. A „nyertes" feltételei: **(átlag ≥ 4) ÉS (versenyen 1. vagy 2. helyezést ért el)**.',
  question: 'Ki teljesíti a feltételeket?',
  visual: {
    type: 'frequencyTable',
    caption: 'Tanulói adatok',
    headers: ['Név', 'Átlag', 'Helyezés'],
    rows: [
      ['Anna', '4,5', '3.'],
      ['Béla', '3,8', '1.'],
      ['Cili', '4,2', '2.'],
      ['Dani', '4,0', '5.']
    ]
  },
  options: ['Anna', 'Béla', 'Cili', 'Dani'],
  answer: 'Cili',
  keywords: ['logika', 'ÉS', 'feltétel'],
  solution: `**Mindkét feltétel:**

- **Anna:** átlag 4,5 ≥ 4 ✓, de 3. → ✗
- **Béla:** átlag 3,8 < 4 → ✗
- **Cili:** átlag 4,2 ≥ 4 ✓, 2. hely ✓ → **teljesíti**
- **Dani:** 5. hely → ✗

**A helyes válasz: Cili.**`
};
