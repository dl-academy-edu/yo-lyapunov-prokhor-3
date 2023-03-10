const filterForm = document.forms.filterForm; // Ищем форму
// проверяем наличие поискового запроса в нашем URL
if (location.search) {
    // создадим объект для будущих параметров.
    const params = {};
    // создадим массив строк параметров ["phoneId=apple", "phone=xiaomi", "howShow=10"]
    const arrayStringParams = location.search.substring(1).split('&');

    // Перебор массива который мы создавали выше
    for ( let stringParam of arrayStringParams ) {
        const param = stringParam.split('='); // Создаем массив параметра с ключом и значением.
        const nameParam = param[0]; // Получаем имя параметра (ключ)
        const valueParam = param[1]; // Получаем значение параметра (значение)

        if ( nameParam in params ) {
            params[nameParam].push(valueParam);
        } else {
            params[nameParam] = [valueParam];
        }
    }

    const updateInput = (gInputs, typeParam) => {
        for ( let input of gInputs) {
            const param = params[typeParam];
            for (let partParam of param) {
                if (partParam === input.value) {
                    input.checked = true;
                }
            }
        }
    }

    updateInput(filterForm.blog, 'blog');
    updateInput(filterForm.color, 'color');
    updateInput(filterForm.show, 'show');
    updateInput(filterForm.sort, 'sort');
    // updateInput(filterForm.howShow, 'howShow');
}

filterForm.addEventListener('submit', (e) =>  {
    e.preventDefault();

    let arrayCheckedInput = []; // массив выбранных инпутов пользователем для фильтрации

    const addCheckedInput = (nameGroupInput, typeParam) => {
        for (input of nameGroupInput) {
            if (input.checked) {
                arrayCheckedInput.push(`${typeParam}=${input.value}`);
            }
        }
    };

    addCheckedInput(e.target.blog, 'blog');
    addCheckedInput(e.target.color, 'color');
    addCheckedInput(e.target.show, 'show');
    addCheckedInput(e.target.sort, 'sort');

    // addCheckedInput(e.target.howShow, 'howShow');

    let stringCheckedInput = '';

    for ([index, activeInput] of arrayCheckedInput.entries()) {
        stringCheckedInput += activeInput;

        if (index != arrayCheckedInput.length -1) {
            stringCheckedInput += '&';
        }
    }

    const baseUrl = `${location.origin}${location.pathname}`;
    const newUrl = baseUrl + `?${stringCheckedInput}`;
    location = newUrl;
})