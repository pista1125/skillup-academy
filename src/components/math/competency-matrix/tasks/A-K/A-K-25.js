export default {
  id: 'A-K-25',
  contentArea: 'A',
  contentSub: '3.3.1',
  thinkingLevel: 'K',
  thinkingSub: '3.3',
  title: 'Navigáció égtájjal — visszaút',
  difficulty: 6,
  scenario: `Egy kiránduló az **iránytűvel** a következő útvonalat járja be:

- **É** 3 km, majd **K** 4 km, majd **D** 1 km, majd **Ny** 2 km.`,
  question: 'Milyen irányban és milyen messze van **a kiindulóponttól** az érkezési pont (légvonalban, Manhattan-távolságban)?',
  visual: {
    type: 'compass',
    center: 'S',
    points: [
      { label: 'É3', direction: 'N' },
      { label: 'K4', direction: 'E' },
      { label: 'D1', direction: 'S' },
      { label: 'Ny2', direction: 'W' }
    ]
  },
  options: ['ÉK, 4 km', 'ÉK, 6 km', 'É, 2 km', 'K, 2 km'],
  answer: 'ÉK, 4 km',
  keywords: ['égtájak', 'navigáció', 'vektor'],
  solution: `**Koordinátákkal** (kelet = +$x$, észak = +$y$): indulás $(0;0)$.

- É 3: $(0;3)$
- K 4: $(4;3)$
- D 1: $(4;2)$
- Ny 2: $(2;2)$

Az érkezési pont az origótól **keletre 2**, **északra 2** — tehát **északkeletre** van.

Manhattan-távolság: $|2| + |2| = \\mathbf{4}$ km.`
};
