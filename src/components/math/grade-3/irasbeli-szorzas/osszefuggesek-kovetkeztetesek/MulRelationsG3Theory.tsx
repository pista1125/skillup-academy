import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { MulRelTableSvg, MulRelDotsSvg, MulRelTimesTenSvg, MulRelSameSvg, MulRelPriceSvg } from './MulRelationsG3Figures';
import { genChange, genPrice, CHANGE_LABEL, ChangeKind, changeFactor } from './MulRelationsG3Parts';

const KINDS: ChangeKind[] = ['x2', 'x3', 'x10', 'same'];

export const MulRelationsG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I – szorzat-változtató
  const [ct, setCt] = useState({ a: 4, b: 30, p: 120, a2: 8, b2: 30, p2: 240, kind: 'x2' as ChangeKind, opA: '· 2', opB: '' });
  const [kindPick, setKindPick] = useState<ChangeKind | null>(null);
  const [val1, setVal1] = useState('');
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const pickKind = (k: ChangeKind) => {
    setKindPick(k);
    if (k === ct.kind) setMsg1({ ok: true, text: 'Jó! Most írd be az új szorzatot!' });
    else if (ct.kind === 'same')
      setMsg1({ ok: false, text: 'Nézd meg jól: az egyik tényező nagyobb lett, a másik kisebb. Mi történik akkor?' });
    else setMsg1({ ok: false, text: `Nézd a nyilat! Hányszoros lett a tényező? Annyiszoros lesz a szorzat is.` });
  };
  const check1 = () => {
    const v = Number(val1);
    if (v === ct.p2) setMsg1({ ok: true, text: ct.kind === 'same' ? `Szuper! A szorzat nem változott: ${ct.p2}.` : `Szuper! ${ct.p} · ${changeFactor(ct.kind)} = ${ct.p2}.` });
    else if (v === ct.p) setMsg1({ ok: false, text: 'Ez a régi szorzat. A tényező megváltozott, így a szorzat is más lesz!' });
    else if (ct.kind === 'same' && (v === ct.p * 2 || v === ct.p / 2)) setMsg1({ ok: false, text: 'Az egyik tényező 2-szeres lett, a másikat 2-vel osztottuk. Ez kiegyenlíti egymást!' });
    else setMsg1({ ok: false, text: `Még nem jó. Szorozd ki: ${ct.a2} · ${ct.b2}.` });
  };
  const new1 = () => {
    setCt(genChange());
    setKindPick(null);
    setVal1('');
    setMsg1(null);
  };

  // Labor II – következtess!
  const [pt, setPt] = useState({ item: 'füzet', unit: 'db', n1: 2, price1: 180, n2: 6, times: 3, price2: 540 });
  const [timesPick, setTimesPick] = useState<number | null>(null);
  const [val2, setVal2] = useState('');
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const pickTimes = (t: number) => {
    setTimesPick(t);
    if (t === pt.times) setMsg2({ ok: true, text: `Igen! ${pt.n2} ${pt.unit} = ${pt.n1} ${pt.unit} · ${pt.times}. Mennyibe kerül?` });
    else setMsg2({ ok: false, text: `Számold meg: ${pt.n1} · ${t} = ${pt.n1 * t}. Ez nem ${pt.n2}. Próbáld újra!` });
  };
  const check2 = () => {
    const v = Number(val2);
    if (v === pt.price2) setMsg2({ ok: true, text: `Szuper! ${pt.price1} Ft · ${pt.times} = ${pt.price2} Ft.` });
    else if (v === pt.price1 * pt.n2) setMsg2({ ok: false, text: `Ne a darabszámmal szorozz! A ${pt.price1} Ft nem 1 ${pt.unit} ára, hanem ${pt.n1} ${pt.unit} ára.` });
    else if (v === pt.price1 + pt.times || v === pt.price1 + pt.n2) setMsg2({ ok: false, text: 'Itt nem összeadunk! Hányszor annyit veszünk? Annyiszor annyit fizetünk.' });
    else setMsg2({ ok: false, text: `Még nem jó. Számold ki: ${pt.price1} · ${pt.times}.` });
  };
  const new2 = () => {
    setPt(genPrice());
    setTimesPick(null);
    setVal2('');
    setMsg2(null);
  };

  const factorBox = (n: number, op: string) => (
    <div className="flex flex-col items-center">
      <span className="h-6 text-sm font-black text-orange-600">{op}</span>
      <span className="min-w-[64px] rounded-xl bg-white border-2 border-emerald-300 px-3 py-1 text-3xl font-black text-slate-800 text-center">{n}</span>
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g3-written-mult"
      subtopicId="osszefuggesek-kovetkeztetesek"
      grade={3}
      chapterId="irasbeli-szorzas"
      title="4. Összefüggések, következtetések"
      subtitle="Hogyan változik a szorzat, ha a tényezők változnak? Okos következtetéssel gyorsan számolhatsz."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_szorzas_osszefuggesek_tananyag.pdf"
      practiceTitle="Készen állsz az okos következtetésekre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              4 · 30 = 120 → 8 · 30 = 240
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az egyik tényező <strong>2-szeres</strong> lesz → a szorzat is <strong>2-szeres</strong> lesz.</li>
              <li>Az egyik tényező <strong>10-szeres</strong> lesz → a szorzat is <strong>10-szeres</strong> lesz.</li>
              <li>Az egyiket <strong>· 2</strong>, a másikat <strong>: 2</strong> → a szorzat <strong>nem változik</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 129. o." badgeColor="emerald">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A szorzásban két <strong>tényező</strong> van. Az eredmény a <strong>szorzat</strong>.</p>
          <p>Ma azt figyeljük: mi történik a szorzattal, ha egy tényező <strong>megváltozik</strong>?</p>
          <p>Ha ezt tudod, sok feladatot <strong>számolás nélkül</strong>, okos következtetéssel oldasz meg.</p>
        </div>
        <MulRelTableSvg />
      </TheorySection>

      <TheorySection title="2. Kétszer annyi, háromszor annyi" badge="Szorzat nő" badgeColor="sky">
        <MulRelDotsSvg />
        <TheoryCallout type="tip" title="Szabály">
          Ha az egyik tényező <strong>2-szeres</strong> lesz, a szorzat is <strong>2-szeres</strong> lesz. Ha <strong>3-szoros</strong>, akkor a szorzat is <strong>3-szoros</strong>.
        </TheoryCallout>
        <TheoryCard title="Nézzük meg együtt!" badge="4 · 30 → 8 · 30" badgeColor="sky">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Tudjuk: 4 · 30 = 120.</li>
            <li>A 4 helyett 8 van. A 8 a 4-nek a 2-szerese.</li>
            <li>Így a szorzat is 2-szeres: 120 · 2 = <strong>240</strong>.</li>
          </ol>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="3. Tízszer annyi" badge="· 10" badgeColor="amber">
        <MulRelTimesTenSvg />
        <TheoryTable
          headers={['Ismert', 'Új', 'Mi változott?', 'Új szorzat']}
          rows={[
            ['3 · 4 = 12', '3 · 40', '4 → 40 (10-szeres)', '120'],
            ['6 · 8 = 48', '6 · 80', '8 → 80 (10-szeres)', '480'],
            ['7 · 5 = 35', '70 · 5', '7 → 70 (10-szeres)', '350']
          ]}
        />
      </TheorySection>

      <TheorySection title="4. Mikor nem változik a szorzat?" badge="· 2 és : 2" badgeColor="purple">
        <MulRelSameSvg />
        <TheoryCallout type="tip" title="Szabály">
          Ha az egyik tényezőt <strong>2-szeresére</strong> növeljük, a másikat <strong>2-vel elosztjuk</strong>, a szorzat <strong>ugyanannyi</strong> marad.
        </TheoryCallout>
        <TheoryCard title="Nézzük meg együtt!" badge="120 · 4 = 240 · 2" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>120 · 2 = 240, és 4 : 2 = 2.</li>
            <li>Ezért 120 · 4 ugyanannyi, mint 240 · 2. Mindkettő <strong>480</strong>.</li>
            <li>A tényezők sorrendje is felcserélhető: 6 · 70 = 70 · 6 = 420.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt! Következtetés a boltban" badge="Mintapélda" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <MulRelPriceSvg />
          <TheoryCard title="2 füzet 180 Ft. Mennyi 6 füzet?" badge="Következtetés" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Hányszor annyi füzet? 6 = 2 · 3, tehát <strong>3-szor annyi</strong>.</li>
              <li>3-szor annyi füzet 3-szor annyi pénz: 180 · 3 = 540.</li>
            </ul>
            <p className="text-sm text-slate-700 mt-2"><strong>Válasz:</strong> 6 füzet 540 Ft.</p>
          </TheoryCard>
        </div>
        <TheoryCard title="Egy szám 3-szorosa 210. Mennyi a 6-szorosa?" badge="□ · 3 = 210" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>3 · □ = 210.</li>
            <li>A 6 a 3-nak a 2-szerese. Ezért 6 · □ = 210 · 2 = <strong>420</strong>.</li>
            <li>Ellenőrzés: □ = 70, mert 3 · 70 = 210. És 6 · 70 = 420. Jó!</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      <TheorySection title="6. Vigyázz! Melyik számmal szorzol?" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="2 lufi 150 Ft. Mennyi 4 lufi?"
          wrong="150 · 4 = 600 Ft"
          wrongExplanation="A 150 Ft nem 1 lufi ára, hanem 2 lufié! Nem a darabszámmal kell szorozni."
          correct="4 = 2 · 2, ezért 150 · 2 = 300 Ft"
          correctExplanation="4 lufi 2-szer annyi, mint 2 lufi. Így 2-szer annyit fizetünk: 300 Ft."
          tip="Először kérdezd meg: hányszor annyit veszek?"
        />
        <TheoryCallout type="warning" title="Még egy csapda">
          Ha <strong>mindkét</strong> tényező 2-szeres lesz, a szorzat <strong>4-szeres</strong> lesz! 3 · 20 = 60, de 6 · 40 = 240.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="7. Labor I: Szorzat-változtató" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-emerald-900 bg-emerald-50 rounded-xl p-3">Nézd a nyilakat! Hogyan változik a szorzat?</p>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-black text-slate-800">
              {ct.a} · {ct.b} = {ct.p}
            </div>
            <div className="flex items-end gap-3">
              {factorBox(ct.a2, ct.opA ? `↓ ${ct.opA}` : '')}
              <span className="text-3xl font-black text-slate-700 pb-1">·</span>
              {factorBox(ct.b2, ct.opB ? `↓ ${ct.opB}` : '')}
              <span className="text-3xl font-black text-slate-700 pb-1">=</span>
              <input
                value={val1}
                onChange={(e) => {
                  setVal1(e.target.value.replace(/[^0-9]/g, ''));
                }}
                inputMode="numeric"
                disabled={kindPick !== ct.kind}
                className="w-24 rounded-xl border-2 border-emerald-300 px-2 py-1 text-center text-3xl font-black disabled:bg-slate-100"
                aria-label="új szorzat"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {KINDS.map((k) => (
              <button
                key={k}
                onClick={() => pickKind(k)}
                className={`min-h-[52px] rounded-xl border-2 text-base font-bold ${
                  kindPick === k ? (k === ct.kind ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50'
                }`}
              >
                {CHANGE_LABEL[k]}
              </button>
            ))}
          </div>
          {msg1 && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check1} disabled={kindPick !== ct.kind} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[48px] disabled:opacity-40">
              Ellenőrzés
            </button>
            <button onClick={new1} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="8. Labor II: Következtess!" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto text-2xl font-black text-slate-800">
            <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-2 text-center">
              {pt.n1} {pt.unit} {pt.item}
            </div>
            <div className="rounded-xl bg-amber-100 border-2 border-amber-300 p-2 text-center">{pt.price1} Ft</div>
            <div className="rounded-xl bg-amber-50 border-2 border-amber-200 p-2 text-center">
              {pt.n2} {pt.unit} {pt.item}
            </div>
            <div className="rounded-xl bg-white border-2 border-dashed border-amber-400 p-2 text-center text-rose-600">? Ft</div>
          </div>
          <p className="text-sm text-amber-900 bg-amber-50 rounded-xl p-3 text-center">
            1. Hányszor annyit veszel? &nbsp; 2. Mennyit fizetsz?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[2, 3, 4, 5].map((t) => (
              <button
                key={t}
                onClick={() => pickTimes(t)}
                className={`min-w-[96px] min-h-[52px] rounded-xl border-2 text-base font-bold ${
                  timesPick === t ? (t === pt.times ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
                }`}
              >
                {t}-szer annyi
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-2xl font-black text-slate-800">
            <span>
              {pt.n2} {pt.unit} ára:
            </span>
            <input
              value={val2}
              onChange={(e) => setVal2(e.target.value.replace(/[^0-9]/g, ''))}
              inputMode="numeric"
              disabled={timesPick !== pt.times}
              className="w-28 rounded-xl border-2 border-amber-300 px-2 py-1 text-center disabled:bg-slate-100"
              aria-label="ár"
            />
            <span>Ft</span>
          </div>
          {msg2 && <div className={`rounded-xl p-2 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check2} disabled={timesPick !== pt.times} className="px-4 py-2 rounded-xl bg-amber-600 text-white text-base font-bold min-h-[48px] disabled:opacity-40">
              Ellenőrzés
            </button>
            <button onClick={new2} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-base font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulRelationsG3Theory;
