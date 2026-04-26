export default {
  id: 'M-A-12',
  contentArea: 'M',
  contentSub: '1.4.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Könyvtári polc',
  difficulty: 4,
  scenario: 'A könyvtárosnak **85 könyvet** kell elrendeznie. Minden polcra **pontosan 12** könyv fér.',
  question: 'Hány polcot tölt meg teljesen, és hány könyv marad a következő, nem teljes polcon?',
  visual: {
    type: 'tileRows',
    rows: [
      {
        label: '1. polc',
        count: 12
      },
      {
        label: '2. polc',
        count: 12
      },
      {
        label: '...',
        count: 12
      },
      {
        label: 'utolsó',
        count: 1
      }
    ]
  },
  options: ['6 teljes polc, 13 marad', '7 teljes polc, 1 marad', '7 teljes polc, 11 marad', '8 teljes polc, 0 marad'],
  answer: '7 teljes polc, 1 marad',
  keywords: ['osztás maradékkal', 'oszthatóság'],
  solution: `**Osztás maradékkal:**

$$85 \\div 12 = 7\\ \\text{(teljes polc)}, \\text{maradék}\\ 85 - 7 \\cdot 12 = 85 - 84 = 1.$$

Tehát **7 teljes** polc és **1 könyv** marad a 8. polcra.`
};
