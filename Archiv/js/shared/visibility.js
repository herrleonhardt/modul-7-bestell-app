
export function toggleDNone(elementId){
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle("d-none");
    }
}

export function addDNone(elementId){
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add("d-none");
    }
}

export function removeDNone(elementId){
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove("d-none");
    }
}