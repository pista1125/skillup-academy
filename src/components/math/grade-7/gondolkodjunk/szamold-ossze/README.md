# 1. Számold össze! (7. osztály)

## Tananyag Áttekintés
A hétköznapi és matematikai problémák megoldásának alapvető eszköze a rendszerezett összeszámlálás (leszámlálás). Célunk, hogy minden lehetséges esetet pontosan egyszer vegyünk számításba, elkerülve a kihagyásokat és a duplikációkat.

---

## Főbb Témakörök és Módszerek

### 1. Rendszerezett felsorolás
- **Lexikografikus (ábécé- vagy számrendi) sorrend:** Az esetek felírása szigorú rend szerint.
- **Táblázatos elrendezés:** Két változótól vagy tulajdonságtól függő lehetőségek áttekintése (pl. két kockával való dobás).
- **Fa-diagram (ágas diagram):** Lépésről lépésre elágazó döntési struktúrák felrajzolása.

### 2. A skatulya-elv (Dirichlet-elv)
- Ha $n$ darab skatulyába legalább $n + 1$ tárgyat osztunk szét, akkor biztosan van legalább egy olyan skatulya, amelybe **legalább két tárgy** kerül.
- *Általánosítva:* Ha $n$ skatulyába $k \cdot n + 1$ tárgyat teszünk, legalább egy skatulyába legalább $k + 1$ tárgy jut.
- *Példa:* 13 ember közül biztosan van kettő, akik ugyanabban a hónapban születtek ($13 > 12$).

### 3. Elemek száma halmazokban
- Diszjunkt halmazok esetén: $|A \cup B| = |A| + |B|$.
- Közös elemek esetén (szita-módszer alapja): $|A \cup B| = |A| + |B| - |A \cap B|$.
