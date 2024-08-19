

class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; //начальное название нашего API, чтобы бесконечно не дублировать в запросах
    _apiKey = 'apikey=bb41b2432751ccf0a28161b075eaffe3'; //публичный ключ из моего аккаунта на ресурсе

    // знак лодаш _  - означает, что эти данные менять нельзя, негласное правило общения между программистами


    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = () => { //получаем 9 персонажей, начиная с 356 позиции
        return this.getResource(`${this._apiBase}characters?limit=9&offset=356&${this._apiKey}`);
    }

    getCharacter = async (id) => { //получаем персонажа по id
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
        // переменная res будет содержать базу данных по определенному персонажу (id).
        //так как это запрос на сервер - дожидаемся ответа прежде чем использовать res (используем async/await)
        // возвращаем из функции переработанный объект только с нужными данными, извлеченными из общей кучи данных
    }

    _transformCharacter = (char) => {
        return {
            name: char.name, //так как функция getCharacter возвращает одного персонажа, 
            //но все равно в массиве, то мы обращаемся к единственному персонажу из массива с индексом [0]
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            //так как картинка в базе данных тоже объект из 2 свойств - путь и расширение, получаем их черех точку.  
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;