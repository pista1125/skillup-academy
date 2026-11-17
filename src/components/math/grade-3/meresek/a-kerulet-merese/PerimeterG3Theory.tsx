import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { WalkAroundSvg, UnfoldSidesSvg, GridPerimeterSvg, SticksShapesSvg, GardenSvg } from './PerimeterG3Figures';
import { FONT, GridShape, StickPolygon, regularPts, countBoundary, Cell } from './PerimeterG3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

// ---------------------------------------------------------------------------
// Labor I – két egymásba csúszó téglalapból álló alakzat a rácson
// ---------------------------------------------------------------------------
const COLS = 8;
const ROWS = 5;
const makeShape = (): Cell[] => {
  for (;;) {
    const aw = rnd(2, 4);
    const ah = rnd(1, 3);
    const ax = rnd(0, COLS - aw);
    const ay = rnd(0, ROWS - ah);
    const bw = rnd(1, 3);
    const bh = rnd(1, 3);
    const bx = rnd(Math.max(0, ax - bw + 1), Math.min(COLS - bw, ax + aw - 1));
    const by = rnd(Math.max(0, ay - bh + 1), Math.min(ROWS - bh, ay + ah - 1));
    const set = new Map<string, Cell>();
    for (let c = ax; c < ax + aw; c++) for (let r = ay; r < ay + ah; r++) set.set(`${c},${r}`, [c, r]);
    for (let c = bx; c < bx + bw; c++) for (let r = by; r < by + bh; r++) set.set(`${c},${r}`, [c, r]);
    const cells = [...set.values()];
    const isRect = cells.length === aw * ah || cells.length === bw * bh;
    if (cells.length >= 3 && cells.length <= 12 && !(isRect && Math.random() < 0.7)) return cells;
  }
};

// ---------------------------------------------------------------------------
// Labor II – pálcikás sokszög
// ---------------------------------------------------------------------------
const NAMES: Record<number, string> = { 3: 'háromszög', 4: 'négyszög', 5: 'ötszög', 6: 'hatszög' };

