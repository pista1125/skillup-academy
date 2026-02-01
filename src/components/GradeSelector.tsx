import { GradeLevel } from '@/types/education';
import { GraduationCap, School } from 'lucide-react';

interface GradeSelectorProps {
  selectedGrade: GradeLevel | null;
  onSelectGrade: (grade: GradeLevel) => void;
}

const elementaryGrades: GradeLevel[] = [1, 2, 3, 4, 5, 6, 7, 8];
const highSchoolGrades: GradeLevel[] = ['high-1', 'high-2', 'high-3', 'high-4'];

const gradeLabels: Record<GradeLevel, string> = {
  1: '1. osztály',
  2: '2. osztály',
  3: '3. osztály',
  4: '4. osztály',
  5: '5. osztály',
  6: '6. osztály',
  7: '7. osztály',
  8: '8. osztály',
  'high-1': '9. osztály',
  'high-2': '10. osztály',
  'high-3': '11. osztály',
  'high-4': '12. osztály',
  'graduation': 'Érettségi',
};

export function GradeSelector({ selectedGrade, onSelectGrade }: GradeSelectorProps) {
  return (
    <div className="space-y-8">
      {/* Elementary School */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <School className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-lg">Általános iskola</h3>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {elementaryGrades.map((grade) => (
            <button
              key={grade}
              onClick={() => onSelectGrade(grade)}
              className={`
                p-3 rounded-xl font-bold text-lg transition-all duration-200
                ${selectedGrade === grade 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-card border-2 border-border hover:border-primary hover:bg-primary/5'
                }
              `}
            >
              {grade}.
            </button>
          ))}
        </div>
      </div>

      {/* High School */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-lg">Középiskola</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {highSchoolGrades.map((grade) => (
            <button
              key={grade}
              onClick={() => onSelectGrade(grade)}
              className={`
                p-3 rounded-xl font-bold transition-all duration-200
                ${selectedGrade === grade 
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                  : 'bg-card border-2 border-border hover:border-primary hover:bg-primary/5'
                }
              `}
            >
              {gradeLabels[grade]}
            </button>
          ))}
        </div>
      </div>

      {/* Graduation Prep */}
      <div>
        <button
          onClick={() => onSelectGrade('graduation')}
          className={`
            w-full p-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2
            ${selectedGrade === 'graduation' 
              ? 'bg-gradient-hero text-white shadow-lg scale-[1.02]' 
              : 'bg-card border-2 border-primary/30 hover:border-primary hover:bg-primary/5'
            }
          `}
        >
          <GraduationCap className="w-6 h-6" />
          Érettségi felkészítés
        </button>
      </div>
    </div>
  );
}
