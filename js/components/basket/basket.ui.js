function toggleBasket() {
  const basket = document.querySelector(".basket");
  
  if (basket.classList.contains("basket--active")) {
    basket.classList.remove("basket--active");
    setTimeout(() => {
      basket.classList.add("d-none");
    }, 300); // Warte 300ms, bevor die Klasse "d_none" hinzugefügt wird
  } else {
    basket.classList.remove("d-none");
  setTimeout(() => {
    basket.classList.add("basket--active");
  }, 10); // Warte 10ms, bevor die Klasse "basket--active" hinzugefügt wird
    
  }
}


// basket rendering
function renderBasketContent() {
  // const basketPlaceholderContainer = document.getElementById("basket__placeholder");
  if (!isBasketEmpty()) {
    
updateBasketProducts();
renderBasketCalculation();
  }
}

function renderBasketCalculation() {
  const basketCalculationContainer = document.getElementById(
    "basket__calculation"
  );

  const basketMoneyCalculation = createHtmlElementWithClass(
    "table",
    "basket-calculation"
  );

  const subTotalRow = getCalculationTableRow("Subtotal", `subtotal-value`);
  const deliveryFeeRow = getCalculationTableRow("Delivery", `delivery-value`);

  const voucherRow = getVoucherTableRow();
  const totalRow = getCalculationTableRow("Total", `total-value`);

  basketMoneyCalculation.append(
    subTotalRow,
    deliveryFeeRow,
    voucherRow,
    totalRow
  );
  basketCalculationContainer.append(basketMoneyCalculation);

  updateBasketCalculation();
}

function isBasketCalculationRendered(){
  const basketCalculationContainer = document.getElementById(
    "basket__calculation"
  );
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
    voucherCode = settings.activeVoucher;
    voucherValue.textContent = `-${calculateVoucherValue(voucherCode).toFixed(
      2
    )}€`;
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
  
  if(!isBasketCalculationRendered()){
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

function updateBasketContent(){
  updateBasketTemplate();
  updateBasketCalculation();
  updateBasketProducts();
  updateBasketIconBatch();
}


function updateBasketTemplate(){
  if(isBasketEmpty()){
    removeDNone("basket__placeholder");
    addDNone("basket__products");
    addDNone("basket__calculation");
    addDNone("order-btn");
  }
  else{
    addDNone("basket__placeholder");
    removeDNone("basket__products");
    removeDNone("basket__calculation");
    removeDNone("order-btn");
  }
}

function updateBasketProducts(){

  updateBasketTemplate();

    const basketContainer = document.getElementById("basket__products");

    if (basketContainer) {
      basketContainer.innerHTML = "";
      for (let bIndex = 0; bIndex < basket.length; bIndex++) {
        const element = basket[bIndex];
        const basketElement = getHtmlBasketElement(element);
        basketContainer.appendChild(basketElement);
      }
    }

   updateBasketIconBatch(); 

    
}

function updateBasketIconBatch(){
const basketBatch = document.getElementById("menubar-basket-batch");
    basketBatch.textContent = basket.length;
}


function updateBasketEntryFooter(){
    
}