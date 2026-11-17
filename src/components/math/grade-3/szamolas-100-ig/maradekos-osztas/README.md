# 4. Maradékos osztás (I. Számolás 0-tól 100-ig)

## Források
- Tankönyv: OH-MAT03TA, 14–15. oldal („Maradékos osztás”).
- Munkafüzet I.: OH-MAT03MA_I, 18–21. oldal.

## Mit tartalmaznak az oldalak?
- **TK 14.:** építés színes rudakból, kockákból, pálcikákból („Hány építmény lett? Mennyi maradt?”), sokszögek 22 pálcikából, 13 körte kettesével; a lejegyzés: „13 : 2 = 6 marad 1”, illetve a füzetben a maradék az osztandó egyesei alatt; 15 korong csoportosítása 2-, 4-, 6-, 7-, 8-, 9-esével.
- **TK 15.:** csomagolás képekről, zoknipárok („9 : 2 = 4, mert 4 · 2 + 1 = 9”), oszlopos osztássorok a maradékok változásának megfigyelésére (24 : 4, 25 : 4…), osztás dominó pöttyeinek számával.
- **MF I/18–21.:** csoportosítás és lejegyzés (4 · 3 + 1 = 13 ↔ 13 : 3 = 4, maradék △), hiányzó maradék (47 = 9 · 5 + □), almák, rajz készítése adott osztáshoz, szendvicsek alapanyagai táblázatban, maradék-társasjáték (0–3), maradékos osztás ellenőrzéssel, „a lehető legnagyobb szám” a □ helyére.

## A DiákZóna lecke
- Kirakás: 14 korong négyes zacskókba (3 zacskó, marad 2), 16 pálcikából háromszögek.
- Kétféle lejegyzés egymás mellett (szóval és füzetrácson, a maradék az egyesek alatt), a könyvvel egyezően.
- **A maradék szabálya külön ábrán:** 12…17 : 4 – a maradék 0, 1, 2, 3, aztán újra 0. „A maradék mindig kisebb, mint az osztó.”
- Ellenőrzés: hányados · osztó + maradék = osztandó, színekkel.
- Mintapéldák: 29 : 4 lépésenként, 50 : 8 ellenőrzéssel, „hány autó kell?” (a maradék miatt eggyel több).
- Csapda: 26 : 4 = 5 marad 6 (túl nagy maradék) → 6 marad 2.

**Labor I – Csomagoló:** a gyerek gombnyomással zacskókba tölti a korongokat; ha kevesebb marad, mint egy zacskónyi, a program megmondja, hogy ez a maradék. Ezután + / − gombokkal leírja a hányadost és a maradékot; a visszajelzés a konkrét hibára utal (túl nagy maradék / számold meg a zacskókat). „Új feladat”: véletlen osztás (osztó 2–9, hányados ≤ 10, osztandó ≤ 99).
**Labor II – Maradék-vadász:** két lépés: előbb a hányados (túl sok / még belefér visszajelzés a szorzattal), aztán a maradék (ha ≥ osztó: szabály-emlékeztető).

## Komponensek
- `RemainderDivG3Figures.tsx`: `PacksSvg`, `NotationSvg`, `CheckSvg`, `RemainderCycleSvg`, `SticksSvg`
- `RemainderDivG3Theory.tsx`: `RemainderDivG3Theory`
- `RemainderDivG3Quiz.tsx`: `RemainderDivG3Quiz`, `REMAINDER_DIV_G3_QUESTIONS` (30 kérdés, 10/10/10, 18 ábrával) – `g3-c100-maradekos-quiz`
- `RemainderDivG3Matcher.tsx`: `RemainderDivG3Matcher` (3 × 8 pár) – `g3-c100-maradekos-matcher`
- `RemainderDivG3Sorter.tsx`: `RemainderDivG3Sorter` (3 × 3 kategória × 9 elem) – `g3-c100-maradekos-sorter`

## Teszt
`src/test/grade3Topic1RemainderDivG3.test.tsx`

## Eltérések a tankönyvtől
- **MF I/21/9. a) pontatlan szabály:** „Ügyelj arra, hogy a maradék *ne legyen több* az osztónál!” – ez megengedné, hogy a maradék egyenlő legyen az osztóval (pl. 18 : 9 = 1 marad 9). Helyesen: a maradék **kisebb**, mint az osztó. A DiákZóna így tanítja, külön ábrán és szabályként.
- **A szabályt a tankönyv nem mondja ki:** a TK 14–15. oldalon a maradék és az osztó viszonya csak megfigyelésként szerepel. Nálunk szabálydoboz, ábra, csapda, puskakártya és hibakereső kérdések vannak rá.
- **TK 15/10. b) túllépi a szorzótáblát:** 62 : 6, 64 : 6, 67 : 6 hányadosa 10, illetve 11 (67 : 6 = 11 marad 1), amihez a 11 · 6 kellene, ami nincs a szorzótáblában. A DiákZóna feladataiban a hányados legfeljebb 10.
- **TK 14/2. kétértelmű ábra:** a kockás építmény képéről nem dönthető el biztosan, hogy 4 vagy 8 kockából áll (egy vagy két réteg), pedig a válasz ettől függ (23 : 4 vagy 23 : 8). Nálunk minden ábra pontosan megmutatja, hány elem van egy csoportban.
- **Ellenőrzés kiemelése:** a könyv csak az „Így dolgozz!” mintában mutatja (9 : 2 = 4, mert 4 · 2 + 1 = 9). Nálunk külön szakasz, színes ábra és kvízkérdések szólnak róla.
- **Új gondolkodtató feladattípus:** „Hány csónak/autó kell?” – a maradék miatt eggyel többre van szükség. A könyvben ez nem szerepel, pedig tipikus hibaforrás.
- Saját szereplők és helyzetek (tojásdoboz, karkötő, csónak, matrica, fánk), a könyv szereplői (Emese) és történetei (körte, zokni, szendvics) nem szerepelnek.
