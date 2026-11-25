import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Lock,
  Sparkles,
  Star,
  School,
  Target,
  Wrench,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useEntitlements } from '@/contexts/EntitlementsContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CATEGORIES_CONFIG,
  TOOLS_CATALOG_DATA,
} from '@/components/math/tools/ToolsCatalog';
import { CONTENT_AREAS } from '@/components/math/competency-matrix/taxonomy';
import {
  COMPETENCY_AREA_PARAM,
  COMPETENCY_VIEW_PARAM,
  COMPETENCY_VIEWS,
  ELEMENTARY_GRADES,
  FEATURED_TOOL_IDS,
  GAMES,
  GradeLink,
  HIGH_SCHOOL_GRADES,
  PREP_GRADES,
  TOOL_CATEGORY_PARAM,
  gradeLinkByNum,
} from '@/data/navCatalog';

interface ExploreSectionsProps {
  /** columns: négyoszlopos asztali menü; accordion: lenyitható blokkok (mobil, oldalmenü). */
  variant: 'columns' | 'accordion';
  onNavigate: (path: string) => void;
}

const FEATURED_TOOLS = FEATURED_TOOL_IDS
  .map((id) => TOOLS_CATALOG_DATA.find((t) => t.id === id))
  .filter((t): t is (typeof TOOLS_CATALOG_DATA)[number] => Boolean(t));

const TOOL_CATEGORIES = CATEGORIES_CONFIG.filter((c) => c.id !== 'all');

/** A katalógus ikonjai nagy méretűek; a menüben egységesen kicsire vesszük őket. */
const SmallIcon: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <span
    className={cn(
      'w-7 h-7 shrink-0 rounded-lg flex items-center justify-center overflow-hidden leading-none',
      '[&_*]:!text-sm [&_svg]:!w-4 [&_svg]:!h-4',
      className
    )}
  >
    {children}
  </span>
);

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; className?: string }> = ({ icon, title, className }) => (
  <div className={cn('flex items-center gap-2 mb-3', className)}>
    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm">{icon}</span>
    <h3 className="font-black text-sm text-slate-800 dark:text-zinc-100 tracking-tight">{title}</h3>
  </div>
);

const SubLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1.5 mt-3 first:mt-0">
    {children}
  </p>
);

const LinkRow: React.FC<{
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  meta?: React.ReactNode;
  active?: boolean;
}> = ({ onClick, icon, label, meta, active }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl text-left transition-colors group',
      'hover:bg-slate-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
      active && 'bg-primary/10 dark:bg-primary/20'
    )}
  >
    {icon}
    <span
      className={cn(
        'flex-1 min-w-0 line-clamp-2 leading-tight text-[13px] font-bold text-slate-700 dark:text-zinc-300 group-hover:text-primary',
        active && 'text-primary'
      )}
    >
      {label}
    </span>
    {meta}
  </button>
);

const MoreLink: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-black text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
  >
    {label}
    <ArrowRight className="w-3.5 h-3.5" />
  </button>
);

