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
  TenHundredsSvg,
  ThousandStepSvg,
  Blocks685Svg,
  PlaceValueTableSvg,
  NumberLine1000Svg,
  Pay1000Svg
} from './Numbers1000G3Figures';
import {
  FONT,
  Blocks,
  blocksWidth,
  blocksHeight,
  splitNum,
  makeBuildTarget,
  makeCardTask,
  cardAnswer,
  CARD_TASK_TEXT,
  CardTask,
  art,
  Art
} from './Numbers1000G3Parts';

export const Numbers1000G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I: Rakd ki! ----
  const [target, setTarget] = useState<number>(746);
  const [cnt, setCnt] = useState<{ h: number; t: number; e: number }>({ h: 0, t: 0, e: 0 });
  const [buildMsg, setBuildMsg] = useState<{ ok: boolean; lines: string[] } | null>(null);
  const value = cnt.h * 100 + cnt.t * 10 + cnt.e;
  const change = (k: 'h' | 't' | 'e', d: number) => {
    const max = k === 'h' ? 10 : 19;
    setCnt((c) => ({ ...c, [k]: Math.max(0, Math.min(max, c[k] + d)) }));
    setBuildMsg(null);
  };
  const newBuild = () => {
    setTarget(makeBuildTarget(target));
    setCnt({ h: 0, t: 0, e: 0 });
    setBuildMsg(null);
  };
  const checkBuild = () => {
    if (value === target) {
      const lines = [`Ügyes vagy! Ez pontosan ${target}.`];
      if (cnt.t >= 10 || cnt.e >= 10) lines.push('Be is válthatod: 10 kocka = 1 rúd, 10 rúd = 1 lap.');
      if (target === 1000) lines.push('10 lap = 1 ezres. Ez az ezer!');
      setBuildMsg({ ok: true, lines });
      return;
    }
    const g = splitNum(target);
    const lines: string[] = [];
    const say = (have: number, need: number, name: string) => {
      if (have < need) lines.push(`${name}: kevés. Tegyél még hozzá!`);
      if (have > need) lines.push(`${name}: túl sok. Vegyél el belőle!`);
    };
    if (cnt.t >= 10 || cnt.e >= 10) {
      lines.push('Sok rúd vagy kocka van. 10 kocka = 1 rúd, 10 rúd = 1 lap. Inkább rakj kevesebbet!');
    } else {
      say(cnt.h, g.h, 'Lap (százas)');
      say(cnt.t, g.t, 'Rúd (tízes)');
      say(cnt.e, g.e, 'Kocka (egyes)');
    }
    setBuildMsg({ ok: false, lines });
  };
  const bs = 3.2;
  const bw = Math.max(260, blocksWidth(cnt.h, cnt.t, cnt.e, bs));
  const bh = Math.max(70, blocksHeight(cnt.h, cnt.t, cnt.e, bs));

  // ---- Labor II: Számkártyák ----
  const [cards, setCards] = useState<{ digits: number[]; task: CardTask }>({ digits: [6, 0, 3], task: 'maxEven' });
  const [slots, setSlots] = useState<number[]>([]);
  const [cardStreak, setCardStreak] = useState(0);
  const answer = cardAnswer(cards.digits, cards.task) ?? 0;
  const built = slots.length === 3 ? cards.digits[slots[0]] * 100 + cards.digits[slots[1]] * 10 + cards.digits[slots[2]] : null;
  const cardOk = built === answer;
  const tapCard = (i: number) => {
    if (slots.includes(i) || slots.length === 3) return;
    const next = [...slots, i];
    setSlots(next);
    if (next.length === 3) {
      const v = cards.digits[next[0]] * 100 + cards.digits[next[1]] * 10 + cards.digits[next[2]];
      setCardStreak((s) => (v === answer ? s + 1 : 0));
    }
  };
  const newCards = () => {
    let c = makeCardTask();
    while (c.digits.join() === cards.digits.join() && c.task === cards.task) c = makeCardTask();
    setCards(c);
    setSlots([]);
  };
  let cardHint = '';
  if (built !== null && !cardOk) {
    const first = cards.digits[slots[0]];
    const last = cards.digits[slots[2]];
    if (first === 0) cardHint = '0-val nem kezdődhet háromjegyű szám!';
    else if (cards.task.endsWith('Even') && last % 2 === 1) cardHint = `A ${built} páratlan, mert ${art(last)} ${last} van a végén. Páros jegyet tegyél a végére!`;
    else if (cards.task.endsWith('Odd') && last % 2 === 0) cardHint = `A ${built} páros, mert ${art(last)} ${last} van a végén. Páratlan jegyet tegyél a végére!`;
    else if (cards.task.startsWith('max')) cardHint = `Van ennél nagyobb is! Az elejére a lehető legnagyobb jegy kerüljön.`;
    else cardHint = `Van ennél kisebb is! Az elejére a lehető legkisebb jegy kerüljön (de nem a 0).`;
  }

  return (
    <TheoryTemplate
      topicId="g3-count-1000"
      subtopicId="szamok-1000-ig"
      grade={3}
      chapterId="szamolas-1000-ig"
      title="1. Számok 1000-ig"
      subtitle="Ezer = 10 százas. Kirakás, helyiérték ezressel, betűvel írás, számegyenes, sorozatok, számkártyák."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_szamok_1000_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — EZER = 10 SZÁZAS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              685 = 6 sz + 8 t + 5 e = 600 + 80 + 5
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>10 százas = 1 ezres = <strong>1000</strong>. Ez az első négyjegyű szám.</li>
              <li>10 egyes = 1 tízes. 10 tízes = 1 százas.</li>
              <li>Ha egy helyen nincs semmi, oda <strong>0</strong> kerül: 706.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 108–110. o." badgeColor="emerald">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>500-ig már tudsz számolni. Most elmegyünk <strong>1000-ig</strong>!</p>
          <p>Jön a 6., 7., 8., 9. és 10. száz. A végén ott vár az <strong>ezer</strong>.</p>
          <p>Kirakjuk, leírjuk és összehasonlítjuk a számokat.</p>
        </div>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Tíz százas: ezer" badge="100-tól 1000-ig" badgeColor="emerald">
        <TenHundredsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Számolj százasával: 100, 200, 300, … , 900, <strong>1000</strong>.</p>
          <p>Tíz százas együtt <strong>1 ezres</strong>. Így írjuk: 1000. Így mondjuk: ezer.</p>
        </div>
        <ThousandStepSvg />
        <TheoryCallout type="info" title="Négy jegy!">
          A 999 után jön az 1000. Az 1000-ben négy jegy van: 1, 0, 0, 0. Ez az első <strong>négyjegyű</strong> szám.
        </TheoryCallout>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Kirakjuk a számot" badge="Lap, rúd, kocka" badgeColor="blue">
        <Blocks685Svg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Lap" badge="100" badgeColor="rose">
            <p className="text-sm text-slate-700">Egy lap 100-at ér. Ez a <strong>százas</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Rúd" badge="10" badgeColor="blue">
            <p className="text-sm text-slate-700">Egy rúd 10-et ér. Ez a <strong>tízes</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Kocka" badge="1" badgeColor="amber">
            <p className="text-sm text-slate-700">Egy kocka 1-et ér. Ez az <strong>egyes</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. Helyiérték-táblázat ezressel" badge="Új oszlop" badgeColor="purple">
        <PlaceValueTableSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A táblázat egy új oszloppal bővül: ez az <strong>ezres</strong>.</p>
          <p>A 706-ban a tízesek helyén 0 áll. A 960-ban az egyesek helyén.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Alaki érték" badge="a jegy" badgeColor="slate">
            <p className="text-sm text-slate-700">Amit leírunk. A 739-ben: 7, 3 és 9.</p>
          </TheoryCard>
          <TheoryCard title="Helyiérték" badge="a hely" badgeColor="purple">
            <p className="text-sm text-slate-700">Ahol a jegy áll: ezres, százas, tízes vagy egyes hely.</p>
          </TheoryCard>
          <TheoryCard title="Valódi érték" badge="amennyit ér" badgeColor="emerald">
            <p className="text-sm text-slate-700">A 739-ben a 3-as a tízesek helyén áll. Ezért <strong>30</strong>-at ér.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Számok betűvel" badge="Egy szóba írjuk" badgeColor="sky">
        <TheoryTable
          headers={['Számmal', 'Betűvel']}
          rows={[
            ['618', 'hatszáztizennyolc'],
            ['740', 'hétszáznegyven'],
            ['905', 'kilencszázöt'],
            ['999', 'kilencszázkilencvenkilenc'],
            ['1000', 'ezer']
          ]}
        />
        <TheoryCallout type="info" title="Egybeírjuk!">
          Ezeket a számokat egy szóba írjuk: <strong>hétszáznegyven</strong>, nem „hét száz negyven”.
        </TheoryCallout>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Számegyenes és számsorok" badge="0–1000" badgeColor="teal">
        <NumberLine1000Svg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Itt egy kis osztás 50-et ér. A hosszabb vonalak a kerek százasok.</p>
          <p>A narancs pont a 250, a kék a 600, a zöld a 950.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Százasával" badge="+100" badgeColor="teal">
            <p className="text-sm text-slate-700">160, 260, 360, 460, …</p>
          </TheoryCard>
          <TheoryCard title="Ötvenesével" badge="+50" badgeColor="emerald">
            <p className="text-sm text-slate-700">30, 80, 130, 180, …</p>
          </TheoryCard>
          <TheoryCard title="Húszasával vissza" badge="−20" badgeColor="rose">
            <p className="text-sm text-slate-700">990, 970, 950, 930, …</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Melyik a nagyobb?" badge="Összehasonlítás" badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Először a <strong>százasokat</strong> nézd: 693 &lt; 712, mert 6 &lt; 7.</p>
          <p>Ha egyformák, a <strong>tízeseket</strong>: 845 &lt; 854.</p>
          <p>Ha azok is, az <strong>egyeseket</strong>: 970 &lt; 973.</p>
          <p>Az 1000 minden háromjegyű számnál nagyobb.</p>
        </div>
      </TheorySection>

      {/* 8 */}
      <TheorySection title="8. Pénz 1000 Ft-ig" badge="Forint" badgeColor="amber">
        <Pay1000Svg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az 1000 Ft-ot sokféleképpen kifizetheted.</p>
          <p>Van 1000 Ft-os és 500 Ft-os bankjegy, és vannak érmék: 200, 100, 50, 20, 10, 5 Ft.</p>
        </div>
      </TheorySection>

      {/* 9 */}
      <TheorySection title="9. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) 7 sz + 13 t + 5 e = ?" badge="Beváltás" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>13 tízes = 10 tízes + 3 tízes.</li>
              <li>10 tízes = 1 százas.</li>
              <li>Így 8 sz + 3 t + 5 e = <strong>835</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kártyák: 3, 8, 0" badge="Számkártyák" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Páros szám: a végén 0 vagy 8 áll.</li>
              <li>Ilyenek: 830, 380, 308.</li>
              <li>A legnagyobb páros: <strong>830</strong>.</li>
              <li>A 038 nem jó: 0-val kezdődik.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) 995 < □ < 1000" badge="Két szám között" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A 995 után jön: 996, 997, 998, 999.</li>
              <li>Az 1000 már nem jó, mert nem kisebb az 1000-nél.</li>
              <li>Megoldás: <strong>996, 997, 998, 999</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 10 */}
      <TheorySection title="10. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Hétszázhat – hogyan írjuk?"
          wrong="7006 vagy 76"
          wrongExplanation="A hétszáz nem 700 után írt 6. A 0-t sem hagyhatod el!"
          correct="706"
          correctExplanation="7 százas, 0 tízes, 6 egyes. A tízesek helyére 0 kerül."
          tip="Háromjegyű számban mindig 3 jegy van. Az 1000-ben 4."
        />
        <TheoryCallout type="warning" title="Az 1000 nem háromjegyű!">
          A legnagyobb háromjegyű szám a <strong>999</strong>. Az 1000 már négyjegyű.
        </TheoryCallout>
      </TheorySection>

      {/* 11 Labor I */}
      <TheorySection title="11. Labor I: Rakd ki!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newBuild} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-slate-600">Lap = 100, rúd = 10, kocka = 1</div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
            Rakd ki ezt a számot: <span className="text-3xl align-middle">{target}</span>
          </div>
          <svg viewBox={`0 0 ${bw + 20} ${bh + 20}`} className="w-full h-auto max-h-[220px]" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
            <rect x="1" y="1" width={bw + 18} height={bh + 18} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
            {value === 0 ? (
              <text x={(bw + 20) / 2} y={(bh + 20) / 2 + 4} textAnchor="middle" fontSize="14" fill="#94a3b8">Üres az asztal. Tegyél rá valamit!</text>
            ) : (
              <Blocks x={10} y={10} sz={cnt.h} t={cnt.t} e={cnt.e} s={bs} />
            )}
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center">
            {([
              ['h', 'lap', 'rounded-xl bg-rose-50 border-2 border-rose-200 p-2 space-y-1', 'text-rose-700'],
              ['t', 'rúd', 'rounded-xl bg-blue-50 border-2 border-blue-200 p-2 space-y-1', 'text-blue-700'],
              ['e', 'kocka', 'rounded-xl bg-yellow-50 border-2 border-yellow-200 p-2 space-y-1', 'text-yellow-700']
            ] as const).map(([k, name, box, ink]) => (
              <div key={k} className={box}>
                <div className={`text-2xl font-black ${ink}`}>{cnt[k]}</div>
                <div className={`text-xs font-bold ${ink}`}>{name}</div>
                <div className="flex gap-1 justify-center">
                  <button onClick={() => change(k, -1)} className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-xl font-black">−</button>
                  <button onClick={() => change(k, 1)} className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-xl font-black">+</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button onClick={checkBuild} className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-black text-lg min-h-[52px]">Kész!</button>
          </div>
          {buildMsg && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold space-y-1 ${buildMsg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {buildMsg.lines.map((l) => (
                <div key={l}>{l}</div>
              ))}
              {buildMsg.ok && <div>Kérj új feladatot!</div>}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 12 Labor II */}
      <TheorySection title="12. Labor II: Számkártyák" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={newCards} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => setSlots([])} className="px-4 py-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 text-sm font-bold min-h-[48px]">Töröld</button>
            <div className="ml-auto text-sm font-bold text-purple-800 bg-purple-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {cardStreak}</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center text-purple-900 font-bold">
            Rakd ki a kártyákból {CARD_TASK_TEXT[cards.task]}! Minden kártyát egyszer használj.
          </div>
          <div className="flex gap-3 justify-center">
            {cards.digits.map((d, i) => (
              <button
                key={i}
                onClick={() => tapCard(i)}
                disabled={slots.includes(i)}
                className={`w-16 h-20 rounded-xl border-4 text-4xl font-black ${slots.includes(i) ? 'bg-slate-100 border-slate-200 text-slate-300' : 'bg-yellow-50 border-yellow-400 text-slate-900'}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-center items-center">
            {[0, 1, 2].map((k) => (
              <div key={k} className={`w-16 h-20 rounded-xl border-4 border-dashed flex items-center justify-center text-4xl font-black ${slots[k] !== undefined ? 'border-purple-400 bg-white text-purple-900' : 'border-slate-300 text-slate-300'}`}>
                {slots[k] !== undefined ? cards.digits[slots[k]] : '?'}
              </div>
            ))}
          </div>
          <div className="text-center text-xs font-bold text-slate-500">százas – tízes – egyes</div>
          {built !== null && !cardOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">
              {cardHint} Nyomd meg a „Töröld” gombot, és próbáld újra!
            </div>
          )}
          {cardOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {Art(answer)} {answer} a jó megoldás.{cardStreak >= 3 ? ` Már ${cardStreak} jó válasz egymás után!` : ''} Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Numbers1000G3Theory;
