const searchParams = new URLSearchParams(location.search);   // ***Recuperation de L'ID de l'URL * peut etre rajouter windows 
const productID = searchParams.get('id');                    // Cette technique me permet de localiser l'ID et donc dans la foction suivante n'appeler que lui !


const infoProductApi = async function () {                                       // async fait qu'une fonction renvoie une promesse * await fait qu'une fonction attend une Promise
    await fetch(`http://localhost:3000/api/products/`+ productID)                // Methode Fetch qui me permet de recuperer les données du serveur * Et là l'ID demandé plus haut 
    .then (reponse => reponse.json())                                             // Promesse d'une reponse en Json  forme flechée
    .then (data => (theProduct = data))                                           // avant  .then(function(data){ return (produits = data); })  * le ZZ c 'est juste parce que vs code n'aime pas juste "product"
    .catch (error => (error = console.log(`J'en connais Un qui s'est planté`)))  // pas besoin de redeclarer l'error mais bon pour l'entrainement des fonctions flechées     
};

let SVP_choisissezUneCouleur = document.querySelector("#colors");       // *** J'ai du creer une variable ( localise l'ID colors) qui me pemrmet de creer une fonction "each" et d'inserer la couleur ensuite    
let kanapTitle = document.getElementById("title");                      //   Je les ai sorti de la fonction pour pouvoir m'en reservir + tard dans le "addtothecart"
let kanapImg = document.getElementsByClassName("item__img")[0];         //   variable connécté a lemplacement de l'image
let kanapPrice = document.getElementById("price");                      //   variable connécté a lemplacement du prix
let kanapDescription = document.getElementById("description");          //   variable connécté a lemplacement de la description

 async function displayInfo() {                                          // Creation d'une fonction qui permet l'affichage dans la page
    await infoProductApi();                                             // pour pouvoir mettre en place mon produit je dois d'abord appeler mes info provenant de l'API
   
    theProduct.colors.forEach((color) => {                               //   La méthode forEach() permet d'exécuter une fonction donnée sur chaque élément du tableau.
        SVP_choisissezUneCouleur.innerHTML +=  `<option value="${color}">${color}</option>`;  // Les gabarits sont délimités par des caractères accent grave (` `) TOUT CE QUI RENVOIE UNE VALEUR VA ETRE REMPLACE PAR SA VALEUR
    })
    kanapImg.innerHTML = `<img src="${theProduct.imageUrl}" alt="${theProduct.altTxt}">`;  // [0] me permet d'aller chercher le 1er element de la .class item__img... 
    kanapTitle.textContent = theProduct.name;              // liaison entre #title et le nom du produit qui est sous le nom name dans le Json
    kanapPrice.textContent = theProduct.price;             // liaison entre #price (html) et le nom du produit qui est dans le Json
    kanapDescription.textContent = theProduct.description; // liaison entre #description (html) et le nom du produit qui est dans le Json 
}; 

displayInfo();                                                        // appel de la fonction display sinon elle n'apparaitra pas 

// Avec jQuery $(selector).action() pour assigner un élément à un évènement. 
// Les gabarits sont délimités par des caractères accent grave (` `) au lieu des apostrophes doubles ou simples. Les gabarits peuvent contenir des espaces réservés (placeholders). Ces espaces sont indiqués par le signe dollar ($) et des accolades (${expression}). Les expressions dans les espaces réservés et le texte compris dans ces espaces sont passés à une fonction.

const addToTheCart = document.getElementById("addToCart");
const  quantity  = document.getElementById("quantity");


