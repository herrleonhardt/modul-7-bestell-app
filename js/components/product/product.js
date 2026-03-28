import { basket } from "../../app/state.js";
import { stock } from "../../data/data.js";


export function addProductToBasket(productId) {
  const product = getProduct(productId);
  if (product) {
    if (basket.some((e) => e.productId == product.id)) {
      const entryIndex = basket.findIndex((e) => e.productId == product.id);
      basket[entryIndex].ammount++;
    } else {
      basket.push({
        productId: product.id,
        ammount: 1,
        pricePerUnit: product.price,
      });
    }
  }
}

export function removeProductFromBasket() {}

export function increaseProductAmmountInBasket() {}

export function decreaseProductAmmountInBasket() {}

export function getProduct(productId) {
  let product = undefined;
  product = stock.find((e) => e.id == productId);
  return product;
}

export function isProductInBasket(productId){
  return basket.some((e) => {e.productId == productId});
}

export function getProductBasketAmmount(productId){
  let returnAmmount = 0;
  const product = getProduct(productId);
  if (product) {
     const basketProductElement = basket.find(e => e.productId == product.id);
  if(basketProductElement){
    returnAmmount = basketProductElement.ammount;
  }
  }
 
  return returnAmmount;
}