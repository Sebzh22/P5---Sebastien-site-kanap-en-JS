// Déclaration de la variable "produitEnregistreLocalStorage" dans laquelle il y aura les key et les values qui sont dans le local storage
//JSON.parse sert à convertir les données au format JSON qui sont dans le local storage en objet JS
let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreLocalStorage);



//---------------------------------------Création du Dom------------------------------------------------
getPanier();

function getPanier() {

    // Affichage d'une alerte si le panier est vide 
    if(produitEnregistreLocalStorage === null || produitEnregistreLocalStorage == 0){
    alert("Votre panier est vide");
    } else {
    // Récuperer les produits dans le localStorage
    for (let canape in produitEnregistreLocalStorage){
        //Création du DOM pour le produit

        // Positionnement dans le DOM
        let carteProduit = document.querySelector("#cart__items");

        //Création d'un article contenant toutes les informations des canapés dans le panier
        let articleProduit = document.createElement("article");
        articleProduit.className = `cart__item`;
        articleProduit.setAttribute (`data-id`, `${produitEnregistreLocalStorage[canape].idCanape}`);
        articleProduit.setAttribute (`data-color`, `${produitEnregistreLocalStorage[canape].couleurCanape}`);
        carteProduit.appendChild(articleProduit);


        //Création et ajout d'une div contenant l'image
        let cartItemImg = document.createElement("div");
        cartItemImg.className = `cart__item__img`;
        articleProduit.appendChild(cartItemImg);

        // Ajout de l'image dans sa div
        let imageCanape = document.createElement("img");
        imageCanape.src = `${produitEnregistreLocalStorage[canape].imgCanape}`;
        imageCanape.alt = `${produitEnregistreLocalStorage[canape].imgCanapeAlt}`;
        cartItemImg.appendChild(imageCanape);

        //Création et ajout de la div content
        let cartItemContent = document.createElement("div");
        cartItemContent.className = `cart__item__content`;
        articleProduit.appendChild(cartItemContent);

        //Création et ajout de la div description
        let cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.className = `cart__item__content__description`;
        cartItemContent.appendChild(cartItemContentDescription);

        //Création et ajout du titre h2 avec le nom du produit
        let titreNomProduit = document.createElement("h2");
        titreNomProduit.textContent = `${produitEnregistreLocalStorage[canape].nomCanape}`;
        cartItemContentDescription.appendChild(titreNomProduit);

        //Création et ajout de la couleur et du prix du Canapé
        let couleurCanape = document.createElement("p");
        couleurCanape.textContent = `${produitEnregistreLocalStorage[canape].couleurCanape}`;
        cartItemContentDescription.appendChild(couleurCanape);

        let prixCanape = document.createElement("p");
        prixCanape.textContent = `${produitEnregistreLocalStorage[canape].prixCanape} €`;
        cartItemContentDescription.appendChild(prixCanape);

        //Création et ajout de la div description
        let cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.className = `cart__item__content__settings`;
        cartItemContent.appendChild(cartItemContentSettings);

        //Création et ajout des div choix quantité et suppression
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.className = `cart__item__content__settings__quantity`;
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.className = `cart__item__content__settings__delete`;
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

        //Création et ajout de l'affichage de la quantité selectionné et des boutons pour modifier la quantité
        let affichageQuantite = document.createElement("p");
        affichageQuantite.textContent = `Qté :`;
        cartItemContentSettingsQuantity.appendChild(affichageQuantite);

        let choixQuantite = document.createElement("input");
        choixQuantite.type = 'number';
        choixQuantite.className = `itemQuantity`;
        choixQuantite.name = 'itemQuantity';
        choixQuantite.min = `1`;
        choixQuantite.max = `100`;
        choixQuantite.value = `${produitEnregistreLocalStorage[canape].nombreCanape}`;
        cartItemContentSettingsQuantity.appendChild(choixQuantite);

        //Création et ajout du bouton pour supprimer l'article du panier
        let supprimerCanape = document.createElement("p");
        supprimerCanape.className = `deleteItem`;
        supprimerCanape.textContent = `Supprimer`;
        cartItemContentSettingsDelete.appendChild(supprimerCanape);




    }
}
}
//---------------------------------------Fin de la création du Dom-------------------------------------



//--------------------Calcul du montant total du panier et du nombre d'article total------------------
getTotal();


function getTotal(){

    // //Déclaration de la variable pour pouvoir y mettre les quantité présentes dans le panier
    // let nombreTotalCanape = [];
  

    // //Récupérer les quanité dans le panier
    // for (let m = 0; m < produitEnregistreLocalStorage.length; m++){
    //     let quantiteCanapePanier = produitEnregistreLocalStorage[m].nombreCanape;
        
    //     //Mettre les quantité du panier dans un tableau
    //     nombreTotalCanape.push (quantiteCanapePanier);
    //     console.log(nombreTotalCanape);    
        
    // }

    // //Addition des quantité stocker dans le tableau
    // const reducer = (accumulator, currentValue) => accumulator + currentValue
    // const sommeQuantiteCanape = nombreTotalCanape.reduce(reducer, 0);
    // // const sommeQuantiteCanape = nombreTotalCanape.reduce(function 
    // //     (accumulator, curValue){ return accumulator + curValue.n}, 0
    // // )
    // console.log(sommeQuantiteCanape);
    // //Ajouter les quantité et addition du total

}




//---------------------------Fonction de suppression d'un élément dans le panier-----------------------------
supprimerCanape()

function supprimerCanape(){

    //Sélection de la class du bouton supprimer
    let btnSupprimer = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < btnSupprimer.length; k++) {
        btnSupprimer[k].addEventListener("click" , (event) => {
            event.preventDefault();    
    
            // Sélection de l'id du produit qui sera supprimer en cliquant sur le bouton
            let idSelectionSuppression = produitEnregistreLocalStorage[k].idCanape;
            console.log(idSelectionSuppression);

            // Sélection de la couleur du produit qui sera supprimer en cliquant sur le bouton
            let couleurSelectionSuppression = produitEnregistreLocalStorage[k].couleurCanape;
            console.log(couleurSelectionSuppression);

            //Suppression de l'objet avec filter
            produitEnregistreLocalStorage = produitEnregistreLocalStorage.filter(el => 
                (el.idCanape && el.couleurCanape) !== (idSelectionSuppression && couleurSelectionSuppression));

            //On envoie la variable dans le local storage
            //Transformation en format JSON et envoi dans la key "produit" du local Storage
            localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage)); 

            //Alert pour avertir que le produit à été supprimer du panier et rechargemebt de la page
            alert("Ce produit à été supprimer du panier");
            //Rechargement de la page
            window.location.href = "cart.html";
        })
    }

}
//---------------------------Fin de la fonction de suppression d'un élément dans le panier--------------------




//---------------------------Fonction de modification de la quantité d'un élément du panier-------------------
modifierQuantite()

function modifierQuantite() {

}
//-----------------------Fin de la fonction de modification de la quantité d'un élément du panier-------------


/*



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