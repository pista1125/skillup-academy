export default {
  id: 'S-T-07',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'T',
  thinkingSub: '1.2',
  title: 'Érmefeldobás — biztos esemény',
  difficulty: 1,
  scenario: 'Egy szabályos érmét feldobunk. Két lehetséges kimenetele van: **fej** vagy **írás**.',
  question: 'Melyik állítás **IGAZ** az érmedobásra?',
  visual: {
    type: 'pictogram',
    items: [
      {
        label: 'Fej',
        count: 1,
        unit: 'oldal',
        color: '#f59e0b'
      },
      {
        label: 'Írás',
        count: 1,
        unit: 'oldal',
        color: '#6b7280'
      }
    ]
  },
  options: ['Biztos, hogy fej lesz.', 'Lehetetlen írást dobni.', 'Biztos, hogy fej vagy írás lesz.', 'Biztos, hogy a 6-os oldala jön ki.'],
  answer: 'Biztos, hogy fej vagy írás lesz.',
  keywords: ['biztos esemény', 'valószínűség'],
  solution: `**Események vizsgálata:**

Egy érmének **csak két** kimenetele van: fej vagy írás, így mindenképp egyik vagy másik jön ki → ez **biztos** esemény.

- „Biztos, hogy fej lesz" → **HAMIS**, csak *lehetséges*.
- „Lehetetlen írást dobni" → **HAMIS**, *lehetséges*.
- „6-os oldala jön ki" → **HAMIS**, érmének nincs 6-os oldala.

**A helyes válasz:** *Biztos, hogy fej vagy írás lesz.*`
};
