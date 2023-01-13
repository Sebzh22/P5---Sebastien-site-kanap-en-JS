// récupération de la chaine de requete dans l'url
const queryStringUrl = window.location.search;

// récupération de l'id des produits
const urlProductKanape= new URLSearchParams (queryStringUrl);
const idKanape = urlProductKanape.get("id");
console.log(idKanape);

// déclaration de la fonction fetch en récupérant l'id du produit
async function fetchText() {
    let response = await fetch("http://localhost:3000/api/products/" + idKanape);
    return await response.json();  
}

// recuperation des data
getCanape();


function affichagePopUp() {
    if (window.confirm("Connexion impossible à l'API")) {
        window.location.href("product.html", );
      }
}


async function getCanape() {
    let result = await fetchText()
    .then (function(res) {
        
        const articles = res;

        // console.log(articles);
        //Création de la balise image et rajout de l'image correspondante à l'id de la page ainsi que de son alt
        let sectionImg = document.querySelector(".item__img");
        let ImgKanape = document.createElement("img");
        ImgKanape.src = `${res.imageUrl}`;
        ImgKanape.alt = `${res.altTxt}`;
        sectionImg.appendChild(ImgKanape);

        //Insertion du titre correspondant à l'id de la page 
        let sectionTitle = document.querySelector("#title");
        let TitleKanape = document.createTextNode(`${res.name}`);
        sectionTitle.appendChild(TitleKanape);

        //Insertion du Prix correspondant au produit de la page 
        let sectionPrice = document.querySelector("#price");
        let prixKanape = document.createTextNode(`${res.price}`);
        sectionPrice.appendChild(prixKanape);

        //Insertion de la description du produit dans la balise p avec l'id description
        let sectionDescription = document.querySelector("#description");
        let descriptionKanape = document.createTextNode(`${res.description}`); 
        sectionDescription.appendChild(descriptionKanape);


        //Création des options de couleurs du canapé dans la partie select en fonction du nombre de couleurs de chaque produits
        for (let i = 0; i < res.colors.length; i++) {

            let sectionColors = document.querySelector("#colors");
            let newColor = document.createElement("option");
            newColor.value = `${res.colors[i]}`;
            newColor.textContent = `${res.colors[i]}`;
            sectionColors.appendChild(newColor);  
        }
    } )


    .catch(function(err) {
        affichagePopUp();
        console.log('error');
    })
}



//---------------------------  Gestion de la mise au panier  --------------------------

//Récupération des données sélectionnées par l'utilisateur et envoie du panier

// Selection du bouton ajouter l'article au panier
let buttonAddBasket = document.querySelector("#addToCart");

//--------------------addEventListener  -  Ecoute du bouton et envoi du panier -------------------
buttonAddBasket.addEventListener("click", (event) => {
    event.preventDefault();

// Récupération de l'id de la couleur du canapé choisi
let idColors = document.querySelector("#colors");
// Mettre le choix de l'utilisateur dans une varaible
let choixCouleur = idColors.value;

// Récupération de la quantité d'article choisi
let quantiteCanape = document.querySelector("#quantity");
let choixQuantite = quantiteCanape.value;

// Récupération du nom de l'article
let titleCanape = document.querySelector("#title");
let nomDuCanape = titleCanape.innerText;

// Récupération du prix de l'article
let prixCanape = document.querySelector("#price");
let prixDuCanape = prixCanape.innerText;

// Récupération de l'image de l'article et son texte alt
let imgCanape = document.querySelector(".item__img img");
let imgDuCanape = imgCanape.src;
let altImgDuCanape = imgCanape.alt;

    // Récupération des choix de l'utilisateur et ajout au panier
let parametreCanape = {
    id_Canape: idKanape,
    option_Couleur : choixCouleur,
    nombre_Canape : choixQuantite,
    nom_Canape : nomDuCanape,
    prix_Canape : prixDuCanape,
    img_Canape : imgDuCanape,
    alt_Img_Canape : altImgDuCanape,
}


//---------------------------------- Local Storage -----------------------------
//-------  Stocker la récupération des valeurs de sélection du canapé dans le local storage ----

// Déclaration de la variable "produitEnregistreLocalStorage" dans laquelle il y aura les key et les
// values qui sont dans le local storage

let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreLocalStorage);

// Déclaration d'une fonction pour ajouter un produit sélectionné dans le localstorage

const ajoutProduitLocalStorage = () => {
    //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
    produitEnregistreLocalStorage.push(parametreCanape);
    //Transformation en format JSON et envoi dans la key "produit" du local Storage
    localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));   
};

//JSON.parse converti les données au format JSON qui sont dans le local storage en objet javascript
//S'il y a deja des produits enregistrer dans le local storage
if(produitEnregistreLocalStorage){
    ajoutProduitLocalStorage();
}
// s'il n'y a pas de produit enregistré dans le local storage
else{
    produitEnregistreLocalStorage = [];
    ajoutProduitLocalStorage();    
}
});
