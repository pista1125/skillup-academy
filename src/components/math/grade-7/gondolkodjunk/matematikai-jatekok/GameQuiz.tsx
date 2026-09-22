import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { GameMatcher } from './GameMatcher';
import { GameSorter } from './GameSorter';
import { GameSolverFigure } from './GameDiagrams';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Split,
  Layers,
  ShieldCheck,
  ShieldAlert,
  Swords
} from 'lucide-react';

interface GameQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Kétszemélyes Játékok',
    icon: <Gamepad2 className="w-4 h-4 text-amber-600" />,
    formula: 'Teljes információ • Nincs szerencse',
    note: 'Minden állás ismert, nincsenek rejtett elemek vagy véletlen tényezők (kockadobás).'
  },
  {
    id: 'c2',
    title: 'A 21-es Játék (1..3 elvehető)',
    icon: <Trophy className="w-4 h-4 text-emerald-600" />,
    formula: 'Nyerő számok: 4, 8, 12, 16, 20',
    note: 'A kezdő 1-et vesz el (20 marad), majd ha az ellenfél k-t vesz el, a kezdő 4 - k-t vesz el.'
  },
  {
    id: 'c3',
    title: 'Szimmetria-elv',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    formula: 'Középpont elfoglalása → Tükrözés',
    note: 'Kerek asztalon a középpontba teszünk, majd minden lépést átellenesen tükrözünk.'
  },
  {
    id: 'c4',
    title: 'Általános Moduló Szabály',
    icon: <Layers className="w-4 h-4 text-purple-600" />,
    formula: 'Ha max m vehető el: Moduló = m + 1',
    note: 'Az ellenfélnek mindig az (m + 1) többszörösét kell hagyni a lépésünk után.'
  },
  {
    id: 'c5',
    title: 'Két Egyforma Kupacos Nim',
    icon: <Split className="w-4 h-4 text-teal-600" />,
    formula: '2. játékos: szimmetrikus másolás',
    note: 'Amennyit az 1. játékos elvesz az egyik kupacból, annyit vesz el a 2. a másikból.'
  },
  {
    id: 'c6',
    title: 'Igazmondók és Hazugok',
    icon: <Swords className="w-4 h-4 text-cyan-600" />,
    formula: 'Esetszétválasztás: Lovag (I) / Lókötő (H)',
    note: 'Senki sem mondhatja: „Én hazug vagyok”. Keresd a logikai ellentmondásokat!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  // ==========================================
  // LEVEL 1: Alapfogalmak és a 21-es Játék Alapjai
  // ==========================================
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a 21-es Játék',
    description: 'Matematikai játékok tulajdonságai, nyerő/vesztő pozíciók és a 21-es kavicslevétel alaplépései.',
    questions: [
      {
        id: 'q1-1',
        question: 'Melyik játék számít a játékelméletben TELJES INFORMÁCIÓJÚ, DETERMINISZTIKUS játéknak?',
        options: [
          'Ki nevet a végén (dobókockával)',
          'Sakk (és a kavicslevételi játék)',
          'Fekete Péter kártyajáték',
          'Rulett'
        ],
        correctAnswer: 'Sakk (és a kavicslevételi játék)',
        explanation: 'A sakkban és a kavicslevételben nincs szerencseelem (dobókocka, kártyakeverés) és a tábla/állás minden adata nyitott mindkét fél előtt.',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q1-2',
        question: 'Az asztalon 21 kavics van. Felváltva 1, 2 vagy 3 kavics vehető el. Az nyer, aki az utolsó kavicsot elviszi. Hány kavicsot kell elvennie a KEZDŐ játékosnak a legelső lépésben, hogy biztosan nyerjen?',
        options: [
          '1 darabot (így 20 marad)',
          '2 darabot (így 19 marad)',
          '3 darabot (így 18 marad)',
          'Mindegy, a kezdő mindenképp veszít'
        ],
        correctAnswer: '1 darabot (így 20 marad)',
        explanation: 'A nyerő célpozíciók a 4 többszörösei (4, 8, 12, 16, 20). 21-ből 1-et elvéve pontosan 20 marad, ami a 4 többszöröse.',
        figure: <GameSolverFigure type="stones" data={{ stones: 21 }} />
      },
      {
        id: 'q1-3',
        question: 'Mi a definíciója a NYERŐ POZÍCIÓNAK?',
        options: [
          'Olyan állás, amelyből létezik legalább egy olyan lépés, amellyel a másik játékost vesztő pozícióba hozhatjuk.',
          'Olyan állás, amelyből a játékos azonnal megnyeri a játékot 1 lépésben.',
          'Olyan állás, amelyben a kezdő játékos van.',
          'Olyan állás, amelyben több mint 10 kavics van.'
        ],
        correctAnswer: 'Olyan állás, amelyből létezik legalább egy olyan lépés, amellyel a másik játékost vesztő pozícióba hozhatjuk.',
        explanation: 'Nyerő pozícióból indulva a soron következő játékos helyes játékkal garantálni tudja a győzelmet, mert át tud lépni egy vesztő pozícióba.',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q1-4',
        question: 'A 21-es kavicsos játékban az asztalon 4 kavics van. Te vagy soron. Hány kavicsot vegyél el, ha 1, 2 vagy 3 vehető el, és az utolsó kavics elvevője nyer?',
        options: [
          'Bármit veszel el, a másik játékos elviszi a maradékot és ő nyer (ez vesztő pozíció neked).',
          '3 kavicsot, mert akkor csak 1 marad.',
          '2 kavicsot, mert az páros szám.',
          '1 kavicsot, hogy a másiknak több maradjon.'
        ],
        correctAnswer: 'Bármit veszel el, a másik játékos elviszi a maradékot és ő nyer (ez vesztő pozíció neked).',
        explanation: 'Ha 1-et veszel el, ő elviszi a 3-at; ha 2-t veszel el, ő elviszi a 2-t; ha 3-at veszel el, ő elviszi az 1-et. A 4 kavicsos állás a soron következőnek VESZTŐ pozíció!',
        figure: <GameSolverFigure type="modulo" />
      },
      {
        id: 'q1-5',
        question: 'Ha a 2. játékos az előbb 2 kavicsot vett el a 21-es játékban, akkor a kezdőnek hány kavicsot kell elvennie, hogy fenntartsa a 4-es moduló stratégiáját?',
        options: [
          '2 darabot (mert 2 + 2 = 4)',
          '1 darabot',
          '3 darabot',
          'Nem kell elvennie semmit'
        ],
        correctAnswer: '2 darabot (mert 2 + 2 = 4)',
        explanation: 'A nyerő szabály lényege: ha az ellenfél k kavicsot vesz el (1, 2 vagy 3 kavicsot), mi mindig 4 - k kavicsot veszünk el. Így egy körben pontosan 4 kavics fogy.',
        figure: <GameSolverFigure type="stones" />
      },
      {
        id: 'q1-6',
        question: 'Egy kerek asztalra két játékos felváltva helyez el egyforma pénzérméket (átfedés nélkül). Az veszít, aki nem tud új érmét letenni. Melyik játékosnak van biztos nyerő stratégiája?',
        options: [
          'A KEZDŐ játékosnak: az első érmét a középpontba teszi, majd tükrözi a 2. játékos lépéseit.',
          'A MÁSODIK játékosnak: mindig a legszélére tesz érmét.',
          'Egyiknek sincs, a szerencsén múlik.',
          'Csak akkor van nyerő stratégia, ha páros sok érme fér el.'
        ],
        correctAnswer: 'A KEZDŐ játékosnak: az első érmét a középpontba teszi, majd tükrözi a 2. játékos lépéseit.',
        explanation: 'A kerek asztal középpontosan szimmetrikus. A kezdő lefoglalja a szimmetriaközéppontot, ezután a 2. játékos minden lépésére létezik egy szabad, átellenes tükörkép mező!',
        figure: <GameSolverFigure type="symmetry" />
      },
      {
        id: 'q1-7',
        question: 'Két kupacban 5-5 gyufaszál van. Egy lépésben bármelyik kupacból tetszőleges számú gyufa elvehető. Az utolsó gyufát elvevő nyer. Kinek van nyerő stratégiája?',
        options: [
          'A MÁSODIK játékosnak: szimmetrikusan pontosan ugyanannyit vesz el a másik kupacból, mint amennyit a kezdő vett el.',
          'A KEZDŐ játékosnak: rögtön elviszi az egyik teljes kupacot.',
          'A kezdőnek: 1 gyufát vesz el.',
          'Döntetlen lesz a vége.'
        ],
        correctAnswer: 'A MÁSODIK játékosnak: szimmetrikusan pontosan ugyanannyit vesz el a másik kupacból, mint amennyit a kezdő vett el.',
        explanation: 'A kezdőállás szimmetrikus ($5-5$). A 2. játékos minden lépésével visszaállítja a két kupac egyenlőségét ($k-k$), így ő fogja elvenni az utolsó gyufákat is.',
        figure: <GameSolverFigure type="piles" data={{ pile1: 5, pile2: 5 }} />
      },
      {
        id: 'q1-8',
        question: 'Mondhatja-e az Igazmondók és Hazugok szigetén egy lakos azt, hogy: „Én egy hazug vagyok.”?',
        options: [
          'NEM, mert ha igazmondó lenne, nem mondhatna hazugságot, ha hazug lenne, nem mondhatna igazat magáról.',
          'IGEN, csak a hazugok mondhatják.',
          'IGEN, csak az igazmondók mondhatják viccből.',
          'Attól függ, hogy délelőtt vagy délután kérdezzük.'
        ],
        correctAnswer: 'NEM, mert ha igazmondó lenne, nem mondhatna hazugságot, ha hazug lenne, nem mondhatna igazat magáról.',
        explanation: 'Ez a híres logikai paradoxon: sem igazmondó, sem hazug nem tehet ilyen kijelentést, mert mindkét eset ellentmondásra vezet.',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q1-9',
        question: 'Az asztalon 12 kavics van (1..3 vehető el, utolsó nyer). Ki nyer biztosan, ha mindkét játékos tökéletesen játszik?',
        options: [
          'A MÁSODIK játékos, mert a 12 osztható 4-gyel (a kezdő vesztő pozícióban áll).',
          'A KEZDŐ játékos, mert ő vesz el először.',
          'A kezdő, ha 3 kavicsot vesz el.',
          'Mindkét játékos nyerhet 50-50% eséllyel.'
        ],
        correctAnswer: 'A MÁSODIK játékos, mert a 12 osztható 4-gyel (a kezdő vesztő pozícióban áll).',
        explanation: 'A 4 többszörösei (4, 8, 12, 16, 20) vesztő pozíciók a soron következőnek. Mivel 12 osztható 4-gyel, a kezdő bármit lép (1, 2 vagy 3), a 2. játékos 8-ra egészíti ki a maradékot!',
        figure: <GameSolverFigure type="modulo" />
      },
      {
        id: 'q1-10',
        question: 'Ha egy játékban a lépésünk után az asztalon maradó kavicsok száma 0 lesz, és az utolsó kavics elvevője nyer, akkor a mi lépésünk előtt milyen pozícióban voltunk?',
        options: [
          'Nyerő pozícióban (1, 2 vagy 3 kavics volt, és mindet elvittük).',
          'Vesztő pozícióban.',
          'Döntetlen pozícióban.',
          'Nem határozható meg.'
        ],
        correctAnswer: 'Nyerő pozícióban (1, 2 vagy 3 kavics volt, és mindet elvittük).',
        explanation: 'Ha 1, 2 vagy 3 kavics volt az asztalon, egyetlen szabályos lépéssel elvehettük az összeset, azonnal megnyerve a játékot. Ezért ez nyerő pozíció.',
        figure: <GameSolverFigure type="stones" />
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Stratégiák Különböző Szabályokkal
  // ==========================================
  2: {
    level: 2,
    title: '2. Szint: Változó Szabályok és Szimmetria',
    description: 'Nyerő lépések meghatározása tetszőleges kavicsszám és elvételi korlát esetén, szimmetria alkalmazása.',
    questions: [
      {
        id: 'q2-1',
        question: 'Az asztalon 30 kavics van. Egy lépésben 1, 2, 3, 4 vagy 5 kavics vehető el. Az utolsó kavicsot elvevő nyer. Hány kavicsot vegyen el a KEZDŐ az 1. lépésben a biztos győzelemhez?',
        options: [
          'A 30 osztható 6-tal (5 + 1 = 6), így a kezdő vesztő pozícióban van, a 2. játékosnak van nyerő stratégiája.',
          '5 kavicsot vesz el (25 marad).',
          '4 kavicsot vesz el (26 marad).',
          '1 kavicsot vesz el (29 marad).'
        ],
        correctAnswer: 'A 30 osztható 6-tal (5 + 1 = 6), így a kezdő vesztő pozícióban van, a 2. játékosnak van nyerő stratégiája.',
        explanation: 'Ha legfeljebb $m = 5$ kavics vehető el, az osztó $m + 1 = 6$. Mivel $30 : 6 = 5$ (maradék 0), a kezdőállás a kezdő számára VESZTŐ pozíció!',
        figure: <GameSolverFigure type="modulo" />
      },
      {
        id: 'q2-2',
        question: 'Az asztalon 25 kavics van. Egy lépésben 1, 2 vagy 3 kavics vehető el. Az utolsó kavicsot elvevő nyer. Hány kavicsot vegyen el a kezdő?',
        options: [
          '1 kavicsot (mert 25 = 6 · 4 + 1, így 24 marad, ami 4 többszöröse)',
          '2 kavicsot (23 marad)',
          '3 kavicsot (22 marad)',
          'Nem tud nyerni a kezdő'
        ],
        correctAnswer: '1 kavicsot (mert 25 = 6 · 4 + 1, így 24 marad, ami 4 többszöröse)',
        explanation: '25-öt 4-gyel osztva a maradék 1. A kezdő elvesz 1 kavicsot, így 24 (4 többszöröse) marad a 2. játékosnak.',
        figure: <GameSolverFigure type="stones" data={{ stones: 25 }} />
      },
      {
        id: 'q2-3',
        question: 'Mi a különbség a NORMÁL és a MISERE játék között?',
        options: [
          'Normál játékban az utolsó lépést tevő NYER, Misere játékban az utolsó lépést tevő VESZÍT.',
          'Normál játékban dobókockával játszanak, Misere játékban kártyával.',
          'Normál játékban 2 játékos van, Misere játékban 3 játékos.',
          'Nincs semmilyen különbség.'
        ],
        correctAnswer: 'Normál játékban az utolsó lépést tevő NYER, Misere játékban az utolsó lépést tevő VESZÍT.',
        explanation: 'A Misere (vesztő) játékváltozatban a cél az, hogy a másik játékost kényszerítsük az utolsó elem elvételére (az veszít, aki kénytelen elvenni az utolsót).',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q2-4',
        question: 'A 21-es Misere játékban (elvehető: 1..3, de aki az UTOLSÓT elviszi, az VESZÍT). Mi a nyerő célállás?',
        options: [
          'Pontosan 1 kavicsot kell hagyni az ellenfélnek az asztalon (mert akkor kénytelen azt elvinni).',
          '0 kavicsot kell hagyni.',
          '4 kavicsot kell hagyni.',
          '2 kavicsot kell hagyni.'
        ],
        correctAnswer: 'Pontosan 1 kavicsot kell hagyni az ellenfélnek az asztalon (mert akkor kénytelen azt elvinni).',
        explanation: 'Misere szabály esetén a végcél az 1 kavics hátrahagyása. A nyerő pozíciók: 1, 5, 9, 13, 17, 21. Mivel 21 éppen ilyen, a 2. játékos nyer!',
        figure: <GameSolverFigure type="stones" data={{ stones: 21 }} />
      },
      {
        id: 'q2-5',
        question: 'Egy lakos a szigeten azt állítja: „Legalább egyikünk hazug (lókötő).” Milyen típusú a beszélő és a mellette álló társa?',
        options: [
          'A beszélő IGAZMONDÓ (Lovag), a társa HAZUG (Lókötő).',
          'Mindketten hazugok.',
          'Mindketten igazmondók.',
          'A beszélő hazug, a társa igazmondó.'
        ],
        correctAnswer: 'A beszélő IGAZMONDÓ (Lovag), a társa HAZUG (Lókötő).',
        explanation: 'Ha a beszélő hazug lenne, akkor az állítása igaz lenne (mert legalább egyikük, ő maga hazug), de egy hazug nem mondhat igazat! Ezért a beszélő IGAZMONDÓ, és mivel az állítása igaz, a társának HAZUGNAK kell lennie.',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q2-6',
        question: 'Egy 10×10-es négyzetrácsos táblán 1×2-es dominókat helyezünk el felváltva. Az veszít, aki nem tud új dominót letenni. Kinek van nyerő stratégiája?',
        options: [
          'A 2. JÁTÉKOSNAK: a tábla középpontjára szimmetrikusan tükrözi az 1. játékos dominóit.',
          'A KEZDŐNEK: a sarokba teszi az első dominót.',
          'A kezdőnek: 4 dominót tesz le egyszerre.',
          'Nem lehet meghatározni.'
        ],
        correctAnswer: 'A 2. JÁTÉKOSNAK: a tábla középpontjára szimmetrikusan tükrözi az 1. játékos dominóit.',
        explanation: 'Mivel a 10×10-es táblának nincs egyetlen kitüntetett középső mezője (a rácsvonalak találkozása a középpont), a kezdő nem tudja lefedni a szimmetriaközéppontot egy dominóval anélkül, hogy ne szimmetrikus párt érintene. A 2. játékos a középpontos tükrözéssel garantáltan nyer!',
        figure: <GameSolverFigure type="symmetry" />
      },
      {
        id: 'q2-7',
        question: 'Két kupacban 7 és 9 gyufa van. Egy lépésben bármelyik kupacból tetszőleges számú gyufa elvehető (akár a teljes kupac is). Az utolsó gyufát elvevő nyer. Mit lépjen a KEZDŐ az 1. lépésben?',
        options: [
          'A 9-es kupacból elvesz 2 gyufát, így mindkét kupacban 7-7 gyufa marad.',
          'Elveszi a teljes 7-es kupacot.',
          'Elveszi a teljes 9-es kupacot.',
          '1 gyufát vesz el a 7-es kupacból.'
        ],
        correctAnswer: 'A 9-es kupacból elvesz 2 gyufát, így mindkét kupacban 7-7 gyufa marad.',
        explanation: 'A kétkupacos Nimben a szimmetrikus állás ($k-k$) a vesztő pozíció a soron következőnek. A kezdő 7-7-re állítja a kupacokat, majd szimmetrikusan másolja a 2. játékos lépéseit.',
        figure: <GameSolverFigure type="piles" data={{ pile1: 7, pile2: 9 }} />
      },
      {
        id: 'q2-8',
        question: 'A 100-as játékban a játékosok 0-ról indulva felváltva hozzáadnak 1, 2, ..., vagy 9-et az összeghez. Az nyer, aki pontosan eléri a 100-at. Melyek a nyerő kulcsszámok?',
        options: [
          '1, 11, 21, 31, 41, 51, 61, 71, 81, 91 (10-zel osztva 1 maradékot adnak).',
          '10, 20, 30, 40, 50, 60, 70, 80, 90, 100.',
          '9, 18, 27, 36, 45, 54, 63, 72, 81, 90.',
          'Minden páros szám.'
        ],
        correctAnswer: '1, 11, 21, 31, 41, 51, 61, 71, 81, 91 (10-zel osztva 1 maradékot adnak).',
        explanation: 'Max 9 adható hozzá, így a lépéspár összege 10 ($k + (10 - k) = 10$). Visszafelé: 100 - 9 = 91-re kell lépni, előtte 81, ..., a kezdő 1-et mond, és mindig 10-re egészíti ki a 2. játékos lépését.',
        figure: <GameSolverFigure type="modulo" />
      },
      {
        id: 'q2-9',
        question: 'Egy lakos azt mondja: „Mindketten hazugok vagyunk.” Milyen típusú a beszélő és a társa?',
        options: [
          'A beszélő HAZUG (Lókötő), a társa IGAZMONDÓ (Lovag).',
          'Mindketten hazugok.',
          'Mindketten igazmondók.',
          'A beszélő igazmondó, a társa hazug.'
        ],
        correctAnswer: 'A beszélő HAZUG (Lókötő), a társa IGAZMONDÓ (Lovag).',
        explanation: 'Igazmondó nem mondhatja ezt (mert akkor hazudna). Tehát a beszélő HAZUG. Mivel hazudik, az állítása („mindketten hazugok”) hamis, ami azt jelenti, hogy a másik személy NEM hazug, hanem IGAZMONDÓ!',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q2-10',
        question: 'Az asztalon 17 kavics van (1..3 vehető el, utolsó nyer). Mit lép a kezdő?',
        options: [
          'Elvesz 1 kavicsot (16 marad, ami 4 többszöröse).',
          'Elvesz 2 kavicsot (15 marad).',
          'Elvesz 3 kavicsot (14 marad).',
          'Nem tud nyerni.'
        ],
        correctAnswer: 'Elvesz 1 kavicsot (16 marad, ami 4 többszöröse).',
        explanation: '$17 = 4 \cdot 4 + 1$. A kezdő elvesz 1 kavicsot, így $16$-ot hagy az ellenfélnek, ami a 4 többszöröse.',
        figure: <GameSolverFigure type="stones" data={{ stones: 17 }} />
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Összetett Játékok és Bonyolult Logika
  // ==========================================
  3: {
    level: 3,
    title: '3. Szint: Haladó Nyerő Stratégiák és Logikai Fejtörők',
    description: 'Többkupacos Nim, retrográd elemzés összetett játéktáblákon és többlépéses fejtörők.',
    questions: [
      {
        id: 'q3-1',
        question: 'Három lakos (A, B, C) áll előttünk. A azt mondja: „Mindannyian hazugok vagyunk.” B azt mondja: „Pontosan egyikünk mond igazat.” Ki az igazmondó és ki a hazug?',
        options: [
          'A hazug, B igazmondó, C hazug.',
          'Mind a hárman hazugok.',
          'A és B igazmondó, C hazug.',
          'Mind a hárman igazmondók.'
        ],
        correctAnswer: 'A hazug, B igazmondó, C hazug.',
        explanation: 'A nem lehet igazmondó (mert az önellentmondás lenne), tehát A HAZUG. Mivel A hazug, nem mindenki hazug. B azt állítja, hogy pontosan 1 igazmondó van (ő maga), ez konzisztens, így B IGAZMONDÓ, C pedig HAZUG.',
        breakdown: [
          { label: 'A állítása', value: 'Hamis → A hazug' },
          { label: 'B állítása', value: 'Igaz (pontosan 1 igazmondó van: B) → B lovag' },
          { label: 'C személye', value: 'C hazug' }
        ]
      },
      {
        id: 'q3-2',
        question: 'Egy 3 kupacos Nim játékban 1, 2 és 3 gyufa van a kupacokban. Az utolsó gyufát elvevő nyer. Kinek van nyerő stratégiája?',
        options: [
          'A MÁSODIK játékosnak (az 1-2-3 állás egy klasszikus vesztő pozíció a kezdőnek, Nim-összeg = 0).',
          'A kezdőnek, ha elveszi az egész 3-as kupacot.',
          'A kezdőnek, ha 1-et vesz el a 2-es kupacból.',
          'Mindig az nyer, aki gyorsabban lép.'
        ],
        correctAnswer: 'A MÁSODIK játékosnak (az 1-2-3 állás egy klasszikus vesztő pozíció a kezdőnek, Nim-összeg = 0).',
        explanation: 'Kettes számrendszerben: 1 = 01, 2 = 10, 3 = 11. Az oszloponkénti paritásos összeg (XOR / Nim-összeg) $1 \oplus 2 \oplus 3 = 0$. Ez egyensúlyi (vesztő) pozíció a kezdő számára, a 2. játékosnak van nyerő stratégiája!',
        breakdown: [
          { label: 'Kupacok', value: '1, 2, 3 gyufa' },
          { label: 'Nim-összeg', value: '1 ⊕ 2 ⊕ 3 = 0' },
          { label: 'Pozíció jellege', value: 'Kezdőnek VESZTŐ' }
        ]
      },
      {
        id: 'q3-3',
        question: 'Két vándor érkezik egy útelágazáshoz, ahol az egyik út a kincshez, a másik a szakadékba vezet. Két őr áll ott: az egyik MINDIG IGAZAT mond, a másik MINDIG HAZUDIK, de nem tudjuk, melyik melyik. Egyetlen kérdést tehetünk fel az egyik őrnek. Mit kell kérdeznünk?',
        options: [
          '„Mit mondana a másik őr, melyik út vezet a kincshez?” (És a kapott válasszal ELLENKEZŐ utat kell választani).',
          '„Te mindig igazat mondasz?”',
          '„Merre van a kincs?”',
          '„A bal oldali út a jó út?”'
        ],
        correctAnswer: '„Mit mondana a másik őr, melyik út vezet a kincshez?” (És a kapott válasszal ELLENKEZŐ utat kell választani).',
        explanation: 'Ha az igazmondót kérdezzük, ő őszintén megmondja, hogy a hazug a rossz utat mutatná. Ha a hazugot kérdezzük, ő hazudni fog az igazmondó válaszáról, így ő is a rossz utat mutatja. Mindkét esetben a ROSSZ utat kapjuk, tehát a MÁSIK úton kell menni!',
        breakdown: [
          { label: 'Kérdés', value: 'Mit mondana a másik őr?' },
          { label: 'Igazmondó válasza', value: 'A rossz utat mondja' },
          { label: 'Hazug válasza', value: 'A rossz utat mondja' },
          { label: 'Megoldás', value: 'Válaszd a másik utat!' }
        ]
      },
      {
        id: 'q3-4',
        question: 'Egy kör alakú pályán 12 mező van (1-től 12-ig számozva körben). Egy bábu az 1-es mezőn áll. Két játékos felváltva lépteti a bábut előre 1, 2 vagy 3 mezővel az óramutató járása szerint. Az nyer, aki a bábujával pontosan a 12-es mezőre lép. Kinek van nyerő stratégiája?',
        options: [
          'A KEZDŐ játékosnak: 3 mezőt lép előre (az 1 + 3 = 4-es mezőre érkezik).',
          'A 2. játékosnak, mert 12 osztható 4-gyel.',
          'A kezdőnek, ha 1 mezőt lép a 2-esre.',
          'Döntetlen lesz, mert körbe forognak.'
        ],
        correctAnswer: 'A KEZDŐ játékosnak: 3 mezőt lép előre (az 1 + 3 = 4-es mezőre érkezik).',
        explanation: 'A cél a 12-es mező. Visszafelé a nyerő mezők: 12, 8, 4. Mivel az 1-es mezőről indulunk, a kezdő $1 + 3 = 4$-es mezőre lép, és innentől ő tartja a 4-es kulcsmezőket!',
        breakdown: [
          { label: 'Célmező', value: '12-es mező' },
          { label: 'Nyerő kulcsmezők', value: '4, 8, 12' },
          { label: 'Kezdőlépés', value: '1-ről 4-re lépés (3 mező előre)' }
        ]
      },
      {
        id: 'q3-5',
        question: 'Két játékos felváltva mond egész számokat. A kezdő mond egy számot 1 és 10 között. Ezután a következő mindig 1-gyel, 2-vel vagy 3-mal nagyobbat mond az előzőnél. Az nyer, aki kimondja a 50-et. Mit mondjon a kezdő?',
        options: [
          'A kezdő a 2-t mondja (mert 50 = 12 · 4 + 2, a kulcsszámok: 2, 6, 10, 14... 46, 50).',
          'A kezdő a 10-et mondja.',
          'A kezdő az 1-et mondja.',
          'A kezdő az 5-öt mondja.'
        ],
        correctAnswer: 'A kezdő a 2-t mondja (mert 50 = 12 · 4 + 2, a kulcsszámok: 2, 6, 10, 14... 46, 50).',
        explanation: 'A lépéspár összege 4 (ha a másik $k$-t ad hozzá, mi $4 - k$-t). Visszafelé az 50-ből 4-esével visszaszámolva a maradék $50 \pmod 4 = 2$. Tehát a kezdő a 2-t mondja, és biztosan nyer.',
        breakdown: [
          { label: 'Végcél', value: '50' },
          { label: 'Lépéspár összege', value: '4' },
          { label: 'Kezdőszám', value: '50 mod 4 = 2' }
        ]
      },
      {
        id: 'q3-6',
        question: 'Egy táblán felírtuk a számokat 1-től 20-ig. Két játékos felváltva letöröl egy-egy számot. A játék akkor ér véget, ha már csak 2 szám marad a táblán. Ha a megmaradó két szám összege PÁROS, az 1. játékos nyer; ha PÁRATLAN, a 2. játékos nyer. Kinek van nyerő stratégiája?',
        options: [
          'A 2. JÁTÉKOSNAK: párba állítja a számokat (egy páros-egy páratlan párok), és mindig a kezdő párjának másik tagját törli le.',
          'Az 1. játékosnak.',
          'Egyiknek sincs, a véletlenen múlik.',
          'Mindig az nyer, aki a legnagyobb számot törli le.'
        ],
        correctAnswer: 'A 2. JÁTÉKOSNAK: párba állítja a számokat (egy páros-egy páratlan párok), és mindig a kezdő párjának másik tagját törli le.',
        explanation: 'A 20 szám között 10 páros és 10 páratlan van. A 2. játékos képez 10 db (páros, páratlan) párt. Bármelyik pár egyik elemét törli a kezdő, a 2. játékos a pár másik elemét törli. Így a legvégén pontosan 1 páros és 1 páratlan marad, aminek összege PÁRATLAN, tehát a 2. játékos nyer!',
        breakdown: [
          { label: 'Stratégia', value: 'Párosításos szimmetria' },
          { label: 'Végeredmény', value: '1 páros + 1 páratlan = PÁRATLAN' },
          { label: 'Győztes', value: '2. Játékos' }
        ]
      },
      {
        id: 'q3-7',
        question: 'Egy dobozban 15 piros és 15 zöld golyó van. Egy lépésben tetszőleges számú golyó kivehető az egyik színből, vagy mindkét színből PONTOSAN UGYANANNYI golyó vehető ki egyszerre. Az utolsó golyót kivevő nyer. Mit lép a kezdő?',
        options: [
          'A kezdő kiveszi az összes 15 piros ÉS 15 zöld golyót egyszerre az 1. lépésben, és azonnal nyer!',
          'Csak 1 golyót vesz ki a pirosból.',
          'Kivesz 1 pirosat és 1 zöldet.',
          'Nem tud azonnal nyerni.'
        ],
        correctAnswer: 'A kezdő kiveszi az összes 15 piros ÉS 15 zöld golyót egyszerre az 1. lépésben, és azonnal nyer!',
        explanation: 'Mivel a szabály megengedi, hogy mindkét színből azonos számú golyót vegyünk ki, a kezdő az első lépésben mind a 15-15 golyót kiveszi egyszerre (mivel $15 = 15$), azonnal befejezve és megnyerve a játékot!',
        figure: <GameSolverFigure type="stones" />
      },
      {
        id: 'q3-8',
        question: 'Három ember közül az egyik mindig igazat mond, a másik mindig hazudik, a harmadik néha igazat mond, néha hazudik (normális). Azt mondják: A: „Én normális vagyok.” B: „A igazat mond.” C: „Én nem vagyok normális.” Milyen típusú C?',
        options: [
          'C az IGAZMONDÓ (Lovag).',
          'C a hazug.',
          'C a normális.',
          'Nem dönthető el.'
        ],
        correctAnswer: 'C az IGAZMONDÓ (Lovag).',
        explanation: 'Az igazmondó nem mondhatja magát normálisnak, a hazug sem mondhatja magát normálisnak. Ezért A csak a NORMÁLIS lehet! B azt mondja, A igazat mond (pedig A hazudott), így B a HAZUG. Ebből következően C az IGAZMONDÓ!',
        figure: <GameSolverFigure type="logic" />
      },
      {
        id: 'q3-9',
        question: 'Két játékos felváltva rajzol átlókat egy szabályos 8-szögben úgy, hogy az átlók nem metszhetik egymást (csak csúcsban találkozhatnak). Az veszít, aki nem tud új szabályos átlót behúzni. Kinek van nyerő stratégiája?',
        options: [
          'A KEZDŐNEK: behúzza a szabályos 8-szög főátlóját (szimmetriatengelyét), majd a 2. játékos átlóit a főátlóra tükrözi.',
          'A 2. játékosnak.',
          'Egyiknek sincs, mindig döntetlen.',
          'Csak páratlan sokszögre működik.'
        ],
        correctAnswer: 'A KEZDŐNEK: behúzza a szabályos 8-szög főátlóját (szimmetriatengelyét), majd a 2. játékos átlóit a főátlóra tükrözi.',
        explanation: 'A szabályos nyolcszög szimmetrikus. A kezdő behúzza a két szemközti csúcsot összekötő főátlót. Ezután a 2. játékos bármelyik félbe húz átlót, a kezdő behúzza annak tükörképét a másik félbe!',
        figure: <GameSolverFigure type="symmetry" />
      },
      {
        id: 'q3-10',
        question: 'Mi a Retrográd Analízis (visszafelé elemzés) alapvető szabálya a nyerő és vesztő pozíciók megállapítására?',
        options: [
          '1. A végállás ismert pozíciójából indulunk. 2. Ha egy állásból vezet lépés vesztőbe → NYERŐ. 3. Ha minden lépés nyerőbe vezet → VESZTŐ.',
          'Mindig a legnagyobb számot választjuk.',
          'Minden állást véletlenszerűen próbálunk ki.',
          'Csak a páros számú pozíciókat elemezzük.'
        ],
        correctAnswer: '1. A végállás ismert pozíciójából indulunk. 2. Ha egy állásból vezet lépés vesztőbe → NYERŐ. 3. Ha minden lépés nyerőbe vezet → VESZTŐ.',
        explanation: 'Ez a játékelmélet alaptétele: a záróállástól visszafelé lépkedve, egy állapot akkor nyerő, ha létezik belőle lépés vesztő állapotba; és akkor vesztő, ha minden belőle kivezető lépés nyerő állapotba visz.',
        figure: <GameSolverFigure type="modulo" />
      }
    ]
  }
};

export const GameQuiz: React.FC<GameQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      grade={7}
      chapterId="gondolkodjunk"
      subtopicId="matematikai-jatekok"
      topicId="g7-logic-games"
      topicTitle="6. Matematikai játékok"
      topicBadge="7. Osztály • Matematika I. Témakör"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="6. Matematikai játékok Gyakorló Kvíz"
      subtitle="30 válogatott feladat 3 nehézségi szinten: nyerő stratégiák, 21-es kavicslevétel, szimmetria-elv, Nim és logikai fejtörők"
      cheatSheetTitle="Játékelméleti Stratégiák és Képletek"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      matcherComponent={<GameMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<GameSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      themeColor="amber"
    />
  );
};
