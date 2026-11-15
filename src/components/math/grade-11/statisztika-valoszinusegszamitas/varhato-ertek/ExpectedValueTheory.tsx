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
  ExpectedValueThreeDiceSvg,
  ExpectedValueConceptsSvg,
  ExpectedValueStepsSvg,
  ExpectedValueLotterySvg,
  ExpectedValueFairGameSvg
} from './ExpectedValueFigures';

/** Magyar formátum: tizedesvessző, legfeljebb `d` tizedesjegy. */
const fmt = (x: number, d = 2): string => {
  if (!Number.isFinite(x)) return '–';
  const r = Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  return (Object.is(r, -0) ? 0 : r).toLocaleString('hu-HU', { maximumFractionDigits: d });
};

const parseNum = (s: string): number => Number(s.trim().replace(/\s/g, '').replace('−', '-').replace(',', '.'));

interface Row {
  label: string;
  value: string;
  count: string;
}

const PRESETS: { name: string; rows: Row[] }[] = [
  {
    name: 'Kidolgozott sorsjegy',
    rows: [
      { label: 'nem nyert', value: '0', count: '9800' },
      { label: '500 Ft', value: '500', count: '180' },
      { label: '2000 Ft', value: '2000', count: '19' },
      { label: 'főnyeremény', value: '10000', count: '1' }
    ]
  },
  {
    name: 'Farsangi tombola',
    rows: [
      { label: 'nyer', value: '1000', count: '10' },
      { label: 'nem nyer', value: '0', count: '490' }
    ]
  },
  {
    name: 'Házi feladat 2. tombola',
    rows: [
      { label: 'Mekkora pech!', value: '0', count: '1250' },
      { label: 'apró örömök', value: '300', count: '200' },
      { label: 'Ez király!', value: '600', count: '40' },
      { label: 'Ugye el sem hiszed?', value: '1500', count: '8' },
      { label: 'a felhők között', value: '5000', count: '2' }
    ]
  },
  {
    name: '3 érme: fejek száma',
    rows: [
      { label: '0 fej', value: '0', count: '1' },
      { label: '1 fej', value: '1', count: '3' },
      { label: '2 fej', value: '2', count: '3' },
      { label: '3 fej', value: '3', count: '1' }
    ]
  },
  {
    name: 'Dobókocka',
    rows: [1, 2, 3, 4, 5, 6].map((n) => ({ label: `${n}`, value: `${n}`, count: '1' }))
  }
];

