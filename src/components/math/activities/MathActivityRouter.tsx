import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';

const GradePrimaryActivities = lazy(() => import('./GradePrimaryActivities').then(m => ({ default: m.GradePrimaryActivities })));
const Grade5Activities = lazy(() => import('./Grade5Activities').then(m => ({ default: m.Grade5Activities })));
const Grade6Activities = lazy(() => import('./Grade6Activities').then(m => ({ default: m.Grade6Activities })));
const Grade7Activities = lazy(() => import('./Grade7Activities').then(m => ({ default: m.Grade7Activities })));
const Grade8Activities = lazy(() => import('./Grade8Activities').then(m => ({ default: m.Grade8Activities })));
const Grade9Activities = lazy(() => import('./Grade9Activities').then(m => ({ default: m.Grade9Activities })));
const Grade10Activities = lazy(() => import('./Grade10Activities').then(m => ({ default: m.Grade10Activities })));
const MathToolsActivities = lazy(() => import('./MathToolsActivities').then(m => ({ default: m.MathToolsActivities })));

export const MathActivityRouter: React.FC<ActivityRouterProps> = (props) => {
  const { activityType } = props;
  if (!activityType) return null;

  if (activityType.startsWith('g5-')) {
    return <Grade5Activities {...props} />;
  }
  if (activityType.startsWith('g6-')) {
    return <Grade6Activities {...props} />;
  }
  if (activityType.startsWith('g7-')) {
    return <Grade7Activities {...props} />;
  }
  if (activityType.startsWith('g8-')) {
    return <Grade8Activities {...props} />;
  }
  if (activityType.startsWith('g9-')) {
    return <Grade9Activities {...props} />;
  }
  if (activityType.startsWith('g10-')) {
    return <Grade10Activities {...props} />;
  }
  if (
    activityType === 'fractions' ||
    activityType.startsWith('fractions-') ||
    activityType.startsWith('decimal-') ||
    activityType.startsWith('grade1-') ||
    activityType.startsWith('grade2-') ||
    activityType.startsWith('grade3-') ||
    activityType.startsWith('grade4-')
  ) {
    return <GradePrimaryActivities {...props} />;
  }

  // Fallback to tools and shared activities
  return <MathToolsActivities {...props} />;
};
