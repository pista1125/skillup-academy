// A functions/src/billing.ts tesztjei. Futtatás: cd functions && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const b = require('../lib/billing.js');

test('parseGrade: csak 1–12 egész', () => {
  assert.equal(b.parseGrade(1), 1);
  assert.equal(b.parseGrade(12), 12);
  assert.equal(b.parseGrade('6'), 6);
  assert.equal(b.parseGrade(' 9 '), 9);
  for (const bad of [0, 13, 5.5, '5a', '', null, undefined, 'high-1', NaN]) {
    assert.equal(b.parseGrade(bad), null, String(bad));
  }
});

test('gradeSlug és dokumentumazonosító', () => {
  assert.equal(b.gradeSlug(3), '3-osztaly');
  assert.equal(b.gradeSlug(11), '11-osztaly');
  assert.equal(b.subscriptionDocId('abc', 7), 'abc_7');
});

test('pickOrigin: csak engedélyezett origin, különben éles domain', () => {
  const allowed = ['https://diakzona.hu', /^http:\/\/localhost(:\d+)?$/];
  assert.equal(b.pickOrigin('https://diakzona.hu', allowed), 'https://diakzona.hu');
  assert.equal(b.pickOrigin('http://localhost:8080', allowed), 'http://localhost:8080');
  assert.equal(b.pickOrigin('https://evil.example', allowed), 'https://diakzona.hu');
  assert.equal(b.pickOrigin(undefined, allowed), 'https://diakzona.hu');
});

test('subscriptionPeriodEnd: új (tétel) és régi (előfizetés) API-alak', () => {
  assert.equal(b.subscriptionPeriodEnd({ items: { data: [{ current_period_end: 100 }, { current_period_end: 200 }] } }), 200);
  assert.equal(b.subscriptionPeriodEnd({ items: { data: [] }, current_period_end: 150 }), 150);
  assert.equal(b.subscriptionPeriodEnd({}), null);
});

test('invoiceSubscriptionId: parent.subscription_details és régi mező', () => {
  assert.equal(b.invoiceSubscriptionId({ parent: { subscription_details: { subscription: 'sub_new' } } }), 'sub_new');
  assert.equal(b.invoiceSubscriptionId({ parent: { subscription_details: { subscription: { id: 'sub_obj' } } } }), 'sub_obj');
  assert.equal(b.invoiceSubscriptionId({ subscription: 'sub_old' }), 'sub_old');
  assert.equal(b.invoiceSubscriptionId({ parent: null }), null);
});

test('shouldOverwriteSubscription: lemondott régi nem írja felül az élő újat', () => {
  assert.equal(b.shouldOverwriteSubscription(null, { id: 's1', status: 'active' }), true);
  assert.equal(b.shouldOverwriteSubscription({ id: 's1', status: 'active' }, { id: 's1', status: 'canceled' }), true);
  assert.equal(b.shouldOverwriteSubscription({ id: 's2', status: 'active' }, { id: 's1', status: 'canceled' }), false);
  assert.equal(b.shouldOverwriteSubscription({ id: 's2', status: 'canceled' }, { id: 's1', status: 'canceled' }), true);
  assert.equal(b.shouldOverwriteSubscription({ id: 's2', status: 'canceled' }, { id: 's3', status: 'trialing' }), true);
});

test('subscriptionGrantsAccess: próbaidő, aktív, 3 napos türelmi idő, lemondott', () => {
  const now = Date.UTC(2026, 10, 23);
  const day = 24 * 60 * 60 * 1000;
  assert.equal(b.subscriptionGrantsAccess({ status: 'trialing', currentPeriodEndMs: now + day }, now), true);
  assert.equal(b.subscriptionGrantsAccess({ status: 'active', currentPeriodEndMs: now - 1 }, now), false);
  assert.equal(b.subscriptionGrantsAccess({ status: 'past_due', currentPeriodEndMs: now - 2 * day }, now), true);
  assert.equal(b.subscriptionGrantsAccess({ status: 'past_due', currentPeriodEndMs: now - 4 * day }, now), false);
  assert.equal(b.subscriptionGrantsAccess({ status: 'canceled', currentPeriodEndMs: now + day }, now), false);
  assert.equal(b.subscriptionGrantsAccess({ status: 'active', currentPeriodEndMs: null }, now), false);
});

test('összeg és számlatétel', () => {
  assert.equal(b.hufFromStripeAmount(99000), 990);
  const start = Date.UTC(2026, 10, 23) / 1000;
  const end = Date.UTC(2026, 11, 23) / 1000;
  assert.equal(b.subscriptionInvoiceLabel(6, start, end), 'DiákZóna 6. osztály – havi előfizetés (2026. 11. 23. – 2026. 12. 23.)');
  assert.equal(b.subscriptionInvoiceLabel(6), 'DiákZóna 6. osztály – havi előfizetés');
});

test('isIsoDate', () => {
  assert.equal(b.isIsoDate('2026-11-25'), true);
  for (const bad of ['2026-1-25', 'xx', '', null, '2026-11-25T00:00']) assert.equal(b.isIsoDate(bad), false, String(bad));
});

test('tanári jóváhagyás és licenc érvényessége', () => {
  const now = Date.UTC(2026, 10, 23);
  const ts = (ms) => ({ toMillis: () => ms });
  assert.equal(b.isApprovedTeacherProfile({ teacher_status: 'approved', teacher_approved_until: ts(now + 1) }, now), true);
  assert.equal(b.isApprovedTeacherProfile({ teacher_status: 'approved', teacher_approved_until: ts(now - 1) }, now), false);
  assert.equal(b.isApprovedTeacherProfile({ teacher_status: 'approved' }, now), true, 'legacy: 2027-08-31-ig');
  assert.equal(b.isApprovedTeacherProfile({ teacher_status: 'approved' }, Date.UTC(2027, 8, 1)), false);
  assert.equal(b.isApprovedTeacherProfile({ teacher_status: 'pending' }, now), false);
  assert.equal(b.grantIsLive({ active: true, validUntilMs: now + 1 }, now), true);
  assert.equal(b.grantIsLive({ active: true, validUntilMs: now - 1 }, now), false);
  assert.equal(b.grantIsLive({ active: false, validUntilMs: now + 1 }, now), false);
  assert.equal(b.grantIsLive(undefined, now), false);
});

test('osztálylista segédek', () => {
  const classes = [{ students: [{ userId: 'a' }, { userId: 'b' }] }, { students: [] }, {}];
  assert.equal(b.classesContainStudent(classes, 'b'), true);
  assert.equal(b.classesContainStudent(classes, 'x'), false);
  assert.deepEqual([...b.classStudentIds({ students: [{ userId: 'a' }, { userId: '' }, {}] })], ['a']);
});
