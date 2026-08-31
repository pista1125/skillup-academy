export interface Grade5SubSection {
  id: string;
  label: string;
}

export interface Grade5Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subsections: Grade5SubSection[];
}

export const grade5Topics: Grade5Topic[] = [
  {
    id: 'materials',
    title: 'Tananyagok és Könyvek',
    icon: '📚',
    color: 'from-indigo-500 to-purple-600',
    subsections: []
  },
  {
    id: 'g5-integers',
    title: 'I. AZ EGÉSZ SZÁMOK',
    icon: '🔢',
    color: 'from-blue-500 to-blue-600',
    subsections: [
      { id: 'g5-int-sec-1', label: '1. A számok kialakulása, a római számok' },
      { id: 'g5-int-sec-2', label: '2. A helyiértékes írás' },
      { id: 'g5-int-sec-3', label: '3. A számjegyek hármas csoportosítása és a számok kiolvasása' },
      { id: 'g5-int-sec-4', label: '4. A természetes számok helyesírása' },
      { id: 'g5-int-sec-5', label: '5. Számrendszerek' },
      { id: 'g5-int-sec-6', label: '6. A számok ábrázolása a számegyenesen' },
      { id: 'g5-int-sec-7', label: '7. Becslés, kerekítés' },
      { id: 'g5-int-sec-8', label: '8. Összeadás, írásbeli összeadás' },
      { id: 'g5-int-sec-9', label: '9. Kivonás, írásbeli kivonás' },
      { id: 'g5-int-sec-10', label: '10. Szorzás, írásbeli szorzás' },
      { id: 'g5-int-sec-11', label: '11. Osztás, írásbeli osztás kétjegyű osztóval' },
      { id: 'g5-int-sec-12', label: '12. Műveletek tulajdonságai, műveleti sorrend, zárójelek' },
      { id: 'g5-int-sec-13', label: '13. Negatív számok' },
      { id: 'g5-int-sec-14', label: '14. A számok ellentettje és abszolút értéke' },
      { id: 'g5-int-sec-15', label: '15. Egész számok összeadása és kivonása' },
      { id: 'g5-int-sec-16', label: '16. Összefoglalás' }
    ]
  },
  {
    id: 'g5-fractions-decimals',
    title: 'II. TÖRTEK, TIZEDES TÖRTEK',
    icon: '🍕',
    color: 'from-orange-500 to-amber-600',
    subsections: [
      { id: 'g5-frac-sec-1', label: '1. Ismerkedés a törtekkel' },
      { id: 'g5-frac-sec-2', label: '2. Törtek bővítése, egyszerűsítése, összehasonlítása' },
      { id: 'g5-frac-sec-3', label: '3. Törtek ábrázolása számegyenesen, vegyes törtek' },
      { id: 'g5-frac-sec-4', label: '4. Egyenlő nevezőjű törtek összeadása és kivonása' },
      { id: 'g5-frac-sec-5', label: '5. Különböző nevezőjű törtek összeadása és kivonása' },
      { id: 'g5-frac-sec-6', label: '6. Tört szorzása természetes számmal' },
      { id: 'g5-frac-sec-7', label: '7. Tört osztása pozitív egész számmal' },
      { id: 'g5-frac-sec-8', label: '8. Műveletek sorrendje, zárójelfelbontás' },
      { id: 'g5-frac-sec-9', label: '9. Mit tanultunk eddig? Gyakoroljunk!' },
      { id: 'g5-frac-sec-10', label: '10. Tizedes törtek' },
      { id: 'g5-frac-sec-11', label: '11. Tizedes törtek ábrázolása, kerekítése és összehasonlítása' },
      { id: 'g5-frac-sec-12', label: '12. Tizedes törtek összeadása és kivonása' },
      { id: 'g5-frac-sec-13', label: '13. Tizedes törtek szorzása természetes számmal' },
      { id: 'g5-frac-sec-14', label: '14. Tizedes törtek osztása pozitív egész számmal' },
      { id: 'g5-frac-sec-15', label: '15. Közönséges törtek tizedes tört alakja' },
      { id: 'g5-frac-sec-16', label: '16. Összefoglalás' }
    ]
  },
  {
    id: 'g5-geometry-intro',
    title: 'III. BEVEZETÉS A GEOMETRIÁBA',
    icon: '📐',
    color: 'from-green-500 to-green-600',
    subsections: [
      { id: 'g5-geom-grouping', label: '1. Csoportosítások' },
      { id: 'g5-geom-sets', label: '2. Halmazok' },
      { id: 'g5-geom-bodies', label: '3. Test, felület, vonal, pont' },
      { id: 'g5-geom-angles', label: '4. A szög' },
      { id: 'g5-geom-triangles', label: '5. Síkidomok, sokszögek' },
      { id: 'g5-geom-building', label: '6. Testek építése, szemléltetése' },
      { id: 'g5-geom-lines', label: '7. Egyenesek síkban, térben' },
      { id: 'g5-geom-quads', label: '8. Téglalap, négyzet' },
      { id: 'g5-geom-summary', label: '9. Összefoglalás' }
    ]
  },
  {
    id: 'g5-measurements',
    title: 'IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT',
    icon: '📏',
    color: 'from-cyan-500 to-blue-500',
    subsections: [
      { id: 'g5-meas-sec-1', label: '1. A hosszúság mérése' },
      { id: 'g5-meas-sec-2', label: '2. Téglalap, négyzet kerülete' },
      { id: 'g5-meas-sec-3', label: '3. A terület mérése' },
      { id: 'g5-meas-sec-4', label: '4. Téglalap, négyzet területe' },
      { id: 'g5-meas-sec-5', label: '5. Téglatest, kocka' },
      { id: 'g5-meas-sec-6', label: '6. Téglatest, kocka felszíne' },
      { id: 'g5-meas-sec-7', label: '7. A térfogat mérése' },
      { id: 'g5-meas-sec-8', label: '8. Téglatest, kocka térfogata' },
      { id: 'g5-meas-sec-9', label: '9. Gyakorlati feladatok' },
      { id: 'g5-meas-sec-10', label: '10. Összefoglalás' }
    ]
  },
  {
    id: 'g5-location-sequences',
    title: 'V. HELYMEGHATÁROZÁS, SOROZATOK',
    icon: '📍',
    color: 'from-violet-500 to-purple-600',
    subsections: [
      { id: 'g5-loc-sec-1', label: '1. A helymeghatározás szerepe környezetünkben' },
      { id: 'g5-loc-sec-2', label: '2. Helymeghatározás' },
      { id: 'g5-loc-sec-3', label: '3. A derékszögű koordináta-rendszer' },
      { id: 'g5-loc-sec-4', label: '4. Pontok ábrázolása' },
      { id: 'g5-loc-sec-5', label: '5. Tájékozódás síkban, térben (kiegészítő tananyag)' },
      { id: 'g5-loc-sec-6', label: '6. Ritmusok, díszítések' },
      { id: 'g5-loc-sec-7', label: '7. Keressünk összefüggéseket!' },
      { id: 'g5-loc-sec-8', label: '8. Sorozatok' },
      { id: 'g5-loc-sec-9', label: '9. Nevezetes, érdekes sorozatok' },
      { id: 'g5-loc-sec-10', label: '10. Összefoglalás' }
    ]
  },
  {
    id: 'g5-proportion-problems',
    title: 'VI. MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK',
    icon: '📝',
    color: 'from-teal-500 to-teal-600',
    subsections: [
      { id: 'g5-prop-sec-1', label: '1. A tömeg mérése, mértékegységei' },
      { id: 'g5-prop-sec-2', label: '2. Az űrtartalom mérése, mértékegységei' },
      { id: 'g5-prop-sec-3', label: '3. Az idő mérése, mértékegységei' },
      { id: 'g5-prop-sec-4', label: '4. Mértékegység-átváltások' },
      { id: 'g5-prop-sec-5', label: '5. Arányosságok, változó mennyiségek' },
      { id: 'g5-prop-sec-6', label: '6. Egyenes arányosság' },
      { id: 'g5-prop-sec-7', label: '7. Nyitott mondatok' },
      { id: 'g5-prop-sec-8', label: '8. Keressük a megoldásokat!' },
      { id: 'g5-prop-sec-9', label: '9. Egyszerű szöveges feladatok' },
      { id: 'g5-prop-sec-10', label: '10. Szöveges feladatok a hétköznapjainkban' },
      { id: 'g5-prop-sec-11', label: '11. Összefoglalás' }
    ]
  },
  {
    id: 'g5-stats',
    title: 'VII. ADATGYŰJTÉS, STATISZTIKA',
    icon: '📈',
    color: 'from-pink-500 to-rose-500',
    subsections: [
      { id: 'g5-stats-sec-1', label: '1. Játékok' },
      { id: 'g5-stats-sec-2', label: '2. Táblázatok, grafikonok' },
      { id: 'g5-stats-sec-3', label: '3. Adatgyűjtés, az adatok ábrázolása' },
      { id: 'g5-stats-sec-4', label: '4. Átlag és tulajdonságai' },
      { id: 'g5-stats-sec-5', label: '5. Lehetetlen, lehetséges, biztos' },
      { id: 'g5-stats-sec-6', label: '6. Összefoglalás' }
    ]
  }
];
