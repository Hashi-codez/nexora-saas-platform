import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRICING_PLANS,
  calculateEffectiveMonthlyPrice,
  calculateAnnualCost,
  calculateAnnualSavings,
  getSavingsPercent
} from './pricing';

test('pricing plans data integrity', () => {
  assert.equal(PRICING_PLANS.length, 3);
  const proPlan = PRICING_PLANS.find(p => p.id === 'pro');
  assert.ok(proPlan);
  assert.equal(proPlan.highlighted, true);
  assert.equal(proPlan.monthlyPrice, 79);
  assert.equal(proPlan.yearlyPricePerMonth, 59);
});

test('calculateEffectiveMonthlyPrice returns correct rates', () => {
  const starter = PRICING_PLANS[0];
  assert.equal(calculateEffectiveMonthlyPrice(starter, 'monthly'), 29);
  assert.equal(calculateEffectiveMonthlyPrice(starter, 'yearly'), 22);
});

test('calculateAnnualSavings and getSavingsPercent compute accurate discounts', () => {
  const pro = PRICING_PLANS[1];
  // 79 * 12 = 948; 59 * 12 = 708; Savings = 240
  assert.equal(calculateAnnualSavings(pro), 240);
  assert.equal(calculateAnnualCost(pro, 'yearly'), 708);
  assert.equal(calculateAnnualCost(pro, 'monthly'), 948);
  assert.equal(getSavingsPercent(pro), 25);
});
