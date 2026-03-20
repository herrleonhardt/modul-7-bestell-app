
/**
 * 
 * @param {*} elementType 
 * @param {*} classNames 
 * @returns 
 */
export function createHtmlElementWithClass(elementType, classNames = "") {
  const element = document.createElement(elementType);
  if (classNames != "") {
    const classes = classNames.split(" ");
    classes.forEach((elementClass) => {
      element.classList.add(elementClass);
    });
  }
  return element;
}

/**
 * 
 * @param {*} viewBox 
 * @param {*} innerHtml 
 * @returns 
 */
export function createSvg(viewBox, innerHtml){
 let xmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(xmlns, "svg");
    svgElem.setAttributeNS(null, "viewBox", viewBox);
    svgElem.style.display = "block";
    svgElem.innerHTML = innerHtml;

    return svgElem;
}