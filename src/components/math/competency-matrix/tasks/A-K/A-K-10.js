export default {
  id: 'A-K-10',
  contentArea: 'A',
  contentSub: '3.3.3',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Többlépcsős útvonal',
  difficulty: 6,
  scenario: `Egy futár a **(0;0)** pontból indul:

1. 5 egység **észak**
2. 3 egység **kelet**
3. 2 egység **dél**
4. 4 egység **kelet**
5. 1 egység **észak**`,
  question: 'Hol lesz a futár, és milyen irányban van a kiindulóponthoz képest?',
  visual: {
    type: 'compass',
    center: 'S',
    points: [
      {
        label: 'V',
        direction: 'NE'
      }
    ]
  },
  answer: '(7; 4); északkeletre',
  keywords: ['útvonal', 'égtájak', 'koordináta'],
  solution: `**Lépésenként:**

- $(0;0)\\to(0;5)$
- $(0;5)\\to(3;5)$
- $(3;5)\\to(3;3)$
- $(3;3)\\to(7;3)$
- $(7;3)\\to(\\mathbf{7;4})$

Végpont $(7;4)$: $x>0, y>0$ → **északkeletre**.`
};
