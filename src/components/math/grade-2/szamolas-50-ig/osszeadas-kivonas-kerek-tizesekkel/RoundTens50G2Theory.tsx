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
  RoundTensStairsSvg,
  SmallBigAnalogySvg,
  TakeAwayRodsSvg,
  OnlyTensChangeSvg,
  TensJumpsLineSvg,
  PayFortySvg
} from './RoundTens50G2Figures';
import {
  RT_FONT,
  ROD_BLUE,
  RodsPart,
  rodsWidth,
  CoinPart,
  makeRodTask,
  makeShopTask,
  coinKey,
  RodTask
} from './RoundTens50G2Parts';

type Msg = { ok: boolean; text: string } | null;

export const RoundTens50G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---------------- Labor I: tízesrudak ----------------
  const [task, setTask] = useState<RodTask>(() => ({ start: 24, delta: 20, answer: 44, options: [44, 26, 34, 46] }));
  const [change, setChange] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [msg1, setMsg1] = useState<Msg>(null);

  const startTens = Math.floor(task.start / 10);
  const ones = task.start % 10;
  const needRods = task.delta / 10;
  const plus = task.delta > 0;
  const shownAdd = plus ? Math.max(0, change) : 0;
  const shownCross = plus ? 0 : Math.max(0, -change);
  const groups = shownAdd > 0 ? [{ count: startTens }, { count: shownAdd, ...ROD_BLUE }] : [{ count: startTens }];
  const labW = rodsWidth(groups, ones, 9, 14);

  const newTask1 = () => {
    setTask(makeRodTask());
    setChange(0);
    setPick(null);
    setMsg1(null);
  };

  const check1 = () => {
    if (change !== needRods) {
      const want = Math.abs(needRods);
      setMsg1({
        ok: false,
        text: plus
          ? `${task.delta} = ${want} tízes. Tegyél hozzá pontosan ${want} kék rudat! (Most ${Math.max(0, change)} van.)`
          : `${-task.delta} = ${want} tízes. Húzz át pontosan ${want} rudat! (Most ${Math.max(0, -change)} van áthúzva.)`
      });
      return;
    }
    if (pick === null) {
      setMsg1({ ok: false, text: 'A rudak jók! Most válaszd ki lent az eredményt!' });
      return;
    }
    if (pick !== task.answer) {
      const onesWrong = task.start + needRods;
      setMsg1({
        ok: false,
        text:
          pick === onesWrong
            ? 'Vigyázz! Nem az egyesekhez kell adni. A tízesek változnak, az egyesek maradnak!'
            : `Számold meg a rudakat (tízesek) és a kis kockákat (egyesek)! Az egyesek száma: ${ones}.`
      });
      return;
    }
    setMsg1({
      ok: true,
      text: `Szuper! ${task.start} ${plus ? '+' : '−'} ${Math.abs(task.delta)} = ${task.answer}. A tízesek változtak, az egyesek (${ones}) maradtak.`
    });
  };

  // ---------------- Labor II: bolt ----------------
  const [item, setItem] = useState(() => ({ name: 'füzet', price: 40, color: '#60a5fa' }));
  const [purse, setPurse] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [msg2, setMsg2] = useState<Msg>(null);
  const paid = purse.reduce((s, c) => s + c, 0);

  const addCoin = (c: number) => {
    if (paid + c > 50) {
      setMsg2({ ok: false, text: 'Ennyi érme már túl sok! Legfeljebb 50 Ft-tal játszunk.' });
      return;
    }
    setPurse((p) => [...p, c]);
    setMsg2(null);
  };

  const check2 = () => {
    if (paid < item.price) {
      setMsg2({ ok: false, text: `Ez még csak ${paid} Ft. A(z) ${item.name} ${item.price} Ft. Még ${item.price - paid} Ft hiányzik!` });
      return;
    }
    if (paid > item.price) {
      setMsg2({ ok: false, text: `Ez ${paid} Ft, ${paid - item.price} Ft-tal több a kelleténél! Vegyél vissza egy érmét!` });
      return;
    }
    const key = coinKey(purse);
    const isNew = !found.includes(key);
    const nextFound = isNew ? [...found, key] : found;
    setFound(nextFound);
    setMsg2({
      ok: true,
      text: isNew
        ? `Pontosan ${item.price} Ft: ${key} = ${item.price}. Ez már ${nextFound.length}. megoldásod! Keress másikat is!`
        : `Jó, de ezt a módot már megtaláltad. Próbálj más érméket!`
    });
    setPurse([]);
  };

  const newShop = () => {
    setItem(makeShopTask(item.name));
    setPurse([]);
    setFound([]);
    setMsg2(null);
  };

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-50"
      subtopicId="osszeadas-kivonas-kerek-tizesekkel"
      grade={2}
      chapterId="szamolas-50-ig"
      title="4. Összeadás, kivonás kerek tízesekkel"
      subtitle="Kerek tízesek 50-ig, kétjegyű szám meg kerek tízes, tízes ugrások és fizetés 10, 20, 50 Ft-osokkal."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="2_osztaly_osszeadas_kivonas_kerek_tizesekkel_50_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — SZÁMOLJ TÍZESEKKEL!',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
              3 + 2 = 5 → 30 + 20 = 50
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Kerek tízesek:</strong> 10, 20, 30, 40, 50.</li>
              <li><strong>Kétjegyű szám + kerek tízes:</strong> 24 + 20 = 44 – csak a tízes változik.</li>
              <li><strong>Kivonás:</strong> 47 − 20 = 27 – az egyes (7) marad.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Kerek tízesek" badgeColor="amber">
        <RoundTensStairsSvg />
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Egy tízesrúd = <strong>10</strong>. Két rúd = <strong>20</strong>. Öt rúd = <strong>50</strong>.</p>
          <p>A <strong>kerek tízes</strong> 0-ra végződik: 10, 20, 30, 40, 50.</p>
          <p>Ma tízesekkel adunk össze és vonunk ki. Ez nagyon könnyű lesz!</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Kistesó és nagytesó" badge="Összeadás" badgeColor="blue">
        <SmallBigAnalogySvg />
        <TheoryTable
          headers={['Kistesó', 'Tízesekkel', 'Nagytesó']}
          rows={[
            ['3 + 2 = 5', '3 tízes + 2 tízes = 5 tízes', '30 + 20 = 50'],
            ['1 + 3 = 4', '1 tízes + 3 tízes = 4 tízes', '10 + 30 = 40'],
            ['2 + 2 = 4', '2 tízes + 2 tízes = 4 tízes', '20 + 20 = 40']
          ]}
        />
        <TheoryCallout type="tip" title="A tagok helyet cserélhetnek!">
          <strong>20 + 30 = 50</strong> és <strong>30 + 20 = 50</strong>. Ugyanannyi!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Elveszünk tízeseket" badge="Kivonás" badgeColor="rose">
        <TakeAwayRodsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Áthúzzuk a rudakat" badge="50 − 20" badgeColor="rose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              5 rúdból 2-t áthúzunk. 3 rúd marad: <strong>50 − 20 = 30</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Ellenőrizd összeadással!" badge="30 + 20" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>30 + 20 = 50</strong>. Jó volt a kivonás!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Kétjegyű szám és kerek tízes" badge="Csak a tízes változik" badgeColor="orange">
        <OnlyTensChangeSvg />
        <TensJumpsLineSvg />
        <TheoryTable
          headers={['Művelet', 'Tízesek', 'Egyesek', 'Eredmény']}
          rows={[
            ['24 + 20', '2 + 2 = 4', '4 marad', '44'],
            ['13 + 30', '1 + 3 = 4', '3 marad', '43'],
            ['47 − 20', '4 − 2 = 2', '7 marad', '27'],
            ['39 − 30', '3 − 3 = 0', '9 marad', '9']
          ]}
        />
      </TheorySection>

      <TheorySection title="5. Fizessünk érmékkel!" badge="Pénz" badgeColor="purple">
        <PayFortySvg />
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A 40 Ft-ot többféleképpen is kifizetheted: <strong>10 + 10 + 10 + 10</strong>, <strong>20 + 10 + 10</strong> vagy <strong>20 + 20</strong>.
        </p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Kerek tízesek" badge="20 + 30" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Kistesó: 2 + 3 = <strong>5</strong>.</li>
              <li>5 tízes = <strong>50</strong>.</li>
              <li>20 + 30 = <strong>50</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kétjegyű + tízes" badge="16 + 30" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Tízesek: 1 + 3 = <strong>4</strong>.</li>
              <li>Egyesek: <strong>6</strong> marad.</li>
              <li>16 + 30 = <strong>46</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Szöveges feladat" badge="45 − 20" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Bence 45 gyöngyéből 20-at elajándékoz.</li>
              <li>45 − 20 = <strong>25</strong>.</li>
              <li>Válasz: 25 gyöngye marad.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="24 + 20 – ne az egyesekhez add!"
          wrong="24 + 20 = 26"
          wrongExplanation="A 20 két tízes, nem két egyes! Az egyesekhez nem kell semmit adni."
          correct="24 + 20 = 44"
          correctExplanation="2 tízes + 2 tízes = 4 tízes, a 4 egyes marad: 44."
          tip="Kerek tízesnél mindig a tízesek változnak!"
        />
        <TheoryCallout type="warning" title="Ne felejtsd el a 0-t!">
          30 + 20 nem 5, hanem <strong>50</strong>. A tízesek számához írd oda a 0-t!
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Tízesrudak" badge="Interaktív labor" badgeColor="orange">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
            {plus ? 'Tegyél hozzá kék rudakat, aztán válaszolj!' : 'Húzd át a rudakat, aztán válaszolj!'}
            <div className="text-3xl sm:text-4xl font-black mt-1">
              {task.start} {plus ? '+' : '−'} {Math.abs(task.delta)} = ?
            </div>
          </div>

          <svg viewBox="0 0 340 130" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
            <rect x="1" y="1" width="338" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <RodsPart x={(340 - labW) / 2} y={18} cell={9} groups={groups} ones={ones} crossed={shownCross} groupGap={14} />
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {plus ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setChange((c) => Math.max(0, c - 1));
                    setMsg1(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-900 font-bold text-sm min-h-[48px]"
                >
                  − 1 kék rúd
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChange((c) => (startTens + c + 1 > 5 ? c : c + 1));
                    setMsg1(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm min-h-[48px]"
                >
                  + 1 kék rúd
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setChange((c) => Math.min(0, c + 1));
                    setMsg1(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-sm min-h-[48px]"
                >
                  Visszateszek 1 rudat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChange((c) => (-c >= startTens ? c : c - 1));
                    setMsg1(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-sm min-h-[48px]"
                >
                  Áthúzok 1 rudat
                </button>
              </>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-center text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">Válaszd ki az eredményt:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {task.options.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setPick(n);
                    setMsg1(null);
                  }}
                  className={`w-14 h-14 rounded-xl font-black text-xl border-2 transition-all ${
                    pick === n
                      ? 'bg-amber-500 text-white border-amber-700 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <button type="button" onClick={check1} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button type="button" onClick={newTask1} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>

          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {msg1.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Kisbolt" badge="Interaktív labor" badgeColor="purple">
        <div className="bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-purple-50 dark:bg-purple-950/50 rounded-xl p-3 text-center text-purple-950 dark:text-purple-100">
            Fizesd ki pontosan! Keress több megoldást!
            <div className="text-2xl sm:text-3xl font-black mt-1">
              {item.name}: {item.price} Ft
            </div>
          </div>

          <svg viewBox="0 0 340 90" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
            <rect x="1" y="1" width="338" height="88" rx="12" fill="#faf5ff" stroke="#d8b4fe" />
            <rect x="16" y="20" width="54" height="50" rx="10" fill={item.color} stroke="#334155" strokeWidth="2" />
            <text x="43" y="51" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a">
              {item.price} Ft
            </text>
            {purse.length === 0 && (
              <text x="200" y="50" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#64748b">
                Tegyél ide érméket!
              </text>
            )}
            {purse.map((c, i) => (
              <CoinPart key={i} cx={102 + i * 40} cy={45} value={c} r={17} />
            ))}
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[10, 20, 50].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => addCoin(c)}
                className="w-16 h-16 rounded-full font-black text-lg border-4 border-purple-400 bg-purple-100 text-purple-900 dark:bg-purple-900/40 dark:text-purple-100"
              >
                {c} Ft
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setPurse((p) => p.slice(0, -1));
                setMsg2(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-sm min-h-[48px]"
            >
              Visszaveszek 1 érmét
            </button>
          </div>

          <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Letettél: {paid} Ft</p>

          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" onClick={check2} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">
              Fizetek
            </button>
            <button type="button" onClick={newShop} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>

          {found.length > 0 && (
            <div className="text-center text-sm text-slate-700 dark:text-slate-200">
              <strong>Megtalált módok:</strong> {found.join(' | ')}
            </div>
          )}

          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {msg2.text}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RoundTens50G2Theory;
