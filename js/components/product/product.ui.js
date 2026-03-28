import { getProduct, getProductBasketAmmount } from "./product.js";
import { getProductCardFooterHtmlTemplate } from "./product.ui.template.js";

export function updateProductCardFooter(cardElement){
    
let cardFooter = cardElement.querySelector('.product-card__footer');

if (cardFooter) {
    cardFooter.replaceWith(getProductCardFooterHtmlTemplate(getProduct(cardElement.dataset.id), getProductBasketAmmount(cardElement.dataset.id)));
}

}