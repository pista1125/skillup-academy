# 3. osztály – Fejlesztési terv

## 0. Források

| Forrás | Hol van | Megjegyzés |
|---|---|---|
| **OH-MAT03TA** – Matematika 3. tankönyv (160 o.) | Storage `3_osztaly/`; letöltve: `scratch/g3/OH-MAT03TA__teljes.pdf` + `.txt` | **PDF-oldal = nyomtatott oldal + 1** |
| **OH-MAT03MA_I** – munkafüzet I. (96 o.) | `scratch/g3/OH-MAT03MA_I__teljes.pdf` + `.txt` | I/4–95: a 100-as számkörtől az írásbeli összeadásig. **PDF = nyomtatott + 2** |
| **OH-MAT03MA_II** – munkafüzet II. (104 o.) | `scratch/g3/OH-MAT03MA_II__teljes.pdf` + `.txt` | II/4–83: az írásbeli kivonástól a területig. **PDF = nyomtatott + 2** |

A `grade-3/**/README.md` vázak csak a címek alapján készültek, ezért mindegyiket újraírjuk. A Grade3View-ban is van hibás tartalom: például „Négyzet: 4·a, Téglalap: 2·(a+b)”, pedig a tankönyv betűs képletet nem használ.

## 1. Alapelv: a DiákZóna nem a tankönyv digitális változata

A tankönyvből és a munkafüzetből azt tudjuk meg, **mit** tanulnak a gyerekek, **milyen sorrendben**, **milyen eszközökkel** és **milyen jelöléssel**. A DiákZóna anyaga ehhez igazodik, de saját anyag.

1. **Saját feladatok, saját számok.** Ugyanazt a készséget gyakoroltatjuk, de más számokkal, más helyzetekben és saját szöveggel. A tankönyvi feladatszövegeket nem másoljuk át, és a könyv szereplőit (Emese, Réka, Zalán…) sem használjuk. A kidolgozott példák is saját példák.
2. **Javítjuk a könyv hibáit.** Az ágensek minden leckénél feljegyzik, ha a könyvben hibás eredményt, kétértelmű kérdést, az ábrának ellentmondó szöveget, következetlen jelölést vagy túl korán bevezetett fogalmat találnak. A DiákZóna a javított változatot tanítja. Ezek a README új **„Eltérések a tankönyvtől”** szakaszába kerülnek, és a témakör-riportban neked is felsorolom őket.
3. **Azt adjuk, amit a papír nem tud.** Azonnali visszajelzés, lépésenként lejátszható írásbeli művelet, véletlen számokkal újragenerálható labor, mozgatható eszközök (pálcika, korong, pénz, színes rúd, logikai lap, mérleg, óramutató), tipp a hiba típusa szerint.
4. **A 8–9 évesekhez igazítjuk** (a 4. osztálynál is egyszerűbben):
   - rövid mondatok, egy feladatban egy utasítás, „te” forma, bátorító hangnem;
   - kevés olvasnivaló, sok kép: a kvízkérdések **kb. 60–70%-a kap ábrát**;
   - a fejlődés menete: tárgyi (kirakás) → képi → számos;
   - az 1. szinten egylépéses, a 3. szinten legfeljebb kétlépéses szöveges feladat lesz.
5. **Szigorúan a számkörön belül maradunk.** A „Számolás 0-tól 200-ig” témakörben nincs 350, a negatív szám csak a IX. témakörben, a tört csak a XIV.-ben jelenik meg, az írásbeli szorzás csak a XIII.-ban. Egy lecke nem épít egy későbbi témakörre.
6. **A jelölés a könyvé.** Szorzás `·`, osztás `:`, ismeretlen □ △ ○. Nincs betűs képlet, halmazjelölés és LaTeX. A törteket szóval írjuk („3 negyed”), a mértékegységek a könyv szerintiek. A derékszög jele negyedkörív ponttal.

## 2. A munka módja (mint a 4. osztálynál)