export const ExpectedValueTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szerencsejáték-tervező (kockajáték)
  const [winFaces, setWinFaces] = useState<boolean[]>([false, false, false, false, true, false]);
  const [winAmount, setWinAmount] = useState<number>(50);
  const [lossAmount, setLossAmount] = useState<number>(15);
  const [simRounds, setSimRounds] = useState<number>(0);
  const [simTotal, setSimTotal] = useState<number>(0);
  const k = winFaces.filter(Boolean).length;
  // A kiválasztott lapoknál a játékos kap `winAmount` Ft-ot, a többinél fizet `lossAmount` Ft-ot.
  const ePlayer = (k / 6) * winAmount - ((6 - k) / 6) * lossAmount;
  const fairWin = k > 0 ? ((6 - k) * lossAmount) / k : NaN;
  const fairLoss = k < 6 ? (k * winAmount) / (6 - k) : NaN;
  const verdict = Math.abs(ePlayer) < 1e-9 ? 'méltányos (E = 0)' : ePlayer > 0 ? 'a játékosnak kedvez (E > 0)' : 'a játékos ellenfelének kedvez (E < 0)';
  const simulate = (n: number) => {
    let total = 0;
    for (let i = 0; i < n; i++) {
      const face = Math.floor(Math.random() * 6);
      total += winFaces[face] ? winAmount : -lossAmount;
    }
    setSimRounds((r) => r + n);
    setSimTotal((t) => t + total);
  };
  const resetSim = () => {
    setSimRounds(0);
    setSimTotal(0);
  };

  // Labor II: eloszlás-táblázat → várható érték
  const [rows, setRows] = useState<Row[]>(PRESETS[0].rows);
  const parsed = useMemo(() => rows.map((r) => ({ ...r, x: parseNum(r.value), c: parseNum(r.count) })), [rows]);
  const validTable = parsed.length > 0 && parsed.every((r) => Number.isFinite(r.x) && Number.isFinite(r.c) && r.c >= 0) && parsed.some((r) => r.c > 0);
  const totalCount = validTable ? parsed.reduce((s, r) => s + r.c, 0) : 0;
  const ev = validTable ? parsed.reduce((s, r) => s + (r.x * r.c) / totalCount, 0) : NaN;
  const maxAbs = validTable ? Math.max(...parsed.map((r) => Math.abs((r.x * r.c) / totalCount)), 1e-9) : 1;
  const setCell = (i: number, key: keyof Row, v: string) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, [key]: v } : r)));

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="varhato-ertek"
      title="9. Várható érték"
      subtitle="Mennyit nyerünk átlagosan, ha sokszor játszunk? A lehetséges kimenetelek valószínűségekkel súlyozott átlaga – és a méltányos játék."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_varhato_ertek_tananyag.pdf"
      practiceTitle="Készen állsz a várható értékre?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — VÁRHATÓ ÉRTÉK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              E = x₁ · p₁ + x₂ · p₂ + … + xₙ · pₙ,  ahol p₁ + p₂ + … + pₙ = 1
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Várható érték</strong> = a lehetséges kimeneteleknek a valószínűségekkel súlyozott átlaga. Jele: E (elterjedt az M jelölés is).
              </li>
              <li>Csak akkor értelmezhető, ha a kísérlet kimenetelét egy valós számmal adjuk meg (pontszám, nyeremény, darabszám).</li>
              <li>Nagyszámú kísérlet átlaga a várható érték körül ingadozik – de a várható érték nem azonos a legvalószínűbb eredménnyel.</li>
              <li>
                Egy játék <strong>méltányos (igazságos)</strong>, ha a nyeremény várható értéke 0.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: hány téglára számíthat Zsóka?" badge="Tankönyv 184. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Egy társasjátékban Zsóka három kockával dob, és a dobások összege számít: négypontonként kap egy téglát (például 8, 9, 10 vagy 11 esetén 2 téglát). Egy számítógépes program 100 dobást végzett; a dobások módusza 9, az átlaga 10,55 lett.
            </p>
            <p>
              Ahogy egyre több dobást végzünk, az átlag egy jól meghatározott érték körül ingadozik – ez a <strong>várható érték</strong>. Három kockával dobva az összeg várható értéke <strong>10,5</strong>, amit a 10,55-os átlag jól közelít. Érdekes, hogy 10,5-et sohasem dobhatunk, hiszen az összeg egész szám: a várható érték a dobások <em>átlagát</em> jellemzi.
            </p>
            <TheoryCallout type="info" title="Ráadás: a téglák számának várható értéke">
              A 216 egyenlően valószínű esetet végigszámolva a téglák számának (összeg : 4 egészrésze) várható értéke 487/216 ≈ 2,25 tégla. Figyeld meg: ez nem 10,5 : 4 = 2,625, mert a lefelé kerekítés „elvesz” a téglákból!
            </TheoryCallout>
          </div>
          <ExpectedValueThreeDiceSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: összetartozó fogalmak és a várható érték" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryTable
              headers={['Statisztika', 'Valószínűségszámítás']}
              rows={[
                ['relatív gyakoriság', 'valószínűség'],
                ['átlag, súlyozott átlag', 'várható érték']
              ]}
            />
            <p>
              A várható érték arról ad információt, hogy nagyszámú kísérlet esetén <strong>átlagosan</strong> milyen eredményt érünk el. Nem azonos a legvalószínűbb eredménnyel.
            </p>
            <TheoryCard title="Példa: 100 sorsjegy" badge="Példa" badgeColor="sky">
              <p className="text-sm">
                100 sorsjegyből 95 nem nyer, 5 pedig 1000 Ft-ot nyer. Egyetlen sorsjeggyel 95% az esélye, hogy nem nyerünk, de sok játéknál időnként lesz 1000 Ft-os nyereményünk:
              </p>
              <p className="font-mono text-center mt-2">E = 0,95 · 0 + 0,05 · 1000 = 50 Ft</p>
              <p className="text-sm mt-2">
                Ha a sorsjegy ára ennél jóval nagyobb (pl. 100 Ft), akkor pénzügyi szempontból „nem éri meg” játszani. A szervezők mindig úgy szabják meg az árat, hogy összességében ők járjanak jól.
              </p>
            </TheoryCard>
          </div>
          <ExpectedValueConceptsSvg />
        </div>
      </TheorySection>

      {/* 3. Számolás lépései */}
      <TheorySection title="3. A várható érték kiszámítása három lépésben" badge="Módszer" badgeColor="teal">
        <div className="space-y-3">
          <ExpectedValueStepsSvg />
          <TheoryCallout type="tip" title="Ellenőrzés">
            Amikor elkészítjük a táblázatot a lehetséges kimenetelekkel és a valószínűségükkel, érdemes ellenőrizni, hogy a valószínűségek összege 1-et ad-e – ha igen, teljes a felsorolás.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 4. Kidolgozott feladat */}
      <TheorySection title="4. Kidolgozott feladat: a kereskedő sorsjegyjátéka" badge="Tankönyv 185. o." badgeColor="sky">
        <div className="space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            Aki legalább 10 000 Ft értékben vásárol, ajándékba kap egy sorsjegyet. Négyféle sorsjegyet nyomtatnak: 9800 db „Most nem nyertél”, 180 db 500 Ft-os, 19 db 2000 Ft-os és 1 db 10 000 Ft-os főnyeremény. Mennyi egy sorsjegy nyereményének várható értéke?
          </p>
          <TheoryTable
            headers={['Nyeremény (Ft)', '0', '500', '2000', '10 000']}
            rows={[
              ['Valószínűség', '9800/10 000 = 0,98', '180/10 000 = 0,018', '19/10 000 = 0,0019', '1/10 000 = 0,0001'],
              ['Nyeremény · valószínűség', '0', '9', '3,8', '1']
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
              <p>
                <strong>1. lépés:</strong> összesen 9800 + 180 + 19 + 1 = 10 000 sorsjegy készült.
              </p>
              <p>
                <strong>2. lépés:</strong> a valószínűségek összege 0,98 + 0,018 + 0,0019 + 0,0001 = 1, vagyis teljes a felsorolás.
              </p>
              <p>
                <strong>3. lépés:</strong> E = 0 · 0,98 + 500 · 0,018 + 2000 · 0,0019 + 10 000 · 0,0001 = <strong>13,8 Ft</strong>.
              </p>
              <p>Átlagosan ennyit fizet ki a bolt sorsjegyenként – ez a nyeremények valószínűségekkel súlyozott összege.</p>
            </div>
            <ExpectedValueLotterySvg />
          </div>
        </div>
      </TheorySection>

      {/* 5. Igazságos játék */}
      <TheorySection title="5. Feladat: Angéla és Panni játéka – igazságos-e? (1. feladat)" badge="Tankönyv 186. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Angéla dob egy szabályos kockával. Ha ötöst dob, fizet Panninak 50 Ft-ot; ha nem ötöst, kap Pannitól 15 Ft-ot.
            </p>
            <TheoryTable
              headers={['', 'ötös', 'nem ötös']}
              rows={[
                ['Angéla „nyereménye”', '−50', '15'],
                ['Panni „nyereménye”', '50', '−15'],
                ['valószínűség', '1/6', '5/6']
              ]}
            />
            <p>
              <strong>b)</strong> E(Angéla) = −50 · 1/6 + 15 · 5/6 = 25/6 ≈ <strong>4,17 Ft</strong>; E(Panni) = 50 · 1/6 − 15 · 5/6 = −25/6 ≈ <strong>−4,17 Ft</strong>.
            </p>
            <p>
              <strong>c)</strong> A játék akkor igazságos, ha a nyeremény várható értéke mindkét fél számára 0. Például ha ötösnél Angéla 75 Ft-ot fizet (−75/6 + 75/6 = 0), vagy ha nem ötösnél csak 10 Ft-ot kap (−50/6 + 50/6 = 0).
            </p>
          </div>
          <ExpectedValueFairGameSvg />
        </div>
      </TheorySection>

      {/* 6. Tankönyvi feladatok */}
      <TheorySection title="6. Tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="2. feladat: egy kockadobás" badge="Feladat" badgeColor="amber">
            <p className="text-sm text-slate-700">
              Mind a hat eredmény valószínűsége 1/6, így E = (1 + 2 + 3 + 4 + 5 + 6) · 1/6 = 21/6 = <strong>3,5</strong>. Sok dobás átlaga 3,5 körül lesz, pedig 3,5-et egyszer sem dobhatunk.
            </p>
          </TheoryCard>
          <TheoryCard title="3. feladat: farsangi tombola" badge="Feladat" badgeColor="sky">
            <p className="text-sm text-slate-700">
              500 szelvényből 10-et húznak ki: P(1000 Ft) = 10/500 = 0,02, P(0 Ft) = 0,98. A nyeremény várható értéke E = 1000 · 0,02 + 0 · 0,98 = <strong>20 Ft</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="4. feladat: 3 érme, fejek száma" badge="Feladat" badgeColor="emerald">
            <p className="text-sm text-slate-700">
              A 8 elemi esemény közül 0 fej: 1, 1 fej: 3, 2 fej: 3, 3 fej: 1 eset. E = 0 · 1/8 + 1 · 3/8 + 2 · 3/8 + 3 · 1/8 = 12/8 = <strong>1,5</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Házi feladat 1.: részvény árfolyama" badge="Feladat" badgeColor="violet">
            <p className="text-sm text-slate-700">
              4600 Ft · 1,18 = 5428 Ft (p = 0,6) vagy 4600 Ft · 0,95 = 4370 Ft (p = 0,4). E = 5428 · 0,6 + 4370 · 0,4 = 3256,8 + 1748 = <strong>5004,8 Ft</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Házi feladat 2.: tombola öt fajta szelvénnyel" badge="Feladat" badgeColor="rose">
            <p className="text-sm text-slate-700">
              1250 + 200 + 40 + 8 + 2 = 1500 szelvény. E = (300 · 200 + 600 · 40 + 1500 · 8 + 5000 · 2) / 1500 = 106 000 / 1500 ≈ <strong>70,67 Ft</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Mire jó a várható érték?" badge="Értelmezés" badgeColor="slate">
            <p className="text-sm text-slate-700">
              Ha a várható érték kisebb a játék áránál, akkor sokszor játszva veszítünk. Ez persze nem zárja ki, hogy valaki egyetlen játékkal sokat nyerjen – éppen ez adja a szerencsejátékok izgalmát, és sajnos ezért okoznak függőséget is.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Csapda */}
      <TheorySection title="7. Tipikus hiba: a nyeremények egyszerű átlaga" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Mennyi a kidolgozott feladat sorsjegyének várható nyereménye?"
          wrong="(0 + 500 + 2000 + 10 000) : 4 = 3125 Ft"
          wrongExplanation="Ez a négy nyereményfajta egyszerű átlaga – mintha mindegyik ugyanolyan valószínű lenne. Valójában a sorsjegyek 98%-a nem nyer!"
          correct="E = 0 · 0,98 + 500 · 0,018 + 2000 · 0,0019 + 10 000 · 0,0001 = 13,8 Ft"
          correctExplanation="A várható érték SÚLYOZOTT átlag: minden kimenetelt a saját valószínűségével szorzunk. Ellenőrizd, hogy a valószínűségek összege 1!"
          tip="A várható érték nem feltétlenül lehetséges kimenetel (kocka: 3,5), és nem a legvalószínűbb érték (három kocka: a 10 és 11 a legvalószínűbb, E = 10,5)."
        />
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Interaktív Laboratórium I: méltányos-e a játék?" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Tervezz kockajátékot! Jelöld ki, melyik dobásoknál <strong>kap</strong> a játékos pénzt; a többi dobásnál ő <strong>fizet</strong>. A kezdőállapot Panni szemszöge az 1. feladatból: ötösnél kap 50 Ft-ot, máskor fizet 15 Ft-ot.
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-600 mr-1">nyerő dobások:</span>
            {[1, 2, 3, 4, 5, 6].map((n, i) => (
              <button
                key={n}
                onClick={() => {
                  setWinFaces((w) => w.map((v, j) => (j === i ? !v : v)));
                  resetSim();
                }}
                aria-label={`${n}-es dobás nyerő`}
                className={`w-10 h-10 rounded-lg text-lg font-black border-2 ${winFaces[i] ? 'bg-emerald-100 border-emerald-500 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-700'}`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">nyerő dobásnál ennyit KAP a játékos: {winAmount} Ft</label>
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={winAmount}
                onChange={(e) => {
                  setWinAmount(Number(e.target.value));
                  resetSim();
                }}
                className="w-full accent-emerald-600"
                aria-label="nyeremény"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egyébként ennyit FIZET a játékos: {lossAmount} Ft</label>
              <input
                type="range"
                min={0}
                max={200}
                step={5}
                value={lossAmount}
                onChange={(e) => {
                  setLossAmount(Number(e.target.value));
                  resetSim();
                }}
                className="w-full accent-rose-600"
                aria-label="fizetendő"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setWinFaces([true, true, true, true, false, true]);
                setWinAmount(15);
                setLossAmount(50);
                resetSim();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
            >
              Angéla játéka
            </button>
            <button
              onClick={() => {
                setWinFaces([false, false, false, false, false, true]);
                setWinAmount(50);
                setLossAmount(10);
                resetSim();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
            >
              hatos: +50, más: −10
            </button>
            <button
              onClick={() => {
                setWinFaces([false, true, false, true, false, true]);
                setWinAmount(10);
                setLossAmount(5);
                resetSim();
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
            >
              páros: +10, páratlan: −5
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-sky-50 rounded-xl border border-sky-200 p-4 space-y-1">
              <div className="font-bold text-sky-800">A nyeremény várható értéke</div>
              <div className="font-mono">
                E = {winAmount} · {k}/6 − {lossAmount} · {6 - k}/6 = <strong>{fmt(ePlayer)} Ft</strong>
              </div>
              <div>
                A játék: <strong className={Math.abs(ePlayer) < 1e-9 ? 'text-emerald-700' : ePlayer > 0 ? 'text-sky-700' : 'text-rose-700'}>{verdict}</strong>
              </div>
              {Math.abs(ePlayer) > 1e-9 && (
                <div className="text-xs text-slate-600">
                  Méltányos lenne, ha {k > 0 ? `nyerésnél ${fmt(fairWin)} Ft-ot kapna` : ''}
                  {k > 0 && k < 6 ? ', vagy ha ' : ''}
                  {k < 6 ? `vesztésnél ${fmt(fairLoss)} Ft-ot fizetne` : ''}.
                </div>
              )}
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 space-y-2">
              <div className="font-bold text-amber-800">Szimuláció: játsszunk sokszor!</div>
              <div className="flex flex-wrap gap-2">
                {[10, 100, 1000].map((n) => (
                  <button key={n} onClick={() => simulate(n)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200">
                    +{n} játék
                  </button>
                ))}
                <button onClick={resetSim} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                  törlés
                </button>
              </div>
              <div>
                lejátszott játékok: <strong>{simRounds}</strong>, összes nyeremény: <strong>{fmt(simTotal, 0)} Ft</strong>
              </div>
              <div>
                átlagos nyeremény játékonként: <strong>{simRounds > 0 ? `${fmt(simTotal / simRounds)} Ft` : '–'}</strong>
              </div>
              <div className="text-xs text-slate-600">Minél több játékot szimulálsz, az átlag annál inkább a várható érték körül ingadozik.</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Interaktív Laboratórium II: eloszlástáblázatból várható érték" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button key={p.name} onClick={() => setRows(p.rows)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-50 text-teal-800 hover:bg-teal-100">
                {p.name}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-600">
                  <th className="p-1">kimenetel</th>
                  <th className="p-1">érték (x)</th>
                  <th className="p-1">darab / eset</th>
                  <th className="p-1">valószínűség (p)</th>
                  <th className="p-1">x · p</th>
                  <th className="p-1"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => {
                  const pr = parsed[i];
                  const p = validTable ? pr.c / totalCount : NaN;
                  const prod = validTable ? pr.x * p : NaN;
                  return (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-1">
                        <input value={r.label} onChange={(e) => setCell(i, 'label', e.target.value)} className="w-28 px-2 py-1 rounded border border-teal-200" aria-label={`kimenetel ${i + 1}`} />
                      </td>
                      <td className="p-1">
                        <input value={r.value} onChange={(e) => setCell(i, 'value', e.target.value)} className="w-20 px-2 py-1 rounded border border-teal-200 font-mono" aria-label={`érték ${i + 1}`} />
                      </td>
                      <td className="p-1">
                        <input value={r.count} onChange={(e) => setCell(i, 'count', e.target.value)} className="w-20 px-2 py-1 rounded border border-teal-200 font-mono" aria-label={`darab ${i + 1}`} />
                      </td>
                      <td className="p-1 font-mono">{fmt(p, 4)}</td>
                      <td className="p-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono w-16">{fmt(prod, 3)}</span>
                          <div className="h-2 rounded bg-teal-500" style={{ width: `${validTable ? (Math.abs(prod) / maxAbs) * 80 : 0}px`, opacity: prod < 0 ? 0.4 : 1 }} />
                        </div>
                      </td>
                      <td className="p-1">
                        <button onClick={() => setRows((rs) => rs.filter((_, j) => j !== i))} disabled={rows.length <= 1} className="text-xs text-rose-600 font-bold disabled:opacity-30" aria-label={`sor törlése ${i + 1}`}>
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => setRows((rs) => (rs.length < 8 ? [...rs, { label: 'új', value: '0', count: '1' }] : rs))}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-100 text-teal-900 hover:bg-teal-200"
          >
            + új sor
          </button>
          {!validTable ? (
            <div className="bg-rose-50 rounded-xl border border-rose-200 p-4 text-sm font-bold text-rose-700">Adj meg számokat; a darabszámok ne legyenek negatívak, és legalább egy legyen pozitív!</div>
          ) : (
            <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1 text-sm">
              <div>
                összes eset: <strong>{fmt(totalCount, 0)}</strong>; a valószínűségek összege: <strong>1</strong> (a darabszámokból számolva ez mindig teljes felsorolás)
              </div>
              <div className="text-lg">
                várható érték: <strong className="text-teal-900">E ≈ {fmt(ev, 3)}</strong>
              </div>
              <div className="text-xs text-slate-600">
                legkisebb érték: {fmt(Math.min(...parsed.map((r) => r.x)), 3)}, legnagyobb: {fmt(Math.max(...parsed.map((r) => r.x)), 3)} – a várható érték mindig e kettő közé esik.
              </div>
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ExpectedValueTheory;
