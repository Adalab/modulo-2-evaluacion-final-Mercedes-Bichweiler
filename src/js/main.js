"use strict";

const searchInput = document.querySelector(".js_inputSearch");
const searchSubmit = document.querySelector(".js_submitSearch");
const listProducts = document.querySelector(".js_listProducts");
const listCard = document.querySelector(".js_cardList");
const apiUrlOne = "https://fakestoreapi.com/products";
const apiUrlTwo =
  "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json";

let productsData = [];
let cart = [];

//traer productos
fetch(apiUrlOne)
  .then((res) => res.json())
  .then((data) => {
    productsData = data;
    renderProducts(productsData);
  })
  .catch(() => {
    fetch(apiUrlTwo)
      .then((res) => res.json())
      .then((data) => {
        productsData = data;
        renderProducts(productsData);
      });
  });

//funcion para pintar productos
function renderProducts(productsData) {
  let html = "";

  //product es cada obj del array productsData
  for (let product of productsData) {
    const imageUrl = product.image || "https://placehold.co/300x200";
    html += `
    <div>
      <img src="${imageUrl}"/>
      <p>${product.title}</p>
      <p>${product.price}€</p>
      <button id="${product.id}">Comprar</button>
    </div> `;

    listProducts.innerHTML = html;
  }
}

//funcion filtrar
function handleInput(ev) {
  ev.preventDefault();
  const searchText = searchInput.value.toLowerCase();
  const filterData = productsData.filter((product) => {
    // Convertir el título del producto a minúsculas para una búsqueda insensible
    const productTitleLower = product.title.toLowerCase();

    // El .includes() verifica si el título del producto contiene el texto de búsqueda.
    //En return pido que me devuelva productTitleLower(title de toda mi data que da igual tipo de letra) y que solo incluya lo escrito por el usuario(searchText)
    return productTitleLower.includes(searchText);
  });
  //renderProducts unica funcion que pinta los productos en el navegador
  renderProducts(filterData);
}

//evento boton buscar
searchSubmit.addEventListener("click", handleInput);
