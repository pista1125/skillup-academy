import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { RomanSignsSvg, RomanOriginSvg, AddRuleSvg, SubtractRuleSvg, ThreeRuleSvg, WorkedXXIVSvg } from './RomanBasicsG3Figures';
import { SIGN_COLOR, SIGN_VALUE, toRoman, romanValue, romanProblem, signOps } from './RomanBasicsG3Utils';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Színes római szám HTML-ben. */
const Rom: React.FC<{ s: string; big?: boolean }> = ({ s, big }) => (
  <span className={`font-serif font-black ${big ? 'text-4xl' : 'text-lg'} tracking-wide`}>
    {s.split('').map((ch, i) => (
      <span key={i} style={{ color: SIGN_COLOR[ch] }}>
        {ch}
      </span>
    ))}
  </span>
);

/** Labor I célszámai: főleg 1–39 (I, V, X), néha L és C is. */
const TARGET_POOL = [
  ...Array.from({ length: 39 }, (_, i) => i + 1),
  40, 45, 50, 55, 60, 70, 90, 100
];
const newTarget = (avoid?: number) => {
  for (;;) {
    const t = TARGET_POOL[rnd(0, TARGET_POOL.length - 1)];
    if (t !== avoid) return t;
  }
};

/** Labor II párjai: két jel – hozzáadjuk vagy elvesszük? */
const PAIRS = ['VI', 'IV', 'XI', 'IX', 'XV', 'LX', 'XL', 'XC', 'LV', 'LI', 'XX', 'II'];

