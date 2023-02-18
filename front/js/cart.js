// Déclaration de la variable "produitEnregistreLocalStorage" dans laquelle il y aura les key et les values qui sont dans le local storage
//JSON.parse sert à convertir les données au format JSON qui sont dans le local storage en objet JS
let produitEnregistreLocalStorage = JSON.parse(
  localStorage.getItem("products")
);

//---------------------------------------Création du Dom------------------------------------------------
getPanier();

function getPanier() {
  // Affichage d'une alerte et d'un texte si le panier est vide
  if (
    produitEnregistreLocalStorage === null ||
    produitEnregistreLocalStorage == 0
  ) {
    alert("Votre panier est vide");

    // Positionnement dans le DOM
    let panierVide = document.querySelector("#cart__items");

    //Création et ajout d'une div contenant l'image
    let divPanierVide = document.createElement("div");
    panierVide.appendChild(divPanierVide);

    //Création du texte pour signaler le panier vide
    let textePanierVide = document.createElement("p");
    textePanierVide.textContent = `Votre panier ne contient actuellement aucun article`;
    divPanierVide.appendChild(textePanierVide);

  } else {
    // Récuperer les produits dans le localStorage
    for (let canape in produitEnregistreLocalStorage) {
      //Création du DOM pour le produit

      // Positionnement dans le DOM
      let carteProduit = document.querySelector("#cart__items");

      //Création d'un article contenant toutes les informations des canapés dans le panier
      let articleProduit = document.createElement("article");
      articleProduit.className = `cart__item`;
      articleProduit.setAttribute(
        `data-id`,
        `${produitEnregistreLocalStorage[canape].idCanape}`
      );
      articleProduit.setAttribute(
        `data-color`,
        `${produitEnregistreLocalStorage[canape].couleurCanape}`
      );
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

      //Création et ajout de la couleur du Canapé
      let couleurCanape = document.createElement("p");
      couleurCanape.textContent = `${produitEnregistreLocalStorage[canape].couleurCanape}`;
      cartItemContentDescription.appendChild(couleurCanape);

      //Création et ajout du prix du Canapé

      //Accès et récupération des ressources du canapé sélectionné avec son id précédement récupérer
      fetch(
        "http://localhost:3000/api/products/" +
          produitEnregistreLocalStorage[canape].idCanape
      )
        //Récupération du résultat de la promesse fetch
        //response prend la valeur de l'objet renvoyé de fetch
        //Utilisation de la méthode json() pour convertir response en données JSON
        .then((response) => {
          return response.json();
        })
        //Récupération des data renvoyés par JSON
        .then((data) => {
          console.log(data.price);
          let prixCanape = document.createElement("p");
          prixCanape.textContent = `${data.price} €`;
          cartItemContentDescription.appendChild(prixCanape);
        });

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
      choixQuantite.type = "number";
      choixQuantite.className = `itemQuantity`;
      choixQuantite.name = "itemQuantity";
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

function getNombreTotal() {
  if (produitEnregistreLocalStorage) {
    //Déclaration de la variable pour pouvoir y mettre les quantité présentes dans le panier
  let nombreTotalCanape = [];

  //Récupérer les quanité dans le panier
  for (let m = 0; m < produitEnregistreLocalStorage.length; m++) {
    let quantiteCanapePanier = produitEnregistreLocalStorage[m].nombreCanape;

    //Mettre les quantité du panier dans un tableau
    nombreTotalCanape.push(quantiteCanapePanier);
  }

  //Addition des quantité stocker dans le tableau
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const sommeQuantiteCanape = nombreTotalCanape.reduce(reducer, 0);
  //Insertion du nombre total de canapé dans le DOM
  let nbrTotalCanape = document.querySelector("#totalQuantity");
  nbrTotalCanape.textContent = sommeQuantiteCanape;
}
}
  
//--------------------Fin du calcul du nombre total d'article et affichage------------------

async function getProduit(idProduct) {
  return fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .catch();
}

//--------------------Calcul du prix total des articles dans le panier et affichage------------------
getPrixTotal();

async function getPrixTotal() {
  if (produitEnregistreLocalStorage) {
    var totalPricePanier = 0;

  //Récupérer les quantité dans le panier
  for (let n = 0; n < produitEnregistreLocalStorage.length; n++) {
    var nombreCanapeByProduct = produitEnregistreLocalStorage[n].nombreCanape;

    var prixCanapeByProduct = await getProduit(
      produitEnregistreLocalStorage[n].idCanape
    );
    console.log(prixCanapeByProduct.price);

    totalPricePanier += nombreCanapeByProduct * prixCanapeByProduct.price;
    console.log(totalPricePanier);

    let prixTotal = document.querySelector("#totalPrice");
    prixTotal.textContent = totalPricePanier;
  }
  }
  
}
//--------------------Fin du calcul du prix total d'article des articles dans le panier et affichage------------------

//---------------------------Fonction de suppression d'un élément dans le panier-----------------------------
supprimerCanape();

function supprimerCanape() {
  //Sélection de la class du bouton supprimer
  let btnSupprimer = document.querySelectorAll(".deleteItem");

  for (let k = 0; k < btnSupprimer.length; k++) {
    btnSupprimer[k].addEventListener("click", (event) => {
      event.preventDefault();

      // Sélection de l'id du produit qui sera supprimer en cliquant sur le bouton
      let idSelectionSuppression = produitEnregistreLocalStorage[k].idCanape;

      // Sélection de la couleur du produit qui sera supprimer en cliquant sur le bouton
      let couleurSelectionSuppression =
        produitEnregistreLocalStorage[k].couleurCanape;

      //Suppression de l'objet avec filter
      produitEnregistreLocalStorage = produitEnregistreLocalStorage.filter(
        (el) =>
          (el.idCanape && el.couleurCanape) !==
          (idSelectionSuppression && couleurSelectionSuppression)
      );

      //On envoie la variable dans le local storage
      //Transformation en format JSON et envoi dans la key "produit" du local Storage
      localStorage.setItem(
        "products",
        JSON.stringify(produitEnregistreLocalStorage)
      );

      //Alert pour avertir que le produit à été supprimer du panier et rechargemebt de la page
      alert("Ce produit à été supprimer du panier");
      //Rechargement de la page
      window.location.href = "cart.html";
    });
  }
}
//---------------------------Fin de la fonction de suppression d'un élément dans le panier--------------------

//---------------------------Fonction de modification de la quantité d'un élément du panier-------------------
modifierQuantite();

function modifierQuantite() {
  //Sélection de la class de input avec la
  const quantiteElement = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < quantiteElement.length; k++) {
    quantiteElement[k].addEventListener("click", (event) => {
      event.preventDefault();

      let modificationQuantiteValue = quantiteElement[k].valueAsNumber;

      for (let m = 0; m < produitEnregistreLocalStorage.length; m++) {
        let canapeModifier = produitEnregistreLocalStorage[m];
        console.log(canapeModifier);
        let canapeQuantiteID = event.target
          .closest("article")
          .getAttribute("data-id");
        let canapeQuantiteCouleur = event.target
          .closest("article")
          .getAttribute("data-color");
        if (
          canapeModifier.idCanape == canapeQuantiteID &&
          canapeModifier.couleurCanape == canapeQuantiteCouleur
        ) {
          produitEnregistreLocalStorage[m].nombreCanape =
            modificationQuantiteValue;
          localStorage.setItem(
            "products",
            JSON.stringify(produitEnregistreLocalStorage)
          );
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

// //Création de la reg exp pour validation du prenom,du nom et de la ville
const regExText = (value) => {
  return /^[A-Za-zéèêëàùï -]{3,40}$/.test(value);
};

// //Création de la reg exp pour validation de l'adresse
const regExAdresse = (value) => {
  return /^[A-Za-zéèêëàùï -,1-9]{3,40}$/.test(value);
};

// //Création de la reg exp pour validation de l'email
const regExEmail = (value) => {
  return /^[a-zA-Z0-9.-_éèêëàùï -,]+[@]{1}[a-zA-Z0-9.-_éèêëàùï -,]+[.]{1}[a-z]{2,10}$/.test(
    value
  );
};

//Ecoute de la validation du prénom
validationForm.firstName.addEventListener("change", function () {
  prenomControle();
  console.log(prenomControle());
});

function prenomControle() {
  const firstNameErreur = document.querySelector("#firstNameErrorMsg");
  const lePrenom = inputFirstName.value;
  if (regExText(lePrenom)) {
    firstNameErreur.innerHTML = "";
    return true;
  } else {
    firstNameErreur.innerHTML = "Format nom valide!";
    return false;
  }
}

//Ecoute de la validation du nom
validationForm.lastName.addEventListener("change", function () {
  nomControle();
  console.log(nomControle());
});

function nomControle() {
  const lastNameErreur = document.querySelector("#lastNameErrorMsg");
  const leNom = inputLastName.value;
  if (regExText(leNom)) {
    lastNameErreur.innerHTML = "";
    return true;
  } else {
    lastNameErreur.innerHTML = "Format nom valide!";
    return false;
  }
}

//Ecoute de la validation de l'adresse
validationForm.address.addEventListener("change", function () {
  adresseControle();
  console.log(adresseControle());
});

function adresseControle() {
  const AddressErreur = document.querySelector("#addressErrorMsg");
  const lAdresse = inputAddress.value;
  if (regExAdresse(lAdresse)) {
    AddressErreur.innerHTML = "";
    return true;
  } else {
    AddressErreur.innerHTML = "Format nom valide!";
    return false;
  }
}

//Ecoute de la validation de la ville
validationForm.city.addEventListener("change", function () {
  villeControle();
  console.log(villeControle());
});

function villeControle() {
  const cityErreur = document.querySelector("#cityErrorMsg");
  const laVille = inputCity.value;
  if (regExText(laVille)) {
    cityErreur.innerHTML = "";
    return true;
  } else {
    cityErreur.innerHTML = "Format nom valide!";
    return false;
  }
}

//Ecoute de la validation de la ville
validationForm.email.addEventListener("change", function () {
  emailControle();
  console.log(emailControle());
});

function emailControle() {
  const emailErreur = document.querySelector("#emailErrorMsg");
  const lEmail = inputEmail.value;
  if (regExEmail(lEmail)) {
    emailErreur.innerHTML = "";
    return true;
  } else {
    emailErreur.innerHTML = "Format nom valide!";
    return false;
  }
}
//---------------------------------FIN Gestion Validation du Formulaire ---------------------------

// Création de constante pour se positionner dans chaque input du formulaire
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

//------------------Faire un addEventListener sur le bouton commander ------------------------
const btnCommande = document.querySelector("#order");
btnCommande.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    prenomControle() &&
    nomControle() &&
    adresseControle() &&
    villeControle() &&
    emailControle()
  ) {
    let idProducts = [];
    for (let k = 0; k < produitEnregistreLocalStorage.length; k++) {
      idProducts.push(produitEnregistreLocalStorage[k].idCanape);
    }

    //Mettre l'objet formulaireValues dans le localStorage
    // localStorage.setItem("contact", JSON.stringify(contact));
    //Mettre les values du formulaire et les produits dans un objet à envoyer vers le serveur
    let order = {
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      products: idProducts,
    };
    console.log(produitEnregistreLocalStorage);

    //Envoie de l'objet order vers le serveur
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async function (resultOrder) {
        order = await resultOrder;
        document.location.href = "confirmation.html?orderId=" + order.orderId;
        localStorage.clear();
      });
    console.log(order);
  } else {
    alert("Erreur formulaire");
  }
});
