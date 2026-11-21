// „Megálló” (0–6) – Játszótér: Katicapöttyök. A kártyán egy összeadás vagy kivonás 6-ig; annyi pötty kerüljön a katicára, amennyi az eredmény.
// Az A hat lecke Pötyi-pöttyös játszóterét használja művelet-módban.
import React from 'react';
import { PotyiDotsPlayground, potyiDotsSpeechTexts } from '../a-hat/AHatG1Parts';

export const LadybugOpsPlayground: React.FC & { speechTexts?: () => string[] } = () => <PotyiDotsPlayground mode="op" />;
/** Minden mondat, amit a játszótér mondhat – a hanggeneráláshoz (scripts/tts). */
LadybugOpsPlayground.speechTexts = () => potyiDotsSpeechTexts('op');
