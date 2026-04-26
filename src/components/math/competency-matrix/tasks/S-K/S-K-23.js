export default {
  id: 'S-K-23',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sütemény kombinációk',
  difficulty: 6,
  scenario: 'Egy cukrászdában **6 féle süti** közül **3-at** választunk. A sorrend nem számít, minden süti különböző.',
  question: 'Hányféle válogatás lehetséges?',
  options: ['15', '18', '20', '120'],
  answer: '20',
  keywords: ['kombinatorika', 'kiválasztás'],
  solution: `**Kombináció:**

$\${6 \\choose 3} = \\dfrac{6 \\cdot 5 \\cdot 4}{3 \\cdot 2 \\cdot 1} = \\dfrac{120}{6} = \\mathbf{20}$$

**A helyes válasz: 20.**`
};
