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



//--------------------Calcul du nombre total d'article et affichage------------------
getNombreTotal();

function getNombreTotal(){
    
    //Déclaration de la variable pour pouvoir y mettre les quantité présentes dans le panier
    let nombreTotalCanape = [];
  

    //Récupérer les quanité dans le panier
    for (let m = 0; m < produitEnregistreLocalStorage.length; m++){
        let quantiteCanapePanier = produitEnregistreLocalStorage[m].nombreCanape;
        
        //Mettre les quantité du panier dans un tableau
        nombreTotalCanape.push (quantiteCanapePanier);  
    }

    //Addition des quantité stocker dans le tableau
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const sommeQuantiteCanape = nombreTotalCanape.reduce(reducer, 0);
    //Insertion du nombre total de canapé dans le DOM
    let nbrTotalCanape = document.querySelector("#totalQuantity");
    nbrTotalCanape.textContent = sommeQuantiteCanape;
    
}
//--------------------Fin du calcul du nombre total d'article et affichage------------------



//--------------------Calcul du prix total des articles dans le panier et affichage------------------
getPrixTotal();

function getPrixTotal(){
    
    //Déclaration de la variable pour pouvoir y mettre les quantité présentes dans le panier
    let prixTotalCanape = [];
  

    //Récupérer les quanité dans le panier
    for (let n = 0; n < produitEnregistreLocalStorage.length; n++){
        let prixCanapePanier = (produitEnregistreLocalStorage[n].prixCanape)*(produitEnregistreLocalStorage[n].nombreCanape);
        //Mettre les quantité du panier dans un tableau
        prixTotalCanape.push (prixCanapePanier);       
    }

    //Addition des prix de chaque article calculé en fonction de la quantité
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const sommePrixCanape = prixTotalCanape.reduce(reducer, 0);
    //Insertion du prix total des canapés dans le DOM
    let prixTotal = document.querySelector("#totalPrice");
    prixTotal.textContent = sommePrixCanape;
    
}
//--------------------Fin du calcul du prix total d'article des articles dans le panier et affichage------------------



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
modifierQuantite();

function modifierQuantite() {
    
    //Sélection de la class de input avec la
    const quantiteElement = document.querySelectorAll(".itemQuantity");
    
    for (let k = 0; k < quantiteElement.length; k++){
        quantiteElement[k].addEventListener("click" , (event) => {
            event.preventDefault();  

            let modificationQuantiteValue = quantiteElement[k].valueAsNumber;
            
            for (let m = 0; m<produitEnregistreLocalStorage.length; m++) {
                let canapeModifier = produitEnregistreLocalStorage[m];
                console.log(canapeModifier);
                let canapeQuantiteID = event.target.closest('article').getAttribute("data-id");
                let canapeQuantiteCouleur = event.target.closest('article').getAttribute("data-color");
                    if(canapeModifier.idCanape == canapeQuantiteID && canapeModifier.couleurCanape == canapeQuantiteCouleur) {
                        produitEnregistreLocalStorage[m].nombreCanape = modificationQuantiteValue;
                        localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage)); 
                        window.location.reload();
                    }
            }                        
        });
    }
}
//-----------------------Fin de la fonction de modification de la quantité d'un élément du panier-------------





//-------------------------------Gestion du formulaire de commande ---------------------------------------
//-----------------------------------Gestion de la validation du formulaire-------------------------------
const validationForm = document.querySelector(".cart__order__form");

//Création de la reg exp pour validation du prenom,du nom et de la ville
let textRegExp = new RegExp(
    '^[A-Za-zéèêëàùï -,1-9]{3,40}$'
);

//Création de la reg exp pour validation de l'email
let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_éèêëàùï -,]+[@}{1}[a-zA-Z0-9.-_éèêëàùï -,]+[.]{1}[a-z]{2,10}$'
);

const regExText = (value) => {
    return /^[A-Za-zéèêëàùï -,1-9]{3,40}$/ .test(value);
}

//Ecoute de la validation du prénom
validationForm.firstName.addEventListener('change', function() {
    prenomControle(this);    
    console.log(prenomControle(this));
});

function prenomControle() {
    const firstNameErreur = document.querySelector("#firstNameErrorMsg");
    const lePrenom = inputFirstName.value;
    if (regExText(lePrenom)) {
        firstNameErreur.innerHTML = '';
        return true;
    } else {
        firstNameErreur.innerHTML = 'Format nom valide!';
        return false;
    }
}

