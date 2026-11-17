import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { PartNamesSvg, QuartersSvg, CompareUnitsSvg, RodPartsSvg, EverydayPartsSvg, MissingPartSvg } from './FractionPartsG3Figures';
import { PART_NAME, shuffle } from '../bevezetes/EqualPartsG3Parts';
import { FracView, FracTask, genFracTask, nameOptions, fracName } from './FractionPartsG3Parts';

const btn = 'px-4 py-2 rounded-xl text-sm font-bold min-h-[48px]';

const FIRST_COLOR_TASK: FracTask = { shape: 'pie', n: 4, k: 3, rows: 1, cols: 4, colored: [true, true, true, false] };
const FIRST_NAME_TASK: FracTask = { shape: 'bar', n: 3, k: 1, rows: 1, cols: 3, colored: [true, false, false] };

export const FractionPartsG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // ----- Labor I: Színező -----
  const [cTask, setCTask] = useState<FracTask>(FIRST_COLOR_TASK);
  const [painted, setPainted] = useState<boolean[]>([]);
  const [cMsg, setCMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const paintedCount = painted.filter(Boolean).length;
  const togglePart = (i: number) => {
    const next = Array.from({ length: cTask.n }, (_, j) => !!painted[j]);
    next[i] = !next[i];
    setPainted(next);
    setCMsg(null);
  };
  const checkColor = () => {
    const { n, k } = cTask;
    if (paintedCount === k) {
      setCMsg({ ok: true, text: `Szuper! ${n} egyenlő részből ${k} színes: ez ${fracName(k, n)}.` });
    } else if (paintedCount === n - k && n - k !== k) {
      setCMsg({ ok: false, text: `Pont fordítva! ${k} részt színezz ki, a többi maradjon fehér.` });
    } else if (paintedCount > k) {
      setCMsg({ ok: false, text: `Ez ${paintedCount} rész. Túl sok! ${k} rész kell. Koppints újra egy színes részre, és fehér lesz.` });
    } else {
      setCMsg({ ok: false, text: `Ez még csak ${paintedCount} rész. ${k} rész kell.` });
    }
  };
  const newColorTask = () => {
    setCTask(genFracTask());
    setPainted([]);
    setCMsg(null);
  };

  // ----- Labor II: Hányad része? -----
  const [nTask, setNTask] = useState<FracTask>(FIRST_NAME_TASK);
  const [opts, setOpts] = useState<string[]>(() => shuffle(nameOptions(1, 3)));
  const [nMsg, setNMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const answerName = (o: string) => {
    const { n, k } = nTask;
    const right = fracName(k, n);
    if (o === right) {
      setNMsg({ ok: true, text: `Igen! Az egész ${n} egyenlő részből áll, ezért ${PART_NAME[n]}. ${k} rész színes: ${right}.` });
    } else if (PART_NAME[n - k] && o === `${k} ${PART_NAME[n - k]}`) {
      setNMsg({ ok: false, text: `A nevet nem a fehér részek adják! Számold meg az ÖSSZES részt: ${n}. Ezért ${PART_NAME[n]}.` });
    } else if (o === `${n - k} ${PART_NAME[n]}`) {
      setNMsg({ ok: false, text: 'Ezek a fehér részek. A színes részeket számold meg!' });
    } else if (o === `${n} ${PART_NAME[n]}`) {
      setNMsg({ ok: false, text: `${n} ${PART_NAME[n]} az egész lenne. De nem minden rész színes!` });
    } else {
      setNMsg({ ok: false, text: 'Először számold meg az összes részt: ez adja a nevet. Aztán a színes részeket.' });
    }
  };
  const newNameTask = () => {
    const t = genFracTask();
    setNTask(t);
    setOpts(shuffle(nameOptions(t.k, t.n)));
    setNMsg(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-fractions-intro"
      subtopicId="kozonseges-tortek"
      grade={3}
      chapterId="tortes-szamok"
      title="2. Törtrészek: fele, harmada, negyede"
      subtitle="1 ketted, 1 harmad, 1 negyed – és ha több részt színezünk: 3 negyed."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_tortreszek_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A TÖRTRÉSZ NEVE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center text-sm font-black text-amber-900 dark:text-amber-200">
              Hány egyenlő rész az egész? → a név. Hány színes? → a szám.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>4 egyenlő részből 3 színes: 3 negyed.</li>
              <li>1 ketted = a fele, 1 harmad = a harmada, 1 negyed = a negyede.</li>
              <li>4 negyed = 1 egész.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 134–135. o." badgeColor="amber">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az egészet egyenlő részekre osztjuk. Egy rész neve attól függ, <strong>hány egyenlő részre</strong> osztottunk.</p>
          <p>2 rész: <strong>1 ketted</strong>, más szóval <strong>a fele</strong>. 3 rész: <strong>1 harmad</strong>. 4 rész: <strong>1 negyed</strong>.</p>
        </div>
        <PartNamesSvg />
        <TheoryCallout type="info" title="Kétféleképpen mondjuk">
          „A torta <strong>1 negyed</strong> része” = „a torta <strong>negyede</strong>”. „A lap <strong>1 ketted</strong> része” = „a lap <strong>fele</strong>”.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. Több rész: 3 negyed" badge="Tankönyv 134/1." badgeColor="sky">
        <QuartersSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>Egy lapot 4 egyenlő részre hajtottunk. 1 rész kék: <strong>1 negyed</strong>.</p>
          <p>3 rész zöld: <strong>3 negyed</strong>. Mind a 4 rész együtt: <strong>4 negyed</strong>, ez <strong>1 egész</strong>.</p>
        </div>
        <TheoryCallout type="tip" title="Hány kell az egészhez?">
          2 ketted = 1 egész. 3 harmad = 1 egész. 4 negyed = 1 egész. 10 tized = 1 egész.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Mennyi hiányzik az egészhez?" badge="kiegészítés" badgeColor="emerald">
        <MissingPartSvg />
        <p className="text-sm text-slate-700">3 negyed színes. Az egészhez még <strong>1 negyed</strong> kell, mert 4 negyed az egész.</p>
      </TheorySection>

      <TheorySection title="4. Melyik rész nagyobb?" badge="Munkafüzet 68/5." badgeColor="violet">
        <CompareUnitsSvg />
        <p className="text-sm text-slate-700">
          A csíkok ugyanakkorák. <strong>1 ketted</strong> a legnagyobb, <strong>1 hatod</strong> a legkisebb. Minél <strong>több</strong> részre osztjuk az egészet, annál{' '}
          <strong>kisebb</strong> 1 rész.
        </p>
      </TheorySection>

      <TheorySection title="5. Színes rudakkal" badge="Tankönyv 135/6." badgeColor="orange">
        <RodPartsSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A narancssárga rúd az 1 egész. 2 sárga rúd pont olyan hosszú: a sárga rúd a narancssárga <strong>fele</strong>.</p>
          <p>5 rózsaszín rúd kell hozzá: a rózsaszín az <strong>ötöde</strong>. 10 fehér kocka: a fehér a <strong>tizede</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="6. A hétköznapokban" badge="zászló, mérőedény, méterrúd" badgeColor="sky">
        <EverydayPartsSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>A magyar zászló 3 egyforma csíkból áll. A piros csík a zászló 1 harmada.</li>
          <li>A mérőedénybe 10 dl fér. 5 dl a fele.</li>
          <li>A méterrúd 10 dm. 1 dm a méter 1 tized része.</li>
        </ul>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Pizza" badge="5 hatod" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A pizzát 6 egyenlő szeletre vágtuk.</li>
              <li>1 szelet: 1 hatod.</li>
              <li>5 szelet maradt: <strong>5 hatod</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Csoki" badge="2 ötöd" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A csoki 5 egyforma kockából áll.</li>
              <li>Megettél 2 kockát.</li>
              <li>A csoki <strong>2 ötöd</strong> részét etted meg.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyik nagyobb?" badge="összehasonlítás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Két egyforma torta.</li>
              <li>Az egyik harmada, a másik negyede.</li>
              <li><strong>1 harmad</strong> a nagyobb: kevesebb részre vágtuk.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Az összes részt számold!"
          wrong="1 rész piros, 2 rész fehér. Ez 1 ketted."
          wrongExplanation="A fehér részeket nem szabad kihagyni. Az egész 3 részből áll."
          correct="3 egyenlő részből 1 piros: 1 harmad."
          correctExplanation="A nevet az ÖSSZES rész száma adja, a színes és a fehér együtt."
          tip="Először: hány rész van összesen? Aztán: hány színes?"
        />
        <TheoryCallout type="warning" title="A 6 nagyobb, mint a 4 – de 1 hatod kisebb, mint 1 negyed!">
          Több részre vágva kisebb egy szelet. Nézd meg a csíkokat a 4. pontban!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="9. Labor I: Színező" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="rounded-xl bg-sky-50 border-2 border-sky-200 p-3 text-center text-base font-black text-sky-900">
            Színezz ki {cTask.k} {PART_NAME[cTask.n]} részt! Koppints a részekre.
          </div>
          <svg viewBox="0 0 240 170" className="w-full max-w-[320px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            <FracView task={cTask} x={15} y={10} w={210} h={150} colored={painted} color="#38bdf8" onPart={togglePart} />
          </svg>
          <p className="text-center text-sm text-slate-600">
            Kiszínezve: <strong>{paintedCount}</strong> rész
          </p>
          {cMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${cMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{cMsg.text}</div>}
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={checkColor} className={`${btn} bg-sky-600 text-white`}>
              Ellenőrzöm
            </button>
            <button onClick={() => { setPainted([]); setCMsg(null); }} className={`${btn} bg-slate-200 text-slate-700`}>
              Törlöm
            </button>
            <button onClick={newColorTask} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="10. Labor II: Hányad része?" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center font-bold">Hányad részét színeztük pirosra?</p>
          <svg viewBox="0 0 240 170" className="w-full max-w-[320px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
            <FracView task={nTask} x={15} y={10} w={210} h={150} colored={nTask.colored} color="#ef4444" />
          </svg>
          <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
            {opts.map((o) => (
              <button key={o} onClick={() => answerName(o)} className={`${btn} bg-white border-2 border-orange-300 text-orange-900 text-base`}>
                {o}
              </button>
            ))}
          </div>
          {nMsg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${nMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{nMsg.text}</div>}
          <div className="flex justify-center">
            <button onClick={newNameTask} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionPartsG3Theory;
