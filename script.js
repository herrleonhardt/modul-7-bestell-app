import { initBasketEvents } from "./js/components/basket/basket.events.js";
import { initProductEvents } from "./js/components/product/product.events.js";
import { getCategorieHtmlElement } from "./js/components/categorie/categorie.ui.template.js";
import { renderBasketContent } from "./js/components/basket/basket.ui.js";
import { initOrderDialogEvents } from "./js/components/order-dialog/order-dialog.events.js";
import { categories } from "./js/data/db.js";

initApp();

function initApp() {
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