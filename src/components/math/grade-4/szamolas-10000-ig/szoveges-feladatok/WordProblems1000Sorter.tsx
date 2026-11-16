import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WordProblems1000SorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const WORD_PROBLEMS1000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik művelet kell?",
    description: "Döntsd el, melyik művelettel oldod meg a feladatot!",
    categories: [
      { id: "add", name: "Összeadás", color: "blue" },
      { id: "sub", name: "Kivonás", color: "purple" },
      { id: "mul", name: "Szorzás", color: "teal" }
    ],
    items: [
      { id: "wps1", text: "Máté 350 Ft, Ádám 650 Ft. Mennyi együtt?", categoryId: "add" },
      { id: "wps2", text: "Délelőtt 340 könyv, délután 220 jött. Összesen?", categoryId: "add" },
      { id: "wps3", text: "A hordóban 410 l van, öntünk bele 220 l-t. Mennyi lesz?", categoryId: "add" },
      { id: "wps4", text: "Ádám 700 m-t, Roland 300 m-t tett meg. Együtt?", categoryId: "add" },
      { id: "wps5", text: "Az osztályban 13 lány és 12 fiú van. Hányan vannak?", categoryId: "add" },
      { id: "wps6", text: "Az első tóba 550, a másodikba 120 ivadék került. Együtt?", categoryId: "add" },
      { id: "wps7", text: "Megtettünk 678 m-t, még 315 m van hátra. Milyen hosszú az út?", categoryId: "add" },
      { id: "wps8", text: "Anna 125 matricájához kapott 48-at. Mennyi lett?", categoryId: "add" },
      { id: "wps9", text: "A busz délelőtt 236 km-t, délután 158 km-t ment. Összesen?", categoryId: "add" },
      { id: "wps10", text: "Csabának 485 Ft-ja van, a könyv 950 Ft. Mennyi hiányzik?", categoryId: "sub" },
      { id: "wps11", text: "385 tanulóból 329 ment színházba. Hányan nem?", categoryId: "sub" },
      { id: "wps12", text: "Az út 940 m, megtettek 780 m-t. Mennyi van hátra?", categoryId: "sub" },
      { id: "wps13", text: "Mona 535 m-re, Manó 400 m-re van a céltól. Mennyi köztük?", categoryId: "sub" },
      { id: "wps14", text: "Az 550-nél 430-cal kevesebb ivadék", categoryId: "sub" },
      { id: "wps15", text: "A 800 m-es távból 265 m-t futott le. Mennyi van még?", categoryId: "sub" },
      { id: "wps16", text: "A 893 m-es útból 678 m-t megtettünk. Mennyi maradt?", categoryId: "sub" },
      { id: "wps17", text: "Volt 1000 Ft-om, 650 Ft-ot elköltöttem. Mennyi maradt?", categoryId: "sub" },
      { id: "wps18", text: "A lelátóra 985 néző fér, 870 jegy kelt el. Hány hely üres?", categoryId: "sub" },
      { id: "wps19", text: "A tanulók ötödrésze 154. Hányan vannak?", categoryId: "mul" },
      { id: "wps20", text: "88 lány és háromszor ennyi fiú. Hány fiú?", categoryId: "mul" },
      { id: "wps21", text: "Ádám percenként 140 m-t tesz meg. Mennyit 5 perc alatt?", categoryId: "mul" },
      { id: "wps22", text: "3 napon át 56–56 km. Mennyi összesen?", categoryId: "mul" },
      { id: "wps23", text: "16 szobában 5–5 ágy van. Hány ágy?", categoryId: "mul" },
      { id: "wps24", text: "14 szobában 6–6 ágy van. Hány ágy?", categoryId: "mul" },
      { id: "wps25", text: "Kristóf 11 éves, anyukája háromszor ennyi. Hány éves?", categoryId: "mul" },
      { id: "wps26", text: "1 kg alma 380 Ft. Mennyibe kerül 2 kg?", categoryId: "mul" },
      { id: "wps27", text: "Roland percenként 60 m-t tesz meg. Mennyit 5 perc alatt?", categoryId: "mul" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Felesleges vagy hiányzó adat?",
    description: "Van-e a feladatban felesleges adat, vagy hiányzik valami a megoldáshoz?",
    categories: [
      { id: "extra", name: "Van felesleges adat", color: "amber" },
      { id: "missing", name: "Hiányzik egy adat", color: "rose" },
      { id: "ok", name: "Minden adat megvan, nincs felesleges", color: "emerald" }
    ],
    items: [
      { id: "wps28", text: "Csaba 950 Ft-os könyvet venne, a könyv 21 cm hosszú. 485 Ft-ja van. Mennyi hiányzik?", categoryId: "extra" },
      { id: "wps29", text: "385 alsósból 189 lány és 196 fiú; 329 ment színházba. Hányan nem?", categoryId: "extra" },
      { id: "wps30", text: "A gerely legalább 260 cm. Karesz 51 m-t dobott, 1 m-rel többet Manónál. Mennyit dobott Manó?", categoryId: "extra" },
      { id: "wps31", text: "A 9 éves Bendegúz 10 osztálytársát hívta meg. Hányan voltak együtt?", categoryId: "extra" },
      { id: "wps32", text: "A piros busz 50 utassal 120 km-t tett meg 2 óra alatt. Hány km-t ment óránként?", categoryId: "extra" },
      { id: "wps33", text: "A 3 emeletes épületben 30 szoba van, 16 ötágyas. Hány hatágyas?", categoryId: "extra" },
      { id: "wps34", text: "A 10 éves Annának 350 Ft-ja van, kap még 150 Ft-ot. Mennyi lesz?", categoryId: "extra" },
      { id: "wps35", text: "A 22 fős osztály 11 lánya közül 6 szemüveges. Hány lány nem szemüveges?", categoryId: "extra" },
      { id: "wps36", text: "A 3 kg-os macska 2 tál tejet ivott, tálanként 2 dl-t. Mennyit ivott?", categoryId: "extra" },
      { id: "wps37", text: "Benedek 5 kört futott. Hány métert futott?", categoryId: "missing" },
      { id: "wps38", text: "Roland apja 2 kg almát vett. Mennyit fizetett?", categoryId: "missing" },
      { id: "wps39", text: "Megtettek már 620 m-t. Mennyi van még a bejáratig?", categoryId: "missing" },
      { id: "wps40", text: "Péter 3 füzetet vett. Mennyit fizetett?", categoryId: "missing" },
      { id: "wps41", text: "A busz reggel elindult. Mikor ér oda?", categoryId: "missing" },
      { id: "wps42", text: "Anna 400 Ft-ot elköltött. Mennyi pénze maradt?", categoryId: "missing" },
      { id: "wps43", text: "Gyerekek és 4 felnőtt kirándult. Hányan mentek?", categoryId: "missing" },
      { id: "wps44", text: "A tortát 8 gyerek között osztották szét. Hány szelet jutott egynek?", categoryId: "missing" },
      { id: "wps45", text: "Egy dobozban 12 ceruza van. Mennyibe kerül egy ceruza?", categoryId: "missing" },
      { id: "wps46", text: "Máté 350 Ft, Ádám 650 Ft. Mennyi együtt?", categoryId: "ok" },
      { id: "wps47", text: "22 gyerek párban áll. Hány pár?", categoryId: "ok" },
      { id: "wps48", text: "Az út 940 m, megtettek 780 m-t. Mennyi van hátra?", categoryId: "ok" },
      { id: "wps49", text: "Egy füzet 180 Ft. Mennyibe kerül 3 füzet?", categoryId: "ok" },
      { id: "wps50", text: "Karesz 3 napon 56–56 km-t tekert. Mennyit összesen?", categoryId: "ok" },
      { id: "wps51", text: "Volt 1000 Ft-om, 650 Ft-ot elköltöttem. Mennyi maradt?", categoryId: "ok" },
      { id: "wps52", text: "Ádám percenként 140 m-t tesz meg. Mennyit 5 perc alatt?", categoryId: "ok" },
      { id: "wps53", text: "A 800 m-es táv felét futotta le. Hány métert futott?", categoryId: "ok" },
      { id: "wps54", text: "154 gyerek a tanulók ötödrésze. Hányan vannak?", categoryId: "ok" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Becsüld meg!",
    description: "Kerekíts, és becsüld meg: melyik számhoz van a legközelebb az eredmény?",
    categories: [
      { id: "e500", name: "kb. 500", color: "blue" },
      { id: "e750", name: "kb. 750", color: "amber" },
      { id: "e1000", name: "kb. 1000", color: "emerald" }
    ],
    items: [
      { id: "wps55", text: "248 + 251", categoryId: "e500" },
      { id: "wps56", text: "1000 − 498", categoryId: "e500" },
      { id: "wps57", text: "385 + 129", categoryId: "e500" },
      { id: "wps58", text: "613 − 88 − 15", categoryId: "e500" },
      { id: "wps59", text: "96 · 5", categoryId: "e500" },
      { id: "wps60", text: "952 − 457", categoryId: "e500" },
      { id: "wps61", text: "10 · 52", categoryId: "e500" },
      { id: "wps62", text: "250 · 2", categoryId: "e500" },
      { id: "wps63", text: "701 − 199", categoryId: "e500" },
      { id: "wps64", text: "154 · 5", categoryId: "e750" },
      { id: "wps65", text: "480 + 270", categoryId: "e750" },
      { id: "wps66", text: "149 · 5", categoryId: "e750" },
      { id: "wps67", text: "365 + 389", categoryId: "e750" },
      { id: "wps68", text: "1000 − 251", categoryId: "e750" },
      { id: "wps69", text: "812 − 59", categoryId: "e750" },
      { id: "wps70", text: "3 · 251", categoryId: "e750" },
      { id: "wps71", text: "760 − 14", categoryId: "e750" },
      { id: "wps72", text: "500 : 2 + 502", categoryId: "e750" },
      { id: "wps73", text: "99 · 10", categoryId: "e1000" },
      { id: "wps74", text: "248 · 4", categoryId: "e1000" },
      { id: "wps75", text: "499 + 497", categoryId: "e1000" },
      { id: "wps76", text: "2 · 497", categoryId: "e1000" },
      { id: "wps77", text: "593 + 402", categoryId: "e1000" },
      { id: "wps78", text: "1200 − 205", categoryId: "e1000" },
      { id: "wps79", text: "5 · 198", categoryId: "e1000" },
      { id: "wps80", text: "89 + 912", categoryId: "e1000" },
      { id: "wps81", text: "263 · 4", categoryId: "e1000" }
    ]
  }
];

const WORD_PROBLEMS1000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WORD_PROBLEMS1000_SORTER_LEVELS_LIST[0],
  2: WORD_PROBLEMS1000_SORTER_LEVELS_LIST[1],
  3: WORD_PROBLEMS1000_SORTER_LEVELS_LIST[2]
};

export const WordProblems1000Sorter: React.FC<WordProblems1000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-szoveges-sorter',
  topicTitle = "6. Szöveges feladatok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Válogasd szét a szöveges feladatokat művelet, adatok és becslés szerint!"
      levels={WORD_PROBLEMS1000_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default WordProblems1000Sorter;
