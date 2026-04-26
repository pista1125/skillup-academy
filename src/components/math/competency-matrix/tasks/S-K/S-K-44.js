export default {
  id: 'S-K-44',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Könyv-film-zene — csak egyben',
  difficulty: 6,
  scenario: 'Egy diáknak az kérdezték, melyik kultúrális élményt élvezte. 80 fő közül: **Könyv 40**, **Film 50**, **Zene 35**; **K∩F = 20**, **K∩Z = 15**, **F∩Z = 18**, **mindhárom 8**.',
  question: 'Hányan **csak könyvet** szeretnek?',
  options: ['8', '13', '15', '20'],
  answer: '13',
  keywords: ['Venn', '3-halmaz'],
  solution: `**Csak könyv:** $|K| - |K \\cap F| - |K \\cap Z| + |K \\cap F \\cap Z|$

$= 40 - 20 - 15 + 8 = \\mathbf{13}$.

**A helyes válasz: 13.**`
};
