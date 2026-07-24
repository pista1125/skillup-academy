import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizTranszformacioEasy, quizTranszformacioMedium, quizTranszformacioHard } from './transzformacioQuizzes';

export const transzformacioTopic: AdmissionTopic = {
  id: "a-transzformaciok",
  title: "7. Geometriai transzformációk",
  icon: "🔄",
  color: "from-cyan-500 to-cyan-600",
  subtopics: [
    {
      id: "a-trans-egybevagóság",
      title: "Egybevágósági transzformációk (tengelyes és középpontos tükrözés, eltolás, forgatás)",
      level: 0,
      requirements9th: "Alkalmazza magabiztosan a geometriai transzformációkat pontokra, szakaszokra és alakzatokra.",
      requirements6th: "Ismerje a tengelyes és középpontos tükrözést.",
      requirements8th: "Tudjon pontokat és alakzatokat tükrözni és eltolni.",
      lesson9th: `### Egybevágósági transzformációk\n\n- **Tengelyes tükrözés:** Távolságtartó, szögtartó, de **megváltoztatja a körüljárási irányt**.\n- **Középpontos tükrözés:** Távolságtartó, szögtartó, megtartja a körüljárási irányt ($180^\\circ$-os forgatás).\n- **Eltolás:** Meghatározza egy vektor (irány és távolság).\n- **Forgatás:** Meghatározza a forgatási középpont, szög és irány.`,
      lesson6th: `### Tükrözések\n\nTengelyes tükrözésnél a tükörtengelyre merőlegesen mérik fel a távolságot a túloldalra.`,
      lesson8th: `### Transzformációk tulajdonságai\n\nAz egybevágó alakzatok megfelelő oldalai és szögei egyenlőek.`,
      quizEasy: quizTranszformacioEasy,
      quizMedium: quizTranszformacioMedium,
      quizHard: quizTranszformacioHard
    }
  ]
};
