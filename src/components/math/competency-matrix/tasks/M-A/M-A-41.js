export default {
  id: 'M-A-41',
  contentArea: 'M',
  contentSub: '1.4.1',
  thinkingLevel: 'A',
  thinkingSub: '2.3',
  title: 'Legnagyobb közös osztó — 24 és 36',
  difficulty: 5,
  scenario: '24 alma és 36 körte van. Egyforma zsákokba osztjuk úgy, hogy minden zsákba egyforma mennyiség jut, **csak egyfajta gyümölcs** egy zsákba.',
  question: 'Mekkora lehet **legnagyobb** zsákméret?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Alma',
        count: 24,
        unit: 'db',
        color: '#fca5a5'
      },
      {
        label: 'Körte',
        count: 36,
        unit: 'db',
        color: '#a7f3d0'
      }
    ]
  },
  options: ['6', '12', '24', '36'],
  answer: '12',
  keywords: ['legnagyobb közös osztó'],
  solution: 'lnko(24, 36) = **12**.'
};