export function ExploreSections({ variant, onNavigate }: ExploreSectionsProps) {
  const location = useLocation();
  const { user } = useAuth();
  const ent = useEntitlements();

  const firstSegment = location.pathname.split('/')[1] || '';
  const secondSegment = location.pathname.split('/')[2] || '';

  // Lakat: bekapcsolt fizetőfalnál azokon az évfolyamokon, amelyekhez nincs hozzáférés.
  const showLocks = ent.paywallEnabled && !ent.fullAccess && !ent.loading;
  const isLocked = (g: GradeLink) => showLocks && g.num !== null && !ent.grades.has(g.num);
  const ownGrades = !ent.fullAccess
    ? Array.from(ent.grades).sort((a, b) => a - b).map(gradeLinkByNum).filter((g): g is GradeLink => Boolean(g))
    : [];

  const gradeTile = (g: GradeLink, size: 'sm' | 'md') => {
    const active = firstSegment === g.slug;
    const locked = isLocked(g);
    return (
      <button
        key={g.slug}
        type="button"
        onClick={() => onNavigate(`/${g.slug}`)}
        title={locked ? `${g.label} – az I. témakör ingyenes, a többi előfizetéssel érhető el` : g.label}
        className={cn(
          'relative rounded-xl border-2 font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          size === 'sm' ? 'h-10 text-sm' : 'h-10 px-3 text-xs',
          g.tone,
          active && 'ring-2 ring-primary ring-offset-1 dark:ring-offset-zinc-900'
        )}
      >
        {size === 'sm' ? g.short : g.label}
        {locked && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
            <Lock className="w-2.5 h-2.5 text-slate-500 dark:text-zinc-400" />
          </span>
        )}
      </button>
    );
  };

  const gradesBody = (
    <div>
      {user && ownGrades.length > 0 && (
        <>
          <SubLabel>Saját évfolyamod</SubLabel>
          <div className="flex flex-wrap gap-1.5 mb-1">
            {ownGrades.map((g) => (
              <button
                key={`own-${g.slug}`}
                type="button"
                onClick={() => onNavigate(`/${g.slug}`)}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black shadow-sm hover:brightness-110 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                {g.label}
              </button>
            ))}
          </div>
        </>
      )}
      <SubLabel>Általános iskola</SubLabel>
      <div className="grid grid-cols-4 gap-1.5">{ELEMENTARY_GRADES.map((g) => gradeTile(g, 'sm'))}</div>
      <SubLabel>Középiskola</SubLabel>
      <div className="grid grid-cols-4 gap-1.5">{HIGH_SCHOOL_GRADES.map((g) => gradeTile(g, 'sm'))}</div>
      <SubLabel>Felkészítők</SubLabel>
      <div className="grid grid-cols-2 gap-1.5">{PREP_GRADES.map((g) => gradeTile(g, 'md'))}</div>
      {showLocks && (
        <p className="mt-3 text-[10.5px] leading-snug text-slate-400 dark:text-zinc-500 flex gap-1.5">
          <Lock className="w-3 h-3 shrink-0 mt-px" />
          Az I. témakör ingyenes, a többi előfizetéssel érhető el.
        </p>
      )}
    </div>
  );

  const toolsBody = (
    <div>
      <SubLabel>Kategóriák</SubLabel>
      <div className="space-y-0.5">
        {TOOL_CATEGORIES.map((c) => (
          <LinkRow
            key={c.id}
            onClick={() => onNavigate(`/eszkozok?${TOOL_CATEGORY_PARAM}=${c.id}`)}
            icon={<SmallIcon className="bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-300">{c.icon}</SmallIcon>}
            label={c.label}
            meta={<span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 tabular-nums">{c.count}</span>}
          />
        ))}
      </div>
      <SubLabel>Kiemelt eszközök</SubLabel>
      <div className="space-y-0.5">
        {FEATURED_TOOLS.map((t) => (
          <LinkRow
            key={t.id}
            onClick={() => onNavigate(`/eszkozok/${t.id}`)}
            icon={<SmallIcon className={t.iconBg}>{t.icon}</SmallIcon>}
            label={t.title}
            active={firstSegment === 'eszkozok' && secondSegment === t.id}
          />
        ))}
      </div>
      <MoreLink onClick={() => onNavigate('/eszkozok')} label={`Összes eszköz (${TOOLS_CATALOG_DATA.length})`} />
    </div>
  );

  const competencyBody = (
    <div>
      <SubLabel>Feladatbank</SubLabel>
      <div className="space-y-0.5">
        <LinkRow
          onClick={() => onNavigate('/kompetencia')}
          icon={<SmallIcon className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><BookOpen /></SmallIcon>}
          label="Feladatböngésző"
        />
        <LinkRow
          onClick={() => onNavigate(`/kompetencia?${COMPETENCY_VIEW_PARAM}=${COMPETENCY_VIEWS.practice}`)}
          icon={<SmallIcon className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><ClipboardList /></SmallIcon>}
          label="Próbamérések"
        />
        {user && (
          <LinkRow
            onClick={() => onNavigate(`/kompetencia?${COMPETENCY_VIEW_PARAM}=${COMPETENCY_VIEWS.myResults}`)}
            icon={<SmallIcon className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300"><BarChart3 /></SmallIcon>}
            label="Eredményeim"
          />
        )}
      </div>
      <SubLabel>Tartalmi területek</SubLabel>
      <div className="space-y-0.5">
        {CONTENT_AREAS.map((a) => (
          <LinkRow
            key={a.id}
            onClick={() => onNavigate(`/kompetencia?${COMPETENCY_AREA_PARAM}=${a.id}`)}
            icon={
              <SmallIcon className="bg-slate-50 dark:bg-zinc-800">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: a.color }} />
              </SmallIcon>
            }
            label={a.name}
          />
        ))}
      </div>
      <MoreLink onClick={() => onNavigate('/kompetencia')} label="Kompetencia felkészítés" />
    </div>
  );

  const gamesBody = (
    <div>
      <SubLabel>Játékok</SubLabel>
      <div className="space-y-0.5">
        {GAMES.map((g) => (
          <LinkRow
            key={g.id}
            onClick={() => onNavigate(`/jatekok/${g.id}`)}
            icon={<SmallIcon className={g.color}>{g.icon}</SmallIcon>}
            label={g.title}
            active={firstSegment === 'jatekok' && secondSegment === g.id}
          />
        ))}
      </div>
      <MoreLink onClick={() => onNavigate('/jatekok')} label="Összes játék" />
    </div>
  );

  const sections = [
    { id: 'grades', title: 'Osztályok', icon: <School className="w-4 h-4" />, iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600', body: gradesBody },
    { id: 'tools', title: 'Matek eszközök', icon: <Wrench className="w-4 h-4" />, iconBg: 'bg-gradient-to-br from-purple-600 to-blue-600', body: toolsBody },
    { id: 'competency', title: 'Kompetencia felkészítés', icon: <Target className="w-4 h-4" />, iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500', body: competencyBody },
    { id: 'games', title: 'Matek játékok', icon: <Sparkles className="w-4 h-4" />, iconBg: 'bg-gradient-to-br from-pink-600 to-orange-500', body: gamesBody },
  ];

  if (variant === 'columns') {
    return (
      <div className="grid grid-cols-[1.15fr_1fr_1fr_1fr] divide-x divide-slate-100 dark:divide-zinc-800">
        {sections.map((s) => (
          <section key={s.id} className="p-5 min-w-0">
            <SectionTitle icon={<span className={cn('w-7 h-7 rounded-lg flex items-center justify-center', s.iconBg)}>{s.icon}</span>} title={s.title} />
            {s.body}
          </section>
        ))}
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="grades" className="w-full">
      {sections.map((s) => (
        <AccordionItem key={s.id} value={s.id} className="border-slate-100 dark:border-zinc-800">
          <AccordionTrigger className="py-3 hover:no-underline">
            <span className="flex items-center gap-2.5">
              <span className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-white shadow-sm', s.iconBg)}>{s.icon}</span>
              <span className="font-black text-sm text-slate-800 dark:text-zinc-100">{s.title}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4">{s.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
