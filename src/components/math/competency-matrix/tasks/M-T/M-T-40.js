export default {
  id: 'M-T-40',
  contentArea: 'M',
  contentSub: '1.3.4',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Évszámok — évforduló',
  difficulty: 2,
  scenario: 'Egy könyvtárat **1958**-ban alapítottak, a jubileumi rendezvényt **2023**-ban tartották.',
  question: 'Hány **éves** volt ekkor a könyvtár?',
  visual: {
    type: 'timelineYears',
    start: 1958,
    end: 2023,
    label: 'Könyvtár működése'
  },
  options: ['55', '60', '65', '70'],
  answer: '65',
  keywords: ['kivonás', 'évszám'],
  solution: '$2023 - 1958 = \\mathbf{65}$ év.'
};
