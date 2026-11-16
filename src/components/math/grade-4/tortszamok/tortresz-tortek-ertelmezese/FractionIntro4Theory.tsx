import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  FlagsSvg,
  FractionNamesSvg,
  EqualPartsSvg,
  NapkinFoldSvg,
  RectanglePartsSvg,
  ColourRodsSvg,
  BonbonShareSvg,
  PizzaG,
  RodG,
  ROD_COLORS,
  DENOM_NAMES,
  fracWord
} from './FractionIntro4Figures';

// ---------------------------------------------------------------------------
// Labor I – Pizzavágó
// ---------------------------------------------------------------------------
export const CUTTER_PARTS = [2, 3, 4, 5, 6, 8, 10, 12];
export const CUTTER_TASKS: { parts: number; text: string }[] = [
  { parts: 2, text: 'a pizza felét (1 kettedét)' },
  { parts: 3, text: 'a pizza 1 harmadát' },
  { parts: 4, text: 'a pizza 1 negyedét' },
  { parts: 6, text: 'a pizza 1 hatodát' },
  { parts: 8, text: 'a pizza 1 nyolcadát' },
  { parts: 10, text: 'a pizza 1 tizedét' }
];

/** A kiszínezett rész leolvasása a tankönyv szavaival. */
export const readPizza = (colored: number, parts: number): string => {
  if (colored === 0) return 'Még nem színeztél ki semmit.';
  if (colored === parts) return `${fracWord(parts, parts)} = 1 egész pizza`;
  if (parts === 2 && colored === 1) return 'fél pizza (1 ketted)';
  return `${fracWord(colored, parts)}`;
};

