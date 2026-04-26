export default {
  id: 'M-K-26',
  contentArea: 'M',
  contentSub: '1.2.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Keverékfeladat — ezüst ötvözet',
  difficulty: 6,
  scenario: 'Egy ötvöző **80 g ezüstöt** szeretne készíteni **925‰-es** tisztaságú ezüstből. Rendelkezésre áll **999‰-es tiszta ezüst** és **700‰-es réz-ezüst keverék**.',
  question: 'Hány **gramm 999‰-es** ezüstöt kell használni?',
  visual: {
    type: 'formula',
    formula: '999x + 700(80-x) = 925 · 80',
    variables: [{ name: 'x', desc: 'tiszta ezüst (g)' }]
  },
  options: ['40 g', '52 g', '60 g', '75 g'],
  answer: '60 g',
  keywords: ['keverés', 'egyenlet', 'arány'],
  solution: `$999x + 700(80-x) = 925 \\cdot 80 = 74\\,000$.

$999x + 56\\,000 - 700x = 74\\,000$

$299x = 18\\,000 \\Rightarrow x \\approx 60{,}2$ g → **kb. 60 g**.`
};
