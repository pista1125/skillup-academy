# 8. Kivonás 0-tól 5-ig (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 62–66. o., OH-MAT01MA_I 34–37. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 62: tányér 5 almával, a gyerekek elvesznek kettőt – „Így írjuk: 5 − 2 = 3, így mondjuk: 5-ből 2 egyenlő 3, ez a művelet a kivonás”; képek kivonásokkal (galambok elrepülnek, kacsák, cicák); dominóképek áthúzott pöttyökkel. TK 63: „eggyel kevesebb” körte; ágról lehulló levelek két kérdéssel (hány maradt / hány esett le); kétszínű korongok két kivonással. TK 64: kivonás-kártyák képekhez, előtte–utána képek (megevett szilva, alma, paprika), képekről kivonások. TK 65: kivonások összekötése a számegyenessel, számolás (köztük 3 − 3, 5 − 0, □ = 5 − 2 alak), rajzolás műveletekhez. TK 66: képekről összeadás és kivonás (1 + 4, 5 − 1, 5 − 4), a képhez nem illő műveletek áthúzása, „eggyel kevesebb” táblázat. MF 34–37: összeadás és kivonás képekről, mókus és gesztenyék áthúzással, almafa – kosár, megevett gyümölcsök, kivonás-gyakorlósor 5-ig, „eggyel kevesebb” táblázat.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`Kivonas0Tol5IgG1Mese`, 12 oldal, 6 mini-feladat): Pötyi 5 epret szed, Csigusz megeszik 2-t – a zöld kalapjuk marad; „5 − 2 = 3” és a mínusz jel; áthúzás a tízes kereten; elrepülő madár; Zümi méhbarátai elrepülnek (melyik kivonás illik?); 3 − 0 = 3 (semmi sem megy el); 2 − 2 = 0 (mindet megette); áthúzott korongok; visszalépés a számegyenesen; melyik kép illik a 4 − 1-hez.
- **Játszótér** (`CrossOutPlayground`): Pötyi kér egy kivonást (1–5-ből 0–5 elvétele); a gyerek koppintással áthúzza a kért számú tárgyat, aztán a 0–5 számgombokkal megmondja, mennyi maradt. A 0 elvétele és a „mindet elvesszük” is előfordul.
- **Játék** (`Kivonas0Tol5IgG1Jatek`): Kérdések 3 × 8 (`KIVONAS_0_TOL_5_IG_G1_QUESTIONS`: elrepül, megeszik, elveszi, áthúzás, mínusz jel, kép ↔ kivonás, 0 elvétele, mindet elvesszük, visszalépés a számegyenesen, hány esett le, jelek, kakukktojás, két lépés, eggyel kevesebb), Párosító 3 szint (`KIVONAS_0_TOL_5_IG_G1_PAIRS`: áthúzott kép ↔ maradék, kivonás ↔ tízes keret, kivonás ↔ eredmény), Válogató 3 szint (`KIVONAS_0_TOL_5_IG_G1_SORT`: maradt / semmi sem maradt; eredmény 1–2–3; kevesebb lett / ugyanannyi maradt).

Fájlok: `Kivonas0Tol5IgG1Scenes.tsx` (FlyAwayScene, PicnicScene, PlateScene, SentenceScene, SentenceStrip, BackJumpScene, BranchScene), `Kivonas0Tol5IgG1Parts.tsx`, `Kivonas0Tol5IgG1Mese.tsx`, `Kivonas0Tol5IgG1Jatek.tsx`, `index.ts` (a dobozokat az `a-ketto/AKettoG1Scenes.tsx`-ből, a három barát képét az `a-harom`-ból veszi). Teszt: `src/test/grade1Topic2Kivonas0Tol5IgG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját mese és tárgyak: a könyv gyerekszereplői, galambjai, cicái helyett Pötyi epres pikniké, Csigusz (megeszi), Zümi méhbarátai és a kerítésen ülő madarak (elrepülnek).
- A könyv „Így mondjuk: 5-ből 2 egyenlő 3” mondata helyett természetesebb felolvasott alak: „5-ből elvettünk 2-t, maradt 3”; a gép a jelet „elvéve”-ként olvassa.
- A „□ = 5 − 2” fordított alakot és a nyitott mondatos (□) feladatokat kihagytuk (a □ a saját leckéjében jön); a „hány esett le?” (hiányzó kivonandó) kérdés képpel, a földön látható levelekkel szerepel, mint a könyv 63. oldalán.
- A rajzolós és színezős feladatok (rajzolj a művelethez, húzd át a nem illőt írással) koppintós változatot kaptak: „melyik kép / melyik kivonás illik?”, kakukktojás.
- Az „eggyel kevesebb” táblázatból egyetlen képes kérdés lett (Pötyi 5 epre, Csigusznak eggyel kevesebb).
- A számegyenesen a kivonás visszalépésként (ívek a kisebb számok felé) jelenik meg; a könyv 65. oldala csak összeköti a kártyát a ponttal.
