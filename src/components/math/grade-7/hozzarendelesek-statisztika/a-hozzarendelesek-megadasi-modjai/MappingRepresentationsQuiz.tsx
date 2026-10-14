import React from 'react';
import { QuizTemplate, Question, CheatSheetContent } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Puzzle, ArrowUpDown } from 'lucide-react';
import { MappingRepresentationsMatcher } from './MappingRepresentationsMatcher';
import { MappingRepresentationsSorter } from './MappingRepresentationsSorter';

interface MappingRepresentationsQuizProps {
  onBack: () => void;
  onOpenMatcher?: () => void;
  onOpenSorter?: () => void;
  onSwitchToTheory?: () => void;
}

const mappingQuestions: Question[] = [
  // ==========================================
  // --- 1. SZINT: KÖNNYŰ (1-10. feladatok) ---
  // ==========================================
  {
    id: 'mr-q1',
    level: 1,
    question: 'Az alábbiak közül melyik NEM tartozik a hozzárendelések alapvető megadási módjai közé?',
    options: ['Körzővel való körszerkesztés', 'Szöveges utasítás', 'Értéktáblázat', 'Rendezett számpárok'],
    correctAnswer: 0,
    explanation: 'A hozzárendelések 5 alapvető megadási módja: 1. Szöveges utasítás, 2. Képlet, 3. Értéktáblázat, 4. Rendezett számpárok, 5. Grafikon a koordináta-rendszerben.'
  },
  {
    id: 'mr-q2',
    level: 1,
    question: 'A hozzárendelés szabálya f(x) = 2x + 5. Mennyi a helyettesítési érték, ha x = 3?',
    options: ['11', '10', '13', '16'],
    correctAnswer: 0,
    explanation: 'Az x helyére 3-at helyettesítve: f(3) = 2 · 3 + 5 = 6 + 5 = 11.'
  },
  {
    id: 'mr-q3',
    level: 1,
    question: 'Melyik képlet felel meg a következő szöveges utasításnak: „Minden számhoz rendeljük hozzá a négyszeresénél 1-gyel kisebb számot!”?',
    options: ['f(x) = 4x - 1', 'f(x) = x/4 - 1', 'f(x) = 4(x - 1)', 'f(x) = 4x + 1'],
    correctAnswer: 0,
    explanation: 'A szám négyszerese a 4x, ennél 1-gyel kisebb a 4x - 1, így a helyes szabály f(x) = 4x - 1.'
  },
  {
    id: 'mr-q4',
    level: 1,
    question: 'A koordinátasíkon felmért P(4; 9) pont esetén melyik az x és melyik az y koordináta?',
    options: ['x = 4 (vízszintes) és y = 9 (függőleges)', 'x = 9 és y = 4', 'Mindkettő x koordináta', 'Csak az összegük számít (13)'],
    correctAnswer: 0,
    explanation: 'A pont koordinátáinak sorrendje kötött: az első mindig a vízszintes x koordináta (jobbra-balra), a második a függőleges y koordináta (fel-le). Tehát x = 4 és y = 9.'
  },
  {
    id: 'mr-q5',
    level: 1,
    question: 'Egy értéktáblázat oszlopában az x sorban -2, az alatta lévő y sorban 7 szerepel. Milyen rendezett számpár tartozik ehhez?',
    options: ['(-2; 7)', '(7; -2)', '(-2; -7)', '(2; 7)'],
    correctAnswer: 0,
    explanation: 'A táblázat oszlopából a rendezett számpár felírása: (x; y) = (-2; 7).'
  },
  {
    id: 'mr-q6',
    level: 1,
    question: 'A hozzárendelés szabálya f(x) = 10 - x. Mennyi az értéke x = 4 esetén?',
    options: ['6', '14', '-6', '40'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: f(4) = 10 - 4 = 6.'
  },
  {
    id: 'mr-q7',
    level: 1,
    question: 'A derékszögű koordináta-rendszerben melyik tengelyen ábrázoljuk a FÜGGETLEN változót (x értékeket)?',
    options: ['A vízszintes tengelyen (abszcissza)', 'A függőleges tengelyen (ordináta)', 'A körvonalon', 'A harmadik térbeli tengelyen'],
    correctAnswer: 0,
    explanation: 'A független változót (x) mindig a vízszintes tengelyen (első tengely), míg a függő változót (y) a függőleges tengelyen mérjük fel.'
  },
  {
    id: 'mr-q8',
    level: 1,
    question: 'Hogyan nevezzük az y = f(x) összefüggésben az y változót?',
    options: ['Függő változó (vagy függvényérték)', 'Független változó', 'Állandó konstans', 'Alaphalmaz'],
    correctAnswer: 0,
    explanation: 'Az y a függő változó, mivel az értéke az x megválasztásától és a szabálytól függ.'
  },
  {
    id: 'mr-q9',
    level: 1,
    question: 'A hozzárendelés képlete f(x) = x / 2. Mennyi az f(12) értéke?',
    options: ['6', '24', '10', '14'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve: f(12) = 12 / 2 = 6.'
  },
  {
    id: 'mr-q10',
    level: 1,
    question: 'A szabály f(x) = x + 8. Ha x = -3, mennyi az értéktáblázatba beírandó y érték?',
    options: ['5', '-11', '11', '-5'],
    correctAnswer: 0,
    explanation: 'Az előjeles összeadás szabálya szerint: f(-3) = -3 + 8 = 5.'
  },

  // ===========================================
  // --- 2. SZINT: KÖZEPES (11-20. feladatok) ---
  // ===========================================
  {
    id: 'mr-q11',
    level: 2,
    question: 'Egy táblázatban az alábbi összetartozó értékek szerepelnek:\nx: 1 | 2 | 3 | 4\ny: 3 | 5 | 7 | 9\nMelyik képlet írja le a hozzárendelést?',
    options: ['y = 2x + 1', 'y = 3x', 'y = x + 2', 'y = 4x - 1'],
    correctAnswer: 0,
    explanation: 'A kimenetek 2-vel növekednek (3, 5, 7, 9), tehát 2x-szel indul a szabály. x = 1 esetén: 2 · 1 + 1 = 3; x = 2 esetén: 2 · 2 + 1 = 5. A helyes képlet: y = 2x + 1.'
  },
  {
    id: 'mr-q12',
    level: 2,
    question: 'Rajta van-e a P(3; 8) pont az y = 2x + 2 egyenesen a koordináta-rendszerben?',
    options: [
      'Igen, mert 2 · 3 + 2 = 8, így a koordináták kielégítik a képletet',
      'Nem, mert 2 · 3 + 2 = 7',
      'Nem, mert a pont koordinátái fordított sorrendűek',
      'Csak akkor, ha az x negatív'
    ],
    correctAnswer: 0,
    explanation: 'Behelyettesítjük az x = 3 értéket: y = 2 · 3 + 2 = 6 + 2 = 8. Mivel a számított y megegyezik a pont y koordinátájával (8), a pont rajta van az egyenesen!'
  },
  {
    id: 'mr-q13',
    level: 2,
    question: 'Melyik pont van rajta az y = 4 - x szabály grafikonján?',
    options: ['P(1; 3)', 'Q(2; 5)', 'R(0; 0)', 'S(3; 2)'],
    correctAnswer: 0,
    explanation: 'Ellenőrizzük: ha x = 1, akkor y = 4 - 1 = 3, tehát a P(1; 3) pont illeszkedik a grafikonra.'
  },
  {
    id: 'mr-q14',
    level: 2,
    question: 'A hozzárendelés képlete f(x) = 3x + 1. Ha a kapott kép y = 16, melyik x értékből indultunk ki?',
    options: ['x = 5', 'x = 4', 'x = 6', 'x = 3'],
    correctAnswer: 0,
    explanation: 'Megoldjuk az egyenletet visszafelé: 3x + 1 = 16 ➔ 3x = 15 ➔ x = 5.'
  },
  {
    id: 'mr-q15',
    level: 2,
    question: 'Hol metszi az y = 2x - 6 egyenes a függőleges (y) tengelyt a derékszögű koordináta-rendszerben?',
    options: ['A (0; -6) pontban', 'A (3; 0) pontban', 'A (0; 6) pontban', 'A (-6; 0) pontban'],
    correctAnswer: 0,
    explanation: 'Az y tengelyen minden pont x koordinátája 0. Behelyettesítve x = 0-t: y = 2 · 0 - 6 = -6. Tehát a tengelymetszet pontja (0; -6).'
  },
  {
    id: 'mr-q16',
    level: 2,
    question: 'Hol metszi az y = 3x - 9 egyenes a vízszintes (x) tengelyt (hol van a zérushelye)?',
    options: ['A (3; 0) pontban', 'A (0; -9) pontban', 'A (-3; 0) pontban', 'A (9; 0) pontban'],
    correctAnswer: 0,
    explanation: 'Az x tengelyen y = 0. Megoldjuk: 3x - 9 = 0 ➔ 3x = 9 ➔ x = 3. A metszéspont tehát (3; 0).'
  },
  {
    id: 'mr-q17',
    level: 2,
    question: 'Ha a hozzárendelés alaphalmaza a természetes számok (N = {0, 1, 2, 3...}), hogyan kell ábrázolni a grafikonját?',
    options: [
      'Különálló pontok halmazaként, mert a számok között nincsenek értékek',
      'Folytonos egyenes vonallal összekötve',
      'Körökként a síkban',
      'Csak az origót szabad bejelölni'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a természetes számok diszkrét halmazt alkotnak (nincsenek köztük törtszámok), a pontokat tilos összekötni! A grafikon ilyenkor különálló, elszigetelt pontokból áll.'
  },
  {
    id: 'mr-q18',
    level: 2,
    question: 'A hozzárendelés szabálya f(x) = 5 - 2x. Mennyi a helyettesítési érték x = -3 esetén?',
    options: ['11', '-1', '-11', '1'],
    correctAnswer: 0,
    explanation: 'Ügyeljünk a negatív szorzásra: f(-3) = 5 - 2 · (-3) = 5 - (-6) = 5 + 6 = 11.'
  },
  {
    id: 'mr-q19',
    level: 2,
    question: 'A hozzárendelés szabálya f(x) = x² - 4. Melyik pont illeszkedik a grafikonjára?',
    options: ['P(-3; 5)', 'Q(2; 4)', 'R(0; 4)', 'S(1; -2)'],
    correctAnswer: 0,
    explanation: 'x = -3 esetén: f(-3) = (-3)² - 4 = 9 - 4 = 5. Tehát a P(-3; 5) pont pontosan illeszkedik a grafikonra.'
  },
  {
    id: 'mr-q20',
    level: 2,
    question: 'Mi a neve annak a táblázatnak, amelyben az x bemeneti értékekhez kiszámoljuk a megfelelő y képértékeket?',
    options: ['Értéktáblázat', 'Szorzótábla', 'Gyakorisági táblázat', 'Logaritmus-táblázat'],
    correctAnswer: 0,
    explanation: 'A függvények bemeneti és kimeneti értékeinek párba állítására szolgáló táblázat az értéktáblázat.'
  },

  // ==========================================
  // --- 3. SZINT: NEHÉZ (21-30. feladatok) ---
  // ==========================================
  {
    id: 'mr-q21',
    level: 3,
    question: 'Az alábbi egyenesek közül melyik PÁRHUZAMOS az y = 3x + 2 egyenessel?',
    options: ['y = 3x - 7', 'y = -3x + 2', 'y = 2x + 3', 'y = x/3 + 2'],
    correctAnswer: 0,
    explanation: 'Két egyenes akkor és csak akkor párhuzamos egymással, ha az x együtthatója (a meredekségük, m) megegyezik. Mivel az y = 3x + 2 meredeksége 3, az y = 3x - 7 egyenes párhuzamos vele.'
  },
  {
    id: 'mr-q22',
    level: 3,
    question: 'Mit mondhatunk egy olyan lineáris függvényről, amelynek képlete y = -2x + 4?',
    options: [
      'Szigorúan monoton csökkenő, mert a meredeksége negatív (-2)',
      'Szigorúan monoton növekvő, mert a +4 pozitív',
      'Állandó vízszintes egyenes',
      'Átmegy az origón (0; 0)'
    ],
    correctAnswer: 0,
    explanation: 'Ha az x együtthatója negatív (itt m = -2), a függvény értéke csökken, ahogy az x növekszik. Tehát a függvény szigorúan monoton csökkenő.'
  },
  {
    id: 'mr-q23',
    level: 3,
    question: 'Hol található az y = x + 2 és az y = -x + 4 egyenesek közös metszéspontja?',
    options: ['M(1; 3)', 'M(2; 4)', 'M(0; 2)', 'M(3; 1)'],
    correctAnswer: 0,
    explanation: 'Egyenlővé tesszük a két képletet: x + 2 = -x + 4 ➔ 2x = 2 ➔ x = 1. Ekkor y = 1 + 2 = 3. A metszéspont koordinátái: M(1; 3).'
  },
  {
    id: 'mr-q24',
    level: 3,
    question: 'Egy lineáris függvény egyenese áthalad a (0; 3) és a (2; 7) pontokon. Melyik képlet tartozik hozzá?',
    options: ['y = 2x + 3', 'y = 3x + 2', 'y = 4x + 3', 'y = x + 3'],
    correctAnswer: 0,
    explanation: 'A (0; 3) pont miatt a konstans tag b = 3. A meredekség: m = (7 - 3) / (2 - 0) = 4 / 2 = 2. A képlet tehát y = 2x + 3.'
  },
  {
    id: 'mr-q25',
    level: 3,
    question: 'Adott a szabály: f(x) = 4 - 3x. Melyik rendezett számpár HIBÁS az alábbiak közül?',
    options: ['(-2; 2)', '(0; 4)', '(1; 1)', '(2; -2)'],
    correctAnswer: 0,
    explanation: 'Ellenőrizzük x = -2-re: f(-2) = 4 - 3 · (-2) = 4 - (-6) = 4 + 6 = 10, NEM 2! Tehát a (-2; 2) számpár hibás.'
  },
  {
    id: 'mr-q26',
    level: 3,
    question: 'A függvény szabálya f(x) = 2x, értelmezési tartománya a zárt D = [-1; 3] valós intervallum. Mi az értékkészlet?',
    options: ['R = [-2; 6]', 'R = [-1; 3]', 'R = [0; 6]', 'R = [-2; 3]'],
    correctAnswer: 0,
    explanation: 'A végpontok képei: f(-1) = 2 · (-1) = -2, és f(3) = 2 · 3 = 6. Mivel a függvény szigorúan növekvő és folytonos, az értékkészlet a [-2; 6] zárt intervallum.'
  },
  {
    id: 'mr-q27',
    level: 3,
    question: 'Milyen alakú az y = 5 konstans függvény grafikonja a koordináta-rendszerben?',
    options: [
      'Az x tengellyel párhuzamos vízszintes egyenes az y = 5 magasságban',
      'Az y tengellyel párhuzamos függőleges egyenes az x = 5-nél',
      'Az origón átmenő 45°-os egyenes',
      'Egyetlen magányos pont az (5; 5) helyen'
    ],
    correctAnswer: 0,
    explanation: 'Minden x értékhez y = 5 tartozik, így a pontok mind 5 magasságban helyezkednek el: egy vízszintes egyenest alkotnak.'
  },
  {
    id: 'mr-q28',
    level: 3,
    question: 'Egy telefontársaság alapdíja havonta 2000 Ft, és minden megkezdett beszélgetési perc 30 Ft-ba kerül. Melyik képlet adja meg az x perc után fizetendő y összeget?',
    options: ['y = 30x + 2000', 'y = 2000x + 30', 'y = 30(x + 2000)', 'y = x / 30 + 2000'],
    correctAnswer: 0,
    explanation: 'Az alapdíj a rögzített kezdőérték (2000 Ft), míg a percenkénti díj a változó tag (30 · x). A teljes összeg: y = 30x + 2000.'
  },
  {
    id: 'mr-q29',
    level: 3,
    question: 'Miért NEM tekinthető egy függőleges egyenes (pl. x = 3) függvény grafikonjának?',
    options: [
      'Mert egyetlen x bemenethez (x = 3) végtelen sok különböző y érték tartozna, ami sérti az egyértelműséget',
      'Mert a függőleges vonalat nehéz megrajzolni',
      'Mert a 3 prímszám',
      'Csak akkor függvény, ha átmegy a (3; 0) ponton'
    ],
    correctAnswer: 0,
    explanation: 'A függvény aranyszabálya szerint egy bemenethez pontosan egy kimenet tartozhat. A függőleges egyenesen az x = 3-hoz végtelen sok y tartozik (nem teljesíti a függőleges vonal tesztet), így nem függvény.'
  },
  {
    id: 'mr-q30',
    level: 3,
    question: 'A hozzárendelés értéktáblázata:\nx: -2 | 0 | 2\ny:  7 | 3 | -1\nMennyi az y értéke x = 5 esetén, ha a szabály lineáris?',
    options: ['-7', '-5', '-9', '-3'],
    correctAnswer: 0,
    explanation: 'A lépésköz: x 2-vel növekszik, miközben y 4-gyel csökken, így a meredekség m = -4 / 2 = -2. x = 0-nál y = 3, tehát a szabály: y = -2x + 3. x = 5-re: y = -2 · 5 + 3 = -10 + 3 = -7.'
  }
];

const mappingCheatSheets: CheatSheetContent[] = [
  {
    title: '1. Az 5 Alapvető Megadási Mód',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-3 bg-indigo-50 dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <strong className="text-indigo-700 dark:text-indigo-300 block mb-1">Reprezentációk:</strong>
          <div>• <strong>Szöveges utasítás:</strong> Szabály szavakkal (pl. „Minden szám kétszeresénél 1-gyel több”).</div>
          <div>• <strong>Képlet (formula):</strong> Algebrai alak: <code className="bg-indigo-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono font-bold">f(x) = 2x + 1</code>.</div>
          <div>• <strong>Értéktáblázat:</strong> Összetartozó x és y értékek táblázata.</div>
          <div>• <strong>Rendezett számpárok:</strong> Pontok halmaza: <code className="bg-indigo-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">&#123;(x₁; y₁), (x₂; y₂)&#125;</code>.</div>
          <div>• <strong>Grafikon:</strong> A pontok ábrázolása derékszögű koordináta-rendszerben.</div>
        </div>
      </div>
    )
  },
  {
    title: '2. Számítás és Grafikon Rajzolás',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-3 bg-blue-50 dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800">
          <strong className="text-blue-700 dark:text-blue-300 block mb-1">Koordináta leolvasás: P(x; y)</strong>
          <div>• <strong>x (első szám):</strong> Vízszintes tengely (jobbra: +, balra: -).</div>
          <div>• <strong>y (második szám):</strong> Függőleges tengely (fel: +, le: -).</div>
          <div>• <strong>Origó:</strong> (0; 0) - a tengelyek metszéspontja.</div>
        </div>
        <div className="p-3 bg-amber-50 dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800">
          <strong className="text-amber-700 dark:text-amber-300 block mb-1">Diszkrét vs Folytonos grafikon:</strong>
          <div>• Ha <code className="bg-amber-100 dark:bg-slate-800 px-1 rounded">x ∈ R</code> (valós számok) ➔ Folytonos egyenessel vagy görbével kötjük össze.</div>
          <div>• Ha <code className="bg-amber-100 dark:bg-slate-800 px-1 rounded">x ∈ Z</code> vagy darabszám ➔ Különálló, elszigetelt pontok maradnak!</div>
        </div>
      </div>
    )
  },
  {
    title: '3. Lineáris Függvények Tulajdonságai (y = ax + b)',
    content: (
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="p-3 bg-emerald-50 dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800">
          <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">Meredekség (a):</strong>
          <div>• Ha <code className="font-bold">a &gt; 0</code>: Növekvő függvény (balról jobbra emelkedik).</div>
          <div>• Ha <code className="font-bold">a &lt; 0</code>: Csökkenő függvény (balról jobbra lejt).</div>
          <div>• Ha <code className="font-bold">a = 0</code>: Vízszintes egyenes (y = b, konstans).</div>
          <div>• Párhuzamos egyenesek: Azonos meredekségűek (<code className="font-bold">a₁ = a₂</code>).</div>
        </div>
      </div>
    )
  }
];

export const MappingRepresentationsQuiz: React.FC<MappingRepresentationsQuizProps> = ({
  onBack,
  onOpenMatcher,
  onOpenSorter,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="2. A hozzárendelések megadási módjai Kvíz"
      subtitle="Gyakorold az 5 megadási mód közötti átváltást, értéktáblázatok készítését és a grafikonok olvasását!"
      topicId="g7-stats-rep"
      topicName="2. A hozzárendelések megadási módjai"
      badgeText="7. OSZTÁLY • HOZZÁRENDELÉSEK • 🎯 KVÍZ"
      themeColor="indigo"
      questions={mappingQuestions}
      cheatSheets={mappingCheatSheets}
      pdfFilename="7_osztaly_hozzarendelesek_megadasi_modjai_kviz.pdf"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<MappingRepresentationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<MappingRepresentationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      customHeaderActions={
        <div className="flex items-center gap-2">
          {onOpenMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMatcher}
              className="bg-white/80 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 text-xs shadow-sm"
            >
              <Puzzle className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              Párosító
            </Button>
          )}
          {onOpenSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenSorter}
              className="bg-white/80 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 text-xs shadow-sm"
            >
              <ArrowUpDown className="w-3.5 h-3.5 mr-1 text-indigo-500" />
              Csoportosító
            </Button>
          )}
        </div>
      }
    />
  );
};

export default MappingRepresentationsQuiz;
