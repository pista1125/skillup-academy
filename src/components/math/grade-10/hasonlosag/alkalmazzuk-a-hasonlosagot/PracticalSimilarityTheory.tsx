import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  ShadowMeasurementSvg,
  MirrorHeightSvg,
  ThalesShipDistanceSvg,
  MarginSimilarityCounterSvg,
  BiometricScalingSvg
} from './PracticalSimilarityFigures';

export const PracticalSimilarityTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Laboratory 1 state: Field measurement simulator
  const [measMethod, setMeasMethod] = useState<'shadow' | 'mirror'>('shadow');
  const [personHeight, setPersonHeight] = useState<number>(1.6); // meters
  const [personShadow, setPersonShadow] = useState<number>(1.2); // meters
  const [totalShadow, setTotalShadow] = useState<number>(5.7); // meters
  const [mirrorDistTower, setMirrorDistTower] = useState<number>(20); // meters
  const [mirrorDistPerson, setMirrorDistPerson] = useState<number>(2); // meters

  // Laboratory 2 state: Scenario tab
  const [activeScenarioIdx, setActiveScenarioIdx] = useState<number>(0);

  // Computed heights
  const calculatedShadowHeight = Math.round((personHeight * (totalShadow / personShadow)) * 10) / 10;
  const calculatedMirrorHeight = Math.round((personHeight * (mirrorDistTower / mirrorDistPerson)) * 10) / 10;

  const scenarios = [
    {
      title: '1. Péter és a fa árnyéka',
      subtitle: 'Péter (160 cm) fától 4,5 m-re áll, árnyéka még éppen befér a fa árnyékába (1,2 m-re nyúlik túl Péteren).',
      details: [
        'A párhuzamos napsugarak miatt két hasonló derékszögű háromszög keletkezik.',
        '• A fa teljes árnyéka: 4,5 m + 1,2 m = 5,7 méter.',
        '• Péter árnyéka: 1,2 méter.',
        '• Hasonlósági arány: λ = 5,7 / 1,2 = 4,75.',
        '• A fa valódi magassága: M = 1,6 m · 4,75 = 7,6 méter!'
      ],
      badge: 'Árnyékmérés',
      badgeColor: 'amber'
    },
    {
      title: '2. Az A4-es lap és a margó-csapda (Érettségi)',
      subtitle: 'A4 papír: 21 cm × 29,7 cm. Szövegszerkesztő 2,5 cm margóval dolgozik minden oldalon.',
      details: [
        'A szövegtükör mérete: szélesség = 21 - 5 = 16 cm; magasság = 29,7 - 5 = 24,7 cm.',
        '• Eredeti A4 oldalaránya: 29,7 / 21 ≈ 1,414 (√2).',
        '• Szövegtükör oldalaránya: 24,7 / 16 = 1,54375.',
        '• Következtetés: Zsófinak NINCS igaza, a belső téglalap NEM hasonló az eredetihez!',
        '• Tanulság: Ha egy téglalap mindkét dimenziójából azonos sávot vonunk le, az oldalak aránya elromlik!'
      ],
      badge: 'Érettségi Buktató',
      badgeColor: 'rose'
    },
    {
      title: '3. Folyómeder mélységmérése',
      subtitle: 'Egyenletes mederlejtés: 180 cm mély tábla, majd 6 méterrel bentebb 720 cm mély tábla.',
      details: [
        'Mivel a meder lejtése állandó, a vízmélység egyenesen arányos a parttól mért távolsággal:',
        '• Aránypár: 180 / x = 720 / (x + 6)',
        '• Keresztszorzás: 720x = 180(x + 6) = 180x + 1080',
        '• Rendezve: 540x = 1080  ⇒  x = 2 méter.',
        '• Az 1. tábla 2 méterre, a 2. tábla 2 + 6 = 8 méterre van a parttól!'
      ],
      badge: 'Lineáris Lejtés',
      badgeColor: 'blue'
    },
    {
      title: '4. Thálész tengerparti hajótávolság-mérése',
      subtitle: 'Hajó távolsága a parttól merőleges szárazföldi kitűzéssel.',
      details: [
        'Thálész a part mentén kitűzte az AB = b szakaszt és a jóval rövidebb BC = c szakaszt.',
        'Ezután merőlegesen a szárazföld felé gyalogolt CD = d távolságot, amíg a hajó (H), B és D egy egyenesbe esett.',
        '• Hasonlóság: ΔABH ~ ΔCBD  ⇒  t / b = d / c',
        '• A hajó távolsága: t = (d · b) / c.',
        '• Mivel c << b, a szárazföldi séta d hossza kezelhetően kicsi maradt!'
      ],
      badge: 'Thálész Módszer',
      badgeColor: 'teal'
    },
    {
      title: '5. „Ki a legerősebb?” – Biometrikus skálázódás',
      subtitle: 'Hangya vs. Ember: izomerő (~ λ²) és testtömeg (~ λ³) kapcsolata.',
      details: [
        '• Izomerő: az izomrostok számával, vagyis az izom keresztmetszeti felületével arányos (λ²).',
        '• Testtömeg: a test térfogatával arányos állandó sűrűség mellett (λ³).',
        '• Relatív teherbírás (emelhető teher / testsúly): λ² / λ³ = 1 / λ.',
        '• Ha egy 180 cm magas embert 1,5 cm-es hangyává kicsinyítünk (λ = 1/120):',
        '  A relatív ereje 120-szorosára nő! Kényelmesen elbírná saját testtömegének 120-szorosát!'
      ],
      badge: 'Biometria',
      badgeColor: 'purple'
    }
  ];

  return (
    <TheoryTemplate
      topicId="g10-hasonlosag"
      subtopicId="alkalmazzuk-a-hasonlosagot"
      title="6. Alkalmazzuk a hasonlóságot!"
      subtitle="Közvetett magasság- és távolságmérés árnyékkal és síktükörrel, Thálész tengerparti kitűzési eljárása, az érettségi margó-cáfolat és a biometrikus skálázódás törvényei."
      badge="10. OSZTÁLY • IX. HASONLÓSÁG • TANANYAG"
      themeColor="cyan"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — GYAKORLATI HASONLÓSÁGI MÉRÉSEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80">
              <span className="text-xs font-black text-cyan-900 dark:text-cyan-200 block mb-1">
                ✓ Terepi magasságmérés és biometrikus skálázódás:
              </span>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs font-black text-cyan-900 dark:text-cyan-200 text-center">
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-cyan-300">
                  M / m = A / a (árnyék / tükör)
                </div>
                <div className="p-1 bg-white/80 dark:bg-slate-900/60 rounded border border-cyan-300">
                  Erő / Súly ~ λ² / λ³ = 1 / λ
                </div>
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Szemmagasság-szabály:</strong> Vízszintes nézésű mérésnél a szemmagasságot ($h_0$) mindig hozzá kell adni a magassághoz!
              </li>
              <li>
                <strong>A4 margó-csapda:</strong> Téglalap minden oldalából azonos $d$ szélességű sáv levonása <em>nem</em> eredményez hasonló téglalapot (ha $a \neq b$)!
              </li>
              <li>
                <strong>Biometria:</strong> Az izomerő a keresztmetszettel ($\lambda^2$), a testtömeg a térfogattal ($\lambda^3$) arányos.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. SECTION: KÖZVETETT MAGASSÁGMÉRÉS ÁRNYÉKKAL ÉS SZÖGMÉRŐVEL */}
      <TheorySection
        title="1. Közvetett magasságmérés árnyékkal és szögmérővel"
        lead="Ha egy magas fa, épület vagy oszlop magassága közvetlenül nem mérhető meg mérőszalaggal, a hasonlóság segítségével egyszerű földi mérésekkel pontosan kiszámíthatjuk."
      >
        <TheoryCard title="Thálész árnyékmódszere a terepen">
          <p className="mb-3 text-slate-700 leading-relaxed">
            A módszer alapja, hogy a Nap óriási távolsága miatt a Föld felszínére érkező napsugarak egymással{' '}
            <strong>párhuzamosak</strong>. Emiatt a függőleges tárgyak és a vízszintes talajra vetett árnyékaik által
            bezárt derékszögű háromszögek mindegyikében a beesési szögek egyenlők:
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg my-2 font-mono text-sm text-amber-900">
            M / m = A / a   ⇒   M = m · (A / a)
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Ahol <span className="font-mono">M</span> a keresett magasság, <span className="font-mono">A</span> a teljes
            árnyék hossza, míg <span className="font-mono">m</span> és <span className="font-mono">a</span> a megfigyelő
            (vagy mérőpálca) ismert magassága és árnyéka.
          </p>
        </TheoryCard>

        <ShadowMeasurementSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Péter és a fa esete" color="amber">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Péter (160 cm) 4,5 m-re áll a fától úgy, hogy árnyéka éppen a fa árnyékán belül végződik, és 1,2 m-re
              nyúlik túl rajta:
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              <li>Fa teljes árnyéka: <span className="font-mono font-bold">4,5 m + 1,2 m = 5,7 m</span></li>
              <li>Péter árnyéka: <span className="font-mono font-bold">1,2 m</span></li>
              <li>Hasonlósági arány: <span className="font-mono font-bold">λ = 5,7 / 1,2 = 4,75</span></li>
              <li>Fa magassága: <span className="font-mono font-bold text-amber-800">M = 1,6 m · 4,75 = 7,6 méter</span></li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Szögmérős magasságmérés (Gyöngyszálló)" color="blue">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Ha 8 m távolságból, 1,6 m szemmagasságból 70°-os szögben látjuk a hotel tetejét:
            </p>
            <div className="bg-blue-50 p-2.5 rounded text-xs font-mono text-blue-900 space-y-1">
              <p>Háromszög magassága: 8 m · tan(70°) ≈ 21,98 m</p>
              <p>Teljes épületmagasság: 21,98 m + 1,6 m ≈ 23,6 méter</p>
            </div>
            <p className="text-xs text-slate-600 mt-2">
              Fontos: A szögmérő magasságát (a szemmagasságot) mindig utólag hozzá kell adni a befogóhoz!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SECTION: SÍKTÜKRÖS MAGASSÁGMÉRÉS */}
      <TheorySection
        title="2. Síktükrös magasságmérés a talajon"
        lead="Mi a teendő borús időben, ha nincs napsütés és nincs árnyék? Egy zsebtükör segítségével a fényvisszaverődés törvénye azonnal megoldást ad!"
      >
        <MirrorHeightSvg />

        <TheoryCard title="A síktükör geometriai modellje">
          <p className="text-sm text-slate-700 leading-relaxed mb-3">
            A földre helyezett vízszintes síktükörben a torony csúcsa akkor pillantható meg, ha a beeső fénysugár
            pontosan a megfigyelő szemébe verődik vissza.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="font-bold text-emerald-800 block mb-1">Optikai törvény:</span>
              <p>A beesési szög megegyezik a visszaverődési szöggel: <strong>α = α</strong>.</p>
              <p className="mt-1">Mivel a torony és a megfigyelő is függőleges (derékszög a talajjal), a két derékszögű háromszög hasonló!</p>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
              <span className="font-bold text-indigo-800 block mb-1">Mérési képlet:</span>
              <p className="font-mono font-bold text-indigo-900 text-sm">M / m_szem = D / d</p>
              <p className="mt-1 font-mono">M = m_szem · (D / d)</p>
              <p className="mt-1 text-slate-500">D = torony–tükör távolság, d = tükör–ember távolság.</p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SECTION: I. INTERAKTÍV LABORATÓRIUM */}
      <TheorySection
        title="3. I. Laboratórium: Közvetett Terepi Magasságmérés Szimulátor"
        lead="Válassz mérési eljárást (Árnyékmódszer vagy Síktükör), állítsd a paramétereket, és nézd meg az azonnali magasságkalkulációt és a sugarak viselkedését!"
      >
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          {/* Method selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMeasMethod('shadow')}
              className={`py-2 px-4 rounded-lg text-xs font-bold border transition-colors ${
                measMethod === 'shadow'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              ☀️ Árnyékmódszer (Nap)
            </button>
            <button
              type="button"
              onClick={() => setMeasMethod('mirror')}
              className={`py-2 px-4 rounded-lg text-xs font-bold border transition-colors ${
                measMethod === 'mirror'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              🪞 Tükörmódszer (Optika)
            </button>
          </div>

          {/* Sliders for shadow mode */}
          {measMethod === 'shadow' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Ember magassága (m):</span>
                  <span className="font-mono text-amber-700">{personHeight} m</span>
                </div>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.05"
                  value={personHeight}
                  onChange={(e) => setPersonHeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Ember árnyéka (a):</span>
                  <span className="font-mono text-amber-700">{personShadow} m</span>
                </div>
                <input
                  type="range"
                  min="0.6"
                  max="3.0"
                  step="0.1"
                  value={personShadow}
                  onChange={(e) => setPersonShadow(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Fa teljes árnyéka (A):</span>
                  <span className="font-mono text-amber-700">{totalShadow} m</span>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="15.0"
                  step="0.1"
                  value={totalShadow}
                  onChange={(e) => setTotalShadow(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          )}

          {/* Sliders for mirror mode */}
          {measMethod === 'mirror' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Szemmagasság (m_szem):</span>
                  <span className="font-mono text-blue-700">{personHeight} m</span>
                </div>
                <input
                  type="range"
                  min="1.2"
                  max="2.0"
                  step="0.05"
                  value={personHeight}
                  onChange={(e) => setPersonHeight(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Tükör – Megfigyelő (d):</span>
                  <span className="font-mono text-blue-700">{mirrorDistPerson} m</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.2"
                  value={mirrorDistPerson}
                  onChange={(e) => setMirrorDistPerson(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Torony – Tükör (D):</span>
                  <span className="font-mono text-blue-700">{mirrorDistTower} m</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={mirrorDistTower}
                  onChange={(e) => setMirrorDistTower(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}

          {/* Output Banner */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">Kiszámított Tárgymagasság</span>
              <p className="text-2xl font-mono font-bold text-slate-900">
                M = {measMethod === 'shadow' ? calculatedShadowHeight : calculatedMirrorHeight} méter
              </p>
            </div>
            <div className="text-xs text-slate-600 font-mono">
              {measMethod === 'shadow'
                ? `λ = ${totalShadow} / ${personShadow} = ${(totalShadow / personShadow).toFixed(2)}`
                : `λ = ${mirrorDistTower} / ${mirrorDistPerson} = ${(mirrorDistTower / mirrorDistPerson).toFixed(2)}`}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SECTION: MARGÓ-CSAPDA ÉS ÉRETTSÉGI LOGIKA */}
      <TheorySection
        title="4. Az A4-es lap és a margó-csapda (Érettségi)"
        lead="Hasonló marad-e a szövegtükör téglalapja az A4-es papírhoz a margó levonása után? Ismerd meg az érettségi vizsgák egyik leggyakoribb beugrató kérdését!"
      >
        <MarginSimilarityCounterSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="Miért hibás a köznapi megérzés?" color="rose">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Sokan azt gondolják: <em>„Mivel a margó körben minden oldalon pontosan 2,5 cm, a papír alakja nem változik, csak kisebb lesz, tehát hasonló marad.”</em>
            </p>
            <p className="text-xs text-slate-700 leading-relaxed font-semibold text-rose-800">
              Ez súlyos matematikai tévedés!
            </p>
            <p className="text-xs text-slate-700 leading-relaxed mt-1">
              A hasonlóság nem azt követeli meg, hogy az oldalakból <strong>ugyanannyit vonjunk le</strong>, hanem azt,
              hogy az oldalak hossza <strong>ugyanannyiszorosára csökkenjen</strong> (aránytartás). Mivel 21 cm-ből 5 cm-t
              levonva 23,8%-os csökkenést, míg 29,7 cm-ből 5 cm-t levonva csak 16,8%-os csökkenést kapunk, az alakzat
              megnyúlik, az arány felborul!
            </p>
          </TheoryCard>

          <TheoryCard title="Logikai állítás és megfordítása" color="indigo">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              <strong>Eredeti állítás:</strong> „Ha két négyszög hasonló, akkor megfelelő szögeik páronként egyenlők.”
            </p>
            <p className="text-xs font-bold text-emerald-700 mb-2">⇒ Logikai értéke: IGAZ (szögtartás alaptétel).</p>
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              <strong>Megfordítás:</strong> „Ha két négyszög megfelelő szögei páronként egyenlők, akkor a két négyszög hasonló.”
            </p>
            <p className="text-xs font-bold text-red-600 mb-1">⇒ Logikai értéke: HAMIS!</p>
            <p className="text-xs text-slate-600">
              <strong>Indoklás (ellenpélda):</strong> Egy négyzet és egy téglalap, vagy egy 1 × 2-es és egy 1 × 4-es téglalap
              szögei mind 90°-osak, mégsem hasonlók egymáshoz. Négyszögekre a szögek egyenlősége nem elegendő!
            </p>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Érettségi buktató: Háromszögek vs. Négyszögek hasonlósága"
          trap="Azt hinni, hogy ha a háromszögeknél elegendő a szögek egyenlősége a hasonlósághoz (szög-szög alapeset), akkor ez négyszögekre is igaz."
          correction="Négyszögeknél és más sokszögeknél a szögek egyenlősége NEM elegendő a hasonlósághoz! Szükséges az oldalak hosszának arányossága is. Például minden téglalap szögei megegyeznek (90°), mégsem hasonló bármely két téglalap."
        />
      </TheorySection>

      {/* 5. SECTION: BIOMETRIKUS SKÁLÁZÓDÁS */}
      <TheorySection
        title="5. Biometrikus skálázódás: „Ki a legerősebb?”"
        lead="Miért képes a hangya felemelni a saját testtömegének 40–50-szeresét, míg az ember alig az egyszeresét? A válasz a felület (λ²) és térfogat (λ³) eltérő dimenziójában rejlik!"
      >
        <BiometricScalingSvg />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard title="A Galilei-féle skálázási törvény az élővilágban" color="purple">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Minden élőlény fizikai teljesítményét a geometriai hasonlóság törvényei határozzák meg:
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1.5">
              <li>
                <strong>Abszolút izomerő:</strong> Az izomrostok számával, vagyis az izom fiziológiai
                keresztmetszetével arányos: <span className="font-mono font-bold text-indigo-700">Erő ~ λ²</span>.
              </li>
              <li>
                <strong>Saját testtömeg:</strong> A test térfogatával (m = ρ · V) arányos:{' '}
                <span className="font-mono font-bold text-amber-700">Tömeg ~ λ³</span>.
              </li>
              <li>
                <strong>Relatív teherbírás:</strong> Erő / Tömeg = λ² / λ³ ={' '}
                <span className="font-mono font-bold text-red-700">1 / λ</span> !
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Gulliver és a mesék világa" color="blue">
            <p className="text-sm text-slate-700 leading-relaxed mb-2">
              Swift regényében Gulliver a lilliputiakhoz képest 12-szer magasabb volt (λ = 12):
            </p>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              <li>Tömege: 12³ = <strong>1728 lilliputi</strong> tömegét tette ki (ennyi étel kellett neki!).</li>
              <li>Ruhaanyaga: 12² = <strong>144-szer több</strong> szövetet igényelt.</li>
              <li>
                Óriások a mesékben: egy 10-szer akkora ember tömege 1000-szeresére nőne, miközben csontjainak
                teherbírása csak 100-szorosára, így a saját súlya alatt összeroskadna!
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. SECTION: II. LABORATÓRIUM - ESETTANULMÁNYOK */}
      <TheorySection
        title="6. II. Laboratórium: Alkalmazási Esettanulmányok"
        lead="Böngészd végig mind az 5 gyakorlati feladatot lépésről lépésre!"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {scenarios.map((sc, idx) => (
            <button
              key={sc.title}
              type="button"
              onClick={() => setActiveScenarioIdx(idx)}
              className={`p-2.5 rounded-lg text-left border text-xs transition-all ${
                activeScenarioIdx === idx
                  ? 'bg-cyan-800 text-white border-cyan-800 shadow-md font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 font-medium'
              }`}
            >
              <span className="block text-[10px] text-slate-400 font-normal">#{idx + 1} Eset</span>
              <span className="line-clamp-2">{sc.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-3">
            <div>
              <h4 className="text-base font-bold text-slate-900">{scenarios[activeScenarioIdx].title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{scenarios[activeScenarioIdx].subtitle}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
              {scenarios[activeScenarioIdx].badge}
            </span>
          </div>

          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            {scenarios[activeScenarioIdx].details.map((line) => (
              <p key={line.slice(0, 30)} className={line.startsWith('•') ? 'pl-2 font-medium text-slate-800' : ''}>
                {line}
              </p>
            ))}
          </div>

          {activeScenarioIdx === 3 && <ThalesShipDistanceSvg className="w-full max-w-md mx-auto my-3" />}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

