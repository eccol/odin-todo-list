export default function createElementWithText(type, text, className) {
  const element = document.createElement(type);
  if (text) { element.innerText = text };
  if (className) { element.classList.add(className) };
  return element;
}