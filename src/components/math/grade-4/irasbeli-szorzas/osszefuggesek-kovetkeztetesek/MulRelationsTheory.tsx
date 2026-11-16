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
  FactorChangeSvg,
  DoubleHalfSvg,
  BirdsChartSvg,
  TicketTableSvg,
  DistributiveSvg,
  ChainShortcutSvg,
  TICKET_PEOPLE
} from './MulRelationsFigures';

/** Hogyan változott a szorzat? (új szorzat és régi szorzat aránya szövegesen) */
export const describeChange = (oldProduct: number, newProduct: number): string => {
  if (newProduct === oldProduct) return 'A szorzat nem változott.';
  if (newProduct > oldProduct && newProduct % oldProduct === 0) {
    const times: Record<number, string> = { 2: 'kétszeresére', 3: 'háromszorosára', 4: 'négyszeresére', 8: 'nyolcszorosára', 16: 'tizenhatszorosára' };
    const k = newProduct / oldProduct;
    return times[k] ? `A szorzat a ${times[k]} nőtt.` : 'A szorzat nőtt.';
  }
  if (newProduct < oldProduct && oldProduct % newProduct === 0) {
    const k = oldProduct / newProduct;
    const part: Record<number, string> = { 2: 'felére', 3: 'harmadára', 4: 'negyedére', 5: 'ötödére', 8: 'nyolcadára', 10: 'tizedére', 16: 'tizenhatodára' };
    return part[k] ? `A szorzat a ${part[k]} csökkent.` : 'A szorzat csökkent.';
  }
  return newProduct > oldProduct ? 'A szorzat nőtt.' : 'A szorzat csökkent.';
};

/**
 * Következtetés a 320 Ft-os belépő árára egy ismert értékből (munkafüzet II. 63. o.).
 * Visszaadja a gondolatmenetet és az árat.
 */
export const ticketReasoning = (people: number): { price: number; text: string } => {
  const price = people * 320;
  if (people === 10) return { price, text: '10 fő: 320 · 10 = 3200 Ft.' };
  if (people === 11) return { price, text: '11 fő = 10 fő + 1 fő: 3200 + 320 = 3520 Ft.' };
  if (people === 12) return { price, text: '12 fő = 10 fő + 2 fő: 3200 + 640 = 3840 Ft.' };
  if (people === 15) return { price, text: '15 fő = 10 fő + 5 fő. 5 fő a 10 fő fele: 1600 Ft. 3200 + 1600 = 4800 Ft.' };
  if (people === 20) return { price, text: '20 fő = 2 · 10 fő: 2 · 3200 = 6400 Ft.' };
  if (people === 24) return { price, text: '24 fő = 2 · 12 fő: 2 · 3840 = 7680 Ft.' };
  if (people === 25) return { price, text: '25 fő = 20 fő + 5 fő: 6400 + 1600 = 8000 Ft.' };
  if (people === 30) return { price, text: '30 fő = 3 · 10 fő: 3 · 3200 = 9600 Ft.' };
  if (people === 31) return { price, text: '31 fő = 30 fő + 1 fő: 9600 + 320 = 9920 Ft.' };
  return { price, text: `${people} · 320 = ${price} Ft.` };
};

