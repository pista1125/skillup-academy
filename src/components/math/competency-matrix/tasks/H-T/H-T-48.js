export default {
  id: 'H-T-48',
  contentArea: 'H',
  contentSub: '2.4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Sportrajt — számlálás',
  difficulty: 2,
  scenario: 'A 400 m-es futópálya minden 50 m-énél jelzőtábla van, a rajttól indulva.',
  question: 'Hány jelzőtábla van a **3. jelzőtől kezdve** a célvonalig (a célt nem számítva)?',
  visual: {
    type: 'numberLine',
    min: 0,
    max: 400,
    step: 50,
    markers: [
      { value: 150, label: '3.' },
      { value: 400, label: 'cél' }
    ]
  },
  options: ['4', '5', '6', '7'],
  answer: '5',
  keywords: ['számegyenes', 'számlálás'],
  solution: 'A 3-tól a 7-ig (150, 200, 250, 300, 350 m) = **5** jelzőtábla.'
};
