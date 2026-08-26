# 2. Transzformációk (8. osztály)

## Tananyag Áttekintés
A geometriai transzformáció általános definíciója, a sík pontjainak leképezése, alakzatok transzformációja, invariáns tulajdonságok (tulajdonságok, amelyek nem változnak a leképezés során), fixpontok és fixegyenesek.

---

## Főbb Ismeretek és Fogalmak

### 1. Mi a Geometriai Transzformáció?
A sík egy **geometriai transzformációja (leképezése)** egy olyan hozzárendelés, amely a sík minden $P$ pontjához hozzárendeli a sík egyértelműen meghatározott $P'$ pontját (a $P$ pont **képe**).
- **Kölcsönösen egyértelmű (invertálható) transzformáció:** Különböző pontokhoz különböző képpontok tartoznak, és a sík minden pontja képpontként előáll.
- Egy alakzat képe az alakzatot alkotó pontok képeinek összessége.

### 2. Invariáns Tulajdonságok
Egy geometriai tulajdonságot **invariánsnak** nevezünk egy transzformációra nézve, ha az alakzat képe is rendelkezik ezzel a tulajdonsággal.
- **Egyenesség (kollinearitás):** Egy egyenesre illeszkedő pontok képei is egy egyenesre illeszkednek.
- **Illeszkedés:** Ha egy $P$ pont rajta van egy $e$ egyenesen ($P \in e$), akkor $P' \in e'$.
- **Párhuzamosság:** Ha $e \parallel f$, akkor $e' \parallel f'$.
- **Szögtartás:** $\angle(e, f) = \angle(e', f')$.
- **Távolságtartás (csak egybevágóságnál):** $A'B' = AB$.
- **Aránytartás (hasonlóságnál és egybevágóságnál):** $\frac{A'B'}{C'D'} = \frac{AB}{CD}$.

### 3. Fixpontok, Fixegyenesek és Invariáns Egyenesek
- **Fixpont:** Olyan pont, amelynek a képe önmaga ($P' = P$).
- **Fixegyenes:** Olyan egyenes, amelynek **minden pontja fixpont** ($e' = e$, és minden $P \in e$ esetén $P' = P$).
  - *Példa:* Tengelyes tükrözésnél a tükörtengely fixegyenes.
- **Invariáns egyenes (önmagára képezett egyenes):** Olyan egyenes, amelynek a képe önmaga mint ponthalmaz ($e' = e$), de a pontjai elmozdulhatnak az egyenesen belül.
  - *Példa:* Tengelyes tükrözésnél a tengelyre merőleges egyenesek invariáns egyenesek (mert a pontjaik átcserélődnek, de az egyenes maga önmagára képeződik).
  - *Példa:* Középpontos tükrözésnél a tükörközépponton átmenő egyenesek mind invariáns egyenesek.
  - *Példa:* Eltolásnál az eltolásvektorral párhuzamos egyenesek invariáns egyenesek.
