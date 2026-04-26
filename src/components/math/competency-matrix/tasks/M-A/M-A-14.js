export default {
  id: 'M-A-14',
  contentArea: 'M',
  contentSub: '1.1.3',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legnagyobb szám',
  difficulty: 4,
  scenario: 'A matek versenyen a **3, 5, 0, 7** számjegyek mindegyikét **pontosan egyszer** használva kell a **legnagyobb négyjegyű** számot felírni.',
  question: 'Mennyi ez a legnagyobb szám?',
  visual: {
    type: 'sequence',
    elements: ['3', '5', '0', '7']
  },
  options: ['7 530', '7 503', '7 350', '5 730'],
  answer: '7 530',
  keywords: ['helyi érték', 'rendezés'],
  solution: `**Legnagyobb szám szabálya:**

A legnagyobb számot úgy kapjuk, hogy a számjegyeket **csökkenő sorrendbe** rendezzük:

$$7, 5, 3, 0 \\;\\Longrightarrow\\; \\mathbf{7530}.$$

A 0 az egyeseknél van, így nem „pazaroljuk" magasabb helyre.`
};
