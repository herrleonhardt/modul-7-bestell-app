// app state
const settings = {
  deliveryFee: 4.99,
  minBasketValue: 20.0,
  minBasketForFreeDelivery: 30.0,
  activeVoucher: "",
};

const basket = [];
// end of app state

//init
renderProducts();
renderBasketContent();
initBasketEvents();
initProductEvents();
initOrderDialogEvents();
// end of init

// events
function initProductEvents() {
  document.addEventListener("click", (e) => {
    e.stopPropagation();

    const addToCardButton = e.target.closest(
      "button[data-action='add-to-card']",
    );
    if (addToCardButton) {
      const card = addToCardButton.closest("Article");
      addProductToBasketById(card.dataset.id);
      updateBasketContent();
      updateProductCardFooter(card);
    }
  });
}

function initBasketEvents() {
  initToggleBasketEvent();
  initDeleteEntryButtonEvent();
  initDecreaseEntryAmmountButtonEvent();
  initAddEntryButtonEvent();
  initOrderButtonEvent();
  initVoucherInputFocusoutEvent();
}

function initToggleBasketEvent() {
  document.addEventListener("click", (e) => {
    const basketToggleButton = e.target.closest(
      "div[data-action='toggle-basket']",
    );
    if (basketToggleButton) {
      toggleBasket();
    }
  });
}

function initDeleteEntryButtonEvent() {
  document.addEventListener("click", (e) => {
    const deleteEntryButton = e.target.closest("[data-action='delete-entry']");
    if (deleteEntryButton) {
      const entry = deleteEntryButton.closest("article");
      const entryId = entry.dataset.id;
      removeProductFromBasketById(entryId);
      updateProductCardFooterById(entryId);
      updateBasketContent();
    }
  });
}

function initDecreaseEntryAmmountButtonEvent() {
  document.addEventListener("click", (e) => {
    const decreaseEntryAmmountButton = e.target.closest(
      "[data-action='decrease-entry']",
    );
    if (decreaseEntryAmmountButton) {
      const entry = decreaseEntryAmmountButton.closest("article");
      const entryId = entry.dataset.id;
      decreaseProductAmmountInBasketById(entryId);
      updateProductCardFooterById(entryId);
      updateBasketContent();
    }
  });
}

function initAddEntryButtonEvent() {
  document.addEventListener("click", (e) => {
    const addEntryButton = e.target.closest("[data-action='increase-entry']");
    if (addEntryButton) {
      const entry = addEntryButton.closest("article");
      const entryId = entry.dataset.id;
      addProductToBasketById(entryId);
      updateProductCardFooterById(entryId);
      updateBasketContent();
    }
  });
}

function initOrderButtonEvent() {
  document.addEventListener("click", (e) => {
    const orderBtn = e.target.closest("button#order-btn");
    if (orderBtn) {
      executeOrder();
      hideBasketWithDelay(0);
      const orderPlacedDialog = document.getElementById("order-placed-dialog");
      orderPlacedDialog.showModal();
      setTimeout(() => {
        orderPlacedDialog.close();
      }, 5000);
    }
  });
}

function initVoucherInputFocusoutEvent() {
  document.addEventListener("focusout", (e) => {
    if (e.target.id == "voucher-code") {
      let voucherCode = e.target.value;
      if (isVoucherValid(voucherCode)) {
        setActiveVoucher(voucherCode);
        updateVoucherValue();
      }
    }
  });
}

