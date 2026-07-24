import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizGeometriaEasy, quizGeometriaMedium, quizGeometriaHard } from './geometriaQuizzes';

export const geometriaTopic: AdmissionTopic = {
  id: "a-geometria",
  title: "6. Geometriai alakzatok",
  icon: "📐",
  color: "from-rose-500 to-rose-600",
  subtopics: [
    {
      id: "a-geo-sikidomok",
      title: "Síkidomok (háromszögek, négyszögek, sokszögek, kör) tulajdonságai",
      level: 0,
      requirements9th: "Ismerje a háromszögek, négyszögek és sokszögek osztályozását, belső szögek összegét és Pithagorasz-tételét.",
      requirements6th: "Ismerje a derékszögű, egyenlő szárú háromszögeket, téglalapot, négyzetet.",
      requirements8th: "Számítsa ki a háromszögek hiányzó szögeit és használja a Pithagorasz-tételt.",
      lesson9th: `### Geometriai alakzatok\n\n- **Háromszögek:** Belső szögek összege $180^\\circ$.\n  - *Pithagorasz-tétel (derékszögű háromszögre):* $a^2 + b^2 = c^2$.\n- **Négyszögek:** Belső szögek összege $360^\\circ$.\n  - *Traéz, Paralelogramma, Rombusz, Téglalap, Négyzet, Deltoid*.\n- **Sokszögek:** $n$-oldalú konvex sokszög belső szögeinek összege: $(n-2) \\cdot 180^\\circ$, átlók száma: $\\frac{n(n-3)}{2}$.`,
      lesson6th: `### Háromszögek és négyszögek\n\nHáromszög belső szögei $180^\\circ$-ot tesznek ki. Négyzet: 4 egyenlő oldal, 4 derékszög.`,
      lesson8th: `### Pithagorasz-tétel\n\nDerékszögű háromszögben a két befogó négyzeteinek összege az átfogó négyzete: $a^2 + b^2 = c^2$.`,
      quizEasy: quizGeometriaEasy,
      quizMedium: quizGeometriaMedium,
      quizHard: quizGeometriaHard
    }
  ]
};
