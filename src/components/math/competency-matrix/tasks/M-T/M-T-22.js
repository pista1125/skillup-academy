export default {
  id: 'M-T-22',
  contentArea: 'M',
  contentSub: '1.1.4',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Oszlopdiagram — könyvtári kölcsönzések',
  difficulty: 2,
  scenario: 'Az iskolai könyvtárban egy hét alatt kölcsönzött könyvek darabszámát mutatja az oszlopdiagram.',
  question: 'Melyik napon kölcsönöztek **a legtöbb** könyvet?',
  visual: {
    type: 'barChart',
    caption: 'Heti kölcsönzések',
    categories: ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
    values: [12, 18, 9, 22, 15],
    yLabel: 'db'
  },
  options: ['Kedd', 'Szerda', 'Csütörtök', 'Péntek'],
  answer: 'Csütörtök',
  keywords: ['oszlopdiagram', 'leolvasás', 'könyvtár'],
  solution: 'A legmagasabb oszlop a **Csütörtök** (22 db). **Válasz: Csütörtök.**'
};
