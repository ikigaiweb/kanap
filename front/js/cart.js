let basket = JSON.parse(localStorage.getItem("localBasket"));    
      console.log(basket);

      async function infoProductApis(id) {
        let response = await fetch(`http://localhost:3000/api/products/${id}` )
       if (response.ok) {                                                              
          return response.json();                                                      
        } else {
            console.log(`J'en connais Un qui s'est planté`);                           
        }
      }
      

 async function displayCart() {
   //await infoProductApis(basket[i].id);   
    console.log("3");
    
    if (basket == null ) {
      document.querySelector("h1").textContent = "Votre panier est vide";
    }
else {
    for (let i = 0; i < basket.length; i++) {
        let item = basket[i];
        let info = await infoProductApis(item.id);
        console.log(info);


const cartItems = document.getElementById("cart__items");

const article = document.createElement("article");   
article.classList = "cart__item";
article.setAttribute("data-id", `${item.id}`);
article.setAttribute("data-color",`${item.color}`);
console.log("5");
cartItems.appendChild(article);


const cartItemImg = document.createElement("div");
cartItemImg.classList = "cart__item__img";
article.appendChild(cartItemImg);

console.log("6");

const img = document.createElement("img"); 
cartItemImg.appendChild(img);
img.src = info.imageUrl;
img.alt = info.altTxt;

console.log("7");

const cartItemContent = document.createElement("div");
cartItemContent.classList = "cart__item__content";
article.appendChild(cartItemContent);
console.log("8");

const cartItemContentDescription = document.createElement("div");
cartItemContentDescription.classList = "cart__item__content__description";
cartItemContent.appendChild(cartItemContentDescription);
console.log("9");

const title = document.createElement("h2");
cartItemContentDescription.appendChild(title);
title.innerHTML = info.name;
console.log("10");

const couleur = document.createElement("p");
cartItemContentDescription.appendChild(couleur);
document.querySelector("p").innerHTML = item.color;
console.log("11");

const prix = document.createElement("p");
cartItemContentDescription.appendChild(prix);
prix.innerHTML = info.price + " €";
console.log("12");

const cartItemContentSettings = document.createElement("div");
cartItemContentSettings.classList = "cart__item__content__settings";
cartItemContent.appendChild(cartItemContentSettings);

const cartItemContentSettingsQuantity = document.createElement("div");
cartItemContentSettingsQuantity.classList = "cart__item__content__settings__quantity";
cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

const quantite = document.createElement("p");
cartItemContentSettingsQuantity.appendChild(quantite);
quantite.innerHTML = "Qté : ";

const itemQuantity = document.createElement("input");
itemQuantity.type = "number";
itemQuantity.classList = "itemQuantity";
itemQuantity.name = "itemQuantity";
itemQuantity.min = "1";
itemQuantity.max = "100";
itemQuantity.value = item.quantity;
cartItemContentSettingsQuantity.appendChild(itemQuantity);
//itemQuantity.innerHTML = info.quantity;

const cartItemContentSettingsDelete = document.createElement("div");
cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

const deleteItem = document.createElement("p");
deleteItem.classList.add("deleteItem");
cartItemContentSettingsDelete.appendChild(deleteItem);
deleteItem.innerHTML = "annuler votre commande";


    }}    }
   displayCart();
/*






img.src = 


    }



const newH2 = document.createElement("h2"); 
article.appendChild(newH2);
newH2.textContent = "sdrger";



//const productID = document.createElement("").cartItems;     
//productID.textContent = "ha ha ha ah a";
}

*/

