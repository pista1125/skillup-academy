import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizFuggvenyekEasy, quizFuggvenyekMedium, quizFuggvenyekHard } from './fuggvenyekQuizzes';

export const fuggvenyekTopic: AdmissionTopic = {
  id: "a-fuggvenyek",
  title: "5. Függvények és koordináta-rendszer",
  icon: "📈",
  color: "from-amber-500 to-amber-600",
  subtopics: [
    {
      id: "a-fug-derékszogust",
      title: "Derékszögű koordináta-rendszer, pontok ábrázolása",
      level: 0,
      requirements9th: "Ábrázoljon pontokat a síkban, határozza meg a koordinátákat és a síknegyedeket.",
      requirements6th: "Ismerje a koordináta-rendszert és ábrázoljon egész koordinátájú pontokat.",
      requirements8th: "Olvassa le pontok koordinátáit és ábrázolja azokat.",
      lesson9th: `### Derékszögű koordináta-rendszer\n\n- Két egymásra merőleges számegyenesből áll ($x$-tengely: abszcissza, $y$-tengely: ordináta).\n- Metszéspontjuk az **origó**: $(0;0)$.\n- A síkot 4 síknegyedre osztják (I., II., III., IV.).`,
      lesson6th: `### Pontok a síkban\n\nEgy pont helyét két számmal adjuk meg: $(x; y)$. Első az x (vízszintes), második az y (függőleges).`,
      lesson8th: `### Koordináta-rendszer alapjai\n\nJobbra és fel a pozitív irány, balra és le a negatív irány.`,
      quizEasy: quizFuggvenyekEasy,
      quizMedium: quizFuggvenyekMedium,
      quizHard: quizFuggvenyekHard
    },
    {
      id: "a-fug-linearis",
      title: "Lineáris függvények ($y = ax + b$), meredekség, tengelymetszet",
      level: 1,
      requirements9th: "Ábrázoljon lineáris függvényeket, határozza meg a meredekséget, zérushelyet és tengelymetszetet.",
      requirements6th: "Készítsen értékpár táblázatot és ábrázoljon egyenest.",
      requirements8th: "Ismerje a meredekség és a tengelymetszet szerepét.",
      lesson9th: `### Lineáris függvények\n\n- Hozzárendelési szabály: $f(x) = ax + b$ (vagy $y = ax + b$).\n- **Meredekség ($a$):** Megmutatja, hogy 1 egység jobbra lépéskor hány egységet léptünk fel/le.\n- **Tengelymetszet ($b$):** Az y-tengellyel való metszéspont $(0; b)$.\n- **Zérushely:** Az a független változó érték ($x$), ahol $f(x) = 0$.`,
      lesson6th: `### Egyenesek ábrázolása\n\nSzámoljunk ki 2-3 pontot, tegyük fel a síkra és kössük össze!`,
      lesson8th: `### Meredekség\n\nHa $a > 0$, a függvény növekszik. Ha $a < 0$, a függvény csökken.`,
      quizEasy: quizFuggvenyekEasy,
      quizMedium: quizFuggvenyekMedium,
      quizHard: quizFuggvenyekHard
    }
  ]
};
