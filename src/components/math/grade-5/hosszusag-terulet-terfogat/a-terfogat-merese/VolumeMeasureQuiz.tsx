import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { VolumeMeasureMatcher } from './VolumeMeasureMatcher';
import { VolumeMeasureSorter } from './VolumeMeasureSorter';

export interface VolumeMeasureQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const VOLUME_MEASURE_QUESTIONS: Question[] = [
  // =========================================================================
  // 1. SZINT: ALAPFOGALMAK, EGYSÉGKOCKÁK, VÁLTÓSZÁMOK ÉS ARANYSZABÁLYOK (1-10)
  // =========================================================================
  {
    id: 'vmq1-1',
    level: 1,
    prompt: 'Mi a térfogat szokásos betűjele a matematikában és fizikában?',
    options: [
      'V (a latin volumen szóból)',
      'T (mint terület)',
      'A (mint alsó lap)',
      'K (mint kerület)'
    ],
    correctAnswer: 0,
    explanation: 'A térfogat hivatalos jele a V, amely a latin „volumen” (kiterjedés, térfogat) szóból ered.',
    hint: 'A kerület K, a terület T, a térfogat...',
    breakdown: [
      { label: 'Mennyiség neve', value: 'Térfogat (köbtartalom)' },
      { label: 'Hivatalos betűjele', value: 'V' },
      { label: 'Eredete', value: 'Latin „volumen”' }
    ]
  },
  {
    id: 'vmq1-2',
    level: 1,
    prompt: 'Hány darab 1 cm³-es kiskockából áll az ábrán látható test, ha 3 kocka hosszú, 2 kocka széles és 2 réteg magas?',
    options: [
      '12 darab',
      '10 darab',
      '8 darab',
      '16 darab'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-40 h-32 mx-auto" viewBox="0 0 140 100">
        <rect x="25" y="40" width="60" height="40" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
        <polygon points="25,40 55,20 115,20 85,40" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" />
        <polygon points="85,40 115,20 115,60 85,80" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1.5" />
        {/* Rácsvonalak: 3 oszlop, 2 sor */}
        <line x1="45" y1="40" x2="45" y2="80" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="65" y1="40" x2="65" y2="80" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="25" y1="60" x2="85" y2="60" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,2" />
        <text x="70" y="94" textAnchor="middle" className="text-[10px] font-black fill-cyan-950">3 × 2 × 2 = 12 kocka</text>
      </svg>
    ),
    explanation: 'Az alsó rétegben 3 · 2 = 6 darab kiskocka van. Mivel 2 ilyen réteg van egymáson, összesen: 6 · 2 = 12 darab egységkockából áll a test.',
    hint: 'Számold ki az alsó réteget (3 · 2), majd szorozd meg a magassággal (2 réteg)!',
    breakdown: [
      { label: 'Egy réteg kiskockái (3 · 2)', value: '6 darab' },
      { label: 'Rétegek száma', value: '2 réteg' },
      { label: 'Összes kocka száma (6 · 2)', value: '12 darab' }
    ]
  },
  {
    id: 'vmq1-3',
    level: 1,
    prompt: 'Mennyi a szomszédos köbmértékek (mm³, cm³, dm³, m³) váltószáma?',
    options: [
      '1000',
      '10',
      '100',
      '60'
    ],
    correctAnswer: 0,
    explanation: 'Mivel a test mind a 3 kiterjedésében 10-szeresére nő a hosszúság, a térfogat 10 · 10 · 10 = 1000-szeresére növekszik.',
    hint: 'Hosszúságnál 10, területnél 100, térfogatnál (3 dimenzióban)...',
    breakdown: [
      { label: '1 dimenzió (hosszúság)', value: '10' },
      { label: '2 dimenzió (terület)', value: '10 · 10 = 100' },
      { label: '3 dimenzió (térfogat)', value: '10 · 10 · 10 = 1000' }
    ]
  },
  {
    id: 'vmq1-4',
    level: 1,
    prompt: 'Hány cm³ (köbcentiméter) van 1 dm³-ben (köbdeciméterben)?',
    options: [
      '1000 cm³',
      '100 cm³',
      '10 cm³',
      '10 000 cm³'
    ],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm, így 1 dm³ = 10 cm · 10 cm · 10 cm = 1000 cm³.',
    hint: 'Gondolj a váltószámra: köbmértékeknél mindig 1000 a szorzó!',
    breakdown: [
      { label: '1 dm hossza cm-ben', value: '10 cm' },
      { label: '1 dm³ térfogata', value: '10 cm · 10 cm · 10 cm' },
      { label: 'Eredmény', value: '1000 cm³' }
    ]
  },
  {
    id: 'vmq1-5',
    level: 1,
    prompt: 'Mi az űrmérték (folyadékok térfogatának) alapegysége?',
    options: [
      'Liter (l)',
      'Köbméter (m³)',
      'Deciliter (dl)',
      'Kilogramm (kg)'
    ],
    correctAnswer: 0,
    explanation: 'Az űrmérték hivatalos alapegysége a liter (jele: l vagy L). A deciliter, centiliter, milliliter a részei, a hektoliter a többszöröse.',
    hint: 'A tejet és ásványvizet ebben az alapegységben mérjük.',
    breakdown: [
      { label: 'Mértékfajta', value: 'Űrmérték' },
      { label: 'Hivatalos alapegység', value: 'Liter (l)' }
    ]
  },
  {
    id: 'vmq1-6',
    level: 1,
    prompt: 'Hány deciliter (dl) van 1 literben?',
    options: [
      '10 dl',
      '100 dl',
      '1000 dl',
      '2 dl'
    ],
    correctAnswer: 0,
    explanation: 'A „deci-” előtag tizedrészt jelent, tehát 1 liter pontosan 10 deciliterből áll.',
    hint: '1 liter tej hány 1 deciliteres poharat töltene meg?',
    breakdown: [
      { label: 'Deci jelentése', value: 'Tizedrész (1/10)' },
      { label: '1 literben lévő dl', value: '10 dl' }
    ]
  },
  {
    id: 'vmq1-7',
    level: 1,
    prompt: '1. FŐ ARANYSZABÁLY: Hány liter víz fér pontosan egy 1 dm³ belső térfogatú kockába?',
    options: [
      'Pontosan 1 liter',
      '10 liter',
      '0,1 liter',
      '100 liter'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-32 mx-auto" viewBox="0 0 120 100">
        <rect x="25" y="35" width="50" height="50" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
        <polygon points="25,35 45,15 95,15 75,35" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" />
        <polygon points="75,35 95,15 95,65 75,85" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1.5" />
        <text x="50" y="65" textAnchor="middle" className="text-[11px] font-black fill-cyan-900">1 dm³</text>
        <text x="60" y="96" textAnchor="middle" className="text-[10px] font-bold fill-cyan-950">= 1 LITER VÍZ</text>
      </svg>
    ),
    explanation: 'Ez a legfontosabb kapcsoló szabály: 1 dm³ térfogat pontosan egyenlő 1 literrel (1 dm³ = 1 l).',
    hint: 'A köbdeciméter és a liter tökéletesen megegyezik egymással!',
    breakdown: [
      { label: 'Köbdeciméter', value: '1 dm³' },
      { label: 'Megfelelője űrmértékben', value: '1 liter' },
      { label: 'Azonosság', value: '1 dm³ = 1 l' }
    ]
  },
  {
    id: 'vmq1-8',
    level: 1,
    prompt: '2. KIS ARANYSZABÁLY: Hány milliliter (ml) folyadék fér egy 1 cm³ méretű kis kockába?',
    options: [
      '1 ml',
      '10 ml',
      '100 ml',
      '0,1 ml'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 dm³ = 1000 cm³ és 1 liter = 1000 ml, ezért a kettő ezredrésze is megegyezik: 1 cm³ = 1 ml.',
    hint: 'Egy köbcentiméter pontosan egy milliliter folyadéknak felel meg.',
    breakdown: [
      { label: '1 dm³ ezredrésze', value: '1 cm³' },
      { label: '1 liter ezredrésze', value: '1 ml' },
      { label: 'Összefüggés', value: '1 cm³ = 1 ml' }
    ]
  },
  {
    id: 'vmq1-9',
    level: 1,
    prompt: 'Hány liter folyadékot tartalmaz 1 hektoliter (hl)?',
    options: [
      '100 litert',
      '10 litert',
      '1000 litert',
      '50 litert'
    ],
    correctAnswer: 0,
    explanation: 'A „hekto-” előtag százszorost jelent (görög hekaton szóból), így 1 hl = 100 liter.',
    hint: 'Gondolj a hektárra vagy a hekto előtagra: százszoros szorzó.',
    breakdown: [
      { label: 'Hekto előtag jelentése', value: '100-szoros' },
      { label: '1 hektoliter értéke', value: '100 liter' }
    ]
  },
  {
    id: 'vmq1-10',
    level: 1,
    prompt: 'Egy doboz méretei: 4 cm hosszú, 3 cm széles, 2 cm magas. Hány darab 1 cm³-es kiskocka fér el benne pontosan?',
    options: [
      '24 darab',
      '9 darab',
      '14 darab',
      '48 darab'
    ],
    correctAnswer: 0,
    explanation: 'Az alsó rétegben 4 · 3 = 12 kiskocka fér el. A magasság 2 cm, tehát 2 réteg rakható be: 12 · 2 = 24 darab kiskocka.',
    hint: 'Szorozd össze a három élt: 4 · 3 · 2.',
    breakdown: [
      { label: 'Alsó réteg', value: '4 · 3 = 12 db' },
      { label: 'Magasság (rétegek)', value: '2 réteg' },
      { label: 'Összes kiskocka', value: '12 · 2 = 24 db' }
    ]
  },

  // =========================================================================
  // 2. SZINT: ÖSSZETETTEBB ÁTVÁLTÁSOK ÉS NAPI GYAKORLAT (11-20)
  // =========================================================================
  {
    id: 'vmq2-1',
    level: 2,
    prompt: '3. NAGY ARANYSZABÁLY: Egy 1 m³-es óriáskockába hány liter víz fér?',
    options: [
      '1000 liter (= 10 hl)',
      '100 liter',
      '10 liter',
      '10 000 liter'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-36 h-32 mx-auto" viewBox="0 0 120 100">
        <rect x="25" y="35" width="50" height="50" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <polygon points="25,35 45,15 95,15 75,35" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.5" />
        <polygon points="75,35 95,15 95,65 75,85" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
        <text x="50" y="65" textAnchor="middle" className="text-[11px] font-black fill-sky-950">1 m³</text>
        <text x="60" y="96" textAnchor="middle" className="text-[10px] font-bold fill-sky-900">= 1000 LITER</text>
      </svg>
    ),
    explanation: '1 m³ = 1000 dm³. Mivel 1 dm³ = 1 liter, így 1 m³ = 1000 liter = 10 hektoliter (ennek a víznek a tömege kereken 1000 kg, azaz 1 tonna!).',
    hint: '1 m³ hány dm³? És 1 dm³ hány liter?',
    breakdown: [
      { label: '1 m³ köbdeciméterben', value: '1000 dm³' },
      { label: 'Mivel 1 dm³ = 1 l', value: '1000 liter' },
      { label: 'Hektoliterben (1000 : 100)', value: '10 hl' }
    ]
  },
  {
    id: 'vmq2-2',
    level: 2,
    prompt: '2,5 liter gyümölcslé hány deciliter (dl)?',
    options: [
      '25 dl',
      '250 dl',
      '2,5 dl',
      '0,25 dl'
    ],
    correctAnswer: 0,
    explanation: 'Mivel 1 liter = 10 dl, nagyobb egységből kisebbe szorzunk: 2,5 · 10 = 25 dl.',
    hint: 'Szorozz 10-zel: a tizedesvessző egy hellyel jobbra tolódik.',
    breakdown: [
      { label: 'Kezdő érték', value: '2,5 l' },
      { label: 'Váltószám', value: '· 10' },
      { label: 'Eredmény', value: '25 dl' }
    ]
  },
  {
    id: 'vmq2-3',
    level: 2,
    prompt: '3500 cm³ hány dm³ (köbdeciméter)?',
    options: [
      '3,5 dm³',
      '35 dm³',
      '0,35 dm³',
      '350 dm³'
    ],
    correctAnswer: 0,
    explanation: 'Kisebb egységből nagyobba váltunk, ezért osztunk 1000-rel: 3500 : 1000 = 3,5 dm³ (ami egyben 3,5 liter is).',
    hint: 'Köbmértékeknél a váltószám 1000. Oszd el 1000-rel!',
    breakdown: [
      { label: 'Kezdő érték', value: '3500 cm³' },
      { label: 'Váltószám', value: ': 1000' },
      { label: 'Eredmény', value: '3,5 dm³ (= 3,5 liter)' }
    ]
  },
  {
    id: 'vmq2-4',
    level: 2,
    prompt: '40 dl víz hány liter, és ez hány dm³-nek felel meg?',
    options: [
      '4 liter, ami 4 dm³',
      '40 liter, ami 40 dm³',
      '4 liter, ami 40 dm³',
      '0,4 liter, ami 0,4 dm³'
    ],
    correctAnswer: 0,
    explanation: '40 dl : 10 = 4 liter. Mivel 1 liter = 1 dm³, ez pontosan 4 dm³.',
    hint: 'Először váltsd át literre (40 : 10), majd használd az aranyszabályt!',
    breakdown: [
      { label: 'Deciliter átváltása literbe', value: '40 dl : 10 = 4 l' },
      { label: 'Liter átváltása dm³-be', value: '4 l = 4 dm³' }
    ]
  },
  {
    id: 'vmq2-5',
    level: 2,
    prompt: 'Egy boroshordóban 500 liter bor van. Hány hektoliter (hl) ez a mennyiség?',
    options: [
      '5 hl',
      '50 hl',
      '0,5 hl',
      '5000 hl'
    ],
    correctAnswer: 0,
    explanation: '1 hl = 100 liter. Literből hektoliterbe osztunk 100-zal: 500 : 100 = 5 hl.',
    hint: 'Hány darab 100 liter fér bele 500 literbe?',
    breakdown: [
      { label: 'Kezdő érték', value: '500 l' },
      { label: 'Váltószám hl-be', value: ': 100' },
      { label: 'Hektoliterben', value: '5 hl' }
    ]
  },
  {
    id: 'vmq2-6',
    level: 2,
    prompt: '75 cl üdítő hány milliliter (ml)?',
    options: [
      '750 ml',
      '75 ml',
      '7,5 ml',
      '7500 ml'
    ],
    correctAnswer: 0,
    explanation: '1 cl = 10 ml. Így 75 cl = 75 · 10 = 750 ml (ez háromnegyed liternek felel meg).',
    hint: 'Centiliter és milliliter között 10 a váltószám.',
    breakdown: [
      { label: 'Kezdő érték', value: '75 cl' },
      { label: 'Váltószám ml-be', value: '· 10' },
      { label: 'Eredmény', value: '750 ml' }
    ]
  },
  {
    id: 'vmq2-7',
    level: 2,
    prompt: 'Egy akváriumba 60 liter víz fér. Hány dm³ az akvárium belső térfogata?',
    options: [
      '60 dm³',
      '600 dm³',
      '6 dm³',
      '60 000 dm³'
    ],
    correctAnswer: 0,
    explanation: 'Az aranyszabály szerint 1 liter = 1 dm³, ezért 60 liter víz pontosan 60 dm³ térfogatú üreget tölt ki.',
    hint: 'A liter és a dm³ között 1:1 a váltás!',
    breakdown: [
      { label: 'Víz mennyisége', value: '60 liter' },
      { label: 'Aranyszabály (1 l = 1 dm³)', value: '60 l = 60 dm³' }
    ]
  },
  {
    id: 'vmq2-8',
    level: 2,
    prompt: '0,8 m³ hány dm³ (köbdeciméter)?',
    options: [
      '800 dm³',
      '80 dm³',
      '8 dm³',
      '8000 dm³'
    ],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 dm³. Nagyobból kisebbe szorzunk 1000-rel: 0,8 · 1000 = 800 dm³.',
    hint: 'Szorozz 1000-rel: a tizedesvessző 3 hellyel jobbra ugrik.',
    breakdown: [
      { label: 'Kezdő érték', value: '0,8 m³' },
      { label: 'Váltószám', value: '· 1000' },
      { label: 'Eredmény', value: '800 dm³ (= 800 liter)' }
    ]
  },
  {
    id: 'vmq2-9',
    level: 2,
    prompt: 'Egy bögre tea térfogata 5 dl. Hány cm³ ez a térfogat?',
    options: [
      '500 cm³',
      '50 cm³',
      '5 cm³',
      '5000 cm³'
    ],
    correctAnswer: 0,
    explanation: '5 dl = 0,5 liter = 0,5 dm³. Mivel 1 dm³ = 1000 cm³, ezért 0,5 · 1000 = 500 cm³ (vagy 5 dl = 500 ml = 500 cm³).',
    hint: 'Gondolj a milliliterre: 5 dl = 500 ml. És 1 ml = 1 cm³!',
    breakdown: [
      { label: '5 dl milliliterben', value: '500 ml' },
      { label: 'Mivel 1 ml = 1 cm³', value: '500 cm³' }
    ]
  },
  {
    id: 'vmq2-10',
    level: 2,
    prompt: 'Az egyik kancsóban 1,2 liter, a másikban 8 dl víz van. Mennyi víz van a kettőben összesen deciliterben?',
    options: [
      '20 dl',
      '9,2 dl',
      '12,8 dl',
      '200 dl'
    ],
    correctAnswer: 0,
    explanation: '1,2 liter = 12 dl. Összesen: 12 dl + 8 dl = 20 dl (ami éppen 2 liter).',
    hint: 'Váltsd át az 1,2 litert deciliterre (12 dl), majd add hozzá a 8 dl-t!',
    breakdown: [
      { label: '1,2 liter deciliterben', value: '12 dl' },
      { label: 'Másik kancsó', value: '8 dl' },
      { label: 'Összegük', value: '12 + 8 = 20 dl (= 2 l)' }
    ]
  },

  // =========================================================================
  // 3. SZINT: SZÖVEGES FELADATOK, NAGYSÁGRENDEK ÉS KÉTLÉPÉSES VÁLTÁSOK (21-30)
  // =========================================================================
  {
    id: 'vmq3-1',
    level: 3,
    prompt: 'Egy fürdőkádba 180 liter meleg vizet engedünk. Hány hektoliter (hl) víz van a kádban?',
    options: [
      '1,8 hl',
      '18 hl',
      '0,18 hl',
      '1800 hl'
    ],
    correctAnswer: 0,
    explanation: '1 hl = 100 liter. Ezért a litert el kell osztanunk 100-zal: 180 : 100 = 1,8 hl.',
    hint: '100 liter az 1 hl. Akkor 180 liter...',
    breakdown: [
      { label: 'Víz térfogata', value: '180 l' },
      { label: 'Átváltás hektoliterbe (: 100)', value: '180 : 100 = 1,8 hl' }
    ]
  },
  {
    id: 'vmq3-2',
    level: 3,
    prompt: 'Egy kerti medencébe 12 m³ víz fér. Hány hektoliter (hl) ez a mennyiség?',
    options: [
      '120 hl',
      '12 hl',
      '1200 hl',
      '1,2 hl'
    ],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 liter = 10 hl. Így 12 m³ = 12 · 10 = 120 hl (literben: 12 000 liter).',
    hint: '1 m³ = 10 hl. Akkor 12 m³ hány hektoliter?',
    breakdown: [
      { label: '12 m³ literben', value: '12 000 liter' },
      { label: 'Átváltás hektoliterbe (: 100)', value: '12 000 : 100 = 120 hl' }
    ]
  },
  {
    id: 'vmq3-3',
    level: 3,
    prompt: 'Egy orvosi szirupos üvegben 1,5 dl köhögéscsillapító van. Hány adag 5 ml-es kanállal lehet kimérni belőle?',
    options: [
      '30 adag',
      '15 adag',
      '20 adag',
      '3 adag'
    ],
    correctAnswer: 0,
    explanation: '1,5 dl = 15 cl = 150 ml. Az adagok száma: 150 ml : 5 ml = 30 adag.',
    hint: 'Először váltsd át az 1,5 dl-t milliliterre (150 ml), majd oszd el 5-tel!',
    breakdown: [
      { label: 'Üveg űrtartalma ml-ben', value: '1,5 dl = 150 ml' },
      { label: 'Egy adag mérete', value: '5 ml' },
      { label: 'Adagok száma (150 : 5)', value: '30 adag' }
    ]
  },
  {
    id: 'vmq3-4',
    level: 3,
    prompt: 'Egy teherautó 4,5 m³ építési homokot szállít. Hány dm³ ez a térfogat?',
    options: [
      '4500 dm³',
      '450 dm³',
      '45 dm³',
      '45 000 dm³'
    ],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 dm³. Ezért 4,5 · 1000 = 4500 dm³.',
    hint: 'Szorozz 1000-rel!',
    breakdown: [
      { label: 'Homok térfogata', value: '4,5 m³' },
      { label: 'Váltószám dm³-be', value: '· 1000' },
      { label: 'Eredmény', value: '4500 dm³' }
    ]
  },
  {
    id: 'vmq3-5',
    level: 3,
    prompt: 'Egy fazékban 2 liter víz volt. Először kiöntöttek 350 ml-t, majd még 4 dl-t. Hány milliliter víz maradt a fazékban?',
    options: [
      '1250 ml',
      '1450 ml',
      '1650 ml',
      '1050 ml'
    ],
    correctAnswer: 0,
    explanation: '2 liter = 2000 ml. 4 dl = 400 ml. Kiöntöttek összesen: 350 + 400 = 750 ml-t. Maradt: 2000 - 750 = 1250 ml.',
    hint: 'Válts át mindent milliliterre: 2 liter = 2000 ml, 4 dl = 400 ml.',
    breakdown: [
      { label: 'Kezdő vízmennyiség', value: '2 liter = 2000 ml' },
      { label: 'Kiöntött víz (350 ml + 400 ml)', value: '750 ml' },
      { label: 'Maradék (2000 - 750)', value: '1250 ml (= 1,25 l)' }
    ]
  },
  {
    id: 'vmq3-6',
    level: 3,
    prompt: 'Egy téglatest alakú tartály belső méretei: 50 cm hosszú, 40 cm széles és 30 cm magas. Hány liter víz fér el benne?',
    options: [
      '60 liter',
      '600 liter',
      '6 liter',
      '60 000 liter'
    ],
    correctAnswer: 0,
    explanation: 'Érdemes rögtön dm-re váltani az éleket: 5 dm, 4 dm, 3 dm. Térfogat: 5 · 4 · 3 = 60 dm³. Mivel 1 dm³ = 1 liter, pontosan 60 liter víz fér bele.',
    hint: 'Váltsd át az éleket dm-re (5 dm, 4 dm, 3 dm), majd szorozd össze őket!',
    breakdown: [
      { label: 'Méretek dm-ben', value: 'a = 5 dm, b = 4 dm, c = 3 dm' },
      { label: 'Térfogat (5 · 4 · 3)', value: '60 dm³' },
      { label: 'Vízmennyiség literben', value: '60 liter' }
    ]
  },
  {
    id: 'vmq3-7',
    level: 3,
    prompt: 'Egy csepegő csapból percenként 5 ml víz vész kárba. Hány deciliter (dl) víz folyik el 1 óra (60 perc) alatt?',
    options: [
      '3 dl',
      '30 dl',
      '0,3 dl',
      '300 dl'
    ],
    correctAnswer: 0,
    explanation: '1 óra alatt: 60 · 5 ml = 300 ml. Mivel 100 ml = 1 dl (mert 1 dl = 10 cl = 100 ml), így 300 ml = 3 dl víz vész el.',
    hint: 'Előbb számold ki a millilitereket (60 · 5 = 300 ml), majd váltsd át deciliterre!',
    breakdown: [
      { label: '1 óra alatt elvesző víz', value: '60 perc · 5 ml = 300 ml' },
      { label: 'Átváltás deciliterbe', value: '300 ml : 100 = 3 dl' }
    ]
  },
  {
    id: 'vmq3-8',
    level: 3,
    prompt: 'Melyik mennyiség a NAGYOBB: 0,03 m³ vagy 25 liter?',
    options: [
      '0,03 m³ a nagyobb (mert az 30 liter)',
      '25 liter a nagyobb',
      'Pontosan egyenlőek',
      'Nem összehasonlíthatóak'
    ],
    correctAnswer: 0,
    explanation: '0,03 m³ = 0,03 · 1000 dm³ = 30 dm³ = 30 liter. Mivel 30 liter > 25 liter, ezért a 0,03 m³ a nagyobb.',
    hint: 'Váltsd át a köbmétert literre (szorozz 1000-rel)!',
    breakdown: [
      { label: '0,03 m³ literben', value: '0,03 · 1000 = 30 liter' },
      { label: 'Összehasonlítás', value: '30 liter > 25 liter' },
      { label: 'Különbség', value: '0,03 m³ 5 literrel több' }
    ]
  },
  {
    id: 'vmq3-9',
    level: 3,
    prompt: 'Egy 2 literes kancsóba 6 dl narancslevet és 80 cl ásványvizet öntünk. Hány milliliter (ml) hiányzik még, hogy teljesen tele legyen?',
    options: [
      '600 ml',
      '400 ml',
      '800 ml',
      '200 ml'
    ],
    correctAnswer: 0,
    explanation: 'Kancsó: 2 l = 2000 ml. Narancslé: 6 dl = 600 ml. Ásványvíz: 80 cl = 800 ml. Eddig benne van: 600 + 800 = 1400 ml. Hiányzik: 2000 - 1400 = 600 ml.',
    hint: 'Válts át mindent milliliterre! Kancsó = 2000 ml, 6 dl = 600 ml, 80 cl = 800 ml.',
    breakdown: [
      { label: 'Kancsó mérete', value: '2 liter = 2000 ml' },
      { label: 'Beletöltött folyadék', value: '600 ml + 800 ml = 1400 ml' },
      { label: 'Hiányzó mennyiség', value: '2000 ml - 1400 ml = 600 ml' }
    ]
  },
  {
    id: 'vmq3-10',
    level: 3,
    prompt: 'Egy kocka minden élét a 2-szeresére növeljük. Hányszorosára növekszik a kocka térfogata?',
    options: [
      '8-szorosára (mert 2³ = 2 · 2 · 2 = 8)',
      '2-szeresére',
      '4-szeresére',
      '6-szorosára'
    ],
    correctAnswer: 0,
    figure: (
      <svg className="w-44 h-28 mx-auto" viewBox="0 0 160 80">
        {/* Kis kocka vs nagy kocka (8 db kis kockából) */}
        <rect x="20" y="35" width="20" height="20" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
        <polygon points="20,35 28,27 48,27 40,35" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1" />
        <polygon points="40,35 48,27 48,47 40,55" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1" />
        <text x="30" y="70" textAnchor="middle" className="text-[9px] font-bold fill-cyan-900">1x (V)</text>

        {/* 2x kocka */}
        <rect x="80" y="25" width="40" height="40" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
        <polygon points="80,25 96,9 136,9 120,25" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1" />
        <polygon points="120,25 136,9 136,49 120,65" fill="#a5f3fc" stroke="#0891b2" strokeWidth="1" />
        <line x1="80" y1="45" x2="120" y2="45" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="100" y1="25" x2="100" y2="65" stroke="#0891b2" strokeWidth="1" strokeDasharray="2,2" />
        <text x="105" y="75" textAnchor="middle" className="text-[9px] font-bold fill-cyan-900">8x kiskocka fér bele!</text>
      </svg>
    ),
    explanation: 'A térfogat háromdimenziós: ha minden él (hosszúság, szélesség, magasság) 2-szeres lesz, a térfogat 2 · 2 · 2 = 8-szorosára nő: V_új = (2a) · (2a) · (2a) = 8 · a³.',
    hint: 'A hosszúság 2-szeres, a terület 2² = 4-szeres, a térfogat 2³ = ...-szoros.',
    breakdown: [
      { label: 'Eredeti térfogat', value: 'V = a · a · a = a³' },
      { label: 'Új élhossz', value: '2 · a' },
      { label: 'Új térfogat', value: '(2a) · (2a) · (2a) = 8 · a³' },
      { label: 'Növekedés mértéke', value: 'Pontosan 8-szoros' }
    ]
  }
];

export const VolumeMeasureQuiz: React.FC<VolumeMeasureQuizProps> = ({ onBack, onSwitchToTheory }) => {
  return (
    <QuizTemplate
      title="A térfogat mérése kvíz"
      subtitle="Teszteld tudásodat a köbmértékekről, űrmértékekről és az aranyszabályokról 3 szinten!"
      badge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 7. KVÍZ"
      storageKey="g5-meas-volume-measure-quiz"
      questions={VOLUME_MEASURE_QUESTIONS}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(lvl, nextLvl, openRules) => (
        <VolumeMeasureMatcher
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(lvl, nextLvl, openRules) => (
        <VolumeMeasureSorter
          level={lvl}
          onNextLevel={nextLvl}
          onOpenRules={openRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      cheatSheets={{
        1: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-cyan-700 dark:text-cyan-400">1. Szint Puskája: Alapok és Váltószámok</div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <strong>Köbmértékek (1000):</strong><br />
                <code>1 dm³ = 1000 cm³</code><br />
                <code>1 m³ = 1000 dm³</code>
              </div>
              <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800">
                <strong>Űrmértékek:</strong><br />
                <code>1 liter = 10 dl = 100 cl = 1000 ml</code><br />
                <code>1 hl = 100 liter</code>
              </div>
            </div>
          </div>
        ),
        2: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-cyan-700 dark:text-cyan-400">2. Szint Puskája: A 3 Aranyszabály</div>
            <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <div>• <strong>1. Fő szabály:</strong> 1 dm³ = 1 liter</div>
              <div>• <strong>2. Kis szabály:</strong> 1 cm³ = 1 ml</div>
              <div>• <strong>3. Nagy szabály:</strong> 1 m³ = 1000 liter = 10 hl</div>
            </div>
          </div>
        ),
        3: (
          <div className="space-y-2 text-xs">
            <div className="font-bold text-cyan-700 dark:text-cyan-400">3. Szint Puskája: Szöveges feladatok & Élek változása</div>
            <div className="p-2 rounded bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 space-y-1">
              <div>• <strong>Tartály térfogata:</strong> V = a · b · c (ha dm-ben számolsz, azonnal litert kapsz!)</div>
              <div>• <strong>Élek k-szorosára nőnek:</strong> A térfogat k³-szeresére nő! (2-szeres él → 8-szoros térfogat)</div>
            </div>
          </div>
        )
      }}
    />
  );
};
