import { basket, settings } from "../../app/state.js";

import {
  getProduct,
  getVoucher,
  isProductInStock,
} from "../../dataconnection/databaseConnection.js";

import {
  loadVouchersFromLocalStorage,
  safeUsedVouchersToLocalStorage,
} from "../../dataconnection/storage.js";

import { updateProductCardFooterById } from "../product/product.ui.js";
import { updateBasketContent } from "./basket.ui.js";



function getDeliveryFee() {
  return settings.deliveryFee;
}

function getMinBasketValue() {
  return settings.minBasketValue;
}

export function getMinBasketValueForFreeDelivery() {
  return settings.minBasketForFreeDelivery;
}

export function calculateBasketSubtotalValue() {
  let basketValue = 0;
  for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
    const element = basket[basketIndex];
    basketValue += element["ammount"] * element["pricePerUnit"];
  }
  return basketValue;
}

export function calculateBasketTotal() {
  let basketTotalValue = 0;

  basketTotalValue = basketTotalValue + calculateBasketSubtotalValue();
  basketTotalValue = basketTotalValue + calculateDeliveryFee();

  if (isVoucherValid(settings.activeVoucher)) {
    basketTotalValue =
      basketTotalValue - calculateVoucherValue(settings.activeVoucher);
  }

  return basketTotalValue;
}

export function calculateDeliveryFee() {
  let returnvalue = 0;
  if (!isDeliveryFree()) {
    returnvalue = getDeliveryFee();
  }
  return returnvalue;
}

function isMinBasketValue() {
  return calculateBasketSubtotalValue() - getMinBasketValue() >= 0;
}

function isDeliveryFree() {
  return (
    calculateBasketSubtotalValue() - getMinBasketValueForFreeDelivery() >= 0
  );
}

export function isVoucherValid(voucherCode) {
  const voucher = getVoucher(voucherCode);
  if (voucher) {
    return true;
  } else {
    return false;
  }
}

export function getActiveVoucher() {
  let returnValue = "";
  returnValue = settings.activeVoucher;
  return returnValue;
}

export function setActiveVoucher(voucherCode) {
  settings.activeVoucher = voucherCode;
}

function setVoucherAsUsed(voucherCode) {
  const usedVouchers = loadVouchersFromLocalStorage();

  if (!usedVouchers.includes(voucherCode)) {
    usedVouchers.push(voucherCode);
  }

  safeUsedVouchersToLocalStorage(usedVouchers);
}

export function calculateVoucherValue(voucherCode) {
  const voucher = getVoucher(voucherCode);
  let returnvalue = 0;

  if (voucher) {
    if (voucher["discountUnit"] == "%") {
      returnvalue =
        (calculateBasketSubtotalValue() * voucher["discountValue"]) / 100;
    } else if (voucher["discountUnit"] == "€") {
      returnvalue = voucher["discountValue"];
    }
  }

  return returnvalue;
}

export function isBasketEmpty() {
  return basket.length == 0;
}

export function calculateTotalBasketItems() {
  let returnValue = 0;
  basket.forEach((e) => {
    returnValue += e.ammount;
  });
  return returnValue;
}

export function getBasketProductAmmountById(productId) {
  let returnAmmount = 0;
  const product = getProduct(productId);
  if (product) {
    const basketProductElement = basket.find((e) => e.productId == product.id);
    if (basketProductElement) {
      returnAmmount = basketProductElement.ammount;
    }
  }

  return returnAmmount;
}

export function getBasketEntryById(productId) {
  return basket.find((e) => e.productId == productId);
}

function getBasketEntryIndexById(productId) {
  return basket.findIndex((e) => e.productId == productId);
}

export function requestAddProductToBasketById(productId) {
  const product = getProduct(productId);
  if (isProductInStock(productId)) {
    if (basket.some((e) => e.productId == product.id)) {
      const entryIndex = basket.findIndex((e) => e.productId == productId);
      basket[entryIndex].ammount++;
    } else {
      basket.push({
        productId: product.id,
        ammount: 1,
        pricePerUnit: product.price,
      });
    }
  }
}

export function requestDecreaseProductAmmountInBasketById(productId) {
  if (isProductInStock(productId)) {
    const basketEntry = getBasketEntryById(productId);
    if (basketEntry) {
      if (basketEntry.ammount == 1) {
        requestRemoveProductFromBasketById(productId);
      } else {
        basketEntry.ammount -= 1;
      }
    }
  }
}

function requestSetProductAmmountInBasketToZeroById(productId) {
  if (isProductInStock(productId)) {
    const basketEntry = getBasketEntryById(productId);
    if (basketEntry) {
      basketEntry.ammount = 0;
    }
  }
}

export function requestRemoveProductFromBasketById(productId) {
  const basketEntryIndex = getBasketEntryIndexById(productId);
  if (basketEntryIndex !== -1) {
    basket.splice(basketEntryIndex, 1);
  }
}

export function requestOrder() {
  if (isMinBasketValue()) {
    setVoucherAsUsed(settings.activeVoucher);
    requestClearBasket();

    settings.activeVoucher = "";
  }
}

export function requestClearBasket() {
  basket.forEach((e) => {
    requestSetProductAmmountInBasketToZeroById(e.productId);
    updateProductCardFooterById(e.productId);
  });
  basket.splice(0, basket.length);
  updateBasketContent();
}
