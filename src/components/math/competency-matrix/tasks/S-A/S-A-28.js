export default {
  id: 'S-A-28',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Kártyák sorrendje',
  difficulty: 4,
  scenario: 'Három különböző számkártyát ($1, 2, 3$) sorba rendezünk.',
  question: 'Hányféle sorrend lehetséges?',
  options: ['3', '6', '9', '12'],
  answer: '6',
  keywords: ['permutáció', 'sorrend'],
  solution: `$$3! = 3 \\cdot 2 \\cdot 1 = \\mathbf{6}$$

Sorrendek: 123, 132, 213, 231, 312, 321.

**A helyes válasz: 6.**`
};
