const fetch = require('node-fetch');

function fetchCatAvatars(userId) {
    return fetch(`https://catappapi.herokuapp.com/users/${userId}`)
    .then(response=>response.json())
}

const result = fetchCatAvatars(123);
result