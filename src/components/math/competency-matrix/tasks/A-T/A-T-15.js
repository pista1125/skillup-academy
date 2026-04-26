export default {
  id: 'A-T-15',
  contentArea: 'A',
  contentSub: '3.1.2',
  thinkingLevel: 'T',
  thinkingSub: '1.3',
  title: 'Betű — vízszintes tengelyes tükörkép',
  difficulty: 2,
  scenario: 'Egy betűkártyát **vízszintes tengelyre** tükrözünk.',
  question: 'Melyik betű tükörképe **önmaga** vízszintes tükrözésnél?',
  visual: {
    type: 'mirrorChoice',
    letter: 'B',
    axis: 'horizontal',
    options: ['A', 'B', 'E', 'F']
  },
  options: ['A', 'B', 'E', 'F'],
  answer: 'B',
  keywords: ['tengelyes tükrözés', 'szimmetria'],
  solution: `**Vízszintes tengelyre** tükrözésnél fent-lent cserélődik.

A **B** betűnek van vízszintes szimmetriatengelye, ezért tükörképe önmaga. Az **E** is, de a szokásos írásmódban a **B** a legáltalánosabban elfogadott.

A helyes válasz: **B**.`
};