/** I. labor: Szorzatváltoztató – duplázd és felezd a tényezőket! */
const ChangeLab: React.FC = () => {
  const START: [number, number] = [61, 80];
  const [a, setA] = useState(START[0]);
  const [b, setB] = useState(START[1]);
  const [last, setLast] = useState<string>('');
  const p0 = START[0] * START[1];
  const p = a * b;
  const act = (na: number, nb: number, what: string) => {
    setA(na);
    setB(nb);
    setLast(what);
  };
  const btn = 'h-12 px-3 rounded-xl text-sm font-black border-2 disabled:opacity-40';

  return (
    <div className="bg-white border-2 border-violet-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex justify-center items-center gap-3 text-3xl font-black">
        <span className="px-4 py-2 rounded-xl bg-violet-100 text-violet-800">{a}</span>
        <span className="text-slate-500">·</span>
        <span className="px-4 py-2 rounded-xl bg-orange-100 text-orange-800">{b}</span>
        <span className="text-slate-500">=</span>
        <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800">{p}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button disabled={a * 2 * b > 9999} onClick={() => act(a * 2, b, 'A szorzandót kétszeresére növelted.')} className={`${btn} bg-violet-50 border-violet-300 text-violet-800`}>
          szorzandó · 2
        </button>
        <button disabled={a % 2 !== 0} onClick={() => act(a / 2, b, 'A szorzandót felezted.')} className={`${btn} bg-violet-50 border-violet-300 text-violet-800`}>
          szorzandó : 2
        </button>
        <button disabled={a * b * 2 > 9999} onClick={() => act(a, b * 2, 'A szorzót kétszeresére növelted.')} className={`${btn} bg-orange-50 border-orange-300 text-orange-800`}>
          szorzó · 2
        </button>
        <button disabled={b % 2 !== 0} onClick={() => act(a, b / 2, 'A szorzót felezted.')} className={`${btn} bg-orange-50 border-orange-300 text-orange-800`}>
          szorzó : 2
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => act(START[0], START[1], '')} className="h-12 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold">
          Vissza: 61 · 80
        </button>
      </div>
      <TheoryCallout type={p === p0 ? 'success' : 'info'} title={last || 'Próbáld ki!'}>
        {last
          ? `Az eredeti szorzat 4880 volt, most ${p}. ${describeChange(p0, p)}`
          : 'Duplázd meg az egyik tényezőt, és felezd a másikat! Mit veszel észre?'}
      </TheoryCallout>
    </div>
  );
};

