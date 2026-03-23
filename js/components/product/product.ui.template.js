
// product card rendering

import { createHtmlElementWithClass } from "../../shared/renderUtils.js";

export function getProductHtmlTemplate(product) {
  //   console.log(`${product.ID}: ${product.name}`);
  const cardContainer = createHtmlElementWithClass("article", "product-card");
  cardContainer.dataset.id = product.id;
  cardContainer.dataset.state = "1";
  const cardImage = createHtmlElementWithClass("img", "product-card__image");
  cardImage.src = product.img;
  cardImage.alt = product.name;
  const cardContent = createHtmlElementWithClass("div");
  const cardName = createHtmlElementWithClass("h2", "product-card__name");
  cardName.textContent = product.name;
  const cardDescription = createHtmlElementWithClass(
    "p",
    "product-card__description"
  );
  cardDescription.textContent = product.description;
  const cardFooter = createHtmlElementWithClass("div", "product-card__footer");
  const cardPrice = createHtmlElementWithClass("span", "product-card__price");
  cardPrice.textContent = `${product.price.toFixed(2)}€`;
  const addToCartButton = createHtmlElementWithClass(
    "button",
    "btn btn--primary"
  );
  addToCartButton.textContent = "Add to Cart";
  addToCartButton.dataset.action = "add-to-card";

  cardContent.appendChild(cardName);
  cardContent.appendChild(cardDescription);
  cardFooter.appendChild(cardPrice);
  cardFooter.appendChild(addToCartButton);

  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardContent);
  cardContainer.appendChild(cardFooter);

  return cardContainer;
}
