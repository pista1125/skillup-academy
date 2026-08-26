# 2. Rendezd sorba! (7. osztály)

## Tananyag Áttekintés
Gyakran nemcsak az a kérdés, hogy milyen elemeket választunk ki, hanem az is, hogy milyen **sorrendben** helyezzük el őket. A sorba rendezési problémák a kombinatorika (permutációk) alapjai.

---

## Főbb Témakörök és Összefüggések

### 1. Különböző elemek sorba rendezése (Permutáció)
- Ha $n$ darab különböző elemet akarunk sorba rendezni egy sorban:
  - Az 1. helyre $n$ féle elem kerülhet,
  - A 2. helyre a maradék $n-1$ féle elem,
  - A 3. helyre $n-2$ féle elem,
  - ...
  - Az utolsó helyre már csak $1$ elem maradt.
- A lehetőségek száma:
  $$n \cdot (n-1) \cdot (n-2) \cdots 2 \cdot 1 = n! \quad (\text{n faktoriális})$$

### 2. Gyakorlati alkalmazások
- **Számjegyek sorrendje:** Hány 4-jegyű szám készíthető az $1, 2, 3, 4$ számjegyekből (ismétlés nélkül)? $\to 4 \cdot 3 \cdot 2 \cdot 1 = 24$.
- **0 a számjegyek között:** Ha a $0$ is szerepel (pl. $0, 2, 4, 6$), a legelső helyre nem kerülhet $0$, így az 1. helyre csak 3 lehetőség van: $3 \cdot 3 \cdot 2 \cdot 1 = 18$.
- **Anagrammák:** Betűk összekeverése, szavak alkotása.
- **Körbe ültetés:** $n$ ember körasztal köré ültetése esetén a forgatások nem számítanak új elrendezésnek $\to (n-1)!$ eset.
