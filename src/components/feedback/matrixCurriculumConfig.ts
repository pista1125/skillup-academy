export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface MatrixTopicDef {
  id: string;
  title: string;
  short: string;
}

export interface MatrixChapterDef {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  topics: MatrixTopicDef[];
}

export interface MatrixGradeDef {
  grade: GradeLevel;
  gradeLabel: string;
  chapters: MatrixChapterDef[];
}

export const MATRIX_CURRICULUM: Record<GradeLevel, MatrixGradeDef> = {
  // ================= 1. OSZTÁLY =================
  1: {
    grade: 1,
    gradeLabel: '1. Osztály',
    chapters: [
      {
        id: 'g1-prep-period',
        chapterNumber: 'I.',
        title: 'I. Előkészítő időszak',
        subtitle: 'Tájékozódás térben és síkban, halmazok, relációk, összehasonlítások',
        topics: [
          { id: 'g1-prep-sec-1', title: '1. Válogatások', short: 'Válogatás' },
          { id: 'g1-prep-sec-2', title: '2. Összehasonlítások', short: 'Összehasonlítás' },
          { id: 'g1-prep-sec-3', title: '3. Logikai lapok', short: 'Logikai lap' },
          { id: 'g1-prep-sec-4', title: '4. Pálcikák és korongok', short: 'Korongok' },
          { id: 'g1-prep-sec-5', title: '5. Színesrúd-készlet', short: 'Színesrúd' },
          { id: 'g1-prep-sec-6', title: '6. Tájékozódás', short: 'Tájékozódás' },
          { id: 'g1-prep-sec-7', title: '7. Számlálások', short: 'Számlálás' },
          { id: 'g1-prep-sec-8', title: '8. Több, kevesebb, ugyanannyi', short: 'Több-kevesebb' },
        ]
      },
      {
        id: 'g1-numbers-to-5',
        chapterNumber: 'II.',
        title: 'II. Számolás 0-tól 5-ig',
        subtitle: 'Számfogalom 0-tól 5-ig, számok írása, bontása, összeadás és kivonás',
        topics: [
          { id: 'g1-count5-sec-1', title: '1. Az egy', short: 'Az 1' },
          { id: 'g1-count5-sec-2', title: '2. A kettő', short: 'A 2' },
          { id: 'g1-count5-sec-3', title: '3. A nulla', short: 'A 0' },
          { id: 'g1-count5-sec-4', title: '4. A három', short: 'A 3' },
          { id: 'g1-count5-sec-5', title: '5. A négy', short: 'A 4' },
          { id: 'g1-count5-sec-6', title: '6. Az öt', short: 'Az 5' },
          { id: 'g1-count5-sec-7', title: '7. Összeadás 0-tól 5-ig', short: 'Összeadás 5-ig' },
          { id: 'g1-count5-sec-8', title: '8. Kivonás 0-tól 5-ig', short: 'Kivonás 5-ig' },
          { id: 'g1-count5-sec-9', title: '9. Megálló (Összefoglalás)', short: 'Témazáró' },
        ]
      },
      {
        id: 'g1-numbers-to-10',
        chapterNumber: 'III.',
        title: 'III. Számkörbővítés, számolás 10-ig',
        subtitle: 'Számfogalom 10-ig, számok írása, bontása, összeadás és kivonás',
        topics: [
          { id: 'g1-count10-sec-1', title: '1. A hat', short: 'A 6' },
          { id: 'g1-count10-sec-2', title: '2. Számolás 6-ig', short: 'Számolás 6-ig' },
          { id: 'g1-count10-sec-3', title: '3. Páros és páratlan számok', short: 'Páros-páratlan' },
          { id: 'g1-count10-sec-5', title: '4. A hét', short: 'A 7' },
          { id: 'g1-count10-sec-6', title: '5. Számolás 7-ig', short: 'Számolás 7-ig' },
          { id: 'g1-count10-sec-7', title: '6. Számszomszédok', short: 'Számszomszédok' },
          { id: 'g1-count10-sec-9', title: '7. A nyolc', short: 'A 8' },
          { id: 'g1-count10-sec-10', title: '8. Számolás 8-ig', short: 'Számolás 8-ig' },
          { id: 'g1-count10-sec-11', title: '9. Nyitott mondatok', short: 'Nyitott mondat' },
          { id: 'g1-count10-sec-13', title: '10. A kilenc', short: 'A 9' },
          { id: 'g1-count10-sec-14', title: '11. Számolás 9-ig', short: 'Számolás 9-ig' },
          { id: 'g1-count10-sec-15', title: '12. Sorszámnevek', short: 'Sorszámnevek' },
          { id: 'g1-count10-sec-17', title: '13. A tíz', short: 'A 10' },
          { id: 'g1-count10-sec-18', title: '14. Számolás 10-ig', short: 'Számolás 10-ig' },
          { id: 'g1-count10-sec-19', title: '15. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g1-count10-sec-20', title: '16. Megálló (Összefoglalás)', short: 'Témazáró' },
        ]
      },
      {
        id: 'g1-geometry',
        chapterNumber: 'IV.',
        title: 'IV. Geometria',
        subtitle: 'Vonalak, síkidomok és térbeli testek felfedezése, csoportosítása és építések',
        topics: [
          { id: 'g1-geo-sec-1', title: '1. Vonalak', short: 'Vonalak' },
          { id: 'g1-geo-sec-2', title: '2. Síkidomok', short: 'Síkidomok' },
          { id: 'g1-geo-sec-3', title: '3. Testek', short: 'Testek' },
        ]
      },
      {
        id: 'g1-measurements',
        chapterNumber: 'V.',
        title: 'V. Mérések',
        subtitle: 'A hosszúság, tömeg, űrtartalom és az idő mérése, összehasonlítása',
        topics: [
          { id: 'g1-meas-sec-1', title: '1. Hosszúság mérése', short: 'Hosszúság' },
          { id: 'g1-meas-sec-2', title: '2. Tömeg mérése', short: 'Tömeg' },
          { id: 'g1-meas-sec-3', title: '3. Űrtartalom mérése', short: 'Űrtartalom' },
          { id: 'g1-meas-sec-4', title: '4. Idő mérése', short: 'Idő' },
        ]
      },
      {
        id: 'g1-numbers-to-20',
        chapterNumber: 'VI.',
        title: 'VI. Számkörbővítés 20-ig',
        subtitle: 'Számfogalom 20-ig, kétjegyű számok, összeadás és kivonás 20-as számkörben',
        topics: [
          { id: 'g1-count20-sec-1', title: '1. Tizenegytől tizenötig', short: '11 - 15' },
          { id: 'g1-count20-sec-6', title: '2. Tizenhattól húszig', short: '16 - 20' },
          { id: 'g1-count20-sec-11', title: '3. Számolás 20-as számkörben', short: 'Számolás 20-ig' },
        ]
      }
    ]
  },

  // ================= 2. OSZTÁLY =================
  2: {
    grade: 2,
    gradeLabel: '2. Osztály',
    chapters: [
      {
        id: 'g2-numbers-to-20',
        chapterNumber: 'I.',
        title: 'I. Számolás 0-tól 20-ig',
        subtitle: 'Számfogalom 20-ig, összeadás és kivonás tízesátlépéssel, nyitott mondatok',
        topics: [
          { id: 'g2-count20-sec-1', title: '1. Számok 0-tól 20-ig', short: 'Számok 20-ig' },
          { id: 'g2-count20-sec-2', title: '2. Összeadás 10-es számkör', short: 'Összeadás 10' },
          { id: 'g2-count20-sec-3', title: '3. Kivonás 10-es számkör', short: 'Kivonás 10' },
          { id: 'g2-count20-sec-4', title: '4. Összeadás 20-as számkör', short: 'Összeadás 20' },
          { id: 'g2-count20-sec-5', title: '5. Kivonás 20-as számkör', short: 'Kivonás 20' },
          { id: 'g2-count20-sec-6', title: '6. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g2-count20-sec-7', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g2-numbers-to-50',
        chapterNumber: 'II.',
        title: 'II. Számkörbővítés 50-ig',
        subtitle: 'Kétjegyű számok 50-ig, kerek tízesek és egyesek, műveletek',
        topics: [
          { id: 'g2-count50-sec-1', title: '1. Számok 50-ig', short: 'Számok 50-ig' },
          { id: 'g2-count50-sec-2', title: '2. Összeadás 50-es számkör', short: 'Összeadás 50' },
          { id: 'g2-count50-sec-3', title: '3. Kivonás 50-es számkör', short: 'Kivonás 50' },
          { id: 'g2-count50-sec-4', title: '4. Műveletek kerek tízesekkel', short: 'Kerek tízesek' },
          { id: 'g2-count50-sec-5', title: '5. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g2-count50-sec-6', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g2-numbers-to-100',
        chapterNumber: 'III.',
        title: 'III. Számkörbővítés 100-ig',
        subtitle: 'Számolás 100-ig, összeadás, kivonás, szorzás és osztás előkészítése',
        topics: [
          { id: 'g2-count100-sec-1', title: '1. Számok 100-ig', short: 'Számok 100-ig' },
          { id: 'g2-count100-sec-2', title: '2. Összeadás 100-ig', short: 'Összeadás 100' },
          { id: 'g2-count100-sec-3', title: '3. Kivonás 100-ig', short: 'Kivonás 100' },
          { id: 'g2-count100-sec-4', title: '4. Kerek tízesek', short: 'Kerek tízesek' },
          { id: 'g2-count100-sec-5', title: '5. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g2-count100-sec-6', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g2-multiplication',
        chapterNumber: 'IV.',
        title: 'IV. Szorzás',
        subtitle: 'Szorzótáblák 2-től 10-ig, szorzási szabályok, stratégiák és gyakorlás',
        topics: [
          { id: 'g2-mult-sec-2', title: '1. Szorzás 2-vel', short: '2-es tábla' },
          { id: 'g2-mult-sec-3', title: '2. Szorzás 3-mal', short: '3-as tábla' },
          { id: 'g2-mult-sec-4', title: '3. Szorzás 4-gyel', short: '4-es tábla' },
          { id: 'g2-mult-sec-5', title: '4. Szorzás 5-tel', short: '5-ös tábla' },
          { id: 'g2-mult-sec-6', title: '5. Szorzás 6-tal', short: '6-os tábla' },
          { id: 'g2-mult-sec-7', title: '6. Szorzás 7-tel', short: '7-es tábla' },
          { id: 'g2-mult-sec-8', title: '7. Szorzás 8-cal', short: '8-as tábla' },
          { id: 'g2-mult-sec-9', title: '8. Szorzás 9-cel', short: '9-es tábla' },
          { id: 'g2-mult-sec-10', title: '9. Szorzás 10-zel', short: '10-es tábla' }
        ]
      },
      {
        id: 'g2-division',
        chapterNumber: 'V.',
        title: 'V. Osztás',
        subtitle: 'Bennfoglalás és osztótáblák 2-től 10-ig, részekre osztás és ellenőrzés',
        topics: [
          { id: 'g2-div-sec-2', title: '1. Osztás 2-vel', short: 'Osztás 2' },
          { id: 'g2-div-sec-3', title: '2. Osztás 3-mal', short: 'Osztás 3' },
          { id: 'g2-div-sec-4', title: '3. Osztás 4-gyel', short: 'Osztás 4' },
          { id: 'g2-div-sec-5', title: '4. Osztás 5-tel', short: 'Osztás 5' },
          { id: 'g2-div-sec-6', title: '5. Osztás 6-tal', short: 'Osztás 6' },
          { id: 'g2-div-sec-7', title: '6. Osztás 7-tel', short: 'Osztás 7' },
          { id: 'g2-div-sec-8', title: '7. Osztás 8-cal', short: 'Osztás 8' },
          { id: 'g2-div-sec-9', title: '8. Osztás 9-cel', short: 'Osztás 9' },
          { id: 'g2-div-sec-10', title: '9. Osztás 10-zel', short: 'Osztás 10' }
        ]
      },
      {
        id: 'g2-roman-numbers',
        chapterNumber: 'VI.',
        title: 'VI. Római számok',
        subtitle: 'Római számjegyek és számok írása, olvasása, átváltása',
        topics: [
          { id: 'g2-roman-sec-1', title: '1. Római számok értelmezése', short: 'Értelmezés' },
          { id: 'g2-roman-sec-2', title: '2. Római számok 10-ig', short: 'Római 10-ig' },
          { id: 'g2-roman-sec-3', title: '3. Római számok 50-ig', short: 'Római 50-ig' },
          { id: 'g2-roman-sec-4', title: '4. Római számok 100-ig', short: 'Római 100-ig' }
        ]
      },
      {
        id: 'g2-geometry',
        chapterNumber: 'VII.',
        title: 'VII. Geometria',
        subtitle: 'Vonalak, síkidomok, testek, tükrözések és tájékozódás',
        topics: [
          { id: 'g2-geo-sec-1', title: '1. Bevezető', short: 'Alapok' },
          { id: 'g2-geo-sec-2', title: '2. Testek, síkidomok', short: 'Alakzatok' },
          { id: 'g2-geo-sec-3', title: '3. Szimmetria, tükrözés', short: 'Tükrözés' }
        ]
      },
      {
        id: 'g2-measurements',
        chapterNumber: 'VIII.',
        title: 'VIII. Mérések',
        subtitle: 'Hosszúság, tömeg és űrtartalom mérése, mértékegységek és átváltások',
        topics: [
          { id: 'g2-meas-sec-1', title: '1. Hosszúság mérés', short: 'Hosszúság' },
          { id: 'g2-meas-sec-2', title: '2. Tömeg mérés', short: 'Tömeg' },
          { id: 'g2-meas-sec-3', title: '3. Űrtartalom mérés', short: 'Űrtartalom' }
        ]
      }
    ]
  },

  // ================= 3. OSZTÁLY =================
  3: {
    grade: 3,
    gradeLabel: '3. Osztály',
    chapters: [
      {
        id: 'g3-count-100',
        chapterNumber: 'I.',
        title: 'I. Számolás 0-tól 100-ig',
        subtitle: 'Ismétlés és számolás 100-ig, műveletek, kerekítések',
        topics: [
          { id: 'g3-count-sec-1', title: '1. Számok 100-ig', short: 'Számok 100' },
          { id: 'g3-count-sec-2', title: '2. Összeadás, kivonás', short: 'Összead-kivon' },
          { id: 'g3-count-sec-3', title: '3. Szorzás és osztás', short: 'Szorzás-osztás' },
          { id: 'g3-count-sec-4', title: '4. Maradékos osztás', short: 'Maradékos' },
          { id: 'g3-count-sec-5', title: '5. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g3-count-sec-6', title: '6. Műveleti sorrend & Zárójelek', short: 'Sorrend' },
          { id: 'g3-count-sec-8', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-roman-numbers',
        chapterNumber: 'II.',
        title: 'II. Római számok',
        subtitle: 'Római számok írása, olvasása és alkalmazása 100-ig és tovább',
        topics: [
          { id: 'g3-roman-sec-1', title: '1. Alapszabályok', short: 'Szabályok' },
          { id: 'g3-roman-sec-2', title: '2. Írás, olvasás 100-ig', short: 'Írás-olvasás' },
          { id: 'g3-roman-sec-3', title: '3. Alkalmazás, fejtörők', short: 'Fejtörők' }
        ]
      },
      {
        id: 'g3-count-200',
        chapterNumber: 'III.',
        title: 'III. Számolás 0-tól 200-ig',
        subtitle: 'Számkörbővítés 200-ig, helyiértékek és számegyenes',
        topics: [
          { id: 'g3-count200-sec-1', title: '1. Számok 200-ig', short: 'Számok 200' },
          { id: 'g3-count200-sec-2', title: '2. Számegyenes', short: 'Számegyenes' },
          { id: 'g3-count200-sec-3', title: '3. Kerekítés', short: 'Kerekítés' },
          { id: 'g3-count200-sec-4', title: '4. Műveletek 200-ig', short: 'Műveletek' },
          { id: 'g3-count200-sec-6', title: '5. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-measurements-1',
        chapterNumber: 'IV.',
        title: 'IV. Mérések',
        subtitle: 'Hosszúság, tömeg, űrtartalom, kerület és terület',
        topics: [
          { id: 'g3-meas-sec-1', title: '1. Mértékegységek', short: 'Mértékegység' },
          { id: 'g3-meas-sec-2', title: '2. Tömeg mérése', short: 'Tömeg' },
          { id: 'g3-meas-sec-3', title: '3. Űrtartalom mérése', short: 'Űrtartalom' },
          { id: 'g3-meas-sec-4', title: '4. Hosszúság', short: 'Hosszúság' },
          { id: 'g3-meas-sec-5', title: '5. Kerület mérése', short: 'Kerület' },
          { id: 'g3-meas-sec-7', title: '6. Terület mérése', short: 'Terület' },
          { id: 'g3-meas-sec-9', title: '7. Idő mérése', short: 'Idő' }
        ]
      },
      {
        id: 'g3-count-500',
        chapterNumber: 'V.',
        title: 'V. Számolás 0-tól 500-ig',
        subtitle: 'Számkörbővítés 500-ig, százasok, tízesek és egyesek, műveletek',
        topics: [
          { id: 'g3-count500-sec-1', title: '1. Számok 500-ig', short: 'Számok 500' },
          { id: 'g3-count500-sec-2', title: '2. Kerekítés 500-ig', short: 'Kerekítés' },
          { id: 'g3-count500-sec-3', title: '3. Összeadás, kivonás', short: 'Összead-kivon' },
          { id: 'g3-count500-sec-4', title: '4. Szorzás, osztás', short: 'Szorzás-osztás' },
          { id: 'g3-count500-sec-5', title: '5. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-grouping',
        chapterNumber: 'VI.',
        title: 'VI. Válogatások, csoportosítások',
        subtitle: 'Halmazok, tulajdonságok szerinti csoportosítás, kombinatorika',
        topics: [
          { id: 'g3-group-sec-1', title: '1. Válogatás tulajdonság szerint', short: 'Válogatás' },
          { id: 'g3-group-sec-2', title: '2. Venn-diagramok', short: 'Venn-diagram' },
          { id: 'g3-group-sec-3', title: '3. Sorba rendezés', short: 'Kombinatorika' }
        ]
      },
      {
        id: 'g3-written-addition',
        chapterNumber: 'VII.',
        title: 'VII. Írásbeli összeadás',
        subtitle: 'Írásbeli összeadás algoritmusa és gyakorlása átlépéssel',
        topics: [
          { id: 'g3-wr-add-sec-1', title: '1. Háromjegyű számok összeadása', short: '3-jegyű összeg' },
          { id: 'g3-wr-add-sec-2', title: '2. Becslés', short: 'Becslés' },
          { id: 'g3-wr-add-sec-3', title: '3. Írásbeli algoritmus', short: 'Írásbeli összeadás' },
          { id: 'g3-wr-add-sec-5', title: '4. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g3-wr-add-sec-6', title: '5. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-written-subtraction',
        chapterNumber: 'VIII.',
        title: 'VIII. Írásbeli kivonás',
        subtitle: 'Írásbeli kivonás algoritmusa és gyakorlása pótlással és kölcsönkéréssel',
        topics: [
          { id: 'g3-wr-sub-sec-1', title: '1. Háromjegyű kivonás', short: '3-jegyű kivonás' },
          { id: 'g3-wr-sub-sec-2', title: '2. Különbség becslése', short: 'Becslés' },
          { id: 'g3-wr-sub-sec-3', title: '3. Írásbeli kivonás', short: 'Írásbeli kivonás' },
          { id: 'g3-wr-sub-sec-5', title: '4. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-negative-numbers',
        chapterNumber: 'IX.',
        title: 'IX. Negatív számok',
        subtitle: 'Negatív számok fogalma a mindennapokban, hőmérő, számegyenes',
        topics: [
          { id: 'g3-neg-sec-1', title: '1. Negatív számok a mindennapokban', short: 'Mindennapok' },
          { id: 'g3-neg-sec-2', title: '2. Számegyenes és a nulla', short: 'Számegyenes' },
          { id: 'g3-neg-sec-3', title: '3. Összehasonlítás', short: 'Összehasonlítás' }
        ]
      },
      {
        id: 'g3-shapes-solids',
        chapterNumber: 'X.',
        title: 'X. Testek, síkidomok',
        subtitle: 'Geometriai alakzatok, sokszögek, testek tulajdonságai és építések',
        topics: [
          { id: 'g3-geom-sec-1', title: '1. A testek', short: 'Testek' },
          { id: 'g3-geom-sec-2', title: '2. Téglatest, kocka', short: 'Kocka-téglatest' },
          { id: 'g3-geom-sec-3', title: '3. Síkidomok, sokszögek', short: 'Sokszögek' },
          { id: 'g3-geom-sec-4', title: '4. Tükrözések, szimmetria', short: 'Szimmetria' }
        ]
      },
      {
        id: 'g3-count-1000',
        chapterNumber: 'XI.',
        title: 'XI. Számolás 0-tól 1000-ig',
        subtitle: 'Számfogalom és műveletek 1000-ig, kerekítések és helyiértékek',
        topics: [
          { id: 'g3-count1000-sec-1', title: '1. Számok 1000-ig', short: 'Számok 1000' },
          { id: 'g3-count1000-sec-2', title: '2. Kerekítés', short: 'Kerekítés' },
          { id: 'g3-count1000-sec-3', title: '3. Műveletek 1000-ig', short: 'Műveletek' },
          { id: 'g3-count1000-sec-5', title: '4. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-written-ops-1000',
        chapterNumber: 'XII.',
        title: 'XII. Írásbeli műveletek 1000-ig',
        subtitle: 'Írásbeli műveletek gyakorlása és összetett feladatok 1000-ig',
        topics: [
          { id: 'g3-wrops-sec-1', title: '1. Írásbeli összeadás 1000-ig', short: 'Összeadás' },
          { id: 'g3-wrops-sec-2', title: '2. Írásbeli kivonás 1000-ig', short: 'Kivonás' },
          { id: 'g3-wrops-sec-3', title: '3. Műveleti sorrend', short: 'Sorrend' },
          { id: 'g3-wrops-sec-4', title: '4. Szöveges feladatok', short: 'Szöveges' }
        ]
      },
      {
        id: 'g3-written-mult',
        chapterNumber: 'XIII.',
        title: 'XIII. Írásbeli szorzás',
        subtitle: 'Írásbeli szorzás egyjegyű szorzóval',
        topics: [
          { id: 'g3-wr-mult-sec-1', title: '1. Szorzás egyjegyű számmal', short: 'Egyjegyű szorzó' },
          { id: 'g3-wr-mult-sec-2', title: '2. Szorzat becslése', short: 'Becslés' },
          { id: 'g3-wr-mult-sec-3', title: '3. Írásbeli algoritmus', short: 'Írásbeli szorzás' },
          { id: 'g3-wr-mult-sec-6', title: '4. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g3-fractions-intro',
        chapterNumber: 'XIV.',
        title: 'XIV. Törtek bevezetése',
        subtitle: 'A tört fogalma, részekre osztás, fél, negyed, harmad ábrázolása',
        topics: [
          { id: 'g3-frac-sec-1', title: '1. Bevezetés', short: 'Alapfogalom' },
          { id: 'g3-frac-sec-2', title: '2. Közönséges törtek', short: 'Törtrészek' },
          { id: 'g3-frac-sec-3', title: '3. Összehasonlítás', short: 'Összehasonlítás' }
        ]
      }
    ]
  },

  // ================= 4. OSZTÁLY =================
  4: {
    grade: 4,
    gradeLabel: '4. Osztály',
    chapters: [
      {
        id: 'g4-count-10k',
        chapterNumber: 'I.',
        title: 'I. Számolás 0-tól 10 000-ig',
        subtitle: 'Számok írása, olvasása, kerekítés és számegyenes 10 000-ig',
        topics: [
          { id: 'g4-count-sec-1', title: '1. Számok 1000-ig', short: 'Számok 1000' },
          { id: 'g4-count-sec-4', title: '2. Műveleti sorrend', short: 'Sorrend' },
          { id: 'g4-count-sec-7', title: '3. Római számok', short: 'Római' },
          { id: 'g4-count-sec-9', title: '4. Számok 10 000-ig', short: 'Számok 10 000' },
          { id: 'g4-count-sec-10', title: '5. Kerekítés 10 000-ig', short: 'Kerekítés' },
          { id: 'g4-count-sec-11', title: '6. Műveletek 10 000-ig', short: 'Műveletek' },
          { id: 'g4-count-sec-13', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g4-measurements',
        chapterNumber: 'II.',
        title: 'II. Mérések',
        subtitle: 'Hosszúság, tömeg, űrtartalom mérése és átváltása',
        topics: [
          { id: 'g4-meas-sec-1', title: '1. Hosszúság', short: 'Hosszúság' },
          { id: 'g4-meas-sec-2', title: '2. Kerület', short: 'Kerület' },
          { id: 'g4-meas-sec-3', title: '3. Terület', short: 'Terület' },
          { id: 'g4-meas-sec-4', title: '4. Tömeg', short: 'Tömeg' },
          { id: 'g4-meas-sec-5', title: '5. Űrtartalom', short: 'Űrtartalom' },
          { id: 'g4-meas-sec-6', title: '6. Idő', short: 'Idő' },
          { id: 'g4-meas-sec-7', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g4-written-ops',
        chapterNumber: 'III.',
        title: 'III. Írásbeli műveletek',
        subtitle: 'Írásbeli összeadás és kivonás gyakorlása',
        topics: [
          { id: 'g4-wops-sec-1', title: '1. Írásbeli összeadás, kivonás', short: 'Összead-kivon' },
          { id: 'g4-wops-sec-2', title: '2. Szorzás egyjegyűvel', short: 'Szorzás 1-jegyű' },
          { id: 'g4-wops-sec-3', title: '3. Osztás egyjegyűvel', short: 'Osztás 1-jegyű' },
          { id: 'g4-wops-sec-4', title: '4. Számok tulajdonságai', short: 'Tulajdonság' },
          { id: 'g4-wops-sec-7', title: '5. Műveleti sorrend', short: 'Sorrend' }
        ]
      },
      {
        id: 'g4-negatives',
        chapterNumber: 'IV.',
        title: 'IV. Negatív számok',
        subtitle: 'Ismerkedés a negatív számokkal és a hőmérővel',
        topics: [
          { id: 'g4-neg-sec-1', title: '1. Negatív számok mindennap', short: 'Mindennap' },
          { id: 'g4-neg-sec-2', title: '2. Számegyenes, ellentettek', short: 'Ellentett' },
          { id: 'g4-neg-sec-3', title: '3. Összehasonlítás', short: 'Összehasonlítás' }
        ]
      },
      {
        id: 'g4-shapes-solids',
        chapterNumber: 'V.',
        title: 'V. Síkidomok és testek',
        subtitle: 'Geometriai alakzatok tulajdonságai és csoportosítása',
        topics: [
          { id: 'g4-geom-sec-1', title: '1. Síkidomok, sokszögek', short: 'Sokszögek' },
          { id: 'g4-geom-sec-2', title: '2. A kör', short: 'Kör' },
          { id: 'g4-geom-sec-3', title: '3. Testek', short: 'Testek' },
          { id: 'g4-geom-sec-4', title: '4. Tükrözés', short: 'Tükrözés' },
          { id: 'g4-geom-sec-5', title: '5. Transzformációk', short: 'Transzformáció' }
        ]
      },
      {
        id: 'g4-grouping',
        chapterNumber: 'VI.',
        title: 'VI. Válogatások, csoportosítások',
        subtitle: 'Halmazok, kombinatorika és logikai válogatások',
        topics: [
          { id: 'g4-group-sec-1', title: '1. Halmazok', short: 'Halmazok' },
          { id: 'g4-group-sec-2', title: '2. Táblázatok', short: 'Táblázatok' },
          { id: 'g4-group-sec-3', title: '3. Lehetőségek száma', short: 'Kombinatorika' },
          { id: 'g4-group-sec-4', title: '4. Igaz vagy hamis?', short: 'Logika' }
        ]
      },
      {
        id: 'g4-written-mult',
        chapterNumber: 'VII.',
        title: 'VII. Írásbeli szorzás kétjegyű szorzóval',
        subtitle: 'Szorzás technikája többjegyű számokkal',
        topics: [
          { id: 'g4-wmult-sec-1', title: '1. Szorzás kétjegyűvel', short: 'Kétjegyű szorzás' },
          { id: 'g4-wmult-sec-2', title: '2. Gyakorlás', short: 'Gyakorlás' },
          { id: 'g4-wmult-sec-3', title: '3. Következtetések', short: 'Következtetés' }
        ]
      },
      {
        id: 'g4-fractions',
        chapterNumber: 'VIII.',
        title: 'VIII. Törtszámok',
        subtitle: 'Törtek fogalma, összehasonlítása és ábrázolása',
        topics: [
          { id: 'g4-frac-sec-1', title: '1. Törtrész értelmezése', short: 'Törtrész' },
          { id: 'g4-frac-sec-2', title: '2. Egynél kisebb törtek', short: 'Egynél kisebb' },
          { id: 'g4-frac-sec-3', title: '3. Egész és vegyes törtek', short: 'Vegyes tört' },
          { id: 'g4-frac-sec-4', title: '4. Törtek összehasonlítása', short: 'Összehasonlítás' },
          { id: 'g4-frac-sec-5', title: '5. Szöveges feladatok', short: 'Szöveges' }
        ]
      }
    ]
  },

  // ================= 5. OSZTÁLY =================
  5: {
    grade: 5,
    gradeLabel: '5. Osztály',
    chapters: [
      {
        id: 'g5-integers',
        chapterNumber: 'I.',
        title: 'I. Az egész számok',
        subtitle: 'Számok írása, olvasása, kerekítés, alapműveletek és számegyenes',
        topics: [
          { id: 'roman-numerals', title: '1. Római számok', short: 'Római' },
          { id: 'place-value', title: '2. Helyiértékes írás', short: 'Helyiérték' },
          { id: 'number-reading', title: '3. Számok kiolvasása', short: 'Kiolvasás' },
          { id: 'number-spelling', title: '4. Számok helyesírása', short: 'Helyesírás' },
          { id: 'number-systems', title: '5. Számrendszerek', short: 'Számrendsz.' },
          { id: 'number-line', title: '6. Számegyenes', short: 'Számegyenes' },
          { id: 'rounding', title: '7. Becslés, kerekítés', short: 'Kerekítés' },
          { id: 'addition', title: '8. Összeadás', short: 'Összeadás' },
          { id: 'subtraction', title: '9. Kivonás', short: 'Kivonás' },
          { id: 'multiplication', title: '10. Szorzás', short: 'Szorzás' },
          { id: 'division', title: '11. Osztás', short: 'Osztás' },
          { id: 'order-of-operations', title: '12. Műveleti sorrend', short: 'Műv. sorrend' },
          { id: 'negative-numbers', title: '13. Negatív számok', short: 'Negatív' },
          { id: 'opposite-absolute', title: '14. Ellentett & Abszolút', short: 'Ellentett' },
          { id: 'integer-addition-subtraction', title: '15. Egész számok műveletei', short: 'Egész műv.' },
          { id: 'chapter1-summary', title: '16. Témazáró Összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g5-fractions-decimals',
        chapterNumber: 'II.',
        title: 'II. Törtek, tizedes törtek',
        subtitle: 'Közönséges törtek és tizedes törtek fogalma, műveletek',
        topics: [
          { id: 'g5-frac-sec-1', title: '1. Ismerkedés a törtekkel', short: 'Tört fogalom' },
          { id: 'g5-frac-sec-2', title: '2. Törtek bővítése, egyszerűsítése', short: 'Bővítés-egysz.' },
          { id: 'g5-frac-sec-3', title: '3. Törtek számegyenesen', short: 'Számegyenes' },
          { id: 'g5-frac-sec-4', title: '4. Egyenlő nevezőjű törtek műveletei', short: 'Egyenlő nev.' },
          { id: 'g5-frac-sec-5', title: '5. Különböző nevezőjű törtek műveletei', short: 'Különböző nev.' },
          { id: 'g5-frac-sec-6', title: '6. Tört szorzása egész számmal', short: 'Szorzás egész.' },
          { id: 'g5-frac-sec-7', title: '7. Tört osztása egész számmal', short: 'Osztás egész.' },
          { id: 'g5-frac-sec-8', title: '8. Műveletek sorrendje', short: 'Műv. sorrend' },
          { id: 'g5-frac-sec-10', title: '9. Tizedes törtek bevezetése', short: 'Tizedestört' },
          { id: 'g5-frac-sec-11', title: '10. Tizedes törtek kerekítése', short: 'Kerekítés' },
          { id: 'g5-frac-sec-12', title: '11. Tizedes törtek összeadása, kivonása', short: 'Összead-kivon' },
          { id: 'g5-frac-sec-13', title: '12. Tizedes törtek szorzása', short: 'Szorzás' },
          { id: 'g5-frac-sec-14', title: '13. Tizedes törtek osztása', short: 'Osztás' },
          { id: 'g5-frac-sec-16', title: '14. Témazáró összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g5-geometry-intro',
        chapterNumber: 'III.',
        title: 'III. Bevezetés a geometriába',
        subtitle: 'Alapfogalmak, alakzatok, tengelyes tükrözés',
        topics: [
          { id: 'g5-geom-grouping', title: '1. Csoportosítások', short: 'Csoportosítás' },
          { id: 'g5-geom-sets', title: '2. Halmazok', short: 'Halmazok' },
          { id: 'g5-geom-bodies', title: '3. Test, felület, vonal, pont', short: 'Alapfogalmak' },
          { id: 'g5-geom-angles', title: '4. A szög', short: 'Szögek' },
          { id: 'g5-geom-triangles', title: '5. Síkidomok, sokszögek', short: 'Sokszögek' },
          { id: 'g5-geom-quads', title: '6. Téglalap, négyzet', short: 'Négyszögek' },
          { id: 'g5-geom-summary', title: '7. Összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g5-measurements',
        chapterNumber: 'IV.',
        title: 'IV. Hosszúság, terület, térfogat',
        subtitle: 'Mértékegységek és geometriai számítások',
        topics: [
          { id: 'g5-meas-sec-1', title: '1. Hosszúság mérése', short: 'Hosszúság' },
          { id: 'g5-meas-sec-2', title: '2. Kerület számítás', short: 'Kerület' },
          { id: 'g5-meas-sec-3', title: '3. Terület mérése', short: 'Terület' },
          { id: 'g5-meas-sec-5', title: '4. Téglatest, kocka felszíne', short: 'Felszín' },
          { id: 'g5-meas-sec-7', title: '5. Térfogat mérése', short: 'Térfogat' },
          { id: 'g5-meas-sec-10', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g5-location-sequences',
        chapterNumber: 'V.',
        title: 'V. Helymeghatározás, sorozatok',
        subtitle: 'Koordináta-rendszer, szabályszerűségek',
        topics: [
          { id: 'g5-loc-sec-1', title: '1. Tájékozódás a síkon', short: 'Tájékozódás' },
          { id: 'g5-loc-sec-2', title: '2. Koordináta-rendszer', short: 'Koordináták' },
          { id: 'g5-loc-sec-3', title: '3. Sorozatok, szabályok', short: 'Sorozatok' }
        ]
      },
      {
        id: 'g5-proportion-problems',
        chapterNumber: 'VI.',
        title: 'VI. Mérés, arányosság, szöveges feladatok',
        subtitle: 'Arányos következtetés, gyakorlati számítások',
        topics: [
          { id: 'g5-prop-sec-1', title: '1. Egyenes arányosság', short: 'Arányosság' },
          { id: 'g5-prop-sec-2', title: '2. Következtetések', short: 'Következtetés' },
          { id: 'g5-prop-sec-3', title: '3. Szöveges feladatok', short: 'Szöveges' }
        ]
      },
      {
        id: 'g5-stats',
        chapterNumber: 'VII.',
        title: 'VII. Adatgyűjtés, statisztika',
        subtitle: 'Adatok rendszerezése és ábrázolása',
        topics: [
          { id: 'g5-stat-sec-1', title: '1. Adatgyűjtés, táblázatok', short: 'Adatgyűjtés' },
          { id: 'g5-stat-sec-2', title: '2. Diagramok készítése', short: 'Diagramok' },
          { id: 'g5-stat-sec-3', title: '3. Átlag számítása', short: 'Átlag' }
        ]
      }
    ]
  },

  // ================= 6. OSZTÁLY =================
  6: {
    grade: 6,
    gradeLabel: '6. Osztály',
    chapters: [
      {
        id: 'g6-integers-divisibility',
        chapterNumber: 'I.',
        title: 'I. Egész számok, oszthatóság',
        subtitle: 'Számok írása, olvasása, alapműveletek, oszthatóság, LKKT és LNKO',
        topics: [
          { id: 'integers-operations', title: '1. Műveletek egész számokkal', short: 'Műveletek' },
          { id: 'integers-mult', title: '2. Egész számok szorzása', short: 'Szorzás' },
          { id: 'integers-div', title: '3. Egész számok osztása', short: 'Osztás' },
          { id: 'integers-cases', title: '4. Előjelszabályok & Esetek', short: 'Előjelek' },
          { id: 'integers-divisors', title: '5. Osztók & Többszörösök', short: 'Osztók' },
          { id: 'integers-remainders', title: '6. Osztási maradékok', short: 'Maradék' },
          { id: 'integers-factorization', title: '7. Prímtényezős felbontás', short: 'Prímtényező' },
          { id: 'integers-divisibility-2-5-10', title: '8. Oszthatóság: 2, 5, 10', short: '2, 5, 10' },
          { id: 'integers-divisibility-3-9', title: '9. Oszthatóság: 3, 9', short: '3, 9' },
          { id: 'integers-divisibility-4-100', title: '10. Oszthatóság: 4, 100', short: '4, 100' },
          { id: 'integers-composite-divisibility', title: '11. Összetett oszthatóság', short: 'Összetett' },
          { id: 'integers-lcm', title: '12. Legkisebb közös többszörös (LKKT)', short: 'LKKT' },
          { id: 'integers-gcd', title: '13. Legnagyobb közös osztó (LNKO)', short: 'LNKO' },
          { id: 'integers-summary', title: '14. Témazáró Összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g6-fractions',
        chapterNumber: 'II.',
        title: 'II. Törtek',
        subtitle: 'Közönséges törtek és tizedes törtek fogalma, műveletek',
        topics: [
          { id: 'g6-frac-sec-1', title: '1. Törtek ismétlése', short: 'Ismétlés' },
          { id: 'g6-frac-sec-2', title: '2. Szorzás törttel, reciprok', short: 'Szorzás törttel' },
          { id: 'g6-frac-sec-3', title: '3. Osztás törttel', short: 'Osztás törttel' },
          { id: 'g6-frac-sec-4', title: '4. Tizedes törtek ismétlése', short: 'Tizedes ism.' },
          { id: 'g6-frac-sec-5', title: '5. Szorzás tizedes törttel', short: 'Szorzás tizedes' },
          { id: 'g6-frac-sec-6', title: '6. Osztás tizedes törttel', short: 'Osztás tizedes' },
          { id: 'g6-frac-sec-7', title: '7. Összetett műveletek', short: 'Összetett műv.' },
          { id: 'g6-frac-sec-8', title: '8. Témazáró összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g6-geometry-symmetry',
        chapterNumber: 'III.',
        title: 'III. Geometria, tengelyes tükrözés',
        subtitle: 'Alakzatok, szerkesztések és szimmetria',
        topics: [
          { id: 'g6-geom-sec-1', title: '1. Síkbeli alakzatok', short: 'Síkalakzatok' },
          { id: 'g6-geom-sec-2', title: '2. Egybevágóság', short: 'Egybevágóság' },
          { id: 'g6-geom-sec-3', title: '3. A kör', short: 'A kör' },
          { id: 'g6-geom-sec-6', title: '4. Tengelyes tükrözés', short: 'Tükrözés' },
          { id: 'g6-geom-sec-8', title: '5. Tengelyes szimmetria', short: 'Szimmetria' },
          { id: 'g6-geom-sec-10', title: '6. Szerkesztési feladatok', short: 'Szerkesztés' },
          { id: 'g6-geom-sec-11', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g6-ratio-percent-word',
        chapterNumber: 'IV.',
        title: 'IV. Arány, százalék, szöveges feladatok',
        subtitle: 'Arányos következtetés, százalékszámítás és gyakorlati feladatok',
        topics: [
          { id: 'g6-ratio-sec-1', title: '1. Az arány fogalma', short: 'Arány' },
          { id: 'g6-ratio-sec-2', title: '2. Arányos osztás', short: 'Arányos osztás' },
          { id: 'g6-ratio-sec-3', title: '3. Egyenes arányosság', short: 'Egyenes arány.' },
          { id: 'g6-ratio-sec-7', title: '4. Százalékszámítás', short: 'Százalék' },
          { id: 'g6-ratio-sec-8', title: '5. Százalékszámítás gyakorlása', short: 'Százalék gyak.' },
          { id: 'g6-ratio-sec-10', title: '6. Szöveges feladatok', short: 'Szöveges' },
          { id: 'g6-ratio-sec-12', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g6-measurements',
        chapterNumber: 'V.',
        title: 'V. Kerület, terület, felszín, térfogat',
        subtitle: 'Mértékegységek átváltása, geometriai számítások',
        topics: [
          { id: 'g6-meas-sec-1', title: '1. Hosszúság, tömeg, idő', short: 'Mértékegységek' },
          { id: 'g6-meas-sec-2', title: '2. Sokszögek kerülete', short: 'Kerület' },
          { id: 'g6-meas-sec-4', title: '3. Sokszögek területe', short: 'Terület' },
          { id: 'g6-meas-sec-6', title: '4. Testek felszíne', short: 'Felszín' },
          { id: 'g6-meas-sec-8', title: '5. Testek térfogata', short: 'Térfogat' },
          { id: 'g6-meas-sec-9', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g6-statistics',
        chapterNumber: 'VI.',
        title: 'VI. Statisztika',
        subtitle: 'Adatok elemzése, átlag, diagramok',
        topics: [
          { id: 'g6-stat-sec-2', title: '1. Grafikonok, diagramok', short: 'Diagramok' },
          { id: 'g6-stat-sec-3', title: '2. Kördiagram', short: 'Kördiagram' },
          { id: 'g6-stat-sec-4', title: '3. Adatok ábrázolása, átlag', short: 'Átlag' },
          { id: 'g6-stat-sec-5', title: '4. Témazáró', short: 'Témazáró' }
        ]
      }
    ]
  },

  // ================= 7. OSZTÁLY =================
  7: {
    grade: 7,
    gradeLabel: '7. Osztály',
    chapters: [
      {
        id: 'g7-logic',
        chapterNumber: 'I.',
        title: 'I. Gondolkodjunk!',
        subtitle: 'Kombinatorika, gráfok, logikai állítások és matematikai játékok',
        topics: [
          { id: 'g7-sec-szamold-ossze', title: '1. Számold össze!', short: 'Összeszámolás' },
          { id: 'g7-sec-rendezd-sorba', title: '2. Rendezd sorba!', short: 'Sorba rendezés' },
          { id: 'g7-sec-hany-eset-van', title: '3. Hány eset van?', short: 'Esetek száma' },
          { id: 'g7-sec-grafok', title: '4. Gráfok', short: 'Gráfok' },
          { id: 'g7-sec-igazold-cafold', title: '5. Igazold! Cáfold!', short: 'Logika' },
          { id: 'g7-sec-matematikai-jatekok', title: '6. Matematikai játékok', short: 'Játékok' },
          { id: 'g7-sec-osszefoglalas', title: '7. Témazáró Összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-rational-algebra',
        chapterNumber: 'II.',
        title: 'II. Racionális számok, algebra',
        subtitle: 'Valós idejű áttekintés a 7. osztályos racionális számok, algebrai kifejezések és kiemelés témákról.',
        topics: [
          { id: 'rat-integer-properties', title: '1. Egész számok tulajdonságai', short: 'Tulajdonságok' },
          { id: 'rat-fractions-decimals', title: '2. Törtek és tizedestörtek', short: 'Törtek' },
          { id: 'rat-operations', title: '3. Műveletek racionális számokkal', short: 'Műveletek' },
          { id: 'rat-word-problems', title: '4. Szöveges feladatok', short: 'Szöveges' },
          { id: 'rat-complex-operations', title: '5. Összetett műveletsorok', short: 'Műveletsor' },
          { id: 'rat-numbers-letters', title: '6. Számok és betűk, kifejezések', short: 'Kifejezések' },
          { id: 'rat-combining-substitution', title: '7. Egynemű tagok & Helyettesítés', short: 'Helyettesítés' },
          { id: 'rat-expansion-factoring', title: '8. Zárójelfelbontás & Kiemelés', short: 'Zárójelbontás' },
          { id: 'rat-summary', title: '9. Fejezeti összefoglaló', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-geom-trans',
        chapterNumber: 'III.',
        title: 'III. Geometriai transzformációk',
        subtitle: 'Háromszögek nevezetes vonalai, szögpárok, szimmetriák, négyszögek, sokszögek és szerkesztések',
        topics: [
          { id: 'g7-sec-trans-fogalmak', title: '1. Geometriai fogalmak', short: 'Fogalmak' },
          { id: 'g7-sec-trans-haromszog-vonalak', title: '2. Háromszögek nevezetes vonalai', short: 'Nevezetes vonal' },
          { id: 'g7-sec-trans-kozeppontos-tukrozes', title: '3. Középpontos tükrözés', short: 'Közép. tükrözés' },
          { id: 'g7-sec-trans-szogparok', title: '4. Szögpárok', short: 'Szögpárok' },
          { id: 'g7-sec-trans-szimmetria', title: '5. Szimmetria', short: 'Szimmetria' },
          { id: 'g7-sec-trans-paralelogramma-deltoid', title: '6. Paralelogramma és deltoid', short: 'Paralelogramma' },
          { id: 'g7-sec-trans-kor', title: '7. A kör', short: 'A kör' },
          { id: 'g7-sec-trans-szerkesztesek', title: '8. Szerkesztések', short: 'Szerkesztések' },
          { id: 'g7-sec-trans-osszefoglalas', title: '9. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-powers-divisibility',
        chapterNumber: 'IV.',
        title: 'IV. Hatványozás, oszthatóság',
        subtitle: 'Normálalak, hatványozás azonosságai, oszthatósági szabályok, LNKO és LKKT',
        topics: [
          { id: 'g7-sec-pow-nagy-szamok', title: '1. Nagy számok és normálalak', short: 'Normálalak' },
          { id: 'g7-sec-pow-alkalmazas', title: '2. Hatványok alkalmazása', short: 'Hatványozás' },
          { id: 'g7-sec-pow-prim-felbontas', title: '3. Prímszámok, felbontás', short: 'Prímfelbontás' },
          { id: 'g7-sec-pow-lnko', title: '4. Legnagyobb közös osztó', short: 'LNKO' },
          { id: 'g7-sec-pow-lkkt', title: '5. Legkisebb közös többszörös', short: 'LKKT' },
          { id: 'g7-sec-pow-osszefoglalas', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-percent-equations',
        chapterNumber: 'V.',
        title: 'V. Százalékszámítás, egyenletek',
        subtitle: 'Arányosság, százalékszámítás, mérlegelv, elsőfokú egyenletek',
        topics: [
          { id: 'g7-sec-pct-aranyossag', title: '1. Arányosság', short: 'Arányosság' },
          { id: 'g7-sec-pct-100-szazalek', title: '2. Százalékszámítás alapjai', short: 'Százalék alap' },
          { id: 'g7-sec-pct-gyakorlas', title: '3. Százalékszámítás gyakorlása', short: 'Százalék gyak.' },
          { id: 'g7-sec-pct-merlegelv', title: '4. A mérlegelv', short: 'Mérlegelv' },
          { id: 'g7-sec-pct-egyenletek-merlegelvvel', title: '5. Egyenletek mérlegelvvel', short: 'Egyenletek' },
          { id: 'g7-sec-pct-szoveges-egyenlettel', title: '6. Szöveges egyenletek', short: 'Szöveges' },
          { id: 'g7-sec-pct-osszefoglalas', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-geometry',
        chapterNumber: 'VI.',
        title: 'VI. Geometria',
        subtitle: 'Egybevágó háromszögek, sokszögek, síkidomok területe, hasábok felszíne és térfogata',
        topics: [
          { id: 'g7-sec-geom-egybevagosag', title: '1. Egybevágó háromszögek', short: 'Egybevágóság' },
          { id: 'g7-sec-geom-sokszogek-szogei-atloi', title: '2. Sokszögek szögei, átlói', short: 'Sokszögek' },
          { id: 'g7-sec-geom-paralelogramma-terulet', title: '3. Paralelogramma területe', short: 'Paralelogramma' },
          { id: 'g7-sec-geom-haromszog-terulet', title: '4. Háromszög területe', short: 'Háromszög ter.' },
          { id: 'g7-sec-geom-trapez-terulet', title: '5. Trapéz és deltoid területe', short: 'Trapéz-deltoid' },
          { id: 'g7-sec-geom-hasab-felszin-terfogat', title: '6. Hasáb felszíne, térfogata', short: 'Hasáb' },
          { id: 'g7-sec-geom-osszefoglalas', title: '7. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-stats',
        chapterNumber: 'VII.',
        title: 'VII. Hozzárendelések, statisztika',
        subtitle: 'Hozzárendelések, grafikonok, átlag, módusz, medián, valószínűségszámítás',
        topics: [
          { id: 'g7-sec-stats-halmazok-hozzarendeles', title: '1. Hozzárendelések', short: 'Hozzárendelés' },
          { id: 'g7-sec-stats-olvassunk-grafikonrol', title: '2. Olvasás grafikonról', short: 'Grafikonok' },
          { id: 'g7-sec-stats-atlag-modusz-median', title: '3. Átlag, módusz, medián', short: 'Statisztika' },
          { id: 'g7-sec-stats-valoszinuseg', title: '4. Valószínűségszámítás', short: 'Valószínűség' },
          { id: 'g7-sec-stats-osszefoglalas', title: '5. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g7-other',
        chapterNumber: 'VIII.',
        title: 'VIII. Egyéb: Bevezetés, ismétlés',
        subtitle: 'Év eleji és év végi ismétlés és rendszerezés',
        topics: [
          { id: 'g7-other-intro', title: '1. Év eleji ismétlés', short: 'Év eleje' },
          { id: 'g7-other-summary', title: '2. Év végi összefoglalás', short: 'Év vége' }
        ]
      }
    ]
  },

  // ================= 8. OSZTÁLY =================
  8: {
    grade: 8,
    gradeLabel: '8. Osztály',
    chapters: [
      {
        id: 'g8-numbers-letters',
        chapterNumber: 'I.',
        title: 'I. Számok és betűk',
        subtitle: 'Valós idejű áttekintés a 8. osztályos logika, halmazok, hatványozás, gyökvonás és kifejezések témákról.',
        topics: [
          { id: 'logic', title: '1. Logika feladatok', short: 'Logika' },
          { id: 'set-basics', title: '2. Mit tudunk a halmazokról?', short: 'Halmaz alap' },
          { id: 'set-operations', title: '3. Műveletek halmazokkal', short: 'Halmazműv.' },
          { id: 'rational-set', title: '4. A racionális számok halmaza', short: 'Racionális' },
          { id: 'rational-operations', title: '5. Mit tudunk a racionális számokról?', short: 'Rac. művelet' },
          { id: 'powers', title: '6. Hatványozás', short: 'Hatvány' },
          { id: 'sqrt-concept', title: '7. A négyzetgyök fogalma', short: 'Gyökfogalom' },
          { id: 'square-roots', title: '8. Számok négyzetgyöke', short: 'Négyzetgyök' },
          { id: 'algebra-intro', title: '9. Betűs kifejezések', short: 'Betűs kif.' },
          { id: 'factoring', title: '10. Szorzás és kiemelés', short: 'Kiemelés' },
          { id: 'polynomial-mult', title: '11. Többtagú kifejezések szorzata', short: 'Többtagú' },
          { id: 'chapter1-summary', title: '12. Témazáró Összefoglalás', short: 'Témazáró' }
        ]
      },
      {
        id: 'g8-geometry',
        chapterNumber: 'II.',
        title: 'II. Geometria',
        subtitle: 'Egybevágóság, geometriai transzformációk, hasonlóság és szerkesztések',
        topics: [
          { id: 'g8-sec-geom-egybevagosag', title: '1. Egybevágósági transzformációk', short: 'Egybevágóság' },
          { id: 'g8-sec-geom-szerkesztoprogram', title: '2. Szerkesztőprogramok', short: 'Szerkesztés' },
          { id: 'g8-sec-geom-hasonlosag', title: '3. Hasonlóság', short: 'Hasonlóság' },
          { id: 'g8-sec-geom-kozeppontos', title: '4. Középpontos hasonlóság', short: 'Közép. hasonlóság' },
          { id: 'g8-sec-geom-osszefoglalas', title: '5. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g8-equations',
        chapterNumber: 'III.',
        title: 'III. Egyenletek',
        subtitle: 'Egyenletek, mérlegelv, életkori, keverési, mozgásos és pénzügyi feladatok',
        topics: [
          { id: 'g8-sec-eq-alap', title: '1. Egyenletek megoldása', short: 'Egyenletek' },
          { id: 'g8-sec-eq-szamok-kor', title: '2. Életkori feladatok', short: 'Életkorok' },
          { id: 'g8-sec-eq-keveres', title: '3. Keverési feladatok', short: 'Keverés' },
          { id: 'g8-sec-eq-mozgas-munka', title: '4. Mozgásos feladatok', short: 'Mozgás-munka' },
          { id: 'g8-sec-eq-penzugy', title: '5. Pénzügyi feladatok', short: 'Pénzügy' },
          { id: 'g8-sec-eq-osszefoglalas', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g8-pythagoras',
        chapterNumber: 'IV.',
        title: 'IV. Pitagorasz-tétel',
        subtitle: 'A Pitagorasz-tétel, megfordítása és gyakorlati alkalmazásai',
        topics: [
          { id: 'g8-sec-pyth-szerkesztes', title: '1. Szerkesztések, mérések', short: 'Szerkesztés' },
          { id: 'g8-sec-pyth-tetel', title: '2. A Pitagorasz-tétel', short: 'Pitagorasz' },
          { id: 'g8-sec-pyth-megforditas', title: '3. Tétel megfordítása', short: 'Megfordítás' },
          { id: 'g8-sec-pyth-alkalmazas', title: '4. Alkalmazások', short: 'Alkalmazás' },
          { id: 'g8-sec-pyth-nevezetes', title: '5. Nevezetes derékszögű háromszögek', short: 'Nevezetes' },
          { id: 'g8-sec-pyth-osszefoglalas', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g8-functions-probability-sequences',
        chapterNumber: 'V.',
        title: 'V. Függvények, valószínűség, sorozatok',
        subtitle: 'Egyenes és fordított arányosság, grafikonok, valószínűség és sorozatok',
        topics: [
          { id: 'g8-sec-func-egyenes', title: '1. Egyenes arányosság', short: 'Egyenes arány.' },
          { id: 'g8-sec-func-forditott', title: '2. Fordított arányosság', short: 'Fordított arány.' },
          { id: 'g8-sec-func-grafikonok', title: '3. Hozzárendelések, grafikonok', short: 'Grafikonok' },
          { id: 'g8-sec-func-valoszinuseg', title: '4. Valószínűségszámítás', short: 'Valószínűség' },
          { id: 'g8-sec-func-sorozatok', title: '5. Sorozatok', short: 'Sorozatok' },
          { id: 'g8-sec-func-osszefoglalas', title: '6. Témazáró', short: 'Témazáró' }
        ]
      },
      {
        id: 'g8-solids',
        chapterNumber: 'VI.',
        title: 'VI. Testek',
        subtitle: 'Gúlák, gömb, testek felszíne és térfogata',
        topics: [
          { id: 'g8-sec-solids-ismetles', title: '1. Testek ismétlése', short: 'Ismétlés' },
          { id: 'g8-sec-solids-gulak', title: '2. Gúlák', short: 'Gúlák' },
          { id: 'g8-sec-solids-gula-szamitas', title: '3. Gúla felszíne, térfogata', short: 'Gúla számítás' },
          { id: 'g8-sec-solids-gomb', title: '4. A gömb', short: 'Gömb' },
          { id: 'g8-sec-solids-osszefoglalas', title: '5. Témazáró', short: 'Témazáró' }
        ]
      }
    ]
  }
};
