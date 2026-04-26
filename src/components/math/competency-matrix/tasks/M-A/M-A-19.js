export default {
  id: 'M-A-19',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Fesztivál — sátor alapterülete',
  difficulty: 4,
  scenario: 'A fesztiválon egy **rendezvénysátort** állítanak fel. A sátor **12 m × 9 m** méretű. A talajra mozaikmintát raknak **3 m²**-es paneloknak.',
  question: 'Legkevesebb **hány panelre** van szükség a teljes lefedéshez?',
  visual: {
    type: 'rectangle',
    widthM: 12,
    heightM: 9,
    label: 'Sátor talaj',
    unit: 'm'
  },
  options: ['24', '30', '36', '40'],
  answer: '36',
  keywords: ['terület', 'osztás', 'fesztivál'],
  solution: 'Terület: $12 \\cdot 9 = 108$ m². Panel: $108 / 3 = \\mathbf{36}$ db.'
};
