import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { MathText, Fraction } from '@/components/math/shared/MathText';
import {
  Trophy,
  Layers,
  CheckCircle2,
  AlertTriangle,
  RotateCw,
  Compass,
  BookOpen,
  Hash,
  Circle as CircleIcon,
  Ruler,
  Triangle,
  Shapes,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeometrySummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const GeometrySummaryTheory: React.FC<GeometrySummaryTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Master Chapter Explorer State
  const [selectedTopicIdx, setSelectedTopicIdx] = useState<number>(0);

  const summaryTopics = [
    {
      id: 0,
      title: '1. Geometriai Alapfogalmak',
      icon: '📐',
      rules: [
        'A pontnak nincs kiterjedése (0D), az egyenes mindkét irányban végtelen (1D).',
        'A félegyenest egy kezdőpont határolja, a szakasz két végpont közötti zárt darab.',
        'A sík 2D, tér 3D. Két metsző vagy két párhuzamos egyenes pontosan egy síkot határoz meg.'
      ],
      example: 'Ha A és B két pont, akkor az AB szakasz hossza |AB|, a felezőpontja F, ahol |AF| = |FB|.'
    },
    {
      id: 1,
      title: '2. Háromszög Nevezetes Vonalai',
      icon: '🔺',
      rules: [
        'Oldalfelező merőlegesek metszéspontja: a köré írható kör középpontja (O).',
        'Belső szögfelezők metszéspontja: a beírható kör középpontja (I).',
        'Magasságvonalak metszéspontja: a magasságpont (M).',
        'Súlyvonalak metszéspontja: a súlypont (S), amely a csúcstól 2:1 arányban osztja a szakaszt.'
      ],
      example: 'Ha a súlyvonal hossza s = 9 cm, akkor a csúcs felőli rész 6 cm, az oldal felőli rész 3 cm.'
    },
    {
      id: 2,
      title: '3. Háromszögek és Négyszögek',
      icon: '🔷',
      rules: [
        'Háromszög belső szögeinek összege mindig 180°, külső szögeinek összege 360°.',
        'Négyszögek belső szögeinek összege mindig 360°, külső szögeinek összege 360°.',
        'Háromszög-egyenlőtlenség: bármely két oldal összege nagyobb a harmadiknál (a + b > c).'
      ],
      example: 'α = 50°, β = 70° esetén γ = 180° - (50° + 70°) = 60°.'
    },
    {
      id: 3,
      title: '4. Egybevágósági Transzformációk',
      icon: '🔄',
      rules: [
        'Egybevágóság: távolságtartó, szögtartó, egyenestartó és körüljárási vagy párhuzamosságtartó leképezés.',
        'Az alakzat és képe mindig egybevágó: területük és kerületük megegyezik.',
        'Fixpont: olyan pont, amelynek a képe önmaga (P\' = P).'
      ],
      example: 'Egy 25 cm² területű háromszög tükörképe szintén pontosan 25 cm² területű.'
    },
    {
      id: 4,
      title: '5. Tengelyes és Középpontos Tükrözés',
      icon: '🪞',
      rules: [
        'Tengelyes tükrözés: fixpontok = tengely (t) összes pontja (végtelen sok), körüljárási irány megfordul.',
        'Középpontos tükrözés: egyetlen fixpont = O centrum, körüljárási irány megmarad, egyenes és képe párhuzamos (e ∥ e\').'
      ],
      example: 'Középpontos tükrözésnél a síkbeli 180°-os elforgatás történik a centrum körül.'
    },
    {
      id: 5,
      title: '6. Szögpárok Rendszere',
      icon: '✂️',
      rules: [
        'Csúcsszögek: egyenlők (α = α\'). Mellékszögek: összegük 180° (α + β = 180°).',
        'Pótszögek: összegük 90°. Kiegészítő szögek: összegük 180°.',
        'Párhuzamos szárú szögek: váltószögek és egyállású szögek egyenlők, társszögek összege 180°.'
      ],
      example: 'Ha α = 42°, akkor pótszöge 48°, kiegészítő mellékszöge 138°, csúcsszöge 42°.'
    },
    {
      id: 6,
      title: '7. Négyszögek Szimmetriái',
      icon: '🔶',
      rules: [
        'Paralelogramma: csak középpontosan szimmetrikus (átlók metszéspontja O).',
        'Téglalap: 2 tengely (oldalfelezők) + centrum.',
        'Rombusz: 2 tengely (átlók) + centrum.',
        'Négyzet: 4 tengely (2 oldalfelező + 2 átló) + centrum.',
        'Deltoid: 1 tengely (főátló), centruma nincs.'
      ],
      example: 'A négyzet egyszerre téglalap, rombusz, paralelogramma és deltoid is!'
    },
    {
      id: 7,
      title: '8. Szabályos Sokszögek',
      icon: '⭐',
      rules: [
        'Belső szögek összege: (n - 2) · 180° bármely konvex n-szögben.',
        'Szabályos n-szög egy belső szöge: ((n - 2) · 180°) / n.',
        'Összes átlók száma: (n · (n - 3)) / 2.',
        'Szimmetria: n tengelye van; ha n páros, van centruma is, ha páratlan, nincs.'
      ],
      example: 'Szabályos hatszög (n = 6): szögösszeg = 720°, egy belső szög = 120°, átlók = 9 db, 6 tengely + centrum.'
    },
    {
      id: 8,
      title: '9. A Kör és a Thalész-tétel',
      icon: '⭕',
      rules: [
        'Átmérő: d = 2r (a leghosszabb húr). Végtelen sok szimmetriatengelye van és van centruma.',
        'Egyenes és kör: érintő (1 közös pont, merőleges az érintési sugárra), szelő (2 pont), kívül fekvő (0 pont).',
        'Thalész-tétel: az átmérő fölé rajzolt félkör bármely kerületi pontjából az átmérő derékszögben (90°) látszik.'
      ],
      example: 'A kör érintője mindig 90°-ot zár be az érintési pontba húzott sugárral.'
    },
    {
      id: 9,
      title: '10. Geometriai Szerkesztések',
      icon: '✏️',
      rules: [
        'Euklideszi eszközök: beosztás nélküli vonalzó és körző.',
        'Nevezetes szögek: 60° (szabályos 3-szög), 90° (merőleges), 30° (60°/2), 45° (90°/2), 75° (45°+30°), 120° (2×60°).',
        'Háromszögalapesetek: o-o-o, o-sz-o, sz-o-sz, o-o-sz (nagyobbikkal szemközti).'
      ],
      example: 'A 75°-os szög előállítható egy 45°-os és egy 30°-os szerkesztett szög összeadásával.'
    }
  ];

  return (
    <TheoryTemplate
      topicId="g7-geom-summary"
      topicTitle="14. Összefoglalás"
      badgeText="7. OSZTÁLY • GEOMETRIA • 🏆 ZÁRÓ ÖSSZEFOGLALÁS"
      title="III. Geometriai Transzformációk"
      subtitle="A teljes fejezet átfogó, rendszerező tudástára és záró felkészítője"
      description="Egybefüggő elméleti szintézis: az egybevágósági leképezésektől, szögpároktól és nevezetes vonalaktól kezdve a síkidomok szimmetriáin és a sokszögeken át egészen a körig és a szerkesztésekig."
      quickRule={{
        title: "Fejezeti Főtétel",
        description: "Az egybevágósági transzformációk (tengelyes és középpontos tükrözés) távolságtartók, szögtartók és alakzathűek: az eredeti alakzat és a képe minden méretében és tulajdonságában egybevágó!"
      }}
      themeColor="slate"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* FEJEZETI INTERAKTÍV FELFEDEZŐ DOKK */}
      <TheorySection
        number={1}
        title="Fejezeti Interaktív Tudástár (10 Kulcstéma)"
        badgeColor="slate"
        icon={<Trophy className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Kattints a témakörökre a legfontosabb alapszabályok, kulcsfogalmak és mintapéldák azonnali áttekintéséhez:
          </p>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {summaryTopics.map((topic, idx) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicIdx(idx)}
                className={cn(
                  "p-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2 cursor-pointer",
                  selectedTopicIdx === idx
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow-sm"
                    : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400"
                )}
              >
                <span className="text-base shrink-0">{topic.icon}</span>
                <span className="truncate">{topic.title.replace(/^\d+\.\s*/, '')}</span>
              </button>
            ))}
          </div>

          {/* Active Topic Card */}
          {(() => {
            const current = summaryTopics[selectedTopicIdx];
            return (
              <Card className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/60 dark:from-slate-900 dark:to-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2.5 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-2xl">{current.icon}</span>
                  <div>
                    <h4 className="font-black text-base text-slate-900 dark:text-white">
                      {current.title}
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500">Alapvető tételek és szabályok</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 space-y-2">
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {current.rules.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-4 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 block">
                      💡 Tipikus Példa / Alkalmazás:
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                      {current.example}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })()}
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: TRANSZFORMÁCIÓK ÉS SZIMMETRIÁK NAGY MÁTRIXA */}
      <TheorySection
        number={2}
        title="Egybevágósági Transzformációk Nagy Mátrixa"
        badgeColor="slate"
        icon={<RotateCw className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          A fejezet két legfontosabb síkbeli transzformációjának alapvető, vizsgákon gyakran kérdezett összehasonlítása:
        </p>

        <TheoryTable
          headers={['Tulajdonság', 'Tengelyes Tükrözés', 'Középpontos Tükrözés']}
          rows={[
            ['Megadandó alapadat', 't tükörtengely (egyenes)', 'O centrum (tükörközéppont)'],
            ['Fixpontok száma', 'Végtelen sok (a tengely összes pontja)', 'Pontosan 1 db (maga az O centrum)'],
            ['Fixegyenesek', 'A tengely (t) és a tengelyre merőleges egyenesek', 'Minden egyenes, amely átmegy az O ponton'],
            ['Körüljárási irány', 'Megfordul (orientációváltó: ↺ ➔ ↻)', 'Megmarad (orientációtartó: ↺ ➔ ↺)'],
            ['Egyenes és képe', 'Metszőek a tengelyen, vagy párhuzamosak ha e ∥ t', 'Mindig párhuzamosak egymással: e ∥ e\''],
            ['Fizikai analógia', 'Síkból 3D térbe történő átfordítás / áthajtás', 'Síkbeli 180°-os elforgatás az O centrum körül'],
            ['Távolságtartás / Szögtartás', 'Igen (|A\'B\'| = |AB|, α\' = α)', 'Igen (|A\'B\'| = |AB|, α\' = α)']
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Axial Symmetry Visual */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">Tengelyes tükrözés (megfordul az irány)</span>
            <svg viewBox="0 0 160 80" className="w-44 h-22">
              <line x1="80" y1="5" x2="80" y2="75" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
              <text x="83" y="14" className="text-[9px] font-bold fill-rose-600">t</text>
              <polygon points="30,25 60,15 50,55" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
              <polygon points="130,25 100,15 110,55" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
              <text x="44" y="38" className="text-[10px] font-bold fill-sky-800">↺</text>
              <text x="114" y="38" className="text-[10px] font-bold fill-amber-800">↻</text>
            </svg>
          </div>

          {/* Central Symmetry Visual */}
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">Középpontos tükrözés (megmarad az irány, e ∥ e\')</span>
            <svg viewBox="0 0 160 80" className="w-44 h-22">
              <circle cx="80" cy="40" r="3" fill="#0d9488" />
              <text x="84" y="38" className="text-[9px] font-black fill-teal-700">O</text>
              <polygon points="30,20 65,15 50,45" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.5" />
              <polygon points="130,60 95,65 110,35" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
              <line x1="30" y1="20" x2="130" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
              <text x="45" y="32" className="text-[10px] font-bold fill-teal-800">↺</text>
              <text x="110" y="58" className="text-[10px] font-bold fill-purple-800">↺</text>
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: SÍKIDOMOK SZIMMETRIÁINAK NAGY KATALÓGUSA */}
      <TheorySection
        number={3}
        title="Síkidomok Szimmetriatulajdonságai és Átlói"
        badgeColor="slate"
        icon={<Shapes className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
          A felvételi és a témazárók leggyakoribb feladattípusa a sokszögek szimmetriáinak ismerete:
        </p>

        <TheoryTable
          headers={['Síkidom', 'Szimmetriatengelyek', 'Középpontos szimmetria', 'Átlók tulajdonságai', 'Belső szögösszeg']}
          rows={[
            ['Általános háromszög', '0 db', 'Nincs', 'Nincs átlója', '180°'],
            ['Egyenlő szárú háromszög', '1 db (alap felezőmerőlegese)', 'Nincs', 'Nincs átlója', '180°'],
            ['Szabályos háromszög', '3 db (oldalfelezők = magasságok)', 'Nincs', 'Nincs átlója', '180° (3 × 60°)'],
            ['Általános paralelogramma', '0 db', 'Van (átlók metszéspontja)', 'Felezik egymást', '360°'],
            ['Téglalap', '2 db (oldalfelező merőlegesek)', 'Van', 'Felezik egymást, egyenlő hosszúak', '360° (4 × 90°)'],
            ['Rombusz', '2 db (az átlók egyenesei)', 'Van', 'Felezik egymást, merőlegesek egymásra', '360°'],
            ['Négyzet', '4 db (2 oldalfelező + 2 átló)', 'Van', 'Egyenlők, merőlegesek, felezik egymást', '360° (4 × 90°)'],
            ['Konvex deltoid', '1 db (a szimmetriaátló egyenese)', 'Nincs', 'Merőlegesek, főátló felezi a másikat', '360°'],
            ['Szabályos hatszög', '6 db (3 csúcs-csúcs + 3 oldalfelező)', 'Van (középpont)', '9 db átló', '720° (6 × 120°)'],
            ['Kör', 'Végtelen sok (minden átmérőegyenes)', 'Van (O középpont)', 'Végtelen sok átmérő (d = 2r)', '–']
          ]}
        />
      </TheorySection>

      {/* 4. SZEKCIÓ: SZÖGPÁROK ÉS PÁRHUZAMOS SZÁRÚ SZÖGEK */}
      <TheorySection
        number={4}
        title="Szögpárok Gyorskalauza"
        badgeColor="slate"
        icon={<Hash className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-indigo-700 block mb-1">EGYENLŐ SZÖGPÁROK</span>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• <strong>Csúcsszögek:</strong> Két egyenes metszésekor a szemközti szögek egyenlők: <MathText>α = α'</MathText>.</li>
              <li>• <strong>Váltószögek:</strong> Párhuzamos szárú, ellentétes irányítású szögpárok: <MathText>α = α'</MathText> („Z-alak”).</li>
              <li>• <strong>Egyállású szögek:</strong> Párhuzamos szárú, azonos irányítású szögpárok: <MathText>α = α'</MathText> („F-alak”).</li>
            </ul>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-amber-700 block mb-1">180°-OS SZÖGPÁROK</span>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• <strong>Mellékszögek:</strong> Közös szár és egyenessé kiegészülő szárak: <MathText>α + β = 180°</MathText>.</li>
              <li>• <strong>Kiegészítő szögek:</strong> Bármely két szög, amelyek összege pontosan 180°.</li>
              <li>• <strong>Társszögek:</strong> Párhuzamos szárú belső szögek a metsző egyenes azonos oldalán: <MathText>α + β = 180°</MathText> („U-alak”).</li>
            </ul>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-emerald-700 block mb-1">90°-OS SZÖGPÁROK</span>
            <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• <strong>Pótszögek:</strong> Két olyan szög, amelyek összege pontosan 90°: <MathText>α + β = 90°</MathText>.</li>
              <li>• Derékszögű háromszög két hegyesszöge mindig pótszögpárt alkot (<MathText>α + β = 90°</MathText>).</li>
              <li>• Példa: 35° pótszöge 55°, míg kiegészítő szöge 145°.</li>
            </ul>
          </Card>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: HÁROMSZÖG NEVEZETES VONALAI ÉS PONTJAI */}
      <TheorySection
        number={5}
        title="Háromszög Nevezetes Vonalai és Pontjai"
        badgeColor="slate"
        icon={<Triangle className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <Card className="p-3 bg-white dark:bg-slate-900 border border-teal-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-xs font-black text-teal-700 block mb-1">O: Köré írt kör középpontja</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Az <strong>oldalfelező merőlegesek</strong> metszéspontja. Csúcsoktól egyenlő távol van. Hegyesszögűben belül, derékszögűben az átfogó felezőpontján, tompaszögűben <strong>kívül</strong> van.
            </p>
          </Card>

          <Card className="p-3 bg-white dark:bg-slate-900 border border-indigo-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-xs font-black text-indigo-700 block mb-1">I: Beírt kör középpontja</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A <strong>belső szögfelezők</strong> metszéspontja. Az oldalaktól egyenlő távol van. Minden háromszögben <strong>mindig belül</strong> található!
            </p>
          </Card>

          <Card className="p-3 bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-xs font-black text-rose-700 block mb-1">M: Magasságpont</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A <strong>magasságvonalak</strong> metszéspontja. Hegyesszögűben belül, derékszögűben a derékszögű csúcsban, tompaszögűben <strong>kívül</strong> van.
            </p>
          </Card>

          <Card className="p-3 bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 rounded-xl text-center">
            <span className="text-xs font-black text-purple-700 block mb-1">S: Súlypont (2 : 1 arány)</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              A <strong>súlyvonalak</strong> metszéspontja. Mindig belül van. A súlypont a súlyvonalat a csúcstól számítva <strong>2 : 1 arányban</strong> osztja két részre.
            </p>
          </Card>
        </div>

        <TheoryCallout variant="tip" title="Euler-egyenes és Középvonal tétel">
          <div>
            • <strong>Euler-egyenes:</strong> Bármely háromszögben a magasságpont (<MathText>M</MathText>), a súlypont (<MathText>S</MathText>) és a köré írt kör középpontja (<MathText>O</MathText>) egy egyenesre esik, és teljesül: <MathText>|MS| = 2 · |SO|</MathText>.<br />
            • <strong>Háromszög középvonala:</strong> Két oldalfelező pontot összekötő szakasz párhuzamos a harmadik oldallal, és hossza pontosan fele annak (<MathText>k = a / 2</MathText>).
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 6. SZEKCIÓ: SZABÁLYOS SOKSZÖGEK ÉS A KÖR TULAJDONSÁGAI */}
      <TheorySection
        number={6}
        title="Szabályos Sokszögek Képletei és a Kör"
        badgeColor="slate"
        icon={<CircleIcon className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">Szabályos Sokszögek Kulcsképletei</span>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <strong>Belső szögek összege:</strong> <MathText>∑ = (n - 2) · 180°</MathText>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <strong>Egy belső szög nagysága:</strong> <MathText>α = ((n - 2) · 180°) / n</MathText>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <strong>Egy csúcsból induló átlók száma:</strong> <MathText>d = n - 3</MathText>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800">
                <strong>Összes átlók száma:</strong> <MathText>D = (n · (n - 3)) / 2</MathText>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">A Kör Részei és a Thalész-tétel</span>
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div>• <strong>Húr:</strong> A körvonal két pontját összekötő szakasz. A leghosszabb húr az átmérő (<MathText>d = 2r</MathText>).</div>
              <div>• <strong>Érintő:</strong> Pontosan 1 közös pontja van a körrel, és merőleges az érintési ponthoz húzott sugárra (<MathText>e ⊥ r</MathText>).</div>
              <div>• <strong>Körcikk vs Körszelet:</strong> A körcikket két sugár és egy körív, míg a körszeletet egy húr és egy körív határolja.</div>
              <div>• <strong>Thalész-tétel:</strong> Bármely kör átmérőjének két végpontja a körvonal bármely harmadik pontjából derékszögben (90°) látszik!</div>
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 7. SZEKCIÓ: RÉSZLETESEN KIDOLGOZOTT ZÁRÓ MINTAPÉLDÁK */}
      <TheorySection
        number={7}
        title="Lépésről Lépésre Kidolgozott Mintapéldák"
        badgeColor="slate"
        icon={<BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
      >
        <div className="space-y-4">
          {/* Mintapélda 1 */}
          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">1. MINTAPÉLDA: SZÖGSZÁMÍTÁS PÁRHUZAMOSOKKAL</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Egy paralelogramma egyik belső szöge α = 64°. Mekkorák a többi belső és külső szögei?
            </h4>
            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div><strong>1. Lépés (Szemközti szögek):</strong> A paralelogramma középpontosan szimmetrikus, így szemközti szögei egyenlők: <MathText>γ = α = 64°</MathText>.</div>
              <div><strong>2. Lépés (Szomszédos szögek):</strong> A szomszédos oldalak párhuzamos szárai miatt a szomszédos belső szögek társszögek, összegük 180°: <MathText>β = 180° - 64° = 116°</MathText>.</div>
              <div><strong>3. Lépés (Negyedik szög):</strong> Szemközti szögként <MathText>δ = β = 116°</MathText>.</div>
              <div className="font-bold text-teal-800 dark:text-teal-300">Eredmény: A belső szögek 64°, 116°, 64°, 116°. Külső szögei pedig 116° és 64°.</div>
            </div>
          </Card>

          {/* Mintapélda 2 */}
          <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider block mb-1">2. MINTAPÉLDA: SÚLYPONT ÉS KÖZÉPVONAL</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Egy háromszög alapja c = 14 cm, a hozzá tartozó súlyvonal hossza s_c = 12 cm. Milyen hosszú a középvonal, és mekkora darabokra osztja az S súlypont az s_c súlyvonalat?
            </h4>
            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div><strong>1. Lépés (Középvonal hossza):</strong> A c oldallal párhuzamos középvonal hossza a harmadik oldal fele: <MathText>k = c / 2 = 14 / 2 = 7 cm</MathText>.</div>
              <div><strong>2. Lépés (Súlypont osztásaránya):</strong> A súlypont a súlyvonalat a csúcstól számítva 2 : 1 arányban (2/3 és 1/3 részre) osztja.</div>
              <div>• Csúcs felőli szakasz: <MathText>(2 / 3) · 12 = 8 cm</MathText>.</div>
              <div>• Oldal felőli szakasz: <MathText>(1 / 3) · 12 = 4 cm</MathText>.</div>
              <div className="font-bold text-indigo-800 dark:text-indigo-300">Eredmény: A középvonal 7 cm, a súlyvonal szakaszai pedig 8 cm és 4 cm hosszúak.</div>
            </div>
          </Card>
        </div>
      </TheorySection>

      {/* 8. SZEKCIÓ: TIPIKUS TÉVHITEK ÉS BUKTATÓK */}
      <TheorySection
        number={8}
        title="Tipikus Tévhitek és Felvételi Buktatók"
        badgeColor="slate"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
      >
        <div className="space-y-3">
          <TheoryTrapBox
            trap="„A paralelogrammának 2 szimmetriatengelye van az átlói mentén.”"
            correct="Az általános paralelogrammának 0 darab szimmetriatengelye van! Csak középpontosan szimmetrikus. Szimmetriatengelye csak a speciális paralelogrammáknak (téglalap: 2 db oldalfelező, rombusz: 2 db átló, négyzet: 4 db) van."
          />
          <TheoryTrapBox
            trap="„A súlypont a súlyvonal felezőpontja.”"
            correct="Nem felezi! A súlypont mindig 2 : 1 arányban osztja a súlyvonalat: a csúcstól 2 egység, az oldalfelező ponttól 1 egység távolságra fekszik."
          />
          <TheoryTrapBox
            trap="„Középpontos tükrözésnél az alakzat körüljárási iránya megfordul.”"
            correct="Téves! Középpontos tükrözésnél a körüljárási irány MEGMARAD (irányítástartó). Csak a tengelyes tükrözésnél fordul meg (orientációváltó)!"
          />
          <TheoryTrapBox
            trap="„A derékszögű háromszög köré írt kör középpontja a háromszög belsejében van.”"
            correct="A Thalész-tétel miatt a derékszögű háromszög köré írt kör középpontja pontosan az átfogó felezőpontjára esik, a sugara pedig az átfogó fele (r = c / 2)!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometrySummaryTheory;
