//------------------- Récupération de l'identifiant du canapé sélectionné dans la page accueil -------
/**
 * Récupération de la chaine de requete dans l'URL  (tout ce qu'il y a après le nom de page : ?id....)
 * @type {string}
 */
const queryStringUrl = window.location.search;

/**
 *  Récupération de l'id des produits dans la requete URL
 */ 
const urlProductKanape = new URLSearchParams(queryStringUrl);

/**
 * Récupération de la valeur de id du produit sélectionner dans l'URL (la valeur qu'il y a après id=)
 */ 
const idKanape = urlProductKanape.get("id");

getCanape();

// Sélection des emplacement de chaque paramètre du canapé
let quantiteKanapSelection = document.querySelector("#quantity");
let couleurKanapSelection = document.querySelector("#colors");
let sectionTitreKanap = document.querySelector("#title");
let sectionPrixKanap = document.querySelector("#price");
let sectionDescriptionKanap = document.querySelector("#description");
let sectionImg = document.querySelector(".item__img");
let imgKanape = document.createElement("img");

//-------------- Déclaration de la fonction qui récuperera les informations du canapé ----------------------
function getCanape() {
  //Accès et récupération des ressources du canapé sélectionné avec son id précédement récupérer
  fetch("http://localhost:3000/api/products/" + idKanape)
    //Récupération du résultat de la promesse fetch
    //response prend la valeur de l'objet renvoyé de fetch
    //Utilisation de la méthode json() pour convertir response en données JSON
    .then((response) => {
      return response.json();
    })

    //Récupération des data renvoyés par JSON
    .then((data) => {
      console.log(data);

      //Rajout de l'image correspondante à l'id de la page ainsi que de son alt
      imgKanape.src = data.imageUrl;
      imgKanape.alt = data.altTxt;
      sectionImg.appendChild(imgKanape);

      /**
       * Insertion du titre correspondant à l'id de la page
       */ 
      let titreKanape = document.createTextNode(data.name);
      sectionTitreKanap.appendChild(titreKanape);

      /**
       * Insertion du Prix correspondant au produit de la page
       */ 
      let prixKanape = document.createTextNode(data.price);
      sectionPrixKanap.appendChild(prixKanape);

      /**
       * Insertion de la description du produit dans la balise p avec l'id description
       */ 
      let descriptionKanape = document.createTextNode(data.description);
      sectionDescriptionKanap.appendChild(descriptionKanape);

      //Création des options de couleurs du canapé dans la partie select en fonction du nombre de couleurs de chaque produits
      for (let i = 0; i < data.colors.length; i++) {
        let newCouleur = document.createElement("option");
        newCouleur.value = data.colors[i];
        newCouleur.textContent = data.colors[i];
        couleurKanapSelection.appendChild(newCouleur);
      }

      gestionPanier(data);
    })

    .catch(function (err) {
      alert("Connexion impossible à l'API");
    });
}

//---------------------------  Gestion de la mise au panier  --------------------------
function gestionPanier(canape) {
  // Selection du bouton ajouter l'article au panier
  let bouttonAjoutPanier = document.querySelector("#addToCart");

  //--------------------addEventListener  -  Ecoute du bouton et envoi du panier -------------------
  bouttonAjoutPanier.addEventListener("click", function () {
    // Maintnenant il faut vérifier si la quantité est comprise entre 1 et 100
    // el la couleur différent de vide

    if (
      quantiteKanapSelection.value > 0 &&
      quantiteKanapSelection.value <= 100 &&
      couleurKanapSelection.value !== ""
    ) {
      // Si la condition est rempli alors : Récupération des données sélectionnées par l'utilisateur et envoie du panier
      let parametreCanape = {
        idCanape: idKanape,
        couleurCanape: couleurKanapSelection.value,
        nombreCanape: parseInt(quantiteKanapSelection.value),
        nomCanape: sectionTitreKanap.innerText,
        imgCanape: imgKanape.src,
        imgCanapeAlt: imgKanape.alt,
      };

      //---------------------------------- Local Storage -----------------------------
      // Déclaration de la variable "produitEnregistreLocalStorage" dans laquelle il y aura les key et les values qui sont dans le local storage
      //JSON.parse sert à convertir les données au format JSON qui sont dans le local storage en objet JS
      let produitEnregistreLocalStorage = JSON.parse(
        localStorage.getItem("products")
      );
      console.log(produitEnregistreLocalStorage);

      //Si il y a quelques choses d'enregistre dans le localStorage
      if (produitEnregistreLocalStorage) {
        //On cherche pour voir si il y a déja un canape avec le meme id et la meme couleur
        const resultatFind = produitEnregistreLocalStorage.find(
          (el) =>
            el.idCanape === idKanape &&
            el.couleurCanape === couleurKanapSelection.value
        );
        //Si oui on modifie la quantité
        if (resultatFind) {
          // On ajoute la nouvelle quantité à la quantité deja enregistré
          let newQuantity =
            parseInt(parametreCanape.nombreCanape) +
            parseInt(resultatFind.nombreCanape);
          resultatFind.nombreCanape = newQuantity;
          localStorage.setItem(
            "products",
            JSON.stringify(produitEnregistreLocalStorage)
          );
          //Sinon on rajoute le Canapé selectionné
        } else {
          //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
          produitEnregistreLocalStorage.push(parametreCanape);
          //Transformation en format JSON et envoi dans la key "produit" du local Storage
          localStorage.setItem(
            "products",
            JSON.stringify(produitEnregistreLocalStorage)
          );
        }
        //S'il n'y a rien dans le localStorage
      } else {
        produitEnregistreLocalStorage = [];
        //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
        produitEnregistreLocalStorage.push(parametreCanape);
        //Transformation en format JSON et envoi dans la key "produit" du local Storage
        localStorage.setItem(
          "products",
          JSON.stringify(produitEnregistreLocalStorage)
        );
      }
      console.log(produitEnregistreLocalStorage);
    } else {
      alert(
        "Vous n'avez pas sélectionné toutes les options. \nMerci de sélectionner une couleur et une quantité  entre 1 et 100."
      );
    }
  });
}
