export default {
  id: 'S-K-37',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Bajnokság kiválasztás',
  difficulty: 7,
  scenario: 'Egy 10 fős csapatból **3 fős** indulócsapatot állítunk össze a **kezdő**, **cserejátékos** és **kapus** pozícióra.',
  question: 'Hányféleképpen állítható össze a csapat?',
  options: ['30', '120', '720', '1000'],
  answer: '720',
  keywords: ['variáció', 'sorrend'],
  solution: `Sorrendes kiválasztás (3 különböző szerep):

$$10 \\cdot 9 \\cdot 8 = \\mathbf{720}$$

**A helyes válasz: 720.**`
};
