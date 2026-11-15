# 8. A szinusztétel (8. lecke, 26–27. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 26–27. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke a pozsonyi **Új Híd (Nový Most)** egypilléres kábelhídjából indul: a pillér kb. 109°-os szögben dől hátra, lábától 200 m-re van a leghosszabb tartókábel rögzítése, a kábel 16°-os szöget zár be a híddal. A háromszög szögei 109°, 16° és 55°. A területet kétféleképpen felírva (T = 200 · c · sin 109° / 2 = b · c · sin 55° / 2) adódik b · sin 55° = 200 · sin 109°, azaz **b ≈ 231 m**. Átrendezve b / 200 = sin 109° / sin 55° – két oldal aránya a szemközti szögek szinuszának aránya.

---

## 📐 Fő Tétel és Használata

- **Szinusztétel:** a háromszögben két oldal hosszának aránya egyenlő a velük szemben lévő szögek szinuszának arányával:
  $$\frac{a}{b} = \frac{\sin\alpha}{\sin\beta}$$
- **Bizonyítás:** $\frac{a c \sin\beta}{2} = \frac{b c \sin\alpha}{2}$; 2-vel szorozva és $(b c \sin\beta)$-val osztva.
- **Mikor használjuk?**
  - ismert két szög és egy oldal, egy másik oldalt keresünk;
  - ismert két oldal és az egyikkel szemközti szög, a másikkal szemközti szöget keressük (**vigyázat:** egy szinuszérték hegyesszöghöz és tompaszöghöz is tartozhat – lásd 9. lecke).

### Tankönyvi feladatok
- **1.** A pillér: c = 200 · sin 16° / sin 55° ≈ 67,3 m.
- **2.** További kötelek (41°, 24°): ABP háromszög (109°, 41°, 30°) ⇒ e ≈ 97,0 m, BP ≈ 51,3 m; ABQ háromszög (109°, 24°, 47°) ⇒ d ≈ 156,4 m, BQ ≈ 121,0 m; PQ ≈ 69,7 m, QC ≈ 79,0 m. (Értelmezés: a 41°, 24°, 16° a kötelek és a pálya B felőli szöge.)
- **3.** Hajó: 100 m-es parti szakasz, α ≈ 74°, β ≈ 52° ⇒ hajónál 54°, oldal 100 · sin 52° / sin 54° ≈ 97,4 m, távolság ≈ 97,4 · sin 74° ≈ 93,6 m.
- **4.** a + b = 20 cm, α = 67°, β = 48° ⇒ a ≈ 11,07 cm, b ≈ 8,93 cm, c ≈ 10,90 cm, T ≈ 44,8 cm².
- A házi feladatokat (háromszögek ábrával, Pista csónakja) az ábrák hiányában nem dolgoztuk fel.

> **⚠️ CSAPDA:** Az oldalak a szemközti szögek **szinuszával** arányosak, nem magukkal a szögekkel: b / 200 = 109 / 55 hibás (≈ 396 m), helyesen b / 200 = sin 109° / sin 55° (≈ 231 m). Mindig oldal ↔ szemközti szög párokat használj.

---

## 💻 Elkészített Komponensek

1. **`SineLawFigures.tsx`**:
   - `NewBridgeSvg`: az Új Híd háromszöge (200 m, 109°, 16°, 55°), méretarányosan.
   - `BridgeCablesSvg`: a három tartókötél (e, d, b) és a B, P, Q, C pontok.
   - `SineLawProofSvg`: a szinusztétel ábrája a közös magassággal (derékszög jelölése: negyedkörív ponttal).
   - `ShipDistanceSvg`: a hajó távolsága a parttól (100 m, 74°, 52°).
   - `SideSumTriangleSvg`: a + b = 20 cm, 67° és 48° (4. feladat).
2. **`SineLawTheory.tsx`**: bevezető, tétel és bizonyítás, Új Híd feladatok táblázattal, hajó és oldalösszeg feladat, csapda.
   - **I. Laboratórium:** α, β és c csúszka – a, b élőben, az oldal / szinusz hányados mindhárom oldalra egyenlő; kitekintésként a köré írt kör (2R).
   - **II. Laboratórium:** távolságmérés a partról – alap és két szög csúszkával, lépésenkénti számolással.
3. **`SineLawMatcher.tsx`**: 3 szint × 8 pár (fogalmak, oldalarányok, számolások).
4. **`SineLawSorter.tsx`**: 3 szint × 3 kategória (szinusztétel / derékszögű / szögösszeg; a > b / a = b / a < b; igaz / hamis / adatfüggő).
5. **`SineLawQuiz.tsx`**: 30 kérdés 3 szinten, 3 puskakártyával.

Progress ID-k: kvíz `g11-trig-szinusztetel-quiz`, párosító `g11-trig-szinusztetel-matcher`, csoportosító `g11-trig-szinusztetel-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic1SineLaw.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
