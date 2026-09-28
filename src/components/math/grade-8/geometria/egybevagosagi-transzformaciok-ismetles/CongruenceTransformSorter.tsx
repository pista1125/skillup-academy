import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CongruenceTransformSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A 4 Alapvető Egybevágóság Besorolása',
    subtitle: 'Sorold be a tulajdonságokat és ábrákat a megfelelő transzformációhoz!',
    categories: [
      {
        id: 'cat-axis',
        name: 'Tengelyes tükrözés (t)',
        description: 'Tükörtengelyre merőleges, megfordítja a körüljárási irányt',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-point',
        name: 'Középpontos tükrözés (K)',
        description: 'Centrumon átmenő egyenesek, 180°-os forgatásként viselkedik',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-trans',
        name: 'Párhuzamos eltolás (v⃗)',
        description: 'Minden pontot adott irányban és azonos távolsággal mozgat el',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-rot',
        name: 'Elforgatás (O, α)',
        description: 'Pont körül adott α szöggel történő elfordítás köríven',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Megfordítja a körüljárási irányt (indirekt)',
        category: 'cat-axis',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="2" x2="40" y2="42" className="stroke-slate-400 stroke-[1.5] stroke-dasharray-[2,2]" />
            <polygon points="12,36 32,36 22,12" fill="#10b981" fillOpacity="0.2" className="stroke-emerald-600 stroke-[1.8]" />
            <circle cx="22" cy="24" r="5" fill="none" className="stroke-emerald-700 stroke-[1.5]" />
            <polygon points="26,20 27,25 22,23" className="fill-emerald-700" />
            <text x="19" y="27" className="text-[7px] font-black fill-emerald-800">↺</text>
            <polygon points="68,36 48,36 58,12" fill="#0d9488" fillOpacity="0.2" className="stroke-teal-600 stroke-[1.8]" />
            <circle cx="58" cy="24" r="5" fill="none" className="stroke-teal-700 stroke-[1.5]" />
            <polygon points="54,20 53,25 58,23" className="fill-teal-700" />
            <text x="55" y="27" className="text-[7px] font-black fill-teal-800">↻</text>
            <text x="36" y="8" className="text-[7px] font-bold fill-slate-500">t</text>
          </svg>
        )
      },
      {
        id: 's2',
        label: 'A tükörtengely minden pontja fixpont',
        category: 'cat-axis',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="2" x2="40" y2="42" className="stroke-emerald-600 stroke-[2.5]" />
            <circle cx="40" cy="10" r="3.5" className="fill-rose-500 stroke-white stroke-[1]" />
            <circle cx="40" cy="22" r="3.5" className="fill-rose-500 stroke-white stroke-[1]" />
            <circle cx="40" cy="34" r="3.5" className="fill-rose-500 stroke-white stroke-[1]" />
            <text x="45" y="12" className="text-[7px] font-black fill-slate-700">P₁=P₁'</text>
            <text x="45" y="24" className="text-[7px] font-black fill-slate-700">P₂=P₂'</text>
            <text x="45" y="36" className="text-[7px] font-black fill-slate-700">P₃=P₃'</text>
            <text x="32" y="8" className="text-[8px] font-black fill-emerald-700">t</text>
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Merőleges felmérés az egyenes túloldalára',
        category: 'cat-axis',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="2" x2="40" y2="42" className="stroke-slate-400 stroke-[1.5]" />
            <line x1="12" y1="22" x2="68" y2="22" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="14" cy="22" r="3.5" className="fill-emerald-600 stroke-white stroke-[1]" />
            <circle cx="66" cy="22" r="3.5" className="fill-emerald-600 stroke-white stroke-[1]" />
            <rect x="33" y="15" width="7" height="7" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <line x1="26" y1="19" x2="26" y2="25" stroke="#10b981" strokeWidth="1.5" />
            <line x1="54" y1="19" x2="54" y2="25" stroke="#10b981" strokeWidth="1.5" />
            <text x="8" y="17" className="text-[7px] font-bold fill-emerald-800">P</text>
            <text x="66" y="17" className="text-[7px] font-bold fill-emerald-800">P'</text>
            <text x="36" y="8" className="text-[7px] font-bold fill-slate-500">t</text>
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Pontosan 1 fixpontja van (a centrum)',
        category: 'cat-point',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="14" y1="34" x2="66" y2="10" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="16" y1="12" x2="64" y2="32" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="40" cy="22" r="4.5" className="fill-teal-700 stroke-teal-200 stroke-[2]" />
            <circle cx="14" cy="34" r="2.5" className="fill-teal-500" />
            <circle cx="66" cy="10" r="2.5" className="fill-teal-500" />
            <circle cx="16" cy="12" r="2.5" className="fill-teal-500" />
            <circle cx="64" cy="32" r="2.5" className="fill-teal-500" />
            <text x="33" y="14" className="text-[7px] font-black fill-teal-900">K=K'</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Egyenértékű egy 180°-os elforgatással',
        category: 'cat-point',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="40" cy="24" r="3.5" className="fill-teal-700" />
            <line x1="14" y1="24" x2="66" y2="24" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="14" cy="24" r="3" className="fill-teal-600" />
            <circle cx="66" cy="24" r="3" className="fill-teal-600" />
            <path d="M 16 22 A 24 16 0 0 1 64 22" fill="none" className="stroke-amber-500 stroke-[2]" />
            <polygon points="64,22 66,16 60,18" className="fill-amber-500" />
            <text x="33" y="10" className="text-[7px] font-black fill-amber-600">180°</text>
            <text x="38" y="35" className="text-[7px] font-bold fill-teal-800">K</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'A centrumon átmenő egyenesek fixegyenesek',
        category: 'cat-point',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="8" y1="36" x2="72" y2="8" className="stroke-teal-600 stroke-[2.5]" />
            <circle cx="40" cy="22" r="4" className="fill-rose-500 stroke-white stroke-[1.2]" />
            <text x="36" y="33" className="text-[7px] font-bold fill-rose-600">K</text>
            <polygon points="73,7 65,8 69,13" className="fill-teal-600" />
            <polygon points="7,37 15,36 11,31" className="fill-teal-600" />
            <text x="56" y="20" className="text-[8px] font-mono font-bold fill-teal-800">e ≡ e'</text>
          </svg>
        )
      },
      {
        id: 's7',
        label: '0 fixpontja van (ha a vektor nem nulla)',
        category: 'cat-trans',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="20" cy="14" r="3" className="fill-blue-600" />
            <line x1="20" y1="14" x2="48" y2="14" className="stroke-blue-600 stroke-[2]" />
            <polygon points="52,14 46,11 46,17" className="fill-blue-600" />
            <circle cx="52" cy="14" r="3" className="fill-blue-800" />
            <circle cx="20" cy="30" r="3" className="fill-blue-600" />
            <line x1="20" y1="30" x2="48" y2="30" className="stroke-blue-600 stroke-[2]" />
            <polygon points="52,30 46,27 46,33" className="fill-blue-600" />
            <circle cx="52" cy="30" r="3" className="fill-blue-800" />
            <rect x="56" y="10" width="20" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
            <text x="58" y="24" className="text-[7px] font-black fill-rose-700">P≠P'</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Irányított szakasz (vektor) határozza meg',
        category: 'cat-trans',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="14" y1="24" x2="60" y2="24" className="stroke-blue-600 stroke-[2.5]" />
            <polygon points="66,24 58,19 58,29" className="fill-blue-600" />
            <circle cx="14" cy="24" r="3.5" className="fill-blue-700 stroke-white stroke-[1]" />
            <text x="35" y="18" className="text-[9px] font-black fill-blue-700">v⃗</text>
            <text x="10" y="35" className="text-[6px] font-bold fill-slate-600">Kezdőpont</text>
            <text x="52" y="35" className="text-[6px] font-bold fill-slate-600">Végpont</text>
          </svg>
        )
      },
      {
        id: 's9',
        label: 'A vektorral párhuzamos egyenesek fixegyenesek',
        category: 'cat-trans',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-blue-500 stroke-[2]" />
            <line x1="24" y1="12" x2="48" y2="12" className="stroke-blue-700 stroke-[2.5]" />
            <polygon points="52,12 46,9 46,15" className="fill-blue-700" />
            <text x="32" y="9" className="text-[7px] font-bold fill-blue-800">v⃗</text>
            <text x="56" y="20" className="text-[7px] font-black fill-blue-900">e ∥ v⃗</text>
            <text x="56" y="32" className="text-[7px] font-mono font-bold fill-slate-600">e ≡ e'</text>
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Forgáscentrum és α szög határozza meg',
        category: 'cat-rot',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="16" y1="32" x2="62" y2="32" className="stroke-purple-600 stroke-[1.8]" />
            <line x1="16" y1="32" x2="52" y2="10" className="stroke-purple-600 stroke-[1.8]" />
            <path d="M 36 32 A 20 20 0 0 0 32 20" fill="none" className="stroke-amber-500 stroke-[2]" />
            <polygon points="32,20 31,25 36,22" className="fill-amber-500" />
            <circle cx="16" cy="32" r="3.5" className="fill-purple-700 stroke-white stroke-[1]" />
            <text x="12" y="41" className="text-[7px] font-black fill-purple-800">O</text>
            <text x="36" y="24" className="text-[8px] font-black fill-amber-600">α</text>
            <circle cx="62" cy="32" r="2.5" className="fill-purple-500" />
            <circle cx="52" cy="10" r="2.5" className="fill-purple-500" />
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Pontjai köríven mozdulnak el',
        category: 'cat-rot',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="18" cy="34" r="3" className="fill-purple-700" />
            <line x1="18" y1="34" x2="66" y2="34" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="18" y1="34" x2="50" y2="8" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 66 34 A 48 48 0 0 0 50 8" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="66" cy="34" r="3.5" className="fill-purple-600" />
            <circle cx="50" cy="8" r="3.5" className="fill-purple-600" />
            <polygon points="49,8 55,10 52,14" className="fill-purple-600" />
            <text x="12" y="42" className="text-[7px] font-black fill-purple-800">O</text>
            <text x="68" y="34" className="text-[6px] font-bold fill-purple-700">P</text>
            <text x="52" y="6" className="text-[6px] font-bold fill-purple-700">P'</text>
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Csak a forgás középpontja marad helyben',
        category: 'cat-rot',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="40" cy="22" r="14" fill="none" stroke="#e9d5ff" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="40" cy="22" r="5" className="fill-purple-600 stroke-purple-200 stroke-[2]" />
            <path d="M 40 8 A 14 14 0 0 1 54 22" fill="none" className="stroke-purple-500 stroke-[1.5]" />
            <polygon points="54,22 51,17 56,18" className="fill-purple-500" />
            <text x="32" y="38" className="text-[7px] font-black fill-purple-800">O = O'</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Tükrözések a Koordináta-rendszerben',
    subtitle: 'Kategorizáld a pontok koordinátáit és a tükrözési szabályokat ábrákkal!',
    categories: [
      {
        id: 'cat-x',
        name: 'x tengelyre tükrözés',
        description: '(x; y) ↦ (x; -y), csak az y koordináta előjele vált',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-y',
        name: 'y tengelyre tükrözés',
        description: '(x; y) ↦ (-x; y), csak az x koordináta előjele vált',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-orig',
        name: 'Origóra tükrözés (O(0;0))',
        description: '(x; y) ↦ (-x; -y), mindkét koordináta ellentettjére vált',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: '(x; y) ↦ (x; -y)',
        category: 'cat-x',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-blue-600 stroke-[2.2]" />
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-slate-300 stroke-[1]" />
            <line x1="56" y1="10" x2="56" y2="34" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="56" cy="10" r="3.5" className="fill-blue-700 stroke-white stroke-[1]" />
            <circle cx="56" cy="34" r="3.5" className="fill-rose-600 stroke-white stroke-[1]" />
            <text x="59" y="11" className="text-[6px] font-black fill-blue-800">(x; y)</text>
            <text x="59" y="37" className="text-[6px] font-black fill-rose-800">(x; -y)</text>
            <text x="70" y="19" className="text-[7px] font-black fill-blue-600">x</text>
          </svg>
        )
      },
      {
        id: 's14',
        label: "P(3; 5) ↦ P'(3; -5)",
        category: 'cat-x',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-blue-500 stroke-[1.5]" />
            <line x1="26" y1="4" x2="26" y2="40" className="stroke-slate-300 stroke-[1]" />
            <line x1="52" y1="9" x2="52" y2="35" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="52" cy="9" r="3" className="fill-blue-700" />
            <circle cx="52" cy="35" r="3" className="fill-rose-600" />
            <text x="4" y="12" className="text-[6px] font-black fill-blue-800">P(3; 5)</text>
            <text x="4" y="36" className="text-[6px] font-black fill-rose-800">P'(3; -5)</text>
          </svg>
        )
      },
      {
        id: 's15',
        label: "A(-2; -7) ↦ A'(-2; 7)",
        category: 'cat-x',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-blue-500 stroke-[1.5]" />
            <line x1="56" y1="4" x2="56" y2="40" className="stroke-slate-300 stroke-[1]" />
            <line x1="28" y1="8" x2="28" y2="36" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="28" cy="36" r="3" className="fill-blue-700" />
            <circle cx="28" cy="8" r="3" className="fill-rose-600" />
            <text x="32" y="38" className="text-[6px] font-black fill-blue-800">A(-2; -7)</text>
            <text x="32" y="11" className="text-[6px] font-black fill-rose-800">A'(-2; 7)</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Csak a függőleges (y) előjel vált',
        category: 'cat-x',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="12" y1="22" x2="68" y2="22" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="14" y="18" className="text-[7px] font-black fill-blue-600">x fix</text>
            <line x1="40" y1="8" x2="40" y2="36" stroke="#2563eb" strokeWidth="2" />
            <polygon points="40,5 36,11 44,11" className="fill-blue-600" />
            <polygon points="40,39 36,33 44,33" className="fill-rose-600" />
            <text x="46" y="12" className="text-[7px] font-black fill-blue-700">+y</text>
            <text x="46" y="36" className="text-[7px] font-black fill-rose-700">-y</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: '(x; y) ↦ (-x; y)',
        category: 'cat-y',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-teal-600 stroke-[2.2]" />
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-slate-300 stroke-[1]" />
            <line x1="18" y1="12" x2="62" y2="12" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="62" cy="12" r="3.5" className="fill-teal-700 stroke-white stroke-[1]" />
            <circle cx="18" cy="12" r="3.5" className="fill-rose-600 stroke-white stroke-[1]" />
            <text x="52" y="8" className="text-[6px] font-black fill-teal-800">(x; y)</text>
            <text x="6" y="8" className="text-[6px] font-black fill-rose-800">(-x; y)</text>
            <text x="42" y="38" className="text-[7px] font-black fill-teal-700">y</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: "Q(4; -6) ↦ Q'(-4; -6)",
        category: 'cat-y',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-teal-500 stroke-[1.5]" />
            <line x1="6" y1="16" x2="74" y2="16" className="stroke-slate-300 stroke-[1]" />
            <line x1="18" y1="32" x2="62" y2="32" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="62" cy="32" r="3" className="fill-teal-700" />
            <circle cx="18" cy="32" r="3" className="fill-rose-600" />
            <text x="50" y="41" className="text-[6px] font-black fill-teal-800">Q(4; -6)</text>
            <text x="4" y="41" className="text-[6px] font-black fill-rose-800">Q'(-4; -6)</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: "B(-5; 1) ↦ B'(5; 1)",
        category: 'cat-y',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-teal-500 stroke-[1.5]" />
            <line x1="6" y1="28" x2="74" y2="28" className="stroke-slate-300 stroke-[1]" />
            <line x1="16" y1="14" x2="64" y2="14" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="16" cy="14" r="3" className="fill-teal-700" />
            <circle cx="64" cy="14" r="3" className="fill-rose-600" />
            <text x="2" y="10" className="text-[6px] font-black fill-teal-800">B(-5; 1)</text>
            <text x="52" y="10" className="text-[6px] font-black fill-rose-800">B'(5; 1)</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Csak a vízszintes (x) előjel vált',
        category: 'cat-y',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="40" y1="6" x2="40" y2="38" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="43" y="12" className="text-[7px] font-black fill-teal-600">y fix</text>
            <line x1="14" y1="22" x2="66" y2="22" stroke="#0d9488" strokeWidth="2" />
            <polygon points="10,22 17,18 17,26" className="fill-rose-600" />
            <polygon points="70,22 63,18 63,26" className="fill-teal-600" />
            <text x="6" y="32" className="text-[7px] font-black fill-rose-700">-x</text>
            <text x="68" y="32" className="text-[7px] font-black fill-teal-700">+x</text>
          </svg>
        )
      },
      {
        id: 's21',
        label: '(x; y) ↦ (-x; -y)',
        category: 'cat-orig',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-slate-300 stroke-[1]" />
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-slate-300 stroke-[1]" />
            <line x1="18" y1="36" x2="62" y2="8" stroke="#10b981" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="40" cy="22" r="3.5" className="fill-slate-700" />
            <circle cx="62" cy="8" r="3.5" className="fill-emerald-700 stroke-white stroke-[1]" />
            <circle cx="18" cy="36" r="3.5" className="fill-rose-600 stroke-white stroke-[1]" />
            <text x="46" y="7" className="text-[6px] font-black fill-emerald-800">(x; y)</text>
            <text x="2" y="41" className="text-[6px] font-black fill-rose-800">(-x; -y)</text>
            <text x="42" y="27" className="text-[6px] font-black fill-slate-700">O</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: "R(2; -8) ↦ R'(-2; 8)",
        category: 'cat-orig',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-slate-300 stroke-[1]" />
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-slate-300 stroke-[1]" />
            <line x1="26" y1="8" x2="54" y2="36" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="40" cy="22" r="3" className="fill-slate-600" />
            <circle cx="54" cy="36" r="3" className="fill-emerald-700" />
            <circle cx="26" cy="8" r="3" className="fill-rose-600" />
            <text x="2" y="11" className="text-[6px] font-black fill-rose-800">R'(-2; 8)</text>
            <text x="44" y="42" className="text-[6px] font-black fill-emerald-800">R(2; -8)</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: "C(-3; -4) ↦ C'(3; 4)",
        category: 'cat-orig',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-slate-300 stroke-[1]" />
            <line x1="40" y1="4" x2="40" y2="40" className="stroke-slate-300 stroke-[1]" />
            <line x1="20" y1="34" x2="60" y2="10" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="40" cy="22" r="3" className="fill-slate-600" />
            <circle cx="20" cy="34" r="3" className="fill-emerald-700" />
            <circle cx="60" cy="10" r="3" className="fill-rose-600" />
            <text x="2" y="41" className="text-[6px] font-black fill-emerald-800">C(-3; -4)</text>
            <text x="46" y="8" className="text-[6px] font-black fill-rose-800">C'(3; 4)</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'Középpontos tükrözés az (0; 0) pontra',
        category: 'cat-orig',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <circle cx="40" cy="22" r="4.5" className="fill-emerald-700 stroke-emerald-200 stroke-[2]" />
            <path d="M 28 22 A 12 12 0 1 1 52 22" fill="none" className="stroke-emerald-500 stroke-[1.8] stroke-dasharray-[3,2]" />
            <polygon points="52,22 55,16 49,18" className="fill-emerald-600" />
            <text x="26" y="38" className="text-[7px] font-black fill-emerald-900">O(0; 0)</text>
            <text x="33" y="10" className="text-[6px] font-bold fill-emerald-700">180°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Alapesetek és Konstrukciós Hatások',
    subtitle: 'Döntsd el ábrák alapján, hogy mi egybevágóság, konstrukció, vagy téves feltétel!',
    categories: [
      {
        id: 'cat-cases',
        name: 'Egybevágósági alapeset',
        description: 'Háromszögek egybevágóságát garantáló szabály (o-o-o, o-sz-o, sz-o-sz, d-o-o)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-shape',
        name: 'Tükrözéses konstrukció',
        description: 'Háromszög tükrözésével előállítható szimmetrikus négyszögek',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-false',
        name: 'NEM garantál egybevágóságot',
        description: 'Téves vagy hiányos feltételek, amelyekből nem következik egybevágóság',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'o - o - o (3-3 oldal egyenlő)',
        category: 'cat-cases',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="10,34 32,34 22,12" fill="#10b981" fillOpacity="0.2" className="stroke-emerald-600 stroke-[1.8]" />
            <polygon points="48,34 70,34 60,12" fill="#10b981" fillOpacity="0.2" className="stroke-emerald-600 stroke-[1.8]" />
            <line x1="20" y1="32" x2="22" y2="36" stroke="#047857" strokeWidth="1.5" />
            <line x1="58" y1="32" x2="60" y2="36" stroke="#047857" strokeWidth="1.5" />
            <line x1="14" y1="22" x2="18" y2="24" stroke="#047857" strokeWidth="1.5" />
            <line x1="52" y1="22" x2="56" y2="24" stroke="#047857" strokeWidth="1.5" />
            <text x="36" y="25" className="text-[9px] font-black fill-emerald-700">≅</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'o - sz - o (2 oldal és a közbezárt szög)',
        category: 'cat-cases',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="8,34 34,34 28,12" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="8" y1="34" x2="34" y2="34" className="stroke-emerald-600 stroke-[2.5]" />
            <line x1="34" y1="34" x2="28" y2="12" className="stroke-emerald-600 stroke-[2.5]" />
            <path d="M 29 34 A 6 6 0 0 1 31 26" fill="none" className="stroke-rose-600 stroke-[2]" />
            <polygon points="46,34 72,34 66,12" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="46" y1="34" x2="72" y2="34" className="stroke-emerald-600 stroke-[2.5]" />
            <line x1="72" y1="34" x2="66" y2="12" className="stroke-emerald-600 stroke-[2.5]" />
            <path d="M 67 34 A 6 6 0 0 1 69 26" fill="none" className="stroke-rose-600 stroke-[2]" />
            <text x="37" y="24" className="text-[8px] font-bold fill-rose-600">α</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'sz - o - sz (1 oldal és a rajta fekvő 2 szög)',
        category: 'cat-cases',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="8,34 34,34 22,12" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="8" y1="34" x2="34" y2="34" className="stroke-emerald-700 stroke-[2.5]" />
            <path d="M 14 34 A 6 6 0 0 1 12 28" fill="none" className="stroke-amber-600 stroke-[2]" />
            <path d="M 28 34 A 6 6 0 0 0 30 28" fill="none" className="stroke-rose-600 stroke-[2]" />
            <polygon points="46,34 72,34 60,12" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="46" y1="34" x2="72" y2="34" className="stroke-emerald-700 stroke-[2.5]" />
            <path d="M 52 34 A 6 6 0 0 1 50 28" fill="none" className="stroke-amber-600 stroke-[2]" />
            <path d="M 66 34 A 6 6 0 0 0 68 28" fill="none" className="stroke-rose-600 stroke-[2]" />
            <text x="37" y="24" className="text-[8px] font-black fill-emerald-700">c</text>
          </svg>
        )
      },
      {
        id: 's28',
        label: 'd - o - o (2 oldal és a nagyobbikkal szemközti szög)',
        category: 'cat-cases',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="10,34 34,34 10,12" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="10" y1="12" x2="34" y2="34" className="stroke-emerald-700 stroke-[2.5]" />
            <line x1="10" y1="34" x2="34" y2="34" className="stroke-emerald-700 stroke-[2]" />
            <rect x="10" y="28" width="6" height="6" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <polygon points="46,34 70,34 46,12" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="46" y1="12" x2="70" y2="34" className="stroke-emerald-700 stroke-[2.5]" />
            <line x1="46" y1="34" x2="70" y2="34" className="stroke-emerald-700 stroke-[2]" />
            <rect x="46" y="28" width="6" height="6" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <text x="24" y="20" className="text-[7px] font-black fill-emerald-800">c (nagy)</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'Háromszög tükrözése oldalegyenesre ⟹ Deltoid',
        category: 'cat-shape',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="6" y1="22" x2="74" y2="22" className="stroke-slate-400 stroke-[1.5] stroke-dasharray-[2,2]" />
            <polygon points="16,22 64,22 40,5" fill="#10b981" fillOpacity="0.3" className="stroke-emerald-600 stroke-[1.8]" />
            <polygon points="16,22 64,22 40,39" fill="#0d9488" fillOpacity="0.3" className="stroke-teal-600 stroke-[1.8]" />
            <circle cx="40" cy="5" r="2.5" className="fill-emerald-700" />
            <circle cx="40" cy="39" r="2.5" className="fill-teal-700" />
            <text x="68" y="20" className="text-[7px] font-bold fill-slate-500">t</text>
            <text x="24" y="15" className="text-[7px] font-black fill-emerald-800">Deltoid</text>
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Háromszög tükrözése oldalfelezőre ⟹ Paralelogramma',
        category: 'cat-shape',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="12,32 50,32 38,10" fill="#0d9488" fillOpacity="0.25" className="stroke-teal-600 stroke-[1.5]" />
            <polygon points="50,32 12,32 24,54" fill="#0284c7" fillOpacity="0.2" className="stroke-blue-600 stroke-[1.5]" />
            <polygon points="12,32 38,10 76,10 50,32" fill="none" className="stroke-teal-700 stroke-[2]" />
            <circle cx="31" cy="32" r="3.5" className="fill-rose-500 stroke-white stroke-[1]" />
            <text x="33" y="28" className="text-[7px] font-black fill-rose-600">F (középpont)</text>
          </svg>
        )
      },
      {
        id: 's31',
        label: 'Derékszögű háromszög tükrözése átfogóra ⟹ Deltoid',
        category: 'cat-shape',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="8" y1="22" x2="72" y2="22" className="stroke-teal-500 stroke-[1.8] stroke-dasharray-[2,2]" />
            <polygon points="16,22 64,22 36,6" fill="#0d9488" fillOpacity="0.2" className="stroke-teal-700 stroke-[1.8]" />
            <polygon points="16,22 64,22 36,38" fill="#0d9488" fillOpacity="0.2" className="stroke-teal-700 stroke-[1.8]" />
            <rect x="33" y="9" width="4" height="4" fill="none" stroke="#ef4444" strokeWidth="1" />
            <rect x="33" y="31" width="4" height="4" fill="none" stroke="#ef4444" strokeWidth="1" />
            <text x="44" y="15" className="text-[7px] font-black fill-teal-800">átfogó (t)</text>
          </svg>
        )
      },
      {
        id: 's32',
        label: 'Középpontos tükrözés: átlók felezik egymást',
        category: 'cat-shape',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="14,34 54,34 66,10 26,10" fill="none" className="stroke-teal-700 stroke-[1.8]" />
            <line x1="14" y1="34" x2="66" y2="10" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <line x1="26" y1="10" x2="54" y2="34" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="40" cy="22" r="3.5" className="fill-rose-500 stroke-white stroke-[1]" />
            <text x="43" y="20" className="text-[7px] font-black fill-rose-600">K</text>
            <line x1="25" y1="26" x2="27" y2="30" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="53" y1="14" x2="55" y2="18" stroke="#0d9488" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's33',
        label: 'sz - sz - sz (csak a szögek egyenlősége: csak hasonlóság!)',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="8,34 24,34 16,18" fill="none" className="stroke-rose-600 stroke-[1.8]" />
            <polygon points="40,36 74,36 57,6" fill="none" className="stroke-rose-600 stroke-[1.8]" />
            <path d="M 12 34 A 4 4 0 0 1 11 30" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <path d="M 46 36 A 6 6 0 0 1 44 30" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <text x="27" y="28" className="text-[12px] font-black fill-rose-600">≠</text>
            <text x="26" y="16" className="text-[7px] font-black fill-rose-700">~ csak!</text>
          </svg>
        )
      },
      {
        id: 's34',
        label: 'Két sokszög területe egyenlő (pl. mindkettő 36 cm²)',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <rect x="8" y="14" width="20" height="20" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.8" />
            <text x="11" y="26" className="text-[7px] font-black fill-rose-700">T=36</text>
            <rect x="46" y="20" width="30" height="14" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.8" />
            <text x="50" y="29" className="text-[7px] font-black fill-rose-700">T=36</text>
            <text x="32" y="27" className="text-[12px] font-black fill-rose-600">≠</text>
          </svg>
        )
      },
      {
        id: 's35',
        label: 'Két oldal és a kisebbik oldallal szemközti szög',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <line x1="8" y1="34" x2="72" y2="34" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="12" y1="34" x2="36" y2="10" className="stroke-rose-600 stroke-[2]" />
            <line x1="36" y1="10" x2="28" y2="34" className="stroke-rose-500 stroke-[1.8] stroke-dasharray-[2,1]" />
            <line x1="36" y1="10" x2="56" y2="34" className="stroke-rose-600 stroke-[2]" />
            <path d="M 44 26 A 25 25 0 0 1 58 35" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="28" cy="34" r="2.5" className="fill-rose-600" />
            <circle cx="56" cy="34" r="2.5" className="fill-rose-600" />
            <text x="18" y="20" className="text-[7px] font-bold fill-rose-800">b</text>
            <text x="44" y="20" className="text-[7px] font-bold fill-rose-800">a</text>
            <text x="40" y="10" className="text-[7px] font-black fill-rose-700">2 eset!</text>
          </svg>
        )
      },
      {
        id: 's36',
        label: 'Két sokszög kerülete egyenlő (pl. mindkettő 24 cm)',
        category: 'cat-false',
        figure: (
          <svg viewBox="0 0 80 44" className="w-full h-full object-contain">
            <polygon points="10,34 30,34 20,16" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.8" />
            <text x="12" y="30" className="text-[6px] font-black fill-rose-700">K=24</text>
            <polygon points="46,25 53,35 65,35 72,25 65,15 53,15" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.8" />
            <text x="52" y="27" className="text-[6px] font-black fill-rose-700">K=24</text>
            <text x="33" y="27" className="text-[12px] font-black fill-rose-600">≠</text>
          </svg>
        )
      }
    ]
  }
};

export const CongruenceTransformSorter: React.FC<CongruenceTransformSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-geom-congruence-sorter',
  topicTitle = '1. Egybevágósági transzformációk Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="emerald"
      badge="8. Osztály • Geometria"
      levels={sorterLevels}
    />
  );
};

export default CongruenceTransformSorter;