const PizzaCutterLab: React.FC = () => {
  const [parts, setParts] = useState(4);
  const [colored, setColored] = useState<number[]>([]);
  const [ti, setTi] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [msg, setMsg] = useState<string | null>(null);
  const task = CUTTER_TASKS[ti];

  const cut = (n: number) => {
    setParts(n);
    setColored([]);
    setMsg(null);
  };
  const toggle = (i: number) => {
    setColored((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
    setMsg(null);
  };
  const check = () => {
    if (parts !== task.parts) {
      setMsg(`Nézd meg, hány egyenlő részre vágtad! Most ${parts} részre vágtad. ${task.parts} egyenlő részre kell vágnod.`);
      return;
    }
    if (colored.length !== 1) {
      setMsg(`Jó a vágás! De ${colored.length === 0 ? 'még nem színeztél ki szeletet' : `${colored.length} szeletet színeztél ki`}. Pontosan 1 szelet kell.`);
      return;
    }
    setMsg(`Ügyes vagy! ${task.parts} egyenlő rész közül 1 rész: 1 ${DENOM_NAMES[task.parts]}.`);
    if (!done.includes(ti)) setDone([...done, ti]);
  };

  return (
    <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {CUTTER_TASKS.map((t, i) => (
          <button
            key={t.parts}
            onClick={() => {
              setTi(i);
              setMsg(null);
            }}
            className={`px-3 h-11 rounded-xl text-sm font-black border-2 ${
              i === ti ? 'bg-orange-500 text-white border-orange-600' : done.includes(i) ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            1 {DENOM_NAMES[t.parts]} {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-orange-50 border border-orange-200 p-3 text-center font-bold text-slate-800">
        Feladat: vágd fel a pizzát, és színezd ki {task.text}!
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <svg viewBox="0 0 240 240" className="w-full max-w-[260px] h-auto mx-auto select-none">
          <PizzaG cx={120} cy={120} r={105} parts={parts} filled={colored} color="#f97316" emptyColor="#fde68a" pizza onSlice={toggle} />
        </svg>
        <div className="space-y-3">
          <div className="text-sm font-bold text-slate-600">1. Hány egyenlő részre vágod?</div>
          <div className="grid grid-cols-4 gap-2">
            {CUTTER_PARTS.map((n) => (
              <button
                key={n}
                onClick={() => cut(n)}
                className={`h-12 rounded-xl text-lg font-black border-2 ${n === parts ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-slate-800 border-slate-200 hover:bg-orange-50'}`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-600">2. Koppints a szeletekre a színezéshez!</div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-center">
            <div className="text-xs text-slate-500">
              {parts} egyenlő rész: {DENOM_NAMES[parts]} részek
            </div>
            <div className="text-2xl font-black text-orange-700">{readPizza(colored.length, parts)}</div>
          </div>
          <button onClick={check} className="w-full h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black">
            Ellenőrzöm
          </button>
          {msg && <div className={`text-sm font-bold text-center ${msg.startsWith('Ügyes') ? 'text-emerald-700' : 'text-rose-700'}`}>{msg}</div>}
        </div>
      </div>
      {done.length === CUTTER_TASKS.length && (
        <TheoryCallout type="success" title="Minden feladat kész! 🍕">
          Minél több egyenlő részre vágod a pizzát, annál kisebb lesz egy szelet. Egy szelet neve mindig azt mondja meg, hány egyenlő részre vágtunk.
        </TheoryCallout>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II – Színes rudak: a zöld rúd 1 egész
// ---------------------------------------------------------------------------
export const ROD_CHOICES: { name: keyof typeof ROD_COLORS; answer: string }[] = [
  { name: 'lila', answer: '1 ketted (fele)' },
  { name: 'piros', answer: '1 harmad' },
  { name: 'világoskék', answer: '1 negyed' },
  { name: 'rózsaszín', answer: '1 hatod' },
  { name: 'fehér', answer: '1 tizenketted' },
  { name: 'sárga', answer: 'nem fér ki pontosan' }
];
const ROD_OPTIONS = ['1 ketted (fele)', '1 harmad', '1 negyed', '1 hatod', '1 tizenketted', 'nem fér ki pontosan'];

const RodsLab: React.FC = () => {
  const [sel, setSel] = useState<number | null>(null);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const unit = 18;
  const green = ROD_COLORS.zöld;
  const choice = sel === null ? null : ROD_CHOICES[sel];
  const rod = choice ? ROD_COLORS[choice.name] : null;
  const count = rod ? Math.floor(12 / rod.len) : 0;

  const answer = (o: string) => {
    if (!choice) return;
    setPick(o);
    if (o === choice.answer && sel !== null && !done.includes(sel)) setDone([...done, sel]);
  };

  return (
    <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="text-sm font-bold text-slate-600">1. Válassz rudat! Kirakjuk vele a zöld rúd hosszát.</div>
      <div className="flex flex-wrap gap-2">
        {ROD_CHOICES.map((c, i) => (
          <button
            key={c.name}
            onClick={() => {
              setSel(i);
              setPick(null);
            }}
            className={`px-4 h-11 rounded-xl text-sm font-black border-2 ${i === sel ? 'ring-4 ring-emerald-300' : ''} ${done.includes(i) ? 'border-emerald-500' : 'border-slate-300'}`}
            style={{ background: ROD_COLORS[c.name].fill, color: c.name === 'bordó' ? '#fff' : '#0f172a' }}
          >
            {c.name} {done.includes(i) ? '✓' : ''}
          </button>
        ))}
      </div>
      <svg viewBox="0 0 260 110" className="w-full max-w-xl h-auto mx-auto">
        <RodG x={14} y={14} len={12} unit={unit} h={26} fill={green.fill} side={green.side} label="zöld rúd = 1 egész" />
        {rod &&
          Array.from({ length: count }, (_, i) => <RodG key={i} x={14 + i * rod.len * unit} y={52} len={rod.len} unit={unit} h={26} fill={rod.fill} side={rod.side} />)}
        {rod && count * rod.len < 12 && (
          <g>
            <rect x={14 + count * rod.len * unit} y={52} width={(12 - count * rod.len) * unit} height={26} fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 3" />
            <text x={14 + count * rod.len * unit + ((12 - count * rod.len) * unit) / 2} y={98} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e11d48">
              hiányzik!
            </text>
          </g>
        )}
      </svg>
      {choice && rod && (
        <div className="space-y-3">
          <div className="text-center text-sm text-slate-700">
            {count * rod.len === 12 ? (
              <span>
                <strong>{count}</strong> {choice.name} rúd pontosan kiadja a zöld rudat. 2. Hányad része a zöld rúdnak 1 {choice.name} rúd?
              </span>
            ) : (
              <span>
                {count} {choice.name} rúd még kevés, {count + 1} már túl hosszú. 2. Mit mondhatsz a {choice.name} rúdról?
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {ROD_OPTIONS.map((o) => (
              <button
                key={o}
                onClick={() => answer(o)}
                className={`h-12 rounded-xl text-sm font-black border-2 ${
                  pick === o ? (o === choice.answer ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-100 text-rose-700 border-rose-300') : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
          {pick && (
            <div className={`text-sm font-bold text-center ${pick === choice.answer ? 'text-emerald-700' : 'text-rose-700'}`}>
              {pick === choice.answer
                ? choice.name === 'sárga'
                  ? 'Igen! A sárga rudakkal nem lehet pontosan kirakni a zöldet, ezért nem egyenlő része.'
                  : `Helyes! ${count} egyenlő rész közül 1 rész: ${choice.answer}.`
                : 'Nem ez az. Számold meg, hány rúd adja ki pontosan a zöld rudat!'}
            </div>
          )}
        </div>
      )}
      {done.length === ROD_CHOICES.length && (
        <TheoryCallout type="success" title="Minden rudat kipróbáltál! 🎉">
          2 lila, 3 piros, 4 világoskék, 6 rózsaszín vagy 12 fehér rúd adja ki a zöld rudat. Minél több rúd kell, annál kisebb egy rész.
        </TheoryCallout>
      )}
    </div>
  );
};

export const FractionIntro4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="tortszamok"
      topicId="g4-fractions"
      subtopicId="tortresz-tortek-ertelmezese"
      title="1. A törtrész és a törtek értelmezése"
      subtitle="Fél, harmad, negyed: mit jelent, ha valamit egyenlő részekre osztunk?"
      badge="4. OSZTÁLY • VIII. A TÖRTSZÁMOK • TANANYAG"
      themeColor="orange"
      pdfFilename="4_osztaly_tortresz_tortek_ertelmezese_tananyag.pdf"
      practiceTitle="Készen állsz a törtrészek felismerésére?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — EGYENLŐ RÉSZEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center">
              <span className="text-base font-black text-orange-900 dark:text-orange-200">Az egészet EGYENLŐ részekre osztjuk.</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>2</strong> egyenlő rész: egy rész a <strong>fele</strong> (1 ketted).
              </li>
              <li>
                <strong>3</strong> egyenlő rész: egy rész <strong>1 harmad</strong>; <strong>4</strong> egyenlő rész: <strong>1 negyed</strong>.
              </li>
              <li>A rész neve megmondja, hány egyenlő részre osztottuk az egészet.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 147. o." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Manó zászlókat rajzolt. A lengyel zászló <strong>fele</strong> piros, fele fehér: 1 ketted része piros, 1 ketted része fehér.
            </p>
            <p>
              Kitti 9 bonbont hozott hármuknak. Mindenkinek a bonbonok <strong>1 harmada</strong> jutott. A francia zászló is harmadokból áll: kék, fehér, piros, mindegyik szín 1 harmad. A <strong>3 harmad</strong> együtt <strong>1 egész</strong>.
            </p>
            <p>
              Ezeket a részeket <strong>törtrészeknek</strong> hívjuk. A számokat, amelyekkel leírjuk őket, <strong>törtszámoknak</strong> (törteknek) nevezzük.
            </p>
          </div>
          <FlagsSvg />
        </div>
      </TheorySection>

      {/* 2. A részek nevei */}
      <TheorySection title="2. Hogyan hívjuk a részeket?" badge="Munkafüzet 66. o., 1. feladat" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FractionNamesSvg />
          <div className="space-y-3 text-sm text-slate-700">
            <p>Számold meg, hány <strong>egyenlő</strong> részre vágtuk a pizzát! Ebből kapja a nevét egy szelet.</p>
            <TheoryTable
              headers={['Hány egyenlő rész?', 'Egy rész neve', 'Így mondjuk']}
              rows={[
                ['2', 'fél, 1 ketted', 'a pizza fele'],
                ['3', '1 harmad', 'a pizza 1 harmada'],
                ['4', '1 negyed', 'a pizza 1 negyede'],
                ['5', '1 ötöd', 'a pizza 1 ötöde'],
                ['6', '1 hatod', 'a pizza 1 hatoda'],
                ['8', '1 nyolcad', 'a pizza 1 nyolcada'],
                ['10', '1 tized', 'a pizza 1 tizede']
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 3. Nézzük meg együtt */}
      <TheorySection title="3. Nézzük meg együtt! Szalvéta és téglalapok" badge="Tankönyv 148. o., 1–3. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Szalvétahajtogatás" badge="1. feladat" badgeColor="rose">
            <NapkinFoldSvg />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>Egyszer hajtjuk félbe: 2 egyenlő rész lesz. Egyet látunk: a szalvéta <strong>felét</strong>.</li>
              <li>Még egyszer félbehajtjuk: 4 egyenlő rész lesz. Egyet látunk: a szalvéta <strong>negyedét</strong>.</li>
              <li>Próbáld ki egy négyzet alakú papírlappal!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Mindegyik téglalap 1 egész" badge="3. feladat" badgeColor="emerald">
            <RectanglePartsSvg />
            <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>Megszámolom, hány egyenlő csíkra osztottuk: 3, 2, illetve 4.</li>
              <li>Megnézem, hány csík zöld: mindegyiken 1.</li>
              <li>
                Kimondom: <strong>1 harmad</strong>, <strong>fele</strong>, <strong>1 negyed</strong> része zöld.
              </li>
            </ol>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="Az ételek is így osztódnak (2. feladat)">
          Ha a csokoládét 2 egyenlő részre törjük, a tányérra a csokoládé fele kerül. Ha az almát 4 egyenlő gerezdre vágjuk, és egyet teszünk a tányérra, az az alma 1 negyede.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Színes rudak */}
      <TheorySection title="4. Dolgozz színes rudakkal!" badge="Tankönyv 149. o., 5–6. feladat" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ColourRodsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>A bordó rúd alá pontosan 4 rózsaszín rúd fér. Ezért 1 rózsaszín rúd hosszúsága a bordó rúd <strong>1 negyede</strong>.</p>
            <p>
              A zöld rúd hosszát 2 lila rúddal is kirakhatjuk. Ezért a lila rúd a zöld rúd <strong>fele</strong> (1 ketted). 3 piros rúd is kiadja: a piros a zöld <strong>1 harmada</strong>.
            </p>
            <p className="text-xs text-slate-500">A 2. laborban te is kipróbálhatod!</p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Igazságos osztozkodás */}
      <TheorySection title="5. Osztozzatok igazságosan!" badge="Tankönyv 148. o., 4. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BonbonShareSvg />
          <div className="space-y-2 text-sm text-slate-700">
            <p>Manó 12 darabos bonbont kapott. Ha igazságosan osztoznak, mindenki ugyanannyit kap:</p>
            <TheoryTable
              headers={['Hányan osztoznak?', 'Egy gyereknek jut', 'Ez a bonbonok…']}
              rows={[
                ['ketten', '12 : 2 = 6 darab', 'fele'],
                ['hárman', '12 : 3 = 4 darab', '1 harmada'],
                ['négyen', '12 : 4 = 3 darab', '1 negyede'],
                ['hatan', '12 : 6 = 2 darab', '1 hatoda'],
                ['tizenketten', '12 : 12 = 1 darab', '1 tizenkettede']
              ]}
            />
            <p className="text-xs text-slate-500">Játsszátok el korongokkal!</p>
          </div>
        </div>
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz! Csak az egyenlő rész törtrész" badge="Csapda" badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <EqualPartsSvg />
          <TheoryTrapBox
            title="A 4 szelet még nem biztosan 4 negyed"
            wrong="A tortát 4 szeletre vágtuk, ezért egy szelet 1 negyed."
            wrongExplanation="Ha a szeletek nem egyformák, akkor nem negyedek. Az egyik szelet nagyobb, a másik kisebb."
            correct="Csak akkor 1 negyed egy szelet, ha az egészet 4 EGYENLŐ részre vágtuk."
            correctExplanation="A törtrészeknél mindig egyenlő részekről beszélünk."
            tip="Kérdezd meg magadtól: egyformák a részek?"
          />
        </div>
        <TheoryCallout type="tip" title="Érdekesség">
          A felső tagozaton a törteket számokkal is írjuk majd, például 1 negyed így néz ki: 1/4. A vonal alatti szám mutatja, hány egyenlő részre osztottunk.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Játékos labor I: Pizzavágó" badge="Labor" badgeColor="orange">
        <p className="text-sm text-slate-600">Válassz feladatot! Vágd fel a pizzát a megfelelő számú egyenlő szeletre, aztán koppints egy szeletre, hogy kiszínezd!</p>
        <PizzaCutterLab />
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Játékos labor II: Színes rudak" badge="Labor" badgeColor="emerald">
        <p className="text-sm text-slate-600">A zöld rúd 1 egészet ér. Melyik rúddal lehet pontosan kirakni? Hányad része a zöld rúdnak?</p>
        <RodsLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionIntro4Theory;
