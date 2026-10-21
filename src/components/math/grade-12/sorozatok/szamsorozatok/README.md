# 22. Számsorozatok (22. lecke)

## Tananyag Áttekintés
A számsorozat mint a pozitív egész számok halmazán értelmezett speciális függvény bevezetése, a tagok jelölése, grafikus ábrázolása, valamint alapvető tulajdonságai (monotonitás és korlátosság).

---

## A Számsorozat Fogalma

- **Definíció:** Számsorozatnak nevezzük azt a függvényt, amelynek értelmezési tartománya a pozitív egész számok halmaza ($\mathbb{Z}^+ = \{1, 2, 3, \dots, n, \dots\}$), értékkészlete pedig a valós számok ($\mathbb{R}$) egy részhalmaza:
  $$a: \mathbb{Z}^+ \to \mathbb{R}, \quad n \mapsto a_n$$
- **Tagok jelölése:**
  - $a_1$: a sorozat 1. tagja (kezdő tag)
  - $a_2$: a sorozat 2. tagja
  - $a_n$: a sorozat $n$-edik vagy általános tagja
- **Jelölés:** $(a_n)$ vagy $(a_n)_{n \in \mathbb{Z}^+}$ vagy $\{a_1, a_2, a_3, \dots\}$

---

## A Sorozat Ábrázolása

1. **Számegyenesen:**
   - A sorozat tagjait ($a_1, a_2, a_3, \dots$) pontokként jelöljük a valós számegyenesen.
2. **Derékszögű koordináta-rendszerben:**
   - A vízszintes tengelyre az $n$ indexet (természetes számok: 1, 2, 3, ...), a függőleges tengelyre az $a_n$ függvényértéket mérjük fel.
   - **Fontos:** A grafikon **különálló (diszkrét) pontokból áll**, a pontokat nem szabad folytonos vonallal összekötni!

---

## Sorozatok Tulajdonságai

### 1. Monotonitás
- **Szigorúan monoton növő:** Minden $n \in \mathbb{Z}^+$ esetén $a_{n+1} > a_n$ (vagy $a_{n+1} - a_n > 0$).
- **Monoton növő:** Minden $n \in \mathbb{Z}^+$ esetén $a_{n+1} \ge a_n$.
- **Szigorúan monoton csökkenő:** Minden $n \in \mathbb{Z}^+$ esetén $a_{n+1} < a_n$ (vagy $a_{n+1} - a_n < 0$).
- **Monoton csökkenő:** Minden $n \in \mathbb{Z}^+$ esetén $a_{n+1} \le a_n$.
- **Konstans (állandó):** Minden tag megegyezik ($a_{n+1} = a_n$).

### 2. Korlátosság
- **Alulról korlátos:** Ha létezik olyan $k$ valós szám (alsó korlát), hogy minden tagra: $a_n \ge k$.
- **Felülről korlátos:** Ha létezik olyan $K$ valós szám (felső korlát), hogy minden tagra: $a_n \le K$.
- **Korlátos sorozat:** Ha alulról és felülről is korlátos, azaz létezik olyan $k$ és $K$, hogy minden $n$-re:
  $$k \le a_n \le K$$
