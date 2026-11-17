# 3. Római számok a mindennapokban és fejtörők (3. osztály, II. fejezet)

## Források
- Tankönyv (OH-MAT03TA) 26–27. o.: 2. feladat (római számlapos órák, Budapest kerületei, könyvfejezetek), 3. feladat (pálcikás tükrözés), 4. feladat (pálcika-áthelyezés), 5. feladat (névnap, születésnap – hónap római számmal), 6. feladat (társasjáték).
- Munkafüzet I. (OH-MAT03MA_I) 28–29. o.: óramutatók berajzolása, átírás, párosítás, sorba rendezés (I, V, X jelekkel, 39-ig).

## Mit csinál a DiákZóna-lecke?
- **Tananyag:** hol látunk ma római számot (óra, fejezet, király, kerület, emelet, dátum; az évszázad és az olimpia sorszáma csak olvasásként), a pont jelentése (IV. Béla = negyedik Béla), dátum: év. hónap (római). nap., az órai IIII kivétel, pálcikás fejtörők lépésenként, tükrözés (V-ből X, ⊥-ből +).
- **Labor I – Római óra:** „Állítsd be!” (koppints a számra, ahová a kismutató kell) és „Olvasd le!” (4 gomb); azonnali, a hibára szabott visszajelzés, „Új feladat”.
- **Labor II – Pálcika-fejtörő:** valódi pálcika-áthelyezés: koppints egy pálcikára (I, a + álló pálcikája, az = felső pálcikája), aztán egy szürke/lila/zöld helyre (új I, + vagy =). A gép kiszámolja, mi áll most (pl. „5 + 5 = 9, ez még nem igaz”), jelzi a szabálytalan alakot (IIII). 10 saját fejtörő, mindegyiknek pontosan egy megoldása van (számítógépes kereséssel ellenőrizve).
- **Kvíz:** 30 kérdés (10/szint), 21 ábrával (óra, könyv, szobortábla, utcatábla, naptár, pálcikás egyenlőség, tükrözés).
- **Párosító / Csoportosító:** kártyaképekkel (óralap ↔ római szám, korona/könyv/tábla ↔ sorszám, naptárlap ↔ dátum; pálcikás számok, naptárlapok).

## Komponensek
`RomanEverydayG3Figures.tsx` (RomanClockFaceSvg, ClockIIIIvsIVSvg, RomanEverywhereSvg, MonthsRomanSvg, MatchstickMoveSvg, MirrorRomanSvg, StickNumberSvg), `RomanEverydayG3Parts.tsx` (toRoman, fromRoman, stickCount, evalStickEq, layoutSticks, Stick, StickText, RomanClock, BookG, PlaqueG, CalendarG, MirrorHalf), `RomanEverydayG3CardFigures.tsx`, `RomanEverydayG3Theory.tsx` (+ STICK_PUZZLES), `RomanEverydayG3Quiz.tsx` (ROMAN_EVERYDAY_G3_QUESTIONS), `RomanEverydayG3Matcher.tsx` (ROMAN_EVERYDAY_G3_MATCHER_LEVELS), `RomanEverydayG3Sorter.tsx` (ROMAN_EVERYDAY_G3_SORTER_LEVELS), `index.ts`.

Teszt: `src/test/grade3Topic2RomanEverydayG3.test.tsx`. Azonosítók: kvíz `g3-rom-mindennapok-quiz`, párosító `g3-rom-mindennapok-matcher`, csoportosító `g3-rom-mindennapok-sorter`.

## Eltérések a tankönyvtől
- **TK 27/4 – „két pálcika áthelyezésével”:** a b) (XII + II = IX → XII – III = IX) és a d) (XXII + XVIII = V → XXIII – XVIII = V) feladat már **egy** pálcikával megoldható, az a)-hoz pedig egy jelen belüli átrendezés (X → V) kell, amit a könyv nem mond ki. A DiákZóna mindig pontosan egy pálcikát mozgat, és minden fejtörőnek egyetlen megoldása van (géppel ellenőrizve); a végén szabályos római számoknak kell állniuk.
- **TK 27/3 b) – tükrözött művelet:** XIX + XI + XIII = 43, ez a könyv jeleivel (I, V, X, legfeljebb 39) le sem írható. Nálunk a tükrözéses műveletek eredménye kicsi (20, 22), és arab számmal kérjük.
- **TK 26/2 b) – órák:** a 4 óra 15 percnél a kismutató pontosan a IV-re mutat (negyednyit tovább kellene). A DiákZóna-órák kismutatója mindig pontosan számolt helyen áll, és egész órákat használunk.
- **IV vagy IIII?** A könyv órái IV-et mutatnak; sok valódi órán IIII áll. Ezt külön ábrán és „Vigyázz!”-dobozban magyarázzuk: a IIII csak órán szokás.
- **TK 26/2 c) – budai kerületek:** a XXI. kerület (Csepel) a szigeten van, így a „budai vagy pesti” kérdés rá nem egyértelmű. A térképes kérdést nem vettük át, csak a „23 kerület, I.–XXIII.” tényt.
- **TK 27/5 – névnapok:** internetes keresést és a könyv szereplőit igényli; helyette saját dátumos feladatok (év. hónap római számmal. nap.).
- **Számkör:** a könyv a 3. osztályban csak az I, V, X jelet használja (legfeljebb XXXIX). Ez a lecke is főleg 39-ig marad; a XXXIII. olimpia és a XXI. század csak sorszámként, olvasásra szerepel.
- **Didaktikai döntések:** a sorszám-pont (IV. Béla = negyedik, nem „négy”) külön szabály és csapda; a pálcikás feladatoknál előbb arab számmal „kiolvassuk”, mi áll ott, csak utána mozgatunk; a tükrözést félbevágott jelekkel, szaggatott tükörképpel mutatjuk.
