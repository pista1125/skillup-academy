import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Solid3DViewer, makeSphere, Vec3 } from '../shared/Solid3DViewer';
import {
  OrangeSectionSvg,
  SphereTermsSvg,
  SectionTriangleSvg,
  MelonSlicesSvg,
  CubeSphereSvg,
  DomeSvg
} from './SphereSectionsFigures';

const fmt = (x: number, d = 2) => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');

const circle3 = (r: number, y: number, n = 48): Vec3[] =>
  Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n;
    return [r * Math.cos(t), y, r * Math.sin(t)] as Vec3;
  });

export const SphereSectionsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: metszősík csúszkával
  const [R, setR] = useState<number>(4);
  const [dRatio, setDRatio] = useState<number>(0.5);
  const d = R * dRatio;
  const r = Math.sqrt(Math.max(0, R * R - d * d));

  const sphere = useMemo(() => makeSphere(R, 6, 6), [R]);
  const polygons = useMemo(
    () => (r > 0.01 ? [{ points: circle3(r, d), fill: '#10b981', stroke: '#059669', opacity: 0.35 }] : []),
    [r, d]
  );
  const extras = useMemo(
    () => [
      { from: [0, 0, 0] as Vec3, to: [0, d, 0] as Vec3, color: '#dc2626', width: 2.5, label: 'd' },
      { from: [0, d, 0] as Vec3, to: [r, d, 0] as Vec3, color: '#059669', width: 2.5, label: 'r' },
      { from: [0, 0, 0] as Vec3, to: [r, d, 0] as Vec3, color: '#2563eb', width: 2.5, label: 'R' }
    ],
    [r, d]
  );
  const pointLabels = useMemo(
    () => [
      { at: [-0.25, -0.35, 0] as Vec3, text: 'O' },
      { at: [-0.3, d + 0.2, 0] as Vec3, text: 'Q' },
      { at: [r + 0.3, d + 0.2, 0] as Vec3, text: 'P' }
    ],
    [r, d]
  );

  // Labor II: gömbsüveg adataiból a gömb sugara (kupola)
  const [capR, setCapR] = useState<number>(25);
  const [capH, setCapH] = useState<number>(16);
  const sphereR = (capR * capR + capH * capH) / (2 * capH);
  const centerDist = sphereR - capH;
  // rajz
  const k = 150 / Math.max(2 * sphereR, 1);
  const cx = 170;
  const baseY = 70 + capH * k;
  const cy = baseY + centerDist * k;

  return (
    <TheoryTemplate
      topicId="g12-tergeometria"
      subtopicId="a-gomb-a-gomb-szeletelese"
      title="6. A gömb, a gömb szeletelése"
      subtitle="Mekkora kört kapunk, ha egy narancsot nem a közepén vágunk ketté? A gömb síkmetszetei, a főkör és a gömbsüveg."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TANANYAG"
      themeColor="sky"
      pdfFilename="12_osztaly_gomb_szeletelese_tananyag.pdf"
      practiceTitle="Készen állsz a gömb szeletelésére?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A GÖMB SÍKMETSZETE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center">
              <span className="font-mono text-base font-black text-sky-900 dark:text-sky-200">R² = r² + d² ⇒ r = √(R² − d²)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Bármely metsző sík a gömböt <strong>körben</strong>, a gömbfelületet <strong>körvonalban</strong> metszi.
              </li>
              <li>
                R: gömbsugár, r: a metszetkör sugara, d: a metsző sík távolsága a középponttól.
              </li>
              <li>
                Ha d = 0, a metszet a <strong>főkör</strong> (r = R). A síkmetszet a gömböt két <strong>gömbsüvegre</strong> bontja.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a kettévágott narancs" badge="Tankönyv 16. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy <strong>8 cm átmérőjű</strong> narancsot kettévágtunk, de nem lett egyforma a két rész, mert a középpontjától{' '}
              <strong>2 cm-re</strong> vágtuk el. A vágás mentén keletkező metszési felületek kör alakúak. Mekkora a metszetkör sugara?
            </p>
            <p>
              A narancsot <strong>gömbbel modellezzük</strong> (tökéletesen gömb alakú narancs nincs, de a gömb jó matematikai modell).
            </p>
            <p>
              Egy pont és egy sík távolsága a pontból a síkra állított merőleges szakasz hossza. Legyen az O középpont merőleges vetülete a
              metszési felületen Q, a gömbfelület és a sík egy közös pontja P. Az OQP háromszög Q-nál derékszögű:
            </p>
            <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 text-center font-mono font-bold text-sky-900">
              r² = 4² − 2² = 16 − 4 = 12 ⇒ r = √12 ≈ 3,5 cm
            </div>
          </div>
          <OrangeSectionSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. A gömb és a gömb síkmetszetei" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <SphereTermsSvg />
          <SectionTriangleSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Gömbfelület és gömb" badge="Definíció" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              A tér egy adott pontjától adott távolságra lévő pontok halmaza a <strong>gömbfelület</strong>. A gömbfelület által határolt test a{' '}
              <strong>gömb</strong>. Az adott pont a <strong>középpont</strong>, az adott távolság a gömb <strong>sugara</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Síkmetszet és főkör" badge="Tétel" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Bármely metsző sík a gömböt egy <strong>körben</strong>, a gömbfelületet egy <strong>körvonalban</strong> metszi. Ha a sík a
              középponton megy át, a kör a <strong>főkör</strong>: sugara egyenlő a gömb sugarával.
            </p>
          </TheoryCard>
          <TheoryCard title="Gömbsüveg" badge="Fogalom" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              A gömböt bármely síkmetszete <strong>két gömbsüvegre</strong> bontja. Ha a metszet főkör, a két rész egybevágó{' '}
              <strong>félgömb</strong>; különben egy kisebb és egy nagyobb rész keletkezik, magasságuk R − d és R + d.
            </p>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="A derékszögű háromszög">
          Ha a síkmetszet nem főkör, a metszetkör sugara kisebb a gömb sugaránál. Ekkor a gömb sugara (R), a kimetszett kör sugara (r) és a
          metsző síknak a középponttól való távolsága (d) egy <strong>derékszögű háromszöget</strong> határoz meg, amelynek átfogója R.
        </TheoryCallout>
        <TheoryTable
          headers={['A sík távolsága', 'Közös rész', 'A metszet sugara']}
          rows={[
            ['d = 0', 'főkör', 'r = R'],
            ['0 < d < R', 'kör (nem főkör)', 'r = √(R² − d²) < R'],
            ['d = R', 'egyetlen pont (érintősík)', 'r = 0'],
            ['d > R', 'nincs közös pont', '–']
          ]}
        />
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A dinnye szeletei" badge="1. feladat" badgeColor="emerald">
            <MelonSlicesSvg className="w-full h-auto mb-3" />
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>
                Egy gömb alakú dinnyét párhuzamos vágásokkal 5 egyenlő, 4 cm magas részre vágtunk. Mekkora sugarú körök határolják a részeket?
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Az átmérő 5 · 4 = 20 cm, így R = 10 cm.</li>
                <li>A 4 vágósík a középponttól 6, 2, 2, 6 cm-re van.</li>
                <li>
                  r₁ = √(10² − 6²) = √64 = <strong>8 cm</strong>, r₂ = √(10² − 2²) = √96 ≈ <strong>9,8 cm</strong>.
                </li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="B) A gömb sugara a metszetből" badge="2. feladat" badgeColor="sky">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>Egy gömböt a középpontjától 3 cm-re lévő síkkal elmetszve 4 cm sugarú kört kapunk.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  a) R = √(3² + 4²) = √25 = <strong>5 cm</strong>.
                </li>
                <li>
                  b) A vele párhuzamos, tőle 1 cm-re lévő síkok a középponttól 2 cm-re és 4 cm-re vannak: r = √(25 − 4) = √21 ≈{' '}
                  <strong>4,58 cm</strong>, illetve r = √(25 − 16) = <strong>3 cm</strong>.
                </li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="C) A kocka éleit érintő gömb" badge="3. feladat" badgeColor="amber">
            <CubeSphereSvg className="w-full h-auto mb-3" />
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>
                A gömb középpontja a 8 cm élű kocka középpontja, és a gömb érinti a kocka éleit. Mekkora a kocka lapjain, de a gömbön kívül lévő
                síkidomok összterülete?
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A középpont az élektől a lapátló felével van: R = 8√2 / 2 = 4√2 ≈ 5,66 cm.</li>
                <li>A lapok síkja d = 4 cm-re van, a metszetkör sugara √(32 − 16) = 4 cm: a lapba írt kör.</li>
                <li>
                  Egy lapon a gömbön kívüli rész 64 − 16π cm², hat lapon <strong>384 − 96π ≈ 82,4 cm²</strong>.
                </li>
              </ul>
            </div>
          </TheoryCard>
          <TheoryCard title="D) A Ráktérítő" badge="4. feladat" badgeColor="purple">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>
                A Ráktérítő az északi szélesség 23°26′ mentén halad: a Föld középpontját a Ráktérítő pontjaival összekötő szakasz 23°26′-es szöget
                zár be az Egyenlítő síkjával. A Föld sugara 6371 km.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>A Ráktérítő síkja párhuzamos az Egyenlítő síkjával; a derékszögű háromszögben a metszetkör sugara a szög melletti befogó.</li>
                <li>
                  r = 6371 · cos 23°26′ ≈ <strong>5846 km</strong>
                </li>
                <li>
                  hossza: 2rπ ≈ <strong>36 700 km</strong> (az Egyenlítő ≈ 40 030 km).
                </li>
              </ul>
            </div>
          </TheoryCard>
        </div>
        <TheoryCard title="E) Ráadás: az Amundsen–Scott-állomás kupolája" badge="Ráadás" badgeColor="rose">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <DomeSvg />
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>A gömbsüveg alakú kupola alapkörének átmérője 50 m, magassága 16 m. Mekkora sugarú gömbből származik?</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Az alapkör sugara 25 m, a középpont a síktól R − 16 távolságra van.</li>
                <li>Pitagorasz-tétel: (R − 16)² + 25² = R².</li>
                <li>R² − 32R + 256 + 625 = R² ⇒ 32R = 881 ⇒ <strong>R ≈ 27,5 m</strong>.</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: a sugarak nem vonhatók ki egymásból" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="r = R − d ?"
          wrong="r = R − d (pl. R = 4, d = 2 ⇒ r = 2 cm)"
          wrongExplanation="R − d a kisebbik gömbsüveg magassága, nem a metszetkör sugara! A narancsnál r ≈ 3,5 cm, nem 2 cm."
          correct="r = √(R² − d²) (pl. √(16 − 4) = √12 ≈ 3,5 cm)"
          correctExplanation="Az R átfogójú, d és r befogójú derékszögű háromszögre a Pitagorasz-tételt kell alkalmazni."
          tip="Átmérő vagy sugár? Ha átmérőt adnak meg (narancs 8 cm, dinnye 20 cm), előbb felezz!"
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Metszősík csúszkával" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Gömbsugár R: {fmt(R, 1)} cm</label>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="0.5"
                  value={R}
                  onChange={(e) => setR(Number(e.target.value))}
                  className="w-full accent-sky-600"
                  aria-label="gömbsugár"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  A sík távolsága a középponttól d: {fmt(d, 2)} cm
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={dRatio}
                  onChange={(e) => setDRatio(Number(e.target.value))}
                  className="w-full accent-rose-600"
                  aria-label="sík távolsága"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <div className="text-[11px] text-slate-500">metszetkör sugara r</div>
                  <div className="font-mono font-black text-emerald-900">{fmt(r)} cm</div>
                </div>
                <div className="bg-sky-50 rounded-xl p-2 border border-sky-200">
                  <div className="text-[11px] text-slate-500">metszet területe r²π</div>
                  <div className="font-mono font-black text-sky-900">{fmt(r * r * Math.PI)} cm²</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">kisebb gömbsüveg magassága</div>
                  <div className="font-mono font-black text-amber-900">{fmt(R - d)} cm</div>
                </div>
                <div className="bg-violet-50 rounded-xl p-2 border border-violet-200">
                  <div className="text-[11px] text-slate-500">nagyobb gömbsüveg magassága</div>
                  <div className="font-mono font-black text-violet-900">{fmt(R + d)} cm</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 font-mono text-sm text-slate-700">
                r = √(R² − d²) = √({fmt(R * R)} − {fmt(d * d)}) = <strong>{fmt(r)} cm</strong>
              </div>
              <p className="text-xs text-slate-500 italic">
                {d < 0.005
                  ? 'd = 0: a sík a középponton megy át, a metszet főkör (r = R), a két rész egybevágó félgömb.'
                  : d > R - 0.005
                    ? 'd = R: a sík érinti a gömböt, egyetlen közös pontjuk van.'
                    : 'Minél távolabb van a sík a középponttól, annál kisebb a kimetszett kör.'}
              </p>
            </div>
            <Solid3DViewer solid={sphere} polygons={polygons} extras={extras} pointLabels={pointLabels} edgeColor="#93c5fd" />
          </div>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Melyik gömbből származik a gömbsüveg?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Alapkör sugara ϱ: {fmt(capR, 1)} m</label>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="0.5"
                  value={capR}
                  onChange={(e) => setCapR(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="alapkör sugara"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Süveg magassága m: {fmt(capH, 1)} m</label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="0.5"
                  value={capH}
                  onChange={(e) => setCapH(Number(e.target.value))}
                  className="w-full accent-amber-600"
                  aria-label="süveg magassága"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
                <div>1. Pitagorasz: (R − m)² + ϱ² = R²</div>
                <div>2. −2Rm + m² + ϱ² = 0 ⇒ R = (ϱ² + m²) / (2m)</div>
                <div>
                  3. R = ({fmt(capR * capR, 2)} + {fmt(capH * capH, 2)}) / {fmt(2 * capH, 1)} = <strong>{fmt(sphereR)} m</strong>
                </div>
                <div className="text-xs text-slate-500 pt-1">
                  {capH < sphereR - 0.01
                    ? `A süveg kisebb a félgömbnél: a középpont ${fmt(centerDist)} m-rel az alapsík alatt van.`
                    : capH > sphereR + 0.01
                      ? `A süveg nagyobb a félgömbnél: a középpont ${fmt(-centerDist)} m-rel az alapsík fölött van.`
                      : 'm = ϱ: a süveg éppen félgömb.'}
                </div>
              </div>
              <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
                ϱ = 25 m, m = 16 m ⇒ R = 881 / 32 ≈ 27,5 m (a kupola). ϱ = 4 m, m = 4 m ⇒ R = 4 m (félgömb).
              </TheoryCallout>
            </div>
            <svg viewBox="0 0 340 260" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
              <circle cx={cx} cy={cy} r={sphereR * k} fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="5 4" />
              <path
                d={`M ${cx - capR * k} ${baseY} A ${sphereR * k} ${sphereR * k} 0 ${capH > sphereR ? 1 : 0} 1 ${cx + capR * k} ${baseY} Z`}
                fill="rgba(147,51,234,0.15)"
                stroke="#9333ea"
                strokeWidth="2.2"
              />
              <line x1={cx} y1={cy} x2={cx + capR * k} y2={baseY} stroke="#2563eb" strokeWidth="1.8" />
              <line x1={cx} y1={baseY - capH * k} x2={cx} y2={cy} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx={cx} cy={cy} r="3" fill="#0f172a" />
              <text x={cx - 14} y={cy + 4} fontSize="12" fontWeight="bold" fill="#0f172a">O</text>
              <text x={cx + (capR * k) / 2} y={baseY - 6} fontSize="11" fontWeight="bold" fill="#0f172a" textAnchor="middle">ϱ</text>
              <text x={cx - 8} y={baseY - (capH * k) / 2} fontSize="11" fontWeight="bold" fill="#dc2626" textAnchor="end">m</text>
              <text x={cx + (capR * k) / 2 + 12} y={(cy + baseY) / 2 + 12} fontSize="11" fontWeight="bold" fill="#2563eb">R</text>
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SphereSectionsTheory;
