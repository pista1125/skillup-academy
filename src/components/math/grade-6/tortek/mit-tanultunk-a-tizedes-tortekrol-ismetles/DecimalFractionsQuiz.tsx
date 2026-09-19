import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { FractionToDecimalMatcher } from './FractionToDecimalMatcher';
import { DecimalFractionsSorter } from './DecimalFractionsSorter';
import { Sparkles, ArrowRightLeft, Table, Flame, Layers } from 'lucide-react';

export interface DecimalFractionsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function DecimalFractionsQuiz({
  onBack,
  onSwitchToTheory
}: DecimalFractionsQuizProps) {
  const questions: Question[] = [
    // -------------------------------------------------------------------------
    // 1. SZINT: HELYIÉRTÉKEK, NEVEZETES TÖRTEK, ALAPOK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q1',
      level: 1,
      question: 'A 34,528 számban melyik helyiértéken áll az 5-ös számjegy?',
      questionTypeBadge: 'Helyiérték',
      options: ['Tizedek', 'Századok', 'Ezredek', 'Egyesek'],
      correctAnswer: 'Tizedek',
      explanation: 'A tizedesvessző utáni legelső helyiérték a tizedek helye (0,1). Ezután jönnek a századok (2) és az ezredek (8).',
      steps: [
        { label: 'Tizedesvessző után 1. jegy', value: '5 -> tizedek helye' },
        { label: 'Helyiérték', value: '5 · 0,1 = 0,5' }
      ],
      hint: 'A tizedesvessző utáni közvetlen első számjegyet nézd!',
      formula: '0,1 = 1/10 \\text{ (tized)}'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Hogyan írjuk tizedestört alakban az 1/2 közönséges törtet?',
      questionTypeBadge: 'Nevezetes tört',
      options: ['0,5', '0,2', '0,25', '0,12'],
      correctAnswer: '0,5',
      explanation: '1/2 bővítve 5-tel: 5/10 = 0,5, vagy osztva: 1 : 2 = 0,5.',
      steps: [
        { label: 'Bővítés 10-re', value: '(1 · 5) / (2 · 5) = 5/10' },
        { label: 'Tizedestört alak', value: '0,5' }
      ],
      hint: 'Bővítsd a törtet úgy, hogy a nevezője 10 legyen!',
      formula: '1/2 = 5/10 = 0,5'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Mennyi a 3/4 közönséges tört tizedestört alakja?',
      questionTypeBadge: 'Nevezetes tört',
      options: ['0,75', '0,34', '0,43', '0,7'],
      correctAnswer: '0,75',
      explanation: '3/4 bővítve 25-tel: 75/100 = 0,75.',
      steps: [
        { label: 'Bővítés 100-ra', value: '(3 · 25) / (4 · 25) = 75/100' },
        { label: 'Tizedestört alak', value: '0,75' }
      ],
      hint: 'Szorozd meg a számlálót és nevezőt is 25-tel!',
      formula: '3/4 = 75/100 = 0,75'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Melyik szám a nagyobb: 0,4 vagy 0,38?',
      questionTypeBadge: 'Összehasonlítás',
      options: ['0,4', '0,38', 'Egyenlőek', 'Nem összehasonlíthatóak'],
      correctAnswer: '0,4',
      explanation: 'Ha pótoljuk a nullát a századokhoz: 0,4 = 0,40. Mivel 40 század nagyobb, mint 38 század, ezért 0,4 > 0,38.',
      steps: [
        { label: 'Nulla pótlása', value: '0,4 = 0,40' },
        { label: 'Összevetés', value: '0,40 > 0,38' }
      ],
      hint: 'Egészítsd ki a 0,4-et két tizedesjegyre (0,40)!',
      formula: '0,40 > 0,38'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Hogyan írjuk le tizedestört alakban a „7 egész 3 század” számot?',
      questionTypeBadge: 'Számírás',
      options: ['7,03', '7,3', '7,003', '73,00'],
      correctAnswer: '7,03',
      explanation: 'A századok a tizedesvessző utáni második helyiértéken állnak, így a tizedek helyén 0 van: 7,03.',
      steps: [
        { label: 'Egész rész', value: '7' },
        { label: 'Tizedek', value: '0' },
        { label: 'Századok', value: '3 -> 7,03' }
      ],
      hint: 'A század a vessző utáni 2. jegy!',
      formula: '7 + 3/100 = 7,03'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Mennyi a 0,3 + 0,5 összeadás eredménye?',
      questionTypeBadge: 'Összeadás',
      options: ['0,8', '0,08', '0,35', '8,0'],
      correctAnswer: '0,8',
      explanation: '3 tized + 5 tized = 8 tized = 0,8.',
      steps: [
        { label: 'Tizedek összeadása', value: '3 + 5 = 8' },
        { label: 'Eredmény', value: '0,8' }
      ],
      hint: 'Add össze a tizedeket: 3 + 5!',
      formula: '0,3 + 0,5 = 0,8'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi a 0,9 - 0,4 kivonás eredménye?',
      questionTypeBadge: 'Kivonás',
      options: ['0,5', '0,05', '0,13', '0,4'],
      correctAnswer: '0,5',
      explanation: '9 tizedből levonunk 4 tizedet, 5 tized marad: 0,5.',
      steps: [
        { label: 'Tizedek kivonása', value: '9 - 4 = 5' },
        { label: 'Eredmény', value: '0,5' }
      ],
      hint: '9 tized - 4 tized = ?',
      formula: '0,9 - 0,4 = 0,5'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Melyik az 1/5 közönséges tört tizedestört alakja?',
      questionTypeBadge: 'Nevezetes tört',
      options: ['0,2', '0,5', '0,15', '0,02'],
      correctAnswer: '0,2',
      explanation: '1/5 bővítve 2-vel: 2/10 = 0,2.',
      steps: [
        { label: 'Bővítés 10-re', value: '(1 · 2) / (5 · 2) = 2/10' },
        { label: 'Tizedestört alak', value: '0,2' }
      ],
      hint: 'Szorozd meg 2-vel a számlálót és a nevezőt!',
      formula: '1/5 = 2/10 = 0,2'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Melyik szám értéke pontosan egyenlő a 4,5-tel?',
      questionTypeBadge: 'Záró nullák',
      options: ['4,50', '4,05', '0,45', '45,0'],
      correctAnswer: '4,50',
      explanation: 'A tizedestört végére írt nullák nem változtatják meg a szám értékét, így 4,5 = 4,50.',
      steps: [
        { label: 'Záró nulla szabálya', value: '4,5 = 4,50 = 4,500' }
      ],
      hint: 'A szám legvégére írhatunk nullát!',
      formula: '4,5 = 4,50'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mennyi az 1/10 tizedestört alakja?',
      questionTypeBadge: 'Alapfogalom',
      options: ['0,1', '0,01', '1,0', '0,10'],
      correctAnswer: '0,1',
      explanation: '1 tized = 0,1.',
      steps: [
        { label: '1 tized kiírva', value: '0,1' }
      ],
      hint: 'Egy tized = 0 egész 1 tized.',
      formula: '1/10 = 0,1'
    },

    // -------------------------------------------------------------------------
    // 2. SZINT: BŐVÍTÉS, KEREKÍTÉS, KÜLÖNBÖZŐ TIZEDESJEGYEK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q11',
      level: 2,
      question: 'Mennyi a 3/8 közönséges tört tizedestört alakja?',
      questionTypeBadge: 'Bővítés 1000-re',
      options: ['0,375', '0,38', '0,83', '0,3750'],
      correctAnswer: '0,375',
      explanation: '3/8 bővítve 125-tel: (3 · 125)/(8 · 125) = 375/1000 = 0,375.',
      steps: [
        { label: 'Bővítés 125-tel', value: '(3 · 125) / (8 · 125)' },
        { label: 'Ezredes tört', value: '375/1000' },
        { label: 'Tizedestört alak', value: '0,375' }
      ],
      hint: '8 · 125 = 1000, szorozd meg a számlálót (3) is 125-tel!',
      formula: '3/8 = 375/1000 = 0,375'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Hogyan írható fel a 0,4 tizedestört legegyszerűbb közönséges tört alakban?',
      questionTypeBadge: 'Egyszerűsítés',
      options: ['2/5', '4/10', '1/4', '4/100'],
      correctAnswer: '2/5',
      explanation: '0,4 = 4/10. Egyszerűsítve 2-vel: 4/10 = 2/5.',
      steps: [
        { label: 'Tört alak', value: '4/10' },
        { label: 'Egyszerűsítés 2-vel', value: '(4 : 2) / (10 : 2) = 2/5' }
      ],
      hint: 'Írd fel 4/10-ként és egyszerűsíts 2-vel!',
      formula: '0,4 = 4/10 = 2/5'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Kerekítsd a 4,76 tizedestörtet tizedekre!',
      questionTypeBadge: 'Kerekítés',
      options: ['4,8', '4,7', '5,0', '4,70'],
      correctAnswer: '4,8',
      explanation: 'A tizedek után a századok helyén 6 áll. Mivel 6 >= 5, ezért felfelé kerekítünk: 4,76 ≈ 4,8.',
      steps: [
        { label: 'Kerekítendő hely', value: '7 tized' },
        { label: 'Döntő számjegy', value: '6 század (>= 5 -> felfelé)' },
        { label: 'Kerekített érték', value: '4,8' }
      ],
      hint: 'A 6-os századjegy miatt felfelé kerekítünk!',
      formula: '4,76 \\approx 4,8'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Mennyi a 12,4 + 3,85 összeadás pontos értéke?',
      questionTypeBadge: 'Írásbeli összeadás',
      options: ['16,25', '15,89', '16,45', '15,25'],
      correctAnswer: '16,25',
      explanation: '12,40 + 3,85 = 16,25. A tizedesvesszők egymás alá illesztésével végezzük el az összeadást.',
      steps: [
        { label: 'Helyiértékek igazítása', value: '12,40 + 3,85' },
        { label: 'Összeg', value: '16,25' }
      ],
      hint: 'Egészítsd ki a 12,4-et 12,40-re!',
      formula: '12,40 + 3,85 = 16,25'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Végezd el a kivonást: 5 - 1,35 = ?',
      questionTypeBadge: 'Kivonás egészből',
      options: ['3,65', '4,65', '3,35', '4,35'],
      correctAnswer: '3,65',
      explanation: '5,00 - 1,35 = 3,65. Az 5 egészet 5,00-ként írjuk fel a levonáshoz.',
      steps: [
        { label: 'Nullák kiírása', value: '5,00 - 1,35' },
        { label: 'Századok: 100 - 35', value: '65 század' },
        { label: 'Egészek: 4 - 1', value: '3 egész -> 3,65' }
      ],
      hint: 'Írd fel az 5-öt úgy, hogy 5,00!',
      formula: '5,00 - 1,35 = 3,65'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Melyik relációs jel illik a két szám közé: 0,72 ... 0,705?',
      questionTypeBadge: 'Összehasonlítás',
      options: ['>', '<', '=', '≤'],
      correctAnswer: '>',
      explanation: '0,72 = 0,720 ezred. Mivel 720 ezred nagyobb, mint 705 ezred, ezért 0,72 > 0,705.',
      steps: [
        { label: 'Nullák pótlása', value: '0,720 és 0,705' },
        { label: 'Összehasonlítás', value: '0,720 > 0,705' }
      ],
      hint: 'Hasonlítsd össze a századokat: 2 század > 0 század!',
      formula: '0,720 > 0,705'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Mennyi a 7/20 közönséges tört tizedestört alakja?',
      questionTypeBadge: 'Bővítés 100-ra',
      options: ['0,35', '0,72', '0,035', '0,7'],
      correctAnswer: '0,35',
      explanation: '7/20 bővítve 5-tel: (7 · 5)/(20 · 5) = 35/100 = 0,35.',
      steps: [
        { label: 'Bővítés 5-tel', value: '(7 · 5) / (20 · 5) = 35/100' },
        { label: 'Tizedestört alak', value: '0,35' }
      ],
      hint: 'Szorozd meg 5-tel a számlálót és nevezőt!',
      formula: '7/20 = 35/100 = 0,35'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Írd fel a 0,25 tizedestörtet legegyszerűbb közönséges tört alakban!',
      questionTypeBadge: 'Egyszerűsítés',
      options: ['1/4', '25/100', '2/5', '1/25'],
      correctAnswer: '1/4',
      explanation: '0,25 = 25/100. Mindkettőt elosztva 25-tel: 1/4.',
      steps: [
        { label: 'Tört alak', value: '25/100' },
        { label: 'Egyszerűsítés 25-tel', value: '1/4' }
      ],
      hint: 'Oszd el a 25-öt és a 100-at is 25-tel!',
      formula: '0,25 = 25/100 = 1/4'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Kerekítsd a 18,349 számot századokra!',
      questionTypeBadge: 'Kerekítés',
      options: ['18,35', '18,34', '18,3', '18,40'],
      correctAnswer: '18,35',
      explanation: 'A századok (4) utáni ezredjegy 9. Mivel 9 >= 5, ezért felfelé kerekítünk: 18,35.',
      steps: [
        { label: 'Századok helye', value: '4' },
        { label: 'Döntő jegy (ezredek)', value: '9 (>= 5 -> felfelé)' },
        { label: 'Kerekített szám', value: '18,35' }
      ],
      hint: 'A 9-es ezredjegy miatt a 4 századból 5 század lesz!',
      formula: '18,349 \\approx 18,35'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Mennyi a 7,8 - 2,45 művelet eredménye?',
      questionTypeBadge: 'Írásbeli kivonás',
      options: ['5,35', '5,45', '5,355', '4,35'],
      correctAnswer: '5,35',
      explanation: '7,80 - 2,45 = 5,35.',
      steps: [
        { label: 'Nulla pótlása', value: '7,80 - 2,45' },
        { label: 'Kivonás elvégzése', value: '5,35' }
      ],
      hint: '7,80-ból vonj ki 2,45-öt!',
      formula: '7,80 - 2,45 = 5,35'
    },

    // -------------------------------------------------------------------------
    // 3. SZINT: VEGYES SZÁMOK, ÖSSZETETT FELADATOK, SZÖVEGES PÉLDÁK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q21',
      level: 3,
      question: 'Mennyi a 2 egész 3/4 vegyes szám tizedestört alakja?',
      questionTypeBadge: 'Vegyes szám',
      options: ['2,75', '2,34', '2,43', '2,7'],
      correctAnswer: '2,75',
      explanation: 'A 2 egész változatlan marad, a 3/4 pedig 0,75: 2 + 0,75 = 2,75.',
      steps: [
        { label: 'Egész rész', value: '2' },
        { label: 'Törtrész', value: '3/4 = 0,75' },
        { label: 'Összeg', value: '2,75' }
      ],
      hint: '2 egész meg 3/4 (ami 0,75)!',
      formula: '2 + 3/4 = 2,75'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Írd fel a 0,08 tizedestörtet legegyszerűbb közönséges tört alakban!',
      questionTypeBadge: 'Egyszerűsítés',
      options: ['2/25', '8/100', '4/50', '1/12'],
      correctAnswer: '2/25',
      explanation: '0,08 = 8/100. Mindkettőt elosztjuk 4-gyel: (8 : 4)/(100 : 4) = 2/25.',
      steps: [
        { label: 'Tört alak', value: '8/100' },
        { label: 'Egyszerűsítés 4-gyel', value: '2/25' }
      ],
      hint: 'Oszd el a számlálót és a nevezőt is 4-gyel!',
      formula: '0,08 = 8/100 = 2/25'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Végezd el a műveletsort: 10 - (2,4 + 3,75) = ?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['3,85', '4,85', '3,95', '4,15'],
      correctAnswer: '3,85',
      explanation: 'Zárójelben: 2,40 + 3,75 = 6,15. Majd a kivonás: 10,00 - 6,15 = 3,85.',
      steps: [
        { label: '1. Zárójel', value: '2,40 + 3,75 = 6,15' },
        { label: '2. Kivonás 10-ből', value: '10,00 - 6,15 = 3,85' }
      ],
      hint: 'Először végezd el a zárójelbeli összeadást!',
      formula: '10 - 6,15 = 3,85'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Egy boltban 1 kg alma 450 Ft. Mennyibe kerül 1,5 kg alma?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['675 Ft', '600 Ft', '700 Ft', '550 Ft'],
      correctAnswer: '675 Ft',
      explanation: '1 kg alma 450 Ft, fél kg (0,5 kg) alma 225 Ft. Összesen: 450 + 225 = 675 Ft (450 · 1,5 = 675).',
      steps: [
        { label: '1 kg ára', value: '450 Ft' },
        { label: '0,5 kg ára', value: '450 : 2 = 225 Ft' },
        { label: '1,5 kg ára', value: '450 + 225 = 675 Ft' }
      ],
      hint: 'Számold ki az 1 kg árát (450) meg a fél kg árát (225)!',
      formula: '450 \\cdot 1,5 = 675\\text{ Ft}'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Hány méter 3,45 km?',
      questionTypeBadge: 'Mértékegység',
      options: ['3450 m', '345 m', '34500 m', '34,5 m'],
      correctAnswer: '3450 m',
      explanation: '1 km = 1000 m. Ezért 3,45 · 1000 = 3450 m (a tizedesvessző 3 hellyel jobbra tolódik).',
      steps: [
        { label: 'Átváltási tényező', value: '1 km = 1000 m' },
        { label: 'Szorzás 1000-rel', value: '3,45 · 1000 = 3450 m' }
      ],
      hint: 'Szorozd meg a 3,45-öt 1000-rel!',
      formula: '3,45 \\text{ km} = 3450 \\text{ m}'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Mennyi az 1/8 + 0,25 művelet pontos értéke tizedestörtként?',
      questionTypeBadge: 'Vegyes művelet',
      options: ['0,375', '0,33', '0,35', '0,275'],
      correctAnswer: '0,375',
      explanation: '1/8 = 0,125. Így 0,125 + 0,250 = 0,375 (ami megfelel a 3/8-nak).',
      steps: [
        { label: '1/8 átírása', value: '0,125' },
        { label: 'Összeadás', value: '0,125 + 0,250 = 0,375' }
      ],
      hint: 'Váltsd át az 1/8-ot tizedestörtté (0,125)!',
      formula: '0,125 + 0,25 = 0,375'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Kerekítsd a 9,995 számot századokra!',
      questionTypeBadge: 'Kerekítés átlépéssel',
      options: ['10,00', '9,99', '10,0', '9,90'],
      correctAnswer: '10,00',
      explanation: 'Az 5-ös ezredjegy miatt felfelé kerekítünk: 99 századból 100 század lesz, ami 1 egésszel növeli az egész részt: 10,00.',
      steps: [
        { label: 'Döntő jegy', value: '5 ezred (>= 5 -> felfelé)' },
        { label: 'Átvitel', value: '9,99 + 0,01 = 10,00' }
      ],
      hint: 'Felfelé kerekítésnél a 99 századhoz hozzáadunk 1 századot!',
      formula: '9,995 \\approx 10,00'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Melyik szám található pontosan félúton a 0,4 és a 0,5 között a számegyenesen?',
      questionTypeBadge: 'Számegyenes',
      options: ['0,45', '0,405', '0,55', '0,42'],
      correctAnswer: '0,45',
      explanation: '0,4 = 0,40 és 0,5 = 0,50. A 40 század és 50 század számtani közepe 45 század, azaz 0,45.',
      steps: [
        { label: 'Nullák pótlása', value: '0,40 és 0,50' },
        { label: 'Középérték', value: '(0,40 + 0,50) / 2 = 0,45' }
      ],
      hint: 'Számold ki a (0,40 + 0,50) / 2 átlagot!',
      formula: '(0,4 + 0,5) / 2 = 0,45'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Egy kötél hossza 8 méter. Levágtunk belőle 3,65 métert és 1,8 métert. Hány méter maradt meg?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['2,55 m', '3,55 m', '2,45 m', '3,45 m'],
      correctAnswer: '2,55 m',
      explanation: 'A levágott részek összege: 3,65 + 1,80 = 5,45 m. A megmaradt kötél: 8,00 - 5,45 = 2,55 m.',
      steps: [
        { label: 'Levágott összesen', value: '3,65 + 1,80 = 5,45 m' },
        { label: 'Megmaradt rész', value: '8,00 - 5,45 = 2,55 m' }
      ],
      hint: 'Add össze a két levágott darabot, majd vond ki a 8 méterből!',
      formula: '8 - (3,65 + 1,80) = 2,55\\text{ m}'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Mennyi a 3/5 - 0,45 művelet eredménye legegyszerűbb közönséges tört alakban?',
      questionTypeBadge: 'Összetett vegyes alak',
      options: ['3/20', '15/100', '1/10', '1/5'],
      correctAnswer: '3/20',
      explanation: '3/5 = 0,60. A kivonás: 0,60 - 0,45 = 0,15 = 15/100. Egyszerűsítve 5-tel: 3/20.',
      steps: [
        { label: 'Tizedestört alak', value: '0,60 - 0,45 = 0,15' },
        { label: 'Tört alak', value: '15/100' },
        { label: 'Egyszerűsítés 5-tel', value: '3/20' }
      ],
      hint: '0,60 - 0,45 = 0,15, amit írj fel 15/100-ként és egyszerűsíts!',
      formula: '3/5 - 0,45 = 0,60 - 0,45 = 0,15 = 3/20'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Helyiértékek',
      formula: '0,1 \\text{ (tized)}, 0,01 \\text{ (század)}, 0,001 \\text{ (ezred)}',
      note: 'A tizedesvessző után balról jobbra haladva minden helyiérték tizede az előzőnek.'
    },
    {
      topic: 'Bővítés tizedes alakhoz',
      formula: '1/2 = 0,5; \\quad 1/4 = 0,25; \\quad 3/4 = 0,75; \\quad 1/8 = 0,125',
      note: 'A nevezőt bővítjük 10, 100 vagy 1000-re, vagy a számlálót elosztjuk a nevezővel.'
    },
    {
      topic: 'Összehasonlítás',
      formula: '0,4 = 0,40 > 0,38',
      note: 'Pótold a nullákat a végére azonos hosszúságúra a biztonságos összehasonlításhoz!'
    },
    {
      topic: 'Összeadás és kivonás',
      formula: '12,40 + 3,85 = 16,25; \\quad 5,00 - 1,35 = 3,65',
      note: 'A tizedesvesszőknek pontosan egymás alá kell kerülniük (vessző a vessző alá).'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Nevezetes Törtek Átváltása',
      formula: '\\frac{1}{2} = 0,5 \\quad \\frac{1}{4} = 0,25 \\quad \\frac{3}{4} = 0,75 \\quad \\frac{1}{5} = 0,2 \\quad \\frac{1}{8} = 0,125',
      note: 'Ezek a leggyakrabban előforduló átváltások, érdemes fejből megjegyezni őket!'
    },
    {
      id: 'cs2',
      title: 'Kerekítési Szabály',
      formula: '0, 1, 2, 3, 4 \\longrightarrow \\text{lefelé} \\qquad 5, 6, 7, 8, 9 \\longrightarrow \\text{felfelé}',
      note: 'Mindig a kerekítendő helyiérték után közvetlenül következő EGYETLEN számjegyet vizsgáld!'
    },
    {
      id: 'cs3',
      title: 'Vessző a Vessző Alá',
      formula: 'A,B + C,DE = A,B0 + C,DE',
      note: 'Írásbeli összeadásnál és kivonásnál a tizedesvesszők mindig egymás alá kerülnek!'
    }
  ];

  return (
    <QuizTemplate
      title="Mit tanultunk a tizedes törtekről? Ismétlés"
      subtitle="30 feladat: Tizedestört helyiértékek, átváltás közönséges törtté és vissza, kerekítés, összeadás és kivonás."
      emoji="🧮"
      badgeText="🧮 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-decimal-fractions-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<FractionToDecimalMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DecimalFractionsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default DecimalFractionsQuiz;
