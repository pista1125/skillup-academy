# 3. Használjunk szerkesztőprogramot! (8. osztály)

## Tananyag Áttekintés
Dinamikus geometriai szoftverek (pl. GeoGebra) használata a geometriai alakzatok, szerkesztések, tételek és transzformációk digitális modellezésére és kísérletezésre.

---

## Főbb Ismeretek és Eszközök

### 1. Mi a Dinamikus Geometria?
A dinamikus geometriai programokban az alakzatok pontjai, egyenesei és relációi (merőlegesség, párhuzamosság, illeszkedés) **összefüggenek**:
- Ha egy alakzat valamelyik szabad csúcsát elmozdítjuk (húzzuk), az összes hozzá kötött szerkesztési objektum **valós időben követi a mozgást**, miközben a matematikai szabályok (pl. egyenlő távolság, szögfelező) változatlanul érvényben maradnak.
- Ez lehetővé teszi a sejtések felállítását, ellenőrzését és a határesetek vizsgálatát.

### 2. Alapvető Szoftveres Eszközkészlet

| Ikon / Eszköz | Funkció | Matematikai háttér |
|---|---|---|
| **Új pont / Metszéspont** | Pont elhelyezése vagy 2 objektum metszéspontja | Halmazelméleti metszet ($e \cap f$) |
| **Szakasz / Egyenes / Félegyenes** | Két pont összekötése | Geometriai axióma (két pont egyértelműen meghatároz egy egyenest) |
| **Merőleges egyenes** | Egyenesre merőleges állítása adott ponton át | $90^\circ$-os szög |
| **Párhuzamos egyenes** | Egyenessel párhuzamos húzása adott ponton át | Párhuzamossági axióma |
| **Szakaszfelező merőleges** | Egy szakasz felezőmerőlegesének megrajzolása | A szakasz két végpontjától egyenlő távol lévő pontok mértani helye |
| **Szögfelező** | Egy szög felezőegyenesének megszerkesztése | A szögszáraktól egyenlő távol lévő pontok mértani helye |
| **Kör középponttal és ponttal** | Kör rajzolása | Adott ponttól adott távolságra lévő pontok halmaza |
| **Transzformációs eszközök** | Tengelyes tükrözés, középpontos tükrözés, forgatás, eltolás, nyújtás | Geometriai leképezések alkalmazása |

### 3. Szerkesztési lépések vs. Rajzolás
- **Rajzolás (szemre illesztés):** Csak egyetlen állapotban néz ki helyesnek; ha elhúzzuk a pontot, szétesik az alakzat.
- **Dinamikus szerkesztés (szabályos konstrukció):** Matematikai kötöttségekkel szerkesztünk (pl. körrel mérünk távolságot), így az alakzat bármilyen mozgatás, nagyítás esetén is megőrzi geometriai tulajdonságait.
