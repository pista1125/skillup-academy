import React from 'react';
import { GradeViewProps } from './types';
import { MaterialGallery } from '@/components/math/shared/MaterialGallery';
import {
  BookOpen
} from 'lucide-react';

export const Grade12View: React.FC<GradeViewProps> = ({
  topicId,
  selectedGrade,
  onActivitySelect,
  onMaterialSelect,
}) => {
  return (
    <div className="py-2">
      <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-blue-500" />
        <p className="text-sm font-medium text-blue-700 italic">
          12. osztályos tankönyvi tananyagok, feladatgyűjtemények és érettségi segédletek.
        </p>
      </div>
      <MaterialGallery
        grade="high-4"
        onView={onMaterialSelect || (() => {})}
      />
    </div>
  );
};

export default Grade12View;
