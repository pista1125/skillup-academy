export default {
  id: 'M-K-43',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Valószínűség — dobókocka',
  difficulty: 6,
  scenario: 'Két szabályos dobókockával dobunk egyszerre.',
  question: 'Mekkora a valószínűsége, hogy az összeg **pontosan 7**?',
  visual: {
    type: 'table',
    caption: 'Kedvező esetek (7 összeg)',
    headers: ['1. kocka', '2. kocka'],
    rows: [
      ['1', '6'], ['2', '5'], ['3', '4'], ['4', '3'], ['5', '2'], ['6', '1']
    ]
  },
  options: ['1/12', '1/6', '1/4', '1/2'],
  answer: '1/6',
  keywords: ['valószínűség', 'dobókocka'],
  solution: `Összes eset: $6 \\cdot 6 = 36$. Kedvező: 6 eset.

$P = 6/36 = \\mathbf{1/6}$.`
};
