export default {
  id: 'S-K-11',
  contentArea: 'S',
  contentSub: '4.8',
  thinkingLevel: 'K',
  thinkingSub: '3.1',
  title: 'Három tantárgy kedvelői',
  difficulty: 7,
  scenario: `Egy 40 fős évfolyamon kérdezték a kedvenc tantárgyat (több is választható).

- **Matek:** 22 fő
- **Magyar:** 20 fő
- **Történelem:** 18 fő
- **Matek ÉS Magyar:** 10 fő
- **Matek ÉS Történelem:** 8 fő
- **Magyar ÉS Történelem:** 7 fő
- **Mindhárom:** 4 fő`,
  question: 'Hányan **nem választották egyik tantárgyat sem**?',
  options: ['0', '1', '2', '3'],
  answer: '1',
  keywords: ['halmaz', '3-halmaz', 'szitaformula'],
  solution: `**Háromhalmazos szitaformula:**

$$|M \\cup MA \\cup T| = 22+20+18-10-8-7+4 = \\mathbf{39}$$

**Egyiket sem:** $40 - 39 = \\mathbf{1}$ fő.

**A helyes válasz: 1.**`
};