addToTheCart.addEventListener("click", function() {                   // creation d'un "addEventListener pour en 1er lieu m'assurer que tous mes info soit là"

    if (SVP_choisissezUneCouleur.value == "") {                            // Je m'assure qu'il y est une valeur existante (couleur du canap voir plus haut)
    alert("Vous avez oubliez de choisir la couleur de votre nouveau canapé");
    preventDefault ();
} else if (quantity.value == "0") {                                   // Je m'assure que la quantité de canapé choisi soit differente de "0"
        alert("Vous avez oubliez de mentionner le nombre de canapé que vous désirez");
        preventDefault ();
    }  else {       
         
function saveBasket (basket) {                                // la fonction a pour nom "saveBasket" et parametre (basket) ce qui signifie qu'elle ne s'apliquera que à Basket 
    localStorage.setItem("basket", JSON.stringify(basket));   // JSON.stringify va permetre de transformé un tableau ou objet complexe en chaine de charactere. *** le "basket" est le mot clé
}                                                             // dans ce cas transformer en "string" (mots)  BASKET 
 function getBasket () {
    let basket = localStorage.getItem("basket");
    if (basket ==null) {                 // si mon panier est vide alors il retournera un tableau vide
        return [];
    } else {
        return JSON.parse(basket);       // Si il n'est pas vide JSON.parse va lui à l'inverse remmetre le produit en tableau pu autre depuis 
    }
 }
 
 function addBasket (productK) {                // on va creer une fonction pour ajouter 
    let basket = getBasket ();
    let foundProduct = basket.find(p => p.id == productID.id);     //.find est une fonction qui travaille sur les tableaux, qui permet de chercher un element sur un tableau par rapport a une condition (je cherche dans mon panier si il y a un produit dont l'ID est = au produit que je veux ajouter)  )
    if(foundProduct != undefined) {             // != signifie different *** si il n'en n 'a pas trouve il retournera "undefined", si il y en a un alors il aura retourné l'element demandé
        foundProduct.quantity++;                // et donc j'ajoute + 1 à la quantité
    } else {
        productK.quantity = 1;                  // je defini par defaut mon produit à 1
        basket.push(productK);                  // et ensuite je peux pousser mon produit 
    }
    saveBasket(basket);                 // apres l'ajout on enregistre le nouveau panier
 }
 function removeFromBasket (productK) {               // pour retirer un produit du panier pas juste 1 mais tout un produit
    let basket = getBasket ();                        // on rapelle le variable (il etait dans une fonction)
    basket = basket.filter(p => p.id != productK.id); // fonction .filter va permetre de filtrer un tableau en fonction d'une condition *** on peut le faire avce == ou != 
    saveBasket(basket);                               // On resauve ce nouveau resultat
 }

 function changeQuantity(productK, quantity) {                     // permet de retirer un article c 'est plus precis , moins global
    let basket = getBasket ();                                     // on reprend encore ce variable c'est un copier coller de Add basket
    let foundProduct = basket.find(p => p.id == productID.id);     // .find va me permettre de trouver le produit avec l'ID que je recherche dans le panier
    if(foundProduct != undefined) {                                // si il ne le trouve pas alors 
        foundProduct.quantity += quantity;                         // += signifie ajouter   calcule la somme ou la concaténation de ses deux opérandes puis affecte le résultat
        if (foundProduct.quantity <= 0) {                          // si la quantité est égal ou inferieur à 0 
            removeFromBasket(foundProduct);                        // sachant que l'on ne peut pas avoir d'article en nombre negatif , le plus simple est de retirer le produit de facon global
        } else {
            saveBasket(basket);                                    // et on sauve  (attention pârfois hors de la fonction)
        }

    }    
 }
 function getNumberProduct (){                                      // cela nous donnera la quantité de produit qui se trouve dans le panier
    let basket = getBasket ();                                      // on recupere le panier
    let number = 0;                                                 // on commence à 0 
    for (let productK of basket) {                                  // FOR OF on va donc executer le code jusqu'on arrive a la fin du tableau
        number += productID.quantity;                               // += ajouter ... concatener 
    }
    return number                                                   // il retourne le nouveau nombre d'article
 }
 function getTotalPrice () {                                        // copier coller de audessus mais cette fois ci pour le prix
    let basket = getBasket ();                                      // on recupere le panier
    let total = 0;                                                  // on commence à 0 
    for (let productK of basket) {                                  // pour les produit etant dans le panier  FOR OF on va donc executer le code jusqu'on arrive a la fin du tableau
        total += productID.quantity * productK.price;               //  total =  + (A x B)  donc si A = 3  B = 4 alors on ajoute + 12 à total
    }
    return total                                                    // il me retourne le nouveau total
 }}
 accessToCart = () => {
    if (confirm("Commande enregistrée, accéder au panier ?") == true) {
        window.location.href = "../html/cart.html";
    }
}
})