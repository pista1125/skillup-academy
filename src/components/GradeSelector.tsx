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

const gradeColors: Record<string, { base: string; selected: string; hover: string }> = {
  '1': { base: 'bg-emerald-50 border-emerald-100 text-emerald-700', selected: 'bg-emerald-600 text-white shadow-emerald-200', hover: 'hover:border-emerald-400 hover:bg-emerald-100' },
  '2': { base: 'bg-sky-50 border-sky-100 text-sky-700', selected: 'bg-sky-600 text-white shadow-sky-200', hover: 'hover:border-sky-400 hover:bg-sky-100' },
  '3': { base: 'bg-amber-50 border-amber-100 text-amber-700', selected: 'bg-amber-500 text-white shadow-amber-200', hover: 'hover:border-amber-400 hover:bg-amber-100' },
  '4': { base: 'bg-rose-50 border-rose-100 text-rose-700', selected: 'bg-rose-600 text-white shadow-rose-200', hover: 'hover:border-rose-400 hover:bg-rose-100' },
  '5': { base: 'bg-indigo-50 border-indigo-100 text-indigo-700', selected: 'bg-indigo-600 text-white shadow-indigo-200', hover: 'hover:border-indigo-400 hover:bg-indigo-100' },
  '6': { base: 'bg-violet-50 border-violet-100 text-violet-700', selected: 'bg-violet-600 text-white shadow-violet-200', hover: 'hover:border-violet-400 hover:bg-violet-100' },
  '7': { base: 'bg-teal-50 border-teal-100 text-teal-700', selected: 'bg-teal-600 text-white shadow-teal-200', hover: 'hover:border-teal-400 hover:bg-teal-100' },
  '8': { base: 'bg-pink-50 border-pink-100 text-pink-700', selected: 'bg-pink-600 text-white shadow-pink-200', hover: 'hover:border-pink-400 hover:bg-pink-100' },
  'high': { base: 'bg-slate-50 border-slate-200 text-slate-700', selected: 'bg-slate-800 text-white shadow-slate-200', hover: 'hover:border-slate-400 hover:bg-slate-100' }
};

export function GradeSelector({ selectedGrade, onSelectGrade }: GradeSelectorProps) {
  const getGradeStyle = (grade: GradeLevel) => {
    const isSelected = selectedGrade === grade;
    const isElementary = typeof grade === 'number';
    const colorKey = isElementary ? grade.toString() : 'high';
    const colors = gradeColors[colorKey] || gradeColors['high'];

    return `
      p-3 rounded-xl font-bold transition-all duration-200 border-2
      ${isSelected
        ? `${colors.selected} shadow-lg scale-105 border-transparent`
        : `${colors.base} ${colors.hover} border-border`
      }
    `;
  };
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
              className={`${getGradeStyle(grade)} text-lg`}
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
              className={getGradeStyle(grade)}
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
            w-full p-5 rounded-2xl font-black text-xl transition-all duration-300 flex items-center justify-center gap-3 border-2
            ${selectedGrade === 'graduation'
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white shadow-xl scale-[1.02] border-transparent'
              : 'bg-white border-purple-100 text-purple-700 hover:border-purple-400 hover:bg-purple-50 shadow-sm'
            }
          `}
        >
          <div className={`p-2 rounded-lg ${selectedGrade === 'graduation' ? 'bg-white/20' : 'bg-purple-100'}`}>
            <GraduationCap className="w-6 h-6" />
          </div>
          Érettségi felkészítés
        </button>
      </div>
    </div>
  );
}
