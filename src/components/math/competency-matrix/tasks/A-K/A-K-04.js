export default {
  id: 'A-K-04',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'L-alakú kertterv',
  difficulty: 5,
  scenario: 'Egy kertet **L-alakban** tervezünk. A külső befoglaló téglalap **14 m × 9 m**, de az egyik sarokból egy **5 m × 4 m**-es részt lecsípünk (ott szerszámos ház áll).',
  question: 'Mekkora a kert **területe** és **kerülete**?',
  visual: {
    type: 'polygonL',
    outer: {
      w: 14,
      h: 9
    },
    cut: {
      w: 5,
      h: 4
    },
    unit: 'm'
  },
  answer: 'T = 106 m², K = 46 m',
  keywords: ['terület', 'kerület', 'L-alak', 'kertterv'],
  solution: `**Lépések — terület:**

1. Nagy téglalap: $14 \\cdot 9 = 126$ m².
2. Kivágott rész: $5 \\cdot 4 = 20$ m².
3. $T = 126 - 20 = \\mathbf{106}$ m².

**Lépések — kerület:**

Az L-alak kerülete megegyezik a nagy téglalap kerületével, mert a "lecsípés" két ugyanolyan hosszúságú darabot visszad.

$K = 2 \\cdot (14 + 9) = \\mathbf{46}$ m.`
};
