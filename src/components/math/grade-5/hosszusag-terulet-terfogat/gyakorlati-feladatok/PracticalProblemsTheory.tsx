import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import {
  Home,
  Hammer,
  Paintbrush,
  Ruler,
  Maximize2,
  Box,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Layers
} from 'lucide-react';

export interface PracticalProblemsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const PracticalProblemsTheory: React.FC<PracticalProblemsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Szoba Felújítás Tervező Állapotok ---
  const [roomLength, setRoomLength] = useState<number>(5); // méter
  const [roomWidth, setRoomWidth] = useState<number>(4);   // méter
  const [roomHeight, setRoomHeight] = useState<number>(3);  // méter
  const [doorWidth, setDoorWidth] = useState<number>(1);    // méter

  // Számítások
  // 1. Szegőléc (Kerület ajtó nélkül)
  const perimeterTotal = 2 * (roomLength + roomWidth);
  const skirtingBoardLength = Math.max(0, perimeterTotal - doorWidth);

  // 2. Padlóburkolat (Terület)
  const floorArea = roomLength * roomWidth;

  // 3. Falak és mennyezet festése (Mennyezet + 4 fal, ajtó nélkül)
  const ceilingArea = floorArea;
  const wallArea = 2 * (roomLength * roomHeight + roomWidth * roomHeight) - (doorWidth * 2); // 2 m magas ajtó
  const paintArea = ceilingArea + wallArea;
  const paintBuckets = Math.ceil(paintArea / 12); // 1 vödör kb. 12 m²-re elég

  // 4. Szoba légtérfogata (Térfogat)
  const airVolume = roomLength * roomWidth * roomHeight;

  return (
    <TheoryTemplate
      documentId="grade-5-practical-problems-theory"
      pdfFilename="5_osztaly_IV_9_gyakorlati_feladatok.pdf"
      title="Gyakorlati feladatok a mindennapi életben"
      subtitle="Hogyan alkalmazzuk a kerület, terület, felszín és térfogat képleteit lakásfelújításnál, kerítésépítésnél, dobozcsomagolásnál és víztartályoknál?"
      themeColor="teal"
      emoji="🏡"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 9. TANANYAG"
      quickRule={{
        label: 'A 4 alapmennyiség felismerése',
        formula: '\\text{Kerület (1D): körbe } K \\quad | \\quad \\text{Terület (2D): lefedés } T \\quad | \\quad \\text{Felszín (2D): bevonás } A \\quad | \\quad \\text{Térfogat (3D): megtöltés } V'
      }}
      practiceTitle="Készen állsz a gyakorlati feladatok megoldására?"
      practiceSubtitle="Tedd próbára tudásodat a 30 életszerű feladatot tartalmazó kvízben, párosítóban vagy csoportosítóban!"
      practiceButtonText="Gyakorló Kvíz indítása"
      onBack={onBack}
      onStartQuiz={handleQuiz}
      onSwitchToQuiz={handleQuiz}
    >
      {/* 1. SZEKCIÓ: A DÖNTÉSI FA */}
      <TheorySection
        id="dontesi-fa"
        title="1. Melyik képletre van szükségem? A nagy döntési fa"
        subtitle="Hogyan ismerd fel azonnal a szövegből, hogy mit kell kiszámolni?"
        badge="STRATÉGIA"
      >
        <TheoryCard title="A szöveges feladatok 4 kulcskérdése">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
            A mindennapi életben nem azt mondják: „számold ki a téglatest felszínét”, hanem azt, hogy „mennyi csomagolópapír kell a dobozra”.
            Az alábbi táblázat segít azonnal eldönteni, melyik fogalmat kell használnod:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
            <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-700">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-700 dark:text-emerald-400 block mb-1">
                1D: KERÜLET (K)
              </span>
              <strong className="text-slate-900 dark:text-white block text-sm mb-1">
                „Körbe, a széle mentén”
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Kerítés építése, képkeret léc, szoba szegélyléce, futópálya hossza, asztalterítő csipkeszegélye.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                cm, dm, méter
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-slate-800/80 border border-blue-300 dark:border-blue-700">
              <span className="text-xs uppercase tracking-wider font-extrabold text-blue-700 dark:text-blue-400 block mb-1">
                2D: TERÜLET (T)
              </span>
              <strong className="text-slate-900 dark:text-white block text-sm mb-1">
                „Egy sík felület lefedése”
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Szoba parkettázása, fal csempézése, fűmag vetése a kertbe, szőnyeg mérete, üvegablak felülete.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[10px] font-bold text-blue-800 dark:text-blue-300">
                cm², dm², m², hektár
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-pink-50/80 dark:bg-slate-800/80 border border-pink-300 dark:border-pink-700">
              <span className="text-xs uppercase tracking-wider font-extrabold text-pink-700 dark:text-pink-400 block mb-1">
                2D ÖSSZETETT: FELSZÍN (A)
              </span>
              <strong className="text-slate-900 dark:text-white block text-sm mb-1">
                „Test külső bevonása”
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Doboz becsomagolása papírral, fa szekrény lefestése kívülről, nyitott akvárium üveglapjai.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded bg-pink-100 dark:bg-pink-950 text-[10px] font-bold text-pink-800 dark:text-pink-300">
                6 lap (vagy 5 lap) területe
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/80 dark:bg-slate-800/80 border border-teal-300 dark:border-teal-700">
              <span className="text-xs uppercase tracking-wider font-extrabold text-teal-700 dark:text-teal-400 block mb-1">
                3D: TÉRFOGAT (V)
              </span>
              <strong className="text-slate-900 dark:text-white block text-sm mb-1">
                „Megtöltés, befogadás”
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Akvárium vagy medence vize, hordó bora, dobozok berakása konténerbe, szoba légköbmétere.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-[10px] font-bold text-teal-800 dark:text-teal-300">
                cm³, dm³, m³, liter, hl
              </span>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: KERÍTÉS ÉS SZEGÉLYLÉC */}
      <TheorySection
        id="kerites-szegelylec"
        title="2. Kerítésépítés és szegélylécek (Kerület)"
        subtitle="Mire kell nagyon figyelni: kapuk, ajtók és nyílások levonása"
        badge="1D FELADATOK"
      >
        <TheoryCard title="Körbekerítés nyílásokkal">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Ha egy telket vagy egy szobát körbe kell keríteni vagy szegélyezni, a kerületet számítjuk ki, de 
            <strong>a bejáratok, kapuk és ajtók helyét le kell vonni</strong>, hiszen oda nem teszünk kerítést vagy szegélylécet!
          </p>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-sm h-36 mx-auto" viewBox="0 0 300 130">
              {/* Kert telek */}
              <rect x="35" y="18" width="220" height="80" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2.5" rx="4" />
              {/* Kapu nyílás a déli oldalon */}
              <rect x="120" y="96" width="50" height="5" fill="#ffffff" className="dark:fill-slate-900" />
              <line x1="120" y1="98" x2="170" y2="98" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,4" />
              <circle cx="120" cy="98" r="3.5" fill="#16a34a" />
              <circle cx="170" cy="98" r="3.5" fill="#16a34a" />
              <text x="145" y="118" textAnchor="middle" className="text-[10px] font-black fill-red-600">Kapu: 4 m (nincs kerítés!)</text>

              {/* Méretek */}
              <text x="145" y="12" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">Hosszúság: a = 25 m</text>
              <text x="20" y="60" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" transform="rotate(-90 20 60)">b = 18 m</text>
              <text x="270" y="60" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300" transform="rotate(90 270 60)">18 m</text>

              {/* Belső szöveg */}
              <text x="145" y="52" textAnchor="middle" className="text-xs font-black fill-emerald-900 dark:fill-emerald-200">Kert területe</text>
              <text x="145" y="68" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-400">Drótfonat: 2 · (25 + 18) - 4 = 82 m</text>
            </svg>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 text-sm block">Életszerű mintapélda:</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Egy téglalap alakú kert 25 m hosszú és 18 m széles. Körbekerítjük drótfonattal, de a kocsibeállónak hagyunk egy 4 m-es kaput. Hány méter kerítésdrót kell?
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-slate-200">
              <div>1. Teljes kerület: K = 2 · (25 m + 18 m) = 2 · 43 m = 86 m</div>
              <div>2. Kapu levonása: 86 m - 4 m = 82 m</div>
              <div className="text-teal-600 dark:text-teal-400 font-bold">Válasz: Pontosan 82 méter drótfonat szükséges.</div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZEKCIÓ: PARKETTÁZÁS ÉS CSEMPÉZÉS */}
      <TheorySection
        id="burkolas"
        title="3. Parkettázás, csempézés és fűmagvetés (Terület)"
        subtitle="Hány darab lap kell, és miért kell mindig felfelé kerekíteni?"
        badge="2D FELADATOK"
      >
        <TheoryCard title="Burkolási számítások és ráhagyás">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Amikor padlót parkettázunk vagy falat csempézünk:
            <br />
            1. Kiszámoljuk a <strong>szoba alapterületét</strong> (T_szoba = a · b).
            <br />
            2. Kiszámoljuk <strong>egy darab csempe vagy parketta területét</strong> (T_lap).
            <br />
            3. Elosztjuk a kettőt: <strong>Darabszám = T_szoba : T_lap</strong>.
          </p>

          <TheoryCallout variant="warning" title="Mindig egész darabra (dobozra) kerekítünk fel!">
            A boltban nem vághatnak le fél csempét vagy negyed doboz parkettát. Ha a számítás szerint 42,3 darab csempe kell, akkor <strong>43 darabot (vagy egész dobozt)</strong> kell megvásárolni! Ráadásul a vágási hulladék miatt a szakemberek mindig 10% többletet számolnak fel.
          </TheoryCallout>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mt-3 text-xs space-y-2">
            <strong className="text-slate-900 dark:text-slate-100 text-sm block">Mintapélda csempézésre:</strong>
            <p className="text-slate-600 dark:text-slate-300">
              Egy fürdőszobafal 3 m széles és 2 m magas (T = 6 m² = 60 000 cm²). 20 cm × 20 cm-es csempékkel burkoljuk. Hány csempe kell?
            </p>
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono text-slate-800 dark:text-slate-200">
              <div>• 1 csempe területe: 20 · 20 = 400 cm²</div>
              <div>• Csempék száma: 60 000 : 400 = 150 darab csempe</div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZEKCIÓ: FESTÉS ÉS CSOMAGOLÓPAPÍR */}
      <TheorySection
        id="festes-csomagolas"
        title="4. Festés és díszdobozok csomagolása (Felszín)"
        subtitle="A szobafestésnél vigyázz: a padlót nem festjük be!"
        badge="FELSZÍN FELADATOK"
      >
        <TheoryCard title="Szobafestés képlete">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
            Ha kifestünk egy szobát, akkor a <strong>mennyezetet (1 db lap)</strong> és a <strong>4 oldalfalat</strong> festjük le:
          </p>

          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 font-mono text-center text-sm font-bold text-teal-900 dark:text-teal-200 my-2">
            Festendő felület = a · b (mennyezet) + 2 · (a · m + b · m) (4 fal)
          </div>

          <div className="my-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
            <svg className="w-full max-w-sm h-36 mx-auto" viewBox="0 0 280 120">
              {/* Padló (barna/fa: NEM FESTJÜK!) */}
              <polygon points="40,85 100,55 240,55 180,85" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
              <text x="140" y="73" textAnchor="middle" className="text-[9px] font-black fill-amber-950">Padló: NEM FESTJÜK! (0 m²)</text>

              {/* Hátsó fal (festett) */}
              <polygon points="100,15 240,15 240,55 100,55" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
              {/* Bal oldali fal (festett) */}
              <polygon points="40,45 100,15 100,55 40,85" fill="#99f6e4" stroke="#0d9488" strokeWidth="1.5" />

              {/* Mennyezet (felül szaggatott, festett) */}
              <polygon points="40,45 100,15 240,15 180,45" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="140" y="33" textAnchor="middle" className="text-[10px] font-black fill-teal-900">Mennyezet (a · b)</text>

              <text x="140" y="108" textAnchor="middle" className="text-xs font-black fill-teal-900 dark:fill-teal-100">
                Festendő felület = Mennyezet + 4 Fal (Padló nélkül!)
              </text>
            </svg>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
            Ebből a festendő felületből vonjuk le az ajtók és ablakok felületét, ha a feladat külön kéri.
          </p>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZEKCIÓ: INTERAKTÍV FELÚJÍTÁS TERVEZŐ LABOR */}
      <TheorySection
        id="labor"
        title="5. Interaktív Szobafelújítás Laboratórium"
        subtitle="Állítsd be a szoba méreteit, és a szimulátor azonnal kiszámolja az összes mennyiséget!"
        badge="INTERAKTÍV"
      >
        <TheoryCard title="Tervezd meg a szoba felújítását!">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Hosszúság:</span>
                <span className="text-teal-600 font-mono">{roomLength} m</span>
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={roomLength}
                onChange={(e) => setRoomLength(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Szélesség:</span>
                <span className="text-teal-600 font-mono">{roomWidth} m</span>
              </label>
              <input
                type="range"
                min="2"
                max="8"
                value={roomWidth}
                onChange={(e) => setRoomWidth(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Belmagasság:</span>
                <span className="text-teal-600 font-mono">{roomHeight} m</span>
              </label>
              <input
                type="range"
                min="2"
                max="4"
                value={roomHeight}
                onChange={(e) => setRoomHeight(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between mb-1">
                <span>Ajtó szélessége:</span>
                <span className="text-teal-600 font-mono">{doorWidth} m</span>
              </label>
              <input
                type="range"
                min="1"
                max="2"
                value={doorWidth}
                onChange={(e) => setDoorWidth(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                1. SZEGŐLÉC (KERÜLET)
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {skirtingBoardLength} m
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Kérület ({perimeterTotal} m) mínusz az ajtó ({doorWidth} m).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <span className="text-[11px] font-bold text-blue-800 dark:text-blue-300 block mb-1">
                2. PARKETTA (TERÜLET)
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {floorArea} m²
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Alapterület: {roomLength} m · {roomWidth} m.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800">
              <span className="text-[11px] font-bold text-pink-800 dark:text-pink-300 block mb-1">
                3. FESTÉS (FELSZÍN)
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {paintArea} m²
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Mennyezet + 4 fal ajtó nélkül (~{paintBuckets} vödör festék).
              </p>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 block mb-1">
                4. LÉGTÉRFOGAT
              </span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {airVolume} m³
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                V = {roomLength} · {roomWidth} · {roomHeight} = {airVolume} m³ ({airVolume * 1000} l).
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. SZEKCIÓ: GYAKORI CSAPDÁK */}
      <TheorySection
        id="csapdak"
        title="6. Gyakori csapdák a gyakorlati szöveges feladatokban"
        subtitle="Ezeket a hibákat kerüld el az életben és a dolgozatban!"
        badge="FIGYELEM"
      >
        <TheoryTrapBox
          traps={[
            {
              title: '1. CSAPDA: Elfelejteni levonni az ajtót vagy kaput',
              description: 'Kerítésépítésnél a kaput, szegélylécezésnél az ajtót mindig le kell vonni a kerületből, oda ugyanis nem kerül fa vagy drót!'
            },
            {
              title: '2. CSAPDA: A padlót is lefesteni a szobafestésnél',
              description: 'Hacsak a feladat külön nem kéri a padlófestést, a szobafestés mindig a mennyezetből és a 4 falból áll (5 lap, nem 6!).'
            },
            {
              title: '3. CSAPDA: Kevert mértékegységek a valóságban',
              description: 'A szoba méreteit méterben, a csempét centiméterben szokták megadni. Soha ne szorozd össze a métert a centiméterrel: előbb válts azonos egységre!'
            },
            {
              title: '4. CSAPDA: Lekerekítés az anyagszükségletnél',
              description: 'Ha a számítás szerint 25,2 méter deszka kell, nem vehetsz 25 métert, mert hiányozni fog! Anyagvásárlásnál mindig felfelé kerekítünk egész darabra vagy csomagra.'
            }
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
