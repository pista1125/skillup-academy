import React from 'react';
import { FONT, INK, C_MIN, C_SUB, signed, changeColor } from './DiffChangesG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.
// Kék doboz = a kisebbítendő változása, narancs doboz = a kivonandó változása.

const fsOf = (d: number, big = 23) => (signed(d).length > 3 ? big - 3 : big);

/** Párosító: a kisebbítendő és a kivonandó változása két dobozban, köztük „−” jel. */
export const MiniTwoChanges: React.FC<{ m?: number; s?: number }> = ({ m = 10, s = 0 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="4" y="16" width="62" height="48" rx="10" fill={C_MIN.fill} stroke={C_MIN.stroke} strokeWidth="3" />
    <text x="35" y="48" textAnchor="middle" fontSize={fsOf(m)} fontWeight="bold" fill={changeColor(m)}>{signed(m)}</text>
    <text x="75" y="50" textAnchor="middle" fontSize="26" fontWeight="bold" fill={INK}>−</text>
    <rect x="84" y="16" width="62" height="48" rx="10" fill={C_SUB.fill} stroke={C_SUB.stroke} strokeWidth="3" />
    <text x="115" y="48" textAnchor="middle" fontSize={fsOf(s)} fontWeight="bold" fill={changeColor(s)}>{signed(s)}</text>
  </svg>
);

/** Párosító: okos kivonás – a két szám, fölöttük ugyanaz a változás (pl. +2, +2). */
export const MiniShift: React.FC<{ m?: number; s?: number; k?: number }> = ({ m = 435, s = 198, k = 2 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <text x="34" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill={changeColor(k)}>{signed(k)}</text>
    <text x="116" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill={changeColor(k)}>{signed(k)}</text>
    <rect x="4" y="36" width="60" height="38" rx="8" fill={C_MIN.fill} stroke={C_MIN.stroke} strokeWidth="3" />
    <text x="34" y="63" textAnchor="middle" fontSize="23" fontWeight="bold" fill={INK}>{m}</text>
    <text x="75" y="64" textAnchor="middle" fontSize="26" fontWeight="bold" fill={INK}>−</text>
    <rect x="86" y="36" width="60" height="38" rx="8" fill={C_SUB.fill} stroke={C_SUB.stroke} strokeWidth="3" />
    <text x="116" y="63" textAnchor="middle" fontSize="23" fontWeight="bold" fill={INK}>{s}</text>
  </svg>
);

/** Csoportosító: a két szám változása egymás alatt (kék = kisebbítendő, narancs = kivonandó). */
export const SortChange: React.FC<{ m?: number; s?: number }> = ({ m = 10, s = 0 }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="5" y="4" width="70" height="34" rx="9" fill={C_MIN.fill} stroke={C_MIN.stroke} strokeWidth="3" />
    <text x="40" y="30" textAnchor="middle" fontSize={fsOf(m)} fontWeight="bold" fill={changeColor(m)}>{signed(m)}</text>
    <rect x="5" y="42" width="70" height="34" rx="9" fill={C_SUB.fill} stroke={C_SUB.stroke} strokeWidth="3" />
    <text x="40" y="68" textAnchor="middle" fontSize={fsOf(s)} fontWeight="bold" fill={changeColor(s)}>{signed(s)}</text>
  </svg>
);
