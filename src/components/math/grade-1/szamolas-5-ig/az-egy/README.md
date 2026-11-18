# 1. Az egy (1. osztály – II. Számolás 0-tól 5-ig)

**Források:** OH-MAT01TA_I 40–41. o., OH-MAT01MA_I 22. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
Utcakép („Miből van egy? Miből van egynél több?”), ujjkép, dominókép, az 1-es számjegy írásiránya, helye a számegyenesen, színezés („amiből pontosan 1 van”), áthúzás „hogy 1 maradjon”, összehasonlítás jelekkel (<, >, =).

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`AzEgyG1Mese`, `MeseLesson`): Pötyi, a katica a Számkertben az egyet keresi: egy nap, egy alma a fán, az 1-es írása, egy ujj és egy pötty, egy orr az arcon, az 1 a számegyenesen, 1 labda < 3 labda. Minden oldalt a gép felolvas, 5 oldalon koppintós mini-feladat van.
- **Játszótér** (`OneTapPlayground`): „Tegyél egy almát a kosárba!” – a gyerek koppintással pakol, Pötyi visszajelez (üres / több, mint egy), Új feladat gomb.
- **Játék** (`AzEgyG1Jatek`, `MeseQuiz`): Kérdések 3 × 8 (`AZ_EGY_G1_QUESTIONS`), Párosító 3 szint (`AZ_EGY_G1_PAIRS`), Válogató 3 szint (`AZ_EGY_G1_SORT`). Képes válaszok, felolvasott kérdés, rossz válasznál a hibát megnevező tipp.

Fájlok: `AzEgyG1Scenes.tsx`, `AzEgyG1Parts.tsx`, `AzEgyG1Mese.tsx`, `AzEgyG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic2AzEgyG1.test.tsx`.

## Eltérések a tankönyvtől
- Az utcakép helyett (sok apró részlet, olvasni-keresni kell) egyszerű, egy-egy dologra fókuszáló meseoldalak vannak, felolvasással.
- A számjegyírást nem lehet papíron gyakoroltatni: a mese bemutatja az írásirányt (zöld kezdőpont, szaggatott nyomvonal), és a gyerek a levegőbe „írja”.
- A „Tedd ki a jelet” feladatnál a jel irányát Pötyi szóban is elmagyarázza („a hegye a kevesebb felé mutat”).
- A színes rúd (README-vázlat) a könyv ezen oldalain nem szerepel, kimaradt.
