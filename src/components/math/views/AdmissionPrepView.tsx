import React, { lazy, Suspense } from 'react';

const AdmissionPrep = lazy(() => import('@/components/math/admission/AdmissionPrep'));

interface AdmissionPrepViewProps {
  onBack: () => void;
}

export const AdmissionPrepView: React.FC<AdmissionPrepViewProps> = ({ onBack }) => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Betöltés...</div>}>
      <AdmissionPrep onBack={onBack} />
    </Suspense>
  );
};

export default AdmissionPrepView;
