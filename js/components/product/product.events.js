import { updateBasketContent } from "../basket/basket.ui.js";
import { addProductToBasket } from "./product.js";
import { updateProductCardFooter } from "./product.ui.js";



export function initProductEvents(){
      document.addEventListener("click", (e) => {

   e.stopPropagation();
    console.log(e);

    const addToCardButton = e.target.closest("button[data-action='add-to-card']");
if(addToCardButton){
  const card = addToCardButton.closest('Article');
  addProductToBasket(card.dataset.id); 
  updateBasketContent();
  updateProductCardFooter(card);
}

  });

}