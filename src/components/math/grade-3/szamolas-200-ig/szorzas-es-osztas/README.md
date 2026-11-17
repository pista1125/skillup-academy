# 5. Szorzás és osztás (3. osztály, III. Számolás 0-tól 200-ig)

Kerek tízesek szorzása és osztása egyjegyű számmal, illetve kerek tízessel, a 200-as számkörben. A szorzótáblára építünk: 4 · 30 = 4 · 3 tízes = 12 tízes = 120.

## Források

- **Tankönyv (OH-MAT03TA):** 38–40. o. („Szorzás és osztás”)
- **Munkafüzet I. (OH-MAT03MA_I):** 45–47. o.

## Mi van a tankönyvi és munkafüzeti oldalakon?

- **TK 38.:** számolópálcika-csomagok (40 db) – összeadás és szorzás; csomagokból, poharakból, dobozokból szorzás és osztás; nyaklánc 30 gyöngyből (6 lánc; hány lánc 150 gyöngyből).
- **TK 39.:** érmék összeszámolása és átváltása egy érmére; ismételt összeadásból szorzás (50 + 50 + 50 …); 10 forintosokból „2 · 7 tízes = 14 tízes” minta; oszloponkénti számolás (2 · 4, 20 · 4, 4 · 20, 80 : 4, 80 : 20 …); hiányzó tényező, osztó, osztandó (5 · 40 = □); „Mennyi a 120 fele, harmada …?”.
- **TK 40.:** összefüggések gyerekek beszélgetésével (tényezők cseréje, tízszeres osztandó, 20 · 8 hússzal nagyobb a 20 · 7-nél, ugyanakkora hányados); nyitott mondatok (50 < □ · 40 < 190; 120 : 4 < ○ < 5 · 20; 110 + 20 · 4 > △ > 200 − 30 · 2); számpárok 100 és 200 közötti szorzattal.
- **MF 45.:** 10 forintosok csoportosítása 30-asával és 60-asával; pálcikakötegek zacskókban, poharakban.
- **MF 46.:** virágvásárlás 200 Ft-ból (2 egyforma virág), szorzások összekötése tartományokkal, három szám szorzata (120, 200, 140, 160), nyitott mondatok.
- **MF 47.:** hiányzó számok soronként (12 : 4, 120 : 4, 120 : 40 …), hagymák 20-asával, sorba rendezés (3 hagyma), betűrejtvény (JÁCINT).

## Mit csinál a DiákZóna lecke?

Saját feladatok, saját számok és helyzetek (matrica, fagyi, bábszínház, pékség, füzet, persely) – a könyv feladattípusait gyakoroljuk, de nem másoljuk.

- **Elmélet:** „Mit tanulunk?”, tízesrúd-csoportok (3 · 40), „A szorzótábla segít” három lépésben (6 · 3 → 6 · 3 tízes → 6 · 30 és az osztásos párja), kétféle osztás (részekre osztás tányérokkal: 160 : 4; bennfoglalás ugrásokkal: 160 : 40), pénz (7 · 20 Ft), műveletcsalád (5, 30, 150) és két összefüggés (tízszer akkora tényező; tízszer akkora osztandó és osztó), 3 mintapélda, „Vigyázz!” (a 0 elvesztése; 160 : 4 és 160 : 40 különbsége).
- **Labor I – Rakd ki tízesrudakkal!:** a gyerek a csoportok számát és a csoportonkénti tízesrudak számát állítja nagy +/− gombokkal, a rajz azonnal mutatja. Ellenőrzéskor szól, ha felcserélte a két számot, vagy ha csak az egyik jó. „Új feladat”: véletlen a · kerek tízes, legfeljebb 200.
- **Labor II – Melyik a jó szám?:** 4 feladattípus (szorzás, részekre osztás, bennfoglalás, hiányzó tényező), véletlen számok 200-ig. A rossz válaszok tipikus hibák, és mindegyikhez saját tipp tartozik (pl. „Ez csak 12 : 4. De 120 = 12 tízes …”, „Összeadtad a két számot”, „Eggyel több csoportot számoltál”).
- **Kvíz:** 30 kérdés (10/10/10), 24 ábrával, mind típusjelvénnyel, 3 puskakártya.
- **Párosító:** 3 szint × 8 pár, szintenként 4 képes kártya (tízesrúd-csoportok; szétosztás tányérokra; ugrások a számegyenesen).
- **Csoportosító:** 3 szint × 3 kategória × 9 elem (szorzat 120 / 160 / 180; eredmény 20 / 30 / 40; 150-nél kisebb / pontosan 150 / nagyobb), 30 képes elem (tízesrudak, „6 · 20 Ft” érme, szétosztás).

