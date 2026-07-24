import { AdmissionTopic } from '../../../../data/admissionContent';
import { quizSzazalekEasy, quizSzazalekMedium, quizSzazalekHard } from './szazalekQuizzes';

export const szazalekTopic: AdmissionTopic = {
  id: "a-szazalek",
  title: "4. Százalékszámítás",
  icon: "📊",
  color: "from-emerald-500 to-emerald-600",
  subtopics: [
    {
      id: "a-szaz-alapok",
      title: "A százalékérték, százalékalap és százalékláb értelmezése",
      level: 0,
      requirements9th: "Számítsa ki a százalékértéket, az alapot és a százaléklábat magabiztosan képlettel és következtetéssel.",
      requirements6th: "Értse a 10%, 25%, 50%, 75%, 100% jelentését és számítsa ki azokat.",
      requirements8th: "Számítsa ki a százalékértéket és az alapot egyszerű feladatokban.",
      lesson9th: `### A százalékszámítás alapfogalmai\n\n- **Alap ($A$):** Az a mennyiség, aminek a százalékát vesszük (a $100\\%$).\n- **Százalékláb ($p$):** Hány százalékot veszünk (jelölése: $p\\%$).\n- **Százalékérték ($É$):** A kiszámított rész.\n\n### Összefüggések\n$$É = A \\cdot \\frac{p}{100}$$\n$$A = \\frac{É}{\\frac{p}{100}}$$\n$$p\\% = \\frac{É}{A} \\cdot 100\\%$$`,
      lesson6th: `### Százalék alapjai\n\n- $50\\%$ = fél (2-vel osztunk)\n- $25\\%$ = negyed (4-gyel osztunk)\n- $10\\%$ = tized (10-zel osztunk)\n- $75\\%$ = háromnegyed`,
      lesson8th: `### Százalékláb és érték\n\nPl. $200$ Ft $10\\%$-a: $200 / 10 = 20$ Ft.`,
      quizEasy: quizSzazalekEasy,
      quizMedium: quizSzazalekMedium,
      quizHard: quizSzazalekHard
    },
    {
      id: "a-szaz-valtozas",
      title: "Százalékos változások (növekedés, csökkenés, kamat)",
      level: 1,
      requirements9th: "Oldjon meg összetett százalékszámítási feladatokat (áremelés, leértékelés, keverés).",
      requirements6th: "Számítsa ki a kedvezményes árat egy lépésben.",
      requirements8th: "Számítsa ki az áremelés és engedmény mértékét.",
      lesson9th: `### Százalékos változások\n\n- **$p\\%$-os növekedés:** Az új érték az eredeti $(100 + p)\\%$-a, azaz szorzója: $1 + \\frac{p}{100}$.\n- **$p\\%$-os csökkenés:** Az új érték az eredeti $(100 - p)\\%$-a, azaz szorzója: $1 - \\frac{p}{100}$.\n\nPl. $20\\%$-os áremelés után az új ár: $A \\cdot 1{,}20$.`,
      lesson6th: `### Kedvezmény számítás\n\nHa egy $4000$ Ft-os cipő $25\\%$-kal olcsóbb, akkor a kedvezmény $1000$ Ft, az új ár $3000$ Ft.`,
      lesson8th: `### Áremelés\n\nHa valami $10\\%$-kal drágul, a régi ár $110\\%$-át fizetjük.`,
      quizEasy: quizSzazalekEasy,
      quizMedium: quizSzazalekMedium,
      quizHard: quizSzazalekHard
    }
  ]
};
