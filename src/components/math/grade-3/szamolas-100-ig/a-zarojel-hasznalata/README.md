# 7. A zárójel használata (3. osztály, I. Számolás 0-tól 100-ig)

## Források
- Tankönyv: OH-MAT03TA, 20–21. oldal („A zárójel használata”).
- Munkafüzet: OH-MAT03MA_I, 26–27. oldal.

## Mi van a könyvben?
- TK 20: „A zárójelben lévő műveletet végezzük el először” (halak); „A zárójel kijelöli a műveletek sorrendjét” (gyümölcssaláta, 5 · (2 + 1)); ugyanazok a számok zárójellel és nélküle; szövegből műveletsor.
- TK 21: két gondolatmenet ugyanarra a feladatra (3 · 4 + 3 · 2 és 3 · (4 + 2); (21 − 6) + (22 − 5) és (21 + 22) − (6 + 5)); kincskereső rejtvény (megfejtés: KALÓZ).
- MF 26–27: zárójeles kivonások, „jelöld csillaggal, ahol nem változott az eredmény”, zárójel szorzásnál/osztásnál, üveggolyók, mesecímes párosítás, „melyik számra gondoltam”, virágárusítás.

## Mit csinál a DiákZóna-lecke?
- Szabály: ami zárójelben van, azt számoljuk először; utána a 6. lecke sorrendje.
- Saját történetek: diószedés ((7 + 5) : 4), tányérok gyümölccsel (4 · (3 + 2)), két út ugyanarra (4 · 3 + 4 · 2 = 4 · (3 + 2)), összehasonlító táblázat, felesleges zárójel ((3 · 4) + 5), csapda kivonásnál (40 − (12 + 8) ≠ 40 − 12 + 8).
- **Labor I – Zárójel-kapcsoló:** ugyanaz a műveletsor zárójel nélkül, elöl vagy hátul zárójellel; mindhárom lépésről lépésre, és kiírja, változott-e az eredmény. „Új feladat” véletlen számokkal.
- **Labor II – Tedd ki a zárójelet!** adott a műveletsor és az eredmény; a gyereknek kell kiválasztania, hova kerüljön a zárójel (vagy nem kell). Visszajelzés a kapott értékkel.
- Kvíz: 30 kérdés (10/10/10), 20 kérdés ábrával.

## Komponensek
- `Brackets100G3Figures.tsx`: `NutsShareSvg`, `PlatesSvg`, `TwoWaysSvg`, `BracketCompareSvg`, `MinusBracketSvg`
- `Brackets100G3Theory.tsx`, `Brackets100G3Quiz.tsx` (`BRACKETS_100_G3_QUESTIONS`), `Brackets100G3Matcher.tsx`, `Brackets100G3Sorter.tsx`
- Azonosítók: kvíz `g3-c100-zarojel-quiz`, párosító `g3-c100-zarojel-matcher`, csoportosító `g3-c100-zarojel-sorter`.

## Teszt
`src/test/grade3Topic1Brackets100G3.test.tsx`

## Eltérések a tankönyvtől
- **Törtek túl korán:** TK 20/1. („a halak harmadát”), 20/4. a) („összegének a nyolcada”), MF 26/4. („az üveggolyóim ötödét”). A DiákZóna „egyenlően elosztják 4 barát között”, „oszd el 8-cal” megfogalmazást használ, mert a törtek a XIV. témakörben jönnek.
- **Római számok túl korán:** a TK 20/1. kidolgozott példája római számokkal (I., II.) jelöli a sorrendet; mi arab sorszámot használunk (1., 2.).
- **Felesleges zárójel magyarázat nélkül:** a TK 21/6. első megoldásában a (21 − 6) + (22 − 5) első zárójele nem változtat semmin, a TK 20/4. c) feladatban pedig (4 · 5 + 12 : 3) egyáltalán nem kell zárójel, a lecke mégis zárójeles feladatként adja. A DiákZóna külön megmutatja, mikor felesleges a zárójel ((3 · 4) + 5 = 3 · 4 + 5), a kvíz és a csoportosító pedig gyakoroltatja is.
- **Didaktikai változtatás:** kifejezetten tanítjuk a kivonás-csapdát: ha többen visznek el valamit, az egészet kell kivonni (40 − (12 + 8)), nem 40 − 12 + 8.
- **Didaktikai változtatás:** a 6. lecke (sorrend zárójel nélkül) és ez a lecke élesen elválik: itt minden feladatban a zárójel a kérdés (hol van, kell-e, mit változtat), a laborok ugyanazt a műveletsort mutatják zárójellel és nélküle.
