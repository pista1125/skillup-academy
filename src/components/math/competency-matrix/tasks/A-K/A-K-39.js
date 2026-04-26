export default {
  id: 'A-K-39',
  contentArea: 'A',
  contentSub: '3.1.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Medence csempézése — alj és oldalak',
  difficulty: 7,
  scenario: 'Egy téglatest medence **4 m × 3 m** aljú és **2 m** mély. Az **alját és oldalfalait** csempézzük **20 cm × 20 cm**-es lapokkal.',
  question: 'Hány csempe kell?',
  visual: {
    type: 'box3d',
    box: {
      l: 4,
      w: 3,
      h: 2
    },
    cubeEdge: 1,
    unit: 'm'
  },
  answer: '1000 csempe',
  keywords: ['felszín', 'burkolás'],
  solution: `**Felszín (alj + 4 oldalfal, felül nyitott):**

$A = 4 \\cdot 3 + 2(4 \\cdot 2) + 2(3 \\cdot 2) = 12 + 16 + 12 = 40$ m².

$40$ m² $= 400\\,000$ cm². Egy csempe $20 \\cdot 20 = 400$ cm².

$\\dfrac{400000}{400} = \\mathbf{1000}$ db.`
};
