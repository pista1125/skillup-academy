import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { VariablesMatcher } from './VariablesMatcher';
import { VariablesSorter } from './VariablesSorter';
import {
  MonomialStructureSvg,
  EvaluationMachineSvg,
  LikeTermsBalanceSvg,
  TextToFormulaSvg
} from './VariablesFigures';
import { ArrowRightLeft, LayoutGrid, Variable, Calculator, Layers } from 'lucide-react';

interface VariablesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Egyszerű Kifejezések (Könnyű)',
    subtitle: 'Változók, monomok, együtthatók, egyszerű helyettesítési értékek és kifejezések felírása.',
    range: '1 - 10. feladat',
    focus: 'Algebrai Alapismeretek',
    questions: [
      {
        id: 'vq1-1',
        questionTypeBadge: 'Együttható Meghatározása',
        question: 'Mi a -7x³y² egytagú kifejezés (monom) együtthatója?',
        figure: <MonomialStructureSvg size={170} />,
        options: ['-7', '7', '3', '5'],
        correctAnswer: 0,
        hint: 'Az együttható az a numerikus szorzótényező, amely a betűs rész előtt áll, előjellel együtt.',
        explanation: 'A -7x³y² kifejezésben az együttható a változók szorzója, vagyis a -7.'
      },
      {
        id: 'vq1-2',
        questionTypeBadge: 'Rejtett Együttható',
        question: 'Mennyi az együtthatója a -x kifejezésnek?',
        options: ['-1', '0', '1', 'Nincs együtthatója'],
        correctAnswer: 0,
        hint: 'Gondolj arra, hogy a -x kifejezés felírható úgy is, mint (-1) · x.',
        explanation: 'Ha a változó előtt csak egy mínuszjel szerepel szám nélkül, a rejtett együttható mindig -1, mivel -x = -1 · x.'
      },
      {
        id: 'vq1-3',
        questionTypeBadge: 'Pozitív Rejtett Együttható',
        question: 'Mennyi az együtthatója az a²b kifejezésnek?',
        options: ['1', '0', '2', 'a'],
        correctAnswer: 0,
        hint: 'Ha egy betű előtt nincs kiírva szám, akkor 1 · a²b-ről van szó.',
        explanation: 'Az a²b = 1 · a²b, tehát az együtthatója 1.'
      },
      {
        id: 'vq1-4',
        questionTypeBadge: 'Egyszerű Helyettesítési Érték',
        question: 'Mennyi a 4x - 7 kifejezés helyettesítési értéke, ha x = 5?',
        figure: <EvaluationMachineSvg size={170} />,
        options: ['13', '20', '-13', '27'],
        correctAnswer: 0,
        hint: 'Helyettesíts be x helyére 5-öt: 4 · 5 - 7 = ?',
        explanation: '4 · 5 - 7 = 20 - 7 = 13.'
      },
      {
        id: 'vq1-5',
        questionTypeBadge: 'Szövegből Kifejezés',
        question: 'Melyik algebrai kifejezés írja le azt, hogy: „egy x szám háromszorosánál 8-cal több”?',
        figure: <TextToFormulaSvg size={170} />,
        options: ['3x + 8', '3 · (x + 8)', 'x³ + 8', '8x + 3'],
        correctAnswer: 0,
        hint: 'A háromszoros szorzást jelent (3x), a 8-cal több pedig összeadást (+ 8).',
        explanation: 'A szám háromszorosa: 3x. Ennél 8-cal több: 3x + 8.'
      },
      {
        id: 'vq1-6',
        questionTypeBadge: 'Egynemű Kifejezések',
        question: 'Az alábbi kifejezések közül melyik egynemű az 5a²b kifejezéssel?',
        figure: <LikeTermsBalanceSvg size={170} />,
        options: ['-3a²b', '5ab²', '5a²b²', '3a³b'],
        correctAnswer: 0,
        hint: 'Egynemű kifejezések betűs része (változók és azok kitevői) betűről betűre teljesen megegyezik!',
        explanation: 'Az 5a²b és a -3a²b betűs része mindkettőnél pontosan a²b, így ezek egyneműek és összevonhatók.'
      },
      {
        id: 'vq1-7',
        questionTypeBadge: 'Monom Fokszáma',
        question: 'Hányadfokú a 4x³ monom?',
        options: ['3-ad fokú', '4-ed fokú', '1-ed fokú', '7-ed fokú'],
        correctAnswer: 0,
        hint: 'Egyváltozós monom fokszáma a változó kitevőjével egyenlő.',
        explanation: 'A változó x kitevője 3, így a monom 3-adfokú.'
      },
      {
        id: 'vq1-8',
        questionTypeBadge: 'Kifejezés Értéke Nullánál',
        question: 'Mennyi a 3x² - 5x + 9 kifejezés értéke, ha x = 0?',
        options: ['9', '0', '-5', '3'],
        correctAnswer: 0,
        hint: 'Ha x = 0, akkor minden x-et tartalmazó tag nullává válik.',
        explanation: '3 · 0² - 5 · 0 + 9 = 0 - 0 + 9 = 9. Csak a konstans tag marad meg!'
      },
      {
        id: 'vq1-9',
        questionTypeBadge: 'Polinom Tagjainak Száma',
        question: 'Hány tagból áll a 2x³ - 5x² + 7x - 1 polinom?',
        options: ['4 tagból', '3 tagból', '2 tagból', '1 tagból'],
        correctAnswer: 0,
        hint: 'A tagokat az összeadás és kivonás jelei választják el egymástól.',
        explanation: 'A tagok: 2x³, -5x², 7x és a -1. Ez összesen 4 tag.'
      },
      {
        id: 'vq1-10',
        questionTypeBadge: 'Konstans Tag Meghatározása',
        question: 'Mi a konstans tag a 4x² - 3x + 12 polinomban?',
        options: ['12', '4', '-3', '4x²'],
        correctAnswer: 0,
        hint: 'A konstans tag az a tag, amely nem tartalmaz változót.',
        explanation: 'A +12 az a tag, amelyben nem szerepel betűs ismeretlen, ez a konstans tag.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Helyettesítési Érték és Előjeles Számolás (Közepes)',
    subtitle: 'Negatív számok és törtek behelyettesítése, műveleti sorrend, zárójelezés és előjelcsapdák.',
    range: '11 - 20. feladat',
    focus: 'Előjeles Helyettesítés és Műveleti Sorrend',
    questions: [
      {
        id: 'vq2-1',
        questionTypeBadge: 'Negatív Négyzet Csapda',
        question: 'Mennyi az -x² kifejezés helyettesítési értéke, ha x = -3?',
        options: ['-9', '9', '-6', '6'],
        correctAnswer: 0,
        hint: 'Vigyázz a műveleti sorrendre! -x² azt jelenti: -(x²). Előbb emeld négyzetre a -3-at, majd vedd az ellentettjét!',
        explanation: 'Ha x = -3, akkor (-3)² = 9. Az előtte lévő mínuszjel miatt: -( (-3)² ) = -(9) = -9.'
      },
      {
        id: 'vq2-2',
        questionTypeBadge: 'Másodfokú Kifejezés Értéke',
        question: 'Mennyi a 2x² - 5x + 3 kifejezés értéke, ha x = -2?',
        figure: <EvaluationMachineSvg size={170} />,
        options: ['21', '1', '5', '-15'],
        correctAnswer: 0,
        hint: '2 · (-2)² - 5 · (-2) + 3 = 2 · 4 - (-10) + 3 = ?',
        explanation: '2 · (-2)² = 2 · 4 = 8. -5 · (-2) = +10. Így 8 + 10 + 3 = 21.'
      },
      {
        id: 'vq2-3',
        questionTypeBadge: 'Kétváltozós Helyettesítés',
        question: 'Mennyi a 3a - 2b + 5 kifejezés értéke, ha a = -2 és b = 4?',
        options: ['-9', '7', '-5', '11'],
        correctAnswer: 0,
        hint: '3 · (-2) - 2 · 4 + 5 = -6 - 8 + 5 = ?',
        explanation: '3 · (-2) = -6. -2 · 4 = -8. -6 - 8 + 5 = -14 + 5 = -9.'
      },
      {
        id: 'vq2-4',
        questionTypeBadge: 'Zárójeles Hatványozás',
        question: 'Mennyi a (2x - 1)² kifejezés értéke, ha x = -2?',
        options: ['25', '-25', '9', '-9'],
        correctAnswer: 0,
        hint: 'Először a zárójel belsejét számítsd ki: 2 · (-2) - 1 = -4 - 1 = -5, majd emeld négyzetre!',
        explanation: 'A zárójel értéke: 2 · (-2) - 1 = -4 - 1 = -5. Ennek négyzete: (-5)² = 25.'
      },
      {
        id: 'vq2-5',
        questionTypeBadge: 'Értelmezési Tartomány',
        question: 'Melyik valós számra NEM értelmezhető a (5x - 2) / (x - 3) algebrai törtkifejezés?',
        options: ['x = 3', 'x = 0', 'x = 2/5', 'Minden valós számra értelmezhető'],
        correctAnswer: 0,
        hint: 'A nevező nem lehet egyenlő nullával! x - 3 = 0 mikor teljesül?',
        explanation: 'A tört nevezője x - 3. Mivel nullával nem oszthatunk, x - 3 ≠ 0, azaz x ≠ 3. Tehát x = 3 esetén a kifejezés nem értelmezhető.'
      },
      {
        id: 'vq2-6',
        questionTypeBadge: 'Tört Helyettesítési Érték',
        question: 'Mennyi a 4x² - 2x kifejezés értéke, ha x = 1/2?',
        options: ['0', '1', '2', '-1'],
        correctAnswer: 0,
        hint: '(1/2)² = 1/4. 4 · 1/4 = 1, és 2 · 1/2 = 1.',
        explanation: '4 · (1/2)² - 2 · (1/2) = 4 · (1/4) - 1 = 1 - 1 = 0.'
      },
      {
        id: 'vq2-7',
        questionTypeBadge: 'Szövegből Formula Zárójellel',
        question: 'Melyik kifejezés adja meg „egy számnál 4-gyel nagyobb szám háromszorosát”?',
        options: ['3 · (x + 4)', '3x + 4', 'x + 12', '3 · (x - 4)'],
        correctAnswer: 0,
        hint: 'A számnál 4-gyel nagyobb szám az (x + 4). Ennek a háromszorosa a teljes összeg szorzása 3-mal.',
        explanation: 'Először a 4-gyel nagyobb számot képezzük: (x + 4), majd ezt szorozzuk 3-mal: 3 · (x + 4).'
      },
      {
        id: 'vq2-8',
        questionTypeBadge: 'Többváltozós Szorzat Helyettesítése',
        question: 'Mennyi a -3x²y értéke, ha x = -1 és y = -4?',
        options: ['12', '-12', '36', '-36'],
        correctAnswer: 0,
        hint: 'x² = (-1)² = 1. Ekkor -3 · 1 · (-4) = ?',
        explanation: '-3 · (-1)² · (-4) = -3 · 1 · (-4) = +12 (két negatív szorzata pozitív).'
      },
      {
        id: 'vq2-9',
        questionTypeBadge: 'Műveleti Sorrend és Zárójelek',
        question: 'Mennyi az 5 - 2(3 - x) kifejezés értéke, ha x = 7?',
        options: ['13', '-3', '9', '-12'],
        correctAnswer: 0,
        hint: 'Előbb a zárójel: 3 - 7 = -4. Utána a szorzás: -2 · (-4) = +8.',
        explanation: '5 - 2(3 - 7) = 5 - 2(-4) = 5 - (-8) = 5 + 8 = 13.'
      },
      {
        id: 'vq2-10',
        questionTypeBadge: 'Páros és Páratlan Szám Kifejezése',
        question: 'Hogyan adható meg tetszőleges k egész szám esetén két egymást követő páratlan szám algebrai kifejezéssel?',
        options: ['2k + 1 és 2k + 3', '2k és 2k + 2', 'k és k + 1', '2k - 1 és 2k'],
        correctAnswer: 0,
        hint: 'A páros számok alakja 2k. A páratlan számok ennél 1-gyel és 3-mal nagyobbak (2 különbséggel).',
        explanation: 'Egy páratlan szám mindig felírható 2k + 1 alakban. A következő páratlan szám 2-vel nagyobb: 2k + 1 + 2 = 2k + 3.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Kifejezések Foka, Egynemű Tagok és Szöveges Modellezés (Haladó)',
    subtitle: 'Többváltozós monomok foka, polinom fokszáma, algebrai azonosságok helyettesítése és valós modellezés.',
    range: '21 - 30. feladat',
    focus: 'Összetett Algebra és Modellezés',
    questions: [
      {
        id: 'vq3-1',
        questionTypeBadge: 'Többváltozós Monom Fokszáma',
        question: 'Mi a -4a³b²c monom fokszáma?',
        figure: <MonomialStructureSvg size={170} />,
        options: ['6', '5', '3', '-4'],
        correctAnswer: 0,
        hint: 'Többváltozós monom fokszáma a benne szereplő változók kitevőinek összege. Ne feledd: c = c¹!',
        explanation: 'Az a kitevője 3, a b kitevője 2, a c kitevője 1. Összegük: 3 + 2 + 1 = 6. Tehát a monom 6-odfokú.'
      },
      {
        id: 'vq3-2',
        questionTypeBadge: 'Polinom Fokszámának Meghatározása',
        question: 'Hányadfokú a 7x²y³ - 5x⁴y² + 2x³y polinom?',
        options: ['6-odfokú', '5-ödfokú', '4-edfokú', '12-edfokú'],
        correctAnswer: 0,
        hint: 'Számítsd ki minden tag fokszámát külön-külön! A polinom foka a legnagyobb tag foka.',
        explanation: 'Az 1. tag: 2+3 = 5; a 2. tag: 4+2 = 6; a 3. tag: 3+1 = 4. A legnagyobb tag foka 6, így a polinom 6-odfokú.'
      },
      {
        id: 'vq3-3',
        questionTypeBadge: 'Összetett Helyettesítési Érték',
        question: 'Mennyi a (a³ - b³) / (a - b) kifejezés értéke, ha a = 3 és b = -1?',
        options: ['7', '14', '28', '13'],
        correctAnswer: 0,
        hint: 'a³ = 3³ = 27. b³ = (-1)³ = -1. a - b = 3 - (-1) = 4.',
        explanation: 'Számláló: 27 - (-1) = 28. Nevező: 3 - (-1) = 4. Hányados: 28 / 4 = 7.'
      },
      {
        id: 'vq3-4',
        questionTypeBadge: 'Egynemű Kifejezések Szétválogatása',
        question: 'Melyik két tag NEM vonható össze közvetlenül az alábbiak közül?',
        figure: <LikeTermsBalanceSvg size={170} />,
        options: ['4x²y és 3xy²', '5ab és -2ba', '7x² és -x²', '3a³b² és -a³b²'],
        correctAnswer: 0,
        hint: 'Csak akkor egyneműek, ha a változók kitevői is megegyeznek: x²y ≠ xy²!',
        explanation: 'A 4x²y-ban az x van a négyzeten, a 3xy²-ben pedig az y. Ezek különneműek, nem vonhatók össze.'
      },
      {
        id: 'vq3-5',
        questionTypeBadge: 'Téglalap Modellezése',
        question: 'Egy téglalap egyik oldala a méter, a másik oldala 3 méterrel hosszabb ennél. Melyik kifejezés adja meg a téglalap kerületét (K)?',
        options: ['4a + 6', '2a + 3', 'a² + 3a', '4a + 3'],
        correctAnswer: 0,
        hint: 'A két oldal: a és (a + 3). A kerület: K = 2 · (oldal1 + oldal2).',
        explanation: 'K = 2 · [a + (a + 3)] = 2 · (2a + 3) = 4a + 6.'
      },
      {
        id: 'vq3-6',
        questionTypeBadge: 'Téglalap Terület Modellezése',
        question: 'Egy téglalap egyik oldala a méter, a másik oldala 3 méterrel hosszabb ennél. Melyik kifejezés adja meg a területét (T)?',
        options: ['a² + 3a', '4a + 6', 'a² + 9', '2a + 3'],
        correctAnswer: 0,
        hint: 'A terület a két oldal szorzata: T = a · (a + 3).',
        explanation: 'T = a · (a + 3) = a · a + a · 3 = a² + 3a.'
      },
      {
        id: 'vq3-7',
        questionTypeBadge: 'Kétismeretlenes Szimmetrikus Kifejezés',
        question: 'Mennyi a 2x² - 3xy + 2y² kifejezés értéke, ha x = -2 és y = -2?',
        options: ['4', '20', '-4', '16'],
        correctAnswer: 0,
        hint: 'x² = 4, y² = 4, xy = 4. Ekkor 2 · 4 - 3 · 4 + 2 · 4 = 8 - 12 + 8 = ?',
        explanation: '2 · (-2)² - 3 · (-2) · (-2) + 2 · (-2)² = 2 · 4 - 3 · 4 + 2 · 4 = 8 - 12 + 8 = 4.'
      },
      {
        id: 'vq3-8',
        questionTypeBadge: 'Százalékos Változás Modellezése',
        question: 'Egy termék ára eredetileg x Ft volt, majd az árát 20%-kal felemelték. Melyik kifejezés fejezi ki az új árat?',
        options: ['1,2x', 'x + 20', '0,2x', '1,02x'],
        correctAnswer: 0,
        hint: 'Az eredeti ár 100% (azaz 1x), a 20%-os emelés után 120% lesz, ami tizedestörtben 1,2.',
        explanation: 'Új ár = x + 0,2x = 1,2x.'
      },
      {
        id: 'vq3-9',
        questionTypeBadge: 'Kettős Értelmezési Tartomány Kikötés',
        question: 'Mely x értékekre NEM értelmezhető az 1 / (x · (x + 5)) algebrai tört?',
        options: ['x = 0 és x = -5', 'x = 0 és x = 5', 'Csak x = 0', 'Csak x = -5'],
        correctAnswer: 0,
        hint: 'Egy szorzat akkor 0, ha bármelyik tényezője 0: x = 0 vagy x + 5 = 0.',
        explanation: 'A nevező zérushelyei: x = 0 esetén 0 · 5 = 0, x = -5 esetén -5 · 0 = 0. Mindkettőt ki kell zárni!'
      },
      {
        id: 'vq3-10',
        questionTypeBadge: 'Helyettesítési Értékek Egyenlősége',
        question: 'Melyik x számra lesz az x² - 4 és a 3x kifejezések helyettesítési értéke egyenlő?',
        options: ['x = 4 (és x = -1)', 'x = 2', 'x = 0', 'x = 3'],
        correctAnswer: 0,
        hint: 'Helyettesítsd be az x = 4-et mindkettőbe: 4² - 4 = 12 és 3 · 4 = 12!',
        explanation: 'x = 4 esetén: 4² - 4 = 16 - 4 = 12, és 3 · 4 = 12. Valóban megegyeznek!'
      }
    ]
  }
};

// Gyors puskakártya adatok a kvízhez
const cheatSheetData: CheatSheetCard[] = [
  {
    title: 'Monom (Egytagú)',
    badge: 'Anatómia',
    points: [
      'Együttható: a betűs rész előtti szám (előjellel együtt: -7x³ → -7).',
      'Ha nincs szám: x = 1x (együttható: 1), -x = -1x (együttható: -1).',
      'Fokszám: a változók kitevőinek összege (pl. 5a²b³ foka: 2+3 = 5).'
    ]
  },
  {
    title: 'Polinom (Többtagú)',
    badge: 'Összeg/Különbség',
    points: [
      'Monomok összege vagy különbsége.',
      'Fokszáma: a tagok fokszámai közül a legnagyobb.',
      'Konstans tag: a változó nélküli szám (foka 0).'
    ]
  },
  {
    title: 'Egynemű Tagok',
    badge: 'Összevonás',
    points: [
      'Azonos betűk és azonos kitevők kellenek: 3a²b és 5a²b összevonható (8a²b).',
      'Különböző kitevők NEM vonhatók össze: 3x + 2x² marad 3x + 2x²!',
      'Összeadáskor a kitevő SOHA nem változik meg!'
    ]
  },
  {
    title: 'Helyettesítési Aranyszabály',
    badge: 'Előjelek',
    points: [
      'Negatív szám helyettesítésekor KÖTELEZŐ a zárójel!',
      '(-3)² = 9, de -3² = -9!',
      'Nevezőben a változó nem teheti nullává a nevezőt: É.T. kikötés!'
    ]
  }
];

export const VariablesQuiz: React.FC<VariablesQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="A Betűk Szerepe a Számolásban – Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 szinten a változók, monomok, polinomok és helyettesítési értékek alapos begyakorlására"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 1. TÉMAKÖR"
      themeColor="blue"
      storageKey="grade9-variables-quiz-score"
      levels={quizLevels}
      cheatSheet={cheatSheetData}
      grade={9}
      chapterId="egyenletek-azonossagok"
      topicId="g9-egyenlet-betuk-quiz"
      topicTitle="A betűk szerepe a számolásban"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a kifejezéseket, helyettesítési értékeket és definíciókat!',
          badgeText: '6 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <VariablesMatcher
              key={`variables-matcher-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToSorter={switchToSorter}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító Játék',
          subtitle: 'Kategorizáld a kifejezéseket típus, előjel és egyneműség szerint!',
          badgeText: '11-12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <VariablesSorter
              key={`variables-sorter-${level}`}
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
              onSwitchToQuiz={switchToQuiz}
              onSwitchToMatcher={switchToMatcher}
              onSwitchToTheory={onSwitchToTheory}
            />
          )
        }
      ]}
    />
  );
};
