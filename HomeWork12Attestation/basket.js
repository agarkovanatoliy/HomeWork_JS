const url1 = "./data.json";

const shopCardEl = document.querySelector(".shoppingCart__content"),
  subTotal = document.querySelector(".shoppingCart__info-checkout-price"),
  grandTotal = document.querySelector(
    ".shoppingCart__info-checkout-priceFinal"
  ),
  discount = 0.5;

const productAddKeys = "product";

async function fetchData(url) {
  try {
    const responce = await fetch(url);
    const data = await responce.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

function sum() {
  let sum = 0;
  const product = getProduct();
  product.forEach((el) => {
    sum += el.quantity * el.price;
  });
  return sum;
}

function getProduct() {
  return JSON.parse(localStorage.getItem(productAddKeys)) || [];
}

function displayProduct() {
  shopCardEl.innerHTML = "";

  const product = getProduct();

  shopCardEl.insertAdjacentHTML(
    "beforeend",
    `
    <div class="shoppingCart__content-title">
        <h2 class="shoppingCart__content-title-item shoppingCart__content-title-item-first">Product Details</h2>
        <h2 class="shoppingCart__content-title-item">Unite Price</h2>
        <h2 class="shoppingCart__content-title-item">Quantity</h2>
        <h2 class="shoppingCart__content-title-item">Shipping</h2>
        <h2 class="shoppingCart__content-title-item">Subtotal</h2>
        <h2 class="shoppingCart__content-title-item">Action</h2>
    </div>
  `
  );

  product.forEach((el) => {
    shopCardEl.insertAdjacentHTML(
      "beforeend",
      `
          <div class="shoppingCart__content-item" id="${el.id}">
              <div class="shoppingCart__content-item-info">
                  <a class="shoppingCart__content-item-info-img" href="singlePage.html"><img class="shoppingCart__content-item-img"
                          src="${el.img}" alt="${
        el.title
      }" style="max-width: 150px;"></a>
                  <div class="shoppingCart__content-item-description">
                      <h3 class="shoppingCart__content-item-name">${
                        el.title
                      }</h3>
                      <span class="shoppingCart__content-item-colorSize">Color:
                          <span class="shoppingCart__content-item-colorSize-data">Red</span><br>
                          Size: <span class="shoppingCart__content-item-colorSize-data">Xll</span>
                      </span>
                  </div>
              </div>
              <span class="shoppingCart__content-item-price">$${el.price}</span>
              <input class="shoppingCart__content-item-inputField" type="text" name="" id="" value="${
                el.quantity
              }">
              <span class="shoppingCart__content-item-shipping">FREE</span>
              <span class="shoppingCart__content-item-subtotal">${
                el.quantity * el.price
              }</span>
              <a class="shoppingCart__content-item-action" href="#"><img src="./img/remove_icon.png"
                  alt="del"></a>
          </div>
      `
    );
  });
  subTotal.textContent = `Sub total \xa0\xa0\xa0\xa0\xa0\xa0\xa0 $${sum()}`;
  grandTotal.textContent = `GRAND TOTAL \xa0\xa0\xa0\xa0\xa0\xa0\xa0 $${
    sum() * discount
  }`;
};

function delProduct(product) {
  shopCardEl.innerHTML = '';

  const selectedProduct = getProduct();
  const index = selectedProduct.findIndex((el) => el.id === product.id);

  if (index !== -1) {
    selectedProduct.splice(index, 1);
  }

  localStorage.setItem(productAddKeys, JSON.stringify(selectedProduct));

  displayProduct();
}

displayProduct();

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchData(url1);

// При прогрузке страници отрабатывает следующий код для возможности удаления 
// товара со страници только 1 раз посколько происходят изменения на странице а 
// переменная delEl не обновляется и слушатель события не запускается

  const delEl = document.querySelectorAll(".shoppingCart__content-item-action");


  delEl.forEach((el) => {
    const cardId = el.parentElement.getAttribute("id");
    el.addEventListener("click", () => {
      data.forEach((el) => {
        if (el.id == cardId) {
          delProduct(el);
        }
      });
    });
  });

  // После удаления одного из товаров запускается событие DOMSubtreeModified
  // которое позволяет перезапустить слушатель события клик для удалени 
  // последующих товаров

  document.addEventListener('DOMSubtreeModified', function () {

    const delEl = shopCardEl.querySelectorAll('.shoppingCart__content-item-action');

    delEl.forEach((el) => {
      const cardId = el.parentElement.getAttribute('id');
      el.addEventListener('click', () => {
        data.forEach((el) => {
          if (el.id == cardId) {
            delProduct(el);
          };
        });
      });
    });
  });
});
