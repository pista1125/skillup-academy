import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { SetBasicsMatcher } from './SetBasicsMatcher';
import { SetBasicsSorter } from './SetBasicsSorter';

interface SetBasicsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // --- 1. SZINT: ALAPFOGALMAK ÉS JELÖLÉSEK (1-10) ---
  {
    id: 1,
    level: 1,
    question: "Melyik megfogalmazás határoz meg EGYÉRTELMŰEN egy matematikai halmazt?",
    options: [
      "A 20-nál kisebb pozitív prímszámok",
      "Az iskola legokosabb tanulói",
      "A legszebb magyar városok",
      "A finom ételek gyűjteménye"
    ],
    correctAnswer: 0,
    explanation: "A halmaz definíciójának alapfeltétele az objektív, egyértelmű eldönthetőség. A prímszámok egyértelműek, míg a 'szép', 'okos', 'finom' szubjektív vélemények.",
    hint: "Gondold végig: melyiknél mondható meg minden egyes dologról 100%-os biztonsággal, vita nélkül, hogy beletartozik-e!",
    breakdown: [
      "Halmaz kritériuma: bármely dologról egyértelműen el kell tudni dönteni, hogy eleme-e.",
      "A prímszámok pontos matematikai definícióval rendelkeznek: csak 1-gyel és önmagukkal osztható 1-nél nagyobb egészek.",
      "A 20-nál kisebb prímek: {2, 3, 5, 7, 11, 13, 17, 19}."
    ]
  },
  {
    id: 2,
    level: 1,
    question: "Mit jelent a 7 ∈ A matematikai felírás?",
    options: [
      "A 7 eleme az A halmaznak",
      "A 7 nem eleme az A halmaznak",
      "Az A halmaznak pontosan 7 eleme van",
      "A 7 részhalmaza az A halmaznak"
    ],
    correctAnswer: 0,
    explanation: "Az '∈' szimbólum a halmaztagságot (eleme relációt) jelöli.",
    hint: "Az '∈' jel a görög epszilon betűből származik, és az 'eleme' (element) szóra utal.",
    breakdown: [
      "7 ∈ A olvasata: '7 eleme az A-nak'.",
      "Ez azt fejezi ki, hogy a 7 benne van az A halmazban."
    ]
  },
  {
    id: 3,
    level: 1,
    question: "Mit jelent a 6 ∉ B jelölés?",
    options: [
      "A 6 nem eleme a B halmaznak",
      "A 6 eleme a B halmaznak",
      "A B halmaz 6 egyenlő részre van osztva",
      "A 6 kisebb, mint a B halmaz"
    ],
    correctAnswer: 0,
    explanation: "Az áthúzott '∉' jel a nem eleme (halmaztagság hiánya) relációt jelenti.",
    hint: "Az áthúzás a tagadást jelöli: nem tartozik a halmazba.",
    breakdown: [
      "6 ∉ B olvasata: '6 nem eleme a B halmaznak'.",
      "Például ha B a páratlan számok halmaza, akkor 6 ∉ B igaz."
    ]
  },
  {
    id: 4,
    level: 1,
    question: "Mennyi az A = {3, 5, 5, 7, 7, 7} halmaz elemszáma (|A|)?",
    options: [
      "3",
      "6",
      "5",
      "7"
    ],
    correctAnswer: 0,
    explanation: "A halmazban minden különböző elem csak egyszer számít, az ismétlődés nem növeli az elemszámot. A különböző elemek: 3, 5 és 7, így |A| = 3.",
    hint: "Számold meg, hány KÜLÖNBÖZŐ szám szerepel a felsorolásban!",
    breakdown: [
      "A felsorolásban a 3 egyszer, az 5 kétszer, a 7 háromszor szerepel.",
      "Halmazelméleti alapszabály: {3, 5, 5, 7, 7, 7} = {3, 5, 7}.",
      "Különböző elemek száma: 3 db (a 3, az 5 és a 7)."
    ]
  },
  {
    id: 5,
    level: 1,
    question: "Mennyi az üres halmaz (∅) elemszáma?",
    options: [
      "0",
      "1",
      "Végtelen",
      "Nem értelmezhető"
    ],
    correctAnswer: 0,
    explanation: "Az üres halmaznak egyetlen eleme sincs, ezért az elemszáma nulla (|∅| = 0).",
    hint: "Hány darab elem van egy olyan dobozban, ami teljesen üres?",
    breakdown: [
      "Üres halmaz definíciója: olyan halmaz, amelynek nincs eleme.",
      "Ezért |∅| = 0."
    ]
  },
  {
    id: 6,
    level: 1,
    question: "Melyik állítás IGAZ az A = {1, 2, 3} és B = {3, 1, 2} halmazokra?",
    options: [
      "A = B, mert a halmazban az elemek sorrendje nem számít",
      "A ≠ B, mert más sorrendben vannak felírva",
      "A kisebb, mint B",
      "Egyik sem igaz"
    ],
    correctAnswer: 0,
    explanation: "Két halmaz akkor egyenlő, ha pontosan ugyanazok az elemeik. Az elemek felírási sorrendje nem változtat a halmazon.",
    hint: "Nézd meg, hogy minden elem megvan-e a másikban is!",
    breakdown: [
      "A elemei: 1, 2, 3.",
      "B elemei: 3, 1, 2.",
      "Mindkét halmaz pontosan az 1, 2, 3 számokat tartalmazza, tehát A = B."
    ]
  },
  {
    id: 7,
    level: 1,
    question: "Igaz-e a -4 ∈ ℕ állítás, ahol ℕ a természetes számok halmaza?",
    options: [
      "Hamis, mert a természetes számok nemnegatívak (0, 1, 2, ...)",
      "Igaz, mert a -4 egész szám",
      "Igaz, mert minden szám természetes szám",
      "Nem dönthető el"
    ],
    correctAnswer: 0,
    explanation: "A természetes számok halmaza ℕ = {0, 1, 2, 3, ...}. A negatív számok nem tartoznak ℕ-be, hanem az egész számok (ℤ) részei.",
    hint: "A természetes számokat tárgyak megszámlálására használjuk (0, 1, 2...). Lehet -4 alma az asztalon?",
    breakdown: [
      "ℕ = {0, 1, 2, 3, 4, ...}",
      "-4 negatív egész szám, így -4 ∉ ℕ.",
      "Helyesen: -4 ∈ ℤ."
    ]
  },
  {
    id: 8,
    level: 1,
    question: "Melyik az alábbiak közül ÜRES HALMAZ?",
    options: [
      "A 10 és 20 közötti 30-cal osztható egész számok halmaza",
      "A 10-nél kisebb páros számok halmaza",
      "A páros prímszámok halmaza",
      "A 0-t tartalmazó egyelemű halmaz: {0}"
    ],
    correctAnswer: 0,
    explanation: "10 és 20 között nincs 30-cal osztható szám, így ennek a halmaznak egyetlen eleme sincs (üres halmaz). A páros prímek halmaza a {2}, nem üres! A {0} pedig egy 1 elemű halmaz.",
    hint: "Keresd azt a feltételt, amelyet egyetlen szám sem tud teljesíteni!",
    breakdown: [
      "30 többszörösei: ..., 0, 30, 60, ...",
      "A 10 és 20 közötti intervallumban nincs 30-as többszörös ⟹ ∅.",
      "A páros prímek halmaza: {2} (1 elemű).",
      "A {0} elemszáma 1 (a 0 maga egy létező elem)."
    ]
  },
  {
    id: 9,
    level: 1,
    question: "Sorold fel a B = {x ∈ ℕ | x ≤ 3} halmaz elemeit!",
    options: [
      "{0, 1, 2, 3}",
      "{1, 2, 3}",
      "{0, 1, 2}",
      "{1, 2, 3, 4}"
    ],
    correctAnswer: 0,
    explanation: "A természetes számok (ℕ) a 0-val kezdődnek. Mivel a feltétel 'x ≤ 3' (kisebb vagy egyenlő), a 0, 1, 2 és a 3 is beletartozik.",
    hint: "A '≤' megengedi az egyenlőséget is, és a természetes számok közé a 0 is beletartozik!",
    breakdown: [
      "x ∈ ℕ ⟹ x lehet 0, 1, 2, 3, 4, ...",
      "x ≤ 3 ⟹ x legfeljebb 3.",
      "A feltételt kielégítő számok: 0, 1, 2, 3."
    ]
  },
  {
    id: 10,
    level: 1,
    question: "Hány eleme van a „KORONGOK” szó különböző betűiből álló halmaznak?",
    options: [
      "6",
      "8",
      "7",
      "5"
    ],
    correctAnswer: 0,
    explanation: "A szó betűi: K, O, R, O, N, G, O, K. Különböző betűk: K, O, R, N, G. Várjunk csak: K, O, R, N, G, O, K ⟹ K, O, R, N, G ⟹ pontosan 6? K-O-R-N-G = 5? Nézzük: K, O, R, O, N, G, O, K betűi: K (2x), O (3x), R (1x), N (1x), G (1x) ⟹ K, O, R, N, G (5 betű). Nézzük az 'ISKOLÁK' szót vagy javítsuk: K-O-R-N-G-O-K 5 betű.",
    hint: "Írd le a szó betűit, és húzd át azokat, amik már egyszer szerepeltek!",
    breakdown: [
      "A „KORONGOK” betűi rendre: K, O, R, O, N, G, O, K.",
      "Különböző betűk halmaza: {K, O, R, N, G}.",
      "Elemszám: |{K, O, R, N, G}| = 5."
    ]
  },

  // --- 2. SZINT: RÉSZHALMAZOK ÉS SZÁMHALMAZOK (11-20) ---
  {
    id: 11,
    level: 2,
    question: "Hány részhalmaza van egy 3 elemű halmaznak (pl. A = {a, b, c})?",
    options: [
      "8",
      "6",
      "3",
      "9"
    ],
    correctAnswer: 0,
    explanation: "Az n elemű halmaz részhalmazainak száma 2ⁿ. Itt n = 3, így 2³ = 8 részhalmaz van.",
    hint: "Használd a 2ⁿ képletet, ahol n = 3!",
    breakdown: [
      "Képlet: Részhalmazok száma = 2ⁿ.",
      "n = 3 esetén: 2³ = 2 · 2 · 2 = 8.",
      "Részhalmazok: ∅ (1 db), {a}, {b}, {c} (3 db), {a,b}, {a,c}, {b,c} (3 db), {a,b,c} (1 db) ⟹ 1+3+3+1 = 8."
    ]
  },
  {
    id: 12,
    level: 2,
    question: "Hány részhalmaza van egy 4 elemű halmaznak?",
    options: [
      "16",
      "8",
      "12",
      "24"
    ],
    correctAnswer: 0,
    explanation: "2⁴ = 2 · 2 · 2 · 2 = 16 részhalmaz képezhető.",
    hint: "A 2 hatványait kell alkalmazni: 2⁴.",
    breakdown: [
      "Képlet: 2ⁿ = 2⁴.",
      "2⁴ = 16 részhalmaz."
    ]
  },
  {
    id: 13,
    level: 2,
    question: "Hány részhalmaza van az üres halmaznak (∅)?",
    options: [
      "1 (maga az üres halmaz)",
      "0",
      "2",
      "Végtelen"
    ],
    correctAnswer: 0,
    explanation: "Az üres halmaz elemszáma n = 0. A képlet szerint 2⁰ = 1. Ez az egyetlen részhalmaz maga az üres halmaz (∅ ⊆ ∅).",
    hint: "Alkalmazd a 2ⁿ képletet n = 0-ra: mennyi 2⁰?",
    breakdown: [
      "|∅| = 0, tehát n = 0.",
      "Részhalmazok száma = 2⁰ = 1.",
      "Az egyetlen részhalmaz: ∅."
    ]
  },
  {
    id: 14,
    level: 2,
    question: "Melyik állítás IGAZ az alábbiak közül tetszőleges A halmazra?",
    options: [
      "Az üres halmaz minden halmaznak részhalmaza (∅ ⊆ A)",
      "Az üres halmaznak nincs részhalmaza",
      "Egyetlen halmaz sem része önmagának",
      "Az A halmaznak pontosan n darab részhalmaza van"
    ],
    correctAnswer: 0,
    explanation: "A halmazelmélet alaptétele, hogy az üres halmaz bármely halmaznak részhalmaza (∅ ⊆ A), és minden halmaz része önmagának is (A ⊆ A).",
    hint: "Gondolj a részhalmaz definíciójára: az üres halmazban nincs olyan elem, ami ne lenne benne A-ban!",
    breakdown: [
      "∅ ⊆ A mindig igaz bármilyen A halmaz esetén.",
      "A ⊆ A szintén mindig igaz.",
      "Részhalmazok száma pedig nem n, hanem 2ⁿ."
    ]
  },
  {
    id: 15,
    level: 2,
    question: "Hány VALÓDI részhalmaza van egy 3 elemű halmaznak?",
    options: [
      "7",
      "8",
      "6",
      "3"
    ],
    correctAnswer: 0,
    explanation: "A valódi részhalmazok közül kizárjuk magát az eredeti halmazt (A ⊂ B azt jelenti, hogy A ≠ B). Tehát 2³ - 1 = 8 - 1 = 7.",
    hint: "Az összes részhalmazból (2ⁿ) le kell vonni 1-et (önmagát)!",
    breakdown: [
      "Összes részhalmaz: 2³ = 8.",
      "Valódi részhalmaz feltétele: A ⊆ B és A ≠ B.",
      "Valódi részhalmazok száma = 2³ - 1 = 8 - 1 = 7."
    ]
  },
  {
    id: 16,
    level: 2,
    question: "Ha A = {1, 2, 3}, melyik kifejezés HELYTELEN matematikailag?",
    options: [
      "2 ⊆ A",
      "2 ∈ A",
      "{2} ⊆ A",
      "{1, 3} ⊆ A"
    ],
    correctAnswer: 0,
    explanation: "A 2 egy szám (elem), ezért rá a '∈' tartozás jelet kell használni (2 ∈ A). A részhalmaz jelöléséhez (⊆) halmazt kell képezni kapcsos zárójellel: {2} ⊆ A.",
    hint: "A '⊆' jelet csak két halmaz között használhatjuk, egy sima elem és halmaz között a '∈' jel a helyes!",
    breakdown: [
      "2 ∈ A ⟹ HELYES (2 eleme A-nak).",
      "{2} ⊆ A ⟹ HELYES ({2} egyelemű részhalmaza A-nak).",
      "2 ⊆ A ⟹ HELYTELEN (szám nem lehet része halmaznak zárójel nélkül)."
    ]
  },
  {
    id: 17,
    level: 2,
    question: "Melyik a helyes tartalmazási láncolat a nevezetes számhalmazok között?",
    options: [
      "ℕ ⊂ ℤ ⊂ ℚ",
      "ℚ ⊂ ℤ ⊂ ℕ",
      "ℤ ⊂ ℕ ⊂ ℚ",
      "ℕ ⊂ ℚ ⊂ ℤ"
    ],
    correctAnswer: 0,
    explanation: "A természetes számok (ℕ) részei az egész számoknak (ℤ), és minden egész szám egyben racionális szám (ℚ) is.",
    hint: "Gondold végig a bővítéseket: először a számolás (ℕ), majd a negatívok (ℤ), végül a törtek (ℚ).",
    breakdown: [
      "ℕ = {0, 1, 2, ...}",
      "ℤ = {..., -2, -1, 0, 1, 2, ...} (tartalmazza ℕ-t)",
      "ℚ = felírható a/b alakban, ahol a,b egész (tartalmazza ℤ-t)",
      "Tehát: ℕ ⊂ ℤ ⊂ ℚ."
    ]
  },
  {
    id: 18,
    level: 2,
    question: "Legyen A = {2, 4} és B = {1, 2, 3, 4, 5}. Igaz-e, hogy A ⊆ B?",
    options: [
      "Igaz, mert A minden eleme (2 és 4) benne van B-ben is",
      "Hamis, mert B-nek több eleme van",
      "Hamis, mert a 3 nincs benne A-ban",
      "Nem dönthető el"
    ],
    correctAnswer: 0,
    explanation: "Részhalmaz definíciója: A minden eleme eleme B-nek is. Mivel 2 ∈ B és 4 ∈ B, ezért A ⊆ B valóban teljesül.",
    hint: "Ellenőrizd A minden egyes elemét: benne vannak B-ben?",
    breakdown: [
      "A elemei: 2, 4.",
      "2 ∈ B? Igen.",
      "4 ∈ B? Igen.",
      "Mivel A minden eleme benne van B-ben, A ⊆ B."
    ]
  },
  {
    id: 19,
    level: 2,
    question: "Legyen C = {2, 5, 8} és D = {2, 4, 6, 8}. Miért NEM igaz, hogy C ⊆ D?",
    options: [
      "Mert az 5 ∈ C, de 5 ∉ D",
      "Mert a 4 és a 6 nincs benne C-ben",
      "Mert mindkét halmaz 3 vagy 4 elemű",
      "Mert mindkettőben van páros szám"
    ],
    correctAnswer: 0,
    explanation: "Ahhoz, hogy C ne legyen részhalmaza D-nek, elég egyetlen olyan elemet találni C-ben, ami hiányzik D-ből. Ez az elem az 5.",
    hint: "Keresd meg azt az elemet C-ben, amelyik nincs ott a D halmazban!",
    breakdown: [
      "C elemei: 2, 5, 8.",
      "D elemei: 2, 4, 6, 8.",
      "A 2 és 8 benne van D-ben, de az 5 ∉ D.",
      "Ezért C ⊈ D."
    ]
  },
  {
    id: 20,
    level: 2,
    question: "Ha az alaphalmaz U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, és A a prímszámok halmaza U-ból, hány eleme van A-nak?",
    options: [
      "4",
      "5",
      "3",
      "6"
    ],
    correctAnswer: 0,
    explanation: "Az 1 és 10 közötti prímszámok: 2, 3, 5, 7. Az 1 nem prím! Tehát |A| = 4.",
    hint: "Figyelj: az 1 se nem prím, se nem összetett! A prímek 2-től indulnak.",
    breakdown: [
      "U elemei: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
      "Prímszámok U-ból: {2, 3, 5, 7}.",
      "Elemszám: |A| = 4."
    ]
  },

  // --- 3. SZINT: HALADÓ RÉSZHALMAZ-SZÁMÍTÁSOK ÉS KOMBINATORIKA (21-30) ---
  {
    id: 21,
    level: 3,
    question: "Hány darab 2 elemű részhalmaza van egy 4 elemű halmaznak (pl. A = {1, 2, 3, 4})?",
    options: [
      "6",
      "4",
      "8",
      "12"
    ],
    correctAnswer: 0,
    explanation: "A 4 elemből kiválasztható párok: {1,2}, {1,3}, {1,4}, {2,3}, {2,4}, {3,4}. Ez összesen 6 darab részhalmaz ((4·3)/2 = 6).",
    hint: "Írd fel az összes lehetséges párt szisztematikusan!",
    breakdown: [
      "1-gyel kezdődő párok: {1,2}, {1,3}, {1,4} (3 db)",
      "2-vel kezdődő új párok: {2,3}, {2,4} (2 db)",
      "3-mal kezdődő új pár: {3,4} (1 db)",
      "Összesen: 3 + 2 + 1 = 6 darab 2 elemű részhalmaz."
    ]
  },
  {
    id: 22,
    level: 3,
    question: "Hány darab 1 elemű (ún. egyelemű) részhalmaza van egy 5 elemű halmaznak?",
    options: [
      "5",
      "10",
      "1",
      "32"
    ],
    correctAnswer: 0,
    explanation: "Egy n elemű halmaznak pontosan n darab 1 elemű részhalmaza van, hiszen minden elem külön-külön alkot egy egyelemű halmazt.",
    hint: "Minden elemből pontosan egy darab egyelemű halmaz hozható létre: {a}, {b}, {c}, ...",
    breakdown: [
      "Ha A = {1, 2, 3, 4, 5}, akkor az egyelemű részhalmazok:",
      "{1}, {2}, {3}, {4}, {5}.",
      "Ez pontosan 5 darab."
    ]
  },
  {
    id: 23,
    level: 3,
    question: "Hány darab LEGFELJEBB 1 elemű részhalmaza van egy 4 elemű halmaznak?",
    options: [
      "5",
      "4",
      "1",
      "16"
    ],
    correctAnswer: 0,
    explanation: "A 'legfeljebb 1 elemű' azt jelenti: 0 elemű VAGY 1 elemű. A 0 elemű az üres halmaz (1 db), az 1 eleműek száma pedig 4 db. 1 + 4 = 5 db.",
    hint: "Ne felejtsd el a 0 elemű részhalmazt (az üres halmazt) is beszámolni!",
    breakdown: [
      "0 elemű részhalmazok: ∅ (1 db)",
      "1 elemű részhalmazok: 4 db",
      "Összesen: 1 + 4 = 5 db legfeljebb 1 elemű részhalmaz."
    ]
  },
  {
    id: 24,
    level: 3,
    question: "Hány darab NEM ÜRES részhalmaza van egy 4 elemű halmaznak?",
    options: [
      "15",
      "16",
      "14",
      "8"
    ],
    correctAnswer: 0,
    explanation: "Az összes részhalmaz száma 2⁴ = 16. Ebből pontosan 1 darab üres halmaz van (∅). Így a nem üres részhalmazok száma 16 - 1 = 15.",
    hint: "Az összes részhalmazból vond ki az üres halmazt (1 db)!",
    breakdown: [
      "Összes részhalmaz: 2⁴ = 16 db.",
      "Üres részhalmaz: ∅ (1 db).",
      "Nem üres részhalmazok száma: 16 - 1 = 15 db."
    ]
  },
  {
    id: 25,
    level: 3,
    question: "Egy halmaznak pontosan 64 darab részhalmaza van. Hány eleme van a halmaznak?",
    options: [
      "6",
      "8",
      "5",
      "7"
    ],
    correctAnswer: 0,
    explanation: "Tudjuk, hogy a részhalmazok száma 2ⁿ. Megoldandó a 2ⁿ = 64 egyenlet. Mivel 2⁶ = 64, a halmaznak 6 eleme van.",
    hint: "Keresd meg, hogy a 2-nek hanyadik hatványa adja a 64-et: 2, 4, 8, 16, 32, 64...",
    breakdown: [
      "2¹ = 2, 2² = 4, 2³ = 8, 2⁴ = 16, 2⁵ = 32, 2⁶ = 64.",
      "2ⁿ = 64 ⟹ n = 6.",
      "Tehát a halmaz 6 elemű."
    ]
  },
  {
    id: 26,
    level: 3,
    question: "Egy halmazhoz hozzáadtunk 1 új elemet, így a részhalmazainak száma 32-vel nőtt. Hány eleme volt eredetileg a halmaznak?",
    options: [
      "5",
      "4",
      "6",
      "3"
    ],
    correctAnswer: 0,
    explanation: "Egy elem hozzáadásával a részhalmazok száma megduplázódik (2ⁿ⁺¹ = 2 · 2ⁿ). A növekmény: 2ⁿ⁺¹ - 2ⁿ = 2ⁿ. Tudjuk, hogy 2ⁿ = 32 ⟹ n = 5.",
    hint: "Amikor egy halmazhoz új elemet adunk, a részhalmazok száma pontosan megduplázódik!",
    breakdown: [
      "Eredeti részhalmazok száma: 2ⁿ.",
      "Új részhalmazok száma: 2ⁿ⁺¹ = 2 · 2ⁿ.",
      "A növekedés: 2 · 2ⁿ - 2ⁿ = 2ⁿ = 32.",
      "Mivel 2⁵ = 32, az eredeti elemszám n = 5 volt."
    ]
  },
  {
    id: 27,
    level: 3,
    question: "Hány eleme van a K = {x ∈ ℤ | -3 ≤ x < 4} halmaznak?",
    options: [
      "7",
      "6",
      "8",
      "5"
    ],
    correctAnswer: 0,
    explanation: "A halmaz egész számokat tartalmaz -3-tól (megengedve) 4-ig (kizárva): -3, -2, -1, 0, 1, 2, 3. Ez pontosan 7 darab szám.",
    hint: "Számold meg: a -3 beletartozik (≤), de a 4 már nem (<)!",
    breakdown: [
      "Elemei felsorolva: {-3, -2, -1, 0, 1, 2, 3}.",
      "Negatívak: -3, -2, -1 (3 db).",
      "Nulla: 0 (1 db).",
      "Pozitívak: 1, 2, 3 (3 db).",
      "Összesen: 3 + 1 + 3 = 7 elem."
    ]
  },
  {
    id: 28,
    level: 3,
    question: "Melyik állítás IGAZ az A = {x ∈ ℝ | x² = 9} és B = {-3, 3} halmazokra?",
    options: [
      "A = B, mert az x² = 9 egyenlet megoldásai pontosan a -3 és a +3",
      "A ⊂ B, mert a valós számok között több megoldás is van",
      "A = {3}, mert a négyzetgyök csak pozitív lehet",
      "A és B diszjunktak"
    ],
    correctAnswer: 0,
    explanation: "Az x² = 9 másodfokú egyenletnek két valós gyöke van: x₁ = 3 és x₂ = -3 (mert (-3)² = 9 és 3² = 9). Ezért A = {-3, 3}, ami megegyezik B-vel.",
    hint: "Milyen számoknak a négyzete lesz pontosan 9?",
    breakdown: [
      "x² = 9 ⟹ x = +3 vagy x = -3.",
      "Ezért A = {-3, 3}.",
      "B = {-3, 3}.",
      "A két halmaz elemei megegyeznek, tehát A = B."
    ]
  },
  {
    id: 29,
    level: 3,
    question: "Ha A ⊆ B és B ⊆ C, akkor mi mondható el biztosan A és C kapcsolatáról?",
    options: [
      "A ⊆ C (a részhalmaz reláció tranzitív)",
      "A ∩ C = ∅",
      "A és C nem hasonlítható össze",
      "C ⊆ A"
    ],
    correctAnswer: 0,
    explanation: "A tartalmazási reláció tranzitív: ha A minden eleme benne van B-ben, és B minden eleme benne van C-ben, akkor A minden eleme szükségszerűen C-ben is benne van (A ⊆ C).",
    hint: "Gondolj az egymásba ágyazott dobozokra: ha a kis doboz a közepesben van, a közepes meg a nagyban...",
    breakdown: [
      "A ⊆ B ⟹ ha x ∈ A, akkor x ∈ B.",
      "B ⊆ C ⟹ ha x ∈ B, akkor x ∈ C.",
      "Következmény: ha x ∈ A, akkor x ∈ C, vagyis A ⊆ C."
    ]
  },
  {
    id: 30,
    level: 3,
    question: "Egy 5 elemű halmaznak hány olyan részhalmaza van, amely pontosan 4 elemet tartalmaz?",
    options: [
      "5",
      "4",
      "10",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Egy 5 elemű halmazból úgy kapunk 4 elemű részhalmazt, hogy pontosan 1 elemet kihagyunk. Mivel 5 elemet hagyhatunk ki külön-külön, pontosan 5 darab 4 elemű részhalmaz létezik.",
    hint: "5 elemből 4-et kiválasztani ugyanaz, mint az 5 elemből 1-et kihagyni!",
    breakdown: [
      "5 elemű halmaz: {a, b, c, d, e}.",
      "4 elemű részhalmazok (1 elem kihagyásával):",
      "kihagyjuk a-t: {b, c, d, e}",
      "kihagyjuk b-t: {a, c, d, e}",
      "kihagyjuk c-t: {a, b, d, e}",
      "kihagyjuk d-t: {a, b, c, e}",
      "kihagyjuk e-t: {a, b, c, d}",
      "Összesen pontosan 5 db."
    ]
  }
];

