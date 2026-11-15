import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  LastDigitsRulesSvg,
  DigitSumSvg,
  DivisionRemainderSvg,
  RemainderClassesSvg,
  WeekdayCycleSvg,
  ExcursionGroupsSvg
} from './G11DivisibilityRulesFigures';

const fmtInt = (x: number) => x.toLocaleString('hu-HU');

type RuleRow = { d: number; rule: string; part: string; ok: boolean; rem: number };

/** Oszthatósági szabályok egy számjegysorozatra (BigInt nélkül, a szabályokból számolva). */
const checkRules = (s: string): RuleRow[] => {
  const digits = s.split('').map(Number);
  const tail = (k: number) => Number(s.slice(-k));
  const sum = digits.reduce((a, b) => a + b, 0);
  let alt = 0;
  digits
    .slice()
    .reverse()
    .forEach((d, i) => {
      alt += i % 2 === 0 ? d : -d;
    });
  const mod = (m: number) => digits.reduce((r, d) => (r * 10 + d) % m, 0);
  return [
    { d: 2, rule: 'utolsó jegy', part: s.slice(-1), ok: tail(1) % 2 === 0, rem: mod(2) },
    { d: 4, rule: 'utolsó két jegy', part: s.slice(-2), ok: tail(2) % 4 === 0, rem: mod(4) },
    { d: 8, rule: 'utolsó három jegy', part: s.slice(-3), ok: tail(3) % 8 === 0, rem: mod(8) },
    { d: 5, rule: 'utolsó jegy', part: s.slice(-1), ok: tail(1) % 5 === 0, rem: mod(5) },
    { d: 25, rule: 'utolsó két jegy', part: s.slice(-2), ok: tail(2) % 25 === 0, rem: mod(25) },
    { d: 125, rule: 'utolsó három jegy', part: s.slice(-3), ok: tail(3) % 125 === 0, rem: mod(125) },
    { d: 3, rule: 'számjegyek összege', part: String(sum), ok: sum % 3 === 0, rem: mod(3) },
    { d: 9, rule: 'számjegyek összege', part: String(sum), ok: sum % 9 === 0, rem: mod(9) },
    { d: 11, rule: 'váltakozó összeg (hátulról)', part: String(alt), ok: alt % 11 === 0, rem: mod(11) }
  ];
};

const DAYS = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];

