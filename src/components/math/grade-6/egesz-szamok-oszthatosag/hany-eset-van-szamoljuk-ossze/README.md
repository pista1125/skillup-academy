# 4. Hány eset van? Számoljuk össze!

## Tananyag Áttekintés
Elemi kombinatorikai gondolkodás, lehetséges esetek rendszerezett és hiánytalan felsorolása, faszerkezet (ágas rajz) és táblázatos módszer alkalmazása.

---

## Főbb Ismeretek és Módszerek

### 1. Rendszeres Felsorolás
- Ahhoz, hogy egyetlen esetet se hagyjunk ki és ne számoljunk semmit kétszer, **szabályos sorrendet** (pl. lexikografikus/ábécé sorrend, nagyság szerinti sorrend) kell követnünk.

### 2. Fastruktúra (Fa-diagram / Ágas rajz)
- A választási lehetőségeket egymás utáni szinteken ábrázoljuk.
- Minden elágazás egy újabb döntést vagy választást jelent.
- A végpontok (levelek) száma adja meg az összes lehetséges kimenetel számát.

### 3. Szorzási Szabály Alapjai
- Ha egy döntést $p$-féleképpen, egy következő független döntést pedig $q$-féleképpen hozhatunk meg, akkor a két döntés együtt $p \cdot q$-féleképpen valósulhat meg.
- *Példa:* 3 féle nadrághoz és 4 féle pólóhoz $3 \cdot 4 = 12$ különböző öltözék választható.
