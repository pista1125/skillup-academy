# 2. A tömeg mérése (2. osztály, VIII. Mérések)

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`), 106–107. o. – „A tömeg mérése” (és a 101. o. nyitóoldal 2. feladata: csavaros dobozok sorba rendezése)
- Munkafüzet II. kötet (`OH-MAT02MA_II.pdf`), 66–69. o. (a 70. oldal már „Az űrtartalom mérése”)

## Mit tartalmaznak a könyvoldalak?
- **TK II/106:** mérleghinta négy gyerekkel (kg-ban), kétkarú mérleg ruhafogasból, 1 kg-os súly és almák / burgonyák becslése, „1 kg alma vagy 1 kg burgonya a nehezebb?”.
- **TK II/107:** két tárgy összehasonlítása kétkarú mérlegen, 1 kg-nál könnyebb tárgyak, mérlegfajták (kétkarú, személy-, konyhai, digitális, patikamérleg) és mit mérünk velük.
- **MF II/66:** mit mérünk mérleggel, hasonló tömegű dolgok párosítása, három zsák összege (75, 80, 100 kg).
- **MF II/67:** oroszlán heti húsadagja (5 kg naponta), elefánt napi eledele (32 + 6 + 60 kg), ládák a mérlegen (6 kg-osak), teherautók rakománya relációkkal.
- **MF II/68:** 100 kg cseresznyéből mennyi van még hátra, 1 kg-os gyümölcskosár, testtömeg-diagram.
- **MF II/69:** csoporttagok testtömege, csökkenő sorrend, zsáksorozat.

Mértékegység a könyvben: **csak kg** (dkg, g nincs 2. osztályban).

## Mit csinál a DiákZóna-lecke?
- Kétkarú mérleg három állása (bal lent, egyensúly, jobb lent), mérleghinta.
- A kilogramm: 1 kg-os súly, 1 kg liszt, kb. 5 alma; „1 kg toll = 1 kg vas”.
- Mérlegfajták, számolás kg-mal (összeadás, hiányzó súly, különbség, ládák).
- **Labor I – Kétkarú mérleg súlyokkal:** ismeretlen tömegű tök / dinnye / doboz / zsák; a gyerek 1, 2, 5, 10 kg-os súlyokat tesz fel és vesz le, a mérleg élőben billen, egyensúlynál kiírja a tömeget és az összeadást.
- **Labor II – Mérleghinta:** két gyerek vagy két gyerek egy felnőtt ellen; a gyerek tippel (bal le / egyensúly / jobb le), utána billen a hinta és megjelenik a számolás.

## Fájlok
- `MassG2Parts.tsx` – `PanItemPart`, `BalancePart`, `SeesawPart`, laborok (`WeightsBalanceLab`, `SeesawLab`)
- `MassG2Figures.tsx` – `BalanceStatesSvg`, `SeesawSvg`, `KgExamplesSvg`, `ScaleTypesSvg`, `FeatherIronSvg`
- `MassG2CardFigures.tsx` – `BalanceCard`, `CratesCard`, `WeightsCard`
- `MassG2Theory.tsx`, `MassG2Quiz.tsx` (30 kérdés, 21 ábrával, `g2-meres-tomeg-quiz`), `MassG2Matcher.tsx` (`g2-meres-tomeg-matcher`), `MassG2Sorter.tsx` (`g2-meres-tomeg-sorter`)
- Teszt: `src/test/grade2Topic8MassG2.test.tsx`

## Eltérések a tankönyvtől
- **MF II/67/4 nem egyértelmű:** a narancssárga feltételnek (52 kg < □ < 84 kg) két teherautó is megfelel (34 kg + 28 kg = 62 kg és 100 kg − 33 kg = 67 kg). Nálunk minden összehasonlításnak egy jó válasza van.
- **MF II/67/3:** a ferdén egymásra rakott ládák száma a rajzon nehezen számolható meg. Nálunk a ládák egymás mellett, jól megszámolhatóan állnak, és mindegyiken rajta a tömege.
- **MF II/68/3 diagram:** a rács 2 kg-onként van, az értékek (pl. 14 kg, 26 kg, 42 kg) vonal közé esnek. Nálunk 10 kg-os rács, az értékek a vonalon vagy pont középen vannak.
- **MF II/69/2 sorozat** (első nyíl „+1 kg”, de 73 → 75 már +2, „folytassátok többféleképpen”) nyitott, ellenőrizhetetlen → nem használtuk.
- **Csak kg:** a régi README dkg-ot és „fél kg = 50 dkg”-ot írt – ezt a 2. osztályos könyv nem tanítja, kihagytuk.
- **Szorzás csak kis számokkal** (ládák, napi adag, pl. 5 · 6 = 30), mert a fejezet a szorzótáblák után jön; az MF 67/1 heti (7 napos) adagja helyett saját 5 napos feladat.
- **Valódi mérések** (ruhafogas-mérleg, csoporttagok mérése, csavaros dobozok) helyett képernyős mérleg- és hintalabor; a valódi mérést a tanári órára hagyjuk.
- **„Kb. 5 alma = 1 kg”** csak közelítés; kimondjuk, hogy ez becslés.
- **Munkafüzet-oldalak:** a tömeg az MF II/66–69. oldalon van (a lessons.json 67–70-et írt).
- Saját nevek, számok, helyzetek.