- **Sablonok:** a 4-es `TheoryTemplate` / `QuizTemplate` / `MatcherTemplate` / `SorterTemplate` mind a 14 témakör mappájába bekerül, `3. OSZTÁLY • …` badge-dzsel.
- **Egy lecke csomagja:** `README.md`, `XxxFigures.tsx`, `XxxTheory.tsx` (rövid elmélet, saját kidolgozott példák, „Vigyázz!” doboz, 2 interaktív labor), `XxxQuiz.tsx` (3 × 10 kérdés, magyarázattal, kérdésenkénti badge-dzsel és ábrával), `XxxMatcher.tsx` (3 × 8 pár), `XxxSorter.tsx` (3 × 3 kategória), `index.ts`, valamint egy unit teszt.
- **Záró tudáspróba minden témakörben:** 3 × 30 kérdés a teljes témakörből.
- **Számozás:** a címekben a DiákZóna szekciószáma áll.
- **Bekötés:** új `activities/Grade3Activities.tsx`, `g3-` ág a routerben, a Grade3View kártyáinak cseréje Tananyag és Kvíz kártyára (wire-szkript).
- **Ellenőrzés:** minden szám `node -e`-vel ellenőrizve, scoped tsc és vitest. **Renderelt vizuális QA** (headless Chrome) témakörönként, mert a 4. osztálynál ez sok valódi ábrahibát talált.
- **Munkamenet:** témakörönként haladunk, legfeljebb 4 párhuzamos ágenssel. Témakörönként commit (`3I`, `3II`, …) és riport, a végén `npm test` és build.

## 3. Leckénkénti terv

A lista a DiákZóna meglévő 72 szekcióján alapul, plusz 5 új tudáspróba szekción, **összesen 77 lecke**. TK = tankönyv, MF = munkafüzet (kötet/oldal, nyomtatott oldalszám).

### I. Számolás 0-tól 100-ig (`szamolas-100-ig`, 8 lecke · TK 4–25 · MF I/4–34)
| # | Lecke | TK | MF | Labor ötlet |
|---|---|---|---|---|
| 1 | Számok 100-ig | 4–7 | I/4–7 | tízesrúd + egyeskocka építő, számegyenes-ugráló |
| 2 | Összeadás és kivonás | 8–10 | I/8–12 | tízesátlépés két lépésben (pótlás 10-re) |
| 3 | Szorzás és osztás | 11–13 | I/13–17 | szorzótábla-felfedező (sorok, oszlopok), bennfoglalás |
| 4 | Maradékos osztás | 14–15 | I/18–21 | korongok szétosztása tányérokra, maradék |
| 5 | Szöveges feladatok | 16–17 | I/22–23 | adat → terv → számolás → ellenőrzés → válasz |
| 6 | A műveletek sorrendje | 18–19 | I/24–25 | „melyiket számolod először?” lépkedő |
| 7 | A zárójel használata | 20–21 | I/26–27 | zárójel-kapcsoló: ugyanaz a kifejezés zárójellel és nélküle |
| 8 | Megálló (tudáspróba) | 22–25 | I/30–34 | **3 × 30** |

### II. A római számok (`romai-szamok`, 4 lecke · TK 26–27 · MF I/28–29)
| # | Lecke | Labor ötlet |
|---|---|---|
| 1 | A római számjegyek és alapszabályok (I, V, X, L, C) | jelkirakó: mikor ad hozzá, mikor von le |
| 2 | Római számok írása és olvasása 100-ig | átváltó arab ↔ római |
| 3 | Római számok a mindennapokban és fejtörők | óralap, fejezetszám; pálcika-áthelyezés |
| 4 | **új:** Gyakorlás, tudáspróba | **3 × 30** |

### III. Számolás 0-tól 200-ig (`szamolas-200-ig`, 6 lecke · TK 28–43 · MF I/35–47)
| # | Lecke | TK | MF |
|---|---|---|---|
| 1 | Számok 200-ig | 28–31 | I/35–38 |
| 2 | Számok helye a számegyenesen | 32 | I/39 |
| 3 | Számszomszédok, kerekítés | 33–34 | I/40–41 |
| 4 | Összeadás és kivonás | 35–37 | I/42–44 |
| 5 | Szorzás és osztás | 38–40 | I/45–47 |
| 6 | Megálló (tudáspróba, **3 × 30**) | 41–43 | I/56–60 részben |

