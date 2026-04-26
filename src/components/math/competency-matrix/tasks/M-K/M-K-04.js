export default {
  id: 'M-K-04',
  contentArea: 'M',
  contentSub: '1.2.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Kerékpárút burkolása',
  difficulty: 6,
  scenario: 'Egy **téglalap alakú** kerékpárút **2 m széles** és **150 m hosszú**. Egy **1 m²**-es kerámia burkolólap ára **1 200 Ft**, és **8%** többletet kell rendelni a vágások miatt.',
  question: 'Hány **egész** burkolólapot kell rendelni, és mennyibe kerül a burkolat?',
  visual: {
    type: 'rectangle',
    widthM: 2,
    heightM: 15,
    label: 'Kerékpárút (2 m × 150 m — ábra kicsinyítve)',
    fill: '#bbf7d0'
  },
  answer: {
    lapok: 324,
    ar: 388800
  },
  keywords: ['terület', 'százalékszámítás', 'kerekítés'],
  solution: `**Három lépés:**

1. **Terület:** $2 \\cdot 150 = 300$ m².
2. **Többlet (8%):** $300 \\cdot 1{,}08 = 324$ m², tehát **324** egész lapra van szükség.
3. **Ár:** $324 \\cdot 1200 = \\mathbf{388\\,800}$ Ft.

A vágási többletet mindig **felfelé egész**-re kell kerekíteni; itt pontosan egész szám jött ki.`
};
