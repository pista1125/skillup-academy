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
  ThousandSplitSvg,
  AddBridgeSvg,
  SubStepsSvg,
  ToThousandSvg,
  CheckSvg,
  ShopSvg
} from './AddSub1000G3Figures';
import { FONT, OptButton } from '../szamok-1000-ig/Numbers1000G3Parts';
import { makeFillStart, fillOptions, makeShop, ShopItem, threeOptions } from './AddSub1000G3Parts';

export const AddSub1000G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Pótold 1000-re! ----
  const [start, setStart] = useState<number>(740);
  const [addH, setAddH] = useState(0);
  const [addT, setAddT] = useState(0);
  const [fillOpts, setFillOpts] = useState<number[]>(fillOptions(740));
  const [fillPick, setFillPick] = useState<number | null>(null);
  const added = addH * 100 + addT * 10;
  const now = start + added;
  const full = now === 1000;
  const fillOk = fillPick === 1000 - start;
  const newFill = () => {
    const s = makeFillStart(start);
    setStart(s);
    setAddH(0);
    setAddT(0);
    setFillOpts(fillOptions(s));
    setFillPick(null);
  };
  const BW = 320;
  const X = (v: number) => 10 + (BW * Math.min(v, 1100)) / 1000;

  // ---- Labor II: Bevásárlás 1000 Ft-ból ----
  const [shop, setShop] = useState<ShopItem[]>([
    { name: 'füzet', price: 260 },
    { name: 'festék', price: 480 },
    { name: 'radír', price: 120 },
    { name: 'könyv', price: 590 },
    { name: 'olló', price: 350 },
    { name: 'matrica', price: 170 }
  ]);
  const [basket, setBasket] = useState<number[]>([]);
  const [sumPick, setSumPick] = useState<number | null>(null);
  const [restPick, setRestPick] = useState<number | null>(null);
  const [sumOpts, setSumOpts] = useState<number[]>([]);
  const [restOpts, setRestOpts] = useState<number[]>([]);
  const two = basket.length === 2;
  const a = two ? shop[basket[0]].price : 0;
  const b = two ? shop[basket[1]].price : 0;
  const sum = a + b;
  const tooMuch = two && sum > 1000;
  const sumOk = sumPick === sum;
  const rest = 1000 - sum;
  const restOk = restPick === rest;
  const toggleItem = (i: number) => {
    if (sumOk) return;
    let next = basket.includes(i) ? basket.filter((x) => x !== i) : [...basket, i];
    if (next.length > 2) next = next.slice(1);
    setBasket(next);
    setSumPick(null);
    setRestPick(null);
    if (next.length === 2) {
      const p = shop[next[0]].price;
      const q = shop[next[1]].price;
      const s = p + q;
      const noCarry = (Math.floor(p / 100) + Math.floor(q / 100)) * 100 + (((Math.floor(p / 10) % 10) + (Math.floor(q / 10) % 10)) % 10) * 10;
      setSumOpts(threeOptions(s, noCarry));
      const r = 1000 - s;
      const digitErr = (10 - Math.floor(s / 100)) * 100 + (10 - (Math.floor(s / 10) % 10)) * 10;
      setRestOpts(threeOptions(r, digitErr));
    }
  };
  const newShop = () => {
    setShop(makeShop());
    setBasket([]);
    setSumPick(null);
    setRestPick(null);
  };
  let sumHint = '';
  if (sumPick !== null && !sumOk) {
    sumHint =
      sumPick < sum
        ? 'Kevés! Add össze előbb a százasokat, aztán a tízeseket. Ha 10 tízes összejön, az még 1 százas!'
        : 'Sok! Add össze előbb a százasokat, aztán a tízeseket.';
  }
  let restHint = '';
  if (restPick !== null && !restOk) restHint = `Ellenőrizd: ${restPick} + ${sum} nem 1000. Pótolj előbb a következő kerek százasig!`;

  return (
    <TheoryTemplate
      topicId="g3-count-1000"
      subtopicId="osszeadas-es-kivonas"
      grade={3}
      chapterId="szamolas-1000-ig"
      title="3. Összeadás és kivonás"
      subtitle="Fejben számolás kerek százasokkal és kerek tízesekkel 1000-ig: átlépés, pótlás 1000-re, ellenőrzés, szöveges feladatok."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_osszeadas_kivonas_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — FEJBEN SZÁMOLÁS 1000-IG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              280 + 270 = 280 + 200 + 70 = 550
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Előbb a <strong>százasokat</strong>, aztán a <strong>tízeseket</strong> adod hozzá vagy veszed el.</li>
              <li>Átlépés: ugorj a kerek százasig, aztán tovább.</li>
              <li>A kivonást összeadással <strong>ellenőrzöd</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 112–113. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>500-ig már tudsz kerek számokat összeadni és kivonni.</p>
          <p>Most <strong>1000-ig</strong> számolunk, fejben.</p>
          <p>A számok kerek százasok vagy kerek tízesek, például 300, 450, 820.</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Kerek százasok – az 1000 bontásai" badge="Százasok" badgeColor="sky">
        <ThousandSplitSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Kerek százasokkal úgy számolsz, mint egyesekkel: 3 + 7 = 10, ezért 300 + 700 = 1000.</p>
          <p>Visszafelé is: 1000 − 400 = 600, mert 10 sz − 4 sz = 6 sz.</p>
        </div>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Átlépés összeadásnál" badge="+ a kerek százason át" badgeColor="emerald">
        <AddBridgeSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A 480-ból 20 hiányzik az 500-hoz. Előbb ennyit lépj: 500.</p>
          <p>A 70-ből még 50 maradt: 500 + 50 = <strong>550</strong>.</p>
        </div>
        <TheoryTable
          headers={['Feladat', 'Így számolj', 'Eredmény']}
          rows={[
            ['360 + 70', '360 + 40 + 30', '430'],
            ['590 + 80', '590 + 10 + 70', '670'],
            ['280 + 270', '280 + 200 + 70', '550'],
            ['940 + 60', '940 + 60', '1000']
          ]}
        />
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Átlépés kivonásnál" badge="− a kerek százason át" badgeColor="rose">
        <SubStepsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Előbb a 300-at veszed el: 620 − 300 = 320.</p>
          <p>Aztán a 30-at: 320 − 20 = 300, és még 10: <strong>290</strong>.</p>
        </div>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Pótlás 1000-re" badge="Mennyi hiányzik?" badgeColor="purple">
        <ToThousandSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Pótlás" badge="740 + □ = 1000" badgeColor="purple">
            <p className="text-sm text-slate-700">740-től a 800-ig 60. A 800-tól az 1000-ig 200. Együtt <strong>260</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Ugyanez kivonással" badge="1000 − 740" badgeColor="sky">
            <p className="text-sm text-slate-700">1000 − 740 = 260. A pótlás és a kivonás ugyanazt adja.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Ellenőrzés" badge="Összeadással" badgeColor="teal">
        <CheckSvg />
        <TheoryCallout type="tip" title="Így ellenőrizd a kivonást">
          Add össze az eredményt és a kivont számot! Ha a kezdő számot kapod, jól számoltál.
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Vásárlás" badge="Pénz" badgeColor="amber">
        <ShopSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Füzet és festék: 260 + 480 = 740 Ft. Ez belefér az 1000 Ft-ba.</p>
          <p>Marad: 1000 − 740 = <strong>260 Ft</strong>.</p>
        </div>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hiányzó szám" badge="□ + 350 = 790" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Mennyi kell a 350-hez, hogy 790 legyen?</li>
              <li>790 − 350 = 440.</li>
              <li>Ellenőrzés: 440 + 350 = 790. <strong>□ = 440</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Gyűjtés" badge="Két lépés" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az osztály hétfőn 280, kedden 350 kupakot gyűjtött.</li>
              <li>Együtt: 280 + 350 = 630.</li>
              <li>Az 1000-hez még 1000 − 630 = <strong>370</strong> kell.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Mennyivel több?" badge="Különbség" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A kék kirakó 860 darabos, a piros 590.</li>
              <li>860 − 590: előbb − 500 = 360, aztán − 90 = 270.</li>
              <li>A kék <strong>270</strong> darabbal több.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 9 */}
      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az új százas"
          wrong="680 + 50 = 630"
          wrongExplanation="8 tízes + 5 tízes = 13 tízes. Ebből 10 tízes egy új százas!"
          correct="680 + 50 = 730"
          correctExplanation="680 + 20 = 700, aztán 700 + 30 = 730."
          tip="Ha a tízesek összege 10 vagy több, eggyel több százas lesz."
        />
        <TheoryCallout type="warning" title="Pótlás 1000-re: nem 10-re!">
          1000 − 740 nem 360. A tízesek 10-re pótolják egymást (4 + 6), de akkor a százasokból már csak 2 kell: <strong>260</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 10 Labor I */}
      <TheorySection title="10. Labor I: Pótold 1000-re!" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newFill} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center text-purple-900 font-bold">
            Már <span className="text-2xl">{start}</span> van. Töltsd fel a csíkot pontosan 1000-ig!
          </div>
          <svg viewBox="0 0 340 92" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="10" y="22" width={BW} height="34" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
            <rect x="10" y="22" width={X(start) - 10} height="34" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
            {added > 0 && <rect x={X(start)} y="22" width={X(now) - X(start)} height="34" fill={now > 1000 ? '#fca5a5' : '#86efac'} stroke={now > 1000 ? '#dc2626' : '#16a34a'} strokeWidth="1.5" />}
            {Array.from({ length: 11 }, (_, i) => (
              <line key={i} x1={X(i * 100)} y1="56" x2={X(i * 100)} y2="64" stroke="#334155" strokeWidth="1.5" />
            ))}
            <text x={X(0)} y="78" textAnchor="middle" fontSize="11" fill="#475569">0</text>
            <text x={X(500)} y="78" textAnchor="middle" fontSize="11" fill="#475569">500</text>
            <text x={X(1000) + 6} y="78" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0f172a">1000</text>
            <text x={(10 + X(start)) / 2} y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{start}</text>
            <text x="170" y="15" textAnchor="middle" fontSize="12" fontWeight="bold" fill={now > 1000 ? '#dc2626' : '#334155'}>
              {now > 1000 ? 'Túl sok! Vegyél el!' : full ? 'Pont 1000!' : 'Még nem 1000.'}
            </text>
          </svg>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-rose-50 border-2 border-rose-200 p-2 text-center space-y-1">
              <div className="text-xs font-bold text-rose-700">százas (100)</div>
              <div className="text-2xl font-black text-rose-700">{addH}</div>
              <div className="flex gap-1 justify-center">
                <button disabled={fillOk} onClick={() => { setAddH(Math.max(0, addH - 1)); setFillPick(null); }} className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-xl font-black">−</button>
                <button disabled={fillOk || addH >= 9} onClick={() => { setAddH(addH + 1); setFillPick(null); }} className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-xl font-black">+</button>
              </div>
            </div>
            <div className="rounded-xl bg-blue-50 border-2 border-blue-200 p-2 text-center space-y-1">
              <div className="text-xs font-bold text-blue-700">tízes (10)</div>
              <div className="text-2xl font-black text-blue-700">{addT}</div>
              <div className="flex gap-1 justify-center">
                <button disabled={fillOk} onClick={() => { setAddT(Math.max(0, addT - 1)); setFillPick(null); }} className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-xl font-black">−</button>
                <button disabled={fillOk || addT >= 19} onClick={() => { setAddT(addT + 1); setFillPick(null); }} className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-xl font-black">+</button>
              </div>
            </div>
          </div>
          {full && (
            <div className="space-y-2">
              <div className="text-center text-sm font-bold text-slate-700">
                Hozzátettél {addH} százast és {addT} tízest. Akkor: 1000 − {start} = ?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {fillOpts.map((v) => (
                  <OptButton key={v} v={v} onClick={() => !fillOk && setFillPick(v)} state={fillPick === v ? (fillOk ? 'ok' : 'bad') : null} />
                ))}
              </div>
            </div>
          )}
          {fillPick !== null && !fillOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              Számold össze: {addH} százas = {addH * 100}, {addT} tízes = {addT * 10}. Mennyi ez együtt?
            </div>
          )}
          {fillOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes! {start} + {1000 - start} = 1000, tehát 1000 − {start} = {1000 - start}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 11 Labor II */}
      <TheorySection title="11. Labor II: Bevásárlás 1000 Ft-ból" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newShop} className="px-4 py-2 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          <div className="bg-amber-50 rounded-xl p-3 text-center text-amber-900 font-bold">Van 1000 Ft-od. Válassz ki két dolgot!</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {shop.map((it, i) => (
              <button
                key={it.name}
                onClick={() => toggleItem(i)}
                className={`rounded-xl border-2 p-3 min-h-[64px] text-center ${basket.includes(i) ? 'bg-amber-100 border-amber-500' : 'bg-white border-slate-300'}`}
              >
                <div className="text-sm font-bold text-slate-600">{it.name}</div>
                <div className="text-xl font-black text-slate-900">{it.price} Ft</div>
              </button>
            ))}
          </div>
          {tooMuch && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              {a} + {b} több, mint 1000. Erre nem elég a pénzed! Válassz mást!
            </div>
          )}
          {two && !tooMuch && (
            <div className="space-y-2">
              <div className="text-center text-sm font-bold text-slate-700">1. Mennyit fizetsz? {a} + {b} = ?</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {sumOpts.map((v) => (
                  <OptButton key={v} v={`${v} Ft`} onClick={() => !sumOk && setSumPick(v)} state={sumPick === v ? (sumOk ? 'ok' : 'bad') : null} />
                ))}
              </div>
              {sumHint && <div className="rounded-xl p-2 text-center text-sm font-bold bg-rose-100 text-rose-800">{sumHint}</div>}
            </div>
          )}
          {two && sumOk && (
            <div className="space-y-2">
              <div className="text-center text-sm font-bold text-slate-700">2. Mennyi marad? 1000 − {sum} = ?</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {restOpts.map((v) => (
                  <OptButton key={v} v={`${v} Ft`} onClick={() => !restOk && setRestPick(v)} state={restPick === v ? (restOk ? 'ok' : 'bad') : null} />
                ))}
              </div>
              {restHint && <div className="rounded-xl p-2 text-center text-sm font-bold bg-rose-100 text-rose-800">{restHint}</div>}
            </div>
          )}
          {two && restOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! Fizetsz {sum} Ft-ot, marad {rest} Ft. Ellenőrzés: {sum} + {rest} = 1000. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AddSub1000G3Theory;
