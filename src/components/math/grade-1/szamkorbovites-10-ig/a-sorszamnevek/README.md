# 15. A sorszámnevek (1. osztály – III. Számkörbővítés, számolás 10-ig)

**Források:** OH-MAT01TA_I 116–117. o., OH-MAT01MA_I 61. o. (PDF-oldal = nyomtatott + 1)

## A könyv oldalai
TK 116: adventi naptár 9 számozott zsákkal (1.–9.): „melyik ajándékot rejtő zsák hányadik a sorban”, „rajzold le, melyik zsákban mi van” (3., 9., 4., 5., 8., 1.), „hányadik zsákban van…” (karikázás 1.–9. közül). TK 117: „kilenc – így jelöljük: 9” és „kilencedik – így jelöljük: 9.” (9 kifestett cukor vs. csak a 9. kifestve), színezés szám és sorszám szerint (5 / 5., 4 / 4., 8 / 8.), korcsolyapálya-sor kabátszínezése sorszámok szerint. MF 61: tárgyak a számegyenes fölött – hányadik helyen áll; csillagok színezése sorszámok szerint; pálcikahalom – melyiket hányadikként tudod felvenni.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`ASorszamnevekG1Mese`, 10 oldal, 6 mini-feladat): „Pötyi és a szánkóverseny” – a dobogón Csigusz az első, Zümi a második, Pötyi a harmadik; a jelölés (szám + pont); „9 dísz” és „a 9. dísz” egymás alatt; „Hol van kiszínezve a 4. dísz?”; 9 szánkó a rajtnál (az első a zászlónál áll) – hányadik a piros, melyik a 7.; ajándékzsákok füzéren 1.–9. címkékkel; a barátok toronyháza (a szinteket alulról számoljuk).
- **Játszótér** (`OrdinalTapPlayground`): „Koppints a hányadikra!” – 9 egyforma tárgy sorban, zöld nyíl jelzi a kezdést, Pötyi kéri: „Koppints a 6. díszre!”; rossz koppintásnál megmondja, hányadikat választotta.
- **Játék** (`ASorszamnevekG1Jatek`): Kérdések 3 × 8 (`A_SORSZAMNEVEK_G1_QUESTIONS`: dobogó, sor, füzér, toronyház, első/utolsó, között, előtte/mögötte/fölötte, „hányan állnak előtte?”, előzés, hiányzó sorszám, pálcikahalom), Párosító 3 szint (`…_PAIRS`: színezett hely ↔ sorszám; „3” vagy „3.”, „5” vagy „5.”; 6.–9. hosszú sorban), Válogató 3 szint (`…_SORT`: három színes / a harmadik színes; 1., 2., 3.; szám vagy sorszám).

Fájlok: `ASorszamnevekG1Scenes.tsx` (RaceHillScene, PodiumScene, StartQueue, OrdinalStrip, GarlandScene, TowerScene, StickPile, RacerPic, SledPic, StickPic és a közös adatok: `ord`, `SLEDS9`, `GARLAND`, `TOWER`, `ANIMAL_QUEUE`), `ASorszamnevekG1Parts.tsx`, `ASorszamnevekG1Mese.tsx`, `ASorszamnevekG1Jatek.tsx`, `index.ts`. Felhasznált közös képek: `a-kilenc` (ünnepi ikonok, színek), `a-nyolc` (havas háttér, `EqCard`). Teszt: `src/test/grade1Topic3ASorszamnevekG1.test.tsx`.

## Eltérések a tankönyvtől
- Saját keret: szánkóverseny, dobogó, rajtsor, ajándékzsákok, toronyház a könyv adventi naptára és korcsolyapálya-sora helyett. A sorszámokat 9.-ig használjuk (a régi README 10.-ét is említett – a 10 még nem ismert).
- Minden feladatnál kimondjuk, honnan számolunk (zöld nyíl / zászló = eleje, szintek alulról). A könyv TK 116 füzérénél ez a számozásból adódik; nálunk is számozott a füzér.
- A „szám vagy sorszám” megkülönböztetést (TK 117) a mese 4–5. oldala, két kérdés („9. dísz” / „5 dísz”), a Párosító 2. szintje és a Válogató 1. és 3. szintje gyakoroltatja; színezés helyett koppintás.
- A pálcikahalomból (MF 61/3) egy kérdés lett: „Melyiket veszed fel elsőként?” (a teljes sorrend leírása olvasás/írás nélkül nem megoldható).
- Kimaradt: rajzolás a zsákokba, kabát- és csillagszínezés. Új (a könyvben nincs, de a sorszámnevek szokásos használata): dobogó, „Hányan állnak előtte?”, előzés, „között”, „mögötte”, „fölötte”.
- A sorszám-válaszok felirata „4.”, a gép „negyedik”-nek olvassa fel (külön `say`), hogy a TTS ne „négy pont”-ot mondjon.
