# I. Számolás 0-tól 20-ig (2. osztály)

## Fejezet Áttekintés
A fejezet célja az 1. osztályban megszerzett számfogalom és alapműveleti készségek felelevenítése, elmélyítése és kiterjesztése a 0–20-as számkörben. A témakör végigkíséri a tanulókat a számok olvasásától és helyiérték-értelmezésétől a 10-es és 20-as számkörben végzett összeadáson és kivonáson (tízesátlépéssel is) át a szöveges feladatokig és az összefoglaló témazáró tudáspróbáig.

- **Témakör azonosító (`topicId`):** `g2-numbers-to-20`
- **Útmutató források:** *Matematika 2. osztályosoknak I. kötet* (4–23. o.) és *Matematika munkafüzet 2. osztályosoknak I. kötet* (3–15. o.)
- **Jelölési szabályok:** csak 0–20 közötti egész számok; jelölések: `+`, `−`, `<`, `=`, `>`, `□`, `△`, `○`. Nincs szorzás, osztás, tört, negatív szám, betűs változó vagy LaTeX jelölés.

---

## Közös sablonok
A fejezet gyökérkönyvtárában elhelyezett közös komponensek (`grade = 2`, `chapterId = 'szamolas-20-ig'`):
- `TheoryTemplate.tsx` — tananyag elrendezés, szabálykártya, interaktív laborok, PDF-export
- `QuizTemplate.tsx` — 3 szintes kvíz (`questionTypeBadge`, `cheatSheets`, Párosító és Csoportosító játékmódok)
- `MatcherTemplate.tsx` — 3 szintes kártyás párosító játék
- `SorterTemplate.tsx` — 3 szintes csoportosító játék (`topicId = 'g2-count-20-sorter'`)

---

## Altémák (7 altéma)

| # | Altéma | Mappa | Komponens prefix | Alap ID (`base`) | Szekció ID | Típus |
|---|---|---|---|---|---|---|
| 1 | **Számok 0-tól 20-ig** | `szamok-0-tol-20-ig` | `Numbers20G2` | `g2-c20-szamok` | `g2-count20-sec-1` | 30 kérdés |
| 2 | **Összeadás 10-es számkör** | `osszeadas-10-es-szamkor` | `Add10G2` | `g2-c20-osszeadas10` | `g2-count20-sec-2` | 30 kérdés |
| 3 | **Kivonás 10-es számkör** | `kivonas-10-es-szamkor` | `Sub10G2` | `g2-c20-kivonas10` | `g2-count20-sec-3` | 30 kérdés |
| 4 | **Összeadás 20-as számkör** | `osszeadas-20-as-szamkor` | `Add20G2` | `g2-c20-osszeadas20` | `g2-count20-sec-4` | 30 kérdés |
| 5 | **Kivonás 20-as számkör** | `kivonas-20-as-szamkor` | `Sub20G2` | `g2-c20-kivonas20` | `g2-count20-sec-5` | 30 kérdés |
| 6 | **Szöveges feladatok** | `szoveges-feladatok` | `WordProblems20G2` | `g2-c20-szoveges` | `g2-count20-sec-6` | 30 kérdés |
| 7 | **Megálló (Témazáró tudáspróba)** | `megallo` | `Count20ExamG2` | `g2-c20-tudasproba` | `g2-count20-sec-7` | 90 kérdés (Témazáró) |

1. **Számok 0-tól 20-ig** (`szamok-0-tol-20-ig`, `g2-c20-szamok`)
   - Számfogalom 0–20-ig, egyesek és tízesek helyiértéke (`10 egyes = 1 tízes`, `20 egyes = 2 tízes`), számszomszédok, páros és páratlan számok, összehasonlítás (`<`, `=`, `>`), sorba rendezés, egyjegyű/kétjegyű számok, tőszámnevek és sorszámnevek, valamint a 0–20-as számegyenes.
2. **Összeadás 10-es számkör** (`osszeadas-10-es-szamkor`, `g2-c20-osszeadas10`)
   - Összeadás 0–10 között (`tag + tag = összeg`), a tagok felcserélhetősége, `+ 0`, a 10 bontása és pótlás 10-re, háromtagú összeadások 10-ig, hiányzó tag keresése (`3 + □ = 8`), műveletek összehasonlítása.
3. **Kivonás 10-es számkör** (`kivonas-10-es-szamkor`, `g2-c20-kivonas10`)
   - Kivonás 0–10 között (`különbség`), elvétel, hiányzó rész és különbség, műveletcsaládok és ellenőrzés összeadással, `- 0` és önmagából való kivonás, hiányzó tag keresése (`7 − □ = 1`, `□ − 5 = 2`), nyitott egyenlőtlenségek.
4. **Összeadás 20-as számkör** (`osszeadas-20-as-szamkor`, `g2-c20-osszeadas20`)
   - `10 + egyesek`, analógia tízesátlépés nélkül (`3 + 2` és `13 + 2`), összeadás tízesátlépéssel (10-re pótlás: `7 + 4 = 7 + 3 + 1`), műveletcsaládok 20-ig, háromtagú összegek, nyitott mondatok, szabálytáblázatok, számpiramisok és bűvös négyzetek.
5. **Kivonás 20-as számkör** (`kivonas-20-as-szamkor`, `g2-c20-kivonas20`)
   - Tízeshez való eljutás és tízes elvétele, analógia tízesátlépés nélkül (`13 − 2`), kivonás tízesátlépéssel (`14 − 7 = 14 − 4 − 3`), kétjegyűből kétjegyű elvétele három stratégiával (`15 − 12`), ellenőrzés összeadással, nyitott mondatok és nyílláncok.
6. **Szöveges feladatok** (`szoveges-feladatok`, `g2-c20-szoveges`)
   - 5 lépéses szövegesfeladat-megoldás (adatok, kérdés, terv, számolás + ellenőrzés, válasz), egylépéses és kétlépéses feladatok, fordított összehasonlító csapda (*„5-tel többet, mint…”*), oszlopdiagram-olvasás, próbálgatásos táblázatok és párosításos szétosztás (osztásjel nélkül).
7. **Megálló** (`megallo`, `g2-c20-tudasproba`)
   - Összefoglaló témazáró tudáspróba (90 kérdés) a 0–20-as számkörből: számcsoportosítás, vegyes műveleti kapcsolatok, többtagú összegek, számsorozatok, többszintes számpiramisok és logikai fejtörők.
