# 13. Visszatevéses mintavétel (tankönyv 63. lecke, 196–199. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 196–199. oldal) alapján kidolgozott oktatási modul. A diákzónában az V. fejezet (Statisztika és valószínűségszámítás) 13. leckéje.

---

## 🎯 Tananyag Áttekintés

**Bevezető:** az olyan adatokat, hogy valaki 0,7 valószínűséggel rúgja be a tizenegyest, vagy egy gép 0,02 valószínűséggel termel selejtet, nagy elemszámú statisztikai minták elemzésével kapjuk – a statisztika szolgáltatja a valószínűségszámítás értékeit.

---

## 📐 Elmélet

- **Visszatevéses mintavétel:** minden választás pontosan ugyanazok közül az elemek közül történik (a kiválasztott elemet visszatesszük, vagy ki sem vesszük, csak megvizsgáljuk).
- **Miért alkalmazzák?** Közvélemény-kutatásnál és minőség-ellenőrzésnél egyszerűbb, gazdaságosabb. Nagy elemszámnál (pl. 100 000 elemből 200) a visszatevéses és a visszatevés nélküli mintavétel valószínűségei közel egyenlők.
- **Ugyanazt többször:** minden lépésben ugyanaz a helyzet ismétlődik, ezért matematikailag azonos a független kísérletek ismétlésével (12. lecke).
- **Példa:** 5 független kísérlet, p = 0,8, pontosan 3 sikeres: a 3 siker helye (5 alatt 3) = 10-féle, mindegyik valószínűsége 0,8³ · 0,2², így P = 10 · 0,8³ · 0,2² = 0,2048 ≈ 0,205.
- **Általánosan:** n kísérletből pontosan k sikeres: **(n alatt k) · pᵏ · (1 − p)ⁿ⁻ᵏ**. Ezeket a valószínűségeket **binomiális eloszlásnak** nevezik.
- Szélső esetek: (n alatt 0) = (n alatt n) = 1, (n alatt 1) = n.

### Kidolgozott feladat (198. o.)
Ferkó lövései 0,15 valószínűséggel találnak, ötször lő:

| találat | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| valószínűség | ≈ 0,4437 | ≈ 0,3915 | ≈ 0,1382 | ≈ 0,0244 | ≈ 0,0022 | ≈ 0,0001 |

A legvalószínűbb a 0 találat (44%), de majdnem ugyanennyi az 1 találat (39%). Az összeg (kerekítés nélkül) 1.

### Tankönyvi feladatok (ellenőrzött eredmények)
- **1.** Tünde 3 palacsintája (elszakad 0,2): 0 → 0,512; 1 → 0,384; 2 → 0,096; 3 → 0,008.
- **2.** 8 kockadobás: a) pontosan 2 hatos ≈ 0,2605; b) pontosan 3 hatos ≈ 0,1042.
- **3.** Gép, p = 0,03, 15 termék: a) pontosan 1 selejtes ≈ 0,2938; b) pontosan 2 ≈ 0,0636; c) 1 vagy 2 ≈ 0,3574.
- **4.** 10 érmedobás, egyenlő számú fej és írás: (10 alatt 5)/2¹⁰ = 252/1024 ≈ 0,246 – Jocó 0,5-ös érvelése hibás.
- **HF 1.** Hiányzó együtthatók: (10 alatt 2) = 45 → ≈ 0,0746; (7 alatt 4) = 35 → ≈ 0,1147; (6 alatt 3) = 20 → ≈ 0,0536.
- **HF 2.** Rulett (18 piros, 18 fekete, 1 zöld), 6 pörgetés: a) (18/37)⁶ ≈ 0,0133; b) (1/37)⁶ ≈ 3,9 · 10⁻¹⁰; c) első 4 piros, utána 2 fekete: (18/37)⁶ ≈ 0,0133; d) pontosan 4 piros: (6 alatt 4) · (18/37)⁴ · (19/37)² ≈ 0,2216.

> **⚠️ CSAPDA:** lemarad a binomiális együttható – 0,8³ · 0,2² = 0,02048 csak egyetlen sorrend valószínűsége; a helyes válasz 10-szer ekkora. Rögzített sorrendnél viszont (HF 2. c) nem kell együttható.

---

## 💻 Elkészített Komponensek

1. **`SamplingWithReplacementFigures.tsx`**:
   - `SamplingWithReplacementUrnSvg`: húzás – feljegyzés – visszatevés körfolyamat (10 golyó, 3 piros).
   - `SamplingWithReplacementArrangementsSvg`: 5 kísérletből 3 siker 10 elrendezése, P ≈ 0,205.
   - `SamplingWithReplacementFormulaSvg`: a binomiális képlet magyarázó feliratokkal.
   - `SamplingWithReplacementFerkoChartSvg`: Ferkó találatainak eloszlása (oszlopdiagram).
   - `SamplingWithReplacementCoinTenSvg`: 10 érmedobás fejszámának eloszlása, P(5 fej) ≈ 0,246.
2. **`SamplingWithReplacementTheory.tsx`**: bevezető, definíció, a binomiális képlet levezetése, kidolgozott feladat, tankönyvi és házi feladatok, csapda.
   - **I. Laboratórium – húzás urnából visszatevéssel:** golyószám, pirosak száma, húzások száma; 1 / 10 / 100 / 1000 minta szimulálása, relatív gyakoriság ↔ binomiális valószínűség összevetése.
   - **II. Laboratórium – binomiális kalkulátor:** n, k csúszka, p tizedestörtként vagy törtként; (n alatt k), pᵏ, (1 − p)ⁿ⁻ᵏ külön, a teljes eloszlás sávokkal; tankönyvi előbeállítások.
3. **`SamplingWithReplacementMatcher.tsx`**: 3 szint × 8 pár (fogalmak; binomiális együtthatók; helyzet ↔ valószínűség).
4. **`SamplingWithReplacementSorter.tsx`**: 3 szint × 3 kategória × 9 elem (mintavétel fajtája; kell-e együttható; valószínűség nagysága).
5. **`SamplingWithReplacementQuiz.tsx`**: 30 kérdés 3 szinten (10/10/10), kérdéstípus-címkékkel, urna-, kísérletsor- és oszlopdiagram-ábrákkal, 3 puskakártyával (progress id: `g11-stat-visszateveses-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic5SamplingWithReplacement.test.tsx` fájlban található, a 4 komponenst és mind az 5 SVG ábrát ellenőrzi.
