# 6. A műveletek sorrendje (3. osztály, I. Számolás 0-tól 100-ig)

## Források
- Tankönyv: OH-MAT03TA, 18–19. oldal („A műveletek sorrendje”).
- Munkafüzet: OH-MAT03MA_I, 24–25. oldal.

## Mi van a könyvben?
- TK 18: csak összeadás és kivonás → balról jobbra (léggömb-lánc); csak szorzás és osztás → balról jobbra (labda-lánc); gyakorló műveletsorok.
- TK 19: vegyes műveletsor – „balról jobbra haladva először a szorzásokat, osztásokat végezzük el, utána az összeadásokat, kivonásokat”; a sorrend jelölése a műveletek fölé írt sorszámmal; szövegből műveletsor; párosítás.
- MF 24–25: hiányzó számok (30 + 7 · □ = 72), igaz állítások, dobókockás műveletsorok, betűrejtvény (sorszámok körökben), pontszámok párosítása.

## Mit csinál a DiákZóna-lecke?
Ez a lecke **zárójel nélküli** műveletsorokról szól (a zárójel a 7. lecke):
- szabály-plakát (1. · és :, 2. + és −, egyforma rangúaknál balról jobbra);
- vonat-ábra (25 + 16 − 9 + 12), békaugrás-ábra (6 · 4 : 3 · 5), sorszám-buborékok (30 − 4 · 6), történet (3 · 6 + 4), csapda (10 + 2 · 5 nem 60, hanem 20);
- **Labor I – Melyiket számolod először?** véletlen műveletsor; a gyerek arra a műveleti jelre koppint, amelyiket most kell elvégezni. Jó választásnál a két szám helyére kerül az eredmény; rossznál célzott tipp („Előbb a szorzás és az osztás!” vagy „Balról jobbra haladj!”).
- **Labor II – Számold ki!** véletlen vegyes műveletsor; ha a beírt szám épp a „csak balról jobbra” számolás eredménye, a program ezt felismeri és megmondja. Lépések megmutatása gombbal.
- Kvíz: 30 kérdés (10/10/10), 20 kérdés ábrával.

## Komponensek
- `OrderOps100G3Figures.tsx`: `TrainChainSvg`, `FrogChainSvg`, `OrderRuleSvg`, `OrderBubblesSvg`, `OrderTrapSvg`, `BagsStorySvg`
- `OrderOps100G3Theory.tsx`, `OrderOps100G3Quiz.tsx` (`ORDER_OPS_100_G3_QUESTIONS`), `OrderOps100G3Matcher.tsx`, `OrderOps100G3Sorter.tsx`
- Azonosítók: kvíz `g3-c100-sorrend-quiz`, párosító `g3-c100-sorrend-matcher`, csoportosító `g3-c100-sorrend-sorter`.

## Teszt
`src/test/grade3Topic1OrderOps100G3.test.tsx`

## Eltérések a tankönyvtől
- **Római számok túl korán:** a TK 19/7. feladat a műveletek sorrendjét római számokkal (I., II., III.) jelöli, pedig a római számok csak a II. témakörben jönnek. A DiákZóna körbe írt arab sorszámot használ (1., 2., 3.).
- **Törtek túl korán:** TK 19/6. („a felét elajándékozta”), 19/7. („a 32 negyedével”), 19/9. („a 18 harmadához a 14 felét”). Ehelyett „hányados”, „oszd el” megfogalmazást használunk, mert a törtek a XIV. témakörben jönnek.
- **Zárójel a zárójel előtt:** az MF 25/7. feladat (4 csomag, mindegyikben 5 + 5 borító) természetes megoldása 4 · (5 + 5), ehhez zárójel kell, amit csak a következő lecke tanít. Ebben a leckében csak zárójel nélkül megoldható történetek vannak (3 · 6 + 4, 30 − 3 · 4); a zárójeles történetek a 7. leckében vannak.
- **Halmazjelölés:** az MF 24/2. „halmazból hiányzó szám” feladatát nem vettük át (nincs halmazjelölés).
- **Didaktikai változtatás:** a könyv a vegyes szabályt kidolgozott hibás példa nélkül adja. Nálunk külön csapda-ábra mutatja a leggyakoribb hibát (10 + 2 · 5 → 60), a labor pedig felismeri, ha a gyerek csak balról jobbra számolt.
- **Didaktikai változtatás:** a kvíz és a csoportosító külön gyakoroltatja, hogy „melyik az első lépés”, és hogy egy kész számolásban rossz-e a sorrend vagy csak elszámolás történt.
