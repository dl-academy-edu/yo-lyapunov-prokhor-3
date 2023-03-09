// 1 задание 
let userNumber = prompt('Введите число от 1', 0); 
let counter = 0;
 while (counter < userNumber) {
  counter++;
  if (counter % 4 === 0) {
   continue;
  } else if (counter % 4 !== 0) {
   console.log(counter);
  }
 }

// // 2 задание факториал while

// let fact = prompt('Введите число от')
// let i = fact - 1;

// while(i > 0) {
// 	fact = fact * i;
// 	i--;
// }
// console.log(fact);

// // 3 задание 

// let number = 4;
// let degree = 8;
// let result = 1;

// for (let i = 0; i < degree; i++) {
//     result = result * number;
// }
// console.log(result);

// // 4 задание 
// if (userNumber > 0) {
//   console.log("Ошибок нет");
// } else {
//   console.log("Неверные данные");
// }

// 5 задание

// let rand  =  Math.floor(1 + Math.random() * 10);
// console.log(rand);
// let userNumber = prompt(" ");
// if (userNumber === rand) {
//   console.log("Yeesssssssssssss");
// } else {
//   userGo = prompt(" ");
//   }

