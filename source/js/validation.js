// // Работа с формой входа.
// (function() {
//     // получение формы и её элементов
//     // Данное получение можно выполнить тремя разными способами:
//     // document.querySelector(), по имени при помощи document.forms.ИМЯ и при помощи document.forms[Номер формы на странице начиная с 0].
//     const form = document.forms.signIn; // Поиск формы по имени.

//     // Проверка на наличие формы в нашей вёрстке.
//     // Если форма не будет найдена, то при помощи ключевого слово return - мы завершаем выполнение функции, выходя из неё.
//     if(!form) return;

//     // Вешаем слушатель на событие submit - данное событие будет отрабатывать тогда, когда пользователь отправляет форму.
//     form.addEventListener('submit', (e) => {
//         e.preventDefault(); // Ломаем стандартное поведение события. ( Перезагрузку страницы, отправку данных на сервер );
        
//         // const userEmail = form.querySelector('input[name=email]'); - Это один из методов получение элемента формы. Здесь просто для демонстрации
//         const userEmail = form.elements.email; // Получаем элемент формы по его имени через обращение к форме и её свойству elements.
//         const userPassword = form.elements.password; // Получаем элемент формы по его имени через обращение к форме и её свойству elements.
//         // В свойстве elements храняться все элементы нашей формы.
        
//         // Так как при работе с запросами, мы зачастую будем отправлять запросы в JSON ( тема будущих лекций ), то для того чтобы его сделать нужно собрать объект наших данных, которые мы будем отправлять на сервер. Для этого мы создаем объект data. Пока имитируя последующий процесс.
//         const data = {
//             email: userEmail.value, 
//             password: userPassword.value,
//         };
//         // Здесь в дальнейшем будет происходить отправка данных.
//         console.log(data);
//     })
// })();

// Первая форма singIn...............................................................................................................

// Данная функция собирает все данные из формы и возвращает в качестве единого объекта.
function getAll(form) {
    const inputs = form.querySelectorAll('input'); // Получаем псевдомассив инпутов.
    const textareas = form.querySelectorAll('textarea'); // Получаем псевдомассив textarea.
    let result = {}; // объект под результат.
    for (let input of inputs) { // Делаем цикл для того чтобы перебрать псевдомассив с помощью ключевого слово of.
        // Делаем switch case по типу инпута с которым работаем.
        switch (input.type) {
            case 'radio': { // В этот кейс мы попадем только в случае, если инпут у нас type radio.
                if(input.checked) { // Проверка на то нажата ли radio кнопка.
                    result[input.name] = input.value; // мы создаем ключ в result по input.name и кладём туда значение нашего input'а.
                }
                break; // Директива для того, чтобы после этого кейса не начал выполнятся функциональный код следующего кейса.
            }
            case 'checkbox': { // В этот кейс мы попадем только в случае, если инпут у нас type checkbox.
                if(!result[input.name]) result[input.name] = []; // Проверяем если свойства с именем этого чекбокса нет внутри нашего объекта результата, то создаем его и делаем его значение массивом, потому что чекбоксов может быть нажато несколько.
                if(input.checked) result[input.name].push(input.value); // Если чекбокс нажат, то кладём его значение в массив, который находится в значении свойства при помощи метода push.
                break; // Директива для того, чтобы после этого кейса не начал выполнятся функциональный код следующего кейса.
            }
            case 'file': { // В этот кейс мы попадем только в случае, если инпут у нас type file.
                result[input.name] = input.files; // Кладём результат в свойство под именем как у инпута и значением делаем файлы.
                break;
            }
            default: { // В этот кейс мы во всех иных случаях, которые не описаны выше.
                result[input.name] = input.value; // мы создаем ключ в result по input.name и кладём туда значение нашего input'а.
            }
        }
    }
    
    for(let textarea of textareas) { // Здесь мы перебираем возможные textarea.
        result[textarea.name] = textarea.value; // мы создаем ключ в result по textarea.name и кладём туда значение нашего textarea.
    }

    return result; // возвращаем объект результата.
}

