import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, XCircle, Info, Sparkles, RefreshCw } from 'lucide-react';

interface SetRelationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface MappingExample {
  id: string;
  name: string;
  description: string;
  domain: string[];
  codomain: string[];
  arrows: { from: string; to: string }[];
  isFunction: boolean;
  reason: string;
}

const PRESET_MAPPINGS: MappingExample[] = [
  {
    id: 'function-standard',
    name: '1. Normál függvény (Egyértelmű)',
    description: 'Minden bemeneti számnak pontosan egy képe van (szabály: x + 2).',
    domain: ['1', '2', '3', '4'],
    codomain: ['3', '4', '5', '6'],
    arrows: [
      { from: '1', to: '3' },
      { from: '2', to: '4' },
      { from: '3', to: '5' },
      { from: '4', to: '6' },
    ],
    isFunction: true,
    reason: 'FÜGGVÉNY: Az A halmaz minden eleméből pontosan egyetlen nyíl indul ki.',
  },
  {
    id: 'not-function-multi',
    name: '2. Többértelmű hozzárendelés (NEM függvény)',
    description: 'A 4-es számnak két képe is van (szabály: x osztói).',
    domain: ['2', '3', '4'],
    codomain: ['1', '2', '4'],
    arrows: [
      { from: '2', to: '1' },
      { from: '2', to: '2' },
      { from: '3', to: '1' },
      { from: '4', to: '1' },
      { from: '4', to: '2' },
      { from: '4', to: '4' },
    ],
    isFunction: false,
    reason: 'NEM FÜGGVÉNY: A 2-esből és a 4-esből is több nyíl indul ki (többértelmű kapcsolat).',
  },
  {
    id: 'function-constant',
    name: '3. Több az egyhez (Konstans jellegű függvény)',
    description: 'Minden számhoz a 0-t rendeljük (vagy pl. négyzethez a 4-et: -2 és 2 is 4-re mutat).',
    domain: ['-2', '-1', '1', '2'],
    codomain: ['1', '4'],
    arrows: [
      { from: '-2', to: '4' },
      { from: '-1', to: '1' },
      { from: '1', to: '1' },
      { from: '2', to: '4' },
    ],
    isFunction: true,
    reason: 'FÜGGVÉNY: Minden A-beli elemből csak 1 nyíl indul ki! Az megengedett, hogy több nyíl ugyanoda érkezzen.',
  },
  {
    id: 'bijection',
    name: '4. Kölcsönösen egyértelmű hozzárendelés',
    description: 'Minden országhoz pontosan egy főváros tartozik, és minden fővároshoz pontosan egy ország.',
    domain: ['Magyarország', 'Ausztria', 'Olaszország'],
    codomain: ['Budapest', 'Bécs', 'Róma'],
    arrows: [
      { from: 'Magyarország', to: 'Budapest' },
      { from: 'Ausztria', to: 'Bécs' },
      { from: 'Olaszország', to: 'Róma' },
    ],
    isFunction: true,
    reason: 'KÖLCSÖNÖSEN EGYÉRTELMŰ: Nemcsak minden bemenetnek van pontosan egy képe, de a célhalmaz elemeihez is pontosan egy nyíl érkezik.',
  },
];

