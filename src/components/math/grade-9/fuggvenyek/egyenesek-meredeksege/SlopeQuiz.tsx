import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { SlopeMatcher } from './SlopeMatcher';
import { SlopeSorter } from './SlopeSorter';
import {
  SlopeTriangleSvg,
  SlopeTypesSvg,
  ParallelPerpendicularSvg
} from './SlopeFigures';
import { TrendingUp, MoveHorizontal, Scale, Compass, CheckCircle2, AlertTriangle } from 'lucide-react';

interface SlopeQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: A Meredekség Alapjai (Könnyű)',
    subtitle: 'Meredekség definíciója, képlete, emelkedő, süllyedő és vízszintes egyenesek.',
    range: '1 - 10. feladat',
    focus: 'Alapfogalmak és Képletek',
    questions: [
      {
        id: 'sq1-1',
        questionTypeBadge: 'Meredekség Fogalma',
        question: 'Mit fejez ki szemléletesen egy egyenes m meredeksége?',
        figure: <SlopeTriangleSvg size={240} />,
        options: [
          'Hány egységgel változik (emelkedik vagy süllyed) az y érték, ha a vízszintes tengelyen 1 egységet jobbra lépünk',
          'A koordinátatengelyek metszéspontjának távolságát az origótól',
          'Az egyenes teljes hosszát a koordináta-rendszerben',
          'Az x és y koordináták összegét egy tetszőleges pontban'
        ],
        correctAnswer: 0,
        hint: 'A meredekség az egységnyi vízszintes lépésre jutó függőleges elmozdulás.',
        explanation: 'A meredekség (m = Δy / Δx) azt adja meg, hogy ha x értékét 1 egységgel növeljük (jobbra lépünk), mennyit változik a függőleges y magasság.'
      },
      {
        id: 'sq1-2',
        questionTypeBadge: 'Képlet Két Pontból',
        question: 'Melyik képlettel számítjuk ki helyesen az egyenes meredekségét a P₁(x₁; y₁) és P₂(x₂; y₂) pontok koordinátáiból?',
        options: [
          'm = (y₂ - y₁) / (x₂ - x₁)',
          'm = (x₂ - x₁) / (y₂ - y₁)',
          'm = (y₂ + y₁) / (x₂ + x₁)',
          'm = (y₂ - x₂) / (y₁ - x₁)'
        ],
        correctAnswer: 0,
        hint: 'A magasságkülönbség (Δy) van a számlálóban, a vízszintes távolság (Δx) a nevezőben.',
        explanation: 'A meredekség a függőleges elmozdulás és a vízszintes elmozdulás hányadosa: m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁).'
      },
      {
        id: 'sq1-3',
        questionTypeBadge: 'Előjel és Irány',
        question: 'Milyen irányú az egyenes, ha a meredeksége m > 0 (pozitív szám)?',
        figure: <SlopeTypesSvg size={240} />,
        options: [
          'Emelkedő egyenes (balról jobbra haladva felfelé tart)',
          'Süllyedő egyenes (balról jobbra haladva lefelé tart)',
          'Vízszintes egyenes',
          'Függőleges egyenes'
        ],
        correctAnswer: 0,
        hint: 'Ha x növekedésével y is nő, az egyenes emelkedik.',
        explanation: 'Ha m > 0, nagyobb x-hez nagyobb y tartozik, tehát balról jobbra haladva felfelé emelkedik az egyenes.'
      },
      {
        id: 'sq1-4',
        questionTypeBadge: 'Előjel és Irány',
        question: 'Milyen meredekségű a vízszintes egyenes (amely párhuzamos az x tengellyel)?',
        options: [
          'Meredeksége pontosan 0 (m = 0)',
          'Meredeksége 1 (m = 1)',
          'Meredeksége végtelen',
          'Nincs meredeksége'
        ],
        correctAnswer: 0,
        hint: 'Mivel a magassága nem változik se fel, se le, Δy = 0.',
        explanation: 'A vízszintes egyenesen bármely két pont y koordinátája azonos, így Δy = 0. A meredeksége tehát m = 0 / Δx = 0.'
      },
      {
        id: 'sq1-5',
        questionTypeBadge: 'Függőleges Egyenes',
        question: 'Miért mondjuk, hogy egy függőleges egyenesnek (pl. x = 4) NINCS meredeksége?',
        options: [
          'Mert két pontjának x koordinátája megegyezik, így Δx = 0, és nullával nem oszthatunk',
          'Mert a meredeksége mindig pontosan 0',
          'Mert a függőleges egyenes nem fér el a lapon',
          'Mert negatív a magassága'
        ],
        correctAnswer: 0,
        hint: 'A meredekség nevezőjében Δx = x₂ - x₁ áll. Ha a vonal függőleges, mennyi ez a különbség?',
        explanation: 'Függőleges egyenes esetén minden pont x koordinátája azonos, így x₂ - x₁ = 0. A tört nevezője 0 lenne, nullával való osztás pedig nem értelmezett.'
      },
      {
        id: 'sq1-6',
        questionTypeBadge: 'Párhuzamosság Feltétele',
        question: 'Mi a feltétele annak, hogy két egyenes (e₁ és e₂) párhuzamos legyen a koordinátasíkon?',
        figure: <ParallelPerpendicularSvg size={240} />,
        options: [
          'Meredekségüknek pontosan meg kell egyeznie: m₁ = m₂',
          'Meredekségeik szorzata -1 kell legyen: m₁ · m₂ = -1',
          'Meredekségeik összege 0 kell legyen: m₁ + m₂ = 0',
          'Mindkét egyenesnek át kell haladnia az origón'
        ],
        correctAnswer: 0,
        hint: 'Ha két egyenes ugyanolyan mértékben emelkedik, a hajlásszögük azonos, így sosem metszik egymást.',
        explanation: 'Két egyenes akkor és csak akkor párhuzamos, ha hajlásszögük és ezáltal meredekségük azonos: m₁ = m₂.'
      },
      {
        id: 'sq1-7',
        questionTypeBadge: 'Meredekség Leolvasása Képletből',
        question: 'Mennyi az f(x) = -5x + 3 lineáris függvény grafikonjának a meredeksége?',
        options: ['m = -5', 'm = 3', 'm = 5', 'm = -5/3'],
        correctAnswer: 0,
        hint: 'Az y = mx + b alakban az x előtti szorzó a meredekség.',
        explanation: 'Az y = mx + b képletben az m az egyenes meredeksége. Itt x együtthatója -5, tehát m = -5 (süllyedő egyenes).'
      },
      {
        id: 'sq1-8',
        questionTypeBadge: 'Egyszerű Számítás',
        question: 'Egy egyenes áthalad az O(0; 0) origón és a P(2; 6) ponton. Mekkora a meredeksége?',
        options: ['m = 3', 'm = 1/3', 'm = 4', 'm = 8'],
        correctAnswer: 0,
        hint: 'm = (6 - 0) / (2 - 0) = 6 / 2.',
        explanation: 'm = (6 - 0) / (2 - 0) = 6 / 2 = 3. Tehát 1 egységet jobbra lépve 3 egységet emelkedik a grafikon.'
      },
      {
        id: 'sq1-9',
        questionTypeBadge: 'Süllyedő Egyenes Szöge',
        question: 'Milyen szöget zár be egy m < 0 meredekségű egyenes az x tengely pozitív irányával?',
        options: [
          'Tompaszöget (90° és 180° között)',
          'Hegyesszöget (0° és 90° között)',
          'Pontosan derékszöget (90°)',
          '0°-os szöget'
        ],
        correctAnswer: 0,
        hint: 'Balról jobbra haladva lefelé lejt a vonal.',
        explanation: 'A pozitív x tengelytől az óramutató járásával ellentétes irányban mérve a szög nagyobb 90°-nál, azaz tompaszög.'
      },
      {
        id: 'sq1-10',
        questionTypeBadge: '45 Fokos Egyenes',
        question: 'Mekkora a meredeksége annak az egyenesnek, amely pontosan 45°-os szöget zár be az x tengellyel (y = x)?',
        options: ['m = 1', 'm = 45', 'm = 0.5', 'm = 0'],
        correctAnswer: 0,
        hint: 'Ha 1 egységet lépünk jobbra, pontosan 1 egységet lépünk felfelé.',
        explanation: 'y = 1 · x esetén m = 1. Az irányháromszög egyenlő szárú derékszögű, a szög 45° (tan 45° = 1).'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Meredekségszámítás és Merőlegesség (Közepes)',
    subtitle: 'Pontpárokból számított meredekségek, hiányzó koordináták, merőleges egyenesek feltétele.',
    range: '11 - 20. feladat',
    focus: 'Kétpontos Számítás és Merőleges Meredekség',
    questions: [
      {
        id: 'sq2-1',
        questionTypeBadge: 'Két Pont Meredeksége',
        question: 'Mennyi az A(1; 3) és B(5; 11) pontokon átmenő egyenes meredeksége?',
        options: ['m = 2', 'm = 0.5', 'm = 4', 'm = 8'],
        correctAnswer: 0,
        hint: 'm = (y₂ - y₁) / (x₂ - x₁) = (11 - 3) / (5 - 1).',
        explanation: 'm = (11 - 3) / (5 - 1) = 8 / 4 = 2.'
      },
      {
        id: 'sq2-2',
        questionTypeBadge: 'Negatív Előjelek Kezelése',
        question: 'Mennyi a P(-2; 7) és Q(3; -3) pontokon átmenő egyenes meredeksége?',
        options: ['m = -2', 'm = 2', 'm = -4', 'm = -0.5'],
        correctAnswer: 0,
        hint: 'Δy = -3 - 7 = -10; Δx = 3 - (-2) = 5.',
        explanation: 'm = (-3 - 7) / (3 - (-2)) = -10 / (3 + 2) = -10 / 5 = -2.'
      },
      {
        id: 'sq2-3',
        questionTypeBadge: 'Merőlegesség Feltétele',
        question: 'Mi a feltétele annak, hogy két nem tengelypárhuzamos egyenes (e₁ és e₂) merőleges legyen egymásra?',
        options: [
          'Meredekségeik szorzata -1 kell legyen: m₁ · m₂ = -1 (negatív reciprok)',
          'Meredekségüknek meg kell egyeznie: m₁ = m₂',
          'Meredekségeik összege 1 kell legyen: m₁ + m₂ = 1',
          'Egyiknek pozitívnak, másiknak 0-nak kell lennie'
        ],
        correctAnswer: 0,
        hint: 'Ha az egyik m, a másik -1/m meredekségű.',
        explanation: 'Két egyenes akkor és csak akkor merőleges egymásra, ha meredekségeik szorzata -1, azaz m₂ = -1 / m₁ (negatív reciprok).'
      },
      {
        id: 'sq2-4',
        questionTypeBadge: 'Merőleges Meredekség Számítása',
        question: 'Egy e egyenes meredeksége m = 4. Mekkora a rá merőleges n egyenes meredeksége?',
        options: ['m_n = -1/4 (-0.25)', 'm_n = -4', 'm_n = 1/4 (0.25)', 'm_n = 4'],
        correctAnswer: 0,
        hint: 'm_n = -1 / m = -1 / 4.',
        explanation: 'm · m_n = -1 ➔ 4 · m_n = -1 ➔ m_n = -1/4 = -0.25.'
      },
      {
        id: 'sq2-5',
        questionTypeBadge: 'Merőleges Meredekség Számítása',
        question: 'Egy egyenes egyenlete y = -(2/3)x + 1. Mekkora a rá merőleges egyenes meredeksége?',
        options: ['m = 3/2 (1.5)', 'm = -3/2', 'm = 2/3', 'm = -2/3'],
        correctAnswer: 0,
        hint: 'Vedd a negatív előjel ellentettjét (+) és a tört reciprokát (3/2).',
        explanation: 'm₁ = -2/3. A merőleges egyenes meredeksége m₂ = -1 / (-2/3) = +3/2 = 1.5.'
      },
      {
        id: 'sq2-6',
        questionTypeBadge: 'Hiányzó Koordináta Számítása',
        question: 'Egy egyenes meredeksége m = 3, és áthalad a P(2; 5) és Q(4; y) pontokon. Mennyi az y koordináta értéke?',
        options: ['y = 11', 'y = 8', 'y = 14', 'y = 9'],
        correctAnswer: 0,
        hint: 'm = (y - 5) / (4 - 2) = 3 ➔ y - 5 = 3 · 2.',
        explanation: '(y - 5) / (4 - 2) = 3 ➔ (y - 5) / 2 = 3 ➔ y - 5 = 6 ➔ y = 11.'
      },
      {
        id: 'sq2-7',
        questionTypeBadge: 'Hiányzó Bemenet Keresése',
        question: 'Egy egyenes meredeksége m = -0.5, és áthalad az A(1; 4) és B(x; 2) pontokon. Mennyi az x értéke?',
        options: ['x = 5', 'x = 3', 'x = -3', 'x = -5'],
        correctAnswer: 0,
        hint: 'm = (2 - 4) / (x - 1) = -0.5 ➔ -2 / (x - 1) = -0.5.',
        explanation: '-2 / (x - 1) = -0.5 ➔ x - 1 = -2 / (-0.5) = 4 ➔ x = 5.'
      },
      {
        id: 'sq2-8',
        questionTypeBadge: 'Gyakorlati Meredekség Százalékban',
        question: 'Egy hegyi útra egy KRESZ tábla 12%-os emelkedőt jelez. Mekkora ezen útszakasz matematikai meredeksége (m)?',
        options: ['m = 0.12', 'm = 1.2', 'm = 12', 'm = 0.012'],
        correctAnswer: 0,
        hint: 'A 12% azt jelenti, hogy 100 m vízszintes haladásra 12 m magasságemelkedés jut.',
        explanation: 'Meredekség százalékban: p% = m · 100%. Ezért m = 12% / 100% = 0.12 (azaz m = 12 / 100).'
      },
      {
        id: 'sq2-9',
        questionTypeBadge: 'Vízszintes Szakasz Felismerése',
        question: 'Mekkora az A(-3; 5) és B(7; 5) pontokat összekötő szakasz meredeksége?',
        options: ['m = 0', 'm = 1', 'Nincs meredeksége', 'm = 5/10'],
        correctAnswer: 0,
        hint: 'Nézd meg a két pont y koordinátáját: mindkettő 5!',
        explanation: 'm = (5 - 5) / (7 - (-3)) = 0 / 10 = 0. A szakasz vízszintes, meredeksége 0.'
      },
      {
        id: 'sq2-10',
        questionTypeBadge: 'Azonos Meredekség Keresése',
        question: 'Melyik egyenes párhuzamos az y = 3x - 2 egyenessel?',
        options: ['y = 3x + 10', 'y = -3x + 2', 'y = (1/3)x - 2', 'y = -2x + 3'],
        correctAnswer: 0,
        hint: 'Keresd azt az egyenest, ahol az x együtthatója szintén pontosan 3.',
        explanation: 'Az y = 3x + 10 egyenes meredeksége szintén m = 3, így párhuzamos az adott egyenessel.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Geometriai Alkalmazások és Összetett Elemzés (Nehéz)',
    subtitle: 'Derékszögű háromszögek igazolása, három pont kollinearitása, szakaszfelező merőleges.',
    range: '21 - 30. feladat',
    focus: 'Derékszögek, Kollinearitás és Geometria',
    questions: [
      {
        id: 'sq3-1',
        questionTypeBadge: 'Kollinearitás Vizsgálata',
        question: 'Egy egyenesen fekszik-e a három pont: A(1; 2), B(3; 6) és C(7; 14)?',
        options: [
          'Igen, mert m_AB = (6-2)/(3-1) = 2 és m_BC = (14-6)/(7-3) = 2, a meredekségek azonosak',
          'Nem, mert a távolságok nem egyenlőek',
          'Csak akkor, ha az origón is átmennek',
          'Nem, mert három pont mindig zárt háromszöget alkot'
        ],
        correctAnswer: 0,
        hint: 'Három pont akkor fekszik egy egyenesen (kollineárisak), ha az AB és a BC szakasz meredeksége megegyezik.',
        explanation: 'm_AB = 4/2 = 2. m_BC = 8/4 = 2. Mivel a meredekségek egyenlőek és B közös pont, a három pont egy egyenesre esik.'
      },
      {
        id: 'sq3-2',
        questionTypeBadge: 'Derékszögű Háromszög Igazolása',
        question: 'Egy háromszög csúcsai: A(1; 1), B(5; 3) és C(3; 7). Derékszögű-e a háromszög a B csúcsnál?',
        options: [
          'Igen, mert m_AB = 0.5 és m_BC = -2, szorzatuk 0.5 · (-2) = -1 (merőlegesek)',
          'Nem, mert a meredekségek szorzata nem -1',
          'Nem, mert egyik oldal sem párhuzamos a tengelyekkel',
          'Csak akkor, ha Pitagorasz-tétellel számolunk'
        ],
        correctAnswer: 0,
        hint: 'Számítsd ki m_AB-t és m_BC-t, majd vizsgáld meg szorzatukat!',
        explanation: 'm_AB = (3 - 1) / (5 - 1) = 2/4 = 0.5. m_BC = (7 - 3) / (3 - 5) = 4 / (-2) = -2. Mivel 0.5 · (-2) = -1, az AB és BC oldalak merőlegesek egymásra!'
      },
      {
        id: 'sq3-3',
        questionTypeBadge: 'Szakaszfelező Merőleges',
        question: 'Az A(2; 4) és B(6; 12) pontok által meghatározott szakasz felezőmerőlegesének mekkora a meredeksége?',
        options: ['m_felező = -0.5', 'm_felező = 2', 'm_felező = -2', 'm_felező = 0.5'],
        correctAnswer: 0,
        hint: 'Először számold ki AB meredekségét (m_AB), majd vedd a negatív reciprokát!',
        explanation: 'm_AB = (12 - 4) / (6 - 2) = 8 / 4 = 2. A rá merőleges egyenes meredeksége: m_felező = -1 / 2 = -0.5.'
      },
      {
        id: 'sq3-4',
        questionTypeBadge: 'Paraméter Meghatározása Kollinearitásból',
        question: "Mekkora 'k' értéke, ha a P(1; 3), Q(3; 7) és R(6; k) pontok egy egyenesre esnek?",
        options: ['k = 13', 'k = 11', 'k = 15', 'k = 10'],
        correctAnswer: 0,
        hint: 'm_PQ = (7 - 3) / (3 - 1) = 2. Ugyanennyinek kell lennie m_QR = (k - 7) / (6 - 3)-nak is.',
        explanation: 'm_PQ = 4 / 2 = 2. Tehát (k - 7) / (6 - 3) = 2 ➔ (k - 7) / 3 = 2 ➔ k - 7 = 6 ➔ k = 13.'
      },
      {
        id: 'sq3-5',
        questionTypeBadge: 'Rombusz Átlói',
        question: 'Egy rombusz egyik átlójának meredeksége m₁ = 3/4. Mekkora a másik átlójának meredeksége?',
        options: ['m₂ = -4/3', 'm₂ = 4/3', 'm₂ = -3/4', 'm₂ = 3/4'],
        correctAnswer: 0,
        hint: 'A rombusz átlói mindig merőlegesen felezik egymást!',
        explanation: 'Mivel a rombusz átlói merőlegesek egymásra, meredekségeik szorzata -1: m₂ = -1 / (3/4) = -4/3.'
      },
      {
        id: 'sq3-6',
        questionTypeBadge: 'Egyenes Metszéspontja Tengellyel',
        question: 'Egy egyenes átmegy a P(2; 5) ponton, meredeksége m = -3. Hol metszi az egyenes az y tengelyt (mennyi b értéke)?',
        options: ['(0; 11)', '(0; -1)', '(0; 1)', '(0; 8)'],
        correctAnswer: 0,
        hint: 'y = mx + b ➔ 5 = -3 · 2 + b.',
        explanation: 'y = mx + b ➔ 5 = -3 · 2 + b ➔ 5 = -6 + b ➔ b = 11. Az y-tengelymetszet: (0; 11).'
      },
      {
        id: 'sq3-7',
        questionTypeBadge: 'Téglalap Negyedik Csúcsa',
        question: 'Egy derékszögű négyszög három csúcsa: A(0; 0), B(4; 2) és D(-1; 2). Merőleges-e az AB oldal az AD oldalra?',
        options: [
          'Igen, mert m_AB = 2/4 = 0.5 és m_AD = 2/(-1) = -2, szorzatuk -1',
          'Nem, mert a meredekségek szorzata 1',
          'Csak akkor, ha a D csúcs az origóban van',
          'Nem, mert az oldalak hossza nem egyezik meg'
        ],
        correctAnswer: 0,
        hint: 'm_AB = (2-0)/(4-0) = 0.5. m_AD = (2-0)/(-1-0) = -2.',
        explanation: 'm_AB = 0.5 és m_AD = -2. Mivel 0.5 · (-2) = -1, az A csúcsnál a két oldal derékszöget zár be.'
      },
      {
        id: 'sq3-8',
        questionTypeBadge: 'Tengelyekkel Bezárt Szög',
        question: 'Ha egy egyenes meredeksége m = -1, mekkora hegyesszöget zár be az x tengellyel, illetve az y tengellyel?',
        options: [
          'Mindkét tengellyel pontosan 45°-os szöget zár be',
          'Az x tengellyel 30°-ot, az y tengellyel 60°-ot',
          'Mindkét tengellyel 90°-ot',
          'Az x tengellyel 60°-ot, az y tengellyel 30°-ot'
        ],
        correctAnswer: 0,
        hint: '|m| = 1 esetén az irányháromszög befogói egyenlőek (Δx = |Δy|).',
        explanation: 'Mivel |m| = 1, az egyenes egyenlő szárú derékszögű háromszöget zár be a tengelyekkel, így mindkét tengellyel 45°-os szöget alkot.'
      },
      {
        id: 'sq3-9',
        questionTypeBadge: 'Tető Meredeksége Százalékban',
        question: 'Egy ház tetejének gerince 3 méterrel magasabban van az ereszcsatornánál, miközben a vízszintes kinyúlása 5 méter. Mekkora a tető meredeksége százalékban kifejezve?',
        options: ['60%', '30%', '166%', '15%'],
        correctAnswer: 0,
        hint: 'm = Δy / Δx = 3 / 5 = 0.6. Szorozd meg 100%-kal!',
        explanation: 'm = magasság / vízszintes = 3 m / 5 m = 0.6. Százalékban: 0.6 · 100% = 60%-os tetőmeredekség.'
      },
      {
        id: 'sq3-10',
        questionTypeBadge: 'Paraméteres Merőlegesség',
        question: "Milyen 'a' érték esetén lesz merőleges az y = a · x + 4 egyenes az y = 3x - 1 egyenesre?",
        options: ['a = -1/3', 'a = 1/3', 'a = -3', 'a = 3'],
        correctAnswer: 0,
        hint: 'a · 3 = -1 ➔ a = -1/3.',
        explanation: 'A merőlegesség feltétele: a · 3 = -1 ➔ a = -1/3.'
      }
    ]
  }
};

const slopeCheatSheets: CheatSheetCard[] = [
  {
    title: 'A Meredekség Képlete',
    category: 'Alapképlet',
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p>Két pont: <code>P₁(x₁; y₁)</code> és <code>P₂(x₂; y₂)</code> esetén:</p>
        <p className="font-mono font-bold text-emerald-900 text-center bg-white/80 py-1 rounded text-sm">
          m = Δy / Δx = (y₂ - y₁) / (x₂ - x₁)
        </p>
        <p className="text-[11px] text-slate-500 italic">
          Fontos: A magasságkülönbség (y) van FELÜL, a vízszintes (x) ALUL!
        </p>
      </div>
    )
  },
  {
    title: 'A 4 Meredekség-típus',
    category: 'Geometriai Állás',
    icon: <MoveHorizontal className="w-5 h-5 text-blue-600" />,
    color: 'border-blue-200 bg-blue-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>• <strong>m &gt; 0:</strong> Emelkedő egyenes (hegyesszög)</p>
        <p>• <strong>m &lt; 0:</strong> Süllyedő egyenes (tompaszög)</p>
        <p>• <strong>m = 0:</strong> Vízszintes egyenes (konstans)</p>
        <p className="text-rose-700 font-bold">• Függőleges: Nincs meredeksége (Δx = 0)!</p>
      </div>
    )
  },
  {
    title: 'Párhuzamos és Merőleges',
    category: 'Szabály',
    icon: <Scale className="w-5 h-5 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50/70',
    content: (
      <div className="space-y-1.5 text-xs text-slate-700">
        <p><strong>Párhuzamosak (e₁ ∥ e₂):</strong></p>
        <p className="font-mono font-bold text-blue-800 text-center bg-white/80 py-0.5 rounded">
          m₁ = m₂
        </p>
        <p><strong>Merőlegesek (e₁ ⊥ e₂):</strong></p>
        <p className="font-mono font-bold text-purple-800 text-center bg-white/80 py-0.5 rounded">
          m₁ · m₂ = -1 &nbsp;➔&nbsp; m₂ = -1 / m₁
        </p>
      </div>
    )
  },
  {
    title: 'Útburkolati Meredekség (%)',
    category: 'Alkalmazás',
    icon: <Compass className="w-5 h-5 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50/70',
    content: (
      <div className="space-y-1 text-xs text-slate-700">
        <p>Közlekedésben a meredekséget százalékban adják meg:</p>
        <p className="font-mono font-bold text-amber-900 text-center bg-white/80 py-0.5 rounded">
          Meredekség % = m · 100%
        </p>
        <p>Például 10% meredekség = <code>m = 0.10</code> (100 m-en 10 m szintemelkedés).</p>
      </div>
    )
  }
];

export const SlopeQuiz: React.FC<SlopeQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="8. Egyenesek meredeksége"
      subtitle="Gyakorold az egyenesek meredekségének számítását két pontból, a párhuzamosság és merőlegesség feltételeit!"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      levels={quizLevels}
      cheatSheets={slopeCheatSheets}
      topicId="egyenesek-meredeksege"
      topicTitle="Egyenesek meredeksége"
      activityType="g9-func-meredekseg-quiz"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={SlopeMatcher}
      sorterComponent={SlopeSorter}
    />
  );
};

