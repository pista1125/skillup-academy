import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Download,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Info,
  CheckCircle2,
  XCircle,
  BookOpen,
  Scale,
  Calculator,
  Equal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { exportElementToPDF } from '@/utils/pdfExport';
import { MathText, parseFractionsInNode } from '@/components/math/shared/MathText';

// --- Theme Color Mappings ---
export type ThemeColor =
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'emerald'
  | 'teal'
  | 'sky'
  | 'rose'
  | 'amber'
  | 'orange'
  | 'slate';

const colorStyles: Record<
  ThemeColor,
  {
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    ruleBg: string;
    ruleBorder: string;
    ruleText: string;
    sectionBadge: string;
    buttonQuizBorder: string;
    buttonQuizBg: string;
    buttonQuizText: string;
    buttonQuizHover: string;
    buttonPdf: string;
    calloutGradient: string;
    calloutShadow: string;
  }
> = {
  purple: {
    badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-800 dark:text-purple-300',
    ruleBg: 'bg-purple-50 dark:bg-slate-800/80',
    ruleBorder: 'border-purple-200/60 dark:border-slate-700',
    ruleText: 'text-purple-700 dark:text-purple-300',
    sectionBadge: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300',
    buttonQuizBorder: 'border-purple-300 dark:border-purple-800',
    buttonQuizBg: 'bg-purple-50/60 dark:bg-purple-950/40',
    buttonQuizText: 'text-purple-800 dark:text-purple-300',
    buttonQuizHover: 'hover:bg-purple-100 dark:hover:bg-purple-900/50',
    buttonPdf: 'bg-purple-600 hover:bg-purple-700 text-white',
    calloutGradient: 'from-purple-600 via-pink-600 to-purple-700',
    calloutShadow: 'shadow-purple-500/20'
  },
  indigo: {
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/60',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
    ruleBg: 'bg-indigo-50 dark:bg-slate-800/80',
    ruleBorder: 'border-indigo-200/60 dark:border-slate-700',
    ruleText: 'text-indigo-700 dark:text-indigo-300',
    sectionBadge: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300',
    buttonQuizBorder: 'border-indigo-300 dark:border-indigo-800',
    buttonQuizBg: 'bg-indigo-50/60 dark:bg-indigo-950/40',
    buttonQuizText: 'text-indigo-800 dark:text-indigo-300',
    buttonQuizHover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/50',
    buttonPdf: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    calloutGradient: 'from-indigo-600 via-purple-600 to-indigo-700',
    calloutShadow: 'shadow-indigo-500/20'
  },
  violet: {
    badgeBg: 'bg-violet-100 dark:bg-violet-950/60',
    badgeBorder: 'border-violet-200 dark:border-violet-800',
    badgeText: 'text-violet-800 dark:text-violet-300',
    ruleBg: 'bg-violet-50 dark:bg-slate-800/80',
    ruleBorder: 'border-violet-200/60 dark:border-slate-700',
    ruleText: 'text-violet-700 dark:text-violet-300',
    sectionBadge: 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300',
    buttonQuizBorder: 'border-violet-300 dark:border-violet-800',
    buttonQuizBg: 'bg-violet-50/60 dark:bg-violet-950/40',
    buttonQuizText: 'text-violet-800 dark:text-violet-300',
    buttonQuizHover: 'hover:bg-violet-100 dark:hover:bg-violet-900/50',
    buttonPdf: 'bg-violet-600 hover:bg-violet-700 text-white',
    calloutGradient: 'from-violet-600 via-purple-600 to-violet-700',
    calloutShadow: 'shadow-violet-500/20'
  },
  blue: {
    badgeBg: 'bg-blue-100 dark:bg-blue-950/60',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-800 dark:text-blue-300',
    ruleBg: 'bg-blue-50 dark:bg-slate-800/80',
    ruleBorder: 'border-blue-200/60 dark:border-slate-700',
    ruleText: 'text-blue-700 dark:text-blue-300',
    sectionBadge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300',
    buttonQuizBorder: 'border-blue-300 dark:border-blue-800',
    buttonQuizBg: 'bg-blue-50/60 dark:bg-blue-950/40',
    buttonQuizText: 'text-blue-800 dark:text-blue-300',
    buttonQuizHover: 'hover:bg-blue-100 dark:hover:bg-blue-900/50',
    buttonPdf: 'bg-blue-600 hover:bg-blue-700 text-white',
    calloutGradient: 'from-blue-600 via-indigo-600 to-blue-700',
    calloutShadow: 'shadow-blue-500/20'
  },
  cyan: {
    badgeBg: 'bg-cyan-100 dark:bg-cyan-950/60',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    ruleBg: 'bg-cyan-50 dark:bg-slate-800/80',
    ruleBorder: 'border-cyan-200/60 dark:border-slate-700',
    ruleText: 'text-cyan-700 dark:text-cyan-300',
    sectionBadge: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300',
    buttonQuizBorder: 'border-cyan-300 dark:border-cyan-800',
    buttonQuizBg: 'bg-cyan-50/60 dark:bg-cyan-950/40',
    buttonQuizText: 'text-cyan-800 dark:text-cyan-300',
    buttonQuizHover: 'hover:bg-cyan-100 dark:hover:bg-cyan-900/50',
    buttonPdf: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    calloutGradient: 'from-cyan-600 via-teal-600 to-blue-700',
    calloutShadow: 'shadow-cyan-500/20'
  },
  sky: {
    badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
    badgeBorder: 'border-sky-200 dark:border-sky-800',
    badgeText: 'text-sky-800 dark:text-sky-300',
    ruleBg: 'bg-sky-50 dark:bg-slate-800/80',
    ruleBorder: 'border-sky-200/60 dark:border-slate-700',
    ruleText: 'text-sky-700 dark:text-sky-300',
    sectionBadge: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300',
    buttonQuizBorder: 'border-sky-300 dark:border-sky-800',
    buttonQuizBg: 'bg-sky-50/60 dark:bg-sky-950/40',
    buttonQuizText: 'text-sky-800 dark:text-sky-300',
    buttonQuizHover: 'hover:bg-sky-100 dark:hover:bg-sky-900/50',
    buttonPdf: 'bg-sky-600 hover:bg-sky-700 text-white',
    calloutGradient: 'from-sky-600 via-blue-600 to-indigo-700',
    calloutShadow: 'shadow-sky-500/20'
  },
  emerald: {
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    ruleBg: 'bg-emerald-50 dark:bg-slate-800/80',
    ruleBorder: 'border-emerald-200/60 dark:border-slate-700',
    ruleText: 'text-emerald-700 dark:text-emerald-300',
    sectionBadge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
    buttonQuizBorder: 'border-emerald-300 dark:border-emerald-800',
    buttonQuizBg: 'bg-emerald-50/60 dark:bg-emerald-950/40',
    buttonQuizText: 'text-emerald-800 dark:text-emerald-300',
    buttonQuizHover: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
    buttonPdf: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    calloutGradient: 'from-emerald-600 via-teal-600 to-emerald-700',
    calloutShadow: 'shadow-emerald-500/20'
  },
  teal: {
    badgeBg: 'bg-teal-100 dark:bg-teal-950/60',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    ruleBg: 'bg-teal-50 dark:bg-slate-800/80',
    ruleBorder: 'border-teal-200/60 dark:border-slate-700',
    ruleText: 'text-teal-700 dark:text-teal-300',
    sectionBadge: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300',
    buttonQuizBorder: 'border-teal-300 dark:border-teal-800',
    buttonQuizBg: 'bg-teal-50/60 dark:bg-teal-950/40',
    buttonQuizText: 'text-teal-800 dark:text-teal-300',
    buttonQuizHover: 'hover:bg-teal-100 dark:hover:bg-teal-900/50',
    buttonPdf: 'bg-teal-600 hover:bg-teal-700 text-white',
    calloutGradient: 'from-teal-600 via-cyan-600 to-teal-700',
    calloutShadow: 'shadow-teal-500/20'
  },
  rose: {
    badgeBg: 'bg-rose-100 dark:bg-rose-950/60',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-800 dark:text-rose-300',
    ruleBg: 'bg-rose-50 dark:bg-slate-800/80',
    ruleBorder: 'border-rose-200/60 dark:border-slate-700',
    ruleText: 'text-rose-700 dark:text-rose-300',
    sectionBadge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300',
    buttonQuizBorder: 'border-rose-300 dark:border-rose-800',
    buttonQuizBg: 'bg-rose-50/60 dark:bg-rose-950/40',
    buttonQuizText: 'text-rose-800 dark:text-rose-300',
    buttonQuizHover: 'hover:bg-rose-100 dark:hover:bg-rose-900/50',
    buttonPdf: 'bg-rose-600 hover:bg-rose-700 text-white',
    calloutGradient: 'from-rose-600 via-pink-600 to-rose-700',
    calloutShadow: 'shadow-rose-500/20'
  },
  amber: {
    badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    ruleBg: 'bg-amber-50 dark:bg-slate-800/80',
    ruleBorder: 'border-amber-200/60 dark:border-slate-700',
    ruleText: 'text-amber-700 dark:text-amber-300',
    sectionBadge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300',
    buttonQuizBorder: 'border-amber-300 dark:border-amber-800',
    buttonQuizBg: 'bg-amber-50/60 dark:bg-amber-950/40',
    buttonQuizText: 'text-amber-800 dark:text-amber-300',
    buttonQuizHover: 'hover:bg-amber-100 dark:hover:bg-amber-900/50',
    buttonPdf: 'bg-amber-600 hover:bg-amber-700 text-white',
    calloutGradient: 'from-amber-500 via-orange-600 to-amber-600',
    calloutShadow: 'shadow-amber-500/20'
  },
  orange: {
    badgeBg: 'bg-orange-100 dark:bg-orange-950/60',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    ruleBg: 'bg-orange-50 dark:bg-slate-800/80',
    ruleBorder: 'border-orange-200/60 dark:border-slate-700',
    ruleText: 'text-orange-700 dark:text-orange-300',
    sectionBadge: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300',
    buttonQuizBorder: 'border-orange-300 dark:border-orange-800',
    buttonQuizBg: 'bg-orange-50/60 dark:bg-orange-950/40',
    buttonQuizText: 'text-orange-800 dark:text-orange-300',
    buttonQuizHover: 'hover:bg-orange-100 dark:hover:bg-orange-900/50',
    buttonPdf: 'bg-orange-600 hover:bg-orange-700 text-white',
    calloutGradient: 'from-orange-500 via-amber-600 to-orange-600',
    calloutShadow: 'shadow-orange-500/20'
  },
  slate: {
    badgeBg: 'bg-slate-200 dark:bg-slate-800',
    badgeBorder: 'border-slate-300 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    ruleBg: 'bg-slate-100 dark:bg-slate-800/80',
    ruleBorder: 'border-slate-200 dark:border-slate-700',
    ruleText: 'text-slate-800 dark:text-slate-200',
    sectionBadge: 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200',
    buttonQuizBorder: 'border-slate-300 dark:border-slate-700',
    buttonQuizBg: 'bg-slate-100 dark:bg-slate-800',
    buttonQuizText: 'text-slate-800 dark:text-slate-200',
    buttonQuizHover: 'hover:bg-slate-200 dark:hover:bg-slate-700',
    buttonPdf: 'bg-slate-900 hover:bg-slate-800 text-white',
    calloutGradient: 'from-slate-800 via-slate-900 to-slate-800',
    calloutShadow: 'shadow-slate-500/20'
  }
};

