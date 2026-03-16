export interface AuditoryTask {
  id: number;
  questions: string[];
}

export interface AuditoryLevel {
  level: number;
  title: string;
  tasks: AuditoryTask[];
}

export const AUDITORY_LEVELS: AuditoryLevel[] = [
  {
    level: 1,
    title: "1. Szint - Nagyon könnyű",
    tasks: [
      { id: 1, questions: ["Mennyi 2 meg 3?", "Milyen színű az ég?", "Hány füle van a nyuszinak?", "Mennyi 5-ből 2?", "Milyen állat mondja, hogy Miau?"] },
      { id: 2, questions: ["Hány ujja van egy kezeden?", "Mi a fű színe?", "Mennyi 1 meg 4?", "Milyen gyümölcs a piros alma?", "Hány kereke van egy biciklinek?"] },
      { id: 3, questions: ["Mennyi 3 meg 3?", "Melyik állat ad gyapjút?", "Hány lába van egy kutyának?", "Mennyi 10-ből 5?", "Milyen színű a hó?"] },
      { id: 4, questions: ["Mennyi 4 meg 2?", "Melyik égitest világít nappal?", "Hány szeme van egy embernek?", "Mennyi 6-ból 3?", "Ki lakik a kutyaházban?"] },
      { id: 5, questions: ["Hány hónap van egy évben?", "Mi a banán színe?", "Mennyi 2 meg 2?", "Melyik állat hápog?", "Hány nap van egy héten?"] },
      { id: 6, questions: ["Mennyi 5 meg 5?", "Mivel látunk?", "Hány lába van a csirkének?", "Mennyi 3-ból 1?", "Milyen színű a vér?"] },
      { id: 7, questions: ["Mennyi 1 meg 0?", "Melyik gyümölcs sárga és savanyú?", "Hány füled van?", "Mennyi 4-ből 1?", "Mivel hallunk?"] },
      { id: 8, questions: ["Mennyi 2 meg 1?", "Milyen állat ad tejet?", "Hány farka van a cicának?", "Mennyi 5-ből 5?", "Mi van a fejünk felett: a padló vagy a plafon?"] },
      { id: 9, questions: ["Mennyi 3 meg 1?", "Milyen színe van a tűzoltóautónak?", "Hány orrunk van?", "Mennyi 6-ból 2?", "Melyik állat trombitál?"] },
      { id: 10, questions: ["Mennyi 4 meg 4?", "Milyen állat a Mackó?", "Hány lába van egy asztalnak?", "Mennyi 2-ből 0?", "Milyen ízű a cukor?"] }
    ]
  },
  {
    level: 2,
    title: "2. Szint - Könnyű",
    tasks: [
      { id: 1, questions: ["Mennyi 12 meg 5?", "Hány óra van egy délután?", "Melyik a legkisebb kétjegyű szám?", "Mennyi 20-ból 8?", "Melyik állat a dzsungel királya?"] },
      { id: 2, questions: ["Hány napos egy február általában?", "Melyik bolygón élünk?", "Mennyi 15 meg 3?", "Hány lába van egy póknak?", "Mennyi 18-ból 6?"] },
      { id: 3, questions: ["Mennyi 7 meg 8?", "Melyik a magyar főváros?", "Hány tízese van a 45-nek?", "Mennyi 14-ből 7?", "Melyik madárnak van hosszú csőre és hozza a babát?"] },
      { id: 4, questions: ["Mennyi 11 meg 9?", "Hány fokos a derékszög?", "Melyik a páros szám: 3 vagy 4?", "Mennyi 25-ből 5?", "Hány színe van a magyar zászlónak?"] },
      { id: 5, questions: ["Hány percből áll egy óra?", "Ki Magyarország legnagyobb költője, Sándor?", "Mennyi 9 meg 6?", "Hány oldala van a háromszögnek?", "Mennyi 30-ból 10?"] },
      { id: 6, questions: ["Mennyi 13 meg 7?", "Melyik égitest látható éjszaka?", "Hány egyes van a 28-ban?", "Mennyi 16-ból 4?", "Milyen formája van az órának?"] },
      { id: 7, questions: ["Hány évszak van?", "Milyen ízű a citrom?", "Mennyi 5 ször 2?", "Hány lába van a lónak?", "Mennyi 22-ből 2?"] },
      { id: 8, questions: ["Mennyi 8 meg 4?", "Mi a víz jele vegyjele?", "Melyik a nagyobb: 1/2 vagy 1/4?", "Mennyi 17-ből 5?", "Ki írta a János vitézt?"] },
      { id: 9, questions: ["Mennyi 6 meg 9?", "Hány méter 100 centiméter?", "Mi a főzéshez használt fehér por?", "Mennyi 19-ből 8?", "Hány lába van a kacsának?"] },
      { id: 10, questions: ["Mennyi 10 meg 10?", "Melyik hónap jön a június után?", "Hány kereke van a személyautónak?", "Mennyi 40-ből 20?", "Hány betűből áll az AI szó?"] }
    ]
  },
  {
    level: 3,
    title: "3. Szint - Közepes",
    tasks: [
      { id: 1, questions: ["Mennyi 25 meg 15?", "Ki festette a Mona Lisát?", "Hány méter 1 kilométer?", "Mennyi 3 szor 4?", "Mi Magyarország legmagasabb pontja?"] },
      { id: 2, questions: ["Mennyi 60-ból 25?", "Melyik földrész található délen a jég alatt?", "Hány hét van egy évben?", "Mennyi 45 osztva 9-cel?", "Melyik a legnagyobb emlős az óceánban?"] },
      { id: 3, questions: ["Mennyi 12 szor 2?", "Ki volt az első magyar király?", "Hány foga van egy felnőtt embernek?", "Mennyi 100-ból 33?", "Hány fokon forr a víz?"] },
      { id: 4, questions: ["Mennyi 50 meg 50?", "Melyik a Naprendszer legnagyobb bolygója?", "Hány dekagramm 1 kilogramm?", "Mennyi 81 négyzetgyöke?", "Melyik állat alszik téli álmot és szereti a mézet?"] },
      { id: 5, questions: ["Mennyi 14 meg 28?", "Ki találta fel a telefont?", "Hány csont van az emberi testben kb.?", "Mennyi 7 ször 7?", "Melyik ország fővárosa Párizs?"] },
      { id: 6, questions: ["Mennyi 150-ből 75?", "Mi a neve a Föld kísérőjének?", "Hány lába van az ízeltlábúaknak?", "Mennyi 6 szor 8?", "Melyik a leggyorsabb szárazföldi állat?"] },
      { id: 7, questions: ["Mennyi 33 meg 44?", "Ki írta a Himnuszt?", "Hány nap van egy szökőévben?", "Mennyi 100 osztva 4-gyel?", "Mi a gyémánt alapanyaga?"] },
      { id: 8, questions: ["Mennyi 90-ből 18?", "Melyik a legmélyebb tó Magyarországon?", "Hány billentyű van egy zongorán általában?", "Mennyi 9 ször 6?", "Ki fedezte fel Amerikát?"] },
      { id: 9, questions: ["Mennyi 11 szor 11?", "Mi a vörös bolygó neve?", "Hány perc egy negyed óra?", "Mennyi 500 fele?", "Melyik folyó szeli át Budapestet?"] },
      { id: 10, questions: ["Mennyi 1000-ből 250?", "Ki volt a 'Legnagyobb Magyar'?", "Hány gramm 1 kilogramm?", "Mennyi 120 osztva 6-tal?", "Milyen színű a smaragd?"] }
    ]
  },
  {
    level: 4,
    title: "4. Szint - Nehéz",
    tasks: [
      { id: 1, questions: ["Mennyi 125 meg 125?", "Ki írta az Egri csillagokat?", "Mi a jele az aranynak a periódusos rendszerben?", "Mennyi 15 szor 4?", "Melyik a legnépesebb ország a világon?"] },
      { id: 2, questions: ["Mennyi 1000-ből 385?", "Hány évig tartott a 100 éves háború?", "Mi a fény sebessége kilométer per másodpercben?", "Mennyi 144 négyzetgyöke?", "Ki volt az osztrák császárné, akit Sissi-nek hívtak?"] },
      { id: 3, questions: ["Mennyi 17 szor 3?", "Hány vármegye van Magyarországon?", "Mi a relatív atomtömege a hidrogénnek?", "Mennyi 2 a tizediken?", "Ki festette a Sixtus-kápolna mennyezetét?"] },
      { id: 4, questions: ["Mennyi 450 osztva 15-tel?", "Melyik évben volt az 1848-as forradalom?", "Hány méter magas a Mount Everest?", "Mennyi a kör kerületének képlete?", "Melyik zeneművész süketült meg, de tovább komponált?"] },
      { id: 5, questions: ["Mennyi 88 meg 77?", "Ki volt a Szovjetunió első vezetője?", "Milyen gáz alkotja a levegő nagy részét?", "Mennyi 25 négyzete?", "Melyik tenger választja el Európát Afrikától?"] },
      { id: 6, questions: ["Mennyi 10 000 osztva 100-zal?", "Ki írta a Rómeó és Júliát?", "Hány másodperc van egy napban?", "Mennyi a Pitagorasz-tétel?", "Melyik városban található az Eiffel-torony?"] },
      { id: 7, questions: ["Mennyi 3 a negyediken?", "Melyik évben ért véget az első világháború?", "Mi a DNS teljes neve?", "Mennyi 13 szor 7?", "Ki fedezte fel a gravitációt?"] },
      { id: 8, questions: ["Mennyi 1000-ből 123?", "Melyik a legnagyobb óceán?", "Hány csillag van az Európai Unió zászlaján?", "Mennyi 169 négyzetgyöke?", "Melyik hangszeren játszott Mozart?"] },
      { id: 9, questions: ["Mennyi 5 a harmadikon?", "Ki volt a 'Napkirály'?", "Hány km a Föld egyenlítői kerülete kb.?", "Mennyi 225 osztva 15-tel?", "Melyik a legkeményebb természetes anyag?"] },
      { id: 10, questions: ["Mennyi 0,5 ször 200?", "Ki fedezte fel a penicillint?", "Hány ország határos Magyarországgal?", "Mennyi a logaritmus 10 alapú 100-nak?", "Melyik a leghosszabb folyó a Földön?"] }
    ]
  },
  {
    level: 5,
    title: "5. Szint - Mester",
    tasks: [
      { id: 1, questions: ["Mennyi 17 szor 13?", "Ki dolgozta ki a speciális relativitáselméletet?", "Mi az entrópia definíciója?", "Mennyi a Pi értéke 4 tizedesjegyig?", "Ki volt az első ember a Holdon?"] },
      { id: 2, questions: ["Mennyi 1024 osztva 32-vel?", "Melyik évben volt a mohácsi vész?", "Mi a fotoszintézis mellékterméke?", "Mennyi az e alapú logaritmus e?", "Ki alkotta meg a periódusos rendszert?"] },
      { id: 3, questions: ["Mennyi 21 négyzete?", "Ki írta a Faust-ot?", "Mi a Newton második törvénye?", "Mennyi 1/2 meg 1/3?", "Melyik a legnagyobb sziget a világon?"] },
      { id: 4, questions: ["Mennyi 10 factorial?", "Ki volt az ókori Egyiptom legismertebb fáraónője?", "Mi a sejt energiaközpontja?", "Mennyi a szinusz 90 fokon?", "Melyik a legkisebb ország a világon?"] },
      { id: 5, questions: ["Mennyi 2 a tizenkettediken?", "Ki vezette a spártaiakat a Thermopülai-szorosnál?", "Mi a félidő az izotópoknál?", "Mennyi a kocka térfogata, ha éle 5?", "Melyik festő vágta le a saját fülét?"] },
      { id: 6, questions: ["Mennyi 625 négyzetgyöke?", "Mikor volt a honfoglalás kb.?", "Mi a legerősebb kölcsönhatás a fizikában?", "Mennyi 20 szor 25?", "Ki találta fel a könyvnyomtatást?"] },
      { id: 7, questions: ["Mennyi 999 meg 111?", "Ki volt az USA első elnöke?", "Mi a fekete lyuk eseményhorizontja?", "Mennyi 1000 osztva 12,5-tel?", "Melyik város volt az ókori Görögország kulturális központja?"] },
      { id: 8, questions: ["Mennyi 14 négyzete?", "Ki írta az Odyssey-t?", "Mi az abszolút nulla fok Celsiusban?", "Mennyi 3/4-ed meg 1/8-ad?", "Melyik a legrégebbi egyetem a világon?"] },
      { id: 9, questions: ["Mennyi 15 szor 15?", "Ki volt a 'Vaskancellár'?", "Milyen részecskék alkotják az atommagot?", "Mennyi a gyökvonás 10 000-ből?", "Melyik a legmagasabb vízesés a világon?"] },
      { id: 10, questions: ["Mennyi 123 meg 456?", "Ki volt a reneszánsz polihisztor, aki repülőgépet is tervezett?", "Mi a Higgs-bozon?", "Mennyi 10 a hatodikon?", "Melyik országban található a Machu Picchu?"] }
    ]
  }
];
