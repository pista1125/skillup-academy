// Templates for III. Geometria, tengelyes tükrözés
export * from './TheoryTemplate';
export * from './QuizTemplate';
export * from './MatcherTemplate';
export * from './SorterTemplate';

// 1. Síkbeli alakzatok
export { PlanarShapesTheory } from './sikbeli-alakzatok/PlanarShapesTheory';
export { PlanarShapesQuiz } from './sikbeli-alakzatok/PlanarShapesQuiz';
export { PlanarShapesMatcher } from './sikbeli-alakzatok/PlanarShapesMatcher';
export { PlanarShapesSorter } from './sikbeli-alakzatok/PlanarShapesSorter';
export { ShapeClassifier } from './sikbeli-alakzatok/ShapeClassifier';

// 2. Egybevágóság
export { CongruenceTheory } from './egybevagosag/CongruenceTheory';
export { CongruenceQuiz } from './egybevagosag/CongruenceQuiz';
export { CongruenceMatcher } from './egybevagosag/CongruenceMatcher';
export { CongruenceSorter } from './egybevagosag/CongruenceSorter';

// 3. A kör
export { CircleTheory } from './a-kor/CircleTheory';
export { CircleQuiz } from './a-kor/CircleQuiz';
export { CircleMatcher } from './a-kor/CircleMatcher';
export { CircleSorter } from './a-kor/CircleSorter';
// 4. A szakasz felezőmerőlegese
export { BisectorTheory } from './a-szakasz-felezomerolegese/BisectorTheory';
export { BisectorQuiz } from './a-szakasz-felezomerolegese/BisectorQuiz';
export { BisectorMatcher } from './a-szakasz-felezomerolegese/BisectorMatcher';
export { BisectorSorter } from './a-szakasz-felezomerolegese/BisectorSorter';

// 5. Szerkesztések
export { ConstructionsTheory } from './szerkesztesek/ConstructionsTheory';
export { ConstructionsQuiz } from './szerkesztesek/ConstructionsQuiz';
export { ConstructionsMatcher } from './szerkesztesek/ConstructionsMatcher';
export { ConstructionsSorter } from './szerkesztesek/ConstructionsSorter';

// 6. Tengelyes tükrözés
export { AxialReflectionTheory } from './tengelyes-tukrozes/AxialReflectionTheory';
export { AxialReflectionQuiz } from './tengelyes-tukrozes/AxialReflectionQuiz';
export { AxialReflectionMatcher } from './tengelyes-tukrozes/AxialReflectionMatcher';
export { AxialReflectionSorter } from './tengelyes-tukrozes/AxialReflectionSorter';

// 7. A tengelyes tükrözés tulajdonságai
export { ReflectionPropertiesTheory } from './a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesTheory';
export { ReflectionPropertiesQuiz } from './a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesQuiz';
export { ReflectionPropertiesMatcher } from './a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesMatcher';
export { ReflectionPropertiesSorter } from './a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesSorter';

// 8. Tengelyes szimmetria
export { AxialSymmetryTheory } from './tengelyes-szimmetria/AxialSymmetryTheory';
export { AxialSymmetryQuiz } from './tengelyes-szimmetria/AxialSymmetryQuiz';
export { AxialSymmetryMatcher } from './tengelyes-szimmetria/AxialSymmetryMatcher';
export { AxialSymmetrySorter } from './tengelyes-szimmetria/AxialSymmetrySorter';
export { AxialSymmetryPresentation } from './tengelyes-szimmetria/AxialSymmetryPresentation';

// 9. Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek
export { SymmetricShapesTheory } from './tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesTheory';
export { SymmetricShapesQuiz } from './tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesQuiz';
export { SymmetricShapesMatcher } from './tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesMatcher';
export { SymmetricShapesSorter } from './tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesSorter';
export { TriangleClassifier } from './tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/TriangleClassifier';
export { QuadrilateralClassifier } from './tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/QuadrilateralClassifier';

// 10. Szerkesztési feladatok
export { ConstructionTasksTheory } from './szerkesztesi-feladatok/ConstructionTasksTheory';
export { ConstructionTasksQuiz } from './szerkesztesi-feladatok/ConstructionTasksQuiz';
export { ConstructionTasksMatcher } from './szerkesztesi-feladatok/ConstructionTasksMatcher';
export { ConstructionTasksSorter } from './szerkesztesi-feladatok/ConstructionTasksSorter';
export { InteractiveConstructionWorkbench, ConstructionTasksMiniFigure } from './szerkesztesi-feladatok/ConstructionTasksDiagrams';

// 11. Összefoglalás
export { GeometrySummaryTheory } from './osszefoglalas/GeometrySummaryTheory';
export { GeometrySummaryQuiz } from './osszefoglalas/GeometrySummaryQuiz';
export { GeometrySummaryMatcher } from './osszefoglalas/GeometrySummaryMatcher';
export { GeometrySummarySorter } from './osszefoglalas/GeometrySummarySorter';
export { InteractiveGeometrySummaryWorkbench, GeometrySummaryMiniFigure } from './osszefoglalas/GeometrySummaryDiagrams';

export { SymmetryQuiz } from './tengelyes-tukrozes/SymmetryQuiz';
export { AxialSymmetryGame } from './tengelyes-tukrozes/AxialSymmetryGame';
export { SymmetryErrorGame } from './tengelyes-tukrozes/SymmetryErrorGame';


