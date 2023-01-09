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
        // affichagePopUp();
        // console.log('error');
    })
}
