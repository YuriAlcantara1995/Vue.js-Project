import Nations from '../assets/nations.json';
import Players from '../assets/players.json';

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
    console.log(options);
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

    
    //Get Flags
    for (let i = 0; i < response.items.length; i++) {
      let id = response.items[i].id;
      try {
        let res = await fetch(urlBase + 'nations/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
          throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        response.items[i].flag = imageObjectURL;
  
      } catch (e) {
        response.items[i].flag = '';
        console.log(e);
      }
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

    let players = Players.items;

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

    
    //Get Images
    for (let i = 0; i < response.items.length; i++) {
      let id = response.items[i].id;
      try {
        let res = await fetch(urlBase + 'players/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
          throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        response.items[i].image = imageObjectURL;
  
      } catch (e) {
        response.items[i].image = '';
        console.log(e);
      }
    }
    
    return response;
}



async function getNationById(id) {

    //Get nation by id
    let res = await fetch(urlBase + 'nations/' + id.toString(), options);
    if (!res.ok) {
        throw new Error();
    }
    let response = await res.json();
    let nation = response.nation;

    //Get Flag
    try {
        let res = await fetch(urlBase + 'nations/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
            throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        nation.flag = imageObjectURL;

    } catch (e) {
        nation.flag = '';
        console.log(e);
    }
    console.log(nation);
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

    //Get Image
    try {
        let res = await fetch(urlBase + 'players/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
            throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        player.image = imageObjectURL;

    } catch (e) {
        player.image = '';
        console.log(e);
    }

    return player;
}

async function getPlayersByNationIdOffline(nationId) {

    let players = Players.items;

    players = players.filter((x) =>
        x.nation == nationId
    );

    let response = {};
    response.items = players;

    console.log(response.items);
    //Get Images
    for (let i = 0; i < response.items.length; i++) {
      let id = response.items[i].id;
      try {
        let res = await fetch(urlBase + 'players/' + id.toString() + '/image', imageOptions);
        if (!res.ok) {
          throw new Error();
        }
        const imageBlob = await res.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        response.items[i].image = imageObjectURL;
  
      } catch (e) {
        response.items[i].image = '';
        console.log(e);
      }
    }
    
    return response;
}

export default {
    getNations,
    searchNationsOffline,
    getPlayers,
    searchPlayersOffline,
    getNationById,
    getPlayerById,
    getPlayersByNationIdOffline
};