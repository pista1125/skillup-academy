import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizAlgebraEasy, quizAlgebraMedium, quizAlgebraHard } from './algebraQuizzes';

export const algebraTopic: AdmissionTopic = {
  id: "a-algebra",
  title: "3. Algebra",
  icon: "🔤",
  color: "from-purple-500 to-purple-600",
  subtopics: [
    {
      id: "a-alg-kifejezesek",
      title: "Algebrai kifejezések (helyettesítési érték, összevonás)",
      level: 0,
      requirements9th: "Számítsa ki algebráikifejezések helyettesítési értékét és vonja össze az egynemű kifejezéseket.",
      requirements6th: "Ismerje fel a betűs kifejezéseket és végezzen egyszerű behelyettesítéseket.",
      requirements8th: "Értse az ismeretlen fogalmát és végezzen egyszerű összevonásokat.",
      lesson9th: `### Algebrai kifejezések\n\n- **Helyettesítési érték:** A betűk helyére konkrét számokat írunk és kiszámítjuk az eredményt.\n- **Összevonás:** Csak az **egynemű kifejezések** vonhatóak össze (amelyekben a betűs rész és a hatványkitevő pontosan megegyezik).\n  Pl. $3x + 5x = 8x$, de $3x + 5y$ nem vonható össze!`,
      lesson6th: `### Betűs kifejezések\n\nPl. ha $x = 4$, akkor $2x + 3 = 2 \\cdot 4 + 3 = 11$.`,
      lesson8th: `### Összevonás alapjai\n\nPl. $4a + 2a - a = 5a$.`,
      quizEasy: quizAlgebraEasy,
      quizMedium: quizAlgebraMedium,
      quizHard: quizAlgebraHard
    },
    {
      id: "a-alg-zarojel",
      title: "Zárójel felbontása, kiemelés",
      level: 1,
      requirements9th: "Bontson fel zárójeleket szabályosan és alakítson szorzattá kiemeléssel.",
      requirements6th: "Bontson fel egyszerű zárójeleket pozitív számmal való szorzás esetén.",
      requirements8th: "Bontson fel egyszerű zárójeleket negatív előjel esetén is.",
      lesson9th: `### Zárójelek és szorzattá alakítás\n\n- **Zárójel felbontása:** $(a+b)(c+d) = ac + ad + bc + bd$.\n- **Kiemelés:** A tagok legkisebb közös többszörösét/osztóját kiemeljük a zárójel elé: $6x + 9 = 3(2x + 3)$.`,
      lesson6th: `### Zárójel felbontás\n\n$3(x + 2) = 3x + 6$.`,
      lesson8th: `### Negatív előjel a zárójel előtt\n\n$-(x - 4) = -x + 4$.`,
      quizEasy: quizAlgebraEasy,
      quizMedium: quizAlgebraMedium,
      quizHard: quizAlgebraHard
    },
    {
      id: "a-alg-egyenletek",
      title: "Elsőfokú egyismeretlenes egyenletek és egyenlőtlenségek",
      level: 1,
      requirements9th: "Oldjon meg elsőfokú egyenleteket és egyenlőtlenségeket mérlegelvvel.",
      requirements6th: "Oldjon meg egyszerű egyenleteket kitalálással vagy lebontással.",
      requirements8th: "Alkalmazza a mérlegelvet egyszerű egyenletekre.",
      lesson9th: `### A mérlegelv\n\nAz egyenlet mindkét oldalán ugyanazt a műveletet hajtjuk végre:\n1. Zárójelek felbontása\n2. Összevonás mindkét oldalon külön-külön\n3. Ismeretlenek rendezése az egyik oldalra\n4. Konstansok rendezése a másik oldalra\n5. Osztás az ismeretlen együtthatójával\n\n*Figyelem:* Egyenlőtlenségnél negatív számmal való szorzáskor vagy osztáskor a **kacsa csőre megfordul**!`,
      lesson6th: `### Lebontásos módszer\n\n$2x + 3 = 11 \\Rightarrow 2x = 8 \\Rightarrow x = 4$.`,
      lesson8th: `### Mérlegelv alapjai\n\nAmi az egyik oldalon történik, az történik a másikon is!`,
      quizEasy: quizAlgebraEasy,
      quizMedium: quizAlgebraMedium,
      quizHard: quizAlgebraHard
    },
    {
      id: "a-alg-szoveges",
      title: "Szöveges feladatok megoldása egyenlettel",
      level: 1,
      requirements9th: "Írjon fel szöveges feladatok alapján egyenletet és ellenőrizze a kapott eredményt a szöveg alapján.",
      requirements6th: "Oldjon meg egyszerű szöveges feladatokat következtetéssel.",
      requirements8th: "Oldjon meg szöveges feladatokat ismeretlen bevezetésével.",
      lesson9th: `### Szöveges feladatok lépései\n\n1. **Ismeretlen kiválasztása:** Jelöljük $x$-szel a keresett mennyiséget.\n2. **Adatok lejegyzése:** Írjuk fel a kifejezéseket $x$ segítségével.\n3. **Egyenlet felírása és megoldása**\n4. **Válasz és ellenőrzés az eredeti szöveg alapján!**`,
      lesson6th: `### Következtetés\n\nRajzzal vagy táblázattal segíthetjük a gondolkodást.`,
      lesson8th: `### Ismeretlen felírása\n\nPl. Pl. Apa $x+25$ éves, fia $x$ éves.`,
      quizEasy: quizAlgebraEasy,
      quizMedium: quizAlgebraMedium,
      quizHard: quizAlgebraHard
    }
  ]
};
