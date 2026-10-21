# 6. Esetszétválasztás (21. lecke)

## Tananyag Áttekintés
Összetett feltételekkel terhelt kombinatorikai problémák megoldása: egymást kizáró rész-esetekre bontás (összeadási szabály) és a komplementer módszer („legalább egy” típusú feladatok).

---

## Fő Módszerek és Stratégiák

- **Diszjunkt esetszétválasztás (összeadási elv):**
  - Ha a feladat feltétele több különböző kimenetelt enged meg, a lehetőségeket egymást kizáró csoportokra bontjuk, külön-külön kiszámoljuk, majd összeadjuk őket:
    $$N_{\text{összes}} = N_1 + N_2 + \dots + N_k$$

- **Komplementer módszer (az ellentett eset kivonása):**
  - Ha a közvetlen összeszámlálás túl sok esetet igényelne (különösen a „legalább egy” vagy „legfeljebb egy” feltételeknél):
    $$N_{\text{kedvező}} = N_{\text{összes feltétel nélkül}} - N_{\text{tiltott (ellentett) eset}}$$
  - Példa: „Legalább egy hetes van a dobások között” $\iff$ „Nem minden dobás hetestől különböző”.

- **Szita-formula (logikai szita elv):**
  - Két vagy három átfedő tulajdonság esetén: $|A \cup B| = |A| + |B| - |A \cap B|$.
