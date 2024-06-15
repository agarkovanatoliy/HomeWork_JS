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
            <div class="product__card">
                <a href="./singlePage.html" class="product__card-link">
                    <img src="${el.img}" alt="${el.title}" class="product__card-img">
                    <div class="product__card-text">
                        <h3 class="product__card-text-dsc">${el.title}</h3>
                        <p class="product__card-text-price">${el.price}</p>
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





