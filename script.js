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




function toggleBasket() {
  const basket = document.querySelector(".basket");
  
  if (basket.classList.contains("basket--active")) {
    basket.classList.remove("basket--active");
    setTimeout(() => {
      basket.classList.add("d_none");
    }, 300); // Warte 300ms, bevor die Klasse "d_none" hinzugefügt wird
  } else {
    basket.classList.remove("d_none");
  setTimeout(() => {
    basket.classList.add("basket--active");
  }, 10); // Warte 10ms, bevor die Klasse "basket--active" hinzugefügt wird
    
  }
}