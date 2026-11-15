import React, { useMemo, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  TableTennisGraphSvg,
  CompleteGraphsSvg,
  ConferenceGraphSvg,
  VertexOrEdgeChoiceSvg,
  SocialNetworkSvg
} from './CombinatoricsGraphsFigures';

const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
};
const fmtInt = (x: number) => x.toLocaleString('hu-HU');

/** Havel–Hakimi: megvalósítható-e a sorozat egyszerű gráf fokszámsorozataként? */
const isGraphical = (degs: number[]): boolean => {
  const s = [...degs];
  for (;;) {
    s.sort((a, b) => b - a);
    if (s.length === 0 || s[0] === 0) return true;
    const d = s.shift()!;
    if (d > s.length) return false;
    for (let i = 0; i < d; i++) {
      s[i] -= 1;
      if (s[i] < 0) return false;
    }
  }
};

const LETTERS = 'ABCDEFGHIJ';

export const CombinatoricsGraphsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: bajnokság állása
  const [played, setPlayed] = useState<number[]>([7, 7, 6, 6, 5, 5, 5, 5]);
  // Labor II: teljes gráf
  const [kn, setKn] = useState<number>(6);
  const [pick, setPick] = useState<number>(2);
  const [edgeInput, setEdgeInput] = useState<number>(36);

  const players = played.length;
  const lab1 = useMemo(() => {
    const sum = played.reduce((s, x) => s + x, 0);
    const total = binom(players, 2);
    const even = sum % 2 === 0;
    const graphical = even && played.every((x) => x <= players - 1) && isGraphical(played);
    return { sum, total, even, graphical, done: sum / 2, left: total - sum / 2 };
  }, [played, players]);

  const setPlayerCount = (n: number) => {
    setPlayed((prev) => {
      const next = prev.slice(0, n).map((x) => Math.min(x, n - 1));
      while (next.length < n) next.push(0);
      return next;
    });
  };
  const bump = (i: number, delta: number) =>
    setPlayed((prev) => prev.map((x, j) => (j === i ? Math.max(0, Math.min(players - 1, x + delta)) : x)));

  const knPts = useMemo(
    () =>
      Array.from({ length: kn }, (_, i) => {
        const a = -Math.PI / 2 + (2 * Math.PI * i) / kn;
        return { x: 150 + 100 * Math.cos(a), y: 125 + 100 * Math.sin(a) };
      }),
    [kn]
  );
  const knEdges = binom(kn, 2);
  const pickV = Math.min(pick, kn);
  const inverseN = useMemo(() => {
    const disc = 1 + 8 * edgeInput;
    const n = (1 + Math.sqrt(disc)) / 2;
    return Number.isInteger(n) && edgeInput > 0 ? n : null;
  }, [edgeInput]);

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="kombinatorika-es-grafok"
      title="9. Kombinatorika és gráfok"
      subtitle="Hány mérkőzés van még hátra? Teljes gráfok, a fokszámok összegének tétele, és kiválasztás a csúcsok vagy az élek közül."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_kombinatorika_es_grafok_tananyag.pdf"
      practiceTitle="Készen állsz a gráfos összeszámlálásokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — FOKSZÁMOK ÉS TELJES GRÁF',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                fokszámok összege = 2 · élek száma &nbsp;·&nbsp; n pontú teljes gráf éleinek száma: C(n; 2) = n · (n − 1) / 2
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Minden él <strong>kétszer</strong> számít bele a fokszámok összegébe – annál a két csúcsnál, amelyet összeköt. Ezért a fokszámösszeg mindig <strong>páros</strong>.</li>
              <li>A tétel hurokéllel rendelkező gráfokra is igaz.</li>
              <li>Kiválasztási feladatban mindig nézd meg: a <strong>csúcsok</strong> vagy az <strong>élek</strong> közül választunk?</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: hány mérkőzés van hátra?" badge="Tankönyv 72. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy asztalitenisz-bajnokságban <strong>8 versenyző</strong> vesz részt, mindenki mindenkivel egyetlen mérkőzést játszik. Ketten azt válaszolták, hogy eddig hetet, ketten, hogy hatot, négyen, hogy ötöt játszottak. Hány mérkőzés van hátra?
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>A válaszok összegében minden lejátszott mérkőzés <strong>kétszer</strong> szerepel: 2 · 7 + 2 · 6 + 4 · 5 = 46 ⇒ <strong>23 mérkőzés</strong> zajlott le.</li>
              <li>A teljes bajnokság annyi mérkőzés, ahányféleképpen a 8 versenyzőből 2 kiválasztható: C(8; 2) = 8 · 7 / 2 = <strong>28</strong>.</li>
              <li>Hátralévő mérkőzések: 28 − 23 = <strong>5</strong>.</li>
            </ol>
            <p className="text-xs text-slate-500">A helyzet többféleképpen előállhat; az ábra egy lehetséges állást mutat.</p>
          </div>
          <TableTennisGraphSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Teljes gráf és a fokszámok összege" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Teljes gráf" badge="Definíció" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              Egy gráf <strong>teljes gráf</strong>, ha bármely két csúcsa között pontosan egy él fut. Az n pontú teljes gráf (n ∈ ℕ, n ≥ 2) éleinek száma annyi, ahányféleképpen az n csúcs közül kettőt kiválaszthatunk (a sorrend nem számít):
            </p>
            <p className="text-center font-mono font-bold text-purple-800 my-2">C(n; 2) = n · (n − 1) / 2</p>
            <p className="text-sm text-slate-700">Minden csúcs fokszáma n − 1.</p>
          </TheoryCard>
          <TheoryCard title="A fokszámok összege" badge="Tétel" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              A gráf fokszámainak összege egyenlő az élek számának kétszeresével:
            </p>
            <p className="text-center font-mono font-bold text-blue-800 my-2">fokszámok összege = 2 · élek száma</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Következmény: a fokszámok összege mindig páros.</li>
              <li>Szemléletesen: minden él kétszer számít bele – annál a két elemnél, amelyet összeköt.</li>
              <li>Olyan gráfokra is teljesül, amelyek hurokélt tartalmaznak.</li>
            </ul>
          </TheoryCard>
        </div>
        <CompleteGraphsSvg />
      </TheorySection>

      {/* 3. Csúcs vagy él */}
      <TheorySection title="3. Kiválasztási feladatok gráfokban" badge="Elmélet" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Gráfokhoz kapcsolódó kombinatorikai feladatokban gondosan figyeld meg, hogy a <strong>csúcsokra</strong> vagy az <strong>élekre</strong> vonatkozik a feladat!
            </p>
            <TheoryTable
              headers={['Kérdés (5 település, 6 út)', 'Miből választunk?', 'Eredmény']}
              rows={[
                ['Hányféleképpen választhatunk ki 2 települést?', 'az 5 település (csúcs) közül', 'C(5; 2) = 10'],
                ['Hányféleképpen választhatunk ki 2 utat?', 'a 6 út (él) közül', 'C(6; 2) = 15']
              ]}
            />
          </div>
          <VertexOrEdgeChoiceSvg />
        </div>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok megoldással" badge="Feladatok" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Kávészünet a konferencián (2020)" badge="Érettségi" badgeColor="emerald">
            <ConferenceGraphSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A mindenkit ismer; B mindenkit, kivéve E-t.</li>
              <li>C két embert ismer: A és B is ismeri őt, így C ismerősei pontosan A és B.</li>
              <li>D hármat ismer: A-t, B-t, és C már „betelt”, így a harmadik E.</li>
              <li><strong>a)</strong> E ismerősei: <strong>A és D</strong>.</li>
              <li><strong>b)</strong> Mindenki mindenkivel koccint: C(5; 2) = <strong>10</strong> koccintás.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Van-e ilyen gráf?" badge="Feladat 2." badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> 5 csúcs, 7 él, fokszámösszeg 12: <strong>nincs</strong>, mert 7 élnél a fokszámösszeg 14.</li>
              <li><strong>b)</strong> 6 csúcs, fokszámok 1, 2, 2, 2, 3, 3: <strong>nincs</strong>, az összeg 13 páratlan.</li>
              <li><strong>c)</strong> 7 csúcs, minden fokszám 3: <strong>nincs</strong>, az összeg 21 páratlan.</li>
              <li><strong>d)</strong> 7 csúcs, minden fokszám egyenlő: <strong>van</strong>, pl. hétszög (mind 2), a 7 pontú teljes gráf (mind 6) vagy 7 izolált csúcs (mind 0). A közös fokszám csak páros lehet.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Hány csúcsa van a teljes gráfnak?" badge="Feladat 3." badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> 36 él: n · (n − 1) / 2 = 36 ⇒ n · (n − 1) = 72 = 9 · 8 ⇒ <strong>n = 9</strong>.</li>
              <li><strong>b)</strong> Fokszámösszeg 156 ⇒ 78 él ⇒ n · (n − 1) = 156 = 13 · 12 ⇒ <strong>n = 13</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Az adóhatóság ellenőrzése" badge="Feladat 4." badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A szerződések a gráf <strong>élei</strong>, ezért az élek közül választunk: ha e szerződés van, a választások száma C(e; 4).</li>
              <li><strong>b)</strong> 4 szerződés, 8 cég: mind a 8 cég csak akkor lehet érintett, ha a 4 kiválasztott élnek nincs közös végpontja (minden cég pontosan egy kiválasztott szerződésben szerepel). Ezt a gráfon kell megkeresni.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Koccintás az eljegyzésen" badge="Feladat 5." badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> A Tóth család 5 tagja között: C(5; 2) = <strong>10</strong>.</li>
              <li><strong>b)</strong> A Lengyel család 8 tagja között: C(8; 2) = <strong>28</strong>.</li>
              <li><strong>c)</strong> A két család tagjai között: 5 · 8 = <strong>40</strong>.</li>
              <li>Ellenőrzés: 10 + 28 + 40 = 78 = C(13; 2).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="sky">
            <SocialNetworkSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1. (2021)</strong> Ismeretségek: Anna–Cili, Anna–Dénes, Anna–Edit, Anna–Feri, Cili–Feri, Bence–Edit (6 él). <strong>a)</strong> Még nem ismerős párok: 15 − 6 = <strong>9</strong>. <strong>b)</strong> Ismerős páros: <strong>6</strong>-féle.</li>
              <li><strong>HF 2. (2018)</strong> 7 csapat, 9 lejátszott: <strong>a)</strong> 21 − 9 = <strong>12</strong> van hátra; <strong>b)</strong> 3 mérkőzés a 9-ből: C(9; 3) = <strong>84</strong>.</li>
              <li><strong>HF 3.</strong> 120 él ⇒ n · (n − 1) = 240 ⇒ n = 16. <strong>a)</strong> 4 csúcs: C(16; 4) = <strong>1820</strong>; <strong>b)</strong> 4 él: C(120; 4) = <strong>8 214 570</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: elfelejtjük felezni" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A válaszok (fokszámok) összegét tekintjük a mérkőzések számának"
          wrong="2 · 7 + 2 · 6 + 4 · 5 = 46 mérkőzés zajlott le, és 8 · 7 = 56 a teljes bajnokság"
          wrongExplanation="Minden mérkőzésen ketten játszanak, így a válaszok összegében minden meccs kétszer szerepel. Ugyanígy 8 · 7 = 56 minden párt kétszer számol (A–B és B–A)."
          correct="lejátszott: 46 / 2 = 23; összes: 8 · 7 / 2 = C(8; 2) = 28; hátra van: 5"
          correctExplanation="Fokszámok összege = 2 · élek száma, és a teljes gráf éleinek száma n · (n − 1) / 2."
          tip="Ellenőrzés: ha a fokszámösszeg páratlan jön ki, valaki rosszul válaszolt – ilyen gráf nincs."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: A bajnokság állása" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">versenyzők száma: {players}</label>
            <input
              type="range"
              min="3"
              max="10"
              value={players}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full accent-blue-600"
              aria-label="versenyzők száma"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setPlayed([7, 7, 6, 6, 5, 5, 5, 5])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200">
              Tankönyvi példa (8 versenyző)
            </button>
            <button onClick={() => setPlayed([7, 7, 6, 6, 5, 5, 5, 4])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200">
              Valaki rosszul emlékszik
            </button>
            <button onClick={() => setPlayed([3, 3, 3, 3, 2, 2, 2])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200">
              7 csapat, 9 meccs (HF 2.)
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {played.map((x, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-center">
                <div className="text-xs font-bold text-slate-500">{LETTERS[i]}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <button onClick={() => bump(i, -1)} className="w-6 h-6 rounded bg-slate-200 text-slate-700 font-bold" aria-label={`${LETTERS[i]} kevesebb`}>
                    −
                  </button>
                  <span className="w-6 font-mono font-bold text-blue-800">{x}</span>
                  <button onClick={() => bump(i, 1)} className="w-6 h-6 rounded bg-slate-200 text-slate-700 font-bold" aria-label={`${LETTERS[i]} több`}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm font-mono text-slate-700 space-y-1">
            <div>válaszok összege: {played.join(' + ')} = {lab1.sum}</div>
            <div>teljes bajnokság: C({players}; 2) = {lab1.total} mérkőzés</div>
            {lab1.graphical ? (
              <>
                <div>lejátszott: {lab1.sum} / 2 = <strong>{lab1.done}</strong></div>
                <div>hátralévő: {lab1.total} − {lab1.done} = <strong>{lab1.left}</strong></div>
              </>
            ) : (
              <div className="font-sans font-bold text-rose-700">
                {lab1.even
                  ? 'Az összeg páros, de ilyen állás mégsem lehetséges (valaki „túl sokat” vagy „túl keveset” mondott).'
                  : 'Az összeg páratlan: valaki rosszul emlékszik, mert a fokszámok összege mindig páros!'}
              </div>
            )}
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Egy versenyző legfeljebb {players - 1} meccset játszhat. Ha egy választ eggyel módosítasz, az összeg paritása megváltozik – páratlan összeg mellett az állás biztosan lehetetlen.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Teljes gráf – csúcsot vagy élt választunk?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">csúcsok száma n: {kn}</label>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={kn}
                  onChange={(e) => setKn(Number(e.target.value))}
                  className="w-full accent-purple-600"
                  aria-label="csúcsok száma"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">kiválasztott elemek száma k: {pick}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={pick}
                  onChange={(e) => setPick(Number(e.target.value))}
                  className="w-full accent-orange-600"
                  aria-label="kiválasztott elemek száma"
                />
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>élek száma: {kn} · {kn - 1} / 2 = <strong>{knEdges}</strong></div>
                <div>minden fokszám: {kn - 1}; fokszámösszeg: {kn} · {kn - 1} = {kn * (kn - 1)} = 2 · {knEdges}</div>
                <div>
                  {pick} csúcs kiválasztása: C({kn}; {pick}) = <strong>{pickV === pick ? fmtInt(binom(kn, pick)) : 0}</strong>
                </div>
                <div>
                  {pick} él kiválasztása: C({knEdges}; {pick}) = <strong>{fmtInt(binom(knEdges, pick))}</strong>
                </div>
              </div>
            </div>
            <svg viewBox="0 0 300 250" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" role="img" aria-label="teljes gráf">
              {knPts.map((p, i) =>
                knPts.slice(i + 1).map((q, j) => (
                  <line key={`${i}-${i + 1 + j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="#8b5cf6" strokeWidth="1.4" opacity="0.8" />
                ))
              )}
              {knPts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="7" fill="#6d28d9" stroke="#ffffff" strokeWidth="2" />
              ))}
            </svg>
          </div>
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-2">
            <label className="block text-xs font-semibold text-purple-900">Visszafelé: a teljes gráf éleinek száma</label>
            <input
              type="number"
              min="1"
              value={edgeInput}
              onChange={(e) => setEdgeInput(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
              className="w-40 border border-slate-300 rounded-lg px-2 py-1 text-sm"
              aria-label="élek száma"
            />
            <div className="text-sm text-purple-900">
              {inverseN !== null ? (
                <>
                  n · (n − 1) = {2 * edgeInput} = {inverseN} · {inverseN - 1} ⇒ <strong>{inverseN} csúcsú</strong> teljes gráf
                </>
              ) : (
                <>Nincs ilyen teljes gráf: a {2 * edgeInput} nem írható fel két szomszédos egész szám szorzataként.</>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[36, 78, 120, 40].map((v) => (
                <button key={v} onClick={() => setEdgeInput(v)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-purple-800 border border-purple-200 hover:bg-purple-100">
                  {v} él
                </button>
              ))}
            </div>
          </div>
          <TheoryCallout type="success" title="Próbáld ki!">
            n = 5, k = 2: 2 csúcs 10-féleképpen, de 2 él a 10 közül már 45-féleképpen választható. 36 él ⇒ 9 csúcs, 78 él ⇒ 13 csúcs, 120 él ⇒ 16 csúcs; 40 élű teljes gráf nincs.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinatoricsGraphsTheory;
