import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { RomanSignsSvg, RomanRulesSvg, SwimCapsSvg, PostcardSvg, RomanClockSvg, MatchsticksSvg } from './RomanNumerals4Figures';

// ---------------------------------------------------------------------------
// Segédfüggvények (1–39, jelek: I, V, X)
// ---------------------------------------------------------------------------
const SIGN: Record<string, number> = { I: 1, V: 5, X: 10 };

const toRoman4 = (n: number): string => {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  let r = '';
  let m = n;
  for (const [v, s] of map) {
    while (m >= v) {
      r += s;
      m -= v;
    }
  }
  return r;
};

const romanValue = (s: string): number => {
  let t = 0;
  for (let i = 0; i < s.length; i++) {
    const a = SIGN[s[i]];
    const b = SIGN[s[i + 1]] ?? 0;
    t += a < b ? -a : a;
  }
  return t;
};

/** Felbontás szöveggé: XXIV → 10 + 10 + (5 − 1) */
const explain = (n: number): string => {
  const parts: string[] = [];
  let m = n;
  while (m >= 10) {
    parts.push('10');
    m -= 10;
  }
  if (m === 9) parts.push('(10 − 1)');
  else if (m === 4) parts.push('(5 − 1)');
  else {
    if (m >= 5) {
      parts.push('5');
      m -= 5;
    }
    for (let i = 0; i < m; i++) parts.push('1');
  }
  return parts.join(' + ');
};

const tileColor = (c: string) => (c === 'X' ? 'bg-red-100 border-red-400 text-red-700' : c === 'V' ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-orange-100 border-orange-400 text-orange-700');

// ---------------------------------------------------------------------------
// Labor I: Átváltó – arab számból római
// ---------------------------------------------------------------------------
const ConverterLab: React.FC = () => {
  const [n, setN] = useState(24);
  const r = toRoman4(n);
  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => setN(Math.max(1, n - 1))} className="w-14 h-14 rounded-xl bg-orange-100 border-2 border-orange-300 text-2xl font-black text-orange-700">−</button>
        <div className="text-5xl font-black text-slate-800 w-24 text-center">{n}</div>
        <button onClick={() => setN(Math.min(39, n + 1))} className="w-14 h-14 rounded-xl bg-orange-100 border-2 border-orange-300 text-2xl font-black text-orange-700">+</button>
      </div>
      <input type="range" min={1} max={39} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full accent-orange-500" aria-label="szám" />
      <div className="flex justify-center gap-2 flex-wrap">
        {r.split('').map((c, i) => (
          <div key={i} className={`w-14 h-16 rounded-xl border-4 flex items-center justify-center text-3xl font-black font-serif ${tileColor(c)}`}>{c}</div>
        ))}
      </div>
      <div className="text-center text-lg font-bold text-slate-700">
        {n} = <span className="font-serif text-orange-700">{r}</span> = {explain(n)}
      </div>
      <p className="text-xs text-slate-500 text-center">Figyeld meg: a 4, 9, 14, 19, 24, 29, 34, 39 számoknál az I a V vagy az X ELÉ kerül!</p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Rakd ki! – római szám építése jelekből
// ---------------------------------------------------------------------------
const BUILD_TARGETS = [37, 19, 26, 9, 35, 14, 28, 4, 39, 11, 24, 6];

const BuilderLab: React.FC = () => {
  const [ti, setTi] = useState(0);
  const [built, setBuilt] = useState('');
  const [checked, setChecked] = useState(false);
  const target = BUILD_TARGETS[ti];
  const value = useMemo(() => (built ? romanValue(built) : 0), [built]);
  const valid = built !== '' && value <= 39 && toRoman4(value) === built;
  const correct = valid && value === target;

  const add = (c: string) => {
    if (built.length < 8) setBuilt(built + c);
    setChecked(false);
  };
  const next = () => {
    setTi((ti + 1) % BUILD_TARGETS.length);
    setBuilt('');
    setChecked(false);
  };

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="text-center">
        <div className="text-sm font-bold text-slate-500">Rakd ki római számmal:</div>
        <div className="text-5xl font-black text-amber-600">{target}</div>
      </div>
      <div className="min-h-[4.5rem] flex justify-center items-center gap-2 flex-wrap bg-amber-50 rounded-2xl p-3 border-2 border-dashed border-amber-300">
        {built === '' ? (
          <span className="text-slate-400 font-bold">Koppints a jelekre!</span>
        ) : (
          built.split('').map((c, i) => (
            <div key={i} className={`w-12 h-14 rounded-xl border-4 flex items-center justify-center text-2xl font-black font-serif ${tileColor(c)}`}>{c}</div>
          ))
        )}
      </div>
      <div className="flex justify-center gap-3">
        {['I', 'V', 'X'].map((c) => (
          <button key={c} onClick={() => add(c)} className={`w-16 h-16 rounded-2xl border-4 text-3xl font-black font-serif ${tileColor(c)} hover:scale-105 transition`}>
            {c}
          </button>
        ))}
        <button
          onClick={() => {
            setBuilt(built.slice(0, -1));
            setChecked(false);
          }}
          className="w-16 h-16 rounded-2xl border-4 border-slate-300 bg-slate-100 text-2xl font-black text-slate-600"
          aria-label="törlés"
        >
          ⌫
        </button>
      </div>
      <div className="flex justify-center gap-3">
        <button onClick={() => setChecked(true)} disabled={!built} className="px-6 py-3 rounded-xl bg-amber-500 text-white font-black disabled:opacity-40">
          Ellenőrzés
        </button>
        <button onClick={next} className="px-6 py-3 rounded-xl bg-slate-100 border-2 border-slate-200 font-black text-slate-700">
          Új szám →
        </button>
      </div>
      {checked && (
        <div className={`rounded-xl p-3 text-center font-bold ${correct ? 'bg-green-100 text-green-800' : 'bg-red-50 text-red-700'}`}>
          {correct
            ? `Szuper! ${target} = ${built} 🎉`
            : !valid
              ? `Ez így nem helyes írásmód. Gondolj a szabályokra: egy jel legfeljebb 3-szor ismétlődhet, a V nem ismétlődik, és csak I állhat a V vagy X előtt.`
              : `A(z) ${built} értéke ${value}, nem ${target}. ${value < target ? 'Kell még hozzá!' : 'Ez túl sok!'}`}
        </div>
      )}
    </div>
  );
};

