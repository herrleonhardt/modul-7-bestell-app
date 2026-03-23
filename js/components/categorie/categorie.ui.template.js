import { stock } from "../../data/data.js";
import { createHtmlElementWithClass } from "../../shared/renderUtils.js";
import { getProductHtmlTemplate } from "../product/product.ui.template.js";

// categorie rendering
export function getCategorieHtmlElement(categorie) {

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
  const categorieHeaderBg = createHtmlElementWithClass(
    "div",
    "categorie__headerBg"
  );
  const categorieImage = createHtmlElementWithClass("img", "categorie__image");
  categorieImage.src = categorie.img;
  categorieImage.alt = `${categorie.name}`;
  const categorieName = document.createElement("span");
  categorieName.textContent = categorie.name;
  categorieContent.appendChild(categorieImage);
  categorieContent.appendChild(categorieName);
  categorieHeader.appendChild(categorieHeaderBg);
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
      const cardContainer = getProductHtmlTemplate(categorieProducts[i]);
      categorieProductsContainer.appendChild(cardContainer);
    }


    categorieContainer.appendChild(categorieProductsContainer);


  return categorieContainer;
}