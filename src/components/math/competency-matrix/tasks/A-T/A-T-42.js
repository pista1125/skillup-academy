export default {
  id: 'A-T-42',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Tetőcserép — sorok',
  difficulty: 2,
  scenario: 'Egy kisebb tetőfelületen a cserepeket sorokba rakják. A rajz **5 sort** mutat, soronként **12 cserép** van.',
  question: 'Hány cserép van összesen a tetőn?',
  visual: {
    type: 'tileRows',
    rows: 5,
    perRow: 12
  },
  options: ['17', '50', '55', '60'],
  answer: '60',
  keywords: ['szorzás', 'pakolás', 'téglalap'],
  solution: `Ez egy **sor × oszlop** elrendezés — így a darabszám egy szorzás.

$5 \\cdot 12 = \\mathbf{60}$ cserép.`
};
