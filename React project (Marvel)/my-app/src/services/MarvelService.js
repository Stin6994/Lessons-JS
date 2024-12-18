import { useHttp } from "../hooks/http.hooks";

const useMarvelService = () => {

    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; //начальное название нашего API, чтобы бесконечно не дублировать в запросах
    /* _apiKey = 'apikey=bb41b2432751ccf0a28161b075eaffe3'; //публичный ключ из моего аккаунта на ресурсе */
    const _apiKey = 'apikey=395dd436654e4c4d21785ca076d9874c'; //запасной ключ
    const _baseOffset = 1023; //стартовая позиция для списка персонажей
    // знак лодаш _  - означает, что эти данные менять нельзя, негласное правило общения между программистами
    const baseLimit = 6;


    const getAllCharacters = async (offset = _baseOffset, limit = baseLimit) => { //получаем 9 персонажей, начиная с 356 позиции
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

    const getCharacter = async (id) => { //получаем персонажа по id
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
        // переменная res будет содержать базу данных по определенному персонажу (id).
        //так как это запрос на сервер - дожидаемся ответа прежде чем использовать res (используем async/await)
        // возвращаем из функции переработанный объект только с нужными данными, извлеченными из общей кучи данных
    }

    const getAllComics = async (offset = 0) => {
		const res = await request(
			`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	};

    const _transformCharacter = (char) => {
        const thumbnailPath = char.thumbnail.path + '.' + char.thumbnail.extension;
        return {
            id: char.id, 
            name: char.name, //так как функция getCharacter возвращает одного персонажа, 
            //но все равно в массиве, то мы обращаемся к единственному персонажу из массива с индексом [0]
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail:  thumbnailPath,
            //так как картинка в базе данных тоже объект из 2 свойств - путь и расширение, получаем их черех точку.  
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comics) => {
		return {
			id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
		};
	};

    return {loading, 
        error, 
        getAllCharacters, 
        getCharacter, 
        getCharacterByName, 
        clearError, 
        getAllComics, 
        getComic, 
        process, 
        setProcess}
}

export default useMarvelService;

//'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'