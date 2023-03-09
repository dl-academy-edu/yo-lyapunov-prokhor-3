let userAge = 404; // number-число
let bigMoney = 345678901234567890n; // Число «bigint»
let txt = "Надеюсь я не сойду с ума, когда это выучу"; //Строка «string»
let isSharkSwimming = true; // Булевый (логический) тип «boolean»
let userLocation = null; //Значение «null»
let color; //значение «undefined»
let sym = Symbol('MySymbol'); // cимвол 
let userName = {}; // пустой объект





console.log(Number(userAge), String(userAge), Boolean(userAge)); // 404 '404' true
console.log(Number(bigMoney), String(bigMoney), Boolean(bigMoney)); //345678901234567900 '345678901234567890' true
console.log(Number(txt), String(txt), Boolean(txt)); //NaN 'Надеюсь я не сойду с ума, когда это выучу' true
console.log(Number(isSharkSwimming), String(isSharkSwimming), Boolean(isSharkSwimming)); //1 'true' true
console.log(Number(userLocation, StringuserLocation), BooleanuserLocation); //0 'null' false
console.log(Number(color), String(color), Boolean(color)); //NaN 'undefined' false
console.log(Number(sym), String(sym), Boolean(sym));
console.log(Number(userName), String(userName), Boolean(userName));