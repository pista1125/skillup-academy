import { Topic, QuizQuestion } from '@/types/education';

export const physicsTopics: Record<string, Topic[]> = {
  'high-1': [
    {
      id: 'motion',
      title: 'Mozgások',
      description: 'Egyenes vonalú egyenletes és gyorsuló mozgás',
      icon: '🚀',
      lessons: [
        { id: 'motion-intro', title: 'Bevezetés a mozgástanba', type: 'theory' },
        { id: 'motion-uniform', title: 'Egyenletes mozgás', type: 'theory' },
        { id: 'motion-uniform-sim', title: 'Egyenletes mozgás szimuláció', type: 'simulation' },
        { id: 'motion-accelerated', title: 'Gyorsuló mozgás', type: 'theory' },
        { id: 'motion-accelerated-sim', title: 'Gyorsuló mozgás szimuláció', type: 'simulation' },
        { id: 'motion-quiz', title: 'Mozgások kvíz', type: 'quiz' },
      ],
    },
    {
      id: 'forces',
      title: 'Erők',
      description: 'Newton törvényei és az erő fogalma',
      icon: '💪',
      lessons: [
        { id: 'forces-intro', title: 'Mi az erő?', type: 'theory' },
        { id: 'forces-newton1', title: 'Newton I. törvénye', type: 'theory' },
        { id: 'forces-newton2', title: 'Newton II. törvénye', type: 'theory' },
        { id: 'forces-newton3', title: 'Newton III. törvénye', type: 'theory' },
        { id: 'forces-quiz', title: 'Erők kvíz', type: 'quiz' },
      ],
    },
    {
      id: 'projectile',
      title: 'Hajítások',
      description: 'Ferde és vízszintes hajítás',
      icon: '🎯',
      lessons: [
        { id: 'projectile-intro', title: 'Bevezetés a hajításokba', type: 'theory' },
        { id: 'projectile-horizontal', title: 'Vízszintes hajítás', type: 'theory' },
        { id: 'projectile-angled', title: 'Ferde hajítás', type: 'theory' },
        { id: 'projectile-sim', title: 'Hajítás szimuláció', type: 'simulation' },
        { id: 'projectile-quiz', title: 'Hajítások kvíz', type: 'quiz' },
      ],
    },
  ],
  'high-2': [
    {
      id: 'thermodynamics',
      title: 'Hőtan',
      description: 'Hőmérséklet, hő és termodinamika',
      icon: '🌡️',
      lessons: [
        { id: 'thermo-intro', title: 'Hőmérséklet és hő', type: 'theory' },
        { id: 'thermo-transfer', title: 'Hőátadás', type: 'theory' },
        { id: 'thermo-expansion', title: 'Hőtágulás', type: 'theory' },
        { id: 'thermo-quiz', title: 'Hőtan kvíz', type: 'quiz' },
      ],
    },
    {
      id: 'molecular-physics',
      title: 'Molekuláris fizika',
      description: 'A gázok mikroszkopikus szerkezete és a véletlen mozgás',
      icon: '🔬',
      lessons: [
        { id: 'molecular-internal-energy', title: 'Belső energia és részecskék', type: 'simulation' },
        { id: 'molecular-brownian', title: 'Brown-mozgás', type: 'simulation' },
        { id: 'molecular-random-walk', title: 'Statisztikus bolyongás', type: 'simulation' },
        { id: 'molecular-theory', title: 'A kinetikus gázelmélet', type: 'theory' },
        { id: 'molecular-quiz', title: 'Molekuláris fizika kvíz', type: 'quiz' },
      ],
    },
    {
      id: 'waves',
      title: 'Hullámok',
      description: 'Mechanikai és elektromágneses hullámok',
      icon: '🌊',
      lessons: [
        { id: 'waves-intro', title: 'Mi a hullám?', type: 'theory' },
        { id: 'waves-properties', title: 'Hullámok jellemzői', type: 'theory' },
        { id: 'waves-sound', title: 'Hanghullámok', type: 'theory' },
        { id: 'waves-quiz', title: 'Hullámok kvíz', type: 'quiz' },
      ],
    },
  ],
};

