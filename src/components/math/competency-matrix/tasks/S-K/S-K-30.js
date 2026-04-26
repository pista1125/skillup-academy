export default {
  id: 'S-K-30',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kvízverseny — csapatösszeállítás',
  difficulty: 6,
  scenario: 'Egy 12 fős szakkörből **4 fős** kvízcsapatot állítunk össze. A csapaton belül a sorrend **nem számít**.',
  question: 'Hányféle **különböző csapat** választható ki?',
  options: ['220', '330', '495', '792'],
  answer: '495',
  keywords: ['kombináció', 'binomiális'],
  solution: `**Kombináció (sorrend nem számít):**

$$\\binom{12}{4} = \\dfrac{12 \\cdot 11 \\cdot 10 \\cdot 9}{4 \\cdot 3 \\cdot 2 \\cdot 1} = \\dfrac{11880}{24} = \\mathbf{495}$$

**A helyes válasz: 495.**`
};
