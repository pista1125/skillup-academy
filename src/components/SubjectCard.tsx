import { Subject } from '@/types/education';
import { Calculator, Atom, BookOpen, Languages, FlaskConical, Landmark, Map } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  title: string;
  description: string;
  onClick: () => void;
}

const subjectIcons: Record<Subject, React.ComponentType<{ className?: string }>> = {
  math: Calculator,
  physics: Atom,
  hungarian: BookOpen,
  english: Languages,
  chemistry: FlaskConical,
  history: Landmark,
  geography: Map,
};

const subjectColors: Record<Subject, string> = {
  math: 'bg-math-light border-math text-math',
  physics: 'bg-physics-light border-physics text-physics',
  hungarian: 'bg-hungarian-light border-hungarian text-hungarian',
  english: 'bg-english-light border-english text-english',
  chemistry: 'bg-chemistry-light border-chemistry text-chemistry',
  history: 'bg-history-light border-history text-history',
  geography: 'bg-geography-light border-geography text-geography',
};

const subjectIconBg: Record<Subject, string> = {
  math: 'bg-math',
  physics: 'bg-physics',
  hungarian: 'bg-hungarian',
  english: 'bg-english',
  chemistry: 'bg-chemistry',
  history: 'bg-history',
  geography: 'bg-geography',
};

export function SubjectCard({ subject, title, description, onClick }: SubjectCardProps) {
  const Icon = subjectIcons[subject];

  return (
    <button
      onClick={onClick}
      className={`subject-card w-full text-left border-2 ${subjectColors[subject]} group`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${subjectIconBg[subject]} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-bold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
