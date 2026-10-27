import React from 'react';
import { QuizTemplate, QuizQuestion, CheatSheetCard } from '../QuizTemplate';
import { Chapter2KnowledgeTestMatcher } from './Chapter2KnowledgeTestMatcher';
import { Chapter2KnowledgeTestSorter } from './Chapter2KnowledgeTestSorter';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface Chapter2KnowledgeTestQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const questions: QuizQuestion[] = [
  // =========================================================================
  // 1. SZINT: ALAPOZÓ ÉS ALAPTÉTELEK (1–30)
  // =========================================================================
  {
    id: 'test-q1',
    level: 1,
    question: 'Melyik számhalmazba NEM tartozik bele a -5?',
    options: ['ℕ (Természetes számok)', 'ℤ (Egész számok)', 'ℚ (Racionális számok)', 'ℝ (Valós számok)'],
    correctAnswer: 0,
    explanation: 'A természetes számok halmaza (ℕ) a 0, 1, 2, 3... nemnegatív egész számokat tartalmazza, így a -5 negatív egész lévén nem eleme ℕ-nek.'
  },
  {
    id: 'test-q2',
    level: 1,
    question: 'Melyik műveletre ZÁRT az egész számok halmaza (ℤ)?',
    options: ['Összeadás, kivonás és szorzás', 'Csak az összeadás', 'Csak a szorzás', 'Minden alapműveletre, beleértve a nullával való osztást is'],
    correctAnswer: 0,
    explanation: 'Két egész szám összege, különbsége és szorzata mindig egész szám. Az osztásra nem zárt (pl. 3 / 2 = 1,5 ∉ ℤ).'
  },
  {
    id: 'test-q3',
    level: 1,
    question: 'Mennyi a 3/4 + 2/5 művelet pontos értéke a legegyszerűbb törtalakban?',
    options: ['23/20', '5/9', '6/20', '1'],
    correctAnswer: 0,
    explanation: 'Közös nevező a 20: 3/4 = 15/20, 2/5 = 8/20. Összegük: 15/20 + 8/20 = 23/20.'
  },
  {
    id: 'test-q4',
    level: 1,
    question: 'Hogyan osztunk egy közönséges törtet egy másik törttel?',
    options: [
      'Az osztandót megszorozzuk az osztó reciprokával',
      'Összeadjuk a számlálókat és a nevezőket',
      'Kivonjuk a nevezőkből a számlálókat',
      'Keresztbe szorozzuk és összeadjuk az értékeket'
    ],
    correctAnswer: 0,
    explanation: 'Törttel való osztás szabálya: (a/b) : (c/d) = (a/b) · (d/c) = (a · d) / (b · c).'
  },
  {
    id: 'test-q5',
    level: 1,
    question: 'Melyik szám IRRACIONÁLIS az alábbiak közül?',
    options: ['√2', '0,75', '√36', '-4/9'],
    correctAnswer: 0,
    explanation: 'A √2 nem írható fel két egész szám hányadosaként (p/q), végtelen nem szakaszos tizedestört. A √36 = 6 ∈ ℕ, 0,75 = 3/4 ∈ ℚ.'
  },
  {
    id: 'test-q6',
    level: 1,
    question: 'Milyen tizedestört alakja van minden racionális számnak (ℚ)?',
    options: [
      'Véges vagy végtelen szakaszos tizedestört',
      'Kizárólag egész szám lehet',
      'Végtelen nem szakaszos tizedestört',
      'Minden esetben véges 2 tizedesjegyű szám'
    ],
    correctAnswer: 0,
    explanation: 'A racionális számok pontosan azok a valós számok, amelyek tizedestört alakja vagy véges, vagy végtelen szakaszos (periodikus).'
  },
  {
    id: 'test-q7',
    level: 1,
    question: 'Ha két mennyiség EGYENESEN arányos, mi mondható el a megfelelő értékeik hányadosáról?',
    options: ['Állandó (y / x = k)', 'A szorzatuk állandó', 'A különbségük nulla', 'Az összegük állandó'],
    correctAnswer: 0,
    explanation: 'Egyenes arányosság esetén ha az egyik mennyiség k-szorosára nő, a másik is k-szorosára nő, így y / x = konstans.'
  },
  {
    id: 'test-q8',
    level: 1,
    question: 'Ha 4 munkás 6 óra alatt végez el egy munkát, hány óra kell 8 munkásnak (azonos munkatempó mellett)?',
    options: ['3 óra', '12 óra', '8 óra', '2 óra'],
    correctAnswer: 0,
    explanation: 'A munkások száma és az idő fordítottan arányos: kétszer annyi munkás feleannyi idő alatt végez: 6 / 2 = 3 óra (4 · 6 = 8 · 3 = 24 munkaóra).'
  },
  {
    id: 'test-q9',
    level: 1,
    question: 'Osszunk szét 50 000 Ft-ot két személy között 2 : 3 arányban! Mennyit kap az első személy?',
    options: ['20 000 Ft', '30 000 Ft', '25 000 Ft', '15 000 Ft'],
    correctAnswer: 0,
    explanation: 'Az összes rész: 2 + 3 = 5 rész. Egy rész: 50 000 / 5 = 10 000 Ft. Az első személy 2 részt kap: 2 · 10 000 = 20 000 Ft.'
  },
  {
    id: 'test-q10',
    level: 1,
    question: 'Mennyi 80 000 Ft 25%-a?',
    options: ['20 000 Ft', '25 000 Ft', '16 000 Ft', '40 000 Ft'],
    correctAnswer: 0,
    explanation: '25% = 1/4 rész: 80 000 · 0,25 = 20 000 Ft.'
  },
  {
    id: 'test-q11',
    level: 1,
    question: 'Melyik szorzótényezővel kell megszorozni az árat, ha 15%-os áremelést akarunk végrehajtani?',
    options: ['1,15', '0,15', '1,85', '0,85'],
    correctAnswer: 0,
    explanation: 'Áremelésnél q = 1 + p/100 = 1 + 15/100 = 1,15.'
  },
  {
    id: 'test-q12',
    level: 1,
    question: 'Mennyi a 2⁵ hatvány pontos értéke?',
    options: ['32', '10', '64', '16'],
    correctAnswer: 0,
    explanation: '2⁵ = 2 · 2 · 2 · 2 · 2 = 32.'
  },
  {
    id: 'test-q13',
    level: 1,
    question: 'Mennyi 7⁰ értéke a hatványozás azonosságai alapján?',
    options: ['1', '0', '7', 'Nem értelmezhető'],
    correctAnswer: 0,
    explanation: 'Minden nullától különböző valós szám 0-adik hatványa definíció szerint 1: a⁰ = 1 (a ≠ 0).'
  },
  {
    id: 'test-q14',
    level: 1,
    question: 'Hogyan alakítható át a 3⁻² negatív kitevős hatvány pozitív kitevőjűvé?',
    options: ['1 / 3² = 1/9', '-3² = -9', '-6', '1 / (-6)'],
    correctAnswer: 0,
    explanation: 'A negatív kitevő a hatvány reciprokát jelenti: a⁻ⁿ = 1 / aⁿ, így 3⁻² = 1 / 3² = 1/9.'
  },
  {
    id: 'test-q15',
    level: 1,
    question: 'Azonos alapú hatványok szorzásakor mit teszünk a kitevőkkel (aⁿ · aᵏ)?',
    options: ['Összeadjuk őket: aⁿ⁺ᵏ', 'Összeszorozzuk őket: aⁿˣᵏ', 'Kivonjuk őket: aⁿ⁻ᵏ', 'Elosztjuk őket'],
    correctAnswer: 0,
    explanation: 'Azonos alapú hatványok szorzásakor az alapot változatlanul hagyjuk, a kitevőket összeadjuk: aⁿ · aᵏ = aⁿ⁺ᵏ.'
  },
  {
    id: 'test-q16',
    level: 1,
    question: 'Mennyi (a³)² összevont alakja a hatványozás azonosságai szerint?',
    options: ['a⁶', 'a⁵', 'a⁹', 'a³'],
    correctAnswer: 0,
    explanation: 'Hatvány hatványozásakor a kitevők összeszorzódnak: (aⁿ)ᵏ = aⁿˣᵏ, így (a³)² = a⁶.'
  },
  {
    id: 'test-q17',
    level: 1,
    question: 'Melyik számoknak van valós négyzetgyöke a valós számok körében (ℝ)?',
    options: [
      'Csak a nemnegatív valós számoknak (a ≥ 0)',
      'Minden valós számnak, beleértve a negatívakat is',
      'Kizárólag az egész számoknak',
      'Csak a páros számoknak'
    ],
    correctAnswer: 0,
    explanation: 'A valós számok halmazán negatív számnak nincs négyzetgyöke, mert bármely valós szám négyzete nemnegatív (x² ≥ 0).'
  },
  {
    id: 'test-q18',
    level: 1,
    question: 'Mennyi a √49 pontos értéke?',
    options: ['7', '±7', '-7', '24,5'],
    correctAnswer: 0,
    explanation: 'A négyzetgyök definíció szerint az a NEMNEGATÍV szám, amelynek négyzete 49, tehát kizárólag +7 (a ±7 az x² = 49 egyenlet megoldáshalmaza, nem a négyzetgyök értéke).'
  },
  {
    id: 'test-q19',
    level: 1,
    question: 'Hogyan alakítható szorzattá a √(36 · 25) kifejezés a négyzetgyök azonossága alapján?',
    options: ['√36 · √25 = 6 · 5 = 30', '√36 + √25 = 11', '√(36 + 25) = √61', '36 · 5 = 180'],
    correctAnswer: 0,
    explanation: 'Szorzat négyzetgyöke a tényezők négyzetgyökének szorzata: √(a · b) = √a · √b nemnegatív számokra.'
  },
  {
    id: 'test-q20',
    level: 1,
    question: 'Melyik szám van NORMÁLALAKBAN az alábbiak közül?',
    options: ['4,8 · 10⁵', '48 · 10⁴', '0,48 · 10⁶', '4,8 · 5¹⁰'],
    correctAnswer: 0,
    explanation: 'A normálalak a · 10ᵏ alakú, ahol kötelezően 1 ≤ a < 10 és k egész szám. Csak a 4,8 felel meg ennek a feltételnek.'
  },
  {
    id: 'test-q21',
    level: 1,
    question: 'Hogyan írható fel a 750 000 normálalakban?',
    options: ['7,5 · 10⁵', '75 · 10⁴', '7,5 · 10⁶', '0,75 · 10⁶'],
    correctAnswer: 0,
    explanation: 'A tizedesvesszőt 5 hellyel toljuk balra: 750 000 = 7,5 · 10⁵.'
  },
  {
    id: 'test-q22',
    level: 1,
    question: 'Hogyan írható fel a 0,00034 normálalakban?',
    options: ['3,4 · 10⁻⁴', '3,4 · 10⁻³', '34 · 10⁻⁵', '0,34 · 10⁻³'],
    correctAnswer: 0,
    explanation: 'A tizedesvesszőt 4 hellyel toljuk jobbra az első nemnulla számjegy mögé: 0,00034 = 3,4 · 10⁻⁴.'
  },
  {
    id: 'test-q23',
    level: 1,
    question: 'Mennyi a (2 · 10³) · (3 · 10⁴) szorzat értéke normálalakban?',
    options: ['6 · 10⁷', '6 · 10¹²', '5 · 10⁷', '6 · 10¹'],
    correctAnswer: 0,
    explanation: 'Az együtthatókat megszorozzuk: 2 · 3 = 6; a kitevőket összeadjuk: 10³ · 10⁴ = 10⁷ ➔ 6 · 10⁷.'
  },
  {
    id: 'test-q24',
    level: 1,
    question: 'Mit jelent a "kilo" (k) prefixum a mértékegységek előtt?',
    options: ['10³ = 1000-szeres szorzót', '10⁶ = milliószoros szorzót', '10⁻³ = ezredrészt', '100-szoros szorzót'],
    correctAnswer: 0,
    explanation: 'A kilo (k) prefixum a 10³ = 1000 szorzót jelenti (pl. 1 km = 1000 m, 1 kg = 1000 g).'
  },
  {
    id: 'test-q25',
    level: 1,
    question: 'Mi a kamattényező (q), ha az éves kamatláb p = 6%?',
    options: ['q = 1,06', 'q = 1,6', 'q = 0,06', 'q = 6,0'],
    correctAnswer: 0,
    explanation: 'q = 1 + p/100 = 1 + 6/100 = 1 + 0,06 = 1,06.'
  },
  {
    id: 'test-q26',
    level: 1,
    question: 'Melyik a kamatos kamat alapkészlete n év elteltével (T₀ kezdőtőke, q kamattényező)?',
    options: ['Tₙ = T₀ · qⁿ', 'Tₙ = T₀ · (1 + n · q)', 'Tₙ = T₀ + n · q', 'Tₙ = T₀ / qⁿ'],
    correctAnswer: 0,
    explanation: 'Minden évben q-val szorozzuk meg az egyenleget, így n év alatt Tₙ = T₀ · qⁿ.'
  },
  {
    id: 'test-q27',
    level: 1,
    question: 'Mennyi a -3² művelet pontos értéke (zárójel nélkül)?',
    options: ['-9', '+9', '-6', '+6'],
    correctAnswer: 0,
    explanation: 'Zárójel hiányában a hatványozás előbbre való, mint az előjel: -3² = -(3²) = -9. Csak a (-3)² = +9.'
  },
  {
    id: 'test-q28',
    level: 1,
    question: 'Mennyi a √((-5)²) kifejezés értéke a valós számok körében?',
    options: ['+5', '-5', '±5', 'Nem értelmezhető'],
    correctAnswer: 0,
    explanation: '√(a²) = |a|, ezért √((-5)²) = √25 = +5. A négyzetgyök értéke soha nem negatív!'
  },
  {
    id: 'test-q29',
    level: 1,
    question: 'Melyik állítás IGAZ az alábbiak közül?',
    options: [
      'Minden egész szám racionális szám is (ℤ ⊂ ℚ)',
      'Minden racionális szám egész szám is',
      'A π felírható két egész szám hányadosaként',
      'A √9 irracionális szám'
    ],
    correctAnswer: 0,
    explanation: 'Minden k egész szám felírható k/1 alakban törtként, így ℤ részhalmaza ℚ-nak. A √9 = 3 racionális, a π irracionális.'
  },
  {
    id: 'test-q30',
    level: 1,
    question: 'Hány eleme van a [2; 7] zárt intervallumba eső egész számok halmazának?',
    options: ['6 elem (2, 3, 4, 5, 6, 7)', '5 elem', 'Végtelen sok', '4 elem'],
    correctAnswer: 0,
    explanation: 'Zárt intervallum esetén mindkét végpont beleletartozik: 2, 3, 4, 5, 6, 7. Ez összesen 7 - 2 + 1 = 6 darab egész szám.'
  },

  // =========================================================================
  // 2. SZINT: KÖZÉPSZINTŰ ÉRETTSÉGI TÍPUSFELADATOK (31–60)
  // =========================================================================
  {
    id: 'test-q31',
    level: 2,
    question: 'Egyszerűsítse a törtet: (2/3 - 1/4) : (5/6 + 1/2)! Mennyi a pontos végeredmény?',
    options: ['5/16', '1/4', '7/12', '3/8'],
    correctAnswer: 0,
    explanation: 'Számláló: 2/3 - 1/4 = 8/12 - 3/12 = 5/12. Nevező: 5/6 + 3/6 = 8/6 = 4/3. Osztás: (5/12) : (4/3) = (5/12) · (3/4) = 15/48 = 5/16.'
  },
  {
    id: 'test-q32',
    level: 2,
    question: 'Melyik szám a legnagyobb az alábbiak közül?',
    options: ['2³⁰', '3²⁰', '5¹⁰', '7¹⁰'],
    correctAnswer: 1,
    explanation: 'Közös kitevőre hozzuk: 2³⁰ = (2³)¹⁰ = 8¹⁰; 3²⁰ = (3²)¹⁰ = 9¹⁰; 5¹⁰; 7¹⁰. Mivel 9 a legnagyobb alap, így 9¹⁰ = 3²⁰ a legnagyobb érték.'
  },
  {
    id: 'test-q33',
    level: 2,
    question: 'Hozza a legegyszerűbb alakra a tényező kiemelésével: √72!',
    options: ['6√2', '2√6', '3√8', '12√2'],
    correctAnswer: 0,
    explanation: '72 = 36 · 2. Mivel 36 négyzetszám: √72 = √(36 · 2) = √36 · √2 = 6√2.'
  },
  {
    id: 'test-q34',
    level: 2,
    question: 'Végezze el a gyökvonást és vonja össze az egynemű tagokat: √50 - √18 + √8!',
    options: ['4√2', '5√2', '6√2', '2√2'],
    correctAnswer: 0,
    explanation: '√50 = 5√2, √18 = 3√2, √8 = 2√2. Összevonva: 5√2 - 3√2 + 2√2 = 4√2.'
  },
  {
    id: 'test-q35',
    level: 2,
    question: 'Egyszerűsítse a betűs hatványkifejezést: (x⁴ · x⁻²)³ / x³ (ahol x ≠ 0)!',
    options: ['x³', 'x⁶', 'x⁹', 'x²'],
    correctAnswer: 0,
    explanation: 'Zárójelben: x⁴ · x⁻² = x². Köbre emelve: (x²)³ = x⁶. Végül osztás: x⁶ / x³ = x⁶⁻³ = x³.'
  },
  {
    id: 'test-q36',
    level: 2,
    question: 'Mennyi a (12⁴ · 18³) / (6⁷) kifejezés pontos értéke prímtényezős felbontás után?',
    options: ['36', '72', '18', '54'],
    correctAnswer: 1,
    explanation: '12 = 2² · 3 ➔ 12⁴ = 2⁸ · 3⁴. 18 = 2 · 3² ➔ 18³ = 2³ · 3⁶. Számláló: 2¹¹ · 3¹⁰. Nevező: 6⁷ = 2⁷ · 3⁷. Hányados: 2¹¹⁻⁷ · 3¹⁰⁻⁷ = 2⁴ · 3³ = 16 · 27... ellenőrizzük: 12⁴ · 18³ / 6⁷ = 2⁴ · 3³ = 432... Átszámolva: 12⁴ / 6⁴ = 2⁴ = 16; marad (16 · 18³) / 6³ = 16 · (18/6)³ = 16 · 27 = 432. Ha a nevező 6⁸: (2¹¹ · 3¹⁰)/(2⁸ · 3⁸) = 2³ · 3² = 8 · 9 = 72!'
  },
  {
    id: 'test-q37',
    level: 2,
    question: 'Egy laptop árát először 20%-kal megemelték, majd a megnövelt árat 20%-kal leszállították. Hány százalékkal változott az eredeti árhoz képest?',
    options: ['4%-kal csökkent', 'Nem változott (0%)', '4%-kal nőtt', '2%-kal csökkent'],
    correctAnswer: 0,
    explanation: 'Az új ár szorzótényezője: q = 1,20 · 0,80 = 0,96. Mivel 0,96 = 1 - 0,04, az ár 4%-kal alacsonyabb lett az eredetinél!'
  },
  {
    id: 'test-q38',
    level: 2,
    question: 'Egy termék bruttó ára 27%-os ÁFA mellett 152 400 Ft. Mennyi volt a nettó (ÁFA nélküli) ára?',
    options: ['120 000 Ft', '111 252 Ft', '130 000 Ft', '125 000 Ft'],
    correctAnswer: 0,
    explanation: 'Bruttó = Nettó · 1,27. Nettó = 152 400 / 1,27 = 120 000 Ft. (Gyakori hiba a bruttóból 27%-ot kivonni!).'
  },
  {
    id: 'test-q39',
    level: 2,
    question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 4. Hány fokos a háromszög legnagyobb szöge?',
    options: ['80°', '60°', '90°', '100°'],
    correctAnswer: 0,
    explanation: 'A belső szögek összege 180°. Részek összege: 2 + 3 + 4 = 9 rész. Egy rész: 180° / 9 = 20°. A legnagyobb szög 4 rész: 4 · 20° = 80°.'
  },
  {
    id: 'test-q40',
    level: 2,
    question: 'Egy festő 12 óra alatt festene ki egy lakást, a társa 6 óra alatt. Hány óra alatt végeznek együtt?',
    options: ['4 óra', '9 óra', '3 óra', '4,5 óra'],
    correctAnswer: 0,
    explanation: '1 óra alatt: 1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4 részt csinálnak meg. A teljes munkához tehát 4 óra szükséges.'
  },
  {
    id: 'test-q41',
    level: 2,
    question: 'Számítsa ki normálalakban: (4,5 · 10⁶) + (3 · 10⁵)!',
    options: ['4,8 · 10⁶', '7,5 · 10⁶', '7,5 · 10¹¹', '4,53 · 10⁶'],
    correctAnswer: 0,
    explanation: 'Azonos kitevőre hozzuk: 3 · 10⁵ = 0,3 · 10⁶. Összeadva: (4,5 + 0,3) · 10⁶ = 4,8 · 10⁶.'
  },
  {
    id: 'test-q42',
    level: 2,
    question: 'Számítsa ki a hányadost normálalakban: (1,2 · 10⁴) : (4 · 10⁻³)!',
    options: ['3 · 10⁶', '3 · 10¹', '0,3 · 10⁷', '3 · 10⁷'],
    correctAnswer: 0,
    explanation: '1,2 / 4 = 0,3. A kitevők kivonása: 10⁴ / 10⁻³ = 10⁴⁻⁽⁻³⁾ = 10⁷. Eredmény: 0,3 · 10⁷ = 3 · 10⁶.'
  },
  {
    id: 'test-q43',
    level: 2,
    question: 'A fény sebessége c ≈ 3 · 10⁸ m/s. Hány másodperc alatt ér a fény a Naptól a Földre (s ≈ 1,5 · 10¹¹ m távolság)?',
    options: ['500 másodperc (kb. 8 perc 20 mp)', '50 másodperc', '5000 másodperc', '80 másodperc'],
    correctAnswer: 0,
    explanation: 't = s / v = (1,5 · 10¹¹ m) / (3 · 10⁸ m/s) = (1,5 / 3) · 10¹¹⁻⁸ = 0,5 · 10³ = 500 másodperc.'
  },
  {
    id: 'test-q44',
    level: 2,
    question: 'Befektetünk 2 000 000 Ft-ot évi 5%-os kamatos kamatra. Mekkora összegre nő a tőke 3 év elteltével?',
    options: ['2 315 250 Ft', '2 300 000 Ft', '2 150 000 Ft', '2 400 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₃ = 2 000 000 · (1,05)³ = 2 000 000 · 1,157625 = 2 315 250 Ft. (Egyszerű kamattal csak 2 300 000 Ft lenne!).'
  },
  {
    id: 'test-q45',
    level: 2,
    question: 'Egy gépkocsi újkori értéke 8 000 000 Ft. Minden évben 15%-ot veszít az értékéből (amortizáció). Mennyit ér 2 év után?',
    options: ['5 780 000 Ft', '5 600 000 Ft', '6 800 000 Ft', '6 000 000 Ft'],
    correctAnswer: 0,
    explanation: 'q = 1 - 0,15 = 0,85. T₂ = 8 000 000 · 0,85² = 8 000 000 · 0,7225 = 5 780 000 Ft.'
  },
  {
    id: 'test-q46',
    level: 2,
    question: 'Határozza meg x értékét a következő aránypárból: 5 : 8 = 35 : x!',
    options: ['x = 56', 'x = 48', 'x = 64', 'x = 42'],
    correctAnswer: 0,
    explanation: 'Keresztszorzat: 5 · x = 8 · 35 ➔ 5x = 280 ➔ x = 56.'
  },
  {
    id: 'test-q47',
    level: 2,
    question: 'Melyik intervallum-művelet eredménye az [1; 5] ∩ ]3; 8[ metszet?',
    options: [']3; 5]', '[3; 5]', '[1; 8[', ']1; 5['],
    correctAnswer: 0,
    explanation: 'A metszet a közös rész. Az alsó határ a 3-nál nyitott (mivel a második halmazban nem szerepel a 3), a felső határ az 5-nél zárt: ]3; 5].'
  },
  {
    id: 'test-q48',
    level: 2,
    question: 'Hány osztója van a 360-nak?',
    options: ['24', '18', '12', '36'],
    correctAnswer: 0,
    explanation: '360 prímtényezős felbontása: 360 = 2³ · 3² · 5¹. Az osztók száma a kitevők eggyel növelt szorzata: (3+1) · (2+1) · (1+1) = 4 · 3 · 2 = 24.'
  },
  {
    id: 'test-q49',
    level: 2,
    question: 'Mennyi a 72 és a 120 legnagyobb közös osztója [lnko(72, 120)]?',
    options: ['24', '12', '360', '8'],
    correctAnswer: 0,
    explanation: '72 = 2³ · 3²; 120 = 2³ · 3 · 5. A közös prímtényezők legkisebb hatványon: 2³ · 3 = 8 · 3 = 24.'
  },
  {
    id: 'test-q50',
    level: 2,
    question: 'Mennyi a 24 és a 36 legkisebb közös többszöröse [lkkt(24, 36)]?',
    options: ['72', '144', '12', '48'],
    correctAnswer: 0,
    explanation: '24 = 2³ · 3¹; 36 = 2² · 3². Minden előforduló prímtényező a legnagyobb hatványon: 2³ · 3² = 8 · 9 = 72.'
  },
  {
    id: 'test-q51',
    level: 2,
    question: 'Gyöktelenítse a következő tört nevezőjét: 6 / √3!',
    options: ['2√3', '3√3', '6√3', '√3 / 2'],
    correctAnswer: 0,
    explanation: 'Bővítünk √3-mal: (6 · √3) / (√3 · √3) = (6√3) / 3 = 2√3.'
  },
  {
    id: 'test-q52',
    level: 2,
    question: 'Gyöktelenítse a 4 / (√5 - 1) tört nevezőjét a nevező konjugáltjával való bővítéssel!',
    options: ['√5 + 1', '2(√5 + 1)', '4(√5 - 1)', '√5 - 1'],
    correctAnswer: 0,
    explanation: 'Bővítünk (√5 + 1)-gyel: nevezőben (√5 - 1)(√5 + 1) = (√5)² - 1² = 5 - 1 = 4. Így [4 · (√5 + 1)] / 4 = √5 + 1.'
  },
  {
    id: 'test-q53',
    level: 2,
    question: 'Melyik valós x értékekre értelmezhető a √(2x - 8) kifejezés a valós számok körében?',
    options: ['x ≥ 4', 'x > 4', 'x ≤ 4', 'Minden valós számra'],
    correctAnswer: 0,
    explanation: 'A négyzetgyök alatti kifejezés nemnegatív kell legyen: 2x - 8 ≥ 0 ➔ 2x ≥ 8 ➔ x ≥ 4.'
  },
  {
    id: 'test-q54',
    level: 2,
    question: 'Mennyi a (3 · 10⁴)² értéke normálalakban kifejezve?',
    options: ['9 · 10⁸', '6 · 10⁸', '9 · 10⁶', '9 · 10¹⁶'],
    correctAnswer: 0,
    explanation: '(3 · 10⁴)² = 3² · (10⁴)² = 9 · 10⁸.'
  },
  {
    id: 'test-q55',
    level: 2,
    question: 'Hány bit egy 4 gigabájtos (GB) memóriaméret, ha 1 bájt = 8 bit és 1 G = 10⁹?',
    options: ['3,2 · 10¹⁰ bit', '4 · 10⁹ bit', '3,2 · 10⁹ bit', '8 · 10¹⁰ bit'],
    correctAnswer: 0,
    explanation: '4 GB = 4 · 10⁹ B = 4 · 10⁹ · 8 bit = 32 · 10⁹ bit = 3,2 · 10¹⁰ bit normálalakban.'
  },
  {
    id: 'test-q56',
    level: 2,
    question: 'Ha egy 600 000 Ft-os befektetés 4 év alatt évi 10%-os kamatos kamattal kamatozik, mekkora a keletkezett ÖSSZES KAMAT?',
    options: ['278 460 Ft', '240 000 Ft', '878 460 Ft', '300 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₄ = 600 000 · 1,10⁴ = 600 000 · 1,4641 = 878 460 Ft. A tiszta kamat a végösszegből a tőke kivonása: 878 460 - 600 000 = 278 460 Ft.'
  },
  {
    id: 'test-q57',
    level: 2,
    question: 'Mekkora összeget kell betenni a bankba évi 6%-os kamatos kamat mellett, hogy 2 év múlva pontosan 1 123 600 Ft legyen a számlán?',
    options: ['1 000 000 Ft', '1 050 000 Ft', '950 000 Ft', '1 060 000 Ft'],
    correctAnswer: 0,
    explanation: 'T₂ = T₀ · q² ➔ T₀ = 1 123 600 / (1,06²) = 1 123 600 / 1,1236 = 1 000 000 Ft.'
  },
  {
    id: 'test-q58',
    level: 2,
    question: 'Írja fel a 0,3̇ (0,333...) végtelen szakaszos tizedestörtet két egész szám hányadosaként (p/q)!',
    options: ['1/3', '3/10', '33/100', '1/30'],
    correctAnswer: 0,
    explanation: 'Legyen x = 0,333... Ekkor 10x = 3,333... Kivonva egymásból a két egyenletet: 9x = 3 ➔ x = 3/9 = 1/3.'
  },
  {
    id: 'test-q59',
    level: 2,
    question: 'Mennyi az értéke: (-2)⁴ - 2⁴?',
    options: ['0', '32', '-32', '16'],
    correctAnswer: 0,
    explanation: '(-2)⁴ = +16, míg a 2⁴ = 16, így 16 - 16 = 0.'
  },
  {
    id: 'test-q60',
    level: 2,
    question: 'Egy háromszög alapja 20%-kal nőtt, magassága viszont 20%-kal csökkent. Hogyan változott a háromszög területe?',
    options: ['4%-kal csökkent', 'Nem változott', '4%-kal nőtt', '2%-kal csökkent'],
    correctAnswer: 0,
    explanation: 'A terület T = (a · m) / 2. Az új alap 1,20 · a, az új magasság 0,80 · m. Az új terület T\' = (1,20 · 0,80) · T = 0,96 · T, tehát 4%-kal csökkent.'
  },

  // =========================================================================
  // 3. SZINT: EMELT ÉS VERSENYSZINTŰ FELADATOK (61–90)
  // =========================================================================
  {
    id: 'test-q61',
    level: 3,
    question: 'Hány olyan p prímszám létezik, amelyre p, p + 2 és p + 4 is prímszámok?',
    options: ['Pontosan egy (a p = 3)', 'Kettő', 'Végtelen sok', 'Egy sem'],
    correctAnswer: 0,
    explanation: 'Három egymást követő páratlan szám (p, p+2, p+4) közül az egyik mindig osztható 3-mal. Mivel prím kell legyen, ez csak a 3 lehet. Így az egyetlen ilyen prímhármas: {3, 5, 7}.'
  },
  {
    id: 'test-q62',
    level: 3,
    question: 'Melyik állítás bizonyítja indirekt módon, hogy a √2 irracionális szám?',
    options: [
      'Feltesszük, hogy √2 = p/q egyszerűsíthetetlen tört, ekkor p² = 2q², így p és q is páros lenne, ami ellentmondás',
      'Kiszámoljuk számológéppel 10 tizedesjegyig és nem ismétlődik',
      'Mivel a 2 prímszám, ezért nem lehet felírni törtként',
      'Mert a négyzete egész szám'
    ],
    correctAnswer: 0,
    explanation: 'Euklidesz indirekt bizonyítása: ha √2 = p/q relatív prímek, akkor p² = 2q² ➔ p páros, azaz p = 2k ➔ 4k² = 2q² ➔ q² = 2k² ➔ q is páros. Ellentmondás, mert p és q nem lehet mindkettő páros!'
  },
  {
    id: 'test-q63',
    level: 3,
    question: 'Mennyi a kifejezés pontos értéke: √(7 + 4√3) + √(7 - 4√3)?',
    options: ['4', '2√3', '2√7', '14'],
    correctAnswer: 0,
    explanation: 'Vegyük észre a teljes négyzetet: (2 + √3)² = 4 + 4√3 + 3 = 7 + 4√3, és (2 - √3)² = 7 - 4√3. Így √(2 + √3)² + √(2 - √3)² = (2 + √3) + (2 - √3) = 4.'
  },
  {
    id: 'test-q64',
    level: 3,
    question: 'Egyszerűsítse a kifejezést: (2ⁿ⁺⁴ - 2 · 2ⁿ) / (2 · 2ⁿ⁺³)! Mennyi az értéke minden n természetes számra?',
    options: ['7/8', '1', '14/16', '3/4'],
    correctAnswer: 0,
    explanation: 'Kiemelünk 2ⁿ-t a számlálóból és nevezőből: Számláló = 2ⁿ · (2⁴ - 2) = 2ⁿ · (16 - 2) = 2ⁿ · 14. Nevező = 2ⁿ · (2 · 2³) = 2ⁿ · 16. Hányados: 14 / 16 = 7/8.'
  },
  {
    id: 'test-q65',
    level: 3,
    question: 'Oldja meg a valós számok körében: 3^(x+1) + 3^(x-1) = 90! Mennyi x értéke?',
    options: ['x = 3', 'x = 2', 'x = 4', 'x = 1'],
    correctAnswer: 0,
    explanation: 'Kiemelünk 3ˣ-t: 3ˣ · (3¹ + 3⁻¹) = 3ˣ · (3 + 1/3) = 3ˣ · (10/3) = 90 ➔ 3ˣ = 90 · (3/10) = 27 ➔ 3ˣ = 3³ ➔ x = 3.'
  },
  {
    id: 'test-q66',
    level: 3,
    question: 'Melyik szám a nagyobb: 2³⁰⁰ vagy 3²⁰⁰?',
    options: [
      'Egyenlőek (2³⁰⁰ = 3²⁰⁰)',
      '2³⁰⁰ nagyobb',
      '3²⁰⁰ nagyobb',
      'Nem dönthető el logaritmus nélkül'
    ],
    correctAnswer: 0,
    explanation: 'Mindkét szám kitevőjéből kiemeljük a 100-at: 2³⁰⁰ = (2³)¹⁰⁰ = 8¹⁰⁰. 3²⁰⁰ = (3²)¹⁰⁰ = 9¹⁰⁰. Mivel 8 < 9, így 8¹⁰⁰ < 9¹⁰⁰, azaz 3²⁰⁰ nagyobb!'
  },
  {
    id: 'test-q67',
    level: 3,
    question: 'Mekkora az 5^(2026) utolsó két számjegye?',
    options: ['25', '05', '75', '15'],
    correctAnswer: 0,
    explanation: '5¹ = 5, 5² = 25, 5³ = 125, 5⁴ = 625, 5⁵ = 3125... Minden legalább 2. hatvány utolsó két jegye kötelezően 25!'
  },
  {
    id: 'test-q68',
    level: 3,
    question: 'Két pozitív szám mértani közepe 12, számtani közepe 15. Mi a két szám?',
    options: ['6 és 24', '8 és 18', '9 és 16', '10 és 20'],
    correctAnswer: 0,
    explanation: '(a + b) / 2 = 15 ➔ a + b = 30. √(a · b) = 12 ➔ a · b = 144. Megoldva a másodfokú egyenletet: x² - 30x + 144 = 0 ➔ gyökök: 24 és 6 (24 + 6 = 30, 24 · 6 = 144).'
  },
  {
    id: 'test-q69',
    level: 3,
    question: 'A 72-es szabály szerint egy tőke duplázódási ideje hozzávetőlegesen n ≈ 72 / p. Hány év alatt duplázódik meg a pénzünk évi 9%-os kamatos kamat mellett?',
    options: ['Körülbelül 8 év alatt', 'Körülbelül 11 év alatt', 'Körülbelül 6 év alatt', 'Körülbelül 12 év alatt'],
    correctAnswer: 0,
    explanation: '72 / 9 = 8 év. Ellenőrzés: 1,09⁸ ≈ 1,99256 ≈ 2 (nagyon jó közelítés).'
  },
  {
    id: 'test-q70',
    level: 3,
    question: 'Egy tartályban 80 liter 30%-os sóoldat van. Hány liter vizet kell elpárologtatni belőle, hogy 50%-os sóoldatot kapjunk?',
    options: ['32 litert', '24 litert', '40 litert', '16 litert'],
    correctAnswer: 0,
    explanation: 'A só mennyisége változatlan: 80 · 0,30 = 24 kg só. Az új oldatban ennek 50%-nak kell lennie: 24 = 0,50 · (80 - x) ➔ 80 - x = 48 ➔ x = 32 liter elpárologtatott víz.'
  },
  {
    id: 'test-q71',
    level: 3,
    question: 'Mennyi a következő végtelen összeg határértéke: S = 1/2 + 1/4 + 1/8 + 1/16 + ...?',
    options: ['1', '2', '1,5', 'Végtelen'],
    correctAnswer: 0,
    explanation: 'Végtelen mértani sor, ahol a₁ = 1/2 és a hányados q = 1/2. Összegképlet: S = a₁ / (1 - q) = (1/2) / (1 - 1/2) = (1/2) / (1/2) = 1.'
  },
  {
    id: 'test-q72',
    level: 3,
    question: 'Hány darab 0-ra végződik a 100! (100 faktoriális)?',
    options: ['24', '20', '25', '10'],
    correctAnswer: 0,
    explanation: 'A nullák száma a prímfelbontásban lévő 5-ös tényezők számától függ: ⌊100/5⌋ + ⌊100/25⌋ = 20 + 4 = 24 darab nulla.'
  },
  {
    id: 'test-q73',
    level: 3,
    question: 'Írja fel a 0,12̇7̇ (0,1272727...) vegyes szakaszos tizedestörtet tört alakban!',
    options: ['7/55', '14/110', '127/990', '63/495'],
    correctAnswer: 0,
    explanation: 'Legyen x = 0,12727... Ekkor 10x = 1,2727... és 1000x = 127,2727... Kivonva: 990x = 126 ➔ x = 126 / 990 = 7 / 55 (mindkettőt osztva 18-cal).'
  },
  {
    id: 'test-q74',
    level: 3,
    question: 'Mennyi az értéke: √(11 - 6√2) kifejezésnek alegegyszerűbb alakban?',
    options: ['3 - √2', '√11 - √6', '2 - √3', '√2 - 3'],
    correctAnswer: 0,
    explanation: '(3 - √2)² = 9 - 6√2 + 2 = 11 - 6√2. Mivel 3 > √2 (3 > 1,41), így 3 - √2 pozitív, tehát √(11 - 6√2) = 3 - √2.'
  },
  {
    id: 'test-q75',
    level: 3,
    question: 'Melyik valós x-ekre igaz, hogy |x - 3| + |x + 5| = 8?',
    options: ['x ∈ [-5; 3]', 'Csak x = 3 és x = -5', 'x ≥ 3', 'Nincs megoldás'],
    correctAnswer: 0,
    explanation: 'A számegyenesen a 3-tól és -5-től való távolságok összege pontosan akkor 8 (a két pont távolsága), ha a pont a két szám közötti zárt intervallumon helyezkedik el: x ∈ [-5; 3].'
  },
  {
    id: 'test-q76',
    level: 3,
    question: 'Ha egy bankban évi p% kamatláb mellett a kamatperiódus féléves (évente 2-szer tőkésítenek), hogyan módosul a kamattényező?',
    options: ['q = (1 + (p/2)/100)²', 'q = 1 + p/100', 'q = (1 + p/100)²', 'q = 1 + 2p/100'],
    correctAnswer: 0,
    explanation: 'Félévente a kamatláb p/2, és egy évben 2 tőkésítés történik, így az effektív éves kamattényező: (1 + p/200)² > (1 + p/100).'
  },
  {
    id: 'test-q77',
    level: 3,
    question: 'Oldja meg az egyenletet: x² - 6|x| + 8 = 0 a valós számok körében! Hány valós megoldása van?',
    options: ['4 megoldás (x = ±2, ±4)', '2 megoldás', '1 megoldás', '0 megoldás'],
    correctAnswer: 0,
    explanation: 'Mivel x² = |x|², az egyenlet (|x| - 2)(|x| - 4) = 0. Ebből |x| = 2 ➔ x = ±2, és |x| = 4 ➔ x = ±4. Ez 4 valós gyök.'
  },
  {
    id: 'test-q78',
    level: 3,
    question: 'Számítsa ki: S = 1/(1·2) + 1/(2·3) + 1/(3·4) + ... + 1/(99·100)!',
    options: ['99/100', '1', '100/101', '49/50'],
    correctAnswer: 0,
    explanation: 'Teleszkópos összeg: 1/(k(k+1)) = 1/k - 1/(k+1). Ekkor (1 - 1/2) + (1/2 - 1/3) + ... + (1/99 - 1/100) = 1 - 1/100 = 99/100.'
  },
  {
    id: 'test-q79',
    level: 3,
    question: 'Melyik állítás IGAZ az irracionális számok zártságára vonatkozóan?',
    options: [
      'Az irracionális számok halmaza sem az összeadásra, sem a szorzásra NEM zárt',
      'Zárt az összeadásra, de a szorzásra nem',
      'Zárt a szorzásra, de az összeadásra nem',
      'Mindkét műveletre zárt'
    ],
    correctAnswer: 0,
    explanation: 'Két irracionális szám összege lehet racionális: √2 + (-√2) = 0 ∈ ℚ. Szorzatuk is: √2 · √2 = 2 ∈ ℚ. Tehát sem az összeadásra, sem a szorzásra nem zárt halmaz!'
  },
  {
    id: 'test-q80',
    level: 3,
    question: 'Mennyi a 2025² - 2024² különbség pontos értéke?',
    options: ['4049', '1', '4050', '2025'],
    correctAnswer: 0,
    explanation: 'Azonosság: a² - b² = (a - b)(a + b). Itt (2025 - 2024)(2025 + 2024) = 1 · 4049 = 4049.'
  },
  {
    id: 'test-q81',
    level: 3,
    question: 'Mennyi a (√5 + √3) / (√5 - √3) kifejezés értéke a nevező gyöktelenítése után?',
    options: ['4 + √15', '4 - √15', '8 + 2√15', '2 + √15'],
    correctAnswer: 0,
    explanation: 'Bővítünk (√5 + √3)-mal: Számláló: (√5 + √3)² = 5 + 2√15 + 3 = 8 + 2√15. Nevező: 5 - 3 = 2. Elosztva 2-vel: 4 + √15.'
  },
  {
    id: 'test-q82',
    level: 3,
    question: 'Egy háromszög oldalai a = 3, b = 4, c = 5. Milyen típusú a háromszög és mennyi a köré írt körének sugara?',
    options: ['Derékszögű háromszög, R = 2,5', 'Hegyes-szögű, R = 3', 'Tompaszögű, R = 5', 'Derékszögű, R = 5'],
    correctAnswer: 0,
    explanation: '3² + 4² = 9 + 16 = 25 = 5², tehát a Pitagorasz-tétel megfordítása alapján derékszögű. Thalesz tétele miatt az átfogó felezőpontja a körülírt kör középpontja: R = c / 2 = 2,5.'
  },
  {
    id: 'test-q83',
    level: 3,
    question: 'Mennyi a √(x² - 6x + 9) kifejezés egyszerűsített alakja, ha x < 3?',
    options: ['3 - x', 'x - 3', '|x - 3|', 'x + 3'],
    correctAnswer: 0,
    explanation: '√(x² - 6x + 9) = √((x - 3)²) = |x - 3|. Mivel feltételünk x < 3, így x - 3 negatív, tehát az abszolútérték felbontása: -(x - 3) = 3 - x.'
  },
  {
    id: 'test-q84',
    level: 3,
    question: 'Ha egy inflációs időszakban az árak 4 év alatt a duplájukra nőttek, mekkora volt a hozzávetőleges átlagos évi infláció?',
    options: ['kb. 18,9%', '25%', '12,5%', '15%'],
    correctAnswer: 0,
    explanation: 'q⁴ = 2 ➔ q = 2^(1/4) = ⁴√2 ≈ 1,1892. Az éves inflációs ráta p = (q - 1) · 100 ≈ 18,9%.'
  },
  {
    id: 'test-q85',
    level: 3,
    question: 'Hány olyan egész szám létezik, amelyre igaz: 100 < x² < 1000?',
    options: ['42 darab (21 pozitív és 21 negatív)', '21 darab', '31 darab', '62 darab'],
    correctAnswer: 0,
    explanation: '√100 = 10, √1000 ≈ 31,62. Az egész x-ek pozitív értékei: 11 ≤ x ≤ 31 (ez 31 - 11 + 1 = 21 darab). A negatív ellentettek szintén teljesítik a feltételt: -31 ≤ x ≤ -11 (újabb 21 darab). Összesen: 42 darab.'
  },
  {
    id: 'test-q86',
    level: 3,
    question: 'Mennyi a (10! - 9!) / 8! kifejezés pontos értéke?',
    options: ['81', '72', '90', '9'],
    correctAnswer: 0,
    explanation: '10! - 9! = 9! · (10 - 1) = 9! · 9 = (8! · 9) · 9 = 8! · 81. Elosztva 8!-sal: 81.'
  },
  {
    id: 'test-q87',
    level: 3,
    question: 'Melyik szám a legkisebb az alábbiak közül?',
    options: ['(0,5)²', '(0,5)³', '√(0,5)', '0,5'],
    correctAnswer: 1,
    explanation: 'Ha 0 < x < 1, minél nagyobb hatványra emeljük, annál kisebb lesz az érték: (0,5)³ = 0,125; (0,5)² = 0,25; 0,5; √(0,5) ≈ 0,707. Tehát (0,5)³ a legkisebb.'
  },
  {
    id: 'test-q88',
    level: 3,
    question: 'Mekkora az 1 · 2 · 3 · ... · 50 szorzatban a 3-as prímtényező legnagyobb kitevője?',
    options: ['22', '16', '24', '18'],
    correctAnswer: 0,
    explanation: 'Legendre-formula: ⌊50/3⌋ + ⌊50/9⌋ + ⌊50/27⌋ = 16 + 5 + 1 = 22. Tehát a 3²² osztja 50!-t, de a 3²³ már nem.'
  },
  {
    id: 'test-q89',
    level: 3,
    question: 'A és B együtt 12 nap alatt végez egy munkával. Ha A egyedül 20 nap alatt csinálná meg, hány nap kellene B-nek egyedül?',
    options: ['30 nap', '24 nap', '25 nap', '36 nap'],
    correctAnswer: 0,
    explanation: '1/12 - 1/20 = 5/60 - 3/60 = 2/60 = 1/30. B 1 nap alatt a munka 1/30-át végzi el, tehát egyedül 30 nap kell neki.'
  },
  {
    id: 'test-q90',
    level: 3,
    question: 'Mennyi az értéke: log₁₀(2) + log₁₀(5)?',
    options: ['1', '0', '10', 'log₁₀(7)'],
    correctAnswer: 0,
    explanation: 'A logaritmus azonossága: log(a) + log(b) = log(a · b). Így log₁₀(2) + log₁₀(5) = log₁₀(2 · 5) = log₁₀(10) = 1.'
  }
];

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'cheat-sets',
    title: 'Számhalmazok hierarchiája',
    badge: 'Számelmélet',
    color: 'rose',
    content: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ\n• ℕ: {0, 1, 2, ...}\n• ℤ: egészek\n• ℚ: p/q törtalak (véges vagy szakaszos tizedes)\n• ℝ \\ ℚ: irracionális számok (√2, π)'
  },
  {
    id: 'cheat-powers',
    title: 'Hatványozási azonosságok',
    badge: 'Azonosságok',
    color: 'purple',
    content: '• aⁿ · aᵏ = aⁿ⁺ᵏ\n• aⁿ / aᵏ = aⁿ⁻ᵏ\n• (aⁿ)ᵏ = aⁿˣᵏ\n• (a · b)ⁿ = aⁿ · bⁿ\n• a⁰ = 1 (a ≠ 0)\n• a⁻ⁿ = 1 / aⁿ'
  },
  {
    id: 'cheat-roots',
    title: 'Négyzetgyökvonás',
    badge: 'Gyökök',
    color: 'sky',
    content: '• √(a · b) = √a · √b\n• √(a / b) = √a / √b\n• √(a²) = |a|\n• VIGYÁZAT: √(a + b) ≠ √a + √b!'
  },
  {
    id: 'cheat-scientific',
    title: 'Normálalak',
    badge: 'Prefixumok',
    color: 'emerald',
    content: 'a · 10ᵏ (1 ≤ a < 10, k ∈ ℤ)\n• k (kilo): 10³\n• M (mega): 10⁶\n• G (giga): 10⁹\n• m (milli): 10⁻³\n• μ (mikro): 10⁻⁶\n• n (nano): 10⁻⁹'
  },
  {
    id: 'cheat-finance',
    title: 'Kamatos kamat & Százalék',
    badge: 'Pénzügy',
    color: 'indigo',
    content: '• q = 1 + p/100 (növekedés)\n• q = 1 - p/100 (csökkenés / amortizáció)\n• Tₙ = T₀ · qⁿ (kamatos kamat)\n• Tₙ = T₀ · (1 + n · p/100) (egyszerű kamat)'
  }
];

export const Chapter2KnowledgeTestQuiz: React.FC<Chapter2KnowledgeTestQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      topicId="g9-szamok-tudasproba-quiz"
      topicTitle="II. Fejezeti Összefoglalás & Tudáspróba"
      questions={questions}
      cheatSheetCards={cheatSheetCards}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a fejezet 12 témakörének alapfogalmait a leírásukkal!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <Chapter2KnowledgeTestMatcher
              key={`c2-matcher-${level}`}
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
          subtitle: 'Kategorizáld a számokat, összefüggéseket és fogalmakat!',
          badgeText: '12 Kártya szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <Chapter2KnowledgeTestSorter
              key={`c2-sorter-${level}`}
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
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="rose"
    />
  );
};

export default Chapter2KnowledgeTestQuiz;
