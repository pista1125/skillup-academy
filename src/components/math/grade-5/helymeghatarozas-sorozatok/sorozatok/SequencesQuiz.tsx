import React from 'react';
import { QuizTemplate, Question, CheatSheetCard, DifficultyLevel } from '../QuizTemplate';
import { SequencesMatcher } from './SequencesMatcher';
import { SequencesSorter } from './SequencesSorter';

export interface SequencesQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const SEQUENCES_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: A SOROZAT ALAPJAI ÉS EGYSZERŰ SZABÁLYOK (1-10)
  // =========================================================================
  {
    id: 'sq1-1',
    level: 1,
    prompt: 'Mit nevezünk a matematikában egy számsorozat elemeinek?',
    options: [
      'Tagoknak (pl. 1. tag: a₁, 2. tag: a₂, n-edik tag: aₙ)',
      'Tényezőknek',
      'Nevezőknek',
      'Hányadosoknak'
    ],
    correctAnswer: 0,
    explanation: 'A számsorozatban szereplő számokat tagoknak nevezzük, sorszámukat pedig indexszel jelöljük: a₁ az első tag, a₂ a második tag.',
    hint: 'Gondolj a sorozat „tagjaira”!',
    breakdown: [
      { label: 'Elnevezés', value: 'Sorozat tagjai' },
      { label: 'Jelölés', value: 'a₁, a₂, a₃, ..., aₙ' }
    ],
    figure: (
      <svg className="w-44 h-16 mx-auto" viewBox="0 0 170 60">
        <rect x="5" y="10" width="32" height="32" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
        <text x="21" y="30" textAnchor="middle" className="text-[12px] font-black fill-orange-950">2</text>
        <text x="21" y="52" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">a₁</text>

        <rect x="50" y="10" width="32" height="32" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
        <text x="66" y="30" textAnchor="middle" className="text-[12px] font-black fill-orange-950">5</text>
        <text x="66" y="52" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">a₂</text>

        <rect x="95" y="10" width="32" height="32" rx="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
        <text x="111" y="30" textAnchor="middle" className="text-[12px] font-black fill-orange-950">8</text>
        <text x="111" y="52" textAnchor="middle" className="text-[8px] font-mono fill-slate-400">a₃</text>

        <text x="145" y="30" textAnchor="middle" className="text-[14px] font-black fill-slate-400">...</text>
      </svg>
    )
  },
  {
    id: 'sq1-2',
    level: 1,
    prompt: 'Mi a következő hiányzó tag a sorozatban: 3, 7, 11, 15, [?] ?',
    options: [
      '19 (mivel a lépésköz +4: 15 + 4 = 19)',
      '18',
      '20',
      '16'
    ],
    correctAnswer: 0,
    explanation: 'A szomszédos tagok különbsége állandó: 7 - 3 = 4, 11 - 7 = 4, 15 - 11 = 4. A következő tag: 15 + 4 = 19.',
    hint: 'Mennyivel nő minden lépésben? 7 - 3 = 4.',
    breakdown: [
      { label: 'Lépésköz', value: '+4' },
      { label: 'Számolás', value: '15 + 4 = 19' }
    ]
  },
  {
    id: 'sq1-3',
    level: 1,
    prompt: 'Mi a következő szám ebben a csökkenő sorozatban: 50, 44, 38, 32, [?] ?',
    options: [
      '26 (mivel a lépésköz -6: 32 - 6 = 26)',
      '28',
      '24',
      '30'
    ],
    correctAnswer: 0,
    explanation: 'A tagok folyamatosan 6-tal csökkennek: 50 - 6 = 44, 44 - 6 = 38, 38 - 6 = 32. Következő: 32 - 6 = 26.',
    hint: 'Minden lépésben 6-ot vonunk le: 32 - 6 = ?',
    breakdown: [
      { label: 'Szabály', value: '-6' },
      { label: 'Következő tag', value: '32 - 6 = 26' }
    ]
  },
  {
    id: 'sq1-4',
    level: 1,
    prompt: 'Melyik szabály szerint épül fel a következő sorozat: 2, 4, 8, 16, 32... ?',
    options: [
      'Minden tag az előző kétszerese (·2 duplázódás)',
      'Minden lépésben hozzáadunk 2-t',
      'Minden lépésben hozzáadunk 4-et',
      'Minden tag a sorszám négyzete'
    ],
    correctAnswer: 0,
    explanation: '2 · 2 = 4, 4 · 2 = 8, 8 · 2 = 16, 16 · 2 = 32. Ez egy állandó szorzójú (mértani jellegű) duplázódó sorozat.',
    hint: 'Nem hozzáadunk, hanem szorzunk 2-vel!',
    breakdown: [
      { label: 'Művelet', value: '· 2' },
      { label: 'Típus', value: 'Duplázódó mértani sorozat' }
    ]
  },
  {
    id: 'sq1-5',
    level: 1,
    prompt: 'Mi a következő szám ebben a felező sorozatban: 80, 40, 20, 10, [?] ?',
    options: [
      '5 (mivel 10 : 2 = 5)',
      '0',
      '2',
      '8'
    ],
    correctAnswer: 0,
    explanation: 'A szabály: minden lépésben elfelezzük az előző értéket (:2). 10 fele pontosan 5.',
    hint: 'Oszd el a 10-et 2-vel!',
    breakdown: [
      { label: 'Szabály', value: ': 2 (felezés)' },
      { label: '10 : 2', value: '5' }
    ]
  },
  {
    id: 'sq1-6',
    level: 1,
    prompt: 'Egy sorozat kezdőtagja a₁ = 5, és minden lépésben 6-ot adunk hozzá (+6). Mennyi a sorozat 3. tagja (a₃)?',
    options: [
      '17 (mivel a₁ = 5, a₂ = 11, a₃ = 17)',
      '11',
      '23',
      '18'
    ],
    correctAnswer: 0,
    explanation: 'a₁ = 5. A 2. tag: 5 + 6 = 11. A 3. tag: 11 + 6 = 17.',
    hint: 'Két lépést teszünk: 5 + 6 = 11, majd 11 + 6 = 17.',
    breakdown: [
      { label: '1. tag (a₁)', value: '5' },
      { label: '2. tag (a₂)', value: '11' },
      { label: '3. tag (a₃)', value: '17' }
    ]
  },
  {
    id: 'sq1-7',
    level: 1,
    prompt: 'Mi a hiányzó tag a következő sorozatban: 8, 16, 24, [?], 40 ?',
    options: [
      '32 (mivel a lépésköz +8: 24 + 8 = 32)',
      '30',
      '36',
      '28'
    ],
    correctAnswer: 0,
    explanation: 'Ez a 8-as szorzótábla: 8, 16, 24, 32, 40. A hiányzó tag: 24 + 8 = 32.',
    hint: 'A 8-as szorzótábla hiányzó tagja: 4 · 8 = ?',
    breakdown: [
      { label: 'Lépésköz', value: '+8' },
      { label: 'Hiányzó tag', value: '32' }
    ]
  },
  {
    id: 'sq1-8',
    level: 1,
    prompt: 'Hány tagot kell megismernünk egy számsorozatból ahhoz, hogy biztosan felismerhessük az állandó lépésközű szabályt?',
    options: [
      'Legalább 3 egymást követő tagot (hogy kétszer is ellenőrizhessük a különbséget)',
      'Elég 1 tag',
      'Pontosan 2 tag',
      'Legalább 100 tagot'
    ],
    correctAnswer: 0,
    explanation: 'Két tag közötti különbségből csak tippelhetünk, de a harmadik tag erősíti meg, hogy a lépésköz valóban állandó marad.',
    hint: 'Két ugrást kell látnod, amihez 3 tag szükséges.',
    breakdown: [
      { label: '1. ugrás', value: 'Különbség megsejtése' },
      { label: '2. ugrás', value: 'Szabály igazolása' }
    ]
  },
  {
    id: 'sq1-9',
    level: 1,
    prompt: 'Mi a következő szám a négyzetszámok sorozatában: 1, 4, 9, 16, [?] ?',
    options: [
      '25 (mivel 5 · 5 = 25)',
      '20',
      '24',
      '36'
    ],
    correctAnswer: 0,
    explanation: '1·1=1, 2·2=4, 3·3=9, 4·4=16. A következő az 5 négyzete: 5 · 5 = 25. (Érdekesség: a lépésközök +3, +5, +7, +9 páratlan számok!).',
    hint: 'Az 5 négyzete: 5 · 5 = ?',
    breakdown: [
      { label: '4. tag', value: '4 · 4 = 16' },
      { label: '5. tag', value: '5 · 5 = 25' }
    ]
  },
  {
    id: 'sq1-10',
    level: 1,
    prompt: 'Melyik sorozat csökkenő a felsoroltak közül?',
    options: [
      '40, 35, 30, 25, 20 ...',
      '2, 5, 8, 11, 14 ...',
      '1, 2, 4, 8, 16 ...',
      '10, 20, 30, 40 ...'
    ],
    correctAnswer: 0,
    explanation: 'A 40, 35, 30, 25... sorozatban minden lépésben 5-öt vonunk ki, így a tagok értéke folyamatosan fogy (csökkenő).',
    hint: 'Keresd a fogyó, lefelé tartó számokat!',
    breakdown: [
      { label: 'Szabály', value: '-5' },
      { label: 'Irány', value: 'Csökkenő' }
    ]
  },

  // =========================================================================
  // 2. SZINT: HIÁNYZÓ TAGOK ÉS VÁLTOZÓ LÉPÉSKÖZÖK (11-20)
  // =========================================================================
  {
    id: 'sq2-1',
    level: 2,
    prompt: 'Melyik két szám hiányzik az alábbi sorozatból: 5, [?], 13, 17, [?], 25 ?',
    options: [
      '9 és 21 (a lépésköz +4)',
      '8 és 20',
      '10 és 22',
      '9 és 20'
    ],
    correctAnswer: 0,
    explanation: 'A 13 és 17 szomszédosak: 17 - 13 = 4, tehát a lépésköz +4. Első hiányzó: 5 + 4 = 9 (és 9+4=13). Második hiányzó: 17 + 4 = 21 (és 21+4=25).',
    hint: 'A 13 és 17 különbsége 4. Add hozzá a 4-et az 5-höz és a 17-hez!',
    breakdown: [
      { label: 'Lépésköz', value: '17 - 13 = 4' },
      { label: '1. hiányzó', value: '5 + 4 = 9' },
      { label: '2. hiányzó', value: '17 + 4 = 21' }
    ]
  },
  {
    id: 'sq2-2',
    level: 2,
    prompt: 'Milyen szabály szerint változnak a tagok ebben a sorozatban: 1, 2, 4, 7, 11, 16... ?',
    options: [
      'A lépésköz minden lépésben 1-gyel nő (+1, +2, +3, +4, +5...)',
      'Minden lépésben hozzáadunk 3-at',
      'Minden tagot megduplázunk',
      'Nincs benne szabály'
    ],
    correctAnswer: 0,
    explanation: 'A különbségek: 2 - 1 = +1, 4 - 2 = +2, 7 - 4 = +3, 11 - 7 = +4, 16 - 11 = +5. A lépésköz minden ugrásnál 1-gyel nagyobb.',
    hint: 'Nézd meg az ugrásokat: +1, +2, +3, +4...',
    breakdown: [
      { label: 'Ugrások', value: '+1, +2, +3, +4, +5' },
      { label: 'Szabály', value: 'Változó lépésközű növekedés' }
    ]
  },
  {
    id: 'sq2-3',
    level: 2,
    prompt: 'Mi lesz a következő szám a fenti sorozatban (1, 2, 4, 7, 11, 16, [?])?',
    options: [
      '22 (mivel a következő ugrás +6: 16 + 6 = 22)',
      '21',
      '20',
      '24'
    ],
    correctAnswer: 0,
    explanation: 'Az utolsó ugrás +5 volt (11-ről 16-ra). A szabály szerint a következő ugrás +6, így 16 + 6 = 22.',
    hint: 'Az ugrások sora: +1, +2, +3, +4, +5, most +6 jön!',
    breakdown: [
      { label: 'Utolsó ugrás', value: '+5' },
      { label: 'Következő ugrás', value: '+6' },
      { label: 'Eredmény', value: '16 + 6 = 22' }
    ]
  },
  {
    id: 'sq2-4',
    level: 2,
    prompt: 'Melyik szám a „kakukktojás” (hibás tag) a következő sorozatban: 4, 8, 12, 17, 20, 24 ?',
    options: [
      'A 17 (mivel a szabály +4, így helyette 16-nak kellene lennie)',
      'A 12',
      'A 20',
      'A 4'
    ],
    correctAnswer: 0,
    explanation: 'A sorozat a 4 többszöröseiből áll (+4 lépésköz): 4, 8, 12, 16, 20, 24. A 17 hibás, mert 12 + 4 = 16.',
    hint: 'Minden tag osztható 4-gyel, kivéve egyet!',
    breakdown: [
      { label: 'Szabály', value: '+4' },
      { label: 'Hibás tag', value: '17' },
      { label: 'Helyes érték', value: '16' }
    ]
  },
  {
    id: 'sq2-5',
    level: 2,
    prompt: 'Egy sorozat felváltva ad hozzá 5-öt, majd von ki 2-t (+5, -2, +5, -2...). Ha az 1. tag a₁ = 3, mi lesz a 4. tag (a₄)?',
    options: [
      '11 (mivel 3 &rarr; 8 &rarr; 6 &rarr; 11)',
      '9',
      '14',
      '10'
    ],
    correctAnswer: 0,
    explanation: 'a₁ = 3. a₂ = 3 + 5 = 8. a₃ = 8 - 2 = 6. a₄ = 6 + 5 = 11.',
    hint: 'Számold végig: 3 + 5 = 8, 8 - 2 = 6, 6 + 5 = ?',
    breakdown: [
      { label: 'a₁', value: '3' },
      { label: 'a₂ (+5)', value: '8' },
      { label: 'a₃ (-2)', value: '6' },
      { label: 'a₄ (+5)', value: '11' }
    ]
  },
  {
    id: 'sq2-6',
    level: 2,
    prompt: 'Mi a hiányzó tag ebben a mértani sorozatban: 3, 9, 27, [?], 243 ?',
    options: [
      '81 (mivel a szabály ·3: 27 · 3 = 81)',
      '54',
      '72',
      '90'
    ],
    correctAnswer: 0,
    explanation: 'Minden tagot 3-mal szorzunk: 3 · 3 = 9, 9 · 3 = 27, 27 · 3 = 81, és 81 · 3 = 243.',
    hint: 'Szorozd meg a 27-et 3-mal!',
    breakdown: [
      { label: 'Szorzó', value: '· 3' },
      { label: '27 · 3', value: '81' }
    ]
  },
  {
    id: 'sq2-7',
    level: 2,
    prompt: 'Egy csökkenő számtani sorozatban a szomszédos tagok: [?], 41, 33, 25, [?]. Mi a kezdőtag és az utolsó hiányzó tag?',
    options: [
      '49 és 17 (mivel a lépésköz -8)',
      '48 és 18',
      '50 és 16',
      '45 és 20'
    ],
    correctAnswer: 0,
    explanation: 'A lépésköz: 33 - 41 = -8. A kezdőtag: 41 + 8 = 49. Az utolsó tag: 25 - 8 = 17.',
    hint: '41 - 33 = 8. Visszafelé adj hozzá 8-at (49), előre vonj le 8-at (17)!',
    breakdown: [
      { label: 'Lépésköz', value: '-8' },
      { label: 'Kezdőtag', value: '41 + 8 = 49' },
      { label: 'Utolsó tag', value: '25 - 8 = 17' }
    ]
  },
  {
    id: 'sq2-8',
    level: 2,
    prompt: 'Mi a következő szám ebben a sorozatban: 2, 4, 8, 14, 22, [?] ?',
    options: [
      '32 (mivel a lépésközök: +2, +4, +6, +8, most +10 jön: 22 + 10 = 32)',
      '30',
      '34',
      '28'
    ],
    correctAnswer: 0,
    explanation: 'A különbségek egymást követő páros számok: +2, +4, +6, +8. A következő lépésben +10-et kell hozzáadni: 22 + 10 = 32.',
    hint: 'Nézd a különbségeket: 2, 4, 6, 8... Mi a következő páros szám?',
    breakdown: [
      { label: 'Különbségek', value: '+2, +4, +6, +8' },
      { label: 'Következő', value: '+10 &rarr; 22 + 10 = 32' }
    ]
  },
  {
    id: 'sq2-9',
    level: 2,
    prompt: 'Egy számtani sorozat 1. tagja a₁ = 4, a 2. tagja a₂ = 9. Mennyi a sorozat 10. tagja (a₁₀)?',
    options: [
      '49 (mivel a lépésköz d = 5, és a₁₀ = 4 + 9 · 5 = 49)',
      '54',
      '45',
      '50'
    ],
    correctAnswer: 0,
    explanation: 'A lépésköz d = 9 - 4 = 5. Az 1. tagtól a 10. tagig 9 lépést teszünk: 4 + 9 · 5 = 4 + 45 = 49.',
    hint: 'Az 1. taghoz 9 darab lépésközt kell hozzáadni: 4 + 9 · 5 = ?',
    breakdown: [
      { label: 'Lépésköz (d)', value: '5' },
      { label: '9 lépés', value: '9 · 5 = 45' },
      { label: '10. tag', value: '4 + 45 = 49' }
    ]
  },
  {
    id: 'sq2-10',
    level: 2,
    prompt: 'Melyik sorozat NEM állandó lépésközű az alábbiak közül?',
    options: [
      '1, 3, 7, 15, 31 ... (duplázódó ugrások)',
      '2, 5, 8, 11, 14 ... (+3 állandó)',
      '10, 20, 30, 40, 50 ... (+10 állandó)',
      '50, 45, 40, 35, 30 ... (-5 állandó)'
    ],
    correctAnswer: 0,
    explanation: 'Az 1, 3, 7, 15... sorozatban az ugrások: +2, +4, +8, +16. Nem állandó a lépésköz, hanem minden lépésben duplázódik.',
    hint: 'Keresd azt a sort, ahol a tagok közötti különbség változik!',
    breakdown: [
      { label: 'Különbségek', value: '+2, +4, +8, +16' },
      { label: 'Típus', value: 'Változó lépésközű' }
    ]
  },

  // =========================================================================
  // 3. SZINT: ÁLTALÁNOS TAG (a_n), KÉPLETEK ÉS ÖSSZETETT FELADATOK (21-30)
  // =========================================================================
  {
    id: 'sq3-1',
    level: 3,
    prompt: 'Egy számtani sorozat kezdőtagja a₁ = 3, az állandó lépésköz d = 4. Melyik képlet adja meg a sorozat n-edik tagját?',
    options: [
      'aₙ = 4 · n - 1 (vagy aₙ = 3 + (n - 1) · 4)',
      'aₙ = 4 · n + 3',
      'aₙ = 3 · n + 4',
      'aₙ = 3 · n - 1'
    ],
    correctAnswer: 0,
    explanation: 'aₙ = a₁ + (n - 1) · d = 3 + (n - 1) · 4 = 3 + 4n - 4 = 4n - 1. Ellenőrzés: n=1 &rarr; 4·1 - 1 = 3; n=2 &rarr; 4·2 - 1 = 7.',
    hint: 'n = 1 esetén az eredménynek 3-nak kell lennie: 4 · 1 - 1 = 3.',
    breakdown: [
      { label: 'Képlet', value: 'a₁ + (n - 1) · d' },
      { label: 'Behelyettesítve', value: '3 + (n - 1) · 4 = 4n - 1' }
    ],
    figure: (
      <svg className="w-36 h-20 mx-auto" viewBox="0 0 140 70">
        <rect x="5" y="10" width="130" height="50" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
        <text x="70" y="32" textAnchor="middle" className="text-[10px] font-black fill-orange-900">aₙ = 3 + (n - 1) · 4</text>
        <text x="70" y="48" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">= 4n - 1</text>
      </svg>
    )
  },
  {
    id: 'sq3-2',
    level: 3,
    prompt: 'Mennyi a 20. tagja a páratlan számok sorozatának: 1, 3, 5, 7, 9... ?',
    options: [
      '39 (mivel a képlet aₙ = 2n - 1, és 2 · 20 - 1 = 39)',
      '41',
      '40',
      '37'
    ],
    correctAnswer: 0,
    explanation: 'A páratlan számok képlete: 2n - 1. A 20. tag: 2 · 20 - 1 = 40 - 1 = 39.',
    hint: 'Kétszerezd meg a 20-at (40), és vonj le 1-et!',
    breakdown: [
      { label: 'Képlet', value: '2n - 1' },
      { label: 'Számolás', value: '2 · 20 - 1 = 39' }
    ]
  },
  {
    id: 'sq3-3',
    level: 3,
    prompt: 'Mennyi a 100. tagja a pozitív páros számok sorozatának: 2, 4, 6, 8... ?',
    options: [
      '200 (mivel a képlet aₙ = 2n, és 2 · 100 = 200)',
      '100',
      '198',
      '202'
    ],
    correctAnswer: 0,
    explanation: 'A páros számok képlete: 2n. A 100. páros szám: 2 · 100 = 200.',
    hint: 'Szorozd meg a 100-at 2-vel!',
    breakdown: [
      { label: 'Képlet', value: '2n' },
      { label: '100. tag', value: '2 · 100 = 200' }
    ]
  },
  {
    id: 'sq3-4',
    level: 3,
    prompt: 'Egy sorozat képlete aₙ = 5n + 2. Mennyi a sorozat 12. tagja (a₁₂)?',
    options: [
      '62 (mivel 5 · 12 + 2 = 60 + 2 = 62)',
      '60',
      '67',
      '72'
    ],
    correctAnswer: 0,
    explanation: 'Helyettesítsük be az n = 12-t: 5 · 12 = 60, majd 60 + 2 = 62.',
    hint: '5 · 12 = 60, adj hozzá 2-t!',
    breakdown: [
      { label: '5 · 12', value: '60' },
      { label: '60 + 2', value: '62' }
    ]
  },
  {
    id: 'sq3-5',
    level: 3,
    prompt: 'Ha egy sorozat képlete aₙ = 3n + 1, hányadik tag (n) értéke lesz pontosan 31?',
    options: [
      'A 10. tag (mivel 3n + 1 = 31 &rarr; 3n = 30 &rarr; n = 10)',
      'A 9. tag',
      'A 11. tag',
      'A 30. tag'
    ],
    correctAnswer: 0,
    explanation: 'Egyenletként: 3n + 1 = 31. Mindkét oldalból levonunk 1-et: 3n = 30. Osztunk 3-mal: n = 10.',
    hint: '31 - 1 = 30, mennyi a 30 : 3?',
    breakdown: [
      { label: '3n + 1 = 31', value: '3n = 30' },
      { label: 'n értéke', value: '10. tag' }
    ]
  },
  {
    id: 'sq3-6',
    level: 3,
    prompt: 'Mi a szabály a híres Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13... ?',
    options: [
      'A harmadik tagtól kezdve minden tag a megelőző két tag összege',
      'Minden lépésben hozzáadunk kettőt',
      'Minden tagot megduplázunk',
      'A tagok szorzata adja a következőt'
    ],
    correctAnswer: 0,
    explanation: '1 + 1 = 2; 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8; 5 + 8 = 13. Mindegyik tag az előtte álló két szám összege.',
    hint: 'Add össze az előző két számot: 5 + 8 = 13.',
    breakdown: [
      { label: 'Szabály', value: 'aₙ = aₙ₋₁ + aₙ₋₂' },
      { label: 'Példa', value: '5 + 8 = 13' }
    ]
  },
  {
    id: 'sq3-7',
    level: 3,
    prompt: 'Mi a következő tag a Fibonacci-sorozatban: 1, 1, 2, 3, 5, 8, 13, [?] ?',
    options: [
      '21 (mivel 8 + 13 = 21)',
      '20',
      '18',
      '26'
    ],
    correctAnswer: 0,
    explanation: 'Az utolsó két tag a 8 és a 13. Összegük: 8 + 13 = 21.',
    hint: 'Add össze a két utolsó tagot: 8 + 13 = ?',
    breakdown: [
      { label: 'Összeg', value: '8 + 13' },
      { label: 'Következő tag', value: '21' }
    ]
  },
  {
    id: 'sq3-8',
    level: 3,
    prompt: 'Egy sorozat tagjai: a₁ = 50, és minden lépésben 3-at vonunk ki (d = -3). Hányadik tag lesz a sorozat legelső negatív száma?',
    options: [
      'A 18. tag (mivel a₁₇ = 50 - 16 · 3 = 2, és a₁₈ = 2 - 3 = -1)',
      'A 17. tag',
      'A 16. tag',
      'A 20. tag'
    ],
    correctAnswer: 0,
    explanation: '50 : 3 = 16, maradék 2. Ez azt jelenti, hogy 16 lépés után (a₁₇-nél) az érték 2. A következő, 17. lépésben (a₁₈-nál): 2 - 3 = -1, ami az első negatív szám.',
    hint: '50 : 3 = 16 (maradék 2). A 17. tag még +2, a 18. már negatív!',
    breakdown: [
      { label: '17. tag (a₁₇)', value: '50 - 16 · 3 = 2' },
      { label: '18. tag (a₁₈)', value: '2 - 3 = -1 (első negatív!)' }
    ]
  },
  {
    id: 'sq3-9',
    level: 3,
    prompt: 'A háromszögszámok sorozata az egymást követő természetes számok összege: 1, 3, 6, 10, 15... Mennyi a 6. háromszögszám?',
    options: [
      '21 (mivel 1 + 2 + 3 + 4 + 5 + 6 = 21)',
      '20',
      '25',
      '18'
    ],
    correctAnswer: 0,
    explanation: 'Az 5. háromszögszám 15 volt. A 6. háromszögszámhoz hozzáadjuk a 6-ot: 15 + 6 = 21.',
    hint: '15 + 6 = ?',
    breakdown: [
      { label: '5. szám', value: '15' },
      { label: '6. szám', value: '15 + 6 = 21' }
    ]
  },
  {
    id: 'sq3-10',
    level: 3,
    prompt: 'Mi a legfontosabb különbség a sorozat n indexe (sorszáma) és aₙ értéke között?',
    options: [
      'Az n a helyet (hányadik elem) jelöli, míg az aₙ az azon a helyen álló szám tényleges értéke',
      'Nincs különbség, az n és az aₙ mindig egyenlő',
      'Az n mindig nagyobb mint az aₙ',
      'Az aₙ csak páros szám lehet'
    ],
    correctAnswer: 0,
    explanation: 'Például a 10, 20, 30... sorozatban az 5. helyen (n = 5) álló szám értéke 50 (a₅ = 50). A sorszám és az érték két teljesen különböző dolog.',
    hint: 'Gondolj a házszámra és arra, hogy hány ember lakik a házban!',
    breakdown: [
      { label: 'n index', value: 'Sorszám (1, 2, 3...)' },
      { label: 'aₙ érték', value: 'A mezőben lévő konkrét szám' }
    ]
  }
];

