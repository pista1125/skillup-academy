import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { Venn, tv } from './vennKit';
import { SubsetSvg, SetOperationsSvg, SieveFormulaSvg, MovieVennSvg, TruthTablesSvg } from './SetsLogicSummaryFigures';

const numIn = 'w-16 px-2 py-1 rounded-lg border border-slate-300 text-sm font-mono';

const REGIONS: { code: string; name: string }[] = [
 ∖ { code: '100', name: 'csak A' },
 ∖ { code: '010', name: 'csak B' },
 ∖ { code: '001', name: 'csak C' },
 ∖ { code: '110', name: 'A, B (C nem)' },
 ∖ { code: '101', name: 'A, C (B nem)' },
 ∖ { code: '011', name: 'B, C (A nem)' },
 ∖ { code: '111', name: 'mindhárom' },
 ∖ { code: '000', name: 'egyik sem' }
];

const OPS: { id: string; label: string; test: (a: boolean, b: boolean, c: boolean) => boolean }[] = [
 ∖ { id: 'AuB', label: 'A ∪ B', test: (a, b) => a || b },
 ∖ { id: 'AnB', label: 'A ∩ B', test: (a, b) => a && b },
 ∖ { id: 'AmB', label: 'A \\ B', test: (a, b) => a && !b },
 ∖ { id: 'Ac', label: 'Ā', test: (a) => !a },
 ∖ { id: 'AnBnC', label: 'A ∩ B ∩ C', test: (a, b, c) => a && b && c },
 ∖ { id: 'AuBuC', label: 'A ∪ B ∪ C', test: (a, b, c) => a || b || c },
 ∖ { id: 'AuB_mC', label: '(A ∪ B) \\ C', test: (a, b, c) => (a || b) && !c },
 ∖ { id: 'exact1', label: 'pontosan egyben', test: (a, b, c) => Number(a) + Number(b) + Number(c) === 1 }
];

const LOGIC: { id: string; label: string; f: (a: boolean, b: boolean) => boolean; read: string }[] = [
 ∖ { id: 'or', label: 'A ∨ B', f: (a, b) => a || b, read: 'A vagy B (megengedő vagy)' },
 ∖ { id: 'and', label: 'A ∧ B', f: (a, b) => a && b, read: 'A és B' },
 ∖ { id: 'xor', label: 'vagy A, vagy B', f: (a, b) => a !== b, read: 'kizáró vagy' },
 ∖ { id: 'imp', label: 'A → B', f: (a, b) => !a || b, read: 'ha A, akkor B' },
 ∖ { id: 'conv', label: 'B → A', f: (a, b) => !b || a, read: 'a megfordítás: ha B, akkor A' },
 ∖ { id: 'eq', label: 'A ↔ B', f: (a, b) => a === b, read: 'A akkor és csak akkor, ha B' },
 ∖ { id: 'andnb', label: 'A ∧ ¬B', f: (a, b) => a && !b, read: 'A és nem B' },
 ∖ { id: 'ornb', label: 'A ∨ ¬B', f: (a, b) => a || !b, read: 'A vagy nem B' }
];

