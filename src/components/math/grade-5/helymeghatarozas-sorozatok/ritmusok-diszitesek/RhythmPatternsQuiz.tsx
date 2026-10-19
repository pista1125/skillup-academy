import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { RhythmPatternsMatcher } from './RhythmPatternsMatcher';
import { RhythmPatternsSorter } from './RhythmPatternsSorter';

export interface RhythmPatternsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const RHYTHM_PATTERNS_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: RITMUSOK ÉS ALAPSZAKASZ FELISMERÉSE (1-10)
  // =========================================================================
  {
    id: 'rpq1-1',
    level: 1,
    prompt: 'Mit nevezünk a matematikában egy sorminta alapszakaszának (alapmotívumának)?',
    options: [
      'A minta legkisebb önálló részét, amelynek ismétlésével felépül az egész díszítősor',
      'A sorminta első és utolsó elemét',
      'A minta teljes hosszát centiméterben',
      'A sor közepén lévő elemet'
    ],
    correctAnswer: 0,
    explanation: 'Az alapszakasz a sorminta „magja”: a legkisebb olyan elemfüzér, amelyet újra és újra egymás után másolva megkapjuk a végtelen díszítősort.',
    hint: 'Gondolj a legkisebb ismétlődő részre!',
    breakdown: [
      { label: 'Fogalom', value: 'Alapszakasz (motívum)' },
      { label: 'Szerepe', value: 'Ennek ismétlésével épül fel a teljes sor' }
    ],
    figure: (
      <svg className="w-40 h-16 mx-auto" viewBox="0 0 160 60">
        <rect x="5" y="8" width="55" height="44" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
        <text x="32" y="5" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">Alapszakasz</text>
        <circle cx="20" cy="30" r="7" fill="#ef4444" />
        <rect x="37" y="23" width="14" height="14" fill="#3b82f6" rx="2" />
        <circle cx="75" cy="30" r="7" fill="#ef4444" />
        <rect x="92" y="23" width="14" height="14" fill="#3b82f6" rx="2" />
        <circle cx="130" cy="30" r="7" fill="#ef4444" />
        <rect x="147" y="23" width="14" height="14" fill="#3b82f6" rx="2" />
      </svg>
    )
  },
  {
    id: 'rpq1-2',
    level: 1,
    prompt: 'Mekkora a periódushossza a következő sormintának: 🔺 🔵 🟡 🔺 🔵 🟡 🔺 🔵 🟡 ...?',
    options: [
      '3 elem (az alapszakasz: [🔺, 🔵, 🟡])',
      '6 elem',
      '9 elem',
      '1 elem'
    ],
    correctAnswer: 0,
    explanation: 'A mintában három különböző alakzat (piros háromszög, kék kör, sárga kör) követi egymást szabályosan, majd újra kezdődik. A periódushossz tehát 3.',
    hint: 'Számold meg, hány elem után kezdi elölről!',
    breakdown: [
      { label: 'Alapszakasz', value: '[🔺, 🔵, 🟡]' },
      { label: 'Periódushossz', value: '3 elem' }
    ]
  },
  {
    id: 'rpq1-3',
    level: 1,
    prompt: 'Mi a következő hiányzó elem ebben a sormintában: ⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ⭐ ⭐ [?] ?',
    options: [
      '🌙 (hold)',
      '⭐ (csillag)',
      '☀️ (nap)',
      'Bármelyik lehet'
    ],
    correctAnswer: 0,
    explanation: 'Az alapszakasz [⭐, ⭐, 🌙] (két csillag, egy hold). Mivel a két csillag már megjelent, a szabály szerint most a holdnak (🌙) kell következnie.',
    hint: 'A szabály: két csillag után mindig egy hold jön.',
    breakdown: [
      { label: 'Szabály', value: '2 csillag + 1 hold' },
      { label: 'Hiányzó elem', value: '🌙' }
    ]
  },
  {
    id: 'rpq1-4',
    level: 1,
    prompt: 'Hány elemből áll a periódus a következő mintában: A B C D A B C D A B C D ...?',
    options: [
      '4 elemből (A, B, C, D)',
      '3 elemből',
      '5 elemből',
      '12 elemből'
    ],
    correctAnswer: 0,
    explanation: 'Az alapszakasz négy betűből áll: [A, B, C, D]. Ez ismétlődik ciklikusan, így a periódushossz pontosan 4.',
    hint: 'Négy betű után tér vissza az A-ra.',
    breakdown: [
      { label: 'Alapszakasz', value: '[A, B, C, D]' },
      { label: 'Periódushossz', value: '4 elem' }
    ]
  },
  {
    id: 'rpq1-5',
    level: 1,
    prompt: 'Mi a ritmus szabálya a következő díszítősorban: ⬆ ⬇ ⬆ ⬇ ⬆ ⬇ ...?',
    options: [
      'Felfelé és lefelé mutató nyilak váltakoznak (2 elemű alapszakasz)',
      'Minden nyíl felfelé mutat',
      'A nyilak 90 fokkal jobbra forognak',
      'Nincs benne szabályos ritmus'
    ],
    correctAnswer: 0,
    explanation: 'A nyíl felváltva mutat felfelé és lefelé. Ez egy kétállapotú, vízszintes tükrözéssel létrehozott ritmus, amelynek periódushossza 2.',
    hint: 'Két irány váltogatja egymást: fel és le.',
    breakdown: [
      { label: 'Irányok', value: 'Fel és le' },
      { label: 'Periódus', value: '2 elem [⬆, ⬇]' }
    ]
  },
  {
    id: 'rpq1-6',
    level: 1,
    prompt: 'Melyik motívum alkotja az alapszakaszt a következő gyümölcssorban: 🍎 🍐 🍌 🍎 🍐 🍌 🍎 🍐 🍌 ...?',
    options: [
      '[🍎, 🍐, 🍌]',
      '[🍎, 🍐]',
      '[🍎, 🍎, 🍎]',
      '[🍌, 🍎]'
    ],
    correctAnswer: 0,
    explanation: 'A legkisebb önálló egység az alma-körte-banán hármas: [🍎, 🍐, 🍌]. Ennek ismétlésével kapjuk a teljes sort.',
    hint: 'Keresd a 3 különböző gyümölcsöt!',
    breakdown: [
      { label: 'Alapszakasz', value: '[🍎, 🍐, 🍌]' },
      { label: 'Hosszúság', value: '3 elem' }
    ]
  },
  {
    id: 'rpq1-7',
    level: 1,
    prompt: 'Egy sorminta alapszakasza 5 elemű. Melyik korábbi elemmel fog pontosan megegyezni a 6. elem?',
    options: [
      'Az 1. elemmel (mivel a 6. elem egy új alapszakaszt indít)',
      'A 2. elemmel',
      'Az 5. elemmel',
      'Egyikkel sem'
    ],
    correctAnswer: 0,
    explanation: 'Az első 5 elem után az 5 elemű szakasz véget ér. A 6. elem a második alapszakasz legelső tagja, így tökéletesen megegyezik az 1. elemmel.',
    hint: 'Az 5. elem után újraindul a minta elölről.',
    breakdown: [
      { label: '1–5. elem', value: '1. alapszakasz' },
      { label: '6. elem', value: '2. alapszakasz 1. eleme' }
    ]
  },
  {
    id: 'rpq1-8',
    level: 1,
    prompt: 'Mi hiányzik a kérdőjel helyéről: 🟢 🔴 🟢 🔴 [?] 🔴 🟢 🔴 ?',
    options: [
      '🟢 (zöld kör)',
      '🔴 (piros kör)',
      '🟡 (sárga kör)',
      'Semmi sem hiányzik'
    ],
    correctAnswer: 0,
    explanation: 'A minta felváltva tartalmaz zöld és piros kört. A páratlan helyeken (1., 3., 5.) mindig zöld kör van, így az 5. helyen álló kérdőjel helyére zöld kör (🟢) való.',
    hint: 'Zöld, piros, zöld, piros után mi jön?',
    breakdown: [
      { label: 'Szabály', value: 'Zöld és piros váltakozik' },
      { label: 'Páratlan helyek', value: '🟢 zöld' }
    ]
  },
  {
    id: 'rpq1-9',
    level: 1,
    prompt: 'Karkötő készítésekor a gyerekek ezt a ritmust követik: 2 kék gyöngy, majd 1 piros gyöngy. Hány gyöngy alkot egy teljes alapszakaszt?',
    options: [
      '3 gyöngy (2 kék + 1 piros)',
      '2 gyöngy',
      '4 gyöngy',
      '1 gyöngy'
    ],
    correctAnswer: 0,
    explanation: 'Egy teljes motívum 2 kék és 1 piros gyöngyből áll: [K, K, P]. Ez összesen 2 + 1 = 3 gyöngy.',
    hint: 'Add össze a két kék és az egy piros gyöngyöt!',
    breakdown: [
      { label: 'Kék gyöngyök', value: '2 db' },
      { label: 'Piros gyöngyök', value: '1 db' },
      { label: 'Összesen (periódus)', value: '3 gyöngy' }
    ]
  },
  {
    id: 'rpq1-10',
    level: 1,
    prompt: 'Melyik sorminta alapszakaszának hossza (periódusa) pontosan 2?',
    options: [
      '◼ ◻ ◼ ◻ ◼ ◻ ...',
      '🔺 🔵 🟡 🔺 🔵 🟡 ...',
      '1 2 3 4 1 2 3 4 ...',
      'A B C A B C ...'
    ],
    correctAnswer: 0,
    explanation: 'A fekete és fehér négyzet váltakozásában [◼, ◻] két elem alkotja a legkisebb ismétlődő egységet, így a periódushossza 2.',
    hint: 'Keresd a 2 elemből álló váltakozást!',
    breakdown: [
      { label: 'Minta', value: '◼ ◻ ◼ ◻' },
      { label: 'Periódus', value: '2 elem' }
    ]
  },

  // =========================================================================
  // 2. SZINT: GEOMETRIAI TRANSZFORMÁCIÓK DÍSZÍTŐSOROKBAN (11-20)
  // =========================================================================
  {
    id: 'rpq2-1',
    level: 2,
    prompt: 'Milyen geometriai transzformációval jön létre az alábbi díszítősor: ▲ ▲ ▲ ▲ ▲ ▲ ?',
    options: [
      'Eltolással (transzlációval): az alakzat formája és iránya teljesen változatlan marad',
      'Tükrözéssel',
      'Forgatással',
      'Nagyítással'
    ],
    correctAnswer: 0,
    explanation: 'Minden háromszög felfelé mutat és azonos méretű, csak vízszintesen el vannak tolva egymás mellett: ez a transzláció (eltolás).',
    hint: 'Az alakzatok pontosan ugyanúgy állnak, csak elmozdulnak jobbra.',
    breakdown: [
      { label: 'Transzformáció', value: 'Eltolás (transzláció)' },
      { label: 'Tulajdonság', value: 'Irány és forma nem változik' }
    ]
  },
  {
    id: 'rpq2-2',
    level: 2,
    prompt: 'Milyen geometriai transzformáció hozza létre ezt a díszítősort: ▲ ▼ ▲ ▼ ▲ ▼ ?',
    options: [
      'Vízszintes tengelyes tükrözés (felfelé és lefelé fordított alakzatok váltakozása)',
      'Pusztán eltolás',
      'Csak 45 fokos forgatás',
      'Kicsinyítés'
    ],
    correctAnswer: 0,
    explanation: 'A háromszögek felváltva felfelé és lefelé mutatnak, mintha egy vízszintes tükörtengelyre tükröznénk őket egymás után.',
    hint: 'Gondolj a vízfelszínre, ami tükrözi a hegycsúcsot lefelé!',
    breakdown: [
      { label: 'Tengely', value: 'Vízszintes tükörtengely' },
      { label: 'Típus', value: 'Tengelyes tükrözés (reflexió)' }
    ]
  },
  {
    id: 'rpq2-3',
    level: 2,
    prompt: 'Milyen geometriai mozgás hozza létre a következő forgó nyílsort: ⬆ ➡ ⬇ ⬅ ⬆ ➡ ...?',
    options: [
      'Lépésenként 90°-os elforgatás az óramutató járásával megegyező irányban',
      'Tengelyes tükrözés',
      'Csak párhuzamos eltolás',
      '180°-os átfordítás'
    ],
    correctAnswer: 0,
    explanation: 'A nyíl felről jobbra (90°), majd lefelé (180°), végül balra (270°) fordul, aztán újra felfelé mutat (360°): lépésenként 90°-os forgatás történik.',
    hint: 'Figyeld meg a nyíl hegyét: körbe-körbe forog 90 fokonként!',
    breakdown: [
      { label: 'Szög', value: '90° lépésenként' },
      { label: 'Irány', value: 'Órajárás szerint' },
      { label: 'Periódus', value: '4 elem' }
    ]
  },
  {
    id: 'rpq2-4',
    level: 2,
    prompt: 'Hány lépés után érkezik vissza a kiindulási helyzetébe egy olyan motívum, amelyet lépésenként 90°-kal forgatunk el körbe?',
    options: [
      '4 lépés után (mivel 4 · 90° = 360°, ami egy teljes fordulat)',
      '2 lépés után',
      '3 lépés után',
      '8 lépés után'
    ],
    correctAnswer: 0,
    explanation: 'A teljes kör 360°. Mivel 360° : 90° = 4, a negyedik forgatás után az alakzat pontosan a kiindulási állásába érkezik vissza.',
    hint: 'A teljes fordulat 360 fok. Hányszor van meg benne a 90?',
    breakdown: [
      { label: 'Teljes kör', value: '360°' },
      { label: 'Lépések száma', value: '360° : 90° = 4 lépés' }
    ]
  },
  {
    id: 'rpq2-5',
    level: 2,
    prompt: 'Hány lépés után tér vissza az eredeti állásába egy olyan motívum, amelyet minden lépésben 180°-kal (fél fordulattal) fordítunk el?',
    options: [
      '2 lépés után (mivel 2 · 180° = 360°)',
      '4 lépés után',
      '1 lépés után',
      '3 lépés után'
    ],
    correctAnswer: 0,
    explanation: 'Az első 180°-os forgatás fejjel lefelé fordítja az alakzatot, a második 180°-os forgatás pedig visszaállítja eredeti helyzetébe (360°).',
    hint: 'Két fél fordulat kiad egy egész kört: 180 + 180 = 360.',
    breakdown: [
      { label: '1. lépés', value: '180° (fejjel lefelé)' },
      { label: '2. lépés', value: '360° (vissza eredetibe)' }
    ]
  },
  {
    id: 'rpq2-6',
    level: 2,
    prompt: 'Mit jelent a geometriában a csúsztatva tükrözés (lépésritmus)?',
    options: [
      'Egy eltolás és egy tengelyes tükrözés egymást követő alkalmazását (mint a lábnyomok a hóban)',
      'Két forgatás egymás után',
      'Az alakzat kicsinyítését és nagyítását',
      'Körök rajzolását'
    ],
    correctAnswer: 0,
    explanation: 'A csúsztatva tükrözéskor az alakzatot előre toljuk, majd egy párhuzamos tengelyre átfordítjuk. Pontosan így követik egymást a bal és jobb láb nyomai járáskor.',
    hint: 'Gondolj a lépések nyomaira a tengerparti homokban!',
    breakdown: [
      { label: '1. művelet', value: 'Eltolás (csúsztatás)' },
      { label: '2. művelet', value: 'Tengelyes tükrözés' }
    ]
  },
  {
    id: 'rpq2-7',
    level: 2,
    prompt: 'A magyar népművészetben melyik területen jelennek meg leggyakrabban a szabályos díszítősorok (ritmusok)?',
    options: [
      'A hímzések és szőttesek szegélyein (bordűrökön), valamint székelykapuk fafaragásain',
      'Csak a hangszerek hangolásában',
      'Csak a faliórák mutatóin',
      'A népművészetben nincsenek díszítősorok'
    ],
    correctAnswer: 0,
    explanation: 'A matyó és kalocsai hímzések, valamint az erdélyi székelykapuk indás, virágos és geometriai szegélymintái mind matematikai ritmusok szerint épülnek fel.',
    hint: 'Gondolj a terítők szélére vagy a faragott kapukra!',
    breakdown: [
      { label: 'Alkalmazás', value: 'Bordűrök, szegélyek, fafaragás' },
      { label: 'Példa', value: 'Székelykapuk, kalocsai hímzés' }
    ]
  },
  {
    id: 'rpq2-8',
    level: 2,
    prompt: 'Mi a neve annak a geometriai díszítésnek, amikor a sík egy részét egybevágó alakzatokkal hézagmentesen és átfedés nélkül fedjük le?',
    options: [
      'Parkettázás vagy síkkitöltés (mozaik / tesszelláció)',
      'Vektoros rajzolás',
      'Egyenes vonal',
      'Origó keresés'
    ],
    correctAnswer: 0,
    explanation: 'A parkettázás (tesszelláció) során szabályos sokszögekkel vagy formákkal úgy fedjük le a síkot, hogy ne maradjon köztük rés és ne fedjék át egymást (mint a járólapok).',
    hint: 'Gondolj a fürdőszobai csempékre vagy a fa parkettára!',
    breakdown: [
      { label: 'Szakszó', value: 'Parkettázás / tesszelláció' },
      { label: 'Szabály', value: 'Hézag és átfedés nélkül' }
    ]
  },
  {
    id: 'rpq2-9',
    level: 2,
    prompt: 'Ha egy aszimmetrikus motívumot függőleges tengelyre tükrözünk oda-vissza, milyen ritmust kapunk?',
    options: [
      'Váltakozva jobbra és balra néző alakzatok sorát',
      'Minden alakzat jobbra fog nézni',
      'Fejjel lefelé álló alakzatokat',
      'Egyre nagyobb alakzatokat'
    ],
    correctAnswer: 0,
    explanation: 'A függőleges tükörtengely megfordítja a bal-jobb irányt, így a motívumok felváltva fognak jobbra és balra nézni (mint szembefordított tulipánok).',
    hint: 'A függőleges tükörben a jobb oldal balra kerül.',
    breakdown: [
      { label: 'Tengely', value: 'Függőleges tükörtengely' },
      { label: 'Eredmény', value: 'Jobbra és balra néző alakzatok' }
    ]
  },
  {
    id: 'rpq2-10',
    level: 2,
    prompt: 'Melyik geometriai transzformáció során változik meg az alakzat mérete egy hagyományos díszítősorban?',
    options: [
      'Egyiknél sem (az eltolás, tükrözés és forgatás mind mérettartó egybevágóságok)',
      'Csak a forgatásnál',
      'Csak az eltolásnál',
      'Minden lépésben kétszeresére nő'
    ],
    correctAnswer: 0,
    explanation: 'A klasszikus díszítősorokat egybevágósági transzformációkkal hozzuk létre: az eltolás, a tengelyes tükrözés és a forgatás mind megtartják az alakzat méretét és arányait.',
    hint: 'A díszítősorban minden motívum ugyanolyan nagyságú.',
    breakdown: [
      { label: 'Egybevágóság', value: 'Mérettartó transzformációk' },
      { label: 'Méret', value: 'Változatlan marad' }
    ]
  },

  // =========================================================================
  // 3. SZINT: N-EDIK ELEM KISZÁMÍTÁSA MARADÉKOS OSZTÁSSAL (21-30)
  // =========================================================================
  {
    id: 'rpq3-1',
    level: 3,
    prompt: 'Egy sorminta alapszakasza [A, B, C] (hossza 3). Mi lesz a sorozat 25. eleme?',
    options: [
      'A (mivel 25 : 3 = 8, a maradék 1, tehát az alapszakasz 1. eleme)',
      'B (mivel a 25 páratlan)',
      'C (az utolsó elem)',
      'D elem'
    ],
    correctAnswer: 0,
    explanation: '25 : 3 = 8, maradék 1. Ez azt jelenti, hogy az [A, B, C] alapszakasz 8-szor megismétlődik teljesen (24 elem), és a 25. elem az új szakasz 1. eleme, vagyis az A.',
    hint: 'Oszd el a 25-öt 3-mal, és figyeld a maradékot: 25 : 3 = 8, maradék 1.',
    breakdown: [
      { label: 'Osztás', value: '25 : 3 = 8, maradék 1' },
      { label: 'Maradék 1', value: 'Alapszakasz 1. eleme: A' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="0 0 140 70">
        <rect x="5" y="10" width="130" height="50" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <text x="70" y="30" textAnchor="middle" className="text-[10px] font-black fill-emerald-800">25 : 3 = 8, maradék 1</text>
        <text x="70" y="48" textAnchor="middle" className="text-[9px] font-bold fill-blue-700">1. elem: 'A'</text>
      </svg>
    )
  },
  {
    id: 'rpq3-2',
    level: 3,
    prompt: 'Egy díszítősorban a [🔴, 🔵, 🟡] alapszakasz ismétlődik ciklikusan. Milyen színű lesz a 60. elem?',
    options: [
      'Sárga 🟡 (mivel 60 : 3 = 20, maradék 0, tehát az alapszakasz utolsó eleme)',
      'Piros 🔴',
      'Kék 🔵',
      'Zöld 🟢'
    ],
    correctAnswer: 0,
    explanation: '60 : 3 = 20, maradék 0. Ha a maradék 0, a sorozat pontosan a 20. teljes alapszakasz végére ér, így az utolsó (3.) elem következik: a sárga (🟡).',
    hint: 'Ha nincs maradék (maradék 0), mindig a legutolsó elem a nyerő!',
    breakdown: [
      { label: 'Osztás', value: '60 : 3 = 20, maradék 0' },
      { label: 'Maradék 0 szabály', value: 'Az alapszakasz utolsó eleme (🟡)' }
    ]
  },
  {
    id: 'rpq3-3',
    level: 3,
    prompt: 'Ha egy sorminta N-edik elemének keresésekor a maradékos osztásnál a maradék 0, melyik elemet kell választanunk?',
    options: [
      'Az alapszakasz legutolsó elemét',
      'Az alapszakasz legelső elemét',
      'A középső elemet',
      'Egyik elemet sem'
    ],
    correctAnswer: 0,
    explanation: 'A 0 maradék azt jelzi, hogy egy teljes periódus pont ott ért véget. Ezért a keresett elem mindig az alapszakasz utolsó tagja.',
    hint: 'A periódus pontosan lezárult, tehát az utolsó eleménél állunk.',
    breakdown: [
      { label: 'Maradék = 0', value: 'Teljes periódus lezárult' },
      { label: 'Elem kiválasztása', value: 'Az alapszakasz utolsó eleme' }
    ]
  },
  {
    id: 'rpq3-4',
    level: 3,
    prompt: 'Egy sorminta alapszakasza 2 elemű: [⭐, 🌙]. Mi lesz a sorozat 47. eleme?',
    options: [
      'Csillag ⭐ (mivel a 47 páratlan szám: 47 : 2 = 23, maradék 1)',
      'Hold 🌙',
      'Nap ☀️',
      'Mindkettő egyszerre'
    ],
    correctAnswer: 0,
    explanation: '2 elemű mintánál a páratlan sorszámú helyeken (1, 3, 5, ..., 47) mindig az 1. elem (⭐), a páros helyeken pedig a 2. elem (🌙) áll.',
    hint: '47 páratlan szám. A páratlan helyeken az 1. elem áll.',
    breakdown: [
      { label: 'Sorszám', value: '47 (páratlan)' },
      { label: '47 : 2', value: 'Maradék 1' },
      { label: 'Elem', value: '1. elem: ⭐' }
    ]
  },
  {
    id: 'rpq3-5',
    level: 3,
    prompt: 'Egy sorminta alapszakasza 4 elemű: [1, 2, 3, 4]. Melyik szám áll a 38. helyen?',
    options: [
      '2 (mivel 38 : 4 = 9, a maradék 2, tehát a 2. elem)',
      '3',
      '4',
      '1'
    ],
    correctAnswer: 0,
    explanation: '38 : 4 = 9, maradék 2 (mivel 9 · 4 = 36, és 38 - 36 = 2). A 2-es maradék azt jelenti, hogy az alapszakasz 2. eleme áll a 38. helyen: a 2-es szám.',
    hint: '38 : 4 = 9, mennyi a maradék? 38 - 36 = 2.',
    breakdown: [
      { label: 'Számolás', value: '38 = 9 · 4 + 2' },
      { label: 'Maradék', value: '2' },
      { label: 'Eredmény', value: '2. elem: 2' }
    ]
  },
  {
    id: 'rpq3-6',
    level: 3,
    prompt: 'Egy 5 elemű alapszakaszból álló sorminta [A, B, C, D, E] 102. eleme melyik betű lesz?',
    options: [
      'B (mivel 102 : 5 = 20, a maradék 2, tehát a 2. elem)',
      'A',
      'C',
      'E'
    ],
    correctAnswer: 0,
    explanation: '102 : 5 = 20, maradék 2. A 20 teljes 5-ös szakasz után még 2 lépést teszünk: 1. elem = A, 2. elem = B.',
    hint: '102 : 5 = 20, a maradék 2. Az alapszakasz 2. eleme a megoldás.',
    breakdown: [
      { label: '102 : 5', value: '20, maradék 2' },
      { label: '2. elem', value: 'B' }
    ]
  },
  {
    id: 'rpq3-7',
    level: 3,
    prompt: 'Egy nyakláncon felváltva fűznek 1 arany és 3 ezüst gyöngyöt: [A, E, E, E]. Milyen gyöngy kerül az 50. helyre?',
    options: [
      'Ezüst gyöngy (mivel 50 : 4 = 12, maradék 2, ami az alapszakasz 2. eleme: E)',
      'Arany gyöngy',
      'Gyémánt gyöngy',
      'Bronz gyöngy'
    ],
    correctAnswer: 0,
    explanation: 'A periódushossz 4 elem [A, E, E, E]. 50 : 4 = 12, a maradék 2. Az alapszakasz 2. eleme az ezüst gyöngy (E).',
    hint: 'Az alapszakasz 4 gyöngyből áll. 50 : 4 = 12, maradék 2.',
    breakdown: [
      { label: 'Periódus', value: '4 elem [A, E, E, E]' },
      { label: 'Maradék', value: '2' },
      { label: 'Gyöngy', value: 'Ezüst (E)' }
    ]
  },
  {
    id: 'rpq3-8',
    level: 3,
    prompt: 'Egy diszkólámpa ciklikusan villantja fel a színeket: piros, sárga, zöld [P, S, Z]. Milyen színű lesz a 99. felvillanó fény?',
    options: [
      'Zöld (mivel 99 : 3 = 33, maradék 0 &rarr; az alapszakasz 3., azaz utolsó eleme)',
      'Piros',
      'Sárga',
      'Kék'
    ],
    correctAnswer: 0,
    explanation: '99 : 3 = 33, maradék 0. Mivel 99 pontosan osztható 3-mal, a periódus pontosan befejeződik, tehát az alapszakasz utolsó (3.) színe villan fel: a Zöld.',
    hint: '99 pontosan osztható 3-mal (maradék 0).',
    breakdown: [
      { label: '99 : 3', value: '33, maradék 0' },
      { label: 'Elem', value: 'Utolsó (3.) elem: Zöld' }
    ]
  },
  {
    id: 'rpq3-9',
    level: 3,
    prompt: 'A sorminta alapszakasza [X, Y, Z, W]. Ha egy elem sorszámát 4-gyel osztva a maradék 3, melyik elem található azon a helyen?',
    options: [
      'Z (az alapszakasz 3. eleme)',
      'X (1. elem)',
      'Y (2. elem)',
      'W (4. elem)'
    ],
    correctAnswer: 0,
    explanation: 'A maradék közvetlenül megadja, hogy az alapszakaszon belül hányadik elemnél járunk. A 3-as maradék a 3. elemet jelenti, ami a [X, Y, Z, W] mintában a Z.',
    hint: 'A maradék 3, tehát az alapszakasz 3. betűjét keresd!',
    breakdown: [
      { label: 'Maradék', value: '3' },
      { label: '3. elem', value: 'Z' }
    ]
  },
  {
    id: 'rpq3-10',
    level: 3,
    prompt: 'Miért NEM szükséges lerajzolni egy mintát az 1000. elemig ahhoz, hogy megtudjuk, mi áll ott?',
    options: [
      'Mert a szabályos ismétlődés miatt a maradékos osztás azonnal megadja az elem helyét az alapszakaszon belül',
      'Mert minden 1000. elem mindig az 1. elemmel egyezik',
      'Mert a számítógépek sem tudják lerajzolni',
      'Mert a matematika csak kis számokkal foglalkozik'
    ],
    correctAnswer: 0,
    explanation: 'A periodicitás lényege a kiszámíthatóság: a ciklusok számát és a maradékot egyszerű osztással kiszámíthatjuk, így tetszőlegesen nagy sorszámú elem is másodpercek alatt meghatározható.',
    hint: 'A maradékos osztás gyorsabb, mint ezer ábrát felrajzolni!',
    breakdown: [
      { label: 'Matematikai előny', value: 'Maradékos osztás gyorsasága' },
      { label: 'Alapelv', value: 'Periodikus ismétlődés' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'A Ritmus és Alapszakasz',
      badge: 'ALAPFOGALOM',
      description: 'A ritmus elemek szabályos ismétlődése. Az alapszakasz (motívum) a minta legkisebb önálló része, aminek ismétlésével felépül az egész sor.',
      formula: '\\text{Példa: } [\\text{A, B, C}] \\quad \\Longrightarrow \\quad \\text{Periódushossz: } 3',
      note: 'A periódushossz az alapszakaszban szereplő elemek száma.'
    },
    {
      id: 'cs1-2',
      title: 'Hiányzó Elemek Megkeresése',
      badge: 'SZABÁLY',
      description: 'Keresd meg az alapszakaszt, és számold le az elemeket ciklikusan elölről! Az utolsó elem után újra az első jön.',
      note: 'Kétállapotú ritmusnál (pl. fel-le) a periódus 2.'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'Geometriai Transzformációk',
      badge: 'MINTATÍPUSOK',
      description: 'Eltolás: irány és forma változatlan. Tükrözés: tengelyes átfordítás (jobbra-balra vagy fel-le). Forgatás: lépésenkénti elfordulás szöggel.',
      formula: '90^\\circ\\text{-os forgatás: } 4 \\text{ lépés egy teljes fordulat}',
      note: 'Csúsztatva tükrözés = eltolás + tengelyes tükrözés (mint a lábnyomok).'
    },
    {
      id: 'cs2-2',
      title: 'Alkalmazások a Művészetben',
      badge: 'KULTÚRA',
      description: 'Bordűrök: hímzések és székelykapuk szegélymintái. Parkettázás (tesszelláció): a sík hézagmentes lefedése egybevágó idomokkal.',
      note: 'Az egybevágósági transzformációk megtartják az alakzat méretét!'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Az N-edik Elem Kiszámítása',
      badge: 'MARADÉKOS OSZTÁS',
      description: 'Oszd el a sorszámot (N) a periódushosszal! A maradék megadja az alapszakaszon belüli helyet.',
      formula: 'N : \\text{Periódus} = Q, \\quad \\text{maradék } R \\quad \\Longrightarrow \\quad R\\text{-edik elem}',
      note: 'FONTOS: Ha a maradék 0, a keresett elem az alapszakasz UTOLSÓ eleme!'
    },
    {
      id: 'cs3-2',
      title: 'Páros és Páratlan Helyek',
      badge: '2-ES PERIÓDUS',
      description: '2 elemű alapszakasznál: Páratlan sorszám (1, 3, 5, ...) &rarr; 1. elem. Páros sorszám (2, 4, 6, ...) &rarr; 2. elem.',
      note: 'Nem kell lerajzolni a mintát: a maradék azonnal megadja a választ!'
    }
  ]
};

export const RhythmPatternsQuiz: React.FC<RhythmPatternsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-patterns-quiz"
      title="Ritmusok, díszítések kvíz"
      subtitle="30 feladat 3 szinten: alapszakasz, geometriai transzformációk és N-edik elem maradékos osztással"
      questions={RHYTHM_PATTERNS_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-rhythm-patterns-quiz"
      storageKey="g5-loc-patterns-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={RhythmPatternsMatcher}
      sorterComponent={RhythmPatternsSorter}
    />
  );
};
