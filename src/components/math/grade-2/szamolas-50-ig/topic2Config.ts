import React from 'react';

export const TOPIC_II_GRADE = 2 as const;
export const TOPIC_II_CHAPTER_ID = 'szamolas-50-ig' as const;
export const TOPIC_II_ID = 'g2-numbers-to-50' as const;

// NOTE: Must NOT contain the word "lecke" because TheoryTemplate ignores badges matching /lecke/i.
export const TOPIC_II_BADGE_THEORY =
  '2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG' as const;
export const TOPIC_II_BADGE_QUIZ =
  '2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • KVÍZ' as const;
export const TOPIC_II_BADGE_MATCHER =
  '2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • PÁROSÍTÓ' as const;
export const TOPIC_II_BADGE_SORTER =
  '2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • CSOPORTOSÍTÓ' as const;

export const TOPIC_II_SVG_FONT = 'system-ui, Segoe UI, sans-serif' as const;

export const TOPIC_II_SVG_PALETTE = {
  cardBg: '#f8fafc',
  cardBorder: '#cbd5e1',
  ink: '#1e293b',
  mutedInk: '#475569',
  tensFill: '#d8b4fe',
  tensStroke: '#6b21a8',
  tensText: '#4c1d95',
  onesFill: '#86efac',
  onesStroke: '#15803d',
  onesText: '#14532d',
  accentBlue: '#2563eb',
  accentRed: '#dc2626',
  accentAmber: '#d97706',
} as const;

export interface QFigProps {
  children: React.ReactNode;
  height?: number;
  h?: number;
  width?: number;
  w?: number;
  className?: string;
}

export const QFig: React.FC<QFigProps> = ({
  children,
  height,
  h,
  width,
  w,
  className = 'w-full max-w-[300px] h-auto mx-auto',
}) => {
  const resolvedWidth = width ?? w ?? 260;
  const resolvedHeight = height ?? h ?? 130;

  return React.createElement(
    'svg',
    {
      viewBox: `0 0 ${resolvedWidth} ${resolvedHeight}`,
      className,
      xmlns: 'http://www.w3.org/2000/svg',
      fontFamily: TOPIC_II_SVG_FONT,
    },
    React.createElement('rect', {
      x: 1,
      y: 1,
      width: resolvedWidth - 2,
      height: resolvedHeight - 2,
      rx: 12,
      fill: TOPIC_II_SVG_PALETTE.cardBg,
      stroke: TOPIC_II_SVG_PALETTE.cardBorder,
    }),
    children
  );
};