function initOrderDialogEvents() {
  document.addEventListener("click", (e) => {
    const dialog = document.getElementById("order-placed-dialog");
    const dialogCloseButton = e.target.closest("button#order-dialog-close-btn");
    if (dialogCloseButton) {
      dialog.close();
    }
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

// end of events



// product related functions
// functions related to the productcards in the main container
function isProductInBasket(productId) {
  return basket.some((basketEntry) => {
    basketEntry.productId == productId;
  });
}

function getProductBasketAmmount(productId) {
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

function updateProductCardFooter(cardElement) {
  let cardFooter = cardElement.querySelector(".product-card__footer");

  if (cardFooter) {
    cardFooter.replaceWith(
      getProductCardFooterHtmlTemplate(
        getProduct(cardElement.dataset.id),
        getBasketProductAmmountById(cardElement.dataset.id),
      ),
    );
  }
}

function updateProductCardFooterById(cardElement) {
  let card = document.querySelector(`.product-card[data-id="${cardElement}"]`);
  if (card) {
    updateProductCardFooter(card);
  }
}

// end of product related

// bastket related functions
// anything related to basked funtionality

function getDeliveryFee() {
  return settings.deliveryFee;
}

function getMinBasketValue() {
  return settings.minBasketValue;
}

function getMinBasketValueForFreeDelivery() {
  return settings.minBasketForFreeDelivery;
}

function calculateBasketSubtotalValue() {
  let basketValue = 0;
  for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
    const element = basket[basketIndex];
    basketValue += element["ammount"] * element["pricePerUnit"];
  }
  return basketValue;
}

function calculateBasketTotal() {
  let basketTotalValue = 0;
  basketTotalValue = basketTotalValue + calculateBasketSubtotalValue();
  basketTotalValue = basketTotalValue + calculateDeliveryFee();
  if (isVoucherValid(settings.activeVoucher)) {
    basketTotalValue =
      basketTotalValue - calculateVoucherValue(settings.activeVoucher);
  }
  return basketTotalValue;
}

function calculateDeliveryFee() {
  let returnvalue = 0;
  if (!isDeliveryFree()) {
    returnvalue = getDeliveryFee();
  }
  return returnvalue;
}

function isMinBasketValue() {
  return calculateBasketSubtotalValue() - getMinBasketValue() >= 0;
}

function isDeliveryFree() {
  return (
    calculateBasketSubtotalValue() - getMinBasketValueForFreeDelivery() >= 0
  );
}

function isBasketEmpty() {
  return basket.length == 0;
}

function calculateTotalBasketItems() {
  let returnValue = 0;
  basket.forEach((basketEntry) => {
    returnValue += basketEntry.ammount;
  });
  return returnValue;
}

function getBasketProductAmmountById(productId) {
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

function getBasketEntryById(productId) {
  return basket.find((basketEntry) => basketEntry.productId == productId);
}

function getBasketEntryIndexById(productId) {
  return basket.findIndex((basketEntry) => basketEntry.productId == productId);
}

function addProductToBasketById(productId) {
  const product = getProduct(productId);
  if (isProductInStock(productId)) {
    if (basket.some((basketEntry) => basketEntry.productId == product.id)) {
      const entryIndex = basket.findIndex((basketEntry) => basketEntry.productId == productId);
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

function decreaseProductAmmountInBasketById(productId) {
  if (isProductInStock(productId)) {
    const basketEntry = getBasketEntryById(productId);
    if (basketEntry) {
      if (basketEntry.ammount == 1) {
        removeProductFromBasketById(productId);
      } else {
        basketEntry.ammount -= 1;
      }
    }
  }
}

function setProductAmmountInBasketToZeroById(productId) {
  if (isProductInStock(productId)) {
    const basketEntry = getBasketEntryById(productId);
    if (basketEntry) {
      basketEntry.ammount = 0;
    }
  }
}

function removeProductFromBasketById(productId) {
  const basketEntryIndex = getBasketEntryIndexById(productId);
  if (basketEntryIndex !== -1) {
    basket.splice(basketEntryIndex, 1);
  }
}

function executeOrder() {
  if (isMinBasketValue()) {
    setVoucherAsUsed(settings.activeVoucher);
    clearBasket();
    settings.activeVoucher = "";
  }
}

function clearBasket() {
  basket.forEach((e) => {
    setProductAmmountInBasketToZeroById(e.productId);
    updateProductCardFooterById(e.productId);
  });
  basket.splice(0, basket.length);
  updateBasketContent();
}

function toggleBasket() {
  const basket = document.querySelector(".basket");

  if (!basket.classList.contains("d-none") && !basket.classList.contains("basket--active")) {
    showBasketWithDelay();
  }else if (!basket.classList.contains("d-none")){
    hideBasketWithDelay();
  } else {
    showBasketWithDelay();
  }
}

function hideBasketWithDelay(delay = 300) {
  const basket = document.querySelector(".basket");
  basket.classList.remove("basket--active");
    setTimeout(() => {
      basket.classList.add("d-none");
    }, delay); 
    document.body.style.overflowY = 'unset';
}

function showBasketWithDelay(delay = 10){
  const basket = document.querySelector(".basket");
  basket.classList.remove("d-none");
    setTimeout(() => {
      basket.classList.add("basket--active");
    }, delay); 
    document.body.style.overflowY = 'hidden';
}



// basket rendering
function renderBasketContent() {
  if (!isBasketEmpty()) {
    updateBasketProducts();
    renderBasketCalculation();
  }
}

function renderBasketCalculation() {
  const basketCalculationContainer = document.getElementById("basket__calculation");
  const basketMoneyCalculation = createHtmlElementWithClass("table","basket-calculation");
  const subTotalRow = getCalculationTableRow("Subtotal", `subtotal-value`);
  const deliveryFeeRow = getCalculationTableRow("Delivery", `delivery-value`);
  const voucherRow = getVoucherTableRow();
  const totalRow = getCalculationTableRow("Total", `total-value`);
  basketMoneyCalculation.append(subTotalRow, deliveryFeeRow, voucherRow, totalRow);
  basketCalculationContainer.append(basketMoneyCalculation);
  updateBasketCalculation();
}

function isBasketCalculationRendered() {
  const basketCalculationContainer = document.getElementById("basket__calculation");
  return basketCalculationContainer.children.length > 0;
}

// basket update functions
function updateBasketSubtotal() {
  const subtotalValue = document.getElementById("subtotal-value");
  if (subtotalValue) {
    subtotalValue.textContent = `${calculateBasketSubtotalValue().toFixed(2)}€`;
  }
  updateAfterSubtotal();
}

function updateBasketDeliveryFee() {
  const deliveryValue = document.getElementById("delivery-value");
  if (deliveryValue) {
    deliveryValue.textContent = `${calculateDeliveryFee().toFixed(2)}€`;
  }
}

function updateVoucherValue() {
  const voucherValue = document.getElementById("voucher-value");
  if (voucherValue) {
    let voucherCode = getActiveVoucher();
    if (voucherCode != "") {
      voucherValue.textContent = `-${calculateVoucherValue(voucherCode).toFixed(
        2,
      )}€`;
    }
  }
  updateBasketTotal();
}

function updateBasketTotal() {
  const totalValue = document.getElementById("total-value");
  const btnTotalValue = document.getElementById("btn-total");
  if (totalValue) {
    totalValue.textContent = `${calculateBasketTotal().toFixed(2)}€`;
  }
  if (btnTotalValue) {
    btnTotalValue.textContent = `${calculateBasketTotal().toFixed(2)}€`;
  }
}

function updateBasketCalculation() {
  if (!isBasketCalculationRendered()) {
    renderBasketCalculation();
  }

  updateBasketSubtotal();
  updateBasketDeliveryFee();
  updateVoucherValue();
  updateBasketTotal();
}

function updateAfterSubtotal() {
  updateBasketDeliveryFee();
  updateVoucherValue();
  updateBasketTotal();
}

function updateBasketContent() {
  updateBasketTemplate();
  updateBasketCalculation();
  updateBasketProducts();
  updateBasketIconBatch();
}

function updateBasketTemplate() {
  if (isBasketEmpty()) {
    removeDNone("basket__placeholder");
    addDNone("basket__products");
    addDNone("basket__calculation");
    addDNone("order-btn");
    addDNone("menubar-basket-batch");
  } else {
    addDNone("basket__placeholder");
    removeDNone("basket__products");
    removeDNone("basket__calculation");
    removeDNone("order-btn");
    removeDNone("menubar-basket-batch");
  }
}

function updateBasketProducts() {
  updateBasketTemplate();
  const basketContainer = document.getElementById("basket__products");
  if (basketContainer) {
    basketContainer.innerHTML = "";
    for (let bIndex = 0; bIndex < basket.length; bIndex++) {
      const element = basket[bIndex];
      const basketElement = getBasketElementHtmlTemplate(element);
      basketContainer.appendChild(basketElement);
    }
  }
  updateBasketIconBatch();
}

function updateBasketIconBatch() {
  const basketBatch = document.getElementById("menubar-basket-batch");
  basketBatch.textContent = calculateTotalBasketItems();
}

function updateBasketEntry(basketEntry) {
  const basketEntryContainer = basketEntry;
  const basketEntryId = basketEntryContainer.dataset.id;
  const basketEntryHeader = basketEntryContainer.querySelector(".basket-entry__header");
  const basketEntryFooter = basketEntryContainer.querySelector(".basket-entry__footer");
}

// voucher functionality

function isVoucherValid(voucherCode) {
  const voucher = getVoucher(voucherCode);
  if (voucher) {
    return true;
  } else {
    return false;
  }
}

function getActiveVoucher() {
  let returnValue = "";
  returnValue = settings.activeVoucher;
  return returnValue;
}

function setActiveVoucher(voucherCode) {
  settings.activeVoucher = voucherCode;
}

function setVoucherAsUsed(voucherCode) {
  const usedVouchers = loadVouchersFromLocalStorage();
  if (!usedVouchers.includes(voucherCode)) {
    usedVouchers.push(voucherCode);
  }
  safeUsedVouchersToLocalStorage(usedVouchers);
}

function calculateVoucherValue(voucherCode) {
  const voucher = getVoucher(voucherCode);
  let returnvalue = 0;
  if (voucher) {
    if (voucher["discountUnit"] == "%") {
      returnvalue =
        (calculateBasketSubtotalValue() * voucher["discountValue"]) / 100;
    } else if (voucher["discountUnit"] == "€") {
      returnvalue = voucher["discountValue"];
    }
  }
  return returnvalue;
}

function safeUsedVouchersToLocalStorage(vouchers) {
  safeDataToLocalStorage(vouchers, "bestellappvouchers");
}

function loadVouchersFromLocalStorage() {
  let vouchers = loadDataFromLocalStorage("bestellappvouchers");
  return vouchers;
}

// end of voucher functionality

// end of Basket related functions

// order dialog functions

function closeOrderDialog() {
  const dialog = document.getElementById("order-placed-dialog");
  dialog.close();
}

// end of order dialog functions

// render functions
// render all products
function renderProducts() {
  const productsContainer = document.getElementById("products");

  for (let i = 0; i < categories.length; i++) {
    const categorieContainer = getCategorieHtmlElement(categories[i]);
    productsContainer.appendChild(categorieContainer);
  }
}

// ui template funtions
// product-categorie-template
function getCategorieHtmlElement(categorie) {
  const categorieContainer = createHtmlElementWithClass("section", "categorie");
  const categorieContent = createHtmlElementWithClass("div","categorie__content container subcontainer" );
  const categorieHeader = createHtmlElementWithClass( "div", "categorie__header" );
  const categorieHeaderBg = createHtmlElementWithClass("div", "categorie__headerBg" );
  const categorieName = document.createElement("span");
  categorieName.textContent = categorie.name;
  categorieContent.appendChild(getCategorieImage(categorie));
  categorieContent.appendChild(categorieName);
  categorieHeader.appendChild(categorieHeaderBg);
  categorieHeader.appendChild(categorieContent);
  categorieContainer.appendChild(categorieHeader);
  categorieContainer.appendChild(getCategorieProductsContainer(categorie));
  return categorieContainer;
}

function getCategorieImage(categorie){
  const categorieImage = createHtmlElementWithClass("img", "categorie__image");
  categorieImage.src = categorie.img;
  categorieImage.alt = `${categorie.name}`;
  return categorieImage;
}

function getCategorieProductsContainer(categorie){
    const categorieProductsContainer = createHtmlElementWithClass("section", "categorie__products container" );
  const categorieProducts = stock.filter(
    (product) => product.categorieId === categorie.id,
  );
  for (let i = 0; i < categorieProducts.length; i++) {
    const cardContainer = getProductHtmlTemplate(categorieProducts[i]);
    categorieProductsContainer.appendChild(cardContainer);
  }
  return categorieProductsContainer
}

// product-card-template
function getProductHtmlTemplate(product) {
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

function getCardImage(product) {
  const cardImage = createHtmlElementWithClass("img", "product-card__image");
  cardImage.src = product.img;
  cardImage.alt = product.name;
  return cardImage;
}

function getProductCardFooterHtmlTemplate(product, basketAmmount) {
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

//basket-template
function getCalculationTableRow(title, dataId) {
  const tableRow = createHtmlElementWithClass("tr", "basket-calculation__row");
  const tabeleHead = createHtmlElementWithClass("th");
  tabeleHead.textContent = title;
  const tableData = createHtmlElementWithClass("td");
  tableData.id = dataId;
  tableRow.append(tabeleHead, tableData);
  return tableRow;
}

function getVoucherTableRow() {
  const tableRow = createHtmlElementWithClass("tr", "basket-calculation__row");
  const tabeleHead = createHtmlElementWithClass("th");
  const voucherInput = createHtmlElementWithClass("input", "basket__input");
  voucherInput.type = "test";
  voucherInput.id = "voucher-code";
  voucherInput.placeholder = "voucher code";
  tabeleHead.append(voucherInput);
  const tableData = createHtmlElementWithClass("td");
  tableData.id = "voucher-value";
  tableRow.append(tabeleHead, tableData);
  return tableRow;
}

function getBasketElementHtmlTemplate(basketEntry) {
  const product = getProduct(basketEntry.productId);
  const basketEntryProduct = getBasketEntryById(basketEntry.productId);
  const basketEntryContainer = createHtmlElementWithClass("article","basket-entry");
  basketEntryContainer.dataset.id = product.id;
  const basketHeaderContainer = getBasketElementHeaderHtmlTemplate(product, basketEntryProduct.ammount);
  const basketFooterContainer = getBasketElementFooterHtmlTemplate(basketEntryProduct, basketEntryProduct.ammount);
  basketEntryContainer.append(basketHeaderContainer, basketFooterContainer);
  return basketEntryContainer;
}

function getBasketElementHeaderHtmlTemplate(product, basketAmmount = 1) {
  const BasketHeaderContainer = createHtmlElementWithClass("div","basket-entry__header");
  const basketEntryTitle = createHtmlElementWithClass("h3","basket-entry__title noselect");
  basketEntryTitle.textContent = product.name;
  BasketHeaderContainer.append(basketEntryTitle);
  if (basketAmmount > 1) {
    BasketHeaderContainer.append(getDeleteEntryButton());
  }
  return BasketHeaderContainer;
}

function getBasketElementFooterHtmlTemplate(product, basketAmmount = 1) {
  const basketFooterContainer = createHtmlElementWithClass("div", "basket-entry__footer");
  const basketFooterAmmountControl = createHtmlElementWithClass("div", "basket-entry__footer-ammount-control");
  if (basketAmmount == 1) {    
    basketFooterAmmountControl.append(getDeleteEntryButton());
  } else {   
    basketFooterAmmountControl.append(getChangeEntryAmmountButton(Changetype.DECREASE));
  }
  const entryAmmount = createHtmlElementWithClass("span", "noselect");
  entryAmmount.textContent = product.ammount;
  basketFooterAmmountControl.append(entryAmmount, getChangeEntryAmmountButton(Changetype.INCREASE));
  const basketFooterPrice = createHtmlElementWithClass("span", "basket-entry__footer-price noselect");
  basketFooterPrice.textContent = `${product.pricePerUnit.toFixed(2)}€`;
  basketFooterContainer.append(basketFooterAmmountControl, basketFooterPrice);
  return basketFooterContainer;
}

function getDeleteEntryButton(){
  const deleteEntryButton = getDeleteIconSvg();
    deleteEntryButton.classList.add("clickable", "noselect", "basket-entry__delete-btn");
    deleteEntryButton.dataset.action = "delete-entry";
    return deleteEntryButton;
}

const Changetype = {
  INCREASE: "increase",
  DECREASE: "decrease"
}

function getChangeEntryAmmountButton(changetype){
   const changeEntryAmmountButton = createHtmlElementWithClass("span", "clickable noselect");
   if(changetype == Changetype.DECREASE){
    changeEntryAmmountButton.textContent = "-";
    changeEntryAmmountButton.dataset.action = "decrease-entry";
   }
   else{
    changeEntryAmmountButton.textContent = "+";
    changeEntryAmmountButton.dataset.action = "increase-entry";
   }
    return changeEntryAmmountButton;
}


function getDeleteIconSvg() {
  return createSvg(
    "-2 -4 20 26",
    '<path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z"/>',
  );
}



// end of UI template funtions

// render utilities

function createHtmlElementWithClass(elementType, classNames = "") {
  const element = document.createElement(elementType);
  if (classNames != "") {
    const classes = classNames.split(" ");
    classes.forEach((elementClass) => {
      element.classList.add(elementClass);
    });
  }
  return element;
}

function createSvg(viewBox, innerHtml){
 let xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "viewBox", viewBox);
    svgElem.style.display = "block";
    svgElem.innerHTML = innerHtml;

    return svgElem;
}

// end of render utiliies

// visibility functions

function toggleDNone(elementId){
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle("d-none");
    }
}

function addDNone(elementId){
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add("d-none");
    }
}

function removeDNone(elementId){
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove("d-none");
    }
}

// end of visibility functions

// end of renderfunctions

// database functions

function getProduct(productId) {
  let product = undefined;
  product = stock.find((stockProduct) => stockProduct.id == productId);
  return product;
}

function getVoucher(voucherCode) {
  return validVouchers.find((voucher) => voucher.code === voucherCode);
}

function isProductInStock(productId) {
  return stock.some((stockProduct) => stockProduct.id == productId);
}

// end of database functions

// local storrage functions

function safeCardToLocalStorrage(card) {
  safeDataToLocalStorage(card, "bestellappcard");
}

function loadCardFromLocalStorage() {
  let card = loadDataFromLocalStorage("bestellappcard");
  return card;
}



// genuine functions

function safeDataToLocalStorage(dataArray, storageKey) {
  try {
    const jsonData = JSON.stringify(dataArray);
    localStorage.setItem(storageKey, jsonData);
  } catch (error) {
  } finally {
  }
}

function loadDataFromLocalStorage(storageKey) {
  try {
    const jsonData = localStorage.getItem(storageKey);
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

// end of local storrage functions