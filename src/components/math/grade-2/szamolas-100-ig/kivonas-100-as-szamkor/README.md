# 3. Kivonás 100-as számkör

## Források
- *Matematika 2. – tankönyv II. kötet* (`OH-MAT02TA_II.pdf`) 18–19., 42–43., 58., 73–74. o. (és a 95–97. o. 100-as kivonásai): Kivonás 0–60, 0–70, 0–80, 0–90 – kétjegyű − egyjegyű tízesátlépés nélkül (59 − 3) és tízesátlépéssel (54 − 8), matricaalbum, gyöngyfűzés (52 − 16), „melyik számra gondoltam” (56 és 18 különbsége), kivonótáblázatok, hangyás képek, nyilas láncok (65 → −30 → −9), hiányzó tag (55 + □ = 64, 65 − □ = 56), bűvös négyzetek, sajtok (77 − 8, 78 − 26), jeles kivonás, olimpiai karikák (86 − 17), lepke színezése, 100-ból kivonás (100 − 48).
- *Munkafüzet II. kötet* (`OH-MAT02MA_II.pdf`) 14–18., 26–30., 37–38., 45–47., 56–58. o.: kivonás kockás ábrákról, oszloponkénti sorozatok (26 − 6 … 56 − 16), hibás eredmények áthúzása, ♣ − 15 = ♥ szabály, hiányzó kivonandó, számegyenes-nyilak (63 − 3 − 4), kétlépéses kivonás (66 − 10 − 7), virágszirmok, egérlyukak, pingponglabdák, nyitott mondatok, különbségek 100-ig, ●/▲/■ szabálytáblázat.

## A DiákZóna-lecke
- **Tízesátlépés nélkül** – kistesó (`8 − 5 = 3` → `68 − 5 = 63`), kerek tízesre (`74 − 4 = 70`).
- **Kerek tízesből** (`80 − 6 = 74`, `100 − 9 = 91`).
- **Tízesátlépéssel** – vissza a kerek tízesig (`63 − 7 = 63 − 3 − 4 = 56`), rudakkal: 1 rúd felbontása 10 kockára.
- **Kétjegyű − kétjegyű** – előbb a tízesek (`66 − 27 = 66 − 20 − 7 = 39`).
- **Ellenőrzés összeadással** (`82 − 47 = 35` ↔ `35 + 47 = 82`), hiányzó szám (`65 − □ = 56`).
- **2 interaktív labor**:
  1. *Vegyél el rudakat és kockákat!* – véletlen feladat (51–99 − egy- vagy kétjegyű, többnyire bontással); „− 1 rúd”, „− 1 kocka”, „1 rúd → 10 kocka” gomb; jelez, ha elfogyott a kocka, ha túl sokat venne el, és a végén összeadással ellenőriz.
  2. *Ugrálj visszafelé!* – −10 / −1 ugrások a számegyenesen (a 2. lecke `HopLab` komponense kivonásos módban).

## Fájlok és teszt
- `Sub100G2Parts.tsx` – `needsBreak`, `subRods`, `RodsSubPart` (áthúzott elvétel, szükség esetén felbontott rúddal), `RodSubLab`
- `Sub100G2Figures.tsx` – `NoCrossSubSvg`, `RoundTenSubSvg`, `BridgeBackSvg`, `RodBreakSvg`, `TensThenOnesBackSvg`, `CheckWithAddSvg`
- `Sub100G2CardFigures.tsx` – `RodsSubCard150`, `RodsSubCard80`, (`JumpCard` a 2. leckéből, `minus` móddal)
- `Sub100G2Theory.tsx`, `Sub100G2Quiz.tsx` (30 kérdés, ebből 23 ábrával, `g2-c100-kivonas-quiz`), `Sub100G2Matcher.tsx` (`g2-c100-kivonas-matcher`), `Sub100G2Sorter.tsx` (`g2-c100-kivonas-sorter`)
- Teszt: `src/test/grade2Topic3Sub100G2.test.tsx`

## Eltérések a tankönyvtől
- **Külön kivonás, egyben 100-ig.** A könyv 10-esével bővíti a számkört, és minden oldalpáron keveri a kivonást az összeadással és a szorzással. A DiákZóna egy leckébe gyűjti a kivonást 100-ig, szorzás nélkül.
- **Rúdbontás képpel.** A könyv a tízesátlépést számegyenessel és sorozatokkal (MF II/30.) mutatja. A DiákZóna ezt kiegészíti a rúd-kocka bontással (1 tízes = 10 egyes), mert így látszik, *miért* nem lehet 2 kockából 8-at elvenni – ez a leggyakoribb hiba (`52 − 8 = 56`), amit a „Vigyázz!” rész és a labor is külön jelez.
- **Egyenes szövegezés a fordított helyett.** Az MF II/16/3. („58 csomag mintás radír van. Ez 26-tal több, mint ahány fehér…”) és a TK II/96/2. („Laci 56 kg-ot gyűjtött, 27 kg-mal többet, mint Réka”) fordított szövegezésű: a „több” szó ellenére kivonni kell. Ez 7–8 évesen nagyon nehéz; ebben a leckében csak egyenes szövegezés van („elvettünk”, „leszálltak”, „rövidebb”). A fordított szövegű feladatok az 5. (Szöveges feladatok) leckébe valók.
- **Mindig ellenőrzés.** A könyvben az ellenőrzés csak a TK II/73/1. műveletcsaládjaiban jelenik meg; a DiákZóna minden kidolgozott példában és a laborban is összeadással ellenőriz.
- **Nincs betű és nincs szimbólum-szabály.** A ●/▲/■ szabálytáblázatok (MF II/58/2.) és a betűértékek helyett csak □ az ismeretlen.
- **Saját szereplők és képek.** A könyv szereplőit (Kati és Peti, kisegér, Micó cica stb.) nem vesszük át; saját dobozos, zsákos, buszos, szalagos feladatok és rúdábrák szerepelnek.
