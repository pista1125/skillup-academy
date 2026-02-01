import { MathTopic } from '@/data/mathTopics';
import { ChevronRight } from 'lucide-react';

interface MathTopicCardProps {
  topic: MathTopic;
  onClick: () => void;
}

export function MathTopicCard({ topic, onClick }: MathTopicCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl p-6 border-2 border-border card-hover text-left group overflow-hidden relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <div className="flex items-center gap-5 relative">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-3xl shadow-lg`}>
          {topic.icon}
        </div>
        
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
            {topic.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
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
        
        <div className="p-2 rounded-full text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
          <ChevronRight className="w-6 h-6" />
        </div>
      </div>
    </button>
  );
}
