/**
 *
 */
function bindEvents() {
  document.body.addEventListener("click", (e) => {

   e.stopPropagation();
    console.log(e);

    const addToCardButton = e.target.closest("button[data-action='add-to-card']");
if(addToCardButton){
  const card = addToCardButton.closest('Article');
  addProductToBasket(card.dataset.id); 
  updateBasketContent();
}

  });

  document.body.addEventListener("focusout", (e) => {
    console.log(e);
 
    if (e.target.id == 'voucher-code') {
        let voucherCode =e.target.value;
        if (isVoucherValid(voucherCode)) {
            settings.activeVoucher = voucherCode;
            updateVoucherValue();
        }
    }
    // isVoucherValid
  });
}
