export default {
  id: 'A-A-04',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Mintázat kiegészítése',
  difficulty: 4,
  scenario: 'Egy **négyzetrácson** látható egy alakzat fele. A **szaggatott vonal** a szimmetriatengely.',
  question: 'Hány rácspont szükséges az alakzat másik felének megrajzolásához, ha a félnek 5 csúcsa van?',
  visual: {
    type: 'symmetryHalf',
    axis: 'vertical',
    halfPoints: [
      {
        x: 2,
        y: 1
      },
      {
        x: 3,
        y: 2
      },
      {
        x: 4,
        y: 3
      },
      {
        x: 3,
        y: 4
      },
      {
        x: 2,
        y: 5
      }
    ]
  },
  options: ['3 pont', '4 pont', '5 pont', '10 pont'],
  answer: '5 pont',
  keywords: ['tengelyes tükrözés', 'szimmetria'],
  solution: `**Tengelyes tükrözés:**

Minden egyes csúcsnak van egy **tükörképe** a tengelyen túl, azonos $y$ koordinátával, a tengelytől ugyanolyan távolságra.

5 csúcs → **5 tükörpont**.

**A helyes válasz: 5 pont.**`
};
