let basket = JSON.parse(localStorage.getItem("localBasket"));                  // On rapelle le LocalStorage (ou se trouve tout les canapé "commandés")
      console.log(basket);

      async function infoProductApis(id) {                                     // on rapelle l'API car certaines info ne se trouve pas dans le localStorage  ** doit être lié a id  
        let response = await fetch("http://localhost:3000/api/products/" + id) 
       if (response.ok) {                                                              
          return response.json();                                                      
        } else {
            console.log(`J'en connais Un qui s'est planté`);                           
        }
      }
      
 async function displayCart() {

    if (basket == null ) {                                                 // si mon panier est vide alors j'ecris
      document.querySelector("h1").textContent = "Votre panier est vide";
    }
else {                                                      // Boucle For qui me permet d'incrementer  I etant une variable qui commence à 0 
    for (let i = 0; i < basket.length; i++) {               // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
        let item = basket[i];                               // [i] element du tableau de basket
        let info = await infoProductApis(item.id);          // je rapelle dans cette fonction les infos (id) qui sont dans l'API
        console.log(info);

        // On "recree les infos données dans le DOM 
const cartItems = document.getElementById("cart__items");   // on localise 

const article = document.createElement("article");          // création de l'article
article.classList = "cart__item";                           // on lui informe de sa class
article.setAttribute("data-id", "item.id");                 // on lui donne son attribut ID 
article.setAttribute("data-color","item.color");
cartItems.appendChild(article);                             // # cart__items a pour enfant "article"

const cartItemImg = document.createElement("div");
cartItemImg.classList = "cart__item__img";
article.appendChild(cartItemImg);

const img = document.createElement("img"); 
cartItemImg.appendChild(img);
img.src = info.imageUrl;                                    // le src de img est dans l'API sous le nom imageUrl 
img.alt = info.altTxt;

const cartItemContent = document.createElement("div");
cartItemContent.classList = "cart__item__content";
article.appendChild(cartItemContent);

const cartItemContentDescription = document.createElement("div");
cartItemContentDescription.classList = "cart__item__content__description";
cartItemContent.appendChild(cartItemContentDescription);

const title = document.createElement("h2");
title.innerHTML = info.name;                                // le variable "title" on va l'ecrire = son "name" qui provient de l'API
cartItemContentDescription.appendChild(title);

const couleur = document.createElement("p");
couleur.innerHTML = item.color;
cartItemContentDescription.appendChild(couleur);

const prix = document.createElement("p");
prix.innerHTML = info.price + " €";
cartItemContentDescription.appendChild(prix);

const cartItemContentSettings = document.createElement("div");
cartItemContentSettings.classList = "cart__item__content__settings";
cartItemContent.appendChild(cartItemContentSettings);

const cartItemContentSettingsQuantity = document.createElement("div");
cartItemContentSettingsQuantity.classList = "cart__item__content__settings__quantity";
cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

const quantite = document.createElement("p");
quantite.innerHTML = "Qté : ";
cartItemContentSettingsQuantity.appendChild(quantite);

const itemQuantity = document.createElement("input");
itemQuantity.type = "number";
itemQuantity.classList.add("itemQuantity");
itemQuantity.name = "itemQuantity";
itemQuantity.min = "1";
itemQuantity.max = "100";
itemQuantity.value = item.quantity;                                
cartItemContentSettingsQuantity.appendChild(itemQuantity);

const cartItemContentSettingsDelete = document.createElement("div");
cartItemContentSettingsDelete.classList = "cart__item__content__settings__delete";
cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

const deleteItems = document.createElement("p");
deleteItems.classList.add("deleteItem");
deleteItems.innerHTML = "Supprimer";
cartItemContentSettingsDelete.appendChild(deleteItems);
}
saveBasket ();                                              // rappel de la fonction qui enregistre dans le localStorage "setItem"
removeFromBasket ();
itemQuantityModify();
}   
 }
 displayCart();

function saveBasket () {                              
    localStorage.setItem("localBasket", JSON.stringify(basket));   
    console.log(" 1 save basket setItem fonctionne ");
} 

function removeFromBasket () {      
       
    const deleteItemButton = document.getElementsByClassName("deleteItem"); 
    for (let i = 0; i < deleteItemButton.length; i++) {                // boucle for encore et encore jusque que 
        deleteItemButton[i].addEventListener("click", (event) => {         // on va écouter le click de chaque element du tableau 
      event.preventDefault();  
      if (confirm("etes vous sûr de vouloir supprimer cet article ? ") == true) {
        let newBasket = basket.filter(element => element.id !== basket[i].id || element.color !== basket[i].color); // Je filtre pour ne garder que ce que je veux
        localStorage.setItem("localBasket", JSON.stringify(newBasket));                // j'enregistre le nouveau resultat en fonction du variable juste audessus
        location.reload();                                                             // Je recharge
        }          
      }
    )
  }
}

