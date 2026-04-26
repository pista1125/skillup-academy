export default {
  id: 'M-K-41',
  contentArea: 'M',
  contentSub: '1.2.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Egyenlet — őszi gyűjtés',
  difficulty: 6,
  scenario: 'Az osztály **gesztenyét gyűjtött**. A fiúk összesen **3 kg-mal** többet, mint a lányok; együtt **21 kg-ot** gyűjtöttek.',
  question: 'Hány **kg gesztenyét** gyűjtöttek a **lányok**?',
  visual: {
    type: 'formula',
    formula: 'x + (x + 3) = 21',
    variables: [{ name: 'x', desc: 'lányok (kg)' }]
  },
  options: ['8 kg', '9 kg', '10 kg', '12 kg'],
  answer: '9 kg',
  keywords: ['egyenlet', 'szöveges'],
  solution: `$x + (x+3) = 21 \\Rightarrow 2x = 18 \\Rightarrow x = \\mathbf{9}$ kg a lányok.`
};
