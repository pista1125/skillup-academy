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
  CrossedDiscsSubSvg,
  BeadStringSubSvg,
  FactFamilyCardSvg,
  BackwardJumpLineSvg,
  RadialTenWheelSvg
} from './Sub10G2Figures';
import { DiscG, Line010G } from './Sub10G2Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

type Lab2Mode = 'diff' | 'sub' | 'min';
interface Lab2Task {
  mode: Lab2Mode;
  minuend: number;
  subtrahend: number;
  difference: number;
}

const makeLab2Task = (): Lab2Task => {
  const modePick: Lab2Mode[] = ['diff', 'sub', 'min'];
  const mode = modePick[rnd(0, 2)];
  const minuend = rnd(2, 10);
  const subtrahend = rnd(0, minuend);
  const difference = minuend - subtrahend;
  return { mode, minuend, subtrahend, difference };
};

export const Sub10G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: korongok áthúzása
  const [lab1Total, setLab1Total] = useState<number>(8);
  const [lab1TargetTake, setLab1TargetTake] = useState<number>(3);
  const [crossed, setCrossed] = useState<boolean[]>(() => Array(8).fill(false));
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);

  const crossedCount = crossed.filter(Boolean).length;
  const remainingCount = lab1Total - crossedCount;

  const toggleDisc = (idx: number) => {
    setCrossed((prev) => prev.map((v, i) => (i === idx ? !v : v)));
    setMsg1(null);
  };

  const newLab1 = () => {
    const total = rnd(4, 10);
    const take = rnd(0, total);
    setLab1Total(total);
    setLab1TargetTake(take);
    setCrossed(Array(total).fill(false));
    setMsg1(null);
  };

  const checkLab1 = () => {
    const expectedRem = lab1Total - lab1TargetTake;
    if (crossedCount === lab1TargetTake) {
      setMsg1({
        ok: true,
        text: `Ügyes vagy! ${lab1Total} − ${lab1TargetTake} = ${expectedRem}. Ellenőrzés: ${expectedRem} + ${lab1TargetTake} = ${lab1Total}.`
      });
    } else if (crossedCount < lab1TargetTake) {
      setMsg1({
        ok: false,
        text: `Még csak ${crossedCount} korongot húztál át, pedig ${lab1TargetTake}-at kell elvenni! Koppints még ${lab1TargetTake - crossedCount} korongra!`
      });
    } else {
      setMsg1({
        ok: false,
        text: `Most ${crossedCount} korongot húztál át, de csak ${lab1TargetTake}-at kell elvenni. Koppints vissza ${crossedCount - lab1TargetTake} korongra!`
      });
    }
  };

  // Labor II: hiányzó szám pótlása és ellenőrzés
  const [lab2, setLab2] = useState<Lab2Task>(() => ({
    mode: 'min',
    minuend: 9,
    subtrahend: 4,
    difference: 5
  }));
  const [picked, setPicked] = useState<number | null>(null);
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);

  const expectedLab2 =
    lab2.mode === 'diff'
      ? lab2.difference
      : lab2.mode === 'sub'
      ? lab2.subtrahend
      : lab2.minuend;

  const newLab2 = () => {
    setLab2(makeLab2Task());
    setPicked(null);
    setMsg2(null);
  };

  const checkLab2 = () => {
    if (picked === null) {
      setMsg2({ ok: false, text: 'Előbb válassz egy számot 0 és 10 között!' });
      return;
    }
    if (picked === expectedLab2) {
      setMsg2({
        ok: true,
        text: `Remek! ${lab2.minuend} − ${lab2.subtrahend} = ${lab2.difference}. Ellenőrzés: ${lab2.difference} + ${lab2.subtrahend} = ${lab2.minuend}.`
      });
    } else if (lab2.mode === 'min') {
      setMsg2({
        ok: false,
        text: `Nem ${picked}. Keresd a kisebbítendőt: add össze a másik két számot (${lab2.difference} + ${lab2.subtrahend})!`
      });
    } else if (lab2.mode === 'sub') {
      setMsg2({
        ok: false,
        text: `Nem ${picked}. Gondolj arra: ${lab2.difference}-höz mennyit kell adni, hogy ${lab2.minuend} legyen?`
      });
    } else {
      setMsg2({
        ok: false,
        text: `Nem ${picked}. Indulj a ${lab2.minuend}-ről a számegyenesen, és lépj vissza ${lab2.subtrahend}-et!`
      });
    }
  };

  const lab2FormulaText =
    lab2.mode === 'diff'
      ? `${lab2.minuend} − ${lab2.subtrahend} = □`
      : lab2.mode === 'sub'
      ? `${lab2.minuend} − □ = ${lab2.difference}`
      : `□ − ${lab2.subtrahend} = ${lab2.difference}`;

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="kivonas-10-es-szamkor"
      grade={2}
      chapterId="szamolas-20-ig"
      title="3. Kivonás 10-es számkör"
      subtitle="Elvétel, különbség, műveletcsalád, ellenőrzés összeadással, kivonás 0-val és pótlás 10-ig."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="rose"
      pdfFilename="2_osztaly_kivonas_10_es_szamkor_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben, a párosítóban és a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A KIVONÁS ÉS ELLENŐRZÉS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base font-black text-rose-900 dark:text-rose-200">
              8 − 3 = 5 &nbsp;|&nbsp; Ellenőrzés: 5 + 3 = 8
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Kisebbítendő − Kivonandó = Különbség</strong></li>
              <li>Ha <strong>0</strong>-t vonunk ki, a szám nem változik: <strong>9 − 0 = 9</strong>.</li>
              <li>Ha egy számból önmagát vonjuk ki, <strong>0</strong> marad: <strong>7 − 7 = 0</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 10–11. o." badgeColor="rose">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Ebben a leckében <strong>0 és 10 között</strong> gyakoroljuk a kivonást.</p>
          <p>Megnézzük, hogyan mutatjuk a kivonást korongokkal, gyöngysoron és számegyenesen.</p>
          <p>Megtanuljuk, hogyan ellenőrizzük a kivonást <strong>összeadással</strong>, és hogyan találjuk meg a hiányzó számot.</p>
        </div>
      </TheorySection>

      {/* 2. Elvétel és különbség */}
      <TheorySection title="2. Elvétel és különbség" badge="Kivonás" badgeColor="blue">
        <CrossedDiscsSubSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A kivonás részei" badge="8 − 3 = 5" badgeColor="rose">
            <p className="text-sm text-slate-700">
              A <strong>8</strong> a kisebbítendő, a <strong>3</strong> a kivonandó, az <strong>5</strong> pedig a <strong>különbség</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Mikor vonunk ki?" badge="3 helyzet" badgeColor="sky">
            <ul className="list-disc pl-4 space-y-1 text-sm text-slate-700">
              <li><strong>Elveszünk</strong> valamennyit: mennyi marad?</li>
              <li><strong>Hiányzó részt</strong> keresünk: hány kell még?</li>
              <li><strong>Összehasonlítunk</strong>: mennyivel több vagy kevesebb?</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. A 10-es gyöngysor és a kivonókerék */}
      <TheorySection title="3. Kivonás 10-ből: gyöngysor és kerék" badge="10 bontása" badgeColor="emerald">
        <BeadStringSubSvg />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RadialTenWheelSvg />
          <div className="space-y-3 text-sm text-slate-700">
            <p>Ha ismered a <strong>10-es számpárokat</strong> (például 7 + 3 = 10), a 10-ből való kivonás pillanatok alatt megy!</p>
            <p>A kerék közepén a <strong>10</strong> áll. A nyilak mutatják, mennyit kell kivonni belőle.</p>
            <TheoryCallout type="tip" title="Fejtsd meg a „?” köröket!">
              10 − 3 = <strong>7</strong>, 10 − 4 = <strong>6</strong>, 10 − 7 = <strong>3</strong>, 10 − 8 = <strong>2</strong>.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Műveletcsalád és ellenőrzés */}
      <TheorySection title="4. Műveletcsalád és ellenőrzés összeadással" badge="4 művelet" badgeColor="amber">
        <FactFamilyCardSvg />
        <TheoryTable
          headers={['Két rész', 'Összeadások', 'Kivonások', 'Ellenőrzés']}
          rows={[
            ['4 és 5', '4 + 5 = 9, 5 + 4 = 9', '9 − 4 = 5, 9 − 5 = 4', '5 + 4 = 9'],
            ['2 és 6', '2 + 6 = 8, 6 + 2 = 8', '8 − 2 = 6, 8 − 6 = 2', '6 + 2 = 8'],
            ['3 és 7', '3 + 7 = 10, 7 + 3 = 10', '10 − 3 = 7, 10 − 7 = 3', '7 + 3 = 10']
          ]}
        />
        <TheoryCallout type="info" title="Így ellenőrizz minden kivonást!">
          Add össze az eredményt a kivonandóval! Ha a kisebbítendőt kapod vissza, biztosan jól számoltál.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Különleges esetek és számegyenes */}
      <TheorySection title="5. Kivonás 0-val és visszalépés a számegyenesen" badge="0–10" badgeColor="teal">
        <BackwardJumpLineSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Nullát vonunk ki" badge="9 − 0 = 9" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Ha egy tálcán 9 dió van, és <strong>egyet sem</strong> veszel el, mind a <strong>9</strong> megmarad.
            </p>
          </TheoryCard>
          <TheoryCard title="Önmagát vonjuk ki" badge="7 − 7 = 0" badgeColor="orange">
            <p className="text-sm text-slate-700">
              Ha 7 matricából mind a <strong>7</strong>-et felragasztod, <strong>0</strong> matrica marad.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hiányzó kivonandó" badge="8 − □ = 3" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>8 korongból marad 3. Mennyit vettünk el?</li>
              <li>Vedd el a 8-ból a 3-at: 8 − 3 = <strong>5</strong>.</li>
              <li>Ellenőrzés: 8 − <strong>5</strong> = 3.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hiányzó kisebbítendő" badge="□ − 4 = 5" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Elvettünk 4-et, és maradt 5.</li>
              <li>Tedd vissza a 4-et az 5-höz: 5 + 4 = <strong>9</strong>.</li>
              <li>Ellenőrzés: <strong>9</strong> − 4 = 5.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Nyitott egyenlőtlenség" badge="10 − 6 > □" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Először számold ki a bal oldalt: 10 − 6 = 4.</li>
              <li>Keressük, mely számokra igaz: 4 &gt; □.</li>
              <li>A 0–10 számok közül jó: <strong>0, 1, 2, 3</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="□ − 4 = 3 — mennyi a hiányzó szám?"
          wrong="4 − 3 = 1"
          wrongExplanation="Ha 1 − 4-et írnál, az 1-ből nem tudsz 4-et elvenni! A művelet elejéről hiányzik a legnagyobb szám."
          correct="3 + 4 = 7, tehát 7 − 4 = 3"
          correctExplanation="A maradékot (3) és az elvett részt (4) összeadjuk, így visszakapjuk az eredeti mennyiséget (7)."
          tip="Mindig olvasd vissza a kész műveletet! A 7 − 4 = 3 igaz, az 1 − 4 = 3 nem."
        />
        <TheoryCallout type="warning" title="A kivonásban nem cserélhetők fel a számok!">
          <strong>9 − 2 = 7</strong>, de 2-ből nem tudunk 9-et elvenni a 0–10 számkörben. A <strong>6 − 0 = 6</strong> és a <strong>6 − 6 = 0</strong> eredményét se keverd össze!
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Vedd el a korongokat!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 text-sm sm:text-base">
            Az asztalon <strong>{lab1Total}</strong> korong van. Koppints korongokra és húzz át pontosan{' '}
            <span className="text-2xl font-black text-rose-600 align-middle mx-1">{lab1TargetTake}</span> darabot!
          </div>
          <svg viewBox="0 0 340 76" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            {Array.from({ length: lab1Total }, (_, i) => {
              const step = 30;
              const startX = 170 - ((lab1Total - 1) * step) / 2;
              return (
                <DiscG
                  key={i}
                  cx={startX + i * step}
                  cy={32}
                  r={11}
                  crossed={crossed[i]}
                />
              );
            })}
            <text x="170" y="64" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">
              {lab1Total} − {crossedCount} = {remainingCount}
            </text>
          </svg>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: lab1Total }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleDisc(i)}
                className={`min-w-[48px] min-h-[48px] rounded-xl font-black text-sm border-2 transition-all ${
                  crossed[i]
                    ? 'bg-rose-100 border-rose-500 text-rose-700 line-through'
                    : 'bg-sky-100 border-sky-400 text-sky-900 hover:bg-sky-200'
                }`}
              >
                {i + 1}.
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={checkLab1}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newLab1}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
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

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Pótold a hiányzó számot és ellenőrizd!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900">
            Mi kerül a □ helyére?{' '}
            <span className="text-2xl font-black ml-2">{lab2FormulaText}</span>
          </div>
          <svg viewBox="0 0 260 110" className="w-full max-w-md h-auto mx-auto bg-slate-50 rounded-xl border border-slate-200">
            <Line010G
              from={lab2.mode === 'min' ? undefined : lab2.minuend}
              to={lab2.mode === 'min' ? undefined : lab2.difference}
              jumpLabel={
                lab2.mode === 'diff'
                  ? `− ${lab2.subtrahend}`
                  : lab2.mode === 'sub'
                  ? '− ?'
                  : undefined
              }
              markStart={lab2.mode === 'min' ? undefined : String(lab2.minuend)}
              markEnd={lab2.mode === 'diff' ? '?' : lab2.mode === 'sub' ? String(lab2.difference) : undefined}
              y={66}
              x0={20}
              x1={232}
            />
            {lab2.mode === 'min' && (
              <text x="130" y="28" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b45309">
                Tipp: {lab2.difference} + {lab2.subtrahend} = ?
              </text>
            )}
          </svg>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: 11 }, (_, n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  setPicked(n);
                  setMsg2(null);
                }}
                className={`min-w-[48px] min-h-[48px] rounded-xl font-black text-base border-2 transition-all ${
                  picked === n
                    ? 'bg-emerald-600 text-white border-emerald-800'
                    : 'bg-white text-slate-800 border-slate-300 hover:bg-emerald-50'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={checkLab2}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newLab2}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>
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

export default Sub10G2Theory;
