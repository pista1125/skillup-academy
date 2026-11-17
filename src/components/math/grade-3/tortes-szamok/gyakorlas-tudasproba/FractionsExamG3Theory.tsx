import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { PieNamesSvg, WholeStripsSvg, RodsSvg, AmountsSvg } from './FractionsExamG3Figures';
import { FONT, Pie, Bar, partName, ColorTask, makeColorTask, colorHint, MixKind, MixTask, makeMixTask, MIX_KINDS } from './FractionsExamG3Parts';

export const FractionsExamG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Színezd ki! ----
  const [ct, setCt] = useState<ColorTask>({ n: 4, k: 3, shape: 'pie' });
  const [painted, setPainted] = useState<number[]>([]);
  const [cMsg, setCMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const toggle = (i: number) => {
    setCMsg(null);
    setPainted((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));
  };
  const checkColor = () => {
    if (painted.length === ct.k) setCMsg({ ok: true, text: `Ügyes! ${ct.n} egyenlő részből ${ct.k} színes: ez ${partName(ct.k, ct.n)}.` });
    else setCMsg({ ok: false, text: colorHint(ct, painted.length) });
  };
  const newColor = () => {
    setCt((c) => makeColorTask(c));
    setPainted([]);
    setCMsg(null);
  };

  // ---- Labor II: Vegyes feladatok ----
  const [kind, setKind] = useState<MixKind>('nev');
  const [mt, setMt] = useState<MixTask>({
    kind: 'nev',
    n: 5,
    k: 2,
    text: '5 egyenlő részből 2 színes. Hányad része színes?',
    answer: '2 ötöd',
    options: ['3 ötöd', '2 ötöd', '2 harmad', '5 ötöd'],
    explain: '5 egyenlő rész: egy rész neve 1 ötöd. 2 ilyen rész: 2 ötöd.'
  });
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const newMix = (k: MixKind = kind) => {
    setKind(k);
    setMt(makeMixTask(k));
    setChosen(null);
  };
  const choose = (o: string) => {
    if (chosen) return;
    setChosen(o);
    setScore((s) => ({ ok: s.ok + (o === mt.answer ? 1 : 0), all: s.all + 1 }));
  };

  return (
    <TheoryTemplate
      topicId="g3-fractions-intro"
      subtopicId="gyakorlas-tudasproba"
      grade={3}
      chapterId="tortes-szamok"
      title="4. Gyakorlás, tudáspróba"
      subtitle="A XIV. fejezet összefoglalása: egyenlő részek, a részek neve, összehasonlítás, színes rudak, törtrész mennyiségekből."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_tortek_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="Próbáld ki magad a 3 szintes, 90 kérdéses kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — AMIT A FEJEZETBŐL TUDNOD KELL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              4 egyenlő részből 3: 3 negyed
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Csak egyenlő részeknek van neve: ketted, harmad, negyed, ötöd, hatod, nyolcad, tized.</li>
              <li>Több részre vágod → kisebb egy rész.</li>
              <li>A 12 negyede: 12 : 4 = 3. Mértéknél előbb válts át!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Amit már tudsz: egyenlő részek" badge="Ismétlés" badgeColor="orange">
        <PieNamesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az egészet <strong>egyenlő</strong> részekre osztod.</p>
          <p>A részek számából jön a nevük: 2 rész → 1 ketted (fél), 3 → 1 harmad, 4 → 1 negyed, 8 → 1 nyolcad.</p>
          <p>Ha 4 részből 3 színes, az <strong>3 negyed</strong>.</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Amit már tudsz: az egész és a részek" badge="Összehasonlítás" badgeColor="sky">
        <WholeStripsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>2 ketted = 3 harmad = 4 negyed = 8 nyolcad = <strong>1 egész</strong>.</p>
          <p>Nézd a színes részeket! Minél több részre vágod, annál kisebb egy rész:</p>
          <p className="text-center font-black text-lg">1 nyolcad &lt; 1 negyed &lt; 1 harmad &lt; 1 ketted</p>
          <p>Ha ugyanannyi részre vágod: a több színes rész a több. 3 ötöd &gt; 2 ötöd.</p>
        </div>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Amit már tudsz: színes rudak" badge="Rudak" badgeColor="amber">
        <RodsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Hányszor fér ki a kis rúd a nagyon? 2-szer → 1 ketted. 5-ször → 1 ötöd. 10-szer → 1 tized.
        </p>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Amit már tudsz: mennyi a része?" badge="Osztással" badgeColor="emerald">
        <AmountsSvg />
        <TheoryTable
          headers={['Kérdés', 'Így számolj', 'Eredmény']}
          rows={[
            ['a 15 harmada', '15 : 3', '5'],
            ['a 800 tizede', '800 : 10', '80'],
            ['negyed kg', '100 dkg : 4', '25 dkg'],
            ['1 óra harmada', '60 perc : 3', '20 perc'],
            ['fél liter', '10 dl : 2', '5 dl']
          ]}
        />
        <TheoryCallout type="tip" title="Visszafelé">
          Ha egy szám negyede 20, akkor a szám 4 · 20 = <strong>80</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mennyi maradt?" badge="Pizza" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A pizza 6 egyenlő szelet.</li>
              <li>Megettünk 2 hatodot.</li>
              <li>6 hatod − 2 hatod = <strong>4 hatod</strong> maradt.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Két lépés" badge="Pénz" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Van 600 Ft-od. A negyedét elköltöd.</li>
              <li>Negyede: 600 : 4 = 150 Ft.</li>
              <li>Maradt: 600 − 150 = <strong>450 Ft</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Az egész" badge="Szakasz" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy szakasz ötöde 3 cm.</li>
              <li>Az egész 5 ilyen rész.</li>
              <li>5 · 3 = <strong>15 cm</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Nagyobb szám = kisebb rész!"
          wrong="1 nyolcad > 1 negyed, mert a 8 nagyobb, mint a 4."
          wrongExplanation="Nem a számot kell nézni, hanem a rész nagyságát."
          correct="1 nyolcad < 1 negyed"
          correctExplanation="8 részre vágva kisebbek a szeletek, mint 4 részre vágva."
          tip="Rajzold le két egyforma körrel!"
        />
        <TheoryCallout type="warning" title="Csak egyenlő részek!">
          Ha a 4 szelet nem egyforma, akkor egy szelet <strong>nem</strong> 1 negyed.
        </TheoryCallout>
        <TheoryCallout type="warning" title="Negyede nem kivonás">
          A 20 negyede nem 20 − 4, hanem 20 : 4 = <strong>5</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 7 Labor I */}
      <TheorySection title="7. Labor I: Színezd ki!" badge="Labor" badgeColor="orange">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-lg font-black text-slate-800">
              Színezd ki a {ct.shape === 'pie' ? 'kör' : 'csík'} <span className="text-rose-600">{partName(ct.k, ct.n)}</span> részét!
            </p>
            <button onClick={newColor} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          <p className="text-sm text-slate-600">Kattints a részekre! Ha újra kattintasz, visszafehéredik.</p>
          <svg viewBox="0 0 320 200" className="w-full max-w-[420px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            {ct.shape === 'pie' ? (
              <Pie cx={160} cy={100} r={88} n={ct.n} colored={painted} color="#f43f5e" base="#fef3c7" sw={3} onPart={toggle} />
            ) : (
              <Bar x={10} y={60} w={300} h={80} n={ct.n} colored={painted} color="#f43f5e" base="#fef3c7" sw={3} onPart={toggle} />
            )}
          </svg>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={checkColor} className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold min-h-[52px]">Ellenőrzöm</button>
            <span className="text-sm font-bold text-slate-600">Kiszínezve: {painted.length} rész</span>
          </div>
          {cMsg && (
            <div className={`p-3 rounded-xl text-sm font-bold ${cMsg.ok ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'}`}>
              {cMsg.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8 Labor II */}
      <TheorySection title="8. Labor II: Vegyes feladatok" badge="Labor" badgeColor="sky">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {MIX_KINDS.map((m) => (
              <button
                key={m.id}
                onClick={() => newMix(m.id)}
                className={`px-3 py-2 rounded-xl text-sm font-bold min-h-[44px] border-2 ${kind === m.id ? 'bg-sky-600 border-sky-700 text-white' : 'bg-white border-slate-300 text-slate-700'}`}
              >
                {m.label}
              </button>
            ))}
          </div>
          {mt.kind === 'nev' && mt.n && (
            <svg viewBox="0 0 320 80" className="w-full max-w-[420px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
              <Bar x={10} y={14} w={300} h={52} n={mt.n} k={mt.k} color="#38bdf8" sw={3} />
            </svg>
          )}
          <p className="text-lg font-black text-slate-800">{mt.text}</p>
          <div className="grid grid-cols-2 gap-3">
            {mt.options.map((o) => {
              const state = chosen ? (o === mt.answer ? 'ok' : o === chosen ? 'bad' : null) : null;
              return (
                <button
                  key={o}
                  onClick={() => choose(o)}
                  className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] border-2 ${
                    state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
          {chosen && (
            <div className={`p-3 rounded-xl text-sm font-bold ${chosen === mt.answer ? 'bg-emerald-50 text-emerald-800 border border-emerald-300' : 'bg-rose-50 text-rose-800 border border-rose-300'}`}>
              {chosen === mt.answer ? 'Ügyes! ' : 'Majdnem! '}
              {mt.explain}
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-bold text-slate-600">
              Jó válasz: {score.ok} / {score.all}
            </span>
            <button onClick={() => newMix()} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionsExamG3Theory;
