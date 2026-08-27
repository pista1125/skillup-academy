# 5. Középpontos tükrözés (7. osztály)

## Tananyag Áttekintés
A középpontos (pontra vonatkozó) tükrözés szabatos matematikai definíciója, szerkesztési lépései pont, szakasz, egyenes és sokszög esetén, valamint legfontosabb geometriai tulajdonságai.

---

## Főbb Ismeretek és Fogalmak

### 1. A Középpontos Tükrözés Definíciója
Adott a síkban egy rögzített $O$ pont (**tükörközéppont / centrum**).
A sík tetszőleges $P$ pontjához a következő szabály szerint rendeljük hozzá a $P'$ képpontot:
1. Ha $P = O$, akkor $O' = O$ (a centrum képe önmaga).
2. Ha $P \neq O$, akkor $P'$ az $OP$ egyenes azon pontja, amelyre:
   - $O$ a $PP'$ szakasz felezőpontja,
   - azaz $P, O, P'$ egy egyenesre illeszkednek ebben a sorrendben, és $|OP'| = |OP|$.

---

### 2. A Középpontos Tükrözés Tulajdonságai
- **Egybevágósági transzformáció:** Távolságtartó, azaz $|A'B'| = |AB|$.
- **Fixpont:** Pontosan egyetlen fixpontja van: a centrum ($O$).
- **Fixegyenesek:** Minden olyan egyenes fixegyenes, amely átmegy a tükörközépponton ($O \in e \implies e' = e$). Ezek az egyenesek **nem pontonként fixek** (pontjaik helyet cserélnek $O$-hoz képest).
- **Egyenes és képe párhuzamos:** Ha az $e$ egyenes nem megy át $O$-n, akkor képe párhuzamos vele:
  $$e' \parallel e$$
- **Irányítástartó (orientációtartó):** Egy háromszög és középpontos tükörképe **azonos körüljárású** (pl. óramutató járásával ellentétes marad).
- **$180^\circ$-os elforgatás:** A középpontos tükrözés egyenértékű az $O$ pont körüli $180^\circ$-os síkbeli forgatással.
- **Inverz transzformáció:** A transzformációt kétszer alkalmazva az identitást (helybenhagyást) kapjuk ($P'' = P$).

---

### 3. Szerkesztési Lépések Körzővel és Vonalzóval
1. **Pont tükrözése:**
   - Húzzunk félegyenest a $P$ pontból a centrumon ($O$) keresztül.
   - Körzővel mérjük fel az $OP$ távolságot $O$-ból a félegyenes meghosszabbítására $\rightarrow$ megkapjuk a $P'$ pontot.
2. **Szakasz ($AB$) tükrözése:**
   - Tükrözzük az $A$ pontot ($A'$) és a $B$ pontot ($B'$).
   - Kössük össze $A'$-t és $B'$-vel $\rightarrow A'B'$ szakasz ($A'B' \parallel AB$ és $|A'B'| = |AB|$).
3. **Háromszög ($\triangle ABC$) tükrözése:**
   - Tükrözzük mindhárom csúcsot ($A', B', C'$).
   - Kössük össze a képpontokat $\rightarrow \triangle A'B'C' \cong \triangle ABC$.
