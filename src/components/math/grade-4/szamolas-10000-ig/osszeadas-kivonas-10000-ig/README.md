# 11. Összeadás és kivonás 10 000-ig (tankönyv 45–47. oldal, munkafüzet I. 36–39. oldal)

A magyar Oktatási Hivatal tankönyve (`OH-MAT04TA`, Matematika 4., 45–47. oldal) és munkafüzete (`OH-MAT04MA_I`, 36–39. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke a **fejben (szóban) végzett** összeadást és kivonást tanítja a 10 000-es számkörben, **kerek ezresekkel és kerek százasokkal**. Az analógia: 3 + 4 = 7 → 300 + 400 = 700 → 3000 + 4000 = 7000; illetve 11 sz + 12 sz = 23 sz → 1100 + 1200 = 2300. Három gyerek három módszert mutat (3400 + 5700 és 8200 − 5300): Bence százasokkal (34 sz + 57 sz), Jancsi előbb az ezresekkel (3400 + 5000 + 700), Marci előbb a százasokkal (3400 + 700 + 5000). Az írásbeli összeadás és kivonás a III. fejezet anyaga.

---

## 📐 Fő tartalom

- **TK 45/1–2., MF 36/1–2.:** kerek ezresek: 10 000 felbontása ezresekre (Tóni és Teó), 3000 + 4000, 5000 − 2000; 4200 + 2300 = 6500.
- **TK 45/3.:** oszlopdiagram – Illatosrét (1000, 1000, 3000, 4000, 5000) és Tavirózsa (1000, 2000, 2000, 5000, 2000) vendéglő vendégei január–május.
- **TK 45/4.:** 11 sz + 12 sz = 23 sz; 1500 + 5300 = 6800; 9100 − 6700 = 2400.
- **TK 46/5–8.:** kovácsműhely táblázata (havi összegek), tagok csoportosítása (1200 + 2500 + 500 + 800 = 5000), a három módszer (3400 + 5700 = 9100), szörp: 3700 dl, 1200 dl-rel kevesebb mint júniusban → június 4900 dl, összesen 8600 dl.
- **TK 47/10–13.:** 8200 − 5300 = 2900 három módon; szálláshelyek (7700, 9200, 5800, 1900 fő); összegpiramisok (a: A = 900, B = 1200, C = 2000, D = 3600, E = 7900; b: csúcs 6100); sorozatok (−100, −200, −500, −1100).
- **MF 36–39.:** pótlás a nagyobb ezres szomszédig és 9000-ig, piramisok (3600 és 4800 m-es hegy), szülők életkora (6000 év), piac (1200 + 2000 + 800 + 1600 = 5600), alma-körte (1600 + 2300 = 3900 kg), nyitott mondatok, visszajáró (10 000 − 6200 = 3800), csillék (5000 − 3900 = 1100 kg).

> **⚠️ CSAPDA:** Kivonásnál ne fordítsd meg a százasokat (9100 − 6700 ≠ 3600, hanem 2400); összeadásnál ne felejtsd el az ezresátlépést (2600 + 4500 = 7100, nem 6100). „1200 dl-rel kevesebb, mint júniusban” → a júniusi a nagyobb, tehát összeadunk.

**Javítás a korábbi vázlathoz képest:** a régi README írásbeli algoritmust és LaTeX-jelölést írt a leckéhez – a tankönyv ezen az oldalon csak szóbeli (fejben végzett) számolást tanít kerek számokkal.

---

## 💻 Elkészített Komponensek

1. **`AddSub10000Figures.tsx`**:
   - `HundredsCoinsSvg`: 11 + 12 százas érme = 23 százas.
   - `ThreeWaysSvg`: Bence, Jancsi és Marci módszere a 3400 + 5700-ra.
   - `AddJumpsSvg` / `SubJumpsSvg`: ugrások a számegyenesen (3400 + 5000 + 700; 8200 − 5000 − 300).
   - `GuestsChartSvg`: a két vendéglő oszlopdiagramja.
   - `SumPyramidSvg`: összegpiramis (200, 700, 1100, 500 → 6100).
   - Segédelemek: `Coin100`, `JumpLine`, `PyramidDrawing`.
2. **`AddSub10000Theory.tsx`**: analógiák táblázata, százasokkal számolás, három módszer, kidolgozott példák (csoportosítás, szörp, diagram, piramis), csapda.
   - **I. Labor:** fejszámoló ugrásokkal – két kerek szám ±100/±1000 gombokkal, + vagy −, saját válasz ellenőrzése, Bence és Jancsi lépései, ugrások a számegyenesen.
   - **II. Labor:** összegpiramis – 4 tankönyvi/munkafüzeti piramis hiányzó mezőkkel, beírás és ellenőrzés.
3. **`AddSub10000Matcher.tsx`**: 3 szint × 8 pár (átlépés nélkül, ezresátlépéssel, pótlás és szöveges feladatok).
4. **`AddSub10000Sorter.tsx`**: 3 szint × 3 kategória (eredmény nagysága; átlépés van/nincs; eredmény 10 000 / 9000 / 8000).
5. **`AddSub10000Quiz.tsx`**: 30 kérdés 3 szinten (10/10/10), ábrákkal, 3 puskakártyával. Azonosító: `g4-count-osszeadas-10000-quiz`.

---

## 🧪 Tesztelés

A modul unit tesztje: `src/test/grade4Topic1AddSub10000.test.tsx` (4 komponens, 6 ábra, kérdésszám és -szerkezet).
