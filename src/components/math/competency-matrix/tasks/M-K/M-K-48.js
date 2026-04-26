export default {
  id: 'M-K-48',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Valószínűség — golyók a zsákban',
  difficulty: 6,
  scenario: 'Egy zsákban **5 piros**, **3 kék** és **2 zöld** golyó van. Véletlenszerűen kihúzunk **egyet**.',
  question: 'Mekkora a **piros vagy kék** golyó húzásának valószínűsége?',
  visual: {
    type: 'pictogram',
    caption: 'Golyók a zsákban',
    items: [
      { label: 'Piros', count: 5, color: '#ef4444' },
      { label: 'Kék', count: 3, color: '#2563eb' },
      { label: 'Zöld', count: 2, color: '#16a34a' }
    ]
  },
  options: ['0,5', '0,7', '0,8', '1,0'],
  answer: '0,8',
  keywords: ['valószínűség'],
  solution: `Kedvező: $5 + 3 = 8$. Összes: $10$.

$P = 8/10 = \\mathbf{0{,}8}$.`
};
