import { requestClearBasket } from "../basket/basket.js";



export function initOrderDialogEvents() {

  document.addEventListener("click", (e) => {
    const dialogCloseButton = e.target.closest(
      "button#order-dialog-close-btn"
    );
    if (dialogCloseButton) {
const dialog = document.getElementById('order-placed-dialog');
// console.log(dialog);
dialog.close();


}});

}