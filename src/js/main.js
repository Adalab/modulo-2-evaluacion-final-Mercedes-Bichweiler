"use strict";

const searchInput = document.querySelector(".js_inputSearch");
const searchSubmit = document.querySelector(".js_submitSearch");
const listProducts = document.querySelector(".js_listProducts");
const listCart = document.querySelector(".js_cartList");
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
      <button class="js_buyBtn" id="${product.id}">Comprar</button>
    </div> `;

    listProducts.innerHTML = html;
  }
  // despues de pintar los productos, activo botones
  addBuyButtonEvents();
}

//funcion para escuchar botones
function addBuyButtonEvents() {
  const buyBtn = document.querySelectorAll(".js_buyBtn");

  buyBtn.forEach((button) => {
    button.addEventListener("click", handleAddCart);
  });
}

//funcion para agregar productos al carro

function handleAddCart(ev) {
  const productId = parseInt(ev.currentTarget.id);
  const selectedProduct = productsData.find((item) => item.id === productId);

  // verificar si el producto esta en el carro
  const alreadyInCart = cart.some((item) => item.id === productId);

  if (!alreadyInCart) {
    cart.push(selectedProduct);
    console.log("producto añadido", selectedProduct);
  } else {
    console.log("ya esta en el carro");
  }

  renderCart();
}

// funcion para mostrar el carro
function renderCart() {
  listCart.innerHTML = "";

  for (let item of cart) {
    const imageUrl = item.image || "https://placehold.co/50x50";
    listCart.innerHTML += `
      <li class="cart-item">
        <img src="${imageUrl}" alt="${item.title}" width="50" />
        <span>${item.title} - ${item.price}€</span>
      </li>
    `;
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
