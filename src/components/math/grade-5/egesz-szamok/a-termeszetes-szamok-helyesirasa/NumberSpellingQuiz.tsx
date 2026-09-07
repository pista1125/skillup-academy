import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Pencil,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NumberSpellingMatcher } from './NumberSpellingMatcher';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher';

interface QuizQuestion {
  id: string;
  prompt: string;
  highlightValue: string;
  questionTypeBadge: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  breakdown?: { label: string; value: string }[];
}

interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentGradient: string;
  iconBg: string;
  questions: QuizQuestion[];
}

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Számok 2 000-ig (Kétezres szabály, egybeírás)',
    range: '1 – 2 000',
    focus: 'Egybeírás 2000-ig, tőszámnevek és alapvető sorszámnevek',
    color: 'violet',
    badgeBg: 'bg-violet-50 dark:bg-violet-950/40',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-700 dark:text-violet-300',
    accentGradient: 'from-violet-500 to-indigo-600',
    iconBg: 'bg-violet-500',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hogyan írjuk le helyesen betűvel a megadott számot?',
        highlightValue: '15',
        questionTypeBadge: 'Tőszámnév ≤ 2 000',
        options: ['tizenöt', 'tizen-öt', 'tíz öt', 'tizen öt'],
        correctAnswer: 'tizenöt',
        explanation: 'A 2000-nél nem nagyobb összetett tőszámneveket egyetlen szóba írjuk, kötőjel nélkül.',
        breakdown: [
          { label: 'Szám', value: '15' },
          { label: 'Szabály', value: '≤ 2 000: egybeírás' },
          { label: 'Helyes alak', value: 'tizenöt' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Hogyan írjuk le helyesen betűvel a következő számot?',
        highlightValue: '482',
        questionTypeBadge: 'Tőszámnév ≤ 2 000',
        options: [
          'négyszáznyolcvankettő',
          'négyszáz-nyolcvankettő',
          'négyszáz nyolcvankettő',
          'négyszáz-nyolcvan-kettő'
        ],
        correctAnswer: 'négyszáznyolcvankettő',
        explanation: '2000-ig minden összetett számot teljesen egybeírunk: négyszáznyolcvankettő.',
        breakdown: [
          { label: 'Szám', value: '482' },
          { label: 'Szabály', value: '≤ 2 000: egybeírás' },
          { label: 'Helyes alak', value: 'négyszáznyolcvankettő' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Hogyan írjuk le helyesen betűvel az 1 500-at?',
        highlightValue: '1 500',
        questionTypeBadge: 'Kétezres szabály',
        options: ['ezerötszáz', 'ezer-ötszáz', 'ezer ötszáz', 'egy-ezerötszáz'],
        correctAnswer: 'ezerötszáz',
        explanation: 'Mivel 1500 ≤ 2000, ezért egybeírjuk kötőjel nélkül: ezerötszáz.',
        breakdown: [
          { label: 'Szám', value: '1 500' },
          { label: 'Határ', value: '1500 ≤ 2000' },
          { label: 'Helyes alak', value: 'ezerötszáz' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Hogyan írjuk le helyesen az 1 999-et betűvel?',
        highlightValue: '1 999',
        questionTypeBadge: 'Kétezres szabály',
        options: [
          'ezerkilencszázkilencvenkilenc',
          'ezer-kilencszázkilencvenkilenc',
          'ezerkilencszáz-kilencvenkilenc',
          'ezer kilencszáz kilencvenkilenc'
        ],
        correctAnswer: 'ezerkilencszázkilencvenkilenc',
        explanation: '1999 még a 2000-es határ alatt van, így egyetlen hosszú szóként írjuk le.',
        breakdown: [
          { label: 'Szám', value: '1 999' },
          { label: 'Szabály', value: '≤ 2 000: egybeírás' },
          { label: 'Helyes alak', value: 'ezerkilencszázkilencvenkilenc' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Hogyan írjuk le helyesen a 2 000-et betűvel?',
        highlightValue: '2 000',
        questionTypeBadge: 'Kerek határszám',
        options: ['kétezer', 'két-ezer', 'kettő ezer', 'két ezer'],
        correctAnswer: 'kétezer',
        explanation: 'A 2000 pontosan a határ, és egybeírjuk: kétezer.',
        breakdown: [
          { label: 'Szám', value: '2 000' },
          { label: 'Szabály', value: 'Kerek ezres: egybeírás' },
          { label: 'Helyes alak', value: 'kétezer' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Melyik a szabályos leírása az 5. sorszámnévnek?',
        highlightValue: '5.',
        questionTypeBadge: 'Sorszámnév',
        options: ['ötödik', '5.-ik', 'öt-ödik', '5-ik'],
        correctAnswer: 'ötödik',
        explanation: 'A sorszámnév utáni pont már kifejezi az „-ik” képzőt, betűvel leírva: ötödik.',
        breakdown: [
          { label: 'Jelölés', value: '5.' },
          { label: 'Típus', value: 'Sorszámnév' },
          { label: 'Kiejtés', value: 'ötödik' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Miért HIBÁS az „1 500 = ezer-ötszáz” felírás?',
        highlightValue: 'ezer-ötszáz',
        questionTypeBadge: 'Hibaelemzés',
        options: [
          'Mert 2 000-ig minden összetett számot egybeírunk',
          'Mert az ezer után mindig szóközt kell tenni',
          'Mert az ötszáz elé két kötőjel kell',
          'Mert az 1500-at csak római számmal szabad leírni'
        ],
        correctAnswer: 'Mert 2 000-ig minden összetett számot egybeírunk',
        explanation: 'A kétezres szabály szerint 2000-ig nem használunk kötőjelet a számnevekben.',
        breakdown: [
          { label: 'Hibás alak', value: 'ezer-ötszáz' },
          { label: 'Hiba oka', value: 'Felesleges kötőjel 2000 alatt' },
          { label: 'Helyes alak', value: 'ezerötszáz' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Hogyan írjuk le helyesen a 780-at betűvel?',
        highlightValue: '780',
        questionTypeBadge: 'Tőszámnév ≤ 2 000',
        options: ['hétszáznyolcvan', 'hétszáz-nyolcvan', 'hét-száz-nyolcvan', 'hétszáz nyolcvan'],
        correctAnswer: 'hétszáznyolcvan',
        explanation: '780 ≤ 2000, így teljesen egybeírjuk: hétszáznyolcvan.',
        breakdown: [
          { label: 'Szám', value: '780' },
          { label: 'Szabály', value: '≤ 2 000: egybeírás' },
          { label: 'Helyes alak', value: 'hétszáznyolcvan' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Milyen kérdésre válaszolnak a tőszámnevek (pl. egy, tíz, száz)?',
        highlightValue: 'Tőszámnevek',
        questionTypeBadge: 'Nyelvtani fogalom',
        options: ['Hány? Mennyi?', 'Hányadik?', 'Hányad rész?', 'Milyen?'],
        correctAnswer: 'Hány? Mennyi?',
        explanation: 'A tőszámnevek mennyiséget fejeznek ki, kérdésük: Hány? Mennyi?',
        breakdown: [
          { label: 'Szófaj', value: 'Tőszámnév' },
          { label: 'Kérdése', value: 'Hány? Mennyi?' },
          { label: 'Példa', value: 'öt, húsz, száz' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Hogyan írjuk le betűvel a 12. sorszámnevet?',
        highlightValue: '12.',
        questionTypeBadge: 'Sorszámnév',
        options: ['tizenkettedik', '12-edik', 'tizenkettő-ik', 'tizenkettődik'],
        correctAnswer: 'tizenkettedik',
        explanation: '12. betűvel leírva: tizenkettedik (vagy tizenkettedik helyezett).',
        breakdown: [
          { label: 'Szám', value: '12.' },
          { label: 'Szófaj', value: 'Sorszámnév' },
          { label: 'Helyes alak', value: 'tizenkettedik' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Számok 2 001 – 99 999 (Kötőjelezés és kerek ezresek)',
    range: '2 001 – 99 999',
    focus: 'Kötőjel az osztályhatárokon, kerek ezresek kivétele',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-violet-600',
    iconBg: 'bg-indigo-500',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Hogyan írjuk le helyesen a 2 001-et betűvel?',
        highlightValue: '2 001',
        questionTypeBadge: 'Kétezres szabály > 2000',
        options: ['kétezer-egy', 'kétezeregy', 'két ezer egy', 'kétezer egy'],
        correctAnswer: 'kétezer-egy',
        explanation: 'Mivel 2001 > 2000, az ezresek és az egyesek osztálya közé kötőjelet teszünk: kétezer-egy.',
        breakdown: [
          { label: 'Szám', value: '2 001' },
          { label: 'Feltétel', value: '2001 > 2000' },
          { label: 'Kötőjel helye', value: 'kétezer-egy' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Hogyan írjuk le helyesen a 3 000-et betűvel?',
        highlightValue: '3 000',
        questionTypeBadge: 'Kerek ezres',
        options: ['háromezer', 'három-ezer', 'három ezer', 'harmadezer'],
        correctAnswer: 'háromezer',
        explanation: 'A 2000-nél nagyobb kerek ezreseket (ha nincs utánuk egyéb számjegy) egybeírjuk: háromezer.',
        breakdown: [
          { label: 'Szám', value: '3 000' },
          { label: 'Típus', value: 'Kerek ezres' },
          { label: 'Helyes alak', value: 'háromezer' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Hogyan írjuk le helyesen a 4 520-at betűvel?',
        highlightValue: '4 520',
        questionTypeBadge: 'Kötőjelezés > 2000',
        options: [
          'négyezer-ötszázhúsz',
          'négyezerötszázhúsz',
          'négyezer ötszázhúsz',
          'négy-ezer-ötszáz-húsz'
        ],
        correctAnswer: 'négyezer-ötszázhúsz',
        explanation: '4520 > 2000: az ezresek osztálya (négyezer) és az egyesek osztálya (ötszázhúsz) közé kötőjel kerül.',
        breakdown: [
          { label: 'Szám', value: '4 520' },
          { label: 'Osztályok', value: '4 ezer | 520' },
          { label: 'Helyes alak', value: 'négyezer-ötszázhúsz' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hogyan írjuk le helyesen a 12 300-at betűvel?',
        highlightValue: '12 300',
        questionTypeBadge: 'Kötőjelezés > 2000',
        options: [
          'tizenkétezer-háromszáz',
          'tizenkét-ezer-háromszáz',
          'tizenkétezerháromszáz',
          'tizenkét ezer háromszáz'
        ],
        correctAnswer: 'tizenkétezer-háromszáz',
        explanation: 'Az ezresek osztályát (tizenkétezer) és a százasokat (háromszáz) kötőjellel választjuk el.',
        breakdown: [
          { label: 'Szám', value: '12 300' },
          { label: 'Osztályok', value: '12 ezer | 300' },
          { label: 'Helyes alak', value: 'tizenkétezer-háromszáz' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Hogyan írjuk le helyesen a 45 800-at betűvel?',
        highlightValue: '45 800',
        questionTypeBadge: 'Kötőjelezés > 2000',
        options: [
          'negyvenötezer-nyolcszáz',
          'negyvenöt-ezer-nyolcszáz',
          'negyvenötezer nyolcszáz',
          'negyven-ötezer-nyolcszáz'
        ],
        correctAnswer: 'negyvenötezer-nyolcszáz',
        explanation: 'Az ezresek osztálya (negyvenötezer) egybeírandó, utána kötőjellel kapcsolódik a nyolcszáz.',
        breakdown: [
          { label: 'Szám', value: '45 800' },
          { label: 'Ezresek', value: 'negyvenötezer' },
          { label: 'Helyes alak', value: 'negyvenötezer-nyolcszáz' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mi a helyes leírása a 70 005 számnak betűvel?',
        highlightValue: '70 005',
        questionTypeBadge: 'Kötőjelezés > 2000',
        options: ['hetvenezer-öt', 'hetvenezer öt', 'hetven-ezer-öt', 'hetvenezeröt'],
        correctAnswer: 'hetvenezer-öt',
        explanation: '70 005 = 70 ezer + 5. Mivel > 2000, az ezresek és az egyesek közé kötőjel kerül: hetvenezer-öt.',
        breakdown: [
          { label: 'Szám', value: '70 005' },
          { label: 'Osztályok', value: '70 ezer | 5' },
          { label: 'Helyes alak', value: 'hetvenezer-öt' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Hogyan írjuk le helyesen a 20 000-et betűvel?',
        highlightValue: '20 000',
        questionTypeBadge: 'Kerek tízezres',
        options: ['húszezer', 'húsz-ezer', 'húsz ezer', 'húszezres'],
        correctAnswer: 'húszezer',
        explanation: 'A kerek tízezreseket egyetlen szóba írjuk: húszezer.',
        breakdown: [
          { label: 'Szám', value: '20 000' },
          { label: 'Típus', value: 'Kerek tízezres' },
          { label: 'Helyes alak', value: 'húszezer' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Hová kerül a kötőjel a 99 999 leírásakor?',
        highlightValue: '99 999',
        questionTypeBadge: 'Kötőjel pozíciója',
        options: [
          'Az ezresek és az egyesek osztálya közé (kilencvenkilencezer-kilencszázkilencvenkilenc)',
          'Minden számjegy neve közé (kilencven-kilenc-ezer...)',
          'Sehová, mert 100 000 alatt mindent egybeírunk',
          'Az ezer szó elé és után is'
        ],
        correctAnswer: 'Az ezresek és az egyesek osztálya közé (kilencvenkilencezer-kilencszázkilencvenkilenc)',
        explanation: 'A kötőjel kizárólag a hármas számcsoportok (számosztályok) határára kerül.',
        breakdown: [
          { label: 'Szám', value: '99 999' },
          { label: 'Kötőjel helye', value: '...ezer-...' },
          { label: 'Helyes alak', value: 'kilencvenkilencezer-kilencszázkilencvenkilenc' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Melyik a helyes sorszámnév alak: 8. ?',
        highlightValue: '8.',
        questionTypeBadge: 'Sorszámnév',
        options: ['nyolcadik', 'nyolcad-ik', '8-adik', 'nyolc-adik'],
        correctAnswer: 'nyolcadik',
        explanation: '8. betűvel leírva: nyolcadik.',
        breakdown: [
          { label: 'Jelölés', value: '8.' },
          { label: 'Helyes alak', value: 'nyolcadik' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mi a HIBA a „háromezer ötszáz” alakban?',
        highlightValue: 'háromezer ötszáz',
        questionTypeBadge: 'Hibaelemzés',
        options: [
          'Szóköz van a kötőjel helyén',
          'Az ötszázat külön kell választani egybeírással',
          'A háromezer helyett három ezer kell',
          'Nem szabad betűvel leírni'
        ],
        correctAnswer: 'Szóköz van a kötőjel helyén',
        explanation: '2000 felett az osztályok határán kötőjelet kell tenni, nem szóközt: háromezer-ötszáz.',
        breakdown: [
          { label: 'Hibás alak', value: 'háromezer ötszáz' },
          { label: 'Hiba oka', value: 'Szóköz kötőjel helyett' },
          { label: 'Helyes alak', value: 'háromezer-ötszáz' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Milliók, több kötőjel, dátumok és vegyes helyesírás',
    range: '100 000 – 100 000 000+',
    focus: 'Több kötőjeles számok, dátumok és összetett sorszámnevek',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-pink-600',
    iconBg: 'bg-purple-500',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Hogyan írjuk le helyesen az 1 250 000-et betűvel?',
        highlightValue: '1 250 000',
        questionTypeBadge: 'Milliók helyesírása',
        options: [
          'egymillió-kétszázötvenezer',
          'egymilliókétszázötvenezer',
          'egy-millió-kétszázötvenezer',
          'egymillió kétszázötvenezer'
        ],
        correctAnswer: 'egymillió-kétszázötvenezer',
        explanation: 'A milliók osztálya (egymillió) és az ezresek osztálya (kétszázötvenezer) közé kötőjel kerül.',
        breakdown: [
          { label: 'Szám', value: '1 250 000' },
          { label: 'Osztályok', value: '1 millió | 250 ezer' },
          { label: 'Helyes alak', value: 'egymillió-kétszázötvenezer' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Hogyan írjuk le helyesen a 4 520 030-at betűvel?',
        highlightValue: '4 520 030',
        questionTypeBadge: 'Több kötőjeles szám',
        options: [
          'négymillió-ötszázhúszezer-harminc',
          'négymillióötszázhúszezerharminc',
          'négy-millió-ötszáz-húszezer-harminc',
          'négymillió ötszázhúszezer harminc'
        ],
        correctAnswer: 'négymillió-ötszázhúszezer-harminc',
        explanation: 'Három osztály van: milliók, ezresek és egyesek, ezért 2 darab kötőjel kerül az osztályhatárokra.',
        breakdown: [
          { label: 'Szám', value: '4 520 030' },
          { label: 'Tagolás', value: '4 M | 520 e | 030 E' },
          { label: 'Helyes alak', value: 'négymillió-ötszázhúszezer-harminc' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Hogyan írjuk le helyesen az 5 000 000-t betűvel?',
        highlightValue: '5 000 000',
        questionTypeBadge: 'Kerek milliós',
        options: ['ötmillió', 'öt-millió', 'öt millió', 'ötmilliós'],
        correctAnswer: 'ötmillió',
        explanation: 'A kerek milliókat egybeírjuk kötőjel nélkül: ötmillió.',
        breakdown: [
          { label: 'Szám', value: '5 000 000' },
          { label: 'Típus', value: 'Kerek milliós' },
          { label: 'Helyes alak', value: 'ötmillió' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Hogyan írjuk le helyesen az 5 000 020-at betűvel?',
        highlightValue: '5 000 020',
        questionTypeBadge: 'Kihagyott osztály',
        options: ['ötmillió-húsz', 'ötmillióhúsz', 'öt-millió-húsz', 'ötmillió húsz'],
        correctAnswer: 'ötmillió-húsz',
        explanation: 'Az ezresek osztálya 0, így kimarad, a milliók és az egyesek közé pedig kötőjel kerül: ötmillió-húsz.',
        breakdown: [
          { label: 'Szám', value: '5 000 020' },
          { label: 'Osztályok', value: '5 M | 0 e | 20 E' },
          { label: 'Helyes alak', value: 'ötmillió-húsz' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik a szabályos magyar dátumírás?',
        highlightValue: 'Dátumírás',
        questionTypeBadge: 'Dátumok',
        options: [
          '2026. szeptember 7.',
          '2 026. szeptember 7',
          '2026 szeptember 7',
          '2026. szeptember. 7.'
        ],
        correctAnswer: '2026. szeptember 7.',
        explanation: 'Az évszámot nem tagoljuk szóközzel, és az év, valamint a nap után pontot teszünk: 2026. szeptember 7.',
        breakdown: [
          { label: 'Évszám', value: '2026. (tagolatlan)' },
          { label: 'Hónap', value: 'szeptember (kisbetű)' },
          { label: 'Nap', value: '7. (ponttal)' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Miért HIBÁS a „5.-ik helyen végzett” írásmód?',
        highlightValue: '5.-ik',
        questionTypeBadge: 'Hibaelemzés',
        options: [
          'Mert a pont már magában jelöli az „-ik” képzőt',
          'Mert a sorszámnevek elé mindig betűt kell tenni',
          'Mert a helyén szóközt kellene hagyni',
          'Mert az 5-öt csak római számmal szabad leírni'
        ],
        correctAnswer: 'Mert a pont már magában jelöli az „-ik” képzőt',
        explanation: 'A számjegy utáni pont már tartalmazza az „-ik” sorszámnévképzőt, így kétszer jelölnénk: helyesen 5. vagy 5-ödik.',
        breakdown: [
          { label: 'Hibás alak', value: '5.-ik' },
          { label: 'Hiba oka', value: 'Kettős képzőjelölés' },
          { label: 'Helyes alak', value: '5. vagy 5-ödik' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Hogyan írjuk le helyesen a 100 005-öt betűvel?',
        highlightValue: '100 005',
        questionTypeBadge: 'Kötőjelezés > 2000',
        options: ['egyszázezer-öt', 'egyszázezer öt', 'egyszáz-ezer-öt', 'egyszázezeröt'],
        correctAnswer: 'egyszázezer-öt',
        explanation: '100 005 = egyszázezer (100 ezer) + öt, az osztályhatáron kötőjellel: egyszázezer-öt.',
        breakdown: [
          { label: 'Szám', value: '100 005' },
          { label: 'Osztályok', value: '100 ezer | 5' },
          { label: 'Helyes alak', value: 'egyszázezer-öt' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Hány darab kötőjel van a 25 300 450 szám betűs leírásában?',
        highlightValue: '25 300 450',
        questionTypeBadge: 'Kötőjelek száma',
        options: [
          '2 darab (huszonötmillió-háromszázezer-négyszázötven)',
          '1 darab (huszonötmillió-háromszázezernégyszázötven)',
          '3 darab (huszon-öt-millió-...)',
          '0 darab (mindent egybeírunk)'
        ],
        correctAnswer: '2 darab (huszonötmillió-háromszázezer-négyszázötven)',
        explanation: 'Három osztály kapcsolódik össze (milliók, ezresek, egyesek), ami 2 kötőjelet jelent az osztályhatárokon.',
        breakdown: [
          { label: 'Szám', value: '25 300 450' },
          { label: 'Határok száma', value: '2 osztályhatár' },
          { label: 'Helyes alak', value: 'huszonötmillió-háromszázezer-négyszázötven' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Hogyan írjuk le helyesen toldalékkal az „5. helyen végzettnek” kifejezést számjeggyel?',
        highlightValue: '5. + toldalék',
        questionTypeBadge: 'Toldalékolás',
        options: ['5.-nek vagy 5-nek', '5-ödiknek', '5.-iknek', '5diknek'],
        correctAnswer: '5.-nek vagy 5-nek',
        explanation: 'A sorszámnévhez kötőjellel kapcsoljuk a toldalékot (5.-nek vagy 5-nek).',
        breakdown: [
          { label: 'Alap', value: '5. (ötödik)' },
          { label: 'Toldalék', value: '-nek' },
          { label: 'Helyes alak', value: '5.-nek vagy 5-nek' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Hogyan írjuk le helyesen a 3 000 000 000 (3 milliárd) számnevet betűvel?',
        highlightValue: '3 000 000 000',
        questionTypeBadge: 'Milliárdok',
        options: ['hárommilliárd', 'három-milliárd', 'három milliárd', 'hárommilliárdos'],
        correctAnswer: 'hárommilliárd',
        explanation: 'A kerek milliárdokat egybeírjuk: hárommilliárd.',
        breakdown: [
          { label: 'Szám', value: '3 000 000 000' },
          { label: 'Típus', value: 'Kerek milliárdos' },
          { label: 'Helyes alak', value: 'hárommilliárd' }
        ]
      }
    ]
  }
};

const NUMBER_SPELLING_CHEAT_SHEET = [
  { rule: '≤ 2 000 (Egybeírás)', example: '1500 ➜ ezerötszáz', note: '2000-ig nincs kötőjel!' },
  { rule: '> 2 000 (Kötőjelezés)', example: '2001 ➜ kétezer-egy', note: 'Osztályok határán kötőjel' },
  { rule: 'Kerek ezresek/milliók', example: '3000 ➜ háromezer', note: 'Egybeírjuk kötőjel nélkül' },
  { rule: 'Sorszámnevek', example: '5. ➜ ötödik', note: 'Pont után tilos az -ik (5.-ik ✗)' },
  { rule: 'Évszámok', example: '2026', note: 'Nincs szóközös tagolás!' },
  { rule: 'Dátumok', example: '2026. szeptember 7.', note: 'Év és nap után pont' }
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface NumberSpellingQuizProps {
  onBack: () => void;
}

export function NumberSpellingQuiz({ onBack }: NumberSpellingQuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Toggle fullscreen
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Trigger confetti on completion
  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsCompleted(false);

    const prepared = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(prepared);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
    if (!currentQ) return;

    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    const total = questions.length || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions.length : 0);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isAnswerChecked || isCompleted || !selectedLevel) return;
      const keyMap: { [key: string]: number } = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3
      };
      if (e.key in keyMap) {
        const optionIdx = keyMap[e.key];
        const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
        if (currentQ && currentQ.options[optionIdx]) {
          handleOptionClick(currentQ.options[optionIdx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameMode, isAnswerChecked, isCompleted, selectedLevel, currentIndex, questions]);

  // 1. Initial Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top bar with back button and cheat sheet */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vissza a témakörökhöz
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-violet-600 dark:text-violet-400" />
                  <span className="hidden sm:inline">Kilépés</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span className="hidden sm:inline">Teljes képernyő</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="rounded-xl h-8 px-3 text-xs font-bold border-violet-300 bg-violet-50/50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800 hover:bg-violet-100"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-violet-600" />
              Helyesírási segédlet
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">✍️</span>
            <span>A Számok Helyesírása Gyakorló</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a kétezres szabályt, a kötőjelezést és a sorszámneveket többválasztós kvízzel vagy kártyanyitogatós memóriajátékkal!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-violet-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'matcher'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
              Kártyás Párosító
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-violet-200 dark:border-violet-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-violet-900 dark:text-violet-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-violet-600" />
                A számok helyesírási szabályai (Kétezres szabály)
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-violet-800 dark:text-violet-300 hover:bg-violet-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {NUMBER_SPELLING_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-violet-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-violet-600 dark:text-violet-400">{item.rule}</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.example}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-violet-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-wrap gap-4">
              <div><strong>≤ 2000:</strong> Egybeírás (pl. <em>ezerötszáz</em>)</div>
              <div><strong>&gt; 2000:</strong> Kötőjel az osztályhatáron (pl. <em>kétezer-egy</em>)</div>
              <div><strong>Kerek ezresek:</strong> Egybeírás (pl. <em>háromezer</em>)</div>
            </div>
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = QUIZ_LEVELS[level];
            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-serif font-black text-lg", cfg.iconBg)}>
                      {level === 1 ? 'I' : level === 2 ? 'II' : 'III'}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : '10 Pár'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {cfg.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {cfg.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Tartomány:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cfg.range}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-mono text-[11px] font-bold text-violet-600 dark:text-violet-400">{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : 'Párosító Indítása'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const levelConfig = QUIZ_LEVELS[selectedLevel];
  const currentQuestion = questions[currentIndex] || levelConfig.questions[currentIndex];

  // 2. Quiz Completed View (Only for Quiz Mode)
  if (isCompleted && gameMode === 'quiz') {
    const totalQuestions = levelConfig.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = score >= 7;

    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="w-20 h-20 bg-gradient-to-tr from-violet-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-violet-100 dark:ring-violet-950/60 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-2xl font-black text-violet-600 dark:text-violet-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-violet-600 hover:bg-violet-700 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, 'quiz')}
              className="flex-1 h-11 rounded-xl text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>

            <Button
              variant="ghost"
              onClick={() => setSelectedLevel(null)}
              className="h-11 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Szintek
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active View with Right-side Wordwall Sidebar
  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left",
        isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
      )}
    >
      {/* Top Bar: Back button, Level selector pill, Mode switcher, Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedLevel(null)}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Szintek
          </Button>

          {/* Fullscreen button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="rounded-xl h-8 px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-violet-600 dark:text-violet-400" />
                <span className="hidden sm:inline">Kilépés</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span className="hidden sm:inline">Teljes képernyő</span>
              </>
            )}
          </Button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Quick level switcher pills */}
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleStartLevel(lvl, gameMode)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {lvl === 1 ? '1. Könnyű' : lvl === 2 ? '2. Közepes' : '3. Nehéz'}
            </button>
          ))}
        </div>

        {/* Mode / Score indicator */}
        <div className="flex items-center gap-2">
          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
              <div className="flex items-center gap-1 font-black text-violet-600 dark:text-violet-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Párosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' ? (
            /* QUIZ MODE WORKSPACE */
            <div className="space-y-3">
              {/* Slim Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                  <span>{levelConfig.title} feladványai</span>
                  <span>{currentIndex + 1} / {levelConfig.questions.length}</span>
                </div>
                <ProgressBar
                  current={currentIndex + 1}
                  total={levelConfig.questions.length}
                  color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'amber' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-3">
                  <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    <CardContent className="p-4 sm:p-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 mb-2 border border-violet-200 dark:border-violet-800">
                        <Pencil className="w-3 h-3 text-violet-600" />
                        {currentQuestion.questionTypeBadge}
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-violet-50 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-violet-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-violet-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step below question */}
                  {isAnswerChecked && (
                    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className={cn(
                        "p-3.5 rounded-2xl border-2 shadow-xs text-left",
                        selectedOption === currentQuestion.correctAnswer
                          ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80"
                          : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80"
                      )}>
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                            selectedOption === currentQuestion.correctAnswer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={cn(
                              "text-xs sm:text-sm font-black mb-0.5",
                              selectedOption === currentQuestion.correctAnswer
                                ? "text-emerald-900 dark:text-emerald-200"
                                : "text-rose-900 dark:text-rose-200"
                            )}>
                              {selectedOption === currentQuestion.correctAnswer ? 'Helyes Válasz! 🎉' : 'Nem jó válasz! 🤔'}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-1.5">
                              {currentQuestion.explanation}
                            </p>

                            {currentQuestion.breakdown && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {currentQuestion.breakdown.map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-violet-600 dark:text-violet-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-violet-600 dark:hover:bg-violet-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-400" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Válaszd ki a megoldást:
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Gombok: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-violet-500 hover:shadow-xs dark:hover:border-violet-500";

                      if (isAnswerChecked) {
                        if (isCorrect) {
                          buttonStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-xs";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-800 dark:text-rose-200 shadow-xs";
                        } else {
                          buttonStyle = "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "relative h-13 sm:h-14 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold">{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-violet-50/60 dark:bg-slate-850/80 rounded-xl border border-violet-200/50 dark:border-slate-800 text-[11px] text-violet-900 dark:text-violet-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                      <span>Ügyelj a kétezres szabályra és a kötőjelezésre!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* MATCHER MODE WORKSPACE */
            <NumberSpellingMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          )}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-violet-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-violet-50 dark:bg-violet-950/50 border-violet-400 text-violet-900 dark:text-violet-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-violet-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Többválasztós teszt</div>
                </div>
              </button>

              {/* Matcher Mode Button */}
              <button
                onClick={() => setGameMode('matcher')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'matcher'
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Kártyanyitogatás</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Párosító memóriajáték</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Nehézségi szint</span>
            </div>

            <div className="flex flex-col gap-1">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleStartLevel(lvl, gameMode)}
                  className={cn(
                    "w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between",
                    selectedLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-violet-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű (1–2 000)' : lvl === 2 ? 'Közepes (2 001–99 999)' : 'Nehéz (100 000+)'}</span>
                  {selectedLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tools & Rules Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-9 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-start gap-2"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  Ablakos nézet
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                  Teljes képernyő
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-violet-300 bg-violet-50/50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800 hover:bg-violet-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-violet-600" />
              Helyesírási segédlet
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="w-full h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium justify-start"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-violet-300 dark:border-violet-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-600" />
                A számok helyesírási szabályai (Kétezres szabály)
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="rounded-xl h-8 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
              {NUMBER_SPELLING_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-violet-600 dark:text-violet-400">{item.rule}</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.example}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-violet-50/80 dark:bg-violet-950/40 p-3 rounded-xl border border-violet-200 dark:border-violet-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>≤ 2000:</strong> Minden számot egybeírunk: pl. <em>tizenöt, ezerötszáz, kétezer</em>.</p>
              <p><strong>&gt; 2000:</strong> A hármas számcsoportok (osztályok) határán kötőjelet teszünk: pl. <em>kétezer-egy, negyvenötezer-háromszáz</em>.</p>
              <p><strong>Kerek ezresek:</strong> Egybeíródnak: pl. <em>háromezer, négyezer, ötmillió</em>.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-violet-600 hover:bg-violet-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberSpellingQuiz;

