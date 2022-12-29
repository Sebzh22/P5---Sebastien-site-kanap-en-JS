// function ()
// fetch("http://localhost:3000/api/products")
//     .then(function(res) {
//         if (res.ok) {
//             return res.json();
//         }
//     })
//     .then(function(value) {
//         console.table(value);
//     })
//     .catch(function(err) {

//     })


    // déclaration de la fonction flex
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
            // console.log(res);
            const articles = res;
            for (let art in articles) {
                // console.log(res[art]._id);

                //variable permettant la création d'un nouvelle élément ici un a 
                let newElt = document.createElement("a");
                //ajout de l'élément dernièrement créer en tant qu'enfant de la class items
                //on appelle l'élement parents et on rajoute .appendChild(nom de la fonction) à la suite
                //autre possibilité en 2 lignes
                //récupérer l'élement parent dans une fonction : let elementParent = document.getElementsByClassName(".items");
                //Puis, dire qu'on rajoute l'élément enfant à notre variable elementParent : elementParent.appendChild(newElt);
                document.querySelector(".items").appendChild(newElt);
                // Création ou modification de l'attribut href de la variable newElt donc de l'élément enfant a dans le parents .items
                // format pour rajouter des attribut dans notre noeud element que l'on  vient de créer :
                //newElement.attribut(href, textContent, Class...) = 'nouvelle attribut';
                //reprise dans le html du href commun de l'élément a
                // suppression de son id pour rajouter les id que l'on doit récupérer dans le tableau
                // A vérifier : le dollar permet de définir une valeur récupérer entre {}, res est notre variable articles
                // [art] dit de lire tout les article de notre tableau déclarer avant avec : for (let art in articles)
                // et le ._id lui dit de prendre tout les élément _id de chaque article
                newElt.href = `product.html?id=${res[art]._id}`; 
            }
            for (let art in articles) {
                let newElt = document.createElement("article");
                document.querySelector(".items a").appendChild(newElt);
            }
        } )
        .catch(function(err) {
            console.log('error');
        })
    }

