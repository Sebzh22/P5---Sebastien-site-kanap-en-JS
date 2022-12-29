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

    async function fetchText() {
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
                console.log(res[art]._id);
                let newElt = document.createElement("a");

                document.querySelector(".items").appendChild(newElt);
                newElt.href = `product.html?id=${res[art]._id}`;
            }
        } )
        .catch(function(err) {
            console.log('error');
        })
    }

