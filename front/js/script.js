// déclaration de la fonction fetch
async function fetchText() {
    // variable qui appel la fonction spécial fetch
    let response = await fetch("http://localhost:3000/api/products");

    return await response.json();   
}


// recuperation des data
getCanape();

async function getCanape() {
    let result = await fetchText()

    .then (function(res) {

        const articles = res;

        // ajout du a de chaque article
        for (let i = 0; i < articles.length; i++) {

            // Récupération de l'élément du DOM qui accueillera les fiches des canapés
            let sectionFiches = document.querySelector(".items");


            //Création d'une balise a contenant toutes les informations des canapés 
            let newElt = document.createElement("a");

            newElt.href = `product.html?id=${res[i]._id}`; 

            //ajout de la section article de chaque a
            let newArticle = document.createElement("article");
            
            let newImg = document.createElement("img");
            newImg.src = `${res[i].imageUrl}`;
            newImg.alt = `${res[i].altTxt}`;

            let newTitleKanape = document.createElement("h3");
            newTitleKanape.className = `productName`;
            newTitleKanape.textContent = `${res[i].name}`;

            let newDescriptionKanape = document.createElement("p");
            newDescriptionKanape.className = `productDescription`;
            newDescriptionKanape.textContent = `${res[i].description}`;


            // On rattache la balise a à chaque section .items
            sectionFiches.appendChild(newElt);

            // On rattache tout les éléments à notre balise a 
            newElt.appendChild(newArticle);
            newArticle.appendChild(newImg);
            newArticle.appendChild(newTitleKanape);
            newArticle.appendChild(newDescriptionKanape);
            
        }
  
    
    } )


    .catch(function(err) {
        console.log('error');
    })
}