export const RomanBasicsG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Jelkirakó
  const [target, setTarget] = useState<number>(14);
  const [seq, setSeq] = useState<string>('');
  const problem = romanProblem(seq);
  const value = seq ? romanValue(seq) : 0;
  const solved = seq === toRoman(target);
  const addSign = (ch: string) => {
    if (seq.length < 9) setSeq(seq + ch);
  };

  // Labor II: Hozzáad vagy elvesz?
  const [pairIdx, setPairIdx] = useState<number>(0);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [msg, setMsgRaw] = useState<{ ok: boolean; text: string } | null>(null);
  const setMsg = (text: string | null, ok = false) => setMsgRaw(text === null ? null : { ok, text });
  const pair = PAIRS[pairIdx];
  const a = SIGN_VALUE[pair[0]];
  const b = SIGN_VALUE[pair[1]];
  const isMinus = a < b;
  const pairValue = romanValue(pair);
  const choices = Array.from(new Set([pairValue, isMinus ? a + b : Math.abs(a - b), Number(`${a}${b}`)])).sort((x, y) => x - y);
  const pickOp = (minus: boolean) => {
    if (minus === isMinus) {
      setStep(2);
      setMsg(
        isMinus
          ? `Jó! A kisebb jel (${pair[0]}) a nagyobb (${pair[1]}) ELŐTT áll, ezért elvesszük.`
          : a === b
            ? 'Jó! Egyforma jelek állnak egymás mellett, ezért összeadjuk.'
            : `Jó! A kisebb jel (${pair[1]}) a nagyobb (${pair[0]}) UTÁN áll, ezért hozzáadjuk.`,
        true
      );
    } else {
      setMsg(
        isMinus
          ? `Nézd meg jobban! Melyik jel áll elöl? A kisebb ${pair[0]} van elöl, a nagyobb ${pair[1]} előtt.`
          : 'Nézd meg jobban! Elöl a nagyobb (vagy egyforma) jel áll. Ilyenkor nem vonunk el.'
      );
    }
  };
  const pickValue = (v: number) => {
    if (v === pairValue) {
      setStep(3);
      setMsg(`Szuper! ${pair} = ${isMinus ? `${b} − ${a}` : `${a} + ${b}`} = ${pairValue}.`, true);
    } else if (v === a + b && isMinus) {
      setMsg(`Ez az összeadás lenne (${a} + ${b}). De itt elveszünk: ${b} − ${a} = ?`);
    } else {
      setMsg(`Számold újra: ${isMinus ? `${b} − ${a}` : `${a} + ${b}`} = ?`);
    }
  };
  const nextPair = () => {
    let i = pairIdx;
    while (i === pairIdx) i = rnd(0, PAIRS.length - 1);
    setPairIdx(i);
    setStep(1);
    setMsg(null);
  };

  return (
    <TheoryTemplate
      topicId="g3-roman-numbers"
      subtopicId="alapveto-szamjegyek-szabalyok"
      grade={3}
      chapterId="romai-szamok"
      title="1. A római számjegyek és alapszabályok"
      subtitle="Az ókori rómaiak betűkkel írták a számokat. Ismerd meg az öt jelet és a három szabályt!"
      badge="3. OSZTÁLY • II. A RÓMAI SZÁMOK • TANANYAG"
      themeColor="amber"
      pdfFilename="3_osztaly_romai_szamjegyek_szabalyok_tananyag.pdf"
      practiceTitle="Készen állsz a római jelekre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — JOBBRA HOZZÁADOD, BALRA ELVESZED',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
              I = 1 • V = 5 • X = 10 • L = 50 • C = 100
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kisebb jel <strong>jobbra</strong>: hozzáadjuk. VI = 5 + 1 = 6.</li>
              <li>Kisebb jel <strong>balra</strong>: elvesszük. IV = 5 − 1 = 4. Csak így: IV, IX, XL, XC.</li>
              <li>Egyforma jelből legfeljebb <strong>3</strong> állhat egymás mellett. A V és az L soha nem ismétlődik.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 26. o." badgeColor="amber">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Régen, az ókori Rómában nem a mi számjegyeinkkel írtak. <strong>Betűkkel</strong> jelölték a számokat.
          </p>
          <p>
            Tavaly már tanultad az <strong>I</strong>, a <strong>V</strong> és az <strong>X</strong> jelet. Most két új jelet is megismersz: az <strong>L</strong>-t és a <strong>C</strong>-t.
          </p>
        </div>
        <RomanSignsSvg />
        <TheoryCallout type="info" title="Nincs nulla!">
          A rómaiaknak nem volt jelük a nullára. A római számok 1-gyel kezdődnek.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="2. Honnan jönnek a jelek?" badge="Érdekesség" badgeColor="sky">
        <RomanOriginSvg />
        <p className="text-sm text-slate-700">
          Az <strong>I</strong> egy vonás, mint egy felemelt ujj. Ha egy V fölé egy fejjel lefelé fordított V-t teszel, <strong>X</strong> lesz belőle. Két ötös: <strong>5 + 5 = 10</strong>.
        </p>
      </TheorySection>

      <TheorySection title="3. Első szabály: jobbra hozzáadjuk" badge="Szabály" badgeColor="emerald">
        <AddRuleSvg />
        <p className="text-sm text-slate-700">
          Ha a kisebb jel a nagyobb <strong>után</strong> (jobbra) áll, <strong>hozzáadjuk</strong>. Az egyforma jeleket is összeadjuk: XX = 10 + 10 = 20.
        </p>
      </TheorySection>

      <TheorySection title="4. Második szabály: balra elvesszük" badge="Szabály" badgeColor="rose">
        <SubtractRuleSvg />
        <p className="text-sm text-slate-700">
          Ha a kisebb jel a nagyobb <strong>előtt</strong> (balra) áll, <strong>elvesszük</strong>. Ez csak négy párnál fordul elő: <strong>IV, IX, XL, XC</strong>.
        </p>
      </TheorySection>

      <TheorySection title="5. Harmadik szabály: legfeljebb 3" badge="Szabály" badgeColor="purple">
        <ThreeRuleSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="I, X, C" badge="ismételhető" badgeColor="sky">
            <p className="text-sm text-slate-700">Legfeljebb 3-szor: III = 3, XXX = 30. A 4 már IV, a 40 már XL.</p>
          </TheoryCard>
          <TheoryCard title="V, L" badge="nem ismételhető" badgeColor="rose">
            <p className="text-sm text-slate-700">Soha nem írjuk kétszer, és nem vonjuk el. A 10 nem VV, hanem X.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <WorkedXXIVSvg />
        <TheoryTable
          headers={['Római szám', 'Így számolunk', 'Érték']}
          rows={[
            ['XII', '10 + 1 + 1', '12'],
            ['XVII', '10 + 5 + 1 + 1', '17'],
            ['XIX', '10 + (10 − 1)', '19'],
            ['XXXV', '10 + 10 + 10 + 5', '35'],
            ['LV', '50 + 5', '55'],
            ['XC', '100 − 10', '90']
          ]}
        />
        <TheoryCallout type="tip" title="Így olvasd!">
          Haladj balról jobbra. Minden jelnél nézd meg a szomszédját: ha utána nagyobb jön, ezt a jelet elveszed, különben hozzáadod.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hogyan írjuk a 9-et?"
          wrong="VIIII  vagy  VIV"
          wrongExplanation="A VIIII-ben 4 egyforma jel áll egymás mellett. A VIV-ben a V kétszer szerepel."
          correct="IX = 10 − 1 = 9"
          correctExplanation="Az I a X előtt áll, ezért elvesszük."
          tip="Az I csak közvetlenül a V vagy az X előtt állhat, ha el akarjuk venni."
        />
        <TheoryTrapBox
          title="Hogyan írjuk az 5-öt?"
          wrong="VX"
          wrongExplanation="A V-t soha nem vonjuk el. A VX nem római szám."
          correct="V"
          correctExplanation="Az 5-nek saját jele van."
          tip="Csak az I és az X állhat elvevő jelként (IV, IX, XL, XC)."
        />
      </TheorySection>

      {/* Labor I */}
      <TheorySection title="8. Labor I: Jelkirakó" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-amber-50 rounded-xl p-3 text-center text-amber-900">
            Rakd ki rómaiul: <span className="text-3xl font-black">{target}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {['I', 'V', 'X', 'L', 'C'].map((ch) => (
              <button
                key={ch}
                onClick={() => addSign(ch)}
                className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-amber-400 font-serif text-3xl font-black"
                style={{ color: SIGN_COLOR[ch] }}
                aria-label={`${ch} jel`}
              >
                {ch}
              </button>
            ))}
            <button onClick={() => setSeq(seq.slice(0, -1))} className="px-4 h-16 rounded-2xl bg-slate-200 text-slate-700 font-bold" aria-label="utolsó jel törlése">
              ⌫
            </button>
            <button onClick={() => setSeq('')} className="px-4 h-16 rounded-2xl bg-slate-200 text-slate-700 font-bold text-sm">
              Törlés
            </button>
          </div>
          <div className="min-h-[96px] rounded-xl border-2 border-dashed border-slate-300 p-3 flex flex-wrap items-end justify-center gap-2">
            {seq ? (
              signOps(seq).map((o, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-4xl font-black" style={{ color: SIGN_COLOR[o.ch] }}>
                    {o.ch}
                  </div>
                  <div className={`text-sm font-bold ${o.minus ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {o.minus ? '−' : '+'}
                    {o.v}
                  </div>
                </div>
              ))
            ) : (
              <span className="text-slate-400 text-sm self-center">Nyomd meg a jeleket!</span>
            )}
          </div>
          {seq && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                solved ? 'bg-emerald-100 text-emerald-800' : problem ? 'bg-rose-100 text-rose-800' : 'bg-sky-50 text-sky-900'
              }`}
            >
              {solved
                ? `Szuper! ${seq} = ${target}.`
                : problem
                  ? problem
                  : value < target
                    ? `${seq} = ${value}. Ez kevesebb, mint ${target}. Tegyél hozzá még!`
                    : `${seq} = ${value}. Ez több, mint ${target}. Törölj egy jelet!`}
            </div>
          )}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setTarget(newTarget(target));
                setSeq('');
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 text-white font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>

      {/* Labor II */}
      <TheorySection title="9. Labor II: Hozzáadjuk vagy elvesszük?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center">
            <Rom s={pair} big />
          </div>
          <div className="text-center text-sm text-purple-900 font-bold">
            {step === 1 ? '1. lépés: Mit csinálunk a kisebb jellel?' : step === 2 ? '2. lépés: Mennyi ez a szám?' : 'Kész!'}
          </div>
          {step === 1 && (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => pickOp(false)} className="rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black py-4 min-h-[64px]">
                + Hozzáadjuk
              </button>
              <button onClick={() => pickOp(true)} className="rounded-2xl bg-rose-100 border-2 border-rose-400 text-rose-900 font-black py-4 min-h-[64px]">
                − Elvesszük
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="grid grid-cols-3 gap-3">
              {choices.map((v) => (
                <button key={v} onClick={() => pickValue(v)} className="rounded-2xl bg-purple-100 border-2 border-purple-400 text-purple-900 text-2xl font-black py-3 min-h-[64px]">
                  {v}
                </button>
              ))}
            </div>
          )}
          {msg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>{msg.text}</div>
          )}
          <div className="flex justify-center">
            <button onClick={nextPair} className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold min-h-[48px]">
              Új feladat
            </button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RomanBasicsG3Theory;
