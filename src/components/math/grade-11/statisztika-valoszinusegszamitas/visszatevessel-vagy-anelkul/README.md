# 15. Ráadás – Visszatevéssel vagy anélkül?

## Tananyag Áttekintés
A visszatevéses és a visszatevés nélküli mintavétel mély összehasonlítása: mikor közelíthető a visszatevés nélküli mintavétel visszatevésessel? Nagy sokaságok (populációk), közvélemény-kutatások és minőségellenőrzés.

---

## Fő Összefüggések és Elemzések

- **A két modell összevetése:**
  | Szempont | Visszatevés nélküli mintavétel | Visszatevéses mintavétel |
  | :--- | :--- | :--- |
  | **Kísérletek függősége** | Függő (az esélyek változnak) | Független (az esélyek állandóak) |
  | **Matematikai eloszlás** | Hipergeometrikus eloszlás | Binomiális eloszlás ($B(n, p)$) |
  | **Képlet** | $P = \frac{\binom{S}{k}\binom{N-S}{n-k}}{\binom{N}{n}}$ | $P = \binom{n}{k} p^k (1-p)^{n-k}$ |
  | **Alkalmazási terület** | Kis sokaság (lottó, kártya, selejt) | Végtelen/nagyméretű sokaság |

- **Binomiális közelítés hipergeometrikusra:**
  - Ha az alapsokaság mérete ($N$) jóval nagyobb, mint a minta mérete ($n$), azaz:
    $$\frac{n}{N} \le 0{,}05 \quad (\text{a minta nem haladja meg az 5%-ot})$$
    akkor egy-egy elem kihúzása alig változtatja meg a hátralévő elemek arányát.
  - Ilyenkor a sokkal egyszerűbb **binomiális eloszlással** számolhatunk a hipergeometrikus helyett (pl. országos közvélemény-kutatásnál 1000 fő megkérdezése a lakosságból).
