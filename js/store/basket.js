function getDeliveryFee(){

    return settings.deliveryFee;
}

function getMinBasketValue(){
    return settings.minBasketValue;
}

function getMinBasketValueForFreeDelivery(){
    return settings.minBasketForFreeDelivery;
}

function getCurrentBasketValue(){
    let basketValue = 0;
    for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
        const element = basket[basketIndex];
        basketValue += element['ammount'] * element['pricePerUnit'];
    }
    return basketValue.toFixed(2);
}

function getBasketTotal(){
    let basketTotalValue = 0;

    basketTotalValue += getCurrentBasketValue();
    if(!isDeliveryFree){
        basketTotalValue += getDeliveryFee();
    }
    if(isVoucherValid("WELCOME20")){
        basketTotalValue -= calculateVoucherValue("WELCOME20");
    }

    return basketTotalValue;
}

function isMinBasketValue(){
    return (getCurrentBasketValue - getMinBasketValue) >= 0;
}

function isDeliveryFree(){
    return (getCurrentBasketValue - getMinBasketValueForFreeDelivery) >= 0;
}

function isVoucherValid(voucherCode) {
    const voucher = getVoucher(voucherCode);
if(voucher){
    return true;
}
    else{
        return false;
    }
}

function getVoucher(voucherCode){
    return validVouchers.find(e => e.code === voucherCode);
}

function setVoucherAsUsed(voucherCode){
    const usedVouchers = loadVouchersFromLocalStorage;

    if(!usedVouchers.includes(voucherCode)){
        usedVouchers.push(voucherCode)
    }

    safeUsedVouchersToLocalStorage(usedVouchers);
}

function calculateVoucherValue(voucherCode){
    const voucher = getVoucher(voucherCode);
    let returnvalue = 0;
    if(voucher['discountUnit']=='%'){
        returnvalue = getCurrentBasketValue() * voucher['discountValue'] / 100;
    }
    else if(voucher['discountUnit']=='€'){
        returnvalue = voucher['discountValue']
    }
    return returnvalue;
}

function isBasketEmpty(){
    return basket.length == 0;
}