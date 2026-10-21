# 3. A dobozdiagram (55. lecke)

## Tananyag Áttekintés
Az 5 számos összefoglalás (minimum, alsó kvartilis, medián, felső kvartilis, maximum) és a dobozdiagram (box plot) szerkesztése, értelmezése és eloszlások összehasonlítása.

---

## Fő Fogalmak és Szerkesztési Lépések

- **Az 5 számos statisztikai összefoglaló:**
  - $x_{\min}$: A minta legkisebb adata
  - $Q_1$ (alsó kvartilis): Az alsó 25% határa (az adatok alsó felének mediánja)
  - $Me$ vagy $Q_2$ (medián): A minta felezőpontja (50%)
  - $Q_3$ (felső kvartilis): A felső 25% határa (az adatok felső felének mediánja)
  - $x_{\max}$: A minta legnagyobb adata

- **Kvartilisterjedelem ($IQR$):**
  - $$IQR = Q_3 - Q_1$$
  - Az adatok középső 50%-ának terjedelme, nem érzékeny a kiugró értékekre (robusztus mutató).

- **A dobozdiagram felépítése:**
  - A téglalap (doboz) alsó éle $Q_1$-nél, felső éle $Q_3$-nál helyezkedik el.
  - A doboz belsejében egy vonal jelzi a mediánt ($Me$).
  - A "bajszok" a szélső értékekig ($x_{\min}$ és $x_{\max}$) nyúlnak.
  - Eloszlás szimmetriájának és ferdeségének azonnali leolvasása.
