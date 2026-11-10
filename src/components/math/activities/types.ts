import React from 'react';

export type ActivityType = string;

export interface ActivityRouterProps {
  activityType: ActivityType | null;
  selectedGrade?: any;
  selectedTopic?: any;
  onBack: () => void;
  onActivitySelect: (type: any, topicId?: string, level?: number, gradeOverride?: any) => void;
  setActivityType?: (type: any) => void;
  handleMaterialSelect?: (material: any) => void;
  handleQuizComplete?: () => void;
  percentMode?: any;
  vennLevel?: number | null;
}
