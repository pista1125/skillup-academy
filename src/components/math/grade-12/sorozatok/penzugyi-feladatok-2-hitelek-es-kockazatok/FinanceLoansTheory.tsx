import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { LoanCycleSvg, AnnuityTableSvg, DebtStepsSvg, AmortizationBarsSvg, CurrencyRiskSvg } from './FinanceLoansFigures';
import { SText, fmtHu, fmtFt, S_BLUE, S_AMBER } from '../a-mertani-sorozat-elso-n-tagjanak-osszege/seqKit';

const FREQ: { m: number; name: string }[] = [
  { m: 1, name: 'évente' },
  { m: 4, name: 'negyedévente' },
  { m: 12, name: 'havonta' }
];

const annuity = (T: number, q: number, n: number) => (q === 1 ? T / n : (T * q ** n * (q - 1)) / (q ** n - 1));

export const FinanceLoansTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: törlesztőtábla
  const [loan, setLoan] = useState<number>(2000000);
  const [p, setP] = useState<number>(10);
  const [years, setYears] = useState<number>(3);
  const [m, setM] = useState<number>(1);
  // Labor II: devizahitel
  const [eur, setEur] = useState<number>(10000);
  const [rate0] = useState<number>(380);
  const [rate, setRate] = useState<number>(380);
  const [pe, setPe] = useState<number>(4);

  const n = years * m;
  const q = 1 + p / 100 / m;
  const x = annuity(loan, q, n);
  const table = useMemo(() => {
    const rows: { k: number; debt: number; interest: number; principal: number; rest: number }[] = [];
    let T = loan;
    for (let k = 1; k <= n; k++) {
      const interest = T * (q - 1);
      const principal = x - interest;
      const rest = Math.max(0, T - principal);
      rows.push({ k, debt: T, interest, principal, rest: Math.abs(rest) < 0.5 ? 0 : rest });
      T = rest;
    }
    return rows;
  }, [loan, q, n, x]);
  const totalPaid = x * n;

  const qe = 1 + pe / 100 / 12;
  const xEur = annuity(eur, qe, 60);
  const ftNow = xEur * rate;
  const ftStart = xEur * rate0;

  return (
    <TheoryTemplate
      topicId="g12-sorozatok"
      subtopicId="penzugyi-feladatok-2-hitelek-es-kockazatok"
      title="9. Pénzügyi feladatok II. – hitelek és kockázatok"
      subtitle="Egyösszegű visszafizetés, csak kamat, egyenlő törlesztőrészletek mértani sorozattal; tőke- és kamatrész; a befektetések és hitelek kockázatai."
      badge="12. OSZTÁLY • II. SOROZATOK • TANANYAG"
      themeColor="rose"
      pdfFilename="12_osztaly_penzugyi_feladatok_hitelek_tananyag.pdf"
      practiceTitle="Készen állsz a hitelszámításokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — EGYENLŐ TÖRLESZTŐRÉSZLETEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
              <span className="font-mono text-base font-black text-rose-900 dark:text-rose-200">
                T · qⁿ = x · (qⁿ⁻¹ + … + q + 1) = x · (qⁿ − 1)/(q − 1)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Minden időszak végén előbb a kamat adódik a tartozáshoz, utána csökkenti a törlesztőrészlet.</li>
              <li>Törlesztőrészlet: x = T · qⁿ · (q − 1)/(qⁿ − 1); a részletben kamatrész + tőkerész van.</li>
              <li>Nem az egyösszegű tartozás n-ed része: a kifizetett rész után a bank már nem számol kamatot.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Elmélet: hitelfelvétel és törlesztés" badge="Tankönyv 68. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hitelfelvételkor szerződés szabályozza, milyen ütemben és kamatozással kell visszafizetni a felvett tőkét és kamatait. Minden időtartam végén{' '}
              <strong>először az esedékes kamat adódik a tartozáshoz</strong>, majd a törlesztőrészlet befizetésével csökken a tartozás.
            </p>
            <p>
              Gyakori, hogy egyenlő időközönként és <strong>egyenlő részletekben</strong> fizetünk. A bank a már kifizetett rész után nem számol kamatot, ezért a részlet
              meghatározása az egyre csökkenő tartozás figyelembevételével, <strong>mértani sorozattal</strong> történik.
            </p>
            <TheoryCallout type="info" title="Tőke és kamat külön">
              A törvény külön kezeli a tőkét és a kamatot: minden törlesztéskor kifizetjük az adott időszak kamatát, és a tőkéből is törlesztünk (enélkül a tartozás sosem
              fogyna el).
            </TheoryCallout>
          </div>
          <LoanCycleSvg />
        </div>
      </TheorySection>

      <TheorySection title="2. Kidolgozott feladat: Tamás hitele" badge="Tankönyv 68. o." badgeColor="amber">
        <AnnuityTableSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
            <li>2 000 000 Ft hitel 3 évre, évi 10%.</li>
            <li>
              a) Egy összegben 3 év múlva: 2 000 000 · 1,1³ = <strong>2 662 000 Ft</strong>.
            </li>
            <li>b) Évente 3 egyenlő x részlet; a 3. év végén a tartozás 0: 2 662 000 − 1,21x − 1,1x − x = 0.</li>
            <li>
              3,31x = 2 662 000 ⇒ x ≈ <strong>804 230 Ft</strong>.
            </li>
            <li>Visszafizetve 3 · 804 230 = 2 412 690 Ft – jóval kevesebb, mint 2 662 000 Ft, mert a befizetett részletek után már nincs kamat.</li>
            <li>Általánosan: 2 000 000 · 1,1³ = x(1,1² + 1,1 + 1) = x · (1,1³ − 1)/(1,1 − 1).</li>
          </ul>
          <DebtStepsSvg />
        </div>
      </TheorySection>

      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="orange">
        <TheoryTable
          headers={['Feladat', 'Megoldás', 'Eredmény']}
          rows={[
            ['1. 2 000 000 Ft, 1 év, 8%, egy összegben', '2 000 000 · 1,08', '2 160 000 Ft'],
            ['2. 2 000 000 Ft, 2 év, 8%; 1. év végén csak a kamat', '1. év: 2 000 000 · 0,08; 2. év: 2 000 000 · 1,08', '160 000 Ft, majd 2 160 000 Ft'],
            ['3. 2 000 000 Ft, 3 év, 8%; 1–2. év végén 500 000 Ft', '(2 160 000 − 500 000) · 1,08 = 1 792 800; (1 292 800) · 1,08', '1 396 224 Ft a 3. év végén'],
            ['5. Kálmán: 1 000 000 Ft, 1 év, évi 12%, negyedéves részletek', 'q = 1,03: x = 1 000 000 · 1,03⁴ · 0,03/(1,03⁴ − 1)', '≈ 269 027 Ft'],
            ['HF 1. Judit: 350 000 Ft, 1. év végén csak kamat: 38 500 Ft', '38 500 : 350 000 = 0,11; 2. év: 350 000 · 1,11', '11%; 388 500 Ft']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <TheoryCard title="Antal törlesztőtáblája (4. feladat)" badge="200 000 Ft, 10%, 4 év" badgeColor="sky">
            <AmortizationBarsSvg className="w-full h-auto mb-3" />
            <TheoryTable
              headers={['év vége', 'tőketartozás', 'kamat', 'tőketörlesztés', 'marad']}
              rows={[
                ['1.', '200 000', '20 000', '43 095', '156 905'],
                ['2.', '156 905', '≈ 15 691', '≈ 47 404', '≈ 109 501'],
                ['3.', '≈ 109 501', '≈ 10 950', '≈ 52 145', '≈ 57 356'],
                ['4.', '≈ 57 356', '≈ 5 736', '≈ 57 359', '≈ −3 (≈ 0)']
              ]}
            />
            <p className="text-xs text-slate-500 mt-2">
              A pontos részlet ≈ 63 094,16 Ft; a felfelé kerekített 63 095 Ft-os részlettel a 4. évben a tőkerész (57 359 Ft) 3 Ft-tal több a maradék tőkénél (57 356 Ft), vagyis Antal kb. 3 Ft-ot túlfizet.
            </p>
          </TheoryCard>
          <TheoryCard title="Szilárd hitele (HF 2.)" badge="500 000 Ft, 13%, 3 év" badgeColor="purple">
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1 mb-2">
              <li>x = 500 000 · 1,13³ · 0,13/(1,13³ − 1) ≈ <strong>211 761 Ft</strong>.</li>
            </ul>
            <TheoryTable
              headers={['év vége', 'tőketartozás', 'kamat', 'tőketörlesztés', 'marad']}
              rows={[
                ['1.', '500 000', '65 000', '≈ 146 761', '≈ 353 239'],
                ['2.', '≈ 353 239', '≈ 45 921', '≈ 165 840', '≈ 187 399'],
                ['3.', '≈ 187 399', '≈ 24 362', '≈ 187 399', '0']
              ]}
            />
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Elmélet: kockázatok" badge="Tankönyv 69. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Befektetési döntéseknél a kamatok (hozamok) mellett a <strong>kockázatokat</strong> is figyelembe kell venni: nem ismerjük előre a később lezajló gazdasági
              folyamatokat, amelyek a pénz vagy egy befektetés értékét meghatározzák.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Kockázatos lehet külföldi pénznemben hitelt felvenni, ha forintban kapjuk a fizetésünket – az árfolyam jelentősen változhat.</li>
              <li>Kockázatos lehet változékony értékű termékbe fektetni (deviza, részvény, startup).</li>
              <li>
                A kockázat matematikai mérésére a <strong>szórás</strong> ad lehetőséget (lásd a statisztika fejezetet).
              </li>
            </ul>
          </div>
          <CurrencyRiskSvg />
        </div>
      </TheorySection>

      <TheorySection title="5. Tipikus hiba: a részlet nem az egyösszegű tartozás harmada" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Egyenlő részletek ≠ (T · qⁿ) / n"
          wrong="Tamás részlete 2 662 000 : 3 ≈ 887 333 Ft."
          wrongExplanation="Így úgy számolnánk, mintha a teljes 2 millió Ft mindhárom évben kamatozna. Valójában az első befizetés után már csak a csökkentett tartozás kamatozik."
          correct="2 662 000 = x(1,1² + 1,1 + 1) = 3,31x ⇒ x ≈ 804 230 Ft."
          correctExplanation="Az első részlet 2-szer, a második egyszer „kamatozik” a bank javára, a harmadik nem: a részletek felkamatolt értékének összege egyenlő a hitel felkamatolt értékével."
          tip="Ellenőrzés: a tőketörlesztések összege mindig a felvett hitel, a kamatrészek összege pedig a teljes kamatteher (Tamásnál 412 690 Ft)."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Laboratórium I: törlesztőtábla-generátor" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hitel: T = {fmtFt(loan)} Ft</label>
                <input type="range" min="100000" max="10000000" step="100000" value={loan} onChange={(e) => setLoan(Number(e.target.value))} className="w-full accent-blue-600" aria-label="hitelösszeg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Éves kamatláb: {fmtHu(p, 1)}%</label>
                <input type="range" min="1" max="25" step="0.5" value={p} onChange={(e) => setP(Number(e.target.value))} className="w-full accent-rose-600" aria-label="kamatláb" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Futamidő: {years} év</label>
                <input type="range" min="1" max="10" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-amber-600" aria-label="futamidő" />
              </div>
              <div className="flex flex-wrap gap-2">
                {FREQ.map((o) => (
                  <button
                    key={o.m}
                    onClick={() => setM(o.m)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${m === o.m ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                  >
                    törlesztés {o.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 rounded-xl p-2 border border-blue-200">
                  <div className="text-[11px] text-slate-500">törlesztőrészlet</div>
                  <div className="font-mono font-black text-blue-900 text-sm">{fmtFt(x)} Ft</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-2 border border-slate-200">
                  <div className="text-[11px] text-slate-500">összesen visszafizetve</div>
                  <div className="font-mono font-black text-slate-900 text-sm">{fmtFt(totalPaid)} Ft</div>
                </div>
                <div className="bg-amber-50 rounded-xl p-2 border border-amber-200">
                  <div className="text-[11px] text-slate-500">kamatteher</div>
                  <div className="font-mono font-black text-amber-900 text-sm">{fmtFt(totalPaid - loan)} Ft</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Egy összegben a futamidő végén: {fmtFt(loan * q ** n)} Ft. Alapbeállítás: Tamás hitele (804 230 Ft). Próbáld ki: 1 000 000 Ft, 12%, 1 év, negyedévente ⇒ Kálmán.
              </p>
              <svg viewBox="0 0 320 150" className="w-full h-auto" role="img" aria-label="a részletek kamat- és tőkerésze">
                {table.slice(0, 40).map((r, i, arr) => {
                  const w = 280 / arr.length;
                  const s = 120 / x;
                  return (
                    <g key={r.k}>
                      <rect x={20 + i * w} y={130 - r.principal * s} width={w * 0.8} height={Math.max(0, r.principal * s)} fill={S_BLUE} />
                      <rect x={20 + i * w} y={130 - x * s} width={w * 0.8} height={r.interest * s} fill={S_AMBER} />
                    </g>
                  );
                })}
                <SText x={160} y={146} t="sárga: kamatrész · kék: tőkerész" s={9.5} c="#475569" />
              </svg>
            </div>
            <div className="max-h-[420px] overflow-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th className="p-1.5 text-left">#</th>
                    <th className="p-1.5 text-right">tőketartozás</th>
                    <th className="p-1.5 text-right">kamat</th>
                    <th className="p-1.5 text-right">tőketörl.</th>
                    <th className="p-1.5 text-right">marad</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((r) => (
                    <tr key={r.k} className="border-t border-slate-100">
                      <td className="p-1.5">{r.k}.</td>
                      <td className="p-1.5 text-right font-mono">{fmtFt(r.debt)}</td>
                      <td className="p-1.5 text-right font-mono text-amber-700">{fmtFt(r.interest)}</td>
                      <td className="p-1.5 text-right font-mono text-blue-700">{fmtFt(r.principal)}</td>
                      <td className="p-1.5 text-right font-mono">{fmtFt(r.rest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="7. Interaktív Laboratórium II: az árfolyamkockázat" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <p className="text-sm text-slate-700">
                Euróban veszünk fel hitelt 5 évre, havi egyenlő részletekkel; a fizetésünket forintban kapjuk. Felvételkor 1 € = {rate0} Ft.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hitel: {fmtFt(eur)} €</label>
                <input type="range" min="1000" max="50000" step="1000" value={eur} onChange={(e) => setEur(Number(e.target.value))} className="w-full accent-purple-600" aria-label="hitel euróban" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Éves kamatláb (euróban): {fmtHu(pe, 1)}%</label>
                <input type="range" min="1" max="10" step="0.5" value={pe} onChange={(e) => setPe(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="euró kamatláb" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mostani árfolyam: 1 € = {rate} Ft</label>
                <input type="range" min="300" max="500" step="2" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full accent-rose-600" aria-label="árfolyam" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-sm">
                <div className="bg-purple-50 rounded-xl p-2 border border-purple-200">
                  <div className="text-[11px] text-slate-500">havi részlet euróban</div>
                  <div className="font-mono font-black text-purple-900">{fmtHu(xEur, 2)} €</div>
                </div>
                <div className={`rounded-xl p-2 border ${ftNow > ftStart ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
                  <div className="text-[11px] text-slate-500">havi részlet forintban</div>
                  <div className="font-mono font-black">{fmtFt(ftNow)} Ft</div>
                </div>
              </div>
              <p className="text-xs text-slate-600">
                Felvételkori árfolyamon {fmtFt(ftStart)} Ft lenne; a változás {fmtHu(((rate - rate0) / rate0) * 100, 1)}%. A forintban mért tartozás ugyanennyi százalékkal
                változik – ez az árfolyamkockázat.
              </p>
            </div>
            <svg viewBox="0 0 320 200" className="w-full h-auto" role="img" aria-label="részlet forintban az árfolyam függvényében">
              <line x1={40} y1={170} x2={300} y2={170} stroke="#64748b" />
              <line x1={40} y1={170} x2={40} y2={20} stroke="#64748b" />
              <polyline
                points={Array.from({ length: 21 }, (_, i) => {
                  const r = 300 + i * 10;
                  return `${40 + i * 13},${170 - ((xEur * r) / (xEur * 500)) * 140}`;
                }).join(' ')}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
              />
              <circle cx={40 + ((rate - 300) / 10) * 13} cy={170 - (rate / 500) * 140} r={5} fill="#e11d48" />
              <SText x={40} y={186} t="300" s={9} />
              <SText x={300} y={186} t="500 Ft/€" s={9} />
              <SText x={170} y={16} t="havi részlet forintban ~ árfolyam" s={10} c="#475569" />
            </svg>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FinanceLoansTheory;
