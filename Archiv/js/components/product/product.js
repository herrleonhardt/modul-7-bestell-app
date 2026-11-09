import { basket } from "../../app/state.js";
import { stock } from "../../data/db.js";
import { getProduct } from "../../dataconnection/databaseConnection.js";
import { requestAddProductToBasketById, requestRemoveProductFromBasketById} from "../basket/basket.js";

export function addProductToBasket(productId) {
  requestAddProductToBasketById(productId);
}

export function removeProductFromBasket(productId) {
  requestRemoveProductFromBasketById(productId);
}

export function increaseProductAmmountInBasket() {}

export function decreaseProductAmmountInBasket() {}

export function isProductInBasket(productId) {
  return basket.some((basketEntry) => {
    basketEntry.productId == productId;
  });
}

export function getProductBasketAmmount(productId) {
  let returnAmmount = 0;
  const product = getProduct(productId);
  if (product) {
    const basketProductElement = basket.find((basketEntry) => basketEntry.productId == product.id);
    if (basketProductElement) {
      returnAmmount = basketProductElement.ammount;
    }
  }
  return returnAmmount;
}
