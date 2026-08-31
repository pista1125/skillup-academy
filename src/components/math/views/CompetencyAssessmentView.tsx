import React, { lazy, Suspense } from 'react';

const CompetencyMatrixHub = lazy(() => import('@/components/math/competency-matrix/CompetencyMatrixHub'));

interface CompetencyAssessmentViewProps {
  onBack: () => void;
}

export const CompetencyAssessmentView: React.FC<CompetencyAssessmentViewProps> = ({ onBack }) => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
      <CompetencyMatrixHub onBack={onBack} />
    </Suspense>
  );
};

export default CompetencyAssessmentView;
