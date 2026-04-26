export default {
  id: 'A-K-24',
  contentArea: 'A',
  contentSub: '3.1.1',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Sokszög belső szögei — hatszög',
  difficulty: 6,
  scenario: 'Egy **szabályos hatszög** alakú csempe minden belső szöge egyenlő.',
  question: 'Mekkora egy **belső szöge**?',
  visual: {
    type: 'formula',
    text: 'Belső szögek összege: (n−2)·180°'
  },
  options: ['60°', '108°', '120°', '135°'],
  answer: '120°',
  keywords: ['szög', 'szabályos sokszög', 'hatszög'],
  solution: `**Képlet:** egy $n$-oldalú sokszög belső szögeinek összege $(n-2) \\cdot 180°$.

Hatszögre ($n=6$):

$(6-2) \\cdot 180° = 4 \\cdot 180° = 720°$.

Szabályos hatszögnél minden szög egyenlő: $\\dfrac{720°}{6} = \\mathbf{120°}$.`
};