const LEVEL_CHEAT_SHEETS: Record<DifficultyLevel, CheatSheetCard[]> = {
  1: [
    {
      id: 'cs1-1',
      title: 'A Sorozat Fogalma',
      badge: 'ALAPFOGALOM',
      description: 'A számsorozat szabályos számlista. Kezdőtag: a₁. Következő tagok: a₂, a₃, ..., aₙ.',
      formula: 'a_1 \\xrightarrow{+d} a_2 \\xrightarrow{+d} a_3 \\dots',
      note: 'Állandó lépésköz (d): szomszédos tagok különbsége.'
    },
    {
      id: 'cs1-2',
      title: 'Növekvő és Csökkenő Sorozatok',
      badge: 'IRÁNY',
      description: 'Növekvő: minden tag nagyobb az előzőnél (+d vagy ·q). Csökkenő: minden tag kisebb az előzőnél (-d vagy :q).',
      note: 'Duplázódás: ·2 (mértani ugrás).'
    }
  ],
  2: [
    {
      id: 'cs2-1',
      title: 'Hiányzó Tagok Felderítése',
      badge: 'STRATÉGIA',
      description: '1. Keress két szomszédos ismert tagot! 2. Vond ki őket egymásból a lépésköz megállapításához! 3. Töltsd ki a hiányokat!',
      note: 'Kakukktojás: az a szám, amelynél megbicsaklik a lépésköz.'
    },
    {
      id: 'cs2-2',
      title: 'Változó Lépésközök',
      badge: 'MINTÁZATOK',
      description: 'Ha a különbség nem állandó, nézd meg az ugrások sorozatát: pl. +1, +2, +3, +4... vagy +2, +4, +6, +8...',
      note: 'Váltakozó szabályok: pl. +5, majd -2 felváltva.'
    }
  ],
  3: [
    {
      id: 'cs3-1',
      title: 'Az n-edik Tag Kiszámítása',
      badge: 'KÉPLET',
      description: 'Állandó d lépésköz esetén a kezdőtaghoz (n - 1) darab d lépésközt adunk hozzá.',
      formula: 'a_n = a_1 + (n - 1) \\cdot d',
      note: 'Páros számok: 2n. Páratlan számok: 2n - 1.'
    },
    {
      id: 'cs3-2',
      title: 'Híres Sorozatok',
      badge: 'KLASSZIKUSOK',
      description: 'Fibonacci: 1, 1, 2, 3, 5, 8, 13, 21... (előző kettő összege). Négyzetszámok: 1, 4, 9, 16, 25... Háromszögszámok: 1, 3, 6, 10, 15...',
      note: 'A sorszám (n) nem azonos a tag értékével (aₙ)!'
    }
  ]
};

export const SequencesQuiz: React.FC<SequencesQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-loc-sequences-quiz"
      title="Sorozatok kvíz"
      subtitle="30 feladat 3 szinten: sorozatképzési szabályok, hiányzó tagok pótlása, általános tag és Fibonacci"
      questions={SEQUENCES_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-5-sequences-quiz"
      storageKey="g5-loc-sequences-quiz"
      cheatSheetCards={LEVEL_CHEAT_SHEETS}
      matcherComponent={SequencesMatcher}
      sorterComponent={SequencesSorter}
    />
  );
};
