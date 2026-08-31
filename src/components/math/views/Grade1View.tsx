import React, { lazy, Suspense } from 'react';
import { GradeViewProps } from './types';
import { BookOpen } from 'lucide-react';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';

const Grade1MathModule = lazy(() => import('@/components/math/grade-1/Grade1MathModule').then(m => ({ default: m.Grade1MathModule })));

export const Grade1View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  onActivitySelect,
  onMaterialSelect,
}) => {
  if (topicId === 'basic-operations' || topicId === 'g1-basic') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
        <Grade1MathModule
          onBack={() => {}}
          initialView="grade1-basic"
          onStartActivity={(type) => onActivitySelect(type, topicId)}
        />
      </Suspense>
    );
  }

  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
      </div>
      <MaterialGallery
        grade={1}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade1View;
