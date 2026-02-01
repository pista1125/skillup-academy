import { Topic } from '@/types/education';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  progress: number;
  onClick: () => void;
}

export function TopicCard({ topic, progress, onClick }: TopicCardProps) {
  const isCompleted = progress === 100;
  
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-2xl p-5 border-2 border-border card-hover text-left group"
    >
      <div className="flex items-center gap-4">
        <div className="text-4xl">{topic.icon}</div>
        <div className="flex-1">
          <h4 className="font-display font-bold text-lg text-foreground mb-1">
            {topic.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-2">
            {topic.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-gradient-success' : 'bg-primary'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {progress}%
            </span>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-colors ${isCompleted ? 'text-success' : 'text-muted-foreground group-hover:text-primary'}`}>
          {isCompleted ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </div>
      </div>
    </button>
  );
}