export const physicsQuizzes: Record<string, QuizQuestion[]> = {
  'motion-quiz': [
    {
      id: 'q1',
      question: 'Mi a sebesség mértékegysége az SI rendszerben?',
      options: ['km/h', 'm/s', 'cm/min', 'km/s'],
      correctAnswer: 1,
      explanation: 'Az SI rendszerben a sebesség mértékegysége a méter per szekundum (m/s).',
    },
    {
      id: 'q2',
      question: 'Egy autó 100 km utat tesz meg 2 óra alatt. Mennyi az átlagsebessége?',
      options: ['25 km/h', '50 km/h', '100 km/h', '200 km/h'],
      correctAnswer: 1,
      explanation: 'v = s/t = 100 km / 2 h = 50 km/h',
    },
    {
      id: 'q3',
      question: 'Mi jellemzi az egyenletes mozgást?',
      options: [
        'A sebesség folyamatosan nő',
        'A sebesség állandó',
        'A gyorsulás állandó és nem nulla',
        'A test megáll',
      ],
      correctAnswer: 1,
      explanation: 'Egyenletes mozgásnál a sebesség állandó, nem változik.',
    },
    {
      id: 'q4',
      question: 'Mi a gyorsulás?',
      options: [
        'A megtett út',
        'A sebesség változásának üteme',
        'A sebesség összege',
        'Az idő és a sebesség szorzata',
      ],
      correctAnswer: 1,
      explanation: 'A gyorsulás megmutatja, hogy mennyivel változik a sebesség egységnyi idő alatt.',
    },
    {
      id: 'q5',
      question: 'Egy test 5 másodperc alatt 0-ról 20 m/s sebességre gyorsul. Mennyi a gyorsulása?',
      options: ['2 m/s²', '4 m/s²', '5 m/s²', '100 m/s²'],
      correctAnswer: 1,
      explanation: 'a = Δv/Δt = (20-0)/5 = 4 m/s²',
    },
  ],
  'forces-quiz': [
    {
      id: 'q1',
      question: 'Mi Newton I. törvénye (tehetetlenség törvénye)?',
      options: [
        'F = m × a',
        'Minden hatásnak van ellenhatása',
        'Ha nincs erőhatás, a test megőrzi mozgásállapotát',
        'A nehézségi erő mindig lefelé mutat',
      ],
      correctAnswer: 2,
      explanation: 'A tehetetlenség törvénye szerint erő hiányában a test megőrzi nyugalmi vagy egyenes vonalú egyenletes mozgásállapotát.',
    },
    {
      id: 'q2',
      question: 'Mi az erő mértékegysége?',
      options: ['Joule', 'Watt', 'Newton', 'Pascal'],
      correctAnswer: 2,
      explanation: 'Az erő SI mértékegysége a Newton (N).',
    },
    {
      id: 'q3',
      question: 'Mekkora erő kell egy 10 kg tömegű test 2 m/s² gyorsulásához?',
      options: ['5 N', '12 N', '20 N', '8 N'],
      correctAnswer: 2,
      explanation: 'F = m × a = 10 kg × 2 m/s² = 20 N',
    },
    {
      id: 'q4',
      question: 'Newton III. törvénye szerint:',
      options: [
        'A gyorsulás arányos az erővel',
        'Minden hatásnak van ellentétes irányú, azonos nagyságú ellenhatása',
        'A sebesség állandó marad',
        'A tömeg és a súly egyenlő',
      ],
      correctAnswer: 1,
      explanation: 'A hatás-ellenhatás törvénye szerint az erők párosával lépnek fel, ellentétes irányban.',
    },
  ],
  'projectile-quiz': [
    {
      id: 'q1',
      question: 'Vízszintes hajításnál melyik komponens állandó?',
      options: [
        'A függőleges sebesség',
        'A vízszintes sebesség',
        'A gyorsulás',
        'Egyik sem',
      ],
      correctAnswer: 1,
      explanation: 'Vízszintes hajításnál a vízszintes sebességkomponens állandó, mert nincs erő abban az irányban.',
    },
    {
      id: 'q2',
      question: 'Milyen pályát ír le a ferdén hajított test?',
      options: ['Egyenes', 'Kör', 'Parabola', 'Ellipszis'],
      correctAnswer: 2,
      explanation: 'A gravitáció hatására a ferdén hajított test parabolapályát ír le.',
    },
    {
      id: 'q3',
      question: 'Milyen szögben kell hajítani a maximális hatótávolsághoz (légüres térben)?',
      options: ['30°', '45°', '60°', '90°'],
      correctAnswer: 1,
      explanation: '45°-os szögnél a legnagyobb a hajítás hatótávolsága légüres térben.',
    },
  ],
  'molecular-quiz': [
    {
      id: 'mq1',
      question: 'Mi a hőmérséklet mikroszkopikus értelmezése?',
      options: [
        'A részecskék száma a tartályban',
        'A részecskék átlagos mozgási energiája',
        'A gáz térfogata',
        'A tartály fala által kifejtett nyomás',
      ],
      correctAnswer: 1,
      explanation: 'A kinetikus gázelmélet szerint a hőmérséklet a részecskék rendezetlen hőmozgásának (átlagos mozgási energiájának) mértéke.',
    },
    {
      id: 'mq2',
      question: 'Mi bizonyítja közvetlenül a molekulák létezését és mozgását?',
      options: [
        'A gravitáció',
        'A Brown-mozgás',
        'A fényvisszaverődés',
        'A mágneses vonzás',
      ],
      correctAnswer: 1,
      explanation: 'A Brown-mozgás során megfigyelhető nagyobb szemcsék lökdösődése közvetlen bizonyíték a láthatatlan molekulák ütközéseire.',
    },
    {
      id: 'mq3',
      question: 'Hogyan változik az ideális gáz belső energiája, ha melegítjük (állandó térfogaton)?',
      options: [
        'Csökken',
        'Változatlan marad',
        'Nő',
        'Nullára csökken',
      ],
      correctAnswer: 2,
      explanation: 'A melegítés során energiát közlünk a rendszerrel, ami a részecskék mozgási energiáját, és így a gáz belső energiáját növeli.',
    },
  ],
};

