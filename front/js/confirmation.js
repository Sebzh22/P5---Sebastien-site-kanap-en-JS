//------------------- Récupération du numéro de commande et insertion dans le message de confirmation-----------------
/**Récupération de la chaine de requete de l'URL actuelle  (tout ce qu'il y a après le nom de page) */
const queryStringUrl = window.location.search;

/** Récupération du orderId dans la requete URL */
const urlOrderId = new URLSearchParams(queryStringUrl);

/** Récupération de la valeur de id du produit sélectionner dans l'URL (la valeur qu'il y a après id=) */
const orderNumero = urlOrderId.get("orderId");

console.log(orderNumero);

/** Positionnement des éléments dans le DOM */
let confirmationCommande = document.querySelector(".confirmation");

/** Création d'un paragraphe contenant le numéro de commande */
let confirmationTexte = document.createElement("p");
confirmationTexte.innerHTML = `Commande validée ! <br> Votre numéro de commande est : `;
confirmationCommande.appendChild(confirmationTexte);

/** Création d'un span avec le numéro de commande*/
let numeroCommande = document.createElement("span");
numeroCommande.setAttribute(`data-id`, `orderId`);
numeroCommande.textContent = `${orderNumero}`;
confirmationTexte.append(numeroCommande);
