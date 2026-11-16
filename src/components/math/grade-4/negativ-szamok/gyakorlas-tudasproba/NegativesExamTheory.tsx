import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { ExamOverviewSvg, ChangeRuleSvg, TempLadderSvg, HeightDepthSvg, fmtNum } from './NegativesExamFigures';

// ---------------------------------------------------------------------------
// Vegyes feladat-generátor
// ---------------------------------------------------------------------------
export type NegTaskKind = 'valtozas' | 'kulonbseg' | 'ellentett' | 'szocske' | 'fabatka' | 'osszehasonlitas' | 'szomszed';

export interface NegTask {
  text: string;
  answer: string;
  hint: string;
}

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const nz = (a: number, b: number) => {
  let v = 0;
  while (v === 0) v = rnd(a, b);
  return v;
};

/** A beírt válasz egységesítése: kötőjel → mínuszjel, szóközök és „°C” nélkül. */
export const normalizeAnswer = (s: string): string =>
  s
    .replace(/°\s*C/gi, '')
    .replace(/fok(ot|kal)?/gi, '')
    .replace(/[-–]/g, '−')
    .replace(/\s+/g, '')
    .trim();

export const makeNegTask = (kind: NegTaskKind): NegTask => {
  switch (kind) {
    case 'valtozas': {
      const a = rnd(-20, 10);
      const up = Math.random() < 0.5;
      const d = rnd(2, 15);
      const r = up ? a + d : a - d;
      return {
        text: `Reggel ${fmtNum(a)} °C volt. Délutánra ${d} fokkal ${up ? 'melegebb' : 'hidegebb'} lett. Hány °C lett?`,
        answer: fmtNum(r),
        hint: up ? 'Melegebb: lépj felfelé a hőmérőn!' : 'Hidegebb: lépj lefelé a hőmérőn!'
      };
    }
    case 'kulonbseg': {
      let a = rnd(-25, 10);
      let b = rnd(-25, 10);
      while (a === b) b = rnd(-25, 10);
      if (a > b) [a, b] = [b, a];
      return {
        text: `A hőmérséklet ${fmtNum(a)} °C-ról ${fmtNum(b)} °C-ra emelkedett. Hány fokot emelkedett?`,
        answer: String(b - a),
        hint: a < 0 && b > 0 ? 'Átlépte a 0-t: add össze a két részt!' : 'A 0 egyik oldalán maradt: vonj ki!'
      };
    }
    case 'ellentett': {
      const n = nz(-30, 30);
      return { text: `Melyik szám a(z) ${fmtNum(n)} ellentettje?`, answer: fmtNum(-n), hint: 'Ugyanolyan messze a 0-tól, a másik oldalon.' };
    }
    case 'szocske': {
      const s = rnd(-8, 8);
      const m1 = nz(-9, 9);
      const m2 = nz(-9, 9);
      const mt = (m: number) => (m > 0 ? `jobbra ${m}` : `balra ${-m}`);
      return {
        text: `A szöcske a(z) ${fmtNum(s)} számon áll. Ugrások: ${mt(m1)}, majd ${mt(m2)}. Hová érkezik?`,
        answer: fmtNum(s + m1 + m2),
        hint: 'Jobbra nagyobb, balra kisebb számra lépsz.'
      };
    }
    case 'fabatka': {
      const c = rnd(0, 12);
      const d = rnd(0, 12);
      return {
        text: `A pénztárcában ${c} fabatka készpénz és ${d} adósságcédula van. Mennyi a vagyon?`,
        answer: fmtNum(c - d),
        hint: 'Egy készpénz és egy adósság együtt 0. Párosítsd őket!'
      };
    }
    case 'osszehasonlitas': {
      const a = rnd(-30, 15);
      let b = rnd(-30, 15);
      while (b === a) b = rnd(-30, 15);
      return {
        text: `Melyik jel kerül közéjük: ${fmtNum(a)} ? ${fmtNum(b)}  (írd: < vagy >)`,
        answer: a < b ? '<' : '>',
        hint: 'A számegyenesen jobbra lévő szám a nagyobb.'
      };
    }
    default: {
      const n = rnd(-49, -2);
      const smaller = Math.random() < 0.5;
      return {
        text: `Melyik a(z) ${fmtNum(n)} ${smaller ? 'kisebb' : 'nagyobb'} számszomszédja?`,
        answer: fmtNum(smaller ? n - 1 : n + 1),
        hint: 'A kisebb szomszéd balra, a nagyobb jobbra van.'
      };
    }
  }
};

