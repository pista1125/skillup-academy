import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TriangleLinesSorterProps {
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
    title: '1. Szint: A 4 Nevezetes Vonal Felismerése és Szerepe',
    subtitle: 'Sorold be a nevezetes vonalakat és jellemzőiket a megfelelő csoportba!',
    categories: [
      {
        id: 'bisector',
        name: 'Oldalfelező merőleges (f)',
        description: 'Oldalfelezőre állított merőleges, metszéspontja: O (köré írt kör)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'angle_bisector',
        name: 'Belső szögfelező (w)',
        description: 'Belső szöget felező félegyenes, metszéspontja: K (beírt kör)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'altitude',
        name: 'Magasságvonal (m)',
        description: 'Csúcsból a szemközti oldalra bocsátott merőleges, metszéspontja: M',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'median',
        name: 'Súlyvonal (s)',
        description: 'Csúcsot a szemközti oldal felezőpontjával összekötő szakasz, metszéspontja: S',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 'l1-i1',
        label: 'Köré írt kör (O)',
        category: 'bisector',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <circle cx="30" cy="14" r="12" fill="none" className="stroke-indigo-400 stroke-[1.2] stroke-dasharray-[2,2]" />
            <polygon points="30,2 18,24 42,24" fill="none" className="stroke-slate-600 stroke-[1.5]" />
            <circle cx="30" cy="14" r="2" className="fill-indigo-600" />
            <text x="33" y="16" className="text-[8px] font-bold fill-indigo-700">O</text>
          </svg>
        )
      },
      {
        id: 'l1-i2',
        label: 'Beírt kör (K)',
        category: 'angle_bisector',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 14,24 46,24" fill="none" className="stroke-slate-600 stroke-[1.5]" />
            <circle cx="30" cy="17" r="7" fill="none" className="stroke-teal-500 stroke-[1.5]" />
            <circle cx="30" cy="17" r="1.8" className="fill-teal-700" />
            <text x="33" y="19" className="text-[8px] font-bold fill-teal-700">K</text>
          </svg>
        )
      },
      {
        id: 'l1-i3',
        label: 'Magasságpont (M)',
        category: 'altitude',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="28,4 12,24 48,24" fill="none" className="stroke-slate-600 stroke-[1.5]" />
            <line x1="28" y1="4" x2="28" y2="24" className="stroke-rose-500 stroke-[1.5]" />
            <line x1="12" y1="24" x2="38" y2="14" className="stroke-rose-500 stroke-[1.2]" />
            <circle cx="28" cy="17.5" r="2" className="fill-rose-600" />
            <text x="32" y="19" className="text-[8px] font-bold fill-rose-700">M</text>
          </svg>
        )
      },
      {
        id: 'l1-i4',
        label: 'Súlypont (S)',
        category: 'median',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" fill="none" className="stroke-slate-600 stroke-[1.5]" />
            <line x1="30" y1="4" x2="30" y2="24" className="stroke-purple-500 stroke-[1.4]" />
            <line x1="12" y1="24" x2="39" y2="14" className="stroke-purple-500 stroke-[1.2]" />
            <circle cx="30" cy="17.3" r="2" className="fill-purple-600" />
            <text x="33" y="18" className="text-[8px] font-bold fill-purple-700">S</text>
          </svg>
        )
      },
      {
        id: 'l1-i5',
        label: 'Oldalfelező vonal (f)',
        category: 'bisector',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="22" x2="50" y2="22" className="stroke-slate-600 stroke-[2]" />
            <line x1="30" y1="4" x2="30" y2="26" className="stroke-indigo-600 stroke-[1.8]" />
            <rect x="30" y="16" width="6" height="6" fill="none" className="stroke-indigo-500 stroke-[1]" />
            <line x1="19" y1="20" x2="19" y2="24" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="21" y1="20" x2="21" y2="24" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="39" y1="20" x2="39" y2="24" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="41" y1="20" x2="41" y2="24" className="stroke-indigo-600 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'l1-i6',
        label: 'Szögfelező vonal (w)',
        category: 'angle_bisector',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="23" x2="50" y2="23" className="stroke-slate-600 stroke-[1.8]" />
            <line x1="10" y1="23" x2="42" y2="6" className="stroke-slate-600 stroke-[1.8]" />
            <line x1="10" y1="23" x2="48" y2="14" className="stroke-teal-600 stroke-[2]" />
            <path d="M 22 23 A 12 12 0 0 0 20 18" fill="none" className="stroke-teal-500 stroke-[1.2]" />
            <path d="M 26 23 A 16 16 0 0 0 23 16" fill="none" className="stroke-teal-500 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 'l1-i7',
        label: 'Magasságvonal (m)',
        category: 'altitude',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="26,5 10,24 50,24" fill="none" className="stroke-slate-500 stroke-[1.5]" />
            <line x1="26" y1="5" x2="26" y2="24" className="stroke-rose-600 stroke-[2]" />
            <rect x="26" y="18" width="6" height="6" fill="none" className="stroke-rose-500 stroke-[1]" />
            <text x="18" y="16" className="text-[8px] font-bold fill-rose-600">m</text>
          </svg>
        )
      },
      {
        id: 'l1-i8',
        label: 'Súlyvonal (s)',
        category: 'median',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="34,5 12,24 48,24" fill="none" className="stroke-slate-500 stroke-[1.5]" />
            <line x1="34" y1="5" x2="30" y2="24" className="stroke-purple-600 stroke-[2]" />
            <circle cx="30" cy="24" r="2" className="fill-purple-600" />
            <text x="35" y="16" className="text-[8px] font-bold fill-purple-600">s</text>
          </svg>
        )
      },
      {
        id: 'l1-i9',
        label: 'Csúcsoktól egyenlő táv',
        category: 'bisector',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="22" x2="48" y2="22" className="stroke-slate-500 stroke-[1.8]" />
            <circle cx="30" cy="8" r="2.5" className="fill-indigo-600" />
            <line x1="30" y1="8" x2="12" y2="22" className="stroke-indigo-500 stroke-[1.2] stroke-dasharray-[2,2]" />
            <line x1="30" y1="8" x2="48" y2="22" className="stroke-indigo-500 stroke-[1.2] stroke-dasharray-[2,2]" />
            <text x="21" y="13" className="text-[7px] font-bold fill-indigo-600">d</text>
            <text x="37" y="13" className="text-[7px] font-bold fill-indigo-600">d</text>
          </svg>
        )
      },
      {
        id: 'l1-i10',
        label: 'Száraktól egyenlő táv',
        category: 'angle_bisector',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="22" x2="48" y2="22" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="12" y1="22" x2="42" y2="6" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="12" y1="22" x2="46" y2="14" className="stroke-teal-500 stroke-[1.2]" />
            <circle cx="32" cy="17" r="2" className="fill-teal-600" />
            <line x1="32" y1="17" x2="32" y2="22" className="stroke-teal-600 stroke-[1.5]" />
            <line x1="32" y1="17" x2="28" y2="13.5" className="stroke-teal-600 stroke-[1.5]" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes Pontok Helyzete a Háromszögtípusokban',
    subtitle: 'Csoportosítsd a pontokat az elhelyezkedésük szerint (belsejében, határán vagy kívül)!',
    categories: [
      {
        id: 'always_inside',
        name: 'MINDIG a belső tartományban',
        description: 'Bármilyen háromszög esetén a háromszög belsejében van',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'right_triangle_special',
        name: 'Derékszögűnél a HATÁRON',
        description: 'A derékszögű csúcs vagy az átfogó felezőpontja',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'obtuse_outside',
        name: 'Tompaszögűnél KÍVÜL',
        description: 'A háromszög területén kívülre esik',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 'l2-i1',
        label: 'Súlypont (S) helyzete',
        category: 'always_inside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <circle cx="30" cy="17.3" r="2.5" className="fill-emerald-600" />
            <text x="34" y="19" className="text-[8px] font-bold fill-emerald-700">S</text>
          </svg>
        )
      },
      {
        id: 'l2-i2',
        label: 'Beírt kör kp. (K)',
        category: 'always_inside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="26,5 8,23 52,23" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <circle cx="27" cy="16.5" r="6" fill="none" className="stroke-emerald-400 stroke-[1]" />
            <circle cx="27" cy="16.5" r="2" className="fill-emerald-700" />
            <text x="31" y="18" className="text-[8px] font-bold fill-emerald-800">K</text>
          </svg>
        )
      },
      {
        id: 'l2-i3',
        label: 'Derékszögű magasságpont (M)',
        category: 'right_triangle_special',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="16,6 16,23 48,23" className="fill-blue-100/50 stroke-blue-600 stroke-[1.5]" />
            <circle cx="16" cy="23" r="3.5" className="fill-rose-500 stroke-white stroke-[1]" />
            <rect x="16" y="17" width="6" height="6" fill="none" className="stroke-blue-500 stroke-[1]" />
            <text x="8" y="22" className="text-[8px] font-bold fill-rose-600">M</text>
          </svg>
        )
      },
      {
        id: 'l2-i4',
        label: 'Átfogó felezőpontja (O)',
        category: 'right_triangle_special',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="14,7 14,23 46,23" className="fill-blue-100/50 stroke-blue-600 stroke-[1.5]" />
            <circle cx="30" cy="15" r="3" className="fill-blue-700" />
            <text x="33" y="13" className="text-[8px] font-bold fill-blue-700">O</text>
          </svg>
        )
      },
      {
        id: 'l2-i5',
        label: 'Tompaszögű magasságpont (M)',
        category: 'obtuse_outside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="20,12 36,24 54,24" className="fill-amber-100/50 stroke-amber-600 stroke-[1.5]" />
            <line x1="20" y1="12" x2="8" y2="4" className="stroke-amber-400 stroke-[1] stroke-dasharray-[2,2]" />
            <line x1="54" y1="24" x2="8" y2="4" className="stroke-amber-400 stroke-[1] stroke-dasharray-[2,2]" />
            <circle cx="8" cy="4" r="2.5" className="fill-rose-600" />
            <text x="12" y="7" className="text-[8px] font-bold fill-rose-600">M</text>
          </svg>
        )
      },
      {
        id: 'l2-i6',
        label: 'Tompaszögű köré írt kp. (O)',
        category: 'obtuse_outside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="26,16 12,24 48,24" className="fill-amber-100/50 stroke-amber-600 stroke-[1.5]" />
            <circle cx="30" cy="5" r="2.5" className="fill-amber-700" />
            <text x="34" y="8" className="text-[8px] font-bold fill-amber-700">O</text>
          </svg>
        )
      },
      {
        id: 'l2-i7',
        label: 'Szögfelezők metszése (K)',
        category: 'always_inside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="22,12 10,24 50,24" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <circle cx="26" cy="19" r="2" className="fill-emerald-700" />
            <text x="30" y="20" className="text-[8px] font-bold fill-emerald-800">K</text>
          </svg>
        )
      },
      {
        id: 'l2-i8',
        label: 'Súlypont tompaszögűben',
        category: 'always_inside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="18,12 8,24 50,24" className="fill-emerald-100/50 stroke-emerald-600 stroke-[1.5]" />
            <circle cx="25" cy="20" r="2" className="fill-emerald-700" />
            <text x="29" y="21" className="text-[8px] font-bold fill-emerald-800">S</text>
          </svg>
        )
      },
      {
        id: 'l2-i9',
        label: 'Thalész-tétel szerinti O',
        category: 'right_triangle_special',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <path d="M 10 23 A 20 20 0 0 1 50 23 Z" fill="none" className="stroke-blue-400 stroke-[1] stroke-dasharray-[2,2]" />
            <polygon points="10,23 24,7 50,23" className="fill-blue-100/40 stroke-blue-600 stroke-[1.5]" />
            <circle cx="30" cy="23" r="2.5" className="fill-blue-700" />
            <text x="28" y="21" className="text-[7px] font-bold fill-blue-700">O</text>
          </svg>
        )
      },
      {
        id: 'l2-i10',
        label: 'Kívül metsző magasságok',
        category: 'obtuse_outside',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="24,10 12,24 46,24" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <line x1="24" y1="10" x2="36" y2="2" className="stroke-amber-500 stroke-[1] stroke-dasharray-[2,2]" />
            <circle cx="36" cy="2" r="2" className="fill-rose-600" />
            <text x="40" y="6" className="text-[7px] font-bold fill-rose-600">M</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Metrikus Összefüggések és Számítások',
    subtitle: 'Válogasd szét a geometriai tételeket az arányuk és típusuk szerint!',
    categories: [
      {
        id: 'two_to_one',
        name: '2 : 1 arány',
        description: 'Súlypont harmadolása és az Euler-egyenes osztása',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'half_property',
        name: 'Felező tulajdonság (1/2)',
        description: 'Középvonal, szögfelező és átfogó felezése',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'quarter_area',
        name: 'Negyedelő tulajdonság (1/4)',
        description: 'Középvonalak által levágott háromszögek területe',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 'l3-i1',
        label: 'Súlypont felosztása (2 : 1)',
        category: 'two_to_one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="10" y1="14" x2="50" y2="14" className="stroke-purple-600 stroke-[2]" />
            <circle cx="10" cy="14" r="2" className="fill-slate-700" />
            <circle cx="36.6" cy="14" r="2.5" className="fill-purple-600" />
            <circle cx="50" cy="14" r="2" className="fill-slate-700" />
            <text x="21" y="11" className="text-[7px] font-bold fill-purple-700">2x</text>
            <text x="42" y="11" className="text-[7px] font-bold fill-purple-700">1x</text>
            <text x="34" y="23" className="text-[7px] font-bold fill-purple-700">S</text>
          </svg>
        )
      },
      {
        id: 'l3-i2',
        label: 'Euler-egyenes: MS = 2·SO',
        category: 'two_to_one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="14" x2="52" y2="14" className="stroke-purple-500 stroke-[1.8]" />
            <circle cx="12" cy="14" r="2" className="fill-rose-600" />
            <circle cx="38" cy="14" r="2" className="fill-purple-600" />
            <circle cx="48" cy="14" r="2" className="fill-indigo-600" />
            <text x="10" y="23" className="text-[7px] font-bold fill-rose-600">M</text>
            <text x="36" y="23" className="text-[7px] font-bold fill-purple-600">S</text>
            <text x="46" y="23" className="text-[7px] font-bold fill-indigo-600">O</text>
            <text x="23" y="11" className="text-[7px] font-bold fill-purple-700">2 : 1</text>
          </svg>
        )
      },
      {
        id: 'l3-i3',
        label: 'Középvonal hossza (k = a/2)',
        category: 'half_property',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" fill="none" className="stroke-slate-500 stroke-[1.5]" />
            <line x1="21" y1="14" x2="39" y2="14" className="stroke-teal-600 stroke-[2]" />
            <text x="27" y="12" className="text-[7px] font-bold fill-teal-700">a/2</text>
            <text x="29" y="23" className="text-[7px] font-bold fill-slate-700">a</text>
          </svg>
        )
      },
      {
        id: 'l3-i4',
        label: 'Középháromszög kerülete (K/2)',
        category: 'half_property',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <polygon points="21,14 39,14 30,24" className="fill-teal-100/60 stroke-teal-600 stroke-[1.5]" />
            <text x="24" y="20" className="text-[7px] font-bold fill-teal-800">K/2</text>
          </svg>
        )
      },
      {
        id: 'l3-i5',
        label: 'Köré írt kör sugara (R = c/2)',
        category: 'half_property',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="12,8 12,24 48,24" fill="none" className="stroke-slate-500 stroke-[1.5]" />
            <circle cx="30" cy="16" r="2" className="fill-teal-600" />
            <line x1="12" y1="8" x2="30" y2="16" className="stroke-teal-600 stroke-[1.8]" />
            <text x="18" y="11" className="text-[7px] font-bold fill-teal-700">R</text>
            <text x="32" y="20" className="text-[7px] font-bold fill-slate-600">c/2</text>
          </svg>
        )
      },
      {
        id: 'l3-i6',
        label: 'Középvonal 4 része (T/4)',
        category: 'quarter_area',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <polygon points="21,14 39,14 30,24" className="fill-rose-200/50 stroke-rose-500 stroke-[1.2]" />
            <text x="25" y="11" className="text-[6px] font-bold fill-rose-700">T/4</text>
            <text x="16" y="22" className="text-[6px] font-bold fill-rose-700">T/4</text>
            <text x="26" y="20" className="text-[6px] font-bold fill-rose-800">T/4</text>
            <text x="36" y="22" className="text-[6px] font-bold fill-rose-700">T/4</text>
          </svg>
        )
      },
      {
        id: 'l3-i7',
        label: 'Súlyvonal: 12 cm és 6 cm',
        category: 'two_to_one',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="8" y1="14" x2="52" y2="14" className="stroke-purple-600 stroke-[2]" />
            <circle cx="37.3" cy="14" r="2.5" className="fill-purple-700" />
            <text x="18" y="11" className="text-[7px] font-bold fill-purple-700">12 cm</text>
            <text x="41" y="11" className="text-[7px] font-bold fill-purple-700">6 cm</text>
          </svg>
        )
      },
      {
        id: 'l3-i8',
        label: 'Szögfelezés (α / 2)',
        category: 'half_property',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <line x1="12" y1="22" x2="48" y2="22" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="12" y1="22" x2="42" y2="6" className="stroke-slate-500 stroke-[1.8]" />
            <line x1="12" y1="22" x2="46" y2="14" className="stroke-teal-600 stroke-[1.5]" />
            <text x="26" y="21" className="text-[6px] font-bold fill-teal-700">α/2</text>
            <text x="24" y="15" className="text-[6px] font-bold fill-teal-700">α/2</text>
          </svg>
        )
      },
      {
        id: 'l3-i9',
        label: 'Terület negyede (10 cm² a 40-ből)',
        category: 'quarter_area',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <polygon points="21,14 39,14 30,24" className="fill-rose-300/70 stroke-rose-600 stroke-[1.5]" />
            <text x="21" y="20" className="text-[7px] font-bold fill-rose-900">10 cm²</text>
          </svg>
        )
      },
      {
        id: 'l3-i10',
        label: 'Középvonal fele: 14 cm → 7 cm',
        category: 'half_property',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7">
            <polygon points="30,4 12,24 48,24" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="21" y1="14" x2="39" y2="14" className="stroke-teal-600 stroke-[2]" />
            <text x="26" y="12" className="text-[7px] font-bold fill-teal-700">7 cm</text>
            <text x="24" y="23" className="text-[7px] font-bold fill-slate-600">14 cm</text>
          </svg>
        )
      }
    ]
  }
};

export const TriangleLinesSorter: React.FC<TriangleLinesSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-triangle-lines',
  topicTitle = '2. Háromszögek nevezetes vonalai'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Háromszögek Nevezetes Vonalai Csoportosító"
      subtitle="Válaszd ki a geometriai kártyát, majd kattints a megfelelő kategóriára a besoroláshoz!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default TriangleLinesSorter;
