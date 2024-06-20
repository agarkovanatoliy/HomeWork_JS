// Урок 11. Семинар. Шаблонизация
// Дан макет сайта https://www.figma.com/file/mnLY69cYE5cqWM5w6n5hXx/Seo-%26-Digital-Marketing-Landing-Page?node-id=190%3A1194&t=q4NMnXTnwyyTSGA6-0

// В блоке Featured Items небходимо реализовать шаблон товаров.

// Для этого необходимо создать json формат данных по всем товарам.

// Из этого файла сформировать блок Featured Items.

// Всю вёрстку остальных частей реализовывать не нужно, если у вас она была сделана на html/css можно использовать, заново создавать не требуется.

const url1 = "./data.json";

async function fetchData(url) {
    try {
        const responce = await fetch(url);
        const data = await responce.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(url1);

    const containerEl = document.querySelector('.product__section-card');


    data.forEach(el => {

        containerEl.insertAdjacentHTML("beforeend", `
            <div class="product__card" id="${el.id}">
                <a href="./singlePage.html" class="product__card-link">
                    <img src="${el.img}" alt="${el.title}" class="product__card-img">
                    <div class="product__card-text">
                        <h3 class="product__card-text-dsc">${el.title}</h3>
                        <p class="product__card-text-price">$ ${el.price}</p>
                    </div>
                </a>
                <div class="product__card-add-box">
                    <a href="#" class="product__card-link-add">
                        <img class="product__card-link-add-pic" src="./img/bascet.svg" alt="добавить">
                        <p class="product__card-link-add-title">Add to Cart</p>
                    </a>
                </div>
            </div>
            `)

    });
});


// Урок 13. Семинар. Работа с медиа
// Аттестационное задание
// На предыдущем уроке вы сформировали данные из раздела "Товары".
// При клике на кнопку add to cart товар попадает в корзину
// При клике на крестик, товар удаляется из из раздела корзины, если удалить все товары, раздел полностью пропадает.


const cardToBascet = document.querySelector('.basket__content');
        shopCardEl = document.querySelector('.shoppingCart__content');




// const a = jQuery('.shoppingCart__content').load('shoppingCart.html.shoppingCart__content');
// console.log(a);

const productAddKeys = 'product';

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(url1);

    const linkAddEl = document.querySelectorAll('.product__card-link-add');


    linkAddEl.forEach(el => {
        el.addEventListener('click', () => {
            const cardId = el.parentElement.parentElement.getAttribute('id');

            data.forEach(el => {
                if(el.id == cardId){
                    addProduct(el);
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchData(url1);

    const basket = document.querySelector('.basket__details');

    basket.addEventListener('click',  () => {

        const delEl = document.querySelectorAll('.basket__del');

        delEl.forEach(el => {
            const cardId = el.parentElement.getAttribute('id');
            el.addEventListener('click', () => {
                data.forEach(el => {
                    if(el.id == cardId){
                        delProduct(el);
                    }
                });
            });
        });
        if(delEl.length === 0){
            cardToBascet.innerHTML = '';
            displayProduct(0);
        }
    });


});


function getProduct () {
    return JSON.parse(localStorage.getItem(productAddKeys)) || [];
}

function addProduct(product) {
    cardToBascet.innerHTML = '';
    let total = 0;
    const selectedProduct = getProduct();
    const index = selectedProduct.findIndex((el) => el.id === product.id);

    if (index === -1) {
        selectedProduct.push(product);
        product.quantity = 1;
    } else {
        selectedProduct.forEach(el => {
            if(el.id === product.id) {
                el.quantity += 1
            }
        });
    };

    localStorage.setItem(productAddKeys, JSON.stringify(selectedProduct));

    selectedProduct.forEach(el => {
        return total += el.quantity * el.price;
    });
    displayProduct(total);
};

function delProduct(product) {
    let total = +(cardToBascet.querySelector('.basket__content-total-sum').textContent);

    cardToBascet.innerHTML = '';

    const selectedProduct = getProduct();
    const index = selectedProduct.findIndex((el) => el.id === product.id);

    if (index !== -1) {
        total -= product.quantity * product.price;
        selectedProduct.splice(index, 1);
    }

    localStorage.setItem(productAddKeys, JSON.stringify(selectedProduct));

    displayProduct(total);
};

function displayProduct(sum) {

    const product = getProduct();
    product.forEach(el => {
        cardToBascet.insertAdjacentHTML('beforeend', `
            <div class="basket__content-item" id="${el.id}">
                <a href="./singlePage.html"><img src="${el.img}" alt="${el.title}" class="basket__produkt" style="max-width: 80px;"></a>
                <div class="basket__product-info">
                    <h2 class="basket__produkt-title">${el.title}</h2>
                    <img src="./img/star.png" alt="star" class="basket__produkt-star">
                    <h2 class="basket__produkt-price">${el.quantity} x ${el.price}$</h2>
                </div>
                <a href="#" class="basket__del">
                    <img src="./img/__1827.png" alt="отказ" class="basket__rejection">
                <a/>
            </div>
        `);
        // shopCardEl.insertAdjacentHTML("beforeend", `
        //     <div class="shoppingCart__content-item" id="${el.id}">
        //         <div class="shoppingCart__content-item-info">
        //             <a class="shoppingCart__content-item-info-img" href="singlePage.html"><img class="shoppingCart__content-item-img"
        //                     src="${el.img}" alt="${el.title}"></a>
        //             <div class="shoppingCart__content-item-description">
        //                 <h3 class="shoppingCart__content-item-name">${el.title}</h3>
        //                 <span class="shoppingCart__content-item-colorSize">Color:
        //                     <span class="shoppingCart__content-item-colorSize-data">Red</span><br>
        //                     Size: <span class="shoppingCart__content-item-colorSize-data">Xll</span>
        //                 </span>
        //             </div>
        //         </div>
        //         <span class="shoppingCart__content-item-price">$${el.price}</span>
        //         <input class="shoppingCart__content-item-inputField" type="text" name="" id="" value="2">
        //         <span class="shoppingCart__content-item-shipping">FREE</span>
        //         <span class="shoppingCart__content-item-subtotal">$300</span>
        //         <a class="shoppingCart__content-item-action" href="#"><img src="./img/remove_icon.png"
        //             alt="del"></a>
        //     </div>
        // `);
    });
    cardToBascet.insertAdjacentHTML('beforeend', `
                    <h2 class="basket__content-total">
                        TOTAL:
                        <span class="basket__content-total-sum">
                            ${sum}
                        </span>
                    </h2>
                    <a href="./checkout.html" class="basket__content-link"><button class="basket__content-button">Checkout</button></a>
                    <a href="./shoppingCart.html" class="basket__content-link"><button class="basket__content-button">Go to cart</button></a>
    `);
}















const rangeInput = document.querySelectorAll(".contentProduct__catalog-product-sort-range-input input");
const priceInput = document.querySelectorAll(".contentProduct__catalog-product-sort-price-input input");
const range = document.querySelector(".contentProduct__catalog-product-sort-slider .contentProduct__catalog-product-sort-progress");
let priceGap = 50;

priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

            if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "contentProduct__catalog-product-sort-price-input-min") {
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
                } else {
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
                }
            }
        });
});

rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "contentProduct__catalog-product-sort-range-min") {
            rangeInput[0].value = maxVal - priceGap;
            } else {
            rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});