const KINDS: { k: NegTaskKind; t: string }[] = [
  { k: 'valtozas', t: 'Hőmérséklet-változás' },
  { k: 'kulonbseg', t: 'Hány fokot?' },
  { k: 'osszehasonlitas', t: '< vagy >' },
  { k: 'ellentett', t: 'Ellentett' },
  { k: 'szomszed', t: 'Számszomszéd' },
  { k: 'szocske', t: 'Szöcske' },
  { k: 'fabatka', t: 'Fabatka' }
];

const MixedLab: React.FC = () => {
  const [kind, setKind] = useState<NegTaskKind>('valtozas');
  const [task, setTask] = useState<NegTask>(() => makeNegTask('valtozas'));
  const [input, setInput] = useState('');
  const [res, setRes] = useState<boolean | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });

  const fresh = (k: NegTaskKind) => {
    setKind(k);
    setTask(makeNegTask(k));
    setInput('');
    setRes(null);
  };
  const check = () => {
    if (!input.trim() || res === true) return;
    const ok = normalizeAnswer(input) === normalizeAnswer(task.answer);
    setRes(ok);
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
  };

  return (
    <div className="bg-white border-2 border-indigo-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap gap-2">
        {KINDS.map((x) => (
          <button
            key={x.k}
            onClick={() => fresh(x.k)}
            className={`px-3 h-10 rounded-xl text-xs font-black ${kind === x.k ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {x.t}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 text-lg font-bold text-slate-800 text-center">{task.text}</div>
      <div className="flex gap-2 justify-center flex-wrap">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (res === false) setRes(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          className="w-40 h-12 rounded-xl border-2 border-slate-300 text-center text-xl font-black"
          placeholder="pl. −5"
          aria-label="válasz"
        />
        <button onClick={() => setInput((v) => (v.startsWith('−') ? v.slice(1) : `−${v}`))} className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 text-2xl font-black" aria-label="mínuszjel">
          −
        </button>
        <button onClick={check} className="px-5 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black">
          Ellenőrzöm
        </button>
        <button onClick={() => fresh(kind)} className="px-4 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700">
          Új feladat
        </button>
      </div>
      {res !== null && (
        <div className={`text-sm font-bold text-center ${res ? 'text-emerald-700' : 'text-rose-700'}`}>
          {res ? `Helyes! A megoldás: ${task.answer}.` : `Még nem jó. Tipp: ${task.hint}`}
        </div>
      )}
      <div className="text-xs text-slate-500 text-center">
        Eredményed: {score.ok} / {score.all} helyes válasz
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Igaz vagy hamis?
// ---------------------------------------------------------------------------
export const TF_STATEMENTS: { s: string; t: boolean; why: string }[] = [
  { s: 'Amikor a hőmérő −10 °C-ot mutat, nincs olyan hideg, mint −1 °C-nál.', t: false, why: 'A −10 °C a hidegebb.' },
  { s: 'Ha −5 °C-ról 2 °C-ra változott a hőmérséklet, 7 °C-ot melegedett.', t: true, why: '5 + 2 = 7.' },
  { s: 'Ha −4 °C-ról −8 °C-ra csökkent, 4 °C-ot hűlt a levegő.', t: true, why: '8 − 4 = 4.' },
  { s: 'A −40 °C hidegebb, mint a −4 °C.', t: true, why: 'A −40 jóval lejjebb van a hőmérőn.' },
  { s: '−18 °C < −6 °C', t: true, why: 'A −18 balra van a −6-tól.' },
  { s: 'Ha −6 °C-ról 0 °C-ra változott, nem melegedett a levegő.', t: false, why: '6 fokot melegedett.' },
  { s: 'A −15 °C nem fagyosabb, mint a −10 °C.', t: false, why: 'A −15 °C a fagyosabb.' },
  { s: 'A −16 °C hidegebb, mint a −17 °C.', t: false, why: 'A −17 °C a hidegebb.' },
  { s: 'A 7 ellentettje a −7.', t: true, why: 'Mindkettő 7 lépésre van a 0-tól.' },
  { s: '9 fabatka és 10 adósságcédula együtt 1 fabatka.', t: false, why: '1 adósság marad: −1 fabatka.' }
];

const TrueFalseLab: React.FC = () => {
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const st = TF_STATEMENTS[i];
  const finished = i === TF_STATEMENTS.length - 1 && ans !== null;

  const choose = (v: boolean) => {
    if (ans !== null) return;
    setAns(v);
    if (v === st.t) setScore((s) => s + 1);
  };

  return (
    <div className="bg-white border-2 border-teal-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-between text-sm font-bold text-slate-600">
        <span>
          {i + 1}. / {TF_STATEMENTS.length} állítás
        </span>
        <span>Pontok: {score}</span>
      </div>
      <div className="rounded-xl bg-teal-50 border border-teal-200 p-4 text-lg font-bold text-slate-800 text-center">{st.s}</div>
      <div className="grid grid-cols-2 gap-3">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            onClick={() => choose(v)}
            className={`h-14 rounded-xl text-xl font-black border-2 ${
              ans === null
                ? v
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-rose-50 border-rose-300 text-rose-800'
                : v === st.t
                ? 'bg-emerald-500 border-emerald-600 text-white'
                : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}
          >
            {v ? 'Igaz (I)' : 'Hamis (H)'}
          </button>
        ))}
      </div>
      {ans !== null && (
        <div className={`text-sm font-bold text-center ${ans === st.t ? 'text-emerald-700' : 'text-rose-700'}`}>
          {ans === st.t ? 'Eltaláltad! ' : 'Nem talált. '}
          {st.why}
        </div>
      )}
      <div className="flex gap-2 justify-center">
        {ans !== null && i < TF_STATEMENTS.length - 1 && (
          <button
            onClick={() => {
              setI(i + 1);
              setAns(null);
            }}
            className="px-5 h-11 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black"
          >
            Következő →
          </button>
        )}
        <button
          onClick={() => {
            setI(0);
            setAns(null);
            setScore(0);
          }}
          className="px-4 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-sm font-bold text-slate-700"
        >
          Újrakezdem
        </button>
      </div>
      {finished && (
        <TheoryCallout type="success" title="Vége a játéknak! 🎉">
          {score} pontot szereztél a {TF_STATEMENTS.length}-ból. A hamis állításokat úgy is igazzá teheted, hogy megváltoztatod a hőmérsékleteket!
        </TheoryCallout>
      )}
    </div>
  );
};

