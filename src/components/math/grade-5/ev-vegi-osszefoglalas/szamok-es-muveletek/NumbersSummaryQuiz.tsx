import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { NumbersSummaryMatcher } from './NumbersSummaryMatcher';
import { NumbersSummarySorter } from './NumbersSummarySorter';

export interface NumbersSummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

const NUMBERS_SUMMARY_QUESTIONS: Question[] = [
  // ========================================================
  // 1. SZINT: ALAPFOGALMAK, RÓMAI SZÁMOK ÉS HELYIÉRTÉK (1-10)
  // ========================================================
  {
    id: 'g5-s1-q1',
    level: 1,
    question: 'Mit jelent a római XLIX szám arab számokkal kifejezve?',
    options: ['49', '69', '44', '59'],
    correctAnswer: '49',
    explanation: 'Az XL jelentése: 50 − 10 = 40. Az IX jelentése: 10 − 1 = 9. Összeadva: 40 + 9 = 49.',
    hint: 'Bontsd fel két ismert párra: XL és IX!'
  },
  {
    id: 'g5-s1-q2',
    level: 1,
    question: 'A 35 428 számban mi a 4-es számjegy VALÓDI értéke?',
    options: ['400', '4', '4 000', '40'],
    correctAnswer: '400',
    explanation: 'A 4-es számjegy a százasok helyén áll (helyiérték: 100), így valódi értéke 4 · 100 = 400.',
    hint: 'Nézd meg, melyik helyiértéken áll a 4-es: egyesek, tízesek, százasok...!'
  },
  {
    id: 'g5-s1-q3',
    level: 1,
    question: 'Mennyi a 347 kerekített értéke a legközelebbi TÍZESRE?',
    options: ['350', '340', '300', '400'],
    correctAnswer: '350',
    explanation: 'Tízesekre kerekítésnél az utána következő helyiértéket (egyesek) vizsgáljuk: 7 ≥ 5, ezért felfelé kerekítünk: 350.',
    hint: 'Az utolsó számjegy 7. Az 5-ös vagy annál nagyobb számjegy felfelé kerekít!'
  },
  {
    id: 'g5-s1-q4',
    level: 1,
    question: 'Melyik állítás IGAZ a természetes számok összeadására?',
    options: [
      'A tagok tetszőlegesen felcserélhetők és csoportosíthatók (a + b = b + a)',
      'A kivonásban a tagok tetszőlegesen felcserélhetők (a − b = b − a)',
      'A nullával való osztás eredménye mindig nulla',
      'Ha egy számot megszorzunk 1-gyel, az eredmény nulla lesz'
    ],
    correctAnswer: 'A tagok tetszőlegesen felcserélhetők és csoportosíthatók (a + b = b + a)',
    explanation: 'Az összeadás kommutatív (felcserélhető) és asszociatív (csoportosítható). A kivonás nem felcserélhető, nullával pedig tilos osztani!',
    hint: 'Gondolj a tagok sorrendjére: 3 + 5 ugyanannyi, mint 5 + 3?'
  },
  {
    id: 'g5-s1-q5',
    level: 1,
    question: 'Mennyi a −14 egész szám ellentettje?',
    options: ['+14', '−14', '0', '1/14'],
    correctAnswer: '+14',
    explanation: 'Egy szám ellentettje a számegyenesen a nullától azonos távolságra lévő, ellenkező előjelű szám: −(−14) = +14.',
    hint: 'Az ellentett csupán előjelváltást jelent a nullához képest!'
  },
  {
    id: 'g5-s1-q6',
    level: 1,
    question: 'Mennyi a |−25| abszolút érték pontos eredménye?',
    options: ['25', '−25', '0', '50'],
    correctAnswer: '25',
    explanation: 'Egy szám abszolút értéke a nullától mért geometriai távolsága a számegyenesen. A távolság soha nem lehet negatív, így |−25| = 25.',
    hint: 'A távolság mindig nemnegatív érték!'
  },
  {
    id: 'g5-s1-q7',
    level: 1,
    question: 'Melyik relációs jel teszi igazzá az állítást: −7 ___ −3 ?',
    options: ['< (kisebb)', '> (nagyobb)', '= (egyenlő)', '≥ (nagyobb vagy egyenlő)'],
    correctAnswer: '< (kisebb)',
    explanation: 'A számegyenesen az a szám a kisebb, amelyik balrább helyezkedik el. A −7 balrább van, mint a −3 (nagyobb hideget, mélyebb adósságot jelent), így −7 < −3.',
    hint: 'Gondolj a hőmérőre: a −7 °C hidegebb, mint a −3 °C!'
  },
  {
    id: 'g5-s1-q8',
    level: 1,
    question: 'Mennyi a hányados és a maradék, ha 47-et elosztunk 6-tal?',
    options: [
      'Hányados: 7, maradék: 5',
      'Hányados: 8, maradék: 1',
      'Hányados: 7, maradék: 3',
      'Hányados: 6, maradék: 11'
    ],
    correctAnswer: 'Hányados: 7, maradék: 5',
    explanation: '6 · 7 = 42, és 47 − 42 = 5. Mivel a maradék (5) kisebb az osztónál (6), az osztás helyes: 47 = 7 · 6 + 5.',
    hint: 'Hányszor van meg a 6 a 47-ben maradék nélkül?'
  },
  {
    id: 'g5-s1-q9',
    level: 1,
    question: 'Mennyi a 25 · 14 · 0 · 8 szorzat pontos értéke?',
    options: ['0', '2 800', '250', 'Nem értelmezhető'],
    correctAnswer: '0',
    explanation: 'Ha egy szorzat bármelyik tényezője nulla, akkor a teljes szorzat értéke nulla.',
    hint: 'Keresd a szorzótényezők között a nullát!'
  },
  {
    id: 'g5-s1-q10',
    level: 1,
    question: 'Melyik betű jelöli az 500-as értéket a római számírásban?',
    options: ['D', 'C', 'M', 'L'],
    correctAnswer: 'D',
    explanation: 'A római alapértékek: C = 100, D = 500, M = 1 000, L = 50.',
    hint: 'C a centum (100), M a mille (1 000).'
  },

  // ========================================================
  // 2. SZINT: MŰVELETI SORREND ÉS ELŐJELES SZÁMÍTÁSOK (11-20)
  // ========================================================
  {
    id: 'g5-s1-q11',
    level: 2,
    question: 'Mennyi a 40 − 10 · 3 kifejezés pontos értéke?',
    options: ['10', '90', '30', '70'],
    correctAnswer: '10',
    explanation: 'A műveleti sorrend szabálya szerint a szorzást végezzük el előbb: 10 · 3 = 30. Ezután jön a kivonás: 40 − 30 = 10.',
    hint: 'A szorzás erősebb a kivonásnál!'
  },
  {
    id: 'g5-s1-q12',
    level: 2,
    question: 'Mennyi a (40 − 10) · 3 kifejezés pontos értéke?',
    options: ['90', '10', '30', '120'],
    correctAnswer: '90',
    explanation: 'A zárójel felülírja a sorrendet: először a zárójelben lévő kivonást végezzük el: 40 − 10 = 30. Majd szorzunk: 30 · 3 = 90.',
    hint: 'Mindig a kerek zárójellel kezdünk!'
  },
  {
    id: 'g5-s1-q13',
    level: 2,
    question: 'Melyik a LEGNAGYOBB olyan egész szám, amely százasokra kerekítve 600 lesz?',
    options: ['649', '650', '599', '644'],
    correctAnswer: '649',
    explanation: 'Százasokra kerekítéskor 550-től 649-ig minden egész szám 600-ra kerekül. 650-nél már felfelé kerekítenénk 700-ra, így a legnagyobb szám a 649.',
    hint: 'Ha a tízesek helyén 5 állna (pl. 650), az már 700-ra kerekedne!'
  },
  {
    id: 'g5-s1-q14',
    level: 2,
    question: 'Hány egység távolságra van egymástól a számegyenesen a −5 és a +7?',
    options: ['12 egység', '2 egység', '−12 egység', '7 egység'],
    correctAnswer: '12 egység',
    explanation: 'A −5-től a 0-ig 5 egység a távolság, a 0-tól a +7-ig 7 egység. Összesen: 5 + 7 = 12 egység (számolással: 7 − (−5) = 12).',
    hint: 'Add össze a két szám nullától mért távolságát!'
  },
  {
    id: 'g5-s1-q15',
    level: 2,
    question: 'Hajnalban −4 °C volt a hőmérséklet, majd délig 9 °C-ot emelkedett. Hány fok volt délben?',
    options: ['+5 °C', '+13 °C', '−13 °C', '−5 °C'],
    correctAnswer: '+5 °C',
    explanation: 'A kiinduló állapot −4, ehhez adunk 9-et: (−4) + 9 = +5 °C.',
    hint: '−4-től a nulláig 4 fok emelkedés kell, a maradék 5 fok már a pozitív tartományba visz.'
  },
  {
    id: 'g5-s1-q16',
    level: 2,
    question: 'Anna bankszámláján 1 500 Ft volt, majd levontak 2 200 Ft-ot. Mi a számla új egyenlege?',
    options: ['−700 Ft', '+700 Ft', '−3 700 Ft', '0 Ft'],
    correctAnswer: '−700 Ft',
    explanation: 'Kisebb vagyonból vonunk le nagyobbat: 1 500 − 2 200 = −700 Ft (700 Ft tartozás/hitel).',
    hint: 'Többet vontak le, mint amennyi pénze volt, így egyenlege negatív lett!'
  },
  {
    id: 'g5-s1-q17',
    level: 2,
    question: 'Melyik számot kapjuk: 5 tízezres + 7 százas + 4 egyes?',
    options: ['50 704', '57 004', '50 740', '574'],
    correctAnswer: '50 704',
    explanation: 'Tízezresek: 5, ezresek: 0, százasok: 7, tízesek: 0, egyesek: 4. A szám: 50 704.',
    hint: 'A hiányzó helyiértékek (ezresek, tízesek) helyére írj nullát!'
  },
  {
    id: 'g5-s1-q18',
    level: 2,
    question: 'Mennyi az 50 − [12 + (8 − 3) · 2] kifejezés pontos értéke?',
    options: ['28', '38', '18', '24'],
    correctAnswer: '28',
    explanation: '1. Kerek zárójel: 8 − 3 = 5. 2. Szorzás a szögletes zárójelben: 5 · 2 = 10. 3. Szögletes zárójel: 12 + 10 = 22. 4. Végül: 50 − 22 = 28.',
    hint: 'Haladj belülről kifelé: először (8 − 3), aztán a szorzás, majd a szögletes zárójel!'
  },
  {
    id: 'g5-s1-q19',
    level: 2,
    question: 'Melyik a legpontosabb kerekített becslés a 498 · 31 szorzat nagyságrendjére?',
    options: [
      '500 · 30 = 15 000',
      '400 · 30 = 12 000',
      '500 · 40 = 20 000',
      '490 · 30 = 14 700'
    ],
    correctAnswer: '500 · 30 = 15 000',
    explanation: '498 legközelebbi százasa az 500, 31 legközelebbi tízese a 30. Így a kényelmes és pontos becslés: 500 · 30 = 15 000 (a valódi érték 15 438).',
    hint: 'Kerekítsd mindkét tényezőt a legközelebbi kerek számra!'
  },
  {
    id: 'g5-s1-q20',
    level: 2,
    question: 'Mennyi a (−8) − (−5) művelet eredménye?',
    options: ['−3', '−13', '+3', '+13'],
    correctAnswer: '−3',
    explanation: 'Negatív szám kivonása megegyezik az ellentettjének hozzáadásával (tartozás elengedése enyhíti a hiányt): (−8) + (+5) = −3.',
    hint: 'A két egymás melletti mínuszjel pluszt eredményez: −8 + 5.'
  },

  // ========================================================
  // 3. SZINT: ÖSSZETETT FELADATOK ÉS VIZSGATRÜKKÖK (21-30)
  // ========================================================
  {
    id: 'g5-s1-q21',
    level: 3,
    question: 'Hogyan írjuk le helyesen a 2026-os évszámot római számmal?',
    options: ['MMXXVI', 'MMXVI', 'MVMXXVI', 'MMXXIV'],
    correctAnswer: 'MMXXVI',
    explanation: '2 000 = MM, 20 = XX, 6 = VI. Összefűzve: MMXXVI.',
    hint: '2000 = MM, 26 = XXVI.'
  },
  {
    id: 'g5-s1-q22',
    level: 3,
    question: 'Hány olyan egész szám van a számegyenesen, amelyre igaz: −4 ≤ x < 5 ?',
    options: ['9 darab', '8 darab', '10 darab', '7 darab'],
    correctAnswer: '9 darab',
    explanation: 'A megengedett egész számok: −4, −3, −2, −1, 0, 1, 2, 3, 4. (Az 5 nem tartozik bele a szigorú < egyenlőtlenség miatt). Ez összesen 4 negatív + 1 nulla + 4 pozitív = 9 darab szám.',
    hint: 'Vigyázz a relációs jelekre: a −4 megengedett, az 5 már nem!'
  },
  {
    id: 'g5-s1-q23',
    level: 3,
    question: 'Mely x egész értékekre teljesül az |x − 3| = 7 egyenlőség?',
    options: [
      'x = 10 és x = −4',
      'x = 10 és x = 4',
      'x = 4 és x = −10',
      'Csak x = 10'
    ],
    correctAnswer: 'x = 10 és x = −4',
    explanation: 'A kifejezés a 3-tól vett 7 egységnyi távolságot jelenti: jobbra 3 + 7 = 10, balra 3 − 7 = −4. Ellenőrzés: |10 − 3| = |7| = 7, és |−4 − 3| = |−7| = 7.',
    hint: 'A zárójelen belüli érték lehet +7 vagy −7 is!'
  },
  {
    id: 'g5-s1-q24',
    level: 3,
    question: 'Gondoltam egy számra. Hozzáadtam 15-öt, az eredményt megszoroztam 4-gyel, majd kivontam 20-at, így 100-at kaptam. Melyik számra gondoltam?',
    options: ['15', '20', '10', '25'],
    correctAnswer: '15',
    explanation: 'Visszafelé gondolkodva: 100 + 20 = 120; 120 : 4 = 30; 30 − 15 = 15. Ellenőrzés: (15 + 15) · 4 − 20 = 30 · 4 − 20 = 120 − 20 = 100.',
    hint: 'Indulj ki a 100-ból, és hajtsd végre az ellentétes műveleteket fordított sorrendben!'
  },
  {
    id: 'g5-s1-q25',
    level: 3,
    question: 'Mennyi a 37 · 84 + 37 · 16 kifejezés pontos értéke a leggyorsabb fejben számolással?',
    options: ['3 700', '3 400', '4 100', '3 600'],
    correctAnswer: '3 700',
    explanation: 'A közös szorzótényezőt kiemeljük: 37 · (84 + 16) = 37 · 100 = 3 700. Ez a disztributivitás (széttagolhatóság) szabálya.',
    hint: 'Emeld ki a közös 37-es szorzót a zárójel elé!'
  },
  {
    id: 'g5-s1-q26',
    level: 3,
    question: 'Egy számot 8-cal osztva a hányados 14, a maradék pedig a lehető LEGNAGYOBB. Mi volt az eredeti szám?',
    options: ['119', '112', '120', '118'],
    correctAnswer: '119',
    explanation: '8-cal való osztáskor a lehetséges legnagyobb maradék 7 (mivel a maradék mindig kisebb az osztónál). Az osztandó: 14 · 8 + 7 = 112 + 7 = 119.',
    hint: '8-as osztónál a maximális maradék 8 − 1 = 7.'
  },
  {
    id: 'g5-s1-q27',
    level: 3,
    question: 'Mennyivel változik az eredmény, ha a (−15) − x kivonásban az x helyére +5 helyett −5-öt írunk?',
    options: [
      '10-zel nő',
      '10-zel csökken',
      'Nem változik',
      '5-tel nő'
    ],
    correctAnswer: '10-zel nő',
    explanation: 'Ha x = +5, akkor (−15) − 5 = −20. Ha x = −5, akkor (−15) − (−5) = −15 + 5 = −10. A −20-ról −10-re az érték 10-zel növekedett.',
    hint: 'Számold ki az eredményt mindkét esetben: −15 − 5, majd −15 − (−5)!'
  },
  {
    id: 'g5-s1-q28',
    level: 3,
    question: 'Egy háromjegyű szám jegyeinek összege 12. A százasok jegye 2-vel nagyobb az egyeseknél, a tízesek helyén 4 áll. Mi a szám?',
    options: ['543', '642', '444', '741'],
    correctAnswer: '543',
    explanation: 'A tízesek jegye 4, így a százasok és egyesek összege 12 − 4 = 8. Mivel a százasok jegye 2-vel nagyobb az egyeseknél: egyesek = 3, százasok = 3 + 2 = 5. A szám: 543. (5 + 4 + 3 = 12).',
    hint: 'Ha a tízesek helyén 4 van, a maradék két számjegy összege 8, különbsége 2.'
  },
  {
    id: 'g5-s1-q29',
    level: 3,
    question: 'Mennyi a 24 : 4 · 3 kifejezés helyes értéke?',
    options: ['18', '2', '24', '12'],
    correctAnswer: '18',
    explanation: 'A szorzás és osztás egyenrangú műveletek, ezért szigorúan balról jobbra kell haladni: 24 : 4 = 6, majd 6 · 3 = 18. (Hiba lenne előbb megszorozni a 4 · 3-at!).',
    hint: 'Egyenrangú műveleteknél a balról jobbra szabály dönt!'
  },
  {
    id: 'g5-s1-q30',
    level: 3,
    question: 'Mennyi a (−12) + (+8) − (−15) + (−7) kifejezés pontos értéke?',
    options: ['+4', '−4', '+28', '−26'],
    correctAnswer: '+4',
    explanation: 'Egyszerűsítjük az előjeleket: −12 + 8 + 15 − 7. Pozitívak összege: 8 + 15 = 23. Negatívak összege: (−12) + (−7) = −19. Végeredmény: 23 − 19 = +4.',
    hint: 'Gyűjtsd egybe a pozitív tagokat és külön a negatív tagokat!'
  }
];

