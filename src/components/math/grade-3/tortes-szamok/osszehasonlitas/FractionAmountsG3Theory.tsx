import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { ShareApplesSvg, QuarterKgSvg, FifthMeterSvg, ClockPartsSvg, SegmentPartsSvg, HalfLitreSvg, RoadSvg } from './FractionAmountsG3Figures';
import {
  FONT,
  Apple,
  Candy,
  Strip,
  OptButton,
  PART_OF,
  PART_NAME,
  ShareTask,
  makeShareTask,
  shareOptions,
  UnitTask,
  makeUnitTask,
  unitOptions,
  unitHint,
  art,
  Art
} from './FractionAmountsG3Parts';

export const FractionAmountsG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Oszd szét egyenlően! ----
  const [share, setShare] = useState<ShareTask>({ total: 12, k: 3, kind: 'apple' });
  const [bowls, setBowls] = useState<number[]>([0, 0, 0]);
  const [shareOpts, setShareOpts] = useState<number[]>(shareOptions({ total: 12, k: 3, kind: 'apple' }));
  const [sharePick, setSharePick] = useState<number | null>(null);
  const placed = bowls.reduce((s, v) => s + v, 0);
  const pile = share.total - placed;
  const allEqual = bowls.every((v) => v === bowls[0]);
  const done = pile === 0;
  const shareAnswer = share.total / share.k;
  const shareOk = sharePick === shareAnswer;
  const newShare = () => {
    const t = makeShareTask(share);
    setShare(t);
    setBowls(Array(t.k).fill(0));
    setShareOpts(shareOptions(t));
    setSharePick(null);
  };
  const resetBowls = () => {
    setBowls(Array(share.k).fill(0));
    setSharePick(null);
  };
  const addToBowl = (i: number) => {
    if (pile === 0) return;
    const next = [...bowls];
    next[i] += 1;
    setBowls(next);
  };

  // ---- Labor II: Mennyi a része? ----
  const [ut, setUt] = useState<UnitTask>({ whole: '1 kg', small: 'dkg', total: 100, n: 4, kind: 'kg' });
  const [colored, setColored] = useState<number | null>(null);
  const [unitOpts, setUnitOpts] = useState<number[]>(unitOptions({ whole: '1 kg', small: 'dkg', total: 100, n: 4, kind: 'kg' }));
  const [unitPick, setUnitPick] = useState<number | null>(null);
  const unitAnswer = ut.total / ut.n;
  const unitOk = unitPick === unitAnswer;
  const newUnit = () => {
    const t = makeUnitTask(ut);
    setUt(t);
    setColored(null);
    setUnitOpts(unitOptions(t));
    setUnitPick(null);
  };
  const SW = 300;
  const pw = SW / ut.n;

  return (
    <TheoryTemplate
      topicId="g3-fractions-intro"
      subtopicId="osszehasonlitas"
      grade={3}
      chapterId="tortes-szamok"
      title="3. Törtrész mennyiségekből"
      subtitle="Mennyi egy szám, egy mennyiség fele, harmada, negyede, ötöde, tizede? Tárgyak, kg és dkg, m és cm, l és dl, óra és perc, szakaszok."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_tortresz_mennyisegekbol_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — RÉSZ KISZÁMOLÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base font-black text-orange-900 dark:text-orange-200">
              a 12 negyede: 12 : 4 = 3
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Fele: osztás 2-vel. Harmada: 3-mal. Negyede: 4-gyel. Tizede: 10-zel.</li>
              <li>Mértékeknél előbb válts át kisebb egységre: 1 kg = 100 dkg.</li>
              <li>A negyed kg tehát 100 : 4 = 25 dkg.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 136–137. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Már tudod, mi az 1 negyed rész: az egészet 4 egyenlő részre osztod, és 1 részt veszel.</p>
          <p>Most kiszámolod, <strong>mennyi</strong> ez a rész.</p>
          <p>Mennyi a 12 alma negyede? Mennyi a negyed kg kenyér? Hány perc a negyed óra?</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Egy szám fele, harmada, negyede" badge="Osztással" badgeColor="sky">
        <ShareApplesSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A 12 almát 4 egyenlő részre osztod. Egy részben 3 alma van.</p>
          <p>Ez a 12 negyede: <strong>12 : 4 = 3</strong>.</p>
        </div>
        <TheoryTable
          headers={['Kérdés', 'Így számolj', 'Eredmény']}
          rows={[
            ['a 18 fele', '18 : 2', '9'],
            ['a 21 harmada', '21 : 3', '7'],
            ['a 32 negyede', '32 : 4', '8'],
            ['a 40 ötöde', '40 : 5', '8'],
            ['a 600 tizede', '600 : 10', '60']
          ]}
        />
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Tömeg: kg és dkg" badge="1 kg = 100 dkg" badgeColor="amber">
        <QuarterKgSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az 1 kg-ot nem tudod 4-gyel osztani. Ezért váltsd át: 1 kg = 100 dkg.</p>
          <p>A negyed kg: 100 dkg : 4 = <strong>25 dkg</strong>. A fél kg: 100 : 2 = 50 dkg.</p>
        </div>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Hosszúság: m, dm, cm, mm" badge="1 m = 100 cm" badgeColor="sky">
        <FifthMeterSvg />
        <TheoryTable
          headers={['Mennyi?', 'Átváltás', 'Eredmény']}
          rows={[
            ['1 m fele', '100 cm : 2', '50 cm'],
            ['1 m negyede', '100 cm : 4', '25 cm'],
            ['1 m ötöde', '100 cm : 5', '20 cm'],
            ['1 m tizede', '100 cm : 10', '10 cm = 1 dm'],
            ['1 cm fele', '10 mm : 2', '5 mm']
          ]}
        />
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Űrtartalom és idő" badge="l, dl, cl • óra, perc" badgeColor="purple">
        <HalfLitreSvg />
        <ClockPartsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Űrtartalom" badge="1 l = 10 dl" badgeColor="sky">
            <p className="text-sm text-slate-700">Fél liter: 5 dl. Fél deciliter: 5 cl, mert 1 dl = 10 cl.</p>
          </TheoryCard>
          <TheoryCard title="Idő" badge="1 óra = 60 perc" badgeColor="purple">
            <p className="text-sm text-slate-700">Fél óra: 30 perc. Negyed óra: 15 perc. Az óra harmada: 20 perc.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Szakaszok" badge="Mérd meg, oszd el!" badgeColor="emerald">
        <SegmentPartsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Mérd meg a szakaszt! Ez 12 cm.</p>
          <p>A fele 12 : 2 = 6 cm. A harmada 12 : 3 = 4 cm. A negyede 12 : 4 = 3 cm.</p>
        </div>
        <TheoryCallout type="tip" title="Visszafelé is megy!">
          Ha egy szakasz fele 5 cm, akkor az egész szakasz 2-szer ennyi: 2 · 5 = <strong>10 cm</strong>. Ha a negyede 2 cm, akkor az egész 4 · 2 = 8 cm.
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mennyi idő?" badge="2 óra harmada" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A kirándulás 2 óra. Ennek a harmada séta.</li>
              <li>2 óra = 120 perc.</li>
              <li>120 : 3 = 40. Tehát <strong>40 percig</strong> sétálunk.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mennyi maradt?" badge="Két lépés" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Van 1 kg rizs. A tizedét megfőzzük.</li>
              <li>1 kg = 100 dkg, a tizede 100 : 10 = 10 dkg.</li>
              <li>Maradt: 100 − 10 = <strong>90 dkg</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Egymás felé" badge="Út" badgeColor="rose">
            <RoadSvg />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 400 m-es út két végéről indulnak.</li>
              <li>Egyikük a negyedét (100 m), másikuk a felét (200 m) teszi meg.</li>
              <li>Köztük: 400 − 100 − 200 = <strong>100 m</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Negyede = osztás 4-gyel"
          wrong="a 20 negyede: 20 − 4 = 16"
          wrongExplanation="A negyede nem kivonás! 4 egyenlő részre osztod a 20-at."
          correct="a 20 negyede: 20 : 4 = 5"
          correctExplanation="4 részben 5–5 van. Egy rész 5."
          tip="Fele: : 2, harmada: : 3, negyede: : 4."
        />
        <TheoryCallout type="warning" title="Először válts át!">
          A negyed kg nem 4 dkg! Előbb: 1 kg = 100 dkg. Aztán: 100 : 4 = <strong>25 dkg</strong>.
        </TheoryCallout>
        <TheoryCallout type="warning" title="Mit kérdez a feladat?">
          „A tizedét megfőztük. Mennyi <strong>maradt</strong>?” Itt nem a 10 dkg a válasz, hanem a maradék: 90 dkg.
        </TheoryCallout>
      </TheorySection>

      {/* 9 Labor I */}
      <TheorySection title="9. Labor I: Oszd szét egyenlően!" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newShare} className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={resetBowls} className="px-4 py-2 rounded-xl bg-white border-2 border-orange-300 text-orange-800 text-sm font-bold min-h-[48px]">Újrakezdem</button>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
            Van {share.total} {share.kind === 'apple' ? 'alma' : 'cukorka'}. Tedd őket {share.k} tálba egyenlően! Koppints egy tálra!
          </div>
          <div className="text-center text-sm font-bold text-slate-600">Még ennyi vár: {pile}</div>
          <svg viewBox="0 0 320 40" className="w-full h-auto max-w-[420px] mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            {Array.from({ length: pile }, (_, i) => {
              const x = 14 + (i % 15) * 20;
              const y = 12 + Math.floor(i / 15) * 18;
              return share.kind === 'apple' ? <Apple key={i} x={x} y={y + 4} r={7} /> : <Candy key={i} x={x} y={y + 2} r={7} />;
            })}
          </svg>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {bowls.map((v, i) => (
              <button
                key={i}
                onClick={() => addToBowl(i)}
                className="rounded-2xl border-2 border-amber-400 bg-amber-50 p-2 min-h-[96px] flex flex-col items-center justify-between"
              >
                <svg viewBox="0 0 100 50" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  {Array.from({ length: v }, (_, j) => {
                    const x = 14 + (j % 5) * 18;
                    const y = 14 + Math.floor(j / 5) * 18;
                    return share.kind === 'apple' ? <Apple key={j} x={x} y={y + 2} r={7} /> : <Candy key={j} x={x} y={y} r={7} />;
                  })}
                </svg>
                <span className="text-lg font-black text-amber-800">{v}</span>
              </button>
            ))}
          </div>
          {done && !allEqual && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              Nem egyenlő! Az egyik tálban több van. Kezdd újra, és tegyél mindegyikbe sorban egyet-egyet!
            </div>
          )}
          {done && allEqual && (
            <div className="space-y-2">
              <div className="text-center text-sm font-bold text-slate-700">
                Mindegyik tálban ugyanannyi van. Mennyi {art(share.total)} {share.total} {PART_OF[share.k]}?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {shareOpts.map((v) => (
                  <OptButton key={v} v={v} onClick={() => !shareOk && setSharePick(v)} state={sharePick === v ? (shareOk ? 'ok' : 'bad') : null} />
                ))}
              </div>
            </div>
          )}
          {sharePick !== null && !shareOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              {sharePick === share.k
                ? `A ${share.k} a tálak száma. Számold meg, mennyi van EGY tálban!`
                : `Nézd meg egyetlen tálat! Annyi ${art(share.total)} ${share.total} ${PART_OF[share.k]}.`}
            </div>
          )}
          {shareOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes! {Art(share.total)} {share.total} {PART_OF[share.k]}: {share.total} : {share.k} = {shareAnswer}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10 Labor II */}
      <TheorySection title="10. Labor II: Mennyi a része?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newUnit} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 font-bold">
            Mennyi {art(ut.whole)} {ut.whole} {PART_OF[ut.n]}? {colored === null && 'Előbb színezz ki 1 részt!'}
          </div>
          <svg viewBox="0 0 340 92" className="w-full h-auto max-w-[460px] mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <Strip
              x={20}
              y={40}
              w={SW}
              h={40}
              n={ut.n}
              fill={colored === null ? [] : [colored]}
              color="#fbbf24"
              labels={Array.from({ length: ut.n }, (_, i) => (i === colored && unitOk ? `${unitAnswer}` : i === colored ? '?' : null))}
              top={`${ut.whole} = ${ut.total} ${ut.small}`}
              fs={ut.n === 10 ? 11 : 14}
            />
            {Array.from({ length: ut.n }, (_, i) => (
              <rect
                key={i}
                x={20 + i * pw}
                y={40}
                width={pw}
                height={40}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (!unitOk) setColored(i);
                }}
              />
            ))}
          </svg>
          {colored !== null && (
            <div className="space-y-2">
              <div className="text-center text-sm font-bold text-slate-700">
                Ez 1 {PART_NAME[ut.n]} rész. Hány {ut.small}?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {unitOpts.map((v) => (
                  <OptButton key={v} v={`${v} ${ut.small}`} onClick={() => !unitOk && setUnitPick(v)} state={unitPick === v ? (unitOk ? 'ok' : 'bad') : null} />
                ))}
              </div>
            </div>
          )}
          {unitPick !== null && !unitOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{unitHint(ut, unitPick)}</div>
          )}
          {unitOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {ut.whole} = {ut.total} {ut.small}, és {ut.total} : {ut.n} = {unitAnswer}. {Art(ut.whole)} {ut.whole} {PART_OF[ut.n]} {unitAnswer} {ut.small}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionAmountsG3Theory;
