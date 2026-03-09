function createHtmlElementWithClass(elementType, className = "") {
  const element = document.createElement(elementType);
  if (className != "") {
    const classes = className.split(" ");
    classes.forEach((elementClass) => {
      element.classList.add(elementClass);
    });
  }
  return element;
}

function renderProducts() {
  const productsContainer = document.getElementById("products");

  for (let i = 0; i < categories.length; i++) {
    const categorieContainer = renderCategorie(categories[i]);
    productsContainer.appendChild(categorieContainer);
  }
}

function renderCategorie(categorie) {
  //  console.log(`${categorie.ID}: ${categorie.name}`);
  const categorieContainer = createHtmlElementWithClass("section", "categorie");
  const categorieContent = createHtmlElementWithClass(
    "div",
    "categorie__content container subcontainer"
  );
  const categorieHeader = createHtmlElementWithClass(
    "div",
    "categorie__header"
  );
  const categorieImage = createHtmlElementWithClass("img", "categorie__image");
  categorieImage.src = categorie.img;
  categorieImage.alt = `${categorie.name}`;
  const categorieName = document.createElement("span");
  categorieName.textContent = categorie.name;
  categorieContent.appendChild(categorieImage);
  categorieContent.appendChild(categorieName);
  categorieHeader.appendChild(categorieContent);
  categorieContainer.appendChild(categorieHeader);
  const categorieProductsContainer = createHtmlElementWithClass(
    "section",
    "categorie__products container"
  );
  const categorieProducts = stock.filter(
    (product) => product.categorieId === categorie.id
  );
  for (let i = 0; i < categorieProducts.length; i++) {
    const cardContainer = renderCard(categorieProducts[i]);
    categorieProductsContainer.appendChild(cardContainer);
  }
  categorieContainer.appendChild(categorieProductsContainer);
  return categorieContainer;
}

function renderCard(product) {
  //   console.log(`${product.ID}: ${product.name}`);
  const cardContainer = createHtmlElementWithClass("article", "product-card");
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

  cardContent.appendChild(cardName);
  cardContent.appendChild(cardDescription);
  cardFooter.appendChild(cardPrice);
  cardFooter.appendChild(addToCartButton);

  cardContainer.appendChild(cardImage);
  cardContainer.appendChild(cardContent);
  cardContainer.appendChild(cardFooter);

  return cardContainer;
}

function renderBasketContent() {
  // const basketPlaceholderContainer = document.getElementById("basket__placeholder");
  if (!isBasketEmpty()) {
    toggleDNone("basket__placeholder");

    const basketContainer = document.getElementById("basket__products");

    if (basket) {
      basket.innerHtml = "";
      for (let bIndex = 0; bIndex < basket.length; bIndex++) {
        const element = basket[bIndex];
        const basketElement = getHtmlBasketElement(element);
        basketContainer.appendChild(basketElement);
      }
    }

renderBasketCalculation();

    const basketBatch = document.getElementById("menubar-basket-batch");
    basketBatch.textContent = basket.length;
  }
}

function renderBasketCalculation(){
  const basketCalculationContainer = document.getElementById("basket__calculation"); 
  
  const basketMoneyCalculation = createHtmlElementWithClass("table","basket-calculation");
  
 const subTotalRow = getCalculationTableRow("Subtotal", `${getCurrentBasketValue()}€`);
 const deliveryFeeRow = getCalculationTableRow("Delivery", `${getDeliveryFee()}€`);

 const voucherRow = getCalculationTableRow("Promocode", `-${calculateVoucherValue(voucherValue="WELCOME20")}€`);
 const totalRow = getCalculationTableRow("Total", `${getBasketTotal()}€` );

  basketMoneyCalculation.append(subTotalRow,deliveryFeeRow,voucherRow, totalRow);
  basketCalculationContainer.append(basketMoneyCalculation);
}

function getCalculationTableRow(title, data){
const tableRow = createHtmlElementWithClass("tr","basket-calculation__row");
  const tabeleHead = createHtmlElementWithClass("th");
  tabeleHead.textContent = title;
  const tableData = createHtmlElementWithClass("td");
  tableData.textContent = data;
    
  tableRow.append(tabeleHead, tableData);
  return tableRow;
}

function getHtmlBasketElement(basketEntry) {
  const product = getProduct(basketEntry.productId);
  const basketEntryContainer = createHtmlElementWithClass(
    "article",
    "basket-entry"
  );
  const basketEntryTitle = createHtmlElementWithClass(
    "h3",
    "basket-entry__title"
  );
  basketEntryTitle.textContent = product.name;

  const basketFooterContainer = createHtmlElementWithClass("div", "basket-entry__footer");
  const deleteEntryButton = createHtmlElementWithClass("svg", "basket-entry__icon");
  deleteEntryButton.innerHtml= `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM13 3H3V16H13V3ZM6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14ZM10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14Z" fill="#363534"/>
</svg>`;
  const decreaseEntryAmmountButton = createHtmlElementWithClass("span");
  decreaseEntryAmmountButton.textContent = "-";

  const entryAmmount = createHtmlElementWithClass("span");
  entryAmmount.textContent = product.ammount;

  const increaseEntryAmmountButton = createHtmlElementWithClass("span");
  increaseEntryAmmountButton.textContent="+";

  basketFooterContainer.append(deleteEntryButton, decreaseEntryAmmountButton, entryAmmount, increaseEntryAmmountButton);
  basketEntryContainer.append(basketEntryTitle, basketFooterContainer);
  
  return basketEntryContainer;
}




