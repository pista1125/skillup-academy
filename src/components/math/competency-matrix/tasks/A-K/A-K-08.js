export default {
  id: 'A-K-08',
  contentArea: 'A',
  contentSub: '3.2.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Lépcsős építmény térfogata',
  difficulty: 7,
  scenario: 'Egy gyerek **1 cm élű kockákból** lépcsős építményt rak. Az alsó sor $3 \\times 3 = 9$ kocka, a középső sor $2 \\times 2 = 4$ kocka, a legfelső sor $1 \\times 1 = 1$ kocka — mindegyik középre igazítva.',
  question: 'Mekkora az építmény **térfogata**, és hány kocka **látszik kívülről** (alja + oldal + teteje)?',
  visual: {
    type: 'bigCube',
    n: 3,
    highlight: 'steps'
  },
  answer: 'V = 14 cm³; minden (14) kocka kívülről látszik',
  keywords: ['térfogat', 'kockaépítmény', 'nézet'],
  solution: `**Térfogat:**

1. $V = 9 + 4 + 1 = \\mathbf{14}$ cm³.

**Látható kockák:**

2. Az építmény lépcsős, így **minden kocka érinti a külső felszínt** — egyik sincs teljesen beágyazva, mert az alsó-középső és középső-felső emelet nem fedi el őket oldalról.
3. Kívülről látható kockák száma: $\\mathbf{14}$ (azaz mind).`
};
