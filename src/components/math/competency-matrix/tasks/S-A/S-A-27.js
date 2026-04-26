export default {
  id: 'S-A-27',
  contentArea: 'S',
  contentSub: '4.6',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Jelszó — 3 számjegy',
  difficulty: 4,
  scenario: 'Egy lakatkombinációhoz 3 számjegyet kell beállítani, mindegyik 0–9 közötti. A számjegyek **ismétlődhetnek**.',
  question: 'Hányféle jelszó lehetséges?',
  options: ['30', '300', '720', '1000'],
  answer: '1000',
  keywords: ['szorzási elv', 'kombinatorika'],
  solution: `Minden hely 10 lehetőség:

$$10 \\cdot 10 \\cdot 10 = \\mathbf{1000}$$

**A helyes válasz: 1000.**`
};
