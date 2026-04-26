export default {
  id: 'S-K-20',
  contentArea: 'S',
  contentSub: '4.7',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Városháló — utak száma',
  difficulty: 6,
  scenario: 'Egy városban **A**-ból **B**-be csak **jobbra vagy felfelé** lehet haladni egy $3 \\times 2$-es rácson (3 jobb + 2 fel lépés).',
  question: 'Hányféle rövid út van **A**-ból **B**-be?',
  options: ['5', '6', '10', '15'],
  answer: '10',
  keywords: ['rács-utak', 'kombinatorika'],
  solution: `Összes lépés: **5** (3 jobb + 2 fel). Kiválasztjuk, melyek a „felfelé" lépések:

$\${5 \\choose 2} = \\dfrac{5 \\cdot 4}{2} = \\mathbf{10}$$

**A helyes válasz: 10.**`
};
