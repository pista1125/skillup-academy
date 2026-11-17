// ---------------------------------------------------------------------------
// A IX. témakör tudáspróbájának rajzelemei: a három lecke közös elemei egy helyen.
// 1. lecke: hőmérő, ház/lift, búvár, időjárás-jelentés; 2. lecke: számegyenes;
// 3. lecke: változás a hőmérőn, kártyák, grafikon, táblázat.
// ---------------------------------------------------------------------------
export {
  FONT,
  INK,
  RED,
  BLUE,
  MINUS,
  fmt,
  fmtC,
  Thermo,
  thermoY,
  ThermoSvg,
  ThermoRow,
  ForecastSvg,
  BuildingSvg,
  DiverSvg,
  LiftPanelSvg,
  DEFAULT_FLOORS
} from '../negativ-szamok-a-mindennapokban/NegEverydayG3Parts';
export type { DayForecast, Floor } from '../negativ-szamok-a-mindennapokban/NegEverydayG3Parts';
export { NumberLine, NLSvg, VNumberLine, nlX } from '../szamegyenes-es-a-nulla/NegNumberLineG3Parts';
export type { NLPoint, NLArrow } from '../szamegyenes-es-a-nulla/NegNumberLineG3Parts';
export { ChangeThermoSvg, TempCardsSvg, WeekChartSvg, TempTableSvg, CompareThermosSvg, changeText, diff, PURPLE, WARM, COLD } from '../osszehasonlitas-es-valtozasok/NegChangesG3Parts';
