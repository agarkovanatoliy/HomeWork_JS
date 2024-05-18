// Задание 1
// Создайте функцию которая возводит переданное число в куб,
// необходимо вывести в консоль результат 2^3 степени + 3 ^ 3 степени

const conversion = number => number ** 3;

console.log(conversion(2));
console.log(conversion(3));


// Задание 2
// Пользователь вводит с клавиатуры число, если ввёл текст,
// необходимо вывести что значение задано неверно
// Создать фукнцию, которая высчитывает 13% от данного числа и
// выводит в консоль текст "Размер заработной платы за вычетом налогов равен значение"

function salary(number){
    if (isNaN(number)){
        return `Неверное значение`;
    } else {
        return `Размер заработной платы за вычетом налогов равен ${number * 0.87}`;
    }
}

// const userSalary = +prompt('Введите вашу зарплату');

// console.log(salary(userSalary));


// Задание 3
// Пользователь с клавиатуры вводит 3 числа, необходимо создать функцию,
// которая определяет максимальное значение среди этих чисел


function maximum(){
    const valueQuantity = +prompt('введите количество значений', 3);

    const array = [];

    for (let i = 0; i < valueQuantity; i++) {
        array[i] = +prompt('введите число');
    }

    let max = array[0];
    for (let i = 1; i < valueQuantity; i++) {
        if (max < array[i]) {
            max = array[i];
        }
    }
    return max;
}

console.log(maximum());

// Задание 4
// Необходимо реализовать четыре функции, каждая функция должна принимать
//  по два числа и выполнять одну из операций (каждая функция выполняет одну из них):
//     1. Сложение
//     2. Разность
//     3. Умножение
//     4. Деление
// Необходимо сделать так, чтобы функция вернула число,
// например выражение console.log(sum(2, 6));
// должно вывести число 8 в консоль (sum - функция
// сложения в данном примере, ваши названия функций могут
// отличаться). Округлять значения, которые возвращают функции не нужно,
// однако, обратите внимание на разность, функция должна вычесть из
// большего числа меньшее, либо вернуть 0, если числа равны.
// Функциям всегда передаются корректные числа, проверки на NaN, Infinity делать не нужно.

const sum = (a, b)  => a+b;

function difference(a, b){
    if (a > b){
        return a - b;
    }else if (a < b){
        return b - a;
    } else {
        return 0;
    }
}

const multiplication = (a, b) => a * b;

const division = (a, b) => a / b;

function calculator(){
    const num1 = +prompt('Введите первое число');
    const num2 = +prompt('Введите второе число');
    const operation = prompt('Выбирите действие: +, -, *, /');
    switch (operation) {
        case '+':
            console.log(sum(num1, num2));
            break;
        case '-':
            console.log(difference(num1, num2));
            break;
        case '*':
            console.log(multiplication(num1, num2));
            break;
        case '/':
            console.log(division(num1, num2));
            break;
        default:
            console.log('Некоректное значение');
            break;
    }
}

calculator();