export const G11DivisibilityRulesTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szabályellenőrző
  const [numText, setNumText] = useState<string>('11385');
  const clean = numText.replace(/\s/g, '').replace(/^0+(?=\d)/, '');
  const valid = /^\d{1,30}$/.test(clean);
  const rows = valid ? checkRules(clean) : [];

  // Labor II: maradékosztály-óra
  const [m, setM] = useState<number>(7);
  const [n, setN] = useState<number>(100);
  const [startDay, setStartDay] = useState<number>(1);
  const k = Math.floor(n / m);
  const r = n % m;
  const cx = 150;
  const cy = 150;
  const R = 110;
  const classMembers = Array.from({ length: 8 }, (_, i) => r + i * m);

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="oszthatosagi-szabalyok-maradekok"
      title="4. Oszthatósági szabályok, osztási maradékok"
      subtitle="Hosszadalmas osztás nélkül: a szám vége vagy a számjegyek összege dönt. Maradékos osztás és maradékosztályok."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_oszthatosagi_szabalyok_maradekok_tananyag.pdf"
      practiceTitle="Készen állsz az oszthatósági szabályokra és a maradékokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — OSZTHATÓSÁGI SZABÁLYOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-bold">
              <div className="p-2 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-emerald-900 dark:text-emerald-200">
                2 és 5: az utolsó jegy
              </div>
              <div className="p-2 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-sky-900 dark:text-sky-200">
                4 és 25: az utolsó két jegy
              </div>
              <div className="p-2 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center text-violet-900 dark:text-violet-200">
                8 és 125: az utolsó három jegy
              </div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>3 és 9:</strong> a számjegyek összege osztható 3-mal, illetve 9-cel.</li>
              <li><strong>Maradékos osztás:</strong> b = a · k + r, ahol 0 ≤ r &lt; a. Az a-val való osztásnál pontosan a darab maradékosztály van.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: szétosztható-e 11 385 részvény?" badge="Tankönyv 132. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy részvénytársaság alaptőkéje 11 385 darab, egyenként 100 Ft névértékű részvény. Szét lehet-e osztani egyenlően <strong>2, 9 vagy 25</strong> tag között?
            </p>
            <p>Nem kell hosszadalmasan osztani, ha ismerjük az oszthatósági szabályokat:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>2 ∤ 11 385, mert 2 ∤ 5 (az utolsó jegy páratlan);</li>
              <li>9 | 11 385, mert 9 | 1 + 1 + 3 + 8 + 5 = 18;</li>
              <li>25 ∤ 11 385, mert 25 ∤ 85 (az utolsó két jegy).</li>
            </ul>
            <p className="font-bold text-emerald-800">A részvények tehát csak 9 tag között oszthatók szét egyenlően.</p>
          </div>
          <DigitSumSvg />
        </div>
      </TheorySection>

      {/* 2. Szabályok */}
      <TheorySection title="2. Az oszthatósági szabályok" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryTable
            headers={['Osztó', 'Egy természetes szám osztható vele, ha…']}
            rows={[
              ['2', 'az utolsó számjegye osztható 2-vel (0, 2, 4, 6, 8)'],
              ['4', 'az utolsó két jegyéből álló szám osztható 4-gyel'],
              ['8', 'az utolsó három jegyéből álló szám osztható 8-cal'],
              ['5', 'az utolsó számjegye osztható 5-tel (0 vagy 5)'],
              ['25', 'az utolsó két jegyéből álló szám osztható 25-tel (00, 25, 50, 75)'],
              ['125', 'az utolsó három jegyéből álló szám osztható 125-tel'],
              ['3', 'a számjegyeinek összege osztható 3-mal'],
              ['9', 'a számjegyeinek összege osztható 9-cel']
            ]}
          />
          <LastDigitsRulesSvg />
        </div>
        <TheoryCallout type="info" title="Megjegyzés: miért csak a szám vége számít?">
          A 2, 4, 8, 5, 25, 125 a 10, 100, 1000 osztói. Egy tízes számrendszerbeli szám osztható a 10ⁿ egy osztójával, ha az <strong>utolsó n számjegyből</strong> álló szám osztható vele – az előtte álló rész ugyanis 10ⁿ többszöröse. Pl. 11 385 = 11 · 1000 + 385, és 8 | 1000.
        </TheoryCallout>
        <TheoryCard title="Szám felírása ismeretlen számjeggyel" badge="Jelölés" badgeColor="teal">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li><strong>123a5</strong>: ötjegyű szám, amelynek a 4. számjegyét nem ismerjük, ezt a-val jelöljük.</li>
            <li><strong>abab</strong>: négyjegyű szám, amelyben az 1. és a 3., valamint a 2. és a 4. számjegy azonos.</li>
            <li>Pl. 5Y283 osztható 9-cel ⟺ 5 + Y + 2 + 8 + 3 = 18 + Y osztható 9-cel ⟺ <strong>Y = 0 vagy Y = 9</strong>.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 3. Kidolgozott feladat 2 */}
      <TheorySection title="3. Kidolgozott feladat: Gólyák és Végzősök" badge="2. kidolgozott feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Kiránduláson 9. osztályosok (Gólyák) és 12. osztályosok (Végzősök) vesznek részt; a csoportok létszáma 15, 13, 12, 14, 16, 19 fő. Az egyik csoportvezető megfigyelte, hogy a <strong>többi</strong> csoportban összesen <strong>kétszer annyi Gólya</strong> van, mint Végzős. Melyik csoport vezetője ő?
            </p>
            <p>
              Ha a Végzősök száma 1 egység, a Gólyáké 2 egység, összesen 3 egység: a többi csoport létszámának összege <strong>3 többszöröse</strong>. A csoportlétszámok 3-mal vett maradékai: 0; 1; 0; 2; 1; 1.
            </p>
            <p>
              A maradékok összege 5, ebből kell egy csoport maradékát elhagyni úgy, hogy 3-mal osztható összeg maradjon: csak a 2-es maradékú <strong>14 fős</strong> csoport jó. A többi csoportban 75 diák van: <strong>50 Gólya és 25 Végzős</strong>.
            </p>
          </div>
          <ExcursionGroupsSvg />
        </div>
      </TheorySection>

      {/* 4. Maradékos osztás */}
      <TheorySection title="4. Maradékos osztás és maradékosztályok" badge="Elmélet" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              Legyenek a és b természetes számok. Ha a osztója b-nek, a maradék <strong>0</strong>; ha nem osztója, a maradék 0-tól különböző pozitív egész.
            </p>
            <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center font-mono font-bold text-sky-900">
              b = a · k + r, &nbsp; r ∈ {'{'}0; 1; 2; …; a − 1{'}'}
            </div>
            <p className="text-xs text-slate-500">b az osztandó, a az osztó, k a hányados, r a maradék.</p>
            <p>
              Pl. 1200 Ft-ból 350 Ft-os csokikat veszünk: 3 darab jön ki, 150 Ft marad: <strong>1200 = 3 · 350 + 150</strong>.
            </p>
            <DivisionRemainderSvg />
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              Az osztási maradékok szerint <strong>maradékosztályok</strong> jönnek létre: két szám ugyanabba az osztályba tartozik, ha ugyanannyi a maradékuk. Pozitív egész a-val osztva <strong>pontosan a darab</strong> maradékosztály van.
            </p>
            <p>
              5-tel osztva a maradék 0, 1, 2, 3, 4 lehet: minden természetes szám felírható az <strong>5k, 5k + 1, 5k + 2, 5k + 3, 5k + 4</strong> alakok egyikében.
            </p>
            <RemainderClassesSvg />
          </div>
        </div>
      </TheorySection>

      {/* 5. Naptár */}
      <TheorySection title="5. Alkalmazás: a hét napjai és a 7-es maradék" badge="Feladat" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A hét 7 naponként ismétlődik, ezért egy dátum napját a 7-tel vett maradék határozza meg.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>5. a)</strong> Ma kedd van. 100 = 7 · 14 + 2, tehát 100 nap múlva a kedd után 2 nappal: <strong>csütörtök</strong>.</li>
              <li><strong>5. b)</strong> Szökőévben január 1. szombat. Április 1-ig 31 + 29 + 31 = 91 nap telik el, 91 = 7 · 13, maradék 0: április 1. is <strong>szombat</strong>.</li>
            </ul>
            <TheoryCallout type="tip" title="Szökőév">
              Szökőévben 366 nap van, a február 29 napos. Ezért a szökőévekben a márciusi dátumok napja egy nappal „később” jön, mint egy közönséges évben.
            </TheoryCallout>
          </div>
          <WeekdayCycleSvg />
        </div>
      </TheorySection>

      {/* 6. Feladatok */}
      <TheorySection title="6. Tankönyvi feladatok – ellenőrzött eredmények" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryCard title="Órai feladatok" badge="Feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>1.</strong> A 2, 5, 7, 8 jegyekből (mindegyik egyszer) képzett négyjegyű számok közül osztható a) 2-vel: 12 (2-re vagy 8-ra végződik, 2 · 3!); b) 9-cel: 0 (a jegyek összege 22); c) 25-tel: 4 (25-re vagy 75-re végződik); d) 4-gyel: 6 (28, 52, 72 végződés).</li>
              <li><strong>3.</strong> A = 4Y13Y, B = Y6Y52, C = 104YY, D = 5Y283: 4-gyel biztosan osztható B (52), biztosan nem D (83); 125-tel egyik sem lehet osztható; 3-mal egyikről sem dönthető el. D 9-cel osztható, ha Y = 0 vagy 9. B 8-cal osztható, ha a 3. jegye páratlan (152, 352, 552, 752, 952).</li>
              <li><strong>4.</strong> a) 35; b) 10, 30, 50, 70 vagy 90; c) pl. 117, 157, …, 997; d) pl. 37, 79 (42k + 37).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladatok és ráadás" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> 1x687y osztható a) 4-gyel: y = 2 vagy 6; b) 3-mal: x + y = 2, 5, 8, 11, 14 vagy 17; c) 8-cal: y = 2 (x bármi); d) 9-cel: x + y = 5 vagy 14.</li>
              <li><strong>HF 2.</strong> Négyjegyű számok: 6-tal osztva 5 maradékot ad 1500, 7-tel osztva 6 maradékot ad 1286.</li>
              <li><strong>Ráadás – 7:</strong> hagyjuk el az utolsó jegyet, és vonjuk le a kétszeresét: 805 → 80 − 10 = 70 ✓, 959 → 95 − 18 = 77 ✓; 352 és 410 nem osztható 7-tel.</li>
              <li><strong>Ráadás – 11:</strong> a számjegyek váltakozó összege: 572 → 5 − 7 + 2 = 0 ✓; 352, 3190, 5599, 6391 mind osztható 11-gyel; a 247 maradéka 2 − 4 + 7 = 5. A 10⁴ − 1, 10⁵ + 1, 10⁹ + 1 osztható 11-gyel.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: a 4-es és a 8-as szabály keverése" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 4-hez két, a 8-hoz három jegy kell!"
          wrong="A 3132 osztható 8-cal, mert 32 osztható 8-cal."
          wrongExplanation="A 8-cal való oszthatóságnál az utolsó HÁROM jegyet kell nézni: 132 = 8 · 16 + 4, tehát 3132 nem osztható 8-cal (csak 4-gyel)."
          correct="8 | 3152, mert 8 | 152 (152 = 8 · 19)"
          correctExplanation="Az utolsó két jegy a 100 osztóihoz (4, 25), az utolsó három jegy az 1000 osztóihoz (8, 125) kell. Hasonlóan: a számjegyösszeg-szabály csak a 3-ra és a 9-re igaz, a 27-re nem!"
          tip="Ellenőrizd, melyik 10-hatványnak osztója a vizsgált szám: 2, 5 | 10; 4, 25 | 100; 8, 125 | 1000."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: Szabályellenőrző" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a vizsgált természetes szám (legfeljebb 30 jegy)</label>
              <input type="text" inputMode="numeric" value={numText} onChange={(e) => setNumText(e.target.value)} className="w-64 px-3 py-1.5 rounded-lg border border-slate-300 font-mono" aria-label="a vizsgált szám" />
            </div>
            {['11385', '3132', '3152', '572', '959', '168728', '123456789'].map((v) => (
              <button
                key={v}
                onClick={() => setNumText(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${clean === v ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'}`}
              >
                {v}
              </button>
            ))}
          </div>
          {!valid ? (
            <div className="text-sm font-bold text-rose-700">Csak számjegyeket írj be (legfeljebb 30-at)!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-emerald-50 text-emerald-900">
                  <tr>
                    <th className="p-2 text-left">Osztó</th>
                    <th className="p-2 text-left">Mit vizsgálunk?</th>
                    <th className="p-2 text-left">Érték</th>
                    <th className="p-2 text-left">Döntés</th>
                    <th className="p-2 text-right">Maradék</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.d} className="border-t border-slate-200">
                      <td className="p-2 font-bold">{row.d}</td>
                      <td className="p-2">{row.rule}</td>
                      <td className="p-2 font-mono">{row.part}</td>
                      <td className={`p-2 font-bold ${row.ok ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {row.ok ? `${row.d} | ${clean}` : `${row.d} ∤ ${clean}`}
                      </td>
                      <td className="p-2 text-right font-mono">{row.rem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="text-xs text-slate-500">
            A 11-es sor a ráadás szabálya: a számjegyeket hátulról váltakozó előjellel adjuk össze. A maradékot a program maradékos osztással számolja – figyeld meg, hogy 3-mal és 9-cel a maradék megegyezik a számjegyösszeg maradékával!
          </p>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: Maradékosztály-óra" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">osztó (a maradékosztályok száma): {m}</label>
              <input type="range" min="2" max="12" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-purple-600" aria-label="osztó" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a vizsgált szám (vagy eltelt napok): {n}</label>
              <input type="range" min="0" max="400" value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="a vizsgált szám" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto h-auto">
              <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e9d5ff" strokeWidth="3" />
              {Array.from({ length: m }, (_, i) => {
                const ang = -Math.PI / 2 + (i * 2 * Math.PI) / m;
                const x = cx + R * Math.cos(ang);
                const y = cy + R * Math.sin(ang);
                const active = i === r;
                const label = m === 7 ? DAYS[(startDay + i) % 7].slice(0, 3) : `${m}k${i ? ` + ${i}` : ''}`;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r="22" fill={active ? '#9333ea' : '#faf5ff'} stroke="#9333ea" strokeWidth="1.5" />
                    <text x={x} y={y + 4} fontSize={m > 9 ? 8 : 9} textAnchor="middle" fontWeight="bold" fill={active ? '#ffffff' : '#581c87'}>{label}</text>
                  </g>
                );
              })}
              <text x={cx} y={cy - 6} fontSize="16" textAnchor="middle" fontWeight="bold" fill="#0f172a">{n}</text>
              <text x={cx} y={cy + 16} fontSize="12" textAnchor="middle" fill="#6b21a8">maradék: {r}</text>
            </svg>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 font-mono font-bold text-purple-900 text-center">
                {n} = {m} · {k} + {r}
              </div>
              <div>
                A {n} a <strong>{m}k{r ? ` + ${r}` : ''}</strong> alakú számok osztályába tartozik. Ugyanide tartozik: {classMembers.map(fmtInt).join(', ')}, …
              </div>
              {m === 7 && (
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-600">Naptár mód (7-tel osztva): ma</div>
                  <div className="flex flex-wrap gap-1">
                    {DAYS.map((d, i) => (
                      <button
                        key={d}
                        onClick={() => setStartDay(i)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${startDay === i ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800 hover:bg-purple-100'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="font-bold text-purple-800">
                    Ha ma {DAYS[startDay]} van, {n} nap múlva {DAYS[(startDay + r) % 7]} lesz.
                  </div>
                </div>
              )}
              {m !== 7 && (
                <button onClick={() => { setM(7); setN(100); setStartDay(1); }} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200">
                  Tankönyvi feladat: kedd + 100 nap
                </button>
              )}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default G11DivisibilityRulesTheory;
