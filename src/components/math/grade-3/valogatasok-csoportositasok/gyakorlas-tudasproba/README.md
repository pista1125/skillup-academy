# 4. Gyakorlás, tudáspróba (VI. Válogatások, csoportosítások)

## Források
- Tankönyv (OH-MAT03TA): **68–73. o.** – a fejezet minden oldala (válogatás, logikai lapok, válogatási fa, halmazábrák, igaz/hamis állítások, jelekkel megadott lap, kakukktojás, számok válogatása).
- Munkafüzet I (OH-MAT03MA_I): **77–80. o.** – halmazábrák számokkal, növényekkel, élőlényekkel, síkidomokkal; I/H állítások; jelekkel megadott lap (79/9); kakukktojás a halmazokban (80/12).
- A fejezetnek a könyvben nincs külön Megálló / „Ellenőrizd a tudásodat!” oldala, ezért a tudáspróba a három lecke egészét fedi le (1. Válogatás tulajdonságok szerint, 2. Venn-diagramok és halmazok, 3. Sorba rendezés és lehetőségek).

## Mit csinál a DiákZóna-lecke?
- **Tananyag („Amit már tudsz”)**: a fejezet három témája egy képen; a logikai lap 4 tulajdonsága és jelei; a halmazábra 4 része; sorrendek és lehetőségek; „minden / van olyan / egyik sem”; vegyes mintafeladatok; csapdák (határ szám, a közös rész kétszeri számolása).
- **Labor I – Vegyes feladatsor**: véletlen feladat 4 fajtából (Hová kerül a szám a halmazábrában? Hány lehetőség van? Igaz vagy hamis? Melyik nem illik a többi közé?), minden szám ≤ 500, azonnali visszajelzés indoklással, pontszámláló, „Új feladat”.
- **Labor II – Melyik lapra gondoltam?**: a lap jelekkel (színes paca, kicsi/nagy emberke, lyukas/nem lyukas jel, forma körvonala); 6 lap közül kell választani, a rossz tippnél a gép megmondja, melyik jel nem stimmel.
- **Kvíz**: 90 kérdés, szintenként 30 (mindegyik szinten 10 válogatás, 10 halmazábra, 10 sorrend/lehetőség/igaz-hamis); 71 kérdésnek van ábrája.
- **Párosító**: lap ↔ leírás (jelkártyával is), halmazábra-részek ↔ jelentésük, lehetőségek ↔ darabszám.
- **Csoportosító**: nagy és lyukas / nagy, de nem lyukas / kicsi; számok a „páros • háromjegyű” halmazábrában; lehetőségek száma (6-nál kevesebb / pontosan 6 / több).

## Komponensek
- `GroupingExamG3Theory` (topicId `g3-grouping`), `GroupingExamG3Quiz` (`GROUPING_EXAM_G3_QUESTIONS`, `g3-grp-tudasproba-quiz`),
  `GroupingExamG3Matcher` (`GROUPING_EXAM_G3_MATCHER_LEVELS`, `g3-grp-tudasproba-matcher`), `GroupingExamG3Sorter` (`GROUPING_EXAM_G3_SORTER_LEVELS`, `g3-grp-tudasproba-sorter`)
- Ábrák: `GroupingExamG3Figures` (ChapterMapSvg, BlockSignsSvg, VennPartsSvg, CountingRecapSvg, QuantifiersSvg); kártyák: `GroupingExamG3CardFigures`; közös elemek: `GroupingExamG3Parts`.
- A rajzok a fejezet leckéiből jönnek: logikai lap – 1. lecke (`SortingByPropertyG3Parts`), halmazábra – 2. lecke (`VennG3Parts`), sorrend-ikonok – 3. lecke (`ArrangementsG3Parts`, `ArrangementsG3CardFigures`). Így a tudáspróba pontosan úgy néz ki, mint a leckék.
- Teszt: `src/test/grade3Topic6GroupingExamG3.test.tsx`

## Eltérések a tankönyvtől
1. **TK 73/19 – a határ szám és a „közös rész nélküli” halmazábra.** A bal halmazban a 150-nél kisebb számok vannak, a jobb címke 150 < □ < 200; a b) részben a **150** is szerepel, de egyik címke sem igaz rá, és a könyv nem mondja meg, hová kerül. A c) részben a két halmazt egymásba érő karikákkal kéri rajzolni, pedig nincs közös elemük. A DiákZóna külön tanítja: a határ szám egyik „kisebb/nagyobb” halmazba sem tartozik (kvíz 80., Labor I), és a közös rész nélküli halmazokat külön karikákkal rajzoljuk (kvíz 42., 76.).
2. **TK 70/11 – csak tagadásokból kitalált lap.** A d) sorban minden jel „nem”: a gyereknek ki kell következtetnie, hogy a lap kék, nagy, nem lyukas négyzet. Ez csak azért működik, mert a készletben pontosan 4 szín és 3 forma van – a könyv ezt nem mondja ki. Nálunk kimondjuk („ha nem piros, sárga, zöld, akkor kék”), és külön kvízkérdés gyakoroltatja (63.).
3. **Jelölés egységesítése.** A TK 70/11 „nem lyukas”, az MF 79/9 „sima” szót használ ugyanarra; a DiákZóna végig „lyukas / nem lyukas”. A jelkártyán mindkét könyvbeli jelet (szürke lap ponttal / pont nélkül) megtartjuk.
4. **MF 80/10b** „…amely nem növényevő és nem emlős” – a listán növény (kökény) és gomba is van, rájuk a „növényevő” nem értelmezhető; az állítás kétértelmű. Nálunk minden állítás egyértelműen igaz vagy hamis minden elemre.
5. **MF 77/3** „a legkisebb alaki értékű számjegy” – nehézkes, félrevezető kifejezés (egyszerűen a 0). Nálunk rövid, egy tulajdonságos állítások vannak.
6. **A közös rész számolása.** A könyv (MF 78/4–5, TK 71/13) elhelyezteti az elemeket, de nem kérdezi, hány elem van egy karikában összesen. A tipikus hiba (a közös részt kihagyják, vagy kétszer számolják) nálunk külön csapda-doboz és kvízkérdések (17., 43., 71., 77.).
7. **Számkör.** A könyv válogató számai 200 alatt maradnak (TK 72/18, 73/19); a fejezet számköre ≤ 500, ezért a DiákZóna feladatai 500-ig mennek (a háromjegyű szám, „300-nál nagyobb” címkék így életszerűbbek).
8. **Saját feladatok, saját szereplők.** Nincs átvett feladatszöveg vagy szereplő (Zalán, Ernő, Klári, Vera stb.); a könyvbeli feladattípusokat saját számokkal és helyzetekkel gyakoroljuk.
