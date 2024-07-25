// выносим серверные взаимодействия в отдельный файл

const postData = async (url, data) => {   // async - говорит, что код должен будет обрабатываться не по порядку, а асинхронно, так как надо дождаться реакции сервера (при помощи await), прежде чем выполнять дальше
    // async и await всегда идут в паре
    const res = await fetch(url, { // await не дает создать переменную res до тех пор, пока не выполнится запрос на сервер
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
}

const getResources = async (url) => {
    const res = await fetch(url);

    if (!res.ok) { // Если GET запрос не прошел, выдаем ошибку
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

export {postData};
export {getResources};