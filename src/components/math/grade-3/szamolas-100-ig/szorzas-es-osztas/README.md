# 3. Szorzás és osztás (I. Számolás 0-tól 100-ig)

## Források
- Tankönyv: OH-MAT03TA, 11–13. oldal („Szorzás és osztás”).
- Munkafüzet I.: OH-MAT03MA_I, 13–17. oldal.

## Mit tartalmaznak az oldalak?
- **TK 11.:** állatok lábai (összeadás → szorzás), következtetés a képről, a szorzás és az osztás elnevezései (tényezők, szorzat; osztandó, osztó, hányados), a tényezők felcserélhetősége, ellenőrzés.
- **TK 12.:** csoportosítás (bennfoglalás: 40 babszem kettesével, négyesével…; osztálylétszám csoportokra), 4 sor × 7 gyerek, 7-es szorzótábla útvesztő, osztások a 6–9-es táblából.
- **TK 13.:** szorzás–osztás párok (8 · 4, 4 · 8, 32 : 8, 32 : 4…), hiányzó tényező, egyenlőségek pótlása (2 · 4 = 72 : □), szorzótábla-kép, korongos játék a százas táblán.
- **MF I/13–17.:** logikai lapos vonatok, pálcikás házak, szélforgók csoportosítása, kupacvirágok táblázata, pontrács kettévágása (2 · 7 + 8 · 7 = 70), szorzások képekről, intervallumba illő szorzatok, hiányzó számok, színezős párosítás, szorzótábla-kitöltés, sorozatok (: 2, · 3), összehasonlítás (<, >, =).

## A DiákZóna lecke
Saját példákkal, saját számokkal ismétli át a szorzótáblát és az osztást 100-as számkörben:
- korongrács (4 · 7 = 7 · 4), a műveletek részeinek neve, bennfoglalás és részekre osztás külön ábrán,
- műveletcsalád (6, 8, 48 → 4 művelet), a 7-es sor ugrásokkal a számegyenesen,
- mintapéldák: □ · 6 = 42, 56 : 8, „hány pad kell 32 gyereknek?”,
- csapda: az osztásnál nem cserélhetők fel a számok.

**Labor I – Korongrács:** a gyerek a + / − gombokkal kirakja a kért rácsot (pl. 3 sor, soronként 6). Ha felcserélve rakja ki, a visszajelzés elmondja, hogy a korongok száma ugyanannyi (felcserélhetőség), de a feladat mást kért. „Új feladat” gomb.
**Labor II – Melyik szám hiányzik?** Véletlen műveletcsalád, a □ a tényező, a hányados vagy az osztó helyén. Rossz válasznál a gyerek a saját számával kiszámolt eredményt látja („6 · 8 = 48, nem 42”).

## Komponensek
- `MulDiv100G3Figures.tsx`: `MulArraySvg`, `MulDivNamesSvg`, `GroupingSvg`, `SharingSvg`, `SevenJumpsSvg`, `FamilySvg`
- `MulDiv100G3Theory.tsx`: `MulDiv100G3Theory`
- `MulDiv100G3Quiz.tsx`: `MulDiv100G3Quiz`, `MUL_DIV_100_G3_QUESTIONS` (30 kérdés, 10/10/10, 21 ábrával) – `g3-c100-szorzas-quiz`
- `MulDiv100G3Matcher.tsx`: `MulDiv100G3Matcher` (3 × 8 pár) – `g3-c100-szorzas-matcher`
- `MulDiv100G3Sorter.tsx`: `MulDiv100G3Sorter` (3 × 3 kategória × 9 elem) – `g3-c100-szorzas-sorter`

## Teszt
`src/test/grade3Topic1MulDiv100G3.test.tsx`

## Eltérések a tankönyvtől
- **Tört-szavak kihagyva:** a TK 13/10. e)–f) („Melyik számnak a harmada a 9?”, „Mennyi a 9 harmada?”), az MF 16/13. pedig „a 100 felénél” kifejezést használ. A törtek csak a XIV. témakörben jönnek, ezért a DiákZóna végig „3-mal osztva”, „egyformán szétosztva” szavakat használ.
- **TK 12/7. (7-es útvesztő):** a pályán a 77 is szerepel, ami 7 · 11, tehát a „7-es szorzótábla eredményein” haladó gyerek számára kétértelmű. Nálunk a 7-es sor csak 0–70 (SevenJumpsSvg), és a sorozatos kérdés is egyértelmű.
- **A két osztásfajta szétválasztása:** a könyv a bennfoglalást és a részekre osztást nem nevezi meg külön. Nálunk két külön ábra mutatja: „Hány csoport lesz?” (18 : 3 = 6) és „Mennyi jut egyre?” (12 : 3 = 4).
- **Felcserélhetőség rácson:** a könyv szabályként közli (3 · 7 = 7 · 3); nálunk előbb egy korongrácson látszik sorok és oszlopok szerint, a Labor I pedig rá is kérdez.
- **Új csapda:** az osztás nem cserélhető fel (20 : 4 ≠ 4 : 20) – ezt a könyv nem mondja ki, de a felcserélhetőség után tipikus hiba.
- Saját szereplők, számok és helyzetek (szilva, keksz, kerékpár–tricikli, tojásdoboz, tulipánágyás), a könyv szereplői (Bori, Áron, Vera, Lilla) nem szerepelnek.