function isEmailCorrect(email) { // Данную функцию мы будем использовать для того, чтобы проверять нашу почту на правильность, согласно регулярному выражению.
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

// Данная функция является распределительной и выбирает вызывать функцию для работы с итерабельными элементами или нет.
function setError(input, messageError) {
    if(input[0]) {
        // функция при работе с итерабельными элементами
        setErrorChecked(input, messageError);
    } else {
        // функция при работе с обычными элементами
        setErrorText(input, messageError);
    }
}

// Благодаря этой функции мы делаем ошибку для итерабельных элементов.
function setErrorChecked(inputs, messageError) {
    const error = errorCreator(messageError); // Получаем div ошибки.
    inputs[0].parentElement.parentElement.insertAdjacentElement('afterend', error); // Кладём его в верстку.
    function handler() {
        error.remove(); // Удаляем ошибку.
        for(let input of [...inputs]) { // Перебираем все наши итерабельные инпуты и снимаем с них eventListener'ы и удаляем им классы.
            input.removeEventListener('input', handler);
            input.classList.remove('is-invalid');
        }
    }
    for(let input of [...inputs]) { // Перебираем наши инпуты и вешаем им классы того, что они неверны и вешаем им слушатель.
        input.classList.add('is-invalid');

        input.addEventListener('input', handler);
    }
}

// Эта функция нужна для работы не с итерабельными элементами.
function setErrorText(input, messageError) { 
    const error = errorCreator(messageError); // Получаем готовый div с ошибкой.
    input.classList.add('is-invalid'); // Вешаем класс ошибки. 
    input.insertAdjacentElement('afterend', error); // Добавляем элемент в вёрстку.
    input.addEventListener('input', () => { // Вешаем слушатель инпут, который отработает тогда, когда пользователь начнет что-то снова вводить.
        error.remove(); // Удаляем ошибку.
        input.classList.remove('is-invalid'); // Удаляем класс ошибки.
    }, {once: true}); // В качестве объекта параметров делаем выполнение этого события одноразовым.
}

// Функция создания элемента ошибки.
function errorCreator(message) {
    let messageError = document.createElement('div'); // Создаем div.
    messageError.classList.add('invalid-feedback'); // Вешаем ему класс.
    messageError.innerText = message; // Кладём в него текст нашей ошибки.
    return messageError; // Возвращаем подготовленный div как результат выполнения нашей функции.
    // ВАЖНОЕ УТОЧНЕНИЕ!!! На момент завершения этой функции div не находится в вёрстке для того, чтобы он там появился мы его потом добавляем в него при помощи insertAdjacentElement.
}


//Положительный фитбек
function setRight(input, messageRight) {
    if(input[0]) {
     setRightText(input, messageRight);
    } else {
     setRightText(input, messageRight);
    }
   }
   
   function setRightText(input, messageRight) {
    const right = rightCreator(messageRight);
    input.classList.add('is-right');
    input.insertAdjacentElement('afterend', right);
    input.addEventListener('input', () => {
     right.remove();
     input.classList.remove('is-right');
    }, {once: true});
   }
   
   function rightCreator(message) {
    let messageRight = document.createElement('div');
    messageRight.classList.add('right-feedback');
    messageRight.innerText = message;
    return messageRight;
   }
   //


// Работа с формой входа.
(function() {
    const form = document.forms.signIn; // меняем 
    const userData = getAll(form);
    console.log(form); // Получаем форму.
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ломаем стандартное поведение события.
        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.
        const rightOldMessages = document.querySelectorAll('.right-feedback'); // положительный 
        for (let right of rightOldMessages) right.remove();// положительный 

        const userData = getAll(form); // Получаем все данные формы и кладём их в переменную userData.
        let errors = {}; // объект под ошибки.
        let rights = {}; // объект под успешные сообщения

        // проверка на выбранный чекбокс
        // if(!userData.accepnt) errors.accepnt = 'Пожалуйста выберите пункт'; // Создаем в объекте errors свойство accepnt и кладём туда фразу "Пожалуйста выберите пункт".
        // Проверка на правильность заполнения email при помощи функции isEmailCorrect. 
        if(!isEmailCorrect(userData.email)) errors.email = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'; // меняем 
        // Проверка пароля на наличие 6 или более символов.
        if(isEmailCorrect(userData.email)) rights.email = 'All right'; 
        if(userData.password.length < 6) errors.password = 'Password is too short'; // меняем 
        // if(!userData.password.length) errors.password = 'вапвапв';
        if(userData.password.length >= 6) rights.password = 'All right';

        Object.keys(errors)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(errors).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(errors).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setError(form.elements[key], errors[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        Object.keys(rights)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(rights).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(rights).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setRight(form.elements[key], rights[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        // Объект data, который в последующем будет отправляться на сервер.
        const data = {
            email: userData.email, // меняем 
            password: userData.password, // меняем 
        };
        // Якобы отправка данных
        console.log(data);
    })
})();


// 2 ПОПАП REGISTER
(function() {
    const form = document.forms.register; // меняем 
    const userData = getAll(form);
    console.log(form); // Получаем форму.
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ломаем стандартное поведение события.
        console.log('hi');
        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.
        const rightOldMessages = document.querySelectorAll('.right-feedback'); // положительный 
        for (let right of rightOldMessages) right.remove();// положительный 

        const userData = getAll(form); // Получаем все данные формы и кладём их в переменную userData.
        let errors = {}; // объект под ошибки.
        let rights = {}; // объект под успешные сообщения

        // проверка на выбранный чекбокс
        // if(!userData.accepnt) errors.accepnt = 'Пожалуйста выберите пункт'; // Создаем в объекте errors свойство accepnt и кладём туда фразу "Пожалуйста выберите пункт".
        // Проверка на правильность заполнения email при помощи функции isEmailCorrect. 
        if(!isEmailCorrect(userData.usEmail)) errors.usEmail = 'Please enter a valid email address (your entry is not in the format "somebody@example.com")'; // меняем 
        // Проверка пароля на наличие 6 или более символов.
        if(isEmailCorrect(userData.usEmail)) rights.usEmail = 'All right'; 
        if(userData.usName === '') errors.usName = 'Required field'; 
        if(userData.usName !== '') rights.usName = 'All right'; 
        if(userData.usPassword.length < 6) errors.usPassword = 'Password is too short';
        if(userData.usPassword.length >= 6) rights.usPassword = 'All right'; 
        if(userData.usLocation === '') errors.usLocation = 'Required field'; 
        if(userData.usLocation !== '') rights.usLocation = 'All right'; 
        if(userData.usSurname === '') errors.usSurname = 'Required field'; 
        if(userData.usSurname !== '') rights.usSurname = 'All right'; 
        if(userData.usRepeat === '') errors.usRepeat = 'Required field'; 
        if(userData.usRepeat !== '') rights.usRepeat = 'All right'; 
        if(userData.usAge === '') errors.usAge = 'Required field'; 
        if(userData.usAge !== '') rights.usAge = 'All right'; 

        Object.keys(errors)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(errors).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(errors).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setError(form.elements[key], errors[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        Object.keys(rights)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(rights).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(rights).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setRight(form.elements[key], rights[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        // Объект data, который в последующем будет отправляться на сервер.
        const data = {
            email: userData.usEmail, // меняем 
            name: userData.usName, // меняем 
            password: userData.usPassword, // меняем 
            location: userData.usLocation, // меняем 
            surname: userData.usSurname, // меняем 
            repeat: userData.usRepeat, // меняем 
            age: userData.usAge, // меняем 
            // password: userData.password, // меняем 
        };
        // Якобы отправка данных
        console.log(data);
    })
})();


// 3 ПОАП SEND
(function() {
    const form = document.forms.sendForm; // меняем 
    const userData = getAll(form);
    console.log(form); // Получаем форму.
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ломаем стандартное поведение события.
        console.log('hi');
        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.
        const rightOldMessages = document.querySelectorAll('.right-feedback'); // положительный 
        for (let right of rightOldMessages) right.remove();// положительный 

        const userData = getAll(form); // Получаем все данные формы и кладём их в переменную userData.
        let errors = {}; // объект под ошибки.
        let rights = {}; // объект под успешные сообщения

        // проверка на выбранный чекбокс
        // if(!userData.accepnt) errors.accepnt = 'Пожалуйста выберите пункт'; // Создаем в объекте errors свойство accepnt и кладём туда фразу "Пожалуйста выберите пункт".
        if(userData.nameUse === '') errors.nameUse = 'Required field'; 
        if(userData.nameUse !== '') rights.nameUse = 'All right'; 
        // Проверка на правильность заполнения email при помощи функции isEmailCorrect. 
        if(!isEmailCorrect(userData.emailUse)) errors.emailUse = 'Please enter a valid email address'; // меняем 
        // Проверка пароля на наличие 6 или более символов.
        if(isEmailCorrect(userData.emailUse)) rights.emailUse = 'All right'; 
        if(userData.subject.length < 6) errors.subject = 'Password is too short';
        if(userData.subject.length >= 6) rights.subject = 'All right'; 
        if(userData.telephone === '') errors.telephone = 'Required field'; 
        if(userData.telephone !== '') rights.telephone = 'All right'; 

        Object.keys(errors)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(errors).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(errors).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setError(form.elements[key], errors[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        Object.keys(rights)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(rights).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(rights).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setRight(form.elements[key], rights[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        // Объект data, который в последующем будет отправляться на сервер.
        const data = {
            name: userData.nameUse, // меняем 
            email: userData.emailUse, // меняем 
            message: userData.subject, // меняем 
            phone: userData.telephone, // меняем 
            // password: userData.password, // меняем 
        };
        // Якобы отправка данных
        console.log(data);
    })
})();


// 4 POUP Password

(function() {
    const form = document.forms.passwordForm; // меняем 
    const userData = getAll(form);
    console.log(form); // Получаем форму.
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // ломаем стандартное поведение события.
        const errorsOldMessages = document.querySelectorAll('.invalid-feedback'); // Смотрим есть ли у нас элементы ошибок
        for (let error of errorsOldMessages) error.remove(); // Если они есть стираем их для предотвращения эффекта накопления ошибок.
        const rightOldMessages = document.querySelectorAll('.right-feedback'); // положительный 
        for (let right of rightOldMessages) right.remove();// положительный 

        const userData = getAll(form); // Получаем все данные формы и кладём их в переменную userData.
        let errors = {}; // объект под ошибки.
        let rights = {}; // объект под успешные сообщения

        // проверка на выбранный чекбокс
        // if(!userData.accepnt) errors.accepnt = 'Пожалуйста выберите пункт'; // Создаем в объекте errors свойство accepnt и кладём туда фразу "Пожалуйста выберите пункт".
        if(userData.pas === '') errors.pas = 'Required field'; 
        if(userData.pas !== '') rights.pas = 'All right'; 
        // Проверка на правильность заполнения email при помощи функции isEmailCorrect. 
        // if(!isEmailCorrect(userData.emailUse)) errors.emailUse = 'Please enter a valid email address'; // меняем 
        // Проверка пароля на наличие 6 или более символов.
        // if(isEmailCorrect(userData.emailUse)) rights.emailUse = 'All right'; 
        if(userData.new.length < 6) errors.new = 'Password is too short';
        if(userData.new.length >= 6) rights.new = 'All right'; 
        if(userData.rep === '') errors.rep = 'Required field'; 
        if(userData.rep !== '') rights.rep = 'All right';

        Object.keys(errors)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(errors).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(errors).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setError(form.elements[key], errors[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        Object.keys(rights)  // получает все ключи нашего объекта, а свойство length подсчитывает их длину.
        if(Object.keys(rights).length) {
        //     // Дальше мы перебираем все наши свойства.
            Object.keys(rights).forEach((key) => {
        //         // 1-ый аргумент наш инпут, 2-ой текст ошибки
                setRight(form.elements[key], rights[key]); // Вызываем распределительную функцию, которая в последующем вызовет необходимый далее функционал.
            })
            return; // Делаем выход из функции для того, чтобы данные не отправились, потому что у нас есть ошибки.
        }

        // Объект data, который в последующем будет отправляться на сервер.
        const data = {
            password: userData.pas, // меняем 
            newpassword: userData.new, // меняем 
            repeat: userData.rep, // меняем 
        };
        // Якобы отправка данных
        console.log(data);
    })
})();