## Komponensek

- `MulDiv200G3Figures.tsx`: `MulDiv200TensSvg`, `MulDiv200LadderSvg`, `MulDiv200SharingSvg`, `MulDiv200GroupingSvg`, `MulDiv200CoinsSvg`, `MulDiv200FamilySvg`
- `MulDiv200G3Parts.tsx`: közös rajzelemek (tízesrúd, százas lap, egyeskocka, rúdcsoportok, érmék, ugrások, tányérok, árcédula, doboz) és magyar ragozó segédek (`art`, `ban`, `at`, `asSfx`) – a 6. Megálló is ezeket használja
- `MulDiv200G3CardFigures.tsx`: kártyaképek (`CardRods`, `CardSplit`, `CardJumps`, `CardBig`, `CardCoinMul`)
- `MulDiv200G3Theory.tsx`: `MulDiv200G3Theory`, `makeMulDiv200Task`
- `MulDiv200G3Quiz.tsx`: `MulDiv200G3Quiz`, `MUL_DIV_200_G3_QUESTIONS` (azonosító: `g3-c200-szorzas-quiz`)
- `MulDiv200G3Matcher.tsx`: `MulDiv200G3Matcher`, `MUL_DIV_200_G3_MATCHER_LEVELS` (`g3-c200-szorzas-matcher`)
- `MulDiv200G3Sorter.tsx`: `MulDiv200G3Sorter`, `MUL_DIV_200_G3_SORTER_LEVELS` (`g3-c200-szorzas-sorter`)

Teszt: `src/test/grade3Topic3MulDiv200G3.test.tsx`

## Eltérések a tankönyvtől

1. **Törtfogalom túl korán (TK 39/8.):** „Mennyi a 120 fele, harmada, negyede, hatoda? Mennyi a 150 harmada, ötöde?” – a törteket csak a XIV. fejezet tanítja. DiákZóna: „120-at 4 egyenlő részre osztjuk”, „90 forintot 3 perselybe teszel, egyformán” (részekre osztás törtszavak nélkül).
2. **Kétértelmű összekötés (MF 46/4.):** a 2 · 70 = 140 és a 30 · 5 = 150 is két tartományba illik (139 < ♥ < 161 és 110 < ♦ < 160), a feladat mégis „a megfelelő állításhoz” köttet. DiákZóna csoportosítójában a kategóriák nem fedik egymást (150-nél kisebb / pontosan 150 / 150-nél nagyobb).
3. **Befejezetlen szabályok (TK 40/9.):** a gyerekek mondatai („A 12 : 3 hányadosa ugyanannyi …”) befejezetlenek, a szabályt a gyereknek kell kitalálnia, minta nélkül. DiákZóna kimondja és példával mutatja a két összefüggést (tízszer akkora tényező → tízszer akkora szorzat; tízszer akkora osztandó és osztó → ugyanannyi hányados), és kvízkérdések gyakoroltatják.
4. **Nyitott mondat több megoldással (TK 40/10., MF 46/6.):** a könyvben „melyek teszik igazzá”, ami jó; a kvízben egyetlen helyes válasz kell, ezért a választható számok közül pontosan egy jó (60 < □ · 30 < 150: a 3 szerepel, a 4 nem), a magyarázat megmutatja, miért nem jó a 2 és az 5.
5. **Didaktikai változtatások:** a könyv a pálcikacsomagokat és a 10 forintosokat használja – DiákZóna egységesen kék tízesrudat használ (a fejezet többi leckéjével egyezően: százas piros, tízes kék, egyes sárga), és a gyerek maga rakja ki (konkrét → képi → jel). A bennfoglalást ugrásokkal a számegyenesen, a részekre osztást tányérokkal mutatjuk, hogy a két osztás jól elváljon. A betűrejtvény és a sorba rendezés (MF 47/9–10.) helyett azonnali, hibára szabott visszajelzés van a laborokban.
6. A régi README a címek alapján készült, és LaTeX-jelölést (`$30 \cdot 4$`) használt; most a valódi oldalak alapján átírtuk, a jelölés a könyv szerint (·, :, □).
