
import { getProduct } from "../../dataconnection/databaseConnection.js";
import { getBasketProductAmmountById } from "../basket/basket.js";
import { getProductCardFooterHtmlTemplate } from "./product.ui.template.js";

export function updateProductCardFooter(cardElement){
    
let cardFooter = cardElement.querySelector('.product-card__footer');

if (cardFooter) {
    cardFooter.replaceWith(getProductCardFooterHtmlTemplate(getProduct(cardElement.dataset.id), getBasketProductAmmountById(cardElement.dataset.id)));
}

}

export function updateProductCardFooterById(cardElement){
    let card = document.querySelector(`.product-card[data-id="${cardElement}"]`);
    if(card){
        updateProductCardFooter(card);
    }
}