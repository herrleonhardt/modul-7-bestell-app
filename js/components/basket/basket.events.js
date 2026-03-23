import { isVoucherValid, setActiveVoucher } from "./basket.js";
import { updateVoucherValue } from "./basket.ui.js";

export function initBasketEvents(){
    document.addEventListener('click', (event) => {

    })

    document.addEventListener("focusout", (e) => {
    console.log(e);
 
    if (e.target.id == 'voucher-code') {
        let voucherCode =e.target.value;
        if (isVoucherValid(voucherCode)) {
            setActiveVoucher(voucherCode);
            updateVoucherValue();
        }
    }
    // isVoucherValid
  });
}