import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizStatisztikaEasy, quizStatisztikaMedium, quizStatisztikaHard } from './statisztikaQuizzes';

export const statisztikaTopic: AdmissionTopic = {
  id: "a-statisztika",
  title: "10. Statisztika",
  icon: "📈",
  color: "from-indigo-500 to-indigo-600",
  subtopics: [
    {
      id: "a-stat-jellemzok",
      title: "Adatsorok jellemzői (átlag, medián, módusz, terjedelem, grafikonok)",
      level: 0,
      requirements9th: "Számítsa ki az adatsorok átlagát, mediánját, móduszát, terjedelmét és olvassa le a diagramokat.",
      requirements6th: "Számítsa ki számsorok átlagát és olvassa le a legegyszerűbb oszlop- és kördiagramokat.",
      requirements8th: "Számítsa ki az átlagot, móduszt, mediánt.",
      lesson9th: `### Statisztikai mutatók\n\n- **Átlag (számtani közép):** Az adatok összege osztva az adatok számával.\n- **Medián (középérték):** A növekvő sorrendbe rendezett adatok közül a középső érték (páros sok adat esetén a két középső átlaga).\n- **Módusz:** A leggyakrabban előforduló elem.\n- **Terjedelem:** A legnagyobb és a legkisebb elem különbsége.`,
      lesson6th: `### Átlag számítása\n\nAdjuk össze a számokat, és osszuk el a darabszámmal!`,
      lesson8th: `### Medián és módusz\n\nMedián a középső szám, módusz a leggyakoribb szám.`,
      quizEasy: quizStatisztikaEasy,
      quizMedium: quizStatisztikaMedium,
      quizHard: quizStatisztikaHard
    }
  ]
};