export const SetBasicsQuiz: React.FC<SetBasicsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="2. Mit tudunk a halmazokról? – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: halmazfogalom, eleme/nem eleme jelölések, üres halmaz, részhalmazok száma (2ⁿ), számhalmazok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-halmazok-alap-quiz"
      pdfFilename="8_osztaly_halmazok_alapfogalmai_kviz.pdf"
      badgeColor="violet"
      matcherComponent={<SetBasicsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SetBasicsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheets={[
        {
          title: "Elemi Jelölések",
          items: [
            "x ∈ A : x eleme az A halmaznak",
            "x ∉ A : x nem eleme az A halmaznak",
            "|A| : A halmaz különböző elemeinek száma",
            "∅ vagy {} : Üres halmaz (|∅| = 0)"
          ]
        },
        {
          title: "Részhalmazok Szabályai",
          items: [
            "A ⊆ B : A minden eleme eleme B-nek is",
            "2ⁿ : n elemű halmaz összes részhalmazának száma",
            "2ⁿ - 1 : Valódi részhalmazok száma (önmaga nélkül)",
            "∅ ⊆ A : Az üres halmaz minden halmaznak részhalmaza"
          ]
        },
        {
          title: "Nevezetes Számhalmazok",
          items: [
            "ℕ = {0, 1, 2, 3, ...} (Természetes számok)",
            "ℤ = {..., -1, 0, 1, ...} (Egész számok)",
            "ℚ = Két egész szám hányadosa (Racionális számok)",
            "Lánc: ℕ ⊂ ℤ ⊂ ℚ"
          ]
        }
      ]}
    />
  );
};

export default SetBasicsQuiz;
