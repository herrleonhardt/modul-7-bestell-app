export function safeCardToLocalStorrage(card) {
  safeDataToLocalStorage(card, "bestellappcard");
}

export function loadCardFromLocalStorage() {
  let card = loadDataFromLocalStorage("bestellappcard");
  return card;
}

export function safeUsedVouchersToLocalStorage(vouchers) {
  safeDataToLocalStorage(vouchers, "bestellappvouchers");
}

export function loadVouchersFromLocalStorage() {
  let vouchers = loadDataFromLocalStorage("bestellappvouchers");
  return vouchers;
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
