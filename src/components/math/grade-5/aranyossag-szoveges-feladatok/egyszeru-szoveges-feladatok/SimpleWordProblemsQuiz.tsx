import React, { useState, useEffect } from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { SimpleWordProblemsMatcher } from './SimpleWordProblemsMatcher';
import { SimpleWordProblemsSorter } from './SimpleWordProblemsSorter';

export interface SimpleWordProblemsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SimpleWordProblemsQuiz: React.FC<SimpleWordProblemsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levelCheatSheets: Record<DifficultyLevel, React.ReactNode> = {
    1: (
      <div className="space-y-3">
        <h4 className="font-bold text-teal-700 dark:text-teal-300 text-sm">
          📝 1. Szint: A szöveges feladatok alapjai
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-900/40">
            <strong>Kulcsszavak jelentése:</strong>
            <p className="mt-0.5">• <strong>-szor/szer több:</strong> Szorzás ($3 · x$)</p>
            <p className="mt-0.5">• <strong>-val/vel több:</strong> Összeadás ($x + 3$)</p>
            <p className="mt-0.5">• <strong>-od/ed része:</strong> Osztás ($x : 4$ vagy $x/4$)</p>
          </div>
          <div className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-900/40">
            <strong>Adatok kiírása:</strong>
            <p className="mt-0.5">Mindig jelöld meg, hogy mi az ismert adat, és mit jelölünk $x$-szel!</p>
          </div>
        </div>
      </div>
    ),
    2: (
      <div className="space-y-3">
        <h4 className="font-bold text-teal-700 dark:text-teal-300 text-sm">
          📊 2. Szint: Szakasos ábrázolás módszere
        </h4>
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-900/40">
            <strong>Többszörös és összeg (Részek módszere):</strong>
            <p className="mt-0.5 text-slate-700 dark:text-slate-300">
              Ha B-nek 3-szor annyi van, mint A-nak: A = 1 rész, B = 3 rész. Összesen = 4 rész. 1 rész = Összeg : 4!
            </p>
          </div>
          <div className="p-2 bg-teal-50 dark:bg-teal-950/40 rounded-lg border border-teal-200 dark:border-teal-900/40">
            <strong>Különbség és összeg:</strong>
            <p className="mt-0.5 text-slate-700 dark:text-slate-300">
              Ha B-nek 12-vel több van, mint A-nak: vond ki a 12 többletet a teljes összegből, a maradékot oszd el 2-vel!
            </p>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-3">
        <h4 className="font-bold text-teal-700 dark:text-teal-300 text-sm">
          🎯 3. Szint: Összetett problémák és életszerű ellenőrzés
        </h4>
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Átadásos feladatok:</strong> Ha az egyikből átrakunk $d$-t a másikba, a különbségük $2 \cdot d$-vel változik!</div>
          <div>• <strong>Életkorok:</strong> $x$ év múlva mindkettejük kora $x$-szel nő!</div>
          <div>• <strong>Visszafelé haladás:</strong> A legutolsó maradékból építkezz visszafelé ellentétes műveletekkel!</div>
        </div>
      </div>
    )
  };

  const questions: Record<DifficultyLevel, Question[]> = {
    // ========================================================
    // 1. SZINT: KÖZVETLEN ÉS EGYSZERŰ FELADATOK (10 kérdés)
    // ========================================================
    1: [
      {
        id: 'wp-l1-1',
        question: 'Dávidnak 24 üveggolyója van, míg Bencének 3-szor annyi. Hány üveggolyója van Bencének?',
        options: ['72 golyó', '27 golyó', '8 golyó', '68 golyó'],
        correctAnswer: '72 golyó',
        explanation: 'A „3-szor annyi” szorzást jelent: 24 · 3 = 72 golyó.',
        hint: 'Szorozd meg Dávid golyóinak számát 3-mal!'
      },
      {
        id: 'wp-l1-2',
        question: 'Egy iskolai kirándulásra 48 fiú és 15-tel kevesebb lány jelentkezett. Hány lány jelentkezett?',
        options: ['33 lány', '63 lány', '35 lány', '30 lány'],
        correctAnswer: '33 lány',
        explanation: 'A „15-tel kevesebb” kivonást jelent: 48 − 15 = 33 lány.',
        hint: '48 − 15 = ?'
      },
      {
        id: 'wp-l1-3',
        question: 'Melyik matematikai kifejezés fejezi ki: „x-nél 7-tel több”?',
        options: ['x + 7', '7 · x', 'x − 7', 'x : 7'],
        correctAnswer: 'x + 7',
        explanation: 'Az „ennyivel több” hozzáadást jelent, tehát x + 7.',
        hint: 'Több → összeadás!'
      },
      {
        id: 'wp-l1-4',
        question: 'Melyik matematikai kifejezés fejezi ki: „egy szám 4-szerese”?',
        options: ['4 · x', 'x + 4', 'x : 4', 'x − 4'],
        correctAnswer: '4 · x',
        explanation: 'A „négyszerese” 4-gyel való szorzást jelent: 4 · x.',
        hint: 'Többszörös → szorzás!'
      },
      {
        id: 'wp-l1-5',
        question: 'Egy pékségben reggel 180 kiflit sütöttek. Délre eladták a kiflik harmadát. Hány kiflit adtak el?',
        options: ['60 kiflit', '90 kiflit', '120 kiflit', '50 kiflit'],
        correctAnswer: '60 kiflit',
        explanation: 'A harmadrész kiszámításához 3-mal osztunk: 180 : 3 = 60 kifli.',
        hint: '180 : 3 = ?'
      },
      {
        id: 'wp-l1-6',
        question: 'Eszter vett 3 füzetet, darabját 250 Ft-ért, és egy tollat 450 Ft-ért. Mennyit fizetett összesen?',
        options: ['1200 Ft-ot', '1000 Ft-ot', '950 Ft-ot', '1150 Ft-ot'],
        correctAnswer: '1200 Ft-ot',
        explanation: 'A füzetek ára: 3 · 250 = 750 Ft. A tollal együtt: 750 + 450 = 1200 Ft.',
        hint: '3 · 250 = 750, ehhez add hozzá a 450-et!'
      },
      {
        id: 'wp-l1-7',
        question: 'Mi a szöveges feladatok megoldásának 4. lépése az 5 aranyszabály szerint?',
        options: [
          'Szöveges ellenőrzés a feladat valóságos szövegében',
          'A füzet bezárása és pihenés',
          'Az egyenlet azonnali áthúzása',
          'A számok véletlenszerű összeadása'
        ],
        correctAnswer: 'Szöveges ellenőrzés a feladat valóságos szövegében',
        explanation: 'A 4. lépés az ellenőrzés, amit mindig az eredeti szövegre vonatkoztatva kell elvégezni, nem csak az egyenletbe visszadugva.',
        hint: 'Mielőtt választ írnánk, meg kell győződnünk a válasz helyességéről.'
      },
      {
        id: 'wp-l1-8',
        question: 'Egy osztályban 26 tanuló van. 14 lány van az osztályban. Hánnyal több lány van, mint fiú?',
        options: ['2-vel több', '12-vel több', '4-gyel több', '14-gyel több'],
        correctAnswer: '2-vel több',
        explanation: 'A fiúk száma: 26 − 14 = 12 fiú. A különbség: 14 − 12 = 2-vel több lány van.',
        hint: 'Először számold ki a fiúkat: 26 − 14 = 12. Utána a különbséget: 14 − 12 = ?'
      },
      {
        id: 'wp-l1-9',
        question: 'Gondoltam egy számot, elvettem belőle 18-at, és 32 maradt. Melyik számra gondoltam?',
        options: ['50', '14', '40', '60'],
        correctAnswer: '50',
        explanation: 'Egyenlet: x − 18 = 32 → x = 32 + 18 = 50. Ellenőrzés: 50 − 18 = 32.',
        hint: 'Visszafelé: 32 + 18 = ?'
      },
      {
        id: 'wp-l1-10',
        question: 'Egy dobozban 36 ceruza van. Egyforma arányban osztjuk szét 4 tanuló között. Hány ceruzát kap egy tanuló?',
        options: ['9 ceruzát', '8 ceruzát', '7 ceruzát', '12 ceruzát'],
        correctAnswer: '9 ceruzát',
        explanation: 'Egyenlő elosztás: 36 : 4 = 9 ceruza.',
        hint: '36 : 4 = ?'
      }
    ],

    // ========================================================
    // 2. SZINT: KÉT SZEREPLŐS ÉS SZAKASZOS FELADATOK (10 kérdés)
    // ========================================================
    2: [
      {
        id: 'wp-l2-1',
        question: 'Anna és Peti együtt 40 gesztenyét gyűjtöttek. Petinek 3-szor annyi van, mint Annának. Hány gesztenyéje van Annának?',
        options: ['10 gesztenye', '12 gesztenye', '8 gesztenye', '30 gesztenye'],
        correctAnswer: '10 gesztenye',
        explanation: 'Anna = 1 rész, Peti = 3 rész. Összesen 1 + 3 = 4 rész. 4 rész = 40 → 1 rész = 40 : 4 = 10 gesztenye (Anna). Peti = 30.',
        hint: 'Összesen 4 egyenlő rész van: 40 : 4 = ?'
      },
      {
        id: 'wp-l2-2',
        question: 'Az előző feladatban (Anna = 10, összesen = 40) hány gesztenyéje van Petinek?',
        options: ['30 gesztenye', '20 gesztenye', '25 gesztenye', '35 gesztenye'],
        correctAnswer: '30 gesztenye',
        explanation: 'Peti része: 3 · 10 = 30 gesztenye (vagy 40 − 10 = 30). Ellenőrzés: 10 + 30 = 40, és 30 : 10 = 3.',
        hint: 'Peti Annának a 3-szorosa: 3 · 10 = ?'
      },
      {
        id: 'wp-l2-3',
        question: 'Bence és Csongor matricáinak száma összesen 56. Csongornak 12-vel több matricája van, mint Bencének. Hány matricája van Bencének?',
        options: ['22 matricája', '34 matricája', '20 matricája', '24 matricája'],
        correctAnswer: '22 matricája',
        explanation: 'Vonjuk ki Csongor többletét: 56 − 12 = 44. Ezen a két fiú egyenlően osztozik: 44 : 2 = 22 matrica (Bence). Csongor: 22 + 12 = 34.',
        hint: 'Először 56 − 12 = 44, majd 44 : 2 = ?'
      },
      {
        id: 'wp-l2-4',
        question: 'Egy téglalap alakú kert kerülete 60 méter. A hossza kétszerese a szélességének. Hány méter a szélessége?',
        options: ['10 méter', '20 méter', '15 méter', '12 méter'],
        correctAnswer: '10 méter',
        explanation: 'Félkerület (hossz + szélesség) = 60 : 2 = 30 m. Szélesség = 1 rész, hossz = 2 rész → összesen 3 rész = 30 m → 1 rész = 10 m.',
        hint: 'A kerület K = 2 · (a + b) = 60 m. Így a + b = 30 m. 1 rész + 2 rész = 3 rész = 30 m.'
      },
      {
        id: 'wp-l2-5',
        question: 'Egy gazda tyúkokat és kacsákat tart, összesen 72 darabot. A tyúkok száma 5-szöröse a kacsákénak. Hány tyúkja van a gazdának?',
        options: ['60 tyúk', '12 tyúk', '50 tyúk', '65 tyúk'],
        correctAnswer: '60 tyúk',
        explanation: 'Kacsák = 1 rész, tyúkok = 5 rész. Összesen 6 rész = 72 → 1 rész = 72 : 6 = 12 kacsa. Tyúkok = 5 · 12 = 60 darab.',
        hint: '72 : 6 = 12 kacsa. A tyúkok ennek az ötszöröse: 5 · 12 = ?'
      },
      {
        id: 'wp-l2-6',
        question: 'Két szám összege 45, különbségük 15. Melyik a nagyobbik szám?',
        options: ['30', '15', '35', '25'],
        correctAnswer: '30',
        explanation: 'Ha a kisebb szám x, a nagyobb x + 15. Összegük: 2x + 15 = 45 → 2x = 30 → x = 15 (kisebbik). A nagyobbik: 15 + 15 = 30.',
        hint: '(45 + 15) : 2 = 60 : 2 = 30.'
      },
      {
        id: 'wp-l2-7',
        question: 'Lilla 3 évvel idősebb a húgánál. Ketten együtt 19 évesek. Hány éves Lilla?',
        options: ['11 éves', '8 éves', '10 éves', '12 éves'],
        correctAnswer: '11 éves',
        explanation: 'Többlet levonása: 19 − 3 = 16. Kétfelé osztva: 16 : 2 = 8 éves a húg. Lilla: 8 + 3 = 11 éves. Ellenőrzés: 11 + 8 = 19 és 11 − 8 = 3.',
        hint: '19 − 3 = 16, 16 : 2 = 8 (húg), Lilla 8 + 3 = ?'
      },
      {
        id: 'wp-l2-8',
        question: 'Egy doboz és a benne lévő 20 csoki együtt 650 grammot nyom. Az üres doboz tömege 50 gramm. Hány gramm egy csoki?',
        options: ['30 gramm', '25 gramm', '35 gramm', '20 gramm'],
        correctAnswer: '30 gramm',
        explanation: 'A 20 csoki tiszta tömege: 650 − 50 = 600 gramm. Egy csoki: 600 : 20 = 30 gramm.',
        hint: '650 − 50 = 600 g, és 600 : 20 = ?'
      },
      {
        id: 'wp-l2-9',
        question: 'Egy könyv 240 oldalas. Péter az első nap elolvasta a negyedét, a második nap a maradék harmadát. Hány oldal maradt a harmadik napra?',
        options: ['120 oldal', '140 oldal', '100 oldal', '160 oldal'],
        correctAnswer: '120 oldal',
        explanation: '1. nap: 240 : 4 = 60 oldal. Maradt: 240 − 60 = 180 oldal. 2. nap: a maradék harmada = 180 : 3 = 60 oldal. Maradt: 180 − 60 = 120 oldal.',
        hint: 'Első nap után 180 oldal maradt. Ennek harmada 60 oldal. 180 − 60 = ?'
      },
      {
        id: 'wp-l2-10',
        question: 'Anya 32 szem epret osztott szét Zsófi és Tomi között úgy, hogy Tomi 6 szemmel kevesebbet kapott. Hány szem epret kapott Zsófi?',
        options: ['19 szemet', '13 szemet', '18 szemet', '16 szemet'],
        correctAnswer: '19 szemet',
        explanation: 'Zsófinak van 6-tal többje. 32 − 6 = 26 → 26 : 2 = 13 (Tomi). Zsófi: 13 + 6 = 19 szem. Ellenőrzés: 19 + 13 = 32 és 19 − 13 = 6.',
        hint: 'Zsófi = x + 6, Tomi = x. 2x + 6 = 32 → 2x = 26 → x = 13.'
      }
    ],

    // ========================================================
    // 3. SZINT: ÖSSZETETT FELADATOK ÉS ÁTADÁSOK (10 kérdés)
    // ========================================================
    3: [
      {
        id: 'wp-l3-1',
        question: 'Két dobozban összesen 50 golyó van. Ha az első dobozból átteszünk 6 golyót a másodikba, mindkét dobozban ugyanannyi lesz. Hány golyó volt eredetileg az első dobozban?',
        options: ['31 golyó', '25 golyó', '37 golyó', '32 golyó'],
        correctAnswer: '31 golyó',
        explanation: 'Átrakás után mindkettőben 50 : 2 = 25 golyó lesz. Mivel az elsőből 6-ot elvettünk, eredetileg 25 + 6 = 31 golyó volt benne! (A másodikban 25 − 6 = 19 volt. 31 + 19 = 50).',
        hint: 'A végén mindkettőben 25 van. Vidd vissza a 6 golyót az elsőbe!'
      },
      {
        id: 'wp-l3-2',
        question: 'Egy apa most 38 éves, a lánya 10 éves. Hány év múlva lesz az apa életkora pontosan a lánya életkorának háromszorosa?',
        options: ['4 év múlva', '5 év múlva', '6 év múlva', '3 év múlva'],
        correctAnswer: '4 év múlva',
        explanation: 'Az apa és lánya korkülönbsége mindig állandó: 38 − 10 = 28 év. Amikor az apa 3-szor annyi idős lesz, a korkülönbségük 3 − 1 = 2 rész lesz. 2 rész = 28 → 1 rész = 14 éves a lány. 14 − 10 = 4 év múlva! (Apa: 42, lánya: 14, és 42 = 3 · 14).',
        hint: '4 év múlva a lány 14, az apa 42 éves lesz. 14 · 3 = 42!'
      },
      {
        id: 'wp-l3-3',
        question: 'Zoli a pénze feléből könyvet vett, majd a megmaradt pénzének feléből moziba ment, és maradt 1500 Ft-ja. Mennyi pénze volt eredetileg?',
        options: ['6000 Ft', '4500 Ft', '3000 Ft', '7500 Ft'],
        correctAnswer: '6000 Ft',
        explanation: 'Visszafelé haladunk: Mozi előtt a megmaradt pénz fele volt 1500 Ft, tehát 1500 · 2 = 3000 Ft-ja volt. Mivel ez a teljes pénzének a fele volt, eredetileg 3000 · 2 = 6000 Ft-ja volt.',
        hint: '1500 · 2 = 3000 Ft, majd 3000 · 2 = 6000 Ft.'
      },
      {
        id: 'wp-l3-4',
        question: 'Egy háromszög kerülete 39 cm. A második oldala 3 cm-rel hosszabb az elsőnél, a harmadik oldala pedig kétszerese az elsőnek. Milyen hosszú a legkisebb (első) oldal?',
        options: ['9 cm', '8 cm', '10 cm', '12 cm'],
        correctAnswer: '9 cm',
        explanation: 'Oldalak: a, (a + 3), 2 · a. Összegük: a + a + 3 + 2a = 4a + 3 = 39 cm. 4a = 36 → a = 9 cm. Oldalak: 9 cm, 12 cm, 18 cm. Összeg: 9 + 12 + 18 = 39 cm.',
        hint: '4 · a + 3 = 39, ebből 4 · a = 36.'
      },
      {
        id: 'wp-l3-5',
        question: 'Három egymást követő páros szám összege 78. Melyik a legnagyobb a három szám közül?',
        options: ['28', '26', '24', '30'],
        correctAnswer: '28',
        explanation: 'Jelöljük a középső számot x-szel! Ekkor a három páros szám: x − 2, x, x + 2. Összegük: 3 · x = 78 → x = 26. A három szám: 24, 26, 28. A legnagyobb a 28.',
        hint: '78 : 3 = 26 a középső szám. A következő páros szám 28.'
      },
      {
        id: 'wp-l3-6',
        question: 'Egy gazdaságban tyúkok és nyulak vannak, összesen 20 fej és 56 láb. Hány nyúl van a gazdaságban?',
        options: ['8 nyúl', '12 nyúl', '10 nyúl', '6 nyúl'],
        correctAnswer: '8 nyúl',
        explanation: 'Ha minden állat tyúk lenne (2 lábú), akkor 20 · 2 = 40 láb lenne. A többlet lábak száma: 56 − 40 = 16 láb. Minden nyúlnak 2-vel több lába van, mint egy tyúknak: 16 : 2 = 8 nyúl. Tyúk: 20 − 8 = 12. Ellenőrzés: 8 · 4 + 12 · 2 = 32 + 24 = 56 láb.',
        hint: 'Tegyük fel, hogy mind tyúk: 20 · 2 = 40 láb. 56 − 40 = 16 hiányzó láb, nyulanként 2 láb többlettel.'
      },
      {
        id: 'wp-l3-7',
        question: 'Egy osztály 28 tanulója közül mindenki tanul angolul vagy németül (néhányan mindkettőt). 20-an tanulnak angolul, 15-en németül. Hányan tanulják mindkét nyelvet?',
        options: ['7 tanuló', '5 tanuló', '8 tanuló', '10 tanuló'],
        correctAnswer: '7 tanuló',
        explanation: '20 + 15 = 35 tantárgyválasztás. Mivel összesen 28 diák van, a közös metszetbe tartozók: 35 − 28 = 7 tanuló.',
        hint: '20 + 15 = 35, és 35 − 28 = ?'
      },
      {
        id: 'wp-l3-8',
        question: 'Egy autós az 540 km-es út harmadát autópályán tette meg, a maradék felét főúton, a többit mellékutakon. Hány km-t autózott mellékutakon?',
        options: ['180 km-t', '270 km-t', '90 km-t', '120 km-t'],
        correctAnswer: '180 km-t',
        explanation: 'Autópálya: 540 : 3 = 180 km. Maradt: 540 − 180 = 360 km. Főút: a maradék fele = 360 : 2 = 180 km. Mellékút: 360 − 180 = 180 km.',
        hint: '540 harmada 180 km, maradt 360 km, ennek fele 180 km.'
      },
      {
        id: 'wp-l3-9',
        question: 'Egy raktárban 120 kg liszt volt két zsákban. Miután az első zsákból elhasználtak 25 kg-ot, a másodikból pedig 15 kg-ot, a két zsákban ugyanannyi liszt maradt. Hány kg liszt volt eredetileg az első zsákban?',
        options: ['65 kg', '55 kg', '70 kg', '60 kg'],
        correctAnswer: '65 kg',
        explanation: 'Összesen felhasználtak: 25 + 15 = 40 kg-ot. Maradt: 120 − 40 = 80 kg. Mivel egyenlő lett, mindkettőben 80 : 2 = 40 kg maradt. Az elsőben eredetileg: 40 + 25 = 65 kg volt. A másodikban: 40 + 15 = 55 kg volt. (65 + 55 = 120 kg).',
        hint: 'A végén mindkettőben 40 kg maradt. 40 + 25 = ?'
      },
      {
        id: 'wp-l3-10',
        question: 'Balázs életkora most 4-szerese húga életkorának. 6 év múlva Balázs életkora már csak kétszerese lesz a húgáénak. Hány éves most Balázs?',
        options: ['12 éves', '16 éves', '8 éves', '20 éves'],
        correctAnswer: '12 éves',
        explanation: 'Próbáljuk ki a 12-t: Balázs most 12, a húga 12 : 4 = 3 éves (4-szerese). 6 év múlva: Balázs 12 + 6 = 18 éves, húga 3 + 6 = 9 éves. 18 pontosan kétszerese a 9-nek! Tehát Balázs most 12 éves.',
        hint: 'Ha Balázs 12 és a húga 3, akkor 6 év múlva 18 és 9 évesek lesznek.'
      }
    ]
  };

  return (
    <QuizTemplate
      title="Egyszerű szöveges feladatok Kvíz"
      subtitle="Gyakorold a szakasos ábrázolást, az egyenletalkotást és a valóságos ellenőrzést!"
      topicBadge="5. OSZTÁLY • VI. TÉMAKÖR: MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK"
      topicId="g5-simp-wp-quiz"
      documentId="5_osztaly_egyszeru_szoveges_feladatok_kviz"
      storageKey="g5-simp-wp-quiz"
      levelCheatSheets={levelCheatSheets}
      cheatSheetCards={levelCheatSheets}
      questions={questions}
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      matcherComponent={
        <SimpleWordProblemsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <SimpleWordProblemsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      renderMatcher={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <SimpleWordProblemsMatcher
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
      renderSorter={(props: any, onBackArg?: any, onTheoryArg?: any) => {
        const lvl = typeof props === 'number' ? props : (props?.level ?? 1);
        const back = typeof props === 'object' && props?.onBack ? props.onBack : (onBackArg || onBack);
        const theory = typeof props === 'object' && props?.onSwitchToTheory ? props.onSwitchToTheory : (onTheoryArg || onSwitchToTheory);
        return (
          <SimpleWordProblemsSorter
            level={lvl}
            onBack={back}
            onSwitchToTheory={theory}
          />
        );
      }}
    />
  );
};
export default SimpleWordProblemsQuiz;
