# 7. Elemi geometria – rendszerező összefoglalás (144–150. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., Rendszerező összefoglalás, „Geometria” blokk – Elemi geometria rész, 144–150. oldal) alapján kidolgozott érettségi ismétlő modul. A diákzónában ez a IV. Rendszerező összefoglalás fejezet **7.** leckéje.

---

## 🎯 Tananyag Áttekintés

A 9–12. évfolyam elemi geometriája: térelemek kölcsönös helyzete, távolsága és hajlásszöge; szögek, nevezetes szögpárok; a háromszög szögei, oldalai, osztályozása, nevezetes ponthalmazok és a háromszög nevezetes vonalai/pontjai; négyszögek (trapéz, paralelogramma, deltoid, rombusz, téglalap, négyzet); sokszögek szögei és átlói, szabályos sokszögek.

---

## 📐 Fogalmak, tételek, módszerek (tankönyvi táblázat)

- **Alapfogalmak:** pont, egyenes, sík, illeszkedés. **D – Kölcsönös helyzet:** metsző, párhuzamos, kitérő egyenesek; egyenes és sík (illeszkedik, metszi, párhuzamos); két sík (metsző – metszésvonal, párhuzamos).
- **D – Távolság:** közös pont esetén 0; pont–egyenes, pont–sík: merőleges szakasz; párhuzamos egyenesek / egyenes és sík / síkok: egy pont távolsága a másiktól.
- **D – Szög, fok:** 1° = 1/360 teljesszög, 1° = 60′, 1′ = 60″. **T – Nevezetes szögpárok:** egyállású, csúcs-, váltószögek egyenlők; mellékszögek, kiegészítő szögek összege 180°; pótszögeké 90°; merőleges szárú szögek egyenlők vagy kiegészítők.
- **D – Hajlásszög:** egyenes–egyenes (≤ 90°), egyenes–sík (vetülettel), sík–sík (a metszésvonalra merőleges egyenesekkel); párhuzamosaké 0°.
- **T – Háromszög:** belső szögösszeg 180°, külső szög = a két nem mellette fekvő belső szög összege, külső szögösszeg 360°; háromszög-egyenlőtlenség; nagyobb oldallal szemben nagyobb szög. **D – Osztályozás** szögek és oldalak szerint.
- **D – Nevezetes ponthalmazok:** szakaszfelező merőleges, szögfelező egyenesek (két, egymásra merőleges), kör, gömb.
- **T – Nevezetes vonalak:** oldalfelező merőlegesek → K (köré írt kör; hegyesszögűben belül, derékszögűben az átfogó felezőpontja, tompaszögűben kívül); belső szögfelezők → beírt kör középpontja (mindig belül); magasságvonalak → M (derékszögűben a derékszögű csúcs, tompaszögűben kívül); súlyvonalak → S (harmadolópont, mindig belül).
- **Négyszögek:** belső és külső szögösszeg 360°; trapéz (egy száron fekvő szögek összege 180°), húrtrapéz, paralelogramma (szemközti szögek, oldalak egyenlők, átlók felezik egymást, középpontosan szimmetrikus), deltoid, rombusz, téglalap, négyzet.
- **T – Sokszögek:** egy csúcsból n − 3 átló, összesen n(n − 3)/2; belső szögösszeg (n − 2) · 180°, külső 360°; szabályos n-szög egy szöge (n − 2) · 180°/n; páros n-re tengelyesen és középpontosan, páratlanra tengelyesen szimmetrikus.

### Kidolgozott feladatok
1. **Derékszögű háromszög:** a magasság és a szögfelező szöge 20° ⇒ ∢BCT = 45° − 20° = 25° ⇒ a hegyesszögek 25° és 65° (vagy: merőleges szárú szögek).
2. **35 cm és 91 cm-es oldal, egész harmadik oldal:** 56 < c < 126; a) 57 cm és 125 cm; b) 69 háromszög; c) egy egyenlő szárú van (c = 91).
3. **Átlók egy csúcsból:** 23°, 42°, 30°, 47°, 8° ⇒ 4 átló ⇒ hétszög; 900°/150° = 6.

### Feladatok (a modulban feldolgozva)
- **A1.** 7 órakor 150°, fél 4-kor 75°. **A2.** D külső szöge 50°. **A3.** 5 cm-es kocka: 5 cm; 0; 5 cm; 0. **A4.** A, B, C igaz.
- **A5.** 12°. **A6.** 12-szög, 9 átló egy csúcsból. **A7.** 78,5° és 101,5°. **A9.** átmérő 16 cm. **A10.** 13-szög, ≈ 152,31°. **A11.** van (3,8 + 2,9 > 6,4). **A12.** 15° és 75°; 78,5° és 101,5°.

> **⚠️ CSAPDA:** a háromszög-egyenlőtlenségnél azonos mértékegységben számolj; a külső szög a két NEM mellette fekvő belső szög összege.

> **Megjegyzés:** a mappa korábbi README-je nem létezett; a tartalom a tankönyvi blokk alapján készült.

---

## 💻 Elkészített Komponensek

1. **`ElementaryGeometrySummaryFigures.tsx`**:
   - `DistanceTypesSvg`: pont–egyenes, pont–sík, párhuzamos egyenesek távolsága (derékszög negyedkörívvel, ponttal).
   - `AnglePairsSvg`: egyállású, csúcs-, váltó- és mellékszögek két párhuzamos egyenesnél.
   - `CircumIncircleSvg`: köré írt kör (K) és beírt kör (O) szerkesztése.
   - `OrthoCentroidSvg`: magasságpont (M) és súlypont (S).
   - `QuadrilateralFamilySvg`: a négyszögek családfája.
   - `RightTriangleBisectorSvg`: 1. kidolgozott feladat ábrája.
   - `PolygonDiagonalsSvg`: 3. kidolgozott feladat – hétszög átlói egy csúcsból.
2. **`ElementaryGeometrySummaryTheory.tsx`**: D/T/M táblázatok (térelemek, háromszög), négyszögek és sokszögek, 3 kidolgozott feladat, a feladatsor eredményei, csapda.
   - **I. Laboratórium:** húzható csúcsú háromszög K, O, M, S pontokkal, körökkel, szögekkel és típus-/helyzetkijelzéssel.
   - **II. Laboratórium:** szabályos n-szög (3–20) átlókkal, szögösszeggel és egy szög nagyságával.
3. **`ElementaryGeometrySummaryMatcher.tsx`**: 3 szint × 8 pár (fogalmak; sokszögek adatai; feladatok eredményei).
4. **`ElementaryGeometrySummarySorter.tsx`**: 3 szint × 3 kategória × 9 elem (szögpárok kapcsolata; nevezetes pont helye; négyszögtípusok).
5. **`ElementaryGeometrySummaryQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 9 kérdésábrával, 3 puskakártyával.
- `sumKit.tsx`: belső rajz- és geometriai segédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-sum-elemi-geometria-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic4ElementaryGeometrySummary.test.tsx` fájlban található, a 4 komponenst és mind a 7 SVG ábrát ellenőrzi.
