import React from 'react';
import {
  BarChart, LineChart, PieChart, GroupedBar, ScatterPlot, Histogram, DotPlot,
} from './Charts';
import {
  CoordGrid, NumberLine, Scale, ClockPair, Timeline, TimelineYears, Compass,
} from './Scales';
import {
  Rectangle, TriangleShape, PolygonL, Grid, SymmetryHalf, MirrorChoice,
  CubeNets, BigCube, Box3D, TreasureMap,
} from './Shapes';
import {
  TableViz, FrequencyTable, Sequence, Pictogram, PriceTag, Pool, Recipe,
  Formula, Comparison, TileRows, TreeDiagram, Venn,
} from './Misc';

const REGISTRY = {
  // Charts
  barChart: BarChart,
  lineChart: LineChart,
  pieChart: PieChart,
  groupedBar: GroupedBar,
  scatterPlot: ScatterPlot,
  histogram: Histogram,
  dotPlot: DotPlot,

  // Scales / time / coords
  coordinateGrid: CoordGrid,
  numberLine: NumberLine,
  scale: Scale,
  clockPair: ClockPair,
  timeline: Timeline,
  timelineYears: TimelineYears,
  compass: Compass,

  // Shapes / geometry / maps
  rectangle: Rectangle,
  triangle: TriangleShape,
  polygonL: PolygonL,
  grid: Grid,
  symmetryHalf: SymmetryHalf,
  mirrorChoice: MirrorChoice,
  cubeNets: CubeNets,
  bigCube: BigCube,
  box3d: Box3D,
  treasureMap: TreasureMap,

  // Misc
  table: TableViz,
  frequencyTable: FrequencyTable,
  sequence: Sequence,
  pictogram: Pictogram,
  priceTag: PriceTag,
  pool: Pool,
  recipe: Recipe,
  formula: Formula,
  comparison: Comparison,
  tileRows: TileRows,
  treeDiagram: TreeDiagram,
  venn: Venn,
};

export default function Visual({ spec }: { spec: any }) {
  if (!spec || !spec.type) return null;
  const Cmp = REGISTRY[spec.type];
  if (!Cmp) {
    return (
      <div style={{ padding: 12, background: '#fef3c7', borderRadius: 6, fontSize: 13 }}>
        <strong>Ismeretlen vizuál típus:</strong> <code>{spec.type}</code>
        <pre style={{ marginTop: 8, fontSize: 11 }}>{JSON.stringify(spec, null, 2)}</pre>
      </div>
    );
  }
  return <Cmp {...spec} />;
}
