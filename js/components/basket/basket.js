
import { basket, settings } from "../../app/state.js"
import { validVouchers } from "../../data/data.js";


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
    basketTotalValue = basketTotalValue - calculateVoucherValue(settings.activeVoucher);
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
  return getCurrentBasketValue - getMinBasketValue() >= 0;
}

function isDeliveryFree() {
  return calculateBasketSubtotalValue() - getMinBasketValueForFreeDelivery() >= 0;
}

export function isVoucherValid(voucherCode) {
  const voucher = getVoucher(voucherCode);
  if (voucher) {
    return true;
  } else {
    return false;
  }
}

function getVoucher(voucherCode) {
  return validVouchers.find((e) => e.code === voucherCode);
}

export function getActiveVoucher(){
  let returnValue = "";
  returnValue = settings.activeVoucher;
  return returnValue;

}

export function setActiveVoucher(voucherCode){
  settings.activeVoucher = voucherCode;
}

function setVoucherAsUsed(voucherCode) {
  const usedVouchers = loadVouchersFromLocalStorage;

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
      returnvalue = (calculateBasketSubtotalValue() * voucher["discountValue"]) / 100;
    } else if (voucher["discountUnit"] == "€") {
      returnvalue = voucher["discountValue"];
    }
  }

  return returnvalue;
}

export function isBasketEmpty() {
  return basket.length == 0;
}