export const PerimeterG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [cells, setCells] = useState<Cell[]>([[1, 1], [2, 1], [3, 1], [3, 2], [3, 3]]);
  const [guess, setGuess] = useState(0);
  const [show, setShow] = useState(false);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const per = countBoundary(cells);
  const check1 = () => {
    if (guess === per) setMsg1({ ok: true, text: `Ügyes vagy! A kerület ${per} egység.` });
    else if (guess === cells.length) setMsg1({ ok: false, text: `Ennyi kis négyzet van benne. De a kerülethez a széleken lévő kis szakaszokat számold!` });
    else if (Math.abs(guess - per) <= 2) setMsg1({ ok: false, text: `Majdnem! Számold újra. A sarkoknál mindkét oldalt számold!` });
    else setMsg1({ ok: false, text: `Nem ennyi. Indulj el egy sarokból, és számold a kék vonal kis szakaszait!` });
  };
  const newShape = () => {
    setCells(makeShape());
    setGuess(0);
    setShow(false);
    setMsg1(null);
  };

  // Labor II
  const [st, setSt] = useState({ n: 5, len: 6 });
  const [ans, setAns] = useState('');
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);
  const goal = st.n * st.len;
  const check2 = () => {
    const v = parseInt(ans, 10);
    if (Number.isNaN(v)) return setMsg2({ ok: false, text: 'Írj be egy számot!' });
    if (v === goal) return setMsg2({ ok: true, text: `Szuper! ${st.n} pálcika, mindegyik ${st.len} cm: ${Array(st.n).fill(st.len).join(' + ')} = ${goal} cm.` });
    if (v === st.len * (st.n - 1)) return setMsg2({ ok: false, text: `Kihagytál egy oldalt! Számold meg: ${st.n} oldala van.` });
    if (v === st.len * (st.n + 1)) return setMsg2({ ok: false, text: `Eggyel több oldalt számoltál. Csak ${st.n} oldala van.` });
    if (v === st.n) return setMsg2({ ok: false, text: `Ez az oldalak száma. De minden oldal ${st.len} cm hosszú!` });
    if (v === st.len) return setMsg2({ ok: false, text: `Ez csak egy oldal. Add össze mindet!` });
    return setMsg2({ ok: false, text: `Nem ennyi. Add össze: ${Array(st.n).fill(st.len).join(' + ')} = ?` });
  };
  const newSticks = () => {
    let n = rnd(3, 6);
    let len = rnd(3, 12);
    while (n === st.n && len === st.len) {
      n = rnd(3, 6);
      len = rnd(3, 12);
    }
    setSt({ n, len });
    setAns('');
    setMsg2(null);
  };
  const side = 70;
  const r = side / (2 * Math.sin(Math.PI / st.n));

  return (
    <TheoryTemplate
      topicId="g3-measurements-1"
      subtopicId="a-kerulet-merese"
      grade={3}
      chapterId="meresek"
      title="5. A kerület mérése"
      subtitle="Mi a kerület? Körbejárjuk a síkidomot, megmérjük és összeadjuk az oldalait."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_a_kerulet_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — KERÜLET',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center text-sm font-black text-orange-900 dark:text-orange-200">
              A kerület a síkidomot határoló vonalak hossza.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Mérd meg minden oldalát!</li>
              <li>Add össze az oldalak hosszát!</li>
              <li>Egyik oldalt se hagyd ki!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 146. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Húzd végig az ujjad egy logikai lap szélén! Körbeértél? Ez az út a <strong>kerület</strong>.</p>
          <p>Megtanulod, hogyan mérjük meg és hogyan számoljuk ki.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Mi a kerület?" badge="Körbejárjuk" badgeColor="amber">
        <WalkAroundSvg />
        <TheoryCallout type="info" title="A kerület">
          A kerület a síkidomot határoló vonalak hossza. Olyan, mintha a katica egyszer körbesétálna a síkidom szélén. A kerület jele: K.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Mérjük meg, adjuk össze!" badge="Vonalzóval" badgeColor="blue">
        <UnfoldSidesSvg />
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Mérd meg vonalzóval minden oldal hosszát.</li>
          <li>Képzeld el, hogy az oldalakat egy egyenesbe rakod.</li>
          <li>Add össze a hosszakat. Ez a kerület.</li>
        </ul>
      </TheorySection>

      <TheorySection title="4. Kerület a négyzetrácson" badge="Egység" badgeColor="sky">
        <GridPerimeterSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A négyzetrácson egy kis négyzet oldala <strong>1 egység</strong>.</p>
          <p>Számold meg a kék (zöld) vonalon a kis szakaszokat! Ennyi egység a kerület.</p>
        </div>
        <TheoryCallout type="warning" title="Nem a négyzeteket számoljuk!">
          A bal oldali alakzatban 5 kis négyzet van, de a kerülete <strong>12 egység</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Egyforma pálcikák" badge="Pálcikák" badgeColor="purple">
        <SticksShapesSvg />
        <p className="text-sm text-slate-700">Ha minden oldal egyforma, elég megszámolni az oldalakat. 6 pálcika, mindegyik 5 cm: 5 + 5 + 5 + 5 + 5 + 5 = 6 · 5 = <strong>30 cm</strong>.</p>
      </TheorySection>

      <TheorySection title="6. Körbekerítjük a kertet" badge="Kerítés" badgeColor="emerald">
        <GardenSvg />
        <p className="text-sm text-slate-700">A kertnek 6 oldala van. Mindet összeadjuk: 18 + 6 + 12 + 9 + 30 + 15 = <strong>90 m</strong> kerítés kell.</p>
      </TheorySection>

      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Háromszög" badge="3 oldal" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Az oldalak: 6 cm, 8 cm, 10 cm.</li>
              <li>6 + 8 = 14.</li>
              <li>14 + 10 = 24.</li>
              <li>A kerület <strong>24 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Más egységek" badge="dm és cm" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Oldalak: 1 dm, 7 cm, 9 cm.</li>
              <li>Előbb váltsunk: 1 dm = 10 cm.</li>
              <li>10 + 7 + 9 = 26.</li>
              <li>A kerület <strong>26 cm</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Melyik oldal hiányzik?" badge="Fejtörő" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy háromszög kerülete 30 cm.</li>
              <li>Két oldala 12 cm és 8 cm: 12 + 8 = 20.</li>
              <li>30 − 20 = 10.</li>
              <li>A harmadik oldal <strong>10 cm</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Megvan minden oldal?"
          wrong="A kert kerülete: 18 + 9 + 30 + 15 = 72 m"
          wrongExplanation="Kimaradt a kis lépcső két oldala (6 m és 12 m)! Ott is kell kerítés."
          correct="18 + 6 + 12 + 9 + 30 + 15 = 90 m"
          correctExplanation="Mind a 6 oldalt összeadtuk."
          tip="Számold meg előbb, hány oldala van! Utána pipáld ki, amelyiket már összeadtad."
        />
        <TheoryCallout type="warning" title="Azonos egység!">
          Ha az egyik oldal dm-ben, a másik cm-ben van, előbb váltsd át, csak utána add össze!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="9. Labor I: Számold meg a kerületet a rácson!" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-sky-50 rounded-xl p-3 text-center text-sky-900 text-sm">
            Hány egység a kék alakzat kerülete? Egy kis négyzet oldala 1 egység.
          </div>
          <svg viewBox="0 0 330 220" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <GridShape x={21} y={22} s={36} cols={COLS} rows={ROWS} cells={cells} numbers={show} numSize={12} w={4} />
          </svg>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => { setGuess(Math.max(0, guess - 1)); setMsg1(null); }} className="w-12 h-12 rounded-xl bg-blue-500 text-white text-2xl font-black" aria-label="kevesebb">−</button>
            <div className="min-w-[110px] text-center text-2xl font-black text-slate-800">{guess} egység</div>
            <button onClick={() => { setGuess(Math.min(40, guess + 1)); setMsg1(null); }} className="w-12 h-12 rounded-xl bg-blue-500 text-white text-2xl font-black" aria-label="több">+</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check1} className="px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={() => setShow(true)} className="px-4 py-2 rounded-xl bg-amber-400 text-amber-950 text-sm font-bold min-h-[48px]">Mutasd meg a számolást!</button>
            <button onClick={newShape} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg1.text}</div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="10. Labor II: Pálcikás síkidomok" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 text-sm">
            Ez egy <strong>{NAMES[st.n]}</strong>. Minden pálcika <strong className="text-lg">{st.len} cm</strong>. Hány cm a kerülete?
          </div>
          <svg viewBox="0 0 300 200" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={FONT}>
            <StickPolygon pts={regularPts(st.n, 150, st.n === 3 ? 112 : 100, r, st.n === 4 ? Math.PI / 4 : 0)} w={7} />
          </svg>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={ans}
              onChange={(e) => { setAns(e.target.value); setMsg2(null); }}
              className="w-28 h-12 rounded-xl border-2 border-emerald-300 text-center text-2xl font-black"
              aria-label="kerület"
            />
            <span className="text-xl font-bold text-slate-700">cm</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={check2} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Ellenőrzés</button>
            <button onClick={newSticks} className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg2.text}</div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PerimeterG3Theory;
