# 3. Hány eset van? (7. osztály)

## Tananyag Áttekintés
Összetettebb választási feladatoknál a kombinatorika két alapvető számlálási elvét alkalmazzuk: az **összeadási szabályt** és a **szorzási szabályt**.

---

## Főbb Szabályok és Stratégiák

### 1. Az összeadási szabály
- Ha egy döntési folyamatban egymást kölcsönösen kizáró esetek (utak) vannak:
  - Ha az egyik lehetőség $A$ módon, a másik $B$ módon valósulhat meg (és a kettő egyszerre nem következhet be), akkor az összes lehetőség:
    $$A + B$$
- *Példa:* Vagy vonattal megyünk (3 járat) VAGY busszal (4 járat) $\to 3 + 4 = 7$ utazási lehetőség.

### 2. A szorzási szabály (Független döntések)
- Ha egy feladatot egymást követő vagy egymástól független rész-döntések sorozatára bontunk:
  - Ha az 1. lépést $p$ féleképpen, majd a 2. lépést $q$ féleképpen tehetjük meg, akkor az összes lehetőség:
    $$p \cdot q$$
- *Példa:* Egy menüben 3 féle leves, 4 féle főétel és 2 féle desszert közül választunk $\to 3 \cdot 4 \cdot 2 = 24$ különböző menü állítható össze.

### 3. Kiválasztás visszatevéssel és visszatevés nélkül
- **Visszatevéssel (ismétlés megengedett):** Pl. 4 számjegyű PIN-kód ($10 \cdot 10 \cdot 10 \cdot 10 = 10^4 = 10\,000$).
- **Visszatevés nélkül (különböző elemek):** Pl. tombolahúzás az 1., 2., 3. díjra.
