import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';

interface DirectProportionGraphMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const DirectProportionGraphMatcher: React.FC<DirectProportionGraphMatcherProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const pairs: MatchPair[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Fogalmak és koordináták)
    // ==========================================
    {
      id: 'g6-dpg-m-1',
      level: 1,
      prompt: 'A koordináta-rendszer origójának koordinátái',
      value: 'O(0; 0)',
      hint: 'A vízszintes és függőleges tengely metszéspontja.'
    },
    {
      id: 'g6-dpg-m-2',
      level: 1,
      prompt: 'A derékszögű koordináta-rendszer vízszintes tengelye',
      value: 'x-tengely (első tengely)',
      hint: 'A pont első koordinátájának tengelye.'
    },
    {
      id: 'g6-dpg-m-3',
      level: 1,
      prompt: 'A derékszögű koordináta-rendszer függőleges tengelye',
      value: 'y-tengely (második tengely)',
      hint: 'A pont második koordinátájának tengelye.'
    },
    {
      id: 'g6-dpg-m-4',
      level: 1,
      prompt: 'Az egyenes arányosság grafikonjának általános egyenlete',
      value: 'y = k · x',
      hint: 'Ahol k az arányossági tényező.'
    },
    {
      id: 'g6-dpg-m-5',
      level: 1,
      prompt: 'Az arányossági tényező (k) kiszámítása a pontból',
      value: 'k = y / x',
      hint: 'A két összetartozó mennyiség állandó hányadosa.'
    },
    {
      id: 'g6-dpg-m-6',
      level: 1,
      prompt: 'Mikor ábrázoljuk az arányosságot pontsorként?',
      value: 'Ha a mennyiség csak egész darabokban létezik (pl. füzet, mozijegy)',
      hint: 'Nem létezik pl. fél darab jegy.'
    },
    {
      id: 'g6-dpg-m-7',
      level: 1,
      prompt: 'Mikor húzunk folytonos félegyenest?',
      value: 'Ha a mennyiség tetszőlegesen apró törtrészekre is osztható (pl. út, idő, tömeg)',
      hint: 'Pl. 1,5 óra vagy 2,75 kg sajt.'
    },
    {
      id: 'g6-dpg-m-8',
      level: 1,
      prompt: 'Egyenes arányosság grafikonjának iránya balról jobbra',
      value: 'Felfelé emelkedő vonal',
      hint: 'Ha x nő, a vele arányos y is növekszik.'
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Értékpárok és k meghatározása)
    // ==========================================
    {
      id: 'g6-dpg-m-9',
      level: 2,
      prompt: 'y = 4 · x egyenesnél x = 3 esetén az y értéke',
      value: 'y = 12',
      hint: 'Számold ki: 4 · 3.'
    },
    {
      id: 'g6-dpg-m-10',
      level: 2,
      prompt: 'P(2; 500) ponton átmenő egyenesnél a k értéke',
      value: 'k = 250',
      hint: 'Hányados: 500 / 2.'
    },
    {
      id: 'g6-dpg-m-11',
      level: 2,
      prompt: 'y = 500 · x vásárlásnál 3 kg áru ára',
      value: '1500 Ft',
      hint: 'Számold ki: 500 · 3.'
    },
    {
      id: 'g6-dpg-m-12',
      level: 2,
      prompt: 'P(4; 28) pont esetén az arányossági tényező',
      value: 'k = 7',
      hint: 'Hányados: 28 / 4.'
    },
    {
      id: 'g6-dpg-m-13',
      level: 2,
      prompt: 'v = 60 km/h sebességű autó útja 3 óra alatt',
      value: '180 km',
      hint: 'Számold ki: 60 · 3.'
    },
    {
      id: 'g6-dpg-m-14',
      level: 2,
      prompt: 'y = 4 · x egyenesnél x értéke, ha y = 20',
      value: 'x = 5',
      hint: 'Számold ki: 20 / 4.'
    },
    {
      id: 'g6-dpg-m-15',
      level: 2,
      prompt: 'y = 8 · x egyenesnél y értéke, ha x = 7',
      value: 'y = 56',
      hint: 'Számold ki: 8 · 7.'
    },
    {
      id: 'g6-dpg-m-16',
      level: 2,
      prompt: 'y = 120 · x egyenletnél x = 0,5 esetén y',
      value: 'y = 60',
      hint: '120 fele: 120 · 0,5.'
    },

    // ==========================================
    // 3. SZINT: MESTER (Meredekség és összetett feladatok)
    // ==========================================
    {
      id: 'g6-dpg-m-17',
      level: 3,
      prompt: 'y = 6x meredeksége az y = 2x grafikonhoz képest',
      value: '3-szor meredekebb egyenes',
      hint: 'A meredekségek hányadosa: 6 / 2.'
    },
    {
      id: 'g6-dpg-m-18',
      level: 3,
      prompt: 'A (0; 500) pontból induló, meredeken emelkedő egyenes vonal',
      value: 'NEM egyenes arányosság (nem az origóból indul)',
      hint: 'Gondolj a fix alapdíjas taxira.'
    },
    {
      id: 'g6-dpg-m-19',
      level: 3,
      prompt: 's = 40 · t sebesség-idő grafikonon a 200 km megtételéhez szükséges idő',
      value: '5 óra',
      hint: 't = s / v = 200 / 40.'
    },
    {
      id: 'g6-dpg-m-20',
      level: 3,
      prompt: 'A grafikon átmegy a P(1,5 óra; 90 km) ponton. Mekkora a sebesség?',
      value: 'v = 60 km/h',
      hint: '90 km osztva 1,5 órával.'
    },
    {
      id: 'g6-dpg-m-21',
      level: 3,
      prompt: 'A P(4; 18) és Q(6; 27) pontok arányossági tényezője (k)',
      value: 'k = 4,5',
      hint: '18 / 4 = 4,5 és 27 / 6 = 4,5.'
    },
    {
      id: 'g6-dpg-m-22',
      level: 3,
      prompt: 'P(5; 40) ponton átmenő grafikon magassága x = 1-nél',
      value: 'y = 8 (ez az arányossági tényező, k)',
      hint: '40 / 5 = 8.'
    },
    {
      id: 'g6-dpg-m-23',
      level: 3,
      prompt: 'y = 250x vásárlásnál 2000 Ft-ért kapható kg mennyiség',
      value: '8 kg',
      hint: '2000 / 250 = 8.'
    },
    {
      id: 'g6-dpg-m-24',
      level: 3,
      prompt: 'y₁ = 80x és y₂ = 60x grafikonok közötti távolság x = 2 óránál',
      value: '40 km különbség (160 km - 120 km)',
      hint: '2 · 80 = 160 és 2 · 60 = 120.'
    }
  ];

  return (
    <MatcherTemplate
      title="Egyenes arányosság grafikonja párosító"
      subtitle="Párosítsd a fogalmakat, értékpárokat, pontokat és meredekségeket 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 🧩 PÁROSÍTÓ"
      themeColor="lime"
      pairs={pairs}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default DirectProportionGraphMatcher;
