# 3. Logikai lapok (1. osztály – I. Előkészítő időszak)

**Források:** OH-MAT01TA_I 14–17. o. (PDF-oldal = nyomtatott + 1); munkafüzeti oldal nincs.

## A könyv oldalai
- TK 14: logikai lapok válogatása alak szerint kosarakba; „Mi változott meg? Rajzolj a felismert szabály alapján!” (felső sor → alsó sor: nagyság, lyuk); írás-előkészítő vonalak.
- TK 15: ház építése sárga és zöld nagy, nem lyukas lapokból (hányféle?); „Mi változott?” (lapfigurák); láncok színezése (azonos formák azonos színűek).
- TK 16: lapok kirakása és számlálása (kicsi, zöld, kör alakú lapok), figurák építése lapokból.
- TK 17: „Pótold a hiányzó lapokat” szabálytáblázat, ritmusok lapokból, emlékezet-játék (melyik lap hiányzik), „Találd ki!” páros játék.

## A DiákZóna-lecke (mesés formában, olvasás nélkül)
- **Mese** (`LogikaiLapokG1Mese`, 11 oldal, 9 koppintós feladat): Pötyi egy dobozt talál a kerti házikóban. Sorban megismerjük az alakot, a színt, a nagyságot és a lyukat, alak szerint válogatunk, „mi változott?” táblázatot töltünk ki, sort folytatunk, házat építünk, megkeressük az eltűnt lapot; a végén Pötyi lapokból katicát rak ki.
- **Játszótér** (`FindTilePlayground`): Pötyi felolvas egy lapnevet (pl. „kicsi, kék, lyukas háromszög”), a gyerek megkeresi hat lap közül. A csalilapok pontosan egy tulajdonságban térnek el; a hibánál Pötyi megmondja, melyik tulajdonságot nézze meg.
- **Játék** (`LogikaiLapokG1Jatek`): Kérdések 3 × 8 (`LOGIKAI_LAPOK_G1_QUESTIONS`): 1. szint egy tulajdonság, 2. szint két tulajdonság, válogatás kosárba, kakukktojás, sor, építés, 3. szint szabálytáblázat (nagyság, lyuk, szín), hiányzó lap, három tulajdonság, tagadás („sárga, de nem kör”). Párosító: ugyanolyan lap, lap és hasonló alakú tárgy, kicsi–nagy pár. Válogató: alak, szín, lyukas–nem lyukas.

A kosárrajz az 1. lecke `ValogatasokG1Scenes.tsx` készletéből jön.

Fájlok: `LogikaiLapokG1Scenes.tsx`, `LogikaiLapokG1Parts.tsx`, `LogikaiLapokG1Mese.tsx`, `LogikaiLapokG1Jatek.tsx`, `index.ts`. Teszt: `src/test/grade1Topic1LogikaiLapokG1.test.tsx`.

## Eltérések a tankönyvtől
- A könyvhöz hasonlóan háromféle alakot (kör, négyzet, háromszög), négy színt, két nagyságot és a lyukat használjuk; a valódi lapkészlet téglalapjai itt sem szerepelnek.
- A számlálós feladatok (TK 16/1 b: „tapsolj annyit, ahány kicsi lap”, „hány lapot használtál fel”) és a „hányféle házat tudsz építeni” kombinatorika kimaradt: számolás csak később jön.
- A kirakós/rajzolós/színezős feladatok (építsd meg a padodra, rajzold meg, színezd a láncot) koppintós változatot kaptak: „melyik lap kell a tetőre?”, „mi kerül a kérdőjel helyére?”, „mi jön ezután?”.
- A „Takard le, rajzold meg, mi hiányzik” emlékezet-feladat helyett a két sor egyszerre látszik (fent teljes, lent egy hiányzik), mert a takarást képernyőn nem lehet megoldani.
- A könyv TK 17/1 b táblázatában a felső sor utolsó két helye üres, és a változás (alul mind lyukas, a szín pirosból kék, sárgából zöld, kékből sárga lesz) nem egyetlen egyszerű szabály, egy 6 évesnek nehezen kiolvasható. Mi táblázatonként csak egy tulajdonságot változtatunk (nagyság, lyuk vagy szín).