export const lessonContent: Record<string, string> = {
  'motion-intro': `
# Bevezetés a mozgástanba

A **kinematika** a fizika azon ága, amely a testek mozgását vizsgálja anélkül, hogy a mozgás okait kutatná.

## Alapfogalmak

### Helyzetkör
A test pozícióját a térben koordinátákkal adjuk meg. Egy dimenzióban ez egyetlen szám (x).

### Elmozdulás
Az elmozdulás a helyzetvektor megváltozása. Vektormennyiség, tehát iránya és nagysága is van.

**Δx = x₂ - x₁**

### Sebesség
A sebesség megmutatja, milyen gyorsan változik a test helyzete.

**v = Δx / Δt**

## Fontos megjegyzések
- A megtett út és az elmozdulás nem mindig egyezik!
- A sebesség vektor, a gyorsaság skalár
  `,
  'motion-uniform': `
# Egyenletes mozgás

Az **egyenes vonalú egyenletes mozgás** során a test állandó sebességgel mozog egyenes pályán.

## Jellemzők
- A sebesség nagysága és iránya állandó
- A gyorsulás nulla
- A megtett út arányos az eltelt idővel

## Képletek

### Út-idő összefüggés
**s = v × t**

### Sebesség
**v = s / t**

## Grafikus ábrázolás
- **s-t diagram**: egyenes vonal (a meredekség a sebesség)
- **v-t diagram**: vízszintes egyenes
  `,
  'motion-accelerated': `
# Gyorsuló mozgás

Az **egyenes vonalú egyenletesen változó mozgás** során a test sebessége egyenletesen változik.

## Jellemzők
- A gyorsulás állandó (a ≠ 0)
- A sebesség egyenletesen nő vagy csökken
- A megtett út az idő négyzetével arányos

## Képletek

### Sebesség változása
**v = v₀ + a × t**

### Megtett út
**s = v₀ × t + ½ × a × t²**

### Sebesség-út összefüggés
**v² = v₀² + 2 × a × s**

## Speciális eset: szabadesés
- a = g ≈ 9,81 m/s² (Földön)
- Minden test ugyanúgy esik (légüres térben)
  `,
  'forces-intro': `
# Mi az erő?

Az **erő** a testek kölcsönhatásának mértéke. Az erő megváltoztatja a test mozgásállapotát vagy alakját.

## Az erő tulajdonságai
- Vektormennyiség (van iránya és nagysága)
- Mértékegysége: Newton (N)
- 1 N = 1 kg × 1 m/s²

## Erőfajták
- **Gravitációs erő**: tömegvonzás
- **Súrlódási erő**: felületek között
- **Rugóerő**: rugalmas alakváltozásból
- **Közegellenállás**: közegben mozgó testre hat
  `,
  'molecular-theory': `
# A kinetikus gázelmélet

A **kinetikus gázelmélet** szerint az anyagot nagyszámú, állandóan mozgó részecske (atom, molekula) építi fel.

## Alappillérek

### Hőmozgás
A gázok részecskéi kaotikus, rendezetlen mozgást végeznek. Ez a mozgás annál intenzívebb, minél magasabb a rendszer hőmérséklete.

### Belső energia
Az ideális gáz belső energiája (E_b) megegyezik a részecskék mozgási energiájának összegével.
**E_b = f/2 * N * k * T**
*(ahol f a szabadsági fokok száma, N a részecskeszám, k a Boltzmann-állandó, T a hőmérséklet)*

### Brown-mozgás
Robert Brown fedezte fel 1827-ben, hogy folyadékban lévő porszemcsék cikázó mozgást végeznek. Ezt a molekulák véletlenszerű ütközései okozzák.

## A modell jelentősége
Ez a modell hidat képez a mikroszkopikus (molekula szintű) és a makroszkopikus (nyomás, hőmérséklet) világ között.
  `,
};
