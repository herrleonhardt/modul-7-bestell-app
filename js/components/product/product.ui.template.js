// product card rendering

import { createHtmlElementWithClass } from "../../shared/renderUtils.js";
import { getBasketProductAmmountById } from "../basket/basket.js";

export function getProductHtmlTemplate(product) {
  const cardContainer = createHtmlElementWithClass("article", "product-card");
  cardContainer.dataset.id = product.id;
  cardContainer.dataset.state = "0";
  const cardContent = createHtmlElementWithClass("div");
  const cardName = createHtmlElementWithClass("h2", "product-card__name");
  cardName.textContent = product.name;
  const cardDescription = createHtmlElementWithClass("p", "product-card__description");
  cardDescription.textContent = product.description;
  cardContent.appendChild(cardName);
  cardContent.appendChild(cardDescription);
  const cardFooter = getProductCardFooterHtmlTemplate(product, getBasketProductAmmountById(product.id));
  cardContainer.appendChild(getCardImage(product));
  cardContainer.appendChild(cardContent);
  cardContainer.appendChild(cardFooter);
  return cardContainer;
}

function getCardImage(product){
  const cardImage = createHtmlElementWithClass("img", "product-card__image");
  cardImage.src = product.img;
  cardImage.alt = product.name;
  return cardImage;
}

export function getProductCardFooterHtmlTemplate(product, basketAmmount) {
  const cardFooter = createHtmlElementWithClass("div", "product-card__footer");
  const cardPrice = createHtmlElementWithClass("span", "product-card__price");
  cardPrice.textContent = `${product.price.toFixed(2)}€`;
  const addToCartButton = createHtmlElementWithClass("button", "btn btn--primary");
  if (basketAmmount == 0) {
    addToCartButton.textContent = "Add to Cart";
  } else {
    addToCartButton.textContent = `Added ${basketAmmount}`;
    addToCartButton.classList.add("btn--accent");
  }
  addToCartButton.dataset.action = "add-to-card";
  cardFooter.appendChild(cardPrice);
  cardFooter.appendChild(addToCartButton);
  return cardFooter;
}