export const SetsLogicSummaryTheory: React.FC<{
 ∖ onBack?: () => void;
 ∖ onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
 ∖ // Labor I – három halmaz, régiónkénti elemszámok
 ∖ const [cnt, setCnt] = useState<Record<string, number>>({ '100': 3, '010': 2, '001': 1, '110': 8, '101': 0, '011': 6, '111': 0, '000': 4 });
 ∖ const [op, setOp] = useState<string>('AuB');
 ∖ // Labor II – igazságtáblázat
 ∖ const [A, setA] = useState<boolean>(true);
 ∖ const [B, setB] = useState<boolean>(false);
 ∖ const [lop, setLop] = useState<string>('imp');

 ∖ const s = useMemo(() => {
 ∖  ∖ const g = (c: string) => cnt[c] ?? 0;
 ∖  ∖ const sum = (codes: string[]) => codes.reduce((t, c) => t + g(c), 0);
 ∖  ∖ const a = sum(['100', '110', '101', '111']);
 ∖  ∖ const b = sum(['010', '110', '011', '111']);
 ∖  ∖ const c = sum(['001', '101', '011', '111']);
 ∖  ∖ const ab = g('110') + g('111');
 ∖  ∖ const ac = g('101') + g('111');
 ∖  ∖ const bc = g('011') + g('111');
 ∖  ∖ const abc = g('111');
 ∖  ∖ const union = a + b + c - ab - ac - bc + abc;
 ∖  ∖ const direct = sum(['100', '010', '001', '110', '101', '011', '111']);
 ∖  ∖ const total = direct + g('000');
 ∖  ∖ return { a, b, c, ab, ac, bc, abc, union, direct, total };
 ∖ }, [cnt]);

 ∖ const curOp = OPS.find((o) => o.id === op) ?? OPS[0];
 ∖ const shaded = REGIONS.filter((r) => curOp.test(r.code[0] === '1', r.code[1] === '1', r.code[2] === '1')).map((r) => r.code);
 ∖ const opCount = shaded.reduce((t, c) => t + (cnt[c] ?? 0), 0);
 ∖ const values = Object.fromEntries(REGIONS.map((r) => [r.code, String(cnt[r.code] ?? 0)]));

 ∖ const curL = LOGIC.find((o) => o.id === lop) ?? LOGIC[0];
 ∖ const rows: [boolean, boolean][] = [
 ∖  ∖ [true, true],
 ∖  ∖ [true, false],
 ∖  ∖ [false, true],
 ∖  ∖ [false, false]
 ∖ ];

 ∖ return (
 ∖  ∖ <TheoryTemplate
 ∖  ∖  ∖ topicId="g12-rendszerezo-osszefoglalas"
 ∖  ∖  ∖ subtopicId="halmazok-logika"
 ∖  ∖  ∖ title="1. Halmazok, logika – összefoglalás"
 ∖  ∖  ∖ subtitle="Halmaz megadása, műveletek, szitaformula, állítások és logikai műveletek, tagadás, megfordítás – érettségi ismétlés."
 ∖  ∖  ∖ badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • TANANYAG"
 ∖  ∖  ∖ themeColor="indigo"
 ∖  ∖  ∖ pdfFilename="12_osztaly_halmazok_logika_osszefoglalas_tananyag.pdf"
 ∖  ∖  ∖ practiceTitle="Készen állsz a halmazos és logikai érettségi feladatokra?"
 ∖  ∖  ∖ practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
 ∖  ∖  ∖ onBack={onBack}
 ∖  ∖  ∖ onStartQuiz={onStartQuiz}
 ∖  ∖  ∖ quickRule={{
 ∖  ∖  ∖  ∖ label: 'FONTOS SZABÁLY — SZITAFORMULA ÉS IMPLIKÁCIÓ',
 ∖  ∖  ∖  ∖ align: 'left',
 ∖  ∖  ∖  ∖ formula: (
 ∖  ∖  ∖  ∖  ∖ <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
 ∖  ∖  ∖  ∖  ∖  ∖ <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <span className="font-mono text-base font-black text-indigo-900 dark:text-indigo-200">|A ∪ B| = |A| + |B| − |A ∩ B|</span>
 ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-4 space-y-1 text-xs">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Három halmazra: |A ∪ B ∪ C| = |A| + |B| + |C| − |A ∩ B| − |A ∩ C| − |B ∩ C| + |A ∩ B ∩ C|.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <strong>A → B</strong> csak akkor hamis, ha A igaz és B hamis.
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>„Minden … ” tagadása: „Van olyan …, amely nem …” (= „Nem minden …”).</li>
 ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖ )
 ∖  ∖  ∖ }}
 ∖  ∖ >
 ∖  ∖  ∖ <TheorySection title="1. Fogalmak, tételek, módszerek" badge="Tankönyv 108–110. o." badgeColor="indigo">
 ∖  ∖  ∖  ∖ <p className="text-sm text-slate-700 leading-relaxed">
 ∖  ∖  ∖  ∖  ∖ A <strong>halmaz</strong> és a <strong>halmaz eleme</strong> alapfogalmak: nem definiáljuk őket. Egy halmazt akkor adtunk meg, ha minden dologról eldönthető, hogy eleme-e, vagy sem; egy halmaznak nincs két azonos eleme. Jelölés: A = {'{2; 3; 5; 7}'} esetén 2 ∈ A, 12 ∉ A. (D = definíció, T = tétel, M = módszer.)
 ∖  ∖  ∖  ∖ </p>
 ∖  ∖  ∖  ∖ <TheoryTable
 ∖  ∖  ∖  ∖  ∖ headers={['', 'Fogalom', 'Lényeg']}
 ∖  ∖  ∖  ∖  ∖ rows={[
 ∖  ∖  ∖  ∖  ∖  ∖ ['M', 'Halmaz megadása', 'tulajdonsággal, elemek felsorolásával, jelekkel / ábrával, halmazműveletekkel; pl. {egyjegyű prímek} = {2; 3; 5; 7} = {n ∈ ℕ | n prím és n < 10}'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Halmazok egyenlősége', 'pontosan akkor egyenlők, ha ugyanazok az elemeik'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Üres halmaz', 'nincs eleme; jele ∅ vagy { }'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Véges / végtelen halmaz', 'véges: elemszáma természetes szám; végtelen: nem véges (pl. ℤ, egy kör pontjai, a rácspontok)'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Számosság', 'véges halmaz elemeinek száma; jele |A|'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Részhalmaz, valódi részhalmaz', 'A ⊆ B: A minden eleme B-nek is eleme; A ⊂ B: ráadásul B-nek van A-n kívüli eleme'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Unió, metszet, különbség', 'A ∪ B: legalább az egyikben; A ∩ B: mindkettőben; A \\ B: A-ban, de B-ben nem'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Komplementer', 'A ⊆ H esetén Ā = H \\ A'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['T', 'Szitaformula', '|A ∪ B| = |A| + |B| − |A ∩ B| (három halmazra lásd a szabályt)'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Állítás, logikai érték', 'kijelentő mondat, amelyről eldönthető, hogy igaz vagy hamis; harmadik eset nincs'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Tagadás (negáció)', '¬A pontosan akkor igaz, ha A hamis'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'VAGY, ÉS, kizáró vagy', 'A ∨ B: legalább egyik igaz; A ∧ B: mindkettő igaz; „vagy A, vagy B”: pontosan az egyik igaz'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['D', 'Implikáció, ekvivalencia', 'A → B: csak „igaz → hamis” esetén hamis; A ↔ B: azonos logikai értékeknél igaz'],
 ∖  ∖  ∖  ∖  ∖  ∖ ['M', 'Állítás megfordítása', 'A → B megfordítása B → A; logikai értékük független egymástól']
 ∖  ∖  ∖  ∖  ∖ ]}
 ∖  ∖  ∖  ∖ />
 ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
 ∖  ∖  ∖  ∖  ∖ <SubsetSvg />
 ∖  ∖  ∖  ∖  ∖ <SetOperationsSvg />
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="2. Szitaformula" badge="Tétel" badgeColor="blue">
 ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
 ∖  ∖  ∖  ∖  ∖ <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
 ∖  ∖  ∖  ∖  ∖  ∖ <p>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ Két véges halmaz uniójának elemszámát megkapjuk, ha a számosságok összegéből kivonjuk a metszet számosságát: <strong>|A ∪ B| = |A| + |B| − |A ∩ B|</strong>. (A közös elemeket |A| + |B| kétszer számolja.)
 ∖  ∖  ∖  ∖  ∖  ∖ </p>
 ∖  ∖  ∖  ∖  ∖  ∖ <p>Három halmazra a páronkénti metszeteket levonjuk, a hármas metszetet visszaadjuk.</p>
 ∖  ∖  ∖  ∖  ∖  ∖ <TheoryCallout type="info" title="Példa (Q4. feladat)">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ 30 fős osztály, 18-nak van angol vagy német nyelvvizsgája, 3-nak mindkettő, és |A| = 2|N|. Szita: 2|N| + |N| − 3 = 18 ⇒ |N| = 7, |A| = 14; nyelvvizsga nélkül 12-en vannak.
 ∖  ∖  ∖  ∖  ∖  ∖ </TheoryCallout>
 ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖ <SieveFormulaSvg />
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="3. Kidolgozott feladat: filmek az osztályban" badge="Mintapélda" badgeColor="amber">
 ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
 ∖  ∖  ∖  ∖  ∖ <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
 ∖  ∖  ∖  ∖  ∖  ∖ <p>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ Egy osztályban 17-en látták az Avatart, 18-an a Mátrixot, 13-an a Gladiátort. Ugyanannyian vannak, akik mindhárom filmet, akik pontosan kettőt, akik pontosan egyet és akik egyet sem láttak. Hányan vannak az osztályban?
 ∖  ∖  ∖  ∖  ∖  ∖ </p>
 ∖  ∖  ∖  ∖  ∖  ∖ <ol className="list-decimal pl-5 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Legyen x azok száma, akik mindhármat látták; ekkor a „pontosan 2”, „pontosan 1” és „egyik sem” csoport is x fős.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>|A| + |M| + |G| a pontosan két filmet látókat kétszer, a mindhármat látókat háromszor számolja: 17 + 18 + 13 = x + 2x + 3x.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>48 = 6x ⇒ x = 8.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Az osztály létszáma 8 + 8 + 8 + 8 = <strong>32 fő</strong>.</li>
 ∖  ∖  ∖  ∖  ∖  ∖ </ol>
 ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖ <MovieVennSvg />
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="4. Logika: állítások és műveletek" badge="Elmélet" badgeColor="purple">
 ∖  ∖  ∖  ∖ <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
 ∖  ∖  ∖  ∖  ∖ <p>
 ∖  ∖  ∖  ∖  ∖  ∖ Állítás (kijelentés) az a kijelentő mondat, amelyről egyértelműen eldönthető, hogy igaz vagy hamis. A kérdés, a felszólítás vagy a „Szép idő van.” jellegű, el nem dönthető mondat nem állítás.
 ∖  ∖  ∖  ∖  ∖ </p>
 ∖  ∖  ∖  ∖  ∖ <TruthTablesSvg />
 ∖  ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 ∖  ∖  ∖  ∖  ∖  ∖ <TheoryCard title="Tagadás kvantorokkal" badge="A10., B10. feladat" badgeColor="rose">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-5 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>„Minden országban él kenguru.” tagadása: „Van olyan ország, amelyben nem él kenguru.” = „Nem minden országban él kenguru.”</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>NEM tagadás: „Semelyik országban sem él kenguru.” (ez túl erős állítás).</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>„A kötélen minden zokni fekete.” tagadása: „Van olyan zokni, amely nem fekete.”</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖  ∖ </TheoryCard>
 ∖  ∖  ∖  ∖  ∖  ∖ <TheoryCard title="Megfordítás" badge="B7. feladat" badgeColor="emerald">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-5 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Ha egy négyszög téglalap, akkor átlói felezik egymást – igaz; megfordítása (ha az átlók felezik egymást, akkor téglalap) hamis: a paralelogramma is ilyen.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>„Ha |a| = |b|, akkor a = b” – hamis (a = 3, b = −3); megfordítása „ha a = b, akkor |a| = |b|” – igaz.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖  ∖ </TheoryCard>
 ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="5. Megoldott feladatok a blokkból" badge="Feladatok" badgeColor="teal">
 ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 ∖  ∖  ∖  ∖  ∖ <TheoryCard title="A) Halmazműveletek elemekkel" badge="A1., B1., B2." badgeColor="sky">
 ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>A = {'{120 pozitív osztói}'}, B = {'{150 pozitív osztói}'}: A ∩ B = a 30 osztói = {'{1; 2; 3; 5; 6; 10; 15; 30}'}; A ∖ B = {'{4; 8; 12; 20; 24; 40; 60; 120}'}.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>A ∪ B = {'{1; …; 9}'}, A ∩ B = {'{1; 2; 3; 6}'}, A ∖ B = {'{4; 5}'} ⇒ A = {'{1; 2; 3; 4; 5; 6}'}, B = {'{1; 2; 3; 6; 7; 8; 9}'}.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>[2; 6] ∪ [3; 10] = [2; 10], [2; 6] ∩ [3; 10] = [3; 6].</li>
 ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖ </TheoryCard>
 ∖  ∖  ∖  ∖  ∖ <TheoryCard title="B) Számosság, végtelen halmazok" badge="A2., A3., B8." badgeColor="purple">
 ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>|A| = 10, |B| = 13: |A ∩ B| legfeljebb 10 (ha A ⊆ B), |B ∖ A| legalább 3.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>ℕ ∩ ℝ = ℕ, ℕ ∪ ℝ = ℝ, ℝ ∖ ℕ végtelen; ℕ ∖ ℝ = ∅ véges.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>ℝ ∩ ℤ = ℤ, ℤ ∩ ℕ = ℕ, ℝ ∩ ℚ = ℚ, ℝ ∖ ℚ (irracionálisak) végtelen; ℚ ∖ ℝ = ∅.</li>
 ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖ </TheoryCard>
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 ∖  ∖  ∖  ∖  ∖ <TheoryCard title="C) Úszásoktatás (P1. a)" badge="Szita" badgeColor="emerald">
 ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Senki sem jár mindhárom nap; hétfő–szerda 14, szerda–péntek 18, hétfő–péntek 8 gyerek; összesen 65, és naponta ugyanannyian (n) járnak.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>3n = 65 + (14 + 18 + 8) = 105 ⇒ n = 35.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Csak pénteken: 35 − 18 − 8 = <strong>9</strong> gyerek.</li>
 ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖ </TheoryCard>
 ∖  ∖  ∖  ∖  ∖ <TheoryCard title="D) Szita három oszthatósággal (Q1. b)" badge="Szita" badgeColor="rose">
 ∖  ∖  ∖  ∖  ∖  ∖ <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>A 100-nál kisebb pozitív egészek közül 2-vel 49, 7-tel 14, 11-gyel 9 osztható; 14-gyel 7, 22-vel 4, 77-tel 1, 154-gyel 0.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Legalább egyikkel osztható: 49 + 14 + 9 − 7 − 4 − 1 + 0 = 60.</li>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <li>Egyikkel sem: 99 − 60 = <strong>39</strong> szám.</li>
 ∖  ∖  ∖  ∖  ∖  ∖ </ul>
 ∖  ∖  ∖  ∖  ∖ </TheoryCard>
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖ <TheoryCallout type="tip" title="Logikai érték (A11., B4.)">
 ∖  ∖  ∖  ∖  ∖ A: „Van olyan halmaz, amelynek a számossága 0.” – igaz (∅). B: „Van olyan gráf, amelynek ugyanannyi éle van, mint pontja.” – igaz (háromszög). Ezért A ∧ ¬B hamis, A ∨ ¬B igaz. – „Minden deltoid tengelyesen szimmetrikus” igaz, „minden paralelogramma tengelyesen szimmetrikus” hamis, így A ∧ ¬B igaz.
 ∖  ∖  ∖  ∖ </TheoryCallout>
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="6. Tipikus hiba: rossz tagadás, rossz megfordítás" badge="Csapda" badgeColor="rose">
 ∖  ∖  ∖  ∖ <TheoryTrapBox
 ∖  ∖  ∖  ∖  ∖ title="A „minden” tagadása nem a „semelyik”"
 ∖  ∖  ∖  ∖  ∖ wrong="„Minden zokni fekete.” tagadása: „Egyik zokni sem fekete.”"
 ∖  ∖  ∖  ∖  ∖ wrongExplanation="Ha 3 fekete és 1 fehér zokni szárad, az eredeti állítás is és a „tagadás” is hamis – tehát ez nem tagadás."
 ∖  ∖  ∖  ∖  ∖ correct="Tagadás: „Van olyan zokni, amely nem fekete.” (= „Nem minden zokni fekete.”)"
 ∖  ∖  ∖  ∖  ∖ correctExplanation="A tagadás pontosan akkor igaz, amikor az eredeti hamis. Ugyanígy: egy igaz állítás megfordítása lehet hamis – külön kell megvizsgálni."
 ∖  ∖  ∖  ∖  ∖ tip="Szitánál is figyelj: |A ∪ B| ≠ |A| + |B|, ha van közös elem."
 ∖  ∖  ∖  ∖ />
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="7. Interaktív Laboratórium I: Venn-diagram és szita" badge="Labor" badgeColor="blue">
 ∖  ∖  ∖  ∖ <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
 ∖  ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
 ∖  ∖  ∖  ∖  ∖  ∖ <div className="space-y-3 text-sm">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <p className="text-xs text-slate-600">Írd be az egyes tartományok elemszámát, válassz műveletet!</p>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="grid grid-cols-2 gap-2">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {REGIONS.map((r) => (
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <label key={r.code} className="flex items-center justify-between gap-2 text-xs">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <span>{r.name}</span>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <input
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ type="number"
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ min="0"
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ value={cnt[r.code]}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ onChange={(e) => setCnt({ ...cnt, [r.code]: Math.max(0, Math.round(Number(e.target.value) || 0)) })}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ className={numIn}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ aria-label={r.name}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ />
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </label>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ ))}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="flex flex-wrap gap-1.5">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {OPS.map((o) => (
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <button
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ key={o.id}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ onClick={() => setOp(o.id)}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${op === o.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-blue-100'}`}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ >
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {o.label}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </button>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ ))}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="flex flex-wrap gap-2">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <button
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ onClick={() => setCnt({ '100': 3, '010': 2, '001': 3, '110': 6, '101': 0, '011': 2, '111': 8, '000': 8 })}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-700 hover:bg-amber-100"
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ >
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ Filmes példa (egy lehetséges eset)
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </button>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="bg-blue-50 rounded-xl border border-blue-200 p-3 text-blue-900 space-y-1">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ |{curOp.label}| = <strong>{opCount}</strong>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="text-xs">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ |A| = {s.a}, |B| = {s.b}, |C| = {s.c}; |A ∩ B| = {s.ab}, |A ∩ C| = {s.ac}, |B ∩ C| = {s.bc}, |A ∩ B ∩ C| = {s.abc}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="text-xs font-mono">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ Szita: {s.a} + {s.b} + {s.c} − {s.ab} − {s.ac} − {s.bc} + {s.abc} = <strong>{s.union}</strong> = |A ∪ B ∪ C| (közvetlenül: {s.direct}) {s.union === s.direct ? '✓' : '✗'}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="text-xs">|H| = {s.total}</div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖ <Venn n={3} shade={shaded} values={values} title={curOp.label} className="w-full max-w-md h-auto mx-auto" />
 ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖ </TheorySection>

 ∖  ∖  ∖ <TheorySection title="8. Interaktív Laboratórium II: igazságtáblázat-építő" badge="Labor" badgeColor="purple">
 ∖  ∖  ∖  ∖ <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
 ∖  ∖  ∖  ∖  ∖ <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
 ∖  ∖  ∖  ∖  ∖  ∖ <div className="space-y-4 text-sm">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="flex flex-wrap gap-3">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <button onClick={() => setA(!A)} className={`px-3 py-1.5 rounded-lg font-bold text-xs ${A ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ A: {tv(A)}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </button>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <button onClick={() => setB(!B)} className={`px-3 py-1.5 rounded-lg font-bold text-xs ${B ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ B: {tv(B)}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </button>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="flex flex-wrap gap-1.5">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {LOGIC.map((o) => (
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <button
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ key={o.id}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ onClick={() => setLop(o.id)}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${lop === o.id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-purple-100'}`}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ >
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {o.label}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </button>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ ))}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="bg-purple-50 rounded-xl border border-purple-200 p-3 text-purple-900">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="text-xs text-slate-600">{curL.read}</div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {curL.label} = <strong>{tv(curL.f(A, B))}</strong>, ha A {tv(A)} és B {tv(B)}.
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <div className="text-xs text-slate-600">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ Minden művelet az aktuális A, B mellett:{' '}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {LOGIC.map((o) => `${o.label}: ${o.f(A, B) ? 'i' : 'h'}`).join(' | ')}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖  ∖  ∖ <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <thead className="bg-slate-100">
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <tr>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <th className="p-2">A</th>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <th className="p-2">B</th>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <th className="p-2">{curL.label}</th>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </tr>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </thead>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ <tbody>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ {rows.map(([a, b]) => {
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ const on = a === A && b === B;
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ const v = curL.f(a, b);
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ return (
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <tr key={`${a}${b}`} className={on ? 'bg-purple-100 font-bold' : ''}>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <td className="p-2 text-center">{tv(a)}</td>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <td className="p-2 text-center">{tv(b)}</td>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ <td className={`p-2 text-center ${v ? 'text-emerald-700' : 'text-rose-700'}`}>{tv(v)}</td>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ </tr>
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ );
 ∖  ∖  ∖  ∖  ∖  ∖  ∖  ∖ })}
 ∖  ∖  ∖  ∖  ∖  ∖  ∖ </tbody>
 ∖  ∖  ∖  ∖  ∖  ∖ </table>
 ∖  ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖  ∖ </div>
 ∖  ∖  ∖ </TheorySection>
 ∖  ∖ </TheoryTemplate>
 ∖ );
};

export default SetsLogicSummaryTheory;
