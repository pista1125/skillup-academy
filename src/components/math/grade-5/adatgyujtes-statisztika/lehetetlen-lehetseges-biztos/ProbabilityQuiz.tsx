import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { ProbabilityMatcher } from './ProbabilityMatcher';
import { ProbabilitySorter } from './ProbabilitySorter';

export interface ProbabilityQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const PROBABILITY_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ESEMÉNYEK MINŐSÍTÉSE ÉS ALAPFOGALMAK (1-10)
  // =========================================================================
  {
    id: 'prob1-1',
    level: 1,
    prompt: 'Melyik esemény BIZTOS az alábbiak közül, ha egy szabályos hatoldalú kockával dobunk?',
    options: [
      'A dobott szám 7-nél kisebb pozitív egész szám lesz.',
      'A dobott szám pontosan 6-os lesz.',
      'A dobott szám páros lesz.',
      'A dobott szám nagyobb lesz 3-nál.'
    ],
    correctAnswer: 0,
    explanation: 'A kocka oldalai: 1, 2, 3, 4, 5, 6. Mind a hat szám pozitív és kisebb 7-nél, így ez az esemény 100%-os biztonsággal bekövetkezik.',
    hint: 'Minden dobható szám kisebb 7-nél?'
  },
  {
    id: 'prob1-2',
    level: 1,
    prompt: 'Melyik esemény LEHETETLEN egy szabályos hatoldalú dobókockával?',
    options: [
      'Nullát (0) dobunk.',
      'Egyest (1) dobunk.',
      'Páratlan számot dobunk.',
      'Ötnél nagyobb számot dobunk.'
    ],
    correctAnswer: 0,
    explanation: 'A dobókockán a számok 1-től 6-ig terjednek. Nulla nem található rajta, így nullát dobni lehetetlen (0% esély).',
    hint: 'Gondold végig, milyen számok szerepelnek a kocka lapjain!'
  },
  {
    id: 'prob1-3',
    level: 1,
    prompt: 'Milyen típusú esemény az, hogy pénzfeldobáskor Fejet dobunk?',
    options: [
      'Lehetséges (véletlen) esemény.',
      'Biztos esemény.',
      'Lehetetlen esemény.',
      'Szükségszerű esemény.'
    ],
    correctAnswer: 0,
    explanation: 'A pénzérmének két oldala van (Fej és Írás). A fej dobása bekövetkezhet, de nem garantált, tehát lehetséges (véletlen) esemény.',
    hint: 'Biztos, hogy fej lesz, vagy jöhet írás is?'
  },
  {
    id: 'prob1-4',
    level: 1,
    prompt: 'Hány különböző kimenetele lehet egy szabályos pénzérme egyszeri feldobásának?',
    options: [
      '2 kimenetel (Fej vagy Írás)',
      '1 kimenetel',
      '4 kimenetel',
      '6 kimenetel'
    ],
    correctAnswer: 0,
    explanation: 'Az érmének két oldala van: Fej vagy Írás, így a kísérletnek 2 lehetséges kimenetele van.',
    hint: 'Hány oldala van egy pénzérmének?'
  },
  {
    id: 'prob1-5',
    level: 1,
    prompt: 'Szabályos dobókockával páros számot dobni hány kedvező esetet jelent a 6-ból?',
    options: [
      '3 esetet (a 2, 4 és 6)',
      '2 esetet',
      '4 esetet',
      '1 esetet'
    ],
    correctAnswer: 0,
    explanation: 'A kockán lévő páros számok a 2, a 4 és a 6, ez összesen 3 kedvező eset a 6 lehetségesből (50% esély).',
    hint: 'Sorold fel a páros számokat 1 és 6 között!'
  },
  {
    id: 'prob1-6',
    level: 1,
    prompt: 'Egy dobozban kizárólag piros golyók vannak. Milyen esemény az, hogy bekötött szemmel piros golyót húzunk?',
    options: [
      'Biztos esemény',
      'Lehetetlen esemény',
      'Lehetséges, de ritka esemény',
      'Egyenlő esélyű esemény'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a dobozban csak piros golyók vannak, kizárt, hogy más színűt húzzunk. A piros húzása elkerülhetetlen, tehát biztos esemény.',
    hint: 'Húzhatsz-e bármi mást, ha csak piros van bent?'
  },
  {
    id: 'prob1-7',
    level: 1,
    prompt: 'Egy tolltartóban csak kék tollak vannak. Milyen esemény az, hogy véletlenszerűen zöld tollat húzunk elő belőle?',
    options: [
      'Lehetetlen esemény',
      'Biztos esemény',
      'Lehetséges esemény',
      'Nagyon valószínű esemény'
    ],
    correctAnswer: 0,
    explanation: 'Mivel egyetlen zöld toll sincs a tolltartóban, lehetetlen zöld tollat húzni belőle.',
    hint: 'Elő tudsz venni valamit, ami nincs is ott?'
  },
  {
    id: 'prob1-8',
    level: 1,
    prompt: 'Mely számok számítanak prímszámnak egy hatoldalú dobókockán?',
    options: [
      '2, 3 és 5 (összesen 3 darab)',
      '1, 2, 3 és 5 (összesen 4 darab)',
      'Csak a 3 és az 5',
      '1, 3 és 5'
    ],
    correctAnswer: 0,
    explanation: 'Az 1 nem prímszám! A kockán lévő prímszámok a 2 (az egyetlen páros prím), a 3 és az 5. Tehát 3 darab prím van.',
    hint: 'Vigyázz: az 1-es se nem prím, se nem összetett!'
  },
  {
    id: 'prob1-9',
    level: 1,
    prompt: 'Mekkora az esélye annak, hogy egy szabályos dobókockával pontosan 6-ost dobunk?',
    options: [
      '1 a 6-hoz (1/6 esély)',
      '6 a 6-hoz (biztos)',
      'Fele-fele (50%)',
      '1 a 2-höz'
    ],
    correctAnswer: 0,
    explanation: 'A hat lap közül pontosan egy lapon van 6-os, így a kedvező esetek száma 1, az összes eset száma 6. Az esély: 1/6 (kb. 16,7%).',
    hint: 'Hány hatos van a kockán a 6 oldal közül?'
  },
  {
    id: 'prob1-10',
    level: 1,
    prompt: 'Két tetszőleges páros szám összege páros lesz. Milyen esemény ez?',
    options: [
      'Biztos esemény (100%)',
      'Lehetetlen esemény',
      'Lehetséges, de nem biztos',
      'Véletlenszerű esemény'
    ],
    correctAnswer: 0,
    explanation: 'Páros szám + páros szám mindig kivétel nélkül páros számot eredményez (pl. 2 + 4 = 6, 10 + 20 = 30), ezért ez biztos esemény.',
    hint: 'Tudsz mondani két páros számot, aminek az összege páratlan lenne?'
  },

  // =========================================================================
  // 2. SZINT: ESÉLYEK ÖSSZEHASONLÍTÁSA ÉS VÉLETLEN KÍSÉRLETEK (11-20)
  // =========================================================================
  {
    id: 'prob2-1',
    level: 2,
    prompt: 'Egy sötét zsákban 7 piros és 3 zöld alma van. Belenyúlva egy almát kiveszünk. Melyik színt valószínűbb kivenni?',
    options: [
      'A pirosat, mert abból több van (7 > 3).',
      'A zöldet, mert az ritkább.',
      'Pontosan egyforma az esélyük.',
      'Nem lehet eldönteni belenézés nélkül.'
    ],
    correctAnswer: 0,
    explanation: 'A 10 almából 7 piros és 3 zöld. Mivel több piros alma van, a piros alma kihúzása jóval valószínűbb (70% vs. 30%).',
    hint: 'Melyik színű almából van több a zsákban?'
  },
  {
    id: 'prob2-2',
    level: 2,
    prompt: 'Egy dobókockával dobva melyik esemény valószínűbb: az, hogy NEM 6-ost dobunk, vagy az, hogy 6-ost dobunk?',
    options: [
      'Sokkal valószínűbb, hogy NEM 6-ost dobunk (5 eset vs. 1 eset).',
      'Valószínűbb, hogy 6-ost dobunk.',
      'Egyforma esélyű mindkettő.',
      'Attól függ, milyen erősen dobjuk el a kockát.'
    ],
    correctAnswer: 0,
    explanation: 'A „nem 6-os” eseménynek 5 kedvező esete van {1, 2, 3, 4, 5}, míg a „6-os” dobásnak csak 1 esete van {6}. Ezért az előbbi sokkal valószínűbb (5/6 vs. 1/6).',
    hint: 'Számold meg, hány olyan oldal van, ami NEM hatos!'
  },
  {
    id: 'prob2-3',
    level: 2,
    prompt: 'Peti egy pénzérmét ötször egymás után feldobott, és mind az ötször FEJ lett az eredmény. Mekkora az esélye annak, hogy a hatodik dobásnál is FEJET dob?',
    options: [
      'Továbbra is pontosan 50% (az érmének nincs emlékezete).',
      'Már majdnem 100%, mert jó szériában van.',
      'Szinte 0%, mert most már írásnak kell jönnie.',
      'Pontosan 1/6.'
    ],
    correctAnswer: 0,
    explanation: 'A dobások teljesen függetlenek egymástól! A pénzérmének nincsen emlékezete, a 6. dobás kimenetelét semmilyen módon nem befolyásolják a korábbi dobások. Az esély marad 50% (1/2).',
    hint: 'Tudja az érme a levegőben repülve, hogy korábban mi volt?'
  },
  {
    id: 'prob2-4',
    level: 2,
    prompt: 'Egy 5. osztályban pontosan 12 fiú és 12 lány tanul. A tanárnő véletlenszerűen kihúz egy nevet feleléshez. Milyen az esélye annak, hogy fiút húz?',
    options: [
      'Egyenlő esélyű azzal, hogy lányt húz (50% - 50%).',
      'Biztos, hogy fiút húz.',
      'Valószínűbb, hogy lányt húz.',
      'Lehetetlen, hogy fiút húzzon.'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a fiúk és a lányok száma pontosan megegyezik (12-12 fő az összesen 24-ből), a két esemény egyformán valószínű (12/24 = 1/2 = 50%).',
    hint: 'Egyenlő a két csoport létszáma?'
  },
  {
    id: 'prob2-5',
    level: 2,
    prompt: 'Szabályos dobókockával 4-nél nagyobb számot szeretnénk dobni. Hány kedvező kimenetel van a 6-ból?',
    options: [
      '2 kedvező eset (az 5 és a 6)',
      '3 kedvező eset (a 4, 5 és 6)',
      '1 kedvező eset',
      '4 kedvező eset'
    ],
    correctAnswer: 0,
    explanation: 'A 4-nél szigorúan nagyobb számok a kockán az 5 és a 6. Ez pontosan 2 kedvező eset a 6-ból (2/6 = 1/3 esély).',
    hint: 'A 4-es NEM nagyobb 4-nél! Csak az 5 és 6.'
  },
  {
    id: 'prob2-6',
    level: 2,
    prompt: 'Szabályos dobókockával „legfeljebb 3-at” dobunk. Mely számok felelnek meg ennek a feltételnek?',
    options: [
      'Az 1, 2 és 3 (összesen 3 eset)',
      'Csak az 1 és 2',
      'A 3, 4, 5 és 6',
      'Csak a 3'
    ],
    correctAnswer: 0,
    explanation: 'A „legfeljebb 3” azt jelenti, hogy legfeljebb 3 lehet, vagyis 3 vagy annál kisebb. A megfelelő számok: 1, 2, 3 (összesen 3 eset a 6-ból).',
    hint: 'A legfeljebb 3 azt jelenti: maximum 3!'
  },
  {
    id: 'prob2-7',
    level: 2,
    prompt: 'Egy dobozban 5 piros, 5 kék és 5 zöld golyó van. Egyet húzunk. Hogyan viszonyul a piros húzásának esélye a zöld húzásának esélyéhez?',
    options: [
      'Egyenlő esélyű (egyformán valószínű)',
      'A piros húzása valószínűbb',
      'A zöld húzása valószínűbb',
      'Egyik sem lehetséges'
    ],
    correctAnswer: 0,
    explanation: 'Mivel mindkét színből pontosan ugyanannyi (5-5 darab) van a dobozban a 15-ből, a piros és a zöld kihúzásának esélye egyenlő (5/15 = 1/3 mindkettőnél).',
    hint: 'A két színből azonos számú golyó van bent?'
  },
  {
    id: 'prob2-8',
    level: 2,
    prompt: 'A farsangi tombolán összesen 100 szelvényt adtak el. Annának 10 szelvénye van, Balázsnak 2 szelvénye. Kinek van nagyobb esélye megnyerni a fődíjat?',
    options: [
      'Annának, mert 10 szelvénnyel ötször akkora az esélye, mint Balázsnak 2-vel.',
      'Balázsnak, mert a kevesebb szelvény nagyobb szerencsét hoz.',
      'Teljesen egyenlő az esélyük.',
      'Egyiküknek sincs esélye.'
    ],
    correctAnswer: 0,
    explanation: 'Anna esélye 10 a 100-hoz (10%), Balázs esélye 2 a 100-hoz (2%). Mivel 10 > 2, Annának jelentősen nagyobb az esélye.',
    hint: 'Több szelvénnyel több esélyed van a nyerésre!'
  },
  {
    id: 'prob2-9',
    level: 2,
    prompt: 'Egy dobozban 99 fehér golyó és mindössze 1 fekete golyó van. Milyen esemény az, hogy elsőre a fekete golyót húzzuk ki?',
    options: [
      'Lehetséges, de rendkívül valószínűtlen (nagyon kis esélyű).',
      'Lehetetlen esemény.',
      'Biztos esemény.',
      '50%-os esélyű esemény.'
    ],
    correctAnswer: 0,
    explanation: 'Mivel van fekete golyó a dobozban, NEM lehetetlen kihúzni! Azonban csupán 1 a 100-hoz (1%) az esélye, így nagyon valószínűtlen, de lehetséges.',
    hint: 'Ne keverd össze a nagyon ritka eseményt a lehetetlennel!'
  },
  {
    id: 'prob2-10',
    level: 2,
    prompt: 'Melyik matematikai állítás igaz a biztos és lehetetlen események valószínűségére?',
    options: [
      'A lehetetlen esemény esélye 0%, a biztos esemény esélye 100%.',
      'A lehetetlen esemény esélye 50%, a biztos esemény esélye 100%.',
      'Mindkettő esélye 0%.',
      'A biztos esemény esélye végtelen.'
    ],
    correctAnswer: 0,
    explanation: 'A valószínűségi skála 0-tól 1-ig (0%-tól 100%-ig) terjed: 0% a lehetetlen esemény, 100% a biztos esemény.',
    hint: 'A két végpont: a soha be nem következő és a mindig bekövetkező.'
  },

  // =========================================================================
  // 3. SZINT: ÖSSZETETT KÍSÉRLETEK, SKATULYA-ELV ÉS LOGIKA (21-30)
  // =========================================================================
  {
    id: 'prob3-1',
    level: 3,
    prompt: 'Két szabályos dobókockával dobunk egyszerre, és összeadjuk a pöttyök számát. Melyik a legkisebb és a legnagyobb lehetséges összeg?',
    options: [
      'Legkisebb: 2 (1 + 1), legnagyobb: 12 (6 + 6)',
      'Legkisebb: 1, legnagyobb: 12',
      'Legkisebb: 2, legnagyobb: 36',
      'Legkisebb: 0, legnagyobb: 12'
    ],
    correctAnswer: 0,
    explanation: 'A legkisebb dobás mindkét kockán az 1, így a minimális összeg 1 + 1 = 2. A legnagyobb dobás mindkét kockán a 6, így a maximális összeg 6 + 6 = 12.',
    hint: 'Mi a legkisebb szám a kockán? És a legnagyobb?'
  },
  {
    id: 'prob3-2',
    level: 3,
    prompt: 'Két szabályos dobókockával dobva az összeget vizsgáljuk. Melyik összeg dobása LEHETETLEN?',
    options: [
      '13',
      '2',
      '7',
      '12'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a maximálisan dobható szám 6 + 6 = 12, a 13-as összeg elérése két kockával lehetetlen esemény.',
    hint: 'Tudsz két kockával úgy dobni, hogy az összegük 13 legyen?'
  },
  {
    id: 'prob3-3',
    level: 3,
    prompt: 'Egy dobozban 6 piros és 4 kék golyó van. Kihúzunk egy piros golyót, és NEM tesszük vissza. Hogyan változik a piros golyó húzásának esélye a második húzásnál?',
    options: [
      'Csökken (mert már csak 5 piros maradt a 9 golyóból).',
      'Növekszik.',
      'Pontosan változatlan marad.',
      'Azonnal 0 lesz.'
    ],
    correctAnswer: 0,
    explanation: 'Kezdetben a piros esélye 6/10 (60%) volt. Miután kihúztunk egy pirosat, bent maradt 5 piros és 4 kék (összesen 9 golyó). Az új esély 5/9 (kb. 55,6%), tehát csökkent.',
    hint: 'Kevesebb piros golyó maradt a dobozban, mint előtte!'
  },
  {
    id: 'prob3-4',
    level: 3,
    prompt: 'Szabályos dobókockával dobunk. Hány kedvező esete van annak az eseménynek, hogy a dobott szám „prímszám VAGY páros szám”?',
    options: [
      '5 eset {2, 3, 4, 5, 6}',
      '6 eset',
      '4 eset',
      '3 eset'
    ],
    correctAnswer: 0,
    explanation: 'Prímszámok: {2, 3, 5}. Páros számok: {2, 4, 6}. A két halmaz uniója: {2, 3, 4, 5, 6}. Egyedül az 1 nem tartozik ide! Tehát 5 kedvező eset van a 6-ból.',
    hint: 'Melyik szám az egyetlen a kockán, ami se nem prím, se nem páros?'
  },
  {
    id: 'prob3-5',
    level: 3,
    prompt: 'Mi a neve annak a híres tévhitnek, miszerint ha egy ruletten vagy érmedobásnál sokszor egymás után ugyanaz az eredmény jött ki, akkor a következőnél „már törvényszerűen a másiknak kell jönnie”?',
    options: [
      'A szerencsejátékos tévedése (Gambler\'s Fallacy)',
      'Pitagorasz-tétel',
      'A relatív gyakoriság elve',
      'Archimédesz törvénye'
    ],
    correctAnswer: 0,
    explanation: 'Ez a szerencsejátékosok klasszikus tévedése. A független véletlen kísérleteknél minden eseménynek önálló esélye van, a golyónak és az érmének nincs memóriája.',
    hint: 'A kaszinók játékosairól elnevezett csapda.'
  },
  {
    id: 'prob3-6',
    level: 3,
    prompt: 'Három szabályos pénzérmét dobunk fel egyszerre. Hány különböző kimenetele lehet a kísérletnek összesen?',
    options: [
      '8 kimenetel (2 × 2 × 2 = 8)',
      '6 kimenetel',
      '3 kimenetel',
      '9 kimenetel'
    ],
    correctAnswer: 0,
    explanation: 'Mindegyik érme 2-féleképpen eshet le. A szorzási szabály szerint: 2 × 2 × 2 = 8 lehetséges kimenetel van (FFF, FFÍ, FÍF, FÍÍ, ÍFF, ÍFÍ, ÍÍF, ÍÍÍ).',
    hint: 'Első érme: 2 lehetőség, második: 2, harmadik: 2. Hány kombináció?'
  },
  {
    id: 'prob3-7',
    level: 3,
    prompt: 'Ha egy szabályos pénzérmét 10 000-szer feldobunk, körülbelül hány Fej dobásra számíthatunk a nagy számok törvénye alapján?',
    options: [
      'Körülbelül 5000 Fejre (50% körül)',
      'Pontosan 10 000 Fejre',
      'Körülbelül 1000 Fejre',
      'Nem lehet még megbecsülni sem'
    ],
    correctAnswer: 0,
    explanation: 'A nagy számok törvénye szerint nagyszámú kísérlet esetén a relatív gyakoriság szorosan az elméleti valószínűség (50%) körül ingadozik, vagyis kb. 5000 fej és 5000 írás várható.',
    hint: 'Mennyi a 10 000 fele?'
  },
  {
    id: 'prob3-8',
    level: 3,
    prompt: 'Egy dobozban 4 piros és ismeretlen számú kék golyó van. Tudjuk, hogy egy golyót húzva a piros kihúzásának esélye pontosan 50% (fele-fele). Hány kék golyó van a dobozban?',
    options: [
      'Pontosan 4 kék golyó (ugyanannyi, mint piros)',
      '2 kék golyó',
      '8 kék golyó',
      '6 kék golyó'
    ],
    correctAnswer: 0,
    explanation: 'Ahhoz, hogy a piros kihúzásának esélye 50% (az összes golyó fele) legyen, a golyók felének pirosnak, a másik felének kéknek kell lennie. Mivel 4 piros van, pontosan 4 kéknek kell lennie.',
    hint: 'Ha a piros adja a golyók felét, mi adja a másik felét?'
  },
  {
    id: 'prob3-9',
    level: 3,
    prompt: 'Egy szabályos hatoldalú kockával dobva mennyi az esélye annak, hogy a dobott szám osztható 3-mal?',
    options: [
      '2 a 6-hoz (a 3 és a 6, azaz 1/3 esély)',
      '3 a 6-hoz (50%)',
      '1 a 6-hoz',
      '4 a 6-hoz'
    ],
    correctAnswer: 0,
    explanation: 'Az 1, 2, 3, 4, 5, 6 számok közül a 3 és a 6 osztható 3-mal. Ez 2 kedvező eset a 6-ból, ami 2/6 = 1/3 (kb. 33,3%) esélyt jelent.',
    hint: 'Melyik számok szerepelnek a 3-as szorzótáblában 1 és 6 között?'
  },
  {
    id: 'prob3-10',
    level: 3,
    prompt: 'Egy sötét fiókban 3 piros és 2 zöld zokni van összekeverve. Legkevesebb hány zoknit kell kivennünk anélkül, hogy látnánk őket, hogy BIZTOSAN legyen köztük legalább egy PIROS zokni?',
    options: [
      '3 zoknit (mert a legrosszabb esetben először mind a 2 zöldet húzzuk ki, a 3. már biztosan piros)',
      '1 zoknit',
      '2 zoknit',
      '5 zoknit'
    ],
    correctAnswer: 0,
    explanation: 'Ez a skatulya-elv: mindig a legpechesebb esetet kell vizsgálni. Ha 2 zoknit húzunk, előfordulhat, hogy mindkettő zöld. A harmadik zokni viszont már csak piros lehet, mivel elfogytak a zöldek! Tehát 3 zokni garantálja a pirosat.',
    hint: 'Képzeld el a legrosszabb esetet: mindkét zöldet kihúzod egymás után. Mit húzol harmadjára?'
  }
];

export const ProbabilityQuiz: React.FC<ProbabilityQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Lehetetlen, lehetséges, biztos Kvíz"
      subtitle="30 feladat 3 szinten: események minősítése, esélyek összehasonlítása, kocka- és érmekísérletek, skatulya-elv"
      color="rose"
      questions={PROBABILITY_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      MatcherComponent={({ onBack: mBack, level, onNextLevel }) => (
        <ProbabilityMatcher
          onBack={mBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      SorterComponent={({ onBack: sBack, level, onNextLevel }) => (
        <ProbabilitySorter
          onBack={sBack}
          level={level}
          onNextLevel={onNextLevel}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheetCards={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-rose-700 dark:text-rose-400">1. Szint Puskája: Alapfogalmak és Kocka</div>
            <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
              <div>• <strong>Biztos esemény:</strong> 100%-ban bekövetkezik (pl. kockával 7-nél kisebbet dobni).</div>
              <div>• <strong>Lehetetlen esemény:</strong> 0% esély, sosem történhet meg (pl. kockával 0-t dobni).</div>
              <div>• <strong>Lehetséges esemény:</strong> Bekövetkezhet, de nem garantált (pl. kockával 6-ost dobni).</div>
              <div>• <strong>Kocka prímszámai:</strong> 2, 3, 5 (3 darab). Az 1-es NEM prím!</div>
              <div>• <strong>Kocka páros számai:</strong> 2, 4, 6 (3 darab, 50% esély).</div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-rose-700 dark:text-rose-400">2. Szint Puskája: Esélyek és Arányok</div>
            <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
              <div>• <strong>Esély kiszámítása:</strong> Kedvező esetek száma / Összes eset száma.</div>
              <div>• <strong>Valószínűbb kimenetel:</strong> Amelyikből több van a mintában (pl. 7 piros vs. 3 zöld).</div>
              <div>• <strong>Egyenlő esély (50-50%):</strong> Ha a kedvező esetek az összes eset felét adják.</div>
              <div>• <strong>Nincs emlékezet:</strong> 5 fej után a 6. dobásnál a fej esélye továbbra is 50%!</div>
              <div>• <strong>Legfeljebb 3:</strong> 1, 2, 3 (a 3 még beletartozik).</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-rose-700 dark:text-rose-400">3. Szint Puskája: Összetett Események és Skatulya-elv</div>
            <div className="p-2 rounded bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-1">
              <div>• <strong>Két kocka összege:</strong> Min = 2 (1+1), Max = 12 (6+6). A 13 lehetetlen!</div>
              <div>• <strong>Visszatevés nélkül:</strong> A kihúzott elem nem kerül vissza, az arányok és a létszám megváltoznak.</div>
              <div>• <strong>Skatulya-elv:</strong> Mindig a legrosszabb esetet számold ki a biztos sikerhez!</div>
              <div>• <strong>3 érme kimenetelei:</strong> 2 × 2 × 2 = 8 különböző kimenetel.</div>
              <div>• <strong>Nagy számok törvénye:</strong> Sok dobásnál a relatív gyakoriság közelít az 50%-hoz.</div>
            </div>
          </div>
        )
      }}
    />
  );
};
