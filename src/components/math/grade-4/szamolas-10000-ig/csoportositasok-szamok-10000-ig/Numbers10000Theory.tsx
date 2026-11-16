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
  GemGroupingSvg,
  FabatkaExchangeSvg,
  PlaceValueTableSvg,
  AbacusSvg,
  NumberLine10000Svg,
  HundredsGridSvg,
  PV_COLORS
} from './Numbers10000Figures';

// ---------------------------------------------------------------------------
// Számok betűvel (0–10 000) a tankönyv helyesírási szabálya szerint
// ---------------------------------------------------------------------------
const ONES = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
const ONES_PREFIX = ['', 'egy', 'két', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
const TENS_ROUND = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
const TENS_PREFIX = ['', 'tizen', 'huszon', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];

const below100 = (n: number) => {
  const t = Math.floor(n / 10);
  const o = n % 10;
  if (o === 0) return TENS_ROUND[t];
  return TENS_PREFIX[t] + ONES[o];
};

const below1000 = (n: number) => {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const hPart = h === 0 ? '' : (h === 1 ? '' : ONES_PREFIX[h]) + 'száz';
  return hPart + below100(rest);
};

export const numberToWords = (n: number): string => {
  if (n === 0) return 'nulla';
  if (n === 10000) return 'tízezer';
  const th = Math.floor(n / 1000);
  const rest = n % 1000;
  if (th === 0) return below1000(rest);
  const thPart = (th === 1 ? '' : ONES_PREFIX[th]) + 'ezer';
  if (rest === 0) return thPart;
  // 2000-ig egybeírjuk, fölötte kötőjel az ezresek után
  return n <= 2000 ? thPart + below1000(rest) : thPart + '-' + below1000(rest);
};

const fmt = (n: number) => (n >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n));

type Slot = 'T' | 'E' | 'sz' | 't' | 'e';
const SLOT_ORDER: Slot[] = ['T', 'E', 'sz', 't', 'e'];
const SLOT_NAME: Record<Slot, string> = { T: 'tízezres', E: 'ezres', sz: 'százas', t: 'tízes', e: 'egyes' };
const SLOT_VALUE: Record<Slot, number> = { T: 10000, E: 1000, sz: 100, t: 10, e: 1 };
const NEXT: Partial<Record<Slot, Slot>> = { e: 't', t: 'sz', sz: 'E', E: 'T' };

const PRESETS: { label: string; v: Record<Slot, number> }[] = [
  { label: '11 százas, 25 tízes, 36 egyes', v: { T: 0, E: 0, sz: 11, t: 25, e: 36 } },
  { label: '9 százas, 32 tízes, 14 egyes', v: { T: 0, E: 0, sz: 9, t: 32, e: 14 } },
  { label: '13 százas, 17 tízes, 29 egyes', v: { T: 0, E: 0, sz: 13, t: 17, e: 29 } }
];

const TARGETS = [5472, 7045, 3707, 2001, 8714, 6030, 9999, 1909, 4390, 5700];