export const RomanNumerals4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="a-romai-szamok"
      title="7. A római számok"
      subtitle="I, V, X – így írtak számokat az ókori rómaiak. Ma is látod őket órán, kerületek nevében és a hónapoknál!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_romai_szamok_tananyag.pdf"
      practiceTitle="Készen állsz a római számokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — RÓMAI SZÁMOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="font-serif text-lg font-black text-orange-900 dark:text-orange-200">I = 1 &nbsp; V = 5 &nbsp; X = 10</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ha a kisebb jel a nagyobb <strong>után</strong> áll, <strong>hozzáadjuk</strong>: VI = 5 + 1 = 6.</li>
              <li>Ha az I a V vagy az X <strong>előtt</strong> áll, <strong>elvesszük</strong>: IV = 4, IX = 9.</li>
              <li>Egy jel legfeljebb <strong>3-szor</strong> állhat egymás mellett (III, XXX). A V nem ismétlődik.</li>
              <li>A római számoknak <strong>nincs helyiértéke</strong>, és nincs 0.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk? A római jelek" badge="Tankönyv 28. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RomanSignsSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Az ókori rómaiak nem a mi számjegyeinkkel (0, 1, 2, … 9) írtak, hanem <strong>betűszerű jelekkel</strong>. Ebben a leckében három jelet használunk: <strong>I, V, X</strong>.</p>
            <p>A jeleket <strong>balról jobbra</strong> olvassuk, és az értéküket összeadjuk – kivéve, ha egy I jel nagyobb jel előtt áll.</p>
            <p>Hol találkozol vele? Órán, könyvek fejezetszámainál, a budapesti <strong>kerületeknél</strong> (VIII. kerület), a <strong>hónapoknál</strong> a dátumban (XI. 2. = november 2.).</p>
          </div>
        </div>
      </TheorySection>

      <TheorySection title="2. Összeadás és kivonás a jelek között" badge="Szabályok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <RomanRulesSvg />
          <TheoryTable
            headers={['Arab', 'Római', 'Így kapjuk']}
            rows={[
              ['1, 2, 3', 'I, II, III', '1 + 1 + …'],
              ['4', 'IV', '5 − 1'],
              ['5, 6, 7, 8', 'V, VI, VII, VIII', '5 + 1 + …'],
              ['9', 'IX', '10 − 1'],
              ['10, 20, 30', 'X, XX, XXX', '10 + 10 + …'],
              ['14, 19', 'XIV, XIX', '10 + (5 − 1), 10 + (10 − 1)'],
              ['39', 'XXXIX', '10 + 10 + 10 + (10 − 1)']
            ]}
          />
        </div>
      </TheorySection>

      <TheorySection title="3. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Írd le római számmal: 37" badge="TK 28/1." badgeColor="orange">
            <div className="text-sm text-slate-700 space-y-1">
              <p>1. Bontsd fel: 37 = 30 + 7 = 10 + 10 + 10 + 5 + 1 + 1</p>
              <p>2. Írd le a jeleket nagyobbtól a kisebbig: X X X V I I</p>
              <p>3. Eredmény: <strong className="font-serif">XXXVII</strong></p>
            </div>
          </TheoryCard>
          <TheoryCard title="B) Írd le római számmal: 19" badge="TK 28/1." badgeColor="rose">
            <div className="text-sm text-slate-700 space-y-1">
              <p>1. Bontsd fel: 19 = 10 + 9</p>
              <p>2. 10 = X, és 9 = IX (10 − 1)</p>
              <p>3. Eredmény: <strong className="font-serif">XIX</strong> (és nem XVIIII!)</p>
            </div>
          </TheoryCard>
          <TheoryCard title="C) Rendezd növekvő sorrendbe!" badge="TK 28/2." badgeColor="emerald">
            <div className="text-sm text-slate-700 space-y-1">
              <p>XX, IV, XV, IX, XI, VI</p>
              <p>Előbb váltsd át: 20, 4, 15, 9, 11, 6</p>
              <p>Sorrend: <strong className="font-serif">IV &lt; VI &lt; IX &lt; XI &lt; XV &lt; XX</strong></p>
            </div>
          </TheoryCard>
          <TheoryCard title="D) Ugyanazokból a jelekből két szám" badge="TK 28/3." badgeColor="purple">
            <div className="text-sm text-slate-700 space-y-1">
              <p>Az X, V, I jelek mindegyikét felhasználva két szám is kirakható:</p>
              <p><strong className="font-serif">XVI</strong> = 10 + 5 + 1 = 16 és <strong className="font-serif">XIV</strong> = 10 + (5 − 1) = 14</p>
              <p>Csökkenő sorrendben: XVI, XIV.</p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Római számok a mindennapokban" badge="Feladatok" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-2">
            <PostcardSvg />
            <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>Irányítószám: XXIX = <strong>29</strong> → Mosolyfalva.</li>
              <li>VIII. kerület = <strong>8.</strong> kerület.</li>
              <li>Aranyos u. 3. XIX/25. → <strong>19.</strong> emelet, 25. ajtó.</li>
              <li>XI. 2-án → a <strong>11.</strong> hónap: <strong>november</strong> 2-án érkeznek.</li>
            </ul>
          </div>
          <div className="space-y-3">
            <SwimCapsSvg />
            <p className="text-sm text-slate-700">
              Úszóverseny rajtszámai (MF I/19.): V = 5, II = 2, XXV = 25, X = 10, XX = 20, VII = 7, XXX = 30. A XXV előtt a <strong className="font-serif">XXIV</strong> (24), utána a <strong className="font-serif">XXVI</strong> (26) indult.
            </p>
            <div className="grid grid-cols-2 gap-3 items-center">
              <RomanClockSvg className="w-full max-w-[160px] h-auto mx-auto" />
              <p className="text-sm text-slate-700">Sok órán római számok vannak. Ez az óra <strong>3 órát</strong> mutat: a kismutató a III-ra, a nagymutató a XII-re mutat.</p>
            </div>
          </div>
        </div>
        <TheoryCallout type="tip" title="Gyufaszálas fejtörő (MF I/19/2.)">
          <MatchsticksSvg className="w-full max-w-md h-auto mx-auto mb-2" />
          XXX − XI = XXI nem igaz (30 − 11 = 19). Tedd át a XI-ben lévő I-t az X elé: <strong className="font-serif">XXX − IX = XXI</strong> (30 − 9 = 21) ✓
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Vigyázz! Gyakori hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Négy egyforma jel és rossz sorrend"
          wrong="4 = IIII,  9 = VIIII,  19 = IXX"
          wrongExplanation="Egy jel legfeljebb háromszor állhat egymás mellett. Az IXX nem 19, mert az I csak közvetlenül a V vagy X előtt vonható le."
          correct="4 = IV,  9 = IX,  19 = XIX"
          correctExplanation="Előbb írd le a tízeseket (X), aztán a maradékot: 19 = X + IX."
          tip="Az XII nem 102! A római számoknak nincs helyiértéke: XII = 10 + 1 + 1 = 12."
        />
      </TheorySection>

      <TheorySection title="6. Interaktív Labor I: Római átváltó" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-600 mb-3">Válassz egy számot 1 és 39 között! Megmutatjuk római jelekkel és felbontva is.</p>
        <ConverterLab />
      </TheorySection>

      <TheorySection title="7. Interaktív Labor II: Rakd ki!" badge="Labor" badgeColor="amber">
        <p className="text-sm text-slate-600 mb-3">Rakd ki a számot az I, V, X jelekből, majd ellenőrizd!</p>
        <BuilderLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default RomanNumerals4Theory;
