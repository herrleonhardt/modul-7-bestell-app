import { initBasketEvents } from "../components/basket/basket.events.js";
import { initProductEvents } from "../components/product/product.events.js";
import { getCategorieHtmlElement } from "../components/categorie/categorie.ui.template.js";
import { renderBasketContent } from "../components/basket/basket.ui.js";
import { initOrderDialogEvents } from "../components/order-dialog/order-dialog.events.js";
import { categories } from "../data/db.js";

export function initApp() {
  renderProducts();
  renderBasketContent();
  initBasketEvents();
  initProductEvents();
  initOrderDialogEvents();
}

// render all products
function renderProducts() {
  const productsContainer = document.getElementById("products");

  for (let i = 0; i < categories.length; i++) {
    const categorieContainer = getCategorieHtmlElement(categories[i]);
    productsContainer.appendChild(categorieContainer);
  }
}
