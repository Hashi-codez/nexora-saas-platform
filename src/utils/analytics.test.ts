import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency,
  formatCompactNumber,
  calculateSummaryMetrics,
  REVENUE_DATA_SERIES
} from './analytics';

test('formatCurrency formats numbers with commas and currency symbol', () => {
  assert.equal(formatCurrency(54000), '$54,000');
  assert.equal(formatCurrency(1248000), '$1,248,000');
});

test('formatCompactNumber handles K and M magnitudes correctly', () => {
  assert.equal(formatCompactNumber(850), '$850');
  assert.equal(formatCompactNumber(45200), '$45.2K');
  assert.equal(formatCompactNumber(2500000), '$2.5M');
});

test('calculateSummaryMetrics aggregates time ranges accurately', () => {
  const summary7D = calculateSummaryMetrics('7D');
  assert.ok(summary7D.totalRevenue > 0);
  assert.ok(summary7D.netProfit > 0);
  assert.equal(summary7D.netProfit, summary7D.totalRevenue - summary7D.totalExpenses);
  assert.ok(summary7D.marginPercent > 0 && summary7D.marginPercent < 100);

  const summary1Y = calculateSummaryMetrics('1Y');
  assert.ok(summary1Y.totalRevenue > summary7D.totalRevenue);
});
