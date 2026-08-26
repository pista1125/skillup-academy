# 6. Matematikai játékok (7. osztály)

## Tananyag Áttekintés
A matematikai játékok olyan véges lépésből álló, kétszemélyes, szerencsétől független (teljes információjú) játékok, amelyekben létezik matematikai logika alapján meghatározható **nyerő stratégia**.

---

## Főbb Játéktípusok és Stratégiák

### 1. Nyerő és vesztő pozíciók
- **Nyerő pozíció:** Olyan állás, amelyből létezik olyan lépés, amely a másik játékost vesztő pozícióba hozza.
- **Vesztő (cél)pozíció:** Olyan állás, amelyből bármit lép a játékos, az ellenfél nyerő pozícióba kerül (vagy az adott pozícióból már nem lehet szabályosan lépni).

### 2. Visszafelé gondolkodás (Inverz stratégia)
- A célállapottól (végállástól) indulva visszafelé elemezzük a lehetséges lépéseket, így határozzuk meg a "biztos pontokat" (kulcspozíciókat).
- *Példa:* 20 kavics van az asztalon, felváltva 1, 2 vagy 3 kavicsot lehet elvenni. Az nyer, aki az utolsót elveszi.
  - Végállás: 4 kavics maradékánál a másik játékos bármit lép (1, 2 vagy 3), utána mi elvisszük a maradékot!
  - Kulcspozíciók: 4, 8, 12, 16 kavics átadása az ellenfélnek.
  - Mivel a lépések összege kiegészíthető 4-re ($x + (4-x) = 4$), a kezdő vagy a második játékos biztosíthatja a győzelmet.

### 3. Szimmetria elv alkalmazása
- Bizonyos játéktáblákon (pl. kör, sakktábla, szimmetrikus alakzatok) a szimmetrikus válaszlépések stratégiája verhetetlen:
  - Ha a kezdő játékos elfoglalja a szimmetriaközéppontot, majd minden lépésnél az ellenfél lépésének középpontosan tükrös párját lépi meg, mindig lesz szabályos válasza.
