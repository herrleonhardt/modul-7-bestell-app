import { requestClearBasket } from "../basket/basket.js";

export function initOrderDialogEvents() {
  document.addEventListener("click", (e) => {
    const dialog = document.getElementById("order-placed-dialog");
    const dialogCloseButton = e.target.closest("button#order-dialog-close-btn");
    if (dialogCloseButton) {
      dialog.close();
    }
    if (event.target === dialog) {
      dialog.close();
    }
  });
}
