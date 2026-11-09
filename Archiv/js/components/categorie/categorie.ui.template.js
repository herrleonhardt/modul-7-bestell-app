import { stock } from "../../data/db.js";
import { createHtmlElementWithClass } from "../../shared/renderUtils.js";
import { getProductHtmlTemplate } from "../product/product.ui.template.js";

// categorie rendering
export function getCategorieHtmlElement(categorie) {
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