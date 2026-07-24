import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizMeresEasy, quizMeresMedium, quizMeresHard } from './meresQuizzes';

export const meresTopic: AdmissionTopic = {
  id: "a-meres",
  title: "9. Mérés, terület és térfogat",
  icon: "📐",
  color: "from-teal-500 to-teal-600",
  subtopics: [
    {
      id: "a-mer-mertkegységek",
      title: "Mértékegység-átváltások (hosszúság, terület, térfogat, tömeg, idő)",
      level: 0,
      requirements9th: "Végezzen mértékegység-átváltásokat magabiztosan összetett feladatokban is.",
      requirements6th: "Ismerje a hosszúság-, terület- és tömegmértékeket.",
      requirements8th: "Váltson át mértékegységeket szabályosan.",
      lesson9th: `### Mértékegység-átváltás\n\n- **Hosszúság:** $1\\text{ m} = 10\\text{ dm} = 100\\text{ cm} = 1000\\text{ mm}$ (váltószám: 10).\n- **Terület:** $1\\text{ m}^2 = 100\\text{ dm}^2 = 10\\,000\\text{ cm}^2$ (váltószám: 100).\n- **Térfogat:** $1\\text{ m}^3 = 1000\\text{ dm}^3 = 1000\\text{ liter}$ (váltószám: 1000).`,
      lesson6th: `### Mértékegységek\n\n$1$ dm = $10$ cm, $1$ liter = $1$ $\\text{dm}^3$.`,
      lesson8th: `### Átváltások szabályai\n\nKisebb mértékegységből nagyobb felé haladva osztunk a váltószámmal!`,
      quizEasy: quizMeresEasy,
      quizMedium: quizMeresMedium,
      quizHard: quizMeresHard
    }
  ]
};
