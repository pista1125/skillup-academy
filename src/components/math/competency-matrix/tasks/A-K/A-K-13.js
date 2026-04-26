export default {
  id: 'A-K-13',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Szimmetriatengelyek összetett alakzatnál',
  difficulty: 6,
  scenario: 'Egy alakzat **négyzet**, amelynek minden oldalára **szabályos háromszöget** ragasztunk kívülre (csillag-forma).',
  question: 'Hány **szimmetriatengelye** van ennek az alakzatnak?',
  visual: {
    type: 'formula',
    text: 'négyzet + 4 szabályos háromszög (kifelé)'
  },
  options: ['2', '4', '8', '12'],
  answer: '4',
  keywords: ['szimmetria', 'összetett alakzat'],
  solution: 'A négyzetnek **4** szimmetriatengelye van (2 oldalfelező + 2 átló). A szimmetriát a kifelé ragasztott egybevágó háromszögek **megőrzik**, ezért az összetett alakzatnak is **4** tengelye marad.'
};
