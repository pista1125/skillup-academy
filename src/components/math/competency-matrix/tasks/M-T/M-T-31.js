export default {
  id: 'M-T-31',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Csempesor — téglalap területe',
  difficulty: 2,
  scenario: 'Egy fürdőszoba padlójára **4 sorban**, soronként **6 db** négyzet alakú csempét raktak le.',
  question: 'Hány csempe fedi le a padlót?',
  visual: {
    type: 'tileRows',
    rows: 4,
    cols: 6,
    caption: 'Csempesor a padlón'
  },
  options: ['10', '20', '24', '26'],
  answer: '24',
  keywords: ['szorzás', 'téglalap'],
  solution: '$4 \\cdot 6 = \\mathbf{24}$ csempe.'
};
