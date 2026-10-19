# 1. Geometriai fogalmak (7. osztály)

## Tananyag Áttekintés
A geometria alapvető építőkövei, alapfogalmai (pont, egyenes, sík, tér), származtatott fogalmai (félegyenes, szakasz, szög), a távolság és az egyenesek kölcsönös helyzetei a síkban és a térben.

---

## Főbb Ismeretek és Fogalmak

### 1. Alapfogalmak (Alapvető, definiálatlan fogalmak)
- **Pont ($A, B, P, ...$):** Nincs kiterjedése (0 dimenziós), helyet határoz meg a térben vagy a síkban.
- **Egyenes ($a, b, e, ...$):** Mindkét irányban végtelen, vastagság nélküli vonal (1 dimenziós). Bármely két különböző pont pontosan egy egyenest határoz meg.
- **Sík ($\alpha, \beta, S, ...$):** Minden irányban végtelen kiterjedésű, vastagság nélküli lapos felület (2 dimenziós). Három nem egy egyenesre illeszkedő pont pontosan egy síkot határoz meg.
- **Tér:** Háromdimenziós tér, amely minden pontot, egyenest és síkot tartalmaz.

---

### 2. Származtatott Geometriai Fogalmak
- **Félegyenes:** Az egyenes egy pontja által kettéosztott két rész egyike, beleértve a kezdőpontot is.
- **Szakasz ($AB$):** Az egyenes két pontja (végpontjai) közé eső pontjainak összessége, a végpontokkal együtt.
  - A szakasz hossza a két végpont távolsága ($|AB|$ vagy $d(A, B)$).
- **Felezőpont:** A szakasz azon belső pontja, amely a két végponttól egyenlő távolságra van.

---

### 3. Távolságok
- **Két pont távolsága:** A pontokat összekötő szakasz hossza.
- **Pont és egyenes távolsága:** A pontból az egyenesre bocsátott merőleges szakasz hossza (a legrövidebb távolság).
- **Párhuzamos egyenesek távolsága:** Az egyik egyenes tetszőleges pontjából a másikra bocsátott merőleges szakasz hossza.

---

### 4. Egyenesek Kölcsönös Helyzete
1. **A síkban:**
   - **Metsző egyenesek ($e \cap f = \{P\}$):** Pontosan egy közös pontjuk van. Speciális eset: *merőleges egyenesek* ($e \perp f$).
   - **Párhuzamos egyenesek ($e \parallel f$):** Nincs közös pontjuk, vagy egybeesnek ($e = f$).
2. **A térben:**
   - **Egysíkú egyenesek:** Metszőek vagy párhuzamosak.
   - **Kitérő egyenesek:** Nincs közös pontjuk, és nem fekszenek egy közös síkban (nem párhuzamosak).

---

### 5. A Szög Fogalma és Fajtái
Egy pontból (szögcsúcs) kiinduló két félegyenes (szögszárak) a síkot két részre (szögtartományra) osztja: konvex és konkáv (homorú) szögre.

| Szögtípus | Nagyság ($\alpha$) | Jellemző |
|---|---|---|
| **Nullszög** | $\alpha = 0^\circ$ | A két szár egybeesik |
| **Hegyesszög** | $0^\circ < \alpha < 90^\circ$ | Kisebb a derékszögnél |
| **Derékszög** | $\alpha = 90^\circ$ | A szárak merőlegesek egymásra |
| **Tompaszög** | $90^\circ < \alpha < 180^\circ$ | Derékszögnél nagyobb, egyenesszögnél kisebb |
| **Egyenesszög** | $\alpha = 180^\circ$ | A szárak egy egyenest alkotnak |
| **Homorúszög (konkáv)** | $180^\circ < \alpha < 360^\circ$ | Nagyobb az egyenesszögnél |
| **Teljesszög** | $\alpha = 360^\circ$ | Egy teljes fordulat |

---

### 6. A Szög Finomabb Mértékegységei: Szögperc (') és Szögmásodperc ('')
A mindennapi életben a fok ($^\circ$) elegendő, de a földrajzi helymeghatározásban (GPS), a csillagászatban és a hajózási navigációban finomabb felbontásra van szükség. (A Föld egyenlítőjén $1^\circ$ eltérés kb. $111\text{ km}$!).

#### 6.1. Alapösszefüggések és Váltószámok (60-as / szexagezimális rendszer)
- **Szögperc ($1'$ - arcminute):** Az $1^\circ$-os szög 60 egyenlő részre osztásával kapott egység.
  $$1^\circ = 60' \iff 1' = \left(\frac{1}{60}\right)^\circ \approx 0{,}0167^\circ$$
  - Fél fok: $0{,}5^\circ = 30'$
  - Negyed fok: $0{,}25^\circ = 15'$
  - Háromnegyed fok: $0{,}75^\circ = 45'$
  - Egytized fok: $0{,}1^\circ = 6'$
- **Szögmásodperc ($1''$ - arcsecond):** Az $1'$ (egy szögperc) 60 egyenlő részre osztásával kapott egység.
  $$1' = 60'' \iff 1^\circ = 60 \cdot 60'' = 3600'' \iff 1'' = \left(\frac{1}{3600}\right)^\circ \approx 0{,}000278^\circ$$

#### 6.2. Műveletek Szögekkel
- **Összeadás átváltással:**
  $$38^\circ 45' + 24^\circ 35' = 62^\circ 80' = 62^\circ + (1^\circ 20') = 63^\circ 20'$$
- **Kivonás kölcsönkéréssel (Pótszög keresése):**
  $$90^\circ - 32^\circ 24' = 89^\circ 60' - 32^\circ 24' = 57^\circ 36'$$
- **Kivonás másodpercekkel:**
  $$180^\circ - 114^\circ 35' 42'' = 179^\circ 59' 60'' - 114^\circ 35' 42'' = 65^\circ 24' 18''$$

#### 6.3. Gyakorlati Alkalmazások
1. **Földrajzi koordináták (GPS):** Szélességi és hosszúsági fokok, percek és másodpercek (pl. Budapest, Lánchíd: ÉSZ $47^\circ 29' 56''$, KH $19^\circ 02' 37''$). A Földön $1''$ eltérés kb. 31 méter.
2. **A tengeri mérföld (1 NM):** A Föld egyenlítőjén $1'$ (egy szögpercnyi) délkörív hossza pontosan **1 tengeri mérföld ($\approx 1852\text{ m}$)**.
3. **Csillagászat:** A Telihold és a Nap látszólagos átmérője az égbolton mindössze kb. **$31' - 32'$** (alig több, mint fél fok).
4. **Precíziós optika:** Céltávcsövek és távmérők skálázása MOA (*Minute of Angle* = 1 szögperc) egységben.