### IV. Mérések (`meresek`, 10 lecke · TK 44–51 és 138–149 · MF I/48–60, II/71–83)
| # | Lecke | TK | MF |
|---|---|---|---|
| 1 | Mit mivel mérünk? | 44 | I/48 |
| 2 | A tömeg mérése | 45–46 | I/48–51 |
| 3 | Az űrtartalom mérése | 47–48 | I/52–55 |
| 4 | A hosszúság mérése | 142–145 | II/75–77 |
| 5 | A kerület mérése | 146 | II/78 |
| 6 | A téglalap és a négyzet kerülete | 147 | II/79–80 |
| 7 | A terület mérése | 148 | II/81 |
| 8 | A téglalap és a négyzet területe | 149 | II/82–83 |
| 9 | Az idő mérése | 138–141 | II/71–74 |
| 10 | **új:** Gyakorlás, tudáspróba (**3 × 30**) | 49–51 | I/56–60 |

Laborok: kétkarú mérleg, mérőpohár-töltögető, vonalzó-leolvasó, négyzetrácsos kerület- és terület-rajzoló, óra húzható mutatókkal. A téglalap kerülete „szemben lévő oldalak” szóhasználattal készül, képlet nélkül.

### V. Számolás 0-tól 500-ig (`szamolas-500-ig`, 5 lecke · TK 52–67 · MF I/61–76)
1. Számok 500-ig (TK 52–55, MF I/61–64)
2. Számszomszédok, kerekítés (56–57, I/65–67)
3. Összeadás és kivonás (58–60, I/68–72)
4. Szorzás és osztás (61–63, I/73–76)
5. Megálló (tudáspróba, **3 × 30**; TK 64–67)

### VI. Válogatások, csoportosítások (`valogatasok-csoportositasok`, 4 lecke · TK 68–73 · MF I/77–80)
1. Válogatás tulajdonságok szerint: logikai lapok, „nem illik a sorba”, barkochba
2. Venn-diagramok és halmazok, kifejezések nélkül, „karika” és „címke” szóhasználattal
3. Sorba rendezés és lehetőségek („hányféleképpen?”, igaz/hamis állítások)
4. **új:** Gyakorlás, tudáspróba (**3 × 30**). A mostani „3. … (Megálló)” címből kikerül a „(Megálló)”.

### VII. Írásbeli összeadás (`irasbeli-osszeadas`, 6 lecke · TK 74–85 · MF I/81–95)
1. Háromjegyű számok összeadása (TK 74–75, MF I/81)
2. Az összeg becslése (76, I/82–83)
3. Írásbeli összeadás (77–80, I/84–90). Labor: lépésenkénti írásbeli összeadás maradékkal.
4. Az összeg változásai (81, I/91–92)
5. Szöveges feladatok (82, I/93–95)
6. Megálló (tudáspróba, **3 × 30**; TK 83–85)

### VIII. Írásbeli kivonás (`irasbeli-kivonas`, 5 lecke · TK 86–97 · MF II/4–18)
1. Háromjegyű számok kivonása (TK 86–87, MF II/4)
2. A különbség becslése (88, II/5)
3. Írásbeli kivonás (89–93, II/6–11). Labor: lépésenkénti pótlásos kivonás, ellenőrzés összeadással.
4. A különbség változásai (94, II/12–13)
5. Megálló (tudáspróba, **3 × 30**; TK 95–97, MF II/14–18)

### IX. Ismerkedés a negatív számokkal (`negativ-szamok`, 4 lecke · TK 98–99 · MF II/19–22)
1. Negatív számok a mindennapokban (hőmérő, pince és emelet, adósság)
2. A számegyenes és a nulla
3. Összehasonlítás és változások (melegedés, hűlés)
4. **új:** Gyakorlás, tudáspróba (**3 × 30**). A mostani „3. … (Megálló)” címből kikerül a „(Megálló)”.

### X. Testek, síkidomok (`testek-sikidomok`, 5 lecke · TK 100–107 · MF II/23–31)
1. A testek (TK 100–101, MF II/23–24)
2. A téglatest és a kocka (102–103, II/25–26)
3. Síkidomok, sokszögek (104–105, II/27–29)
4. Tükrözések, szimmetria (106–107, II/30–31)
5. Megálló (tudáspróba, **3 × 30**)

