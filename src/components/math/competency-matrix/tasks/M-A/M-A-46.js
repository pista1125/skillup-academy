export default {
  id: 'M-A-46',
  contentArea: 'M',
  contentSub: '1.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Százalékos növekedés — olvasók száma',
  difficulty: 4,
  scenario: 'Egy könyvtár olvasóinak száma **egy év alatt 240-ről 312-re** nőtt.',
  question: 'Hány **százalékkal** növekedett?',
  visual: {
    type: 'barChart',
    caption: 'Olvasók száma',
    categories: ['Tavaly', 'Idén'],
    values: [240, 312],
    yLabel: 'fő'
  },
  options: ['24%', '30%', '32%', '40%'],
  answer: '30%',
  keywords: ['százalék', 'növekedés', 'könyvtár'],
  solution: `Növekedés: $312 - 240 = 72$.

Arány: $72/240 = 0{,}30 = \\mathbf{30\\%}$.`
};