export const SetRelationsTheory: React.FC<SetRelationsTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedExampleIndex, setSelectedExampleIndex] = useState(0);
  const activeExample = PRESET_MAPPINGS[selectedExampleIndex];

  const sections: TheorySection[] = [
    {
      id: 'hozzarendeles-alapjai',
      title: '1. A hozzárendelés fogalma és a halmazok',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A mindennapi életben és a matematikában is lépten-nyomon kapcsolatokat teremtünk dolgok között:
            minden tanulóhoz rendelünk egy naplósorszámot, minden országhoz egy fővárost, minden vásárolt termékhez egy árat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <Card className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 rounded-2xl">
              <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">A</span>
                Értelmezési tartomány (Alaphalmaz)
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Azon elemek összessége, <strong>amelyekből a hozzárendelés kiindul</strong>.
                Jelölése gyakran: <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-blue-700 dark:text-blue-300">É.T.</code> vagy <code className="font-mono font-bold">D</code> (domain).
                Az $x$ független változók innen kerülnek ki.
              </p>
            </Card>

            <Card className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 rounded-2xl">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-1 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">B</span>
                Értékkészlet (Képhalmaz)
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Azon elemek összessége, <strong>amelyekhez a nyilak érkeznek</strong> (a felvett értékek).
                Jelölése gyakran: <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-700 dark:text-emerald-300">É.K.</code> vagy <code className="font-mono font-bold">R</code> (range).
                Az $y = f(x)$ függő változók tartoznak ide.
              </p>
            </Card>
          </div>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Info className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong>A hozzárendelés szabálya:</strong> az az utasítás, képlet, táblázat vagy összefüggés, amely megmondja,
              hogy a kiindulási halmaz melyik eleméhez a képhalmaz melyik elemét kell párosítani.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'fuggveny-fogalma',
      title: '2. Mikor nevezünk egy hozzárendelést FÜGGVÉNYNEK?',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A függvény a matematika egyik legfontosabb alapfogalma. De nem minden hozzárendelés függvény!
          </p>

          <div className="p-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/40 border-2 border-teal-300 dark:border-teal-700 rounded-2xl shadow-sm">
            <h4 className="font-black text-teal-950 dark:text-teal-200 text-base mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              A Függvény aranyszabálya:
            </h4>
            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
              Egy hozzárendelést akkor és csakis akkor nevezünk <strong>függvénynek</strong>, ha az értelmezési tartomány
              <span className="text-teal-700 dark:text-teal-300 font-black"> minden egyes eleméhez</span> a képhalmaz
              <span className="text-teal-700 dark:text-teal-300 font-black"> pontosan egyetlen eleme</span> tartozik!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> FÜGGVÉNY esetén megengedett:
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                <li>Több kiindulási elem is mutathat <strong>ugyanarra</strong> a célra (pl. $x \to x^2$: $-3 \to 9$ és $3 \to 9$).</li>
                <li>A képhalmazban maradhatnak olyan elemek, amelyekhez <strong>nem mutat nyíl</strong>.</li>
              </ul>
            </div>

            <div className="p-4 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-xl space-y-2">
              <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 text-sm">
                <XCircle className="w-4 h-4 text-rose-600" /> NEM FÜGGVÉNY, ha:
              </div>
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 list-disc list-inside space-y-1">
                <li>Bármelyik kiinduló elemből <strong>több mint 1 nyíl</strong> indul ki (többértelmű).</li>
                <li>Az alaphalmaz valamelyik eleméhez <strong>nem tartozik semmi</strong> (nem értelmezett).</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tipusok',
      title: '3. Hozzárendelések típusai (Egyértelmű, többértelmű, kölcsönösen egyértelmű)',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            A kapcsolatok sokféleségét a nyilak iránya és száma alapján csoportosíthatjuk:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse rounded-xl overflow-hidden shadow-2xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  <th className="p-3 font-bold border-b">Típus</th>
                  <th className="p-3 font-bold border-b">Jellemző</th>
                  <th className="p-3 font-bold border-b">Függvény-e?</th>
                  <th className="p-3 font-bold border-b">Példa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-semibold text-blue-700 dark:text-blue-400">Egyértelmű</td>
                  <td className="p-3">Minden kiinduló elemből 1 nyíl indul ki.</td>
                  <td className="p-3 font-bold text-emerald-600">IGEN</td>
                  <td className="p-3 font-mono">x → 2x + 1</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-semibold text-purple-700 dark:text-purple-400">Kölcsönösen egyértelmű</td>
                  <td className="p-3">Minden bemenethez 1 kép, és minden képhez pontosan 1 bemenet tartozik.</td>
                  <td className="p-3 font-bold text-emerald-600">IGEN (bijekció)</td>
                  <td className="p-3 font-mono">Ország → Főváros</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                  <td className="p-3 font-semibold text-rose-700 dark:text-rose-400">Többértelmű</td>
                  <td className="p-3">Legalább egy elemből 2 vagy több nyíl indul ki.</td>
                  <td className="p-3 font-bold text-rose-600">NEM</td>
                  <td className="p-3 font-mono">Szám → Osztói</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'interaktiv-labor',
      title: '4. Interaktív Nyíldiagram Vizsgáló Labor',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Válassz ki egy példát alább, és figyeld meg a nyíldiagramot! Értékeld, hogy miért minősül függvénynek vagy miért nem.
          </p>

          <div className="flex flex-wrap gap-2 mb-2">
            {PRESET_MAPPINGS.map((ex, idx) => (
              <Button
                key={ex.id}
                size="sm"
                variant={selectedExampleIndex === idx ? 'default' : 'outline'}
                onClick={() => setSelectedExampleIndex(idx)}
                className={`rounded-xl text-xs font-bold transition-all ${
                  selectedExampleIndex === idx
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {ex.name}
              </Button>
            ))}
          </div>

          <Card className="p-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
            <div className="mb-4">
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                {activeExample.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{activeExample.description}</p>
            </div>

            {/* SVG Arrow Diagram */}
            <div className="w-full flex justify-center py-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
              <svg viewBox="0 0 500 240" className="w-full max-w-[480px] h-auto select-none">
                <defs>
                  <marker
                    id="arrowhead-blue"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#2563eb" />
                  </marker>
                  <marker
                    id="arrowhead-emerald"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#059669" />
                  </marker>
                  <marker
                    id="arrowhead-rose"
                    markerWidth="8"
                    markerHeight="6"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#e11d48" />
                  </marker>
                </defs>

                {/* Set A Venn ellipse */}
                <ellipse cx="110" cy="120" rx="75" ry="95" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
                <text x="110" y="45" textAnchor="middle" fill="#1d4ed8" fontSize="13" fontWeight="bold">
                  A (Értelmezési tartomány)
                </text>

                {/* Set B Venn ellipse */}
                <ellipse cx="390" cy="120" rx="75" ry="95" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
                <text x="390" y="45" textAnchor="middle" fill="#047857" fontSize="13" fontWeight="bold">
                  B (Értékkészlet)
                </text>

                {/* Elements of A */}
                {activeExample.domain.map((item, i) => {
                  const total = activeExample.domain.length;
                  const step = 150 / (total + 1);
                  const y = 65 + (i + 1) * step;
                  return (
                    <g key={`dom-${item}-${i}`}>
                      <circle cx="140" cy={y} r="4" fill="#2563eb" />
                      <text x="125" y={y + 4} textAnchor="end" fill="#1e293b" fontSize="11" fontWeight="bold">
                        {item}
                      </text>
                    </g>
                  );
                })}

                {/* Elements of B */}
                {activeExample.codomain.map((item, i) => {
                  const total = activeExample.codomain.length;
                  const step = 150 / (total + 1);
                  const y = 65 + (i + 1) * step;
                  return (
                    <g key={`codom-${item}-${i}`}>
                      <circle cx="360" cy={y} r="4" fill="#059669" />
                      <text x="375" y={y + 4} textAnchor="start" fill="#1e293b" fontSize="11" fontWeight="bold">
                        {item}
                      </text>
                    </g>
                  );
                })}

                {/* Arrows */}
                {activeExample.arrows.map((arr, i) => {
                  const fromIdx = activeExample.domain.indexOf(arr.from);
                  const toIdx = activeExample.codomain.indexOf(arr.to);
                  const totalFrom = activeExample.domain.length;
                  const totalTo = activeExample.codomain.length;
                  const y1 = 65 + (fromIdx + 1) * (150 / (totalFrom + 1));
                  const y2 = 65 + (toIdx + 1) * (150 / (totalTo + 1));
                  const arrowColor = activeExample.isFunction ? '#2563eb' : '#e11d48';
                  const markerId = activeExample.isFunction ? 'arrowhead-blue' : 'arrowhead-rose';

                  return (
                    <line
                      key={`arrow-${arr.from}-${arr.to}-${i}`}
                      x1="145"
                      y1={y1}
                      x2="352"
                      y2={y2}
                      stroke={arrowColor}
                      strokeWidth="2"
                      markerEnd={`url(#${markerId})`}
                      strokeDasharray={activeExample.isFunction ? 'none' : '4,2'}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Verdict Box */}
            <div
              className={`mt-4 p-4 rounded-2xl border ${
                activeExample.isFunction
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
              }`}
            >
              <div className="font-bold text-sm sm:text-base flex items-center gap-2 mb-1">
                {activeExample.isFunction ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
                <span>{activeExample.reason}</span>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <TheoryTemplate
      badgeText="7. OSZTÁLY • VIII. HOZZÁRENDELÉSEK, STATISZTIKA • 📖 1. LECKE"
      title="1. Két halmaz közötti hozzárendelések"
      subtitle="Alaphalmaz, képhalmaz, nyíldiagramok és a függvény alapfogalma"
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceButtonText="Gyakorló Kvíz indítása"
      ruleTitle="A Függvény Alapszabálya"
      ruleFormula="f: A \to B \iff \forall x \in A \implies \exists! y \in B"
      quickRule={{
        label: "Aranyszabály: Minden x-hez pontosan egy y",
        formula: "Függvény = minden kiinduló elemből pontosan EGY nyíl indul ki!"
      }}
      selfCheckQuestions={[
        {
          id: 'sc-1',
          question: 'Mi a feltétele annak, hogy egy hozzárendelés függvény legyen?',
          options: [
            'A célhalmaz minden eleméhez kell, hogy nyíl érkezzen.',
            'Az értelmezési tartomány minden egyes eleméhez pontosan egy képelem tartozik.',
            'Ugyanannyi elemnek kell lennie a két halmazban.',
            'Csak számok között lehet függvény.'
          ],
          correctAnswer: 1,
          explanation: 'A függvény definíciója szerint az alaphalmaz (értelmezési tartomány) minden egyes eleméhez a képhalmaz pontosan egyetlen eleme kell hogy tartozzon.'
        },
        {
          id: 'sc-2',
          question: 'Függvény-e az a hozzárendelés, ahol az értelmezési tartomány a pozitív egész számok, és minden számhoz a prímosztóit rendeljük hozzá?',
          options: [
            'Igen, mert minden számnak vannak osztói.',
            'Nem, mert egy számnak (pl. 6-nak a 2 és 3) több prímosztója is van, így többértelmű.',
            'Csak akkor, ha páratlan számokból indulunk ki.',
            'Igen, ha a prímszámokhoz csak 1 nyíl tartozik.'
          ],
          correctAnswer: 1,
          explanation: 'Például a 6-hoz a 2 és a 3 prímosztó is hozzá lenne rendelve. Mivel egyetlen bemenethez több kimenet tartozna, a hozzárendelés többértelmű, tehát NEM függvény!'
        },
        {
          id: 'sc-3',
          question: 'Lehet-e függvény egy olyan hozzárendelés, ahol két különböző kiindulási elem ugyanarra a cél-elemre mutat?',
          options: [
            'Nem, mert az már többértelmű hozzárendelés.',
            'Igen, ez megengedett (pl. f(x) = x² esetén f(-2) = 4 és f(2) = 4).',
            'Csak negatív számok esetén lehetséges.',
            'Csak ha a célhalmaz üres halmaz.'
          ],
          correctAnswer: 1,
          explanation: 'Igen! A függvény szabálya csak azt köti ki, hogy egy kiinduló elemből hány nyíl indulhat ki (pontosan egy). Az teljesen megengedett, hogy több nyíl ugyanabba a célpontba fusson be.'
        },
        {
          id: 'sc-4',
          question: 'Hogyan nevezzük azt a halmazt, amelyből a hozzárendelés kiindul?',
          options: [
            'Értékkészletnek',
            'Értelmezési tartománynak (alaphalmaznak)',
            'Üres halmaznak',
            'Képhalmaznak'
          ],
          correctAnswer: 1,
          explanation: 'A kiindulási elemek halmaza az értelmezési tartomány (D), míg az elérhető, felvett értékek halmaza az értékkészlet (R).'
        }
      ]}
    />
  );
};

export default SetRelationsTheory;
