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
  SubsetOvercountSvg,
  BinomialNotationSvg,
  VolleyballMatchesSvg,
  HeptagonSegmentsSvg,
  LiftGroupsSvg,
  TicketPunchSvg
} from './CombinationsFigures';

const group = (v: bigint | number) => {
  const s = typeof v === 'bigint' ? v.toString() : Math.round(v).toString();
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const factBig = (n: number): bigint => {
  let r = 1n;
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
};

const fallingBig = (n: number, k: number): bigint => {
  let r = 1n;
  for (let i = 0; i < k; i++) r *= BigInt(n - i);
  return r;
};

const subsets = (items: string[], k: number): string[][] => {
  const out: string[][] = [];
  const rec = (start: number, cur: string[]) => {
    if (cur.length === k) {
      out.push(cur.slice());
      return;
    }
    for (let i = start; i < items.length; i++) {
      cur.push(items[i]);
      rec(i + 1, cur);
      cur.pop();
    }
  };
  rec(0, []);
  return out;
};

/** „n alatt a k” jelölés a szövegben. */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-lg leading-none">(</span>
    <span className="inline-flex flex-col items-center text-[0.8em] leading-tight px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-lg leading-none">)</span>
  </span>
);

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export const CombinationsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: részhalmazok
  const [n, setN] = useState<number>(9);
  const [k, setK] = useState<number>(4);

  // Labor II: nyereménysorsolás
  const [people, setPeople] = useState<number>(90);
  const [samePrize, setSamePrize] = useState<boolean>(true);
  const [canWinBoth, setCanWinBoth] = useState<boolean>(false);

  const kk = Math.min(k, n);
  const ordered = fallingBig(n, kk);
  const kFact = factBig(kk);
  const comb = ordered / kFact;
  const listed = useMemo(() => (n <= 7 ? subsets(LETTERS.slice(0, n), kk) : []), [n, kk]);

  const prize = useMemo(() => {
    const p = people;
    if (samePrize && !canWinBoth)
      return { formula: `${p} · ${p - 1} / 2! = ${(p * (p - 1)) / 2}`, value: (p * (p - 1)) / 2, note: 'nem számít a sorrend: 2 különböző nyertes, osztunk 2!-sal' };
    if (!samePrize && !canWinBoth)
      return { formula: `${p} · ${p - 1} = ${p * (p - 1)}`, value: p * (p - 1), note: 'számít a sorrend: az 1. és a 2. nyeremény nyertese más' };
    if (!samePrize && canWinBoth)
      return { formula: `${p} · ${p} = ${p * p}`, value: p * p, note: 'számít a sorrend, és lehet ismétlődés' };
    return {
      formula: `${p} · ${p - 1} / 2! + ${p} = ${(p * (p - 1)) / 2 + p}`,
      value: (p * (p - 1)) / 2 + p,
      note: 'két különböző nyertes VAGY egy ember nyeri mindkettőt'
    };
  }, [people, samePrize, canWinBoth]);

  const smallList = useMemo(() => {
    if (people > 5) return [];
    const names = ['A', 'B', 'C', 'D', 'E'].slice(0, people);
    const out: string[] = [];
    names.forEach((x, i) =>
      names.forEach((y, j) => {
        if (!canWinBoth && i === j) return;
        if (samePrize && j < i) return;
        out.push(samePrize ? `{${x}, ${y}}` : `1.: ${x}, 2.: ${y}`);
      })
    );
    return out;
  }, [people, samePrize, canWinBoth]);

  return (
    <TheoryTemplate
      topicId="g11-kombinatorika-grafok"
      subtopicId="amikor-nem-szamit-a-kivalasztas-sorrendje"
      title="3. Amikor nem számít a kiválasztás sorrendje"
      subtitle="Hány 4 elemű részhalmaza van egy 9 elemű halmaznak? Sorban kiválasztunk, majd osztunk k!-sal – így születik az „n alatt a k” szám."
      badge="11. OSZTÁLY • II. KOMBINATORIKA, GRÁFOK • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_kivalasztas_sorrend_nelkul_tananyag.pdf"
      practiceTitle="Készen állsz a kiválasztási feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — n ELEMŰ HALMAZ k ELEMŰ RÉSZHALMAZAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
                <Binom n="n" k="k" /> = n · (n − 1) · … · (n − k + 1) / k!
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kiolvasva: <strong>„n alatt a k”</strong> – az n elemű halmaz k elemű részhalmazainak száma (n ≥ k pozitív egészek).</li>
              <li>Először <strong>sorban</strong> választunk ki k elemet: n · (n − 1) · … · (n − k + 1)-féleképpen.</li>
              <li>Mivel a k kiválasztott elemet k!-féle sorrendben kaphattuk, <strong>osztunk k!-sal</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: 4 elemű részhalmazok" badge="Tankönyv 54. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Hány 4 elemű részhalmaza van a <strong>H = {'{'}a, b, c, d, e, f, g, h, i{'}'}</strong> halmaznak?
            </p>
            <p>
              H-nak 9 eleme van. Ha <strong>sorban</strong> választjuk ki a 4 elemet, a lehetőségek száma 9 · 8 · 7 · 6 = 3024. Egy
              részhalmaz esetében azonban <strong>nem számít az elemek kiválasztásának sorrendje</strong>: az 1-3-2-4 és a 4-2-3-1 eset
              ugyanazt a részhalmazt adja.
            </p>
            <p>
              Az {'{'}1; 2; 3; 4{'}'} részhalmazt annyiszor számoltuk, ahányféleképpen sorba tudjuk rendezni ezt a 4 elemet, azaz
              4! = 24-szer. Mivel minden részhalmazt 24-szer számoltunk, a 4 elemű részhalmazok száma
              <strong> 9 · 8 · 7 · 6 / 4! = 126</strong>.
            </p>
          </div>
          <SubsetOvercountSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Az n elemű halmaz k elemű részhalmazainak száma" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <TheoryCard title="Két lépésben" badge="Elmélet" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>
                Kiválasztunk egy első, egy második, …, egy k-adik elemet: az elsőt n, a másodikat n − 1, …, a k-adikat
                n − k + 1 elem közül, tehát <strong>n · (n − 1) · … · (n − k + 1)</strong>-féleképpen.
              </li>
              <li>
                Ezt elosztjuk azzal, ahányféleképpen a kiválasztott k elemet sorba rendezhetjük: <strong>k!</strong>-sal.
              </li>
              <li>
                Például 10 elemű halmaz 3 elemű részhalmazai: <Binom n="10" k="3" /> = 10 · 9 · 8 / 3! = 120; 12 elemű halmaz 4 elemű
                részhalmazai: <Binom n="12" k="4" /> = 12 · 11 · 10 · 9 / 4! = 495.
              </li>
            </ul>
          </TheoryCard>
          <BinomialNotationSvg />
        </div>
        <TheoryTable
          headers={['Kérdés', 'Számít a sorrend', 'Nem számít a sorrend']}
          rows={[
            ['9 unokából 3', 'mindegyik más feladatot kap: 9 · 8 · 7 = 504', 'hárman főzik a paprikás krumplit: 504 : 3! = 84'],
            ['25 tanulóból 3 küldött', 'irodalom, történelem, földrajz: 25 · 24 · 23 = 13 800', 'mindhárman matematikán: 13 800 : 3! = 2300'],
            ['90 résztvevő, 2 nyeremény', 'különböző nyeremények: 90 · 89 = 8010', 'egyforma nyeremények: 8010 : 2! = 4005']
          ]}
        />
        <TheoryCallout type="tip" title="Hogyan döntsük el, számít-e a sorrend?">
          Kérdezd meg: ha a kiválasztottakat felcserélem, más eredményt kapok? Ha a kiválasztottak különböző szerepet kapnak (feladat,
          hely, nyeremény), számít a sorrend. Ha csak az számít, <strong>kik</strong> kerültek a kiválasztottak közé (küldöttség,
          részhalmaz, kihúzott lapok, mérkőzés két csapata), nem számít.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kidolgozott feladatok */}
      <TheorySection title="3. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Az {A; n; d; o; r} halmaz részhalmazai" badge="1–2. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>1 elemű: 5; 2 elemű: 5 · 4 / 2! = 10; 3 elemű: 5 · 4 · 3 / 3! = 10; 4 elemű: 5 · 4 · 3 · 2 / 4! = 5.</li>
              <li>Figyeld meg: ugyanannyi 2 elemű, mint 3 elemű részhalmaz van – minden 2 elemű kiválasztás kijelöli a kimaradó 3 elemet.</li>
              <li>3 elemű részhalmazok, ha |B| = 3, 4, 5, 6: <strong>1, 4, 10, 20</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Röplabdabajnokság" badge="3. feladat" badgeColor="orange">
            <VolleyballMatchesSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Minden mérkőzést a két résztvevő csapat határoz meg, a sorrendjük nem számít: <Binom n="6" k="2" /> = 6 · 5 / 2 = <strong>15</strong> mérkőzés.
            </p>
          </TheoryCard>
          <TheoryCard title="C) Kempingező unokák és kártyalapok" badge="4–5. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>4. a)</strong> 3 unoka, mindegyik más feladatban: 9 · 8 · 7 = <strong>504</strong> (számít a sorrend).</li>
              <li><strong>4. b)</strong> 3 unoka főzi a vacsorát: <Binom n="9" k="3" /> = 504 / 3! = <strong>84</strong>.</li>
              <li><strong>5.</strong> Csilla egyszerre 2 lapot húz apa 5 lapjából: <Binom n="5" k="2" /> = <strong>10</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) A lift: 12 ember, 4 személyes fülke" badge="6. feladat" badgeColor="indigo">
            <LiftGroupsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) <Binom n="12" k="4" /> = 495; b) <Binom n="8" k="4" /> = 70; c) <Binom n="4" k="4" /> = 1;</li>
              <li>d) a menetek sorrendje számít (első, második, harmadik): 495 · 70 · 1 = <strong>34 650</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Két nyeremény, 90 résztvevő" badge="7. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> két egyforma, mindenki legfeljebb egyet: <Binom n="90" k="2" /> = 90 · 89 / 2 = <strong>4005</strong></li>
              <li><strong>b)</strong> két különböző, mindenki csak egyet: 90 · 89 = <strong>8010</strong></li>
              <li><strong>c)</strong> két különböző, egy ember mindkettőt is: 90 · 90 = <strong>8100</strong></li>
              <li><strong>d)</strong> két egyforma, egy ember mindkettőt is: 4005 + 90 = <strong>4095</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <HeptagonSegmentsSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> a) 7 résztvevő kézfogásai: <Binom n="7" k="2" /> = 21; b) konvex hétszög összekötő szakaszai: szintén 21 (7 oldal + 14 átló).</li>
              <li><strong>HF 2.</strong> 25 fős osztály, 3 küldött: a) három különböző vetélkedő: 13 800; b) mindhárman matematikán: 2300.</li>
              <li><strong>HF 3.</strong> 8 elemű halmaz legfeljebb 3 elemű részhalmazai: 1 + 8 + 28 + 56 = 93 (az üres halmazzal együtt).</li>
              <li><strong>HF 4.</strong> Lyukasztós buszjegy, 9 szám: a) 3 lyuk: 84; b) 4 lyuk: 126.</li>
            </ul>
            <TicketPunchSvg className="w-full h-auto mt-3" />
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Csapda */}
      <TheorySection title="4. Tipikus hiba: elmarad az osztás k!-sal" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ha nem számít a sorrend, a sorban kiválasztott esetek számát k!-sal osztani kell"
          wrong="25 tanulóból 3 fős küldöttség a matematikavetélkedőre: 25 · 24 · 23 = 13 800"
          wrongExplanation="Ebben a {Anna, Béla, Cili} küldöttség 3! = 6-szor szerepel (Anna-Béla-Cili, Béla-Anna-Cili, …). Fordított hiba: ha a küldöttek KÜLÖNBÖZŐ vetélkedőre mennek, akkor nem szabad osztani."
          correct="25 · 24 · 23 / 3! = 2300"
          correctExplanation="Mindhárman ugyanott indulnak, csak az számít, kik a küldöttek – ezért a 13 800 sorban kiválasztott esetet 3! = 6-tal osztjuk."
          tip="Ellenőrzés: n elem közül k kiválasztása sorrend nélkül mindig k!-szor kevesebb lehetőség, mint sorrenddel."
        />
      </TheorySection>

      {/* 5. Labor I */}
      <TheorySection title="5. Interaktív Laboratórium I: Részhalmaz-számláló" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">A halmaz elemszáma: n = {n}</label>
              <input
                type="range"
                min="1"
                max="90"
                value={n}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setN(v);
                  if (k > v) setK(v);
                }}
                className="w-full accent-emerald-600"
                aria-label="n"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">A részhalmaz elemszáma: k = {kk}</label>
              <input
                type="range"
                min="1"
                max={Math.min(n, 10)}
                value={kk}
                onChange={(e) => setK(Number(e.target.value))}
                className="w-full accent-teal-600"
                aria-label="k"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Kidolgozott (9, 4)', v: [9, 4] },
              { name: '{A; n; d; o; r}: (5, 2)', v: [5, 2] },
              { name: 'Röplabda (6, 2)', v: [6, 2] },
              { name: 'Lift (12, 4)', v: [12, 4] },
              { name: 'Kézfogás (7, 2)', v: [7, 2] },
              { name: 'Ötöslottó (90, 5)', v: [90, 5] }
            ].map((p) => (
              <button
                key={p.name}
                onClick={() => {
                  setN(p.v[0]);
                  setK(p.v[1]);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div>
              Sorban kiválasztva: {Array.from({ length: kk }, (_, i) => n - i).join(' · ')} = <strong>{group(ordered)}</strong>
            </div>
            <div>
              A kiválasztott {kk} elem sorrendjei: {kk}! = <strong>{group(kFact)}</strong>
            </div>
            <div className="text-base">
              <Binom n={n} k={kk} /> = {group(ordered)} : {group(kFact)} = <strong className="text-emerald-700">{group(comb)}</strong>
            </div>
            {listed.length > 0 && (
              <div className="text-xs text-slate-500 font-mono break-words pt-1">
                A(z) {'{'}{LETTERS.slice(0, n).join(', ')}{'}'} halmaz {kk} elemű részhalmazai ({listed.length} db):{' '}
                {listed
                  .slice(0, 40)
                  .map((s) => '{' + s.join(',') + '}')
                  .join(' ')}
                {listed.length > 40 ? ' …' : ''}
              </div>
            )}
          </div>
          <TheoryCallout type="success" title="Ötöslottó">
            A 90 számból 5 kihúzásánál nem számít a sorrend: <Binom n="90" k="5" /> = 43 949 268 lehetséges húzás. Sorrenddel
            5 273 912 160 lenne – pontosan 5! = 120-szor több.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 6. Labor II */}
      <TheorySection title="6. Interaktív Laboratórium II: Nyereménysorsolás – számít-e a sorrend?" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Résztvevők száma: {people}</label>
            <input
              type="range"
              min="2"
              max="100"
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
              className="w-full accent-purple-600"
              aria-label="résztvevők száma"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSamePrize(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${samePrize ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              két egyforma nyeremény
            </button>
            <button
              onClick={() => setSamePrize(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!samePrize ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              két különböző nyeremény
            </button>
            <button
              onClick={() => setCanWinBoth(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!canWinBoth ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              mindenki legfeljebb egyet nyerhet
            </button>
            <button
              onClick={() => setCanWinBoth(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${canWinBoth ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              egy ember mindkettőt is nyerheti
            </button>
            <button
              onClick={() => setPeople(4)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200"
            >
              kis eset: 4 résztvevő
            </button>
            <button
              onClick={() => setPeople(90)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200"
            >
              tankönyv: 90 résztvevő
            </button>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
            <div className="font-mono">{prize.formula}</div>
            <div>
              A sorsolás lehetséges végeredményei: <strong className="text-purple-700">{group(prize.value)}</strong>
            </div>
            <div className="text-xs text-slate-500">{prize.note}</div>
            {smallList.length > 0 && (
              <div className="text-xs text-slate-600 font-mono break-words pt-1">Mind felsorolva: {smallList.join('  ')}</div>
            )}
          </div>
          <TheoryCallout type="tip" title="A négy eset összevetése 90 résztvevővel">
            4005 (egyforma, egy-egy) &lt; 4095 (egyforma, akár mindkettő) &lt; 8010 (különböző, egy-egy) &lt; 8100 (különböző, akár
            mindkettő). A különböző nyereményeknél számít, ki melyiket kapja – ezért nagyobb a szám.
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CombinationsTheory;
