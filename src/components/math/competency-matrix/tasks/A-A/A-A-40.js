export default {
  id: 'A-A-40',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Túra — 3 szakasz',
  difficulty: 5,
  scenario: 'A túrázó **(0;0)**-ból indul: 4 egység észak, 3 egység kelet, 2 egység dél.',
  question: 'Milyen irányba van a kiindulóponthoz képest a végpont?',
  visual: {
    type: 'compass',
    center: 'S',
    points: [
      {
        label: 'V',
        direction: 'NE'
      }
    ]
  },
  options: ['Északra', 'Északkeletre', 'Keletre', 'Délkeletre'],
  answer: 'Északkeletre',
  keywords: ['égtájak', 'útvonal'],
  solution: 'Végpont: $(3; 2)$. $x>0, y>0$ → **északkeletre**.'
};
