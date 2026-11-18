# 2. Összeadás 100-as számkör

## Források
- *Matematika 2. – tankönyv II. kötet* (`OH-MAT02TA_II.pdf`) 16–17., 40–41., 57., 73–74. o. (és a 93–94., 96–97. o. 100-as összeadásai): Összeadás 0–60, 0–70, 0–80, 0–90 – kerek tízes + egyes (50 + 2), összeadás tízesátlépés nélkül (54 + 4) és tízesátlépéssel (55 + 9, 48 + 6), korongos és ecsetes képekről összeadás, kétjegyű + kétjegyű (35 + 18, 39 + 12; „45 + 18 = 45 + 10 + 8”), nyilas láncok (44 → +10 → +4), összeadótáblázatok, mérlegek, levelek színezése, „ki számolt jól?”, betűértékes nevek, bűvös négyzetek, számpiramis.
- *Munkafüzet II. kötet* (`OH-MAT02MA_II.pdf`) 14–18., 26–30., 37–38., 45–47., 56–58. o.: összeadás rudas/kockás ábrákról, felcserélt tagok, „60-as házak” (pótlás), oszloponkénti sorozatok (45 + 5 … 45 + 9), füzetes táblázat, matricavásárlás, méhkasok, Hangya Hanna hibái, láncok, lámpások (60 < □ < 70), szöveges feladatok („28-cal több”), súlyzók, 100-at adó számpárok.

## A DiákZóna-lecke
- **Kerek tízes + egyes** (`60 + 7 = 67`), a tagok felcserélhetők.
- **Tízesátlépés nélkül** – a „kistesó” (`3 + 5 = 8` → `63 + 5 = 68`).
- **Tízesátlépéssel** – pótlás a kerek tízesig (`67 + 5 = 67 + 3 + 2 = 72`), 100-ig (`94 + 6 = 100`).
- **Kétjegyű + kétjegyű** – előbb a tízesek, aztán az egyesek (`45 + 23 = 45 + 20 + 3`), tízesátlépéssel (`47 + 28 = 67 + 8 = 75`), rudakkal: 10 kocka → 1 rúd.
- **Hiányzó tag** pótlással, rövid „ennyivel több” feladat.
- **2 interaktív labor**:
  1. *Összeadás rudakkal* – véletlen feladat (51–89 + egy- vagy kétjegyű, összeg ≤ 100, többnyire tízesátlépéssel), „10 kocka → 1 rúd” csere, válaszgombok; külön visszajelzés, ha a gyerek a cserét felejtette el (10-zel kevesebb).
  2. *Ugrálj a számegyenesen!* – +10 / +1 ugrások élő ívekkel, Vissza gomb, visszajelzés túlugrásnál és ha nem tízesekkel kezd (`HopLab`, a 3. lecke kivonásos módban is használja).

## Fájlok és teszt
- `Add100G2Parts.tsx` – `RodsAddPart` (két szám rudakkal), `RodAddLab`, `HopLab`; a rúd-, számegyenes-elemeket a `../szamok-100-ig/Numbers100G2Parts.tsx`-ből veszi
- `Add100G2Figures.tsx` – `RoundTensPlusOnesSvg`, `NoCrossSvg`, `BridgeLineSvg`, `TensThenOnesSvg`, `TwoDigitCrossSvg`, `RodsExchangeSvg`
- `Add100G2CardFigures.tsx` – `RodsAddCard150`, `RodsAddCard80`, `JumpCard`
- `Add100G2Theory.tsx`, `Add100G2Quiz.tsx` (30 kérdés, ebből 22 ábrával, `g2-c100-osszeadas-quiz`), `Add100G2Matcher.tsx` (`g2-c100-osszeadas-matcher`), `Add100G2Sorter.tsx` (`g2-c100-osszeadas-sorter`)
- Teszt: `src/test/grade2Topic3Add100G2.test.tsx`

## Eltérések a tankönyvtől
- **Külön összeadás, egyben 100-ig.** A könyv 10-esével bővíti a számkört (0–60 … 0–100), és minden lépésnél keveri az összeadást és a kivonást. A DiákZóna egy leckébe gyűjti az összeadást 100-ig; a kivonás a 3. leckébe, a kerek tízesek összeadása (`30 + 40`) a 4. leckébe kerül.
- **Egy fő stratégia.** A könyv több utat mutat egymás mellett (TK II/57/3: `45 + 10 + 8` és `45 + 8 + 10`; TK II/16/4: többféle bontás). A 7–8 évesek miatt egy fő szabályt tanítunk: **előbb a tízesek, aztán az egyesek**, tízesátlépésnél **pótlás a kerek tízesig**. A rúd-kocka csere ugyanezt mutatja képen.
- **Nincs betű mint szám.** A TK II/41/3. feladat betűkhöz rendel számokat (B = 14, TIBI = ?). A DiákZóna betűt nem használ ismeretlenként vagy értékként; az ismeretlen mindig □ vagy ?.
- **Csak + és −.** A könyv ugyanezeken az oldalpárokon szorzótáblát is gyakoroltat; ebben a fejezetben szorzás nincs.
- **Mindig 100 alatt.** Minden összeg és minden labor-feladat legfeljebb 100 (a labor generátora ezt ellenőrzi).
- **Rövid szöveges feladatok.** A hosszabb szöveges feladatok (MF II/29.) az 5. leckébe kerülnek; itt csak egylépéses, nagyon rövid „ennyivel több” és kétlépéses gyűjtős feladat van, szakaszos ábrával.
- **Saját szereplők és képek.** A könyv szereplőit (Hangya Hanna, Kati és Peti, a szentjánosbogár stb.) nem vesszük át. A papíron statikus rudas ábrát és nyilas láncot két élő labor váltja ki, amely a tipikus hibát (elfelejtett csere, egyesekkel kezdett ugrálás, túlugrás) név szerint jelzi.
