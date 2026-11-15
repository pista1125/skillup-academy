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
  EggPackingSvg,
  DivisionChainSvg,
  BinaryToQuaternarySvg,
  BinOctHexSvg,
  BinaryAdditionSvg,
  NumberCardsSvg
} from './NumeralSystems2Figures';

const DIGITS = '0123456789ABCDEF';
const SUB: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
const sub = (b: number) => String(b).split('').map((c) => SUB[c]).join('');
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const sup = (e: number) => String(e).split('').map((c) => SUP[Number(c)]).join('');
const fmtInt = (x: number) => x.toLocaleString('hu-HU');

type DivRow = { a: number; q: number; r: number };

/** Ismételt maradékos osztás az alapszámmal. */
const divisionChain = (n: number, base: number): DivRow[] => {
  const rows: DivRow[] = [];
  let a = n;
  do {
    rows.push({ a, q: Math.floor(a / base), r: a % base });
    a = Math.floor(a / base);
  } while (a > 0);
  return rows;
};

export const NumeralSystems2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: átváltó ismételt osztással
  const [num, setNum] = useState<number>(315);
  const [base, setBase] = useState<number>(6);

  // Labor II: 12 bites kapcsolósor
  const [bits, setBits] = useState<number[]>([1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1]);

  const n = Math.max(0, Math.min(99999, Math.floor(num || 0)));
  const rows = useMemo(() => divisionChain(n, base), [n, base]);
  const result = rows.map((r) => DIGITS[r.r]).reverse().join('');
  const expansion = result
    .split('')
    .map((d, i) => {
      const e = result.length - 1 - i;
      const v = DIGITS.indexOf(d);
      return e === 0 ? `${v}` : e === 1 ? `${v} · ${base}` : `${v} · ${base}${sup(e)}`;
    })
    .join(' + ');

  const bitStr = bits.join('');
  const value = parseInt(bitStr, 2);
  const octGroups = [0, 1, 2, 3].map((g) => bitStr.slice(g * 3, g * 3 + 3));
  const hexGroups = [0, 1, 2].map((g) => bitStr.slice(g * 4, g * 4 + 4));
  const octDigits = octGroups.map((g) => parseInt(g, 2).toString(8));
  const hexDigits = hexGroups.map((g) => parseInt(g, 2).toString(16).toUpperCase());
  const color = `#${hexDigits.join('')}`;
  const toggle = (i: number) => setBits((b) => b.map((x, k) => (k === i ? 1 - x : x)));

  return (
    <TheoryTemplate
      topicId="g11-szamelmelet"
      subtopicId="szamrendszerek-2"
      title="8. Számrendszerek II."
      subtitle="Átváltás tízesből tetszőleges alapú számrendszerbe ismételt osztással, a 2-es, 4-es, 8-as és 16-os rendszerek közötti gyors átváltás csoportosítással, és összeadás kettes számrendszerben."
      badge="11. OSZTÁLY • IV. SZÁMELMÉLET • TANANYAG"
      themeColor="emerald"
      pdfFilename="11_osztaly_szamrendszerek_2_tananyag.pdf"
      practiceTitle="Készen állsz a számrendszerek közötti átváltásokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — ÁTVÁLTÁS ISMÉTELT OSZTÁSSAL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              315 : 6 = 52 m. 3 → 52 : 6 = 8 m. 4 → 8 : 6 = 1 m. 2 → 1 : 6 = 0 m. 1 ⇒ 315 = 1243₆
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A számot (majd mindig a hányadost) maradékosan osztjuk az alapszámmal, amíg a hányados 0 nem lesz; a <strong>maradékokat alulról felfelé</strong> olvassuk.</li>
              <li>2 → 4: <strong>kettes</strong>, 2 → 8: <strong>hármas</strong>, 2 → 16: <strong>négyes</strong> csoportokba osztjuk a biteket, mindig <strong>jobbról</strong> kezdve.</li>
              <li>A 16-os rendszer számjegyei: 0–9 és A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: írjuk fel a 315-öt 6-os számrendszerben!" badge="Tankönyv 146. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Képzeljük el, hogy 315 tojást hatosával csomagolunk: 6 tojás kerül egy <strong>tojástartóba</strong>, 6 teli tojástartó egy <strong>dobozba</strong>, 6 teli doboz egy <strong>raklapra</strong>. Egy dobozban 6² = 36, egy raklapon 6³ = 216 tojás van.
            </p>
            <p className="font-semibold text-emerald-800">Első módszer – maradékos osztások:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>315 = 52 · 6 + 3: 52 teli tojástartó, kimarad <strong>3</strong> tojás.</li>
              <li>52 = 8 · 6 + 4: 8 doboz telik meg, kimarad <strong>4</strong> tojástartó.</li>
              <li>8 = 1 · 6 + 2: <strong>1</strong> raklap lesz, kimarad <strong>2</strong> doboz.</li>
            </ul>
            <p className="font-semibold text-emerald-800">Második módszer – a legnagyobb helyi értékkel kezdünk:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 raklap: 315 − 216 = 99 tojás marad.</li>
              <li>99 = 2 · 36 + 27: 2 doboz, marad 27.</li>
              <li>27 = 4 · 6 + 3: 4 tojástartó, marad 3 tojás.</li>
            </ul>
            <p className="font-bold text-emerald-800">315 = 1 · 6³ + 2 · 6² + 4 · 6 + 3 = 1243₆</p>
          </div>
          <EggPackingSvg />
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DivisionChainSvg />
          <TheoryCallout type="info" title="Miért alulról felfelé?">
            Az első osztás maradéka az <strong>egyesek</strong> száma (a kimaradt tojások), a második maradék a 6-osoké, a harmadik a 36-osoké… Az utolsó osztásnál kapott maradék áll a legnagyobb helyi értéken, ezért ez lesz a szám <strong>első</strong> jegye.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 2. 12-es és 16-os rendszer */}
      <TheorySection title="2. 10-nél nagyobb alapszám: új számjegyek" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TheoryCard title="Tizenkettes számrendszer (3. feladat)" badge="12-es" badgeColor="teal">
            <p className="text-sm text-slate-700">
              12 számjegy kell: 0–9, valamint <strong>A = 10</strong> és <strong>B = 11</strong>. Helyi értékek: 1, 12, 144, 1728.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>ABA₁₂ = 10 · 144 + 11 · 12 + 10 = 1582</li>
              <li>BAB₁₂ = 11 · 144 + 10 · 12 + 11 = 1715</li>
              <li>420 = 2 · 144 + 11 · 12 + 0 = 2B0₁₂</li>
              <li>1000₁₂ − 111₁₂ = 1728 − 157 = 1571 ≠ BAB₁₂ (a 3. c) állítás hamis)</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tizenhatos (hexadecimális) számrendszer" badge="16-os" badgeColor="purple">
            <p className="text-sm text-slate-700">
              16 számjegy: 0–9 és A, B, C, D, E, F (10–15). Helyi értékek: 1, 16, 256, 4096. A programozók kedvelt rendszere, mert egy 16-os jegy pontosan 4 bitnek felel meg.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li>legkisebb kétjegyű: 10₁₆ = 16; legnagyobb kétjegyű: FF₁₆ = 255</li>
              <li>legnagyobb háromjegyű: FFF₁₆ = 4095</li>
              <li>kétjegyű számok száma: 15 · 16 = 240; háromjegyűeké: 15 · 16² = 3840</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Feladat', 'Számolás', 'Eredmény']}
          rows={[
            ['1011101111₂ tízesben', '512 + 128 + 64 + 32 + 8 + 4 + 2 + 1', '751'],
            ['491 kettesben', 'ismételt osztás 2-vel', '111101011₂'],
            ['542 hatosban, hetesben, nyolcasban', 'ismételt osztás 6-tal, 7-tel, 8-cal', '2302₆; 1403₇; 1036₈'],
            ['768 négyesben, hetesben, kilencesben (HF 1.)', 'ismételt osztás', '30000₄; 2145₇; 1043₉'],
            ['31 _ _₄ négyjegyű szám (4. feladat)', '3 · 64 + 1 · 16 = 208 és 3133₄ = 223 között', '208, 209, …, 223']
          ]}
        />
      </TheorySection>

      {/* 3. Csoportosítás */}
      <TheorySection title="3. Ráadás: gyors átváltás a 2-es, 4-es, 8-as és 16-os rendszer között" badge="Tankönyv 148. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Mivel 4 = 2², minden <strong>négyes</strong> számjegy pontosan <strong>két</strong> kettes jegynek felel meg (00 → 0, 01 → 1, 10 → 2, 11 → 3). A kettes számrendszerben felírt szám jegyeit <strong>jobbról</strong> indulva kettes csoportokba osztjuk, és minden csoportot a neki megfelelő négyes jeggyel helyettesítünk.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1011₂ = 10 | 11 → 23₄</li>
              <li>110000111₂ = 1 | 10 | 00 | 01 | 11 → 12013₄</li>
              <li>Visszafelé: 12₄ → 01 | 10 → 110₂; 3012₄ → 11 | 00 | 01 | 10 → 11000110₂ (a kezdő 0-t nem írjuk ki).</li>
            </ul>
            <p>
              8 = 2³ miatt a <strong>nyolcas</strong> rendszerhez <strong>hármas</strong>, 16 = 2⁴ miatt a <strong>tizenhatoshoz négyes</strong> csoportok kellenek.
            </p>
          </div>
          <BinaryToQuaternarySvg />
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BinOctHexSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>1110111100010101₂ = 167425₈ = EF15₁₆.</p>
            <p>
              Visszafelé is működik: 7AD₁₆ → 0111 | 1010 | 1101 → 11110101101₂ (A = 10 = 1010₂, D = 13 = 1101₂; a kezdő nullát nem írjuk le).
            </p>
            <TheoryCallout type="tip" title="Színkódok">
              A weboldalak színeit 16-os számokkal adják meg: #RRGGBB, ahol RR, GG, BB a vörös, zöld és kék összetevő 00 (0) és FF (255) között. Egy-egy hexadecimális jegy 4 bit, ezért egy szín 24 biten tárolható.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Összeadás kettesben */}
      <TheorySection title="4. Hogyan ad össze a számítógép?" badge="Tankönyv 148–149. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A gép ugyanúgy ad össze, mint mi papíron a tízes rendszerben, csak két számjeggyel: 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = <strong>10₂</strong> – ez az adott helyi értéken 0-t, az eggyel nagyobbon +1-et jelent (mint a 10 a tízes rendszerben).
            </p>
            <p>1101100₂ + 101010₂ = 10010110₂, ami a tízes rendszerbeli 108 + 42 = 150 műveletnek felel meg.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>HF 2. a)</strong> 10001₂ + 10010₂ = 100011₂: 17 + 18 = 35 – jól számolt a gép.</li>
              <li><strong>HF 2. b)</strong> 101010₂ + 100111₂ = 1010001₂: 42 + 39 = 81 – ez is helyes.</li>
              <li><strong>HF 5.</strong> 4#20₅ · 30₅ = 224#00₅: a # helyén 1 áll (4120₅ · 30₅ = 224100₅).</li>
            </ul>
          </div>
          <BinaryAdditionSvg />
        </div>
      </TheorySection>

      {/* 5. Tankönyvi feladatok */}
      <TheorySection title="5. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Peti kártyatrükkje (5. feladat)" badge="Feladat" badgeColor="rose">
            <NumberCardsSvg className="w-full h-auto mb-3" />
            <p className="text-sm text-slate-700">
              Minden 31-nél nem nagyobb szám legfeljebb ötjegyű kettes számrendszerben. Az A kártyán azok vannak, amelyekben az 1-es helyi értéken 1 áll, a B-n a 2-esen, a C-n a 4-esen, az E-n a 8-ason, a D-n a 16-oson. Peti összeadja a megnevezett kártyák első számát: pl. A, C, E → 1 + 4 + 8 = <strong>13</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="B) Melyik számrendszerben?" badge="HF 3. és 6–7. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>77 népmese = 140 népmese?</strong> b² + 4b = 77 ⇒ b = 7: igen, 7-es számrendszerben 140₇ = 77.</li>
              <li><strong>„A 145 kiskutya”:</strong> b² + 4b + 5 = 101 ⇒ b = 8, tehát 8-as számrendszerben (101 kiskutya).</li>
              <li><strong>1001 éjszaka</strong> kettesben: 1001₂ = 9 éjszaka.</li>
              <li><strong>12ₓ + 112ₓ + 1112ₓ = 1241ₓ</strong> csak x = 5 esetén igaz (a 4-es jegy miatt x ≥ 5).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Párosság más számrendszerben (3. feladat)" badge="Oszthatóság" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li><strong>Páros alapszámnál</strong> (2, 4, 6, 16…) az utolsó jegy dönt: 10110₂ páros, 4531₆ páratlan.</li>
              <li><strong>Páratlan alapszámnál</strong> (3, 5, 7…) minden helyi érték páratlan, ezért a <strong>számjegyek összege</strong> dönt: 4324₅ (összeg 13) páratlan, 20121₃ (összeg 6) páros.</li>
              <li>6. feladat: az ötös rendszerben a különböző jegyű ötjegyű számok száma 4 · 4! = 96, jegyeik összege mindig 0 + 1 + 2 + 3 + 4 = 10, így <strong>mind a 100%</strong> páros.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Utolsó jegy és maradék (4., 8., 9. feladat)" badge="Nehezebb" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>7-es, 8-as és 9-es rendszerben is 5-re végződik: n − 5 osztható 7-tel, 8-cal és 9-cel, azaz 504-gyel ⇒ <strong>509</strong>, a következő 1013.</li>
              <li>a0b₅ = b0a₇: 25a + b = 49b + a ⇒ a = 2b ⇒ 51 és 102, tehát <strong>2</strong> ilyen szám van.</li>
              <li>m = n (10ₙ), p = q³ − 1 (a legnagyobb háromjegyű); n · (q³ − 1) = 130 ⇒ q = 3, n = 5 ⇒ n · q = <strong>15</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: rossz irányból csoportosítunk" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="110000111₂ négyes számrendszerben"
          wrong="11 | 00 | 00 | 11 | 1 → 30031₄"
          wrongExplanation="Balról kezdtük a csoportosítást, így az utolsó csoportban csak egy bit maradt, és minden jegy rossz helyi értékre került. (Hasonló hiba az ismételt osztásnál a maradékokat felülről lefelé olvasni: 315 → 3421₆.)"
          correct="1 | 10 | 00 | 01 | 11 → 12013₄"
          correctExplanation="A csoportokat mindig jobbról, az egyesek helyétől kezdjük, mert ott vannak a legkisebb helyi értékek. Ha bal oldalon hiányos csoport marad, azt kezdő nullákkal kell kiegészíteni (1 = 01)."
          tip="Ellenőrzés: 110000111₂ = 256 + 128 + 4 + 2 + 1 = 391, és 12013₄ = 256 + 128 + 0 + 4 + 3 = 391."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Átváltás ismételt osztással" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">tízes számrendszerbeli szám (0–99 999)</label>
              <input
                type="number"
                min={0}
                max={99999}
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-emerald-300 font-mono"
                aria-label="átváltandó szám"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">alapszám: {base}</label>
              <input type="range" min="2" max="16" value={base} onChange={(e) => setBase(Number(e.target.value))} className="w-full accent-emerald-600" aria-label="alapszám" />
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { n: 315, b: 6 },
                  { n: 491, b: 2 },
                  { n: 542, b: 8 },
                  { n: 420, b: 12 },
                  { n: 768, b: 9 }
                ].map((p) => (
                  <button
                    key={`${p.n}-${p.b}`}
                    onClick={() => {
                      setNum(p.n);
                      setBase(p.b);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                  >
                    {p.n} → {p.b}-es
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-emerald-50 text-emerald-900">
                <tr>
                  <th className="p-2 text-left">Osztás</th>
                  <th className="p-2 text-right">Hányados</th>
                  <th className="p-2 text-right">Maradék</th>
                  <th className="p-2 text-right">Számjegy</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-slate-200">
                    <td className="p-2 font-mono">{fmtInt(r.a)} : {base}</td>
                    <td className="p-2 text-right font-mono">{fmtInt(r.q)}</td>
                    <td className="p-2 text-right font-mono">{r.r}</td>
                    <td className="p-2 text-right font-black text-emerald-800">{DIGITS[r.r]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 text-sm text-emerald-900 space-y-1">
            <div>A maradékok alulról felfelé olvasva: <strong className="font-mono text-lg">{n} = {result}{sub(base)}</strong></div>
            <div className="text-xs text-emerald-800 font-mono break-words">Ellenőrzés: {expansion} = {n}</div>
            {base > 10 && <div className="text-xs">A 9-nél nagyobb jegyek: A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.</div>}
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Bitek csoportosítása és színkódok" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">Kattints a bitekre! A 12 bitet hármasával nyolcas, négyesével tizenhatos jegyekre bontjuk.</p>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {bits.map((b, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                aria-label={`${i + 1}. bit`}
                className={`w-9 h-11 rounded-lg font-mono text-lg font-black border-2 ${b ? 'bg-purple-600 text-white border-purple-700' : 'bg-white text-slate-500 border-slate-300'} ${i % 4 === 0 && i > 0 ? 'ml-2' : ''}`}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
              <div className="text-xs font-semibold text-amber-800 mb-1">8-as (hármas csoportok)</div>
              <div className="font-mono">{octGroups.join(' | ')}</div>
              <div className="font-mono font-black text-amber-900 text-lg">{octDigits.join('')}₈</div>
            </div>
            <div className="rounded-xl border border-purple-200 bg-purple-50 p-3">
              <div className="text-xs font-semibold text-purple-800 mb-1">16-os (négyes csoportok)</div>
              <div className="font-mono">{hexGroups.join(' | ')}</div>
              <div className="font-mono font-black text-purple-900 text-lg">{hexDigits.join('')}₁₆</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-xs font-semibold text-slate-700 mb-1">tízes számrendszerben</div>
              <div className="font-mono font-black text-slate-900 text-lg">{fmtInt(value)}</div>
              <div className="text-xs text-slate-500">legfeljebb 2¹² − 1 = 4095 = FFF₁₆</div>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-3">
            <div className="w-16 h-16 rounded-xl border border-slate-300" style={{ backgroundColor: color }} aria-label="színminta" />
            <div className="text-sm text-slate-700">
              A három hexadecimális jegy egy rövid színkód: <strong className="font-mono">{color}</strong> (vörös = {hexDigits[0]}, zöld = {hexDigits[1]}, kék = {hexDigits[2]}; mindegyik 0 és F között).
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setBits([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-800 hover:bg-red-200">vörös: F00</button>
            <button onClick={() => setBits([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-800 hover:bg-green-200">zöld: 0F0</button>
            <button onClick={() => setBits([0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1])} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200">tankönyv: 7AD</button>
            <button onClick={() => setBits(Array(12).fill(1))} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200">mind 1: FFF</button>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default NumeralSystems2Theory;
