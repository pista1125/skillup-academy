export default {
  id: 'M-A-42',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legnagyobb közös osztó — 18 és 30',
  difficulty: 5,
  scenario: '18 alma és 30 körte van. Egyforma zsákokba osztjuk úgy, hogy minden zsákba egyforma mennyiség jut, **csak egyfajta gyümölcs** egy zsákba.',
  question: 'Mekkora lehet **legnagyobb** zsákméret?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Alma',
        count: 18,
        unit: 'db',
        color: '#fca5a5'
      },
      {
        label: 'Körte',
        count: 30,
        unit: 'db',
        color: '#a7f3d0'
      }
    ]
  },
  options: ['3', '6', '12', '18'],
  answer: '6',
  keywords: ['legnagyobb közös osztó'],
  solution: 'lnko(18, 30) = **6**.'
};
