import React, { useState, useMemo } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  CircleDot,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Sliders,
  Lock,
  Boxes,
  HelpCircle,
  Hash,
  XCircle,
  ShieldAlert
} from 'lucide-react';
import {
  DomainInclusionSvg,
  FractionRestrictionSvg,
  SquareRootRestrictionSvg,
  FalseRootSvg
} from './DomainFigures';

interface DomainTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const DomainTheory: React.FC<DomainTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV KIKÖTÉS & HALMAZ LABOR ÁLLAPOTOK ---
  const [labMode, setLabMode] = useState<'restrictions' | 'filter'>('restrictions');

  // 1. Kikötés kalkulátor állapotok
  const [funcType, setFuncType] = useState<'fraction' | 'linear_denom' | 'sqrt'>('fraction');
  const [paramC, setParamC] = useState<number>(3);
  const [paramA, setParamA] = useState<number>(2);
  const [paramB, setParamB] = useState<number>(-6);
  const [testInputX, setTestInputX] = useState<number>(3);

  // 2. Alaphalmaz szűrő állapotok
  const [selectedEqIndex, setSelectedEqIndex] = useState<number>(0);
  const [selectedBaseSet, setSelectedBaseSet] = useState<'R' | 'Q' | 'Z' | 'N'>('R');

  const eqPresets = useMemo(() => [
    {
      name: '2x = 5',
      roots: [2.5],
      rootLabels: ['x = 2,5']
    },
    {
      name: 'x² = 9',
      roots: [3, -3],
      rootLabels: ['x₁ = 3', 'x₂ = -3']
    },
    {
      name: '3x + 12 = 0',
      roots: [-4],
      rootLabels: ['x = -4']
    },
    {
      name: 'x² - 2 = 0',
      roots: [Math.SQRT2, -Math.SQRT2],
      rootLabels: ['x₁ = √2 ≈ 1,41', 'x₂ = -√2 ≈ -1,41']
    }
  ], []);

  // Számítás a kikötéshez
  const restrictionData = useMemo(() => {
    if (funcType === 'fraction') {
      const isForbidden = testInputX === paramC;
      const val = !isForbidden ? (1 / (testInputX - paramC)).toFixed(3) : null;
      return {
        formula: `f(x) = 1 / (x - ${paramC})`,
        restrictionText: `x ≠ ${paramC}`,
        domainText: `É.T. = ℝ \\ {${paramC}}`,
        isForbidden,
        value: val,
        forbiddenValue: paramC
      };
    } else if (funcType === 'linear_denom') {
      const forbiddenVal = paramA !== 0 ? -paramB / paramA : 0;
      const denom = paramA * testInputX + paramB;
      const isForbidden = Math.abs(denom) < 0.0001;
      const val = !isForbidden ? (5 / denom).toFixed(3) : null;
      return {
        formula: `f(x) = 5 / (${paramA}x + ${paramB})`,
        restrictionText: `x ≠ ${forbiddenVal}`,
        domainText: `É.T. = ℝ \\ {${forbiddenVal}}`,
        isForbidden,
        value: val,
        forbiddenValue: forbiddenVal
      };
    } else {
      // sqrt(x - paramC)
      const isForbidden = testInputX < paramC;
      const val = !isForbidden ? Math.sqrt(testInputX - paramC).toFixed(3) : null;
      return {
        formula: `f(x) = √(x - ${paramC})`,
        restrictionText: `x - ${paramC} ≥ 0 → x ≥ ${paramC}`,
        domainText: `É.T. = [${paramC}; +∞[`,
        isForbidden,
        value: val,
        forbiddenValue: `< ${paramC}`
      };
    }
  }, [funcType, paramC, paramA, paramB, testInputX]);

  // Számítás az alaphalmaz szűrőhöz
  const filterData = useMemo(() => {
    const current = eqPresets[selectedEqIndex];
    const accepted: string[] = [];
    const rejected: { label: string; reason: string }[] = [];

    current.roots.forEach((val, idx) => {
      const label = current.rootLabels[idx];
      let isOk = false;
      let rejectReason = '';

      if (selectedBaseSet === 'R') {
        isOk = true;
      } else if (selectedBaseSet === 'Q') {
        // Racionális: nem végtelen nem periodikus tizedes
        if (Math.abs(val - Math.SQRT2) < 0.001 || Math.abs(val + Math.SQRT2) < 0.001) {
          isOk = false;
          rejectReason = 'Irracionális szám (√2 ∉ ℚ)';
        } else {
          isOk = true;
        }
      } else if (selectedBaseSet === 'Z') {
        if (Number.isInteger(val)) {
          isOk = true;
        } else {
          isOk = false;
          rejectReason = 'Nem egész szám (tört vagy irracionális)';
        }
      } else if (selectedBaseSet === 'N') {
        if (Number.isInteger(val) && val >= 0) {
          isOk = true;
        } else if (val < 0) {
          isOk = false;
          rejectReason = 'Negatív szám (∉ ℕ)';
        } else {
          isOk = false;
          rejectReason = 'Nem természetes szám (tört)';
        }
      }

      if (isOk) {
        accepted.push(label);
      } else {
        rejected.push({ label, reason: rejectReason });
      }
    });

    return {
      accepted,
      rejected,
      solutionSetText: accepted.length > 0 ? `{ ${accepted.join(', ')} }` : '∅ (üres halmaz)'
    };
  }, [eqPresets, selectedEqIndex, selectedBaseSet]);

  return (
    <TheoryTemplate
      title="Alaphalmaz, Értelmezési Tartomány és Megoldáshalmaz"
      subtitle="Kikötések szigorú vizsgálata, nullával való osztás és gyök alatti mennyiségek, a halmazok egymásba ágyazása (M ⊆ É.T. ⊆ A)"
      badgeText="9. OSZTÁLY • III. EGYENLETEK ÉS AZONOSSÁGOK • 7. TÉMAKÖR"
      themeColor="rose"
      documentId="domain-theory"
      pdfFilename="9_osztaly_alaphalmaz_ertelmezesi_tartomany.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'A Három Halmaz Hierarchiája és a Kikötések Aranyszabálya',
        align: 'left',
        formula: (
          <div className="flex flex-col gap-1.5 text-left font-bold text-xs sm:text-sm">
            <div>
              <span className="text-rose-700 dark:text-rose-400 font-black">1. Nullával való osztás tilalma: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Törtes kifejezésnél a nevező NEM lehet nulla: Nevező ≠ 0 (É.T. kikötés a feladat legelején!).
              </span>
            </div>
            <div>
              <span className="text-pink-700 dark:text-pink-400 font-black">2. Halmazhierarchia: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                M ⊆ É.T. ⊆ A (A megoldáshalmaz eleme kell legyen mind az értelmezési tartománynak, mind az alaphalmaznak!).
              </span>
            </div>
            <div>
              <span className="text-red-700 dark:text-red-400 font-black">3. Hamis gyök: </span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                Ha egy kapott gyök nullává tenné a nevezőt, az HAMIS GYÖK, nem része a megoldáshalmaznak: M = ∅!
              </span>
            </div>
          </div>
        )
      }}
    >
      {/* ============================================================ */}
      {/* 1. FEJEZET: AZ ALAPHALMAZ (A) SZEREPE                        */}
      {/* ============================================================ */}
      <TheorySection
        title="1. Az Alaphalmaz (A) és a Megoldások Szűrése"
        badge="Halmazelmélet"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Az <strong>alaphalmaz (A)</strong> az a kiinduló számhalmaz, amelyből az ismeretlen lehetséges értékeit egyáltalán keressük.
            </p>
            <TheoryCallout
              icon={<CircleDot className="w-5 h-5 text-rose-600" />}
              title="Alapértelmezett Alaphalmaz"
              color="rose"
            >
              Ha a feladat szövege külön nem határozza meg az alaphalmazt, akkor alapértelmezésben mindig a <strong>valós számok halmazát tekintjük alaphalmaznak: A = ℝ</strong>.
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <DomainInclusionSvg size={340} />
          </div>
        </div>

        <TheoryTable
          headers={['Egyenlet levezetése', 'Alaphalmaz (A)', 'Megoldáshalmaz (M)', 'Magyarázat']}
          rows={[
            ['2x = 5 → x = 2,5', 'A = ℝ (valós)', 'M = {2,5}', 'A 2,5 valós szám, elfogadjuk.'],
            ['2x = 5 → x = 2,5', 'A = ℤ (egész)', 'M = ∅', 'A 2,5 nem egész szám (2,5 ∉ ℤ)!'],
            ['x² = 16 → x = ±4', 'A = ℝ (valós)', 'M = {-4, 4}', 'Mindkét szám valós.'],
            ['x² = 16 → x = ±4', 'A = ℕ (természetes)', 'M = {4}', 'A -4 negatív szám, nem természetes!']
          ]}
        />
      </TheorySection>

      {/* ============================================================ */}
      {/* 2. FEJEZET: ÉRTELMEZÉSI TARTOMÁNY ÉS KIKÖTÉSEK               */}
      {/* ============================================================ */}
      <TheorySection
        title="2. Értelmezési Tartomány (É.T.) és a Nullával Osztás Tilalma"
        badge="Kikötések"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Az <strong>értelmezési tartomány (É.T.)</strong> az alaphalmaz azon legbővebb részhalmaza, amelyre az egyenletben szereplő összes algebrai művelet elvégezhető, azaz mindkét oldal kifejezései kiszámítható számértéket adnak.
            </p>
            <div className="p-4 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-pink-900 dark:text-pink-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-pink-600" />
                A Kikötések Aranyszabálya:
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                A kikötést <strong>a legelső lépésként</strong> kell megtenni, még a mérlegelv vagy bármilyen átalakítás megkezdése előtt!
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <FractionRestrictionSvg size={340} />
          </div>
        </div>

        <TheoryTrapBox title="Miért tilos 0-val osztani?">
          <p className="text-xs sm:text-sm">
            Ha nullával osztanánk, értelmetlen kifejezést kapnánk, ami felborítja a matematika logikai rendszerét (pl. 0 · 5 = 0 · 7 igaz, de 0-val „osztva” az 5 = 7 abszurditást kapnánk!). Ezért a tört nevezője <strong>soha semmilyen körülmények között nem lehet 0</strong>!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* ============================================================ */}
      {/* 3. FEJEZET: NÉGYZETGYÖKÖS KIFEJEZÉSEK                       */}
      {/* ============================================================ */}
      <TheorySection
        title="3. Négyzetgyökös Kifejezések Valós Értelmezhetősége"
        badge="Gyökös feltételek"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              A valós számok halmazán a négyzetgyök csak <strong>nemnegatív számokra</strong> van értelmezve, mivel semmilyen valós szám négyzete nem lehet negatív!
            </p>
            <TheoryCallout
              icon={<Lock className="w-5 h-5 text-rose-600" />}
              title="Gyök alatti mennyiség feltétele"
              color="rose"
            >
              <div className="font-mono font-bold text-sm">
                √A esetén kötelező kikötés: A ≥ 0
              </div>
              <div className="text-xs mt-1 text-slate-600 dark:text-slate-300">
                Például √(2x - 8) esetén: 2x - 8 ≥ 0 → 2x ≥ 8 → x ≥ 4, így É.T. = [4; +∞[.
              </div>
            </TheoryCallout>
          </div>
          <div className="flex justify-center">
            <SquareRootRestrictionSvg size={340} />
          </div>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 4. FEJEZET: A MEGOLDÁSHALMAZ FELÍRÁSA                       */}
      {/* ============================================================ */}
      <TheorySection
        title="4. A Megoldáshalmaz (M) Pontos Felírása"
        badge="Eredményadás"
      >
        <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          A megoldáshalmazt mindig kapcsos zárójelek között (<span className="font-mono">M = &#123;...&#125;</span>) vagy az üres halmaz szimbólumával (<span className="font-mono">M = ∅</span>) adjuk meg.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <TheoryCard title="Egyetlen gyök" color="rose">
            Pontosan 1 szám elégíti ki: <span className="font-mono font-bold">M = &#123;5&#125;</span>.
          </TheoryCard>
          <TheoryCard title="Véges sok gyök" color="pink">
            Több különálló érték: pl. másodfokú egyenletnél <span className="font-mono font-bold">M = &#123;-2; 2&#125;</span>.
          </TheoryCard>
          <TheoryCard title="Nincs gyök (Ellentmondás)" color="red">
            Egyetlen szám sem jó: <span className="font-mono font-bold">M = ∅</span> (üres halmaz).
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ============================================================ */}
      {/* 5. FEJEZET: HAMIS GYÖKÖK ÉS GYÖKVESZTÉS                     */}
      {/* ============================================================ */}
      <TheorySection
        title="5. Hamis Gyökök és Gyökvesztés Veszélyei"
        badge="Csapdák"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              <strong>Nem ekvivalens átalakításnak</strong> nevezzük azokat a műveleteket, amelyek megváltoztatják az egyenlet gyökeinek halmazát:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Négyzetre emelés:</strong> tágíthatja a megoldáshalmazt, azaz <em>hamis gyököket</em> hozhat be! (Pl. x = 3 → x² = 9 → x = ±3).
              </li>
              <li>
                <strong>Ismeretlennel való osztás:</strong> szűkítheti a megoldáshalmazt, azaz <em>gyököt veszíthetünk</em>! (Pl. x² = 4x osztva x-szel → x = 4, az x = 0 gyök elveszett).
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <FalseRootSvg size={340} />
          </div>
        </div>
      </TheorySection>
    
      {/* ============================================================ */}
      {/* 6. FEJEZET: GYAKORLATI INTERAKTÍV KIKÖTÉS & HALMAZ LABOR     */}
      {/* ============================================================ */}
      <TheorySection
        title="6. Gyakorlati Interaktív Kikötés & Halmaz Labor"
        badge="Interaktív Labor"
      >
        {/* ============================================================ */}
      {/* INTERAKTÍV KIKÖTÉS & HALMAZ LABOR                           */}
      {/* ============================================================ */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20 border-2 border-rose-200 dark:border-rose-800 rounded-3xl p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/30">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Interaktív Kikötés & Halmaz Labor
              </h2>
              <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 font-medium">
                Vizsgáld a tiltott értékeket és teszteld az alaphalmaz szűrő hatását valós időben!
              </p>
            </div>
          </div>

          {/* Módválasztó gombok */}
          <div className="flex p-1 bg-white dark:bg-slate-800 rounded-xl border border-rose-200 dark:border-rose-700/50 shadow-sm">
            <button
              onClick={() => setLabMode('restrictions')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                labMode === 'restrictions'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              Kikötés Kalkulátor
            </button>
            <button
              onClick={() => setLabMode('filter')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                labMode === 'filter'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600'
              }`}
            >
              <Boxes className="w-4 h-4" />
              Alaphalmaz Szűrő
            </button>
          </div>
        </div>

        {/* 1. MÓD: KIKÖTÉS KALKULÁTOR */}
        {labMode === 'restrictions' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Vezérlők */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-rose-100 dark:border-rose-800/60 shadow-md space-y-4">
              <div className="flex gap-2">
                {[
                  { id: 'fraction', label: '1 / (x - c)' },
                  { id: 'linear_denom', label: '5 / (ax + b)' },
                  { id: 'sqrt', label: '√(x - c)' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFuncType(t.id as any)}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-bold transition-all ${
                      funcType === t.id
                        ? 'bg-rose-500 text-white shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Paraméter állítók */}
              <div className="space-y-3">
                {funcType !== 'linear_denom' ? (
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      <span>Konstans (c):</span>
                      <span className="font-mono text-rose-600">{paramC}</span>
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="10"
                      value={paramC}
                      onChange={(e) => setParamC(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">x együttható (a):</label>
                      <input
                        type="number"
                        value={paramA}
                        onChange={(e) => setParamA(Number(e.target.value) || 1)}
                        className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-500 block mb-1">Konstans (b):</label>
                      <input
                        type="number"
                        value={paramB}
                        onChange={(e) => setParamB(Number(e.target.value) || 0)}
                        className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-center font-bold text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Tesztelt x bemenet */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Tesztelt x behelyettesítése:
                    </span>
                    <span className="text-sm font-black font-mono text-rose-600 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded border border-rose-200">
                      x = {testInputX}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="10"
                    value={testInputX}
                    onChange={(e) => setTestInputX(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>-5</span>
                    <span>0</span>
                    <span>+10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eredmény kártya */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-rose-100 dark:border-rose-800/60 shadow-md space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-slate-400">Vizsgált kifejezés:</span>
                <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 my-1">
                  {restrictionData.formula}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Kötelező Kikötés:</span>
                  <span className="font-mono font-black text-rose-600 text-sm">{restrictionData.restrictionText}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border">
                  <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Értelmezési Tartomány:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">{restrictionData.domainText}</span>
                </div>
              </div>

              {/* Kiértékelés badge */}
              <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                restrictionData.isForbidden
                  ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 text-rose-900 dark:text-rose-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 text-emerald-900 dark:text-emerald-200'
              }`}>
                {restrictionData.isForbidden ? (
                  <XCircle className="w-8 h-8 text-rose-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                )}
                <div>
                  <div className="font-black text-sm">
                    {restrictionData.isForbidden ? 'KIZÁRT ÉRTÉK! (ÉRTELMETLEN)' : 'ÉRVÉNYES BEMENET! (Kiszámítható)'}
                  </div>
                  <div className="text-xs opacity-90 font-mono">
                    {restrictionData.isForbidden
                      ? `Az x = ${testInputX} nem eleme az É.T.-nek! Nullával való osztás vagy negatív gyök!`
                      : `Helyettesítési érték f(${testInputX}) = ${restrictionData.value}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. MÓD: ALAPHALMAZ SZŰRŐ */}
        {labMode === 'filter' && (
          <div className="space-y-6">
            {/* Egyenlet választó */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {eqPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedEqIndex(idx)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedEqIndex === idx
                      ? 'border-rose-500 bg-white dark:bg-slate-900 shadow-md ring-2 ring-rose-400/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 hover:border-rose-300'
                  }`}
                >
                  <div className="font-mono text-base font-black text-slate-900 dark:text-white">{p.name}</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">{p.rootLabels.join(', ')}</div>
                </button>
              ))}
            </div>

            {/* Alaphalmaz választó gombok */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Válassz Alaphalmazt (A):
              </span>
              {[
                { id: 'R', label: 'A = ℝ (Valós)' },
                { id: 'Q', label: 'A = ℚ (Racionális)' },
                { id: 'Z', label: 'A = ℤ (Egész)' },
                { id: 'N', label: 'A = ℕ (Természetes)' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedBaseSet(s.id as any)}
                  className={`px-4 py-2 rounded-xl font-mono text-sm font-black transition-all ${
                    selectedBaseSet === s.id
                      ? 'bg-rose-500 text-white shadow-md'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Szűrés eredménye */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-rose-100 dark:border-rose-800/60 shadow-md">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase text-slate-400">Megoldáshalmaz ezen az alaphalmazon:</span>
                <div className="text-3xl font-black font-mono text-rose-600 dark:text-rose-400 my-1">
                  M = {filterData.solutionSetText}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Elfogadott gyökök */}
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Megoldáshalmazban szerepel (M eleme):
                  </div>
                  {filterData.accepted.length > 0 ? (
                    <div className="space-y-1 font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
                      {filterData.accepted.map((l, i) => (
                        <div key={i}>✓ {l} ∈ A</div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Egyetlen gyök sem esik bele az alaphalmazba!</div>
                  )}
                </div>

                {/* Kizárt gyökök */}
                <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                  <div className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    Kiesett / Alaphalmazon kívül:
                  </div>
                  {filterData.rejected.length > 0 ? (
                    <div className="space-y-1 text-xs text-rose-700 dark:text-rose-300">
                      {filterData.rejected.map((r, i) => (
                        <div key={i} className="font-mono">
                          ✗ <strong>{r.label}</strong>: {r.reason}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">Minden kapott gyök benne van az alaphalmazban.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </TheorySection>
    
    </TheoryTemplate>
  );
};
