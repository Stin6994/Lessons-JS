

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

    getCharacter = (id) => { //получаем персонажа по id
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;