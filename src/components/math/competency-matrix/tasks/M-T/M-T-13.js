export default {
  id: 'M-T-13',
  contentArea: 'M',
  contentSub: '1.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Intervallumba eső szám',
  difficulty: 2,
  scenario: 'A számegyenesen bejelöltük a **2 és 5 közötti zárt intervallumot**.',
  question: 'Melyik szám esik a bejelölt **$[2;\\,5]$** intervallumba?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 8,
    divisions: 8,
    points: [
      {
        x: 2,
        label: 'bal'
      },
      {
        x: 5,
        label: 'jobb'
      },
      {
        x: 3.5,
        label: '?'
      }
    ]
  },
  options: ['1,5', '3,5', '5,5', '6,0'],
  answer: '3,5',
  keywords: ['intervallum', 'számegyenes'],
  solution: `**Intervallum-ellenőrzés:**

A $[2;\\,5]$ zárt intervallum azt jelenti, hogy $2 \\le x \\le 5$.

- $1{,}5 < 2$ → nem benne.
- $3{,}5$ → $2 \\le 3{,}5 \\le 5$ ✓
- $5{,}5 > 5$ → nem benne.
- $6{,}0 > 5$ → nem benne.

**A helyes válasz: 3,5.**`
};
