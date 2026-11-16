# 4. osztály – Fejlesztési terv

## 0. Források

| Forrás | Hol van | Megjegyzés |
|---|---|---|
| **OH-MAT04TA** – Matematika 4. tankönyv (168 o.) | Storage `4_osztaly/`; letöltve: `scratch/g4/OH-MAT04TA__teljes.pdf` + `.txt` | elmélet, kidolgozott példák, ábrák |
| **OH-MAT04MA_I** – munkafüzet I. (96 o.) | `scratch/g4/OH-MAT04MA_I__teljes.pdf` + `.txt` | gyakorló feladatok a kvízekhez (I–IV., negatív számok) |
| **OH-MAT04MA_II** – munkafüzet II. (104 o.) | `scratch/g4/OH-MAT04MA_II__teljes.pdf` + `.txt` | osztás, geometria, válogatások, szorzás, törtek, idő |

**PDF-oldal = nyomtatott oldal + 2** (mindhárom kötetnél).
A `grade-4/**/README.md` vázak a címek alapján készültek (pl. LaTeX-es `x ∈ ℕ`), ezért minden leckénél a tankönyv és a munkafüzet alapján kell újraírni őket.

## 1. A munka módja (mint a 12. osztálynál)

- **Sablonok:** a 12-es (11-es) `TheoryTemplate` / `QuizTemplate` / `MatcherTemplate` / `SorterTemplate` bemásolva a 8 témakör mappájába, `4. OSZTÁLY • …` badge-dzsel.
- **Egy lecke csomagja:** `README.md` · `XxxFigures.tsx` · `XxxTheory.tsx` (rövid, gyerekbarát elmélet, kidolgozott példák, „Vigyázz!” doboz, 2 interaktív labor) · `XxxQuiz.tsx` (3 × 10 kérdés, magyarázattal) · `XxxMatcher.tsx` (3 × 8 pár) · `XxxSorter.tsx` (3 × 3 kategória) · `index.ts` · unit teszt.
- **Életkor:** 10 éveseknek szól. Rövid mondatok, sok kép, konkrét helyzetek (pénz, bolt, hőmérő, óra), nincs halmazjelölés és LaTeX-képlet. A számok tagolása szóközzel történik (pl. 4 560), a szorzás jele `·`, az osztásé `:`.
- **Kvízábrák:** ahol segít, minden kérdés kap SVG-ábrát (számegyenes, mérőeszköz, alakzat, törtrész, hőmérő, óra), az ismeretlent „?” jelöli. Minden kérdésnek saját `questionTypeBadge`-e van. A derékszöget negyedkörív és pont jelöli.
- **Számozás:** a címekben a diákzóna szekciószáma áll.
- **Bekötés:** új `activities/Grade4Activities.tsx`, `g4-` ág a `MathActivityRouter`-ben, a `Grade4View` „Hamarosan” kártyáinak cseréje Tananyag és Kvíz kártyára (wire-szkript, mint a 12-esnél). **A meglévő játékok** (Matek Kígyó, Logikai Készlet, Építőkockák, Számegyenes, Tükrözés, Törtek modul stb.) **megmaradnak** a kártyák mellett.
- **Munkamenet:** témakörönként haladunk, legfeljebb 4 párhuzamos ágenssel, témakörönként commit (`4I`, `4II`, …) és riport, a végén `npm test` és build.

## 2. Leckénkénti terv (a diákzóna meglévő 51 szekciója szerint)

TK = tankönyv oldal, MF = munkafüzet kötet/oldal.

### I. Számolás 10 000-ig (`szamolas-10000-ig`, 13 lecke)
| # | Lecke | TK | MF | Labor ötlet |
|---|---|---|---|---|
| 1 | Számok 0-tól 1000-ig | 5–10 | I/4–7 | helyiérték-táblázat (Sz-T-E), számegyenes-nagyító |
| 2 | Összeadás és kivonás 1000-ig | 11–16 | I/8–11 | tízesátlépés lépésenként, pótlás |
| 3 | Szorzás és osztás 1000-ig | 17–20 | I/12–15 | szorzótábla-felfedező, maradékos osztás |
| 4 | A műveletek sorrendje | 21 | I/16–17 | zárójel-kapcsoló: ugyanaz a kifejezés zárójellel és anélkül |
| 5 | Nyitott mondatok | 22 | – | mérleg-labor: □ megkeresése, próbálgatás táblázattal |
| 6 | Szöveges feladatok | 23–27 | I/18 | adatgyűjtés → terv → számolás → ellenőrzés lépései |
| 7 | A római számok | 28 | I/19 | római ↔ arab átváltó |
| 8 | Játékok a logikai lapokkal | 31–32 | – | tulajdonság-szűrő (szín, forma, méret, lyukas) |
| 9 | Csoportosítások és számok 10 000-ig | 34–42 | I/28–33 | ezres–százas–tízes–egyes csoportosító |
| 10 | Számszomszédok, kerekítés | 43–44 | I/34–35 | kerekítő számegyenes (tízes, százas, ezres) |
| 11 | Összeadás és kivonás 10 000-ig | 45–47 | I/36–39 | becslés + pontos eredmény |
| 12 | Szorzás és osztás 10 000-ig | 48–50 | I/40–43 | kerek számok szorzása, osztása |
| 13 | Megálló és Kitekintő (tudáspróba) | 29–30, 51–52 | I/20–27 | **3 × 30 kérdés** |