export const NumbersSummaryQuiz: React.FC<NumbersSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Számok és műveletek – Összefoglaló Kvíz"
      subtitle="30 átfogó feladat 3 szinten: római számok, helyiérték, kerekítés, műveleti sorrend és negatív számok"
      color="emerald"
      questions={NUMBERS_SUMMARY_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      MatcherComponent={({ onBack: mBack, level, onNextLevel }) => (
        <NumbersSummaryMatcher
          onBack={mBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      SorterComponent={({ onBack: sBack, level, onNextLevel }) => (
        <NumbersSummarySorter
          onBack={sBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-emerald-800 dark:text-emerald-200">1. Szint Puskája: Alapfogalmak Áttekintése</div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div>• <strong>Római számok:</strong> I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1 000.</div>
              <div>• <strong>Kivonásos római szabály:</strong> IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.</div>
              <div>• <strong>Kerekítés:</strong> 0, 1, 2, 3, 4 lefelé; 5, 6, 7, 8, 9 felfelé.</div>
              <div>• <strong>Abszolút érték:</strong> |a| a nullától mért távolság, sosem negatív! (|−8| = 8).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-emerald-800 dark:text-emerald-200">2. Szint Puskája: Műveleti Sorrend és Szabályok</div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div>• <strong>Műveleti sorrend:</strong> 1. Zárójel → 2. Szorzás / Osztás → 3. Összeadás / Kivonás (balról jobbra!).</div>
              <div>• <strong>Egyenrangú műveletek:</strong> 24 : 4 · 3 esetén szigorúan balról jobbra haladunk!</div>
              <div>• <strong>Előjelek kivonásnál:</strong> − (−szám) = +szám (tartozás elvétele vagyont növel).</div>
              <div>• <strong>Számegyenes távolság:</strong> Nagyobb szám − Kisebb szám = távolság.</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-emerald-800 dark:text-emerald-200">3. Szint Puskája: Mesterfogások és Trükkök</div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div>• <strong>Közös szorzó kiemelése:</strong> a · b + a · c = a · (b + c). (pl. 37 · 84 + 37 · 16 = 37 · 100).</div>
              <div>• <strong>Maradékos osztás:</strong> Osztandó = Hányados · Osztó + Maradék (Maradék &lt; Osztó).</div>
              <div>• <strong>Visszafelé gondolkodás:</strong> Kezdd a végeredménynél ellentétes műveletekkel!</div>
              <div>• <strong>Előjeles egyenletek:</strong> |x − a| = d esetén x = a + d vagy x = a − d.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
