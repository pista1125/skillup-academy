import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RectRowsSvg, RectPartialSvg, RectSquaresSvg, RectTilesSvg, RectSame12Svg, RectBorderSvg } from './RectAreaG3Figures';
import { FONT, RectGrid, makeRectAreaTask, RectAreaTask, RECT_TARGETS } from './RectAreaG3Parts';

const LAB_MAX_ROWS = 8;
const LAB_MAX_COLS = 10;

export const RectAreaG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I: építs téglalapot a megadott területtel
  const [target, setTarget] = useState(12);
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [found, setFound] = useState<string[]>([]);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const clampR = (v: number) => Math.max(1, Math.min(LAB_MAX_ROWS, v));
  const clampC = (v: number) => Math.max(1, Math.min(LAB_MAX_COLS, v));
  const check1 = () => {
    const a = rows * cols;
    if (a === target) {
      const k = `${rows} sor, soronként ${cols}`;
      const isNew = !found.includes(k);
      if (isNew) setFound([...found, k]);
      setMsg1({ ok: true, text: `Szuper! ${rows} · ${cols} = ${a}. ${isNew ? 'Van más téglalap is ugyanekkora területtel? Keresd meg!' : 'Ezt már megtaláltad. Próbálj másikat!'}` });
    } else if (rows + cols === target) {
      setMsg1({ ok: false, text: `Vigyázz! ${rows} + ${cols} = ${target}, de a négyzeteket nem összeadni kell. ${rows} sor, mindegyikben ${cols}: ${rows} · ${cols} = ${a}.` });
    } else if (a < target) {
      setMsg1({ ok: false, text: `Most ${rows} · ${cols} = ${a} kis négyzet. Ez kevesebb, mint ${target}. Tegyél hozzá sort vagy oszlopot!` });
    } else {
      setMsg1({ ok: false, text: `Most ${rows} · ${cols} = ${a} kis négyzet. Ez több, mint ${target}. Vegyél el!` });
    }
  };
  const new1 = () => {
    let t = RECT_TARGETS[Math.floor(Math.random() * RECT_TARGETS.length)];
    while (t === target) t = RECT_TARGETS[Math.floor(Math.random() * RECT_TARGETS.length)];
    setTarget(t);
    setRows(1);
    setCols(1);
    setFound([]);
    setMsg1(null);
  };
  const s1 = Math.min(24, 220 / cols, 160 / rows);

  // Labor II: hány lap kell?
  const [t2, setT2] = useState<RectAreaTask>(() => ({
    rows: 4,
    cols: 7,
    ans: 28,
    options: [
      { v: 11, msg: 'Összeadtad a két számot: 4 + 7. De 4 sor van, és mindegyikben 7 lap. Szorozz!' },
      { v: 28, msg: '' },
      { v: 10, msg: 'Csak a már kirakott lapokat számoltad meg. Képzeld el a többit is: minden sor tele lesz!' },
      { v: 22, msg: 'Ez a körben lévő kis oldalak száma, vagyis a kerület. Mi a belsejét fedjük le!' }
    ]
  }));
  const [pick2, setPick2] = useState<number | null>(null);
  const [show2, setShow2] = useState(false);
  const ok2 = pick2 === t2.ans;
  const new2 = () => {
    setT2(makeRectAreaTask());
    setPick2(null);
    setShow2(false);
  };
  const s2 = Math.min(22, 210 / t2.cols, 150 / t2.rows);

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="a-teglalap-es-a-negyzet-terulete"
      grade={3}
      chapterId="meresek"
      title="8. A téglalap és a négyzet területe"
      subtitle="Nem kell egyenként számolni: soronként számolunk, és szorzunk."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="teal"
      pdfFilename="3_osztaly_a_teglalap_es_a_negyzet_terulete_tananyag.pdf"
      practiceTitle="Készen állsz a téglalapokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — SOROK SZÁMA · EGY SORBAN',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center text-base font-black text-teal-900 dark:text-teal-200">
              3 sor, egy sorban 5 kis négyzet: 3 · 5 = 15
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Számold meg, <strong>hány kis négyzet van egy sorban</strong>.
              </li>
              <li>
                Számold meg, <strong>hány sor van</strong>.
              </li>
              <li>
                <strong>Szorozd össze</strong> a két számot. Ez a terület.
              </li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 149. o." badgeColor="teal">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>A téglalapot kis négyzetekkel fedjük le. A négyzetek szép sorokba rendeződnek.</p>
          <p>
            Minden sorban <strong>ugyanannyi</strong> négyzet van. Ezért szorzással gyorsan megkapjuk a területet.
          </p>
        </div>
      </TheorySection>

      <TheorySection title="2. Soronként számolunk" badge="Szorzás" badgeColor="emerald">
        <RectRowsSvg />
        <TheoryCallout type="tip" title="Így gondolkodj!">
          3 egyforma sor, mindegyikben 5 négyzet. Ez <strong>3-szor 5</strong>, vagyis 3 · 5 = 15.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Elég az első sor és az első oszlop" badge="Képzeld el!" badgeColor="amber">
        <RectPartialSvg />
        <p className="text-sm text-slate-700">
          Az első sorból látod, hány lap fér egy sorba. Az első oszlopból látod, hány sor van. A többit már nem kell kirakni!
        </p>
      </TheorySection>

      <TheorySection title="4. A négyzet területe" badge="Négyzet" badgeColor="purple">
        <RectSquaresSvg />
        <p className="text-sm text-slate-700">
          A négyzetben a sorok száma és az egy sorban lévő négyzetek száma <strong>ugyanannyi</strong>. A 4 hosszú oldalú négyzet: 4 · 4 = 16 kis négyzet.
        </p>
      </TheorySection>

      <TheorySection title="5. Nagyobb lap, kevesebb darab" badge="Járólap" badgeColor="orange">
        <RectTilesSvg />
        <p className="text-sm text-slate-700">
          A dominó alakú lap 2 kis négyzet, ezért fele annyi kell belőle: 12. A nagy négyzet 4 kis négyzet, ebből csak 6 kell.
        </p>
      </TheorySection>

      <TheorySection title="6. Terület vagy kerület?" badge="Ne keverd!" badgeColor="rose">
        <RectSame12Svg />
        <TheoryCallout type="info" title="Ugyanakkora terület, más kerület">
          Mindhárom téglalapot 12 kis négyzet fedi le. De körben a határuk nem egyforma hosszú. A hosszú, keskeny téglalap kerülete a leghosszabb.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. A szélén és belül" badge="Takaró" badgeColor="sky">
        <RectBorderSvg />
        <p className="text-sm text-slate-700">
          Egy takaró 4 sorból áll, soronként 6 kockából. A belső rész is téglalap: 2 sor, soronként 4. A szélső kockák száma a kettő különbsége.
        </p>
      </TheorySection>

      <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Csempe" badge="szorzás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A falon 6 sor csempe van.</li>
              <li>Egy sorban 8 csempe van.</li>
              <li>
                6 · 8 = <strong>48 csempe</strong>.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány van egy sorban?" badge="osztás" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy téglalap 35 kis négyzet, 5 sorban.</li>
              <li>35 : 5 = 7.</li>
              <li>
                Egy sorban <strong>7 kis négyzet</strong> van.
              </li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Medence a kertben" badge="két lépés" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az udvar 5 sor, soronként 7 lap: 35.</li>
              <li>A medence helye 2 sor, soronként 2: 4.</li>
              <li>
                35 − 4 = <strong>31 lap</strong> kell.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne add össze, szorozd!"
          wrong="3 sor, soronként 5: 3 + 5 = 8"
          wrongExplanation="Így csak az első sor és az első oszlop négyzeteit számoltad, és a sarkot is kétszer."
          correct="3 sor, soronként 5: 3 · 5 = 15"
          correctExplanation="Minden sor tele van: 5 + 5 + 5 = 15."
          tip="Ha nem vagy biztos benne, rajzold be a hiányzó négyzeteket, és számold meg!"
        />
        <TheoryCallout type="warning" title="A kerület nem a terület">
          Ha körben számolod a kis oldalakat, a <strong>kerületet</strong> kapod. A terület a <strong>belsejét</strong> fedő négyzetek száma.
        </TheoryCallout>
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="10. Labor I: Építs téglalapot!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-teal-50 rounded-xl p-3 text-lg text-teal-900 font-bold text-center">Építs egy téglalapot, amelynek a területe {target} kis négyzet!</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: 'Sorok száma', v: rows, set: (v: number) => setRows(clampR(v)) },
              { label: 'Egy sorban', v: cols, set: (v: number) => setCols(clampC(v)) }
            ].map((sl) => (
              <div key={sl.label} className="flex items-center justify-center gap-3 bg-slate-50 rounded-xl p-2 border">
                <button
                  onClick={() => {
                    sl.set(sl.v - 1);
                    setMsg1(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-slate-200 text-2xl font-black"
                  aria-label={`${sl.label} kevesebb`}
                >
                  −
                </button>
                <div className="text-center min-w-[100px]">
                  <div className="text-xs text-slate-500">{sl.label}</div>
                  <div className="text-2xl font-black text-slate-800">{sl.v}</div>
                </div>
                <button
                  onClick={() => {
                    sl.set(sl.v + 1);
                    setMsg1(null);
                  }}
                  className="w-12 h-12 rounded-xl bg-teal-500 text-white text-2xl font-black"
                  aria-label={`${sl.label} több`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 240 180" className="w-full max-w-md h-auto mx-auto bg-teal-50/40 rounded-xl border border-teal-100" fontFamily={FONT}>
            <RectGrid rows={rows} cols={cols} x={(240 - cols * s1) / 2} y={(180 - rows * s1) / 2} s={s1} pal="teal" />
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check1} className="px-5 py-3 rounded-xl bg-teal-600 text-white font-bold min-h-[48px]">
              Ellenőrzés
            </button>
            <button onClick={new1} className="px-5 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
          {msg1 && <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>{msg1.text}</div>}
          {found.length > 0 && (
            <div className="text-center text-sm text-teal-900">
              Megtalált téglalapok: <strong>{found.join(' • ')}</strong>
            </div>
          )}
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="11. Labor II: Hány lap kell?" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-center text-sm text-slate-600">Az első sort és az első oszlopot már kiraktuk. Hány lap fedi le az egész teraszt?</p>
          <svg viewBox="0 0 240 170" className="w-full max-w-md h-auto mx-auto bg-amber-50/40 rounded-xl border border-amber-100" fontFamily={FONT}>
            <RectGrid rows={t2.rows} cols={t2.cols} x={(240 - t2.cols * s2) / 2} y={(170 - t2.rows * s2) / 2} s={s2} pal="orange" mode={show2 ? 'full' : 'partial'} />
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {t2.options.map((o) => {
              const chosen = pick2 === o.v;
              return (
                <button
                  key={o.v}
                  onClick={() => {
                    setPick2(o.v);
                    if (o.v === t2.ans) setShow2(true);
                  }}
                  className={`rounded-2xl border-2 py-4 text-2xl font-black min-h-[64px] ${
                    chosen ? (o.v === t2.ans ? 'bg-emerald-200 border-emerald-500 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-800') : 'bg-white border-amber-200 text-amber-900'
                  }`}
                >
                  {o.v}
                </button>
              );
            })}
          </div>
          {pick2 !== null && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {ok2 ? `Ügyes! ${t2.rows} sor, mindegyikben ${t2.cols} lap: ${t2.rows} · ${t2.cols} = ${t2.ans}.` : t2.options.find((o) => o.v === pick2)?.msg}
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => setShow2(!show2)} className="px-5 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold min-h-[48px]">
              {show2 ? 'Rejtsd el' : 'Rakd ki mind'}
            </button>
            <button onClick={new2} className="px-5 py-3 rounded-xl bg-amber-600 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RectAreaG3Theory;