// --- TheorySection Component ---
export interface TheorySectionProps {
  id?: string;
  number?: number;
  title: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: ThemeColor;
  children: React.ReactNode;
  className?: string;
}

export const TheorySection: React.FC<TheorySectionProps> = ({
  id,
  number,
  title,
  icon,
  badge,
  badgeColor = 'purple',
  children,
  className
}) => {
  const styles = colorStyles[badgeColor] || colorStyles.purple;

  return (
    <div id={id} className={cn('space-y-4 pt-4 first:pt-0', className)}>
      <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800/60">
        {number && (
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-black text-xs shrink-0 shadow-2xs">
            {number}
          </span>
        )}
        {icon && (
          <div className="flex items-center justify-center w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
            {icon}
          </div>
        )}
        <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex-1">
          {typeof title === 'string' ? <MathText>{title}</MathText> : title}
        </h2>
        {badge && (
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase',
              styles.sectionBadge
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

// --- TheoryCard Component ---
export interface TheoryCardProps {
  title?: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: ThemeColor;
  color?: ThemeColor;
  themeColor?: ThemeColor;
  variant?: 'default' | 'highlight' | 'formula' | 'example';
  formula?: string;
  description?: string | React.ReactNode;
  caption?: string | React.ReactNode;
  properties?: (string | React.ReactNode)[];
  children?: React.ReactNode;
  className?: string;
}

export const TheoryCard: React.FC<TheoryCardProps> = ({
  title,
  icon,
  badge,
  badgeColor,
  color,
  themeColor,
  variant = 'default',
  formula,
  description,
  caption,
  properties,
  children,
  className
}) => {
  const activeColor = themeColor || color || badgeColor || 'cyan';
  const styles = colorStyles[activeColor] || colorStyles.cyan || colorStyles.purple;

  let borderStyle = 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900';
  if (variant === 'highlight') {
    borderStyle = 'border-cyan-200 dark:border-cyan-800/60 bg-cyan-50/30 dark:bg-cyan-950/20';
  } else if (variant === 'formula') {
    borderStyle = 'border-blue-200 dark:border-blue-800/60 bg-blue-50/30 dark:bg-blue-950/20';
  } else if (variant === 'example') {
    borderStyle = 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/20 dark:bg-emerald-950/15';
  }

  const displayDescription = description || caption;

  return (
    <Card className={cn('rounded-2xl border shadow-xs overflow-hidden transition-all', borderStyle, className)}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        {(title || badge || icon) && (
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <div className="flex items-center gap-2">
              {icon && <span className="text-slate-600 dark:text-slate-300">{icon}</span>}
              {title && (
                <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  {typeof title === 'string' ? <MathText>{title}</MathText> : title}
                </h3>
              )}
            </div>
            {badge && (
              <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider', styles.badgeBg, styles.badgeText)}>
                {badge}
              </span>
            )}
          </div>
        )}

        {formula && (
          <div className={cn('p-2.5 rounded-xl border text-center font-mono font-bold text-xs sm:text-sm', styles.ruleBg, styles.ruleBorder, styles.ruleText)}>
            <MathText>{formula}</MathText>
          </div>
        )}

        {displayDescription && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {typeof displayDescription === 'string' ? <MathText>{displayDescription}</MathText> : displayDescription}
          </p>
        )}

        {properties && properties.length > 0 && (
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {properties.map((prop, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{typeof prop === 'string' ? <MathText>{prop}</MathText> : prop}</span>
              </li>
            ))}
          </ul>
        )}

        {children && (
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
            {typeof children === 'string' ? parseFractionsInNode(children) : children}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- GeometryFigureCard / VisualCard Component ---
export interface GeometryFigureCardProps {
  title: string;
  figure?: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
  caption?: string;
  properties?: string[];
  formula?: string;
  badge?: string;
  color?: ThemeColor;
  className?: string;
}

export const GeometryFigureCard: React.FC<GeometryFigureCardProps> = ({
  title,
  figure,
  children,
  description,
  caption,
  properties,
  formula,
  badge,
  color = 'purple',
  className
}) => {
  const styles = colorStyles[color] || colorStyles.purple;
  const displayFigure = figure || children;
  const displayDescription = description || caption;

  return (
    <Card className={cn('rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden', className)}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
          <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
            {typeof title === 'string' ? <MathText>{title}</MathText> : title}
          </h3>
          {badge && (
            <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase', styles.badgeBg, styles.badgeText)}>
              {badge}
            </span>
          )}
        </div>

        {/* Figure Container */}
        {displayFigure && (
          <div className="flex items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 min-h-[120px]">
            {displayFigure}
          </div>
        )}

        {formula && (
          <div className={cn('p-2.5 rounded-xl border text-center font-mono font-bold text-xs sm:text-sm', styles.ruleBg, styles.ruleBorder, styles.ruleText)}>
            <MathText>{formula}</MathText>
          </div>
        )}

        {displayDescription && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {typeof displayDescription === 'string' ? <MathText>{displayDescription}</MathText> : displayDescription}
          </p>
        )}

        {properties && properties.length > 0 && (
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {properties.map((prop, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{typeof prop === 'string' ? <MathText>{prop}</MathText> : prop}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

// --- TheoryCallout Component ---
export interface TheoryCalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'success';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TheoryCallout: React.FC<TheoryCalloutProps> = ({
  type = 'tip',
  title,
  children,
  className
}) => {
  let bg = 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200';
  let icon = <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />;
  let defaultTitle = 'Tipp és Megjegyzés';

  if (type === 'warning') {
    bg = 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-900 dark:text-rose-200';
    icon = <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
    defaultTitle = 'Vigyázat! Tipikus buktató!';
  } else if (type === 'info') {
    bg = 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/60 text-blue-900 dark:text-blue-200';
    icon = <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />;
    defaultTitle = 'Fontos Információ';
  } else if (type === 'success') {
    bg = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200';
    icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    defaultTitle = 'Jó megközelítés';
  }

  return (
    <div className={cn('p-3.5 sm:p-4 rounded-2xl border flex items-start gap-3 shadow-2xs', bg, className)}>
      <div className="mt-0.5">{icon}</div>
      <div className="space-y-1 flex-1 text-xs sm:text-sm">
        <div className="font-bold">{title || defaultTitle}</div>
        <div className="leading-relaxed opacity-95">
          {typeof children === 'string' ? parseFractionsInNode(children) : children}
        </div>
      </div>
    </div>
  );
};

// --- TheoryTrapBox Component ---
export interface TheoryTrapBoxProps {
  trap?: string;
  title?: string;
  wrong?: React.ReactNode;
  wrongExplanation?: string;
  correct?: React.ReactNode;
  correctExplanation?: string;
  tip?: string;
  className?: string;
}

export const TheoryTrapBox: React.FC<TheoryTrapBoxProps> = ({
  trap,
  title,
  wrong,
  wrongExplanation,
  correct,
  correctExplanation,
  tip,
  className
}) => {
  const displayTitle =
    title || (typeof trap === 'string' && !wrong ? trap : 'Tipikus Algebrai és Egyenletmegoldási Csapdahelyzet');

  return (
    <div className={cn('rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10 p-4 sm:p-5 space-y-3.5 shadow-2xs', className)}>
      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black text-xs sm:text-sm uppercase tracking-wide">
        <AlertTriangle className="w-4 h-4" />
        <span>{displayTitle}</span>
      </div>

      {trap && wrong && (
        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          {typeof trap === 'string' ? <MathText>{trap}</MathText> : trap}
        </p>
      )}

      {(wrong || correct) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {wrong && (
            <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-white dark:bg-slate-900 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Gyakori tévedés (Hibás):</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 p-2 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                {typeof wrong === 'string' ? <MathText>{wrong}</MathText> : wrong}
              </div>
              {wrongExplanation && (
                <p className="text-[11px] sm:text-xs text-rose-700 dark:text-rose-300 leading-snug">
                  {typeof wrongExplanation === 'string' ? <MathText>{wrongExplanation}</MathText> : wrongExplanation}
                </p>
              )}
            </div>
          )}

          {correct && (
            <div className="p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-slate-900 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Helyes lépés (Szabályos):</span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 p-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                {typeof correct === 'string' ? <MathText>{correct}</MathText> : correct}
              </div>
              {correctExplanation && (
                <p className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-300 leading-snug">
                  {typeof correctExplanation === 'string' ? <MathText>{correctExplanation}</MathText> : correctExplanation}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {tip && (
        <div className="flex items-start gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
          <span>{typeof tip === 'string' ? <MathText>{tip}</MathText> : tip}</span>
        </div>
      )}
    </div>
  );
};

// --- TheoryTable Component ---
export interface TheoryTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

export const TheoryTable: React.FC<TheoryTableProps> = ({ headers, rows, className }) => {
  return (
    <div className={cn('overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs', className)}>
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase text-[11px] tracking-wider">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3 sm:p-3.5">
                {typeof h === 'string' ? <MathText>{h}</MathText> : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-3 sm:p-3.5 text-slate-700 dark:text-slate-300">
                  {typeof cell === 'string' ? <MathText>{cell}</MathText> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export interface TheorySectionData {
  id?: string;
  title: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: ThemeColor;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

export type TheorySectionType = TheorySectionData;

// --- Main TheoryTemplate Component ---
export interface TheoryTemplateProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onStartPractice?: () => void;
  onSwitchToQuiz?: () => void;
  documentId?: string;
  pdfFilename?: string;
  badgeText?: string;
  badge?: string;
  topicBadge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  quickRule?: {
    label: string;
    formula: string | React.ReactNode;
  };
  ruleTitle?: string;
  ruleFormula?: string | React.ReactNode;
  themeColor?: ThemeColor;
  practiceTitle?: string;
  practiceSubtitle?: string;
  practiceButtonText?: string;
  sections?: TheorySectionData[];
  children?: React.ReactNode;
  topicId?: string;
  emoji?: string;
  [key: string]: any;
}

export const TheoryTemplate: React.FC<TheoryTemplateProps> = (props) => {
  const {
    onBack,
    onStartQuiz,
    onStartPractice,
    onSwitchToQuiz,
    documentId = 'theory-content',
    pdfFilename = '8_osztaly_hozzarendelesek_valoszinuseg_sorozatok_tananyag.pdf',
    badgeText,
    badge,
    topicBadge,
    title,
    subtitle,
    description,
    quickRule,
    ruleTitle,
    ruleFormula,
    themeColor = 'amber',
    practiceTitle = 'Készen állsz a feladványokra?',
    practiceSubtitle = 'Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben és feladatokban!',
    practiceButtonText = 'Kvíz indítása',
    sections,
    children
  } = props;

  const displayBadge =
    badgeText || badge || topicBadge || '8. OSZTÁLY • VI. HOZZÁRENDELÉSEK, VALÓSZÍNŰSÉG, SOROZATOK • 📊 TANANYAG';
  const displaySubtitle = subtitle || description;
  const displayRule =
    quickRule || (ruleFormula ? { label: ruleTitle || 'Alaptétel', formula: ruleFormula } : undefined);

  const [isDownloading, setIsDownloading] = useState(false);
  const styles = colorStyles[themeColor] || colorStyles.amber;
  const handleQuizStart = onStartQuiz || onStartPractice || onSwitchToQuiz;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    await exportElementToPDF(documentId, pdfFilename);
    setIsDownloading(false);
  };

  return (
    <div className="w-full px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left">
      {/* Top Header Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 no-pdf">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Vissza a témakörökhöz
        </Button>

        <div className="flex items-center gap-2">
          {handleQuizStart && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuizStart}
              className={cn(
                'rounded-xl h-9 px-3 text-xs sm:text-sm font-bold transition-all',
                styles.buttonQuizBorder,
                styles.buttonQuizBg,
                styles.buttonQuizText,
                styles.buttonQuizHover
              )}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Gyakorló Kvíz indítása
            </Button>
          )}

          <Button
            size="sm"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={cn(
              'rounded-xl h-9 px-3.5 font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition-all',
              styles.buttonPdf
            )}
          >
            <Download className="w-3.5 h-3.5" />
            {isDownloading ? 'Letöltés...' : 'Tananyag letöltése (PDF)'}
          </Button>
        </div>
      </div>

      {/* Main Printable Document Container */}
      <div
        id={documentId}
        className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 p-5 sm:p-8 shadow-sm space-y-8"
      >
        {/* Document Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border',
                styles.badgeBg,
                styles.badgeBorder,
                styles.badgeText
              )}
            >
              <span>{displayBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {typeof title === 'string' ? <MathText>{title}</MathText> : title}
            </h1>
            {displaySubtitle && (
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {typeof displaySubtitle === 'string' ? <MathText>{displaySubtitle}</MathText> : displaySubtitle}
              </p>
            )}
          </div>

          {displayRule && (
            <div
              className={cn(
                'p-3 sm:p-3.5 rounded-2xl border text-center md:text-right max-w-full md:max-w-md shrink-0 shadow-sm',
                styles.ruleBg,
                styles.ruleBorder
              )}
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {displayRule.label}
              </div>
              <div
                className={cn(
                  'text-sm sm:text-base font-bold break-words leading-snug whitespace-normal mt-0.5 tracking-tight',
                  styles.ruleText
                )}
              >
                <MathText>{displayRule.formula}</MathText>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Sections Content */}
        {sections &&
          sections.map((sec, idx) => (
            <TheorySection
              key={sec.id || idx}
              number={idx + 1}
              title={sec.title}
              icon={sec.icon}
              badge={sec.badge}
              badgeColor={sec.badgeColor || themeColor}
            >
              {sec.content || sec.children}
            </TheorySection>
          ))}
        {parseFractionsInNode(children)}

        {/* Practice Callout Banner */}
        <div
          className={cn(
            'p-6 rounded-2xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg bg-gradient-to-r',
            styles.calloutGradient,
            styles.calloutShadow
          )}
        >
          <div>
            <h3 className="text-lg font-black">{practiceTitle}</h3>
            <p className="text-xs sm:text-sm opacity-90 mt-0.5">{practiceSubtitle}</p>
          </div>
          {handleQuizStart && (
            <Button
              onClick={handleQuizStart}
              className="bg-white text-slate-900 hover:bg-slate-100 font-black rounded-xl h-10 px-5 shadow-sm text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
              {practiceButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TheoryTemplate;
