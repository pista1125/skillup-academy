# 5. A középpontos hasonlóság (Kiegészítő tananyag) (8. osztály)

## Tananyag Áttekintés
A középpontos hasonlósági transzformáció definíciója, a centrum ($O$) és a hasonlósági arányszám ($\lambda \neq 0$), a képpontok megszerkesztése, a $\lambda > 0$ és $\lambda < 0$ esetek, valamint a párhuzamos szelők és sugarak tétele.

---

## Főbb Ismeretek és Szabályok

### 1. A Középpontos Hasonlóság Definíciója
Adott egy $O$ pont a síkban (hasonlóság **középpontja / centruma**) és egy $\lambda \neq 0$ valós szám (a **hasonlósági arányszám**).
A transzformáció a sík bármely $P$ pontjához olyan $P'$ pontot rendel, amelyre:
1. $P'$ az $OP$ egyenesen van.
2. Az $O$-tól mért távolság: $OP' = |\lambda| \cdot OP$.
3. **Előjel jelentése:**
   - Ha $\lambda > 0$: $P'$ az $O$-ból kiinduló $OP$ **félegyenesen** van ($P$ és $P'$ az $O$ azonos oldalán állnak).
   - Ha $\lambda < 0$: $P'$ az $OP$ **ellentétes irányú félegyenesén** van ($O$ a $P$ és $P'$ között helyezkedik el).
   - Az $O$ centrum képe mindig önmaga ($O' = O$), tehát az $O$ fixpont.

```mermaid
graph LR
    subgraph Pozitív arány: lambda > 0
    O1["O (Centrum)"] --> P1["P"] --> P1_prime["P' (lambda = 2)"]
    end
    subgraph Negatív arány: lambda < 0
    P2_prime["P' (lambda = -1.5)"] <-- O2["O (Centrum)"] --> P2["P"]
    end
```

---

### 2. Speciális Esetek $\lambda$ Értékei Szerint
- **$|\lambda| > 1$:** Nagyítás
- **$|\lambda| < 1$:** Kicsinyítés
- **$\lambda = 1$:** Identitás (minden pont helyben marad)
- **$\lambda = -1$:** Középpontos tükrözés az $O$ pontra!
- A geometriai hasonlósági arány: $k = |\lambda|$.

### 3. Főbb Tulajdonságok
- **Irányítástartó:** Megőrzi az alakzat körüljárási irányát.
- **Egyenes képe vele párhuzamos egyenes:**
  - Ha az egyenes nem megy át az $O$ ponton: $e' \parallel e$.
  - Ha az egyenes átmegy az $O$ ponton: $e' = e$ (invariáns egyenes).
- **Párhuzamos szelők és sugarak tétele:** Ha egy szögtartomány szárait párhuzamos egyenesekkel metsszük, a keletkező szakaszok aránya megegyezik a hasonlósági aránnyal:
  $$\frac{OA'}{OA} = \frac{OB'}{OB} = \frac{A'B'}{AB} = |\lambda|$$
