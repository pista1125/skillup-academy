# 5. Ráadás – Statisztikai számítások számológéppel

## Tananyag Áttekintés
Tudományos zsebszámológépek és táblázatkezelők statisztikai módjának (STAT mode) használata: egyváltozós adatsorok bevitele, átlag ($\bar{x}$), szórás ($\sigma, s$), összegek ($\sum x, \sum x^2$) és kvartilisek automatikus lekérdezése.

---

## Fő Funkciók és Használati Útmutató

- **Számológép STAT módja (1-VAR):**
  - Módválasztás: `MODE` $\to$ `STAT` $\to$ `1-VAR`.
  - Adatok és gyakoriságok (`FREQ`) bevitele táblázatos felületen.

- **Kinyerhető statisztikai eredmények:**
  - $n$: Minta elemszáma
  - $\bar{x}$: Mintaátlag
  - $\sigma_x$ vagy $\sigma_n$: Tapasztalati szórás
  - $s_x$ vagy $\sigma_{n-1}$: Korrigált tapasztalati szórás (minta szórása)
  - $\min X, Q_1, \text{Med}, Q_3, \max X$: 5 számos összefoglaló adatai

- **Táblázatkezelő függvények (pl. Excel, Google Sheets):**
  - Átlag: `=ÁTLAG(A1:A50)`
  - Medián: `=MEDIÁN(A1:A50)`
  - Módusz: `=MÓDUSZ.EGY(A1:A50)`
  - Szórás: `=SZÓRÁSP(A1:A50)` (populáció) vagy `=SZÓRÁS.S(A1:A50)` (minta)
  - Kvartilisek: `=KVARTILIS.KIZÁR(A1:A50; 1)`
