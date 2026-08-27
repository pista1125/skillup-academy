# 4. Geometriai transzformációk (7. osztály)

## Tananyag Áttekintés
A geometriai leképezések (transzformációk) fogalma, tárgypont és képpont kapcsolata, az egybevágósági transzformációk lényege és azok megmaradó (invariáns) geometriai tulajdonságai.

---

## Főbb Ismeretek és Fogalmak

### 1. A Geometriai Transzformáció Fogalma
- **Definíció:** A sík egy geometriai transzformációja (leképezése) olyan szabály (függvény), amely a sík minden $P$ pontjához egyértelműen hozzárendeli a sík egy $P'$ pontját.
  - **Tárgypont / Eredeti pont:** $P$
  - **Képpont:** $P'$
  - **Alakzat képe ($A'$):** Az $A$ alakzat összes pontjának képpontjaiból álló alakzat.
- **Kölcsönösen egyértelmű leképezés (bijekció):** Különböző pontoknak különböző a képe, és a sík minden pontja valamely pont képe.

---

### 2. Egybevágósági Transzformációk
Olyan geometriai leképezések, amelyek **távolságtartók**:
Bármely két pont távolsága megegyezik a képpontjaik távolságával:
$$|P'Q'| = |PQ|$$

#### Megmaradó (Invariáns) Tulajdonságok:
1. **Távolságtartás:** Szakasz hossza változatlan ($|A'B'| = |AB|$).
2. **Egyenestartás:** Egyenes képe egyenes.
3. **Párhuzamosságtartás:** Párhuzamos egyenesek képei is párhuzamosak ($e \parallel f \implies e' \parallel f'$).
4. **Szögtartás:** Bármely szög képe egyenlő nagyságú az eredeti szöggel ($\alpha' = \alpha$).
5. **Területtartás:** Bármely síkidom és képének területe megegyezik ($T' = T$).
6. **Illeszkedéstartás:** Ha a pont rajta van az egyenesen, képe is rajta van az egyenes képén.

---

### 3. Az Alapvető Egybevágósági Transzformációk Típusai
A sík egybevágósági transzformációi 4 alaptípusra bonthatók:
1. **Tengelyes tükrözés:** Adott egy $t$ tengely (megfordítja az alakzat körüljárási irányát).
2. **Középpontos tükrözés:** Adott egy $O$ centrum (megőrzi a körüljárási irányt, $180^\circ$-os forgatás).
3. **Párhuzamos eltolás:** Adott egy $\vec{v}$ eltolási vektor (megőrzi a körüljárási irányt).
4. **Elforgatás (forgatás):** Adott egy $O$ forgási középpont és $\alpha$ forgási szög.

---

### 4. Fixpontok és Fixegyenesek
- **Fixpont:** Olyan pont, amelynek a képe önmaga ($P' = P$).
  - Tengelyes tükrözésnél: a tükörtengely minden pontja fixpont.
  - Középpontos tükrözésnél: egyetlen fixpont a tükörközéppont ($O$).
  - Eltolásnál: nincs fixpont (ha az eltolás nem nulla).
- **Fixegyenes:** Olyan egyenes, amelynek képe önmaga ($e' = e$).
  - *Pontonként fix egyenes:* Minden egyes pontja fixpont (pl. a tükörtengely).
  - *Nem pontonként fix egyenes:* Az egyenes önmagába képeződik le, de a pontjai elmozdulnak rajta (pl. középpontos tükrözésnél a centrumon átmenő egyenesek).
