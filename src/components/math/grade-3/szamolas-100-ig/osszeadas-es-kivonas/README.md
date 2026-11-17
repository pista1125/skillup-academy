# 2. Összeadás és kivonás (3. osztály, I. Számolás 0-tól 100-ig)

**Források:** tankönyv OH-MAT03TA 8–10. oldal, munkafüzet OH-MAT03MA I. kötet 8–12. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 8.:** műveletek képről (levelek, bogarak), kerek tízesek összeadása, a műveletek részeinek neve (tag, összeg; kisebbítendő, kivonandó, különbség), a tagok felcserélhetősége, ellenőrzés; kétjegyű + egyjegyű oszloponként (tízesátlépés nélkül és tízesátlépéssel); sorozatok szabálya (+7, −11).
- **TK 9.:** a 28 + 44 háromféle kiszámítása (28 + 40 + 4; 28 + 4 + 40; 28 + 2 + 42), oszlopos gyakorlás; számkártyák és nyitott mondat (20 < □ < 30); kutyus–tál–csont párosító (kivonások).
- **TK 10.:** különbségek oszloponként; a 64 − 28 kétféle kiszámítása (64 − 20 − 8; 64 − 8 − 20); adj hozzá 19-et / vegyél el 16-ot / egészítsd ki 100-ra; hiányzó számok betűkkel.
- **MF 8–12.:** kerek tízesek, pénztárcák (100 Ft többféleképpen, áthúzás 80 Ft-ig), 100 tanuló az udvaron és az épületben, rudak képéről összeadás, tízesátlépés számegyenessel (19 + 1 + 1, 23 − 3 − 2), ugróiskola, sorozatok, érmék áthúzása, kecskék–nyulak 39 répa, padtárs-párosító, szabálytáblázat (□ − △ = ○), bűvös négyzetek, számpiramis, szöveges feladatok, „melyik számra gondoltam?”.

## Mit csinál a DiákZóna lecke?

Saját számokkal gyakoroltatja: kerek tízesek (10 forintosokkal), a műveletek részeinek neve, felcserélhetőség, ellenőrzés, tízesátlépés két lépésben (a kerek tízesig, majd a maradék), kétjegyű számok összeadása és kivonása (előbb a tízesek, aztán az egyesek), pótlás 100-ra, hiányzó tag (□), sorozatok, egy- és kétlépéses szöveges feladatok. Minden lépés számegyenes-ugrásokkal látszik.

## Komponensek

1. **`AddSub100G3Figures.tsx`** – `RoundTensCoinsSvg` (30 + 40 = 70 érmékkel), `TermsNamesSvg` (tagok, összeg; kisebbítendő, kivonandó, különbség), `BridgeTenJumpSvg` (28 + 6), `BridgeTenBackSvg` (43 − 5), `TwoDigitAddJumpSvg` (47 + 25), `TwoDigitSubJumpSvg` (73 − 27), `ToHundredBarSvg` (63 + 37 = 100).
2. **`AddSub100G3Parts.tsx`** – `JumpLine` (számegyenes ugrásokkal, rejtett végponttal), `Coin`.
3. **`AddSub100G3Theory.tsx`** – kerek tízesek, nevek és ellenőrzés, tízesátlépés táblázattal, kétjegyű számok két úton, pótlás 100-ra és hiányzó tag, 2 mintapélda (könyvtár, sorozat), „Vigyázz!” (64 − 28 ≠ 44; 47 + 25 ≠ 62).
   - **Labor I – Ugorj a kerek tízesig!** Véletlen összeadás vagy kivonás egyjegyű számmal, tízesátlépéssel. Három lépés: hányat lépsz a kerek tízesig → mennyi van még hátra → eredmény. Az ugrások a számegyenesen megjelennek; minden hibára célzott tipp; a végén ellenőrzés.
   - **Labor II – Előbb a tízesek, aztán az egyesek!** Véletlen kétjegyű összeadás/kivonás (többnyire tízesátlépéssel). 1. lépés: a tízesek (a „csak a tízesjegyet adta hozzá” hibát külön felismeri), 2. lépés: az egyesek (az elfelejtett átlépést külön jelzi), végül ellenőrző művelet.
4. **`AddSub100G3Quiz.tsx`** – `ADD_SUB_100_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra (ugrások, pénz, csíkmodell, piramis, mérleg, busz…), minden kérdésnél badge, 3 puska. Azonosító: `g3-c100-osszeadas-quiz`.
5. **`AddSub100G3Matcher.tsx`** – 3 szint × 8 pár (kerek tízesek; tízesátlépés egyjegyűvel; kétjegyű számok). `g3-c100-osszeadas-matcher`.
6. **`AddSub100G3Sorter.tsx`** – 3 szint × 3 kategória × 9 elem (kisebb/egyenlő/nagyobb mint 50; van-e tízesátlépés; eredmény 36/45/54). `g3-c100-osszeadas-sorter`.

**Teszt:** `src/test/grade3Topic1AddSub100G3.test.tsx`

## Eltérések a tankönyvtől

- **Ugyanaz a betű két különböző számot jelöl (TK 10/11.):** a „Mely számok kerülnek a betűk helyére?” feladatban az **R** egyszer 36 (72 − R = 36), egyszer 24 (68 + R = 92). Ez összezavarja a gyereket, hiszen egy jel egy feladaton belül egy számot jelent. A DiákZóna ismeretlenként mindig **□**-t használ (a brief szerint betűt nem), és egy feladatban egy □ egy számot jelent.
- **„Ellenőrzés” az összeadásnál (TK 8/2.):** a könyv a harmadik ellenőrző sorba a felcserélt összeadást írja (22 + 33 = 55). Ez nem ellenőrzés, hanem a felcserélhetőség; mi az összeadást **kivonással** ellenőrizzük, a kivonást **összeadással**.
- **Tudatos didaktikai változtatások:**
  - A könyv a tízesátlépést oszlopsorozatokkal („Mit tapasztaltál?”) vezeti be; nálunk minden lépés **számegyenes-ugrásként** is látszik, és a Labor lépésenként kérdez (a kerek tízesig → a maradék → eredmény).
  - A könyv háromféle utat mutat a 28 + 44-re; mi egy alapmódszert tanítunk (előbb a tízesek, aztán az egyesek), és egy második utat ajánlunk („tízesek és egyesek külön”), hogy a 8–9 éveseknek ne legyen túl sok egyszerre.
  - A „kisebbet a nagyobból” hiba (64 − 28 = 44) külön csapdadobozt kapott, a kvízben pedig ez a tipikus rossz válasz is szerepel.
  - Saját számok és helyzetek (busz, könyvtár, matricák, gyöngyök, ceruza és radír); a könyv szereplőit (Mona, Eszter, Julcsi…) és történeteit nem vettük át. Minden szám 100-on belül marad.
