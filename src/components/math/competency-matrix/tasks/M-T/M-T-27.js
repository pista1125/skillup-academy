export default {
  id: 'M-T-27',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Kördiagram — zsebpénz felhasználása',
  difficulty: 2,
  scenario: 'Márk havi **zsebpénze 6000 Ft**, ezt az alábbi kördiagram szerint költötte el.',
  question: 'Mennyit költött **könyvre**, ha a könyvek részaránya **25%**?',
  visual: {
    type: 'pieChart',
    caption: 'Zsebpénz elosztása',
    slices: [
      { label: 'Édesség', value: 40 },
      { label: 'Könyv', value: 25 },
      { label: 'Mozi', value: 20 },
      { label: 'Megtakarítás', value: 15 }
    ]
  },
  options: ['1200 Ft', '1500 Ft', '1800 Ft', '2000 Ft'],
  answer: '1500 Ft',
  keywords: ['kördiagram', 'százalék', 'zsebpénz'],
  solution: '$6000 \\cdot \\tfrac{25}{100} = 1500$ Ft. **Válasz: 1500 Ft.**'
};
