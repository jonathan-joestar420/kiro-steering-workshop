/**
 * 計算訂單總額。
 * @param {Array<{price: number, qty: number}>} items 訂單品項，price 為單價，qty 為數量
 * @param {number} [discountRate=0] 折扣率，0 到 1 之間，例如 0.1 代表打九折
 * @returns {number} 四捨五入到整數的總額
 */
export function calculateTotal(items, discountRate = 0) {
  if (!Array.isArray(items)) {
    throw new TypeError('items 必須是陣列');
  }
  if (typeof discountRate !== 'number' || discountRate < 0 || discountRate > 1) {
    throw new RangeError('discountRate 必須介於 0 到 1');
  }

  const subtotal = items.reduce((sum, item) => {
    if (!Number.isFinite(item.price) || !Number.isInteger(item.qty) || item.qty < 0) {
      throw new TypeError('每個品項需要有效的 price 與非負整數 qty');
    }
    return sum + item.price * item.qty;
  }, 0);

  return Math.round(subtotal * (1 - discountRate));
}
