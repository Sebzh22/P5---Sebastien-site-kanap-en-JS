// récupération de la chaine de requete dans l'url

const queryStringUrl = window.location.search;

// récupération de l'id des produits
const urlProductKanape= new URLSearchParams (queryStringUrl);

const idKanape = urlProductKanape.get("id");
console.log(idKanape);

