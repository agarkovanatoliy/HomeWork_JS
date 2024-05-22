// Задание 1
// Необходимо с помощью цикла for вывести следующие 11 строк в консоль:
// 0 – это ноль
// 1 – нечетное число
// 2 – четное число
// 3 – нечетное число
// …
// 10 – четное число

function evenOddNumber(number){
    for (let i = 0; i <= number; i++) {
        if(i === 0){
            console.log(`${i} - это ноль.`);
        } else if (i % 2 !== 0){
            console.log(`${i} - нечетное число.`);
        } else {
            console.log(`${i} - четное число.`);
        }
    }
}

evenOddNumber(11);

console.log('');
console.log('');
console.log('');

// Задание 2
// Дан массив [1, 2, 3, 4, 5, 6, 7]
// Сделайте из этого массива следующий [1, 2, 3, 6, 7]

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(arr);
arr.splice(3, 2);
console.log(arr);

console.log('');
console.log('');
console.log('');

// Задание 3
// Используя Math.random() вам необходимо генерировать цифры от 0 до 9, и создать массив состоящий из 5 таких элементов
// 1. Рассчитать сумму элементов этого массива
// 2. Найти минимальное число
// 3. Найти есть ли в этом массиве число 3


function randomArr(numLength){
    const newArr = [];
    for (let i = 0; i < numLength; i++) {
        newArr[i] = Math.floor(Math.random()* 10);
    }
    return newArr;
}

function informationAboutArray(array){
    console.log(array);
    const summ = array.reduce((x, y) => x + y);
    console.log(summ);
    const newArray = array.toSorted();
    console.log(newArray[0]);
    console.log((array.every((el) => el !== 3)) ? 'Числа 3 в массиве нет!' : 'Число 3 в массиве есть!');
}

informationAboutArray(randomArr(5));

console.log('');
console.log('');
console.log('');

// *Необязательное задание. *
// Необходимо вывести горку в консоль (используя цикл for), как показано на рисунке, только у вашей горки должно быть 20 рядов, а не 5:

// x
// xx
// xxx
// xxxx
// xxxxx


function hill(number){
    let hil = 'x';
    for (let i = 0; i < number; i++) {
        console.log(hil);
        hil += 'x';
    }
}

hill(20);