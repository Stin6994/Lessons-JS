const images = () => {
    const imgPopup = document.createElement('div'),
            workSection = document.querySelector('.works'),
            bigImage = document.createElement('img');

    imgPopup.classList.add('popup');
    workSection.appendChild(imgPopup);

    imgPopup.style.justifyContent = 'center';
    imgPopup.style.alignItems = 'center';
    imgPopup.style.display = 'none';

    imgPopup.appendChild(bigImage);

    workSection.addEventListener('click', (e) => {
        e.preventDefault();
        let target = e.target;

        if (target && target.classList.contains('preview')) {

            imgPopup.style.display = 'flex';

            const path = target.parentNode.getAttribute('href'); //получаем ссылку на большое изображение, а оно у родительского элемента

            bigImage.setAttribute('src', path);
        }

        if (target && target.matches('div.popup')) { //если клик на подложку
            imgPopup.style.display = 'none';
        }
    })

}

export default images;