import { MathTopic } from '@/data/mathTopics';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MathTopicCardProps {
  topic: MathTopic;
  onClick: () => void;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

export function MathTopicCard({ topic, onClick, isExpanded, children }: MathTopicCardProps) {
  return (
    <div className="w-full space-y-2">
      <button
        onClick={onClick}
        className={cn(
          "w-full bg-card rounded-2xl p-6 border-2 border-border card-hover text-left group overflow-hidden relative transition-all duration-300",
          isExpanded && "border-primary ring-1 ring-primary/20 shadow-lg shadow-primary/5"
        )}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

        <div className="flex items-center gap-5 relative">
          <div className={cn(
            `w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-xl shadow-lg transition-transform duration-300`,
            isExpanded && "scale-110"
          )}>
            {typeof topic.icon === 'string' ? (
              topic.icon
            ) : (
              <topic.icon className="w-6 h-6" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
              {topic.title}
            </h3>
            <p className="text-[11px] text-muted-foreground mb-2">
              {topic.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {topic.grades.slice(0, 4).map((grade) => (
                <span
                  key={grade}
                  className="px-2 py-0.5 text-xs font-medium bg-secondary rounded-full text-muted-foreground"
                >
                  {grade}. oszt.
                </span>
              ))}
              {topic.grades.length > 4 && (
                <span className="px-2 py-0.5 text-xs font-medium bg-secondary rounded-full text-muted-foreground">
                  +{topic.grades.length - 4} más
                </span>
              )}
            </div>
          </div>

          <div className={cn(
            "p-2 rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all duration-300",
            isExpanded && "bg-primary/10 text-primary rotate-90"
          )}>
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </button>

      {isExpanded && children && (
        <div className="animate-slide-up pl-4 md:pl-20 pr-2">
          <div className="p-6 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
