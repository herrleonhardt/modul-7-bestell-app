function safeCardToLocalStorrage(card){

    safeDataToLocalStorage(card, "bestellappcard");

}

function loadCardFromLocalStorage(){
    let card = loadDataFromLocalStorage("bestellappcard");
    return card;
}


function safeUsedVouchersToLocalStorage(vouchers){
    safeDataToLocalStorage(vouchers, "bestellappvouchers")
}


function loadVouchersFromLocalStorage(){
    let vouchers = loadDataFromLocalStorage("bestellappvouchers");
    return vouchers;
}


// genuine functions

function safeDataToLocalStorage(dataArray, storageKey) {
  try {
    const jsonData = JSON.stringify(dataArray);
    localStorage.setItem(storageKey, jsonData);
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  } finally {
    console.log("Attempted to save data to localStorage with key:", storageKey);
  } 
}

function loadDataFromLocalStorage(storageKey) {
    try {
        const jsonData = localStorage.getItem(storageKey);
        if (jsonData) {
            return JSON.parse(jsonData);
        } else {
            console.warn("No data found in localStorage for key:", storageKey);
            return [];
        }
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
        return [];
    }
}