import React from 'react';
import { QuizTemplate, QuizLevelConfig } from '../QuizTemplate';
import { ReflectionPropertiesMiniFigure } from './ReflectionPropertiesDiagrams';
import { ReflectionPropertiesMatcher } from './ReflectionPropertiesMatcher';
import { ReflectionPropertiesSorter } from './ReflectionPropertiesSorter';

export interface ReflectionPropertiesQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function ReflectionPropertiesQuiz({ onBack, onSwitchToTheory }: ReflectionPropertiesQuizProps) {
  const levelsConfig: Record<1 | 2 | 3, QuizLevelConfig> = {
    // =========================================================================
    // 1. SZINT: ALAPTULAJDONSÁGOK ÉS INVARIANCIÁK (10 FELADAT)
    // =========================================================================
    1: {
      level: 1,
      title: '1. Szint: Alaptulajdonságok és megmaradó mennyiségek',
      subtitle: 'Távolságtartás, szögtartás, területtartás, fixpontok és alapfogalmak',
      range: '1–10. feladat',
      focus: 'Egybevágóság, távolságtartás, szögtartás, fixpontok',
      questions: [
        {
          id: 'q1-1',
          question: 'Mit jelent pontosan az, hogy a tengelyes tükrözés távolságtartó (hossztartó) transzformáció?',
          options: [
            'Bármely két pont távolsága megegyezik a tükörképeik távolságával: |A\'B\'| = |AB|',
            'Minden pont távolsága a tengelytől egyenlő',
            'A tükörkép szakasz kétszer olyan hosszú lesz',
            'A távolságok csak derékszögű alakzatoknál maradnak meg'
          ],
          correctAnswer: 'Bármely két pont távolsága megegyezik a tükörképeik távolságával: |A\'B\'| = |AB|',
          explanation: 'A távolságtartás (izometria) azt jelenti, hogy a sík bármely két pontja közötti távolság a tükrözés után pontosan változatlan marad: |A\'B\'| = |AB|.',
          figure: <ReflectionPropertiesMiniFigure type="distance_invariance" />
        },
        {
          id: 'q1-2',
          question: 'Egy ABC háromszög egyik szöge α = 68°. Mekkora lesz ennek a szögnek a tengelyes tükörképe (α\')?',
          options: [
            '68° (mert a tengelyes tükrözés szögtartó)',
            '112° (a kiegészítő szöge)',
            '34° (a fele)',
            '136° (a duplája)'
          ],
          correctAnswer: '68° (mert a tengelyes tükrözés szögtartó)',
          explanation: 'A tengelyes tükrözés szögtartó: bármely szög nagysága a tükrözés során pontosan változatlan marad, így α\' = α = 68°.',
          figure: <ReflectionPropertiesMiniFigure type="angle_invariance" />
        },
        {
          id: 'q1-3',
          question: 'Egy sokszög területe T = 35 cm², kerülete K = 28 cm. Mennyi a tengelyes tükörképének területe (T\') és kerülete (K\')?',
          options: [
            'T\' = 35 cm² és K\' = 28 cm (terület- és kerülettartó)',
            'T\' = 70 cm² és K\' = 56 cm',
            'T\' = 35 cm², de a kerülete megváltozik',
            'T\' = 17,5 cm² és K\' = 14 cm'
          ],
          correctAnswer: 'T\' = 35 cm² és K\' = 28 cm (terület- és kerülettartó)',
          explanation: 'Mivel a távolságok és a szögek nem változnak, a tengelyes tükrözés területtartó és kerülettartó: T\' = T és K\' = K.',
          figure: <ReflectionPropertiesMiniFigure type="area_invariance" />
        },
        {
          id: 'q1-4',
          question: 'Mely pontok fixpontjai (helyben maradó pontjai) a tengelyes tükrözésnek a síkban?',
          options: [
            'Kizárólag a t tükrözési tengely pontjai (P ∈ t ⟹ P\' = P)',
            'A sík összes pontja',
            'Csak az origó (0; 0)',
            'A tengelytől 1 cm-re lévő pontok'
          ],
          correctAnswer: 'Kizárólag a t tükrözési tengely pontjai (P ∈ t ⟹ P\' = P)',
          explanation: 'A tengelyes tükrözés során pontosan a tengely pontjai maradnak a helyükön (P\' = P). A tengelyen kívül a síkban semmilyen más fixpont nincs.',
          figure: <ReflectionPropertiesMiniFigure type="fixed_points" />
        },
        {
          id: 'q1-5',
          question: 'Mi a tengelyes tükrözés során egy e egyenes képe?',
          options: [
            'Mindig egy e\' egyenes (egyenestartó tulajdonság)',
            'Egy körív',
            'Egyetlen pont',
            'Egy görbe vonal'
          ],
          correctAnswer: 'Mindig egy e\' egyenes (egyenestartó tulajdonság)',
          explanation: 'A tengelyes tükrözés egyenestartó: egyenes képe mindig egyenes, szakasz képe szakasz, félegyenesé félegyenes.'
        },
        {
          id: 'q1-6',
          question: 'Két egyenes párhuzamos egymással (a ∥ b). Milyen viszonyban lesz a tükörképük (a\' és b\')?',
          options: [
            'Szintén párhuzamosak egymással: a\' ∥ b\' (párhuzamosságtartó)',
            'Merőlegesek lesznek egymásra',
            'Metszik egymást 45°-ban',
            'Egybeesnek'
          ],
          correctAnswer: 'Szintén párhuzamosak egymással: a\' ∥ b\' (párhuzamosságtartó)',
          explanation: 'A tengelyes tükrözés megtartja az egyenesek párhuzamosságát: ha a ∥ b, akkor a képeik is párhuzamosak: a\' ∥ b\'.'
        },
        {
          id: 'q1-7',
          question: 'Két egyenes merőleges egymásra (a ⊥ b). Milyen viszonyban lesz a tükörképük (a\' és b\')?',
          options: [
            'Szintén merőlegesek lesznek egymásra: a\' ⊥ b\' (merőlegességtartó)',
            'Párhuzamosak lesznek',
            'Nem zárnak be derékszöget',
            'Csak akkor merőlegesek, ha a tengelyre is azok'
          ],
          correctAnswer: 'Szintén merőlegesek lesznek egymásra: a\' ⊥ b\' (merőlegességtartó)',
          explanation: 'A szögtartás miatt a 90°-os derékszög képe is 90°-os szög marad, így a\' ⊥ b\'.'
        },
        {
          id: 'q1-8',
          question: 'Egy O középpontú, r = 5 cm sugarú kört tükrözünk egy t tengelyre. Mekkora lesz a tükörkép kör sugara (r\')?',
          options: [
            'r\' = 5 cm (a kör sugara változatlan)',
            'r\' = 10 cm',
            'r\' = 2,5 cm',
            'Attól függ, milyen messze van a tengelytől'
          ],
          correctAnswer: 'r\' = 5 cm (a kör sugara változatlan)',
          explanation: 'A távolságtartás miatt a kör minden sugarának hossza változatlan marad: r\' = r = 5 cm. Csak a kör O középpontja tükröződik az új O\' helyre.',
          figure: <ReflectionPropertiesMiniFigure type="circle_invariance" />
        },
        {
          id: 'q1-9',
          question: 'Mi történik egy tetszőleges P ponttal, ha kétszer egymás után tükrözzük ugyanarra a t tengelyre?',
          options: [
            'Visszakerül a kiindulási helyére: (P\')\' = P (involúció)',
            'Kétszer olyan messzire kerül a tengelytől',
            '180°-kal elfordul a tengely körül',
            'A tengelyre esik'
          ],
          correctAnswer: 'Visszakerül a kiindulási helyére: (P\')\' = P (involúció)',
          explanation: 'A tengelyes tükrözés önmaga inverze (involúció): ha egy pont képét újra ugyanarra a tengelyre tükrözzük, pontosan visszakapjuk az eredeti P pontot.',
          figure: <ReflectionPropertiesMiniFigure type="involutive_property" />
        },
        {
          id: 'q1-10',
          question: 'Egy AB szakasz hossza 9,4 cm. Mekkora lesz az A\'B\' szakasz hossza, ha a szakasz metszi a tükrözési tengelyt?',
          options: [
            '9,4 cm (a távolságtartás mindig érvényes, függetlenül a tengely elhelyezkedésétől)',
            'A metszésponttól függően változik',
            'Feleakkora lesz',
            'Dupla akkora lesz'
          ],
          correctAnswer: '9,4 cm (a távolságtartás mindig érvényes, függetlenül a tengely elhelyezkedésétől)',
          explanation: 'A távolságtartás a sík minden szakaszára kivétel nélkül érvényes, akár metszi a szakasz a tengelyt, akár párhuzamos vele, akár ferde.'
        }
      ]
    },

    // =========================================================================
    // 2. SZINT: ORIENTÁCIÓ, FIX ELEMEK ÉS RÉSZLETES TULAJDONSÁGOK (10 FELADAT)
    // =========================================================================
    2: {
      level: 2,
      title: '2. Szint: Orientációváltás, fix elemek és alakzatok viselkedése',
      subtitle: 'Körüljárási irány, fixegyenesek, merőleges metszések és másodfajú egybevágóság',
      range: '11–20. feladat',
      focus: 'Körüljárási irány megfordulása, fixegyenesek, ponthalmaz-tulajdonságok',
      questions: [
        {
          id: 'q2-1',
          question: 'Mi történik egy sokszög csúcsainak körüljárási irányával a tengelyes tükrözés során?',
          options: [
            'Megfordul az iránya: az óramutató járásával ellentétesből (+) óramutatóval megegyező (−) lesz',
            'Pontosan változatlan marad',
            'Csak páratlan oldalú sokszögeknél fordul meg',
            '90°-kal elfordul'
          ],
          correctAnswer: 'Megfordul az iránya: az óramutató járásával ellentétesből (+) óramutatóval megegyező (−) lesz',
          explanation: 'A tengelyes tükrözés megfordítja a sík orientációját. Ezért nevezik másodfajú egybevágóságnak.',
          figure: <ReflectionPropertiesMiniFigure type="orientation_flip" />
        },
        {
          id: 'q2-2',
          question: 'Miért nevezzük a tengelyes tükrözést másodfajú (nem közvetlen) egybevágóságnak?',
          options: [
            'Mert a tükörkép a síkon belüli csúsztatással és forgatással nem hozható fedésbe az eredetivel (ki kellene emelni a térbe)',
            'Mert megváltoztatja a síkidom területét',
            'Mert nem tartja meg a szögeket',
            'Mert két tengely kell hozzá'
          ],
          correctAnswer: 'Mert a tükörkép a síkon belüli csúsztatással és forgatással nem hozható fedésbe az eredetivel (ki kellene emelni a térbe)',
          explanation: 'Az eltolás és az elforgatás közvetlen (elsőfajú) egybevágóságok, mert a síkon belül mozgatva fedésbe hozhatók az alakzatok. A tükörkép orientációja viszont megfordul, így síkbeli mozgással nem fedhető le.',
          figure: <ReflectionPropertiesMiniFigure type="orientation_flip" />
        },
        {
          id: 'q2-3',
          question: 'Mely egyenesek minősülnek fixegyeneseknek (önmagukba képződő vonalaknak) a tengelyes tükrözésben?',
          options: [
            'A t tengely maga és minden a t tengelyre merőleges m egyenes (m ⊥ t)',
            'Csak a t tengely',
            'Minden a t tengellyel párhuzamos egyenes',
            'Bármilyen 45°-os egyenes'
          ],
          correctAnswer: 'A t tengely maga és minden a t tengelyre merőleges m egyenes (m ⊥ t)',
          explanation: 'A tükrözési tengely pontonként fix egyenes. A tengelyre merőleges m egyenesek globálisan fixegyenesek (m\' = m), mert a pontjaik az egyenesen belül cserélnek helyet.',
          figure: <ReflectionPropertiesMiniFigure type="fixed_lines" />
        },
        {
          id: 'q2-4',
          question: 'Egy m egyenes merőleges a t tükrözési tengelyre (m ⊥ t). Pontonként fix-e az m egyenes?',
          options: [
            'Nem, mert a pontjai helyet cserélnek az egyenes mentén, csak az egyenes egésze képződik önmagába',
            'Igen, az m egyenes minden pontja helyben marad',
            'Csak a végtelen távoli pontjai fixek',
            'Attól függ, hol metszi a tengelyt'
          ],
          correctAnswer: 'Nem, mert a pontjai helyet cserélnek az egyenes mentén, csak az egyenes egésze képződik önmagába',
          explanation: 'Az m egyenesen egyedül a metszéspont (m ∩ t) fixpont! A többi pont átkerül a tengely túloldalára, így az egyenes mint ponthalmaz önmagába megy át, de nem pontonként fix.',
          figure: <ReflectionPropertiesMiniFigure type="fixed_lines" />
        },
        {
          id: 'q2-5',
          question: 'Egy AB szakasz felezőpontja F. Hol helyezkedik el az F pont F\' tükörképe?',
          options: [
            'Pontosan az A\'B\' tükörkép szakasz felezőpontjában',
            'Az A\' pontban',
            'A tengelyen kívül tetszőleges helyen',
            'A B\' pontban'
          ],
          correctAnswer: 'Pontosan az A\'B\' tükörkép szakasz felezőpontjában',
          explanation: 'A távolságtartás miatt |AF| = |FB| ⟹ |A\'F\'| = |F\'B\'|, tehát a szakaszfelező pont tükörképe pontosan a képszakasz felezőpontja (felezéstartás).'
        },
        {
          id: 'q2-6',
          question: 'Egy szakasz metszi a t tengelyt egy M pontban. Mi lesz az M metszéspont képe a tükrözéskor?',
          options: [
            'M\' = M (helyben marad, mert a tengely minden pontja fixpont)',
            'A szakasz végpontjába tolódik',
            'Eltűnik',
            'Az origóba kerül'
          ],
          correctAnswer: 'M\' = M (helyben marad, mert a tengely minden pontja fixpont)',
          explanation: 'Mivel M rajta van a tükrözési tengelyen (M ∈ t), ezért M fixpont, képe önmaga: M\' = M.'
        },
        {
          id: 'q2-7',
          question: 'Hány olyan pont létezik a síkban a tükrözési tengelyen KÍVÜL, amely saját maga tükörképe (fixpont)?',
          options: [
            'Egyetlen egy sem (0 darab)',
            'Végtelen sok',
            'Pontosan egy (az origó)',
            'Négy darab'
          ],
          correctAnswer: 'Egyetlen egy sem (0 darab)',
          explanation: 'Ha egy P pont nincs a tengelyen (d(P, t) > 0), akkor a képe a tengely túloldalán van, tehát P\' ≠ P. Így a tengelyen kívül nincs fixpont.'
        },
        {
          id: 'q2-8',
          question: 'Egy ABC háromszög magasságpontja M, súlypontja S. Hol találhatók a tükörkép háromszög (A\'B\'C\') nevezetes pontjai?',
          options: [
            'Pontosan az M és S pontok M\' és S\' tükörképeiben',
            'A tengelyen',
            'Az eredeti háromszög belsejében',
            'Nem léteznek'
          ],
          correctAnswer: 'Pontosan az M és S pontok M\' és S\' tükörképeiben',
          explanation: 'Mivel a tengelyes tükrözés egybevágóság (távolság- és szögtartó), a háromszög minden nevezetes vonala (magasságok, súlyvonalak, szögfelezők) és azok metszéspontjai is a tükörképeikbe transzformálódnak.'
        },
        {
          id: 'q2-9',
          question: 'Egy e egyenes párhuzamos a t tükrözési tengellyel (e ∥ t, e ≠ t). Fixegyenes-e az e egyenes?',
          options: [
            'Nem, mert a képe a tengely másik oldalán lévő, vele párhuzamos egyenes lesz (e\' ≠ e)',
            'Igen, minden párhuzamos egyenes fixegyenes',
            'Csak akkor, ha az e távolsága 1 cm',
            'Igen, pontonként fix'
          ],
          correctAnswer: 'Nem, mert a képe a tengely másik oldalán lévő, vele párhuzamos egyenes lesz (e\' ≠ e)',
          explanation: 'A tengellyel párhuzamos egyenes átkerül a tengely túloldalára, így nem esik egybe önmagával: e\' ∥ t, de e\' ≠ e, tehát NEM fixegyenes.'
        },
        {
          id: 'q2-10',
          question: 'Egy derékszögű háromszög átfogóhoz tartozó magassága m = 4,8 cm. Mekkora a tükörkép háromszög megfelelő magassága?',
          options: [
            '4,8 cm (a magasságvonal hossza megmarad)',
            '9,6 cm',
            '2,4 cm',
            '5 cm'
          ],
          correctAnswer: '4,8 cm (a magasságvonal hossza megmarad)',
          explanation: 'A távolságtartás és szögtartás következtében a háromszög minden belső szakasza, így a magasságvonala is változatlan hosszúságú marad: m\' = m = 4,8 cm.'
        }
      ]
    },

    // =========================================================================
    // 3. SZINT: KETTŐS TÜKRÖZÉSEK, KOMPOZÍCIÓK ÉS MESTERFELADATOK (10 FELADAT)
    // =========================================================================
    3: {
      level: 3,
      title: '3. Szint: Kettős tükrözések, kompozíciók és mesterfeladványok',
      subtitle: 'Párhuzamos és metsző tengelyek, csoportelméleti tulajdonságok és alkalmazások',
      range: '21–30. feladat',
      focus: 'Transzformációk összetétele, párhuzamos eltolás, forgatás, kommutativitás',
      questions: [
        {
          id: 'q3-1',
          question: 'Milyen transzformációval egyenértékű, ha egy alakzatot egymás után kétszer tükrözünk két egymással párhuzamos, d távolságra lévő tengelyre (t₁ ∥ t₂)?',
          options: [
            'Egy párhuzamos eltolással a tengelyekre merőleges irányban, 2·d nagysággal',
            'Egy 180°-os elforgatással',
            'Egy harmadik tengelyes tükrözéssel',
            'Helyben maradással'
          ],
          correctAnswer: 'Egy párhuzamos eltolással a tengelyekre merőleges irányban, 2·d nagysággal',
          explanation: 'Két párhuzamos tengelyre vett egymás utáni tükrözés egy párhuzamos eltolást hoz létre, amelynek elmozdulási vektora merőleges a tengelyekre, hossza pedig a tengelyek távolságának kétszerese: 2d.',
          figure: <ReflectionPropertiesMiniFigure type="parallel_reflections" />
        },
        {
          id: 'q3-2',
          question: 'Két tükrözési tengely α = 35°-os szögben metszi egymást az O pontban. Milyen egyetlen transzformációval egyenértékű a két tengelyre vett egymás utáni tükrözés?',
          options: [
            'Az O pont körüli 70°-os (2·α) elforgatással',
            'Egy párhuzamos eltolással 35 cm-rel',
            'Egy 35°-os elforgatással',
            'Egyetlen tengelyes tükrözéssel'
          ],
          correctAnswer: 'Az O pont körüli 70°-os (2·α) elforgatással',
          explanation: 'Két metsző tengelyre történő egymás utáni tükrözés a tengelyek metszéspontja körüli elforgatást eredményez, ahol a forgatás szöge a tengelyek által bezárt szög kétszerese: 2 · 35° = 70°.',
          figure: <ReflectionPropertiesMiniFigure type="intersecting_reflections" />
        },
        {
          id: 'q3-3',
          question: 'Milyen eredményt ad, ha két egymásra MERŐLEGES tengelyre tükrözünk egymás után (α = 90°)?',
          options: [
            'A metszéspontra (origóra) vonatkozó középpontos tükrözést (180°-os elforgatást)',
            'Párhuzamos eltolást',
            '90°-os elforgatást',
            'Helyben maradást'
          ],
          correctAnswer: 'A metszéspontra (origóra) vonatkozó középpontos tükrözést (180°-os elforgatást)',
          explanation: 'Mivel 2 · 90° = 180°, a két merőleges tengelyre vett tükrözés 180°-os elforgatást ad a metszéspont körül, ami pontosan a metszéspontra vonatkozó középpontos tükrözés!',
          figure: <ReflectionPropertiesMiniFigure type="intersecting_reflections" />
        },
        {
          id: 'q3-4',
          question: 'Hogyan alakul a sík körüljárási iránya, ha PÁROS számú (pl. 2 vagy 4) tengelyes tükrözést hajtunk végre egymás után?',
          options: [
            'Megmarad az eredeti körüljárási irány (kétszer/négyszer fordul meg ⟹ változatlan marad)',
            'Megfordul az iránya',
            'Nem értelmezhető',
            '90°-kal elfordul'
          ],
          correctAnswer: 'Megmarad az eredeti körüljárási irány (kétszer/négyszer fordul meg ⟹ változatlan marad)',
          explanation: 'Minden egyes tengelyes tükrözés megfordítja az orientációt: (+) ⟶ (−) ⟶ (+) ⟶ (−) ⟶ (+). Páros számú tükrözés után a körüljárási irány mindig megegyezik az eredetivel (közvetlen egybevágóság).'
        },
        {
          id: 'q3-5',
          question: 'Hogyan alakul a sík körüljárási iránya, ha PÁRATLAN számú (pl. 1 vagy 3) tengelyes tükrözést hajtunk végre egymás után?',
          options: [
            'Megfordul az iránya (másodfajú egybevágóságot kapunk)',
            'Változatlan marad',
            'Körbeforog',
            'Csak négyszögeknél fordul meg'
          ],
          correctAnswer: 'Megfordul az iránya (másodfajú egybevágóságot kapunk)',
          explanation: 'Páratlan számú tükrözés után a sík körüljárási iránya mindig az ellentétesre változik (+ ⟶ −).'
        },
        {
          id: 'q3-6',
          question: 'Kommutatív-e (felcserélhető-e a sorrend) két metsző tengelyre vett tükrözés (R₂ ∘ R₁ = R₁ ∘ R₂)?',
          options: [
            'Általában NEM, mert a sorrend megfordítása ellenkező irányú forgatást (óramutatóval megegyező vs. ellentétes) eredményez',
            'Igen, a tükrözések sorrendje mindig felcserélhető',
            'Csak párhuzamos tengelyeknél nem cserélhető fel',
            'Mindig identitást ad'
          ],
          correctAnswer: 'Általában NEM, mert a sorrend megfordítása ellenkező irányú forgatást (óramutatóval megegyező vs. ellentétes) eredményez',
          explanation: 'A transzformációk összetétele általában nem kommutatív: ha megfordítjuk a tengelyek sorrendjét, a forgatás szöge ellentétes előjelű (−2α) lesz. Kivétel: ha a tengelyek merőlegesek (180° = −180°).'
        },
        {
          id: 'q3-7',
          question: 'Egy síkidomnak hány szimmetriatengelye lehet a tengelyes szimmetria definíciója szerint?',
          options: [
            'Lehet 0 (nincs tengelye), 1, 2, ..., vagy akár végtelen sok is (mint a körnél)',
            'Csak 1 vagy 2 lehet',
            'Mindig pontosan 4',
            'Minden alakzatnak végtelen sok van'
          ],
          correctAnswer: 'Lehet 0 (nincs tengelye), 1, 2, ..., vagy akár végtelen sok is (mint a körnél)',
          explanation: 'Egy alakzat szimmetriatengelyeinek száma változó: általános háromszög (0), egyenlő szárú háromszög (1), téglalap (2), szabályos háromszög (3), négyzet (4), szabályos n-szög (n), kör (végtelen sok).'
        },
        {
          id: 'q3-8',
          question: 'A Heron-féle szélsőérték feladatban az A pontból a t folyópart érintésével a B pontba vezető legrövidebb utat keressük. Miért a tükrözés a megoldás kulcsa?',
          options: [
            'Mert a B pont tükörképével (B\') az AP + PB távolság egyenlő az AP + PB\' töröttvonallal, és két pont között az egyenes a legrövidebb',
            'Mert a folyó vize merőleges',
            'Mert a tükrözés megduplázza a sebességet',
            'Mert a fény nem verődik vissza'
          ],
          correctAnswer: 'Mert a B pont tükörképével (B\') az AP + PB távolság egyenlő az AP + PB\' töröttvonallal, és két pont között az egyenes a legrövidebb',
          explanation: 'Mivel |PB| = |PB\'| a távolságtartás miatt, az AP + PB = AP + PB\' összeg akkor minimális, ha A, P és B\' egy egyenesre esik. Így az AB\' egyenes és a t tengely metszéspontja adja meg a minimális utat (a fényvisszaverődés törvénye szerint).'
        },
        {
          id: 'q3-9',
          question: 'Három egymással párhuzamos tengelyre tükrözünk egymás után (t₁ ∥ t₂ ∥ t₃). Milyen összetett transzformációt kapunk?',
          options: [
            'Egy csúsztatva tükrözést (egy tengelyes tükrözés és egy tengellyel párhuzamos eltolás összetételét)',
            'Egy tiszta elforgatást',
            'Egy sima eltolást',
            'Helyben maradást'
          ],
          correctAnswer: 'Egy csúsztatva tükrözést (egy tengelyes tükrözés és egy tengellyel párhuzamos eltolás összetételét)',
          explanation: 'Az első két párhuzamos tükrözés egy eltolást ad, a harmadik tükrözés pedig megfordítja a körüljárási irányt, így a végeredmény egy tengelyes tükrözés vagy csúsztatva tükrözés (glisszád).'
        },
        {
          id: 'q3-10',
          question: 'Egy szabályos hatszögnek hány szimmetriatengelye van összesen?',
          options: [
            '6 szimmetriatengelye (3 csúcsokat összekötő átló és 3 oldalfelező merőleges)',
            '3 szimmetriatengelye',
            '12 szimmetriatengelye',
            'Végtelen sok'
          ],
          correctAnswer: '6 szimmetriatengelye (3 csúcsokat összekötő átló és 3 oldalfelező merőleges)',
          explanation: 'Egy szabályos n-szögnek mindig pontosan n darab szimmetriatengelye van. Szabályos hatszögnél n = 6: 3 főátló és 3 oldalfelező merőleges.'
        }
      ]
    }
  };

  return (
    <QuizTemplate
      grade={6}
      chapterId="g6-geometry"
      title="A tengelyes tükrözés tulajdonságai Kvíz"
      subtitle="Távolságtartás, szögtartás, körüljárási irány, fix elemek és kettős tükrözések 3 szinten"
      badge="📐 6. Osztály • III. Geometria • 7. Fejezet"
      topicId="g6-reflection-properties-quiz"
      themeColor="amber"
      levels={levelsConfig}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(props) => <ReflectionPropertiesMatcher {...props} />}
      renderSorter={(props) => <ReflectionPropertiesSorter {...props} />}
      matcherComponent={
        <ReflectionPropertiesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
      sorterComponent={
        <ReflectionPropertiesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      }
    />
  );
}
