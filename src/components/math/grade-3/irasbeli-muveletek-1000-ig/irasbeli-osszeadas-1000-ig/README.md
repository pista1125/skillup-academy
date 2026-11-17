# 1. Írásbeli összeadás 1000-ig (3. osztály, XII. Írásbeli műveletek 1000-ig)

**Források:** tankönyv OH-MAT03TA 118–121. oldal, munkafüzet OH-MAT03MA II. kötet 44–47. oldal. (A könyvben ez a fejezet csak ez a 4 + 4 oldal, vegyesen összeadás és kivonás; a DiákZóna külön leckékre bontja.)

## Mit tartalmaznak a könyv oldalai?

- **TK 118.:** kirándulós kép; hegycsúcsok magassága műveletekkel (pl. 248 + 193 + 441, 259 + 158 + 339), sorba rendezés, különbségek.
- **TK 119.:** becslés százasra kerekítve, majd számítás (összegek, hiányzó tagok); betűrejtvény az eredményekből; utcai távolságok szakaszos ábrán.
- **TK 120.:** „Az alakzatok oldalain a számok összege 1000”; „Melyik számra gondoltam?”; képek helyettesítése számokkal; táblázat (fiúk, lányok, ebédelők).
- **TK 121.:** szöveges feladat ábrához, számkártyák (legnagyobb / legkisebb összeg), bűvös négyzet, nyitott mondatok, „véletlenül kivonta hozzáadás helyett”.
- **MF II/44–47.:** bőröndzár (háromtagú összegek és vegyes műveletek), számrejtvény, sorozat folytatása (+157), szakaszos ábra (1000 m-es futás), műveleti jelek pótlása, hiányzó számjegyek pótlása írásbeli összeadásban, színező.

## Mit csinál a DiákZóna lecke?

A VII. fejezet írásbeli összeadását viszi tovább az 1000-es számkörbe. Újdonságok: **három és négy tag**, **„maradt 2”** (ha az oszlop összege 20 vagy több), és a **pont 1000** összeg (a százasok után maradt 1 az ezresek helyére kerül, négy oszlop). A kimondott forma a VII. fejezeté: „4 meg 7 meg 9 az 20, meg 1 az 21. Leírom az 1-et, maradt 2.” Becslés százasra kerekítve, ellenőrzés alulról felfelé összeadva. Saját példák: 476 + 358, 248 + 175 + 396, 125 + 238 + 146 + 327, 563 + 437, kisvasút, múzeum, könyvtár, papírgyűjtés.

## Komponensek

1. **`WrittenAdd1000G3Parts.tsx`** – segédek: `steps3`, `carryMarksAdd`, `partialSum`, `stepLines`, `spokenAdd`, tipikus hibák (`forgotAll` = minden maradék elfelejtve, `onlyOne` = 2 helyett csak 1-et visz tovább), `addHint` (célzott tipp), `makeAddTask` (labor-generátor: két tag / három tag / négy tag / pont 1000), `opts4`, `Wallet`, `Bar`. Az oszlopos rajz a VII. fejezet újrahasznosított `WrittenAddG3Column` komponense (`cols={4}` az 1000-hez).
2. **`WrittenAdd1000G3Figures.tsx`** – `TwoAddendsSvg` (476 + 358 három lépésben), `ThreeAddendsSvg` (248 + 175 + 396, maradt 2), `FourAddendsSvg` (125 + 238 + 146 + 327), `ThousandSumSvg` (563 + 437 = 1000), `EstimateCheckSvg` (becslés és ellenőrzés alulról), `TrainWordSvg` (szalagos modell).
3. **`WrittenAdd1000G3CardFigures.tsx`** – `MiniAdd` (párosító: tagok egymás alatt, nagy jegyekkel), `SortAdd` (csoportosító), `MiniShop` (tárgyak árcédulával).
4. **`WrittenAdd1000G3Theory.tsx`** – csak a `WrittenAdd1000G3Theory` exportja.
   - **Labor I – Lépésről lépésre:** négy feladattípus, a gyerek oszloponként billentyűzeten írja be a jegyet; a maradék (1 vagy 2) zöld számként a következő oszlop fölé kerül (kikapcsolható); az 1000-es összegnél 4. lépésként az ezres jegyet is beírja. Célzott tippek (elfelejtett maradék, „nem 1, hanem 2 maradt”, a kétjegyű összeg elejét írta le). „Mutasd meg!” animált bemutató; a végén becslés-összevetés.
   - **Labor II – Elég a pénz?** Három tárgy ára (≤ 1000 Ft együtt) és egy pénztárca (600–1000 Ft). Előbb az összeg (tipikus hibák a választások között, célzott üzenet), aztán: elég-e a pénz?
5. **`WrittenAdd1000G3Quiz.tsx`** – `WRITTEN_ADD_1000_G3_QUESTIONS`: 30 kérdés (10/10/10), 25 ábrával, badge mindenhol, 3 puska. `g3-wops-osszeadas-quiz`.
6. **`WrittenAdd1000G3Matcher.tsx`** – `WRITTEN_ADD_1000_G3_MATCHER_LEVELS`: két tag; három tag; vegyesen (árak, pont 1000, négy tag). `g3-wops-osszeadas-matcher`.
7. **`WrittenAdd1000G3Sorter.tsx`** – `WRITTEN_ADD_1000_G3_SORTER_LEVELS`: mennyi marad az egyeseknél (0 / 1 / 2); mekkora az összeg (600 alatt / 600–800 / 800 fölött); hibavadász (jó / 10-zel kevesebb / 100-zal kevesebb). `g3-wops-osszeadas-sorter`.

**Teszt:** `src/test/grade3Topic12WrittenAdd1000G3.test.tsx` (a generátort, a kimondott lépéseket és a tipikus hibákat is ellenőrzi).

## Eltérések a tankönyvtől

- **Számkör-túllépés (TK 118/2.):** a Kékes magassága „900 + 114” = 1014 m – ez **1000 fölötti** szám egy „0-tól 1000-ig” fejezetben. Nálunk minden összeg és részeredmény legfeljebb 1000.
- **Számkör-túllépés (TK 119/5. c):** Márti → Nelli → Julcsi → haza: 358 + 594 + 236 = 1188 m, szintén 1000 fölött. Nálunk nincs ilyen feladat.
- **Törtfogalom túl korán (TK 120/7. f):** „A kilencszáz felének és a 423-nak az összege” – a „fele” a XIV. fejezet anyaga. Nálunk nincs.
- **Hiányzik a „maradt 2” magyarázata:** a könyv háromtagú összegeket ad (TK 118/2., MF 44/1.), de sehol sem mondja ki, hogy 20 fölött 2 marad. Nálunk külön szakasz, labor-tipp („Nem 1, hanem 2 maradt!”), csapda és csoportosító-szint szól róla.
- **Hiányzik a pont 1000 írásbeli alakja:** a könyv 1000-re pótoltat (TK 120/6.), de nem mutatja meg, hova kerül a százasok után maradt 1. Nálunk négy oszlop (E sz t e), külön lépés: „Az 1-et leírom az ezresek helyére.”
- **Tudatos didaktikai változtatások:** saját számok, helyzetek és szereplők (a könyv szereplői – Julcsi, Márti, Nelli, Gábor, a 3. b – nem szerepelnek); becslés + ellenőrzés minden mintapéldánál; lépésenkénti labor billentyűzettel és célzott hibaüzenetekkel; „Elég a pénz?” labor a becslés és az összehasonlítás gyakorlására.
