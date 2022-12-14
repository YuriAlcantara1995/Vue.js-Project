import Nations from '../assets/nations.json';
import Players from '../assets/playersPages1-300.json';

const urlBase = 'https://futdb.app/api/';

const options = {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'X-AUTH-TOKEN': `${import.meta.env.VITE_API_KEY}`
    }
};
const imageOptions = {
    method: 'GET',
    headers: {
        'accept': 'image/png',
        'X-AUTH-TOKEN': `${import.meta.env.VITE_API_KEY}`
    }
};

async function getNations(page = 1) {
    let res = await fetch(urlBase + 'nations?page=' + page.toString(), options);
    if (!res.ok) {
        throw new Error(res.status);
    }
    let response = await res.json();

    return response;
}

async function searchNationsOffline(page = 1, filter = {}) {
    let nations = Nations.items;
    if (filter.name != undefined && filter.name != "") {//filter by name
        nations = nations.filter((x) =>
            x.name.toLowerCase().includes(filter.name.toLowerCase())
        );
    }

    let countTotal = nations.length;
    let perPage = 10;
    let totalPages = Math.ceil(countTotal / perPage);
    page = (page < 1 || page > totalPages ? 1 : page)
    let currentAmount = (page == totalPages ? countTotal % perPage : perPage);

    let response = {};
    response.pagination = {
        "countCurrent": currentAmount,
        "countTotal": countTotal,
        "pageCurrent": page,
        "pageTotal": totalPages,
        "itemsPerPage": perPage
    };
    const begin = (page - 1) * perPage;
    const end = Math.min(begin + perPage, countTotal);

    response.items = nations.slice(begin, end);

    for (let i = 0; i < response.items.length; i++) {
        response.items[i].averageRating = getAverageNationRating(response.items[i].id);
    }

    return response;
}

async function getPlayers(page = 1) {
    let res = await fetch(urlBase + 'players?page=' + page.toString(), options);
    if (!res.ok) {
        throw new Error(res.status);
    }
    let response = await res.json();

    return response;
}

async function searchPlayersOffline(page = 1, filter = {}) {
    let players = Players;

    if (filter.name != undefined && filter.name != "") {//filter by name
        players = players.filter((x) =>
            x.name.toLowerCase().includes(filter.name.toLowerCase())
        );
    }

    if (filter.ratingMin != undefined && filter.ratingMin != -1) {//filter by minimum rating
        players = players.filter((x) =>
            x.rating >= filter.ratingMin
        );
    }

    if (filter.ratingMax != undefined && filter.ratingMax != -1) {//filter by maximum rating
        players = players.filter((x) =>
            x.rating <= filter.ratingMax
        );
    }

    if (filter.position != undefined && filter.position != "") {//filter by position
        players = players.filter((x) =>
            x.position.toLowerCase().includes(filter.position.toLowerCase())
        );
    }

    players.sort((a, b) => {
        if (a.rating < b.rating) {
            return 1;
        }
        if (a.rating > b.rating) {
            return -1;
        }
        return 0;
    });

    let countTotal = players.length;
    let perPage = 10;
    let totalPages = Math.ceil(countTotal / perPage);
    page = (page < 1 || page > totalPages ? 1 : page)
    let currentAmount = (page == totalPages ? countTotal % perPage : perPage);

    let response = {};
    response.pagination = {
        "countCurrent": currentAmount,
        "countTotal": countTotal,
        "pageCurrent": page,
        "pageTotal": totalPages,
        "itemsPerPage": perPage
    };
    const begin = (page - 1) * perPage;
    const end = Math.min(begin + perPage, countTotal);

    response.items = players.slice(begin, end);

    return response;
}

async function getPlayerImage(id) {
    let result = '';
    try {
        let res = await fetch(urlBase + 'players/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
            throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        result = imageObjectURL;

    } catch (e) {
        result = '';
        console.log(e);
    }

    return result;
}

async function getNationFlag(id) {
    let result = '';
    try {
        let res = await fetch(urlBase + 'nations/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
            throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        result = imageObjectURL;

    } catch (e) {
        result = '';
        console.log(e);
    }

    return result;
}

async function getNationById(id) {

    //Get nation by id
    let res = await fetch(urlBase + 'nations/' + id.toString(), options);
    if (!res.ok) {
        throw new Error();
    }
    let response = await res.json();
    let nation = response.nation;

    nation.averageRating = getAverageNationRating(id);

    return nation;
}

async function getPlayerById(id) {

    //Get player by id
    let res = await fetch(urlBase + 'players/' + id.toString(), options);
    if (!res.ok) {
        throw new Error();
    }
    let response = await res.json();
    let player = response.player;

    return player;
}

async function getPlayersByNationIdOffline(nationId) {

    let players = Players;

    players = players.filter((x) =>
        x.nation == nationId
    );

    function compare(a, b) {
    }

    players.sort((a, b) => {
        if (a.rating < b.rating) {
            return 1;
        }
        if (a.rating > b.rating) {
            return -1;
        }
        return 0;
    });

    let response = {};
    response.items = players.slice(0, Math.min(11, players.length));

    return response;
}

function getAverageNationRating(nationId) {
    let players = Players;
    let nationPlayers = players.filter((x) =>
        x.nation == nationId);
    const sumRating = nationPlayers.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
    );

    return nationPlayers.length > 0 ? Math.floor(sumRating / nationPlayers.length) : 0;
}

export default {
    getNations,
    searchNationsOffline,
    getNationById,
    getNationFlag,
    getPlayers,
    searchPlayersOffline,
    getPlayerById,
    getPlayerImage,
    getPlayersByNationIdOffline
};