/**
 * Tanári jóváhagyás lejárata.
 *
 * A tanári státusz minden tanévben augusztus 31-én (magyar idő szerint a nap végén) lejár,
 * utána a tanárnak újra kérnie kell a jóváhagyást az admintól.
 *
 * - Augusztusban adott jóváhagyás már a következő tanévre szól (a következő év aug. 31-ig).
 * - A mező nélküli, korábban jóváhagyott tanárok a LEGACY dátumig érvényesek
 *   (ugyanez a dátum szerepel a firestore.rules-ban is — a kettőt együtt kell módosítani!).
 */

/** 2027-08-31 23:59:59 Europe/Budapest (CEST = UTC+2). */
export const LEGACY_TEACHER_APPROVAL_UNTIL = new Date(Date.UTC(2027, 7, 31, 21, 59, 59));

/** A jóváhagyás lejárati időpontja, ha most (vagy `from`-kor) hagyják jóvá. */
export function nextTeacherApprovalExpiry(from: Date = new Date()): Date {
  // Augusztustól (7-es hónapindex) már a következő tanév végéig szól.
  const year = from.getUTCMonth() >= 7 ? from.getUTCFullYear() + 1 : from.getUTCFullYear();
  return new Date(Date.UTC(year, 7, 31, 21, 59, 59));
}

type TimestampLike = { toDate: () => Date } | Date | string | number | null | undefined;

export function toDateOrNull(value: TimestampLike): Date | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'object' && typeof (value as { toDate?: unknown }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate();
  }
  const d = new Date(value as string | number);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Mikor jár le a tanár jóváhagyása (mező hiányában a legacy dátum). */
export function getTeacherApprovalUntil(profile: { teacher_approved_until?: TimestampLike }): Date {
  return toDateOrNull(profile.teacher_approved_until) ?? LEGACY_TEACHER_APPROVAL_UNTIL;
}

/** Érvényes-e most a tanári jóváhagyás. */
export function isTeacherApprovalActive(
  profile: { teacher_status?: string; teacher_approved_until?: TimestampLike } | null | undefined,
  now: Date = new Date()
): boolean {
  if (!profile || profile.teacher_status !== 'approved') return false;
  return getTeacherApprovalUntil(profile).getTime() > now.getTime();
}
