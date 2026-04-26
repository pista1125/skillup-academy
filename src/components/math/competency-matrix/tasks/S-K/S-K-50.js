export default {
  id: 'S-K-50',
  contentArea: 'S',
  contentSub: '4.5',
  thinkingLevel: 'K',
  thinkingSub: '3.2',
  title: 'Tombola — legalább egy nyeremény',
  difficulty: 7,
  scenario: 'Egy tombolán 100 szelvényből **20 nyerő**. Péter **3 szelvényt** vesz (visszatevés nélkül).',
  question: 'Mennyi a valószínűsége, hogy Péter **legalább egy nyereményt** szerez? (Kerekítve 3 tizedesig.)',
  options: ['0,488', '0,512', '0,600', '0,720'],
  answer: '0,488',
  keywords: ['valószínűség', 'komplementer', 'visszatevés nélkül'],
  solution: `**Komplementer esemény:** egyik szelvény sem nyer.

Visszatevés nélkül a **80 nem nyerő** szelvényből kell 3-at húzni a **100 összesből**:

$$P(\\text{egyik sem}) = \\dfrac{80}{100} \\cdot \\dfrac{79}{99} \\cdot \\dfrac{78}{98}$$

Számítás: $\\dfrac{80 \\cdot 79 \\cdot 78}{100 \\cdot 99 \\cdot 98} = \\dfrac{492\\,960}{970\\,200} \\approx 0{,}5081$.

**Kedvező (legalább egy):**

$$P = 1 - 0{,}5081 \\approx \\mathbf{0{,}488}$$

**A helyes válasz: 0,488.**`
};