function itemQuantityModify() {
    const itemQuantityModifyButton = document.getElementsByClassName("itemQuantity"); // je le lie à la class....
    for (let i = 0; i < itemQuantityModifyButton.length; i++) {
        itemQuantityModifyButton[i].addEventListener("change", (event) => {
        event.preventDefault();
           
            let newValue = itemQuantityModifyButton[i].value;   // je dois cree un let car en 1 fois il bloque donc en 2 fois grace au let
            basket[i].quantity = newValue;

            saveBasket ();
            
        }    
     )     
  }
}

async function getTotalQuantity () {
    let totalQty = 0;
    for (let i = 0; i < basket.length; i++) {
        let value = basket[i].quantity;
        console.log(value);
        totalQty += parseInt(value);
      }
      document.querySelector("#totalQuantity").innerText = totalQty;

      let totalPrice = 0;
      let finalTotal = 0;
    for (let i = 0; i < basket.length; i++) {               // tant que I sera inferieur a la longueur du tableau , il effectura la fonction
         item = basket[i];                               // [i] element du tableau de basket
         info = await infoProductApis(item.id);          // je rapelle dans cette fonction les infos (id) qui sont dans l'API
         console.log(info);
        let valeur =  item.quantity;
        totalPrice += valeur * info.price;
        finalTotal = parseInt(totalPrice);
        console.log(info.price);
        console.log(totalPrice);
        console.log(finalTotal);
        
    }
    document.querySelector("#totalPrice").innerText = finalTotal;
    
}
getTotalQuantity();


/*for (let i = 0; i < aaa.length; i++) {   

let newAaa = aaa[i].quantity;
console.log(newAaa);
}
document.getElementById("totalQuantity").innerHTML = "newAaa" ;
};
getTotalQuantity ();*/
/*
function test () {
let aaa = basket;
let bbb = aaa[0].quantity;
let ccc = aaa[1].quantity;
let ggg = parseInt(bbb);
let hhh = parseInt(ccc);
console.log(ggg + hhh);
}
test ();*/
/*
function totalPrice() {
  //  let totalprix = 0;
    let panier = basket;
    for (let i = 0; i < panier.length; i++) {

        let newPanierQ = panier[i].quantity;
        let quantity = parseInt(newPanierQ);

        let newPanierPrice = panier[i].price;
        let prix = parseInt(newPanierPrice);

        let totalprix = prix * quantity;
        console.log(totalprix);
    }
    
}
totalPrice();
*/



/*
async function getTotalPrice () {
    await displayCart();
let basketB = basket;
    for (let i = 0; i < basketB.length; i++) {
        let itemB = basketB[i]; 
        let infoB = await displayCart(itemB.price);   
        console.log(infoB);
    }
    let totalprix = 0;
        let qty = parseInt(itemB.quantity);
        let prix = parseInt(infoB.price);
        totalprix += prix * qty;
        console.log(totalprix);
    }

getTotalPrice ();
*/






    /*
let articlePrice = basket; 
for (let i = 0; i < articlePrice.length; i++) {
let articlePriceQuantity = articlePrice[i].quantity;
//let newArticlePriceQuantity = parseInt(articlePriceQuantity);
console.log(articlePriceQuantity + "quantité l article");

let urlparam = new URLSearchParams(window.location.search);    // ***Recuperation de L'ID de l'URL
let productPrice = urlparam.get("price");   


let apiPrice = await fetch("http://localhost:3000/api/products/" + productPrice)
if (apiPrice.ok) {                                                               // Si reponse (nom du variable est ok.... 
    return apiPrice.json();                                                       // Alors il renvoie une reponse sous format JSON
  } else {
      console.log(`J'en connais Un qui s'est planté`);                            // Si Erreur alors message dans le console.log
  }
}

for (let i = 0; i < apiPrice.length; i++) {   
    let newApiPrice = apiPrice[i].price;
    console.log(newApiPrice); 
    /*
let articlePriceItem = articlePrice[i].id;
let newarticlePriceItem = parseInt(articlePriceItem);
console.log(newarticlePriceItem + "prix de l article");
let totalPrice = newArticlePriceQuantity * newarticlePriceItem;
console.log(totalPrice);*//*
}
}
*/