/*
        const a = document.creatELEMENT("a");
        a.href = ""
        a.innerHTML =
        */  /* 
        <section id="cart__items">
        <article


/*

let urlparam = new URLSearchParams(window.location.search);    // ***Recuperation de L'ID de l'URL
let productID = urlparam.get("id");                            // Cette technique me permet de localiser l'ID et donc dans la foction suivante n'appeler que lui !

    async function infoProductApi() {
        let response = await fetch("http://localhost:3000/api/products/" + productID)   // Methode Fetch qui me permet de recuperer les données du serveur * Et là l'ID demandé plus haut 
       if (response.ok) {  
          return response.json();                                                       // Alors il renvoie une reponse sous format JSON
        } else {
            console.log(`J'en connais Un qui s'est planté`);                            // Si Erreur alors message dans le console.log
        }
      }
      function getBasket (basket) {
      let basket = JSON.parse(localStorage.getItem("localBasket"));    
     console.log(basket);
      }

function saveBasket (basket) {                                // la fonction a pour nom "saveBasket" et parametre (basket) ce qui signifie qu'elle ne s'apliquera que à Basket 
    localStorage.setItem("localBasket", JSON.stringify(basket));   // JSON.stringify va permetre de transformé un tableau ou objet complexe en chaine de charactere. *** le "basket" est le mot clé
}      


function removeFromBasket (basket) {               // pour retirer un produit du panier pas juste 1 mais tout un produit
    let basket = getBasket ();                        // on rapelle le variable (il etait dans une fonction)
    basket = basket.filter(p => p.id != productK.id); // fonction .filter va permetre de filtrer un tableau en fonction d'une condition *** on peut le faire avce == ou != 
    saveBasket(basket);                               // On resauve ce nouveau resultat
 }

 function changeQuantity(product, quantity) {                     // permet de retirer un article c 'est plus precis , moins global
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



/*
// dans ce cas transformer en "string" (mots)  BASKET 
 function getBasket () {
    let basket = localStorage.getItem("basket");
    if (basket ==null) {                 // si mon panier est vide alors il retournera un tableau vide
        return [];
    } else {
        return JSON.parse(basket);       // Si il n'est pas vide JSON.parse va lui à l'inverse remmetre le produit en tableau pu autre depuis 
    }
 }*/
/*
 function addBasket (product) {                // on va creer une fonction pour ajouter 
    let basket = getBasket ();
    let foundProduct = basket.find(p => p.id == productID.id);     //.find est une fonction qui travaille sur les tableaux, qui permet de chercher un element sur un tableau par rapport a une condition (je cherche dans mon panier si il y a un produit dont l'ID est = au produit que je veux ajouter)  )
    if(foundProduct != undefined) {             // != signifie different *** si il n'en n 'a pas trouve il retournera "undefined", si il y en a un alors il aura retourné l'element demandé
        foundProduct.quantity++;                // et donc j'ajoute + 1 à la quantité
    } else {
        product.quantity = 1;                  // je defini par defaut mon produit à 1
        basket.push(product);                  // et ensuite je peux pousser mon produit 
    }
    saveBasket(basket);                 // apres l'ajout on enregistre le nouveau panier
 }
*//*

 function getNumberProduct (){                                      // cela nous donnera la quantité de produit qui se trouve dans le panier
    let basket = getBasket ();                                      // on recupere le panier
    let number = 0;                                                 // on commence à 0 
    for (let product of basket) {                                  // FOR OF on va donc executer le code jusqu'on arrive a la fin du tableau
        number += productID.quantity;                               // += ajouter ... concatener 
    }
    return number                                                   // il retourne le nouveau nombre d'article
 }
 function getTotalPrice () {                                        // copier coller de audessus mais cette fois ci pour le prix
    let basket = getBasket ();                                      // on recupere le panier
    let total = 0;                                                  // on commence à 0 
    for (let product of basket) {                                  // pour les produit etant dans le panier  FOR OF on va donc executer le code jusqu'on arrive a la fin du tableau
        total += productID.quantity * product.price;               //  total =  + (A x B)  donc si A = 3  B = 4 alors on ajoute + 12 à total
    }
    return total                                                    // il me retourne le nouveau total
 }



*/