/*
//Ecoute de la validation du prénom
validationForm.firstName.addEventListener('change', function() {
    validPrenom(this);    
    console.log(validPrenom(this));
});

//--------------Validation du prénom---------------
const validPrenom = function (inputPrenom){ 
    //Récupération de la balise du message d'erreur prenom
    const firstNameErreur = document.querySelector("#firstNameErrorMsg")
    const validiteRegExp = textRegExp.test(inputPrenom.value);
    //On test l'expression reguliere du prenom
    if(validiteRegExp){
        firstNameErreur.innerHTML = '';
        return true;
    } else {
        firstNameErreur.innerHTML = 'Format nom valide!';
        return false;
    }
    
};   */

//Ecoute de la validation du nom
validationForm.lastName.addEventListener('change', function() {
    validNom(this);
    console.log(validNom(this));
});

//--------------Validation du nom---------------
const validNom = function (inputNom){
    //Récupération de la balise du message d'erreur nom
    const lastNameErreur = document.querySelector("#lastNameErrorMsg")
    const validiteRegExp = textRegExp.test(inputNom.value);
  
    //On test l'expression reguliere du prenom
    if(validiteRegExp){
        lastNameErreur.innerHTML = '';
        return true;
    } else {
        lastNameErreur.innerHTML = 'Format nom valide!';
        return false;
    }

};

//Ecoute de la validation de l'adresse
validationForm.address.addEventListener('change', function() {
    validAdresse(this);
    console.log(validAdresse(this));
});

//--------------Validation de l'adresse---------------
const validAdresse = function (inputAdresse){
    //Récupération de la balise du message d'erreur nom
    const adresseErreur = document.querySelector("#addressErrorMsg")
    const validiteRegExp = textRegExp.test(inputAdresse.value);

    //On test l'expression reguliere du prenom
    if(validiteRegExp){
        adresseErreur.innerHTML = '';
        return true;
    } else {
        adresseErreur.innerHTML = 'Format nom valide!';
        return false;
    }
};


//Ecoute de la validation de la ville
validationForm.city.addEventListener('change', function() {
    validVille(this);
    console.log(validVille(this));
});

//--------------Validation de la ville---------------
const validVille = function (inputVille){ 
    //Récupération de la balise du message d'erreur de la ville
    const cityErreur = document.querySelector("#cityErrorMsg")
    const validiteRegExp = textRegExp.test(inputVille.value); 

    //On test l'expression reguliere de la ville
    if(validiteRegExp){
        cityErreur.innerHTML = '';
        return true;
    } else {
        cityErreur.innerHTML = 'Format nom valide!';
        return false;
    }
};

//Ecoute de la validation de l'email'
validationForm.email.addEventListener('change', function() {
    validEmail(this);
    console.log(validEmail(this));
});

//--------------Validation de l'email'---------------
const validEmail = function (inputEmail){ 
    //Récupération de la balise du message d'erreur de l'email'
    const emailErreur = document.querySelector("#emailErrorMsg")
    const validiteRegExp = emailRegExp.test(inputEmail.value);
    console.log(validiteRegExp);
    //On test l'expression reguliere de l'email'
    if(validiteRegExp){
        emailErreur.innerHTML = '';
        return true;
    } else {
        emailErreur.innerHTML = 'Format nom valide!';
        return false;
    }
};
//---------------------------------FIN Gestion Validation du Formulaire ---------------------------


// Création de constante pour se positionner dans chaque input du formulaire   
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputAddress = document.getElementById("address");
const inputCity = document.getElementById("city");
const inputEmail = document.getElementById("email");

//------------------Faire un addEventListener sur le bouton commander ------------------------
const btnCommande = document.querySelector("#order");
btnCommande.addEventListener("click", (e) =>{
    e.preventDefault();

    //Récupération des valeurs du formulaire pour les mettre dans le localStorage
    const formulaireValues = {
    firstName : inputFirstName.value,
    lastName : inputLastName.value,
    address : inputAddress.value,
    city : inputCity.value,
    email : inputEmail.value,
    }

    //Mettre l'objet formulaireValues dans le localStorage
    localStorage.setItem("contact", JSON.stringify(formulaireValues));

    // if() {
    //     console.log("Formulaire OK");
    
    // } else {
    //     console.log("erreur");
    // }


let formulaireLocalStorage = [];

console.log(validEmail(this) && validVille(this) && validAdresse(this) && validNom(this) && validPrenom(this));
if(validEmail(this) && validVille(this) && validAdresse(this) && validNom(this) && validPrenom(this)) {
    alert("tout est true");
} else {
    alert ("quelques chose est false");
}

    

    //Mettre les values du formulaire et les produits dans un objet à envoyer vers le serveur
    const aEnvoyer = {
        produitEnregistreLocalStorage,
        formulaireValues
    }

    //Envoie de l'objet aEnvoyer vers le serveur

})