### II. Mérések (`meresek`, 8 lecke)
| # | Lecke | TK | MF | Labor ötlet |
|---|---|---|---|---|
| 1 | A hosszúság mérése | 54–56 | I/45–47 | vonalzó-mérő (mm, cm, dm, m, km), átváltó |
| 2 | A kerület mérése | 57–58 | I/48–50 | négyzetrácsos kerületrajzoló |
| 3 | A terület mérése | 59–60 | I/51–53 | egységnégyzet-lefedés |
| 4 | A tömeg mérése | 61–63 | I/54–56 | kétkarú mérleg (g, dkg, kg, t) |
| 5 | Az űrtartalom mérése | 64–66 | I/57–59 | mérőpohár-töltögető (ml, cl, dl, l, hl) |
| 6 | Az idő mérése | 153–158 | II/72–77 | analóg + digitális óra, időtartam-számoló |
| 7 | Megálló (tudáspróba) | 67–68 | I/60–67 | **3 × 30 kérdés** |
| 8 | Kitekintő | 69 | – | mértékegységek a nagyvilágban (rövid lecke) |

### III. Írásbeli műveletek (`irasbeli-muveletek-10000-ig`, 7 lecke)
| # | Lecke | TK | MF | Labor ötlet |
|---|---|---|---|---|
| 1 | Írásbeli összeadás és kivonás | 71–79 | I/68–76 | lépésenkénti írásbeli művelet maradékokkal |
| 2 | Írásbeli szorzás egyjegyű számmal | 80–83 | I/77–81 | lépésenkénti írásbeli szorzás |
| 3 | Írásbeli osztás egyjegyű osztóval | 93–100 | II/4–12 | lépésenkénti osztás, ellenőrzés szorzással |
| 4 | A számok tulajdonságai | 101–102 | II/13–16 | oszthatóság 2-vel, 5-tel, 10-zel, páros/páratlan |
| 5 | Összefüggések, következtetések | 103–104 | II/17–18 | táblázat-szabály kereső |
| 6 | A műveletek közötti kapcsolatok | 105 | II/19–20 | inverz műveletek, ellenőrzés |
| 7 | A műveletek sorrendje | 106–107 | II/21–23 | kifejezésfa / sorrend-lépkedő |

A TK 84–86. és 108–110. oldalán lévő Megálló/Kitekintő a 2., illetve 7. lecke és a kvízek extra anyaga lesz.

### IV. A negatív számok (`negativ-szamok`, 3 lecke; TK 87–92, MF I/82–87)
| # | Lecke | Tartalom |
|---|---|---|
| 1 | A negatív számok a mindennapokban | hőmérő, tengerszint, emelet/pince |
| 2 | Számegyenes és ellentettek | számegyenes, ellentett, abszolút érték nélkül |
| 3 | Összehasonlítás és változások | hőmérséklet-változás, készpénz és adósság (fabatka) |

### V. Síkidomok és testek (`sikidomok-testek`, 8 lecke)
| # | Lecke | TK | MF |
|---|---|---|---|
| 1 | Síkidomok, sokszögek | 112–116 | II/24–28 |
| 2 | A kör | 117 | II/29–30 |
| 3 | A testek | 118–122 | II/31–36 |
| 4 | A tükrözés | 123–125 | II/37–38 |
| 5 | Nagyítás, kicsinyítés | 126–127 | II/39 |
| 6 | Eltolás | 128 | II/40 |
| 7 | Elforgatás | 129 | II/40 |
| 8 | Tájékozódás | 130 | II/41 |

Laborok: négyzetrácsos rajzoló (tükrözés, eltolás, nagyítás), téglatest/kocka építő kockákból, körző-labor, koordináta-rács (sakktábla-jelölés). Az MF II/42–47 (Ellenőrizd, Gyakorolj) a kvízek extra anyaga.

### VI. Válogatások, csoportosítások (`valogatasok-csoportositasok`, 4 lecke; TK 131–134, MF II/48–51)
1. Válogatások halmazokba (Venn-diagram) · 2. Válogatások táblázatokba · 3. Hányféle lehetőség van? (sorba rendezés, fa-diagram) · 4. Igaz vagy hamis? (állítások, „minden”, „van olyan”)

### VII. Írásbeli szorzás kétjegyű szorzóval (`irasbeli-szorzas`, 3 lecke)
| # | Lecke | TK | MF |
|---|---|---|---|
| 1 | Szorzás kétjegyű szorzóval | 136–137 | II/52 |
| 2 | Írásbeli szorzás | 138–143 | II/53–62 |
| 3 | Összefüggések, következtetések | 144–146 | II/63–65 |

### VIII. A törtszámok (`tortszamok`, 5 lecke; TK 147–152, MF II/66–71)
1. A törtrész és a törtek értelmezése · 2. Egynél kisebb törtek · 3. Az 1 egész és az egynél nagyobb törtek · 4. Törtek összehasonlítása · 5. Törtrész kiszámítása, szöveges feladatok. Laborok: pizza- és csokitábla-osztó, színes rudak, törtek a számegyenesen.

## 3. Nyitott kérdések

1. **Záró tudáspróba:** csak az I. és a II. témakörnek van Megálló szekciója. A többi hat témakörnél az utolsó leckét nem bővítjük (a), vagy minden témakör kapjon új „Gyakorlás, tudáspróba” szekciót 3 × 30 kérdéssel (b)?
2. **Kimaradó részek:** az „Az alsó tagozaton tanultak rendszerezése” (TK 159–167, MF II/84–95) és a „Mindennapi pénzügyeink” (MF II/96–103) a 11-es döntés szerint kimarad?
