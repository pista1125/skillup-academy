import React from 'react';

export interface GradeViewProps {
  topicId: string;
  activeSubSectionId: string | null;
  selectedGrade: number | string;
  onActivitySelect: (type: string, topicId: string) => void;
  onMaterialSelect?: (material: any) => void;
}
