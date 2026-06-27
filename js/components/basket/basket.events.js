import { initApp } from "../../app/init.js";
import { updateProductCardFooterById } from "../product/product.ui.js";
import { isVoucherValid, requestAddProductToBasketById, requestClearBasket, requestDecreaseProductAmmountInBasketById, requestOrder, requestRemoveProductFromBasketById, setActiveVoucher } from "./basket.js";
import { updateVoucherValue, toggleBasket, updateBasketContent, hideBasketInstandly, renderBasketContent } from "./basket.ui.js";


export function initBasketEvents() {
  document.addEventListener("click", (e) => {
    const basketToggleButton = e.target.closest(
      "div[data-action='toggle-basket']"
    );
    if (basketToggleButton) {
      toggleBasket();
    }

    const deleteEntryButton = e.target.closest("[data-action='delete-entry']");
    if (deleteEntryButton) {
      const entry = deleteEntryButton.closest("article");
      const entryId = entry.dataset.id;
      requestRemoveProductFromBasketById(entryId);
      updateProductCardFooterById(entryId);
      updateBasketContent();
    } 
    const decreaseEntryAmmountButton = e.target.closest("[data-action='decrease-entry']");
    if (decreaseEntryAmmountButton) {
      const entry = decreaseEntryAmmountButton.closest("article");
      const entryId = entry.dataset.id;
      requestDecreaseProductAmmountInBasketById(entryId);
      updateProductCardFooterById(entryId);
      updateBasketContent();
    }


    const addEntryButton = e.target.closest("[data-action='increase-entry']");
    if (addEntryButton) {
      const entry = addEntryButton.closest("article");
      const entryId = entry.dataset.id;
      requestAddProductToBasketById(entryId);
      updateProductCardFooterById(entryId);
      updateBasketContent();
    }

    const orderBtn = e.target.closest("button#order-btn");
    if(orderBtn){

      requestOrder();
      hideBasketInstandly();
      const orderPlacedDialog = document.getElementById("order-placed-dialog");
      orderPlacedDialog.showModal();
      setTimeout(() => {orderPlacedDialog.close();},5000);
    }
    

  });

  

  document.addEventListener("focusout", (e) => {
    console.log(e);

    if (e.target.id == "voucher-code") {
      let voucherCode = e.target.value;
      if (isVoucherValid(voucherCode)) {
        setActiveVoucher(voucherCode);
        updateVoucherValue();
      }
    }
    // isVoucherValid
  });
}
