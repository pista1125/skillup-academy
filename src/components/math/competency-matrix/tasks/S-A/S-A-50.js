export default {
  id: 'S-A-50',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Osztálykirándulás — buszülésrend',
  difficulty: 5,
  scenario: 'Egy osztálykiránduláson a buszon **4 különböző** barát egy négyüléses sorban ül egymás mellett. Bármelyikük bármelyik helyre ülhet.',
  question: 'Hányféle **különböző sorrendben** ülhetnek a helyekre?',
  options: ['12', '16', '24', '48'],
  answer: '24',
  keywords: ['kombinatorika', 'permutáció'],
  solution: `**4 különböző ember permutációja:**

$$4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = \\mathbf{24}$$

**A helyes válasz: 24.**`
};
