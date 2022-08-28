
const searchParams = new URLSearchParams(window.location.search);   // ***Recuperation de L'ID de l'URL * peut etre rajouter windows 
const productID = searchParams.get('id');

const infoProductApi = async function () {       // async fait qu'une fonction renvoie une promesse * await fait qu'une fonction attend une Promise
    await fetch(`http://localhost:3000/api/products/${productID}`)  // Methode Fetch qui me permet de recuperer les données du serveur
    .then(reponse => reponse.json())               // Promesse d'une reponse en Json  forme flechée
    .then(function(data){                          // ***une promesse de pouvoir "loguer" les datas (mes données)
        return (produits = data);                  // demande d'un retour de reponse (les datas) que je "nomme" produits, products etant deja sur une autre page possibilité de confusion
        })
        .catch (function (_Error){                               // Si ma promesse initiale est rejetée 'catch'
            console.log(`J'en connais Un qui s'est planté`);    // s'il apparait dans la console, il y a un problème
        });
};

async function miseEnPlaceDuProduit() {               // Creation d'une fonction qui permet l'affichage dans la page
    await infoProductApi();                           // pour pouvoir mettre en place mon produit je dois d'abord appeler mes info provenant de l'API
    let SVP_choisissezUneCouleur = document.querySelector("#colors");   // ***pour     j'ai du creeer une variable *** pourquoi un #           
    produits.colors.forEach((color) => {              //   
        SVP_choisissezUneCouleur.innerHTML +=  `<option value="${color}">${color}</option>`;
    })
    document.getElementsByClassName("item__img").innerHTML = `<img src="${produits.imageUrl}" alt="${produits.altTxt}">`;  // ***verifier entre produits et products entre les 2 pages le meme ou pas ? 
    document.getElementById("title").textContent = produits.name;  // liaison entre #title et le nom du produit qui est sous le nom name dans le Json
    document.getElementById("price").textContent = produits.price; // liaison entre #price (html) et le nom du produit qui est dans le Json
    document.getElementById("description").textContent = produits.description; // liaison entre #price (html) et le nom du produit qui est dans le Json
              
     
}; 






miseEnPlaceDuProduit();













/*

// Variable making

const addToCartBtn = document.getElementById("addToCart");
const colorBtn = document.getElementById("colors");
const quantity = document.getElementById("quantity");
let colorAttr, qtyAttr, actualItemIndex;
*/