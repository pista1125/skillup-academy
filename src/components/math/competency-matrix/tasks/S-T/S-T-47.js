export default {
  id: 'S-T-47',
  contentArea: 'S',
  contentSub: '4.1',
  thinkingLevel: 'T',
  thinkingSub: '1.6',
  title: 'Kedvenc sorozatok',
  difficulty: 2,
  scenario: 'Az iskolai klub 40 tagja a kedvenc sorozatukra szavazott. A kördiagram az eredményt mutatja.',
  question: 'Mennyien szavaztak **Gyűrűk Urára**, ha az 25%-ot kapott?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Gyűrűk Ura (25%)',
        value: 25,
        color: '#a16207'
      },
      {
        label: 'Harry Potter (40%)',
        value: 40,
        color: '#b91c1c'
      },
      {
        label: 'Star Wars (20%)',
        value: 20,
        color: '#1e3a8a'
      },
      {
        label: 'Egyéb (15%)',
        value: 15,
        color: '#64748b'
      }
    ]
  },
  options: ['8', '10', '15', '25'],
  answer: '10',
  keywords: ['kördiagram', 'százalék'],
  solution: `$40 \\cdot 25\\% = 40 \\cdot 0{,}25 = \\mathbf{10}$ fő.

**A helyes válasz: 10.**`
};
