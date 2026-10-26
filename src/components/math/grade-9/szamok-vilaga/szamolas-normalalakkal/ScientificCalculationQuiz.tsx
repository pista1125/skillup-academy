import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';

interface ScientificCalculationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const questions: QuizQuestion[] = [
  // ==========================================
  // 1. SZINT: ALAPMŰVELETEK NORMÁLALAKBAN (1-10)
  // ==========================================
  {
    id: 'sc-q1',
    level: 1,
    question: 'Mennyi a (2 · 10³) · (3 · 10⁴) szorzat értéke normálalakban?',
    options: ['6 · 10⁷', '6 · 10¹²', '5 · 10⁷', '6 · 10¹'],
    correctAnswer: 0,
    explanation: 'A mantisszák szorzata 2 · 3 = 6, a 10-es hatványok kitevőit összeadjuk: 3 + 4 = 7. Így az eredmény 6 · 10⁷.'
  },
  {
    id: 'sc-q2',
    level: 1,
    question: 'Mennyi a (8 · 10⁹) / (4 · 10³) osztás eredménye normálalakban?',
    options: ['2 · 10⁶', '2 · 10³', '4 · 10⁶', '2 · 10¹²'],
    correctAnswer: 0,
    explanation: 'A mantisszák hányadosa 8 / 4 = 2, a kitevőket kivonjuk: 9 - 3 = 6. Eredmény: 2 · 10⁶.'
  },
  {
    id: 'sc-q3',
    level: 1,
    question: 'Mennyi a (3 · 10⁴) + (5 · 10⁴) összeg értéke?',
    options: ['8 · 10⁴', '8 · 10⁸', '15 · 10⁴', '8 · 10¹⁶'],
    correctAnswer: 0,
    explanation: 'Azonos kitevő (10⁴) esetén kiemelhetünk: (3 + 5) · 10⁴ = 8 · 10⁴. A kitevőket összeadásnál nem adjuk össze!'
  },
  {
    id: 'sc-q4',
    level: 1,
    question: 'Mennyi a (7 · 10⁶) - (2 · 10⁶) különbség értéke?',
    options: ['5 · 10⁶', '5 · 10⁰', '5 · 10¹²', '9 · 10⁶'],
    correctAnswer: 0,
    explanation: 'Azonos kitevő (10⁶) esetén a mantisszákat kivonjuk: (7 - 2) · 10⁶ = 5 · 10⁶.'
  },
  {
    id: 'sc-q5',
    level: 1,
    question: 'Mennyi a (2 · 10⁵)³ hatványozás eredménye normálalakban?',
    options: ['8 · 10¹⁵', '6 · 10¹⁵', '8 · 10⁸', '2 · 10¹⁵'],
    correctAnswer: 0,
    explanation: 'A szorzat hatványozásának szabálya szerint mindkét tényezőt a 3. hatványra emeljük: 2³ · (10⁵)³ = 8 · 10⁵·³ = 8 · 10¹⁵.'
  },
  {
    id: 'sc-q6',
    level: 1,
    question: 'Mennyi a (4 · 10⁻²) · (2 · 10⁻³) szorzat értéke normálalakban?',
    options: ['8 · 10⁻⁵', '8 · 10⁻⁶', '8 · 10¹', '6 · 10⁻⁵'],
    correctAnswer: 0,
    explanation: 'A mantisszák szorzata 4 · 2 = 8. A kitevők összege: (-2) + (-3) = -5. Eredmény: 8 · 10⁻⁵.'
  },
  {
    id: 'sc-q7',
    level: 1,
    question: 'Mennyi a (9 · 10⁻²) / (3 · 10⁻⁵) osztás értéke?',
    options: ['3 · 10³', '3 · 10⁻⁷', '3 · 10⁻³', '27 · 10³'],
    correctAnswer: 0,
    explanation: 'A mantisszák hányadosa 9 / 3 = 3. A kitevők különbsége: (-2) - (-5) = -2 + 5 = 3. Eredmény: 3 · 10³ = 3000.'
  },
  {
    id: 'sc-q8',
    level: 1,
    question: 'Milyen műveletet végzünk a 10-es hatványkitevőkkel szorzáskor: (a · 10ᵏ) · (b · 10ᵐ)?',
    options: [
      'Összeadjuk a kitevőket: k + m',
      'Összeszorozzuk a kitevőket: k · m',
      'Kivonjuk a kitevőket: k - m',
      'A kitevők változatlanok maradnak'
    ],
    correctAnswer: 0,
    explanation: 'Azonos alapú hatványok szorzásakor az alapot a kitevők összegére emeljük: 10ᵏ · 10ᵐ = 10ᵏ⁺ᵐ.'
  },
  {
    id: 'sc-q9',
    level: 1,
    question: 'Milyen műveletet végzünk a kitevőkkel osztáskor: (a · 10ᵏ) / (b · 10ᵐ)?',
    options: [
      'Kivonjuk a nevező kitevőjét a számlálóéból: k - m',
      'Elosztjuk a kitevőket: k / m',
      'Összeadjuk a kitevőket: k + m',
      'Megváltoztatjuk a számláló kitevőjének előjelét'
    ],
    correctAnswer: 0,
    explanation: 'Azonos alapú hatványok osztásakor a kitevőket kivonjuk egymásból: 10ᵏ / 10ᵐ = 10ᵏ⁻ᵐ.'
  },
  {
    id: 'sc-q10',
    level: 1,
    question: 'Melyik tízhatvány tartozik a Mega (M) SI prefixumhoz?',
    options: ['10⁶', '10³', '10⁹', '10⁻⁶'],
    correctAnswer: 0,
    explanation: 'A Mega (M) előtag az egymilliószorost jelenti, ami 10⁶ (pl. 1 MHz = 10⁶ Hz).'
  },

  // ==========================================
  // 2. SZINT: ELTÉRŐ KITEVŐK ÉS UTÓLAGOS KORREKCIÓ (11-20)
  // ==========================================
  {
    id: 'sc-q11',
    level: 2,
    question: 'Mennyi a (4 · 10⁵) · (5 · 10³) szorzat szabályos normálalakja?',
    options: ['2 · 10⁹', '20 · 10⁸', '2 · 10⁸', '9 · 10⁸'],
    correctAnswer: 0,
    explanation: 'A nyers szorzat: (4 · 5) · 10⁵⁺³ = 20 · 10⁸. Mivel 20 ≥ 10, a vesszőt 1-gyel balra toljuk, a kitevő 1-gyel nő: 2 · 10⁹.'
  },
  {
    id: 'sc-q12',
    level: 2,
    question: 'Mennyi a (2 · 10⁷) / (5 · 10²) osztás szabályos normálalakja?',
    options: ['4 · 10⁴', '0,4 · 10⁵', '4 · 10⁵', '1 · 10⁴'],
    correctAnswer: 0,
    explanation: 'A nyers hányados: (2 / 5) · 10⁷⁻² = 0,4 · 10⁵. Mivel 0,4 < 1, a vesszőt 1-gyel jobbra toljuk, a kitevő 1-gyel csökken: 4 · 10⁴.'
  },
  {
    id: 'sc-q13',
    level: 2,
    question: 'Számítsd ki az összeget: 3,2 · 10⁵ + 4,5 · 10⁴!',
    options: ['3,65 · 10⁵', '7,7 · 10⁹', '7,7 · 10⁵', '3,65 · 10⁴'],
    correctAnswer: 0,
    explanation: 'A nagyobb kitevőre (10⁵) hozzuk: 4,5 · 10⁴ = 0,45 · 10⁵. Kiemelve: (3,2 + 0,45) · 10⁵ = 3,65 · 10⁵.'
  },
  {
    id: 'sc-q14',
    level: 2,
    question: 'Számítsd ki a különbséget: 6 · 10⁴ - 8 · 10²!',
    options: ['5,92 · 10⁴', '5,2 · 10⁴', '-2 · 10²', '5,92 · 10²'],
    correctAnswer: 0,
    explanation: 'A 10⁴ közös kitevőre hozva: 8 · 10² = 0,08 · 10⁴. Ekkor: (6 - 0,08) · 10⁴ = 5,92 · 10⁴ (= 59 200).'
  },
  {
    id: 'sc-q15',
    level: 2,
    question: 'Mennyi a (6 · 10⁻⁴) · (7 · 10⁻⁵) szorzat szabályos normálalakja?',
    options: ['4,2 · 10⁻⁸', '42 · 10⁻⁹', '4,2 · 10⁻⁹', '4,2 · 10⁻¹⁰'],
    correctAnswer: 0,
    explanation: 'Nyers szorzat: (6 · 7) · 10⁻⁴⁺⁽⁻⁵⁾ = 42 · 10⁻⁹. Utólagos normálás balra tolva: a kitevő 1-gyel nő: -9 + 1 = -8, így 4,2 · 10⁻⁸.'
  },
  {
    id: 'sc-q16',
    level: 2,
    question: 'Mennyi az (1,5 · 10⁻³) / (6 · 10⁻⁷) osztás szabályos normálalakja?',
    options: ['2,5 · 10³', '0,25 · 10⁴', '2,5 · 10⁴', '2,5 · 10⁻¹⁰'],
    correctAnswer: 0,
    explanation: 'Nyers hányados: (1,5 / 6) · 10⁻³⁻⁽⁻⁷⁾ = 0,25 · 10⁴. Mivel 0,25 < 1, jobbra toljuk a vesszőt: a kitevő 1-gyel csökken: 2,5 · 10³ (= 2500).'
  },
  {
    id: 'sc-q17',
    level: 2,
    question: 'Mennyi 45 nm (nanométer) méterben felírva szabályos normálalakban?',
    options: ['4,5 · 10⁻⁸ m', '45 · 10⁻⁹ m', '4,5 · 10⁻¹⁰ m', '4,5 · 10⁻⁶ m'],
    correctAnswer: 0,
    explanation: 'A nano prefixum 10⁻⁹-et jelent: 45 nm = 45 · 10⁻⁹ m. Szabályos normálalakra hozva: 4,5 · 10⁻⁸ m.'
  },
  {
    id: 'sc-q18',
    level: 2,
    question: 'Hány bájtot (B) jelent egy 2 TB-os merevlemez SI prefixum szerint?',
    options: ['2 · 10¹² B', '2 · 10⁹ B', '2 · 10⁶ B', '2 · 10¹⁵ B'],
    correctAnswer: 0,
    explanation: 'A Tera (T) prefixum a tízhatványos SI rendszerben 10¹² (egybillió), tehát 2 TB = 2 · 10¹² B.'
  },
  {
    id: 'sc-q19',
    level: 2,
    question: 'Hány négyzetméter (m²) a területe egy 1,5 km²-es területnek?',
    options: ['1,5 · 10⁶ m²', '1,5 · 10³ m²', '1,5 · 10⁹ m²', '1500 m²'],
    correctAnswer: 0,
    explanation: '1 km = 10³ m, ezért 1 km² = (10³ m)² = 10⁶ m². Így 1,5 km² = 1,5 · 10⁶ m² (= 1 500 000 m²).'
  },
  {
    id: 'sc-q20',
    level: 2,
    question: 'Miért ad hibás eredményt a számológép, ha a (6 · 10⁸) / (2 · 10³) osztást 6*10^8 / 2*10^3 alakban írjuk be?',
    options: [
      'Mert balról jobbra haladva előbb oszt 2-vel, majd az eredményt megszorozza 10³-nal',
      'Mert a számológép nem tud 10-es hatványokat kezelni zárójel nélkül',
      'Mert a hatványozás prioritása kisebb, mint az osztásé',
      'Mert a számlálót is automatikusan négyzetre emeli'
    ],
    correctAnswer: 0,
    explanation: 'Az azonos prioritású műveleteket a számológép balról jobbra végzi el: (6 · 10⁸ / 2) · 10³ = 3 · 10¹¹, holott a nevezőt egyben kellene osztani (helyes: 3 · 10⁵).'
  },

  // ==========================================
  // 3. SZINT: ÉRETTSÉGI ÉS TERMÉSZETTUDOMÁNYOS ALKALMAZÁSOK (21-30)
  // ==========================================
  {
    id: 'sc-q21',
    level: 3,
    question: 'A fénysebesség c ≈ 3 · 10⁸ m/s. Mekkora távolságot tesz meg a fény 1 óra (3,6 · 10³ s) alatt?',
    options: ['1,08 · 10¹² m', '10,8 · 10¹¹ m', '1,08 · 10¹¹ m', '1,2 · 10¹² m'],
    correctAnswer: 0,
    explanation: 's = v · t = (3 · 10⁸ m/s) · (3,6 · 10³ s) = 10,8 · 10¹¹ m = 1,08 · 10¹² m (= 1,08 milliárd km).'
  },
  {
    id: 'sc-q22',
    level: 3,
    question: 'Egy fényév a fény által 1 év alatt megtett út (1 év ≈ 3,15 · 10⁷ s, c ≈ 3 · 10⁸ m/s). Mennyi ez méterben?',
    options: ['≈ 9,45 · 10¹⁵ m', '≈ 9,45 · 10¹² m', '≈ 6,15 · 10¹⁵ m', '≈ 9,45 · 10¹⁸ m'],
    correctAnswer: 0,
    explanation: 's = c · t = (3 · 10⁸) · (3,15 · 10⁷) = 9,45 · 10¹⁵ m (kb. 9,46 billió km).'
  },
  {
    id: 'sc-q23',
    level: 3,
    question: 'A Föld tömege 5,97 · 10²⁴ kg, a Hold tömege 7,35 · 10²² kg. Hányszor nehezebb a Föld a Holdnál (két tizedesre)?',
    options: ['kb. 81,22-szer', 'kb. 8,12-szer', 'kb. 812,2-szer', 'kb. 12,3-szer'],
    correctAnswer: 0,
    explanation: '(5,97 · 10²⁴) / (7,35 · 10²²) = (5,97 / 7,35) · 10² ≈ 0,8122 · 100 ≈ 81,22-szer.'
  },
  {
    id: 'sc-q24',
    level: 3,
    question: 'Egy 0,1 mm vastag papírlapot gondolatban 50-szer félbehajtunk (2⁵⁰ ≈ 1,126 · 10¹⁵). Mekkora vastagságot kapunk kilométerben?',
    options: ['≈ 1,13 · 10⁸ km', '≈ 1,13 · 10⁵ km', '≈ 113 km', '≈ 1,13 · 10¹² km'],
    correctAnswer: 0,
    explanation: 'Vastagság = 0,1 mm · 1,126 · 10¹⁵ = 1,126 · 10¹⁴ mm = 1,126 · 10¹¹ m ≈ 1,13 · 10⁸ km (ez csaknem a Föld-Nap távolság!).'
  },
  {
    id: 'sc-q25',
    level: 3,
    question: '12 g szénben 6 · 10²³ atom található (Avogadro-szám). Mekkora egyetlen szénatom tömege grammban?',
    options: ['2 · 10⁻²³ g', '2 · 10⁻²⁴ g', '7,2 · 10²⁴ g', '0,5 · 10⁻²³ g'],
    correctAnswer: 0,
    explanation: 'm = 12 g / (6 · 10²³) = 2 · 10⁻²³ g.'
  },
  {
    id: 'sc-q26',
    level: 3,
    question: 'Számítsd ki a kifejezés értékét: [(4 · 10⁶) · (3 · 10⁻²)] / (2 · 10⁸)!',
    options: ['6 · 10⁻⁴', '6 · 10⁴', '6 · 10⁻¹²', '1,2 · 10⁻⁴'],
    correctAnswer: 0,
    explanation: 'A számláló: (4 · 3) · 10⁶⁺⁽⁻²⁾ = 12 · 10⁴. Az osztás: (12 · 10⁴) / (2 · 10⁸) = 6 · 10⁴⁻⁸ = 6 · 10⁻⁴.'
  },
  {
    id: 'sc-q27',
    level: 3,
    question: 'Egy baktérium hossza 2 µm (2 · 10⁻⁶ m). Hány darab ilyen baktérium fér el egy 1 cm (10⁻² m) hosszú vonalon?',
    options: ['5000 db', '500 db', '50 000 db', '2000 db'],
    correctAnswer: 0,
    explanation: 'Darabszám = (10⁻² m) / (2 · 10⁻⁶ m) = (1 / 2) · 10⁻²⁻⁽⁻⁶⁾ = 0,5 · 10⁴ = 5000 db.'
  },
  {
    id: 'sc-q28',
    level: 3,
    question: 'Ha A = 3 · 10⁵ és B = 2 · 10⁴, akkor mennyi az (A + B) / (A - B) tört pontos egyszerűsített tört alakja?',
    options: ['8 / 7', '5 / 1', '1 / 2', '16 / 15'],
    correctAnswer: 0,
    explanation: 'A = 30 · 10⁴. Ekkor A + B = 32 · 10⁴ és A - B = 28 · 10⁴. Hányadosuk: (32 · 10⁴) / (28 · 10⁴) = 32 / 28 = 8 / 7.'
  },
  {
    id: 'sc-q29',
    level: 3,
    question: 'Mennyi a √(9 · 10¹⁶) négyzetgyök értéke szabályos normálalakban?',
    options: ['3 · 10⁸', '3 · 10⁴', '4,5 · 10⁸', '9 · 10⁸'],
    correctAnswer: 0,
    explanation: 'A szorzat négyzetgyöke a tényezők gyökének szorzata: √9 · √(10¹⁶) = 3 · 10¹⁶/² = 3 · 10⁸.'
  },
  {
    id: 'sc-q30',
    level: 3,
    question: 'Mennyi a √(4 · 10⁻⁶) négyzetgyök értéke szabályos normálalakban?',
    options: ['2 · 10⁻³', '2 · 10⁻⁶', '0,2 · 10⁻²', '2 · 10⁻¹²'],
    correctAnswer: 0,
    explanation: '√4 · √(10⁻⁶) = 2 · 10⁻⁶/² = 2 · 10⁻³ (= 0,002).'
  }
];

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'Szorzás és Osztás Képlete',
    category: 'Műveletek',
    content: '(a · 10ᵏ) · (b · 10ᵐ) = (a · b) · 10ᵏ⁺ᵐ\n(a · 10ᵏ) / (b · 10ᵐ) = (a / b) · 10ᵏ⁻ᵐ\nUtólagos normálás: ha az új mantissza nem esik az [1; 10) sávba, a tizedesvessző léptetésével korrigáljuk a kitevőt!'
  },
  {
    title: 'Összeadás és Kivonás Szabálya',
    category: 'Közös Kitevő',
    content: 'Csak azonos 10-es hatványkitevő mellett emelhetünk ki!\nÁltalános lépés: hozzuk mindkét számot a nagyobb kitevőre, majd végezzük el a mantisszák összeadását/kivonását.'
  },
  {
    title: 'SI Prefixumok Hatványai',
    category: 'Mértékegységek',
    content: 'Tera (T): 10¹² | Giga (G): 10⁹ | Mega (M): 10⁶ | kilo (k): 10³\nmilli (m): 10⁻³ | mikro (µ): 10⁻⁶ | nano (n): 10⁻⁹ | piko (p): 10⁻¹²\nTerület: (10³)² = 10⁶ | Térfogat: (10³)³ = 10⁹'
  },
  {
    title: 'Számológépes Csapda',
    category: 'Eszközhasználat',
    content: 'Osztáskor a nevezőt MINDIG zárójelbe kell tenni, különben a gép oszt a számmal, majd megszorozza a hatvánnyal:\nHelyes: (a · 10ᵏ) / (b · 10ᵐ) vagy az EXP / EE gomb használata!'
  }
];

export const ScientificCalculationQuiz: React.FC<ScientificCalculationQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      topicId="g9-szamok-szamolas-normalalak-quiz"
      topicTitle="Számolás normálalakkal"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="amber"
    />
  );
};

export default ScientificCalculationQuiz;
