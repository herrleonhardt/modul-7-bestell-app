function addProductToBasket(productId) {
  const product = getProduct(productId);
  if (product) {
    if (basket.includes((e) => e.productId == productId)) {
      const entryIndex = basket.indexOf((e) => e.productId == productId);
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

function removeProductFromBasket() {}

function increaseProductAmmountInBasket() {}

function decreaseProductAmmountInBasket() {}

function getProduct(productId) {
  let product = undefined;
  product = stock.find((e) => e.id == productId);
  return product;
}
