import React, { lazy, Suspense } from 'react';

const GraduationPrep = lazy(() => import('@/components/math/graduation/GraduationPrep'));

interface GraduationPrepViewProps {
  onBack: () => void;
}

export const GraduationPrepView: React.FC<GraduationPrepViewProps> = ({ onBack }) => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
      <GraduationPrep onBack={onBack} />
    </Suspense>
  );
};

export default GraduationPrepView;
