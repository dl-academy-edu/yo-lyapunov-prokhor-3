// 1 задание 
(function () {
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
})();
 
// 2 задание
 (function () {
     let userNumber;
     do {
         userNumber = prompt("Введите число для рассчта факториала");
         console.log("введено число [" + userNumber + "]");
     }   while (userNumber !== String(Number(userNumber)));
     if ( userNumber === 0) {
         return 1;
     };
     let factorial = 1;
     while (userNumber > 0) {
         factorial *= userNumber;
         userNumber-=1;
     };
     console.log("факториал числа =[" + factorial + "]");
 })();
 

 // 3 программа
 (function () {
     let userNumber = prompt("Введите число возведения в степень");
     while ( isNaN ( parseInt ( userNumber,10 ) ) ) {
         alert ("Ошибка! Принимаются только числа!")
         userNumber = prompt("Введите число возведения в степень");
     };
     let userPower = prompt("Введите степень для возведения в неё числа");
     while ( isNaN ( parseInt ( userPower,10 ) ) ) {
         alert ("Ошибка! Принимаются только числа!")
         userPower = prompt("Введите степень для возведения в неё числа");
     };
     let answer = userNumber;
     for (let i = 1; i < userPower; i++ ) {
         answer *= userNumber;
     };
     console.log( answer );
     console.log( userNumber+ " "+ userPower);
     
 })();
