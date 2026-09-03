import { MathTopic } from '@/data/mathTopics';
import { grade5Topics } from '@/data/grade5Topics';

export interface SubsectionItem {
  id: string;
  label: string;
}

export interface NavTopicItem {
  id: string;
  title: string;
  icon: any;
  color: string;
  subsections: SubsectionItem[];
}

export const sectionToTopicMap: Record<string, string> = {
  // Grade 1
  'g1-prep-period': 'g1-prep-period',
  'g1-prep-sec-1': 'g1-prep-period',
  'g1-prep-sec-2': 'g1-prep-period',
  'g1-prep-sec-3': 'g1-prep-period',
  'g1-prep-sec-4': 'g1-prep-period',
  'g1-prep-sec-5': 'g1-prep-period',
  'g1-prep-sec-6': 'g1-prep-period',
  'g1-prep-sec-7': 'g1-prep-period',
  'g1-prep-sec-8': 'g1-prep-period',
  'g1-numbers-to-5': 'g1-numbers-to-5',
  'g1-count5-sec-1': 'g1-numbers-to-5',
  'g1-count5-sec-2': 'g1-numbers-to-5',
  'g1-count5-sec-3': 'g1-numbers-to-5',
  'g1-count5-sec-4': 'g1-numbers-to-5',
  'g1-count5-sec-5': 'g1-numbers-to-5',
  'g1-count5-sec-6': 'g1-numbers-to-5',
  'g1-count5-sec-7': 'g1-numbers-to-5',
  'g1-count5-sec-8': 'g1-numbers-to-5',
  'g1-count5-sec-9': 'g1-numbers-to-5',
  'g1-numbers-to-10': 'g1-numbers-to-10',
  'g1-count10-sec-1': 'g1-numbers-to-10',
  'g1-count10-sec-2': 'g1-numbers-to-10',
  'g1-count10-sec-3': 'g1-numbers-to-10',
  'g1-count10-sec-4': 'g1-numbers-to-10',
  'g1-count10-sec-5': 'g1-numbers-to-10',
  'g1-count10-sec-6': 'g1-numbers-to-10',
  'g1-count10-sec-7': 'g1-numbers-to-10',
  'g1-count10-sec-8': 'g1-numbers-to-10',
  'g1-count10-sec-9': 'g1-numbers-to-10',
  'g1-count10-sec-10': 'g1-numbers-to-10',
  'g1-count10-sec-11': 'g1-numbers-to-10',
  'g1-count10-sec-12': 'g1-numbers-to-10',
  'g1-count10-sec-13': 'g1-numbers-to-10',
  'g1-count10-sec-14': 'g1-numbers-to-10',
  'g1-count10-sec-15': 'g1-numbers-to-10',
  'g1-count10-sec-16': 'g1-numbers-to-10',
  'g1-count10-sec-17': 'g1-numbers-to-10',
  'g1-count10-sec-18': 'g1-numbers-to-10',
  'g1-count10-sec-19': 'g1-numbers-to-10',
  'g1-count10-sec-20': 'g1-numbers-to-10',
  'g1-geometry': 'g1-geometry',
  'g1-geo-sec-1': 'g1-geometry',
  'g1-geo-sec-2': 'g1-geometry',
  'g1-geo-sec-3': 'g1-geometry',
  'g1-measurements': 'g1-measurements',
  'g1-meas-sec-1': 'g1-measurements',
  'g1-meas-sec-2': 'g1-measurements',
  'g1-meas-sec-3': 'g1-measurements',
  'g1-meas-sec-4': 'g1-measurements',
  'g1-numbers-to-20': 'g1-numbers-to-20',
  'g1-count20-sec-1': 'g1-numbers-to-20',
  'g1-count20-sec-2': 'g1-numbers-to-20',
  'g1-count20-sec-3': 'g1-numbers-to-20',
  'g1-count20-sec-4': 'g1-numbers-to-20',
  'g1-count20-sec-5': 'g1-numbers-to-20',
  'g1-count20-sec-6': 'g1-numbers-to-20',
  'g1-count20-sec-7': 'g1-numbers-to-20',
  'g1-count20-sec-8': 'g1-numbers-to-20',
  'g1-count20-sec-9': 'g1-numbers-to-20',
  'g1-count20-sec-10': 'g1-numbers-to-20',
  'g1-count20-sec-11': 'g1-numbers-to-20',

  // Grade 2
  'g2-numbers-to-20': 'g2-numbers-to-20',
  'g2-count20-sec-1': 'g2-numbers-to-20',
  'g2-count20-sec-2': 'g2-numbers-to-20',
  'g2-count20-sec-3': 'g2-numbers-to-20',
  'g2-count20-sec-4': 'g2-numbers-to-20',
  'g2-count20-sec-5': 'g2-numbers-to-20',
  'g2-count20-sec-6': 'g2-numbers-to-20',
  'g2-count20-sec-7': 'g2-numbers-to-20',
  'g2-numbers-to-50': 'g2-numbers-to-50',
  'g2-count50-sec-1': 'g2-numbers-to-50',
  'g2-count50-sec-2': 'g2-numbers-to-50',
  'g2-count50-sec-3': 'g2-numbers-to-50',
  'g2-count50-sec-4': 'g2-numbers-to-50',
  'g2-count50-sec-5': 'g2-numbers-to-50',
  'g2-count50-sec-6': 'g2-numbers-to-50',
  'g2-numbers-to-100': 'g2-numbers-to-100',
  'g2-count100-sec-1': 'g2-numbers-to-100',
  'g2-count100-sec-2': 'g2-numbers-to-100',
  'g2-count100-sec-3': 'g2-numbers-to-100',
  'g2-count100-sec-4': 'g2-numbers-to-100',
  'g2-count100-sec-5': 'g2-numbers-to-100',
  'g2-count100-sec-6': 'g2-numbers-to-100',
  'g2-roman-numbers': 'g2-roman-numbers',
  'g2-roman-sec-1': 'g2-roman-numbers',
  'g2-roman-sec-2': 'g2-roman-numbers',
  'g2-roman-sec-3': 'g2-roman-numbers',
  'g2-roman-sec-4': 'g2-roman-numbers',
  'g2-multiplication': 'g2-multiplication',
  'g2-mult-sec-2': 'g2-multiplication',
  'g2-mult-sec-3': 'g2-multiplication',
  'g2-mult-sec-4': 'g2-multiplication',
  'g2-mult-sec-5': 'g2-multiplication',
  'g2-mult-sec-6': 'g2-multiplication',
  'g2-mult-sec-7': 'g2-multiplication',
  'g2-mult-sec-8': 'g2-multiplication',
  'g2-mult-sec-9': 'g2-multiplication',
  'g2-mult-sec-10': 'g2-multiplication',
  'g2-division': 'g2-division',
  'g2-div-sec-2': 'g2-division',
  'g2-div-sec-3': 'g2-division',
  'g2-div-sec-4': 'g2-division',
  'g2-div-sec-5': 'g2-division',
  'g2-div-sec-6': 'g2-division',
  'g2-div-sec-7': 'g2-division',
  'g2-div-sec-8': 'g2-division',
  'g2-div-sec-9': 'g2-division',
  'g2-div-sec-10': 'g2-division',
  'g2-geometry': 'g2-geometry',
  'g2-geo-sec-1': 'g2-geometry',
  'g2-geo-sec-2': 'g2-geometry',
  'g2-geo-sec-3': 'g2-geometry',
  'g2-measurements': 'g2-measurements',
  'g2-meas-sec-1': 'g2-measurements',
  'g2-meas-sec-2': 'g2-measurements',
  'g2-meas-sec-3': 'g2-measurements',

  // Grade 3
  'g3-count-100': 'g3-count-100',
  'g3-count-sec-1': 'g3-count-100',
  'g3-count-sec-2': 'g3-count-100',
  'g3-count-sec-3': 'g3-count-100',
  'g3-count-sec-4': 'g3-count-100',
  'g3-count-sec-5': 'g3-count-100',
  'g3-count-sec-6': 'g3-count-100',
  'g3-count-sec-7': 'g3-count-100',
  'g3-count-sec-8': 'g3-count-100',
  'g3-roman-numbers': 'g3-roman-numbers',
  'g3-roman-sec-1': 'g3-roman-numbers',
  'g3-roman-sec-2': 'g3-roman-numbers',
  'g3-roman-sec-3': 'g3-roman-numbers',
  'g3-count-200': 'g3-count-200',
  'g3-count200-sec-1': 'g3-count-200',
  'g3-count200-sec-2': 'g3-count-200',
  'g3-count200-sec-3': 'g3-count-200',
  'g3-count200-sec-4': 'g3-count-200',
  'g3-count200-sec-5': 'g3-count-200',
  'g3-count200-sec-6': 'g3-count-200',
  'g3-measurements-1': 'g3-measurements-1',
  'g3-meas-sec-1': 'g3-measurements-1',
  'g3-meas-sec-2': 'g3-measurements-1',
  'g3-meas-sec-3': 'g3-measurements-1',
  'g3-meas-sec-4': 'g3-measurements-1',
  'g3-meas-sec-5': 'g3-measurements-1',
  'g3-meas-sec-6': 'g3-measurements-1',
  'g3-meas-sec-7': 'g3-measurements-1',
  'g3-meas-sec-8': 'g3-measurements-1',
  'g3-meas-sec-9': 'g3-measurements-1',
  'g3-count-500': 'g3-count-500',
  'g3-count500-sec-1': 'g3-count-500',
  'g3-count500-sec-2': 'g3-count-500',
  'g3-count500-sec-3': 'g3-count-500',
  'g3-count500-sec-4': 'g3-count-500',
  'g3-count500-sec-5': 'g3-count-500',
  'g3-grouping': 'g3-grouping',
  'g3-group-sec-1': 'g3-grouping',
  'g3-group-sec-2': 'g3-grouping',
  'g3-group-sec-3': 'g3-grouping',
  'g3-written-addition': 'g3-written-addition',
  'g3-wr-add-sec-1': 'g3-written-addition',
  'g3-wr-add-sec-2': 'g3-written-addition',
  'g3-wr-add-sec-3': 'g3-written-addition',
  'g3-wr-add-sec-4': 'g3-written-addition',
  'g3-wr-add-sec-5': 'g3-written-addition',
  'g3-wr-add-sec-6': 'g3-written-addition',
  'g3-written-subtraction': 'g3-written-subtraction',
  'g3-wr-sub-sec-1': 'g3-written-subtraction',
  'g3-wr-sub-sec-2': 'g3-written-subtraction',
  'g3-wr-sub-sec-3': 'g3-written-subtraction',
  'g3-wr-sub-sec-4': 'g3-written-subtraction',
  'g3-wr-sub-sec-5': 'g3-written-subtraction',
  'g3-negative-numbers': 'g3-negative-numbers',
  'g3-neg-sec-1': 'g3-negative-numbers',
  'g3-neg-sec-2': 'g3-negative-numbers',
  'g3-neg-sec-3': 'g3-negative-numbers',
  'g3-shapes-solids': 'g3-shapes-solids',
  'g3-geom-sec-1': 'g3-shapes-solids',
  'g3-geom-sec-2': 'g3-shapes-solids',
  'g3-geom-sec-3': 'g3-shapes-solids',
  'g3-geom-sec-4': 'g3-shapes-solids',
  'g3-geom-sec-5': 'g3-shapes-solids',
  'g3-count-1000': 'g3-count-1000',
  'g3-count1000-sec-1': 'g3-count-1000',
  'g3-count1000-sec-2': 'g3-count-1000',
  'g3-count1000-sec-3': 'g3-count-1000',
  'g3-count1000-sec-4': 'g3-count-1000',
  'g3-count1000-sec-5': 'g3-count-1000',
  'g3-written-ops-1000': 'g3-written-ops-1000',
  'g3-wrops-sec-1': 'g3-written-ops-1000',
  'g3-wrops-sec-2': 'g3-written-ops-1000',
  'g3-wrops-sec-3': 'g3-written-ops-1000',
  'g3-wrops-sec-4': 'g3-written-ops-1000',
  'g3-wrops-sec-5': 'g3-written-ops-1000',
  'g3-written-mult': 'g3-written-mult',
  'g3-wr-mult-sec-1': 'g3-written-mult',
  'g3-wr-mult-sec-2': 'g3-written-mult',
  'g3-wr-mult-sec-3': 'g3-written-mult',
  'g3-wr-mult-sec-4': 'g3-written-mult',
  'g3-wr-mult-sec-5': 'g3-written-mult',
  'g3-wr-mult-sec-6': 'g3-written-mult',
  'g3-fractions-intro': 'g3-fractions-intro',
  'g3-frac-sec-1': 'g3-fractions-intro',
  'g3-frac-sec-2': 'g3-fractions-intro',
  'g3-frac-sec-3': 'g3-fractions-intro',

  // Grade 4
  'g4-count-10k': 'g4-count-10k',
  'g4-count-sec-1': 'g4-count-10k',
  'g4-count-sec-2': 'g4-count-10k',
  'g4-count-sec-3': 'g4-count-10k',
  'g4-count-sec-4': 'g4-count-10k',
  'g4-count-sec-5': 'g4-count-10k',
  'g4-count-sec-6': 'g4-count-10k',
  'g4-count-sec-7': 'g4-count-10k',
  'g4-count-sec-8': 'g4-count-10k',
  'g4-count-sec-9': 'g4-count-10k',
  'g4-count-sec-10': 'g4-count-10k',
  'g4-count-sec-11': 'g4-count-10k',
  'g4-count-sec-12': 'g4-count-10k',
  'g4-count-sec-13': 'g4-count-10k',
  'g4-measurements': 'g4-measurements',
  'g4-meas-sec-1': 'g4-measurements',
  'g4-meas-sec-2': 'g4-measurements',
  'g4-meas-sec-3': 'g4-measurements',
  'g4-meas-sec-4': 'g4-measurements',
  'g4-meas-sec-5': 'g4-measurements',
  'g4-meas-sec-6': 'g4-measurements',
  'g4-meas-sec-7': 'g4-measurements',
  'g4-meas-sec-8': 'g4-measurements',
  'g4-written-ops': 'g4-written-ops',
  'g4-wops-sec-1': 'g4-written-ops',
  'g4-wops-sec-2': 'g4-written-ops',
  'g4-wops-sec-3': 'g4-written-ops',
  'g4-wops-sec-4': 'g4-written-ops',
  'g4-wops-sec-5': 'g4-written-ops',
  'g4-wops-sec-6': 'g4-written-ops',
  'g4-wops-sec-7': 'g4-written-ops',
  'g4-negatives': 'g4-negatives',
  'g4-neg-sec-1': 'g4-negatives',
  'g4-neg-sec-2': 'g4-negatives',
  'g4-neg-sec-3': 'g4-negatives',
  'g4-shapes-solids': 'g4-shapes-solids',
  'g4-geom-sec-1': 'g4-shapes-solids',
  'g4-geom-sec-2': 'g4-shapes-solids',
  'g4-geom-sec-3': 'g4-shapes-solids',
  'g4-geom-sec-4': 'g4-shapes-solids',
  'g4-geom-sec-5': 'g4-shapes-solids',
  'g4-geom-sec-6': 'g4-shapes-solids',
  'g4-geom-sec-7': 'g4-shapes-solids',
  'g4-geom-sec-8': 'g4-shapes-solids',
  'g4-grouping': 'g4-grouping',
  'g4-group-sec-1': 'g4-grouping',
  'g4-group-sec-2': 'g4-grouping',
  'g4-group-sec-3': 'g4-grouping',
  'g4-group-sec-4': 'g4-grouping',
  'g4-written-mult': 'g4-written-mult',
  'g4-wmult-sec-1': 'g4-written-mult',
  'g4-wmult-sec-2': 'g4-written-mult',
  'g4-wmult-sec-3': 'g4-written-mult',
  'g4-fractions': 'g4-fractions',
  'g4-frac-sec-1': 'g4-fractions',
  'g4-frac-sec-2': 'g4-fractions',
  'g4-frac-sec-3': 'g4-fractions',
  'g4-frac-sec-4': 'g4-fractions',
  'g4-frac-sec-5': 'g4-fractions',

  // Grade 5
  'g5-ops': 'g5-integers',
  'g5-geom-basics': 'g5-geometry-intro',
  'g5-proportions': 'g5-proportion-problems',

  // Grade 7
  'g7-sec-szamold-ossze': 'g7-logic',
  'g7-sec-rendezd-sorba': 'g7-logic',
  'g7-sec-hany-eset-van': 'g7-logic',
  'g7-sec-grafok': 'g7-logic',
  'g7-sec-igazold-cafold': 'g7-logic',
  'g7-sec-matematikai-jatekok': 'g7-logic',
  'g7-sec-osszefoglalas': 'g7-logic',
  'g7-sec-rat-egesz-attekintes': 'g7-rational-algebra',
  'g7-sec-rat-tortek-tizedes': 'g7-rational-algebra',
  'g7-sec-rat-muveletek': 'g7-rational-algebra',
  'g7-sec-rat-szoveges': 'g7-rational-algebra',
  'g7-sec-rat-osszetett-zarojel': 'g7-rational-algebra',
  'g7-sec-rat-szamok-betuk': 'g7-rational-algebra',
  'g7-sec-rat-osszevonas-ertek': 'g7-rational-algebra',
  'g7-sec-rat-zarojel-kiemeles': 'g7-rational-algebra',
  'g7-sec-trans-fogalmak': 'g7-geom-trans',
  'g7-sec-trans-haromszog-vonalak': 'g7-geom-trans',
  'g7-sec-trans-haromszog-negyszog': 'g7-geom-trans',
  'g7-sec-trans-transzformaciok': 'g7-geom-trans',
  'g7-sec-trans-kozeppontos-tukrozes': 'g7-geom-trans',
  'g7-sec-trans-kozeppontos-alkalmazas': 'g7-geom-trans',
  'g7-sec-trans-szogparok': 'g7-geom-trans',
  'g7-sec-trans-szimmetria': 'g7-geom-trans',
  'g7-sec-trans-paralelogramma-deltoid': 'g7-geom-trans',
  'g7-sec-trans-kozeppontosan-szimmetrikus': 'g7-geom-trans',
  'g7-sec-trans-szabalyos-sokszogek': 'g7-geom-trans',
  'g7-sec-trans-kor': 'g7-geom-trans',
  'g7-sec-trans-szerkesztesek': 'g7-geom-trans',
  'g7-sec-trans-osszefoglalas': 'g7-geom-trans',
  'g7-sec-pow-nagy-szamok': 'g7-powers-divisibility',
  'g7-sec-pow-alkalmazas': 'g7-powers-divisibility',
  'g7-sec-pow-mit-tanultunk-ismetles': 'g7-powers-divisibility',
  'g7-sec-pow-logika': 'g7-powers-divisibility',
  'g7-sec-pow-prim-felbontas': 'g7-powers-divisibility',
  'g7-sec-pow-szabaly-keszites': 'g7-powers-divisibility',
  'g7-sec-pow-osztok-tobbszorosok': 'g7-powers-divisibility',
  'g7-sec-pow-lnko': 'g7-powers-divisibility',
  'g7-sec-pow-lkkt': 'g7-powers-divisibility',
  'g7-sec-pow-jatekok': 'g7-powers-divisibility',
  'g7-sec-pow-osszefoglalas': 'g7-powers-divisibility',
  'g7-expressions': 'g7-rational-algebra',
  'g7-sec-pct-aranyossag': 'g7-percent-equations',
  'g7-sec-pct-mit-tanultunk': 'g7-percent-equations',
  'g7-sec-pct-100-szazalek': 'g7-percent-equations',
  'g7-sec-pct-hany-szazalek': 'g7-percent-equations',
  'g7-sec-pct-gyakorlas': 'g7-percent-equations',
  'g7-sec-pct-osszetett': 'g7-percent-equations',
  'g7-sec-pct-szoveges': 'g7-percent-equations',
  'g7-sec-pct-egyenlet-modszerek': 'g7-percent-equations',
  'g7-sec-pct-merlegelv': 'g7-percent-equations',
  'g7-sec-pct-egyenletek-merlegelvvel': 'g7-percent-equations',
  'g7-sec-pct-szoveges-egyenlettel': 'g7-percent-equations',
  'g7-sec-pct-osszefoglalas': 'g7-percent-equations',
  'g7-percent-val': 'g7-percent-equations',
  'g7-percent-rate': 'g7-percent-equations',
  'g7-percent-base': 'g7-percent-equations',
  'g7-sec-geom-egybevagosag': 'g7-geometry',
  'g7-sec-geom-oldalak-szogek': 'g7-geometry',
  'g7-sec-geom-sokszogek-szogei-atloi': 'g7-geometry',
  'g7-sec-geom-mertekegysegek': 'g7-geometry',
  'g7-sec-geom-paralelogramma-terulet': 'g7-geometry',
  'g7-sec-geom-haromszog-terulet': 'g7-geometry',
  'g7-sec-geom-trapez-terulet': 'g7-geometry',
  'g7-sec-geom-deltoid-terulet': 'g7-geometry',
  'g7-sec-geom-hasab-felszin-terfogat': 'g7-geometry',
  'g7-sec-geom-testek-terben-sikban': 'g7-geometry',
  'g7-sec-geom-szabaduloszoba': 'g7-geometry',
  'g7-sec-geom-osszefoglalas': 'g7-geometry',
  'g7-sec-stats-halmazok-hozzarendeles': 'g7-stats',
  'g7-sec-stats-megadasi-modok': 'g7-stats',
  'g7-sec-stats-olvassunk-grafikonrol': 'g7-stats',
  'g7-sec-stats-atlag-modusz-median': 'g7-stats',
  'g7-sec-stats-gyakorisag-relativ': 'g7-stats',
  'g7-sec-stats-valoszinuseg': 'g7-stats',
  'g7-sec-stats-tippelj-kiserletezz': 'g7-stats',
  'g7-sec-stats-osszefoglalas': 'g7-stats',

  // Grade 8
  'g8-sec-logika': 'g8-numbers-letters',
  'g8-sec-halmazok-alap': 'g8-numbers-letters',
  'g8-sec-halmaz-muveletek': 'g8-numbers-letters',
  'g8-sec-racionalis-halmaz': 'g8-numbers-letters',
  'g8-sec-racionalis-muvelet': 'g8-numbers-letters',
  'g8-sec-hatvanyozas': 'g8-numbers-letters',
  'g8-sec-negyzetgyok-fogalom': 'g8-numbers-letters',
  'g8-sec-szamok-negyzetgyoke': 'g8-numbers-letters',
  'g8-sec-betus-ismetles': 'g8-numbers-letters',
  'g8-sec-betus-szorzas': 'g8-numbers-letters',
  'g8-sec-tobbtagu-szorzat': 'g8-numbers-letters',
  'g8-sec-osszefoglalas': 'g8-numbers-letters',
  'g8-sec-geom-egybevagosag': 'g8-geometry',
  'g8-sec-geom-transzformaciok': 'g8-geometry',
  'g8-sec-geom-szerkesztoprogram': 'g8-geometry',
  'g8-sec-geom-hasonlosag': 'g8-geometry',
  'g8-sec-geom-kozeppontos': 'g8-geometry',
  'g8-sec-geom-szerkesztesek': 'g8-geometry',
  'g8-sec-geom-osszefoglalas': 'g8-geometry',
  'g8-sec-eq-alap': 'g8-equations',
  'g8-sec-eq-szamok-kor': 'g8-equations',
  'g8-sec-eq-keveres': 'g8-equations',
  'g8-sec-eq-mozgas-munka': 'g8-equations',
  'g8-sec-eq-geometria': 'g8-equations',
  'g8-sec-eq-vegyes': 'g8-equations',
  'g8-sec-eq-penzugy': 'g8-equations',
  'g8-sec-eq-osszefoglalas': 'g8-equations',
  'g8-sec-pyth-szerkesztes': 'g8-pythagoras',
  'g8-sec-pyth-tetel': 'g8-pythagoras',
  'g8-sec-pyth-megforditas': 'g8-pythagoras',
  'g8-sec-pyth-alkalmazas': 'g8-pythagoras',
  'g8-sec-pyth-szamologep': 'g8-pythagoras',
  'g8-sec-pyth-nevezetes': 'g8-pythagoras',
  'g8-sec-pyth-osszefoglalas': 'g8-pythagoras',
  'g8-sec-func-egyenes': 'g8-functions-probability-sequences',
  'g8-sec-func-grafikonok': 'g8-functions-probability-sequences',
  'g8-sec-func-forditott': 'g8-functions-probability-sequences',
  'g8-sec-func-olvasas': 'g8-functions-probability-sequences',
  'g8-sec-func-rajzolas': 'g8-functions-probability-sequences',
  'g8-sec-func-gyakorisag': 'g8-functions-probability-sequences',
  'g8-sec-func-jatek': 'g8-functions-probability-sequences',
  'g8-sec-func-valoszinuseg': 'g8-functions-probability-sequences',
  'g8-sec-func-feladatok': 'g8-functions-probability-sequences',
  'g8-sec-func-mintazat': 'g8-functions-probability-sequences',
  'g8-sec-func-sorozatok': 'g8-functions-probability-sequences',
  'g8-sec-func-osszefoglalas': 'g8-functions-probability-sequences',
  'g8-sec-solids-ismetles': 'g8-solids',
  'g8-sec-solids-gulak': 'g8-solids',
  'g8-sec-solids-gula-szamitas': 'g8-solids',
  'g8-sec-solids-gomb': 'g8-solids',
  'g8-sec-solids-fold': 'g8-solids',
  'g8-sec-solids-osszefoglalas': 'g8-solids',

  // Grade 9
  'g9-kombinatorika-halmazok': 'g9-kombinatorika-halmazok',
  'g9-sec-hanyfelekeppen': 'g9-kombinatorika-halmazok',
  'g9-sec-grafok': 'g9-kombinatorika-halmazok',
  'g9-sec-szamzarak': 'g9-kombinatorika-halmazok',
  'g9-sec-osszeszamlalas': 'g9-kombinatorika-halmazok',
  'g9-sec-gyakorlas-kombi': 'g9-kombinatorika-halmazok',
  'g9-sec-halmazok': 'g9-kombinatorika-halmazok',
  'g9-sec-halmaz-muveletek': 'g9-kombinatorika-halmazok',
  'g9-sec-szitaformula': 'g9-kombinatorika-halmazok',
  'g9-sec-intervallumok': 'g9-kombinatorika-halmazok',
  'g9-sec-gyakorlas-halmaz': 'g9-kombinatorika-halmazok',
  'g9-sec-tudasproba': 'g9-kombinatorika-halmazok',

  'g9-szamok-vilaga': 'g9-szamok-vilaga',
  'g9-sec-muveletek-szamhalmazokban': 'g9-szamok-vilaga',
  'g9-sec-szamolas-tortekkel': 'g9-szamok-vilaga',
  'g9-sec-racionalis-irracionalis': 'g9-szamok-vilaga',
  'g9-sec-aranyossag': 'g9-szamok-vilaga',
  'g9-sec-aranyos-osztas': 'g9-szamok-vilaga',
  'g9-sec-szazalekszamitas': 'g9-szamok-vilaga',
  'g9-sec-hatvanyozas': 'g9-szamok-vilaga',
  'g9-sec-gyakorlas-hatvany': 'g9-szamok-vilaga',
  'g9-sec-negyzetgyok': 'g9-szamok-vilaga',
  'g9-sec-szamok-normalalakja': 'g9-szamok-vilaga',
  'g9-sec-szamolas-normalalakkal': 'g9-szamok-vilaga',
  'g9-sec-kamatos-kamat': 'g9-szamok-vilaga',
  'g9-sec-tudasproba-szamok': 'g9-szamok-vilaga',

  'g9-egyenletek-azonossagok': 'g9-egyenletek-azonossagok',
  'g9-sec-betuk-szerepe': 'g9-egyenletek-azonossagok',
  'g9-sec-algebrai-szamolas': 'g9-egyenletek-azonossagok',
  'g9-sec-nevezetes-szorzatok': 'g9-egyenletek-azonossagok',
  'g9-sec-szorzatta-alakitas': 'g9-egyenletek-azonossagok',
  'g9-sec-egyenletek-alap': 'g9-egyenletek-azonossagok',
  'g9-sec-problemamegoldas-egyenletekkel': 'g9-egyenletek-azonossagok',
  'g9-sec-alaphalmaz-megoldashalmaz': 'g9-egyenletek-azonossagok',
  'g9-sec-egyenletek-megoldasa': 'g9-egyenletek-azonossagok',
  'g9-sec-ketismeretlenes-egyenletrendszer': 'g9-egyenletek-azonossagok',

  'g9-bevezetes-geometriaba': 'g9-bevezetes-geometriaba',
  'g9-sec-sik-geometria': 'g9-bevezetes-geometriaba',
  'g9-sec-altalanos-szimmetrikus-haromszogek': 'g9-bevezetes-geometriaba',
  'g9-sec-pitagorasz': 'g9-bevezetes-geometriaba',
  'g9-sec-kulonleges-derekszogu': 'g9-bevezetes-geometriaba',
  'g9-sec-tavolsagok': 'g9-bevezetes-geometriaba',
  'g9-sec-a-kor': 'g9-bevezetes-geometriaba',
  'g9-sec-nevezetes-vonalak-1': 'g9-bevezetes-geometriaba',
  'g9-sec-nevezetes-vonalak-2': 'g9-bevezetes-geometriaba',
  'g9-sec-gyakorlas-geom': 'g9-bevezetes-geometriaba',
  'g9-sec-thalesz': 'g9-bevezetes-geometriaba',
  'g9-sec-thalesz-alkalmazas': 'g9-bevezetes-geometriaba',
  'g9-sec-haromszog-kerulet-terulet': 'g9-bevezetes-geometriaba',
  'g9-sec-tudasproba-geom': 'g9-bevezetes-geometriaba',

  'g9-fuggvenyek': 'g9-fuggvenyek',
  'g9-sec-tablazatok': 'g9-fuggvenyek',
  'g9-sec-diagramok': 'g9-fuggvenyek',
  'g9-sec-valtozasok-abrazolasa': 'g9-fuggvenyek',
  'g9-sec-grafikonok-mindennapokban': 'g9-fuggvenyek',
  'g9-sec-fuggveny-fogalma': 'g9-fuggvenyek',
  'g9-sec-keszitsunk-grafikont': 'g9-fuggvenyek',
  'g9-sec-aranyossagok-fuggvenye': 'g9-fuggvenyek',
  'g9-sec-egyenesek-meredeksege': 'g9-fuggvenyek',
  'g9-sec-linearis-fuggvenyek': 'g9-fuggvenyek',
  'g9-sec-abszolut-fuggveny': 'g9-fuggvenyek',
  'g9-sec-fuggvenyek-jellemzese': 'g9-fuggvenyek',
  'g9-sec-szelsoertekek': 'g9-fuggvenyek',
  'g9-sec-masodfoku-negyzetgyok': 'g9-fuggvenyek',
  'g9-sec-fuggveny-gyakorlat': 'g9-fuggvenyek',
  'g9-sec-egyenletek-grafikus': 'g9-fuggvenyek',
  'g9-sec-egyenlotlensegek': 'g9-fuggvenyek',
  'g9-sec-abszolut-egyenletek': 'g9-fuggvenyek',
  'g9-sec-tudasproba-fuggveny': 'g9-fuggvenyek',

  'g9-egybevagosag-negyszogek': 'g9-egybevagosag-negyszogek',
  'g9-sec-forgatas-kozeppontos-tukrozes': 'g9-egybevagosag-negyszogek',
  'g9-sec-vektorok-eltolas': 'g9-egybevagosag-negyszogek',
  'g9-sec-tengelyes-tukrozes': 'g9-egybevagosag-negyszogek',
  'g9-sec-szerkesztesek': 'g9-egybevagosag-negyszogek',
  'g9-sec-transzformaciok-gyakorlatban': 'g9-egybevagosag-negyszogek',
  'g9-sec-szimmetrikus-negyszogek': 'g9-egybevagosag-negyszogek',
  'g9-sec-negyszogek-terulete': 'g9-egybevagosag-negyszogek',
  'g9-sec-tudasproba-negyszogek': 'g9-egybevagosag-negyszogek'
};

