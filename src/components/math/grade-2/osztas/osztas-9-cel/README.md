# 8. Osztás 9-cel

## Források
- *Matematika 2. osztályosoknak II. kötet* (`OH-MAT02TA_II.pdf`), 76–78. o. (Szorzás, osztás 9-cel), 79. o. (A 3-as, 6-os, 9-es szorzótáblák kapcsolata — osztásláncok), 80. o. (Maradékos osztás 9-cel)
- *Matematika munkafüzet 2. osztályosoknak II. kötet* (`OH-MAT02MA_II.pdf`), 50–51. o.

## Mit tartalmaznak az oldalak?
- **TK 76/3.** Bennfoglalás: 18 versenyző 9 személyes kisbuszokban, csoportosítással.
- **TK 77.** A 9-es bennfoglaló tábla a szorzótábla mellett (`0 : 9 = 0` … `90 : 9 = 10`), tekebábuk; osztás–eredmény párosítás (`81 : 9`, `27 : 9`, `36 : 9`).
- **TK 78.** Hiányzó osztó / osztandó (`45 : □ = 5`, `7 = □ : 9`, `9 = □ : 4`), „labdaút” osztásokkal vegyesen.
- **TK 79/2.** Osztásláncok `: 3` és `: 3` → összevont `: 9` (`27 → 9 → 3`), `: 3` és `: 2` → `: 6`.
- **TK 80.** Maradékos osztás: teniszlabdák csoportosítása (`□ · 9 + □ = 37`, `= 48`), nagy háromszögek 9 kis háromszögből (20, 24, 30 darabból), tekepályák táblázata (összes bábu / pályák száma / marad).
- **MF 50.** Tekebábuk dobozolása (27, 18), szorzás és osztás gyakorlása, hiányzó számok, „Borinak 27 tollaslabdája van, ez kilencszer annyi, mint Lilláé”.
- **MF 51.** Maradékos csoportosítás tollaslabdákkal, 26 labda 9-es dobozokban („hány doboz lett tele, hány labda került az utolsóba”), „házikó”-feladat (`3 · 9 + □ = 28`, `□ · 9 + 5 = 32` …).

## A DiákZóna lecke
- **Tananyag:** bennfoglalás („hány kilences van benne?”, muffinok tálcán), szétosztás 9 részre (eper 9 tányéron), a 9-es bennfoglaló tábla a szorzás mellé írva, **trükk: tízesek + 1** (`54 : 9 → 5 + 1 = 6`), **egy kép, két osztás** (`36 : 9 = 4` és `36 : 4 = 9`), „kilencszer annyi” visszafelé, **maradékos osztás** a könyv jelölésével („Ennyi csoport / Ennyi maradt”) és szorzásos ellenőrzéssel (`5 · 9 + 3 = 48`), „hány csónak kell?” (felfelé kerekítés), 3 mintapélda, „Vigyázz!” (a maradék kevesebb, mint 9; `54 : 9 ≠ 45`).
- **Labor I – Ugorj kilencesével!:** a szöcske 9-es ugrásokkal halad a 0–90-es számegyenesen a piros célig (előre / vissza gomb), majd a gyerek kiválasztja az ugrások számát. Visszajelzés: még nem értél oda / túlugrottál / jó válasz + szorzásos ellenőrzés.
- **Labor II – Maradékos osztás 9-cel:** 11–89 korong 9-es sorokban; a gyerek soronként bekarikázza a kilenceseket, majd léptetővel megadja a csoportok számát és a maradékot. Ha a maradék ≥ 9, a program figyelmeztet.
- **Kvíz:** 30 kérdés (10/szint), 20 kérdés ábrával; `+ − · :` műveletek, minden szám ≤ 90; egy pénzes feladat valódi 10 Ft-os érmékkel.
- **Párosító:** 3 × 8 pár (hányados; szorzás ↔ osztás ↔ kilences dobozok; maradékos osztás). **Csoportosító:** 3 × 9 elem (hányados 3/5/8 — más táblák osztásaival is; maradék 0/1/8; „hány doboz kell?”).

## Fájlok és teszt
- `Div9G2Parts.tsx` — közös SVG-elemek (`NineBoxPart`, `PlatePart`, `NineRowsPart`, `JumpLinePart`) és a két labor (`JumpLab`, `RemainderLab`)
- `Div9G2Figures.tsx` — `TraysGroupingSvg`, `SharingNineSvg`, `TensPlusOneSvg`, `NumberFamilySvg`, `RemainderRowsSvg`, `RoundUpBoatsSvg`
- `Div9G2CardFigures.tsx` — kártyaképek (`BoxesRestCard`, `JumpsToCard`, `HowManyBoxesCard150`)
- `Div9G2Theory.tsx`, `Div9G2Quiz.tsx` (`g2-osztas-9-quiz`), `Div9G2Matcher.tsx` (`g2-osztas-9-matcher`), `Div9G2Sorter.tsx` (`g2-osztas-9-sorter`)
- Teszt: `src/test/grade2Topic5Div9G2.test.tsx`

## Eltérések a tankönyvtől
- **Maradékos jelölés:** a könyv („Ennyi csoport / Ennyi maradt”, `□ · 9 + □ = 48`) jelölését használjuk; nem írunk „48 : 9 = 5 maradék 3” alakot. Ellenőrzésként a szorzás + összeadás alakot adjuk (`5 · 9 + 3 = 48`).
- **„A maradék kevesebb, mint 9”:** a könyv ezt nem mondja ki; a DiákZóna a „Vigyázz!” dobozban, a laborban és egy kvízkérdésben is kiemeli.
- **Felfelé kerekítés külön kimondva:** az MF 51/2. („Hány doboz lett tele? Hány labda került az utolsó dobozba?”) a teli és a félig teli dobozt keveri; a DiákZóna két külön kérdést tesz fel: „hány lesz tele, mennyi marad?” és „hány kell, hogy mindenki elférjen?”.
- **Osztásláncok csak a táblán belül:** a TK 79/2. `: 3`, `: 3` lánca (`27 → 9 → 3`) csak a 27-ig marad a 3-as táblában (`36 : 3 = 12` már nem). Ehelyett az „egy kép, két osztás” kapcsolatot tanítjuk (`36 : 9 = 4` és `36 : 4 = 9`), ami minden 9-es szorzatra működik és csak ismert táblákat használ.
- **Tízesek + 1 trükk:** DiákZóna-kiegészítés (a könyvben nincs); a „Csak a 9-es tábla számainál!” figyelmeztetéssel, mert pl. a 46-ra nem érvényes.
- **Szétválasztott fejezetek:** a TK 76–78. együtt tanítja a szorzást és az osztást; a 9-es szorzás, a számjegyösszeg-mintázat és a tízes trükk a „8. Szorzás 9-cel” leckében van, itt az osztás áll a középpontban.
- **Saját tartalom:** saját szereplők és helyzetek (muffinok tálcán, eper tányéron, csónakázó gyerekek, könyvespolc, golyók, Nagyi 10 forintosai); a könyv sportos (Ultrabalaton, tekepálya, teniszlabda, tollaslabda) feladatait nem vettük át.
