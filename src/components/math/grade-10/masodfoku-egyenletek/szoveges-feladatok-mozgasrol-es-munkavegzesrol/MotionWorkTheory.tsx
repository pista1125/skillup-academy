import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheoryCard,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  MotionTimelineSvg,
  RiverCurrentSvg,
  WorkRatePipesSvg,
  MotionWorkModelingProtocolSvg
} from './MotionWorkFigures';
import {
  Clock,
  Gauge,
  Sliders,
  CheckCircle2,
  Navigation,
  Droplets,
  HardHat
} from 'lucide-react';

export interface MotionWorkTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onStartPractice?: () => void;
  onSwitchToQuiz?: () => void;
}

export const MotionWorkTheory: React.FC<MotionWorkTheoryProps> = ({
  onBack,
  onStartQuiz,
  onStartPractice,
  onSwitchToQuiz
}) => {
  // 1. Szimulátor: Mozgási menetidő
  const [distanceS, setDistanceS] = useState<number>(180);
  const [speedV, setSpeedV] = useState<number>(60);
  const [speedDelta, setSpeedDelta] = useState<number>(30);

  // 2. Szimulátor: Folyami hajózás
  const [boatSpeed, setBoatSpeed] = useState<number>(20);
  const [riverSpeed, setRiverSpeed] = useState<number>(4);
  const [riverDistance, setRiverDistance] = useState<number>(48);

  // 3. Szimulátor: Együttes munkavégzés
  const [workerATime, setWorkerATime] = useState<number>(6);
  const [workerBTime, setWorkerBTime] = useState<number>(12);

  // Számítások 1-es:
  const time1 = distanceS / speedV; // óra
  const speed2 = speedV + speedDelta;
  const time2 = distanceS / speed2; // óra
  const timeDiffHours = time1 - time2;
  const timeDiffMinutes = Math.round(timeDiffHours * 60);

  // Számítások 2-es (folyami):
  const speedDown = boatSpeed + riverSpeed;
  const speedUp = Math.max(1, boatSpeed - riverSpeed);
  const timeDown = riverDistance / speedDown;
  const timeUp = riverDistance / speedUp;
  const totalRiverTime = timeDown + timeUp;
  const calmWaterTime = (2 * riverDistance) / boatSpeed;

  // Számítások 3-as (munka):
  // 1/t₁ + 1/t₂ = 1/T_közös ⟹ T_közös = (t₁ · t₂) / (t₁ + t₂)
  const combinedTime = (workerATime * workerBTime) / (workerATime + workerBTime);

  return (
    <TheoryTemplate
      topicId="g10-masodfoku-egyenletek"
      badge="10. OSZTÁLY • V. TÉMAKÖR"
      topicBadge="38. LECKE"
      title="Szöveges feladatok mozgásról és munkavégzésről"
      subtitle="Sebesség, út, idő és együttes munkateljesítmények modellezése törtes másodfokú egyenletekkel"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onStartPractice={onStartPractice}
      quickRule={{
        label: 'A Két Legfontosabb Törtes Modell',
        formula: 't₁ - t₂ = s/v - s/(v + Δv) = Δt   és   1/t₁ + 1/t₂ = 1/T_közös'
      }}
      sections={[
        {
          id: 'sec-motion-basics',
          title: '1. Mozgásos feladatok másodfokú egyenletei (s = v · t)',
          description:
            'Hogyan vezet a különböző sebességekhez tartozó menetidők különbsége törtes másodfokú egyenletre?',
          color: 'indigo',
          badge: 'Sebesség & Idő',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A menetidő-különbség algebrai modellje"
                color="indigo"
                icon={<Gauge className="w-5 h-5 text-indigo-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    Az egyenes vonalú egyenletes mozgás alapképlete: <strong>s = v · t</strong>. Amikor azonos $s$ távolságot két különböző sebességgel ($v$ és $v + \Delta v$) tesz meg egy jármű, a menetidők a sebességek reciprokával arányosak:
                  </p>
                  <div className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-center font-mono font-bold text-sm">
                    Lassabb jármű ideje: t₁ = s / v &nbsp;&nbsp;&nbsp; Gyorsabb jármű ideje: t₂ = s / (v + Δv)
                  </div>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <MotionTimelineSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Az időkülönbség egyenlete: a lassabb menetidejéből levonva a gyorsabb menetidejét megkapjuk a Δt időkülönbséget
                    </p>
                  </div>

                  <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl space-y-2">
                    <span className="font-bold text-indigo-950 text-sm block">A megoldás aranyszabálya:</span>
                    <p className="text-xs text-slate-700">
                      Mindig a <strong>hosszabb menetidőből</strong> vonjuk ki a <strong>rövidebb menetidőt</strong>, hogy a különbség pozitív legyen:
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-indigo-200 font-mono text-xs text-indigo-900 font-bold text-center">
                      s / v - s / (v + Δv) = Δt
                    </div>
                    <p className="text-[11px] text-indigo-800">
                      A közös nevezővel [v · (v + Δv)] való beszorzás után tiszta másodfokú egyenletet kapunk v-re.
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 1 */}
              <TheoryCard
                title="1. Mintapélda: Vonatok menetideje azonos úton"
                color="indigo"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy személyvonat 180 km-es távolságot tesz meg. Ha a sebességét 15 km/h-val megnövelné, az utat 1 órával hamarabb tenné meg. Mekkora a vonat eredeti sebessége?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása (v = eredeti sebesség, v &gt; 0):</p>
                    <p className="text-indigo-900">Eredeti menetidő: t₁ = 180 / v</p>
                    <p className="text-indigo-900">Gyorsabb menetidő: t₂ = 180 / (v + 15)</p>
                    <p className="text-indigo-900">Különbség: 180 / v - 180 / (v + 15) = 1</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">2. Beszorzás a közös nevezővel [v(v + 15)]:</p>
                    <p className="text-slate-800">180(v + 15) - 180v = 1 · v(v + 15)</p>
                    <p className="text-slate-800">180v + 2700 - 180v = v² + 15v</p>
                    <p className="text-slate-800">v² + 15v - 2700 = 0</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">3. Másodfokú megoldás (képlettel vagy szorzattá alakítással):</p>
                    <p className="text-slate-800">D = 15² - 4 · 1 · (-2700) = 225 + 10 800 = 11 025 = 105²</p>
                    <p className="text-emerald-700 font-bold">v₁ = (-15 + 105) / 2 = 90 / 2 = 45 km/h (Valós megoldás!)</p>
                    <p className="text-rose-700">v₂ = (-15 - 105) / 2 = -60 km/h (Sebesség nem lehet negatív, elvetjük!)</p>

                    <p className="text-slate-600 font-sans text-[11px] pt-1">
                      <strong>Ellenőrzés:</strong> 45 km/h mellett 180 / 45 = 4 óra. 60 km/h mellett 180 / 60 = 3 óra. A különbség valóban pontosan 1 óra!
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-river-motion',
          title: '2. Folyami hajózás és szélhatás (Relatív sebességek)',
          description:
            'Hogyan változik meg a sebesség folyásirányban és sodrással szemben, és miért vezet másodfokú egyenletre az oda-vissza út?',
          color: 'blue',
          badge: 'Sodrás & Relatív Sebesség',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A folyami mozgás törvényei és a nevezetes szorzat"
                color="blue"
                icon={<Navigation className="w-5 h-5 text-blue-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    Ha a jármű közege maga is mozog (víz sodrása, szél), a sebességek vektoriálisan összegződnek:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    <li><strong>Folyásirányban haladva (lefelé):</strong> a folyó segíti a hajót ⟹ v_eredő = v_hajó + v_folyó</li>
                    <li><strong>Folyással szemben haladva (felfelé):</strong> a folyó fékezi a hajót ⟹ v_eredő = v_hajó - v_folyó &gt; 0</li>
                  </ul>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <RiverCurrentSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Oda-vissza hajózás: a közös nevező az (v + v_f)(v - v_f) = v² - v_f² nevezetes különbség!
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-2">
                    <span className="font-bold text-blue-950 text-sm block">A teljes oda-vissza út egyenlete:</span>
                    <div className="bg-white p-3 rounded-xl border border-blue-200 font-mono text-xs text-blue-900 font-bold text-center">
                      s / (v + v_f) + s / (v - v_f) = T_összes
                    </div>
                    <p className="text-[11px] text-blue-800">
                      💡 <strong>Fontos fizikai következmény:</strong> Az oda-vissza út sodrásban <em>mindig hosszabb ideig tart</em>, mint állóvízben, mert a sodrással szembeni lassabb szakaszon sokkal több időt tölt a hajó!
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 2: Motorcsónak */}
              <TheoryCard
                title="2. Mintapélda: Motorcsónak a Duna sodrásában"
                color="blue"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy motorcsónak állóvízi saját sebessége 20 km/h. A folyón megtesz 48 km-t oda és vissza, ami összesen 5 órát vesz igénybe. Mekkora a folyó sodrásának sebessége (v_f)?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása (0 &lt; v_f &lt; 20):</p>
                    <p className="text-blue-900">48 / (20 + v_f) + 48 / (20 - v_f) = 5</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">2. Közös nevezőre hozás [(20 + v_f)(20 - v_f) = 400 - v_f²]:</p>
                    <p className="text-slate-800">48(20 - v_f) + 48(20 + v_f) = 5 · (400 - v_f²)</p>
                    <p className="text-slate-800">960 - 48 v_f + 960 + 48 v_f = 2000 - 5 v_f²</p>
                    <p className="text-slate-800">1920 = 2000 - 5 v_f²</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">3. Tiszta hiányos másodfokú egyenlet megoldása:</p>
                    <p className="text-slate-800">5 v_f² = 2000 - 1920 = 80</p>
                    <p className="text-slate-800">v_f² = 80 / 5 = 16</p>
                    <p className="text-emerald-700 font-bold">v_f = √16 = 4 km/h (A folyó sebessége)</p>
                    <p className="text-slate-500 text-[11px]">A v_f = -4 km/h negatív gyököt azonnal elvetjük.</p>

                    <p className="text-slate-600 font-sans text-[11px] pt-1">
                      <strong>Ellenőrzés:</strong> Lefelé haladva: 20 + 4 = 24 km/h ⟹ 48 / 24 = 2 óra. Felfelé: 20 - 4 = 16 km/h ⟹ 48 / 16 = 3 óra. Összesen 2 + 3 = 5 óra. Hibátlan!
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-work-rate',
          title: '3. Együttes munkavégzés és csapok/csövek modellje',
          description:
            'A teljesítmények összegzésének törvénye (1/t₁ + 1/t₂ = 1/T) és medencék feltöltése.',
          color: 'teal',
          badge: 'Munka & Teljesítmény',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A reciprokos munkaösszefüggés levezetése"
                color="teal"
                icon={<HardHat className="w-5 h-5 text-teal-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A munkavégzéses feladatokban a teljes elvégzendő munkát <strong>1 egésznek</strong> tekintjük (1 felásott kert, 1 kifestett szoba, 1 feltöltött medence). A <strong>teljesítmény</strong> az egységnyi idő alatt elvégzett munka része:
                  </p>
                  <div className="bg-slate-900 text-teal-300 p-3 rounded-xl text-center font-mono font-bold text-sm">
                    1 óra alatt: 1. munkás elvégzi: 1/t₁ részt &nbsp;|&nbsp; 2. munkás elvégzi: 1/t₂ részt
                  </div>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-teal-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <WorkRatePipesSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A két cső együttes munkája: az óránkénti teljesítmények összeadódnak!
                    </p>
                  </div>

                  <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl space-y-2">
                    <span className="font-bold text-teal-950 text-sm block">Együttes munkavégzés fundamentális egyenlete:</span>
                    <div className="bg-white p-3 rounded-xl border border-teal-200 font-mono text-xs text-teal-900 font-bold text-center">
                      1 / t₁ + 1 / t₂ = 1 / T_közös
                    </div>
                    <p className="text-[11px] text-teal-800">
                      Ha az egyik munkás d órával tovább dolgozik egyedül (t₂ = t₁ + d), a közös nevezővel beszorozva másodfokú egyenlethez jutunk.
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 3 */}
              <TheoryCard
                title="3. Mintapélda: Két vízvezetékcső együttes működése"
                color="teal"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy úszómedencét két cső együtt 6 óra alatt tölt fel vízzel. Csak az első csövet használva 5 órával hamarabb tölthető meg a medence, mint ha csak a második cső működne. Hány óra alatt töltené fel a medencét a két cső külön-külön?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása (t = 1. cső ideje, t &gt; 0):</p>
                    <p className="text-teal-900">1. cső ideje: t óra ⟹ óránként 1/t rész</p>
                    <p className="text-teal-900">2. cső ideje: t + 5 óra ⟹ óránként 1/(t + 5) rész</p>
                    <p className="text-teal-900">Együtt 6 óra ⟹ óránként 1/6 rész</p>
                    <p className="text-teal-900">Egyenlet: 1 / t + 1 / (t + 5) = 1 / 6</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">2. Beszorzás a közös nevezővel [6 · t · (t + 5)]:</p>
                    <p className="text-slate-800">6(t + 5) + 6t = t(t + 5)</p>
                    <p className="text-slate-800">6t + 30 + 6t = t² + 5t</p>
                    <p className="text-slate-800">12t + 30 = t² + 5t</p>
                    <p className="text-slate-800">t² - 7t - 30 = 0</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">3. Másodfokú megoldás:</p>
                    <p className="text-slate-800">(t - 10)(t + 3) = 0</p>
                    <p className="text-emerald-700 font-bold">t₁ = 10 óra (Az 1. cső ideje egyedül)</p>
                    <p className="text-emerald-700 font-bold">t + 5 = 15 óra (A 2. cső ideje egyedül)</p>
                    <p className="text-rose-700">t₂ = -3 óra (Negatív időt elvetjük!)</p>

                    <p className="text-slate-600 font-sans text-[11px] pt-1">
                      <strong>Ellenőrzés:</strong> 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6. Tehát együtt valóban 6 óra!
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-combined-stages',
          title: '4. Szakaszos mozgás és részidős munkavégzés',
          description:
            'Mi történik, ha egy jármű az út egy részén megáll vagy lassít, illetve ha a munkások nem egyszerre kezdik a munkát?',
          color: 'purple',
          badge: 'Szakaszos Modellek',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Késések és szakaszokra bontott feladatok"
                color="purple"
                icon={<Clock className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    Gyakori érettségi feladattípus, amikor a munkát vagy az utat <strong>szakaszokra</strong> bontják:
                  </p>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    <li>
                      <strong>Késés behozása mozgásnál:</strong> A jármű a távolság egy részét normál sebességgel tette meg, majd 15 perc kényszerpihenő után megnövelte a sebességét, hogy pontosan érkezzen.
                    </li>
                    <li>
                      <strong>Közös munka után egyedül befejezés:</strong> A két munkás együtt dolgozik t_közös ideig, majd az egyik távozik, és a másik egyedül fejezi be a fennmaradó részt:
                      <div className="bg-slate-900 text-purple-300 p-2.5 rounded-lg text-center font-mono my-2 text-xs">
                        t_közös · (1/t₁ + 1/t₂) + t_maradék · (1/t₁) = 1
                      </div>
                    </li>
                  </ul>
                </div>
              </TheoryCard>

              {/* Mintapélda 4 */}
              <TheoryCard
                title="4. Mintapélda: Szakaszos munkavégzés"
                color="purple"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Béla és Géza együtt dolgozva 4 óra alatt tapétáznának ki egy lakást. Először együtt dolgoztak 2 órát, majd Gézának el kellett mennie. Ekkor Béla egyedül folytatta, és még 3 óra alatt fejezte be a munkát. Hány óra alatt végezne a munkával Béla egyedül?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Részmunka kiszámítása:</p>
                    <p className="text-purple-900">2 óra alatt a munka 2/4 = 1/2 része (50%-a) készült el.</p>
                    <p className="text-purple-900">A maradék 1/2 részt Béla 3 óra alatt végezte el egyedül.</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">2. Béla egyéni ideje:</p>
                    <p className="text-slate-800">Ha a fél munkához 3 óra kell, a teljes lakáshoz: 2 · 3 = 6 óra kell Bélának.</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">3. Géza egyéni idejének meghatározása:</p>
                    <p className="text-slate-800">1/6 + 1/t_Géza = 1/4 ⟹ 1/t_Géza = 1/4 - 1/6 = 3/12 - 2/12 = 1/12</p>
                    <p className="text-emerald-700 font-bold">Géza egyedül 12 óra alatt végezne!</p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-protocol',
          title: '5. Modellezési protokoll és mértékegység-fegyelem',
          description:
            'A 4 lépéses ellenőrzési folyamat és a tipikus mértékegység-csapdák elkerülése.',
          color: 'indigo',
          badge: 'Protokoll & Ellenőrzés',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A szöveges feladatok megoldásának 4 aranyszabálya"
                color="indigo"
                icon={<CheckCircle2 className="w-5 h-5 text-indigo-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-indigo-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <MotionWorkModelingProtocolSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A biztos és hibátlan megoldás lépései a változó kijelölésétől a fizikai értelmezésig
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">1. Mértékegység-egyeztetés:</span>
                      <p className="text-slate-600">
                        Ha a sebesség km/h-ban van megadva, a perceket <strong>mindig váltsd át órára</strong>! Pl. 15 perc = 1/4 óra = 0,25 óra; 40 perc = 40/60 = 2/3 óra!
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">2. Fizikai Értelmezési Tartomány:</span>
                      <p className="text-slate-600">
                        A sebesség ($v &gt; 0$) és az idő ($t &gt; 0$) szigorúan pozitív valós szám. Folyami hajózásnál v_hajó &gt; v_folyó, különben a hajó sodródna!
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>

              <TheoryTrapBox title="A leggyakoribb hiba a mértékegységekben!">
                <p>
                  Ha a feladatban az szerepel: <em>„20 perccel kevesebb idő alatt teszi meg az utat”</em>, az egyenlet jobb oldalára <strong>TILOS 20-at írni</strong>!
                  <br />
                  Helyesen: 20 perc = 20/60 óra = 1/3 óra!
                </p>
              </TheoryTrapBox>
            </div>
          )
        }
      ]}
      interactiveSection={
        <div className="mt-10 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-indigo-200 dark:border-indigo-900/50 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-100 dark:border-indigo-900/40 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" /> Interaktív Mozgás- és Munkaszimulátor
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Kísérletezz a sebességekkel és munkateljesítményekkel!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Figyeld meg a menetidők változását és a közös munkaidő alakulását valós időben!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Mozgás szimulátor */}
            <div className="p-5 bg-gradient-to-b from-indigo-50/60 to-blue-50/40 dark:bg-slate-800/60 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Menetidő Szimulátor</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Távolság (s):</span>
                    <span className="font-bold text-indigo-700">{distanceS} km</span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={360}
                    step={10}
                    value={distanceS}
                    onChange={(e) => setDistanceS(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Alapsebesség (v):</span>
                    <span className="font-bold text-indigo-700">{speedV} km/h</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={120}
                    step={5}
                    value={speedV}
                    onChange={(e) => setSpeedV(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Sebességnövelés (Δv):</span>
                    <span className="font-bold text-indigo-700">+{speedDelta} km/h</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={speedDelta}
                    onChange={(e) => setSpeedDelta(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/40 space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>1. Menetidő (s/v):</span>
                    <span className="font-bold text-slate-900 dark:text-white">{time1.toFixed(2)} óra ({Math.round(time1 * 60)} perc)</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>2. Menetidő (s/(v+Δv)):</span>
                    <span className="font-bold text-slate-900 dark:text-white">{time2.toFixed(2)} óra ({Math.round(time2 * 60)} perc)</span>
                  </div>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-indigo-700 dark:text-indigo-400">
                    <span>Menetidő nyereség (Δt):</span>
                    <span>{timeDiffMinutes} perc ({timeDiffHours.toFixed(2)} óra)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Folyami hajózás szimulátor */}
            <div className="p-5 bg-gradient-to-b from-blue-50/60 to-cyan-50/40 dark:bg-slate-800/60 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Folyami Hajózás</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Hajó saját sebessége (v):</span>
                    <span className="font-bold text-blue-700">{boatSpeed} km/h</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={40}
                    step={2}
                    value={boatSpeed}
                    onChange={(e) => setBoatSpeed(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Folyó sodrása (v_f):</span>
                    <span className="font-bold text-blue-700">{riverSpeed} km/h</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={Math.max(1, boatSpeed - 2)}
                    step={1}
                    value={riverSpeed}
                    onChange={(e) => setRiverSpeed(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Lefelé sebesség (v + v_f):</span>
                    <span className="font-bold text-emerald-600">{speedDown} km/h ({timeDown.toFixed(2)} óra)</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Felfelé sebesség (v - v_f):</span>
                    <span className="font-bold text-rose-600">{speedUp} km/h ({timeUp.toFixed(2)} óra)</span>
                  </div>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-blue-800 dark:text-blue-300">
                    <span>Teljes oda-vissza idő:</span>
                    <span>{totalRiverTime.toFixed(2)} óra</span>
                  </div>
                  <div className="text-[10px] text-slate-500 text-center">
                    (Állóvízben csak {calmWaterTime.toFixed(2)} óra lenne!)
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Munka szimulátor */}
            <div className="p-5 bg-gradient-to-b from-teal-50/60 to-emerald-50/40 dark:bg-slate-800/60 rounded-2xl border border-teal-200 dark:border-teal-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <HardHat className="w-5 h-5 text-teal-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Együttes Munkavégzés</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>„A” munkás / cső ideje (t₁):</span>
                    <span className="font-bold text-teal-700">{workerATime} óra</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={24}
                    step={1}
                    value={workerATime}
                    onChange={(e) => setWorkerATime(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>„B” munkás / cső ideje (t₂):</span>
                    <span className="font-bold text-teal-700">{workerBTime} óra</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={24}
                    step={1}
                    value={workerBTime}
                    onChange={(e) => setWorkerBTime(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-teal-100 dark:border-teal-900/40 space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Óránkénti „A” rész:</span>
                    <span className="font-bold text-slate-900 dark:text-white">1/{workerATime} rész ({((1/workerATime)*100).toFixed(1)}%)</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Óránkénti „B” rész:</span>
                    <span className="font-bold text-slate-900 dark:text-white">1/{workerBTime} rész ({((1/workerBTime)*100).toFixed(1)}%)</span>
                  </div>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex justify-between font-black text-teal-700 dark:text-teal-400 text-sm">
                    <span>Közös idő (T_közös):</span>
                    <span>{combinedTime.toFixed(2)} óra</span>
                  </div>
                  <div className="text-[11px] text-center text-emerald-600 font-bold">
                    {Math.round(combinedTime * 60)} perc alatt végeznek együtt!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