export function getGradeSubsections(
  selectedGrade: number | string | null,
  allMathTopics: MathTopic[]
): NavTopicItem[] {
  if (selectedGrade === 5) {
    return grade5Topics as NavTopicItem[];
  }

  let filtered: MathTopic[] = [];
  if (typeof selectedGrade === 'number') {
    filtered = allMathTopics.filter(t => t.grades.includes(selectedGrade as number) && t.id !== 'materials');
  } else if (typeof selectedGrade === 'string' && selectedGrade.startsWith('high-')) {
    const specific = allMathTopics.filter(t => t.grades.includes(selectedGrade as any) && t.id !== 'materials');
    filtered = specific.length > 0 ? specific : allMathTopics.filter(t => ['algebra', 'geometry', 'percentages', 'word-problems'].includes(t.id));
  } else if (selectedGrade === 'admission' || selectedGrade === 'graduation') {
    return [];
  }

  const list: NavTopicItem[] = [];
  const materialsTopic = allMathTopics.find(t => t.id === 'materials');
  if (materialsTopic) {
    list.push({
      id: 'materials',
      title: 'Tananyagok és Könyvek',
      icon: '📚',
      color: 'from-indigo-500 to-purple-600',
      subsections: []
    });
  }

  filtered.forEach(t => {
    let subsections: SubsectionItem[] = [];

    // Grade 1 Subsections
    if (t.id === 'g1-prep-period') {
      subsections = [
        { id: 'g1-prep-sec-1', label: '1. Válogatások' },
        { id: 'g1-prep-sec-2', label: '2. Összehasonlítások' },
        { id: 'g1-prep-sec-3', label: '3. Logikai lapok' },
        { id: 'g1-prep-sec-4', label: '4. Pálcikák és korongok' },
        { id: 'g1-prep-sec-5', label: '5. Színesrúd-készlet' },
        { id: 'g1-prep-sec-6', label: '6. Tájékozódás' },
        { id: 'g1-prep-sec-7', label: '7. Számlálások' },
        { id: 'g1-prep-sec-8', label: '8. Több, kevesebb, ugyanannyi' }
      ];
    } else if (t.id === 'g1-numbers-to-5') {
      subsections = [
        { id: 'g1-count5-sec-1', label: '1. Az egy' },
        { id: 'g1-count5-sec-2', label: '2. A kettő' },
        { id: 'g1-count5-sec-3', label: '3. A nulla' },
        { id: 'g1-count5-sec-4', label: '4. A három' },
        { id: 'g1-count5-sec-5', label: '5. A négy' },
        { id: 'g1-count5-sec-6', label: '6. Az öt' },
        { id: 'g1-count5-sec-7', label: '7. Összeadás 0-tól 5-ig' },
        { id: 'g1-count5-sec-8', label: '8. Kivonás 0-tól 5-ig' },
        { id: 'g1-count5-sec-9', label: '9. Megálló' }
      ];
    } else if (t.id === 'g1-numbers-to-10') {
      subsections = [
        { id: 'g1-count10-sec-1', label: '1. A hat' },
        { id: 'g1-count10-sec-2', label: '2. Számolás 0-tól 6-ig' },
        { id: 'g1-count10-sec-3', label: '3. Páros és páratlan számok' },
        { id: 'g1-count10-sec-4', label: '4. Megálló' },
        { id: 'g1-count10-sec-5', label: '5. A hét' },
        { id: 'g1-count10-sec-6', label: '6. Számolás 0-tól 7-ig' },
        { id: 'g1-count10-sec-7', label: '7. Számszomszédok' },
        { id: 'g1-count10-sec-8', label: '8. Megálló' },
        { id: 'g1-count10-sec-9', label: '9. A nyolc' },
        { id: 'g1-count10-sec-10', label: '10. Számolás 0-tól 8-ig' },
        { id: 'g1-count10-sec-11', label: '11. Nyitott mondatok' },
        { id: 'g1-count10-sec-12', label: '12. Megálló' },
        { id: 'g1-count10-sec-13', label: '13. A kilenc' },
        { id: 'g1-count10-sec-14', label: '14. Számolás 0-tól 9-ig' },
        { id: 'g1-count10-sec-15', label: '15. A sorszámnevek' },
        { id: 'g1-count10-sec-16', label: '16. Megálló' },
        { id: 'g1-count10-sec-17', label: '17. A tíz' },
        { id: 'g1-count10-sec-18', label: '18. Számolás 0-tól 10-ig' },
        { id: 'g1-count10-sec-19', label: '19. Szöveges feladatok' },
        { id: 'g1-count10-sec-20', label: '20. Megálló' }
      ];
    } else if (t.id === 'g1-geometry') {
      subsections = [
        { id: 'g1-geo-sec-1', label: '1. Vonalak' },
        { id: 'g1-geo-sec-2', label: '2. Síkidomok' },
        { id: 'g1-geo-sec-3', label: '3. Testek' }
      ];
    } else if (t.id === 'g1-measurements') {
      subsections = [
        { id: 'g1-meas-sec-1', label: '1. A hosszúság mérése' },
        { id: 'g1-meas-sec-2', label: '2. A tömeg mérése' },
        { id: 'g1-meas-sec-3', label: '3. Az űrtartalom mérése' },
        { id: 'g1-meas-sec-4', label: '4. Az idő mérése' }
      ];
    } else if (t.id === 'g1-numbers-to-20') {
      subsections = [
        { id: 'g1-count20-sec-1', label: '1. A tizenegy' },
        { id: 'g1-count20-sec-2', label: '2. A tizenkettő' },
        { id: 'g1-count20-sec-3', label: '3. A tizenhárom' },
        { id: 'g1-count20-sec-4', label: '4. A tizennégy' },
        { id: 'g1-count20-sec-5', label: '5. A tizenöt' },
        { id: 'g1-count20-sec-6', label: '6. A tizenhat' },
        { id: 'g1-count20-sec-7', label: '7. A tizenhét' },
        { id: 'g1-count20-sec-8', label: '8. A tizennyolc' },
        { id: 'g1-count20-sec-9', label: '9. A tizenkilenc' },
        { id: 'g1-count20-sec-10', label: '10. A húsz' },
        { id: 'g1-count20-sec-11', label: '11. Számolás 20-ig' }
      ];
    } else if (t.id === 'g2-numbers-to-20') {
      subsections = [
        { id: 'g2-count20-sec-1', label: '1. Számok 0-tól 20-ig' },
        { id: 'g2-count20-sec-2', label: '2. Összeadás 10-es számkör' },
        { id: 'g2-count20-sec-3', label: '3. Kivonás 10-es számkör' },
        { id: 'g2-count20-sec-4', label: '4. Összeadás 20-as számkör' },
        { id: 'g2-count20-sec-5', label: '5. Kivonás 20-as számkör' },
        { id: 'g2-count20-sec-6', label: '6. Szöveges feladatok' },
        { id: 'g2-count20-sec-7', label: '7. Megálló' }
      ];
    } else if (t.id === 'g2-numbers-to-50') {
      subsections = [
        { id: 'g2-count50-sec-1', label: '1. Számok 50-ig' },
        { id: 'g2-count50-sec-2', label: '2. Összeadás 50-es számkör' },
        { id: 'g2-count50-sec-3', label: '3. Kivonás 50-es számkör' },
        { id: 'g2-count50-sec-4', label: '4. Összeadás, kivonás kerek tízesekkel' },
        { id: 'g2-count50-sec-5', label: '5. Szöveges feladatok' },
        { id: 'g2-count50-sec-6', label: '6. Megálló' }
      ];
    } else if (t.id === 'g2-numbers-to-100') {
      subsections = [
        { id: 'g2-count100-sec-1', label: '1. Számok 100-ig' },
        { id: 'g2-count100-sec-2', label: '2. Összeadás 100-as számkör' },
        { id: 'g2-count100-sec-3', label: '3. Kivonás 100-as számkör' },
        { id: 'g2-count100-sec-4', label: '4. Összeadás, kivonás kerek tízesekkel' },
        { id: 'g2-count100-sec-5', label: '5. Szöveges feladatok' },
        { id: 'g2-count100-sec-6', label: '6. Megálló' }
      ];
    } else if (t.id === 'g2-roman-numbers') {
      subsections = [
        { id: 'g2-roman-sec-1', label: '1. Római számok értelmezése' },
        { id: 'g2-roman-sec-2', label: '2. Római számok 0-10-ig' },
        { id: 'g2-roman-sec-3', label: '3. Római számok 0-50-ig' },
        { id: 'g2-roman-sec-4', label: '4. Római számok 0-100-ig' }
      ];
    } else if (t.id === 'g2-multiplication') {
      subsections = [
        { id: 'g2-mult-sec-2', label: '1. Szorzás 2-vel' },
        { id: 'g2-mult-sec-3', label: '2. Szorzás 3-mal' },
        { id: 'g2-mult-sec-4', label: '3. Szorzás 4-gyel' },
        { id: 'g2-mult-sec-5', label: '4. Szorzás 5-tel' },
        { id: 'g2-mult-sec-6', label: '5. Szorzás 6-tal' },
        { id: 'g2-mult-sec-7', label: '6. Szorzás 7-tel' },
        { id: 'g2-mult-sec-8', label: '7. Szorzás 8-cal' },
        { id: 'g2-mult-sec-9', label: '8. Szorzás 9-cel' },
        { id: 'g2-mult-sec-10', label: '9. Szorzás 10-zel' }
      ];
    } else if (t.id === 'g2-division') {
      subsections = [
        { id: 'g2-div-sec-2', label: '1. Osztás 2-vel' },
        { id: 'g2-div-sec-3', label: '2. Osztás 3-mal' },
        { id: 'g2-div-sec-4', label: '3. Osztás 4-gyel' },
        { id: 'g2-div-sec-5', label: '4. Osztás 5-tel' },
        { id: 'g2-div-sec-6', label: '5. Osztás 6-tal' },
        { id: 'g2-div-sec-7', label: '6. Osztás 7-tel' },
        { id: 'g2-div-sec-8', label: '7. Osztás 8-cal' },
        { id: 'g2-div-sec-9', label: '8. Osztás 9-cel' },
        { id: 'g2-div-sec-10', label: '9. Osztás 10-zel' }
      ];
    } else if (t.id === 'g2-geometry') {
      subsections = [
        { id: 'g2-geo-sec-1', label: '1. Bevezető' },
        { id: 'g2-geo-sec-2', label: '2. Testek, síkidomok' },
        { id: 'g2-geo-sec-3', label: '3. Szimmetria, tükrözés' }
      ];
    } else if (t.id === 'g2-measurements') {
      subsections = [
        { id: 'g2-meas-sec-1', label: '1. Hosszúság mérés' },
        { id: 'g2-meas-sec-2', label: '2. Tömeg mérés' },
        { id: 'g2-meas-sec-3', label: '3. Űrtartalom mérés' }
      ];
    } else if (t.id === 'g3-count-100') {
      subsections = [
        { id: 'g3-count-sec-1', label: '1. Számok 100-ig' },
        { id: 'g3-count-sec-2', label: '2. Összeadás és kivonás' },
        { id: 'g3-count-sec-3', label: '3. Szorzás és osztás' },
        { id: 'g3-count-sec-4', label: '4. Maradékos osztás' },
        { id: 'g3-count-sec-5', label: '5. Szöveges feladatok' },
        { id: 'g3-count-sec-6', label: '6. A műveletek sorrendje' },
        { id: 'g3-count-sec-7', label: '7. A zárójel használata' },
        { id: 'g3-count-sec-8', label: '8. Megálló' }
      ];
    } else if (t.id === 'g3-roman-numbers') {
      subsections = [
        { id: 'g3-roman-sec-1', label: '1. A római számjegyek és alapszabályok' },
        { id: 'g3-roman-sec-2', label: '2. Római számok írása és olvasása 100-ig' },
        { id: 'g3-roman-sec-3', label: '3. Római számok a mindennapokban és fejtörők' }
      ];
    } else if (t.id === 'g3-count-200') {
      subsections = [
        { id: 'g3-count200-sec-1', label: '1. Számok 200-ig' },
        { id: 'g3-count200-sec-2', label: '2. Számok helye a számegyenesen' },
        { id: 'g3-count200-sec-3', label: '3. Számszomszédok, kerekítés' },
        { id: 'g3-count200-sec-4', label: '4. Összeadás és kivonás' },
        { id: 'g3-count200-sec-5', label: '5. Szorzás és osztás' },
        { id: 'g3-count200-sec-6', label: '6. Megálló' }
      ];
    } else if (t.id === 'g3-measurements-1') {
      subsections = [
        { id: 'g3-meas-sec-1', label: '1. Mit mivel mérünk?' },
        { id: 'g3-meas-sec-2', label: '2. A tömeg mérése' },
        { id: 'g3-meas-sec-3', label: '3. Az űrtartalom mérése' },
        { id: 'g3-meas-sec-4', label: '4. A hosszúság mérése' },
        { id: 'g3-meas-sec-5', label: '5. A kerület mérése' },
        { id: 'g3-meas-sec-6', label: '6. A téglalap és a négyzet kerülete' },
        { id: 'g3-meas-sec-7', label: '7. A terület mérése' },
        { id: 'g3-meas-sec-8', label: '8. A téglalap és a négyzet területe' },
        { id: 'g3-meas-sec-9', label: '9. Az idő mérése' }
      ];
    } else if (t.id === 'g3-count-500') {
      subsections = [
        { id: 'g3-count500-sec-1', label: '1. Számok 500-ig' },
        { id: 'g3-count500-sec-2', label: '2. Számszomszédok, kerekítés' },
        { id: 'g3-count500-sec-3', label: '3. Összeadás és kivonás' },
        { id: 'g3-count500-sec-4', label: '4. Szorzás és osztás' },
        { id: 'g3-count500-sec-5', label: '5. Megálló' }
      ];
    } else if (t.id === 'g3-grouping') {
      subsections = [
        { id: 'g3-group-sec-1', label: '1. Válogatás tulajdonságok szerint' },
        { id: 'g3-group-sec-2', label: '2. Venn-diagramok és halmazok' },
        { id: 'g3-group-sec-3', label: '3. Sorba rendezés és lehetőségek (Megálló)' }
      ];
    } else if (t.id === 'g3-written-addition') {
      subsections = [
        { id: 'g3-wr-add-sec-1', label: '1. Háromjegyű számok összeadása' },
        { id: 'g3-wr-add-sec-2', label: '2. Az összeg becslése' },
        { id: 'g3-wr-add-sec-3', label: '3. Írásbeli összeadás' },
        { id: 'g3-wr-add-sec-4', label: '4. Az összeg változásai' },
        { id: 'g3-wr-add-sec-5', label: '5. Szöveges feladatok' },
        { id: 'g3-wr-add-sec-6', label: '6. Megálló' }
      ];
    } else if (t.id === 'g3-written-subtraction') {
      subsections = [
        { id: 'g3-wr-sub-sec-1', label: '1. Háromjegyű számok kivonása' },
        { id: 'g3-wr-sub-sec-2', label: '2. A különbség becslése' },
        { id: 'g3-wr-sub-sec-3', label: '3. Írásbeli kivonás' },
        { id: 'g3-wr-sub-sec-4', label: '4. A különbség változásai' },
        { id: 'g3-wr-sub-sec-5', label: '5. Megálló' }
      ];
    } else if (t.id === 'g3-negative-numbers') {
      subsections = [
        { id: 'g3-neg-sec-1', label: '1. Negatív számok a mindennapokban' },
        { id: 'g3-neg-sec-2', label: '2. A számegyenes és a nulla' },
        { id: 'g3-neg-sec-3', label: '3. Összehasonlítás és változások (Megálló)' }
      ];
    } else if (t.id === 'g3-shapes-solids') {
      subsections = [
        { id: 'g3-geom-sec-1', label: '1. A testek' },
        { id: 'g3-geom-sec-2', label: '2. A téglatest és a kocka' },
        { id: 'g3-geom-sec-3', label: '3. Síkidomok, sokszögek' },
        { id: 'g3-geom-sec-4', label: '4. Tükrözések, szimmetria' },
        { id: 'g3-geom-sec-5', label: '5. Megálló' }
      ];
    } else if (t.id === 'g3-count-1000') {
      subsections = [
        { id: 'g3-count1000-sec-1', label: '1. Számok 1000-ig' },
        { id: 'g3-count1000-sec-2', label: '2. Számszomszédok, kerekítés' },
        { id: 'g3-count1000-sec-3', label: '3. Összeadás és kivonás' },
        { id: 'g3-count1000-sec-4', label: '4. Szorzás és osztás' },
        { id: 'g3-count1000-sec-5', label: '5. Megálló' }
      ];
    } else if (t.id === 'g3-written-ops-1000') {
      subsections = [
        { id: 'g3-wrops-sec-1', label: '1. Írásbeli összeadás 1000-ig' },
        { id: 'g3-wrops-sec-2', label: '2. Írásbeli kivonás 1000-ig' },
        { id: 'g3-wrops-sec-3', label: '3. A műveletek sorrendje és zárójelek' },
        { id: 'g3-wrops-sec-4', label: '4. Vegyes műveletek és szöveges feladatok' },
        { id: 'g3-wrops-sec-5', label: '5. Megálló' }
      ];
    } else if (t.id === 'g3-written-mult') {
      subsections = [
        { id: 'g3-wr-mult-sec-1', label: '1. Szorzás egyjegyű számmal' },
        { id: 'g3-wr-mult-sec-2', label: '2. A szorzat becslése' },
        { id: 'g3-wr-mult-sec-3', label: '3. Írásbeli szorzás egyjegyű szorzóval' },
        { id: 'g3-wr-mult-sec-4', label: '4. Összefüggések, következtetések' },
        { id: 'g3-wr-mult-sec-5', label: '5. A műveletek sorrendje' },
        { id: 'g3-wr-mult-sec-6', label: '6. Megálló' }
      ];
    } else if (t.id === 'g3-fractions-intro') {
      subsections = [
        { id: 'g3-frac-sec-1', label: '1. Bevezetés' },
        { id: 'g3-frac-sec-2', label: '2. Közönséges törtek' },
        { id: 'g3-frac-sec-3', label: '3. Összehasonlítás (Megálló)' }
      ];
    }

    // Grade 4 Subsections
    else if (t.id === 'g4-count-10k') {
      subsections = [
        { id: 'g4-count-sec-1', label: '1. Számok 0-tól 1000-ig' },
        { id: 'g4-count-sec-2', label: '2. Összeadás és kivonás 1000-ig' },
        { id: 'g4-count-sec-3', label: '3. Szorzás és osztás 1000-ig' },
        { id: 'g4-count-sec-4', label: '4. A műveletek sorrendje' },
        { id: 'g4-count-sec-5', label: '5. Nyitott mondatok' },
        { id: 'g4-count-sec-6', label: '6. Szöveges feladatok 1000-es számkörben' },
        { id: 'g4-count-sec-7', label: '7. A római számok' },
        { id: 'g4-count-sec-8', label: '8. Játékok a logikai lapokkal' },
        { id: 'g4-count-sec-9', label: '9. Csoportosítások és számok 10 000-ig' },
        { id: 'g4-count-sec-10', label: '10. Számszomszédok, kerekítés 10 000-ig' },
        { id: 'g4-count-sec-11', label: '11. Összeadás és kivonás 10 000-ig' },
        { id: 'g4-count-sec-12', label: '12. Szorzás és osztás 10 000-ig' },
        { id: 'g4-count-sec-13', label: '13. Megálló és Kitekintő (Összefoglalás)' }
      ];
    } else if (t.id === 'g4-measurements') {
      subsections = [
        { id: 'g4-meas-sec-1', label: '1. A hosszúság mérése' },
        { id: 'g4-meas-sec-2', label: '2. A kerület mérése' },
        { id: 'g4-meas-sec-3', label: '3. A terület mérése' },
        { id: 'g4-meas-sec-4', label: '4. A tömeg mérése' },
        { id: 'g4-meas-sec-5', label: '5. Az űrtartalom mérése' },
        { id: 'g4-meas-sec-6', label: '6. Az idő mérése' },
        { id: 'g4-meas-sec-7', label: '7. Megálló' },
        { id: 'g4-meas-sec-8', label: '8. Kitekintő' }
      ];
    } else if (t.id === 'g4-written-ops') {
      subsections = [
        { id: 'g4-wops-sec-1', label: '1. Írásbeli összeadás és kivonás' },
        { id: 'g4-wops-sec-2', label: '2. Írásbeli szorzás egyjegyű számmal' },
        { id: 'g4-wops-sec-3', label: '3. Írásbeli osztás egyjegyű osztóval' },
        { id: 'g4-wops-sec-4', label: '4. A számok tulajdonságai' },
        { id: 'g4-wops-sec-5', label: '5. Összefüggések, következtetések' },
        { id: 'g4-wops-sec-6', label: '6. A műveletek közötti kapcsolatok' },
        { id: 'g4-wops-sec-7', label: '7. A műveletek sorrendje' }
      ];
    } else if (t.id === 'g4-negatives') {
      subsections = [
        { id: 'g4-neg-sec-1', label: '1. A negatív számok a mindennapokban' },
        { id: 'g4-neg-sec-2', label: '2. Számegyenes és ellentettek' },
        { id: 'g4-neg-sec-3', label: '3. Összehasonlítás és változások' }
      ];
    } else if (t.id === 'g4-shapes-solids') {
      subsections = [
        { id: 'g4-geom-sec-1', label: '1. Síkidomok, sokszögek' },
        { id: 'g4-geom-sec-2', label: '2. A kör' },
        { id: 'g4-geom-sec-3', label: '3. A testek' },
        { id: 'g4-geom-sec-4', label: '4. A tükrözés' },
        { id: 'g4-geom-sec-5', label: '5. Nagyítás, kicsinyítés' },
        { id: 'g4-geom-sec-6', label: '6. Eltolás' },
        { id: 'g4-geom-sec-7', label: '7. Elforgatás' },
        { id: 'g4-geom-sec-8', label: '8. Tájékozódás' }
      ];
    } else if (t.id === 'g4-grouping') {
      subsections = [
        { id: 'g4-group-sec-1', label: '1. Válogatások halmazokba' },
        { id: 'g4-group-sec-2', label: '2. Válogatások táblázatokba' },
        { id: 'g4-group-sec-3', label: '3. Hányféle lehetőség van?' },
        { id: 'g4-group-sec-4', label: '4. Igaz vagy hamis?' }
      ];
    } else if (t.id === 'g4-written-mult') {
      subsections = [
        { id: 'g4-wmult-sec-1', label: '1. Szorzás kétjegyű szorzóval' },
        { id: 'g4-wmult-sec-2', label: '2. Írásbeli szorzás' },
        { id: 'g4-wmult-sec-3', label: '3. Összefüggések, következtetések' }
      ];
    } else if (t.id === 'g4-fractions') {
      subsections = [
        { id: 'g4-frac-sec-1', label: '1. A törtrész és a törtek értelmezése' },
        { id: 'g4-frac-sec-2', label: '2. Egynél kisebb törtek' },
        { id: 'g4-frac-sec-3', label: '3. Az 1 egész és az egynél nagyobb törtek' },
        { id: 'g4-frac-sec-4', label: '4. Törtek összehasonlítása és rendezése' },
        { id: 'g4-frac-sec-5', label: '5. Törtrész kiszámítása és szöveges feladatok' }
      ];
    }

    // Grade 6 Subsections
    else if (t.id === 'g6-integers-divisibility') {
      subsections = [
        { id: 'g6-sec-muveletek', label: '1. Műveletek az egész számok körében' },
        { id: 'g6-sec-szorzas', label: '2. Az egész számok szorzása' },
        { id: 'g6-sec-osztas', label: '3. Az egész számok osztása' },
        { id: 'g6-sec-hany-eset', label: '4. Hány eset van? Számoljuk össze!' },
        { id: 'g6-sec-oszto-tobbszoros', label: '5. Osztó, többszörös' },
        { id: 'g6-sec-maradekok', label: '6. Számolás maradékokkal' },
        { id: 'g6-sec-hany-osztoja-van', label: '7. Hány osztója van?' },
        { id: 'g6-sec-oszthatosag-2-5-10', label: '8. Oszthatóság 2-vel, 5-tel, 10-zel' },
        { id: 'g6-sec-oszthatosag-3-9', label: '9. Oszthatóság 3-mal és 9-cel' },
        { id: 'g6-sec-oszthatosag-4-100', label: '10. Oszthatóság 4-gyel és 100-zal' },
        { id: 'g6-sec-osszetett-oszthatosag', label: '11. Összetett oszthatósági szabályok' },
        { id: 'g6-sec-tobbszoros-kozos', label: '12. Többszörös, közös többszörös' },
        { id: 'g6-sec-oszto-kozos', label: '13. Osztó, közös osztó' },
        { id: 'g6-sec-osszefoglalas', label: '14. Összefoglalás' }
      ];
    } else if (t.id === 'g6-fractions') {
      subsections = [
        { id: 'g6-frac-sec-1', label: '1. Mit tanultunk a törtekről? Ismétlés' },
        { id: 'g6-frac-sec-2', label: '2. Szorzás törttel, a reciprok' },
        { id: 'g6-frac-sec-3', label: '3. Osztás törttel' },
        { id: 'g6-frac-sec-4', label: '4. Mit tanultunk a tizedes törtekről? Ismétlés' },
        { id: 'g6-frac-sec-5', label: '5. Szorzás tizedes törttel' },
        { id: 'g6-frac-sec-6', label: '6. Osztás tizedes törttel' },
        { id: 'g6-frac-sec-7', label: '7. Összetett műveletek, zárójelfelbontás' },
        { id: 'g6-frac-sec-8', label: '8. Összefoglalás' }
      ];
    } else if (t.id === 'g6-geometry-symmetry') {
      subsections = [
        { id: 'g6-geom-sec-1', label: '1. Síkbeli alakzatok' },
        { id: 'g6-geom-sec-2', label: '2. Egybevágóság' },
        { id: 'g6-geom-sec-3', label: '3. A kör' },
        { id: 'g6-geom-sec-4', label: '4. A szakasz felezőmerőlegese' },
        { id: 'g6-geom-sec-5', label: '5. Szerkesztések' },
        { id: 'g6-geom-sec-6', label: '6. Tengelyes tükrözés' },
        { id: 'g6-geom-sec-7', label: '7. A tengelyes tükrözés tulajdonságai' },
        { id: 'g6-geom-sec-8', label: '8. Tengelyes szimmetria' },
        { id: 'g6-geom-sec-9', label: '9. Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek' },
        { id: 'g6-geom-sec-10', label: '10. Szerkesztési feladatok' },
        { id: 'g6-geom-sec-11', label: '11. Összefoglalás' }
      ];
    } else if (t.id === 'g6-ratio-percent-word') {
      subsections = [
        { id: 'g6-ratio-sec-1', label: '1. Az arány fogalma' },
        { id: 'g6-ratio-sec-2', label: '2. Arányos osztás' },
        { id: 'g6-ratio-sec-3', label: '3. Egyenes arányosság' },
        { id: 'g6-ratio-sec-4', label: '4. Egyenes arányosság grafikonja' },
        { id: 'g6-ratio-sec-5', label: '5. Szabályok, megfeleltetések' },
        { id: 'g6-ratio-sec-6', label: '6. Törtrész' },
        { id: 'g6-ratio-sec-7', label: '7. Százalékszámítás' },
        { id: 'g6-ratio-sec-8', label: '8. A százalékszámítás gyakorlása' },
        { id: 'g6-ratio-sec-9', label: '9. Nyitott mondatok' },
        { id: 'g6-ratio-sec-10', label: '10. Szöveges feladatok' },
        { id: 'g6-ratio-sec-11', label: '11. Több megoldás is lehet' },
        { id: 'g6-ratio-sec-12', label: '12. Összefoglalás' }
      ];
    } else if (t.id === 'g6-measurements') {
      subsections = [
        { id: 'g6-meas-sec-1', label: '1. Hosszúság, tömeg, idő' },
        { id: 'g6-meas-sec-2', label: '2. A sokszögek kerülete' },
        { id: 'g6-meas-sec-3', label: '3. A terület és a térfogat mérése' },
        { id: 'g6-meas-sec-4', label: '4. A sokszögek területe' },
        { id: 'g6-meas-sec-5', label: '5. Alakzatok a térben' },
        { id: 'g6-meas-sec-6', label: '6. Testek felszíne' },
        { id: 'g6-meas-sec-7', label: '7. Felszínszámítással kapcsolatos gyakorlati feladatok' },
        { id: 'g6-meas-sec-8', label: '8. Testek térfogata' },
        { id: 'g6-meas-sec-9', label: '9. Összefoglalás' }
      ];
    } else if (t.id === 'g6-statistics') {
      subsections = [
        { id: 'g6-stat-sec-1', label: '1. Játékok' },
        { id: 'g6-stat-sec-2', label: '2. Grafikonok, diagramok, összefüggések' },
        { id: 'g6-stat-sec-3', label: '3. Kördiagram' },
        { id: 'g6-stat-sec-4', label: '4. Adatok ábrázolása, átlag' },
        { id: 'g6-stat-sec-5', label: '5. Összefoglalás' }
      ];
    }

    // Grade 7 Subsections
    else if (t.id === 'g7-logic') {
      subsections = [
        { id: 'g7-sec-szamold-ossze', label: '1. Számold össze!' },
        { id: 'g7-sec-rendezd-sorba', label: '2. Rendezd sorba!' },
        { id: 'g7-sec-hany-eset-van', label: '3. Hány eset van?' },
        { id: 'g7-sec-grafok', label: '4. Gráfok' },
        { id: 'g7-sec-igazold-cafold', label: '5. Igazold! Cáfold!' },
        { id: 'g7-sec-matematikai-jatekok', label: '6. Matematikai játékok' },
        { id: 'g7-sec-osszefoglalas', label: '7. Összefoglalás' }
      ];
    } else if (t.id === 'g7-rational-algebra') {
      subsections = [
        { id: 'g7-sec-rat-egesz-attekintes', label: '1. Egész számok áttekintése' },
        { id: 'g7-sec-rat-tortek-tizedes', label: '2. Törtek, tizedes törtek' },
        { id: 'g7-sec-rat-muveletek', label: '3. Műveletek racionális számokkal' },
        { id: 'g7-sec-rat-szoveges', label: '4. Szöveges feladatok' },
        { id: 'g7-sec-rat-osszetett-zarojel', label: '5. Összetett műveletek, zárójel' },
        { id: 'g7-sec-rat-szamok-betuk', label: '6. Számok és betűk használata' },
        { id: 'g7-sec-rat-osszevonas-ertek', label: '7. Összevonás, helyettesítési érték' },
        { id: 'g7-sec-rat-zarojel-kiemeles', label: '8. Zárójelfelbontás, kiemelés' },
        { id: 'g7-sec-rat-osszefoglalas', label: '9. Összefoglalás' }
      ];
    } else if (t.id === 'g7-percent-equations') {
      subsections = [
        { id: 'g7-sec-pct-aranyossag', label: '1. Arányosság' },
        { id: 'g7-sec-pct-mit-tanultunk', label: '2. Százalékszámítás alapjai' },
        { id: 'g7-sec-pct-100-szazalek', label: '3. A 100% kiszámítása' },
        { id: 'g7-sec-pct-hany-szazalek', label: '4. Hány százalék?' },
        { id: 'g7-sec-pct-gyakorlas', label: '5. Százalékszámítás gyakorlása' },
        { id: 'g7-sec-pct-osszetett', label: '6. Összetett feladatok' },
        { id: 'g7-sec-pct-szoveges', label: '7. Szöveges feladatok' },
        { id: 'g7-sec-pct-egyenlet-modszerek', label: '8. Próbálgatás, lebontogatás' },
        { id: 'g7-sec-pct-merlegelv', label: '9. A mérlegelv' },
        { id: 'g7-sec-pct-egyenletek-merlegelvvel', label: '10. Egyenletek mérlegelvvel' },
        { id: 'g7-sec-pct-szoveges-egyenlettel', label: '11. Szöveges feladatok egyenlettel' },
        { id: 'g7-sec-pct-osszefoglalas', label: '12. Összefoglalás' }
      ];
    } else if (t.id === 'g7-geom-trans') {
      subsections = [
        { id: 'g7-sec-trans-fogalmak', label: '1. Geometriai fogalmak' },
        { id: 'g7-sec-trans-haromszog-vonalak', label: '2. Háromszögek nevezetes vonalai' },
        { id: 'g7-sec-trans-haromszog-negyszog', label: '3. Háromszögek és négyszögek' },
        { id: 'g7-sec-trans-transzformaciok', label: '4. Geometriai transzformációk' },
        { id: 'g7-sec-trans-kozeppontos-tukrozes', label: '5. Középpontos tükrözés' },
        { id: 'g7-sec-trans-kozeppontos-alkalmazas', label: '6. A középpontos tükrözés alkalmazása' },
        { id: 'g7-sec-trans-szogparok', label: '7. Szögpárok' },
        { id: 'g7-sec-trans-szimmetria', label: '8. Középpontos és tengelyes szimmetria' },
        { id: 'g7-sec-trans-paralelogramma-deltoid', label: '9. Paralelogramma és deltoid' },
        { id: 'g7-sec-trans-kozeppontosan-szimmetrikus', label: '10. Középpontosan szimmetrikus alakzatok' },
        { id: 'g7-sec-trans-szabalyos-sokszogek', label: '11. Szabályos sokszögek' },
        { id: 'g7-sec-trans-kor', label: '12. A kör' },
        { id: 'g7-sec-trans-szerkesztesek', label: '13. Szerkesztések' },
        { id: 'g7-sec-trans-osszefoglalas', label: '14. Összefoglalás' }
      ];
    } else if (t.id === 'g7-powers-divisibility') {
      subsections = [
        { id: 'g7-sec-pow-nagy-szamok', label: '1. Nagy számok és hatványalak' },
        { id: 'g7-sec-pow-alkalmazas', label: '2. Hatványok alkalmazása' },
        { id: 'g7-sec-pow-mit-tanultunk-ismetles', label: '3. Mit tanultunk az oszthatóságról?' },
        { id: 'g7-sec-pow-logika', label: '4. Egy kis logika' },
        { id: 'g7-sec-pow-prim-felbontas', label: '5. Prímszámok, felbontás' },
        { id: 'g7-sec-pow-szabaly-keszites', label: '6. Oszthatósági szabályok' },
        { id: 'g7-sec-pow-osztok-tobbszorosok', label: '7. Osztókról, többszörösökről' },
        { id: 'g7-sec-pow-lnko', label: '8. Legnagyobb közös osztó' },
        { id: 'g7-sec-pow-lkkt', label: '9. Legkisebb közös többszörös' },
        { id: 'g7-sec-pow-jatekok', label: '10. Matematikai játékok' },
        { id: 'g7-sec-pow-osszefoglalas', label: '11. Összefoglalás' }
      ];
    } else if (t.id === 'g7-geometry') {
      subsections = [
        { id: 'g7-sec-geom-egybevagosag', label: '1. Egybevágó háromszögek' },
        { id: 'g7-sec-geom-oldalak-szogek', label: '2. Háromszög oldalai, szögei' },
        { id: 'g7-sec-geom-sokszogek-szogei-atloi', label: '3. Sokszögek szögei, átlói' },
        { id: 'g7-sec-geom-mertekegysegek', label: '4. Mértékegységek' },
        { id: 'g7-sec-geom-paralelogramma-terulet', label: '5. Paralelogramma területe' },
        { id: 'g7-sec-geom-haromszog-terulet', label: '6. Háromszög területe' },
        { id: 'g7-sec-geom-trapez-terulet', label: '7. Trapéz területe' },
        { id: 'g7-sec-geom-deltoid-terulet', label: '8. Deltoid területe' },
        { id: 'g7-sec-geom-hasab-felszin-terfogat', label: '9. Hasáb felszíne, térfogata' },
        { id: 'g7-sec-geom-testek-terben-sikban', label: '10. Testek térben és síkban' },
        { id: 'g7-sec-geom-szabaduloszoba', label: 'Szabadulószoba' },
        { id: 'g7-sec-geom-osszefoglalas', label: '11. Összefoglalás' }
      ];
    } else if (t.id === 'g7-stats') {
      subsections = [
        { id: 'g7-sec-stats-halmazok-hozzarendeles', label: '1. Két halmaz közötti hozzárendelések' },
        { id: 'g7-sec-stats-megadasi-modok', label: '2. Megadási módok' },
        { id: 'g7-sec-stats-olvassunk-grafikonrol', label: '3. Olvassunk a grafikonról!' },
        { id: 'g7-sec-stats-atlag-modusz-median', label: '4. Átlag, módusz, medián' },
        { id: 'g7-sec-stats-gyakorisag-relativ', label: '5. Gyakoriság, relatív gyakoriság' },
        { id: 'g7-sec-stats-valoszinuseg', label: '6. Valószínűség' },
        { id: 'g7-sec-stats-tippelj-kiserletezz', label: '7. Tippelj, kísérletezz!' },
        { id: 'g7-sec-stats-osszefoglalas', label: '8. Összefoglalás' }
      ];
    }

    // Grade 8 Subsections
    else if (t.id === 'g8-numbers-letters') {
      subsections = [
        { id: 'g8-sec-logika', label: '1. Logika feladatok' },
        { id: 'g8-sec-halmazok-alap', label: '2. Mit tudunk a halmazokról?' },
        { id: 'g8-sec-halmaz-muveletek', label: '3. Műveletek halmazokkal' },
        { id: 'g8-sec-racionalis-halmaz', label: '4. A racionális számok halmaza' },
        { id: 'g8-sec-racionalis-muvelet', label: '5. Mit tudunk a racionális számokról?' },
        { id: 'g8-sec-hatvanyozas', label: '6. Hatványozás' },
        { id: 'g8-sec-negyzetgyok-fogalom', label: '7. A négyzetgyök fogalma' },
        { id: 'g8-sec-szamok-negyzetgyoke', label: '8. Számok négyzetgyöke' },
        { id: 'g8-sec-betus-ismetles', label: '9. Betűs kifejezések (ismétlés)' },
        { id: 'g8-sec-betus-szorzas', label: '10. Betűs kifejezések szorzása és a kiemelés' },
        { id: 'g8-sec-tobbtagu-szorzat', label: '11. Többtagú kifejezések szorzata' },
        { id: 'g8-sec-osszefoglalas', label: '12. Összefoglalás' }
      ];
    } else if (t.id === 'g8-geometry') {
      subsections = [
        { id: 'g8-sec-geom-egybevagosag', label: '1. Egybevágósági transzformációk' },
        { id: 'g8-sec-geom-transzformaciok', label: '2. Transzformációk' },
        { id: 'g8-sec-geom-szerkesztoprogram', label: '3. Használjunk szerkesztőprogramot!' },
        { id: 'g8-sec-geom-hasonlosag', label: '4. Hasonlóság' },
        { id: 'g8-sec-geom-kozeppontos', label: '5. A középpontos hasonlóság' },
        { id: 'g8-sec-geom-szerkesztesek', label: '6. Szerkesztések' },
        { id: 'g8-sec-geom-osszefoglalas', label: '7. Összefoglalás' }
      ];
    } else if (t.id === 'g8-equations') {
      subsections = [
        { id: 'g8-sec-eq-alap', label: '1. Egyenletek' },
        { id: 'g8-sec-eq-szamok-kor', label: '2. Szöveges feladatok számokról, életkorokról' },
        { id: 'g8-sec-eq-keveres', label: '3. Szöveges feladatok összekeverésről' },
        { id: 'g8-sec-eq-mozgas-munka', label: '4. Szöveges feladatok mozgásról, munkáról' },
        { id: 'g8-sec-eq-geometria', label: '5. Szöveges geometriai feladatok' },
        { id: 'g8-sec-eq-vegyes', label: '6. Vegyes feladatok' },
        { id: 'g8-sec-eq-penzugy', label: '7. Pénzügyi feladatok' },
        { id: 'g8-sec-eq-osszefoglalas', label: '8. Összefoglalás' }
      ];
    } else if (t.id === 'g8-admissions-prep') {
      subsections = [
        { id: 'g8-prep-word', label: '1. Szöveges & felvételi feladatok' }
      ];
    } else if (t.id === 'g8-pythagoras') {
      subsections = [
        { id: 'g8-sec-pyth-szerkesztes', label: '1. Szerkesztések, mérések' },
        { id: 'g8-sec-pyth-tetel', label: '2. A Pitagorasz-tétel' },
        { id: 'g8-sec-pyth-megforditas', label: '3. A Pitagorasz-tétel megfordítása' },
        { id: 'g8-sec-pyth-alkalmazas', label: '4. A Pitagorasz-tétel alkalmazása' },
        { id: 'g8-sec-pyth-szamologep', label: '5. Számológép & Projektmunka' },
        { id: 'g8-sec-pyth-nevezetes', label: '6. Nevezetes derékszögű háromszögek' },
        { id: 'g8-sec-pyth-osszefoglalas', label: '7. Összefoglalás' }
      ];
    } else if (t.id === 'g8-functions-probability-sequences') {
      subsections = [
        { id: 'g8-sec-func-egyenes', label: '1. Egyenes arányosság' },
        { id: 'g8-sec-func-grafikonok', label: '2. Hozzárendelések és grafikonjaik' },
        { id: 'g8-sec-func-forditott', label: '3. Fordított arányosság' },
        { id: 'g8-sec-func-olvasas', label: '4. Olvassunk a grafikonról!' },
        { id: 'g8-sec-func-rajzolas', label: '5. Készítsünk grafikont!' },
        { id: 'g8-sec-func-gyakorisag', label: '6. Gyakoriság, relatív gyakoriság, átlag' },
        { id: 'g8-sec-func-jatek', label: '7. Játék' },
        { id: 'g8-sec-func-valoszinuseg', label: '8. Valószínűség' },
        { id: 'g8-sec-func-feladatok', label: '9. Valószínűségszámítási feladatok' },
        { id: 'g8-sec-func-mintazat', label: '10. Keressünk összefüggéseket!' },
        { id: 'g8-sec-func-sorozatok', label: '11. Sorozatok' },
        { id: 'g8-sec-func-osszefoglalas', label: '12. Összefoglalás' }
      ];
    } else if (t.id === 'g8-solids') {
      subsections = [
        { id: 'g8-sec-solids-ismetles', label: '1. Mit tanultunk eddig? (ismétlés)' },
        { id: 'g8-sec-solids-gulak', label: '2. Gúlák' },
        { id: 'g8-sec-solids-gula-szamitas', label: '3. A gúla felszíne és térfogata' },
        { id: 'g8-sec-solids-gomb', label: '4. A gömb' },
        { id: 'g8-sec-solids-fold', label: '5. A Föld' },
        { id: 'g8-sec-solids-osszefoglalas', label: '6. Összefoglalás' }
      ];
    } else if (t.id === 'g9-kombinatorika-halmazok') {
      subsections = [
        { id: 'g9-sec-hanyfelekeppen', label: '1. Hányféleképpen lehet?' },
        { id: 'g9-sec-grafok', label: '2. Gráfok' },
        { id: 'g9-sec-szamzarak', label: '3. Számzárak' },
        { id: 'g9-sec-osszeszamlalas', label: '4. Folytatjuk az összeszámlálást' },
        { id: 'g9-sec-gyakorlas-kombi', label: '5. Gyakorlás' },
        { id: 'g9-sec-halmazok', label: '6. Halmazok' },
        { id: 'g9-sec-halmaz-muveletek', label: '7. Halmazok uniója, metszete, különbsége' },
        { id: 'g9-sec-szitaformula', label: '8. A szitaformula' },
        { id: 'g9-sec-intervallumok', label: '9. Intervallumok' },
        { id: 'g9-sec-gyakorlas-halmaz', label: '10. Gyakorlás' },
        { id: 'g9-sec-tudasproba', label: '11. Gyakorlás, tudáspróba' }
      ];
    } else if (t.id === 'g9-szamok-vilaga') {
      subsections = [
        { id: 'g9-sec-muveletek-szamhalmazokban', label: '1. Műveletek számhalmazokban' },
        { id: 'g9-sec-szamolas-tortekkel', label: '2. Számolás törtekkel' },
        { id: 'g9-sec-racionalis-irracionalis', label: '3. Racionális és irracionális számok' },
        { id: 'g9-sec-aranyossag', label: '4. Arányosság' },
        { id: 'g9-sec-aranyos-osztas', label: '5. Arányos osztás' },
        { id: 'g9-sec-szazalekszamitas', label: '6. Százalékszámítás' },
        { id: 'g9-sec-hatvanyozas', label: '7. Hatványozás' },
        { id: 'g9-sec-gyakorlas-hatvany', label: '8. Gyakorlás' },
        { id: 'g9-sec-negyzetgyok', label: '9. A négyzetgyök' },
        { id: 'g9-sec-szamok-normalalakja', label: '10. Számok normálalakja' },
        { id: 'g9-sec-szamolas-normalalakkal', label: '11. Számolás normálalakkal' },
        { id: 'g9-sec-kamatos-kamat', label: '12. Kamatos kamat' },
        { id: 'g9-sec-tudasproba-szamok', label: '13. Gyakorlás, tudáspróba' }
      ];
    } else if (t.id === 'g9-egyenletek-azonossagok') {
      subsections = [
        { id: 'g9-sec-betuk-szerepe', label: '1. A betűk szerepe a számolásban' },
        { id: 'g9-sec-algebrai-szamolas', label: '2. Számolás az algebrában' },
        { id: 'g9-sec-nevezetes-szorzatok', label: '3. Nevezetes szorzatok' },
        { id: 'g9-sec-szorzatta-alakitas', label: '4. Szorzattá alakítás' },
        { id: 'g9-sec-egyenletek-alap', label: '5. Egyenletek' },
        { id: 'g9-sec-problemamegoldas-egyenletekkel', label: '6. Problémamegoldás egyenletekkel' },
        { id: 'g9-sec-alaphalmaz-megoldashalmaz', label: '7. Alaphalmaz, értelmezési tartomány, megoldáshalmaz' },
        { id: 'g9-sec-egyenletek-megoldasa', label: '8. Egyenletek megoldása' },
        { id: 'g9-sec-ketismeretlenes-egyenletrendszer', label: '9. Elsőfokú kétismeretlenes egyenletrendszer' }
      ];
    } else if (t.id === 'g9-bevezetes-geometriaba') {
      subsections = [
        { id: 'g9-sec-sik-geometria', label: '1. A sík geometriája' },
        { id: 'g9-sec-altalanos-szimmetrikus-haromszogek', label: '2. Általános és szimmetrikus háromszögek' },
        { id: 'g9-sec-pitagorasz', label: '3. Pitagorasz tétele' },
        { id: 'g9-sec-kulonleges-derekszogu', label: '4. Különleges derékszögű háromszögek' },
        { id: 'g9-sec-tavolsagok', label: '5. Távolságok' },
        { id: 'g9-sec-a-kor', label: '6. A kör' },
        { id: 'g9-sec-nevezetes-vonalak-1', label: '7. A háromszög nevezetes vonalai és pontjai I.' },
        { id: 'g9-sec-nevezetes-vonalak-2', label: '8. A háromszög nevezetes vonalai és pontjai II.' },
        { id: 'g9-sec-gyakorlas-geom', label: '9. Gyakorlás' },
        { id: 'g9-sec-thalesz', label: '10. Thalész tétele' },
        { id: 'g9-sec-thalesz-alkalmazas', label: '11. A Thalész-tétel alkalmazásai' },
        { id: 'g9-sec-haromszog-kerulet-terulet', label: '12. Háromszögek kerülete és területe' },
        { id: 'g9-sec-tudasproba-geom', label: '13. Gyakorlás, tudáspróba' }
      ];
    } else if (t.id === 'g9-fuggvenyek') {
      subsections = [
        { id: 'g9-sec-tablazatok', label: '1. Táblázatok' },
        { id: 'g9-sec-diagramok', label: '2. Diagramok' },
        { id: 'g9-sec-valtozasok-abrazolasa', label: '3. Változások ábrázolása' },
        { id: 'g9-sec-grafikonok-mindennapokban', label: '4. Grafikonok a mindennapokban' },
        { id: 'g9-sec-fuggveny-fogalma', label: '5. A függvény fogalma' },
        { id: 'g9-sec-keszitsunk-grafikont', label: '6. Készítsünk grafikont!' },
        { id: 'g9-sec-aranyossagok-fuggvenye', label: '7. Az egyenes arányosság és a fordított arányosság függvénye' },
        { id: 'g9-sec-egyenesek-meredeksege', label: '8. Egyenesek meredeksége' },
        { id: 'g9-sec-linearis-fuggvenyek', label: '9. Lineáris függvények' },
        { id: 'g9-sec-abszolut-fuggveny', label: '10. Abszolútérték-függvény' },
        { id: 'g9-sec-fuggvenyek-jellemzese', label: '11. Függvények jellemzése' },
        { id: 'g9-sec-szelsoertekek', label: '12. Szélsőértékek' },
        { id: 'g9-sec-masodfoku-negyzetgyok', label: '13. Másodfokú függvény és a négyzetgyök-függvény' },
        { id: 'g9-sec-fuggveny-gyakorlat', label: '14. Gyakorlati feladatok' },
        { id: 'g9-sec-egyenletek-grafikus', label: '15. Egyenletek grafikus megoldása' },
        { id: 'g9-sec-egyenlotlensegek', label: '16. Egyenlőtlenségek' },
        { id: 'g9-sec-abszolut-egyenletek', label: '17. Abszolút értékes egyenletek' },
        { id: 'g9-sec-tudasproba-fuggveny', label: '18. Gyakorlás, tudáspróba' }
      ];
    } else if (t.id === 'g9-egybevagosag-negyszogek') {
      subsections = [
        { id: 'g9-sec-forgatas-kozeppontos-tukrozes', label: '1. Forgatás és középpontos tükrözés' },
        { id: 'g9-sec-vektorok-eltolas', label: '2. Vektorok és az eltolás' },
        { id: 'g9-sec-tengelyes-tukrozes', label: '3. Tengelyes tükrözés' },
        { id: 'g9-sec-szerkesztesek', label: '4. Szerkesztések' },
        { id: 'g9-sec-transzformaciok-gyakorlatban', label: '5. Egybevágósági transzformációk a gyakorlatban' },
        { id: 'g9-sec-szimmetrikus-negyszogek', label: '6. Szimmetrikus négyszögek' },
        { id: 'g9-sec-negyszogek-terulete', label: '7. Nevezetes négyszögek területe' },
        { id: 'g9-sec-tudasproba-negyszogek', label: '8. Gyakorlás, tudáspróba' }
      ];
    }

    list.push({
      id: t.id,
      title: t.title,
      icon: typeof t.icon === 'string' ? t.icon : '📐',
      color: t.color,
      subsections: subsections
    });
  });

  return list;
}
