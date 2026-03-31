import { updateProductCardFooterById } from "../product/product.ui.js";
import { isVoucherValid, requestAddProductToBasketById, requestDecreaseProductAmmountInBasketById, requestRemoveProductFromBasketById, setActiveVoucher } from "./basket.js";
import { updateVoucherValue, toggleBasket, updateBasketContent } from "./basket.ui.js";


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
