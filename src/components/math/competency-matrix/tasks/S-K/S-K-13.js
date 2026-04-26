export default {
  id: 'S-K-13',
  contentArea: 'S',
  contentSub: '4.9',
  thinkingLevel: 'K',
  thinkingSub: '3.5',
  title: 'Logikai állítások — kombinált',
  difficulty: 6,
  scenario: `A 6.a osztály 25 tanulójáról tudjuk:

- **12** fiú, **13** lány.
- **15** tanuló zenél (összesen), **8** táncol.
- **4** tanuló **zenél ÉS táncol**.`,
  question: 'Melyik állítás biztosan **IGAZ**?',
  options: ['Mindegyik lány zenél.', 'A zenélők között van fiú és lány is.', 'Legalább 6 tanuló nem zenél és nem táncol.', 'A táncolók többsége fiú.'],
  answer: 'Legalább 6 tanuló nem zenél és nem táncol.',
  keywords: ['logika', 'halmaz', 'igaz-hamis'],
  solution: `**Zenél vagy táncol:** $15 + 8 - 4 = 19$.

**Egyiket sem:** $25 - 19 = \\mathbf{6}$ — ez pontosan 6, tehát „legalább 6" **IGAZ**.

A többi nem dönthető el a megadott adatokból, vagy közvetlen cáfolható.

**A helyes válasz: „Legalább 6 tanuló nem zenél és nem táncol."**`
};
