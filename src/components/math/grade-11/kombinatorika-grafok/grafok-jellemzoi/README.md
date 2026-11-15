# 23. Gráfok jellemzői (23. lecke, 70–71. oldal)

A magyar Oktatási Hivatal hivatalos tankönyve (`OH-MAT11TA`, Matematika 11., 70–71. oldal) alapján kidolgozott oktatási modul.

---

## 🎯 Tananyag Áttekintés

A lecke Harry Beck londoni metrótérképével indul (1931-ben elutasították, 1933-ban 500 kísérleti példánya egy óra alatt elfogyott): a föld alatt utazót nem a valós földrajz érdekli, hanem az, hol kell átszállni és hányadik megállónál kell leszállni. Ez a gráfok alapgondolata – csak az számít, egy halmaz **mely elemei között van kapcsolat**. Alkalmazások: ismeretségek, közösségi oldalak, családfa, térképek és utak, repülőjáratok, munkafolyamatok, logisztika, mérkőzések, kémiai kötések, színezési problémák.

---

## 📐 Fogalmak és megjegyzések

| Fogalom | Jelentés |
|---|---|
| **Csúcsok** | a gráf pontjai, a halmaz elemeit jelzik |
| **Élek** | a csúcsokat összekötő vonalak, az elemek közötti kapcsolatokat szemléltetik |
| **Csúcs fokszáma** | az adott csúcsból kiinduló élek száma |

- Egy gráf **sokféle módon lerajzolható**: az élek lehetnek szakaszok vagy görbék, csak az a fontos, melyik csúcs melyikkel van összekötve.
- Az él mindig **csúcstól csúcsig** tart (két él keresztezése nem csúcs).
- A **hurokél** (azonos kezdő- és végpont) a csúcs fokszámát **2-vel** növeli.

### Feladatok (tankönyv)
- **1.** Metrótérképes útvonalkeresés (5 megállós jegy, kevés átszállás, menetidő 3 perc / megálló + 7 perc / átszállás).
- **2. (2008)** Öt falu, négy út, ebből kettő kész: a további kettőt úgy kell berajzolni, hogy bárhonnan bárhová el lehessen jutni (az utak nem zárhatnak be kört).
- **3. (2010)** Hatpontú gráfba 2 él berajzolása úgy, hogy minden csúcs fokszáma 2 legyen (a végén 6 él).
- **4. (2009)** Négytagú csoport, mindenkinek pontosan két ismerőse van ⇒ négyszög (A–B–C–D–A), 4 él.
- **5. (2019 alapján)** Múzeum: csúcsok = termek, élek = átjárók; minden termen pontosan egyszer (csúcsok bejárása), illetve minden ajtón pontosan egyszer (élek bejárása).
- **HF 1. (2005)** Sakkdöntő 5 versenyzővel: egy mindenkit ismer, a többiek 2-2 embert ⇒ fokszámok 4, 2, 2, 2, 2, **6 ismeretség** (pl. A–B, A–C, A–D, A–E, B–C, D–E).
- **HF 2. (2005)** 6 csapat bajnoksága gráffal; a teljes bajnokság C(6; 2) = 15 mérkőzés.
- **HF 3–4.** Gráf rajzolása: 6 csúcs, fokszámösszeg 16 (8 él); 6 csúcs, fokszámok 1, 1, 1, 2, 3, 4 (6 él); 5 csúcs, fokszámok 4, 3, 3, 2, 2 (7 él); fokszámösszeg 12 (6 él); 7 él, minden fokszám ≤ 3 (5 és 6 csúcson is lehetséges).

> **⚠️ CSAPDA:** A rajz sajátosságai (élek keresztezése, a csúcsok helye, az élek hossza) nem a gráf tulajdonságai. A négyszög és a „csokornyakkendő” alakú rajz ugyanaz a 4 csúcsú, 4 élű gráf.

> **Megjegyzés:** A tankönyvi ábrák (metrótérkép, falvak, hatpontú gráf, múzeum alaprajza, a 6 csapat gráfja) a szövegkivonatból nem rekonstruálhatók, ezért a modul ábrái saját, a feladatokat szemléltető rajzok; a konkrét ábrától függő végeredményeket (pl. HF 2. hátralévő mérkőzései) nem közöljük.

---

## 💻 Elkészített Komponensek

1. **`GraphPropertiesFigures.tsx`**:
   - `SameGraphTwoDrawingsSvg`: ugyanaz a gráf „térképszerűen” és sémaként (Beck ötlete).
   - `GraphTermsSvg`: csúcs, él, fokszám, hurokél (+2), izolált csúcs; fokszámösszeg 10 = 2 · 5.
   - `FourFriendsCycleSvg`: a 4 tagú csoport kétféle rajza (négyszög és keresztező élekkel).
   - `VillageRoadsSvg`: öt falu, négy út – egy lehetséges megoldás.
   - `ChessFinalGraphSvg`: a sakkdöntő ismeretségi gráfja (4, 2, 2, 2, 2).
2. **`GraphPropertiesTheory.tsx`**: bevezető, fogalmak táblázata, rajzolási megjegyzések, érettségi feladatok és házi feladatok megoldási ötletei, csapda.
   - **I. Laboratórium – Gráfszerkesztő:** csúcs hozzáadása/elvétele (2–8), él be/ki kattintással, hurokél, élő fokszámlista, fokszámösszeg = 2 · élszám ellenőrzés, páratlan fokú csúcsok száma; előbeállítások (4 ismerős, sakkdöntő, teljes gráf, hurokél).
   - **II. Laboratórium – Létezik ilyen gráf?:** fokszámsorozat beírása, paritás- és maximumvizsgálat, Havel–Hakimi-konstrukcióval meg is rajzolja az egyszerű gráfot; tankönyvi előbeállítások.
3. **`GraphPropertiesMatcher.tsx`**: 3 szint × 8 pár (fogalmak, fokszámok ↔ élszám, létezés).
4. **`GraphPropertiesSorter.tsx`**: 3 szint × 3 kategória × 9 elem (csúcs / él / fokszám; létezik / páratlan összeg / más ok; igaz / hamis / gráftól függ).
5. **`GraphPropertiesQuiz.tsx`**: 30 kérdés 3 szinten, kérdéstípus-címkékkel és 7 kérdésnél gráfábrával, 3 puskakártyával (progress id: `g11-comb-grafok-jellemzoi-quiz`).

---

## 🧪 Tesztelés

A modul unit tesztje a `src/test/grade11Topic2GraphProperties.test.tsx` fájlban található: a 4 komponens és mind az 5 SVG ábra renderelése, valamint a gráfszerkesztő élhozzáadásának ellenőrzése.