export const NegativesExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId="g4-negatives"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba"
      subtitle="Ismételjük át a negatív számokat: hőmérő, számegyenes, ellentettek, összehasonlítás, változások, fabatkák."
      badge="4. OSZTÁLY • IV. A NEGATÍV SZÁMOK • TANANYAG"
      themeColor="indigo"
      pdfFilename="4_osztaly_negativ_szamok_gyakorlas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a nagy tudáspróbára?"
      practiceSubtitle="90 feladat vár rád 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ — A NEGATÍV SZÁMOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
              <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">0 alatt / 0-tól balra: negatív (−)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Jobbra (feljebb) a nagyobb, balra (lejjebb) a kisebb szám.</li>
              <li>Ellentett számok: 5 és −5 – ugyanolyan messze a 0-tól.</li>
              <li>Változás a 0-n át: összeadunk; a 0 egyik oldalán: kivonunk.</li>
              <li>Fabatka: ● = készpénz, ■ = adósság, ● + ■ = 0.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 87–92. o." badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryCard title="1. A negatív számok a mindennapokban" badgeColor="sky">
              <p className="text-sm text-slate-700">
                A 0 a viszonyítási pont: fagypont (0 °C), tengerszint (0 m), földszint (0). Ami alatta van, negatív: −6 °C, −50 m, −2. szint, −200 Ft adósság.
              </p>
            </TheoryCard>
            <TheoryCard title="2. Számegyenes és ellentettek" badgeColor="orange">
              <p className="text-sm text-slate-700">
                A 0-tól balra a negatív, jobbra a pozitív számok. Az ellentett számok (4 és −4) a 0 két oldalán, ugyanolyan messze vannak. A kisebb szomszéd mindig balra van: −15 kisebb szomszédja −16.
              </p>
            </TheoryCard>
            <TheoryCard title="3. Összehasonlítás és változások" badgeColor="rose">
              <p className="text-sm text-slate-700">
                −14 &lt; −2 &lt; 0 &lt; 8. A hőmérséklet-változásnál figyelj a 0-ra! 7 fabatka és 2 adósság = 5 fabatka; 9 fabatka és 13 adósság = −4.
              </p>
            </TheoryCard>
          </div>
          <ExamOverviewSvg />
        </div>
      </TheorySection>

      {/* 2. Sorrend */}
      <TheorySection title="2. Hidegebb vagy melegebb? Sorba rendezés" badge="Tankönyv 89. o., 3. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TempLadderSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Csökkenő sorrendben: <strong>18 °C &gt; 0 °C &gt; −3 °C &gt; −5 °C &gt; −21 °C &gt; −30 °C</strong>.
            </p>
            <p>Növekvő sorrendben ugyanezt fordítva olvasod: a leghidegebbtől (−30 °C) a legmelegebbig (18 °C).</p>
            <TheoryCallout type="tip" title="Gyors ellenőrzés">
              Két negatív szám közül az a nagyobb, amelyik közelebb van a 0-hoz: −3 &gt; −5.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 3. Változások */}
      <TheorySection title="3. Hány fokot változott?" badge="Munkafüzet 83–84. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ChangeRuleSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Mindig nézd meg, átlépte-e a változás a 0-t!</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>−4 °C → −19 °C: a 0 alatt marad, 19 − 4 = 15 fok.</li>
              <li>−5 °C → 2 °C: átlépi a 0-t, 5 + 2 = 7 fok.</li>
              <li>−11 °C → 3 °C: átlépi a 0-t, 11 + 3 = 14 fok.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Vegyes feladatok */}
      <TheorySection title="4. Nézzük meg együtt! Vegyes feladatok" badge="Tankönyv és munkafüzet" badgeColor="emerald">
        <TheoryTable
          headers={['Feladat', 'Megoldás lépésenként', 'Eredmény']}
          rows={[
            ['Reggel −6 °C volt, délig 9 fokot emelkedett, estére 5 fokot csökkent.', '−6-tól 9 fel: 3 °C; 3-tól 5 le: −2 °C', '−2 °C'],
            ['A szöcske a 3-on áll: jobbra 6, majd balra 10.', '3 → 9 → −1', '−1'],
            ['9 fabatka és 13 adósságcédula', '9 pár törlesztése, marad 4 adósság', '−4 fabatka'],
            ['Hány egész szám teszi igazzá: −3 < □ < 15?', '−2, −1, 0, 1, …, 14: 2 negatív, a 0 és 14 pozitív', '17 szám'],
            ['50 Ft-om van, 2080 Ft a tartozásom. Mennyi hiányzik?', '2080 − 50', '2030 Ft'],
            ['500 Ft-ról −1000 Ft-ra változott a vagyon.', '500 a 0-ig, még 1000: 500 + 1000', 'csökkent 1500 Ft-tal']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <HeightDepthSvg />
          <TheoryCard title="Magasság és mélység" badge="Tankönyv 87. és 91. o." badgeColor="sky">
            <p className="text-sm text-slate-700">
              A zászló 400 m-rel a tengerszint felett, a hal 50 m-rel alatta van. A kettő között a tengerszinten át mérünk: 400 + 50 = <strong>450 m</strong> a különbség.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Vigyázz */}
      <TheorySection title="5. Vigyázz! A leggyakoribb hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A mínusz után álló nagyobb szám kisebb értéket jelent"
          wrong="−20 > −10, mert 20 több, mint 10."
          wrongExplanation="A mínusz jel miatt a −20 messzebb van a 0-tól balra, ezért kisebb."
          correct="−20 < −10"
          correctExplanation="A −20 a számegyenesen balra van a −10-től, a hőmérőn lejjebb: hidegebb, kisebb."
          tip="Ha bizonytalan vagy, rajzolj gyorsan egy számegyenest vagy hőmérőt!"
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Vegyes feladatgyár" badge="Labor" badgeColor="indigo">
        <p className="text-sm text-slate-600">
          Válassz feladattípust, számold ki, és írd be a választ! A mínuszjelet a „−” gombbal vagy a kötőjellel is beírhatod. Az „Új feladat” gomb mindig új számokat ad.
        </p>
        <MixedLab />
        <p className="text-xs text-slate-500">Példa: {fmtNum(-17)} °C-ról 10 fokot emelkedik → {fmtNum(-7)} °C.</p>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Igaz vagy hamis?" badge="Labor" badgeColor="teal">
        <p className="text-sm text-slate-600">A tankönyv és a munkafüzet állításai: döntsd el gyorsan, igaz vagy hamis!</p>
        <TrueFalseLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NegativesExamTheory;