Laborok: forgatható test (lapok, élek, csúcsok számlálása), négyzetrácsos tükröző, sokszög-válogató.

### XI. Számolás 0-tól 1000-ig (`szamolas-1000-ig`, 5 lecke · TK 108–117 · MF II/32–43)
1. Számok 1000-ig (TK 108–110, MF II/32–35)
2. Számszomszédok, kerekítés (111, II/36–37)
3. Összeadás és kivonás (112–113, II/38–40)
4. Szorzás és osztás, kerek számokkal (114–115, II/41–43)
5. Megálló (tudáspróba, **3 × 30**; TK 116–117)

### XII. Írásbeli összeadás és kivonás 0-tól 1000-ig (`irasbeli-muveletek-1000-ig`, 5 lecke · TK 118–121 · MF II/44–47)
A tankönyvben ez csak 4 vegyes oldal, a DiákZóna szerkezete itt bővebb (saját anyag):
1. Írásbeli összeadás 1000-ig (több tag, többszöri átlépés)
2. Írásbeli kivonás 1000-ig (nullák a kisebbítendőben)
3. A műveletek sorrendje és a zárójelek
4. Vegyes műveletek és szöveges feladatok (táblázat, térkép, hiányzó szám)
5. Megálló (tudáspróba, **3 × 30**)

### XIII. Írásbeli szorzás (`irasbeli-szorzas`, 6 lecke · TK 122–133 · MF II/48–66)
1. Szorzás egyjegyű számmal (TK 122–123, MF II/48–49)
2. A szorzat becslése (124, II/50–51)
3. Írásbeli szorzás egyjegyű szorzóval (125–128, II/52–57). Labor: lépésenkénti írásbeli szorzás.
4. Összefüggések, következtetések (129, II/58–59)
5. A műveletek sorrendje (130–131, II/60–61)
6. Megálló (tudáspróba, **3 × 30**; TK 132–133, MF II/62–66)

### XIV. Ismerkedés a törtekkel (`tortes-szamok`, 4 lecke · TK 134–137 · MF II/67–70)
A szekciók tartalmasabb címet kapnak (az azonosítók maradnak):
1. Egyenlő részekre osztás (hajtogatás, torta, fél, negyed)
2. Törtrészek: fele, harmada, negyede, tizede („3 negyed” szóval írva)
3. Törtrész mennyiségekből (negyed kg, fél dl, ötöd m, harmad óra)
4. **új:** Gyakorlás, tudáspróba (**3 × 30**)

### Kimarad
- Év végi ismétlés (TK 150–157, MF II/84–95)
- Mindennapi pénzügyeink (MF II/96–)
- A Kitekintő oldalak (pl. euró) önálló leckeként. Legfeljebb a tudáspróba egy-két feladatába kerülnek be.

## 4. Döntések (2026-11-17)

1. A Grade3View régi játék- és kvízkártyáinak bekötését töröljük, a komponensek megmaradnak.
2. Az 5 új tudáspróba szekció és a VI/IX/XIV címek átnevezése jóváhagyva.
3. Az I. témakörrel kezdünk, utána a DiákZóna sorrendjében haladunk, legfeljebb 4 ágenssel, témakörönként commit.

Segédeszközök: `scratch/g3/` (lessons.json, queue.txt, AGENT_BRIEF.md, wire.mjs, update-config.cjs, render/render.sh).
4. A római számok 100-ig, L-lel és C-vel készülnek, pedig a könyv csak I, V, X jelekkel 39-ig tanít (a felhasználó döntése). A 4. osztályos római lecke L és C nélkül készült, ezt később érdemes összehangolni.
5. A „fél kg”, „félliteres”, „fél óra” mindennapi kifejezésként használható (a felhasználó döntése). Törtrész-számolás csak a XIV. témakörben van.
6. Az írásbeli kivonás a hagyományos pótlásos-maradékos módszerrel készül, nem a könyv felváltásos módszerével (a felhasználó döntése).
