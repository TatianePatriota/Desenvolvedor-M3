function getStartPagePosition() {
  return (page - 1) * pageSize;
}

function getEndPagePosition() {
  return page * pageSize;
}

const serverurl = process.env.SERVER_API;

console.log("Dev m3", serverurl);

function buyProduct(productId) {
  console.log(productId);
}

//Cria card de produtos
const productEl = (product) => `
  <div class= "product__card" id="product ${product.id}">
    <div class="card">
      <img src="${product.image}" alt="${product.name}" title="${
  product.name
}"  class="card--img"/>
    </div>
    <div class="card--information">
      <h4 class="card--title">${product.name}</h4>
      <p class="card--price">R$ ${product.price
        .toFixed(2)
        .replace(".", ",")}</p>
      <span class="card--installment">até ${
        product.parcelamento[0]
      }x de R$ ${product.parcelamento[1].toFixed(2).replace(".", ",")}</span>
      <button class="card--button" onclick="cart.push(products.find(p => p.id == ${
        product.id
      }))">Comprar</button>
    </div>
  </div>
`;

const mainEl = document.querySelector("main");
function renderProducts(productsArray) {
  productsArray.slice(getStartPagePosition(), getEndPagePosition()).map((p) => {
    // console.log(p);
    mainEl.innerHTML += productEl(p);
  });
}

function renderInitialProducts(productsArray) {
  mainEl.innerHTML = "";
  page = 1;
  renderProducts(productsArray);
}

const buttonLoad = document
  .getElementById("js-button-load")
  .addEventListener("click", function () {
    page++;
    renderProducts(products);
    if (getEndPagePosition() >= products.length) {
      document.getElementById("js-button-load").classList.toggle("hidden");
    }
  });

fetch(`${serverurl}/products`)
  .then((response) => response.json())
  .then((response) => response.map((i) => ({ ...i, date: new Date(i.date) })))
  .then((response) => {
    // console.log(response);
    productsBase = response;
    products = response;
    renderInitialProducts(response);
  });

const buttonFilter = document
  .getElementById("js-order-by-button")
  .addEventListener("click", function () {
    document.getElementById("js-order-by-options").classList.toggle("visible");
  });

const viewColors = document.getElementById("js-more-colors");
viewColors.addEventListener("click", function () {
  viewColors.classList.add("hidden");

  document
    .querySelectorAll(".container__checkbox--colors.desktop-hidden")
    .forEach((item) => {
      item.classList.remove("desktop-hidden");
    });
});

//funções de ordenar produtos
function orderByRecentsProducts() {
  products.sort(function (a, b) {
    var a = a.date;
    var b = b.date;
    if (a > b) {
      return -1;
    } else if (a < b) {
      return 1;
    }
  });
  renderInitialProducts(products);
}

const recentProducts = document.getElementById("js-order-recent");
recentProducts.addEventListener("click", function () {
  orderByRecentsProducts();
  document.getElementById("js-order-by-options").classList.toggle("visible");
});

function orderByLowestPrice() {
  products.sort(function (c, d) {
    var c = c.price;
    var d = d.price;
    if (c < d) {
      return -1;
    } else if (c > d) {
      return 1;
    }
  });
  renderInitialProducts(products);
}

const lowestPrice = document.getElementById("js-order-lowest-price");
lowestPrice.addEventListener("click", function () {
  orderByLowestPrice();
  document.getElementById("js-order-by-options").classList.toggle("visible");
});

function orderBybiggestPrice() {
  products.sort(function (c, d) {
    var c = c.price;
    var d = d.price;
    if (c > d) {
      return -1;
    } else if (c < d) {
      return 1;
    }
  });
  renderInitialProducts(products);
}

const biggestPrice = document.getElementById("js-order-biggest-price");
biggestPrice.addEventListener("click", function () {
  orderBybiggestPrice();
  document.getElementById("js-order-by-options").classList.toggle("visible");
});

// adiciona e fecha modal de filtros e ordenador.
const orderMobile = document
  .getElementById("js-order-mobile")
  .addEventListener("click", function () {
    document.getElementById("modal__mobile--order").classList.remove("hidden");
  });

const closeModal = document
  .getElementById("js-modal-close")
  .addEventListener("click", function () {
    document.getElementById("modal__mobile--order").classList.add("hidden");
  });

const filterModal = document
  .getElementById("js-filter-mobile")
  .addEventListener("click", function () {
    document.getElementById("modal-mobile-filter").classList.remove("hidden");
  });

const closeFilter = document
  .getElementById("js-modal-close-filter")
  .addEventListener("click", function () {
    document.getElementById("modal-mobile-filter").classList.add("hidden");
  });

// orderna produtos
const recentsModal = document
  .getElementById("js-order-recent-modal")
  .addEventListener("click", function () {
    orderByRecentsProducts();
    document.getElementById("modal__mobile--order").classList.add("hidden");
  });

const lowestPriceModal = document
  .getElementById("js-order-lowest-price-modal")
  .addEventListener("click", function () {
    orderByLowestPrice();
    document.getElementById("modal__mobile--order").classList.add("hidden");
  });

const biggestPriceModal = document
  .getElementById("js-order-biggest-price-modal")
  .addEventListener("click", function () {
    orderBybiggestPrice();
    document.getElementById("modal__mobile--order").classList.add("hidden");
  });

//mostra opções de filtros

const filterModalColors = document
  .getElementById("js-filter-modal-colors")
  .addEventListener("click", function () {
    document.getElementById("js-show-colors").classList.remove("hidden");
    showButtons();
  });

const filtersModalSize = document
  .getElementById("js-filters-modal-size")
  .addEventListener("click", function () {
    document.getElementById("js-show-sizes").classList.remove("hidden");
    showButtons();
  });

const filtersModalPrice = document
  .getElementById("js-filters-modal-price")
  .addEventListener("click", function () {
    document.getElementById("js-show-prices").classList.remove("hidden");
    showButtons();
  });

function showButtons() {
  document.getElementById("js-show-buttons").classList.remove("hidden");
}
