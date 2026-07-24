import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizHaromszogVonalaiEasy, quizHaromszogVonalaiMedium, quizHaromszogVonalaiHard } from './haromszogVonalaiQuizzes';

export const haromszogVonalaiTopic: AdmissionTopic = {
  id: "a-haromszog-vonalai",
  title: "8. Háromszögek nevezetes vonalai",
  icon: "🔺",
  color: "from-orange-500 to-orange-600",
  subtopics: [
    {
      id: "a-hvon-nevezetes",
      title: "Magasság, súlyvonal, szögfelező, oldalfelező merőleges, középvonal",
      level: 0,
      requirements9th: "Ismerje a háromszög nevezetes vonalait, metszéspontjaikat és tulajdonságaikat.",
      requirements6th: "Ismerje a magasságvonal és szögfelező fogalmát.",
      requirements8th: "Rajzolja meg a háromszög magasságait és súlyvonalait.",
      lesson9th: `### Háromszögek nevezetes vonalai\n\n- **Magasságvonal:** A csúcsból a szemközti oldal egyenesére bocsátott merőleges. Metszéspontjuk: **magasságpont ($M$)**.\n- **Súlyvonal:** A csúcsot a szemközti oldal felezőpontjával összekötő szakasz. Metszéspontjuk: **súlypont ($S$)**, ami $2:1$ arányban osztja a súlyvonalat.\n- **Szögfelező:** A belső szöget felező félegyenes. Metszéspontjuk: **a beírható kör középpontja ($O$)**.\n- **Oldalfelező merőleges:** Az oldalak felezőpontjában emelt merőlegesek. Metszéspontjuk: **a köré írható kör középpontja ($K$)**.\n- **Középvonal:** Két oldal felezőpontját összekötő szakasz (párhuzamos a 3. oldallal és fele akkora).`,
      lesson6th: `### Magasság és szögfelező\n\nA magasságvonal derékszöget zár be az alappal. A szögfelező kettévágja a szöget.`,
      lesson8th: `### Súlyvonal és súlypont\n\nA súlyvonalak egy pontban metszik egymást, a súlypontban.`,
      quizEasy: quizHaromszogVonalaiEasy,
      quizMedium: quizHaromszogVonalaiMedium,
      quizHard: quizHaromszogVonalaiHard
    }
  ]
};
