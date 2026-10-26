import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { NumberSetsMatcher } from './NumberSetsMatcher';
import { NumberSetsSorter } from './NumberSetsSorter';
import {
  NumberSetsVennSvg,
  ClosureMatrixSvg,
  AxiomsVisualSvg,
  InversesVisualSvg
} from './NumberSetsFigures';
import { ArrowRightLeft, LayoutGrid } from 'lucide-react';

interface NumberSetsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
}

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Számhalmazok és Besorolásuk (Könnyű)',
    subtitle: 'A nevezetes számhalmazok (ℕ, ℤ, ℚ, ℚ*, ℝ), jelöléseik és alaptulajdonságaik.',
    range: '1 - 10. feladat',
    focus: 'Hierarchia és Szimbólumok',
    questions: [
      {
        id: 'nsq1-1',
        questionTypeBadge: 'Természetes Számok (ℕ)',
        question: 'A magyar középiskolai és érettségi tananyag szerint a 0 (nulla) eleme-e a természetes számok (ℕ) halmazának?',
        figure: <NumberSetsVennSvg size={160} />,
        options: [
          'Igen, a 0 a legkisebb természetes szám (0 ∈ ℕ)',
          'Nem, a természetes számok 1-gyel kezdődnek',
          'Csak az egész számoknak (ℤ) eleme',
          'A 0 semelyik számhalmaznak nem eleme'
        ],
        correctAnswer: 0,
        hint: 'A hazai matematikai szabvány alapján ℕ = {0, 1, 2, 3, ...}.',
        explanation: 'A magyar tantervben a természetes számok halmaza a nemnegatív egész számokból áll: ℕ = {0, 1, 2, 3, ...}, így 0 ∈ ℕ.'
      },
      {
        id: 'nsq1-2',
        questionTypeBadge: 'Egész Számok (ℤ)',
        question: 'Az alábbi számok közül melyik az, amelyik eleme ℤ-nek, de NEM eleme ℕ-nek?',
        options: ['-7', '0', '12', '3/4'],
        correctAnswer: 0,
        hint: 'Keresd a negatív egész számot!',
        explanation: 'A -7 negatív egész szám, így -7 ∈ ℤ, de negatív volta miatt -7 ∉ ℕ.'
      },
      {
        id: 'nsq1-3',
        questionTypeBadge: 'Racionális Számok (ℚ)',
        question: 'Hogyan definiáljuk a racionális számok (ℚ) halmazát?',
        options: [
          'Olyan számok, amelyek felírhatók a/b alakban, ahol a ∈ ℤ és b ∈ ℤ \\ {0}',
          'Csak a véges tizedestörtek és a természetes számok',
          'Minden olyan szám, amely a számegyenesen ábrázolható',
          'A negatív törtek és a prímszámok összessége'
        ],
        correctAnswer: 0,
        hint: 'A latin „ratio” (arány, hányados) szóból ered: két egész szám hányadosa.',
        explanation: 'A racionális számok definíció szerint két egész szám hányadosaként (a/b) felírható számok, ahol a nevező b nem lehet nulla.'
      },
      {
        id: 'nsq1-4',
        questionTypeBadge: 'Gyökök Besorolása',
        question: 'Melyik a legszűkebb nevezetes számhalmaz, amelybe a √49 szám beletartozik?',
        options: [
          'ℕ (Természetes számok)',
          'ℚ* (Irracionális számok)',
          'ℚ \\ ℤ (Racionális törtek)',
          'Csak az ℝ (Valós számok)'
        ],
        correctAnswer: 0,
        hint: 'Végezd el a négyzetgyökvonást! Mennyi 7 · 7?',
        explanation: 'A √49 = 7, ami pozitív egész szám, tehát a legszűkebb halmaz a természetes számok halmaza: 7 ∈ ℕ.'
      },
      {
        id: 'nsq1-5',
        questionTypeBadge: 'Tizedestörtek Típusa',
        question: 'Milyen számhalmazba tartozik a 0,333... (0,(3)) végtelen szakaszos tizedestört?',
        options: [
          'ℚ (Racionális számok), mert felírható 1/3 közönséges törtként',
          'ℚ* (Irracionális számok), mert végtelen sok tizedesjegye van',
          'ℤ (Egész számok)',
          'Nem valós szám'
        ],
        correctAnswer: 0,
        hint: 'Minden végtelen SZAKASZOS tizedestört átírható két egész szám hányadosává!',
        explanation: 'A 0,333... = 1/3, ami két egész szám hányadosa, így racionális szám (ℚ). Csak a végtelen NEM szakaszos tizedestörtek irracionálisak.'
      },
      {
        id: 'nsq1-6',
        questionTypeBadge: 'Irracionális Számok (ℚ*)',
        question: 'Az alábbiak közül melyik szám IRRACIONÁLIS (ℚ*)?',
        options: ['√2', '√16', '3,14', '-5/8'],
        correctAnswer: 0,
        hint: 'A 2 nem négyzetszám, a 3,14 pedig véges tizedestört (314/100).',
        explanation: 'A 2 nem négyzetszám, így a √2 tizedestört alakja végtelen és nem szakaszos, nem írható fel két egész hányadosaként, tehát irracionális (√2 ∈ ℚ*).'
      },
      {
        id: 'nsq1-7',
        questionTypeBadge: 'Valós Számok (ℝ)',
        question: 'Melyik összefüggés fejezi ki helyesen a valós számok (ℝ) felépítését?',
        figure: <NumberSetsVennSvg size={160} />,
        options: [
          'ℝ = ℚ ∪ ℚ* (a racionális és irracionális számok egyesítése)',
          'ℝ = ℕ ∩ ℤ',
          'ℝ = ℚ ∩ ℚ*',
          'ℝ = ℤ ∪ ℚ'
        ],
        correctAnswer: 0,
        hint: 'A valós számok a racionális és az irracionális számokból állnak össze.',
        explanation: 'A valós számok halmaza a racionális és az irracionális számok diszjunkt egyesítése: ℝ = ℚ ∪ ℚ*, és ℚ ∩ ℚ* = ∅.'
      },
      {
        id: 'nsq1-8',
        questionTypeBadge: 'Számhalmazok Lánca',
        question: 'Melyik az érvényes hierarchikus tartalmazási lánc a számhalmazok között?',
        options: [
          'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ',
          'ℤ ⊂ ℕ ⊂ ℚ ⊂ ℝ',
          'ℕ ⊂ ℚ ⊂ ℤ ⊂ ℝ',
          'ℚ* ⊂ ℚ ⊂ ℝ'
        ],
        correctAnswer: 0,
        hint: 'Természetes → Egész → Racionális → Valós.',
        explanation: 'Minden természetes szám egyben egész szám, minden egész racionális tört (a/1), és minden racionális szám valós: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.'
      },
      {
        id: 'nsq1-9',
        questionTypeBadge: 'Eleme Reláció',
        question: 'Melyik állítás IGAZ az alábbiak közül?',
        options: [
          '-3/5 ∈ ℚ és -3/5 ∉ ℤ',
          '0 ∉ ℕ és 0 ∈ ℤ',
          'π ∈ ℚ és π ∉ ℝ',
          '√9 ∈ ℚ*'
        ],
        correctAnswer: 0,
        hint: 'A -3/5 tört nem egész, de két egész szám hányadosa.',
        explanation: 'A -3/5 racionális szám (ℚ), de nem egész szám (∉ ℤ). A többi állítás hamis: 0 ∈ ℕ, π ∈ ℚ*, és √9 = 3 ∈ ℕ.'
      },
      {
        id: 'nsq1-10',
        questionTypeBadge: 'A π és e számok',
        question: 'Melyik halmazba tartozik a geometriából ismert π (pi) szám?',
        options: [
          'ℚ* és ℝ (irracionális és valós)',
          'ℚ (racionális, mert pontosan 3,14)',
          'ℤ (egész szám)',
          'ℕ (természetes szám)'
        ],
        correctAnswer: 0,
        hint: 'A 3,14 csak egy két tizedesjegyre kerekített közelítő érték!',
        explanation: 'A π egy transzcendens, irracionális szám (π ≈ 3,14159265...), tizedesjegyei végtelenek és nem periodikusak, így π ∈ ℚ* ⊂ ℝ.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Műveleti Axiómák és Zártság Alapjai (Közepes)',
    subtitle: 'Kommutativitás, asszociativitás, disztributivitás, semleges elemek és zártság.',
    range: '11 - 20. feladat',
    focus: 'Axiómák és Műveleti Tulajdonságok',
    questions: [
      {
        id: 'nsq2-1',
        questionTypeBadge: 'Műveleti Zártság',
        question: 'Mit jelent pontosan az, hogy egy H halmaz zárt az összeadás műveletére nézve?',
        figure: <ClosureMatrixSvg size={160} />,
        options: [
          'Bármely két H-beli szám összege szintén a H halmaz eleme',
          'A halmazban van összeadási semleges elem (0)',
          'A halmaz elemei között nem szerepel negatív szám',
          'A halmaz elemszáma véges'
        ],
        correctAnswer: 0,
        hint: 'A művelet elvégzése után sem esünk ki a halmazból.',
        explanation: 'Egy H halmaz akkor zárt a + műveletre, ha ∀ a, b ∈ H esetén a + b ∈ H teljesül.'
      },
      {
        id: 'nsq2-2',
        questionTypeBadge: 'ℕ Kivonási Zártsága',
        question: 'Zárt-e a természetes számok (ℕ) halmaza a KIVONÁS műveletére?',
        options: [
          'Nem zárt, mert pl. 3 - 8 = -5 ∉ ℕ (negatív eredmény keletkezhet)',
          'Igen zárt, mert a természetes számok kivonhatók egymásból',
          'Csak akkor zárt, ha a kivonandó 0',
          'Igen, és a kivonás kommutatív is'
        ],
        correctAnswer: 0,
        hint: 'Kisebb számból vonj ki egy nagyobbat: benne marad-e a természetes számokban?',
        explanation: 'A természetes számok nem tartalmaznak negatív számokat, így pl. 3 - 8 = -5 ∉ ℕ miatt a kivonásra ℕ NEM zárt!'
      },
      {
        id: 'nsq2-3',
        questionTypeBadge: 'ℤ Osztási Zártsága',
        question: 'Zárt-e az egész számok (ℤ) halmaza az OSZTÁSRA (nullával nem osztva)?',
        options: [
          'Nem zárt, mert pl. 1 : 2 = 0,5 ∉ ℤ (törtet kapunk)',
          'Igen zárt, mert pl. 6 : 2 = 3 ∈ ℤ',
          'Igen zárt, mert az egészek lefedik a számegyenest',
          'Csak a pozitív egészekre zárt'
        ],
        correctAnswer: 0,
        hint: 'Egyetlen ellenpélda (pl. 3 : 4) elég ahhoz, hogy a zártság elbukjon!',
        explanation: 'Két egész szám hányadosa gyakran nem egész szám (pl. 1 : 4 = 0,25 ∉ ℤ), ezért ℤ nem zárt az osztásra.'
      },
      {
        id: 'nsq2-4',
        questionTypeBadge: 'Kommutativitás',
        question: 'Melyik azonosság fejezi ki a szorzás KOMMUTATIVITÁSÁT (felcserélhetőségét)?',
        figure: <AxiomsVisualSvg size={160} />,
        options: [
          'a · b = b · a',
          '(a · b) · c = a · (b · c)',
          'a · (b + c) = a·b + a·c',
          'a · 1 = a'
        ],
        correctAnswer: 0,
        hint: 'Kommutálni = felcserélni a tényezők sorrendjét.',
        explanation: 'Az a · b = b · a a kommutativitás képlete: a tényezők sorrendje felcserélhető anélkül, hogy a szorzat értéke megváltozna.'
      },
      {
        id: 'nsq2-5',
        questionTypeBadge: 'Asszociativitás Cáfolata',
        question: 'Igaz-e a kivonásra az asszociativitás: (a - b) - c = a - (b - c)?',
        options: [
          'Nem, pl. (10 - 4) - 2 = 4, viszont 10 - (4 - 2) = 8',
          'Igen, a zárójelezés sosem változtatja meg a kivonást',
          'Csak akkor, ha c = 0',
          'Igen, mert a kivonás kommutatív'
        ],
        correctAnswer: 0,
        hint: 'Számold ki mindkét oldalt a megadott számokkal!',
        explanation: '(10 - 4) - 2 = 6 - 2 = 4, míg 10 - (4 - 2) = 10 - 2 = 8. Mivel 4 ≠ 8, a kivonás NEM asszociatív!'
      },
      {
        id: 'nsq2-6',
        questionTypeBadge: 'Disztributivitás',
        question: 'Melyik műveleti törvény teszi lehetővé a zárójelek felbontását az a · (b + c) = a·b + a·c kifejezésben?',
        options: [
          'Disztributivitás (széttagolhatóság)',
          'Asszociativitás (csoportosíthatóság)',
          'Kommutativitás (felcserélhetőség)',
          'Tranzitivitás'
        ],
        correctAnswer: 0,
        hint: 'A szorzás széttagolása az összeadás tagjaira.',
        explanation: 'A szorzás összeadásra és kivonásra nézve disztributív: a · (b + c) = a·b + a·c.'
      },
      {
        id: 'nsq2-7',
        questionTypeBadge: 'Semleges Elemek',
        question: 'Mely számok a valós számok körében az ÖSSZEADÁS és a SZORZÁS semleges elemei?',
        figure: <InversesVisualSvg size={160} />,
        options: [
          'Összeadásra a 0 (a + 0 = a), szorzásra az 1 (a · 1 = a)',
          'Összeadásra az 1, szorzásra a 0',
          'Mindkét műveletre a 0',
          'Mindkét műveletre az 1'
        ],
        correctAnswer: 0,
        hint: 'Melyik számmal elvégezve a műveletet marad változatlan az eredeti szám értéke?',
        explanation: 'A 0 az összeadás semleges eleme (a + 0 = a), az 1 pedig a szorzás semleges eleme (a · 1 = a).'
      },
      {
        id: 'nsq2-8',
        questionTypeBadge: 'Inverz Elemek: Reciprok',
        question: 'Mi a feltétele annak, hogy egy valós „a” számnak létezzen szorzási inverze (reciproka, 1/a)?',
        options: [
          'Az, hogy a ≠ 0 (nullának nincs reciproka)',
          'Csak pozitív számoknak van reciproka',
          'Csak egész számoknak van reciproka',
          'Minden valós számnak van reciproka kivétel nélkül'
        ],
        correctAnswer: 0,
        hint: 'Lehet-e a nevezőben nulla?',
        explanation: 'Bármely nem nulla valós számhoz létezik reciprok (1/a), amire a · (1/a) = 1. A 0 az egyetlen valós szám, amelynek nincs reciproka, mert nullával nem oszthatunk!'
      },
      {
        id: 'nsq2-9',
        questionTypeBadge: 'Nullával Való Osztás',
        question: 'Miért NEM ÉRTELMEZETT a matematikában a nullával való osztás (pl. 7 : 0)?',
        options: [
          'Mert nincs olyan x valós szám, amire x · 0 = 7 teljesülne',
          'Mert az eredmény mindig 0 lenne',
          'Mert a negatív számok kizárják',
          'Csak a fizikában nem értelmezett, a matematikában végtelen'
        ],
        correctAnswer: 0,
        hint: 'Az osztás a szorzás megfordítása: ha 7 : 0 = x, akkor x · 0 = 7 kellene legyen.',
        explanation: 'Bármilyen valós számot 0-val szorozva 0-t kapunk, sosem 7-et. Így nem létezik olyan szám, amely kielégítené a definíciót, ezért a nullával való osztás nem értelmezett.'
      },
      {
        id: 'nsq2-10',
        questionTypeBadge: 'ℚ Zártsága',
        question: 'Igaz-e, hogy a racionális számok (ℚ) halmaza ZÁRT a szorzás műveletére?',
        options: [
          'Igen, két tört szorzata (a/b · c/d = (ac)/(bd)) mindig racionális szám',
          'Nem, mert két tört szorzata lehet irracionális',
          'Nem, mert törtek szorzata negatív nem lehet',
          'Csak pozitív törtekre igaz'
        ],
        correctAnswer: 0,
        hint: 'Egész szorozva egésszel mindig egész marad.',
        explanation: 'Ha a/b és c/d racionális számok, akkor szorzatuk (ac)/(bd), ahol ac ∈ ℤ és bd ∈ ℤ \\ {0}, tehát az eredmény is garantáltan racionális szám.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Zártsági Ellenpéldák és Érettségi Feladatok (Nehéz)',
    subtitle: 'ℚ* zártságának cáfolatai, vegyes műveletek, számtestek és érettségi típusfeladatok.',
    range: '21 - 30. feladat',
    focus: 'Összetett Logika és Ellenpéldák',
    questions: [
      {
        id: 'nsq3-1',
        questionTypeBadge: 'ℚ* Összeadási Zártsága',
        question: 'Zárt-e az irracionális számok halmaza (ℚ*) az összeadásra nézve?',
        options: [
          'NEM zárt, mert pl. √2 + (-√2) = 0, és a 0 racionális szám (0 ∈ ℚ)',
          'Igen zárt, mert két fura irracionális szám összege mindig fura irracionális',
          'Igen zárt, kivéve ha mindkettő π',
          'Csak pozitív gyökökre zárt'
        ],
        correctAnswer: 0,
        hint: 'Keress két olyan irracionális számot, amelyek kioltják egymást!',
        explanation: 'A √2 és a -√2 egyaránt irracionális számok, de összegük √2 + (-√2) = 0, ami racionális szám. Így ℚ* nem zárt az összeadásra!'
      },
      {
        id: 'nsq3-2',
        questionTypeBadge: 'ℚ* Szorzási Zártsága',
        question: 'Melyik az az ellenpélda, amely igazolja, hogy az irracionális számok halmaza (ℚ*) NEM zárt a szorzásra?',
        figure: <ClosureMatrixSvg size={160} />,
        options: [
          '√3 · √3 = 3 ∈ ℚ',
          '√2 · √3 = √6 ∈ ℚ*',
          '2 · 3 = 6 ∈ ℕ',
          'π · 1 = π ∈ ℚ*'
        ],
        correctAnswer: 0,
        hint: 'Két irracionális szám szorzata mikor ad racionális eredményt?',
        explanation: 'A √3 irracionális, de önmagával megszorozva: √3 · √3 = 3, ami természetes/racionális szám. Ezért ℚ* nem zárt a szorzásra.'
      },
      {
        id: 'nsq3-3',
        questionTypeBadge: 'Racionális + Irracionális',
        question: 'Legyen q ∈ ℚ egy tetszőleges racionális szám, és i ∈ ℚ* egy irracionális szám. Milyen szám lesz az összegük (q + i)?',
        options: [
          'Mindig irracionális szám (q + i ∈ ℚ*)',
          'Mindig racionális szám',
          'Függ attól, hogy q páros vagy páratlan',
          'Néha racionális, néha irracionális'
        ],
        correctAnswer: 0,
        hint: 'Ha q + i = r racionális lenne, akkor i = r - q is racionális lenne, ami ellentmondás!',
        explanation: 'Indirekt bizonyítással: ha q + i = r ∈ ℚ lenne, akkor i = r - q racionális számok különbségeként racionális volna, ami ellentmond annak, hogy i irracionális. Tehát q + i MINDIG irracionális.'
      },
      {
        id: 'nsq3-4',
        questionTypeBadge: 'Racionális · Irracionális',
        question: 'Legyen q ∈ ℚ egy NEM NULLA racionális szám (q ≠ 0), és i ∈ ℚ* irracionális. Milyen szám lesz a szorzatuk (q · i)?',
        options: [
          'Mindig irracionális szám (q · i ∈ ℚ*)',
          'Mindig racionális szám',
          'Lehet 0 is',
          'Nem határozható meg'
        ],
        correctAnswer: 0,
        hint: 'Mivel q ≠ 0, oszthatunk vele: ha a szorzat racionális lenne, i is az lenne.',
        explanation: 'Nem nulla racionális szám és irracionális szám szorzata mindig irracionális (pl. 2 · √2 = 2√2 ∈ ℚ*). Ha q = 0 lenne, a szorzat 0 lenne (racionális).'
      },
      {
        id: 'nsq3-5',
        questionTypeBadge: 'Két Irracionális Hányadosa',
        question: 'Lehet-e két irracionális szám hányadosa racionális szám?',
        options: [
          'Igen, például √18 : √2 = √9 = 3 ∈ ℚ',
          'Nem, irracionális számok hányadosa mindig irracionális',
          'Csak akkor, ha mindkettő negatív',
          'Csak a π és e arányára igaz'
        ],
        correctAnswer: 0,
        hint: 'Végezd el a gyök alatti osztást: √(18/2) = ?',
        explanation: 'A √18 és √2 mindketten irracionálisak, de hányadosuk: √18 / √2 = √(18/2) = √9 = 3 ∈ ℚ (racionális). Sőt, bármely x ∈ ℚ* esetén x/x = 1 ∈ ℚ.'
      },
      {
        id: 'nsq3-6',
        questionTypeBadge: 'Érettségi Típusfeladat: Végtelen Tört',
        question: 'Melyik közönséges tört alak felel meg a 0,666... (0,(6)) végtelen szakaszos tizedestörtnek?',
        options: ['2/3', '6/10', '66/100', '3/5'],
        correctAnswer: 0,
        hint: '1/3 = 0,333... ennek a duplája mennyi?',
        explanation: 'A 0,(6) = 6/9 = 2/3. Mivel két egész hányadosa, ez bizonyítja, hogy a végtelen szakaszos tizedestörtek racionális számok.'
      },
      {
        id: 'nsq3-7',
        questionTypeBadge: 'Számhalmazok Bővítésének Oka',
        question: 'Miért volt szükség a matematikában a természetes számok (ℕ) kibővítésére az egész számok (ℤ) halmazává?',
        options: [
          'Hogy a kivonás művelete korlátozás nélkül elvégezhető legyen (zárttá váljon)',
          'Hogy az osztás mindig elvégezhető legyen',
          'A négyzetgyökvonás miatt',
          'A koordinátarendszer feltalálása miatt'
        ],
        correctAnswer: 0,
        hint: 'Melyik művelet nem volt elvégezhető ℕ-ben kisebb és nagyobb szám között?',
        explanation: 'A természetes számok halmazában a kisebb számból nem lehetett nagyobbat kivonni (pl. 3 - 5). A negatív számok bevezetésével a kivonás művelete korlátozás nélkül elvégezhetővé (zárttá) vált ℤ-ben.'
      },
      {
        id: 'nsq3-8',
        questionTypeBadge: 'Érettségi Állítás Elemzése',
        question: 'Melyik állítás IGAZ az alábbiak közül?',
        options: [
          'Bármely két racionális szám között végtelen sok irracionális szám található (ℚ sűrű ℝ-ben)',
          'Az egész számok halmaza zárt az osztásra',
          'A √100 irracionális szám',
          'A negatív számoknak nem létezik ellentettjük'
        ],
        correctAnswer: 0,
        hint: 'A racionális és irracionális számok is „sűrűn” helyezkednek el a valós számegyenesen.',
        explanation: 'A valós számegyenesen bármely két különböző racionális szám között végtelen sok irracionális (és végtelen sok racionális) szám van. A többi állítás egyértelműen hamis.'
      },
      {
        id: 'nsq3-9',
        questionTypeBadge: 'Összetett Zártsági Teszt',
        question: 'Az alábbi halmazok közül melyik NEM zárt a szorzásra nézve?',
        options: [
          'A negatív valós számok halmaza (ℝ⁻)',
          'A páros természetes számok halmaza',
          'A pozitív racionális számok halmaza (ℚ⁺)',
          'Az egész számok halmaza (ℤ)'
        ],
        correctAnswer: 0,
        hint: 'Két negatív szám szorzata milyen előjelű?',
        explanation: 'Két negatív szám szorzata POZITÍV (pl. -2 · (-3) = +6), ami nem eleme a negatív számok halmazának! Ezért a negatív számok halmaza nem zárt a szorzásra.'
      },
      {
        id: 'nsq3-10',
        questionTypeBadge: 'Érettségi Csapda Kérdés',
        question: 'Az alábbi matematikai állítások közül melyik HAMIS?',
        options: [
          'Minden valós szám felírható két egész szám hányadosaként',
          'A 0 páros természetes szám',
          'Az irracionális számok tizedestört alakja végtelen és nem szakaszos',
          'A szorzás disztributív a kivonásra nézve: a·(b - c) = a·b - a·c'
        ],
        correctAnswer: 0,
        hint: 'Csak a racionális számok írhatók fel két egész szám hányadosaként!',
        explanation: 'Az az állítás, hogy „minden valós szám felírható két egész szám hányadosaként”, HAMIS! Ez csak a racionális számokra (ℚ) igaz, a valós számok része az irracionális számok halmaza is (ℚ*), amik nem írhatók fel törtként.'
      }
    ]
  }
};

const numberSetsCheatSheets: CheatSheetCard[] = [
  {
    id: 'nscs-1',
    title: 'A Nevezetes Számhalmazok Lánca',
    formula: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\quad | \\quad \\mathbb{Q}^* \\subset \\mathbb{R}',
    description: 'ℕ: természetes számok {0, 1, 2..}, ℤ: egészek, ℚ: törtek (a/b), ℚ*: irracionálisok (√2, π), ℝ: valós számok.',
    note: 'Fontos: a 0 természetes szám! Négyzetszámok gyöke nem irracionális: √25 = 5 ∈ ℕ.',
    figure: <NumberSetsVennSvg size={140} />,
    color: 'blue'
  },
  {
    id: 'nscs-2',
    title: 'A Műveleti Zártság Mátrixa',
    formula: '\\forall a, b \\in H \\implies a \\circ b \\in H',
    description: 'ℕ zárt: +, · | ℤ zárt: +, -, · | ℚ és ℝ zárt: +, -, ·, / (kivéve 0-val osztás) | ℚ* SEMMILYEN alapműveletre nem zárt!',
    note: 'Ellenpéldák ℚ*-ra: √2 + (-√2) = 0 ∈ ℚ és √3 · √3 = 3 ∈ ℚ.',
    figure: <ClosureMatrixSvg size={140} />,
    color: 'emerald'
  },
  {
    id: 'nscs-3',
    title: 'Műveleti Axiómák és Tulajdonságok',
    formula: 'a + b = b + a \\quad | \\quad (a \\cdot b) \\cdot c = a \\cdot (b \\cdot c) \\quad | \\quad a(b+c) = ab + ac',
    description: 'Összeadás és szorzás kommutatív és asszociatív. A szorzás disztributív az összeadásra és kivonásra.',
    note: 'A kivonás és az osztás NEM kommutatív és NEM asszociatív!',
    figure: <AxiomsVisualSvg size={140} />,
    color: 'indigo'
  },
  {
    id: 'nscs-4',
    title: 'Semleges Elemek és Inverzek',
    formula: 'a + 0 = a \\quad | \\quad a + (-a) = 0 \\quad | \\quad a \\cdot 1 = a \\quad | \\quad a \\cdot \\frac{1}{a} = 1',
    description: 'Összeadás semleges eleme a 0, inverze az ellentett (-a). Szorzás semleges eleme az 1, inverze a reciprok (1/a).',
    note: 'A 0 számnak nincs reciproka, és nullával való osztás NEM ÉRTELMEZETT!',
    figure: <InversesVisualSvg size={140} />,
    color: 'purple'
  }
];

export const NumberSetsQuiz: React.FC<NumberSetsQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter
}) => {
  return (
    <QuizTemplate
      title="Műveletek Számhalmazokban Gyakorló Kvíz"
      subtitle="Természetes, egész, racionális és valós számok, műveleti tulajdonságok és zártság 30 feladatban"
      badgeText="9. OSZTÁLY • II. A SZÁMOK VILÁGA • 🔢 GYAKORLÓ KVÍZ"
      emoji="🔢"
      themeColor="blue"
      levelConfigs={quizLevels}
      cheatSheetCards={numberSetsCheatSheets}
      cheatSheetTitle="Számhalmazok és Műveletek Segédlet"
      defaultLevel={1}
      grade={9}
      chapterId="szamok-vilaga"
      topicId="g9-szamok-muveletek-quiz"
      topicTitle="Műveletek számhalmazokban"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      customGameModes={[
        {
          id: 'matcher',
          title: 'Párosító Játék',
          subtitle: 'Párosítsd a számhalmazokat, axiómákat és zártsági ellenpéldákat!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToSorter: switchToSorter }) => (
            <NumberSetsMatcher
              key={`numbersets-matcher-${level}`}
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
          subtitle: 'Kategorizáld a számokat, zártsági tulajdonságokat és állításokat!',
          badgeText: '12 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
          render: ({ level, onNextLevel, onOpenRules, onSwitchToQuiz: switchToQuiz, onSwitchToMatcher: switchToMatcher }) => (
            <NumberSetsSorter
              key={`numbersets-sorter-${level}`}
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

export default NumberSetsQuiz;
