/** 
 * déclaration et appel de la fonction spécial fetch 
*/
async function fetchText() {
  let response = await fetch("http://localhost:3000/api/products");
  return await response.json();
}

/**
 * Affichage d'un PopUp en cas d'echec de connexion à l'API 
*/
function affichagePopUp() {
  if (window.confirm("Connexion impossible à l'API")) {
    window.location.href("index.html");
  }
}


getCanape();

/**
 *  fonction qui nous renvoie les éléments des canapés récupérer dans l'API
 */
async function getCanape() {
  let result = await fetchText()
    .then(function (res) {
      const articles = res;
      /** Création de la boucle for qui récuperera l'ensemble des informations de l'API pour chaque article */
      for (let i = 0; i < articles.length; i++) {
       /** Positionnement dans le DOM */
        let sectionFiches = document.querySelector(".items");

        //Création d'un lien "a" contenant toutes les informations des canapés et qui renverra à la page souhaité
        let LienProduit = document.createElement("a");
        LienProduit.href = `product.html?id=${res[i]._id}`;
        sectionFiches.appendChild(LienProduit);

        //ajout de la section article de chaque lien "a"
        let newArticle = document.createElement("article");
        LienProduit.appendChild(newArticle);

        //Création d'une "img" en lui indiquant sa source et son texte alternatif
        let ImgCanape = document.createElement("img");
        ImgCanape.src = `${res[i].imageUrl}`;
        ImgCanape.alt = `${res[i].altTxt}`;
        newArticle.appendChild(ImgCanape);

        //Création du titre "h3" de chaque produit en lui déclarant une class
        let titleCanape = document.createElement("h3");
        titleCanape.className = `productName`;
        titleCanape.textContent = `${res[i].name}`;
        newArticle.appendChild(titleCanape);

        //Création d'une balise "p" pour la description de chaque produit en lui déclarant une class
        let descriptionCanape = document.createElement("p");
        descriptionCanape.className = `productDescription`;
        descriptionCanape.textContent = `${res[i].description}`;
        newArticle.appendChild(descriptionCanape);
      }
    })

    /**
     * Affichage du PopUp si la connexion à l'API est impossible
     */
    .catch(function (err) {
      affichagePopUp();
    });
}
