// Проверка на возраст

function isEighteen() {
    const num = prompt('Сколько вам лет?');
    if (+num >= 18) return true;
    isEighteen();
}



// Чистые функции 
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}




// 3 ЗАДАНИЕ

function addCreator(x) {
    return function (y) {
     return x + y;
    };
   }
   
   const add = addCreator(5);
   
   console.log(add(5)); // 10
   
   console.log(addCreator(1)(3)); // 4
   

// 4 Задание
function counterCreater (step = 2) {
    let index = 0;
    return function () {
     return (index = index + step);
    };
   }
   
   let myCounter1 = counterCreater(-1);
   console.log(myCounter1()); // -1
   console.log(myCounter1()); // -2
   
   let myCounter2 = counterCreater(4);
   console.log(myCounter2()); // 4
   console.log(myCounter2()); // 8
   
   let myCounter3 = counterCreater();
   console.log(myCounter3()); // 2
   console.log(myCounter3()); // 4
   
   let myCounter4 = counterCreater(10);
   console.log(myCounter4()); // 10
   console.log(myCounter4()); // 20
   
   let myCounter5 = counterCreater(-10);
   console.log(myCounter5()); // -10
   console.log(myCounter5()); // -20