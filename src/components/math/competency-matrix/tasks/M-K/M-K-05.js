export default {
  id: 'M-K-05',
  contentArea: 'M',
  contentSub: '1.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Medence feltöltése két csapból',
  difficulty: 6,
  scenario: 'Egy **12 m³**-es strandmedencét töltünk. Az **A csap** percenként **8 liter**, a **B csap** percenként **12 liter** vizet ad. Először csak az A csapot nyitjuk meg **30 percre**, majd **mindkettőt** egyszerre nyitva hagyjuk.',
  question: 'Összesen hány perc alatt telik meg a medence?',
  visual: {
    type: 'pool',
    volumeM3: 12,
    flowLmin: 20
  },
  answer: '618 perc',
  keywords: ['mértékegység-átváltás', 'műveletsor', 'idő'],
  solution: `**Lépésenként:**

1. **Teljes térfogat literben:** $12$ m³ $= 12\\,000$ liter.
2. **Az A csap 30 perc alatt:** $8 \\cdot 30 = 240$ liter.
3. **Még hátralévő:** $12\\,000 - 240 = 11\\,760$ liter.
4. **Két csap együtt:** $8 + 12 = 20$ L/perc. Szükséges idő: $11\\,760 \\div 20 = 588$ perc.
5. **Összesen:** $30 + 588 = \\mathbf{618}$ perc.`
};
