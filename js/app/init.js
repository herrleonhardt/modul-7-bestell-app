import { initBasketEvents } from "../components/basket/basket.events.js";
import { initProductEvents } from "../components/product/product.events.js";


export function initApp(){
    console.log("initApp");
  
  renderProducts();
  renderBasketContent();
 initBasketEvents();
 initProductEvents();
}


// render all products
function renderProducts() {
  const productsContainer = document.getElementById("products");

  for (let i = 0; i < categories.length; i++) {
    const categorieContainer = renderCategorie(categories[i]);
    productsContainer.appendChild(categorieContainer);
  }
}