export default {
  id: 'S-K-09',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Igaz állítások a szavazásról',
  difficulty: 7,
  scenario: 'A 6. évfolyam **60 tanulója** szavazott arról, milyen legyen az osztálybuli tematikája. Az eredményeket kördiagram mutatja. Vizsgáld meg az állításokat!',
  question: 'Melyik állítás **IGAZ** a diagram alapján?',
  visual: {
    type: 'pieChart',
    slices: [
      {
        label: 'Halloween (40%)',
        value: 40,
        color: '#f97316'
      },
      {
        label: 'Disco (30%)',
        value: 30,
        color: '#ec4899'
      },
      {
        label: 'Retro (20%)',
        value: 20,
        color: '#8b5cf6'
      },
      {
        label: 'Sport (10%)',
        value: 10,
        color: '#22c55e'
      }
    ]
  },
  options: ['A Halloweent a tanulók több mint fele választotta.', 'A Sportra 10 tanuló szavazott.', 'A Disco és a Retro együtt több szavazatot kapott, mint a Halloween.', 'A Retro és a Sport együtt a tanulók felét tette ki.'],
  answer: 'A Disco és a Retro együtt több szavazatot kapott, mint a Halloween.',
  keywords: ['logika', 'kördiagram', 'százalékszámítás', 'igaz-hamis'],
  solution: `**Százalékok tanulószámra váltása (60 fő):**

- Halloween: $60 \\cdot 0{,}40 = 24$ fő
- Disco: $60 \\cdot 0{,}30 = 18$ fő
- Retro: $60 \\cdot 0{,}20 = 12$ fő
- Sport: $60 \\cdot 0{,}10 = 6$ fő

**Állítások vizsgálata:**

1. *Halloween > a tanulók fele?* → $24 > 30$? **HAMIS** (24 < 30).
2. *Sport = 10 fő?* → $60 \\cdot 10\\% = 6$, nem 10. **HAMIS.**
3. *Disco + Retro > Halloween?* → $18 + 12 = 30$, Halloween = $24$. $30 > 24$ ✓ **IGAZ.**
4. *Retro + Sport = fele?* → $12 + 6 = 18$, fele = $30$. $18 \\neq 30$. **HAMIS.**

**A helyes válasz: „A Disco és a Retro együtt több szavazatot kapott, mint a Halloween."**`
};
