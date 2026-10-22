# 1. Hányféleképpen lehet? (9. osztály)

## Tananyag Áttekintés
A lehetőségek összeszámlálása, szisztematikus felsorolása, rendszerezési stratégiák (táblázatok, ágrajz / fadiagram), valamint az összeadási és szorzási szabály alkalmazása a középiskolai matematikában.

---

## Elkészült Interaktív Modulok

| Fájl | Modul Típus | Leírás |
| :--- | :--- | :--- |
| [`HowManyWaysTheory.tsx`](./HowManyWaysTheory.tsx) | **Elméleti Tananyag** | Részletes elmélet, interaktív menüválasztó és fadiagram szimulátor, számképző labor, tipikus csapdák, összehasonlító táblázat, 3 azonnali önellenőrző mini kvíz, PDF letöltés |
| [`HowManyWaysQuiz.tsx`](./HowManyWaysQuiz.tsx) | **Gyakorló Kvíz** | 30 válogatott feladat 3 nehézségi szinten, lépésről lépésre kidolgozott magyar magyarázatokkal, tippekkel, segédlet / képlettár popoverrel és integrált játékmódokkal |
| [`HowManyWaysMatcher.tsx`](./HowManyWaysMatcher.tsx) | **Párosító Játék** | 3 szinten 8-8 összetartozó pár (feladat-számítás, kódok, szabályok), hanghatások, combo bónusz, ranglista és profil mentés |
| [`HowManyWaysSorter.tsx`](./HowManyWaysSorter.tsx) | **Csoportosító Játék** | 3 szinten 12-12 elem kategorizálása (Szorzás vs. Összeadás vs. Mindkettő; Ismétléses vs. Ismétlés nélküli vs. Kötött; Eredmények nagyságrendje) |
| [`index.ts`](./index.ts) | **Központi Export** | A fenti 4 komponens tiszta re-exportja |

---

## Fő Témakörök és Fogalmak
- **Szisztematikus felsorolás:**
  - Esetek áttekinthető csoportosítása hiánytalanul és átfedés nélkül rögzített elv (pl. lexikografikus rend) alapján.
  - Esetek fája (fadiagram / döntési fa) felépítése: gyökér, szintek és kimenetelek (levelek).
- **A szorzási szabály (multiplikatív elv, ÉS kapcsolat):**
  - Ha az egyik döntést $n$, a másikat tőle függetlenül $k$ féleképpen hozhatjuk meg, akkor a döntéspár együttesen $n \cdot k$ féleképpen választható meg.
  - Általánosítás: $n_1 \cdot n_2 \dots n_m$.
- **Az összeadási szabály (additív elv, VAGY kapcsolat):**
  - Ha egymást kizáró (diszjunkt) eseteket vizsgálunk, a lehetőségek száma összeadódik: $n_1 + n_2 + \dots + n_m$.
- **Gyakorlati feladatok:**
  - Ruhadarabok párosítása, éttermi menük összeállítása, útvonalak száma városok között oda-vissza,
  - PIN kódok és számzár-kombinációk,
  - Többjegyű számok képzése (a 0 nem lehet az első helyen, paritási megkötések, 5-tel való oszthatóság),
  - Komplementer módszer alkalmazása (legalább 1 feltétel).
