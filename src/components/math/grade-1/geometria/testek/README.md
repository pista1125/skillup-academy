# 3. Testek (1. osztály – IV. Geometria)

**Források:** OH-MAT01TA_II 4–11. és 130–131. o., OH-MAT01MA_II 4–9. és 76–77. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 4, 9: építőelemekből épített torony (hány elemből?), tárgyak a zsákban – tapintással kitalálni. TK 10: hány elemből épült az építmény; tornyok az alaprajz számai szerint („hány kockát használtál?”, „a legmagasabb torony helye”), melyik építmény melyik alapra. TK 130–131: csoportosítás vonal / síkidom / test; testek a születésnapi képen (henger, kúp, kocka alakú tárgyak). MF 8–9: testek számlálása táblázatban, kockákból épített építmények, „melyik nem illik a többi közé?” (testek a síkidomok között). MF 76: csoportosítás Vonalak / Síkidomok / Testek zsákba; MF 77: Rubik-kocka.

## A DiákZóna-lecke
- **Mese** (`TestekG1Mese`, „Pötyi és a toronyépítő játék”, 12 oldal, 8 koppintós feladat): a test nem lapos (papírnégyzet ↔ kocka); a lejtőn a labda alakú és a fekvő henger gurul, a kocka nem; torony kockákból; három torony az alaprajz számaival; Csigusz kapuja 4 elemből; tapintós zsák; csúcsos test ↔ csákó; vonal – síkidom – test; melyik nem test.
- **Játszótér** (`TowerBuilderPlayground`): „Építs 6 kockás tornyot!” – + kocka / − kocka gombok, Pötyi ellenőriz (alacsony / túl magas).
- **Játék** (`TestekG1Jatek`): 3 × 8 kérdés (`TESTEK_G1_QUESTIONS`), Párosító (test ↔ hasonló tárgy; torony ↔ szám; test alja ↔ síkidom), Válogató (test / síkidom; gurul / nem gurul; vonal / síkidom / test).

Fájlok: `TestekG1Scenes.tsx`, `TestekG1Parts.tsx`, `TestekG1Mese.tsx`, `TestekG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic4TestekG1.test.tsx`. A vonal- és síkidomképeket a `../vonalak` és `../sikidomok` Scenes-fájlból veszi.

## Eltérések a tankönyvtől
- A könyv 1. osztályban csak a **kocka** nevet használja (TK 10/2, MF 77/4); a gömböt, hengert, kúpot, téglatestet, gúlát nem nevezi meg. Mi sem: „labda alakú”, „konzervdoboz alakú”, „csúcsos sapka alakú”, „doboz alakú”, „sátor alakú” testként írjuk le őket.
- A „gurul / nem gurul” szempont nincs a könyv ezen oldalain – saját, kézzelfogható válogatási szempontként tettük be (a kúpot kihagytuk belőle, mert körbe gurul).
- A test aljának körberajzolása (Párosító 3. szint) saját feladat (a MF 79/4 színezett testlapjaiból kiindulva).
- A számok 10 alatt maradnak: a MF 9/1 építményei (2 × 4 = 8, ill. 11 kocka) helyett legfeljebb 8 kockás falak; a TK 10/2 „4 1 4 / 1” alaprajzai helyett egysoros alaprajzok.
- Az építés, színezés, összekötés helyett számlálás és koppintás; az építés a Játszótéren történik.
