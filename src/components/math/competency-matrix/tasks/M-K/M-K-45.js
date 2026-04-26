export default {
  id: 'M-K-45',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Hányadosok ellenőrzése — bizonyítás',
  difficulty: 6,
  scenario: 'Három állítás hangzik el egy prezentáción: (I) **Minden 6-tal osztható szám osztható 3-mal.** (II) **Minden 3-mal osztható szám osztható 6-tal.** (III) **Ha egy szám osztható 2-vel és 3-mal, akkor osztható 6-tal.**',
  question: 'Melyik állítás **igaz**?',
  visual: {
    type: 'comparison',
    items: [
      { label: 'I', formula: '6|n ⇒ 3|n', result: '?' },
      { label: 'II', formula: '3|n ⇒ 6|n', result: '?' },
      { label: 'III', formula: '2|n ∧ 3|n ⇒ 6|n', result: '?' }
    ]
  },
  options: ['Csak I', 'I és III', 'II és III', 'Mind a három'],
  answer: 'I és III',
  keywords: ['érvelés', 'oszthatóság'],
  solution: `**I igaz:** $6|n \\Rightarrow n = 6k = 3(2k) \\Rightarrow 3|n$.

**II hamis:** ellenpélda $n=9$: $3|9$, de $6 \\nmid 9$.

**III igaz:** ha $2|n$ és $3|n$ és $\\gcd(2,3)=1$, akkor $6|n$.

Helyes: **I és III**.`
};
