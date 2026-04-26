export default {
  id: 'M-K-33',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Érvelés — 3 egymás utáni szám',
  difficulty: 6,
  scenario: 'Három **egymást követő egész szám** összege **48**.',
  question: 'Mi a **legkisebb** ezek közül?',
  visual: {
    type: 'formula',
    formula: '(n-1) + n + (n+1) = 48',
    variables: [{ name: 'n', desc: 'középső szám' }]
  },
  options: ['14', '15', '16', '17'],
  answer: '15',
  keywords: ['egyenlet', 'érvelés'],
  solution: `$3n = 48 \\Rightarrow n = 16$.

Számok: $15, 16, 17$. A legkisebb: **15**.`
};
