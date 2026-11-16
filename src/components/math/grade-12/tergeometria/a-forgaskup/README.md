# 12. A forgáskúp (tankönyv: 13. lecke, 30–31. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 30–31. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **12.** leckéje.

---

## 🎯 Tananyag Áttekintés

A lecke a triangulumból (szabályos háromszög alakú ütőhangszer) indul: ha a felfüggesztése körül gyorsan forgatjuk, egy forgáskúpot látunk. A forgáskúpot egyenlő szárú háromszög szimmetriatengely körüli forgatásával származtatjuk; megismerjük részeit, a nyílásszöget és a tengelymetszetet.

---

## 📐 Fogalmak és összefüggések

- **Forgáskúp (egyenes körkúp):** egyenlő szárú háromszög forgatása a szimmetriatengelye körül. Határolja egy körlap (alapkör) és a kúppalást. Derékszögű háromszög egyik befogója körüli forgatásával is forgáskúp keletkezik.
- **Alkotó (a):** a csúcsot az alapkör pontjaival összekötő szakasz; minden alkotó egyenlő (= a háromszög szára).
- **Testmagasság (M):** a csúcsot az alapkör középpontjával összekötő, az alapsíkra merőleges szakasz (= a háromszög alaphoz tartozó magassága).
- Az alapkör átmérője = a háromszög alapja (2r).
- **Nyílásszög (φ):** a megforgatott háromszög szárszöge. **Tengelymetszet:** maga az egyenlő szárú háromszög.
- $a^2 = r^2 + M^2$, $\sin(φ/2) = r/a$, $\text{tg}(φ/2) = r/M$; az alkotó és az alaplap szöge $90° − φ/2$.
- **Ráadás – kúpszeletek:** a tengelyre merőleges sík kört, minden alkotót metsző ferde sík ellipszist, egy alkotóval párhuzamos sík parabolaívet, két alkotóval párhuzamos sík hiperbolaívet vág ki.

### Tankönyvi feladatok (eredmények)
- **2.** 20 cm-es triangulum: M = 10√3 ≈ 17,3 cm, K = 20π ≈ 62,8 cm, T = 100π ≈ 314,2 cm².
- **3.** Alkotó 24 mm, átmérő 2 cm ⇒ φ ≈ 49,2°.
- **4.** T = 1256,6 cm² (r ≈ 20 cm), M = K/4 ≈ 31,4 cm ⇒ φ ≈ 65,0°.
- **HF 1.** A: hamis, B: igaz, C: hamis, D: hamis.
- **HF 2.** Átfogó 51 cm, befogó 24 cm (másik 45 cm), a hosszabbik körül: φ ≈ 56,1°, T = 576π ≈ 1809,6 cm².
- **HF 3.** Alkotó 2 dm, φ = 40° ⇒ a háromszög kerülete ≈ 5,37 dm, területe ≈ 1,29 dm².
- **HF 4.** Kettős kúp (φ = 50°, T = 1964 cm²) ⇒ r ≈ 25,0 cm, a rombusz oldala ≈ 59,2 cm.

> **⚠️ CSAPDA:** a tengelymetszet felének derékszögű háromszögében csak a nyílásszög fele (φ/2) szerepel – a végén duplázni kell; átmérőből előbb sugarat kell számolni.

**Javítás a korábbi README-hez:** a tankönyv a forgáskúpot elsősorban egyenlő szárú háromszög szimmetriatengely körüli forgatásával definiálja, a testmagasság jele M; a lecke nem tárgyalja az „egyenlő oldalú kúp” külön fogalmát (csak a 60°-os nyílásszög esetét).

---

## 💻 Elkészített Komponensek

1. **`ConeFigures.tsx`**: `ConePartsSvg` (a kúp részei), `ConeFromTriangleSvg` (forgatás), `RightTriangleConeSvg` (1. feladat), `TriangulumSvg` (2. feladat), `ConicSectionsSvg` (kúpszeletek), `DoubleConeSvg` (HF 4.).
2. **`ConeTheory.tsx`**: bevezető, fogalmak, táblázat (háromszög ↔ kúp), derékszögű háromszög forgatása, kidolgozott feladatok, kúpszeletek, csapda.
   - **I. Laboratórium:** „Forgassunk meg egy háromszöget!” – a derékszögű háromszög forgatása 0–360°-ig (`Solid3DViewer`), r és M csúszkával.
   - **II. Laboratórium:** tengelymetszet-kalkulátor (r–M, a–r vagy a–φ megadásával).
3. **`ConeMatcher.tsx`**: 3 szint × 8 pár (fogalmak; összefüggések; tankönyvi feladatok).
4. **`ConeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (melyik forgástest; nyílásszög nagysága; kúpszeletek).
5. **`ConeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Aktivitás-azonosítók: `g12-ter-forgaskup-quiz`, `-matcher`, `-sorter`.

A rajzok a `../a-gula/SolidSketch.tsx` közös SVG-készletét használják.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1Cone.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
