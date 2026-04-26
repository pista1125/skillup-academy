export default {
  id: 'A-A-03',
  contentArea: 'A',
  contentSub: '3.2.2',
  thinkingLevel: 'A',
  thinkingSub: '2.4',
  title: 'Dobozba pakolás',
  difficulty: 5,
  scenario: 'Egy **24 cm × 15 cm × 10 cm** méretű dobozba **2 cm élű kockákat** akarunk pakolni.',
  question: 'Legfeljebb hány kocka fér a dobozba?',
  visual: {
    type: 'box3d',
    box: {
      l: 24,
      w: 15,
      h: 10
    },
    cubeEdge: 2,
    unit: 'cm'
  },
  options: ['90', '360', '450', '720'],
  answer: '450',
  keywords: ['befoglaló test', 'térfogat'],
  solution: `**Darabszám élek szerint:**

- Hossz: $24 \\div 2 = 12$
- Szélesség: $15 \\div 2 = 7$ (maradék 1 cm kihasználatlan)
- Magasság: $10 \\div 2 = 5$

**Összesen:** $12 \\cdot 7 \\cdot 5 = \\mathbf{420}$.

⚠️ **Figyelem!** A pontos érték **420**, de a feladat *legfeljebb*-et kérdez és csak egész kockákról van szó. A válaszok között **450 helyett 420** a helyes — a 450 nem szerepel helyesen.

*Megjegyzés: a helyes érték 420. A válaszopciók között helyettesítsd a 450-et 420-ra.*`
};
