// Déclaration de la variable "produitEnregistreLocalStorage" dans laquelle il y aura les key et les values qui sont dans le local storage
//JSON.parse sert à convertir les données au format JSON qui sont dans le local storage en objet JS
let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreLocalStorage);

getPanier();

function getPanier() {
    // Récuperer les produits dans le localStorage
    for (let canape in produitEnregistreLocalStorage){
        //Création du DOM pour le produit
    }
}

getTotal();

function getTotal(){
    //Ajouter les quantité et addition du total

}

supprimerCanape()

function supprimerCanape(){

}

modifierQuantite()

function modifierQuantite() {

}

//Sélection de l'id dans lequel on injecte le code HTML
let positionArticlePanier = document.querySelector("#cart__items");

let structureProduitPanier = [];

// Affichage d'une alerte si le panier est vide 
if(produitEnregistreLocalStorage === null){
alert("Votre panier est vide");
// //Création d'un élément HTML affichant que le Panier est vide
// const panierVide = `
//     <div>
//         <div> Le Panier est vide </div>
//     </div>
// `;
// positionArticlePanier.innerHTML = panierVide;

} else {
    // Si le panier n'est pas vide, il faut afficher les produits du local storage
    

    for(j = 0; j < produitEnregistreLocalStorage.length; j++){
        
        structureProduitPanier = structureProduitPanier + `
        <article class="cart__item" data-id="${produitEnregistreLocalStorage[j].id_Canape}" data-color="${produitEnregistreLocalStorage[j].option_Couleur}">
                <div class="cart__item__img">
                  <img src="${produitEnregistreLocalStorage[j].img_Canape}" alt="${produitEnregistreLocalStorage[j].alt_Img_Canape}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produitEnregistreLocalStorage[j].nom_Canape}</h2>
                    <p>${produitEnregistreLocalStorage[j].option_Couleur}</p>
                    <p>${produitEnregistreLocalStorage[j].prix_Canape} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${produitEnregistreLocalStorage[j].nombre_Canape}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>
        `;
    }
        if(j == produitEnregistreLocalStorage.length){
        //injection html dans la page panier
        positionArticlePanier.innerHTML = structureProduitPanier;
        }
}
//--------------------Fin de l'affichage des produits ajouter au panier --------

//-------------------- Gestion du bouton supprimer l'article du panier ------------

//Sélection de la class du bouton supprimer
let btnSupprimer = document.querySelectorAll(".deleteItem");

for (let k = 0; k < btnSupprimer.length; k++) {
    btnSupprimer[k].addEventListener("click" , (event) => {
        event.preventDefault();


        // Sélection de l'id du produit qui sera supprimer en cliquant sur le bouton
    let idSelectionSuppression = produitEnregistreLocalStorage[k].id_Canape
    console.log(idSelectionSuppression);
    })
}




/*


function addBasket(product){
    //On récupère le panier qui existe dans le localstorage
    let basket= getBasket();
    //Recherche pour voir si le produit est déjà dans le panier
    //On recherche dans le panier si il y a un produit (p) dont l'id
    //est égal à l'id du produit que je veux ajouter (produit)
    let foundProduct = basket.find(p => p.id == product.id);
    //si le find() trouve l'élément en question il va le retourner
    //sinon il va retourner undefined
    if(foundProduct != undefined){
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
        basket.push(product);
    }


    //On enregistre le nouveau panier
    saveBasket(basket);
}


//fonction pour supprimer la totalié des "product" que l'on soihaite du panier
function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}

//fonction pour changer la quantité d'un produit du panier
function changeQuantity(product, quantity) {
    //on trouve le produit dans le panier
    let basket= getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    //Si le produit est trouvé, on change sa quantité
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        //Si la quantité est inférieure ou égale à 0 
        if(foundProduct.quantity <= 0) {
            //on supprime le produit du panier
            removeFromBasket(foundProduct);
        }else {
            saveBasket(basket);
        }
    }
    
}


//Fonction qui permet de définir la quantité de produit qui se trouve dans le panier
function getNumberProduct(){
    //On récupère le panier
    let basket= getBasket();
    //On commence avec number à 0 
    let number = 0;
    // on fait une boucle for pour ajouter les quantité de chaque produit
    for (let product of basket){
        number += product.quantity;
    }
    return number;
}

//Fontion pour calculer le prix total des articles
function getTotalPrice() {
    //On récupère le panier
    let basket= getBasket();
    //On commence avec number à 0 
    let price = 0;
    // on fait une boucle for pour ajouter les prix de chaque produit
    for (let product of basket){
        price += product.quantity * product.price;
    }
    return price;
}

*/