export default {
  id: 'S-K-16',
  contentArea: 'S',
  contentSub: '4.3',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Év végi átlag súlyokkal',
  difficulty: 6,
  scenario: 'Egy tanuló jegyeinek eloszlása matekból: **2** db **2-es**, **5** db **3-as**, **8** db **4-es**, **5** db **5-ös**.',
  question: 'Mennyi az **évi átlaga** (kerekítve 2 tizedesre)?',
  options: ['3,50', '3,80', '3,92', '4,05'],
  answer: '3,80',
  keywords: ['súlyozott átlag'],
  solution: `Összes jegy: $2+5+8+5 = 20$. Összeg:

$$2 \\cdot 2 + 3 \\cdot 5 + 4 \\cdot 8 + 5 \\cdot 5 = 4 + 15 + 32 + 25 = 76$$

$$\\bar{x} = \\dfrac{76}{20} = \\mathbf{3{,}80}$$

**A helyes válasz: 3,80.**`
};
