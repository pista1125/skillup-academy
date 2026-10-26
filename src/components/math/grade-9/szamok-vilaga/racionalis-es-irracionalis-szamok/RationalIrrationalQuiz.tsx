import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RationalIrrationalMatcher } from './RationalIrrationalMatcher';
import { RationalIrrationalSorter } from './RationalIrrationalSorter';
import {
  DecimalsClassificationTreeSvg,
  Sqrt2ConstructionSvg,
  PeriodicRemainderCycleSvg
} from './RationalIrrationalFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface RationalIrrationalQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és Tizedestört Alakok (Könnyű)',
    subtitle: 'Racionális számok definíciója, véges és végtelen szakaszos tizedestörtek felismerése.',
    range: '1 - 10. feladat',
    focus: 'Tankönyvi Alapismeretek',
    questions: [
      {
        id: 'rq1-1',
        questionTypeBadge: 'Racionális Szám Fogalma',
        question: 'Melyik a racionális számok pontos matematikai definíciója a tankönyv 50. oldala szerint?',
        options: [
          'Olyan számok, amelyek felírhatók két egész szám hányadosaként (a/b alakban, b ≠ 0)',
          'Olyan számok, amelyek tizedesvessző után csak véges sok számjegyet tartalmaznak',
          'Kizárólag az egész számok és a pozitív törtek',
          'Minden olyan szám, amely a számegyenesen ábrázolható'
        ],
        correctAnswer: 0,
        hint: 'A racionális szó a latin ratio (arány, hányados) szóból származik: két egész szám hányadosa.',
        explanation: 'Definíció szerint a racionális számok azok, amelyek felírhatók két egész szám hányadosaként: a/b, ahol a, b ∈ ℤ és b ≠ 0.'
      },
      {
        id: 'rq1-2',
        questionTypeBadge: 'Véges Tizedestört Szabálya',
        question: 'Mikor lesz egy tovább már nem egyszerűsíthető tört tizedestört alakja véges?',
        figure: <DecimalsClassificationTreeSvg size={170} />,
        options: [
          'Ha a nevező prímtényezős felbontásában kizárólag a 2 és/vagy az 5 szerepel',
          'Ha a nevező páros szám',
          'Ha a számláló kisebb, mint a nevező',
          'Minden közönséges tört tizedestört alakja véges'
        ],
        correctAnswer: 0,
        hint: 'A 10 = 2 · 5, ezért csak a 2-es és 5-ös prímosztókkal rendelkező nevezők bővíthetők 10 hatványára.',
        explanation: 'Egy legegyszerűbb alakra hozott tört pontosan akkor véges tizedestört, ha a nevezője a 10 valamely hatványának osztója, azaz prímtényezői között csak 2 és/vagy 5 szerepel.'
      },
      {
        id: 'rq1-3',
        questionTypeBadge: 'Tankönyvi Példa',
        question: 'Mennyi a 7/4 tört értéke tizedestört alakban a tankönyv 50. oldalán lévő példa szerint?',
        options: ['1,75', '1,4', '1,28', '0,57'],
        correctAnswer: 0,
        hint: '7/4 = 7 / 2² = (7 · 25) / (4 · 25) = 175 / 100 = ?',
        explanation: '7/4 = 175/100 = 1,75. Mivel a nevező 4 = 2², a tizedestört alak véges.'
      },
      {
        id: 'rq1-4',
        questionTypeBadge: 'Szakaszos Tizedestört',
        question: 'Melyik közönséges törtnek felel meg a 0,(3) = 0,333... végtelen szakaszos tizedestört?',
        options: ['1/3', '3/10', '3/100', '1/30'],
        correctAnswer: 0,
        hint: 'Ha 1-et elosztunk 3-mal, 0,333...-at kapunk.',
        explanation: '1 : 3 = 0,333... = 0,(3). Algebrailag: 10x − x = 3,333... − 0,333... ⟹ 9x = 3 ⟹ x = 3/9 = 1/3.'
      },
      {
        id: 'rq1-5',
        questionTypeBadge: 'Végtelen Szakaszos Elemzés',
        question: 'Miért végtelen szakaszos tizedestört az 1/6 tizedestört alakja?',
        options: [
          'Mert a 6 prímtényezős felbontása 2 · 3, és a 3-as prímosztó jelenléte miatt nem bővíthető 10 hatványára',
          'Mert a számláló 1',
          'Mert a 6 nem osztható 5-tel',
          'Mert negatív szám'
        ],
        correctAnswer: 0,
        hint: 'Nézd meg a 6 prímtényezőit: 6 = 2 · 3. A 3 nem osztója a 10-nek!',
        explanation: 'Az 1/6 nevezőjében (6 = 2 · 3) ott a 3-as prím. Mivel a 10 hatványai (10, 100, 1000...) csak 2 és 5 prímeket tartalmaznak, az 1/6 sosem lesz véges tizedestört: 1/6 = 0,1666... = 0,1(6).'
      },
      {
        id: 'rq1-6',
        questionTypeBadge: 'A 0 Halmazbesorolása',
        question: 'Melyik állítás IGAZ a 0 (nulla) besorolására a magyar tanterv és érettségi szerint?',
        options: [
          'A 0 természetes szám (0 ∈ ℕ), így egész, racionális és valós szám is',
          'A 0 csak az egész számok halmazába tartozik, a természetes számok 1-gyel kezdődnek',
          'A 0 irracionális szám',
          'A 0 nem valós szám'
        ],
        correctAnswer: 0,
        hint: '0 = 0/1, így felírható két egész hányadosaként, és a magyar tantervben 0 a legkisebb természetes szám.',
        explanation: 'A magyar középiskolai követelményekben 0 ∈ ℕ. Mivel 0 = 0/1, racionális szám is (0 ∈ ℚ), és természetesen valós szám (0 ∈ ℝ).'
      },
      {
        id: 'rq1-7',
        questionTypeBadge: 'Négyzetgyök Besorolása',
        question: 'Racionális vagy irracionális szám a √16 ?',
        options: [
          'Racionális szám (sőt természetes szám), mert pontos értéke 4',
          'Irracionális szám, mert négyzetgyökjel alatt van',
          'Nem értelmezett szám',
          'Csak valós, de se nem racionális, se nem irracionális'
        ],
        correctAnswer: 0,
        hint: 'Végezd el a gyökvonást! Mennyi 4 négyzete?',
        explanation: 'Csapda! A gyökjel láttán sokan azonnal irracionálisra tippelnek, de √16 = 4. A 4 pedig természetes, egész és racionális szám (4/1).'
      },
      {
        id: 'rq1-8',
        questionTypeBadge: 'Jelölés',
        question: 'Mi a jele az irracionális számok halmazának a tankönyv 51. oldala szerint?',
        options: ['ℚ*', 'ℝ', 'ℤ', 'ℕ'],
        correctAnswer: 0,
        hint: 'A racionális számok jele ℚ, az irracionálisaké ℚ* (Q-csillag).',
        explanation: 'A tankönyv definíciója szerint az irracionális számok halmazának jele: ℚ*. A valós számok halmaza ℝ = ℚ ∪ ℚ*.'
      },
      {
        id: 'rq1-9',
        questionTypeBadge: 'Véges Tizedestört Átírása',
        question: 'Hogyan írható fel egyszerűsített közönséges tört alakban a 0,375 tizedestört?',
        options: ['3/8', '375/100', '3/80', '7/20'],
        correctAnswer: 0,
        hint: '0,375 = 375 / 1000. Egyszerűsíts 125-tel!',
        explanation: '0,375 = 375/1000 = (375 : 125) / (1000 : 125) = 3/8.'
      },
      {
        id: 'rq1-10',
        questionTypeBadge: 'A 0,(9) Meglepő Ténye',
        question: 'Mennyi a 0,(9) = 0,9999... végtelen szakaszos tizedestört pontos matematikai értéke?',
        options: [
          'Pontosan 1',
          'Valamivel kisebb, mint 1 (0,999999...)',
          'Nem határozható meg pontosan',
          '0,9'
        ],
        correctAnswer: 0,
        hint: 'Gondolj az 1/3 = 0,333... összefüggésre! 3 · (1/3) = ?',
        explanation: 'Bizonyított matematikai tény: 0,(9) = 1. Levezetés: x = 0,999... ⟹ 10x = 9,999... ⟹ 9x = 9 ⟹ x = 1. A két szám között nincs különbség!'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Szakaszok Átírása és Számhalmazok (Közepes)',
    subtitle: 'Többjegyű és vegyes periódusok átírása tört alakká, irracionális számok jellemzése.',
    range: '11 - 20. feladat',
    focus: 'Középszintű Érettségi Típusfeladatok',
    questions: [
      {
        id: 'rq2-1',
        questionTypeBadge: 'Kétjegyű Periódus Átírása',
        question: 'Írd fel tovább nem egyszerűsíthető közönséges tört alakban a 0,(27) tizedestörtet!',
        options: ['3/11', '27/100', '27/90', '9/33'],
        correctAnswer: 0,
        hint: 'Kétjegyű a periódus, így 100-zal szorzunk: 100x − x = 27 ⟹ 99x = 27. Egyszerűsíts 9-cel!',
        explanation: 'x = 0,2727... ⟹ 100x = 27,2727... ⟹ 99x = 27 ⟹ x = 27/99 = 3/11.'
      },
      {
        id: 'rq2-2',
        questionTypeBadge: 'Egyszerűsítési Csapda',
        question: 'Véges vagy végtelen szakaszos a 9/60 tört tizedestört alakja?',
        figure: <DecimalsClassificationTreeSvg size={170} />,
        options: [
          'Véges tizedestört, mert egyszerűsítés után 3/20 = 0,15, és 20 = 2² · 5',
          'Végtelen szakaszos, mert a 60-ban szerepel a 3-as prímszám',
          'Irracionális szám',
          'Nem dönthető el'
        ],
        correctAnswer: 0,
        hint: 'Mindig egyszerűsíts a vizsgálat előtt! 9/60 = 3/20.',
        explanation: 'Tipikus érettségi csapda! A szabály csak TOVÁBB NEM EGYSZERŰSÍTHETŐ alakra érvényes: 9/60 = 3/20. A 20 = 2² · 5 prímtényezői csak 2 és 5, így 3/20 = 0,15 véges tizedestört!'
      },
      {
        id: 'rq2-3',
        questionTypeBadge: 'Vegyes Szakaszos Tört',
        question: 'Melyik közönséges tört értéke egyenlő 0,1(6) = 0,1666...-tal?',
        options: ['1/6', '16/100', '1/60', '5/33'],
        correctAnswer: 0,
        hint: '100x = 16,666... és 10x = 1,666... Kivonva: 90x = 15. Mennyi 15/90 egyszerűsítve?',
        explanation: 'Vegyes szakaszos: 100x = 16,666... és 10x = 1,666... Kivonva egymásból: 90x = 15 ⟹ x = 15/90 = 1/6.'
      },
      {
        id: 'rq2-4',
        questionTypeBadge: 'Tankönyvi Mintafeladat',
        question: 'A tankönyv 50. oldalán a 23/37 tört szerepel példaként. Mi a tizedestört alakja?',
        options: [
          '0,(621) = 0,621621... (3 jegyű végtelen szakaszos)',
          '0,621 (véges tizedestört)',
          '0,(23) (kétjegyű szakaszos)',
          '0,6(21) (vegyes szakaszos)'
        ],
        correctAnswer: 0,
        hint: 'A 37 prímszám, nem 2 és nem 5. 23 : 37 osztáskor 621 ismétlődik.',
        explanation: 'A tankönyv 50. oldalán: 23/37 = 0,621621621... = 0,(621). Mivel 37 prím és nem 2/5, végtelen szakaszos tizedestört.'
      },
      {
        id: 'rq2-5',
        questionTypeBadge: 'A π Értéke és Jellege',
        question: 'Miért állítjuk, hogy a π irracionális szám, ha az iskolában gyakran 22/7-ként vagy 3,14-ként számolunk vele?',
        options: [
          'Mert a 22/7 és a 3,14 csupán racionális KÖZELÍTŐ ÉRTÉKEK, a π valódi tizedestört alakja végtelen és nem szakaszos',
          'Mert a kör területe nem számítható ki pontosan',
          'Mert a 22/7 nem egész szám',
          'A π valójában racionális szám'
        ],
        correctAnswer: 0,
        hint: '22 : 7 = 3,(142857), míg a π = 3,14159265... A kettő nem azonos!',
        explanation: 'A 22/7 ≈ 3,142857 egy racionális közelítés, ahogy a 3,14 is. Johann Heinrich Lambert 1761-ben bebizonyította, hogy a π pontos értéke irracionális (π ∈ ℚ*).'
      },
      {
        id: 'rq2-6',
        questionTypeBadge: 'Irracionális Műveleti Zártság',
        question: 'Igaz-e, hogy két irracionális szám összege mindig irracionális szám?',
        options: [
          'HAMIS! Ellenpélda: √2 + (−√2) = 0, ami racionális szám',
          'IGAZ, mert irracionális számból csak irracionális keletkezhet',
          'Csak akkor igaz, ha mindkettő pozitív',
          'Csak a szorzásra igaz, az összeadásra nem'
        ],
        correctAnswer: 0,
        hint: 'Adj össze egy irracionális számot az ellentettjével!',
        explanation: 'HAMIS állítás! Két irracionális szám összege lehet racionális is: pl. √2 + (−√2) = 0 ∈ ℚ, vagy (3 + √5) + (2 − √5) = 5 ∈ ℚ. A ℚ* nem zárt az összeadásra.'
      },
      {
        id: 'rq2-7',
        questionTypeBadge: 'Tört Négyzetgyöke',
        question: 'Melyik számhalmazba tartozik a √(9/16) ?',
        options: [
          'ℚ \\ ℤ (Racionális tört szám, mert értéke 3/4 = 0,75)',
          'ℚ* (Irracionális szám)',
          'ℕ (Természetes szám)',
          'ℤ (Egész szám)'
        ],
        correctAnswer: 0,
        hint: '√(9/16) = √9 / √16 = ?',
        explanation: '√(9/16) = 3/4 = 0,75. Mivel felírható két egész szám hányadosaként és nem egész, a legszűkebb számhalmaza a tört racionális számok (ℚ \\ ℤ).'
      },
      {
        id: 'rq2-8',
        questionTypeBadge: 'Szerkesztett Irracionális Szám',
        question: 'A tankönyv 51. oldalán szerepel a 0,101001000100001... szám. Milyen szám ez?',
        options: [
          'Irracionális szám (ℚ*), mert tizedestört alakja végtelen és nem szakaszos',
          'Racionális szám, mert csak 0-kból és 1-esekből áll',
          'Véges tizedestört',
          'Egész szám'
        ],
        correctAnswer: 0,
        hint: 'Minden 1-es után eggyel több 0 van: 1, 2, 3, 4, 5... Nincs olyan szakasz, ami ismétlődne!',
        explanation: 'Mivel a nullák száma folyamatosan növekszik (1 db, 2 db, 3 db, 4 db...), a tizedesjegyek soha nem ismétlődnek ciklikusan. Ez egy végtelen nem szakaszos tizedestört, tehát irracionális szám!'
      },
      {
        id: 'rq2-9',
        questionTypeBadge: 'Skatulya-elv és Szakasz Hossza',
        question: 'A Dirichlet-féle skatulya-elv alapján legfeljebb hány jegyű lehet az 1/7 tizedestört alakjának szakasza?',
        figure: <PeriodicRemainderCycleSvg size={170} />,
        options: ['6 jegyű', '7 jegyű', '10 jegyű', 'Végtelen sok jegyű'],
        correctAnswer: 0,
        hint: '7-tel osztva a lehetséges maradékok: 1, 2, 3, 4, 5, 6. Ez hány darab?',
        explanation: '7-tel osztva nem nulla maradék csak 6 darab létezhet (1, 2, 3, 4, 5, 6). Legkésőbb a 7. lépésben valamelyik maradéknak ismétlődnie kell, így a periódus hossza legfeljebb 7 − 1 = 6 jegy!'
      },
      {
        id: 'rq2-10',
        questionTypeBadge: 'Valós Számok Teljessége',
        question: 'Melyik halmazműveleti összefüggés IGAZ a racionális (ℚ), irracionális (ℚ*) és valós (ℝ) számokra?',
        options: [
          'ℝ = ℚ ∪ ℚ*  és  ℚ ∩ ℚ* = ∅',
          'ℝ = ℚ ∩ ℚ*',
          'ℚ ⊂ ℚ*',
          'ℝ \\ ℚ = ℕ'
        ],
        correctAnswer: 0,
        hint: 'Minden valós szám vagy racionális, vagy irracionális, de sosem mindkettő egyszerre.',
        explanation: 'A valós számok a racionális és irracionális számok diszjunkt uniója: ℝ = ℚ ∪ ℚ*, és közös elemük nincs: ℚ ∩ ℚ* = ∅.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Indirekt Bizonyítások és Emelt Szint (Gondolkodtató)',
    subtitle: 'A √2 irracionalitásának bizonyítása, geometriai szerkesztés, osztási tételek.',
    range: '21 - 30. feladat',
    focus: 'Matematikai Bizonyítások és Emelt Szint',
    questions: [
      {
        id: 'rq3-1',
        questionTypeBadge: 'Indirekt Bizonyítás Kezdete',
        question: 'Mi a legelső lépés a √2 irracionalitásának klasszikus indirekt bizonyításakor?',
        figure: <Sqrt2ConstructionSvg size={170} />,
        options: [
          'Feltesszük az állítás tagadását: tegyük fel indirekt, hogy √2 racionális szám (√2 = p/q, lnko(p,q) = 1)',
          'Kiszámoljuk számológéppel a √2 első 100 tizedesjegyét',
          'Feltesszük, hogy p páratlan és q páros',
          'Megszerkesztjük az egységnégyzet átlóját'
        ],
        correctAnswer: 0,
        hint: 'Az indirekt bizonyítás az állítás tagadásának feltételezésével indul.',
        explanation: 'Az indirekt bizonyításban az állítás tagadásából indulunk ki: tegyük fel, hogy √2 racionális, vagyis felírható p/q alakban, ahol p, q relatív prím pozitív egészek (egyszerűsített tört).'
      },
      {
        id: 'rq3-2',
        questionTypeBadge: 'Indirekt Bizonyítás Magja',
        question: 'A √2 = p/q egyenletből 2 = p²/q², azaz p² = 2q². Milyen következtetést vonunk le ebből p-re?',
        options: [
          'p² páros szám, amiből következik, hogy p is páros szám (p = 2k)',
          'p páratlan szám',
          'p osztható 4-gyel',
          'p nem egész szám'
        ],
        correctAnswer: 0,
        hint: 'Ha egy egész szám négyzete páros, lehet-e az alap páratlan? (páratlan négyzete mindig páratlan!).',
        explanation: 'Mivel p² = 2q², p² páros. Mivel páratlan szám négyzete páratlan lenne, így p-nek feltétlenül párosnak kell lennie: p = 2k.'
      },
      {
        id: 'rq3-3',
        questionTypeBadge: 'Indirekt Bizonyítás Ellentmondása',
        question: 'Miután behelyettesítünk p = 2k-t: (2k)² = 4k² = 2q² ⟹ q² = 2k². Mi az a döntő ellentmondás, ami lezárja a bizonyítást?',
        options: [
          'Kiderül, hogy q is páros, így mind p, mind q osztható 2-vel, ami ellentmond annak, hogy p/q egyszerűsített tört (relatív prímek)',
          'Kiderül, hogy 2 nem prím',
          'q² negatív szám lesz',
          'p egyenlő lesz q-val'
        ],
        correctAnswer: 0,
        hint: 'Ha p is páros és q is páros, akkor mindkettő osztható 2-vel...',
        explanation: 'Ha p és q is páros, akkor a p/q tört még egyszerűsíthető lenne 2-vel! Ez ellentmondásba ütközik azzal a kiinduló feltétellel, hogy a tört már nem egyszerűsíthető (lnko(p,q) = 1). Így √2 valóban irracionális!'
      },
      {
        id: 'rq3-4',
        questionTypeBadge: 'Geometriai Szerkesztés',
        question: 'Hogyan szerkeszthető meg pontosan a √2 helye a számegyenesen a tankönyv szerint?',
        figure: <Sqrt2ConstructionSvg size={170} />,
        options: [
          'Egy 1 egység oldalú négyzet átlójaként (d = √(1² + 1²) = √2), majd körzővel a számegyenesre forgatva',
          'Számológéppel kimérve 1,41 cm-t',
          'Egy 2 egység sugarú kör kerületeként',
          'A √2 pontosan nem szerkeszthető meg'
        ],
        correctAnswer: 0,
        hint: 'Pithagorasz-tétel: 1² + 1² = 2, így az átfogó pontosan √2.',
        explanation: 'Az 1 befogójú derékszögű háromszög átfogója Pithagorasz tétele szerint d = √(1² + 1²) = √2. A 0 középpontú körzővel ezt a szakaszt a számegyenesre leforgatva pontosan megkapjuk a √2 helyét.'
      },
      {
        id: 'rq3-5',
        questionTypeBadge: 'Vegyes Szakaszos Átírás Emelt',
        question: 'Írd fel közönséges törtként az 1,2(45) tizedestörtet!',
        options: ['137/110', '1245/1000', '1233/900', '1245/990'],
        correctAnswer: 0,
        hint: '1000x = 1245,(45) és 10x = 12,(45). Kivonva: 990x = 1233. Mennyi 1233/990 egyszerűsítve 9-cel?',
        explanation: 'x = 1,24545... ⟹ 1000x = 1245,45... és 10x = 12,45... Kivonva: 990x = 1245 − 12 = 1233 ⟹ x = 1233/990. 9-cel egyszerűsítve: 137/110.'
      },
      {
        id: 'rq3-6',
        questionTypeBadge: 'Tankönyv 51. o. 5. Feladat',
        question: '„Ha egy tört nevezője osztója az 1000-nek, akkor annak a törtnek a tizedestört alakja véges.” Igaz vagy hamis?',
        options: [
          'IGAZ, mert 1000 = 2³ · 5³, így bármely osztójának prímtényezői kizárólag a 2 és az 5 lehetnek',
          'HAMIS, mert a számlálótól is függ',
          'HAMIS, mert az 1/3 is lehetne osztója',
          'Csak negatív számokra igaz'
        ],
        correctAnswer: 0,
        hint: 'Az 1000 prímtényezői: 2 · 2 · 2 · 5 · 5 · 5. Lehet benne más prím?',
        explanation: 'IGAZ állítás! Mivel 1000 = 10³ = 2³ · 5³, az 1000 minden osztója kizárólag 2-es és 5-ös prímtényezőket tartalmazhat, ami garantálja a véges tizedestört alakot.'
      },
      {
        id: 'rq3-7',
        questionTypeBadge: 'Tankönyv 51. o. 5. Feladat Megfordítása',
        question: '„Ha egy tört tizedestört alakja véges, akkor a nevezője osztója az 1000-nek.” Igaz vagy hamis?',
        options: [
          'HAMIS, ellenpélda az 1/32 = 0,03125, ami véges, de a 32 nem osztója az 1000-nek (hanem 100 000-nek)',
          'IGAZ, mert minden véges tizedestört felírható ezrelékként',
          'Csak 1-nél kisebb számokra igaz',
          'IGAZ, ez a fenti állítás megfordítása'
        ],
        correctAnswer: 0,
        hint: 'Gondolj egy olyan nevezőre, ami 2 hatványa, de nagyobb, mint 8 (pl. 16, 32, 64)!',
        explanation: 'HAMIS! A tizedestört alakja véges lehet 4, 5 vagy több tizedesjeggyel is (pl. 1/16 = 0,0625 vagy 1/32 = 0,03125). A 16 és 32 nem osztója az 1000-nek, hanem a 10 000-nek és 100 000-nek.'
      },
      {
        id: 'rq3-8',
        questionTypeBadge: 'Irracionális Szorzat',
        question: 'Mennyi a (3 − √7) · (3 + √7) szorzat értéke, és melyik számhalmazba tartozik?',
        options: [
          '2, ami természetes szám (ℕ), egész (ℤ) és racionális (ℚ)',
          '9 − √7, ami irracionális szám (ℚ*)',
          '16, ami természetes szám',
          'Nem végezhető el a művelet'
        ],
        correctAnswer: 0,
        hint: 'Használd a nevezetes azonosságot: (a − b)(a + b) = a² − b² !',
        explanation: '(a − b)(a + b) = a² − b² azonosság alapján: 3² − (√7)² = 9 − 7 = 2. Két irracionális szám szorzata egy természetes, racionális szám lett!'
      },
      {
        id: 'rq3-9',
        questionTypeBadge: 'Gyökök Hányadosa',
        question: 'Mennyi a √18 / √2 kifejezés értéke, és melyik halmazba tartozik?',
        options: [
          '3, ami természetes szám (ℕ) és racionális (ℚ)',
          '√9 / 2 (irracionális)',
          '√16 = 4',
          'Irracionális, mert mindkét szám irracionális'
        ],
        correctAnswer: 0,
        hint: 'Azonosság: √a / √b = √(a / b). Mennyi 18 / 2 ?',
        explanation: '√18 / √2 = √(18 / 2) = √9 = 3. Két irracionális szám hányadosa egy egész racionális szám (3 ∈ ℕ)!'
      },
      {
        id: 'rq3-10',
        questionTypeBadge: 'Racionális + Irracionális Összeg',
        question: 'Ha q egy racionális szám (q ∈ ℚ) és i egy irracionális szám (i ∈ ℚ*), milyen szám lesz a q + i összeg?',
        options: [
          'MINDIG irracionális szám (q + i ∈ ℚ*)',
          'Mindig racionális szám',
          'Lehet racionális és irracionális is q-tól függően',
          'Csak akkor irracionális, ha q = 0'
        ],
        correctAnswer: 0,
        hint: 'Ha q + i = r racionális lenne, akkor i = r − q is racionális lenne két racionális különbségeként...',
        explanation: 'Indirekt bizonyítás: Ha q + i = r racionális lenne, akkor i = r − q szintén racionális lenne, hiszen a ℚ zárt a kivonásra. De i irracionális, ami ellentmondás! Így q + i mindig irracionális.'
      }
    ]
  }
};

const rationalIrrationalCheatSheets: CheatSheetCard[] = [
  {
    title: '1. Tizedestört Alakok Kritériuma',
    variant: 'blue',
    content: (
      <div className="space-y-1.5 text-xs">
        <p><strong>Véges tizedestört:</strong> egyszerűsített nevező prímtényezői <em>csak 2 és/vagy 5</em>.</p>
        <p><strong>Végtelen szakaszos:</strong> egyszerűsített nevezőben <em>szerepel más prím is</em> (pl. 3, 7, 11).</p>
        <p><strong>Végtelen nem szakaszos:</strong> <em>irracionális számok (ℚ*)</em>, nem írhatók fel két egész hányadosaként.</p>
      </div>
    )
  },
  {
    title: '2. Szakaszos Tizedestört Átírása',
    variant: 'purple',
    content: (
      <div className="space-y-1 text-xs font-mono">
        <p>• 0,(p) ⟹ x = 0,p... ⟹ 10x − x = 9x = p ⟹ x = p/9</p>
        <p>• 0,(27) ⟹ 100x − x = 99x = 27 ⟹ x = 27/99 = 3/11</p>
        <p>• 0,1(6) ⟹ 100x − 10x = 90x = 15 ⟹ x = 15/90 = 1/6</p>
        <p className="font-bold text-purple-700">Tény: 0,(9) = 1 !</p>
      </div>
    )
  },
  {
    title: '3. A √2 Indirekt Bizonyítása & Skatulya-elv',
    variant: 'amber',
    content: (
      <div className="space-y-1 text-xs">
        <p>• Indirekt feltevés: √2 = p/q (lnko = 1).</p>
        <p>• p² = 2q² ⟹ p páros ⟹ q² = 2k² ⟹ q is páros.</p>
        <p>• Ellentmondás az egyszerűsíthetetlenséggel ⟹ √2 ∈ ℚ*!</p>
        <p>• Skatulya-elv: b-vel osztva a szakasz hossza <em>legfeljebb b − 1</em>.</p>
      </div>
    )
  }
];

export const RationalIrrationalQuiz: React.FC<RationalIrrationalQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Racionális és Irracionális Számok Gyakorló Kvíz"
      subtitle="Véges és végtelen tizedestörtek, négyzetgyök és az irracionális számok 30 feladatban"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • √ GYAKORLÓ KVÍZ"
      emoji="√"
      themeColor="purple"
      levelConfigs={quizLevels}
      cheatSheetCards={rationalIrrationalCheatSheets}
      cheatSheetTitle="Valós Számok és Irracionalitás Segédlet"
      defaultLevel={1}
      grade={9}
      chapterId="szamok-vilaga"
      topicId="g9-szamok-racionalis-irracionalis-quiz"
      topicTitle="Racionális és irracionális számok"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a tizedestörteket, számhalmazokat és bizonyítási lépéseket!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <RationalIrrationalMatcher
              key={`rational-matcher-${level}`}
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
          subtitle: 'Kategorizáld a számokat racionális, irracionális és tizedestört típus szerint!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <RationalIrrationalSorter
              key={`rational-sorter-${level}`}
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

export default RationalIrrationalQuiz;
