//------------------- Récupération de l'identifiant du canapé sélectionné dans la page accueil -------
//Récupération de la chaine de requete dans l'URL  (tout ce qu'il y a après le nom de page : ?id....)
const queryStringUrl = window.location.search;

// Récupération de l'id des produits dans la requete URL
const urlProductKanape= new URLSearchParams (queryStringUrl);
//Récupération de la valeur de id du produit sélectionner dans l'URL (la valeur qu'il y a après id=)
const idKanape = urlProductKanape.get("id");


//Appel de la fonction qui récupère les informations du canapé
getCanape();

// Récupération des paramètres du canapé sélectionné
const quantiteCanapeSelection = document.querySelector("#quantity");
const colorCanapeSelection = document.querySelector("#colors");
const sectionTitleCanape = document.querySelector("#title");
const sectionPrixCanape = document.querySelector("#price");
const sectionDescriptionCanape = document.querySelector("#description");
const sectionImg = document.querySelector(".item__img");
const imgKanape = document.createElement("img"); 



//-------------- Déclaration de la fonction qui récuperera les informations du canapé ----------------------
function getCanape() {
    //Accès et récupération des ressources du canapé sélectionné avec son id précédement récupérer
    fetch ("http://localhost:3000/api/products/" + idKanape)
    //Récupération du résultat de la promesse fetch
    //response prend la valeur de l'objet renvoyé de fetch
    //Utilisation de la méthode json() pour convertir response en données JSON
    .then ((response) => {        
            return response.json();        
    })     

    //Récupération des data renvoyés par JSON
    .then ((data) => {
        console.log(data)

        //Rajout de l'image correspondante à l'id de la page ainsi que de son alt 
        imgKanape.src = data.imageUrl;
        imgKanape.alt = data.altTxt;
        sectionImg.appendChild(imgKanape);

        //Insertion du titre correspondant à l'id de la page 
        let titleKanape = document.createTextNode(data.name);
        sectionTitleCanape.appendChild(titleKanape);

        //Insertion du Prix correspondant au produit de la page 
        let prixKanape = document.createTextNode(data.price);
        sectionPrixCanape.appendChild(prixKanape);

        //Insertion de la description du produit dans la balise p avec l'id description
        let descriptionKanape = document.createTextNode(data.description); 
        sectionDescriptionCanape.appendChild(descriptionKanape);

        //Création des options de couleurs du canapé dans la partie select en fonction du nombre de couleurs de chaque produits
    for (let i = 0; i < data.colors.length; i++) {
        let newColor = document.createElement("option");
        newColor.value = data.colors[i];
        newColor.textContent = data.colors[i];
        colorCanapeSelection.appendChild(newColor);  
        
    }

    gestionPanier(data);

    }) 
    
    .catch(function(err) {
        alert('Connexion impossible à l\'API');
    })
}




//---------------------------  Gestion de la mise au panier  --------------------------
function gestionPanier(canape){

// Selection du bouton ajouter l'article au panier
let buttonAddBasket = document.querySelector("#addToCart");

//--------------------addEventListener  -  Ecoute du bouton et envoi du panier -------------------
buttonAddBasket.addEventListener("click", function() {
    
    // Maintnenant il faut vérifier si la quantité est comprise entre 1 et 100
    // el la couleur différent de vide

     if((quantiteCanapeSelection.value > 0 && quantiteCanapeSelection.value <=100) && (colorCanapeSelection.value !== "")){
        // Si la condition est rempli alors : Récupération des données sélectionnées par l'utilisateur et envoie du panier
        let parametreCanape = {
            id_Canape: idKanape,
            option_Couleur : colorCanapeSelection.value,
            nombre_Canape : quantiteCanapeSelection.value,
            nom_Canape : sectionTitleCanape.innerText,
            prix_Canape : sectionPrixCanape.innerText,
            img_Canape : imgKanape.src,
            alt_Img_Canape : imgKanape.alt,
        };

        console.log(parametreCanape);

       //---------------------------------- Local Storage -----------------------------
            // Déclaration de la variable "produitEnregistreLocalStorage" dans laquelle il y aura les key et les values qui sont dans le local storage
            //JSON.parse sert à convertir les données au format JSON qui sont dans le local storage en objet JS
            let produitEnregistreLocalStorage = JSON.parse(localStorage.getItem("produit"));
            console.log(produitEnregistreLocalStorage);

            //-------  Fonction qui sert à ajouter un canapé dans le local storage ----
            const ajoutProduitLocalStorage = () => {
                //Ajout dans le tableau de l'objet avec les values choisi par l'utilisateur
                produitEnregistreLocalStorage.push(parametreCanape);
                //Transformation en format JSON et envoi dans la key "produit" du local Storage
                localStorage.setItem("produit", JSON.stringify(produitEnregistreLocalStorage));   
            };

            //Recherche pour voir si le produit est déjà dans le localStorage
            //On recherche dans le localStorage si il y a un produit (findCanape) dont l'id
            //est égal à l'id du produit que je veux ajouter (produit)
            const foundCanape = (produitEnregistreLocalStorage || []) .find ( function (findCanape) {   
            return findCanape.option_Couleur === parametreCanape.option_Couleur
            &&
            findCanape.id_Canape === parametreCanape.id_Canape;
            });
            console.log(foundCanape);

             //S'il y a deja des produits enregistrer dans le local storage
             if(foundCanape != undefined){                              
                console.log("Je suis deja dans le panier");
                ajoutProduitLocalStorage();
                // foundCanape.nombre_Canape += foundCanape.nombre_Canape; 
                console.log(produitEnregistreLocalStorage);
            }
            // s'il n'y a pas de produit enregistré dans le local storage
            else{
                console.log("Ajouter moi dans le panier");
                produitEnregistreLocalStorage = [];
                ajoutProduitLocalStorage(); 
                console.log(produitEnregistreLocalStorage);   
            }
            
            
     } else {
        alert("Vous n'avez pas sélectionné toutes les options. \nMerci de sélectionner une couleur et une quantité  entre 1 et 100.")
     }
})
}
