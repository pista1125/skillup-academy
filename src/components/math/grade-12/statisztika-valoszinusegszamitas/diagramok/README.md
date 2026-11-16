# 3. Diagramok (35. lecke, 80–83. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT12TA`, Matematika 12., 35. lecke, 80–83. oldal) alapján kidolgozott oktatási modul. A diákzónában ez a statisztika és valószínűségszámítás fejezet **3.** leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** egy mosópor-forgalmazó havi eladásainak oszlopdiagramján a függőleges tengely nem 0-tól indul, ezért erőteljes növekedésnek tűnik, pedig januártól júniusig csak 9114 kg-ról 9185 kg-ra (≈ 0,8%) nőtt az eladás. A 0-tól induló diagram arányos, de a kis növekedés alig látszik rajta.

---

## 📐 Elmélet

- **Félrevezető diagramok** (1–3. feladat): nem 0-tól induló tengely (mosópor, mozi bevétele), eltérő lépték (játszóterek vonaldiagramja két napilapban), csak kiválasztott évek ábrázolása (munkanélküliségi cikk).
- **A dobozdiagram (ismétlés):** az adatokat növekvő sorrendbe állítjuk (kiugró adatok kihagyhatók); minimum Q₀, maximum Q₄; medián Q₂; a mediánnal kettéosztunk (páratlan elemszámnál a mediánt elhagyjuk), a két rész mediánja Q₁ és Q₃. Négy, ≈ azonos számú adatot tartalmazó rész.
- **Terjedelem** = maximum − minimum; **félterjedelem** = Q₃ − Q₁ (a tankönyv elnevezése).
- **Kiugró adat:** a felső kvartilisnél a félterjedelem másfélszeresénél többel nagyobb, vagy az alsó kvartilisnél ennél többel kisebb adat. A bajusz az utolsó, még nem kiugró adatig tart; a kiugró adatok különálló pontok.

### Tankönyvi feladatok (a modulban feldolgozva)
- **Kidolgozott feladat (Tamás úszó):** Q₀ = 50,59; Q₁ = 50,62; Q₂ = 50,7; Q₃ = 50,76; Q₄ = 50,81 s. a) 50,59 s; b) nem; c) nem; d) lehetséges, pl. a tankönyvi 11 elemű adatsor (összeg 557,81, átlag 50,71).
- **4.** Milák Kristóf, 200 m pillangó 2022: elődöntő Q₁ = 114,105, Q₂ = 114,41, Q₃ = 114,83 s, alsó határ ≈ 113,02 s → 1:52,39 kiugró; döntő Q₁ = 113,49, Q₂ = 114,605, Q₃ = 115,36 s, alsó határ 110,685 s → 1:50,34 kiugró.
- **5.** Beamon 1968: Q₁ = 7,8; Q₂ = 7,94; Q₃ = 8,105 m; felső határ 8,5625 m → 8,90 m kiugró, a bajusz 8,19 m-ig tart.
- **HF 1.** Góllövőlista: Q₁ = 11, Q₂ = 13, Q₃ = 15, felső határ 21 → a 31 gól kiugró.
- **HF 3.** Februári létszámnyilvántartás: pihenőnapokra az előző munkanap létszáma; gyakoriságok 35: 3, 36: 1, 37: 6, 38: 4, 39: 7, 40: 5, 41: 2 nap; kördiagram; átlagos állományi létszám 1070 / 28 ≈ 38,2 → 38 fő.
- A 1–3. feladat (játszóterek, mozi, munkanélküliség) és a HF 2. (szabadulószoba) számadatai csak az ábrákról olvashatók le; ezeket elvi szinten (a félrevezetés módja) dolgoztuk fel. A bevezető mosópor-diagram közbülső havi értékei a modulban szemléltetők (csak a januári és a júniusi adat szerepel a szövegben).

> **⚠️ CSAPDA:** páratlan elemszámnál a mediánt nem számoljuk bele a két félbe (3; 5; 7; 8; 10; 12; 15 → Q₁ = 5, nem 6); kiugró adatnál a bajusz nem a maximumig tart.

---

## 💻 Elkészített Komponensek

1. **`StatDiagramsFigures.tsx`**:
   - `DetergentMisleadingSvg`: félrevezető (9100-tól induló) és arányos (0-tól induló) oszlopdiagram.
   - `BoxPlotAnatomySvg`: a dobozdiagram öt adata, terjedelem, félterjedelem.
   - `SwimmerBoxPlotSvg`: Tamás edzésidőinek dobozdiagramja.
   - `BeamonOutlierSvg`: az 1968-as távolugródöntő dobozdiagramja a kiugró 8,90 m-rel és a felső határral.
   - `MilakBoxPlotsSvg`: az elődöntő és a döntő dobozdiagramja kiugró adatokkal.
   - `StaffPieSvg`: a februári napi létszámok kördiagramja.
2. **`StatDiagramsTheory.tsx`**: bevezető, félrevezető diagramok táblázata, kidolgozott feladat, a dobozdiagram készítése, kiugró adat, sportos feladatok, létszámnyilvántartás, csapda.
   - **I. Laboratórium:** dobozdiagram-készítő – tetszőleges adatsor (tankönyvi előbeállításokkal), Q₀–Q₄, terjedelem, félterjedelem, határok, kiugró adatok és élő dobozdiagram.
   - **II. Laboratórium:** „Hol kezdődjön a tengely?” – csúszkával állítható tengely-kezdőérték, látszólagos és valódi arány/növekedés.
3. **`StatDiagramsMatcher.tsx`**: 3 szint × 8 pár (fogalmak; egy adatsor jellemzői; tankönyvi adatok).
4. **`StatDiagramsSorter.tsx`**: 3 szint × 3 kategória × 9 elem (diagramtípusok; dobozdiagram negyedei; kiugró adat-e).
5. **`StatDiagramsQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), 13 kérdésábrával, 3 puskakártyával.
- `statKit.tsx`: belső rajzsegédek (nem exportáljuk az `index.ts`-ből).

Aktivitás-azonosítók: `g12-stat-diagramok-quiz` / `-matcher` / `-sorter`.

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade12Topic3StatDiagrams.test.tsx` fájlban található, a 4 komponenst és mind a 6 SVG ábrát ellenőrzi.
