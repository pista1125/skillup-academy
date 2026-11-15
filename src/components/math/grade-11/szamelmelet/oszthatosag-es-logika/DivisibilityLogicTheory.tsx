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
  DivisibilityVennSvg,
  LogicOperationsTableSvg,
  QuantifierNegationSvg,
  ImplicationConverseSvg,
  ThreeSetVennSvg
} from './DivisibilityLogicFigures';

type Statement = { text: string; value: boolean };

const STATEMENTS: Statement[] = [
  { text: 'A 6 páros szám.', value: true },
  { text: 'A 7 páratlan szám.', value: true },
  { text: 'Az 1 prímszám.', value: false },
  { text: 'A 2 prímszám.', value: true },
  { text: 'A 12 osztható 3-mal.', value: true },
  { text: 'A 6 páratlan szám.', value: false },
  { text: 'A 9571 többszöröse a 3-nak.', value: false },
  { text: 'Az 5 relatív prím a 6-hoz.', value: true },
  { text: 'A 12 osztható 24-gyel.', value: false }
];

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;

const ValueChip: React.FC<{ v: boolean }> = ({ v }) => (
  <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-black ${v ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
    {v ? 'IGAZ' : 'HAMIS'}
  </span>
);

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const noDot = (s: string) => s.replace(/\.$/, '');

export const DivisibilityLogicTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: logikai műveletek
  const [pIdx, setPIdx] = useState<number>(1);
  const [qIdx, setQIdx] = useState<number>(2);
  const P = STATEMENTS[pIdx];
  const Q = STATEMENTS[qIdx];
  const pT = noDot(P.text);
  const qT = lowerFirst(noDot(Q.text));
  const ops: { name: string; sentence: string; value: boolean }[] = [
    { name: 'tagadás (nem P)', sentence: `Nem igaz, hogy ${lowerFirst(pT)}.`, value: !P.value },
    { name: 'és (konjunkció)', sentence: `${pT} és ${qT}.`, value: P.value && Q.value },
    { name: 'megengedő vagy (diszjunkció)', sentence: `${pT} vagy ${qT}.`, value: P.value || Q.value },
    { name: 'kizáró vagy', sentence: `Vagy ${lowerFirst(pT)}, vagy ${qT}.`, value: P.value !== Q.value },
    { name: 'ha…, akkor (implikáció)', sentence: `Ha ${lowerFirst(pT)}, akkor ${qT}.`, value: !P.value || Q.value },
    { name: 'akkor és csak akkor (ekvivalencia)', sentence: `${pT} akkor és csak akkor, ha ${qT}.`, value: P.value === Q.value }
  ];

  // Labor II: oszthatósági állítások
  const [a, setA] = useState<number>(4);
  const [b, setB] = useState<number>(6);
  const N = 60;
  const forward = a % b === 0; // ha a | n, akkor b | n
  const backward = b % a === 0; // ha b | n, akkor a | n
  const L = lcm(a, b);
  const nums = Array.from({ length: N }, (_, i) => i + 1);
  const both = nums.filter((n) => n % a === 0 && n % b === 0);
  const either = nums.filter((n) => n % a === 0 || n % b === 0);
  const exactlyOne = nums.filter((n) => (n % a === 0) !== (n % b === 0));
  const productClaim = a * b; // "ha a | n és b | n, akkor a·b | n"
  const productTrue = L === productClaim;

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="oszthatosag-es-logika"
      title="5. Oszthatóság és logika"
      subtitle="Állítások, logikai értékek, tagadás, „és”, „vagy”, „ha…, akkor” – oszthatósági példákon."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_oszthatosag_es_logika_tananyag.pdf"
      practiceTitle="Készen állsz a logikai és oszthatósági állítások eldöntésére?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — HOGYAN DÖNTSÜK EL, IGAZ-E EGY ÁLLÍTÁS?',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              „ha…, akkor” állítás hamis ⇔ van ellenpélda
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>és</strong>: mindkét rész igaz; <strong>vagy</strong>: legalább az egyik igaz; <strong>vagy-vagy</strong>: pontosan az egyik igaz.</li>
              <li>A <strong>„minden”</strong> tagadása <strong>„van olyan, amelyre nem”</strong>; a <strong>„van olyan”</strong> tagadása <strong>„minden … nem”</strong>.</li>
              <li>Egy igaz állítás <strong>megfordítása</strong> nem biztos, hogy igaz (ha 4 | n, akkor páros – de a 6 páros, és 4 ∤ 6).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: oszthatóság a Venn-diagramon" badge="Tankönyv 136. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A halmazok a 40-nél kisebb pozitív egészekből állnak:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>A</strong> = 4-gyel oszthatók, <strong>B</strong> = 6-tal oszthatók, <strong>C</strong> = 2-vel oszthatók,</li>
              <li><strong>D</strong> = 24-gyel oszthatók, <strong>E</strong> = 12-vel oszthatók.</li>
            </ul>
            <p>
              <strong>a)</strong> A legbővebb halmaz a páros számoké (C), ezen belül van A és B. A 4-gyel és 6-tal is osztható számok éppen a 12 többszörösei, ezért <strong>E = A ∩ B</strong> = {'{'}12; 24; 36{'}'}, és ennek része <strong>D</strong> = {'{'}24{'}'}.
            </p>
            <p className="font-semibold text-slate-800">b) Igaz vagy hamis?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>A1:</strong> „A 6 nem páros szám.” – <ValueChip v={false} />, a 6 többszöröse a 2-nek (6 ∈ C).</li>
              <li><strong>A2:</strong> „Van olyan páros szám, amely nem osztható 4-gyel.” – <ValueChip v={true} />, pl. a 2.</li>
              <li><strong>A3:</strong> „Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 24-gyel.” – <ValueChip v={false} />, ellenpélda a 12.</li>
              <li><strong>A4:</strong> „Ha többszöröse a 24-nek, akkor a 12-nek is.” – <ValueChip v={true} />, mert a 24 többszöröse a 12-nek (D ⊂ E).</li>
              <li><strong>A5:</strong> „A 12 minden többszöröse osztható 4-gyel és 6-tal.” – <ValueChip v={true} /> (E = A ∩ B).</li>
              <li><strong>A6:</strong> „Ha osztható 2-vel és 4-gyel, akkor 6-tal is.” – <ValueChip v={false} />, ellenpélda a 4.</li>
              <li><strong>A7:</strong> „3 szám osztható 4-gyel és 6-tal.” – <ValueChip v={true} />: az „és” miatt A ∩ B elemeit számoljuk (12, 24, 36).</li>
              <li><strong>A8:</strong> „12 szám osztható 4-gyel vagy 6-tal.” – <ValueChip v={true} />: a „vagy” miatt A ∪ B elemeit számoljuk: 9 + 6 − 3 = 12.</li>
            </ul>
          </div>
          <DivisibilityVennSvg />
        </div>
        <TheoryCallout type="info" title="Megjegyzés">
          Nemcsak az oszthatósági szabályokat kellett helyesen használni, hanem figyelni kellett a halmazok elemeinek kapcsolatára és az állításokban szereplő <strong>kötőszavakra</strong> („és”, „vagy”, „ha…, akkor”) is.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Alapfogalmak, logikai műveletek I. */}
      <TheorySection title="2. Állítás és logikai műveletek I." badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <TheoryCard title="Állítás (kijelentés, ítélet)" badge="Definíció" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              Olyan kijelentő mondat, amelyről <strong>egyértelműen eldönthető</strong>, hogy igaz vagy hamis. Ez a <strong>logikai értéke</strong>.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
              <li>„A 11 páratlan szám.” – állítás, igaz.</li>
              <li>„A 9571 többszöröse a 3-nak.” – állítás, hamis (a számjegyek összege 22).</li>
              <li>„A 13 szerencsés szám.” – <strong>nem</strong> állítás: nem dönthető el egyértelműen.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Halmazos megfelelők" badge="Kapcsolat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>és</strong> ↔ metszet: A ∩ B (mindkét halmaz eleme).</li>
              <li><strong>megengedő vagy</strong> ↔ unió: A ∪ B (legalább az egyiknek eleme).</li>
              <li><strong>tagadás</strong> ↔ komplementer.</li>
              <li>A <strong>„de”</strong> kötőszó is „és” műveletet fejez ki.</li>
            </ul>
          </TheoryCard>
        </div>
        <LogicOperationsTableSvg />
        <TheoryTable
          headers={['Művelet', 'Mikor igaz?', 'Példa (logikai érték)']}
          rows={[
            ['tagadás (negáció): „nem”', 'ha az eredeti állítás hamis', '„A 6 nem páros szám.” (hamis); „Az 1 nem prímszám.” (igaz)'],
            ['„és” (konjunkció)', 'ha mindkét kijelentés igaz', '„A 7 páratlan és a 6 páros.” (igaz); „A 7 páratlan és az 1 prím.” (hamis)'],
            ['„vagy” (megengedő, diszjunkció)', 'ha legalább az egyik igaz', '„A 12 osztható 3-mal vagy a 2 prím.” (igaz); „A 6 páratlan vagy az 1 prím.” (hamis)'],
            ['„vagy-vagy” (kizáró vagy)', 'ha pontosan az egyik igaz', '„Vagy a 7 páratlan, vagy az 1 prím.” (igaz); „Vagy a 12 osztható 3-mal, vagy a 2 prím.” (hamis)']
          ]}
        />
      </TheorySection>

      {/* 3. Minden / van olyan */}
      <TheorySection title="3. Minden / van olyan – és a tagadásuk" badge="Elmélet" badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Az <strong>általános érvényű</strong> (univerzális) kijelentés tagadása azt mondja ki, hogy <strong>van olyan</strong> szám, amelyre nem érvényes a tulajdonság.
            </p>
            <p>
              A <strong>létezést</strong> (egzisztenciát) állító kijelentés tagadása azt mondja ki, hogy <strong>minden</strong> szám olyan, amelyre nem érvényes a tulajdonság.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>„Van olyan szám, amelynek pontosan 5 pozitív osztója van.” → „Minden számnak 5-től különböző számú pozitív osztója van.”</li>
              <li>„Minden prímszámnak pontosan 2 osztója van.” → „Van olyan prímszám, amelynek nem pontosan 2 osztója van.”</li>
              <li>„Létezik olyan természetes szám, ami osztható 0-val.” → „Egyik természetes szám sem osztható 0-val.”</li>
            </ul>
          </div>
          <QuantifierNegationSvg />
        </div>
      </TheorySection>

      {/* 4. Logikai műveletek II., megfordítás */}
      <TheorySection title="4. „Ha…, akkor”, „akkor és csak akkor” és a megfordítás" badge="Elmélet" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <TheoryCard title="Implikáció: „ha A, akkor B”" badge="Művelet" badgeColor="sky">
            <p className="text-sm text-slate-700">
              <strong>Csak akkor hamis</strong>, ha az előtag igaz és az utótag hamis; minden más esetben igaz.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
              <li>„Ha ez az autó egy Ferrari, akkor Olaszországban gyártották.” – igaz.</li>
              <li>„Ha ez az autó egy Ferrari, akkor Magyarországon gyártották.” – hamis.</li>
              <li>„Ha ez az autó (a Ferrari) egy Suzuki, akkor …” – igaz, mivel az előtag hamis.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Ekvivalencia: „A akkor és csak akkor B”" badge="Művelet" badgeColor="amber">
            <p className="text-sm text-slate-700">
              Akkor igaz, ha a két kijelentés logikai értéke <strong>megegyezik</strong>. Az állítást és a megfordítását fogalmazza meg egyszerre.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-slate-700">
              <li>„Egy egész szám akkor és csak akkor osztható 3-mal, ha számjegyeinek összege osztható 3-mal.” – igaz (mindkét irány igaz).</li>
              <li>„Egy egész szám akkor és csak akkor osztható 4-gyel, ha páros.” – hamis (a megfordítás hamis).</li>
            </ul>
          </TheoryCard>
        </div>
        <ImplicationConverseSvg />
        <TheoryCallout type="tip" title="Megfordítás">
          A „ha A, akkor B” állítás megfordítása „ha B, akkor A”: a feltételt és a következményt felcseréljük. Egy igaz állítás megfordítása lehet igaz is, hamis is – mindig külön kell ellenőrizni!
        </TheoryCallout>
      </TheorySection>

      {/* 5. Tankönyvi feladatok */}
      <TheorySection title="5. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Halmazábra (3. feladat)" badge="Feladat" badgeColor="amber">
            <ThreeSetVennSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 3 többszöröse <em>és</em> 30 osztója: <strong>3, 6, 15</strong>.</li>
              <li><strong>b)</strong> 5 többszöröse <em>vagy</em> 30 osztója: <strong>1, 2, 3, 5, 6, 10, 15</strong>.</li>
              <li><strong>c)</strong> <em>vagy</em> 3 többszöröse, <em>vagy</em> 30 osztója (pontosan az egyik): <strong>1, 2, 5, 9, 10, 12, 18</strong>.</li>
              <li><strong>d)</strong> nem osztója a 30-nak, de többszöröse az 5-nek: <strong>nincs ilyen szám</strong> (5, 10, 15 mind osztója a 30-nak).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Állítások megfordítása (4. feladat)" badge="Feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> Ha 3 | n, akkor 9 | n: <strong>hamis</strong> (pl. 6). Megfordítás: ha 9 | n, akkor 3 | n: <strong>igaz</strong>.</li>
              <li><strong>b)</strong> Ha 12 | n, akkor 4 | n: <strong>igaz</strong>. Megfordítás: ha 4 | n, akkor 12 | n: <strong>hamis</strong> (pl. 4).</li>
              <li><strong>c)</strong> Két prímszám összege mindig páros: <strong>hamis</strong> (2 + 3 = 5). Megfordítás: ha két szám összege páros, akkor mindkettő prím: <strong>hamis</strong> (4 + 6).</li>
              <li><strong>d)</strong> Különböző összetett számok mindig relatív prímek: <strong>hamis</strong> (4 és 6). Megfordítás: ha két szám relatív prím, akkor különböző összetett számok: <strong>hamis</strong> (2 és 3).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) „Akkor és csak akkor” (5. feladat)" badge="Feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>a)</strong> 5 | n ⇔ az utolsó jegye 5: <strong>hamis</strong> (a 10 osztható 5-tel, de 0-ra végződik).</li>
              <li><strong>b)</strong> prím ⇔ pontosan 2 osztója van: <strong>igaz</strong> (ez a definíció).</li>
              <li><strong>c)</strong> 4 | n ⇔ 8 | n: <strong>hamis</strong> (4 | 4, de 8 ∤ 4).</li>
              <li><strong>d)</strong> a · b páros ⇔ mindkettő páros: <strong>hamis</strong> (2 · 3 = 6 páros).</li>
              <li><strong>e)</strong> 12 | n ⇔ 3 | n és 4 | n: <strong>igaz</strong>, mert 3 és 4 relatív prímek, [3; 4] = 12.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok (érettségi 2010, 2020)" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>HF 1.</strong> I. Minden prímszám páratlan – hamis (2). II. Létezik páratlan prímszám – igaz. III. Minden egész szám racionális – igaz. IV. Van két egész hányadosaként felírható irracionális szám – hamis. V. Nem létezik páros prímszám – hamis.</li>
              <li><strong>HF 2. a)</strong> A: ha osztója 24-nek, akkor 12-nek is – hamis (8). B: ha 12 | n, akkor 6 | n – igaz. C: ha 2 | n és 4 | n, akkor 8 | n – hamis (4).</li>
              <li><strong>HF 2. b)</strong> Megfordítások: A′: ha osztója 12-nek, akkor 24-nek is – igaz. B′: ha 6 | n, akkor 12 | n – hamis (6). C′: ha 8 | n, akkor 2 | n és 4 | n – igaz.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: a „szorzat-szabály”" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="4 | n és 6 | n ⇒ 24 | n? NEM!"
          wrong="Ha egy szám osztható 4-gyel és 6-tal, akkor osztható 4 · 6 = 24-gyel."
          wrongExplanation="A 12 osztható 4-gyel és 6-tal is, de 24-gyel nem – egyetlen ellenpélda elég ahhoz, hogy a „ha…, akkor” állítás hamis legyen."
          correct="Ha 4 | n és 6 | n, akkor [4; 6] = 12 | n."
          correctExplanation="Két osztóval egyszerre osztható szám a legkisebb közös többszörösükkel osztható. A szorzattal csak akkor, ha a két szám relatív prím (pl. 3 és 4 ⇒ 12)."
          tip="Hamisnak tűnő „ha…, akkor” állításnál keress ellenpéldát; igaznak tűnőnél gondold meg, nincs-e mégis egy kivétel!"
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Logikai műveletek" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">P állítás</label>
              <select value={pIdx} onChange={(e) => setPIdx(Number(e.target.value))} className="w-full border border-emerald-300 rounded-lg p-2 text-sm" aria-label="P állítás">
                {STATEMENTS.map((s, i) => (
                  <option key={s.text} value={i}>{s.text}</option>
                ))}
              </select>
              <div className="mt-1 text-xs text-slate-600">logikai értéke: <ValueChip v={P.value} /></div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Q állítás</label>
              <select value={qIdx} onChange={(e) => setQIdx(Number(e.target.value))} className="w-full border border-emerald-300 rounded-lg p-2 text-sm" aria-label="Q állítás">
                {STATEMENTS.map((s, i) => (
                  <option key={s.text} value={i}>{s.text}</option>
                ))}
              </select>
              <div className="mt-1 text-xs text-slate-600">logikai értéke: <ValueChip v={Q.value} /></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-emerald-50 text-emerald-900">
                <tr>
                  <th className="p-2 text-left">Művelet</th>
                  <th className="p-2 text-left">Összetett állítás</th>
                  <th className="p-2 text-right">Érték</th>
                </tr>
              </thead>
              <tbody>
                {ops.map((o) => (
                  <tr key={o.name} className="border-t border-slate-200">
                    <td className="p-2 font-semibold text-slate-700">{o.name}</td>
                    <td className="p-2 text-slate-700">{o.sentence}</td>
                    <td className="p-2 text-right"><ValueChip v={o.value} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TheoryCallout type="tip" title="Próbáld ki!">
            Válassz hamis P-t: a „ha P, akkor Q” mindig igaz lesz, bármi is Q. Válassz két igaz állítást: az „és” és a „vagy” igaz, a kizáró „vagy-vagy” hamis.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Oszthatósági állítások tesztelője" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">a = {a}</label>
              <input type="range" min="2" max="15" value={a} onChange={(e) => setA(Number(e.target.value))} className="w-full accent-purple-600" aria-label="a értéke" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">b = {b}</label>
              <input type="range" min="2" max="15" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-fuchsia-600" aria-label="b értéke" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="font-semibold text-slate-800">Ha {a} | n, akkor {b} | n.</div>
              <div className="mt-1"><ValueChip v={forward} /> {forward ? `mert ${b} | ${a}` : `ellenpélda: n = ${a} (${b} ∤ ${a})`}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="font-semibold text-slate-800">Megfordítás: ha {b} | n, akkor {a} | n.</div>
              <div className="mt-1"><ValueChip v={backward} /> {backward ? `mert ${a} | ${b}` : `ellenpélda: n = ${b} (${a} ∤ ${b})`}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="font-semibold text-slate-800">{a} | n akkor és csak akkor, ha {b} | n.</div>
              <div className="mt-1"><ValueChip v={forward && backward} /> {forward && backward ? 'a két szám egyenlő' : 'az egyik irány hamis'}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="font-semibold text-slate-800">Ha {a} | n és {b} | n, akkor {productClaim} | n.</div>
              <div className="mt-1">
                <ValueChip v={productTrue} /> {productTrue ? `mert ${a} és ${b} relatív prímek` : `ellenpélda: n = ${L} = [${a}; ${b}]`}
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-600 mb-2">1-től {N}-ig: <span className="text-blue-700">csak {a} | n</span>, <span className="text-amber-700">csak {b} | n</span>, <span className="text-pink-700">mindkettő</span></div>
            <div className="grid grid-cols-10 gap-1">
              {nums.map((n) => {
                const ia = n % a === 0;
                const ib = n % b === 0;
                const cls = ia && ib ? 'bg-pink-200 text-pink-900 font-bold' : ia ? 'bg-blue-100 text-blue-900' : ib ? 'bg-amber-100 text-amber-900' : 'bg-slate-50 text-slate-400';
                return (
                  <div key={n} className={`text-center text-xs rounded py-1 ${cls}`}>{n}</div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg bg-pink-50 border border-pink-200 p-2">„és” (metszet): <strong>{both.length}</strong> db – ezek a [{a}; {b}] = {L} többszörösei</div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2">„vagy” (unió): <strong>{either.length}</strong> db</div>
            <div className="rounded-lg bg-purple-50 border border-purple-200 p-2">„vagy-vagy” (pontosan az egyik): <strong>{exactlyOne.length}</strong> db</div>
          </div>
          <p className="text-xs text-slate-500">Az a = 4, b = 6 beállítás a kidolgozott feladat: 4 | n és 6 | n ⇒ 24 | n hamis, ellenpélda a 12.</p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DivisibilityLogicTheory;
