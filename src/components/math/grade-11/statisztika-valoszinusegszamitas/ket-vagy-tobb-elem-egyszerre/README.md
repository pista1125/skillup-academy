# 10. Két vagy több elemet húzunk egyszerre (60. lecke)

## Tananyag Áttekintés
Több elem egyidejű kiválasztása urnából, pakliból vagy csoportból: kombinatorikus valószínűségszámítás kombinációkkal (sorrend nélkül), hipergeometrikus modell alapjai.

---

## Fő Modellek és Számolási Módszertan

- **Egyidejű húzás (a sorrend nem számít):**
  - Ha $N$ különböző elemből egyszerre húzunk ki $n$ elemet:
    - Összes esetek száma:
      $$\text{Összes} = \binom{N}{n}$$

- **Kedvező esetek számolása kombinációkkal:**
  - Ha van $S$ darab selejtes és $J = N - S$ darab jó elem, és $n$ elemet húzva pontosan $k$ darab selejtest szeretnénk kapni:
    $$\text{Kedvező} = \binom{S}{k} \cdot \binom{N - S}{n - k}$$
  - A valószínűség (hipergeometrikus eloszlás):
    $$P(X = k) = \frac{\binom{S}{k} \cdot \binom{N - S}{n - k}}{\binom{N}{n}}$$

- **Példák:**
  - Lottósorsolás: 90 számból 5-öt húznak ki. Annak valószínűsége, hogy eltalálunk 4-et:
    $$P = \frac{\binom{5}{4} \cdot \binom{85}{1}}{\binom{90}{5}}$$
  - Kártyapartik: 32 lapos magyar kártyából 4 lapot húzva mekkora eséllyel lesz köztük legalább 2 ász?
