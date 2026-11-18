# 1. Római számok értelmezése

## Források
- *Matematika 2. osztályosoknak I. kötet* (`OH-MAT02TA_I.pdf`), **46–47. oldal** – „A római számok”.
- *Matematika munkafüzet 2. osztályosoknak I. kötet* (`OH-MAT02MA_I.pdf`), **28–29. oldal**.

## Mit tartalmaznak a könyvoldalak?
- TK 46.: osztálytermi kép (római számlapos óra, „II. hónap” naptár, „XIII. kerület” tábla, „I. helyezett” oklevél); tábla 1–20 arab és római számokkal; hol használunk ma római számokat.
- TK 47.: a szükséges jelek (I, V, X); hány egyforma jel kerülhet egymás mellé; pálcikás kirakás, I hozzáillesztése; az 1–10 és 11–20 sor összevetése; pajzsok leolvasása; római kártyák a 0–20 számegyenesen.
- MF 28.: pajzsos katonák a számegyenesen, 11–20 táblázat, karóra arab és toronyóra római számokkal.
- MF 29.: hónapok római számmal évszakonként, névnap-kutatás, időtartam 7 óra 30 perctől, pálcika-áthelyezéses egyenlőségek.

## Mit csinál a DiákZóna-lecke?
- Hol látunk római számot: óra, királyok neve (I. István, IV. Béla), könyvfejezet, emelet, kerület; „pont = hányadik”.
- A három jel pálcikával: **I = 1, V = 5, X = 10** – csak ezek (L, C a 3. osztályban jön).
- 1. szabály: legfeljebb 3 egyforma jel (III jó, IIII nem); V-ből csak egy.
- 2. szabály: jobbra hozzáadunk (VI, XI), balra elveszünk (IV, IX); balra csak egy I.
- Nincs nulla.
- 2 labor: **Pálcika-építő** (I/V/X koppintással, élő értékkel és hibaüzenettel: „legfeljebb 3 egyforma jel”, „balra csak egy I” stb.), **Balra vagy jobbra?** (hova tegyük az I-t a V, X, XV mellé).

## Fájlok és teszt
- `RomanIntroG2Parts.tsx` – **a VI. témakör közös segédei** (`toRoman`, `fromRoman`, `isValidRoman`, `romanProblem`, `StickRomanPart`, `RomanClockPart`, `NumberLinePart`, `ShieldPart`, kérdésábrák, laborgombok) + a lecke két laborja. A 2–4. lecke innen importál.
- `RomanIntroG2Figures.tsx` – `WhereWeMeetRomanSvg`, `ThreeSignsSticksSvg`, `MaxThreeSignsSvg`, `LeftRightRuleSvg`, `NoZeroRomanSvg`
- `RomanIntroG2CardFigures.tsx` – kártyaképek (`StickCard150/80`, `ClockCard150/80`, `RomanCard80`, `LinePointCard150`, `LabelCard150`), a többi lecke is használja
- `RomanIntroG2Theory.tsx`, `RomanIntroG2Quiz.tsx` (`g2-romai-ertelmezes-quiz`, 30 kérdés), `RomanIntroG2Matcher.tsx` (`g2-romai-ertelmezes-matcher`), `RomanIntroG2Sorter.tsx` (`g2-romai-ertelmezes-sorter`)
- Teszt: `src/test/grade2Topic6RomanIntroG2.test.tsx`

## Eltérések a tankönyvtől
- **Saját feladatok, saját szereplők**: a könyv osztálytermi képe és pajzsos katonái helyett saját ábrák (óra, könyv, lépcsőházi tábla, király-tábla), saját nevek és számok.
- **„20-nál kisebb” → „20-ig”**: a TK 47/1 „a 20-nál kisebb római számok” jeleiről kérdez, de a tábla és a fejezet az XX-et is tartalmazza. Nálunk mindenhol „1-től 20-ig” szerepel.
- **Nincs nulla**: a könyv számegyenesei 0-val kezdődnek, de nem mondja ki, hogy a 0-nak nincs római jele. Nálunk külön szakasz és ábra szól róla (a 0 pont felett „?”). A régi `romai-szamok-0-10-ig` mappanév is félrevezető (lásd a 2. lecke README-jét).
- **A szabályokat kimondjuk**: a könyv csak kérdez („hány azonos jel kerülhet egymás mellé?”, „rakd mellé az I-t”). Nálunk két egyszerű szabály: *legfeljebb 3 egyforma jel*, *jobbra hozzáad, balra elvesz* – és a laborban azonnali hibaüzenet jön (IIII, VV, IIX).
- **Csak I, V, X, csak 20-ig**: a régi README L-t és C-t is tanított; ez a 3. osztály anyaga, kivettük.
- **Óra: csak egész óra**: az MF 29/3 időtartam-számolása (7 óra 30 perctől, percekkel) túl nehéz ezen a ponton; nálunk csak a kismutató római számát olvassuk le egész óránál. Megjegyezzük, hogy néhány órán IIII áll a IV helyett (díszítés), mi mindig IV-et írunk.
- **Kihagyott feladatok**: névnap-kutatás interneten (MF 29/2) és hónapok évszakonként (MF 29/1) – nem a római számírás a lényegük; a hónap csak táblán szerepel („VI. hónap = hatodik”).
- **Pálcika-áthelyezés**: az MF 29/4 római műveletes rejtvényei helyett egyszerű „tedd át az I-t a másik oldalra” feladatok (IV → VI), művelet nélkül.
