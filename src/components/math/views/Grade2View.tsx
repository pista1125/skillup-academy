import React, { lazy, Suspense } from 'react';
import { GradeViewProps } from './types';
import { BookOpen } from 'lucide-react';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';

const Grade2MathModule = lazy(() => import('@/components/math/grade-2/Grade2MathModule').then(m => ({ default: m.Grade2MathModule })));

export const Grade2View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  onActivitySelect,
  onMaterialSelect,
}) => {
  if (topicId === 'basic-operations' || topicId === 'g2-basic') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
        <Grade2MathModule
          onBack={() => {}}
          initialView="grade2-basic"
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
        grade={2}
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade2View;
