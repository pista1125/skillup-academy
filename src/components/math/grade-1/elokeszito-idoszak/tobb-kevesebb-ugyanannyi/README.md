# 8. Több, kevesebb, ugyanannyi (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 34–39. o. (PDF 35–40), OH-MAT01MA_I 16–21. o. (PDF 17–22). (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
- TK 34: piknikes nyitókép (több, kevesebb, ugyanannyi), „miből van ugyanannyi?” összekötéssel, **az egyenlőségjel bevezetése** (=, pöttyökkel a képek alatt).
- TK 35: **a < és > jel bevezetése** (két ceruzából formált „csőr”: a több felé nyílik), a jelek írása, pöttyözés és jel kitétele.
- TK 36–37: pöttyöknek megfelelő rajzolás és jelek, rovarok, madarak összehasonlítása, „rajzolj a jeleknek megfelelően” (szendvics, bögre), színezés jelek szerint.
- TK 38–39: kupakok marokkal (becslés), tornyok kockákból jellel, „rajzolj kevesebbet / többet”, eggyel több alma, eggyel kevesebb körte, „annyi salátát, hogy minden nyúlnak jusson”.
- MF 16–21: kiegészítés ugyanannyira, pöttysor-párosítás, állatok eleségének összehasonlítása, jelek írása, mennyiség-pöttykártya összekötés, zsákok, kezek, dominók, „a több felé mutat a nyíl – hol a hiba?”, piknikkép felidézése, jut-e minden pillangónak virág.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`TobbKevesebbUgyanannyiG1Mese`): Pötyi epres pikniket tart: párosítással oszt epret a katicáknak (ugyanannyi), bemutatja az egyenlőségjelet, aztán több eper marad, mint katica (több, kevesebb), bemutatja a „több felé nyíló” jelet, a gyerek kiteszi a jelet halaknál és tornyoknál, eggyel több almát keres, és virágot keres minden pillangónak. 12 oldal, 6 koppintós feladat.
- **Játszótér** (`SignPlayground`): két csoport, középen „?”; a gyerek kiválasztja a <, =, > jelet. A „Párosítsd!” gomb (és rossz válasz) után a két csoport párosítva is megjelenik, így látszik, melyikből marad pár nélkül. Új feladat gomb.
- **Játék** (`TobbKevesebbUgyanannyiG1Jatek`): 3 × 8 kérdés (több, kevesebb, ugyanannyi, a jelek felismerése; jel kitétele csoportoknál, tornyoknál, pöttykártyáknál, kezeknél, „melyik kép igaz?”; eggyel több/kevesebb, jut-e mindenkinek, „nem a méret számít”, mi kerülhet a jel másik oldalára, rövid mese), Párosító (ugyanannyi; kép–jel; eggyel több), Válogató (ugyanannyi / nem; több / kevesebb, mint három; <, =, >).

Fájlok: `TobbKevesebbUgyanannyiG1Scenes.tsx` (a tárgyrajzokat és a pöttykártyát a szomszédos `../szamlalasok/SzamlalasokG1Scenes.tsx`-ből veszi át), `TobbKevesebbUgyanannyiG1Parts.tsx`, `TobbKevesebbUgyanannyiG1Mese.tsx`, `TobbKevesebbUgyanannyiG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1TobbKevesebbUgyanannyiG1.test.tsx`.

## Eltérések a tankönyvtől
- A jeleket a könyv sorrendjében vezetjük be (előbb =, aztán < és >); a ceruzás „csőr” helyett Pötyi „éhes szájként” magyarázza: a több felé nyílik, a hegye a kevesebb felé mutat.
- A munkafüzet 18/1. és 19/1. feladata üres pöttykártyát, üres dominót (nulla pöttyöt) is használ, holott a nulla csak a II. fejezet „A nulla” leckéjében jön – a leckében legalább egy tárgy van minden csoportban.
- A rajzolós feladatok („rajzolj kevesebbet, többet, a jeleknek megfelelően”) helyett „mi kerülhet a jel másik oldalára?” és „melyik kép igaz?” koppintós kérdések vannak.
- A jelek írását (írásgyakorlat) képernyőn nem gyakoroltatjuk.
- A kupakos becslés és a piknikkép felidézése kimaradt; a nyitókép saját piknik Pötyivel, Zümivel, Csigusszal.
- Saját történet, tárgyak és mennyiségek (legfeljebb 7 tárgy).
