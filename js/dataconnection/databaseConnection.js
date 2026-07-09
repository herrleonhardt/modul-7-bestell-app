import { stock, validVouchers } from "../data/db.js";

export function getProduct(productId) {
  let product = undefined;
  product = stock.find((stockProduct) => stockProduct.id == productId);
  return product;
}

export function getVoucher(voucherCode) {
  return validVouchers.find((voucher) => voucher.code === voucherCode);
}

export function isProductInStock(productId) {
  return stock.some((stockProduct) => stockProduct.id == productId);
}
