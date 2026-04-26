export default {
  id: 'H-T-08',
  contentArea: 'H',
  contentSub: '2.3.1',
  thinkingLevel: 'T',
  thinkingSub: '1.4',
  title: 'Négyzet kerülete',
  difficulty: 2,
  scenario: 'Egy négyzet kerületét a $K = 4 \\cdot a$ képlettel számoljuk, ahol $a$ az oldal hossza.',
  question: 'Mekkora a kerülete egy **7 cm** oldalú négyzetnek?',
  visual: {
    type: 'formula',
    formula: 'K = 4 · a',
    variables: [
      {
        name: 'a',
        desc: 'az oldal hossza (cm)'
      }
    ],
    example: {
      a: 7
    }
  },
  options: ['14 cm', '21 cm', '28 cm', '49 cm'],
  answer: '28 cm',
  keywords: ['képlet', 'behelyettesítés', 'kerület'],
  solution: `**Behelyettesítés:**

$K = 4 \\cdot a = 4 \\cdot 7 = \\mathbf{28}$ cm.`
};
