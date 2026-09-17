import React from 'react';

export interface GradeViewProps {
  topicId: string;
  activeSubSectionId: string | null;
  selectedGrade: number | string;
  onActivitySelect: (type: string, topicId: string, level?: number, gradeOverride?: any) => void;
  onMaterialSelect?: (material: any) => void;
}
