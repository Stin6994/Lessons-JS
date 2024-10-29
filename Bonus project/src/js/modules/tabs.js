const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector);
    const tab = document.querySelectorAll(tabSelector);
    const content = document.querySelectorAll(contentSelector);

    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = 'block';
        tab[i].classList.add(activeClass);
    }

    hideTabContent(); // при загрузке скрываем неактивные табы
    showTabContent(); // раскрываем первый таб с инжексом 0 по умолчанию


    //теперь надо отследить на какой tab кликнул пользователь


    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, '')) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) { 
            //tabSelector сюда приходит с точкой. в методе contains точка не нужна, заменяем ее через replace и регулярные выражения на ничто ''
            //вторая часть условия - если пользователь кликнул на элемент внутри таба. тогда проверяем родителя на содержание искомого класса 
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i)
                }
            });
        }
    });


};

export default tabs;