export const Numbers10000Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: tökéletes pénztárgép
  const [till, setTill] = useState<Record<Slot, number>>(PRESETS[0].v);
  const tillTotal = SLOT_ORDER.reduce((s, k) => s + till[k] * SLOT_VALUE[k], 0);
  const tillDone = SLOT_ORDER.every((k) => till[k] <= 9);
  const exchange = (k: Slot) => {
    const nx = NEXT[k];
    if (!nx || till[k] < 10) return;
    setTill({ ...till, [k]: till[k] - 10, [nx]: till[nx] + 1 });
  };
  const addCoin = (k: Slot, d: number) => {
    const v = Math.max(0, Math.min(40, till[k] + d));
    setTill({ ...till, [k]: v });
  };

  // Labor II: helyiérték-építő
  const [digits, setDigits] = useState<number[]>([2, 0, 0, 1]);
  const [targetIdx, setTargetIdx] = useState<number>(0);
  const [checked, setChecked] = useState<null | boolean>(null);
  const built = digits[0] * 1000 + digits[1] * 100 + digits[2] * 10 + digits[3];
  const target = TARGETS[targetIdx];
  const changeDigit = (i: number, d: number) => {
    const next = [...digits];
    next[i] = (next[i] + d + 10) % 10;
    setDigits(next);
    setChecked(null);
  };
  const pvKeys: Slot[] = ['E', 'sz', 't', 'e'];
  const parts = pvKeys
    .map((k, i) => digits[i] * SLOT_VALUE[k])
    .filter((v) => v > 0);
  const lineX = 20 + (built / 10000) * 400;

  return (
    <TheoryTemplate
      topicId="g4-count-10k"
      subtopicId="csoportositasok-szamok-10000-ig"
      grade={4}
      chapterId="szamolas-10000-ig"
      title="9. Csoportosítások, számok 10 000-ig"
      subtitle="Csomagoljunk drágaköveket, váltsunk be fabatkákat, és ismerjük meg a négyjegyű számokat egészen 10 000-ig!"
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="4_osztaly_csoportositasok_szamok_10000_ig_tananyag.pdf"
      practiceTitle="Készen állsz a 10 000-es számkörre?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÍZESÉVEL VÁLTUNK BE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              10 egyes = 1 tízes • 10 tízes = 1 százas • 10 százas = 1 ezres • 10 ezres = 1 tízezres
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Egy helyen (rekeszben) legfeljebb <strong>9</strong> lehet. Ha 10 összegyűlik, beváltjuk eggyel nagyobbra.</li>
              <li>A számjegy <strong>alaki értéke</strong> maga a jegy, <strong>valódi értéke</strong> attól függ, melyik helyen áll.</li>
              <li>Példa: 4213 = 4000 + 200 + 10 + 3.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 33–35. o." badgeColor="emerald">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Eddig 1000-ig számoltál. Most tovább megyünk: <strong>10 000-ig</strong>! Megtanulod, hogyan épülnek fel a <strong>négyjegyű számok</strong>, hogyan írjuk le őket számjeggyel és betűvel, és hol vannak a számegyenesen.
          </p>
          <p>
            Mennyi az a 10 000? Kb. ennyi bab van 5 csomag babban, és kb. 10 000 lépéssel egy jó hosszú sétát teszel. Ha 100 babszemből egy kupacot raksz, akkor <strong>10 kupac = 1000</strong> szem, <strong>100 kupac = 10 000</strong> szem.
          </p>
        </div>
      </TheorySection>

      {/* 2. Csoportosítások */}
      <TheorySection title="2. Csoportosítások: csomagoljunk!" badge="Tankönyv 34. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A koboldok a zafírokat <strong>hármasával</strong> csomagolják: 3 zafír egy zacskóba, 3 zacskó egy dobozba, 3 doboz egy zsákba. A végén <strong>leltárt</strong> készítenek: hány zsák, doboz, zacskó és szabad zafír van.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 zacskó = 3 zafír</li>
              <li>1 doboz = 3 · 3 = 9 zafír</li>
              <li>1 zsák = 3 · 9 = 27 zafír</li>
            </ul>
            <p>
              A leltár <strong>1 | 0 | 1 | 2</strong> jelentése: 27 + 0 + 3 + 2 = <strong>32 zafír</strong>.
            </p>
          </div>
          <GemGroupingSvg />
        </div>
        <TheoryCard title="Nézzük meg együtt! 25 zafír hármasával" badge="1. b) feladat" badgeColor="amber">
          <ol className="list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>Zsákba 27 kell, de csak 25 van, ezért <strong>0 zsák</strong>.</li>
            <li>Dobozba 9 megy: 25-ben a 9 kétszer van meg (18), marad 7. Tehát <strong>2 doboz</strong>.</li>
            <li>A maradék 7-ből zacskó (3) kétszer telik (6), marad 1. Tehát <strong>2 zacskó</strong> és <strong>1 zafír</strong>.</li>
            <li>Leltár: <strong>0 | 2 | 2 | 1</strong>. Ellenőrzés: 18 + 6 + 1 = 25. ✓</li>
          </ol>
        </TheoryCard>
        <TheoryCallout type="info" title="Négyesével és kettesével is lehet">
          A rubinokat négyesével csomagolják: 1 doboz = 4 · 4 = 16 rubin, 1 zacskó = 4 rubin. A 2 | 1 | 3 leltár: 32 + 4 + 3 = 39 rubin. A mi számaink is így épülnek fel, csak ott <strong>tízesével</strong> csoportosítunk!
        </TheoryCallout>
      </TheorySection>

      {/* 3. Beváltás */}
      <TheorySection title="3. Beváltás tízesével: a fabatkák" badge="Tankönyv 36. o." badgeColor="teal">
        <FabatkaExchangeSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTable
            headers={['Szám', 'Így mondjuk']}
            rows={[
              ['1000', 'ezer'],
              ['2000', 'kétezer'],
              ['3000', 'háromezer'],
              ['4000', 'négyezer'],
              ['5000', 'ötezer']
            ]}
          />
          <TheoryTable
            headers={['Szám', 'Így mondjuk']}
            rows={[
              ['6000', 'hatezer'],
              ['7000', 'hétezer'],
              ['8000', 'nyolcezer'],
              ['9000', 'kilencezer'],
              ['10 000', 'tízezer']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. Helyiérték */}
      <TheorySection title="4. Helyi érték, alaki érték, valódi érték" badge="Tankönyv 40. o." badgeColor="orange">
        <PlaceValueTableSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Helyi érték" badge="Hol áll?" badgeColor="purple">
            <p className="text-sm text-slate-700">A számjegy <strong>helye</strong>: egyes (e), tízes (t), százas (sz), ezres (E), tízezres (T).</p>
          </TheoryCard>
          <TheoryCard title="Alaki érték" badge="Melyik jegy?" badgeColor="emerald">
            <p className="text-sm text-slate-700">Maga a <strong>számjegy</strong>. A 4213-ban a 2 alaki értéke 2.</p>
          </TheoryCard>
          <TheoryCard title="Valódi érték" badge="Mennyit ér?" badgeColor="rose">
            <p className="text-sm text-slate-700">Amennyit a jegy a helyén <strong>ér</strong>. A 4213-ban a 2 valódi értéke 200.</p>
          </TheoryCard>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <AbacusSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A <strong>golyós számolón</strong> a zöld golyó 1000-et, a piros 100-at, a kék 10-et, a sárga 1-et ér. 3 zöld, 1 piros, 3 kék és 0 sárga golyó: <strong>3130</strong>.
            </p>
            <p>
              Ha egy helyen nincs semmi, oda <strong>0</strong>-t írunk. Ezért lesz a 7 ezres, 4 tízes és 5 egyes: <strong>7045</strong> (a százasok helyén 0).
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 5. Betűvel */}
      <TheorySection title="5. Számok írása betűvel" badge="Tankönyv 36. o." badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="2000-ig egybeírjuk" badge="1. szabály" badgeColor="sky">
            <p className="text-sm text-slate-700">ezernyolcszázöt (1805), ezerkilencszázkilenc (1909), kétezer (2000)</p>
          </TheoryCard>
          <TheoryCard title="Kerek ezresek egyben" badge="2. szabály" badgeColor="emerald">
            <p className="text-sm text-slate-700">ötezer (5000), nyolcezer (8000), tízezer (10 000)</p>
          </TheoryCard>
          <TheoryCard title="2000 fölött kötőjel" badge="3. szabály" badgeColor="rose">
            <p className="text-sm text-slate-700">Ha az ezresek után még folytatódik: kétezer-egy (2001), ötezer-tíz (5010), nyolcezer-hétszáztizennégy (8714)</p>
          </TheoryCard>
        </div>
        <TheoryCallout type="tip" title="Kivétel: az évszámok">
          Az évszámokat egybeírjuk: „kétezerhuszonkettő júliusában”.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Számegyenes, számtábla */}
      <TheorySection title="6. Számegyenes és számtábla" badge="Tankönyv 37–38. o." badgeColor="indigo">
        <NumberLine10000Svg />
        <HundredsGridSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A számtáblában jobbra lépve <strong>100-zal nő</strong> a szám, lefelé lépve <strong>1000-rel</strong>. Ki tudod találni, mi van a sárga mezőkön? (3600, 4400, 5800)
        </p>
      </TheorySection>

      {/* 7. Nézzük meg együtt */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TheoryCard title="A) 52 százas, 25 tízes, 18 egyes" badge="15. c) feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>52 százas = 5200</li>
              <li>25 tízes = 250</li>
              <li>18 egyes = 18</li>
              <li>Együtt: 5200 + 250 + 18 = <strong>5468</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) A pénztárgép beváltása" badge="12. a) feladat" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>11 százas, 25 tízes, 36 egyes</li>
              <li>36 egyes → 3 tízes és 6 egyes</li>
              <li>25 + 3 = 28 tízes → 2 százas és 8 tízes</li>
              <li>11 + 2 = 13 százas → 1 ezres és 3 százas</li>
              <li>Leltár: 1 | 3 | 8 | 6 = <strong>1386</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Gondoltam egy számra" badge="22. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Ezres: legnagyobb egyjegyű páros → 8</li>
              <li>Egyes: legnagyobb egyjegyű páratlan → 9</li>
              <li>Tízes: a 8 negyede → 2</li>
              <li>Százas: a 9 harmada → 3</li>
              <li>A szám: <strong>8329</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8. Vigyázz! */}
      <TheorySection title="8. Vigyázz! A hiányzó helyre 0 kerül" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="7 ezres, 4 tízes és 5 egyes"
          wrong="745"
          wrongExplanation="Ez csak 7 százas, 4 tízes és 5 egyes lenne! Kimaradt a százasok helye."
          correct="7045"
          correctExplanation="Írd be a számokat a helyiérték-táblázatba: E = 7, sz = 0, t = 4, e = 5."
          tip="Betűvel is figyelj: kétezer-egy (kötőjellel), de ezernyolcszázöt (egybe)."
        />
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Labor I: A tökéletes pénztárgép" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Egy rekeszben legfeljebb 9 érme lehet. Ha több van, nyomd meg a <strong>„Válts be!”</strong> gombot: 10 érméért 1 nagyobbat kapsz a szomszéd rekeszbe.
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => setTill(p.v)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-teal-100 text-teal-800 hover:bg-teal-200 min-h-[44px]"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {SLOT_ORDER.map((k) => {
              const col = PV_COLORS[k];
              const over = till[k] > 9;
              return (
                <div key={k} className="rounded-xl border-2 p-2 text-center flex flex-col gap-2" style={{ borderColor: col.stroke, background: col.fill }}>
                  <div className="text-[11px] font-bold" style={{ color: col.text }}>{SLOT_NAME[k]}</div>
                  <div className={`text-2xl font-black ${over ? 'text-red-600' : ''}`} style={over ? undefined : { color: col.text }}>
                    {till[k]}
                  </div>
                  <div className="flex justify-center gap-1">
                    <button aria-label={`${SLOT_NAME[k]} mínusz`} onClick={() => addCoin(k, -1)} className="w-9 h-9 rounded-lg bg-white/80 font-black">−</button>
                    <button aria-label={`${SLOT_NAME[k]} plusz`} onClick={() => addCoin(k, 1)} className="w-9 h-9 rounded-lg bg-white/80 font-black">+</button>
                  </div>
                  {NEXT[k] && (
                    <button
                      onClick={() => exchange(k)}
                      disabled={!over}
                      className={`rounded-lg text-[11px] font-bold py-2 ${over ? 'bg-red-500 text-white animate-pulse' : 'bg-white/50 text-slate-400'}`}
                    >
                      Válts be!
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className={`rounded-xl p-3 text-center font-bold ${tillDone ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
            {tillDone
              ? `Kész! Leltár: ${SLOT_ORDER.filter((k) => k !== 'T' || till.T > 0).map((k) => till[k]).join(' | ')} → ${fmt(tillTotal)} fabatka`
              : `Összesen ${fmt(tillTotal)} fabatka – de még van olyan rekesz, ahol 9-nél több az érme!`}
          </div>
          <p className="text-xs text-slate-500 italic">Figyeld meg: a beváltástól az összeg nem változik, csak kevesebb érme lesz!</p>
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Labor II: Számépítő" badge="Labor" badgeColor="indigo">
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center gap-3 justify-between bg-indigo-50 rounded-xl p-3">
            <div className="text-sm text-indigo-900">
              Építsd meg ezt a számot: <strong className="text-base">{numberToWords(target)}</strong>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChecked(built === target)}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold min-h-[44px]"
              >
                Ellenőrzés
              </button>
              <button
                onClick={() => {
                  setTargetIdx((targetIdx + 1) % TARGETS.length);
                  setChecked(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-sm font-bold min-h-[44px]"
              >
                Új szám
              </button>
            </div>
          </div>
          {checked !== null && (
            <div className={`rounded-xl p-2 text-center text-sm font-bold ${checked ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {checked ? 'Ügyes vagy! Pontosan ez a szám.' : `Még nem jó. Te most ezt építetted: ${built}. Nézd meg a helyeket!`}
            </div>
          )}
          <div className="grid grid-cols-4 gap-2">
            {pvKeys.map((k, i) => {
              const col = PV_COLORS[k];
              return (
                <div key={k} className="rounded-xl border-2 p-2 text-center" style={{ borderColor: col.stroke, background: col.fill }}>
                  <div className="text-xs font-bold" style={{ color: col.text }}>{SLOT_NAME[k]} ({k})</div>
                  <button aria-label={`${SLOT_NAME[k]} fel`} onClick={() => changeDigit(i, 1)} className="w-full h-10 rounded-lg bg-white/80 font-black text-lg mt-1">▲</button>
                  <div className="text-3xl font-black my-1" style={{ color: col.text }}>{digits[i]}</div>
                  <button aria-label={`${SLOT_NAME[k]} le`} onClick={() => changeDigit(i, -1)} className="w-full h-10 rounded-lg bg-white/80 font-black text-lg">▼</button>
                  <div className="text-[11px] mt-1 text-slate-600">valódi érték: {digits[i] * SLOT_VALUE[k]}</div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs text-slate-500">Számjeggyel</div>
              <div className="text-2xl font-black text-slate-800">{built}</div>
              <div className="text-xs text-slate-500 mt-1">Bontás</div>
              <div className="font-mono text-slate-700">{parts.length ? `${built} = ${parts.join(' + ')}` : '0'}</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
              <div className="text-xs text-slate-500">Betűvel</div>
              <div className="text-lg font-bold text-indigo-800 break-words">{numberToWords(built)}</div>
            </div>
          </div>
          <svg viewBox="0 0 440 60" className="w-full h-auto">
            <line x1="20" y1="35" x2="425" y2="35" stroke="#4338ca" strokeWidth="2" />
            {Array.from({ length: 11 }, (_, i) => (
              <g key={i}>
                <line x1={20 + i * 40} y1="28" x2={20 + i * 40} y2="42" stroke="#4338ca" strokeWidth="1.5" />
                <text x={20 + i * 40} y="55" textAnchor="middle" fontSize="9" fill="#312e81">{i === 10 ? '10 000' : i * 1000}</text>
              </g>
            ))}
            <path d={`M ${lineX} 30 l -6 -12 l 12 0 z`} fill="#dc2626" />
            <text x={lineX} y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">{built}</text>
          </svg>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Numbers10000Theory;
