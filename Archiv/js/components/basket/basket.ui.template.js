import { getProduct } from "../../dataconnection/databaseConnection.js";
import {createHtmlElementWithClass,createSvg} from "../../shared/renderUtils.js";
import { getBasketEntryById } from "./basket.js";

export function getCalculationTableRow(title, dataId) {
  const tableRow = createHtmlElementWithClass("tr", "basket-calculation__row");
  const tabeleHead = createHtmlElementWithClass("th");
  tabeleHead.textContent = title;
  const tableData = createHtmlElementWithClass("td");
  tableData.id = dataId;
  tableRow.append(tabeleHead, tableData);
  return tableRow;
}

export function getVoucherTableRow() {
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

export function getBasketElementHtmlTemplate(basketEntry) {
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
