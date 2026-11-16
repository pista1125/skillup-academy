# 7. A gömb felszíne és térfogata (tankönyv 7. lecke, 18–19. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 18–19. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a térgeometria fejezet **7.** leckéje. Kiegészítő feladatanyag: a tankönyv 8. leckéje (Gyakorlás, 20–21. oldal: kazán, bögre és vasgolyó, Arkhimédész-Ráadás).

---

## 🎯 Tananyag Áttekintés

A lecke két kérdéssel indul: (1) a görögdinnye 90–95%-a víz, átlagsűrűsége ≈ a vízé – mekkora egy dinnye térfogata, tömege, átmérője? (2) Hány 1 mm sugarú sörét önthető egy 2 cm sugarú ólomgolyóból, és hányszoros lesz a felszínük? A megoldáshoz a gömb felszín- és térfogatképlete kell.

---

## 📐 Fő Képletek

- A gömbfelület **nem teríthető ki síkba**; felsőbb matematikai módszerekkel igazolható, hogy az r sugarú gömb
  $$A = 4r^2\pi, \qquad V = \frac{4r^3\pi}{3}.$$
- (A tankönyv ebben a leckében nem vezeti le a képleteket; Cavalieri-elv és gömbszelet-képletek NEM szerepelnek.)
- **Arkhimédész (8. lecke, Ráadás):** a gömb felszíne a köré írt henger palástjával egyenlő (2rπ · 2r = 4r²π), térfogata a henger térfogatának kétharmada (2/3 · 2r³π).

### Kidolgozott feladatok
- **1. a)** 8 kg-os dinnye ⇒ ≈ 8 dm³. **b)** d = 20 cm ⇒ V ≈ 4189 cm³ ≈ 4,2 dm³ ⇒ ≈ 4,2 kg. **c)** 8 dm³ ⇒ r³ = 6/π ≈ 1,91 ⇒ r ≈ 1,24 dm ⇒ d ≈ 25 cm.
- **2. a)** (20 mm / 1 mm)³ = 8000 sörét. **b)** a felszínek aránya 8000 · 4 · 1²π / (4 · 20²π) = 20.

### Tankönyvi feladatok
- **1.** 24 cm-es dinnye: 1 cm-es héj ⇒ ≈ 77,0 %, 2 cm-es héj ⇒ ≈ 57,9 % ehető.
- **2.** 20 cm-es dinnye fele, héj 1–2 cm, 30 kcal / 100 g ⇒ ≈ 322–458 kcal (≈ 1394–1985 kJ).
- **3.** 53 kg-os dinnye ⇒ átmérő ≈ 46,6 cm; 2 cm-es héjjal az ehető rész ≈ 40,5 kg.
- **4.** 10 db 30 mm-es buborék ≈ 282,7 cm²; egyesítve R = 15 · ∛10 ≈ 32,3 mm, A ≈ 131,2 cm².
- **HF 1.** 36 cm-es dinnyék: ≈ 84,2 % és ≈ 70,2 % ehető (≈ 14 százalékpont különbség).
- **HF 2.** 4 cm + 3 cm sugarú gyertya ⇒ r = ∛91 ≈ 4,50 cm; a régi felszínek összege az új ≈ 123,6 %-a.
- **HF 3.** A Föld felszíne ≈ 5,1 · 10⁸ km², a víz ≈ 3,6 · 10⁸ km².
- **HF 4.** Mars: V-arány 0,151 ⇒ A-arány 0,151^(2/3) ≈ 0,28.
- **Gyakorlás (8. lecke) 4.:** félgömb végű kazán (d = 4 m, M = 3,5 m): A = 30π ≈ 94,2 m², V = 74π/3 ≈ 77,5 m³; **3. c)** 3 cm-es vasgolyó a 7,2 cm-es bögrében ⇒ ≈ 3,5 mm emelkedés.

> **⚠️ CSAPDA:** az átmérőt sugárként használva a térfogat 8-szoros lesz; a felszín a sugár négyzetével, a térfogat a köbével arányos.

---

## 💻 Elkészített Komponensek

1. **`SphereAreaVolumeFigures.tsx`**:
   - `SphereFormulaSvg`: A = 4r²π (4 főkör) és V = 4r³π/3.
   - `MelonMassSvg`: a 20 cm-es dinnye térfogata és tömege.
   - `LeadShotSvg`: ólomgolyó és sörétek (8000 db, 20-szoros felszín).
   - `MelonRindSvg`: a héj és az ehető rész aránya.
   - `ArchimedesSvg`: gömb a köré írt hengerben.
   - `BoilerSvg`: félgömb végű kazán.
2. **`SphereAreaVolumeTheory.tsx`**: bevezető, képletek, értéktáblázat, Arkhimédész, kidolgozott feladatok, csapda.
   - **I. Laboratórium:** forgatható 3D gömb + köré írt henger (`Solid3DViewer`), sugár-csúszka, felszín = palást, V-arány 2 : 3.
   - **II. Laboratórium:** dinnyekalkulátor (átmérő, héjvastagság ⇒ ehető %, tömeg, energia).
3. **`SphereAreaVolumeMatcher.tsx`**: 3 szint × 8 pár.
4. **`SphereAreaVolumeSorter.tsx`**: 3 szint × 3 kategória × 9 elem (hossz / terület / térfogat; 2× / 4× / 8×; igaz / hamis / adatfüggő).
5. **`SphereAreaVolumeQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdésábrákkal, 3 puskakártyával. Haladás-azonosító: `g12-ter-gomb-felszin-terfogat-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic1SphereAreaVolume.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
