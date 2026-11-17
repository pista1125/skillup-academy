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
  NeighboursSvg,
  TenRoundSvg,
  HundredRoundSvg,
  NearThousandSvg,
  TwoWaysSvg,
  BackwardsSvg
} from './Rounding1000G3Figures';
import { NumLine, OptButton } from '../szamok-1000-ig/Numbers1000G3Parts';
import { roundTen, roundHundred, makeTwoWay, TwoWayTask, makeGuess, GuessTask, guessFits } from './Rounding1000G3Parts';

export const Rounding1000G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Kerekítsd kétféleképpen! ----
  const [tw, setTw] = useState<TwoWayTask>({ n: 846, tenOpts: [840, 850, 800], hunOpts: [900, 800, 850] });
  const [tenPick, setTenPick] = useState<number | null>(null);
  const [hunPick, setHunPick] = useState<number | null>(null);
  const [twStreak, setTwStreak] = useState(0);
  const tenOk = tenPick === roundTen(tw.n);
  const hunOk = hunPick === roundHundred(tw.n);
  const tDigit = Math.floor(tw.n / 10) % 10;
  const eDigit = tw.n % 10;
  const newTw = () => {
    setTw(makeTwoWay(tw.n));
    setTenPick(null);
    setHunPick(null);
  };
  const pickTen = (v: number) => {
    if (tenOk) return;
    setTenPick(v);
    if (v === roundTen(tw.n) && hunOk) setTwStreak((s) => s + 1);
    if (v !== roundTen(tw.n)) setTwStreak(0);
  };
  const pickHun = (v: number) => {
    if (hunOk) return;
    setHunPick(v);
    if (v === roundHundred(tw.n) && tenOk) setTwStreak((s) => s + 1);
    if (v !== roundHundred(tw.n)) setTwStreak(0);
  };
  let tenHint = '';
  if (tenPick !== null && !tenOk) {
    if (tenPick % 100 === 0 && tenPick !== Math.floor(tw.n / 10) * 10 && tenPick !== Math.floor(tw.n / 10) * 10 + 10)
      tenHint = 'Ez kerek százas. Most a tízes szomszédok közül válassz!';
    else tenHint = `Nézd az egyest: ${eDigit}. ${eDigit < 5 ? '0, 1, 2, 3, 4: lefelé kerekítünk.' : '5, 6, 7, 8, 9: felfelé kerekítünk.'}`;
  }
  let hunHint = '';
  if (hunPick !== null && !hunOk) {
    if (hunPick % 100 !== 0) hunHint = 'Ez tízesre kerekített érték. Százasra kerek százas kell!';
    else if (tDigit === 4 && eDigit >= 5) hunHint = `Ne kerekíts kétszer! Csak a tízest nézd: ${tDigit}. Ez kisebb, mint 5, ezért lefelé.`;
    else hunHint = `Nézd a tízest: ${tDigit}. ${tDigit < 5 ? '0–4: lefelé kerekítünk.' : '5–9: felfelé kerekítünk.'}`;
  }
  const lo = Math.floor(tw.n / 100) * 100;

  // ---- Labor II: Gondoltam egy számra ----
  const [g, setG] = useState<GuessTask>({ kind: 'ten', target: 740, chips: [736, 745, 741, 731, 744, 750, 739, 734] });
  const [sel, setSel] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const toggle = (v: number) => {
    if (checked) return;
    setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
  };
  const goodChips = g.chips.filter((v) => guessFits(g.kind, g.target, v));
  const missed = goodChips.filter((v) => !sel.includes(v)).length;
  const wrong = sel.filter((v) => !guessFits(g.kind, g.target, v)).length;
  const allOk = checked && missed === 0 && wrong === 0;
  const newGuess = () => {
    setG(makeGuess(g.target));
    setSel([]);
    setChecked(false);
  };
  const rangeText =
    g.kind === 'ten'
      ? `${g.target - 5}-től ${Math.min(g.target + 4, 1000)}-ig`
      : `${g.target - 50}-től ${Math.min(g.target + 49, 1000)}-ig`;

  return (
    <TheoryTemplate
      topicId="g3-count-1000"
      subtopicId="szamszomszedok-kerekites"
      grade={3}
      chapterId="szamolas-1000-ig"
      title="2. Számszomszédok, kerekítés"
      subtitle="Egyes, tízes, százas szomszédok 1000-ig; kerekítés tízesre és százasra, az 1000 közelében is."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG"
      themeColor="teal"
      pdfFilename="3_osztaly_kerekites_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — KEREKÍTÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-base font-black text-teal-900 dark:text-teal-200">
              849 ≈ 850 (tízesre) &nbsp; 849 ≈ 800 (százasra)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Tízesre: nézd az <strong>egyest</strong>! Százasra: nézd a <strong>tízest</strong>!</li>
              <li>0, 1, 2, 3, 4: lefelé. 5, 6, 7, 8, 9: felfelé.</li>
              <li>Csak egyszer kerekíts, mindig az eredeti számból!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 111. o." badgeColor="teal">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az 500-as számkörben már kerekítettél. Most <strong>1000-ig</strong> folytatjuk.</p>
          <p>Megkeressük a szomszédokat. Kerekítünk tízesre és százasra.</p>
          <p>Új: néha az <strong>1000</strong> lesz a kerekített érték!</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Számszomszédok" badge="Hat szomszéd" badgeColor="emerald">
        <NeighboursSvg />
        <TheoryTable
          headers={['Szám', 'Tízes szomszédok', 'Százas szomszédok']}
          rows={[
            ['683', '680 és 690', '600 és 700'],
            ['960', '950 és 970', '900 és 1000'],
            ['995', '990 és 1000', '900 és 1000'],
            ['800', '790 és 810', '700 és 900']
          ]}
        />
        <TheoryCallout type="info" title="Kerek szám szomszédja">
          A 800 kerek százas. Ő nem lehet a saját szomszédja. Ezért a százas szomszédai a 700 és a 900.
        </TheoryCallout>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Kerekítés tízesre" badge="Nézd az egyest!" badgeColor="blue">
        <TenRoundSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Melyik tízes szomszédhoz van közelebb a szám? Oda kerekítünk.</p>
          <p>A 875 pont középen van. Ilyenkor <strong>felfelé</strong> kerekítünk: 875 ≈ 880.</p>
          <p>Ha az egyes 0, a szám már kerek tízes. Az marad: 870 ≈ 870.</p>
        </div>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Kerekítés százasra" badge="Nézd a tízest!" badgeColor="orange">
        <HundredRoundSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Százasra a <strong>tízes</strong> jegyét nézzük.</p>
          <p>738: a tízes 3, lefelé: 700. 762: a tízes 6, felfelé: 800.</p>
          <p>A 750 középen van, ezért felfelé: 750 ≈ 800.</p>
        </div>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Közel az 1000-hez" badge="Új!" badgeColor="emerald">
        <NearThousandSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Tízesre" badge="995-től" badgeColor="emerald">
            <p className="text-sm text-slate-700">995, 996, 997, 998, 999 tízesre kerekítve <strong>1000</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Százasra" badge="950-től" badgeColor="purple">
            <p className="text-sm text-slate-700">950-től 999-ig minden szám százasra kerekítve <strong>1000</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Egy szám, kétféle kerekítés" badge="Tízesre és százasra" badgeColor="indigo">
        <TwoWaysSvg />
        <TheoryCallout type="tip" title="Mindig az eredeti számból!">
          A 849 tízesre 850. De százasra <strong>nem</strong> a 850-et kerekítjük tovább! A 849 tízese 4, ezért 849 ≈ 800.
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Visszafelé: melyik számra gondoltam?" badge="Visszafelé" badgeColor="sky">
        <BackwardsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Mely számok százasra kerekítve 600-ak? <strong>550-től 649-ig</strong> mindegyik.</p>
          <p>Tízesre 740 lesz: 735, 736, … , 744. Ez 10 szám.</p>
        </div>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Biztos, lehet, lehetetlen" badge="Letakart jegy" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="6 4 □" badge="Biztos" badgeColor="emerald">
            <p className="text-sm text-slate-700">640-től 649-ig mind százasra 600. Biztosan ≈ 600.</p>
          </TheoryCard>
          <TheoryCard title="6 □ 2" badge="Lehet" badgeColor="amber">
            <p className="text-sm text-slate-700">Ha □ kicsi (0–4): ≈ 600. Ha nagy (5–9): ≈ 700. Lehet, de nem biztos.</p>
          </TheoryCard>
          <TheoryCard title="7 □ 1" badge="Lehetetlen" badgeColor="rose">
            <p className="text-sm text-slate-700">701-től 791-ig: 700 vagy 800. Sosem 600. Lehetetlen.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 9 */}
      <TheorySection title="9. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) 965 kétféleképpen" badge="Kerekítés" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Tízesre: az egyes 5 → fel: 970.</li>
              <li>Százasra: a tízes 6 → fel: 1000.</li>
              <li>965 ≈ 970 és 965 ≈ <strong>1000</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kb. 430 matrica" badge="Visszafelé" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Tízesre kerekítve 430 matricám van.</li>
              <li>Legkevesebb: 425. Legtöbb: 434.</li>
              <li>A 435 már 440 lenne!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Becslés a boltban" badge="Pénz" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy játék ára 486 Ft, egy könyvé 309 Ft.</li>
              <li>Százasra: kb. 500 Ft és kb. 300 Ft.</li>
              <li>Együtt kb. <strong>800 Ft</strong>. Elég rá 1000 Ft.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 10 */}
      <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A 849 százasra"
          wrong="849 ≈ 850 ≈ 900"
          wrongExplanation="Kétszer kerekítettél. Így messzebbre jutottál!"
          correct="849 ≈ 800"
          correctExplanation="Százasra csak a tízest nézd: 4. Ez lefelé visz."
          tip="Egy szám, egy kerekítés, mindig az eredeti számból."
        />
        <TheoryCallout type="warning" title="A 997 tízesre">
          A 997 tízes szomszédai a 990 és az <strong>1000</strong>. Az egyes 7, ezért 997 ≈ 1000, nem 990.
        </TheoryCallout>
      </TheorySection>

      {/* 11 Labor I */}
      <TheorySection title="11. Labor I: Kerekítsd kétféleképpen!" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newTw} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="ml-auto text-sm font-bold text-teal-800 bg-teal-50 rounded-xl px-3 py-2">Jó megoldások egymás után: {twStreak}</div>
          </div>
          <div className="bg-teal-50 rounded-xl p-3 text-center text-teal-900 font-bold">
            Kerekítsd ezt a számot tízesre és százasra: <span className="text-3xl align-middle">{tw.n}</span>
          </div>
          <NumLine lo={lo} hi={lo + 100} tick={10} big={50} labels={[lo, lo + 50, lo + 100]} marks={[{ v: tw.n, color: '#0d9488' }]} W={340} H={96} className="w-full h-auto" />
          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-700">Tízesre:</div>
            <div className="flex flex-wrap gap-2">
              {tw.tenOpts.map((v) => (
                <OptButton key={v} v={v} onClick={() => pickTen(v)} state={tenPick === v ? (tenOk ? 'ok' : 'bad') : null} />
              ))}
            </div>
            {tenHint && <div className="rounded-xl p-2 text-sm font-bold bg-rose-100 text-rose-800">{tenHint}</div>}
          </div>
          <div className="space-y-2">
            <div className="text-sm font-bold text-slate-700">Százasra:</div>
            <div className="flex flex-wrap gap-2">
              {tw.hunOpts.map((v) => (
                <OptButton key={v} v={v} onClick={() => pickHun(v)} state={hunPick === v ? (hunOk ? 'ok' : 'bad') : null} />
              ))}
            </div>
            {hunHint && <div className="rounded-xl p-2 text-sm font-bold bg-rose-100 text-rose-800">{hunHint}</div>}
          </div>
          {tenOk && hunOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {tw.n} ≈ {roundTen(tw.n)} (tízesre) és {tw.n} ≈ {roundHundred(tw.n)} (százasra). Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 12 Labor II */}
      <TheorySection title="12. Labor II: Gondoltam egy számra" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newGuess} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center text-purple-900 font-bold">
            A számom {g.kind === 'ten' ? 'tízesre' : 'százasra'} kerekítve <span className="text-2xl">{g.target}</span>. Koppints minden számra, amelyik lehet!
          </div>
          <div className="grid grid-cols-4 gap-2">
            {g.chips.map((v) => {
              const on = sel.includes(v);
              const fit = guessFits(g.kind, g.target, v);
              const state = checked ? (fit && on ? 'ok' : on && !fit ? 'bad' : fit && !on ? 'sel' : null) : on ? 'sel' : null;
              return <OptButton key={v} v={v} onClick={() => toggle(v)} state={state} />;
            })}
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => setChecked(true)} disabled={checked} className="px-6 py-3 rounded-xl bg-purple-500 disabled:bg-slate-200 text-white font-black min-h-[52px]">Ellenőrzés</button>
            {checked && !allOk && (
              <button onClick={() => setChecked(false)} className="px-6 py-3 rounded-xl bg-white border-2 border-purple-300 text-purple-800 font-black min-h-[52px]">Javítok</button>
            )}
          </div>
          {checked && !allOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              {wrong > 0 ? `${wrong} piros szám nem jó. ` : ''}
              {missed > 0 ? `${missed} jó szám kimaradt (kék keret). ` : ''}
              Tipp: {g.kind === 'ten' ? 'nézd az egyest!' : 'nézd a tízest!'}
            </div>
          )}
          {allOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {g.kind === 'ten' ? 'Tízesre' : 'Százasra'} kerekítve {rangeText} minden szám {g.target} lesz. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Rounding1000G3Theory;
