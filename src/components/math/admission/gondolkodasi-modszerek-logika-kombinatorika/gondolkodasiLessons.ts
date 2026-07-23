import { AdmissionTopic } from '../../../../data/admissionContent';
import {
  combElemiQuizEasy,
  combElemiQuizMedium,
  combElemiQuizHard,
  logicAllitasokQuizEasy,
  logicAllitasokQuizMedium,
  logicAllitasokQuizHard
} from './gondolkodasiQuizzes';

export const gondolkodasiTopic: AdmissionTopic = {
  id: "a-logic-comb",
  title: "1. Gondolkodási módszerek, logika, kombinatorika",
  icon: "💡",
  color: "from-purple-500 to-indigo-600",
  subtopics: [
    {
      id: "a-comb-elemi",
      title: "Elemi kombinatorika (összeszámolás, sorrendek száma, kiválasztás)",
      level: 0,
      requirements9th: "Tudja meghatározni a lehetséges eseteket egyszerű összeszámolási feladatokban. Értse az elemek sorrendjét (permutáció) és a kiválasztást.",
      requirements6th: "Képes legyen kiszámolni a lehetséges eseteket ágrajzzal vagy szisztematikus felsorolással.",
      requirements8th: "Soroljon fel egyszerű lehetőségeket színekkel, számjegyekkel szisztematikus sorrendben.",
      lesson9th: `### Elemi kombinatorika

A kombinatorikában azt vizsgáljuk, hányféleképpen választhatunk ki, csoportosíthatunk vagy rendezhetünk el elemeket.

#### 1. Sorrendek (Permutáció)
$n$ darab különböző elem sorrendjeinek száma: $n! = n \\cdot (n-1) \\cdot \\dots \\cdot 1$.
*Példa:* 3 könyv elrendezése a polcon: $3! = 3 \\cdot 2 \\cdot 1 = 6$ lehetőség.

#### 2. Független döntések (Szorzási szabály)
Ha az első döntést $a$-féleképpen, a másodikat tőle függetlenül $b$-féleképpen hozhatjuk meg, akkor a két döntés együtt $a \\cdot b$-féleképpen hozható meg.
*Példa:* Ha van 3 nadrágunk és 4 pólónk, akkor $3 \\cdot 4 = 12$ különböző öltözetet tudunk összeállítani.

#### 3. Szisztematikus felsorolás és Ágrajz
Bonyolultabb feladatoknál a legbiztosabb módszer az ágrajz (döntési fa) rajzolása vagy a szisztematikus felsorolás (pl. lexikografikus sorrendben), hogy ne hagyjunk ki egyetlen esetet sem.`,
      lesson6th: `### Hogyan számoljunk össze lehetőségeket?

A legbiztosabb módszer a **szisztematikus felsorolás** (kezdve a legkisebbel/legnagyobbal) vagy az **ágrajz** (döntési fa) rajzolása.

*Példa:* Hány kétjegyű szám alkotható az 1, 2, 3 számjegyekből?
Felsorolva: 11, 12, 13, 21, 22, 23, 31, 32, 33 (összesen 9 eset).`,
      lesson8th: `### Játék a számokkal és színekkel

Ha van piros, kék és zöld golyónk, hányféleképpen tehetjük őket egymás mellé sorba?
- **P - K - Z**
- **P - Z - K**
- **K - P - Z**
- **K - Z - P**
- **Z - P - K**
- **Z - K - P**

Összesen 6 lehetőségünk van. Mindig kövessünk egy rendszert, hogy ne hagyjunk ki egyet sem!`,
      quizEasy: combElemiQuizEasy,
      quizMedium: combElemiQuizMedium,
      quizHard: combElemiQuizHard
    },
    {
      id: "a-logic-allitasok",
      title: "Matematikai állítások (igaz/hamis állítások megfogalmazása, eldöntése, tagadása)",
      level: 1,
      requirements9th: "Tudja eldönteni egyszerű matematikai állítások igazságértékét. Ismerje a tagadás, az 'és', a 'vagy' szavak logikai szerepét, a 'ha... akkor...' szószerkezeteket.",
      requirements6th: "Tudja eldönteni állításokról, hogy igazak vagy hamisak. Értse az 'és', 'vagy' szavak alapvető használatát.",
      requirements8th: "Egyszerű állításokról tudja megmondani, hogy igazak vagy sem a mindennapi életben.",
      lesson9th: `### Matematikai logika alapjai

Egy állítás olyan kijelentés, amelyről egyértelműen eldönthető, hogy igaz (I) vagy hamis (H).

#### 1. Állítás tagadása (Negáció)
Ha egy $A$ állítás igaz, a tagadása ($\neg A$) hamis, és fordítva.
- *Állítás:* "Minden páros szám osztható 2-vel." (Igaz)
- *Tagadása:* "Létezik olyan páros szám, amely nem osztható 2-vel." (Hamis)

#### 2. Logikai összekötők
- **És (Konjunkció):** Csak akkor igaz, ha mindkét állítás igaz.
- **Vagy (Diszjunkció):** Akkor igaz, ha legalább az egyik állítás igaz.
- **Ha... akkor... (Implikáció):** Csak akkor hamis, ha az előtag igaz, de a következmény hamis.`,
      lesson6th: `### Igaz vagy Hamis állítások

Egy állítás igazságát ellenőrizhetjük példák keresésével, vagy ellenpéldával megcáfolhatjuk.

- **Példa hamis állításra:** "Minden téglalap négyzet" -> Ez hamis, mert van olyan téglalap, amelynek szomszédos oldalai nem egyenlőek (ellenpélda).
- **Példa igaz állításra:** "Van olyan háromszög, amely derékszögű" -> Ez igaz.`,
      lesson8th: `### Figyeljünk a szavakra!

- **Minden:** Kivétel nélkül mindegyikre igaznak kell lennie.
  *Példa:* "Minden páratlan szám 1-re végződik" -> Hamis, mert pl. a 3 is páratlan.
- **Létezik / Van olyan:** Elég egyetlen egy darabot találnunk, hogy az állítás igaz legyen.
  *Példa:* "Van olyan szám, ami páros" -> Igaz (pl. 2).`,
      quizEasy: logicAllitasokQuizEasy,
      quizMedium: logicAllitasokQuizMedium,
      quizHard: logicAllitasokQuizHard
    }
  ]
};
