function init() {
  renderProducts();
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
    const categorieContent = createHtmlElementWithClass("div", "categorie__content container subcontainer");
    const categorieHeader = createHtmlElementWithClass("div","categorie__header");
    const categorieImage = createHtmlElementWithClass("img", "categorie__image");
    categorieImage.src = categorie.img;
    categorieImage.alt = `${categorie.name}`;  
    const categorieName = document.createElement("span");
    categorieName.textContent = categorie.name;
    categorieContent.appendChild(categorieImage);
    categorieContent.appendChild(categorieName);
    categorieHeader.appendChild(categorieContent);
    categorieContainer.appendChild(categorieHeader);
  const categorieProductsContainer = createHtmlElementWithClass("section", "categorie__products container");
  const categorieProducts = stock.filter(
    (product) => product.categorieId === categorie.ID
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
  const cardDescription = createHtmlElementWithClass("p", "product-card__description");
  cardDescription.textContent = product.description;
  const cardFooter = createHtmlElementWithClass("div", "product-card__footer");
  const cardPrice = createHtmlElementWithClass("span", "product-card__price");
  cardPrice.textContent = `${product.price.toFixed(2)}€`;
  const addToCartButton = createHtmlElementWithClass("button", "btn btn--primary");
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

function createHtmlElementWithClass(elementType, className = "") {
  const element = document.createElement(elementType);
  if(className != ""){
 const classes = className.split(" ");
 classes.forEach(elementClass => {
    element.classList.add(elementClass);
 });
  
}
  return element;
}
// <section class="categorie">
//           <div class="categorie__header">
//             <img src="./assets/img/categories/Burger.png" alt="" class="categorie__image">
//             <span>Burger & Sandwiches</span>
//           </div>
//           <section class="categorie__products container">
//             <article class="product-card">
//               <img
//                 src="./assets/img/dishes/All-meat-burger.jpg"
//                 alt=""
//                 class="product-card__image"
//               />

//                 <div>
//                   <h2 class="product-card__name">All Meat Burger</h2>
//                   <p class="product-card__description">
//                     Juicy beef patty with melted cheese, crispy bacon, and fresh
//                     lettuce.
//                   </p>
//                 </div>
//                 <div class="product-card__footer">
//                   <span class="product-card__price">€8.99</span>
//                   <button class="btn btn--primary">Add to Cart</button>
//                 </div>

//             </article>
//           </section>
//         </section>
