


export function initProductEvents(){
      document.addEventListener("click", (e) => {

   e.stopPropagation();
    console.log(e);

    const addToCardButton = e.target.closest("button[data-action='add-to-card']");
if(addToCardButton){
  const card = addToCardButton.closest('Article');
  addProductToBasket(card.dataset.id); 
  updateBasketContent();
}

  });

}