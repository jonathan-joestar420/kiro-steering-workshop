import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal } from '../src/order.mjs';

test('加總所有品項', () => {
  assert.equal(calculateTotal([{ price: 100, qty: 2 }, { price: 50, qty: 1 }]), 250);
});

test('套用折扣後四捨五入', () => {
  assert.equal(calculateTotal([{ price: 333, qty: 1 }], 0.1), 300);
});

test('空訂單為 0', () => {
  assert.equal(calculateTotal([]), 0);
});

test('拒絕不合法的折扣率', () => {
  assert.throws(() => calculateTotal([], 1.5), RangeError);
});

test('拒絕不合法的品項', () => {
  assert.throws(() => calculateTotal([{ price: 10, qty: -1 }]), TypeError);
});