/** II. labor: Következtető táblázat – 320 Ft-os belépők. */
const TicketLab: React.FC = () => {
  const [found, setFound] = useState<number[]>([10]);
  const [cur, setCur] = useState<number>(11);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const { price, text } = ticketReasoning(cur);
  const options = [price, price + 320, price - 320, price + 100].sort((x, y) => ((x * 13) % 7) - ((y * 13) % 7));
  const pick = (o: number) => {
    if (o === price) {
      if (!found.includes(cur)) setFound([...found, cur]);
      setMsg({ ok: true, text });
    } else {
      setMsg({ ok: false, text: 'Nem jó. Keress egy ismert oszlopot a táblázatban, és abból következtess!' });
    }
  };
  const choose = (n: number) => {
    setCur(n);
    setMsg(null);
  };

  return (
    <div className="bg-white border-2 border-cyan-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="overflow-x-auto">
        <table className="mx-auto border-collapse text-center font-bold">
          <tbody>
            <tr>
              <th className="px-2 py-2 bg-cyan-600 text-white">Fő</th>
              {TICKET_PEOPLE.map((n) => (
                <td key={n} className="p-0 border border-cyan-200">
                  <button
                    onClick={() => choose(n)}
                    className={`w-12 h-12 ${cur === n ? 'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-50 text-slate-800'}`}
                  >
                    {n}
                  </button>
                </td>
              ))}
            </tr>
            <tr>
              <th className="px-2 py-2 bg-cyan-700 text-white">Ft</th>
              {TICKET_PEOPLE.map((n) => (
                <td key={n} className="w-12 h-12 border border-cyan-200 text-xs text-teal-700 bg-teal-50">
                  {found.includes(n) ? n * 320 : n === cur ? '?' : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center font-bold text-slate-700">
        Mennyibe kerül {cur} főnek a belépő?
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((o) => (
          <button key={o} onClick={() => pick(o)} className="h-12 rounded-xl border-2 border-cyan-200 bg-white hover:bg-cyan-50 text-lg font-black text-slate-800">
            {o} Ft
          </button>
        ))}
      </div>
      {msg && (
        <TheoryCallout type={msg.ok ? 'success' : 'warning'} title={msg.ok ? 'Ügyes következtetés! 🎉' : 'Próbáld újra!'}>
          {msg.text}
        </TheoryCallout>
      )}
      <div className="text-sm text-slate-600">
        Kitöltött oszlopok: {found.length} / {TICKET_PEOPLE.length}
      </div>
    </div>
  );
};

export const MulRelationsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-mult"
      subtopicId="osszefuggesek-kovetkeztetesek"
      grade={4}
      chapterId="irasbeli-szorzas"
      title="3. Összefüggések, következtetések"
      subtitle="Hogyan változik a szorzat, ha a tényezők változnak? Következtetés egyről többre, többről egyre, táblázatok, sorozatok."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="violet"
      pdfFilename="4_osztaly_osszefuggesek_kovetkeztetesek_tananyag.pdf"
      practiceTitle="Készen állsz az összefüggések gyakorlására?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A SZORZAT VÁLTOZÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center">
              <span className="font-mono text-base font-black text-violet-900 dark:text-violet-200">61 · 80 = 122 · 40 = 244 · 20 = 4880</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Ha az egyik tényező kétszeresére nő, a szorzat is kétszeresére nő.</li>
              <li>Ha az egyik tényezőt kétszeresére növeljük, a másikat felezzük, a szorzat nem változik.</li>
              <li>Következtess! 10 kg 1400 Ft → 20 kg kétszer annyi: 2800 Ft.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 144. o." badgeColor="violet">
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            Néha nem is kell kiszámolni egy szorzatot, elég <strong>gondolkodni</strong>! Ha tudod, hogy 61 · 80 = 4880, akkor a 122 · 40-et
            már számolás nélkül is tudod.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Hogyan változik a szorzat, ha a tényezők változnak?</li>
            <li>Melyik szorzat a nagyobb? Döntsd el számolás előtt!</li>
            <li>Következtetés: árak, napi zsebpénz, madarak útja.</li>
            <li>Összevonás: 26 · 14 + 45 · 14 = 71 · 14.</li>
            <li>Szabályok táblázatban és sorozatokban.</li>
          </ul>
        </div>
      </TheorySection>

      {/* 2. Tényezők változása */}
      <TheorySection title="2. Figyeld meg a tényezők változását!" badge="Tankönyv 144. o., 1. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <FactorChangeSvg />
          <DoubleHalfSvg />
        </div>
        <TheoryTable
          headers={['Mi változik?', 'Mi történik a szorzattal?', 'Példa']}
          rows={[
            ['A szorzandó 100-zal nő', '100 · szorzóval nő', '126 · 23 = 2898 → 226 · 23 = 5198 (+2300)'],
            ['A szorzó kétszeresére nő', 'kétszeresére nő', '199 · 10 = 1990 → 199 · 20 = 3980'],
            ['A szorzó a felére csökken', 'a felére csökken', '159 · 44 = 6996 → 159 · 22 = 3498'],
            ['A szorzó 1-gyel nő', 'a szorzandóval nő', '241 · 21 = 5061 → 241 · 22 = 5302 (+241)'],
            ['Egyik · 2, másik : 2', 'nem változik', '120 · 21 = 60 · 42 = 2520']
          ]}
        />
      </TheorySection>

      {/* 3. Következtetés */}
      <TheorySection title="3. Nézzük meg együtt! Következtetés" badge="Tankönyv 144. o., 3–4. feladat" badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Hány forintba kerül?" badge="3. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>20 kg burgonya, ha 10 kg 1400 Ft → kétszer annyi: 2800 Ft</li>
              <li>9 kg körte, ha 3 kg 900 Ft → háromszor annyi: 2700 Ft</li>
              <li>15 db jégkrém, ha 5 db 3000 Ft → háromszor annyi: 9000 Ft</li>
              <li>2 kg alma, ha 8 kg 1600 Ft → negyedannyi: 400 Ft</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Manó zsebpénze" badge="4. feladat" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>5 nap, naponta 425 Ft: 425 · 5 = 2125 Ft</li>
              <li>1 hét = 7 nap: 425 · 7 = 2975 Ft</li>
              <li>2 hét = 14 nap: 2 · 2975 = 5950 Ft</li>
              <li>3 hét = 21 nap: 3 · 2975 = 8925 Ft</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Madarak */}
      <TheorySection title="4. Olvasd le a diagramról!" badge="Tankönyv 144. o., 5. feladat" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BirdsChartSvg showValues />
          <TheoryTable
            headers={['Madár', '1 nap', '1 hét', '2 hét', '3 hét']}
            rows={[
              ['seregély', '40 km', '280 km', '560 km', '840 km'],
              ['gólya', '200 km', '1400 km', '2800 km', '4200 km'],
              ['sarki csér', '300 km', '2100 km', '4200 km', '6300 km']
            ]}
          />
        </div>
        <TheoryCallout type="tip" title="Ügyes következtetés">
          Ha tudod az 1 hetet, a 2 hét kétszer, a 3 hét háromszor annyi. Nem kell újra 14-gyel vagy 21-gyel szorozni!
        </TheoryCallout>
      </TheorySection>

      {/* 5. Összevonás és láncok */}
      <TheorySection title="5. Összevonás és szorzásláncok" badge="Munkafüzet II. 63–64. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DistributiveSvg />
          <ChainShortcutSvg />
        </div>
        <TheoryTable
          headers={['Feladat', 'Rövidebben', 'Eredmény']}
          rows={[
            ['57 · 23 + 17 · 23', '(57 + 17) · 23 = 74 · 23', '1702'],
            ['134 · 42 − 118 · 42', '(134 − 118) · 42 = 16 · 42', '672'],
            ['27 · 37 − 27 · 17', '27 · 20', '540'],
            ['29 · 10 · 20', '29 · 200', '5800']
          ]}
        />
      </TheorySection>

      {/* 6. Sorozatok, szabály */}
      <TheorySection title="6. Szabályok táblázatban és sorozatban" badge="Munkafüzet II. 64–65. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Sorozatok" badge="5. feladat" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>101, 202, 217, 434, 449, … szabály: · 2, aztán + 15 → 898, 913</li>
              <li>132, 396, 241, 723, 568, … szabály: · 3, aztán − 155 → 1704, 1549</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Többszörösök" badge="4. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Ha egy szám 7-szerese 448, akkor a 14-szerese kétszer annyi: 896.</li>
              <li>Ha egy szám 3-szorosa 249, akkor a 30-szorosa 10-szer annyi: 2490.</li>
              <li>Ha egy szám 20-szorosa 1800, akkor a 2-szerese tizedannyi: 180.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz! Gondolkodj, mielőtt szorzol!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A gyertyás csapda"
          wrong="15 gyertya: 15 · 75 = 1125 perc"
          wrongExplanation="A gyertyákat egyszerre gyújtjuk meg, ezért egyszerre is égnek el."
          correct="15 gyertya: 75 perc"
          correctExplanation="Egyszerre égnek, ezért ugyanannyi idő, mint egy gyertyánál: 75 perc."
          tip="Mindig gondold végig, tényleg szorozni kell-e!"
        />
        <TheoryCallout type="warning" title="Kétszeres, nem kettővel több!">
          Ha a szorzót 2-szeresére növeled, a szorzat is 2-szeres lesz – nem 2-vel több! 199 · 10 = 1990, 199 · 20 = 3980.
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Játékos labor I: Szorzatváltoztató" badge="Labor" badgeColor="violet">
        <p className="text-sm text-slate-600">Duplázd és felezd a tényezőket! Figyeld, mi történik a szorzattal.</p>
        <ChangeLab />
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Játékos labor II: Következtető táblázat" badge="Labor" badgeColor="cyan">
        <p className="text-sm text-slate-600">
          A túzokrezervátumban a belépő 320 Ft fejenként. Kattints egy oszlopra, és következtess egy már ismert oszlopból!
        </p>
        <TicketTableSvg filled={false} className="w-full max-w-xl mx-auto h-auto" />
        <TicketLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulRelationsTheory;
