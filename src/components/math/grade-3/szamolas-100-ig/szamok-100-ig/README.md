# 1. Számok 100-ig (3. osztály, I. Számolás 0-tól 100-ig)

**Források:** tankönyv OH-MAT03TA 4–7. oldal, munkafüzet OH-MAT03MA I. kötet 4–7. oldal.

## Mit tartalmaznak a könyv oldalai?

- **TK 4.:** nyitókép (nyári élmények), naptár- és óra-feladatok (hány éjszaka, hányféle sorrend, mikor szálltak le).
- **TK 5.:** oszlopdiagram leolvasása (igaz/hamis állítások); százas tábla letakart számokkal; lépegetés a táblán (jobbra, lefelé, „honnan indultam?”).
- **TK 6.:** tízesével összegumizott pálcikák, golyós számoló (piros = 100, kék = 10, sárga = 1), helyiérték-táblázat (százas, tízes, egyes), bontás tízesekre és egyesekre (28 = 2 t + 8 e = 20 + 8), „Mennyit ér?” (pl. 16 e + 3 t).
- **TK 7.:** pénz megszámolása a pénztárcákban, számok helye a számegyenesen (különböző beosztásokkal), egyes és tízes számszomszédok táblázata, páros és páratlan szomszédok.
- **MF 4–7.:** százas tábla kiegészítése és lépegetés, táblarészletek, rajzok leolvasása (rudak, kockák, dobozok), becslés, pénz rajzolása, golyós számoló, számírás betűvel és számmal, számkártyák, Venn-diagram (páratlan / 80-nál nagyobb), számegyenes, páros-páratlan válogatás, számszomszéd-„házak”, fejtörő házszámok.

## Mit csinál a DiákZóna lecke?

Saját számokkal és helyzetekkel gyakoroltatja ugyanezeket a készségeket: tízesek és egyesek (rudak, kockák, golyós számoló, pénz), helyiérték-táblázat, a 100 mint 10 tízes, százas tábla és lépegetés, számegyenes, egyes és tízes számszomszédok, páros és páratlan számok. A kerekítés **nem** része ennek a leckének (az a III. fejezetben jön).

## Komponensek

1. **`Numbers100G3Figures.tsx`** – `TensOnesBlocksSvg` (46 rudakkal és kockákkal), `HundredBoardSvg` (százas tábla „?” mezőkkel, +1 / +10 jelöléssel), `PlaceValueTableSvg` (58, 30, 100), `NeighboursNumberLineSvg` (a 63 egyes és tízes szomszédjai), `PurseMoneySvg` (50 + 20 + 5 = 75 Ft), `EvenOddSvg` (korongok párokba állítva).
2. **`Numbers100G3Parts.tsx`** – kis rajzelemek (tízesrúd, egyeskocka, pénzérme).
3. **`Numbers100G3Theory.tsx`** – Mit tanulunk?, tízesek és egyesek, helyiérték-táblázat, százas tábla, szomszédok, páros-páratlan, 3 mintapélda, „Vigyázz!” (2 t + 15 e ≠ 215).
   - **Labor I – Építsd meg a számot!** Tízesrudak és egyeskockák hozzáadása/elvétele, „Beváltom: 10 kocka → 1 rúd” gomb, ellenőrzés a hibára szabott tippel, „Új feladat” (11–100).
   - **Labor II – Lépegess a százas táblán!** Véletlen kezdőszám és két lépés (jobbra/balra/fel/le); a gyerek a táblára koppint; hiba esetén megmutatja az utat és a +1 / +10 szabályt.
4. **`Numbers100G3Quiz.tsx`** – `NUMBERS_100_G3_QUESTIONS`: 30 kérdés (10/10/10), 22 kérdésnél ábra, minden kérdésnél badge, 3 puska. Azonosító: `g3-c100-szamok-quiz`.
5. **`Numbers100G3Matcher.tsx`** – 3 szint × 8 pár (betűvel ↔ számmal; t + e bontás; beváltás, pl. 3 t + 14 e = 44). `g3-c100-szamok-matcher`.
6. **`Numbers100G3Sorter.tsx`** – 3 szint × 3 kategória × 9 elem (kerek tízes / más páros / páratlan; 4, 5, 6 tízes; kisebb, egyenlő, nagyobb mint 50). `g3-c100-szamok-sorter`.

**Teszt:** `src/test/grade3Topic1Numbers100G3.test.tsx`

## Eltérések a tankönyvtől

- **Sajtóhiba a százas táblában (TK 5/3.):** a 9. sor elején „82 82” áll, helyesen **81 82**. A DiákZóna százas táblái hibátlanok.
- **„Helyi érték” (TK 6/6.):** a táblázat fejlécében két szóban áll; a helyes matematikai szakszó egybeírva **helyiérték**. Mi így írjuk.
- **Római számok túl korán (MF 6/8.):** a táblázatnak van „Római számmal” oszlopa, pedig a római számok csak a II. fejezetben következnek. Nálunk ebben a leckében nincs római szám.
- **A régi README kerekítést is ígért** – a tankönyv 4–7. oldalán nincs kerekítés (az a III. fejezet témája), ezért kihagytuk.
- **Naptár, óra, diagram (TK 4–5.):** a nyitóoldal naptáras/órás és diagramos feladatai nem a 100-as számkör témái; ezeket nem vettük át (az idő a IV. Mérések fejezetben szerepel).
- **Tudatos didaktikai változtatások:**
  - A könyv a „16 e + 3 t” típusú feladatot csak leírja; nálunk a Laborban a gyerek ténylegesen **bevált** 10 kockát egy rúdra, és a szabályt csapdadobozban is megmutatjuk (2 t + 15 e = 35, nem 215).
  - A páros/páratlan fogalmat előbb **korongok párokba rendezésével** mutatjuk meg, csak utána az „utolsó jegy” szabállyal.
  - A százas tábla lépegetését a gép ellenőrzi, és hiba esetén kirajzolja az utat.
  - A pénzes feladatokban csak létező magyar érméket használunk (5, 10, 20, 50, 100 Ft).
  - Saját számok, saját helyzetek; a könyv szereplőit (Emese, Réka, Éva…) nem vettük át.
