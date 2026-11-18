# 5. Szöveges feladatok

## Források
- Tankönyv II. kötet (`OH-MAT02TA_II.pdf`, PDF = nyomtatott + 2): 20. („Miből hány van?”), 28. („Papírok, írószerek”), 44. („Erdőn, mezőn”), 49. („Bogarak, rovarok”), 60. („A boltban”), 67. („Egerek és macskák”), 75. („Sport”), 81. („Sportversenyek”) oldal.
- Munkafüzet: nincs külön oldal.

## Mit tartalmaznak a könyvoldalak?
- Füzetben megoldandó, témakörönként csoportosított szöveges feladatok 100-ig: maradt (51 − 24), ennyivel több/kevesebb, „ez 19-cel kevesebb, mint…” típusú fordított megfogalmazás, háromtagú összeg, hiányzó rész (80 kg-ig mennyi kell még), két lépés (vásárlás, eladás után mennyi marad).
- A 28., 49., 67. és 81. oldal feladatainak nagy része szorzás/osztás (6 · 7, 56 = 7-szer annyi, 8 m percenként), illetve kombinatorika (sorrendek, párosítások).

## A DiákZóna-lecke
- Az 5 lépés (Adatok → Terv → Számolás → Ellenőrzés → Válasz), ahogy az I. témakörben.
- Szalagos ábra (rész–egész és összehasonlító szalag) minden feladattípushoz.
- Típusok: összesen, maradt, mennyi kell még, mennyivel több, ennyivel több/kevesebb, fordított megfogalmazás („Ez 14-gyel több, mint Zsófié”), két lépés, árlista leolvasása, válaszmondat.
- 2 labor: **Melyik művelet kell?** (véletlen történet, + / − választás, majd eredmény; a hibás műveletre a feladattípushoz illő tipp) és **Szalagos ábra** (a második szalag hosszát kell beállítani ±1, ±10 gombokkal, „több → hosszabb” visszajelzéssel).

## Komponensek
- `WordProblems100G2Parts.tsx` – `BarPart`, `CompareBarsPart`, `IconPart`, `QFig`, feladatgenerátor (`makeWPTask`, `wpOptions`, `makeBarTask`), magyar ragozás számjegyhez (`acc`: 18-at, 25-öt; `ins`: 18-cal, 14-gyel), laborok (`OperationLab`, `BarLab`)
- `WordProblems100G2Figures.tsx` – `FiveSteps100Svg`, `PartWhole100Svg`, `CompareMore100Svg`, `InverseCompare100Svg`, `TwoStep100Svg`, `KeyWords100Svg`
- `WordProblems100G2CardFigures.tsx` – `BarCard150`, `BarCard80`, `CompareCard150`, `CompareCard80`
- `WordProblems100G2Theory.tsx`, `WordProblems100G2Quiz.tsx` (`g2-c100-szoveges-quiz`), `WordProblems100G2Matcher.tsx` (`g2-c100-szoveges-matcher`), `WordProblems100G2Sorter.tsx` (`g2-c100-szoveges-sorter`)
- Teszt: `src/test/grade2Topic3WordProblems100G2.test.tsx`

## Eltérések a tankönyvtől
- **Csak + és −.** A könyv szöveges oldalai keverik a szorzást, osztást és a kombinatorikát (pl. 28/1 „mindennap 6-ot”, 49/3 „7-szer annyi”, 67/5 „8 métert percenként”, 81/1 „9-en versenyeznek”, 20/4 és 75/4 sorrendek). A III. témakörben ezek kimaradnak; a szorzásos/osztásos szövegesek a IV–V. témakörbe tartoznak.
- **Egyértelmű adatok.** A TK 75/5 („a román versenyző ennél 8 m-rel, a finn versenyző 7 m-rel kevesebbre”) nem egyértelmű: a finn eredményét a magyarhoz vagy a románhoz kell viszonyítani? A DiákZóna-feladatokban minden viszonyítás megnevezi, kihez képest több/kevesebb.
- **Ellenőrizendő tényadat:** a TK 81/3 szerint a londoni olimpián 2 · 2 · 7 = 28 sportágban versenyeztek; a 2012-es londoni játékok hivatalos programja 26 sportágat tartalmazott. (Ez a feladat szorzásos, ezért ebben a leckében nem szerepel.)
- **Tízesátlépés csak lépésenként.** A könyv 51 − 24, 67 − 49 típusú feladatai írásbeli módszer nélkül nehezek; a magyarázatok mindig bontással számolnak (72 − 30 = 42, 42 − 6 = 36), és ellenőrzést kérnek.
- **Szalagos ábra** minden típusnál – a könyvben a feladatok rajz nélkül, „a füzetedben oldd meg” utasítással szerepelnek.
- **Saját szereplők, számok és történetek**; a fordított megfogalmazás külön csapdaként és külön labor-visszajelzéssel szerepel.
